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

if (!nexacro.ExtendedAPI_ImplementationList) {
	var exAPIUid = 0;
	var exAPILibName = 1;
	var exAPILibType = 2;
	var exAPIMaxNumOfInstance = 3;
	var exAPILibOS = 4;

	var SISA = "Single_Instance_Single_Access";
	var SIMA = "Single_Instance_Multi_Access";
	var MI = "Multi_Instances";

	var SyncType_Sync_Direct = 1;
	var SyncType_Sync_Thru_Thread = 2;
	var SyncType_Async = 3;

	nexacro.ExtendedAPI_ImplementationList = 
		[[0, "LibraryName.dll", SISA, 1, "Windows"], [1, "ExtendedAPIHelloWorld.dll", SIMA, 1, "Windows"], [2, "nexacro.extendedAPI.ExtendedAPIHelloWorld", SIMA, 2, "Android"], [3, "NexacroVoiceCommandAdapter.dll", SIMA, 1, "Windows"], [1000, "Num of ExtendedAPI", SISA, 1, "NULL"]
		
	];
}
