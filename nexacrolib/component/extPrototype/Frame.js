/********************************************************************
*  Frame에 적용되는 공통스크립트
*  @FileName 	: Frame.js
*  @Creator 	: 양경호 
*  @CreateDate 	: 2022/01/12
*  @Desction    : Frame 또는 Form에서 사용되는 공통스크립트
************** 소스 수정 이력 ***********************************************
*  date          		Modifier                Description
*******************************************************************************
*  2022/01/12     	        양경호                 최초 생성 
*******************************************************************************
*/

var pForm  = nexacro.Form.prototype;

pForm.jvMenuId = "MENUID";
pForm.jvMenuNo = "MENUNO";
pForm.jvMenuNm = "MENUNM";
pForm.jvMenuLv = "MENULV";
pForm.jvMenuUrl = "CLA_NM";
pForm.jvWinId = "WIN_ID";

/**
* form open 시 초기 처리
* @param {Object} obj - 화면
* @return N/A
* @example 
* this.gfnFormOnLoad(this);
*/
pForm.gfnFormOnLoad = function(oForm)
{
	// Component 초기화 처리
	this.gfnInitComp(oForm);
};

/**
* form open 시 Component 초기화 처리
* @param {Object} obj - 화면
* @return N/A
* @example 
* this.gfnInitComp(this);
*/
pForm.gfnInitComp = function(oForm)
{
	//trace("================ gfnInitComp objForm : " + objForm.name);
	var aComp = oForm.components;
	var nLength = aComp.length;

	for (var i=0; i<nLength; i++)
	{
		//trace("================ arrComp[i] : " + arrComp[i]);
		if (aComp[i] instanceof nexacro.Div)
		{
			// URL로 링크된 경우에는 존재하는 경우에는 해당 링크된 Form Onload에서 처리하도록 한다.
			if (this.gfnIsNull(aComp[i].url)) this.gfnInitComp(aComp[i].form);
		}
		else if (aComp[i] instanceof nexacro.Tab)
		{
			var nPages = aComp[i].tabpages.length;
			
			for (var j=0; j<nPages;j++)
			{	
				// URL로 링크된 경우에는 존재하는 경우에는 해당 링크된 Form Onload에서 처리하도록 한다.
				if (this.gfnIsNull(aComp[i].tabpages[j].url)) this.gfnInitComp(aComp[i].tabpages[j].form);
			}
		}
		else
		{
			// Grid 처리
			if (aComp[i] instanceof nexacro.Grid) {
				this.gfnSetGrid(aComp[i]);
			}
		}
	}
};

/**
 * @description 각 화면에서 단축키 지정
*/
pForm.gfnOnkeydown = function(obj, e)
{
	//trace("e.ctrlkey : " + e.ctrlkey + " / e.keycode : " + e.keycode);
	
	// 디버그 창 : Ctrl + Q
	if (e.ctrlkey && e.keycode == 81)
	{
		// 운영환경에서는 실행 방지
		//if (nexacro.getEnvironmentVariable("evRunMode") == "R") return;
		
		var oArg = {};
		var oOption = {popuptype:"modeless", title:"디 버 그",width:"1080",height:"703"};
		this.gfnOpenPopup("debugging","cmm::cmmDebug.xfdl",oArg,"",oOption);	
	}
};

/**
 * MenuId 또는 Url로 화면 오픈하는 함수
 * @param {Object} oObj 
 * @return N/A
 * @example 
 */
pForm.gfnCall = function(sVal,oArgs)
{		
	var oApp  = pForm.gfnGetApplication();
	var gdsMenu = oApp.gdsMenu;				//메뉴 dataset	
	var gdsOpen = oApp.gdsOpenMenu;			//오픈된 메뉴 dataset	
	

    var sMenuId = gdsMenu.lookup(this.jvMenuId,sVal,this.jvMenuId); 
	
	if (this.gfnIsNull(sMenuId)){
		sMenuId = gdsMenu.lookup(this.jvMenuUrl,sVal,this.jvMenuId);
	}	
	
	if(this.gfnIsNull(sMenuId))
	{
		this.gfnAlert("잘못된 메뉴또는 경로입니다.");
		return;
	}
	
	var sWinId = gdsOpen.lookup(this.jvMenuId, sMenuId, this.jvWinId);

	if (!this.gfnIsNull(sWinId))
	{
		oApp.avMdiFrame.form.fnActiveFrame(sWinId);
		return;
	}
	
	//오픈된 화면 개수 체크 글로벌변수 gvMdiMaxCnt에 설정된 개수만큼만 오픈될수 있게 제한	
	if(parseInt(oApp.gvMdiMaxCnt) <= gdsOpen.getRowCount())
	{    
		this.gfnAlert(oApp.gvMdiMaxCnt +"개 초과하여 화면을 열수 없습니다");
		return;
	}
	
	this.gfnNewMdi(sMenuId,oArgs);
};

/**
 * gdsOpenMenu의 해당 Row의 정보를 기준으로 신규 윈도우 화면을 생성하고 open 시킴
 * @param {String} sMenuId - menuId
 * @param {Number} nRow - gdsOpenMenu의rowpostion
 * @param {Object} oArgs - arguments
 * @return N/A
 */
