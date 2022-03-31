/********************************************************************
*  팝업 관련 공통함수
*  @FileName 	: Popup.js
*  @Creator 	: 양경호 
*  @CreateDate 	: 2022/01/12
*  @Desction    : 팝업 관련 공통함수 모음
************** 소스 수정 이력 ***********************************************
*  date          		Modifier                Description
*******************************************************************************
*  2022/01/12     	        작성자                 최초 생성 
*******************************************************************************
*/

var pForm = nexacro.Form.prototype;


/**
 * 팝업오픈
 * @param {String} sPopupId	- 팝업ID
 * @param {String} sUrl	 - 팝업URL
 * @param {String} [oArg] - 전달값
 * @param {String} [sPopupCallback] - 팝업콜백
 * @param {Object} [oOption] - 팝업옵션
 *	oOption.top : 상단 좌표 
 *	oOption.left : 좌측 좌표 
 *	oOption.width : 넓이
 *	oOption.height : 높이
 *	oOption.popuptype : 팝업종류(modal:showModal, modeless:application.open) (default : modal)
 *	oOption.layered : 투명 윈도우 
 *	oOption.opacity : 투명도
 *  oOption.statusbar : 상태바 (default : false)
 *	oOption.autosize : autosize
 * @return N/A
 * @example
 * this.gfnOpenPopup(this);
 */
pForm.gfnOpenPopup = function (sPopupId, sUrl, oArg, oOption, sPopupCallback)
{
    var oApp = this.gfnGetApplication();
	var nLeft = -1;
	var nTop = -1;
	var nWidth = -1;
	var nHeight = -1;
	var bShowTitle = true;	
	var bShowStatus = false;	
	var sPopupType = "modal";
	var bLayered = false;
	var nOpacity = 100;
	var bAutoSize = false;
	var bResizable = false;
	
	//callback함수(명)을 전달하지 않아도 기본명이 선언되어 있다면 기본명을 사용하도록 기본셋팅
	var sPopupCallback = (this.gfnIsNull(sPopupCallback) && this["fnPopupCallback"]) ? "fnPopupCallback" : sPopupCallback;
				
	var sTitleText = "";
	
	for (var key in oOption) 
	{
       if (oOption.hasOwnProperty(key)) 
	   {
            switch (key) 
			{
				case "top":				
					nTop = parseInt(oOption[key]);
					break;
				case "left":
					nLeft = parseInt(oOption[key]);
					break;
				case "width":
					nWidth = parseInt(oOption[key]);
					break;
				case "height":
					nHeight = parseInt(oOption[key]);
					break;
				case "popuptype":
					sPopupType = oOption[key];
					break;
				case "layered":
					bLayered = oOption[key];
					break;
				case "opacity":
					nOpacity =oOption[key];
					break;
				case "autosize":
					bAutoSize = oOption[key];
					break;
				case "titlebar":
					if (""+oOption[key] == "false")	bShowTitle = false;		
					break;
				case "title":					
					sTitleText = oOption[key];	
					break;	
				case "statusbar":					
					if (""+oOption[key] == "true")	bShowStatus = true;		
					break;						
			}	
        }
    }

	var sOpenalign = "";
	if (nLeft == -1 && nTop == -1) 
	{		
		sOpenalign = "center middle";
		if (system.navigatorname == "nexacro") {
			var curX = oApp.mainframe.left;
			var curY = oApp.mainframe.top;
		}
		else{
			var curX = window.screenLeft;
			var curY = window.screenTop;
		}
		
        nLeft   =  curX + (oApp.mainframe.width / 2) - Math.round(nWidth / 2);
	    nTop    = curY + (oApp.mainframe.height / 2) - Math.round(nHeight / 2);
	} 
	else {
		nLeft   =  this.getOffsetLeft() + nLeft;
		nTop   =  this.getOffsetTop() + nTop;
	}
		
	if(nWidth == -1 || nHeight == -1)
	{
	    bAutoSize = true;
	}
	
	// modeless를 위해 팝업 Type 및 callBack함수 지정
	if (this.gfnIsNull(oArg) == true) oArg = {};
	oArg.popupType = sPopupType;
	oArg.popupId   = sPopupId;
	oArg.callback  = sPopupCallback;
	
	var objParentFrame = this.getOwnerFrame();

    if(sPopupType == "modeless")
    {
        var sOpenStyle= "showtitlebar=true showstatusbar=false showontaskbar=true showcascadetitletext=false resizable=true autosize="+bAutoSize+" titletext='"+sTitleText+"'";
		var arrPopFrame = nexacro.getPopupFrames();

		if (arrPopFrame[sPopupId]) {	
			if (system.navigatorname == "nexacro") {
				arrPopFrame[sPopupId].setFocus();
			} else {	
				arrPopFrame[sPopupId]._getWindowHandle().focus();
			}
		}
		else {
			nexacro.open(sPopupId,sUrl,objParentFrame,oArg,sOpenStyle,nLeft, nTop, nWidth, nHeight, this);
		}
    }
	else 
	{
		var newChild = new nexacro.ChildFrame;
		newChild.init(sPopupId, nLeft, nTop, nWidth, nHeight, null, null, sUrl);
		
		newChild.set_dragmovetype("all");
		newChild.set_showcascadetitletext(false);
		newChild.set_showtitlebar(bShowTitle);      //titlebar는 안보임
		newChild.set_autosize(bAutoSize);	
		if(!this.gfnIsNull(sTitleText)) newChild.set_titletext(sTitleText);
		newChild.set_showstatusbar(bShowStatus);    //statusbar는 안보임
		newChild.set_openalign(sOpenalign);
		newChild.set_layered(bLayered);
		newChild.set_titlebarheight(30);		
		newChild.set_statusbarheight(30);
		newChild.set_overlaycolor("RGBA(0, 0, 0, 0.2)");
		newChild.showModal(objParentFrame, oArg, this, sPopupCallback);
	}
};


