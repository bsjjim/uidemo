/********************************************************************
*  그리드 관련 공통함수
*  @FileName 	: Grid.js
*  @Creator 	: 양경호 
*  @CreateDate 	: 2022/01/12
*  @Desction    : 그리드 관련 공통함수 모음
************** 소스 수정 이력 ***********************************************
*  date          		Modifier                Description
*******************************************************************************
*  2022/01/12     	        양경호                 최초 생성 
*******************************************************************************
*/

var pForm = nexacro.Form.prototype;

//소트

// Grid Head 에 정렬 상태를 표시할 텍스트 또는 이미지 경로 지정 
pForm.fv_sortMarkerImage = ["theme://images/grd_sortUp.png", "theme://images/grd_sortDown.png","theme://images/grd_filterUp.png","theme://images/grd_filterDown.png","theme://images/grd_filter.png"];// [오름차순표시, 내림차순표시,필터,필터오름차순,필터내림차순]
pForm.fv_sortToggleCancel = true;

/**
 * Grid에 기능 추가
 * @param {Object} obj	- 대상그리드
 * @return N/A
 * @example
 * this.gfnSetGrid(this.grdMain);	
*/
pForm.gfnSetGrid = function(oGrid)
{
   //그리드 기본 설정
   oGrid.set_cellmovingtype("col");
   
   oGrid.addEventHandler("onheadclick",this._gfnOnHeadClick,this)
   oGrid.addEventHandler("onrbuttonup",this._gfnOnRbuttonUp,this)
   oGrid.addEventHandler("onkeydown",this._gfnOnKeyDown,this)
   oGrid.addEventHandler("ondrag",this._gfnOnDrag,this)
   oGrid.addEventHandler("onlbuttonup",this._gfnOnLbuttonUp,this)
   oBindoDs = oGrid.getBindDataset();
   
   oGrid.sort = "true";
   oGrid.filter = "true";
   oGrid.colhide = "true";   
   
   if(!this.gfnIsNull(oGrid.griduserproperty))
   {
	   var sProperty = oGrid.griduserproperty;
	   
	   if(sProperty.indexOf("!sort") > -1) oGrid.sort = "false";
	   if(sProperty.indexOf("!filter") > -1) oGrid.filter = "false";
	   if(sProperty.indexOf("!colhide") > -1) oGrid.colhide = "false";
   }

   var nHeadCnt = oGrid.getCellCount("head");
   var sHeadText;
   for(var i=0; i<nHeadCnt; i++)
   {
       var sHeadText = oGrid.getCellProperty("head" , i, "text");
	   
	   switch(sHeadText)
	   {
	       case "theme://images/flag.png" : this._gfnGrioDsetDefault(oGrid,oBindoDs,"status",i);  break;
		   case "선택 " : this._gfnGrioDsetDefault(oGrid,oBindoDs,"checkbox",i);  break;
		   case "No" : this._gfnGrioDsetDefault(oGrid,oBindoDs,"no",i);  break;
	   }
   }
   
    oBindoDs.addEventHandler("onrowsetchanged",this._gfnoDsGridBind_onrowsetchanged,this);
    oBindoDs.addEventHandler("oncolumnchanged",this._gfnoDsGridBind_oncolumnchanged,this);
   
}

pForm._gfnOnDrag = function(obj,e)
{
	obj.set_cursor("move");
}

pForm._gfnOnLbuttonUp = function(obj,e)
{
	obj.set_cursor("");
}
/**
 * Grid에 기능 추가(addCol..)
 * @param {Object} oGrid	- 대상그리드
 * @param {Object} oDs	- 대상데이터셋
 * @param {Array} sProp	- 기능
 * @return N/A
 * @example
 * this._gfnGridCheckboxNoStatusAdd(this.grdMain, this.oDsList, [checkbox,no,status]);	
*/
pForm._gfnGrioDsetDefault = function (oGrid, oDs, sProp, nCellIdx)
{	

	//체크박스
	if( sProp == "checkbox")
	{
	
	}
	//번호
	if( sProp == "no")
	{
		oGrid.setCellProperty("body", nCellIdx, "text","expr:currow+1");
		oGrid.setCellProperty("body", nCellIdx, "textAlign","center");

	}
	//상태
	if ( sProp == "status")
	{	
		
		if(this.gfnIsNull(oDs.getColumnInfo("GUBUN"))) oDs.addColumn("GUBUN", "STRING", 1);
		
		var sExpr = "expr:comp.parent.gfnRowStatImg(GUBUN)";
		
		oGrid.setCellProperty("head", nCellIdx, "textAlign","center");
		oGrid.setCellProperty("body", nCellIdx, "displaytype", "expr:dataset.getRowType(currow) != 1 ? 'imagecontrol' : ''");
		oGrid.setCellProperty("body", nCellIdx, "text", sExpr);		
		oGrid.setCellProperty("body", nCellIdx, "textAlign","center");

	}	
};

