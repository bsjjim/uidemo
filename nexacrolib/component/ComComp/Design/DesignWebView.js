//==============================================================================
//
//  Copyright 2021 TOBESOFT Co., Ltd.
//  All Rights Reserved.
//
//  NOTICE: TOBESOFT permits you to use, modify, and distribute this file 
//          in accordance with the terms of the license agreement accompanying it.
//
//  Readme URL: http://www.nexacro.com/legal/license/tobesoft/ko/NexacroN-public-license-readme-1.1.html
//
//==============================================================================

if (nexacro.WebView) {
	var _pWebView = nexacro.WebView.prototype;
	_pWebView.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var cellElem = new nexacro.TextBoxElement(control_elem, "icontext");
			this._cell_elem = cellElem;
			cellElem.setElementSize(control_elem.client_width, control_elem.client_height);
			cellElem.setElementTextAlign("center");
			cellElem.setElementVerticalAlign("middle");
			this.on_apply_text(this.name);
		}
	};
	_pWebView.on_created_contents = function (win) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.create(win);
		}
	};
	_pWebView.on_destroy_contents = function () {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.destroy();
			this._cell_elem = null;
		}
	};
	_pWebView.on_change_containerRect = function (width, height) {
		if (this._is_created_contents) {
			var cellElem = this._cell_elem;
			cellElem.setElementSize(width, height);
		}
	};
	_pWebView.on_apply_text = function (text) {
		var cellElem = this._cell_elem;
		if (cellElem) {
			cellElem.setElementText(text);
		}
	};
	_pWebView.createCssDesignContents = function () {
		this.set_text("WebView");
	};
	delete _pWebView;
}
