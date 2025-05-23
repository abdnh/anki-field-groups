from __future__ import annotations

import json
import os
import sys

from aqt import gui_hooks, mw
from aqt.editor import Editor
from aqt.webview import WebContent

sys.path.append(os.path.join(os.path.dirname(__file__), "vendor"))

from .consts import consts
from .errors import setup_error_handler
from .field_groups import field_groups_for_notetype

WIDGET_HTML = """
<div id="field-groups-widget">
<label for="field-groups">Field group:</label>
<select id="field-groups">
<option>test</option>
</select>
</div>
"""


def add_editor_widget(buttons: list[str], editor: Editor) -> None:
    buttons.append(WIDGET_HTML)
    editor.web.eval("attachFieldGroupsEventListeners()")


def inject_editor_styles(web_content: WebContent, context: object | None) -> None:
    if not isinstance(context, Editor):
        return
    web_base = f"/_addons/{consts.module}/web"
    web_content.css.append(f"{web_base}/field_groups.css")
    web_content.js.append(f"{web_base}/field_groups.js")


def load_field_groups(editor: Editor) -> None:
    notetype = mw.col.models.get(editor.note.mid)
    field_names = [field["name"] for field in notetype["flds"]]
    field_groups = {}
    field_groups["All"] = field_names
    field_groups.update(field_groups_for_notetype(notetype["name"]))
    field_group_list = [{"name": k, "fields": v} for k, v in field_groups.items()]
    editor.web.eval(
        f"setTimeout(() => updateFieldGroups({json.dumps(field_names)}, {json.dumps(field_group_list)}), 100)"
    )


def init() -> None:
    setup_error_handler()
    gui_hooks.editor_did_init_buttons.append(add_editor_widget)
    gui_hooks.webview_will_set_content.append(inject_editor_styles)
    gui_hooks.editor_did_load_note.append(load_field_groups)
    mw.addonManager.setWebExports(__name__, r"web/.*")