pForm._gfnOnHeadClick = function(obj,e)
{
	var sType = obj.getCellProperty("head", e.cell, "displaytype");
	
	if (sType == "checkboxcontrol")
	{
		//head display type이 checkbox일 경우 all/none check기능추가
		this._gfnHeadCheckSelectAll(obj, e);
	}
	else
	{
		//sort
		if(obj.sort == "true")
		{
			var multiple = false;
			if ( e.ctrlkey ) multiple = true;// Ctrl 키		
			// 정렬 상태 변경이 성공하면 정렬을 실행한다.
			var rtn = this._gfnGridSetSortStatus(obj, e.cell, multiple);
			if(rtn)	this._gfnGridExecuteSort(obj);
		}
	}	
}

pForm._gfnOnRbuttonUp = function(obj,e)
{	
	var oGridPopup = this.pdvGridPopup;
	
	if(this.gfnIsNull(oGridPopup))
	{
		oGridPopup = new PopupDiv("pdvGridPopup", 0, 0, 152, 308, null, null);
		this.addChild("pdvGridPopup", oGridPopup); 
		oGridPopup.show();
		oGridPopup.set_async(false);
		oGridPopup.set_url("Comm::GridFilter.xfdl");
	}
	
	if(e.row != -1) return;
	
	// 대상 그리드와 셀 정보를 추가
	oGridPopup.grid = obj;
	oGridPopup.cellindex = e.cell;
	oGridPopup.rowindex = e.row;
	
	var oRect = obj.getCellRect(e.row,e.cell);
	
	oGridPopup.form.fnInit();
	oGridPopup.trackPopupByComponent(obj, oRect.left, oRect.bottom);
}

pForm._gfnOnKeyDown = function(obj,e)
{

}

pForm._gfnoDsGridBind_onrowsetchanged = function(obj,e)
{
	if(e.reason == "12") this.gfnSetGridRowType(obj, e.row);
}

pForm._gfnoDsGridBind_oncolumnchanged = function(obj,e)
{
	if(e.columnid != "_chk" ) this.gfnSetGridRowType(obj, e.row);
}

pForm.gfnSetGridRowType = function(oDs,nRow,sColumnNm)
{
	if(this.gfnIsNull(sColumnNm)) sColumnNm = "GUBUN";

	switch  (oDs.getRowType(nRow))
	{
		case 1:	oDs.setColumn(nRow, sColumnNm, ""); break; //normal
		case 2:	oDs.setColumn(nRow , sColumnNm, "I"); break; //insert
		case 4:
			if(oDs.getColumn(nRow , sColumnNm) != "D")
			{
				oDs.setColumn(nRow , sColumnNm, "U");
			}
			break;	//delete
			
		case 8:	oDs.setColumn(nRow , sColumnNm, "D"); break;
		default: oDs.setColumn(nRow , sColumnNm, ""); break;
	}    
}

/**
 * 그리드 Row 상태 이미지 반환
 * @param {string} sRowStat	- 대상그리드
 * @return imageCss
 * @example
 * this.gfnRowStatImg(GUBUN);	
*/
pForm.gfnRowStatImg = function(sRowStat)
{				  
    var rtnImg = "";
	switch (sRowStat) {
		case "I" : rtnImg = "theme://images/ico_flag_add.png";	break;
		case "U" : rtnImg = "theme://images/ico_flag_mod.png";	break;
		case "D" : rtnImg = "theme://images/ico_flag_del.png";	break;
	}   
	
	return rtnImg;
}

