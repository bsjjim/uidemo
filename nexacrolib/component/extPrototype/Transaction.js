/********************************************************************
*  Transaction 관련 공통함수
*  @FileName 	: Transaction.js
*  @Creator 	: 양경호 
*  @CreateDate 	: 2022/01/12
*  @Desction    : Transaction관련 공통함수 모음
************** 소스 수정 이력 ***********************************************
*  date          		Modifier                Description
*******************************************************************************
*  2022/01/12     	        양경호                 최초 생성 
*******************************************************************************
*/

/**
 * 서비스 호출 공통함수 <br>
 * Dataset의 값을 갱신하기 위한 서비스를 호출하고, 트랜젝션이 완료되면 콜백함수을 수행하는 함수
 * @param {object} oArgs - Transaction Obejct 아규먼트
     svcId : 서비스ID
	 rfcName : rfc명
	 inDs : 데이터 처리를 위한 서버로 보낼 데이터셋 ID
	 outDs : 서버에서 보낸 데이터를 받을 데이터셋 ID
	 svcType : (C,R,U,D,S) - 입력, 조회, 수정, 삭제, 저장 구분 값
	 svcUrl : 호출Url경로 (default : svcUrl:executeds)
	 async : 비동기 통신 여부  (default : true);
	 callback : 콜백받을 함수명 (default : fnCallback)
 * @return N/A
 * @example
    var oArgs  = {
			  svcId 	: 	"searchSD10040",
			  rfcName 	: 	"ZCM_WEB_PRO_LIST",
			  inDs 		: 	"dsImp=dsImp"
						  +" dsImp_IS_LOGIN=dsImp_IS_LOGIN",
			  outDs 	: 	"dsExp_ES_RETURN=dsExp_ES_RETURN"
						  +" dsTbl_T_DATA=dsTbl_T_DATA",
			  svcType 	: 	"R"
	}	

    var sSvcId = "searchSD10040";
    var sRcpNm = "ZCM_WEB_PRO_LIST";
	var sInData = "dsImp=dsImp dsImp_IS_LOGIN=dsImp_IS_LOGIN";
	var sOutData = "dsExp_ES_RETURN=dsExp_ES_RETURN dsTbl_T_DATA=dsTbl_T_DATA";
	
	// 공통 트랜잭션 호출
	this.gfnTransaction(oArgs);	
 */ 
pForm.gfnTransaction = function(oArgs)
{
    var oApp   = this.gfnGetApplication();
	
	var sSvcId = oArgs.svcId;
	var sSvcUrl = oArgs.svcUrl;
	var sInData = oArgs.inDs;
	var sOutData = oArgs.outDs;
	var sArg = oArgs.arg;
	var sCallBackFnc = oArgs.callback;
	var bAsync = oArgs.async;
	var sSvcType = oArgs.svcType;
	
	// fnCallback 함수 기본값 설정
	if (this.gfnIsNull(sCallBackFnc)) sCallBackFnc = "fnCallback";
	if (this.gfnIsNull(bAsync)) bAsync = true;
	
	var oDate = new Date();
	var nStartTime = oDate.getTime();
    var sStartDate = oDate.getYear()
						+"-"+String(oDate.getMonth()).padLeft(2, '0')
						+"-"+String(oDate.getDate()).padLeft(2, '0')
						+" "+String(oDate.getHours()).padLeft(2, '0')
						+":"+String(oDate.getMinutes()).padLeft(2, '0')
						+":"+String(oDate.getSeconds()).padLeft(2, '0')
						+" "+oDate.getMilliseconds();

	// Async
	
	
	// 1. callback에서 처리할 서비스 정보 저장
	var oSvcID = { 
			svcId     : sSvcId,
			svcUrl    : sSvcUrl,
			callback  : sCallBackFnc,
			async   : bAsync,
			startDate : sStartDate,
			startTime : nStartTime };
	
	// 2. strServiceUrl
	var sServiceUrl = (this.gfnIsNull(sSvcUrl)) ? "svcUrl::executeds" : sSvcUrl;
	
	// 3. strArg
	var sArguments = "";
	if (this.gfnIsNull(sArg)) {
		sArguments = "";
	}
	else { 
		sArguments = sArg;
	}

    if(!this.gfnIsNull(oArgs.rfcName)) sArguments += " rfcName="+oArgs.rfcName;

	// 개발 및 개발서버 에는 xml, 운영서버는 SSV로 통신
	var nDataType = 0;	
// 	if (nexacro.getEnvironmentVariable("evRunMode") == "R") {
// 		nDataType = 2;
// 	}
// 	else {
// 		nDataType = 0;
// 	}
	
	var sMsg ="";	
	switch(oArgs.svcType) {
	case "C" :
		sMsg = "등록 중입니다..";
		break;

	case "R" :
		sMsg = "조회 중입니다..";
		break;

	case "U" :
		sMsg = "수정 중입니다..";
		break;

	case "D" :
		sMsg = "삭제 중입니다..";
		break;

	case "S" :
		sMsg = "저장 중입니다..";
		break;
	}

	//상태바 메시지 표현
    this.gfnSetStatusMsg(sMsg);
	
	this.transaction( JSON.stringify(oSvcID)  //1.svcID
					, sServiceUrl             //2.strServiceUrl
					, sInData                    //3.inDataSet
					, sOutData                   //4.outDataSet
					, sArguments              //5.arguments
					, "gfnCallback"				//6.strCallbackFunc
					, bAsync                   //7.bAsync
					, nDataType                 //8.nDataType : 0(XML 타입), 1((Binary 타입),  2(SSV 타입) , 4(JSON 타입)
					, false);                   //9.bCompress ( default : false ) 
};

