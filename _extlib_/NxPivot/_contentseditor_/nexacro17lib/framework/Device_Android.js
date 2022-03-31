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

if (nexacro._OS == "Android" && nexacro._Browser == "Runtime") {
	nexacro.DeviceI.prototype.setup = function () {
		nexacro.__initDevice(this, this.runCallback, this.keyEvent, system, nexacro);

		if (nexacro.__getLibVersion) {
			this.libraryversion = nexacro.__getLibVersion();
		}

		this._userCreatedObj = {
		};
		this.curDevice = DeviceType.ANDROID;
		this.isphone = 0;
	};

	nexacro.DeviceI.prototype.exec = function (method) {
		nexacro.__execDeviceAPI(method);
	};

	nexacro._callscript = function (script) {
		nexacro._executeEvalStr(script);
	};

	nexacro._initDeviceAPI();
}