/**
 * 그리드의 상태표시를 해주기 위한 데이터셋 AddRow (단,데이터셋에 _chk,GUBUN 컬럼이 존재해야함)
 * @param {object} oDs	- 데이터셋
 * @return rowposition
 * @example
 * var nRow = this.gfnAddRow(this.dsList);	
*/
pForm.gfnAddRow = function(oDs)
{				  

	if(this.gfnIsNull(oDs.getColumnInfo("_chk"))) return;
	if(this.gfnIsNull(oDs.getColumnInfo("GUBUN"))) return;
	var aRows = new Array();
	
	if(oDs.rowcount == 0)
	{
	    oDs.addRow();
		aRows[0] = 0;
	}
	else
	{
		aRows = oDs.extractRows( "_chk == '1'" );
		
		if(aRows.length > 0)
		{
			for (var i=0; i<aRows.length; i++) 
			{
				oDs.insertRow(aRows[i]);
				this.gfnSetGridRowType(oDs, aRows[i], "GUBUN");		   
			}
		}
		else
		{
			oDs.insertRow(0);
			this.gfnSetGridRowType(oDs, 0, "GUBUN");	
			aRows[0] = 0;
		}
	}
	
	this.gfnChkClear(oDs);
	
	return aRows;
}

/**
 * 그리드의 체크박스 초기화 (_chk 컬럼이 존재해야함)
 * @param {object} oDs	- 데이터셋
 * @return rowposition
 * @example
 * var nRow = this.gfnAddRow(this.dsList);	
*/
pForm.gfnChkClear = function(oDs)
{
    if(this.gfnIsNull(oDs.getColumnInfo("_chk"))) return;
	
    for(var i=0; i<oDs.rowcount; i++)
	{
	   oDs.setColumn(i,"_chk","0");
	}
}
/**
 * 그리드의 상태표시를 해주기 위한 데이터셋 DeleteRow  (_chk 컬럼이 존재해야함)
 * @param {object} oDs	- 데이터셋
 * @return N/A
 * @example
 * this.gfnDeleteRow(this.dsList);	
*/
pForm.gfnDeleteRow = function(oDs)
{				  
	var nRowcnt =  oDs.getRowCount() -1; 
	if(this.gfnIsNull(oDs.getColumnInfo("_chk"))) return;
	if(this.gfnIsNull(oDs.getColumnInfo("GUBUN"))) return;
	
	var sChkColId  = "_chk";
	var sStatColId = "GUBUN";
	var sDeleteYn  = "N";
	
	if(this.gfnIsNull(oDs.getColumnInfo(sStatColId))) sDeleteYn = "Y";  //CRUD 컬럼값 없을경우 조회데이터도 행삭제 

	for(var i=nRowcnt; i >= 0 ; i--)
	{
		if( oDs.getColumn(i, sChkColId) == 1)
		{
			if(oDs.getRowType(i)  == "2" || sDeleteYn == "Y")
			{
				oDs.deleteRow(i);
			}
			else
			{
				if(oDs.getColumn(i, sStatColId) != "D")	oDs.setColumn(i,sStatColId,"D");
			}
		}
	}
	
	this.gfnChkClear(oDs);
}

/**
 * CURD가 표현된 데이터셋의 Row의 정보를 Reset한다. (_chk컬럼이 있는 데이터셋의 체크된 항목기준)
 * @param {object} oDs	- 데이터셋
 * @return N/A
 * @example
 * this.gfnResetRow(this.dsList);	
*/
pForm.gfnResetRow = function(oDs)
{				
	if(this.gfnIsNull(oDs.getColumnInfo("_chk"))) return;
	if(this.gfnIsNull(oDs.getColumnInfo("GUBUN"))) return;
	if(oDs.rowcount == 0) return;
	
	var aRows = oDs.extractRows( "_chk == '1'" );
	
	if(aRows.length == 0) return;
	
	for (var i=0; i<aRows.length; i++) 
	{
		for(var k=0,size=oDs.colcount-oDs.getConstCount(); k<size; k++)
		{
			oDs.setColumn(aRows[i], k, oDs.getOrgColumn(aRows[i],k));
		}   
	}

	this.gfnChkClear(oDs);
}

/**
 * @class  그리드헤드클릭이벤트 내부함수 (헤드클릭시 체크 ALL/None)
 * @param {Object} obj - 대상그리드
 * @param {Evnet}  e	   - 헤드클릭이벤트
 * @return  N/A
 * @example
 * this._gfnHeadCheckSelectAll(obj, e); //ALL CHECK
 */