/**
 * 팝업화면에서 창 닫기
*/
pForm.gfnClosePopup = function(objRtn)
{
	var oFrame = this.getOwnerFrame();
	
	// 팝업이 modeless 일때
	if (oFrame.popupType == "modeless") 
	{
		var sPopupId  = oFrame.popupId;
		var sCallBack = oFrame.callback;

		// callBack 함수가 있을 때
		if (!this.gfnIsNull(sCallBack)) 
		{	
		
			//2018.10.05 mkn : callback 함수object로 파라미터 전달시 바로 호출
			if (typeof(sCallBack) == "function") {
				sCallBack.call(this.opener, sPopupId, objRtn);
			}
			else {
				this.opener.lookupFunc(sCallBack).call(sPopupId, objRtn);
			}
		}
		
		this.close();
	}
	else
	{
		// 팝업창 닫기
		this.close(objRtn);	
	}
};

/**
 * 메세지 치환 후 완성된 메시지 리턴
 * @param {String} sMsgId - 메세지ID	
 * @param {Array}  arrArg - 메세지에 치환될 부분은 "{0~N}"이 되고 치환값은 배열로 넘김 
 * @return {String}
 */
pForm.gfnMsg = function(sMsgId, aArg) 
{
    var oApp = pForm.gfnGetApplication();
	if(oApp.gdsMessage.findRow("msgId", sMsgId) < 0) return false;
	var sColumn  = "msgText";
	
	var sMsg = oApp.gdsMessage.lookup("msgId", sMsgId, "msgText");

	// 줄바꿈 변경
	sMsg = sMsg.replace(/\\n/g, String.fromCharCode(10));
	sMsg =  this.gfnConvertMsg(sMsg, aArg);
	
	return sMsg;
};

/**
 *  메세지 치환
 * @param {String} msg - 메세지	
 * @param {Array} values - 메세지에 치환될 부분은 "{0~N}"이 되고 치환값은 배열로 넘김 
 * @return {String}
 */
pForm.gfnConvertMsg = function(msg, values) 
{
    return msg.replace(/\{(\d+)\}/g, function() {
        return values[arguments[1]];
    });
};

/**
 * 메세지팝업오픈
 * @param {String} sMsgId - 메세지ID	
 * @param {Array} arrArg - 메세지에 치환될 부분은 "{0~N}"이 되고 치환값은 배열로 넘김 
 * @param {String} [sPopId] - 팝업ID(하나의 callback함수에서 중복된 메시지 처리를 할 경우 PopId구분을 위해 unique한 ID 반드시 사용)
 * @param {String} [sCallback] - 팝업콜백 (default : fnMsgCallback)
 * @return N/A
 * @example
 * this.gfnMsgPopup(sMsgId,aArgs,"A","fnMsgCallback","test","추가메시지");
 */
