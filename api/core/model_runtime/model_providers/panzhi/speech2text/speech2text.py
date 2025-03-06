from typing import IO, Optional
from urllib.parse import urljoin
import uuid
import base64
import hashlib
import logging
import math
import time
import requests

from core.model_runtime.entities.common_entities import I18nObject
from core.model_runtime.entities.model_entities import AIModelEntity, FetchFrom, ModelType
from core.model_runtime.errors.invoke import InvokeBadRequestError
from core.model_runtime.errors.validate import CredentialsValidateFailedError
from core.model_runtime.model_providers.__base.speech2text_model import Speech2TextModel
from core.model_runtime.model_providers.panzhi._common import _CommonOaiApiCompat

logger = logging.getLogger(__name__)
class OAICompatSpeech2TextModel(_CommonOaiApiCompat, Speech2TextModel):
    """
    Model class for OpenAI Compatible Speech to text model.
    """

    def _invoke(self, model: str, credentials: dict, file: IO[bytes], user: Optional[str] = None) -> str:
        """
        Invoke speech2text model

        :param model: model name
        :param credentials: model credentials
        :param file: audio file
        :param user: unique user id
        :return: text for given audio file
        """
#         headers = {}
        appid = credentials['panzhi_appid']
        appKey = credentials['panzhi_appkey']
        appName = credentials['panzhi_apiname']
        customHeader= credentials['custom_header']
        rndId = "".join(str(uuid.uuid4()).split("-"))
        for _ in range(24 - len(appName)):
            appName += "0"
        capabilityname = appName
        csid = appid + capabilityname + rndId
        tmp_xServerParam = {
            "appid": appid,
            "csid": csid
        }
        xCurTime = str(math.floor(time.time()))
        xServerParam = str(base64.b64encode(json.dumps(tmp_xServerParam).encode('utf-8')), encoding="utf8")
        xCheckSum = hashlib.md5(bytes(appKey + xCurTime + xServerParam, encoding="utf8")).hexdigest()
        logger.info("xCurTime=%s，xServerParam=%s,xCheckSum=%s",xCurTime,xServerParam,xCheckSum)
        headers = {
            "appKey": appKey,
            "X-Server-Param": xServerParam,
            "X-CurTime": xCurTime,
            "X-CheckSum": xCheckSum
        }
        if customHeader:
            custom_headers = customHeader.split(';')
            parsed_headers = {}
            for header in custom_headers:
                key_value = header.split(':')
                if len(key_value) == 2:
                    parsed_headers[key_value[0].strip()] = key_value[1].strip()
            headers.update(parsed_headers)

        api_key = credentials.get("api_key")
        if api_key:
            headers["Authorization"] = f"Bearer {api_key}"

        endpoint_url = credentials.get("endpoint_url")
        assert endpoint_url is not None, "endpoint_url is required in credentials"
        if not endpoint_url.endswith("/"):
            endpoint_url += "/"
        endpoint_url = urljoin(endpoint_url, "audio/transcriptions")

        payload = {"model": model}
        files = [("file", file)]
        response = requests.post(endpoint_url, headers=headers, data=payload, files=files)

        if response.status_code != 200:
            raise InvokeBadRequestError(response.text)
        response_data = response.json()
        return response_data["text"]

    def validate_credentials(self, model: str, credentials: dict) -> None:
        """
        Validate model credentials

        :param model: model name
        :param credentials: model credentials
        :return:
        """
        try:
            audio_file_path = self._get_demo_file_path()

            with open(audio_file_path, "rb") as audio_file:
                self._invoke(model, credentials, audio_file)
        except Exception as ex:
            raise CredentialsValidateFailedError(str(ex))

    def get_customizable_model_schema(self, model: str, credentials: dict) -> Optional[AIModelEntity]:
        """
        used to define customizable model schema
        """
        entity = AIModelEntity(
            model=model,
            label=I18nObject(en_US=model),
            fetch_from=FetchFrom.CUSTOMIZABLE_MODEL,
            model_type=ModelType.SPEECH2TEXT,
            model_properties={},
            parameter_rules=[],
        )

        return entity
