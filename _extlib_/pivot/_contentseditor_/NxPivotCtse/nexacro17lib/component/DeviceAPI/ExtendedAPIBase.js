//==============================================================================
//
//  TOBESOFT Co., Ltd.
//  Copyright 2017 TOBESOFT Co., Ltd.
//  All Rights Reserved.
//
//  NOTICE: TOBESOFT permits you to use, modify, and distribute this file 
//          in accordance with the terms of the license agreement accompanying it.
//
//  Readme URL: http://www.nexacro.co.kr/legal/nexacro17-public-license-readme-1.0.html
//
//==============================================================================

if (!nexacro.ExtendedAPIBase) {
	nexacro.ExtendedAPIBaseI = function () {
		if (nexacro._Browser == "Runtime") {
			if (nexacro._OS == "Windows" || nexacro._OS == "Android") {
				for (var i = 0; i < nexacro.ExtendedAPI_ImplementationList.length; i++) {
					var exAPI = nexacro.ExtendedAPI_ImplementationList[i];
					nexacro.__addExtendedAPIIMPList(exAPI[exAPIUid], exAPI[exAPILibName], exAPI[exAPILibType], exAPI[exAPIMaxNumOfInstance], exAPI[exAPILibOS]);
				}
			}
		}
	};

	var _pExtendedAPIBaseI = nexacro.ExtendedAPIBaseI.prototype = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.ExtendedAPIBaseI);
	_pExtendedAPIBaseI._type_name = "ExtendedAPIBase";

	_pExtendedAPIBaseI.setup = function () {
	};

	_pExtendedAPIBaseI.execiOS = function () {
	};

	_pExtendedAPIBaseI.exec = function (method) {
	};
	_pExtendedAPIBaseI.makeID = function () {
	};
	_pExtendedAPIBaseI.runCallback = function (sid, sfunc, params) {
	};
	_pExtendedAPIBaseI.on_created = function () {
	};
	_pExtendedAPIBaseI._isHybrid = function () {
	};

	_pExtendedAPIBaseI.exit = function (useCache) {
	};
	delete _pExtendedAPIBaseI;

	nexacro.ExtendedAPIBase = new nexacro.ExtendedAPIBaseI();


	if (nexacro.ExtendedAPIBase._isHybrid()) {
		if (window.system) {
			if (nexacro.ExtendedAPI.curExtendedAPI == DeviceType.IOS) {
				nexacro.System.prototype();

				nexacro.System.getSystemInfo();
			}
		}
	}
}

if (nexacro._Browser == "Runtime") {
	if (nexacro._OS == "Windows" || nexacro._OS == "Android") {
		nexacro.ExtendedAPIBaseI.prototype.exec = function () {
			return nexacro.__callMethodExtendedAPIObject.apply(this, arguments);
		};
	}
}