pForm.gfnMsgPopup = function (sMsgId, aArg, sMsgType, sCallback, sPopId, sAddMsg)
{
    if(this.gfnIsNull(sMsgId)) return;
	
    var oApp = pForm.gfnGetApplication();
	
	var sMsg = "";
	if(oApp.gdsMessage.findRow("msgId", sMsgId) < 0)
	{
		sMsg = sMsgId;
		
		if(this.gfnIsNull(sMsgType)) sMsgType =  "A";
	}
	else
	{
		sMsg = this.gfnMsg(sMsgId, aArg);
		if(this.gfnIsNull(sMsgType)) sMsgType = oApp.gdsMessage.lookup("msgId", sMsgId, "msgType");	
	}
	
	var sCallback = (this.gfnIsNull(sCallback)) ? "fnMsgCallback" : sCallback;
	
	var sMsgUrl ="";
	
	switch(sMsgType) {
		case "A":
			sMsgUrl = "Comm::PopupAlert.xfdl";
			break;
		case "E":
			sMsgUrl = "Comm::PopupError.xfdl";
			break;			
		case "C":
			sMsgUrl = "Comm::PopupConfirm.xfdl";
			break;
	}
	
	if( this.gfnIsNull(sPopId) ) sPopId = this.gfnGetUniqueId("msg_");
	
	var oArg = {pvMsg:sMsg,pvAddMsg:sAddMsg};
	var oOption = {titlebar:"false"};	
	
	this.gfnOpenPopup(sPopId,sMsgUrl,oArg,oOption,sCallback);
};

/**
 * 메시지팝업 Alert (전용)
 * @param {String} sMsgId - 메세지ID	
 * @param {Array} arrArg - 메세지에 치환될 부분은 "{0~N}"이 되고 치환값은 배열로 넘김 
 * @param {String} [sPopId] - 팝업ID(하나의 callback함수에서 중복된 메시지 처리를 할 경우 PopId구분을 위해 unique한 ID 반드시 사용)
 * @param {String} [sCallback] - 팝업콜백 (default : fnMsgCallback)
 * @return N/A
 * @example
 * this.gfnMsgPopup(sMsgId,aArgs,"A","fnMsgCallback","test","추가메시지");
 */
pForm.gfnAlert = function(sMsgId,aArg,sCallback,sPopId)
{
	this.gfnMsgPopup(sMsgId,aArg,"A",sCallback,sPopId);
}

/**
 * 메시지팝업 Confirm (전용)
 * @param {String} sMsgId - 메세지ID	
 * @param {Array} arrArg - 메세지에 치환될 부분은 "{0~N}"이 되고 치환값은 배열로 넘김 
 * @param {String} [sPopId] - 팝업ID(하나의 callback함수에서 중복된 메시지 처리를 할 경우 PopId구분을 위해 unique한 ID 반드시 사용)
 * @param {String} [sCallback] - 팝업콜백 (default : fnMsgCallback)
 * @return N/A
 * @example
 * this.gfnMsgPopup(sMsgId,aArgs,"A","fnMsgCallback","test","추가메시지");
 */
pForm.gfnConfirm = function(sMsgId,aArg,sCallback,sPopId)
{
	this.gfnMsgPopup(sMsgId,aArg,"C",sCallback,sPopId);
}

/**
 * 메시지팝업 Error (전용)
 * @param {String} sMsgId - 메세지ID	
 * @param {String} sAddMsg - 에러 상세 메시지
 * @param {Array} arrArg - 메세지에 치환될 부분은 "{0~N}"이 되고 치환값은 배열로 넘김 
 * @param {String} [sPopId] - 팝업ID(하나의 callback함수에서 중복된 메시지 처리를 할 경우 PopId구분을 위해 unique한 ID 반드시 사용)
 * @param {String} [sCallback] - 팝업콜백 (default : fnMsgCallback)
 * @return N/A
 * @example
 * this.gfnMsgPopup(sMsgId,aArgs,"A","fnMsgCallback","test","추가메시지");
 */
pForm.gfnError = function(sMsgId,sAddMsg,aArg,sCallback,sPopId)
{
	this.gfnMsgPopup(sMsgId,aArg,"E",sCallback,sPopId,sAddMsg);
}