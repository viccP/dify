import json
import os
from typing import Any, Union

import requests

from core.tools.entities.tool_entities import ToolInvokeMessage
from core.tools.tool.builtin_tool import BuiltinTool


class CustomQueryTool(BuiltinTool):
    def _invoke(self,
                user_id: str,
                tool_parameters: dict[str, Any],
                ) -> Union[ToolInvokeMessage, list[ToolInvokeMessage]]:
        """
            Calculate the day of the week for a given date
        """
        query = tool_parameters.get('query')
        database = tool_parameters.get('database')
        # Get the service URL from environment variable
        service_url = os.getenv('NEO_SERVICE_URL')
        # Ensure DATA_SERVICE_URL is set
        if not service_url:
            return self.create_text_message(f'DATA_SERVICE_URL environment variable is not set')

        payload = {
            "query": query,
            "database": database
        }
        headers = {
            'Content-Type': 'application/json',
        }
        try:
            # Sending a POST request with JSON payload
            response = requests.post(service_url, headers=headers, json=payload)

            # Check if the request was successful (status code 200)
            if response.status_code == 200:
                # Assuming the response content is JSON, decode it
                data = response.json()
                json_string = json.dumps(data)
                return self.create_text_message(text=json_string)
            else:
                # Handle unsuccessful response (e.g., raise an exception or return an error message)
                return self.create_text_message(f'Request failed with status code {response.status_code}')
        except Exception as e:
            # Handle exceptions (e.g., network errors)
            return self.create_text_message(str(e))