pForm.gfnNewMdi = function(sMenuId,oArgs)
{	
	var oApp   = pForm.gfnGetApplication();
	var gdsOpen  = oApp.gdsOpenMenu;		//열린 dataset
	var gdsMenu  = oApp.gdsMenu;
	var sWinId    = "win" + sMenuId + "_" + gdsOpen.getRowCount() + "_" + parseInt(Math.random() * 1000);		
	var sPageUrl = gdsMenu.lookupAs(this.jvMenuId, sMenuId, this.jvMenuUrl);
	var sMenuNo = gdsMenu.lookupAs(this.jvMenuId, sMenuId, this.jvMenuNo);
	
	sPageUrl =  sPageUrl.replace(".XFDL",".xfdl");
	// 화면 loading 시간 측정
	var oDate = new Date();
	var nStartTime = oDate.getTime();
    var sStartDate = oDate.getYear()
						+"-"+String(oDate.getMonth()).padLeft(2, '0')
						+"-"+String(oDate.getDate()).padLeft(2, '0')
						+" "+String(oDate.getHours()).padLeft(2, '0')
						+":"+String(oDate.getMinutes()).padLeft(2, '0')
						+":"+String(oDate.getSeconds()).padLeft(2, '0')
						+" "+oDate.getMilliseconds();
	oApp.nStartTime = nStartTime;
	oApp.sStartDate = sStartDate;
	
	var sMenuNm  = gdsMenu.lookupAs(this.jvMenuId, sMenuId, this.jvMenuNm);
	
	if(this.gfnIsNull(sPageUrl)) return;		//pageURl 이 없으면 return
	this.gfnSetOpenMenuDs(sWinId, sMenuId);	// 열린메뉴 화면 삽입

	var oNewWin = new ChildFrame;
	oNewWin.init(sWinId, 0, 0, oApp.avWorkFrame.getOffsetWidth() - 0, oApp.avWorkFrame.getOffsetHeight() - 0);
	oApp.avWorkFrame.addChild(sWinId, oNewWin);

	oNewWin.set_dragmovetype("all");
	oNewWin.set_showtitlebar(false);
	oNewWin.set_resizable(true);
	oNewWin.set_openstatus("maximize");
	oNewWin.set_titletext(sMenuNm);
	oNewWin.set_showcascadetitletext(false);
	oNewWin.winId = sWinId;
	oNewWin.menuId = sMenuId;
	oNewWin.menuNo = sMenuNo;
	oNewWin.menuNm = sMenuNm;
	oNewWin.pageUrl = sPageUrl;
	oNewWin.oArgs = oArgs;
	oNewWin.set_formurl("Frame::WorkForm.xfdl");

	oApp.avMdiFrame.form.fnAddTab(sWinId,sMenuNm);   //MDI영역에 탭추가
	oApp.avStatusFrame.form.staStatusText.set_text(""); //하단 메시지 초기화
	oNewWin.show();	
};

/**
 * 열린화면 데이터셋에 추가
 * @param {String} sWinId
 * @param {String} sMenuId
 * @return N/A
 */
pForm.gfnSetOpenMenuDs = function(sWinId, sMenuId)
{
	var oApp  = pForm.gfnGetApplication();
	var gdsOpen = oApp.gdsOpenMenu ;  //열린 dataset
	var nRow = gdsOpen.addRow();
	gdsOpen.setColumn(nRow, this.jvWinId, sWinId);
	gdsOpen.setColumn(nRow, this.jvMenuId, sMenuId);
};

/**
 * 화면의 아규먼트를 아규먼트명으로 가져오는 함수
 * @param {String} 	sName : winKey, menuId, menuNm, pageUrl, oArgs
 * @return String
 */
pForm.gfnGetArgument = function(sName)
{
	return this.getOwnerFrame()[sName];
};

/**
 * 서버경로 반환
 * @param none
 * @return String
 */
pForm.gfnGetServerUrl = function()
{
	var urlPath = "";
    if (system.navigatorname == "nexacro") 
	{
	    var objEnv = nexacro.getEnvironment();
		urlPath = objEnv.services["svcUrl"].url;
	}else{
		urlPath = window.location.protocol + "//" + window.location.host;
		urlPath+="/nexacro/";
	}
	//trace("urlPath : " + urlPath);
	return urlPath;
};

/**
 * 상태바 메시지 표현
 * @param none
 * @return String
 */
pForm.gfnSetStatusMsg = function(sMsg)
{
    var oFrame = this.getOwnerFrame();
	var oApp  = pForm.gfnGetApplication();
	if(!this.gfnIsNull(oFrame.opener))
	{
	   if(oFrame.showstatusbar == true)
	   {
	       oFrame.statusbar.statustext.set_text(sMsg);
	   }
	}
    else
	{
		oApp.avStatusFrame.form.staStatusText.set_text(sMsg);
	}
};

/**
 * 현재 실행된 어플리케이션의 Application 오브젝트를 반환하는 메소드
 * @param  none
 * @return Object
 */
pForm.gfnGetApplication = function()
{
	return nexacro.getApplication();
};