pForm._gfnHeadCheckSelectAll = function (obj, e)
{
	if(obj.readonly == true) return;
	
	var sType;
	var sChk;
	var sVal;
	var sChkVal;
	var oDs;
	var nHeadCell  = e.cell;
	var nBodyCell;
	var nSubCnt = obj.getSubCellCount("head", nHeadCell);

	oDs  = obj.getBindDataset();
	
	if(oDs.getRowCount() < 1) return;
	
	if(obj.getCellCount("body") != obj.getCellCount("head")) {
		nBodyCell = parseInt(obj.getCellProperty("head", nHeadCell, "col"));
	} else {
		nBodyCell = e.cell;
	}
	sChkVal = obj.getCellProperty("body", nBodyCell, "text");
	sChkVal = sChkVal.toString().replace("bind:", "");
		
	// Merge한 셀이 없는 경우
	sType = obj.getCellProperty("head", nHeadCell, "displaytype");

	if(sType != "checkboxcontrol") {
		return;
	}

	// Head셋팅
	sVal = obj.getCellProperty("head", nHeadCell, "text");

	if (sVal == "1" ){
		obj.setCellProperty("head", nHeadCell, "text", "0");
		var bodyCellIndex = this._gfnGridGetBodyCellIndex(obj, nHeadCell);
		// body cell index 에 해당하는 바인드 컬럼명
		var columnName = this._gfnGridGetBindColumnNameByIndex(obj, bodyCellIndex);
		if(columnName == "gridcmmcheck") {
			 sChk="";
		}else{
			sChk="0";
		}
	}
	//1이외 (0 or undefined 포함)
	else {
		obj.setCellProperty("head", nHeadCell, "text", "1");
		sChk="1";
	}
	
	
	// Body셋팅
	oDs.set_enableevent(false);
	for(var i=0 ; i< oDs.rowcount ; i++) {
		oDs.setColumn(i, sChkVal, sChk);
	}
	oDs.set_enableevent(true);
};

/**
 * @class head cell에 match되는 body cell을 얻어온다
 * @param {Object}  grid 대상 Grid Component
 * @param {Number} eadCellIndex head cell index
 * @return{Number}  body cell index
 * @example
 * this._gfnGridSetSortStatus(obj, e.cell, multiple);	
 */ 
pForm._gfnGridSetSortStatus = function(grid, headCellIndex, isMultiple, sortStatus, bodyCellIndex)
{
	// head cell index 에 해당하는 body cell index
	if( this.gfnIsNull(bodyCellIndex)){
		bodyCellIndex = this._gfnGridGetBodyCellIndex(grid, headCellIndex);
	}
	if ( bodyCellIndex < 0 ) return false;
	
	// body cell index 에 해당하는 바인드 컬럼명
	var columnName = this._gfnGridGetBindColumnNameByIndex(grid, bodyCellIndex);
	if ( this.gfnIsNull(columnName) ){
		trace("Check Grid body cell bind value");
		return false;
	}
	
	if ( this.gfnIsNull(isMultiple) ) isMultiple = false;
	if ( this.gfnIsNull(sortStatus) ) sortStatus = -1;
	
	// 대상 grid 에 정렬정보를 가지는 사용자 속성 확인/추가
	if ( this.gfnIsNull(grid.sortInfos) ){
		grid.sortInfos = {};
	}
	
	// 정렬대상컬럼 (순서중요)
	if ( this.gfnIsNull(grid.sortItems) ){
		grid.sortItems = [];
	}
	
	var sortInfos = grid.sortInfos,
		sortItems = grid.sortItems,
		sortInfo = sortInfos[columnName],
		sortItem,
		status;
	
	if ( this.gfnIsNull(sortInfo) )
	{
		var headText = grid.getCellText(-1, headCellIndex);
		
		// executeSort에서 정렬 표시를 위해 cell index 가 필요한데
		// cell moving 될 경우 index는 변하므로 cell object 를 참조하여 값을 얻어온다. 		
		var refCell = this._gfnGridGetGridCellObject(grid, "head", headCellIndex);
		sortInfo = sortInfos[columnName] = { status: 0, text: headText, refCell: refCell};
	}
	// set sort status
	if ( isMultiple ) {		
		status = sortInfo.status;
		if ( sortStatus == -1 ) {
			if ( status == 0 ) {
				sortInfo.status = 1;
			} 
			else if ( status == 1 ) {
				sortInfo.status = 2;
			} 
			else if ( status == 2 ) {
				sortInfo.status = ( this.fv_sortToggleCancel ? 0 : 1);
			}
		}
		else {
			sortInfo.status = sortStatus;
		}
	}else {
		for (var p in sortInfos) {
			if ( sortInfos.hasOwnProperty(p) )
			{
				sortInfo = sortInfos[p];
				if ( p == columnName ) {
					status = sortInfo.status;
					if ( sortStatus == -1 ) {
						if ( status == 0 ) {
							sortInfo.status = 1;
						} 
						else if ( status == 1 ) {
							sortInfo.status = 2;
						} 
						else if ( status == 2) {
							sortInfo.status = ( this.fv_sortToggleCancel ? 0 : 1);
						}
					}else {
						sortInfo.status = sortStatus;
					}
				}else {
					sortInfo.status = 0;
				}
				if ( sortInfo.status == 0 ){
					for (var j=0, len2=sortItems.length; j<len2; j++) {
						if ( sortItems[j] !== columnName ) {
							sortItems.splice(j, 1);
							break;
						}
					}
				}
			}
		}
	}
	
	// 컬럼정보 등록
	var hasItem = false;
	for (var i=0, len=sortItems.length; i<len; i++) {
		if ( sortItems[i] == columnName ) {
			hasItem = true;
			break;
		}
	}	
	if ( !hasItem ){
		sortItems.push(columnName);
	}
	return true;
}; 

