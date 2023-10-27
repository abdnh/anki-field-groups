from __future__ import annotations

from .config import config


def field_groups_for_notetype(notetype_name: str) -> dict[str, list[str]]:
    return config["field_groups"].get(notetype_name, [])
