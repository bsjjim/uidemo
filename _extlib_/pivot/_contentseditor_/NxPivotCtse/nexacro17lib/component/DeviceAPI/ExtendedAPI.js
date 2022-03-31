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

if (!nexacro.ExtendedAPI) {
	nexacro.ExtendedAPI = function (name, parent) {
		this.id = this.name = name || null;
		if (parent) {
			this.parent = parent;
		}

		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;
		this.exAPILibraryUID_Windows = 1;
		this.exAPILibraryUID_Android = 2;
		this.handle = nexacro._createExtendedAPIObject(this);

		this._event_list = {
			"onevent" : 1, 
			"onsuccess" : 1, 
			"onerror" : 1
		};

		this.onevent = null;
	};

	var _pExtendedAPI = nexacro.ExtendedAPI.prototype = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.ExtendedAPI);
	_pExtendedAPI._type_name = "ExtendedAPI";

	_pExtendedAPI.destroy = function () {
		nexacro._destroyExtendedAPIConnectionObject(this.handle);
		delete nexacro.Device._userCreatedObj[this._id];
		return true;
	};

	_pExtendedAPI.callMethod = function () {
		return nexacro.ExtendedAPIBase.exec(this.handle, this._id, this.parent._getWindow().handle, SyncType_Sync_Direct, "test", false, 1234, "Hello");
	};

	_pExtendedAPI.sampleMethod_3Args = function () {
		return nexacro.ExtendedAPIBase.exec(this.handle, this._id, this.parent._getWindow().handle, SyncType_Sync_Direct, "sampleMethod_3Args", arguments[0], arguments[1], arguments[2]);
	};

	_pExtendedAPI.method_SyncCall_CountlessArgs = function () {
		var argsArray = [this.handle, this._id, this.parent._getWindow().handle, SyncType_Sync_Direct, "method_SyncCall_CountlessArgs"
		];

		for (i = 0; i < arguments.length; i++) {
			argsArray.push(arguments[i]);
		}
		return nexacro.ExtendedAPIBase.exec.apply(this, argsArray);
	};

	_pExtendedAPI.method_ASyncCall_CountlessArgs = function () {
		var argsArray = [this.handle, this._id, this.parent._getWindow().handle, SyncType_Async, "method_ASyncCall_CountlessArgs"
		];

		for (i = 0; i < arguments.length; i++) {
			argsArray.push(arguments[i]);
		}
		return nexacro.ExtendedAPIBase.exec.apply(this, argsArray);
	};

	_pExtendedAPI.sampleMethod_CountArgs = function () {
		var argsArray = [this.handle, this._id, this.parent._getWindow().handle, SyncType_Sync_Direct, "sampleMethod_CountArgs"
		];

		for (i = 0; i < arguments.length; i++) {
			argsArray.push(arguments[i]);
		}
		return nexacro.ExtendedAPIBase.exec.apply(this, argsArray);
	};

	_pExtendedAPI.sampleMethod_SyncReturn = function () {
		return nexacro.ExtendedAPIBase.exec(this.handle, this._id, this.parent._getWindow().handle, SyncType_Sync_Direct, "sampleMethod_SyncReturn", arguments[0], arguments[1], arguments[2], arguments[3]);
	};

	_pExtendedAPI.sampleMethod_SyncType = function (synctype) {
		return nexacro.ExtendedAPIBase.exec(this.handle, this._id, this.parent._getWindow().handle, synctype, "sampleMethod_SyncType"
		);
	};

	_pExtendedAPI.sampleMethod_TimerPulser = function () {
		return nexacro.ExtendedAPIBase.exec(this.handle, this._id, this.parent._getWindow().handle, SyncType_Async, "sampleMethod_TimerPulser"
		);
	};

	_pExtendedAPI.sampleMethod_NotImplementedMethod = function () {
		return nexacro.ExtendedAPIBase.exec(this.handle, this._id, this.parent._getWindow().handle, SyncType_Async, "sampleMethod_NotImplementedMethod"
		);
	};



	_pExtendedAPI.on_created = function () {
	};



	_pExtendedAPI._onevent = function (objData) {
		var e = new nexacro.ExtendedAPIEventInfo("onevent", objData);
		this._fire_onevent(this, e);
	};

	_pExtendedAPI._fire_onevent = function (objExtendedAPI, eExtendedAPIEventInfo) {
		if (this.onevent && this.onevent._has_handlers) {
			return this.onevent._fireEvent(this, eExtendedAPIEventInfo);
		}
	};

	_pExtendedAPI._onsuccess = function (objData) {
		var e = new nexacro.ExtendedAPIEventInfo("onsuccess", objData);
		this._fire_onsuccess(this, e);
	};

	_pExtendedAPI._fire_onsuccess = function (objExtendedAPI, eExtendedAPIEventInfo) {
		if (this.onsuccess && this.onsuccess._has_handlers) {
			return this.onsuccess._fireEvent(this, eExtendedAPIEventInfo);
		}
	};

	_pExtendedAPI._onerror = function (objData) {
		var e = new nexacro.ExtendedAPIEventInfo("onerror", objData);
		this._fire_onerror(this, e);
	};

	_pExtendedAPI._fire_onerror = function (objExtendedAPI, eExtendedAPIEventInfo) {
		if (this.onerror && this.onerror._has_handlers) {
			return this.onerror._fireEvent(this, eExtendedAPIEventInfo);
		}
	};

	delete _pExtendedAPI;
}

if (!nexacro.ExtendedAPIEventInfo) {
	nexacro.ExtendedAPIEventInfo = function (strEventId, objData) {
		this.eventid = strEventId;
		this.objData = objData;
	};
	var _pExtendedAPIEventInfo = nexacro.ExtendedAPIEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.ExtendedAPIEventInfo);
	_pExtendedAPIEventInfo._type_name = "ExtendedAPIEventInfo";

	delete _pExtendedAPIEventInfo;
}


if (nexacro._Browser == "Runtime") {
	if (nexacro._OS == "Windows") {
		nexacro._createExtendedAPIObject = function (target) {
			return nexacro.__createExtendedAPIObject(target, target._onevent, target._onsuccess, target._onerror, target.exAPILibraryUID_Windows, target._id);
		};

		nexacro._destroyExtendedAPIObject = function (target) {
			nexacro.__destroyExtendedAPIObject(target);
		};
	}

	else if (nexacro._OS == "Android") {
		nexacro._createExtendedAPIObject = function (target) {
			return nexacro.__createExtendedAPIObject(target, target._onevent, target._onsuccess, target._onerror, target.exAPILibraryUID_Android, target._id);
		};

		nexacro._destroyExtendedAPIConnectionObject = function (target) {
			nexacro.__destroyExtendedAPIObject(target);
		};
	}

	else if (nexacro._OS == "OSX") {
		nexacro._createExtendedAPIObject = function (target) {
		};
		nexacro._destroyExtendedAPIObject = function (target) {
		};
	}
}
else {
	if (nexacro._OS == "iOS" && nexacro._isHybrid && nexacro._isHybrid()) {
		nexacro._createExtendedAPIObject = function (target) {
		};

		nexacro._destroyExtendedAPIObject = function (target) {
		};
	}
}