pForm._gfnGridGetBodyCellIndex = function(grid, headCellIndex, useColspan) 
{	//, useColspan) 
	if( this.gfnIsNull(useColspan)) useColspan=false;
	// Max Head Row Index
	var maxHeadRow = 0;
	for (var i=0, len=grid.getCellCount("head"); i<len; i++) {
		var row = grid.getCellProperty("head", i, "row");
		if (maxHeadRow < row) {
			maxHeadRow = row;
		}
	}
	// Max Body Row Index
	var maxBodyRow = 0;
	for (var i=0, len=grid.getCellCount("body"); i<len; i++) {
		var row = grid.getCellProperty("body", i, "row");
		if (maxBodyRow < row) {
			maxBodyRow = row;
		}
	}
	
	if (maxHeadRow == 0 && maxBodyRow == 0) {
// 		var headcolspan = grid.getCellProperty("head", headCellIndex, "colspan");
// 		var bodycolspan = grid.getCellProperty("body", headCellIndex, "colspan");
// 		
// 		if( headcolspan == bodycolspan ){
// 			return headCellIndex;
// 		}
		useColspan = true;
	}
	
	// Body Row 가 1개 이상일 경우
	// Head의 row 가 Body의 row 보다 클 경우 차이 row 를 뺀 것을 대상으로 찾고
	// Body의 row 가 Head의 row 보다 크거나 같을 경우 row index가 같은 대상을 찾는다.			
	var cellIndex = -1;
	var sRow = -1;
	var nRow = parseInt(grid.getCellProperty("head", headCellIndex, "row"));
	var nCol = parseInt(grid.getCellProperty("head", headCellIndex, "col"));
	var nColspan = parseInt(grid.getCellProperty("head", headCellIndex, "colspan"));				
	
	if (maxHeadRow > maxBodyRow) 
	{
		sRow = nRow - (maxHeadRow - maxBodyRow);
		sRow = (sRow < 0 ? 0 : sRow);
	}
	else 
	{
		sRow = nRow;
	}
	var cRow, cCol, cColspan, cRowspan;
	for (var i=0, len=grid.getCellCount("body"); i<len; i++) 
	{
		cRow = parseInt(grid.getCellProperty("body", i, "row"));
		cCol = parseInt(grid.getCellProperty("body", i, "col"));	
		cColspan = parseInt(grid.getCellProperty("body", i, "colspan"));					
		cRowspan = parseInt(grid.getCellProperty("body", i, "rowspan"));
		if( cRowspan > 1 )
		{
			if ( useColspan ){
				if (sRow >= cRow && nCol <= cCol && cCol < (nCol + nColspan)) 
				{		
					cellIndex = i;
					break;
				}		
			}else{
				if (sRow >= cRow && nCol == cCol && nColspan == cColspan) 
				{		
					cellIndex = i;
					break;
				}
			}
		}else{	
			if ( useColspan ){
				if (sRow == cRow && nCol <= cCol && cCol < (nCol + nColspan)) 
				{		
					cellIndex = i;
					break;
				}		
			}else{
				if (sRow == cRow && nCol == cCol && nColspan == cColspan) 
				{		
					cellIndex = i;
					break;
				}
			}
		}
	}
	return cellIndex;
};

