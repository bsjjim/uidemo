/********************************************************************
*  컴포넌트 
*  @FileName 	: Comp.js
*  @Creator 	: 작성자 
*  @CreateDate 	: 2022/01/12
*  @Desction    : 설명
************** 소스 수정 이력 ***********************************************
*  date          		Modifier                Description
*******************************************************************************
*  2022/01/12     	        작성자                 최초 생성 
*******************************************************************************
*/


var pForm = nexacro.Form.prototype;

/**
 * 당 콤포넌트의 form으로 부터의 경로를 구하는 함수
 * @param {Object} obj - 콤포넌트
 * @return {String} 해당 콤포넌트의 form으로 부터의 경로
 */
pForm.gfnGetCompId = function (obj)
{
	var sCompId = obj.name;
	var objParent = obj.parent;
	
	while (true)
	{
		//trace("" + objParent + " / " + objParent.name);
		if (objParent instanceof nexacro.ChildFrame )
		{
			break;
		}
		else {
			sCompId = objParent.name + "." + sCompId;
		}
		objParent = objParent.parent;		
	}
	return sCompId;
}

/**
 * nexacro Component 여부 Check
 * @param {Object} value - 체크할 Object	
 * @return {boolean}
 */
pForm.gfnIsNexaComponent = function(value) 
{
	if ( value === null || value === undefined  ) return false;
	
	return value instanceof nexacro.Component;
};

/**
 * Div 확장을 위한 Div및 버튼 속성 수정
 * @param {String} sType - Div의 속성을 변경할 타입 before to after (left,right,top,bottom)
 * @param {Number} nPosition - 변경값
 * @param {Object} oDiv - 대상Div
 * @param {Object} oBtn - 대상버튼
 * @return N/A
 */
pForm.gfnDivExpand = function(sType,nPosition,oDiv,oBtn)
{
    if(this.gfnIsNull(sType)) return;
	if(this.gfnIsNull(oDiv)) return;
	if(this.gfnIsNull(oBtn)) return;
	
	if(sType.indexOf("-") < 0) return;
	
	var sOrgType = sType.split("-")[0];
	var sToType = sType.split("-")[1];
	
	if(this.gfnIsNull(oDiv.expandOrigin))
	{
		oBtn.set_cssclass("btn_Block_expand2");
		oBtn.set_text("축소");	
		oDiv.bringToFront();
		oDiv.expandOrigin = oDiv[sOrgType];
		if(sOrgType != sToType) oDiv["set_"+sOrgType]("");
		oDiv["set_"+sToType](nPosition);
	}
	else
	{
		oBtn.set_cssclass("btn_Block_collapse2");
		oBtn.set_text("확장");	
		if(sOrgType != sToType) oDiv["set_"+sToType]("");
		oDiv["set_"+sOrgType](oDiv.expandOrigin);
		oDiv.expandOrigin =  "";
	}
}

/**
 * 조회영역 확장을 위한 공통 스크립트
 * @param {Object} oBtn - 대상버튼 (조회영역의 + - 버튼)
 * @param {Object} oDiv - 대상Div
 * @param {boolean} bHalf - 하프영역 조회인지 여부 (default : false)
 * @return N/A
 */
pForm.gfnDivSearchExpand = function(oBtn,oDiv,bHalf)
{
    if(this.gfnIsNull(oBtn)) return;
	if(this.gfnIsNull(oDiv)) return;
	if(this.gfnIsNull(bHalf)) bHalf = false;
	
	var nCollapseHeight = (bHalf == true) ? 164 : 97;
	
	if(this.gfnIsNull(oDiv.expandOrigin))
	{
		oBtn.set_cssclass("btn_SA_expand");
		oDiv.expandOrigin = oDiv.height;
		oDiv.set_height(nCollapseHeight);
		oDiv.set_cssclass("div_SA_collapse");
	}
	else
	{
		oBtn.set_cssclass("btn_SA_collapse");
		oDiv.set_height(oDiv.expandOrigin);
		oDiv.set_cssclass("div_SA");
		oDiv.expandOrigin = "";
	}
	
	this.resetScroll();
}

/**
 * 특정영역 확장을 위한 공통 스크립트
 * @param {Object} oBtn - 대상버튼 (조회영역의 + - 버튼)
 * @return N/A
 */
pForm.gfnDivEctExpand = function(oBtn)
{
    if(this.gfnIsNull(oBtn)) return;
	
	oDiv = oBtn.parent.parent;
	
	var nHeight = 52; 
	
	if(this.gfnIsNull(oDiv.expandOrigin))
	{
	    oBtn.set_cssclass("btn_Block_expand");
		oBtn.set_text("확장");
		oDiv.expandOrigin = oDiv.height;
		oDiv.set_height(nHeight);
	}
	else
	{
	    oBtn.set_cssclass("btn_Block_collapse");
		oBtn.set_text("축소");
		oDiv.set_height(oDiv.expandOrigin);
		oDiv.expandOrigin = "";
	}
	
	this.resetScroll();
}