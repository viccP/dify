from typing import Any

from core.tools.provider.builtin.neo4j.tools.custom_query import CustomQueryTool
from core.tools.provider.builtin_tool_provider import BuiltinToolProviderController


class Neo4jProvider(BuiltinToolProviderController):
    def _validate_credentials(self, credentials: dict[str, Any]) -> None:
        CustomQueryTool()
        pass