/**
 * @class 소트를 실행한다
 * @param {Object}  grid 대상 Grid Component
 * @return{String}  N/A
 * @example
 * this._gfnGridExecuteSort(obj);	
 */  
pForm._gfnGridExecuteSort = function(obj) 
{
	var sortInfo, 
		sortItem,
		ds = obj.getBindDataset(),
		sortInfos = obj.sortInfos,
		sortItems = obj.sortItems,
		oFilterInfos = ds.filterInfo,
		columnName,
		status,
		cell,
		sortString = "";
		
	if ( this.gfnIsNull(sortInfos) || this.gfnIsNull(sortItems) )
	{
		if(!this.gfnIsNull(oFilterInfos))
		{
		    for(var i=0; i<ds.getColCount(); i++)
			{
				columnName = ds.getColumnInfo(i).id;	
				oFilterInfo = oFilterInfos[columnName];
				if(oFilterInfo != undefined)
				{
					exshow = (oFilterInfo.length > 0) ? "show" : "hide";
					index = obj.getBindCellIndex("body", columnName);
					obj.setCellProperty( "head", index, "expandimage","URL('"+this.fv_sortMarkerImage[4]+"')");
					obj.setCellProperty( "head", index, "expandsize",20);
					obj.setCellProperty( "head", index, "expandshow",exshow);	
					break;
				}
			}
		}
	    return;
	}

	// keystring 조합
	for (var i=0; i<sortItems.length; i++) {
		columnName = sortItems[i];
		sortInfo = sortInfos[columnName];
		status = sortInfo.status;
		cell = sortInfo.refCell;
		
		// 컬럼삭제 등으로 제거될 수 있으므로 실제 column 이 존재하는지
		// 확인하여 없으면 제거해 준다.
		if ( this.gfnIsNull(cell) || obj.getBindCellIndex("body", columnName) < 0 ){
			// 컬럼정보제거
			sortItems.splice(i, 1);
			sortInfos[columnName] = null;
			delete sortInfos[columnName];
			
			i--;
		}else if ( status > 0 ) {
			sortString += (status == 1 ? "+" : "-") + columnName;
		}
	}
	
	
	// keystring 확인
	var curKeyString = ds.keystring;
	var groupKeyString = "";
	
	if ( curKeyString.length > 0 && curKeyString.indexOf(",") < 0 ){
		var sIndex = curKeyString.indexOf("S:");
		var gIndex = curKeyString.indexOf("G:");

		if ( sIndex > -1 ){
			groupKeyString = "";
		}else{
			if ( gIndex < 0 )
			{
				groupKeyString = "G:"+curKeyString;
			}
			else
			{
				groupKeyString = curKeyString;
			}
		}
	}else{
		var temps = curKeyString.split(",");
		var temp;
		for (var i=0,len=temps.length; i<len; i++){
			temp = temps[i];
			if ( temp.length > 0 && temp.indexOf("S:") < 0 ){
				if ( temp.indexOf("G:") < 0 )
				{
					groupKeyString = "G:"+temp;
				}else{
					groupKeyString = temp;
				}
			}
		}
	}
	
	if ( sortString.length > 0 ){
		var sortKeyString = "S:"+sortString;
		
		if ( groupKeyString.length > 0 ){
			ds.set_keystring(sortKeyString + "," + groupKeyString);
		}else{
			ds.set_keystring(sortKeyString);
		}
		
		obj.sortKeyString = sortKeyString;
	}else{		
		ds.set_keystring(groupKeyString);
		obj.sortKeyString = "";
	}

	// 정렬표시
	var index, marker;
	
	var bFilter = false;
	for (var p in sortInfos) {
		if ( sortInfos.hasOwnProperty(p) )
		{
			sortInfo = sortInfos[p];	
			
			oFilterInfo = (this.gfnIsNull(oFilterInfos)) ? [] : oFilterInfos[p];
			
			if(!this.gfnIsNull(oFilterInfo) && oFilterInfo.length > 0)
			{
				bFilter = true;
			}
			else
			{
				bFilter = false;
			}
			
			cell = sortInfo.refCell;
			if ( cell )
			{
				index = cell._cellidx;
				marker = "";
				exshow = "hide";
				switch(sortInfo.status)
				{
				   case 1 : marker = (bFilter==false) ? this.fv_sortMarkerImage[0] : this.fv_sortMarkerImage[2]; break;
				   case 2 : marker = (bFilter==false) ? this.fv_sortMarkerImage[1] : this.fv_sortMarkerImage[3]; break;
				}
				
				if(!this.gfnIsNull(marker))
				{
					exshow = "show";
				}
				else
				{
					if(bFilter==true)
					{
						marker = this.fv_sortMarkerImage[4];
						exshow = "show";
					}				
				}
				
				obj.setCellProperty( "head", index, "expandimage","URL('"+marker+"')");
				obj.setCellProperty( "head", index, "expandsize",20);
				obj.setCellProperty( "head", index, "expandshow",exshow);
			
			}
		}
	}
	
	if(!this.gfnIsNull(oFilterInfos))
	{
		for (var p in oFilterInfos) 
		{
			if(!sortInfos.hasOwnProperty(p))
			{
				marker = this.fv_sortMarkerImage[4];
				
				exshow = (!this.gfnIsNull(oFilterInfos[p])) ? "show" : "hide";
				index = obj.getBindCellIndex("body", p);
				obj.setCellProperty( "head", index, "expandimage","URL('"+marker+"')");
				obj.setCellProperty( "head", index, "expandsize",20);
				obj.setCellProperty( "head", index, "expandshow",exshow);
			}
		}
	}
};