/**
 * 공통 Callback 함수 <br>
 * 이 함수가 먼저 수행되고 사용자지정Callback함수가 수행된다.
 * @param {String} svcID - 서비스 ID
 * @param {Number} errorCode - 에러코드(정상 0, 에러 음수값)
 * @param {String} [errorMsg] - 에러메시지
 * @return N/A
 */
pForm.gfnCallback = function(sSvcId,nErrCode,sErrMsg)
{
	var oSvcId = JSON.parse(sSvcId);

	// 서비스 실행결과 출력
	var sStartDate = oSvcId.startDate;
	var nStartTime = oSvcId.startTime;
	
	var oDate = new Date();
	var sEndDate = oDate.getYear()
					+"-"+String(oDate.getMonth()).padLeft(2, '0')
					+"-"+String(oDate.getDate()).padLeft(2, '0')
					+" "+String(oDate.getHours()).padLeft(2, '0')
					+":"+String(oDate.getMinutes()).padLeft(2, '0')
					+":"+String(oDate.getSeconds()).padLeft(2, '0')
					+" "+oDate.getMilliseconds();
	var nElapseTime = (oDate.getTime() - nStartTime)/1000;
	
	var sMsg = "";
	// studio 실행시에만 transaction 실행 log 표시
	if (nexacro.getEnvironmentVariable("evRunMode") == "S") {
		if (errorCode == 0)
		{
			sMsg = "gfnCallback : svcID>>"+oSvcId.svcId+ ",  svcUrl>>"+oSvcId.svcUrl+ ",  errorCode>>"+nErrCode + ", errorMsg>>"+sErrMsg + ", isAsync>>" + oSvcId.isAsync + ", sStartDate>>" + sStartDate + ", sEndDate>>"+sEndDate + ", nElapseTime>>"+nElapseTime;
			trace(sMsg);
		}
		else {
			sMsg = "gfnCallback : svcID>>"+oSvcId.svcId+ ",  svcUrl>>"+oSvcId.svcUrl+ ",  errorCode>>"+nErrCode + ", isAsync>>" + oSvcId.isAsync + ", sStartDate>>" + sStartDate + ", sEndDate>>"+sEndDate + ", nElapseTime>>"+nElapseTime;
			sMsg += "\n==================== errorMsg =======================\n"+errorMsg+"\n==================================================";
			trace(sMsg);
		}
	}
	
	// 에러 공통 처리
	if(nErrCode != 0)
	{
		switch(nErrCode)
		{
			case -1 :
				// 서버 오류입니다.\n관리자에게 문의하세요.
				this.gfnError("msg.server.error");
				
				// return; 서버 에러 와 업무 에러 코드 분리시에 return 처리 결정
				break;
				
			case -2463215:
				//@todo : 임의 에러코드  처리
				//return false;
				break;
		}
	}

	// 화면의 callBack 함수 실행
	if(!this.gfnIsNull(oSvcId.svcId))
	{
		// form에 callback 함수가 있을때
		if (this[oSvcId.callback]) this.lookupFunc(oSvcId.callback).call(oSvcId.svcId, nErrCode, sErrMsg);
	}
};