/**
 * 그리드의 Sort Mark 제거
 * @param {Object} Grid 대상그리드
 * @return N/A
 */  
pForm._gfnClearSortMark = function(obj)
{
	var sortInfos = obj.sortInfos;
	var sortItems = obj.sortItems;
	
	if ( this.gfnIsNull(sortInfos) || this.gfnIsNull(sortItems) ) return;
	
	// 정렬상태 초기화.
	for( var j=0; j<sortItems.length;j++){
		var col = sortItems[j];
		var sortInfo = sortInfos[col];
		sortInfo.status = 0;
	}
	
	// 정렬실행
	this._gfnGridExecuteSort(obj);
	
	// 정보 초기화
	obj.sortInfos = {};
	obj.sortItems = [];
};

/**
 * @class body cell index로 binding 된 컬럼명을 얻어온다.
 * @param {Object}  grid 대상 Grid Component
 * @param {Number} eadCellIndex head cell index
 * @return{String} column id
 * @example
 * this._gfnGridGetBindColumnNameByIndex(obj, e.cell);	
 */  
pForm._gfnGridGetBindColumnNameByIndex = function(obj, index) 
{
	var text = "";
	var columnid = "";
	var subCell = obj.getCellProperty("body", index, "subcell");
	if ( subCell > 0 ){
		text = obj.getSubCellProperty("body", index, 0, "text");
	}
	else{
		text = obj.getCellProperty("body", index, "text");
	}
	
	if ( !this.gfnIsNull(text) ){
		if ( text.search(/^BIND\(/) > -1 ) {	
			columnid = text.replace(/^BIND\(/, "");
			columnid = columnid.substr(0, columnid.length-1);
		} 
		else if ( text.search(/^bind:/) > -1 ) {
			columnid = text.replace(/^bind:/, "");
		}
	}
	return columnid;
};

/**
 * Cell object 를 반환 (Grid 내부 속성이므로 get 용도로만 사용)
 * @param {Grid} grid 대상 Grid Component
 * @param {string} band 얻고자 하는 cell 의 band (head/body/summ);
 * @param {number} index 얻고자 하는 cell 의 index
 * @return {object} cell object
 */
pForm._gfnGridGetGridCellObject = function(obj, band, index)
{
	// 내부속성을 통해 얻어온다.
	var refCell;
	var format = obj._curFormat;
	if (format){
		if ( band == "head" ){
			refCell = format._headcells[index];
		}
		else if ( band == "body" ){
			refCell = format._bodycells[index];
		}
		else if ( band == "summ" || band == "summary" ){
			refCell = format._summcells[index];
		}
	}
	return refCell;
};