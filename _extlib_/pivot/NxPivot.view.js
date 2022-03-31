/**
 * NxPivot > View 객체
 * @namespace
 * @class 
 * @param {object} parent parent
 * @param {object} cfg configuration object
 * @memberof! <global>
 */	 
nexacro.NxPivot.View = function(parent, cfg) {
	this.parent = parent;
	this.targetView = cfg.targetView;
	this.panelType = cfg.panelType || "top";
	this.panelTop = null;
	this.isInit = true;
	
	for(var i=this.targetView.form.components.length-1;i>=0;i--){
		var rtn = this.targetView.removeChild(this.targetView.form.components[i].name);
		rtn = null;
	}

	//Create Panel
	this.panel = new nexacro.NxPivot.View.Panel(this, cfg);
	
	//Create Detail
	this.gridView = new nexacro.NxPivot.View.GridView(this, this.targetView);
};

var _pView = nexacro._createPrototype(Object, nexacro.NxPivot.View);
nexacro.NxPivot.View.prototype = _pView;

/**
 * Grid 관련 정보 초기화
 * @name refresh
 * @function
 * @memberOf nexacro.NxPivot.View
 */	
_pView.refresh = function(){
	this.gridView.clearViewInfo();
	this.gridView.clearGridFormat();
};

/**
 * Loadingbar 객체 생성
 * @name createLoadingbar
 * @function
 * @param {object} target pivot component
 * @memberOf nexacro.NxPivot.View
 */	
_pView.createLoadingbar = function(target, loadingimage){
	
	var loadingbar;
	
	if(!target.loadingbar)
	{
		loadingbar = new Div("loadingbar", 0, 0, null, null, 0, 0);	
		target.addChild(loadingbar.name, loadingbar); 
		loadingbar.set_background('url("'+loadingimage+'") no-repeat center center');
		loadingbar.set_visible(false);
		loadingbar.show();
	}else
	{		
		target.loadingbar.set_background('url("'+loadingimage+'") no-repeat center center');
	}
	
	loadingbar = null;
}

/**
 * NxPivot > View > Grid 객체
 * @namespace
 * @class 
 * @param {object} parent parent
 * @param {object} targetView pivot component
 * @memberof! <global>
 */	 
nexacro.NxPivot.View.GridView = function(parent, targetView) {
	
	if(!targetView) {
		//nx.log("The targetView arguments is required.");
		return;
	}

	this.parent = parent;
	
	var gridStyle = this.parent.parent.config.grid.gridClass;
	
	var panel = this.parent.panel.targetPanel;
	var nGridTop = 0;		
	var pivotGridTop = "";
	var pivotGrid;
	
	if(this.parent.panelType=="top"){
		if(!targetView.useitems && !targetView.usetoolbar){
			pivotGridTop = "divPanel:0px";
			pivotGrid = new Grid("grdPivot", 0, nGridTop, null, null, 0, 0);	
		}else{
			pivotGridTop = "divPanel:"+this.parent.panel.pivotGridGap+"px";
			pivotGrid = new Grid("grdPivot", 0, pivotGridTop, null, null, 0, 0);	
		}

		targetView.addChild(pivotGrid.name, pivotGrid); 
		pivotGrid.show();
		pivotGrid.set_cssclass(gridStyle);
		pivotGrid.set_cellsizingtype("col");
		pivotGrid.set_selecttype("cell");
	}
	
	this.parent.targetGrid = this.targetGrid = pivotGrid;
		
	targetView.form.resetScroll();

	nexacro.NxPivot.View.Event.add("onlbuttondown", pivotGrid, this.grdPivot_onlbuttondown, this);
	nexacro.NxPivot.View.Event.add("oncellclick", pivotGrid, this.grdPivot_oncellclick, this);
	nexacro.NxPivot.View.Event.add("oncelldblclick", pivotGrid, this.grdPivot_oncelldblclick, this);
	nexacro.NxPivot.View.Event.add("onselectchanged", pivotGrid, this.grdPivot_onselectchanged, this);
	//pivotGrid.addEventHandler("onlbuttondown", this.grdPivot_onlbuttondown, this);
	
	gridStyle = null;
	panel = null;
	nGridTop = null;	
	pivotGridTop = null;
	pivotGrid = null;
};

var _pGridView = nexacro._createPrototype(Object, nexacro.NxPivot.View.GridView);
nexacro.NxPivot.View.GridView.prototype = _pGridView;

/**
 * View(Grid) 객체 초기화.
 * @name clearGridFormat
 * @function
 * @memberOf nexacro.NxPivot.View.GridView
 */	
_pGridView.clearGridFormat = function(){
	this.targetGrid.set_binddataset("");
	
	var pivotFormatString = "";
	
	pivotFormatString += '<Formats>\n';
	pivotFormatString += '<Format id="default">\n';
	pivotFormatString +=  '</Format>\n';
	pivotFormatString +=  '</Formats>\n';
	
	this.targetGrid.set_formats(pivotFormatString);

	pivotFormatString = "";
	pivotFormatString = null;
};

/**
 * View(Grid) Format 만들기.
 * @name makeGridFormat
 * @function
 * @memberOf nexacro.NxPivot.View.GridView
 */	
_pGridView.makeGridFormat = function(){
	
	var pivot = this.parent.parent;
	var cube = pivot.cube;
	var config = pivot.config;
	var targetView = config.targetView;
	
	var colAxis = cube.colAxisFields;
	var colAxisCount = colAxis.length;
	var rowAxis = cube.rowAxisFields;
	var rowAxisCount = rowAxis.length;
	var columnsstatus;	
	var rowsstatus;
	var colTotalPosition = config.colTotalPosition;
	var rowTotalPosition = config.rowTotalPosition;
	var resultDs = cube.pivotDataSource;
	var pivotFormatString;
	var drillDownColDepthToggleValue = false;
	var drillDownRowDepthToggleValue = false;
	this.targetGrid.set_visible(false);
	
	this.targetGrid.set_binddataset("");
	
	this.clearGridFormat();
	
	this.createViewInfo();
	
	if(colTotalPosition!="none"){
	
		if(this.parent.isInit==false){
			this.drillDownColDepth(0);
		}else{
			columnsstatus = this.parent.panel._getToolbarButton("columnsstatus");
			
			if(columnsstatus)drillDownColDepthToggleValue = columnsstatus._flag;
			
			if(drillDownColDepthToggleValue){
				this.drillDownColDepth(colAxisCount);
			}else{
				this.drillDownColDepth(0);
			}
		}
	}else{
		pivotFormatString = this.makeFormatString();
		
		this.targetGrid.set_formats(pivotFormatString);
	}
	
	if(rowTotalPosition!="none"){
		if(this.parent.isInit==false){
			this.drillDownRowDepth(0, true);
		}else{
			
			rowsstatus = this.parent.panel._getToolbarButton("rowsstatus");
			
			if(rowsstatus)drillDownRowDepthToggleValue = rowsstatus._flag;
			
			if(drillDownRowDepthToggleValue){
				this.drillDownRowDepth(rowAxisCount, true);
			}else{
				this.drillDownRowDepth(0, true);
			}
		}
	}
	
	this.targetGrid.set_binddataset(resultDs.name);

	this.targetGrid.set_visible(true);
	this.parent.isInit = false;
	
	pivot = null;
	cube = null;
	config = null;
	targetView = null;	
	colTotalPosition = null;
	rowTotalPosition = null;
	resultDs = null;
	pivotFormatString = "";
	pivotFormatString = null;
};

/**
 * View(Grid) Format String 만들기.
 * @name makeFormatString
 * @function
 * @return {string} Grid Format String
 * @memberOf nexacro.NxPivot.View.GridView
 */	
_pGridView.makeFormatString = function(){
	try{
		var rowInfo = this.pivotFormat.rowInfo;
		var columnInfo = this.pivotFormat.columnInfo;
		var headBandInfo = this.pivotFormat.headBandInfo;
		var bodyBandInfo = this.pivotFormat.bodyBandInfo;
		var summBandInfo = this.pivotFormat.summBandInfo;
		var colIdx = 0;
		var pivotFormatString = "";
		
		
		pivotFormatString += '<Formats>\n';
		pivotFormatString += '<Format id="default">\n';
		
		
		pivotFormatString += '<Columns>\n';
		for(i=0;i<columnInfo.length;i++){
			if(columnInfo[i].size!=0)
				pivotFormatString += '<Column size="'+columnInfo[i].size+'" band="'+columnInfo[i].band+'" />\n';
		}
		pivotFormatString += '</Columns>\n';
		
		
		pivotFormatString += '<Rows>\n';
		for(i=0;i<rowInfo.length;i++){
			pivotFormatString += '<Row size="'+rowInfo[i].size+'" band="'+rowInfo[i].band+'" />\n';
		}
		pivotFormatString += '</Rows>\n';
		
		
		pivotFormatString += '<Band id="head">\n';
		for(i=0;i<headBandInfo.length;i++){
			pivotFormatString += this.makeCellString(i, headBandInfo);
		}
		pivotFormatString += '</Band>\n';
		
		
		pivotFormatString += '<Band id="body">\n';
		for(i=0;i<bodyBandInfo.length;i++){
			pivotFormatString += this.makeCellString(i, bodyBandInfo);
		}
		pivotFormatString += '</Band>\n';
		
		
		if(summBandInfo.length>0){
			pivotFormatString += '<Band id="summary">';
			for(i=0;i<summBandInfo.length;i++){
				pivotFormatString += this.makeCellString(i, summBandInfo);
			}
			pivotFormatString += '</Band>';
		}
		
		pivotFormatString +=  '</Format>\n';
		pivotFormatString +=  '</Formats>\n';
		
		return pivotFormatString;
	}finally{
		rowInfo = null;
		columnInfo = null;
		headBandInfo = null;
		bodyBandInfo = null;
		summBandInfo = null;
		colIdx = null;
		pivotFormatString = "";
		pivotFormatString = null;
	}
};

/**
 * View(Grid) Format Cell String 만들기
 * @name makeCellString
 * @function
 * @return {string} Grid Cell Format String
 * @memberOf nexacro.NxPivot.View.GridView
 */	
_pGridView.makeCellString = function(idx, bandInfo){
	try{
		var i;
		var baseIsEmpty = NxPivotUtil.isEmpty;
		var pivotFormatString = "";
		var columnInfo = this.pivotFormat.columnInfo;
		var rowAxisCnt  = this.parent.parent.config.rowAxis.length;
		var col;
		var row;
		var colSpan;
		var rowSpan;
		var colIdx = 0;
		
		var showCount = 0;
		
		if(baseIsEmpty(bandInfo[idx].col))col = 0;
		else col = nexacro.toNumber(bandInfo[idx].col);
		
		if(baseIsEmpty(bandInfo[idx].colspan))colSpan = 1;
		else colSpan = nexacro.toNumber(bandInfo[idx].colspan);
		
		if(baseIsEmpty(bandInfo[idx].row))row = 0;
		else row = nexacro.toNumber(bandInfo[idx].row);
		
		if(baseIsEmpty(bandInfo[idx].rowSpan))rowSpan = 0;
		else rowSpan = nexacro.toNumber(bandInfo[idx].rowSpan);
		
		for(i=0;i<col;i++)
		{
			if(columnInfo[i].size!=0){
				colIdx++;
			}
		}
		
		for(i=col;i<col+colSpan;i++){
			if(columnInfo[i].size!=0){
				showCount++;
			}
		}
		
		
		bandInfo[idx].currcol = colIdx;
		
		if(showCount!=0)
		{
			pivotFormatString += '<Cell ';
			
			if(!baseIsEmpty(bandInfo[idx].col))pivotFormatString += 'col="'+colIdx+'" ';
			if(!baseIsEmpty(bandInfo[idx].row))pivotFormatString += 'row="'+bandInfo[idx].row+'" ';
			if(!baseIsEmpty(bandInfo[idx].colspan))pivotFormatString += 'colspan="'+showCount+'" ';
			if(!baseIsEmpty(bandInfo[idx].rowspan))pivotFormatString += 'rowspan="'+bandInfo[idx].rowspan+'" ';
			if(!baseIsEmpty(bandInfo[idx].suppress))pivotFormatString += 'suppress="'+bandInfo[idx].suppress+'" ';
			if(!baseIsEmpty(bandInfo[idx].text))pivotFormatString += 'text="'+bandInfo[idx].text+'" ';
			if(!baseIsEmpty(bandInfo[idx].cssclass))pivotFormatString += 'cssclass="'+bandInfo[idx].cssclass+'" ';
			if(!baseIsEmpty(bandInfo[idx].style))pivotFormatString += 'style="'+bandInfo[idx].style+'" ';
			if(!baseIsEmpty(bandInfo[idx].padding))pivotFormatString += 'padding="'+bandInfo[idx].padding+'" ';
					
			pivotFormatString += '/>\n';
		}
		return pivotFormatString;
	}finally{
		i = null;
		baseIsEmpty = null;
		pivotFormatString = "";
		pivotFormatString = null;
		columnInfo = null;
		rowAxisCnt  = null;
		col = null;
		row = null;
		colSpan = null;
		rowSpan = null;
		colIdx = null;
		showCount = null;
	}
};

/**
 * View(Grid) Format 정보 초기화(JSON)
 * @name clearViewInfo
 * @function
 * @memberOf nexacro.NxPivot.View.GridView
 */	
_pGridView.clearViewInfo = function(){
	this.pivotFormat = null;
};

/**
 * View(Grid) Format 정보 생성(JSON)
 * @name createViewInfo
 * @function
 * @memberOf nexacro.NxPivot.View.GridView
 */	
_pGridView.createViewInfo = function(){
		
	var baseIsEmpty = NxPivotUtil.isEmpty;
	var i, j, k;
	var pivot = this.parent.parent;
	var cube = pivot.cube;
	var resultDs = cube.pivotDataSource;
	
	var config  = pivot.config;
	var rowAxis = config.rowAxis;
	var colAxis = config.colAxis;
	var colAxisCnt  = colAxis.length;
	var rowAxisCnt  = rowAxis.length;
	
	var colTotalPosition = config.colTotalPosition; //부분합 표시위치
	var rowTotalPosition = config.rowTotalPosition; //부분합 표시위치
	var colGrandtotalPosition = config.colGrandtotalPosition; // 총합 표시
	var rowGrandtotalPosition = config.rowGrandtotalPosition; // 총합 표시
	
	var gridStyle = pivot.config.grid;
	var rowHeight = gridStyle.itemHeight;
	var headHeight = gridStyle.headHeight;
	var bodyHeight = gridStyle.bodyHeight;
	var summHeight = gridStyle.summHeight;
	
	var defaultColumnName = "";
	var pivotFormatString = "";
	
	this.pivotFormat = {
							columnInfo : [],
							rowInfo : [],
							headBandInfo : [],
							bodyBandInfo : [],
							summBandInfo : [],
							colIndex : rowAxisCnt
						}
	var rowInfo = this.pivotFormat.rowInfo;
	var columnInfo = this.pivotFormat.columnInfo;
	var headBandInfo = this.pivotFormat.headBandInfo;
	var bodyBandInfo = this.pivotFormat.bodyBandInfo;
	var summBandInfo = this.pivotFormat.summBandInfo;
	
	for (i=0; i<colAxisCnt; i++){
		rowInfo[rowInfo.length] = {size:headHeight, band:"head"};
		
		if ( defaultColumnName.length > 0 ){
			defaultColumnName += "_";
		}
		defaultColumnName += colAxis[i].id;
	}
	
	rowInfo[rowInfo.length] = {size:headHeight, band:"head"};
			
	if ( rowGrandtotalPosition==="first" && resultDs.getRowCount() > 0 ){
	
		rowInfo[rowInfo.length] = {size:headHeight, band:"head"};
		
		this.makeRowGrandTotal(rowGrandtotalPosition, colGrandtotalPosition);
	}
	
	rowInfo[rowInfo.length] = {size:bodyHeight, band:"body"};
	
	this.makeRowAxis();
	
	if ( colGrandtotalPosition=="first" && resultDs.getRowCount() > 0 ){
		this.makeColGrandTotal(colGrandtotalPosition);
	}
	
	this.makeColAxis();
	this.makeValues(defaultColumnName);
			
	if ( colGrandtotalPosition=="last" && resultDs.getRowCount() > 0 ){
		this.makeColGrandTotal(colGrandtotalPosition);
	}
	if ( rowGrandtotalPosition==="last" && resultDs.getRowCount() > 0 ){
		rowInfo[rowInfo.length] = {size:summHeight, band:"summ"};
		this.makeRowGrandTotal(rowGrandtotalPosition, colGrandtotalPosition);
	}	
	
	baseIsEmpty = null;
	i = null;
	j = null;
	k = null;
	pivot = null;
	cube = null;
	resultDs = null;
	config = null;
	rowAxis = null;
	colAxis = null;
	colAxisCnt = null;
	rowAxisCnt = null;
	colTotalPosition = null;
	rowTotalPosition = null;
	colGrandtotalPosition = null;
	rowGrandtotalPosition = null;
	gridStyle = null;
	rowHeight = null;
	headHeight = null;
	bodyHeight = null;
	summHeight = null;
	defaultColumnName = null;
	pivotFormatString = "";
	pivotFormatString = null;
	rowInfo = null;
	columnInfo = null;
	headBandInfo = null;
	bodyBandInfo = null;
	summBandInfo = null;
};

/**
 * View(Grid) Format ColAxis 정보 만들기(JSON)
 * @name makeColAxis
 * @function
 * @memberOf nexacro.NxPivot.View.GridView
 */	
_pGridView.makeColAxis = function(){
	var i;
	
	var baseIsEmpty = NxPivotUtil.isEmpty;
	
	var pivot = this.parent.parent;
	var style = pivot.config;
	var grdStyle = style.grid;
	
	var config = pivot.config;
	var allMemberName = config.allMemberName
	var allMemberDisplayWithOwnName = config.totalText;
	var colTotalPosition = config.colTotalPosition;
	
	var rowAxis = config.rowAxis;
	var colAxis = config.colAxis;
	var values = config.values;
	
	var colAxisCnt = colAxis.length;
	var rowAxisCnt = rowAxis.length;
	var valuesAllCnt = values.length;
	
	var cube = pivot.cube;
	var allMemberId = cube.allMemberId;	
	
	var colAxisMembers = cube.colAxisDisplayMembers;
	var colAxisMemberCnt = colAxisMembers.length;
	
	var colTotalPosition = config.colTotalPosition; //부분합 표시위치
			
	var cellMaxCnt;
	
	var col = 0; 
	var row = 0;
	var colspan = 0; 
	var rowspan = 0;
	var curText = "";
	var nextText = "";
	var upperEqual = false;
	var curAll = false;
	var skipCell = {};
	var drillDownStatus = "";
	
	var drillDownCloseClass = grdStyle.drillDownCloseHeadClass;
	var drillDownOpenClass = grdStyle.drillDownOpenHeadClass;
	var drillDownClass = "";
	
	var headBandInfo = this.pivotFormat.headBandInfo;
	
	for(i=0;i<rowAxisCnt;i++)
	{
		headBandInfo[headBandInfo.length] = {
												currcol : null,
												col : i, 
												row : null, 
												colspan : 1, 
												rowspan : (colAxisCnt+1),
												text: rowAxis[i].itemText
											};
	}
	
	if(colTotalPosition=="none"){
		cellMaxCnt = rowAxisCnt + (colAxisMemberCnt*valuesAllCnt);
	}else{
		cellMaxCnt = rowAxisCnt + (colAxisMemberCnt*valuesAllCnt) + valuesAllCnt;
	}
	
	for (i=0; i<colAxisCnt; i++){		
		col = this.pivotFormat.colIndex;
		row = i;
		colspan = 1;
		rowspan = 1;
		
		for (j=0; j<colAxisMemberCnt; j++){
		
			curText = colAxisMembers[j][i];
			if ( j < (colAxisMemberCnt-1) ){
				nextText = colAxisMembers[j+1][i];
				upperEqual = true;
				if ( i > 0 ){
					// 현재와 다음 열에 해당하는 상위 레벨 값과 비교
					if ( colAxisMembers[j][i-1] != colAxisMembers[j+1][i-1] ){
						upperEqual = false;
					}
				}
				
				// 상위 값이 같고 현재 값도 같으면 span 추가
				if ( upperEqual && curText == nextText ){
					colspan += 1;
				}
				else{					
					curAll = false;
	
					if ( curText && curText.length > 1 && curText.substr(1) == allMemberId ){
						for (k=(i+1); k<colAxisCnt; k++){
							if ( baseIsEmpty(colAxisMembers[j][k]) ){
								rowspan += 1;
								skipCell["col_"+j+"_row_"+k] = true;
							}
						}
						if ( allMemberDisplayWithOwnName ){
							curText = NxPivotUtil.replaceBraces(allMemberDisplayWithOwnName, [colAxisMembers[j][i-1]]);

							//curText = colAxisMembers[j][i-1] + " " + allMemberDisplayWithOwnName;
						}
						else{
							curText = allMemberName;
						}
						
						curAll = true;
					}
					else{
						
					}
					
					colspan = colspan * valuesAllCnt;
					
					if ( !skipCell["col_"+j+"_row_"+i] ){
						if(colspan<=valuesAllCnt)drillDownStatus = "child";
						else drillDownStatus = "open";
						
						if(colTotalPosition!="none"){
							if(drillDownStatus=="open")drillDownClass = drillDownCloseClass;
							else if(drillDownStatus=="close")drillDownClass = drillDownOpenClass;
							else drillDownClass = "";
						}else{
							drillDownClass = "";
						}
						
						headBandInfo[headBandInfo.length] = {
																currcol : col,
																col : col, 
																row : row, 
																colspan : colspan, 
																rowspan : rowspan, 
																text: curText, 
																cssclass: drillDownClass,
																drillDownStatus : drillDownStatus
															};
															
					}
					
					col += colspan;
					colspan = 1;
					rowspan = 1;
				}
			}
			else
			{
				curAll = false;
	
				if ( curText && curText.length > 1 && curText.substr(1) == allMemberId ){
					for (k=(i+1); k<colAxisCnt; k++){
						if ( baseIsEmpty(colAxisMembers[j][k]) ){
							rowspan += 1;
							skipCell["col_"+j+"_row_"+k] = true;
						}
					}
					
					if ( allMemberDisplayWithOwnName ){
						curText = NxPivotUtil.replaceBraces(allMemberDisplayWithOwnName, [colAxisMembers[j][i-1]]);
						//curText = colAxisMembers[j][i-1] + " " + allMemberDisplayWithOwnName;
					}
					else{
						curText = allMemberName;
					}
					
					curAll = true;
				}
				else{
					
				}
				
				colspan = colspan * valuesAllCnt;
				
				if ( !skipCell["col_"+j+"_row_"+i] ){
					if(colspan<=valuesAllCnt)drillDownStatus = "child";
					else drillDownStatus = "open";
					
					if(colTotalPosition!="none"){
						if(drillDownStatus=="open")drillDownClass = drillDownCloseClass;
						else if(drillDownStatus=="close")drillDownClass = drillDownOpenClass;
						else drillDownClass = "";
					}else{
						drillDownClass = "";
					}
					
					headBandInfo[headBandInfo.length] = {
															currcol : col,
															col : col, 
															row : row, 
															colspan : colspan, 
															rowspan : rowspan, 
															text: curText, 
															cssclass: drillDownClass,
															drillDownStatus : drillDownStatus
														};
				}
			}
		}
	}
	
	i = null;	
	baseIsEmpty = null;
	pivot = null;
	style = null;
	grdStyle = null;
	config = null;
	allMemberName = null;
	allMemberDisplayWithOwnName = null;
	colTotalPosition = null;
	rowAxis = null;
	colAxis = null;
	values = null;
	colAxisCnt = null;
	rowAxisCnt = null;
	valuesAllCnt = null;
	cube = null;
	allMemberId = null;
	colAxisMembers = null;
	colAxisMemberCnt = null;
	colTotalPosition = null;
	cellMaxCnt = null;
	col = null;
	row = null;
	colspan = null;
	rowspan = null;
	curText = null;
	nextText = null;
	upperEqual = null;
	curAll = null;
	skipCell = null;
	drillDownStatus = null;
	drillDownCloseClass = null;
	drillDownOpenClass = null;
	drillDownClass = null;
	headBandInfo = null;
};

/**
 * View(Grid) Format RowAxis 정보 만들기(JSON)
 * @name makeRowAxis
 * @function
 * @memberOf nexacro.NxPivot.View.GridView
 */	
_pGridView.makeRowAxis = function(){
	
	var i;
	var colWidth;
	var cellStyle = "align:left middle;";
	var rowAxis = this.parent.parent.config.rowAxis;
	var rowAxisCnt = rowAxis.length;
	var rowAxisMembers = this.parent.parent.cube.rowAxisDisplayMembers;
	var columnInfo = this.pivotFormat.columnInfo;
	var bodyBandInfo = this.pivotFormat.bodyBandInfo;
	var cssClass = "";
	var padding = "";
	var config = this.parent.parent.config;
	var rowTotalPosition = config.rowTotalPosition; //부분합 표시위치
	
	for ( i=0; i<rowAxisCnt; i++ ){
		colWidth = rowAxis[i].itemWidth;		
		
		columnInfo[columnInfo.length] =	{
											size : colWidth,
											sizeOrg : colWidth,
											band : "left"
										};
		
		if(rowTotalPosition!="none"){
			if ( i < (rowAxisCnt)) {
				cssClass = "bind:"+"_"+rowAxis[i].id+"_BACKGROUND";
				padding = "0px 0px 0px 15px";
			}else{
				cssClass = "";
				padding = "";
			}
		}else{
			cssClass = "";
			padding = "";
		}
		
		if(i==0){
			bodyBandInfo[bodyBandInfo.length] = {
													text : "bind:"+rowAxis[i].id,
													suppress : (i+1),
													style : cellStyle,
													cssclass : cssClass,
													padding : padding
												};
		}else
		{
			bodyBandInfo[bodyBandInfo.length] = {
													col : i,
													text : "bind:"+rowAxis[i].id,
													suppress : (i+1),
													style : cellStyle,
													cssclass : cssClass,
													padding : padding
												};
		}
		
	}
	
	i = null;
	colWidth = null;
	cellStyle = null;
	rowAxis = null;
	rowAxisCnt = null;
	rowAxisMembers = null;
	columnInfo = null;
	bodyBandInfo = null;
	cssClass = null;
	padding = null;
	config = null;
	rowTotalPosition = null;
};

/**
 * View(Grid) Format Values 정보 만들기(JSON)
 * @name makeValues
 * @function
 * @memberOf nexacro.NxPivot.View.GridView
 */	
_pGridView.makeValues = function(defaultColumnName){
	
	var i, j;
	var columnName;
	var cellStyle = "align:right middle; ";
	var cssclass = "";
	var colAxisMemberCnt = this.parent.parent.cube.colAxisDisplayMembers.length;
	var values = this.parent.parent.config.values;
	var valuesAllCnt = values.length;
	var colAxisCnt = this.parent.parent.config.colAxis.length;
	
	var columnInfo = this.pivotFormat.columnInfo;
	var headBandInfo = this.pivotFormat.headBandInfo;
	var bodyBandInfo = this.pivotFormat.bodyBandInfo;
	var pivotDataSource = this.parent.parent.cube.pivotDataSource
	for (i=0; i<colAxisMemberCnt; i++){
		for (j=0; j<valuesAllCnt; j++){
			
			columnName = defaultColumnName + "_" + i + "_" + values[j].id;
			
			columnInfo[columnInfo.length] =	{
												size : values[j].itemWidth,
												sizeOrg : values[j].itemWidth,
												band : "body"
											};
			
			headBandInfo[headBandInfo.length] = {
													col : this.pivotFormat.colIndex,
													row : colAxisCnt,
													text : values[j].itemText
												};
			
			
			cssclass = "bind:"+columnName+"_CSS";
			
			bodyBandInfo[bodyBandInfo.length] = {
													col : this.pivotFormat.colIndex,
													text : "bind:"+columnName,
													style : cellStyle,
													cssclass : cssclass
												};
												
			this.pivotFormat.colIndex += 1;
		}
	}
	
	i = null;
	j = null;
	columnName = null;
	cellStyle = null;
	colAxisMemberCnt = null;
	values = null;
	valuesAllCnt = null;
	colAxisCnt = null;
	columnInfo = null;
	headBandInfo = null;
	bodyBandInfo = null;
};
 
 /**
 * View(Grid) Format RowGrandTotal 정보 만들기(JSON)
 * @name makeRowGrandTotal
 * @function
 * @memberOf nexacro.NxPivot.View.GridView
 */	
_pGridView.makeRowGrandTotal = function(rowGrandtotalPosition, colGrandtotalPosition){

	var colIndex;
	var bindColumn;
	
	var gridStyle = this.parent.parent.config.grid;
	var rowHeight = gridStyle.itemHeight;
	
	var cellStyle = "align:right middle; ";
	
	var grandTotalText = this.parent.parent.config.grandTotalText;
	
	var rowAxisCnt = this.parent.parent.config.rowAxis.length;
	var colAxisCnt = this.parent.parent.config.colAxis.length;
	var colAxisMemberCnt = this.parent.parent.cube.colAxisDisplayMembers.length;
	
	var values = this.parent.parent.config.values;
	var valuesAllCnt = values.length;
	var headBandInfo = this.pivotFormat.headBandInfo;
	var summBandInfo = this.pivotFormat.summBandInfo;
	if(rowGrandtotalPosition=="first"){
		headBandInfo[headBandInfo.length] = {
												row:(colAxisCnt+1), 
												colspan:rowAxisCnt, 
												text:grandTotalText, 
												style:cellStyle
											};
					
		colIndex = rowAxisCnt;
		
		if(colGrandtotalPosition=="first")
		{
			for (j=0; j<valuesAllCnt; j++){
				bindColumn = "_GRAND_TOTAL_ALL_" + values[j].id	
				
				headBandInfo[headBandInfo.length] = {
													col : colIndex,
													row : (colAxisCnt+1), 
													text : "bind:"+bindColumn, 
													style : cellStyle
												};
												
				colIndex += 1;
			}
		}
		
		for (i=0; i<colAxisMemberCnt; i++){
			for (j=0; j<valuesAllCnt; j++){
				bindColumn = "_GRAND_TOTAL_" + i + "_" + values[j].id	
				headBandInfo[headBandInfo.length] = {
												col : colIndex,
												row : (colAxisCnt+1), 
												text : "bind:"+bindColumn, 
												style : cellStyle
											};
				colIndex += 1;
			}
		}
		
		if(colGrandtotalPosition=="last")
		{
			for (j=0; j<valuesAllCnt; j++){
				bindColumn = "_GRAND_TOTAL_ALL_" + values[j].id	
				
				headBandInfo[headBandInfo.length] = {
													col : colIndex,
													row : (colAxisCnt+1), 
													text : "bind:"+bindColumn, 
													style : cellStyle
												};
												
				colIndex += 1;
			}
		}
		
		
	}else if(rowGrandtotalPosition=="last"){
		summBandInfo[summBandInfo.length] = {
												colspan : rowAxisCnt,
												text : grandTotalText, 
												style : cellStyle
											};
				
		colIndex = rowAxisCnt;
		
		if(colGrandtotalPosition=="first")
		{
			for (j=0; j<valuesAllCnt; j++){
				bindColumn = "_GRAND_TOTAL_ALL_" + values[j].id	
				
				summBandInfo[summBandInfo.length] = {
													col : colIndex,
													text : "bind:"+bindColumn, 
													style : cellStyle
												};
				colIndex += 1;
			}
		}
		
		for (i=0; i<colAxisMemberCnt; i++){
			for (j=0; j<valuesAllCnt; j++){
				bindColumn = "_GRAND_TOTAL_" + i + "_" + values[j].id	
				
				summBandInfo[summBandInfo.length] = {
												col : colIndex,
												text : "bind:"+bindColumn, 
												style : cellStyle
											};
				colIndex += 1;
			}
		}
		
		if(colGrandtotalPosition=="last")
		{
			for (j=0; j<valuesAllCnt; j++){
				bindColumn = "_GRAND_TOTAL_ALL_" + values[j].id	
				
				summBandInfo[summBandInfo.length] = {
													col : colIndex,
													text : "bind:"+bindColumn, 
													style : cellStyle
												};
				colIndex += 1;
			}
		}
	}
	
	colIndex = null;
	bindColumn = null;
	gridStyle = null;
	rowHeight = null;
	cellStyle = null;
	grandTotalText = null;
	rowAxisCnt = null;
	colAxisCnt = null;
	colAxisMemberCnt = null;
	values = null;
	valuesAllCnt = null;
	headBandInfo = null;
	summBandInfo = null;
};

 /**
 * View(Grid) Format ColGrandTotal 정보 만들기(JSON)
 * @name makeColGrandTotal
 * @function
 * @memberOf nexacro.NxPivot.View.GridView
 */	
_pGridView.makeColGrandTotal = function(colGrandtotalPosition){
	
	var i;
	var values = this.parent.parent.config.values;
	var valuesAllCnt = values.length;
	var colAxisCnt = this.parent.parent.config.colAxis.length;
	var rowAxisCnt = this.parent.parent.config.rowAxis.length;
	
	var gridStyle = this.parent.parent.config.grid;
	var rowHeight = gridStyle.itemHeight;
	var cellStyle = "align:right middle; ";
	var columnInfo = this.pivotFormat.columnInfo;
	var headBandInfo = this.pivotFormat.headBandInfo;
	var bodyBandInfo = this.pivotFormat.bodyBandInfo;
	var band = "";
	if(colGrandtotalPosition=="first"){
		band = "body";
	}else if(colGrandtotalPosition=="last"){
		band = "right";
	}
	
	for (i=0; i<valuesAllCnt; i++){
		
		columnInfo[columnInfo.length] =	{
											size : values[i].itemWidth,
											sizeOrg : values[i].itemWidth,
											band : band
										};
		
		headBandInfo[headBandInfo.length] =	{
												col : this.pivotFormat.colIndex,
												rowspan : (colAxisCnt+1),
												text : values[i].itemText
											};
		
		bodyBandInfo[bodyBandInfo.length] =	{
												col : this.pivotFormat.colIndex,
												text : "bind:"+"_GRAND_TOTAL_"+values[i].id,
												style : cellStyle,
												cssclass : "bind:"+"_GRAND_TOTAL_"+values[i].id+"_CSS"
											};
											
		this.pivotFormat.colIndex += 1;
	}
	
	i = null;
	values = null;
	valuesAllCnt = null;
	colAxisCnt = null;
	rowAxisCnt = null;
	gridStyle = null;
	rowHeight = null;
	cellStyle = null;
	columnInfo = null;
	headBandInfo = null;
	bodyBandInfo = null;
	band = null;
};

 /**
 * View(Grid) 영역 내에서 마우스 왼쪽 버튼 클릭 시 발생하는 이벤트
 * Drill Down 버튼 클릭 시 Drill Up/Down 함수 호출
 * @name grdPivot_onlbuttondown
 * @function
 * @param {object} obj Grid Object
 * @param {object} e Event Object
 * @memberOf nexacro.NxPivot.View.GridView
 */	
_pGridView.grdPivot_onlbuttondown = function(obj,e){
	var i;
	var nX;
	var nY;
	var col;
	var row;
	var colSpan;
	var headInfoCol;
	var headInfoColSpan;
	var headInfoRow;
	var headInfoDrillDownStatus;
	var gridStyle = this.parent.parent.config.grid;
	var rowHeight = gridStyle.itemHeight;
	var headHeight = gridStyle.headHeight;
	var bodyHeight = gridStyle.bodyHeight;
	
	var rowAxisCnt = this.parent.parent.config.rowAxis.length;
	var drillDownObj = {left:0, top:0, width:9, height:9};
	var cellArray = e.fromreferenceobject.name.split("_");
	var config = this.parent.parent.config;
	var colTotalPosition = config.colTotalPosition; //부분합 표시위치
	var rowTotalPosition = config.rowTotalPosition; //부분합 표시위치
	
	if(cellArray[1]==-1){
		
		nX = system.screenToClientX(e.fromreferenceobject, e.screenx);
		nY = system.screenToClientY(e.fromreferenceobject, e.screeny);
		
		drillDownObj.top = Math.round(((headHeight)/2)-(drillDownObj.width/2));
		
		bChk = NxPivotUtil.intersectPoint(drillDownObj, nX, nY);
		if(bChk==true&&colTotalPosition!="none"){
			this.drillDownCol(obj, e.cell);
		}
	}else if(cellArray[2]<rowAxisCnt-1)
	{
		nX = system.screenToClientX(e.fromreferenceobject, e.screenx);
		nY = system.screenToClientY(e.fromreferenceobject, e.screeny);
		
		drillDownObj.top = Math.round(((bodyHeight)/2)-(drillDownObj.width/2));
		
		bChk = NxPivotUtil.intersectPoint(drillDownObj, nX, nY);
		
		if(bChk==true&&rowTotalPosition!="none"){
			row = obj.getDatasetRow(e.row);
			this.drillDownRow(obj, e.cell, row);
		}
	}
	
	i = null;
	nX = null;
	nY = null;
	col = null;
	row = null;
	colSpan = null;
	headInfoCol = null;
	headInfoColSpan = null;
	headInfoRow = null;
	headInfoDrillDownStatus = null;
	rowAxisCnt = null;
	drillDownObj = null;
	cellArray = null;
	config = null;
	colTotalPosition = null;
	rowTotalPosition = null;
	rowHeight = null;
	headHeight = null;
	bodyHeight = null;
};

/**
 * View(Grid) 에서 Body 영역의 Cell을 클릭했을 때 발생하는 이벤트
 * NxPivot의 on_fire_ongridcellclick 이벤트 호출
 * @name grdPivot_oncellclick
 * @function
 * @param {object} obj Grid Object
 * @param {object} e Event Object
 * @memberOf nexacro.NxPivot.View.GridView
 */	
_pGridView.grdPivot_oncellclick = function(obj,e){
	var targetView = this.parent.targetView;
	
	targetView.on_fire_ongridcellclick(obj, e);
	
	targetView = null;
};

/**
 * View(Grid) 에서 Body 영역의 Cell을 더블 클릭했을 때 발생하는 이벤트
 * NxPivot의 ongridcelldbclick 이벤트 호출
 * @name grdPivot_oncelldbclick
 * @function
 * @param {object} obj Grid Object
 * @param {object} e Event Object
 * @memberOf nexacro.NxPivot.View.GridView
 */	
_pGridView.grdPivot_oncelldblclick = function(obj,e){
	var targetView = this.parent.targetView;
	
	targetView.on_fire_ongridcelldblclick(obj, e);
	
	targetView = null;
};

/**
 * View(Grid) 에서 선택된 영역이 번경된 후 발생하는 이벤트
 * NxPivot의 ongridselectchanged 이벤트 호출
 * @name grdPivot_onselectchanged
 * @function
 * @param {object} obj Grid Object
 * @param {object} e Event Object
 * @memberOf nexacro.NxPivot.View.GridView
 */	
_pGridView.grdPivot_onselectchanged = function(obj,e){
	var targetView = this.parent.targetView;
	
	targetView.on_fire_ongridselectchanged(obj, e);
	
	targetView = null;
};

 /**
 * ColAxis Drill Up/Dwon 처리
 * @name drillDownCol
 * @function
 * @param {object} obj Grid Object
 * @param {number} cell Select Cell Index
 * @memberOf nexacro.NxPivot.View.GridView
 */	
_pGridView.drillDownCol = function(obj, cell){
	var values = this.parent.parent.config.values;
	var grdStyle = this.parent.parent.config.grid;
	var valuesAllCnt = values.length;
	var columnInfo = this.pivotFormat.columnInfo;
	var headBandInfo = this.pivotFormat.headBandInfo;
	var drillDownCloseClass = grdStyle.drillDownCloseHeadClass;
	var drillDownOpenClass = grdStyle.drillDownOpenHeadClass;
	var colTotalPosition = this.parent.parent.config.colTotalPosition;
	col = obj.getCellProperty("head", cell, "col");
	row = obj.getCellProperty("head", cell, "row");
	
	for(i=0;i<columnInfo.length;i++){
		columnInfo[i].size = columnInfo[i].sizeOrg;
	}
	
	for(i=headBandInfo.length-1;i>=0;i--){
		headInfoCurrCol = headBandInfo[i].currcol;
		headInfoCol = headBandInfo[i].col;
		headInfoColSpan = headBandInfo[i].colspan;
		headInfoRow = headBandInfo[i].row;
		headInfoDrillDownStatus = headBandInfo[i].drillDownStatus;
		
		if(headInfoCurrCol==col&&headInfoRow==row){
			if(headInfoDrillDownStatus=="open"){
				headBandInfo[i].drillDownStatus = "close";
				headBandInfo[i].cssclass = drillDownOpenClass;
				obj.setCellProperty("head", cell, "cssclass", drillDownOpenClass);
			}else if(headInfoDrillDownStatus=="close"){
			
				headBandInfo[i].drillDownStatus = "open";
				headBandInfo[i].cssclass = drillDownCloseClass;
				obj.setCellProperty("head", cell, "cssclass", drillDownCloseClass);
			}
			
			headInfoDrillDownStatus = headBandInfo[i].drillDownStatus;
		}
		
		if(headBandInfo[i].drillDownStatus=="close"){
			if(colTotalPosition=="first")
			{
				for(j=headInfoCol+valuesAllCnt;j<(headInfoCol+headInfoColSpan);j++){
					columnInfo[j].size = 0;
				}
			}else if(colTotalPosition=="last"){
				for(j=headInfoCol;j<(headInfoCol+headInfoColSpan-valuesAllCnt);j++){
					columnInfo[j].size = 0;
				}
			}
		}
	}
	
	//전체 FormatString을 변경
	var pivotFormatString = this.makeFormatString();
	
	this.targetGrid.set_formats(pivotFormatString);
	
	values = null;
	grdStyle = null;
	valuesAllCnt = null;
	columnInfo = null;
	headBandInfo = null;
	drillDownCloseClass = null;
	drillDownOpenClass = null;
	colTotalPosition = null;
	pivotFormatString = "";
	pivotFormatString = null;
};

 /**
 * ColAxis 전체 Drill Up/Dwon 처리
 * @name drillDownColDepth
 * @function
 * @param {number} depth ColAxis Depth
 * @memberOf nexacro.NxPivot.View.GridView
 */	
_pGridView.drillDownColDepth = function(depth){
	
	if(NxPivotUtil.isEmpty(this.pivotFormat)==true)return false;
	
	var config = this.parent.parent.config;
	var colTotalPosition = config.colTotalPosition
	var colAxisCount = config.colAxis.length;
	var values = config.values;
	var valuesAllCnt = values.length;
	
	var grdStyle = this.parent.parent.config.grid;
	var columnInfo = this.pivotFormat.columnInfo;
	var headBandInfo = this.pivotFormat.headBandInfo;
	var drillDownCloseClass = grdStyle.drillDownCloseHeadClass;
	var drillDownOpenClass = grdStyle.drillDownOpenHeadClass;
	
	var panel = this.parent.panel;
	
	if(depth==0){
		panel._setStatusToolbarButton("columnsstatus", false);
	}else if(depth==colAxisCount){
		panel._setStatusToolbarButton("columnsstatus", true);
	}
	
	for(i=0;i<columnInfo.length;i++){
		columnInfo[i].size = columnInfo[i].sizeOrg;
	}
	
	for(i=headBandInfo.length-1;i>=0;i--){
		headInfoCurrCol = headBandInfo[i].currcol;
		headInfoCol = headBandInfo[i].col;
		headInfoColSpan = headBandInfo[i].colspan;
		headInfoRow = headBandInfo[i].row;
					
		if(headInfoRow>=depth){
			if(headBandInfo[i].drillDownStatus=="open"){
			
				headBandInfo[i].drillDownStatus = "close";
				headBandInfo[i].cssclass = drillDownOpenClass;
			}
		}else{
			if(headBandInfo[i].drillDownStatus=="close"){
			
				headBandInfo[i].drillDownStatus = "open";
				headBandInfo[i].cssclass = drillDownCloseClass;
			}
		}
		
		if(headBandInfo[i].drillDownStatus=="close"){
			if(colTotalPosition=="first")
			{
				for(j=headInfoCol+valuesAllCnt;j<(headInfoCol+headInfoColSpan);j++){
					columnInfo[j].size = 0;
				}
			}else if(colTotalPosition=="last"){
				for(j=headInfoCol;j<(headInfoCol+headInfoColSpan-valuesAllCnt);j++){
					columnInfo[j].size = 0;
				}
			}
		}
	}
	
	//전체 FormatString을 변경
	var pivotFormatString = this.makeFormatString();

	this.targetGrid.set_formats(pivotFormatString);
	
	config = null;
	colTotalPosition = null;
	colAxisCount = null;
	values = null;
	valuesAllCnt = null;
	grdStyle = null;
	columnInfo = null;
	headBandInfo = null;
	drillDownCloseClass = null;
	drillDownOpenClass = null;
	panel = null;
	pivotFormatString = "";
	pivotFormatString = null;
};

 /**
 * RowAxis Drill Up/Dwon 처리
 * @name drillDownRow
 * @function
 * @param {object} obj Grid Object
 * @param {number} cell Select Cell Index
 * @param {number} row Select Row Index
 * @memberOf nexacro.NxPivot.View.GridView
 */	
_pGridView.drillDownRow = function(obj, cell, row){
	var i, j, k;
	var grdStyle = this.parent.parent.config.grid;
	var drillDownCloseClass = grdStyle.drillDownCloseHeadClass;
	var drillDownOpenClass = grdStyle.drillDownOpenHeadClass;
	var targetDrillDownClass;
	
	var rowAxis = this.parent.parent.config.rowAxis;
	var rowAxisCount = rowAxis.length;
	var resultDs = this.parent.parent.cube.pivotDataSource;
	var resultCount = resultDs.getRowCountNF();
	
	var rowTotalPosition = this.parent.parent.config.rowTotalPosition
	
	var colId = obj.getCellProperty("body", cell, "text").replace("bind:", "");
	var colIdRowAxis;
	var colIdBackGround;
	
	var rowIdx = resultDs.getColumn(row, "_ORG_ROW");
	
	var targetDrillDownClass = resultDs.getColumnNF(rowIdx, "_"+colId+"_BACKGROUND");
	var targetAllMemberDepth = resultDs.getColumnNF(rowIdx, "_ALL_MEMBER_DEPTH");
	
	var _ALL_MEMBER_DEPTH = "";
	
	var findExprFirst = "1==1";
	var findRowFirst;
	var findExpr;
	var findRow;
	
	resultDs.set_enableevent(false);
	this.targetGrid.set_binddataset("");
	
	if(rowTotalPosition=="first"){
		if(targetDrillDownClass==drillDownCloseClass){
			colIdBackGround = "_"+colId+"_BACKGROUND";
			resultDs.setColumnNF(rowIdx, colIdBackGround, drillDownOpenClass);
			for(i=rowIdx+1;i<resultCount;i++)
			{
				_ALL_MEMBER_DEPTH = resultDs.getColumnNF(i, "_ALL_MEMBER_DEPTH");
				if(NxPivotUtil.isEmpty(_ALL_MEMBER_DEPTH)==false&&_ALL_MEMBER_DEPTH<=targetAllMemberDepth){
					break;
				}else
				{
					resultDs.setColumnNF(i, "_FILTER_YN", "Y");
				}
			}
			
		}else if(targetDrillDownClass==drillDownOpenClass){//펼치기
			colIdBackGround = "_"+colId+"_BACKGROUND";
			resultDs.setColumnNF(rowIdx, colIdBackGround, drillDownCloseClass);
			findRowFirst = resultDs.findRowExprNF("_ALL_MEMBER_DEPTH<='"+targetAllMemberDepth+"'", rowIdx+1);
			
			if(findRowFirst<0)findRowFirst = resultCount;
			
			for(i=rowIdx+1;i<findRowFirst;i++){
				resultDs.setColumnNF(i, "_FILTER_YN", "N");
			}
			
			for(i=rowIdx+1;i<findRowFirst;i++)
			{
				_ALL_MEMBER_DEPTH = resultDs.getColumnNF(i, "_ALL_MEMBER_DEPTH");
				if(NxPivotUtil.isEmpty(_ALL_MEMBER_DEPTH)==false)
				{
					for(j=targetAllMemberDepth-1;j<rowAxisCount-1;j++){
						colIdBackGround = "_"+rowAxis[j].id+"_BACKGROUND";
						if(resultDs.getColumnNF(i, colIdBackGround)==drillDownOpenClass){
							
							findExpr = "_ALL_MEMBER_DEPTH<='"+(j+1)+"'"; 
							break;
						}
					}
					
					if(NxPivotUtil.isEmpty(findExpr)==false){
						findRow = resultDs.findRowExprNF(findExpr, i+1);
						
						if(findRow<0)findRow = resultCount;
						
						for(j=i+1;j<findRow;j++){
							resultDs.setColumnNF(j, "_FILTER_YN", "Y");
						}
						
						i = findRow-1;
						findRow = null;
						findExpr = null;
					}
				}
			}
		}
	}else if(rowTotalPosition=="last"){
		//접기
		if(targetDrillDownClass==drillDownCloseClass){
			colIdBackGround = "_"+colId+"_BACKGROUND";
			resultDs.setColumnNF(rowIdx, colIdBackGround, "");
			for(i=rowIdx;i<resultCount;i++){
				_ALL_MEMBER_DEPTH = resultDs.getColumnNF(i, "_ALL_MEMBER_DEPTH");
				if(NxPivotUtil.isEmpty(_ALL_MEMBER_DEPTH)==false&&rowAxis[_ALL_MEMBER_DEPTH-1].id==colId){
					resultDs.setColumnNF(i, colIdBackGround, drillDownOpenClass);
					break;
				}else{
					resultDs.setColumnNF(i, "_FILTER_YN", "Y");
				}
			}
			
			for(j=0;j<_ALL_MEMBER_DEPTH-1;j++){
				colIdBackGround = "_"+rowAxis[j].id+"_BACKGROUND";
				targetDrillDownClass = resultDs.getColumnNF(rowIdx, colIdBackGround);
				if(NxPivotUtil.isEmpty(targetDrillDownClass)==false){
					resultDs.setColumnNF(rowIdx, colIdBackGround, "");
					resultDs.setColumnNF(i, colIdBackGround, targetDrillDownClass);
				}
			}
			
		}else if(targetDrillDownClass==drillDownOpenClass){//펼치기
			
			for(i=0;i<targetAllMemberDepth;i++){
				colIdRowAxis = rowAxis[i].id;
				findExprFirst += "&&"+colIdRowAxis+"=='"+resultDs.getColumnNF(rowIdx, colIdRowAxis)+"'";
			}
			
			findRowFirst = resultDs.findRowExprNF(findExprFirst);
			
			for(i=findRowFirst;i<rowIdx;i++){
				resultDs.setColumnNF(i, "_FILTER_YN", "N");
			}
			
			for(i=rowIdx-1;i>=findRowFirst;i--){
				for(j=targetAllMemberDepth-1;j<rowAxisCount-1;j++){
					colIdBackGround = "_"+rowAxis[j].id+"_BACKGROUND";
					if(resultDs.getColumnNF(i, colIdBackGround)==drillDownOpenClass){
						findExpr = "1==1";
						for(k=0;k<=j;k++){
							colIdRowAxis = rowAxis[k].id;
							findExpr += "&&"+colIdRowAxis+"=='"+resultDs.getColumnNF(i, colIdRowAxis)+"'"; 
						}
						break;
					}
				}
				
				if(NxPivotUtil.isEmpty(findExpr)==false){
					findRow = resultDs.findRowExprNF(findExpr);

					for(j=i-1;j>=findRow;j--){
						resultDs.setColumnNF(j, "_FILTER_YN", "Y");
					}
					
					i = findRow;
					findRow = null;
					findExpr = null;
				}
			}
			
			colIdBackGround = "_"+rowAxis[targetAllMemberDepth].id+"_BACKGROUND";
			if(targetAllMemberDepth<rowAxisCount-1&&NxPivotUtil.isEmpty(resultDs.getColumnNF(findRowFirst, colIdBackGround))==true){
				colIdBackGround =  "_"+rowAxis[targetAllMemberDepth].id+"_BACKGROUND";
				findExprFirst +="&&"+"("+colIdBackGround+"=='"+drillDownCloseClass+"'||"+colIdBackGround+"=='"+drillDownOpenClass+"')";
				findRowFirst = resultDs.findRowExprNF(findExprFirst);
			}
			
			colIdBackGround = "_"+colId+"_BACKGROUND";
			resultDs.setColumnNF(rowIdx, colIdBackGround, "");
			resultDs.setColumnNF(findRowFirst, colIdBackGround, drillDownCloseClass);
			
			for(j=0;j<targetAllMemberDepth-1;j++){
				colIdBackGround = "_"+rowAxis[j].id+"_BACKGROUND";
				targetDrillDownClass = resultDs.getColumnNF(rowIdx, colIdBackGround);
				if(NxPivotUtil.isEmpty(targetDrillDownClass)==false){
					resultDs.setColumnNF(rowIdx, colIdBackGround, "");
					resultDs.setColumnNF(findRowFirst, colIdBackGround, targetDrillDownClass);
				}
			}
		}
	}
	resultDs.filter(null);
	resultDs.filter("_FILTER_YN=='N'");
	
	this.targetGrid.set_binddataset(resultDs.name);
	resultDs.set_enableevent(true);
	
	
	i = null;
	j = null; 
	k = null;
	grdStyle = null;
	drillDownCloseClass = null;
	drillDownOpenClass = null;
	targetDrillDownClass = null;
	rowAxis = null;
	rowAxisCount = null;
	resultDs = null;
	resultCount = null;
	rowTotalPosition = null;
	colId = null;
	colIdRowAxis = null;
	colIdBackGround = null;
	rowIdx = null;
	targetDrillDownClass = null;
	targetAllMemberDepth = null;
	_ALL_MEMBER_DEPTH = null;
	findExprFirst = null;
	findRowFirst = null;
	findExpr = null;
	findRow = null;
}

 /**
 * RowAxis 전체 Drill Up/Dwon 처리
 * @name drillDownRowDepth
 * @function
 * @param {number} depth RowAxis Depth
 * @param {boolean} bBinddataset set_binddataset("") 처리 여부 true : 처리, false : 미처리
 * @memberOf nexacro.NxPivot.View.GridView
 */
_pGridView.drillDownRowDepth = function(depth, bBinddataset){
	
	if(NxPivotUtil.isEmpty(this.pivotFormat)==true)return false;
	
	var i, j, k;
	var grdStyle = this.parent.parent.config.grid;
	var drillDownCloseClass = grdStyle.drillDownCloseHeadClass;
	var drillDownOpenClass = grdStyle.drillDownOpenHeadClass;
	var targetDrillDownClass;
	
	var rowAxis = this.parent.parent.config.rowAxis;
	var rowAxisCount = rowAxis.length;
	var targetDepth = depth+1;
	
	var colId;
	var colIdRowAxis;
	var colIdBackGround;
	
	var resultDs = this.parent.parent.cube.pivotDataSource;
	var resultCount;
	
	var rowTotalPosition = this.parent.parent.config.rowTotalPosition
			
	var _ALL_MEMBER_DEPTH = "";
	
	var findExprFirst = "1==1";
	var findRowFirst;
	var findExpr;
	var findRow;
	
	var panel = this.parent.panel;
	
	if(resultDs.getRowCount()==0)return false;
		
	if(depth==0){
		panel._setStatusToolbarButton("rowsstatus", false);
	}else if(depth==rowAxisCount){
		panel._setStatusToolbarButton("rowsstatus", true);
	}
	
	if(bBinddataset!=true)this.targetGrid.set_binddataset("");
	resultDs.set_enableevent(false);
	
	resultDs.filter(null);
	resultCount = resultDs.getRowCount();
	
	if(rowTotalPosition=="first"){
		for(i=0;i<resultCount;i++){
			for(j=depth;j<rowAxisCount-1;j++){
				colIdBackGround = "_"+rowAxis[j].id+"_BACKGROUND";
				targetDrillDownClass = resultDs.getColumn(i, colIdBackGround);
				
				if(targetDrillDownClass==drillDownCloseClass){
					resultDs.setColumn(i, colIdBackGround, drillDownOpenClass);
				}
			}
			
			for(j=0;j<depth;j++){
				colId = rowAxis[j].id;
				colIdBackGround = "_"+colId+"_BACKGROUND";
				targetDrillDownClass = resultDs.getColumn(i, colIdBackGround);
				
				if(targetDrillDownClass==drillDownOpenClass){
					resultDs.setColumn(i, colIdBackGround, drillDownCloseClass);
				}
			}
			
			_ALL_MEMBER_DEPTH = resultDs.getColumn(i, "_ALL_MEMBER_DEPTH");
			
			if(targetDepth>rowAxisCount-1){
				resultDs.setColumn(i, "_FILTER_YN", "N");
			}else{
				
				if(NxPivotUtil.isEmpty(_ALL_MEMBER_DEPTH)==true||_ALL_MEMBER_DEPTH>targetDepth){
					resultDs.setColumn(i, "_FILTER_YN", "Y");
				}else{
					resultDs.setColumn(i, "_FILTER_YN", "N");
				}
			}
		}
	}else if(rowTotalPosition=="last"){
		for(i=0;i<resultCount;i++){
			for(j=rowAxisCount-2;j>=depth;j--){
				colId = rowAxis[j].id;
				targetDrillDownClass = resultDs.getColumn(i, "_"+colId+"_BACKGROUND");
				targetAllMemberDepth = resultDs.getColumn(i, "_ALL_MEMBER_DEPTH");
				
				if(targetDrillDownClass==drillDownCloseClass){
					colIdBackGround = "_"+colId+"_BACKGROUND";
					resultDs.setColumn(i, colIdBackGround, "");
					for(k=i;k<resultCount;k++){
						_ALL_MEMBER_DEPTH = resultDs.getColumn(k, "_ALL_MEMBER_DEPTH");
						if(NxPivotUtil.isEmpty(_ALL_MEMBER_DEPTH)==false&&rowAxis[_ALL_MEMBER_DEPTH-1].id==colId){
							resultDs.setColumn(k, colIdBackGround, drillDownOpenClass);
							break;
						}else{
							resultDs.setColumn(k, "_FILTER_YN", "Y");
						}
					}
					
					for(l=0;l<_ALL_MEMBER_DEPTH-1;l++){
						colIdBackGround = "_"+rowAxis[l].id+"_BACKGROUND";
						targetDrillDownClass = resultDs.getColumn(i, colIdBackGround);
						if(NxPivotUtil.isEmpty(targetDrillDownClass)==false){
							resultDs.setColumn(i, colIdBackGround, "");
							resultDs.setColumn(k, colIdBackGround, targetDrillDownClass);
						}
					}	
				}
			}
		}
		
		for(j=depth-1;j>=0;j--){
			for(i=0;i<resultCount;i++){
				colId = rowAxis[j].id;
				targetDrillDownClass = resultDs.getColumn(i, "_"+colId+"_BACKGROUND");
				targetAllMemberDepth = resultDs.getColumn(i, "_ALL_MEMBER_DEPTH");
				
				if(targetDrillDownClass==drillDownOpenClass){//펼치기
					
					findExprFirst = "1==1";
					for(k=0;k<targetAllMemberDepth;k++){
						colIdRowAxis = rowAxis[k].id;
						findExprFirst += "&&"+colIdRowAxis+"=='"+resultDs.getColumn(i, colIdRowAxis)+"'";
					}
					
					findRowFirst = resultDs.findRowExpr(findExprFirst);
					
					for(k=findRowFirst;k<i;k++){
						resultDs.setColumn(k, "_FILTER_YN", "N");
					}
					
					for(k=i-1;k>=findRowFirst;k--){
						for(l=targetAllMemberDepth-1;l<rowAxisCount-1;l++){
							colIdBackGround = "_"+rowAxis[l].id+"_BACKGROUND";
							if(resultDs.getColumn(k, colIdBackGround)==drillDownOpenClass){
								findExpr = "1==1";
								for(m=0;m<=l;m++){
									colIdRowAxis = rowAxis[m].id;
									findExpr += "&&"+colIdRowAxis+"=='"+resultDs.getColumn(k, colIdRowAxis)+"'"; 
								}
								break;
							}
						}
						
						if(NxPivotUtil.isEmpty(findExpr)==false){
							findRow = resultDs.findRowExpr(findExpr);
							
							for(l=k-1;l>=findRow;l--){
								resultDs.setColumn(l, "_FILTER_YN", "Y");
							}
							
							k = findRow;
							findRow = null;
							findExpr = null;
						}
					}
					
					colIdBackGround = "_"+rowAxis[targetAllMemberDepth].id+"_BACKGROUND";
					if(targetAllMemberDepth<rowAxisCount-1&&NxPivotUtil.isEmpty(resultDs.getColumn(findRowFirst, colIdBackGround))==true){
						colIdBackGround =  "_"+rowAxis[targetAllMemberDepth].id+"_BACKGROUND";
						findExprFirst +="&&"+"("+colIdBackGround+"=='"+drillDownCloseClass+"'||"+colIdBackGround+"=='"+drillDownOpenClass+"')";
						findRowFirst = resultDs.findRowExpr(findExprFirst);
					}
					
					colIdBackGround = "_"+colId+"_BACKGROUND";
					resultDs.setColumn(i, colIdBackGround, "");
					resultDs.setColumn(findRowFirst, colIdBackGround, drillDownCloseClass);
					
					for(l=0;l<targetAllMemberDepth-1;l++){
						colIdBackGround = "_"+rowAxis[l].id+"_BACKGROUND";
						targetDrillDownClass = resultDs.getColumn(i, colIdBackGround);
						if(NxPivotUtil.isEmpty(targetDrillDownClass)==false){
							resultDs.setColumn(i, colIdBackGround, "");
							resultDs.setColumn(findRowFirst, colIdBackGround, targetDrillDownClass);
						}
					}
				}
			}
		}
	}
	
	resultDs.filter("_FILTER_YN=='N'");
	resultDs.set_enableevent(true);
	if(bBinddataset!=true)this.targetGrid.set_binddataset(resultDs.name);
	
	i = null;
	j = null; 
	k = null;
	grdStyle = null;
	drillDownCloseClass = null;
	drillDownOpenClass = null;
	targetDrillDownClass = null;
	rowAxis = null;
	rowAxisCount = null;
	targetDepth = null;
	colId = null;
	colIdRowAxis = null;
	colIdBackGround = null;
	resultDs = null;
	resultCount = null;
	rowTotalPosition = null;
	_ALL_MEMBER_DEPTH = null;
	findExprFirst = null;
	findRowFirst = null;
	findExpr = null;
	findRow = null;
	panel = null;
}

/**
 * 선택된 Pivot 정보를 조회
 * @name getSelectedPivotData
 * @function
 * @param {number} nRowIdx Grid Select Row Index
 * @param {number} nCellIdx Grid Select Cell Index
 * @param {array} arrValues Value Items List
 * @param {string} sType Target Axis
 * @return {object} rtn Pivot Data Object
 * @memberOf nexacro.NxPivot.View.GridView
 */
 _pGridView.getSelectedPivotData = function(nRowIdx, nCellIdx, arrValues, sType){
	try{
		var obj = this.targetGrid;
		
		var i;
		var j;
		var nRow;
		var config = this.parent.parent.config;
		var cube = this.parent.parent.cube;
		var colAxis = cube.colAxisFields;
		var colAxisCount = colAxis.length;
		var rowAxis = cube.rowAxisFields;
		var rowAxisCount = rowAxis.length;
		
		var values = cube.valueIdList;
		var valuesCount = values.length;
		
		var allMemberId = cube.allMemberId;
		var pivotdatasource = cube.pivotDataSource;
		
		var colAxisDisplayMembers = cube.colAxisDisplayMembers;
		var rowAxisDisplayMembers = cube.rowAxisDisplayMembers;
		var item;
		var member;
		var chkAll = false;
		var selectDs = new Dataset;
		
		var _ALL_MEMBER_DEPTH_COL = 0;
		var _ALL_MEMBER_DEPTH_ROW = pivotdatasource.getColumn(nRowIdx, "_ALL_MEMBER_DEPTH");
		
		var columnId = obj.getCellProperty("body", nCellIdx, "text").replace("bind:", "");
		
		var findColumnId = "";
		var findValue;
		
		var rtn = {
						colAxis : [],
						rowAxis : [],
						values : [],
						dataXML : null
					};
					
		colIdx = pivotdatasource.getColIndex(columnId)-rowAxis.length;
		
		if(colIdx<0)return false;
		
		colIdx = Math.floor(colIdx/valuesCount);
		rowIdx = pivotdatasource.getColumn(nRowIdx, "_ORG_ROW");
		member = cube.colAxisDisplayMembers[colIdx];
		
		if(NxPivotUtil.isEmpty(member)==true)return false;
		
		if(!arrValues)arrValues = values;
		if(!sType)sType = "colAxis";
			
		for(i=0;i<colAxis.length;i++){
			findColumnId += colAxis[i]+"_";
		}
		
		for(i=0;i<member.length;i++){
			if(member[i]&&member[i].indexOf(allMemberId)!=-1)_ALL_MEMBER_DEPTH_COL = i;
		}
				
		for(i=0;i<arrValues.length;i++){
			selectDs.addColumn("values"+i);
			
			item = config.getFieldItem(arrValues[i]);
			rtn.values[rtn.values.length] = item.itemText;
		}
		
		if(sType=="colAxis")
		{
			member = rowAxisDisplayMembers[rowIdx];
			for(i=0;i<member.length;i++){
				if(member[i].indexOf(allMemberId)==-1){
					rtn.rowAxis[rtn.rowAxis.length] = member[i];
				}else{
					break;
				}
			}
			
			if(_ALL_MEMBER_DEPTH_COL==0){
				for(i=0;i<colAxisCount;i++){
					selectDs.addColumn("colAxis"+i);
					
					item = config.getFieldItem(colAxis[i]);
					rtn.colAxis[rtn.colAxis.length] = item.itemText;
				}
				
				for(i=0;i<colAxisDisplayMembers.length;i++){	
					chkAll = false;
					
					member = colAxisDisplayMembers[i];
					for(j=0;j<member.length;j++){
						if(member[j]&&member[j].indexOf(allMemberId)!=-1){
							chkAll = true;
						}
					}
					
					if(chkAll==false){
						nRow = selectDs.addRow();
						for(j=0;j<member.length;j++){
							selectDs.setColumn(nRow, "colAxis"+j, member[j]);
						}
						
						for(j=0;j<arrValues.length;j++){
							findValue = pivotdatasource.getColumn(nRowIdx, findColumnId + i + "_"+arrValues[j]);
							selectDs.setColumn(nRow, "values"+j, findValue);
						}
					}
				}
			}else{
				for(i=0;i<_ALL_MEMBER_DEPTH_COL;i++){
					selectDs.addColumn("colAxis"+i);
					
					item = config.getFieldItem(colAxis[i]);
					rtn.colAxis[rtn.colAxis.length] = item.itemText;
				}
				
				for(i=0;i<colAxisDisplayMembers.length;i++){	
					member = colAxisDisplayMembers[i];
					
					if(member.length>_ALL_MEMBER_DEPTH_COL&&member[_ALL_MEMBER_DEPTH_COL]&&member[_ALL_MEMBER_DEPTH_COL].indexOf(allMemberId)>-1){
						nRow = selectDs.addRow();
						for(j=0;j<_ALL_MEMBER_DEPTH_COL;j++){
							selectDs.setColumn(nRow, "colAxis"+j, member[j]);
						}
						
						for(j=0;j<arrValues.length;j++){
							findValue = pivotdatasource.getColumn(nRowIdx, findColumnId + i + "_"+arrValues[j]);
							selectDs.setColumn(nRow, "values"+j, findValue);
						}
					}	
				}
			}
		}else
		{
			member = colAxisDisplayMembers[colIdx];
			for(i=0;i<member.length;i++){
				if(member[i].indexOf(allMemberId)==-1){
					rtn.colAxis[rtn.colAxis.length] = member[i];
				}else{
					break;
				}
			}
			
			if(_ALL_MEMBER_DEPTH_ROW==null){
				
				for(i=0;i<rowAxisCount;i++){
					selectDs.addColumn("rowAxis"+i);
					
					item = config.getFieldItem(rowAxis[i]);
					rtn.rowAxis[rtn.rowAxis.length] = item.itemText;
				}
				
				for(i=0;i<rowAxisDisplayMembers.length;i++){	
					
					if(pivotdatasource.getColumnNF(i, "_ALL_MEMBER_DEPTH")==_ALL_MEMBER_DEPTH_ROW){
						member = rowAxisDisplayMembers[i];
						
						nRow = selectDs.addRow();
						for(j=0;j<member.length;j++){
							selectDs.setColumn(nRow, "rowAxis"+j, member[j]);
						}
						
						for(j=0;j<arrValues.length;j++){
							findValue = pivotdatasource.getColumnNF(i, findColumnId + colIdx + "_"+arrValues[j]);
							selectDs.setColumn(nRow, "values"+j, findValue);
						}
					}
				}
			}else{
				for(i=0;i<_ALL_MEMBER_DEPTH_ROW;i++){
					selectDs.addColumn("rowAxis"+i);
					
					item = config.getFieldItem(rowAxis[i]);
					rtn.rowAxis[rtn.rowAxis.length] = item.itemText;
				}
				
				for(i=0;i<rowAxisDisplayMembers.length;i++)	{	
					if(pivotdatasource.getColumnNF(i, "_ALL_MEMBER_DEPTH")==_ALL_MEMBER_DEPTH_ROW){
						member = rowAxisDisplayMembers[i];
						
						nRow = selectDs.addRow();
						for(j=0;j<_ALL_MEMBER_DEPTH_ROW;j++){
							selectDs.setColumn(nRow, "rowAxis"+j, member[j]);
						}
						
						for(j=0;j<arrValues.length;j++){
							findValue = pivotdatasource.getColumnNF(i, findColumnId + colIdx + "_"+arrValues[j]);
							selectDs.setColumn(nRow, "values"+j, findValue);
						}
					}	
				}
			}
		}
		
		rtn.dataXML = selectDs.saveXML();

		return rtn;
	}finally{
		obj = null;
		i = null;
		j = null;
		nRow = null;
		config = null;
		cube = null;
		colAxis = null;
		colAxisCount = null;
		rowAxis = null;
		rowAxisCount = null;
		values = null;
		valuesCount = null;
		allMemberId = null;
		pivotdatasource = null;
		colAxisDisplayMembers = null;
		rowAxisDisplayMembers = null;
		item = null;
		member = null;
		chkAll = null;
		selectDs = null;
		_ALL_MEMBER_DEPTH_COL = null;
		_ALL_MEMBER_DEPTH_ROW = null;
		columnId = null;
		findColumnId = null;
		findValue = null;
		rtn = null;
	}
}
 /**
 * 상세정보 Dataset XML 만들기
 * @name makeDetailDatasetXML
 * @function
 * @param {number} nRowIdx Grid Select Row Index
 * @param {number} nCellIdx Grid Select Cell Index
 * @return {object} rtn Pivot Data Object
 * @memberOf nexacro.NxPivot.View.GridView
 */
_pGridView.makeDetailDatasetXML = function(nRowIdx, nCellIdx){
	try{
		var obj = this.targetGrid;
		
		if(NxPivotUtil.isEmpty(nRowIdx)) nRowIdx = obj.selectstartrow;
		if(NxPivotUtil.isEmpty(nCellIdx)) nCellIdx = obj.selectstartcol;
		
		var i;
		var config = this.parent.parent.config;
		var cube = this.parent.parent.cube;
		var colAxis = cube.colAxisFields;
		var colAxisCount = colAxis.length;
		var rowAxis = cube.rowAxisFields;
		var rowAxisCount = rowAxis.length;
		
		var values = cube.valueIdList;
		var valuesCount = values.length;
		
		var allMemberId = cube.allMemberId;
		var pivotdatasource = cube.pivotDataSource;
		var dataSource = config.dataSource;
		
		var colIdx;
		var rowIdx;
		var colAxisList;
		var rowAxisList;
		var value;
		var item;
		
		var arrColList = [];
		var strWhereExpr = "1=1";
		
		var columnId = obj.getCellProperty("body", nCellIdx, "text").replace("bind:", "");
		
		var colAxisId;
		var rowAxisId;
		
		var objDsDetail;
		var rtn = {
						colAxis : [],
						rowAxis : [],
						values : [],
						dataXML : null
					};
		
		
		
		for(i=0;i<colAxis.length;i++){
			item = config.getFieldItem(colAxis[i]);
			rtn.colAxis[rtn.colAxis.length] = item.itemText;
		}
		
		for(i=0;i<rowAxis.length;i++){
			item = config.getFieldItem(rowAxis[i]);
			rtn.rowAxis[rtn.rowAxis.length] = item.itemText;
		}
		
		for(i=0;i<values.length;i++){
			item = config.getFieldItem(values[i]);
			rtn.values[rtn.values.length] = item.itemText;
		}
		
		colIdx = pivotdatasource.getColIndex(columnId)-rowAxis.length;
		
		if(colIdx<0)return false;
		
		colIdx = Math.floor(colIdx/valuesCount);
		
		rowIdx = pivotdatasource.getColumn(nRowIdx, "_ORG_ROW");

		colAxisList = cube.colAxisDisplayMembers[colIdx];
		rowAxisList = cube.rowAxisDisplayMembers[rowIdx];
		
		if(NxPivotUtil.isEmpty(colAxisList)==true)return false;
		
		if(NxPivotUtil.isEmpty(rowAxisList)==true)return false;
		
		for(i=0;i<colAxisCount;i++)
		{
			arrColList[arrColList.length] = colAxis[i];
			if(NxPivotUtil.isEmpty(colAxisList[i])==false)
			{
				if(colAxisList[i].indexOf(allMemberId)==-1)
				{
					strWhereExpr += "&&"+colAxis[i]+"=='"+colAxisList[i]+"'";
				}
			}
		}
		
		for(i=0;i<rowAxisCount;i++)
		{
			arrColList[arrColList.length] = rowAxis[i];
			if(NxPivotUtil.isEmpty(rowAxisList[i])==false)
			{
				if(rowAxisList[i].indexOf(allMemberId)==-1)
				{
					strWhereExpr += "&&"+rowAxis[i]+"=='"+rowAxisList[i]+"'";
				}
			}
		}
		
		for(i=0;i<valuesCount;i++)
		{
			if(columnId.indexOf(values[i])==columnId.length-values[i].length)
			{
				arrColList[arrColList.length] = values[i];
			}
		}
		
		strWhereExpr = strWhereExpr.replace("1=1&&", "");
		
		dataSource.filter(null);
		objDsDetail = dataSource.createDataset("dsDetail", arrColList, strWhereExpr);
		rtn.dataXML = objDsDetail.saveXML();
		
		return rtn;
	}finally{
		obj = null;
		nRowIdx = null;
		nCellIdx = null;
		i = null;
		config = null;
		cube = null;
		colAxis = null;
		colAxisCount = null;
		rowAxis = null;
		rowAxisCount = null;
		values = null;
		valuesCount = null;
		allMemberId = null;
		pivotdatasource = null;
		dataSource = null;
		colIdx = null;
		rowIdx = null;
		colAxisList = null;
		rowAxisList = null;
		value = null;
		item = null;
		arrColList = null;
		strWhereExpr = null;
		columnId = null;
		colAxisId = null;
		rowAxisId = null;
		objDsDetail = null;
		rtn = null;
	}
}

_pGridView = null;

_pView = null;

/**
 * NxPivot > View > Panel 객체
 * @namespace
 * @class
 * @param {object} parent 생성 scope
 * @param {object} cfg configuration 객체
 * @memberof! <global>
 */
nexacro.NxPivot.View.Panel = function(parent, cfg) {
	this.parent = parent;
	this.pivot = this.parent.parent;
	this.targetView = cfg.targetView;

	this.targetPanel = null;
	this.targetToolbar = null;

	this.aggDsDatasource = {};
	this.filterCodeDatasource  = {};
	
	this.panelStyle = this.pivot.config.panel;
	this.settingPopStyle = this.pivot.config.settingpopup;
	
	this.commToolbarStyle = this.pivot.config.commtoolbars
	this.commSettingPopup = this.pivot.config.commsettingpopup;

	this.language = this.pivot.message.language[NxPivotUtil.language];
	
	this.panelType = cfg.panelType || "top";
	
	this.usetoolbar = this.targetView.usetoolbar;
	this.commCodeToolbar = this.language.toolbar;
	this.toolbarButtonType = [ this.commCodeToolbar.buttontypes[0].key , this.commCodeToolbar.buttontypes[1].key , this.commCodeToolbar.buttontypes[2].key 
							, this.commCodeToolbar.buttontypes[3].key , this.commCodeToolbar.buttontypes[4].key , this.commCodeToolbar.buttontypes[5].key ];
							
	this.toolbarAreaInfo = {};
	this.toolbarStatusUse = false;
	
	this.useitems = this.targetView.useitems;
	this.commCodeAxis = this.language.axisArea;
	this.axisAreaInfo = {
		axistypes : [ this.commCodeAxis.types[0].key ,this.commCodeAxis.types[1].key ,this.commCodeAxis.types[2].key ,this.commCodeAxis.types[3].key ],
		axistext : [ this.commCodeAxis.types[0].text ,this.commCodeAxis.types[1].text ,this.commCodeAxis.types[2].text ,this.commCodeAxis.types[3].text	]
	};
	this.axisAreaScrollbarWidth = 10;
	this.pivotGridGap = 5;
	
	this.fieldAxisAreaRect = {};
	this.colAxisAreaRect = {};
	this.rowAxisAreaRect = {};
	this.valuesAxisAreaRect = {};
	
	this.itemInfo = { borderRect : [] };
	
	this.fieldsItems = [];
	this.colAxisItems = [];
	this.rowAxisItems = [];
	this.valuesItems = [];
	
	this.ondrag = false;
	this.itemDragFunc = { dragevent : this._compDragEvent,	dropevent : this._compDropEvent	};
	this.dragItem = null;
	this.indicator = null;

	this.setPopupListComp = null;

	this.settingPop = null;
	this.settingPopInfo = {
		data : {},
		oriFilterDataSource : {},
		filterDataSource : {},
		filter : {}
	};
	
	this.settingPopCalendarInfo = {
		locale : NxPivotUtil.language.split("_")[0].toLowerCase() + "_" + NxPivotUtil.language.split("_")[1].toUpperCase(),
		dateformat : "SHORTDATE",
		editformat : "SHORTDATE",
		innerdataset : "",
		backgroundcolumn :  "",
		bordercolumn : "",
		datecolumn : "",
		textcolorcolumn : "",
		usetrailingday : false
	}
	
	this.settingPopComp = {
		popStaItemFilterTit : null,
		popCboItemFilter : null,
		popEdtItemFilterEdit : null,
		popEdtItemSearchTit : null,
		popEdtItemListSearch : null,
		popCalItemEdit : null,
		popGrdItemFilterGrid : null,
		popCalItemStart : null,
		popCalItemEnd : null,
		popBtnSubmit : null,
		popBtnClose : null
	};
	
	this.popGridFormat1 = "<Format id=\"default\">"
                    +"<Columns>"
                    +"  <Column size=\"25\"/>"
                    +"  <Column size=\"152\"/>"
                    +"</Columns>"
                    +"<Rows>"
					+"  <Row size=\"24\" band=\"head\"/>"
                    +"  <Row size=\"24\"/>"
                    +"</Rows>"
					+"<Band id=\"head\">"
					+"<Cell colspan=\"2\" text=\"\" textDecoration=\"underline\"/>"
					+"</Band>"
                    +"<Band id=\"body\">"
                    +"  <Cell text=\"bind:chk\" edittype=\"none\" displaytype=\"checkboxcontrol\"/>"
                    +"  <Cell col=\"1\" text=\"bind:value\"/>"
                    +"</Band>"
					+"</Format>";
	
	this.popGridFormat2 = "<Format id=\"default\">"
                    +"<Columns>"
                    +"  <Column size=\"177\"/>"
                    +"</Columns>"
                    +"<Rows>"
                    +"  <Row size=\"24\"/>"
                    +"</Rows>"
                    +"<Band id=\"body\">"
                    +"  <Cell text=\"bind:value\"/>"
                    +"</Band>"
					+"</Format>";
					
	this.popGridFormat3 = "<Format id=\"default\">"
                    +"<Columns>"
                    +"  <Column size=\"25\"/>"
                    +"  <Column size=\"152\"/>"
                    +"</Columns>"
                    +"<Rows>"
                    +"  <Row size=\"24\"/>"
                    +"</Rows>"
                    +"<Band id=\"body\">"
                    +"  <Cell text=\"bind:chk\" edittype=\"none\" displaytype=\"checkboxcontrol\"/>"
                    +"  <Cell col=\"1\" text=\"bind:value\"/>"
                    +"</Band>"
					+"</Format>";

	this.rowtotalposition = this.targetView.rowtotalposition;
	this.coltotalposition = this.targetView.coltotalposition;
	
	this.autoexcute = false;
	
	this.isAggUpdate = false;
	this.isSortUpdate = false;
	this.isFilterUpdate = false;
	
	this._createPanel(this.targetView, cfg);
};

var _pPanel = nexacro._createPrototype(Object, nexacro.NxPivot.View.Panel);
nexacro.NxPivot.View.Panel.prototype = _pPanel;

/**
 * Panel 생성
 * @name _createPanel
 * @function 
 * @param {object} target Pivot Div 객체
 * @param {object} config configuration 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._createPanel = function(target ,config) {
	this.panelStyle = this.pivot.config.panel;
	this.settingPopStyle = this.pivot.config.settingpopup;	
	
	this.usetoolbar = (this.targetView.usetoolbar.toString()=="true")?true:false;
	this.useitems = (this.targetView.useitems.toString()=="true")?true:false;
	this.rowtotalposition = this.targetView.rowtotalposition;
	this.coltotalposition = this.targetView.coltotalposition;

	this._settingToolbarConfigInfo();

	var itemStyle = this.panelStyle.items.item;

	var axisCnt = this.axisAreaInfo.axistypes.length;
	var gap = nexacro.toNumber(this.panelStyle.items.gap);

	this._createPanelDatasource();
	this._createPanelArea(target ,config);
	
	var panel = this.targetPanel;
	var grdPivot = (this.parent.targetGrid)?this.parent.targetGrid:"";
	var toolbarButtonCnt = this.targetToolbar.form.components.length;
	
	this.parent.isInit = true;

	if(this.usetoolbar){
		for(var i=0;i<toolbarButtonCnt;i++){
			this._toggleButtonStatusChange( this.targetToolbar.form.components[i],  this.targetToolbar.form.components[i].type, this.targetToolbar.form.components[i]._togglevalue );
		}

		if(!this.useitems){
			panel.set_height(nexacro.toNumber(this.panelStyle.toolbar.size));
		}else{
			if(!this.toolbarStatusUse){
				panel.set_height(nexacro.toNumber(this.panelStyle.toolbar.size) + nexacro.toNumber(this.panelStyle.items.size));
			}
		}
		
		this.targetView.form.resetScroll();
	}else{		
		if(this.useitems){
			panel.set_height(nexacro.toNumber(this.panelStyle.items.size));
		}else{
			panel.set_height(0);
		}
		
		this.targetView.form.resetScroll();
	}

	if(this.useitems) for(var i=0;i<axisCnt;i++) this._setAxisItemDragRect(this.axisAreaInfo.axistypes[i]);		

	panel.set_visible(true);

	if(grdPivot != ""){	
		if(panel.getOffsetHeight() > 0){
			grdPivot.set_top("divPanel:"+this.pivotGridGap+"px");
		}else{
			grdPivot.set_top("divPanel:0px");
		}
	}

	itemStyle = null;
	axisCnt = null;
	gap = null;
	panel = null;
	grdPivot = null;
	toolbarButtonCnt = null;
	gridTop = null;
}

/**
 * Toolbar 관련 config 정보 셋팅
 * @name _settingToolbarConfigInfo
 * @function 
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._settingToolbarConfigInfo = function() {
	var panelStyle = this.panelStyle;
	var lbuttons = panelStyle.toolbar.lbuttons;
	var rbuttons = panelStyle.toolbar.rbuttons;
	var lbuttonIds = [];
	var rbuttonIds = [];
	var lbuttonCnt = 0;
	var rbuttonCnt = 0;

	this.toolbarStatusUse = false;

	for (var key in lbuttons) {
		lbuttonIds.push(key)
		lbuttonCnt += 1;
	} 

	for (var key in rbuttons) {
		rbuttonIds.push(key)
		rbuttonCnt += 1;
	}
	
	var commButtonType = this.toolbarButtonType;
	var buttons = [];
	
	for(var i=0;i<lbuttonCnt;i++){
		var buttonType = lbuttons[lbuttonIds[i]].type;
		var resultIndex = NxPivotUtil.indexOf( commButtonType, buttonType);
		var buttonProps = {};

		buttonProps.type = buttonType;
		buttonProps.compid = lbuttonIds[i];
		buttonProps.objid = lbuttons[lbuttonIds[i]].id;
		buttonProps.align = lbuttons[lbuttonIds[i]].align;

		if(!this.useitems){
			if(buttonType == this.commCodeToolbar.buttontypes[0].key 
			|| buttonType == this.commCodeToolbar.buttontypes[3].key 
			|| buttonType == this.commCodeToolbar.buttontypes[4].key 
			//|| buttonType == this.commCodeToolbar.buttontypes[5].key
			) buttonProps.use = false;
			else buttonProps.use = true;
		}else{
			if(buttonType == this.commCodeToolbar.buttontypes[0].key) this.toolbarStatusUse = true;
			
			buttonProps.use = true;
		}
	
		buttonProps.toggleYn = nexacro.toNumber(lbuttons[lbuttonIds[i]].toggle);
		buttonProps.cssclass = lbuttons[lbuttonIds[i]].cssclass;
		buttonProps.tooltiptext = lbuttons[lbuttonIds[i]].tooltip;

		if(buttonProps.toggleYn){
			if(NxPivotUtil.isEmpty(lbuttons[lbuttonIds[i]].togglevalue)){
				buttonProps.togglevalue = 0;
			}else{
				buttonProps.togglevalue = nexacro.toNumber(lbuttons[lbuttonIds[i]].togglevalue);
			}
		}else{
			buttonProps.togglevalue = 0;
		}

		buttons.push(buttonProps);
		
		buttonProps = {};
	}

	for(var i=rbuttonCnt-1;i>=0;i--){
		var buttonType = rbuttons[rbuttonIds[i]].type;
		var resultIndex = NxPivotUtil.indexOf( commButtonType, buttonType);
		var buttonProps = {};

		buttonProps.type = buttonType;
		buttonProps.compid = rbuttonIds[i];
		buttonProps.objid = rbuttons[rbuttonIds[i]].id;
		buttonProps.align = rbuttons[rbuttonIds[i]].align;

		if(!this.useitems){
			if(buttonType == this.commCodeToolbar.buttontypes[0].key 
			|| buttonType == this.commCodeToolbar.buttontypes[3].key 
			|| buttonType == this.commCodeToolbar.buttontypes[4].key 
			//|| buttonType == this.commCodeToolbar.buttontypes[5].key
			) buttonProps.use = false;
			else buttonProps.use = true;
		}else{
			if(buttonType == this.commCodeToolbar.buttontypes[0].key) this.toolbarStatusUse = true;
			
			buttonProps.use = true;
		}

		buttonProps.toggleYn = nexacro.toNumber(rbuttons[rbuttonIds[i]].toggle);
		buttonProps.cssclass = rbuttons[rbuttonIds[i]].cssclass;
		buttonProps.tooltiptext = rbuttons[rbuttonIds[i]].tooltip;
		
		if(buttonProps.toggleYn){
			if(NxPivotUtil.isEmpty(rbuttons[rbuttonIds[i]].togglevalue)){
				buttonProps.togglevalue = 0;
			}else{
				buttonProps.togglevalue = nexacro.toNumber(rbuttons[rbuttonIds[i]].togglevalue);
			}
		}else{
			buttonProps.togglevalue = 0;
		}
		
		buttons.push(buttonProps);
		
		buttonProps = {};
	}

	this.toolbarAreaInfo.buttons = buttons;

	panelStyle = null;
	lbuttons = null;
	rbuttons = null;
	lbuttonIds = null;
	rbuttonIds = null;
	lbuttonCnt = null;
	rbuttonCnt = null;
}

/**
 * Setting Popup 집계 Combolist 데이터 셋팅
 * @name _createAggregatorComboList
 * @function 
 * @param {string} colid 해당항목 colid
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._createAggregatorComboList = function( colid ) {
	var aggDatasource = this.aggDsDatasource;
	var aggregator = this.language.setting.aggregator;
	var addRow = -1;
	
	aggDatasource.deleteAll();
	aggDatasource.clear();
	
	aggDatasource.addColumn("cd", "string");
	aggDatasource.addColumn("nm", "string");	
	
	for(var i = 0;i<aggregator.length;i++){
		addRow = aggDatasource.addRow();
		aggDatasource.setColumn(addRow,0,aggregator[i].key);
		aggDatasource.setColumn(addRow,1,aggregator[i].text);
	}

	if(colid){
		var customAggregator = this.parent.config.customAggregator;
		
		if(customAggregator[colid]){
			var value = customAggregator[colid].name;

			addRow = aggDatasource.addRow();
			aggDatasource.setColumn(addRow,0,value);
			aggDatasource.setColumn(addRow,1,value);
		}
	}
	
	aggDatasource = null;
	aggregator = null;
	addRow = null;
}

/**
 * Panel 관련 데이터 생성
 * @name _createPanelDatasource
 * @function 
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._createPanelDatasource = function() {
	var parentScope = this.pivot.scope;
	var addRow = -1;	
	var dsId;
	var rtnObj;	
	
	var aggDsId = "";

	if(this.aggDsDatasource != "[object Dataset]") aggDsId = NxPivotUtil.getUniqueId("aggDsDatasource" + "_");
	else aggDsId = this.aggDsDatasource.name;

	var aggDsDatasource = this.pivot.createDataSource(parentScope, "dataset", aggDsId);	
	var aggregator = this.language.setting.aggregator;
	
	aggDsDatasource.addColumn("cd", "string");
	aggDsDatasource.addColumn("nm", "string");

	for(var i = 0;i<aggregator.length;i++){
		addRow = aggDsDatasource.addRow();
		aggDsDatasource.setColumn(addRow,0,aggregator[i].key);
		aggDsDatasource.setColumn(addRow,1,aggregator[i].text);
	}
	
	this.aggDsDatasource = aggDsDatasource;
	
	aggregator = null;
	aggDsDatasource = null;
	
	var filterCodeDatasourceId = "";
	
	if(this.filterCodeDatasource != "[object Dataset]") filterCodeDatasourceId = NxPivotUtil.getUniqueId("filterCodeDatasource" + "_");
	else filterCodeDatasourceId = this.filterCodeDatasource.name;
	
	var filterCodeDatasource = this.pivot.createDataSource(parentScope, "dataset", filterCodeDatasourceId);
	
	filterCodeDatasource.addColumn("codecolumn","string");
	filterCodeDatasource.addColumn("datacolumn","string");

	this.filterCodeDatasource = filterCodeDatasource;
	
	filterCodeDatasource = null;

	var popFilterDatasourceId = "";

	if(this.settingPopInfo.filterDataSource != "[object Dataset]") popFilterDatasourceId = NxPivotUtil.getUniqueId("popFilterDatasource" + "_");
	else popFilterDatasourceId = this.settingPopInfo.filterDataSource.name;
	
	var popFilterDatasource = this.pivot.createDataSource(parentScope, "dataset", popFilterDatasourceId);
	
	this.settingPopInfo.filterDataSource = popFilterDatasource;

	popFilterDatasource = null;
	
	parentScope = null;
	addRow = null;
	dsId = null;
	rtnObj = null;
	aggregator = null;
	aggDsId = null;
	
}

/**
 * 메인 Panel 생성
 * @name _createPanelArea
 * @function 
 * @param {object} target Pivot Div 객체
 * @param {object} config configurationData객체의 config 정보
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._createPanelArea = function( target ,config ) {
	try{
		var panelStyle = this.panelStyle;
		var width = null;
		var panel;

		if(this.panelType == "top"){	//top
			if(!target.form.isValidObject("divPanel")){			
				if(this.usetoolbar){
					panel = new Div("divPanel", 0, 0, width, nexacro.toNumber(panelStyle.toolbar.size), 0, null);
				}else{
					if(this.useitems){
						panel = new Div("divPanel", 0, 0, width, nexacro.toNumber(panelStyle.items.size), 0, null);
					}else{
						panel = new Div("divPanel", 0, 0, width, 0, 0, null);
					}
				}

				target.addChild("divPanel", panel); 
				panel.set_border("0px none");
				panel.set_visible(false);
				panel.show();
			}else{
				panel = target.form["divPanel"];
			}
		}else{
			this.pivot.error(this.targetView, "error", 4001);
			return;
		}

		if(NxPivotUtil.isEmpty(panel)){
			this.pivot.error(this.targetView, "error", 4002);
			return;
		}
		
		panel.form.set_scrollbartype("none");
		panel.form.set_tabstop(false);
		
		this.targetPanel = panel;

		this._createToolbarArea(target ,panel);
		
		if(this.useitems){
			this._createDragComp(target, panel);

			this._createAxisArea(target, panel);
			this._createAxisItems(target, panel, config);
		
			this._createSettingListPopup(target);
			this._createPanelSettingPop(target);
		}
	}finally{
		panelStyle = null;
		width = null;
		panel = null;		
	}
}

/**
 * Main Panel dragItem/indicator 생성
 * @name _createDragComp
 * @function 
 * @param {object} target Pivot Div 객체
 * @param {object} panel Panel Div 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._createDragComp = function( target ,panel) {
	var panelStyle = this.panelStyle;
	
	nexacro.NxPivot.View.Event.makeDragMove(this.targetView, this._compDragMoveEvent, this);	

	var padding = panelStyle.items.item.padding.split(" ");

	var dragItem = new Static();
	dragItem.init( "_pivot_dragItem", 0, 0, nexacro.toNumber(panelStyle.items.item.width), nexacro.toNumber(panelStyle.items.item.height), null, null );
	dragItem.set_cssclass(panelStyle.items.item.cssclass);
	dragItem.set_padding(padding[0]+"px "+padding[1]+"px "+padding[2]+"px "+padding[3]+"px");		
	dragItem.set_opacity(0.8);
	dragItem.set_visible(false);

	this.targetView.addChild("_pivot_dragItem", dragItem);
	dragItem.show();

	this.dragItem = dragItem;
	
	var indicator = new Static();
	indicator.init( "_pivot_indicator", 0, 0, nexacro.toNumber(panelStyle.items.indicatorwidth), nexacro.toNumber(panelStyle.items.indicatorheight), null, null );
	indicator.set_cssclass(this.panelStyle.items.indicatorcssclass);
	indicator.set_visible(false);

	this.targetView.addChild("_pivot_indicator", indicator);
	indicator.show();
	
	this.indicator = indicator;
	
	panelStyle = null;
	padding = null;
	dragItem = null;
	indicator = null;
}

/**
 * Axis 영역 생성
 * @name _createAxisArea
 * @function 
 * @param {object} target Pivot Div 객체
 * @param {object} panel Panel Div 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._createAxisArea = function( target ,panel) {
	var panelStyle = this.panelStyle;
	var axisTypes = this.axisAreaInfo.axistypes;
	var axisTypesCnt = axisTypes.length;

	var areaId = null;

	var positionY = this.usetoolbar?nexacro.toNumber(panelStyle.toolbar.size):0;
	var area;
	var title;
	var padding = panelStyle.items.padding.split(" ");
	
	for(var i=0;i<axisTypesCnt;i++){
		if(i==0) { 
			area = new Div(axisTypes[i], 0, positionY, "25%", null, null, 0);
		}else {
			if(i == axisTypesCnt - 1) area = new Div(axisTypes[i], axisTypes[i-1]+":0", positionY, null, null, 0, 0);
			else area = new Div(axisTypes[i], axisTypes[i-1]+":0", positionY, "25%", null, null, 0);
		}
		
		panel.addChild(axisTypes[i], area); 
		area.set_text("");
		area.form.set_scrollbarsize(this.axisAreaScrollbarWidth);
		area.form.set_scrollbartype("auto");
		area.form.set_scrolltype("vertical");
		area.set_tabstop(false);
		
		title = new Static("title", padding[0], padding[1], null, nexacro.toNumber(panelStyle.items.titlebarsize), 0, null);
		area.form.addChild("title", title); 
		title.set_cssclass(panelStyle.items.titlebarcssclass + "_" + axisTypes[i]);
		title.set_text(this.axisAreaInfo.axistext[i]);

		if(axisTypes[i]=="fields"||axisTypes[i]=="values") area.set_cssclass(panelStyle.items.cssclass1);
		else area.set_cssclass(panelStyle.items.cssclass2);

		area.show();
		title.show();
		
		if(area.findEventHandler("onvscroll", this._evtAxisOnvscroll, this) < 0){
			nexacro.NxPivot.View.Event.add("onvscroll" ,area,this._evtAxisOnvscroll,this);
		}
		
		if(area.findEventHandler("onsize", this._evtAxisOnsize, this) < 0){
			nexacro.NxPivot.View.Event.add("onsize" ,area,this._evtAxisOnsize,this);
		}
	}
	
	panelStyle = null;
	axisTypes = null;
	axisTypesCnt = null;
	areaId = null;
	positionY = null;
	area = null;
	title = null;
	padding = null;
}

/**
 * Axis 영역 내에 항목 Item 생성
 * @name _createAxisItems
 * @function 
 * @param {object} target Pivot Div 객체
 * @param {object} panel Panel Div 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._createAxisItems = function( target ,panel ,config) {
	var axisTypes = this.axisAreaInfo.axistypes;

	for(var i=0;i<axisTypes.length;i++){
		this._createItem(target , axisTypes[i] ,config);
	}
	
	axisTypes = null;
}

/**
 * Setting List 메뉴 생성
 * @name _createSettingListPopup
 * @function 
 * @param {object} target Pivot Div 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._createSettingListPopup = function( target ){
	var commSettingPopupCssClass = this.commSettingPopup.cssclass;
	
	this._createAggregatorComboList();
	
	var aggCnt = this.aggDsDatasource.getRowCount();
	
	var nBorder = 1;
	var nPopupDivWidth = 217+(nBorder*2);
	var nPopupDivHieght = 222+(nBorder*2);
	var nListWidth = 216;
	var nListHeight = 20;
	var nImgWidth = nListHeight;
	var nImgHeight = nListHeight;
	var nLineGap = 3;
	var nLineWidth = nListWidth - (nLineGap*2);
	var nTop = 0;

	var setPopupList = new PopupDiv( "setPopupList", 0, nTop, nPopupDivWidth, nPopupDivHieght, null, null );	
	target.addChild("setPopupList", setPopupList); 
	setPopupList.set_cssclass(commSettingPopupCssClass.setListPopup);
	setPopupList.show();		
	
	var asc = new Static( "asc", 1, nTop, nListWidth, nListHeight, null, null );
	setPopupList.addChild("asc", asc); 
	asc.set_cssclass(commSettingPopupCssClass.list);	
	asc.set_text(this.language.settingPopList.rowCol[0].text);
	asc.show();	
	
	if(asc.findEventHandler("onclick", this._setPopupListOnclick, this) < 0){
		nexacro.NxPivot.View.Event.add("onclick" ,asc,this._setPopupListOnclick,this);
	}	
	
	var asc_img = new Static( "asc_img", 4, nTop, nImgWidth, nImgHeight, null, null );
	setPopupList.addChild("asc_img", asc_img); 
	asc_img.set_cssclass(commSettingPopupCssClass.asc);	
	asc_img.show();	

	nTop += nListHeight;

	var desc = new Static( "desc", 1, nTop, nListWidth, nListHeight, null, null );
	setPopupList.addChild("desc", desc); 
	desc.set_cssclass(commSettingPopupCssClass.list);	
	desc.set_text(this.language.settingPopList.rowCol[1].text);
	desc.show();	
	
	if(desc.findEventHandler("onclick", this._setPopupListOnclick, this) < 0){
		nexacro.NxPivot.View.Event.add("onclick" ,desc,this._setPopupListOnclick,this);
	}	
	
	var desc_img = new Static( "desc_img", 4, nTop, nImgWidth, nImgHeight, null, null );
	setPopupList.addChild("desc_img", desc_img); 
	desc_img.set_cssclass(commSettingPopupCssClass.desc);	
	desc_img.show();	

	nTop += (nListHeight + 1);
	
	var sortline = new Static( "sortline", nLineGap, nTop, nLineWidth, 1, null, null );
	setPopupList.addChild("sortline", sortline); 
	sortline.set_cssclass(commSettingPopupCssClass.line);	
	sortline.show();
	
	nTop += 2;
	
	var agg = null;
	var agg_img = null;
	
	if(aggCnt > 0){
		var objDs = this.aggDsDatasource;
		
		for(var i=0;i<aggCnt;i++){
			var key = objDs.getColumn(i,0);
			var text = objDs.getColumn(i,1);
			
			var agg = new Static( key, 1, nTop, nListWidth, nListHeight, null, null );
			setPopupList.addChild(key, agg); 
			agg.set_cssclass(commSettingPopupCssClass.list);	
			agg.set_text(text);
			agg.show();	
			
			if(agg.findEventHandler("onclick", this._setPopupListOnclick, this) < 0){
				nexacro.NxPivot.View.Event.add("onclick" ,agg,this._setPopupListOnclick,this);
			}	
			
			var agg_img = new Static( key+"_img", 4, nTop, nImgWidth, nImgHeight, null, null );
			setPopupList.addChild(key+"_img", agg_img); 
			agg_img.set_cssclass(commSettingPopupCssClass.check);	
			agg_img.show();	

			nTop += nListHeight;		
		}
		
		key = "customfx";
		text = "";
		
		agg = new Static( key, 1, nTop, nListWidth, nListHeight, null, null );
		setPopupList.addChild(key, agg); 
		agg.set_cssclass(commSettingPopupCssClass.list);	
		agg.set_text(text);
		agg.show();	
		
		if(agg.findEventHandler("onclick", this._setPopupListOnclick, this) < 0){
			nexacro.NxPivot.View.Event.add("onclick" ,agg,this._setPopupListOnclick,this);
		}	
		
		agg_img = new Static( key+"_img", 4, nTop, nImgWidth, nImgHeight, null, null );
		setPopupList.addChild(key+"_img", agg_img); 
		agg_img.set_cssclass(commSettingPopupCssClass.check);	
		agg_img.show();	

		nTop += nListHeight;

		var aggLine = new Static( "aggLine", nLineGap, nTop, nLineWidth, 1, null, null );
		setPopupList.addChild("aggLine", aggLine); 
		aggLine.set_cssclass(commSettingPopupCssClass.line);	
		aggLine.show();
		
		nTop += 2;
	}
	
	var clearfilter = new Static( "clearfilter", 1, nTop, nListWidth, nListHeight, null, null );
	setPopupList.addChild("clearfilter", clearfilter); 
	clearfilter.set_cssclass(commSettingPopupCssClass.list);	
	clearfilter.set_text(this.language.settingPopList.rowCol[2].text+" \"\" ");
	clearfilter.show();	
	
	if(clearfilter.findEventHandler("onclick", this._setPopupListOnclick, this) < 0){
		nexacro.NxPivot.View.Event.add("onclick" ,clearfilter,this._setPopupListOnclick,this);
	}
	
	var clearfilter_img = new Static( "clearfilter_img", 4, nTop, nImgWidth, nImgHeight, null, null );
	setPopupList.addChild("clearfilter_img", clearfilter_img); 
	clearfilter_img.set_cssclass(commSettingPopupCssClass.clearfilter);	
	clearfilter_img.show();	
	
	nTop += nListHeight;
	
	var addfilter = new Static( "addfilter", 1, nTop, nListWidth, nListHeight, null, null );
	setPopupList.addChild("addfilter", addfilter); 
	addfilter.set_cssclass(commSettingPopupCssClass.list);	
	addfilter.set_text(this.language.settingPopList.rowCol[3].text);
	addfilter.show();	
	
	if(addfilter.findEventHandler("onclick", this._setPopupListOnclick, this) < 0){
		nexacro.NxPivot.View.Event.add("onclick" ,addfilter,this._setPopupListOnclick,this);
	}
	
	var addfilter_img = new Static( "addfilter_img", 4, nTop, nImgWidth, nImgHeight, null, null );
	setPopupList.addChild("addfilter_img", addfilter_img); 
	addfilter_img.set_cssclass(commSettingPopupCssClass.addfilter);	
	addfilter_img.show();	

	nPopupDivHieght = nTop + nListHeight + (nBorder*2);
	
	setPopupList.set_height(nPopupDivHieght);

	this.setPopupListComp = setPopupList;

	commSettingPopupCssClass = null;
	aggCnt = null;
	nBorder = null;
	nPopupDivWidth = null;
	nPopupDivHieght = null;
	nListWidth = null;
	nListHeight = null;
	nImgWidth = null;
	nImgHeight = null;
	nLineGap = null;
	nLineWidth = null;
	nTop = null;
	setPopupList = null;
	asc = null;
	asc_img = null;
	desc = null;
	desc_img = null;
	sortline = null;
	agg = null;
	agg_img = null;
	objDs = null;
	key = null;
	text = null;
	agg = null;
	agg_img = null;
	aggLine = null;
	clearfilter = null;
	clearfilter_img = null;
	addfilter = null;
	addfilter_img = null;
}

/**
 * Filtet Setting 팝업 생성
 * @name _createPanelSettingPop
 * @function 
 * @param {object} target Pivot Div 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._createPanelSettingPop = function( target ) {
	var popupStyle = this.settingPopStyle;
	var commSettingPopupCssClass = this.commSettingPopup.cssclass;
	
	var name = "";
	var sort = "";
	var aggregator = "";
	var filterTitle = "";
	var search = "";
	var submit = "";
	var close = "";
	
	var dateformat = this.settingPopStyle.dateformat;
	var locale = this.settingPopCalendarInfo.locale;
	var dateformat = dateformat;
	var editformat = dateformat;
	var usetrailingday = this.settingPopCalendarInfo.usetrailingday;
	
	var padding = popupStyle.padding.split(" ");

	var codes = this.language.setting.itemList;
	var codesLeng = codes.length;

	var centerPos = Math.ceil( ( nexacro.toNumber(popupStyle.width)-( nexacro.toNumber(padding[0])+nexacro.toNumber(padding[2]) ) ) / 20 );
	var centerPos2 = centerPos * 10;
	
	centerPos = centerPos * 8;
	
	var left = nexacro.toNumber(padding[0]);
	var top = nexacro.toNumber(padding[1]);
	var right = nexacro.toNumber(padding[2]);
	var bottom = nexacro.toNumber(padding[3]);

	for(var i=0;i<codesLeng;i++){
		if(codes[i].key == "filterTitle") filterTitle = codes[i].text;
		else if(codes[i].key == "search") search = codes[i].text;
		else if(codes[i].key == "submit") submit = codes[i].text;
		else if(codes[i].key == "close") close = codes[i].text;
	}

	var popup = new PopupDiv("settingPop", 0, 0, popupStyle.width,popupStyle.height, null, null);
	target.addChild("settingPop", popup); 
	popup.set_cssclass(popupStyle.cssclass);
	popup.form.set_scrollbartype("none");
	popup.set_visible(false);
	popup.show();
	
	var popStaItemFilterTit = new Static("popStaItemFilterTit", left, top, null, 20, right, null);
	popup.addChild("popStaItemFilterTit", popStaItemFilterTit); 
	popStaItemFilterTit.set_cssclass(popupStyle.labelcssclass);
	popStaItemFilterTit.set_text(filterTitle);
	popStaItemFilterTit.show();
	
	top += (20 + 4);
	
	var filterDatasource = this.filterCodeDatasource;

	var popCboItemFilter = new Combo("popCboItemFilter", left, top, centerPos, 20, null, null);
	popup.addChild("popCboItemFilter", popCboItemFilter); 
	popCboItemFilter.set_cssclass(commSettingPopupCssClass.combo_cssclass);
	popCboItemFilter.set_tabstop(false);
	popCboItemFilter.set_innerdataset(filterDatasource);
	popCboItemFilter.set_codecolumn("codecolumn");
	popCboItemFilter.set_datacolumn("datacolumn");
	popCboItemFilter.show();
	
	if(popCboItemFilter.findEventHandler("onitemchanged", this._evtFilterCombo, this) < 0){
		nexacro.NxPivot.View.Event.add("onitemchanged" ,popCboItemFilter,this._evtFilterCombo,this);
	}

	var popEdtItemFilterEdit = new Edit("popEdtItemFilterEdit",  (left + centerPos - 1), top, null, 20, right, null);
	popup.addChild("popEdtItemFilterEdit", popEdtItemFilterEdit); 
	popEdtItemFilterEdit.set_cssclass(commSettingPopupCssClass.edit_cssclass);
	popEdtItemFilterEdit.show();
	
	if(popEdtItemFilterEdit.findEventHandler("oninput", this._evtFilterEditInput, this) < 0){
		nexacro.NxPivot.View.Event.add("oninput" ,popEdtItemFilterEdit,this._evtFilterEditInput,this);
	}
	
	if(popEdtItemFilterEdit.findEventHandler("onkeyup", this._evtFilterEditInput, this) < 0){
		nexacro.NxPivot.View.Event.add("onkeyup" ,popEdtItemFilterEdit,this._evtFilterEditInput,this);
	}
	
	if(popEdtItemFilterEdit.findEventHandler("onkillfocus", this._evtFilterEditKillFocus, this) < 0){
		nexacro.NxPivot.View.Event.add("onkillfocus" ,popEdtItemFilterEdit,this._evtFilterEditKillFocus,this);
	}
	
	var popCalItemEdit = new Calendar("popCalItemEdit", (left + centerPos - 1), top, null, 20, right, null);
	popup.addChild("popCalItemEdit", popCalItemEdit); 
	popCalItemEdit.set_cssclass(commSettingPopupCssClass.calendar_cssclass);
	popCalItemEdit.set_locale(locale);
	popCalItemEdit.set_dateformat(dateformat);
	popCalItemEdit.set_editformat(editformat);
	popCalItemEdit.set_usetrailingday(usetrailingday);
	popCalItemEdit.set_visible(false);
	popCalItemEdit.show();
	
	
	if(popCalItemEdit.findEventHandler("oninput", this._evtFilterEditInput, this) < 0){
		nexacro.NxPivot.View.Event.add("oninput" ,popCalItemEdit,this._evtFilterEditInput,this);
	}
	
	if(popCalItemEdit.findEventHandler("onkeyup", this._evtFilterEditInput, this) < 0){
		nexacro.NxPivot.View.Event.add("onkeyup" ,popCalItemEdit,this._evtFilterEditInput,this);
	}
	
	if(popCalItemEdit.findEventHandler("onkillfocus", this._evtFilterEditKillFocus, this) < 0){
		nexacro.NxPivot.View.Event.add("onkillfocus" ,popCalItemEdit,this._evtFilterEditKillFocus,this);
	}
	
	var popCalItemStart = new Calendar("popCalItemStart", left, top, centerPos2 - 2, 20, null, null);
	popup.addChild("popCalItemStart", popCalItemStart); 
	popCalItemStart.set_cssclass(commSettingPopupCssClass.calendar_cssclass);
	popCalItemStart.set_locale(locale);
	popCalItemStart.set_dateformat(dateformat);
	popCalItemStart.set_editformat(editformat);
	popCalItemStart.set_usetrailingday(usetrailingday);
	popCalItemStart.set_visible(false);
	popCalItemStart.show();
	
	var popCalItemEnd = new Calendar("popCalItemEnd", (left + centerPos2 + 1), top, null, 20, right, null);
	popup.addChild("popCalItemEnd", popCalItemEnd); 
	popCalItemEnd.set_cssclass(commSettingPopupCssClass.calendar_cssclass);
	popCalItemEnd.set_locale(locale);
	popCalItemEnd.set_dateformat(dateformat);
	popCalItemEnd.set_editformat(editformat);
	popCalItemEnd.set_usetrailingday(usetrailingday);
	popCalItemEnd.set_visible(false);
	popCalItemEnd.show();

	top += (20 + 4);
	
	var popEdtItemSearchTit = new Static("popEdtItemSearchTit", left, top, centerPos, 20, null, null);
	popup.addChild("popEdtItemSearchTit", popEdtItemSearchTit); 
	popEdtItemSearchTit.set_cssclass(popupStyle.labelcssclass);
	popEdtItemSearchTit.set_text(search);
	popEdtItemSearchTit.show();
	
	var popEdtItemListSearch = new Edit("popEdtItemListSearch", (left + centerPos - 1), top, null, 20, right, null);
	popup.addChild("popEdtItemListSearch", popEdtItemListSearch); 
	popEdtItemListSearch.set_cssclass(commSettingPopupCssClass.edit_cssclass);
	popEdtItemListSearch.show();

	if(popEdtItemListSearch.findEventHandler("oninput", this._evtFilterEditInput, this) < 0){
		nexacro.NxPivot.View.Event.add("oninput" ,popEdtItemListSearch,this._evtFilterEditInput,this);
	}

	top += (20 + 2);
	
	var popGrdItemFilterGrid = new Grid("popGrdItemFilterGrid", left, top, null, null, right, nexacro.toNumber(popupStyle.buttonheight) + bottom + 5);
	popup.addChild("popGrdItemFilterGrid", popGrdItemFilterGrid); 
	popGrdItemFilterGrid.set_cssclass(commSettingPopupCssClass.grid_cssclass);
	popGrdItemFilterGrid.set_useselcolor(false);
	popGrdItemFilterGrid.set_formats(this.popGridFormat1);
	popGrdItemFilterGrid.set_autofittype("col");
	popGrdItemFilterGrid.show();
	
	popGrdItemFilterGrid._checkflag = 0;
	
	if(popGrdItemFilterGrid.findEventHandler("oncellclick", this._evtGridCellClick, this) < 0){
		nexacro.NxPivot.View.Event.add("oncellclick" ,popGrdItemFilterGrid,this._evtGridCellClick,this);
	}
	
	if(popGrdItemFilterGrid.findEventHandler("onheadclick", this._evtGridHeadClick, this) < 0){
		nexacro.NxPivot.View.Event.add("onheadclick" ,popGrdItemFilterGrid,this._evtGridHeadClick,this);
	}

	var popBtnSubmit = new Button("popBtnSubmit"
								, left
								, nexacro.toNumber(popupStyle.height) - (nexacro.toNumber(popupStyle.buttonheight)+bottom)
								, centerPos2
								, nexacro.toNumber(popupStyle.buttonheight)
								, null
								, bottom);
	popup.addChild("popBtnSubmit", popBtnSubmit); 
	popBtnSubmit.set_cssclass(popupStyle.okbuttoncssclass);
	popBtnSubmit.set_text(submit);
	popBtnSubmit.show();
	
	if(popBtnSubmit.findEventHandler("onclick", this._evtPanelSettingSubmit, this) < 0){
		nexacro.NxPivot.View.Event.add("onclick" ,popBtnSubmit,this._evtPanelSettingSubmit,this);
	}

	var popBtnClose = new Button("popBtnClose", (left + centerPos2 + 1)
								, nexacro.toNumber(popupStyle.height) - (nexacro.toNumber(popupStyle.buttonheight)+bottom)
								, null, nexacro.toNumber(popupStyle.buttonheight)
								, right
								, bottom);
	popup.addChild("popBtnClose", popBtnClose); 
	popBtnClose.set_cssclass(popupStyle.cancelbuttoncssclass);
	popBtnClose.set_text(close);
	popBtnClose.show();
	
	if(popBtnClose.findEventHandler("onclick", this._evtPanelSettingClose, this) < 0){
		nexacro.NxPivot.View.Event.add("onclick" ,popBtnClose,this._evtPanelSettingClose,this);
	}
	
	this.settingPopComp.popStaItemFilterTit = popStaItemFilterTit;
	this.settingPopComp.popCboItemFilter = popCboItemFilter;
	this.settingPopComp.popEdtItemFilterEdit = popEdtItemFilterEdit;
	this.settingPopComp.popEdtItemSearchTit = popEdtItemSearchTit;	
	this.settingPopComp.popEdtItemListSearch = popEdtItemListSearch;
	this.settingPopComp.popCalItemEdit = popCalItemEdit;
	this.settingPopComp.popGrdItemFilterGrid = popGrdItemFilterGrid;
	this.settingPopComp.popCalItemStart = popCalItemStart;
	this.settingPopComp.popCalItemEnd = popCalItemEnd;
	this.settingPopComp.popBtnSubmit = popBtnSubmit;
	this.settingPopComp.popBtnClose = popBtnClose;

	this.settingPop = popup;
	
	this._settingPopupBtnAlign();
	
	sortInnerdataset = null;
	
	popupStyle = null;
	commSettingPopupCssClass = null;
	name = null;
	sort = null;
	aggregator = null;
	filterTitle = null;
	search = null;
	submit = null;
	close = null;
	dateformat = null;
	locale = null;
	dateformat = null;
	editformat = null;
	usetrailingday = null;
	padding = null;
	codes = null;
	codesLeng = null;
	centerPos = null;
	centerPos2 = null;
	left = null;
	top = null;
	right = null;
	bottom = null;
	popup = null;
	popStaItemFilterTit = null;
	filterDatasource = null;
	popCboItemFilter = null;
	popEdtItemFilterEdit = null;
	popCalItemEdit = null;
	popCalItemStart = null;
	popCalItemEnd = null;
	popEdtItemSearchTit = null;
	popEdtItemListSearch = null;
	popGrdItemFilterGrid = null;
	popBtnSubmit = null;
	popBtnClose = null;
}

/**
 * Filter Setting 팝업 버튼 정렬
 * @name _settingPopupBtnAlign
 * @function 
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._settingPopupBtnAlign = function() {
	var popupStyle = this.settingPopStyle;
	var sAlign = popupStyle.buttonalign;
	
	var obj = this.settingPopComp.popBtnSubmit;
	var obj2 = this.settingPopComp.popBtnClose;
	var nBtnPadding = 18;
	var sText = obj.text;
	var sText2 = obj2.text;
	var nlimitsize = nexacro.toNumber(popupStyle.buttonwidth);
	var nCenterPos = nexacro.ceil(nexacro.toNumber(popupStyle.width)/2);
	
	var nSize = this._getCompTextSize(obj, sText);
	var nSize2 = this._getCompTextSize(obj2, sText2);

	if(nlimitsize >= nSize){
		obj.set_width(nlimitsize);
		nSize = nlimitsize;
	}else{
		obj.set_width(nSize + nBtnPadding);	
		nSize = nSize + nBtnPadding;
	}
	
	if(nlimitsize >= nSize2){
		obj2.set_width(nlimitsize);
		nSize2 = nlimitsize;
	}else{
		obj2.set_width(nSize2 + nBtnPadding);	
		nSize2 = nSize2 + nBtnPadding;
	}

	if(sAlign == "right"){
		obj2.set_left(null);
		obj2.set_right(12);
		
		obj.set_left(null);
		obj.set_right(4+nSize2+12);
	}else{
		obj.set_left(nCenterPos - nexacro.ceil((nSize + nSize2)/2));
		obj2.set_left(nCenterPos - nexacro.ceil((nSize + nSize2)/2) + nSize + 4);
	}
	
	popupStyle = null;
	sAlign = null;
	obj = null;
	obj2 = null;
	nBtnPadding = null;
	sText = null;
	sText2 = null;
	nlimitsize = null;
	nCenterPos = null;
	nSize = null;
	nSize2 = null;
}

/**
 * 해당 컴포넌트 fontstyle 의 스트링 사이즈 반환
 * @name _getCompTextSize
 * @function 
 * @param {object} comp component 객체
 * @param {string} sText 사이즈 반환을 위한 대상 문자열
 * @return {number} 반환사이즈
 * @private
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._getCompTextSize = function(comp ,sText) {
	try{
		var objFont = this._getFont(comp);
		var sizeObj = nexacro.getTextSize(sText,objFont);

		return sizeObj.nx;
	}finally{
		objFont = null;
		sizeObj = null;
	}
}

/**
 * SettingPopup 의 검색입력시 onkeyup 이벤트
 * @name _evtFilterEditInput
 * @function 
 * @param {object} obj component 객체
 * @param {object} e nexacro.KeyEventInfo 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._evtFilterEditInput = function( obj, e ) {
	var popCalItemEdit_id = this.settingPopComp.popCalItemEdit.id;
	var popEdtItemFilterEdit_id = this.settingPopComp.popEdtItemFilterEdit.id
	var text = ((obj.id == popCalItemEdit_id)?obj.value:obj.text) || "";

	if(obj.id == popEdtItemFilterEdit_id || obj.id == popCalItemEdit_id){
		var comboValue = this.settingPopComp.popCboItemFilter.value;
		
		if(e.eventid == "onkeyup" && e.keycode == 13){
			var arrValue = text.split(",");
			
			this._setFilterGrid( arrValue ,comboValue);
		}	
	}else{
		var objDs = this.settingPopInfo.filterDataSource;
		
		objDs.set_enableevent(false);		
		
		objDs.filter("");
		if(text != ""){
			objDs.filter("value.toString().indexOf('"+text+"') > -1");
		}
		
		objDs.set_enableevent(true);
	}
	
	popCalItemEdit_id = null;
	popEdtItemFilterEdit_id = null;
	text = null;
	comboValue = null;
	arrValue = null;
	objDs = null;
}

/**
 * SettingPopup 의 검색결과 Grid 데이터 셋팅 및 체크박스 선택
 * @name _setFilterGrid
 * @function 
 * @param {string[]} arrValue 사용자가 입력한 filter 문자열 배열
 * @param {string} comboValue 사용자가 선택한 filter 조건 문자열
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._setFilterGrid = function( arrValue ,comboValue){
	var objDs = this.settingPopInfo.filterDataSource;
	var popEdtItemFilterEdit = this.settingPopComp.popEdtItemFilterEdit;

	objDs.set_enableevent(false);		

	var arrLeng = arrValue.length;
	var dataCnt = objDs.getRowCount();

	if(arrLeng < 1 || NxPivotUtil.isEmpty(arrValue.toString())){
		for(var i=dataCnt-1;i>=0;i--){
			objDs.setColumn(i,"chk",0);
		}
	}else{
		for(var i=0;i<dataCnt;i++){
			var data = objDs.getColumn(i,"value");
			
			if(comboValue == "ct" || comboValue == "nct"){
				if(comboValue == "ct"){
					if(data.indexOf(arrValue.toString()) > -1){
						objDs.setColumn(i,"chk",1);
					}else{
						objDs.setColumn(i,"chk",0);
					}
				}else{
					if(data.indexOf(arrValue.toString()) < 0){
						objDs.setColumn(i,"chk",1);
					}else{
						objDs.setColumn(i,"chk",0);
					}
				}
			}else{
				var resultIndex = NxPivotUtil.indexOf( arrValue, data);
				
				if(resultIndex > -1){
					objDs.setColumn(i,"chk",1);
				}else{
					objDs.setColumn(i,"chk",0);
				}				
			}
		}
		
	}
			
	objDs.set_enableevent(true);
	
	objDs = null;
	popEdtItemFilterEdit = null;
	arrLeng = null;
	dataCnt = null;
	data = null;
	resultIndex = null;
}

/**
 * Filter Setting 팝업 입력 컴포넌트 KillFocus 이벤트
 * @name _evtFilterEditKillFocus
 * @function 
 * @param {object} obj component 객체
 * @param {object} e nexacro.KillFocusEventInfo 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._evtFilterEditKillFocus = function( obj, e ){
	var comboValue = this.settingPopComp.popCboItemFilter.value;
	var text = obj.value || "";	
	var arrValue = text.split(",");

	this._setFilterGrid( arrValue ,comboValue);
	
	comboValue = null;
	text = null;	
	arrValue = null;
}

/**
 * Filter Setting 팝업 검색결과 GridClick 이벤트
 * @name _evtGridCellClick
 * @function 
 * @param {object} obj component 객체
 * @param {object} e nexacro.GridClickEventInfo 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._evtGridCellClick = function( obj, e ) {
	var type = this.settingPopInfo.data.type;
	var objDs = this.settingPopInfo.filterDataSource;
	var comboValue = this.settingPopComp.popCboItemFilter.value;
	var targetEditComp = this.settingPopComp.popEdtItemFilterEdit;
	var targetCalEditComp = this.settingPopComp.popCalItemEdit;
	var targetCalStartComp = this.settingPopComp.popCalItemStart;
	var targetCalEndComp = this.settingPopComp.popCalItemEnd;

	var eRow = e.row;
	var eValue = objDs.getColumn(eRow,"value");			
	
	objDs.set_enableevent(false);

	if(!NxPivotUtil.isEmpty(comboValue) && type != "date"){
		if(comboValue == "ct" || comboValue == "nct"){
			var rowCnt = objDs.getRowCount();
			
			for(var i=rowCnt-1;i>=0;i--) objDs.setColumn(i,"chk",0);
				
			objDs.setColumn(eRow,"chk",1);
			targetEditComp.set_value(objDs.getColumn(eRow,"value"));
		}else{
			var editValue = NxPivotUtil.isEmpty(targetEditComp.value)?"":targetEditComp.value;	
			var chk = objDs.getColumn(eRow,"chk");

			if(editValue.length > 0){
				var arrValue = editValue.split(",");
				var resultIndex = NxPivotUtil.indexOf( arrValue, eValue);
				
				if(chk == 1){
					objDs.setColumn(eRow,"chk",0);
					
					arrValue.splice(resultIndex,1);
					targetEditComp.set_value(arrValue.toString());
				}else{
					objDs.setColumn(eRow,"chk",1);
					
					if(resultIndex < 0){
						targetEditComp.set_value(editValue+","+eValue);
					}
				}
			}else{
				objDs.setColumn(eRow,"chk",1);
				targetEditComp.set_value(eValue);
			}
		}
		
	}else if(!NxPivotUtil.isEmpty(comboValue) && type == "date"){
		var rowCnt = objDs.getRowCount();
		
		for(var i=rowCnt-1;i>=0;i--) objDs.setColumn(i,"chk",0);
			
		if(comboValue != "between"){
			objDs.setColumn(eRow,"chk",1);
			targetCalEditComp.set_value(objDs.getColumn(eRow,"value"));
		}
	}
	
	objDs.set_enableevent(true);	
	
	type = null;
	objDs = null;
	comboValue = null;
	targetEditComp = null;
	targetCalEditComp = null;
	targetCalStartComp = null;
	targetCalEndComp = null;
	eRow = null;
	eValue = null;
	rowCnt = null;
	editValue = null;
	chk = null;
	arrValue = null;
	resultIndex = null;
}

/**
 * Filter Setting 팝업 검색결과 Grid Head Click 이벤트
 * @name _evtGridHeadClick
 * @function 
 * @param {object} obj component 객체
 * @param {object} e nexacro.GridClickEventInfo 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._evtGridHeadClick = function( obj, e ) {
	var type = this.settingPopInfo.data.type;
	var comboValue = this.settingPopComp.popCboItemFilter.value;
	var targetEditComp = this.settingPopComp.popEdtItemFilterEdit;

	if(!NxPivotUtil.isEmpty(comboValue) && type != "date"){	
		var objDs = this.settingPopInfo.filterDataSource;
		var checkflag = obj._checkflag;
		
		objDs.set_enableevent(false);
	
		var objDsCnt = objDs.getRowCount();
		
		if(objDsCnt > 0){
			if(checkflag == 0){
				obj._checkflag = 1;
				obj.setCellProperty("head",0,"text",this.language.setting.checkflag[0].text);
				
				var sValues = "";
				
				for(var i=0;i<objDsCnt;i++){
					objDs.setColumn(i,"chk",1);
					
					sValues += objDs.getColumn(i, "value") + ",";
				}
				
				targetEditComp.set_value("");
				sValues = sValues.substring(0,sValues.length-1);
				targetEditComp.set_value(sValues);
			}else{
				obj._checkflag = 0;		
				obj.setCellProperty("head",0,"text",this.language.setting.checkflag[1].text);
				
				for(var i=objDsCnt-1;i>=0;i--) objDs.setColumn(i,"chk",0);
				
				targetEditComp.set_value("");
			}
		}
		
		objDs.set_enableevent(true);
	}

	type = null;
	comboValue = null;
	targetEditComp = null;
	objDs = null;
	checkflag = null;
	objDsCnt = null;
	sValues = null;
}

/**
 * Filter Setting 팝업 내 컴포넌트 조건에 따른 UI 변경
 * @name _settingPopValueChange
 * @function 
 * @param {string} itemType itemAxis 문자열
 * @param {string} type col type 문자열
 * @param {string} value filter 조건 문자열
 * @param {string} mValue filter 조건 값 문자열
 * @param {string} sValue type date 시 기간시작 값 문자열
 * @param {string} eValue type date 시 기간종료 값 문자열
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._settingPopValueChange = function(itemType ,type ,value ,mValue ,sValue ,eValue) {
 	var settingPop = this.settingPop;
 	var settingPopComp = this.settingPopComp;
	
	value = value || "";
	mValue = mValue || "";
	sValue = sValue || "";
	eValue = eValue || "";

 	settingPopComp.popGrdItemFilterGrid.set_formats("<Format id=\"default\"></Format>");
	
	if(type == "date"){
		if(value == "between"){
			settingPopComp.popEdtItemFilterEdit.set_visible(false);
			settingPopComp.popCalItemEdit.set_visible(true);
			settingPopComp.popCalItemEdit.set_enable(false);
			settingPopComp.popCalItemEdit.set_value("");
			settingPopComp.popCalItemStart.set_visible(true);
			settingPopComp.popCalItemStart.set_value(sValue);				
			settingPopComp.popCalItemEnd.set_visible(true);
			settingPopComp.popCalItemEnd.set_value(eValue);
			
			settingPopComp.popEdtItemSearchTit.set_visible(false);
			settingPopComp.popEdtItemListSearch.set_visible(false);			
			
			settingPopComp.popGrdItemFilterGrid.set_formats(this.popGridFormat2);
		}else{
			if(NxPivotUtil.isEmpty(value)){
				settingPopComp.popCalItemEdit.set_enable(false);
				settingPopComp.popCalItemEdit.set_value("");
			}else{
				settingPopComp.popCalItemEdit.set_enable(true);
				settingPopComp.popCalItemEdit.set_value(mValue);
			}

			settingPopComp.popEdtItemFilterEdit.set_visible(false);
			settingPopComp.popCalItemEdit.set_visible(true);
			settingPopComp.popCalItemStart.set_visible(false);
			settingPopComp.popCalItemStart.set_value("");
			settingPopComp.popCalItemEnd.set_visible(false);
			settingPopComp.popCalItemStart.set_value("");
			
			settingPopComp.popEdtItemSearchTit.set_visible(true);
			settingPopComp.popEdtItemListSearch.set_visible(true);
			
			settingPopComp.popGrdItemFilterGrid.set_formats(this.popGridFormat3);
		}
		
		settingPopComp.popCboItemFilter.set_value(value);
	}else{
		if(NxPivotUtil.isEmpty(value)){
			settingPopComp.popEdtItemFilterEdit.set_enable(false);
			settingPopComp.popEdtItemFilterEdit.set_value("");
		}else{
			settingPopComp.popEdtItemFilterEdit.set_enable(true);
			settingPopComp.popEdtItemFilterEdit.set_value(mValue);
		}
		
		settingPopComp.popCboItemFilter.set_value(value);
		settingPopComp.popEdtItemFilterEdit.set_visible(true);
		settingPopComp.popCalItemEdit.set_visible(false);
		settingPopComp.popCalItemEdit.set_enable(true);
		settingPopComp.popCalItemEdit.set_value("");
		settingPopComp.popCalItemStart.set_visible(false);
		settingPopComp.popCalItemStart.set_value("");
		settingPopComp.popCalItemEnd.set_visible(false);
		settingPopComp.popCalItemStart.set_value("");
		
		settingPopComp.popEdtItemSearchTit.set_visible(true);
		settingPopComp.popEdtItemListSearch.set_visible(true);
		
		if(value == "ct" || value == "nct"){
			settingPopComp.popGrdItemFilterGrid.set_formats(this.popGridFormat3);		
		}else{
			settingPopComp.popGrdItemFilterGrid.set_formats(this.popGridFormat1);
			settingPopComp.popGrdItemFilterGrid.setCellProperty("head",0,"text",this.language.setting.checkflag[1].text);
			settingPopComp.popGrdItemFilterGrid._checkflag = 0;	
		}
	}

	this._settingPopUIChange(itemType);
	
	if(NxPivotUtil.isEmpty(value)){
		settingPopComp.popGrdItemFilterGrid.set_enable(false);
	}else{
		settingPopComp.popGrdItemFilterGrid.set_enable(true);
	}
	
	settingPop = null;	
 	settingPopComp = null;
}

/**
 * Filter Setting 팝업 내 컴포넌트 조건에 따른 UI 위치 변경
 * @name _settingPopUIChange
 * @function 
 * @param {string} sType Axis 타입 문자열
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._settingPopUIChange = function( sType ) {
	var settingPop = this.settingPop;
	var settingPopComp = this.settingPopComp;

	var top = settingPopComp.popStaItemFilterTit.getOffsetBottom() - 1;
	var height = settingPopComp.popStaItemFilterTit.getOffsetHeight() - 1;

	settingPopComp.popCboItemFilter.set_top(top + 4);
	settingPopComp.popCboItemFilter.set_height(settingPopComp.popCboItemFilter.getOffsetHeight());
	settingPopComp.popEdtItemFilterEdit.set_top(top + 4);
	settingPopComp.popEdtItemFilterEdit.set_height(settingPopComp.popEdtItemFilterEdit.getOffsetHeight());
	settingPopComp.popCalItemEdit.set_top(top + 4);
	settingPopComp.popCalItemEdit.set_height(settingPopComp.popCalItemEdit.getOffsetHeight());		

	top += (settingPopComp.popCboItemFilter.getOffsetHeight() + 4);

	if(settingPopComp.popCalItemStart.visible){
		settingPopComp.popCalItemStart.set_top(top + 4);
		settingPopComp.popCalItemStart.set_height(settingPopComp.popCalItemEdit.getOffsetHeight());
		settingPopComp.popCalItemEnd.set_top(top + 4);
		settingPopComp.popCalItemEnd.set_height(settingPopComp.popCalItemEdit.getOffsetHeight());		

		top += (settingPopComp.popCalItemStart.getOffsetHeight() + 3);
	}

	settingPopComp.popEdtItemSearchTit.set_top(top + 4);
	settingPopComp.popEdtItemSearchTit.set_height(settingPopComp.popEdtItemSearchTit.getOffsetHeight());
	settingPopComp.popEdtItemListSearch.set_top(top + 4);
	settingPopComp.popEdtItemListSearch.set_height(settingPopComp.popEdtItemListSearch.getOffsetHeight());
	
	if(settingPopComp.popCalItemStart.visible){
		settingPopComp.popGrdItemFilterGrid.set_top(4 + top + 2);	
	}else{
		top += (settingPopComp.popEdtItemListSearch.getOffsetHeight() + 4);		
		settingPopComp.popGrdItemFilterGrid.set_top(top + 2);				
	}

	settingPop = null;	
	settingPopComp = null;
	top = null;
	height = null;
}

/**
 * Toolbar 영역 생성
 * @name _createToolbarArea
 * @function 
 * @param {object} target Pivot Div 객체
 * @param {object} panel Panel Div 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._createToolbarArea = function( target ,panel ) {
	var panelStyle = this.panelStyle;
	var toolbarArea;

	if(this.usetoolbar){
		toolbarArea = new Div("toolbar", 0, 0, null, nexacro.toNumber(panelStyle.toolbar.size), 0, null);
	}else{
		toolbarArea = new Div("toolbar", 0, 0, null, 0, 0, null);
	}

	panel.addChild("toolbar", toolbarArea); 
	toolbarArea.set_cssclass(panelStyle.toolbar.cssclass);
	toolbarArea.form.set_scrollbartype("none");
	toolbarArea.set_tabstop(false);
	toolbarArea.show();
	
	this.targetToolbar = toolbarArea;
	
	this._createToolbarButton( target ,panel );

	toolbarArea = null;
	panelStyle = null;
}

/**
 * Toolbar 영역 내의 버튼 생성
 * @name _createToolbarButton
 * @function 
 * @param {object} target Pivot Div 객체
 * @param {object} panel Panel Div 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._createToolbarButton = function( target ,panel ) {
	var panelStyle = this.panelStyle;
	var toolbarArea = this.targetToolbar;
	var buttons = this.toolbarAreaInfo.buttons;
	var buttonsLength = buttons.length;
	var padding = panelStyle.toolbar.padding.split(" ");
	var width = nexacro.toNumber(panelStyle.toolbar.buttonsize);
	var height = nexacro.toNumber(panelStyle.toolbar.size) - (nexacro.toNumber(padding[1]) + nexacro.toNumber(padding[3]));
	var gap = nexacro.toNumber(panelStyle.toolbar.gap);
	var x = 0;
	var y = 0;
	var right = 0;
	var bottom = 0;
	
	x = nexacro.toNumber(padding[0]);
	y = nexacro.toNumber(padding[1]);

	for(var i=0;i<buttonsLength;i++){
		if(!buttons[i].use || buttons[i].align.split("-")[0] != "left") continue;
		
		this._createToolbarButtonComp(toolbarArea, i, x , y, width, null, null, padding[3]);

		if(buttons[i].type == this.commCodeToolbar.buttontypes[1].key ){
			if(this.rowtotalposition != "none") x += (width + gap);
		}else if(buttons[i].type == this.commCodeToolbar.buttontypes[2].key ){
			if(this.coltotalposition != "none") x += (width + gap);
		}else{
			x += (width + gap);
		}
	}

	right = nexacro.toNumber(padding[3]);

	for(var i=buttonsLength-1;i>=0;i--){
		if(!buttons[i].use || buttons[i].align.split("-")[0] != "right") continue;
		
		this._createToolbarButtonComp(toolbarArea, i, null, y, width, null, right, padding[3]);		
		
		if(buttons[i].type == this.commCodeToolbar.buttontypes[1].key ){
			if(this.rowtotalposition != "none") right += (width + gap);
		}else if(buttons[i].type == this.commCodeToolbar.buttontypes[2].key ){
			if(this.coltotalposition != "none") right += (width + gap);
		}else{
			right += (width + gap);
		}
	}
	
	panelStyle = null;
	toolbarArea = null;
	buttons = null;
	buttonsLength = null;
	padding = null;
	width = null;
	height = null;
	gap = null;
	x = null;
	y = null;
	right = null;
	bottom = null;
}

/**
 * Toolbar 영역 내의 버튼 실제 Component 생성
 * @name _createToolbarButtonComp
 * @function 
 * @param {object} toolbarArea 툴바영역 Div 객체
 * @param {number} compIdx 버튼 index
 * @param {number} x 생성할 버튼의 x 좌표
 * @param {number} y 생성할 버튼의 y 좌표
 * @param {number} width 생성할 버튼의 width
 * @param {number} height 생성할 버튼의 height
 * @param {number} right 생성할 버튼의 right
 * @param {number} bottom 생성할 버튼의 bottom
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._createToolbarButtonComp = function(toolbarArea, compIdx, x, y, width, height, right, bottom) {
	var buttons = this.toolbarAreaInfo.buttons;
	var comp = new Button(buttons[compIdx].compid, x, y, width, height, right, bottom);
	
	toolbarArea.form.addChild(buttons[compIdx].compid, comp); 

	comp.compid = buttons[compIdx].compid;
	comp.type = buttons[compIdx].type;
	comp.objid = buttons[compIdx].objid;
	comp._toggle = buttons[compIdx].toggleYn;
	comp._togglevalue =buttons[compIdx].togglevalue;
	comp._tooltiptext = buttons[compIdx].tooltiptext || "";
	comp._style = buttons[compIdx].cssclass || "";
	
	if(buttons[compIdx].toggleYn){
		comp._flag = 0; 
		
		comp.set_tooltiptext( (comp._tooltiptext).split(",")[comp._flag]);		
		comp.set_cssclass((comp._style).split(",")[comp._flag]);
	}else{
		comp._flag = 0;

		comp.set_tooltiptext( comp._tooltiptext );		
		comp.set_cssclass(comp._style);
	}

	comp.set_cursor("pointer");		
	comp.set_tabstop(false);	
	
	if(comp.type == this.commCodeToolbar.buttontypes[1].key ){
		if(this.rowtotalposition == "none") comp.set_visible(false);
		else comp.set_visible(true);
	}

	if(comp.type == this.commCodeToolbar.buttontypes[2].key ){
		if(this.coltotalposition == "none") comp.set_visible(false);
		else comp.set_visible(true);
	}

	comp.show();

	if(comp.findEventHandler("onclick", this._toolbarItemClick, this) < 0){
		nexacro.NxPivot.View.Event.add("onclick" ,comp,this._toolbarItemClick,this);
	}

	buttons = null;
	comp = null;
	toolbarArea = null;
}

/**
 * Axis 영역 내의 항목 Item 생성
 * @name _createItem
 * @function 
 * @param {object} target Axis 영역 Div 객체
 * @param {string} itemType Axis 종류 문자열
 * @param {object} config config 정보 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._createItem = function( target, itemType, config ) {
	var panelStyle = this.panelStyle;
	var items = config[ itemType ];
	var itemsCnt = items.length;
	var gap = nexacro.toNumber(panelStyle.items.gap);

	var panelArea = this.targetPanel;

	var obj_div_axis = panelArea.form[itemType];
	var obj_div_itemType_title = obj_div_axis.form["title"];

	var top = obj_div_itemType_title.getOffsetTop() + obj_div_itemType_title.getOffsetHeight() + nexacro.toNumber(gap);
	var left = obj_div_itemType_title.getOffsetLeft();

	var axisLimitRight = obj_div_axis.getOffsetWidth() - this.axisAreaScrollbarWidth;
	var axisLimitBottom = obj_div_axis.getOffsetHeight();
	
	var lastItemBottom = -1;
	var itemWidth = nexacro.toNumber(panelStyle.items.item.width);
	var itemHeight = nexacro.toNumber(panelStyle.items.item.height);
	var borderRect = [];
	var item = null;

	for(var i=0;i<itemsCnt;i++){
		if(axisLimitRight <= ( left + itemWidth + gap)){
			left =  obj_div_itemType_title.getOffsetLeft();
			top += (itemHeight + gap);
		}

 		item = new nexacro.NxPivot.View.Panel.Item(this, this.pivot.config);
 		item._createItem(obj_div_axis.form ,itemType ,items[i] ,left, top, itemWidth, itemHeight, null, null);
	
		this[itemType+"Items"].push(item);

		left += (itemWidth + gap);
		lastItemBottom = (top +itemHeight + gap);
	}

	var tempBottom = new Static("tempBottom", obj_div_itemType_title.getOffsetLeft(), lastItemBottom + 2, itemWidth, 0, null, null);
	obj_div_axis.form.addChild("tempBottom", tempBottom); 
	tempBottom.set_visible(true);
//	tempBottom.set_background("red");
	tempBottom.show();

	if(item && this.itemInfo.borderRect.length < 1){
		borderRect = NxPivotUtil.getBorderWidth(item.objLayout);	
		this.itemInfo.borderRect = borderRect;
	}

	obj_div_axis.form.resetScroll();
	
	panelStyle = null;
	items = null;
	itemsCnt = null;
	gap = null;
	panelArea = null;
	obj_div_axis = null;
	obj_div_itemType_title = null;
	top = null;
	left = null;
	axisLimitRight = null;
	axisLimitBottom = null;
	lastItemBottom = null;
	itemWidth = null;
	itemHeight = null;
	borderRect = null;
	item = null;
	tempBottom = null;
}

/**
 * 컴포넌트에 표시될 수 있는 문자열을 체크해 줄인 문자열 반환
 * @name _getAbbreviation
 * @function 
 * @param {object} comp component 객체
 * @param {number} limitSize 제한길이
 * @param {string} sText 전체 Text 문자열
 * @return {string} 표시될 문자열
 * @private
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._getAbbreviation = function(comp ,limitSize ,sText) {
	try{
		var nWidth = limitSize;
		var objFont = this._getFont(comp);
		var sizeObj = nexacro.getTextSize(sText,objFont);
		var tempTxt = "";

		if(nWidth <= sizeObj.nx){
			tempTxt = "";
			for(var i=0;i<sText.length;i++){
				var txtSizeObj = nexacro.getTextSize(sText.substr(0,i+1) + "..." ,objFont);
				if(txtSizeObj.nx >= nWidth){
					tempTxt = sText.substr(0,i) + "...";
					break;
				}
				
				txtSizeObj = null;
			}
			
			return tempTxt;
		}else{
			tempTxt = sText;
			return tempTxt;
		}
	}finally{
		nWidth = null;
		objFont = null;
		sizeObj = null;
		tempTxt = null;
	}
}

/**
 * 해당 컴포넌트의 Font 객체 반환
 * @name _getFont
 * @function 
 * @param {object} comp component 객체
 * @return {objec} 해당 컴포넌트 Font 객체
 * @private
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._getFont = function( comp ) {
	try{
		var rtnFontStyle;
		if(NxPivotUtil.isEmpty(comp.font)){
			rtnFontStyle = comp._getCurrentStyleInheritValue("font");
			return rtnFontStyle;
		}else{
			rtnFontStyle = comp.font;
			return rtnFontStyle;
		}
	}finally{
		rtnFontStyle = null;
	}
}

/**
 * 항목 Item 객체 반환
 * @name _getAxisItemObject
 * @function 
 * @param {string} colid 해당 항목 ID 문자열
 * @param {string} axisType 해당 항목이 속해 있는 Axis 종류 문자열
 * @return {object} 항목 Item 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._getAxisItemObject = function(colid, axisType) {
	try{
		var itemObj = null;
		var axisCnt = 0;
		var tempArray = [];
		
		if(NxPivotUtil.isEmpty(axisType)){
			tempArray = tempArray.concat(this.fieldsItems, this.colAxisItems, this.rowAxisItems, this.valuesItems);
		}else{		
			tempArray = this[axisType+"Items"];
		}

		axisCnt = tempArray.length;

		for(var i=0;i<axisCnt;i++){
			if(tempArray[i].id == colid){
				itemObj = tempArray[i];
				break;
			}		
		}
		
		tempArray = null;

		return itemObj;
	}finally{
		itemObj = null;
		axisCnt = null;
		tempArray = null;
	}
}

/**
 * Setting List 메뉴팝업 리스트 오픈
 * @name _settingListPopupOpen
 * @function 
 * @param {object} obj component 객체
 * @param {object} e nexacro.ClickEventInfo 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._settingListPopupOpen = function( obj, e ) {
	var panel = this.targetPanel;
	var panelStyle = this.panelStyle;
	var setPopupListComp = this.setPopupListComp;
	var itemId = obj.id.split("_NxPivot")[0];
	var tempItem = this._getAxisItemObject(itemId);
	var isfilter = this.pivot.config._isValidFilterId(itemId, ["filters"]);
	var field = this.pivot.config.getFieldItem(itemId);

	var itemArea = obj.parent.parent;
	var itemObj = tempItem.objLayout;
	
	var axisType = tempItem._itemType;	
	var itemText = field.itemText;
	var aggType = (typeof field.aggregator != "string")?field.aggregator.name:field.aggregator;
	
	var aggDs = this.aggDsDatasource;
	var aggCnt = aggDs.getRowCount();
	var setPopupItem = setPopupListComp.form;
	var arrBorder = NxPivotUtil.getBorderWidth(this.setPopupListComp);
	var nVBorder = nexacro.toNumber(arrBorder[0])+nexacro.toNumber(arrBorder[2]);
	var nHBorder = nexacro.toNumber(arrBorder[1])+nexacro.toNumber(arrBorder[3]);
	var nLineGap = 6;
	
	var clearFilterText = this.language.settingPopList.rowCol[2].text+" \""+itemText+"\" ";
	var padding = NxPivotUtil.getPadding(setPopupItem["clearfilter"]);

	if(padding){
		if(padding.length == 1) padding = nexacro.toNumber(padding[0])*2;
		else padding = nexacro.toNumber(padding[0])+nexacro.toNumber(padding[2]);
	}

	var nWidth = this._getCompTextSize(setPopupItem["clearfilter"], clearFilterText) + padding + 10;
	var nPopupDivWidth = nWidth;
	var nPopupDivHieght = 0;
	
	if(axisType == "colAxis" || axisType == "rowAxis"){
		var asc = setPopupItem["asc"];
		var asc_img = setPopupItem["asc_img"];
		var desc = setPopupItem["desc"];
		var desc_img = setPopupItem["desc_img"];
		var sortline = setPopupItem["sortline"];
		var top = sortline.getOffsetBottom() + 1;
		var height = asc.getOffsetHeight();
		
		asc.set_width(nWidth);
		asc.set_visible(true);
		asc_img.set_visible(true);
		desc.set_visible(true);
		desc.set_width(nWidth);
		desc_img.set_visible(true);
		sortline.set_width(nWidth-nLineGap);
		sortline.set_visible(true);

		for(var i=0;i<aggCnt;i++){
			setPopupItem[aggDs.getColumn(i,0)].set_visible(false);
			setPopupItem[aggDs.getColumn(i,0)+"_img"].set_visible(false);
		}
		
		setPopupItem["customfx"].set_visible(false);
		setPopupItem["customfx_img"].set_visible(false);
		
		setPopupItem["aggLine"].set_visible(false);
		
		if(isfilter) setPopupItem["clearfilter"].set_enable(true);
		else setPopupItem["clearfilter"].set_enable(false);
		
		setPopupItem["clearfilter"].set_top(top);
		setPopupItem["clearfilter"].set_width(nWidth);
		setPopupItem["clearfilter"].set_text(clearFilterText);
		setPopupItem["clearfilter_img"].set_top(top);

		top += height;
		setPopupItem["addfilter"].set_top(top);
		setPopupItem["addfilter"].set_width(nWidth);
		setPopupItem["addfilter_img"].set_top(top);
		top += height;
		
		setPopupItem["aggLine"].set_visible(true);
 		setPopupItem["clearfilter"].set_visible(true);
		setPopupItem["clearfilter_img"].set_visible(true);
		setPopupItem["addfilter"].set_visible(true);
		setPopupItem["addfilter_img"].set_visible(true);
		
		nPopupDivWidth += nVBorder;
	}else{
		setPopupItem["asc"].set_visible(false);
		setPopupItem["asc_img"].set_visible(false);
		setPopupItem["desc"].set_visible(false);
		setPopupItem["desc_img"].set_visible(false);
		setPopupItem["sortline"].set_visible(false);
		
		var top = 0;
		var height = 0;
		var compWidth = 0;
		var customfxWidth = 0;
		var customAgg = this.pivot.config.customAggregator[itemId];

		for(var i=0;i<aggCnt;i++){		
			var key = aggDs.getColumn(i,0);
			var value = aggDs.getColumn(i,1);
			var itemWidth = this._getCompTextSize(setPopupItem[key], value)
			
			if(compWidth < itemWidth) compWidth = itemWidth;
		}		
		
		if(customAgg){
			customfxWidth = this._getCompTextSize(setPopupItem["customfx"], customAgg.name);		
			if(compWidth < customfxWidth) compWidth = customfxWidth;
		}
		
		if(compWidth <= nexacro.toNumber(panelStyle.items.item.width)){
			nWidth = nexacro.toNumber(panelStyle.items.item.width);
		}else{
			nWidth = compWidth + padding + 10 + nVBorder;
		}

		nPopupDivWidth = nWidth;
		
		for(var i=0;i<aggCnt;i++){		
			var key = aggDs.getColumn(i,0);
			setPopupItem[key].set_top(top);
			setPopupItem[key].set_width(nWidth);
			setPopupItem[key].set_visible(true);
			setPopupItem[key+"_img"].set_top(top);
			
			if(key == aggType){			
				setPopupItem[key+"_img"].set_visible(true);
			}else{
				setPopupItem[key+"_img"].set_visible(false);
			}
			
			height = setPopupItem[key].getOffsetHeight(); 
			
			top += height;
		}
		
		if(customAgg){
			setPopupItem["customfx"].set_top(top);
			setPopupItem["customfx"].set_width(nWidth);
			setPopupItem["customfx"].set_text(customAgg.name);
			setPopupItem["customfx"].set_visible(true);
			
			setPopupItem["customfx_img"].set_top(top);

			if(aggType == customAgg.name) setPopupItem["customfx_img"].set_visible(true);
			else setPopupItem["customfx_img"].set_visible(false);
			
			height = setPopupItem["customfx"].getOffsetHeight(); 
			top += height;
		}

		setPopupItem["aggLine"].set_visible(false);
 		setPopupItem["clearfilter"].set_visible(false);
		setPopupItem["clearfilter_img"].set_visible(false);
		setPopupItem["addfilter"].set_visible(false);
		setPopupItem["addfilter_img"].set_visible(false);
	}

	setPopupListComp._itemId = itemId;
	setPopupListComp._sort = field.sort;
	setPopupListComp._aggregator = field.aggregator;
		
	nPopupDivHieght = top;	
	nPopupDivHieght += nHBorder;
	
	setPopupItem.resetScroll();
	setPopupItem.set_scrollbartype("none");

	if(this.panelType == "top"){
		if(itemArea.getOffsetLeft()+itemObj.getOffsetLeft() + nPopupDivWidth < panel.getOffsetRight())	{
			setPopupListComp.trackPopupByComponent(itemObj, 0, panelStyle.items.item.height, nPopupDivWidth, nPopupDivHieght, "", true );
		}else{
			var nGap = nPopupDivWidth - nexacro.toNumber(panelStyle.items.item.width);
			var nX = 0;
			
			if(nGap > 0){
				nX = 0 - nGap;
			}
			
			setPopupListComp.trackPopupByComponent(itemObj, nX, panelStyle.items.item.height, nPopupDivWidth, nPopupDivHieght, "", true );
		}
		
		setPopupListComp._callbackfunction = this._setPopupListDivCallback;
		setPopupListComp._callbackcontext = this;
	}else{
	}
	
	panel = null;
	panelStyle = null;
	setPopupListComp = null;
	itemId = null;
	tempItem = null;
	isfilter = null;
	field = null;
	itemArea = null;
	itemObj = null;
	axisType = null;
	itemText = null;
	aggType = null;
	aggDs = null;
	aggCnt = null;
	setPopupItem = null;
	arrBorder = null;
	nVBorder = null;
	nHBorder = null;
	nLineGap = null;
	clearFilterText = null;
	padding = null;
	nWidth = null;
	nPopupDivWidth = null;
	nPopupDivHieght = null;
	asc = null;
	asc_img = null;
	desc = null;
	desc_img = null;
	sortline = null;
	top = null;
	height = null;
	compWidth = null;
	customfxWidth = null;
	customAgg = null;
}

/**
 * Filter Setting 팝업 오픈
 * @name _panelSettingPopOpen
 * @function 
 * @param {object} obj component 객체
 * @param {string} itemId 항목 ID 문자열
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._panelSettingPopOpen = function( obj , itemId ) {
	var panelStyle = this.panelStyle;
	var target = this.targetView;
	var settingPop = this.settingPop;	
	var tempItem = this._getAxisItemObject(itemId);

 	var panel = this.targetPanel;
 	var panelTop = panel.getOffsetTop();
 	
 	var itemArea = obj.parent.parent;
 	var itemObj = tempItem.objLayout;

	var filterGrid = this.settingPopComp.popGrdItemFilterGrid;
	var filters = [];
	var configFilterCnt = this.pivot.config.filters.length;
	var filterItems = this.pivot.config.getFilterItem(itemId);
	
	if(!NxPivotUtil.isEmpty(filterItems)){
		filters = [filterItems];
	}
	
	settingPop._itemid = tempItem.id;
	settingPop._axisType = tempItem._itemType;
	settingPop._filters = filters;

	var field = this.pivot.config.getFieldItemInfo(itemId);

	this.settingPopInfo.data = field.data;
	this.settingPopInfo.oriFilterDataSource = field.filterDataSource;
	this.settingPopInfo.filter = filters;
	
	var idx = -1;
	var datasource = this.settingPopInfo.filterDataSource;
	var dataCnt = this.settingPopInfo.oriFilterDataSource.getRowCount();
	var dataValue = "";

	datasource.deleteAll();
	datasource.clear();
	datasource.addColumn("chk","string");
	datasource.addColumn("value","string");
	
	field.filterDataSource.set_enableevent(false);
	datasource.set_enableevent(false);
	
	for(var i=0;i<dataCnt;i++){
		idx = datasource.addRow();
		dataValue = this.settingPopInfo.oriFilterDataSource.getColumn(i,"value");

		datasource.setColumn(idx,"chk",0);
		datasource.setColumn(idx,"value",dataValue);
	}
	
	datasource.set_keystring("S:value");
	
	var filterString = "";
	
	if(filters.length > 0){
		if(filters[0].operation=="eq" || filters[0].operation=="neq"){		
			for(var i=0;i<filters[0].values.length;i++){
				if(i==0) filterString += "value=='"+filters[0].values[i]+"'"
				
				filterString += "||value=='"+filters[0].values[i]+"'"
			}
		}else{
			filterString += "value=='"+filters[0].values.toString()+"'"
		}

		datasource.filter(filterString);
		
		dataCnt = datasource.getRowCount();
		
		for(var i=0;i<dataCnt;i++){
			datasource.setColumn(i,"chk",1);
		}
		
		datasource.filter("");
	}
	
	datasource.set_enableevent(true);
	field.filterDataSource.set_enableevent(true);
	
	var filterData = this.language.filter[field.data.type];
	var filterDataCnt = filterData.length;

	idx = -1;
	
	var objFilterDataset = this.filterCodeDatasource;
	
	objFilterDataset.deleteAll();
	objFilterDataset.clear();
	objFilterDataset.addColumn("codecolumn","string");
	objFilterDataset.addColumn("datacolumn","string");

	idx = objFilterDataset.addRow();
	objFilterDataset.setColumn(idx,"codecolumn",this.language.setting.filter[0].key);
	objFilterDataset.setColumn(idx,"datacolumn",this.language.setting.filter[0].text);
		
	//항목필터 조건 콤보설정
	for(var i=0;i<filterDataCnt;i++){
		idx = objFilterDataset.addRow();
		objFilterDataset.setColumn(idx,"codecolumn",filterData[i].key);
		objFilterDataset.setColumn(idx,"datacolumn",filterData[i].text);		
	}
	
	var type = field.data.type;
	var operation;
	
	settingPop._type = type;
	settingPop._itemText = field.data.itemText;
	settingPop._itemWidth = field.data.itemWidth;
	settingPop._sort = field.data.sort;
	settingPop._aggregator = field.data.aggregator;

	if(this.settingPopInfo.filter.length < 1){	//filters config 가 없을시
		settingPop._operation = "";
		operation = "";
		settingPop._filterStr = "";
		
		this.settingPopComp.popEdtItemFilterEdit.set_value("");

		this._settingPopValueChange( settingPop._axisType  ,type ,operation );
	}else{								//filters config 가 있을시
		var filter = this.settingPopInfo.filter[0];

		settingPop._operation = filter.operation;
		operation = filter.operation;

		if(type == "date"){
			this.settingPopComp.popEdtItemFilterEdit.set_value("");
			
			if(operation == "between"){	//기간
				settingPop._filterStr = filter.values[0]+","+filter.values[1];
				this._settingPopValueChange( settingPop._axisType, type, operation, "", filter.values[0], filter.values[1] );	
			}else{				
				settingPop._filterStr = filter.values[0];
				this._settingPopValueChange( settingPop._axisType, type, operation, filter.values[0] );	
			}				
		}else{
			var filterStr = (filter)?filter.values.toString():"";
			settingPop._filterStr = filterStr;
			
			this.settingPopComp.popEdtItemFilterEdit.set_value(filterStr);
			
			if(filter.operation=="eq" || filter.operation=="neq"){		//같음|같지않음
				this._settingPopValueChange( settingPop._axisType, type, operation, filterStr );
			}else{
				this._settingPopValueChange( settingPop._axisType, type, operation, filterStr );	
			}
		}
	}
	
	this.settingPopComp.popEdtItemListSearch.set_value("");

	datasource.set_rowposition(-1);
	
	filterGrid.set_binddataset("");
	filterGrid.set_binddataset(datasource.name);	
	
	datasource.set_rowposition(0);
	
	filterGrid._checkflag = 0;
	filterGrid.setCellProperty("head",0,"text",this.language.setting.checkflag[1].text);

	var nPopupDivWidth = settingPop.getOffsetWidth();
	var nPopupDivHieght = settingPop.getOffsetHeight(); 

	if(this.panelType == "top"){
		if(itemArea.getOffsetLeft()+itemObj.getOffsetLeft() + settingPop.getOffsetWidth() < panel.getOffsetRight())	{
			settingPop.trackPopupByComponent( itemObj, 0, panelStyle.items.item.height, nPopupDivWidth, nPopupDivHieght, "", false );
		}else{
			var nGap = nexacro.toNumber(panelStyle.items.item.width) - settingPop.getOffsetWidth();
			var nX = 0;
			
			if(nGap < 0){
				nX = settingPop.getOffsetWidth() + nGap;
			}else{
				nX = settingPop.getOffsetWidth();
			}
			
			settingPop.trackPopupByComponent( itemObj, nX, panelStyle.items.item.height, nPopupDivWidth, nPopupDivHieght, "", false );
		}

		settingPop._callbackfunction = this._setPopupDivCallback;
		settingPop._callbackcontext = this;
	}else{
	}

	panelStyle = null;
	target = null;
	settingPop = null;
	tempItem = null;
 	panel = null;
 	panelTop = null;
 	itemArea = null;
 	itemObj = null;
	filterGrid = null;
	filters = null;
	configFilterCnt = null;
	filterItems = null;
	field = null;
	idx = null;
	datasource = null;
	dataCnt = null;
	dataValue = null;
	filterString = null;
	filterData = null;
	filterDataCnt = null;
	objFilterDataset = null;
	type = null;
	operation = null;
	filter = null;
	filterStr = null;
	nPopupDivWidth = null;
	nPopupDivHieght = null;
	nGap = null;
	nX = null;
};

/**
 * Setting List 팝업 Callback
 * @name _setPopupListDivCallback
 * @function 
 * @param {string} objid component id 문자열
 * @param {string} rtnValue 팝업 return 문자열
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._setPopupListDivCallback = function(objid, rtnValue) {	
	this.ondrag = false;

	var selectItem = rtnValue;

	if(objid == this.setPopupListComp.id){
		var itemId = this.setPopupListComp._itemId;

		if(rtnValue){
			var item = this._getAxisItemObject(itemId);	

			if(rtnValue == "clearfilter"){
				this.pivot.config.getFieldItemInfo(itemId);

				if(!this.isFilterUpdate) this.isFilterUpdate = true;				
			}else{
				if(rtnValue == "asc" || rtnValue == "desc"){
					if(this.setPopupListComp._sort != rtnValue){
						var field = this.pivot.config.getFieldItem(itemId);
						field.sort = rtnValue;
						
						if(!this.isSortUpdate) this.isSortUpdate = true;
					}
				}else{
					var field = this.pivot.config.getFieldItem(itemId);
					var aggType = (typeof this.setPopupListComp._aggregator);

					if(aggType != "object"){
						if(rtnValue == "customfx"){
							var customAgg = this.pivot.config.customAggregator[itemId];
							
							field.aggregator = customAgg;
							
							if(!this.isAggUpdate) this.isAggUpdate = true;	
						}else{
							if(rtnValue != "addfilter"){
								if(this.setPopupListComp._aggregator != rtnValue){
									field.aggregator = rtnValue;
									
									if(!this.isAggUpdate) this.isAggUpdate = true;									
								}
							}
						}					
					}else{
						if(rtnValue != "customfx"){
							field.aggregator = rtnValue;

							if(!this.isAggUpdate) this.isAggUpdate = true;	
						}
					}
				}
			}			

			item._statusChange();

			if(this.autoexcute){
				var rtn = this._setUpdateExcute();
				if(!rtn) this.targetView.render();
			}
		}else{

		}
	}else{
		this.pivot.error(this.targetView, "error", 4003);
	}
	
	selectItem = null;
	itemId = null;
	item = null;
	field = null;
	aggType = null;
	customAgg = null;
	rtn = null;
};

/**
 * Filter Setting 팝업 Callback
 * @name _setPopupDivCallback
 * @function 
 * @param {string} objid component id 문자열
 * @param {string} rtnValue 팝업 return 문자열
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._setPopupDivCallback = function(objid, rtnValue) {	
	this.ondrag = false;

	var selectItem = rtnValue;

	if(objid == this.settingPop.id){
		if(rtnValue == "submit"){
			if(this.autoexcute){
				var rtn = this._setUpdateExcute();
				if(!rtn) this.targetView.render();
			}			
		}else{
			if(NxPivotUtil.isEmpty(rtnValue)) this._panelSettingClose();
		}
	}else{
		this.pivot.error(this.targetView, "error", 4003);
	}
	
	selectItem = null;
	rtn = null;
};

/**
 * Setting List 메뉴팝업 리스트 ClickEvent
 * @name _setPopupListOnclick
 * @function 
 * @param {object} obj component 객체
 * @param {object} e nexacro.ClickEventInfo 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._setPopupListOnclick = function ( obj, e ){
	this.ondrag = false;
	
	var objid = obj.name;

	var rtn = this.setPopupListComp.closePopup( objid );
	
	if(rtn){
		var itemId = this.setPopupListComp._itemId;
		var item = this._getAxisItemObject(itemId);
		
		if(objid == "addfilter"){
			this._panelSettingPopOpen( item.objLayout, itemId );			
		}
	}
	
	objid = null;
	rtn = null;
	itemId = null;
	item = null;
};

/**
 * Toolbar 버튼 클릭 이벤트
 * @name _toolbarItemClick
 * @function 
 * @param {object} obj component 객체
 * @param {object} e nexacro.ClickEventInfo 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._toolbarItemClick = function( obj, e ) {
	var panelStyle = this.panelStyle;
	var buttons = this.toolbarAreaInfo.buttons;
	var buttonsLength = buttons.length;
	var objType = obj.type;
	var objId = obj.objid;
	var sTooltip = obj._tooltiptext;
	var sCssclass = obj._style;
	var postvalue; 
	var prevalue;
	var rtn_canbuttonclick = true;
	
	if(obj._toggle == 1){
		if(obj._flag == 0){
			postvalue = 1;
			prevalue = 0;
		}else{
			postvalue = 0;
			prevalue = 1;		
		}	
		
		rtn_canbuttonclick = this.targetView.on_fire_cantoolbarbuttonclick(obj, objId, postvalue, prevalue);
	}else{
		postvalue = obj._flag;
		prevalue = obj._flag;
			
		rtn_canbuttonclick = this.targetView.on_fire_cantoolbarbuttonclick(obj, objId, postvalue, prevalue);
	}

	if(rtn_canbuttonclick){
		if(objType == this.commCodeToolbar.buttontypes[0].key){
			this._toggleButtonStatusChange( obj, objType );
		}else if(objType == this.commCodeToolbar.buttontypes[1].key){
			if(obj._flag == 0){
				var rowLeng = this.pivot.config.rowAxis.length;				
				if(rowLeng > 0) this.parent.gridView.drillDownRowDepth(rowLeng);
			}else{
				this.parent.gridView.drillDownRowDepth(0);
			}
		}else if(objType == this.commCodeToolbar.buttontypes[2].key){
			if(obj._flag == 0){
				var colLeng = this.pivot.config.colAxis.length;
				if(colLeng > 0)	this.parent.gridView.drillDownColDepth(colLeng);
			}else{
				this.parent.gridView.drillDownColDepth(0);
			}
		}else if(objType == this.commCodeToolbar.buttontypes[3].key){
			this._toggleButtonStatusChange( obj, objType );
		}else if(objType == this.commCodeToolbar.buttontypes[4].key){
			this._refreshPanel("initialization");
		}else if(objType == this.commCodeToolbar.buttontypes[5].key){	
			var rtn = this._setUpdateExcute();
			if(!rtn) this.targetView.render();
		}else{
			if(obj._toggle){
				var arrTooltip = sTooltip.split(",");
				var arrCssclass = sCssclass.split(",");
				
				if(obj._flag == 0){
					obj._flag = 1;
				}else{
					obj._flag = 0;
				}

				obj.set_tooltiptext((arrTooltip[obj._flag]).trim());
				obj.set_cssclass((arrCssclass[obj._flag]).trim());
			}
		}	

		this.targetView.on_fire_ontoolbarbuttonclick(obj, objId, postvalue, prevalue);
	}
	
	panelStyle = null;
	buttons = null;
	buttonsLength = null;
	objType = null;
	objId = null;
	sTooltip = null;
	sCssclass = null;
	postvalue = null;
	prevalue = null;
	rtn_canbuttonclick = null;
	panel = null;
	grdPivot = null;
	arrTooltip = null;
	arrCssclass = null;
	gridHeight = null;
	rowLeng = null;
	colLeng = null;
	arrTooltip = null;
	arrCssclass = null;
	rtn = null;
}

/**
 * 패널 초기화시 Toolbar 버튼의 초기상태를 설정
 * @name _toggleButtonStatusChange
 * @function 
 * @param {object} obj 버튼 Object
 * @param {string} type 버튼 Type 문자열
 * @param {string|number|N/A} nTogglevalue 설정할 버튼 togglevalue 값
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._toggleButtonStatusChange = function( obj, type, nTogglevalue ){
	var panelStyle = this.panelStyle;
	var objType = obj.type;
	var objId = obj.objid;
	var sTooltip = obj._tooltiptext;
	var sCssclass = obj._style;
	var arrTooltip = sTooltip.split(",");
	var arrCssclass = sCssclass.split(",");
	var objFlag = obj._flag;
			
	if(type == this.commCodeToolbar.buttontypes[0].key){	
		var panel = this.targetPanel;

		if(!NxPivotUtil.isEmpty(nTogglevalue)){
			if(nTogglevalue == 0) objFlag = 1;
			else objFlag = 0;
		}

		if(objFlag == 0){
			obj._flag = 1;
			panel.set_height(nexacro.toNumber(panelStyle.toolbar.size));
		}else{
			obj._flag = 0;
			panel.set_height(nexacro.toNumber(panelStyle.items.size) + nexacro.toNumber(panelStyle.toolbar.size));
		}
	
		obj.set_tooltiptext((arrTooltip[obj._flag]).trim());
		obj.set_cssclass((arrCssclass[obj._flag]).trim());		
	}else if(type == this.commCodeToolbar.buttontypes[1].key || type == this.commCodeToolbar.buttontypes[2].key || type == this.commCodeToolbar.buttontypes[3].key){
		if(!NxPivotUtil.isEmpty(nTogglevalue)){
			if(nTogglevalue == 0) objFlag = 1;
			else objFlag = 0;
		}

		if(objFlag == 0){
			obj._flag = 1;
			
			if(type == this.commCodeToolbar.buttontypes[3].key)	this.autoexcute = true;
		}else{
			obj._flag = 0;
			
			if(type == this.commCodeToolbar.buttontypes[3].key) this.autoexcute = false;
		}

		obj.set_tooltiptext((arrTooltip[obj._flag]).trim());
		obj.set_cssclass((arrCssclass[obj._flag]).trim());
	}
	
	this.targetView.form.resetScroll();
	
	panelStyle = null;
	objType = null;
	objId = null;
	sTooltip = null;
	sCssclass = null;
	arrTooltip = null;
	arrCssclass = null;
	objFlag = null;
	panel = null;
};

/**
 * Pivot Panel Redraw
 * @name _refreshPanel
 * @function 
 * @param {string} type Redraw 타입 (initialization|redraw)
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._refreshPanel = function( type ) {
	
	if(type == "initialization"){
		this.pivot._isRended = false;
		this.pivot.cube._isCompleteDistinctValues = false;

		this.pivot.refresh();				
		this._setPanelInitReDraw(this.pivot._orgConfig.config, type);
		this.parent.refresh();
	}else if(type == "redraw"){
		this.pivot.config.initData();		
		this._setPanelInitReDraw(this.pivot.config);
	}
};

/**
 * Toolbar rowsstatus/columnsstatus 버튼 상태 변경
 * @name _setStatusToolbarButton
 * @function 
 * @param {string} sBtnType 버튼타입 (rowsstatus|columnsstatus)
 * @param {boolean} bExpand 펼침여부 (true|false)
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._setStatusToolbarButton = function( sBtnType, bExpand ) {
	var comps = this.targetToolbar.form.components;
	var compCnt = comps.length;
	
	if(sBtnType == this.commCodeToolbar.buttontypes[1].key || sBtnType == this.commCodeToolbar.buttontypes[2].key){
		var obj;
		
		for(var i=0;i<compCnt;i++){
			if(comps[i].type == sBtnType){
				obj = comps[i];
				break;
			}
		}
		
		if(obj){
			var compId = obj.compid;
			var objType = obj.type;
			var objId = obj.objid;
			var sTooltip = obj._tooltiptext;
			var sCssclass = obj._style;
	
			var arrTooltip = sTooltip.split(",");
			var arrCssclass = sCssclass.split(",");
		
			if(bExpand){
				obj._flag = 1;		
			}else{
				obj._flag = 0;
			}
			
			obj.set_tooltiptext((arrTooltip[obj._flag]).trim());
			obj.set_cssclass((arrCssclass[obj._flag]).trim());
		}
	}
	
	comps = null;
	compCnt = null;
	obj = null;
	compId = null;
	objType = null;
	objId = null;
	sTooltip = null;
	sCssclass = null;
	arrTooltip = null;
	arrCssclass = null;
};

/**
 * Panel 영역 초기화
 * @name _setPanelInitReDraw
 * @function 
 * @param {object} objConfig Axis Item 항목 설정정보
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._setPanelInitReDraw = function(objConfig) {
	this._removePanel();

	this._removeToolbarArea();
	this._resetToolbarInfo();
	this._removeDragComp();
	this._removeAxisArea();
	this._resetAxisAreaInfo();

	this._reDrawPanel(objConfig);
};

/**
 * 해당 컴포넌트 의 자식컴포넌트 삭제
 * @name _removeChildObj
 * @function 
 * @param {object} parentObj context 컴포넌트 객체
 * @private
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._removeChildObj = function( parentObj ) {
	var comps = parentObj.form.components;
	var compLength = comps.length;
	var rtnObj;	
	
	for(var i=compLength-1;i>=0;i--){
		rtnObj = parentObj.form.removeChild(comps[i].id);
		
		rtnObj.destroy();
		rtnObj = null;
	}
	
	comps = null;
	compLength = null;
	rtnObj = null;	
};

/**
 * Panel 영역 내의 컴포넌트 삭제
 * @name _removePanel
 * @function 
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._removePanel = function() {
	var compLength = this.targetPanel.form.components.length;
	var panel = this.targetPanel;
	var targetView = this.targetView;
	var rtnObj;
	
	for(var i=0;i<compLength;i++){
		var compLength2 = 0;
		
		if(this.targetPanel.form.components[i].form){
			compLength2 = panel.form.components[i].form.components.length;
			
			for(var j=compLength2-1;j>=0;j--){
				rtnObj = panel.form.components[i].form.removeChild(panel.form.components[i].form.components[j].id);
				
				rtnObj.destroy();
				rtnObj = null;
			}
		}else{
			compLength2 = panel.form.components[i].components.length;
			
			for(var j=compLength2-1;j>=0;j--){
				rtnObj = panel.form.components[i].form.removeChild(panel.form.components[i].components[j].id);
				
				rtnObj.destroy();
				rtnObj = null;
			}
		}
	}
	
	for(var i=compLength-1;i>=0;i--){
		rtnObj = panel.removeChild(panel.form.components[i].id);
		
		rtnObj.destroy();
		rtnObj = null;			
	}
	
	compLength = null;
	panel = null;
	targetView = null;
	rtnObj = null;
	compLength2 = null;
};

/**
 * Toobar 영역 내의 컴포넌트 삭제
 * @name _removeToolbarArea
 * @function 
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._removeToolbarArea = function() {

};

/**
 * Toobar 관련정보 초기화
 * @name _resetToolbarInfo
 * @function 
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._resetToolbarInfo = function() {
	this.autoexcute = false;
};

/**
 * DragDrap 관련 컴포넌트 삭제
 * @name _removeDragComp
 * @function 
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._removeDragComp = function() {
	var targetView = this.targetView;
	var rtnObj;
	
	if(!NxPivotUtil.isEmpty(this.dragItem)){
		var dragItem_id = this.dragItem.id;
		if(targetView.form.isValidObject(dragItem_id)){
			rtnObj = targetView.removeChild(dragItem_id);	
			rtnObj.destroy();
			rtnObj = null;	
		}
	}
	
	if(!NxPivotUtil.isEmpty(this.indicator)){
		var indicator_id = this.indicator.id;
		if(targetView.form.isValidObject(indicator_id)){
			rtnObj = targetView.removeChild(indicator_id);	
			rtnObj.destroy();
			rtnObj = null;	
		}
	}
	
	this.dragItem = null;
	this.indicator = null;
	
	targetView = null;
	rtnObj = null;
	dragItem_id = null;
	indicator_id = null;
};

/**
 * Axis 영역 관련컴포넌트 삭제
 * @name _removeAxisArea
 * @function 
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._removeAxisArea = function() {
	var targetView = this.targetView;
	var rtnObj;
	
	if(!NxPivotUtil.isEmpty(this.setPopupListComp)){
		var setPopupListComp_id = this.setPopupListComp.id;
		if(targetView.form.isValidObject(setPopupListComp_id)){
			rtnObj = targetView.removeChild(setPopupListComp_id);	
			rtnObj.destroy();
			rtnObj = null;	
		}
	}

	if(!NxPivotUtil.isEmpty(this.settingPop)){
		var settingPop_id = this.settingPop.id;
		if(targetView.form.isValidObject(settingPop_id)){
			rtnObj = targetView.removeChild(settingPop_id);	
			rtnObj.destroy();
			rtnObj = null;
		}
	}
	
	this.setPopupListComp = null;
	this.settingPop = null;
	
	targetView = null;
	rtnObj = null;
	setPopupListComp_id = null;
	settingPop_id = null;
}

/**
 * Axis 영역 관련정보 초기화
 * @name _resetAxisAreaInfo
 * @function 
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._resetAxisAreaInfo = function() {
	this.fieldsItems = [];
	this.colAxisItems = [];
	this.rowAxisItems = [];
	this.valuesItems = [];
	
	this.fieldAxisAreaRect = {};
	this.colAxisAreaRect = {};
	this.rowAxisAreaRect = {};
	this.valuesAxisAreaRect = {};
	
	this.setPopupListComp = null;
	this.settingPop = null;
	this.settingPopInfo.data = {};
	
	if(this.settingPopInfo.oriFilterDataSource == "[object Dataset]") this.settingPopInfo.oriFilterDataSource.deleteAll();
	if(this.settingPopInfo.filterDataSource == "[object Dataset]") this.settingPopInfo.filterDataSource.deleteAll();
	this.settingPopInfo.filter = {};
	
	this.settingPopComp = {
		popStaItemFilterTit : null,
		popCboItemFilter : null,
		popEdtItemFilterEdit : null,
		popEdtItemSearchTit : null,
		popEdtItemListSearch : null,
		popCalItemEdit : null,
		popGrdItemFilterGrid : null,
		popCalItemStart : null,
		popCalItemEnd : null,
		popBtnSubmit : null,
		popBtnClose : null
	};
};

/**
 * Panel 영역 관련정보 초기화
 * @name _resetPanelInfo
 * @function 
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._resetPanelInfo = function() {
	this.targetPanel = null;
	
	this._resetPanelIsUpdate();	
};

/**
 * Panel 영역 초기화 및 재생성
 * @name _reDrawPanel
 * @function 
 * @param {object} config config 정보 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._reDrawPanel = function( config ) {
	this._resetPanelInfo();		
	this._createPanel(this.targetView, config);
};

/**
 * Filter Setting 팝업 필터콤보 변경시 ItemChangeEvent
 * @name _evtFilterCombo
 * @function 
 * @param {object} obj component 객체
 * @param {object} e nexacro.ItemChangeEventInfo 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._evtFilterCombo = function( obj, e ) {
	var settingPop = this.settingPop;
	var value = e.postvalue || "";
	var colid = obj.parent.parent._itemid;
	var axisType = settingPop._axisType;

	var field = this.pivot.config.getFieldItem(colid);
	var dateFilterList = this.language.filter.date;
	var objDs = this.settingPopInfo.filterDataSource;
	var editValue = this.settingPopComp.popEdtItemFilterEdit.value;
	
	if(dateFilterList[0].hasOwnProperty("key")){
		this._settingPopValueChange(axisType ,field.type ,value ,editValue);
		
		obj.set_value(value);
	}

	objDs.set_enableevent(false);
	
	var cnt = objDs.getCaseCount("chk==1");
	var rowCnt = objDs.getRowCount();
	
	if(cnt > 0){
		for(var i=rowCnt-1;i>=0;i--){
			objDs.setColumn(i,"chk",0);
		}
	}
	
	objDs.set_enableevent(true);
	
	this.settingPopComp.popEdtItemFilterEdit.set_value("");
	
	settingPop = null;
	value = null;
	colid = null;
	axisType = null;
	field = null;
	dateFilterList = null;
	objDs = null;
	editValue = null;
	cnt = null;
	rowCnt = null;
};

/**
 * Filter Setting 팝업 적용(Submit)버튼 ClickEvent
 * @name _evtPanelSettingSubmit
 * @function 
 * @param {object} obj component 객체
 * @param {object} e nexacro.ClickEventInfo 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._evtPanelSettingSubmit = function( obj, e ) {
	this.ondrag = false;
	
	try{
		var target = this.targetView;
		var settingPop = this.settingPop;
		var settingPopComp = this.settingPopComp;

		var popCalItemStart_value = settingPopComp.popCalItemStart.value || "";
		var popCalItemEnd_value = settingPopComp.popCalItemEnd.value || "";

		var operation = settingPopComp.popCboItemFilter.value || "";
		var value = settingPopComp.popEdtItemFilterEdit.value || "";
		var valueDate = settingPopComp.popCalItemEdit.value || "";
		
		var isFilterUpdate = false;
		
		if(!NxPivotUtil.isEmpty(operation)){
			if(settingPop._type == "date"){
				if(operation == "between"){
					if(NxPivotUtil.isEmpty(popCalItemStart_value) || NxPivotUtil.isEmpty(popCalItemEnd_value)){
						return;
					}else{
						var startDate = nexacro.toNumber(popCalItemStart_value);
						var endDate = nexacro.toNumber(popCalItemEnd_value);
						
						if(startDate > endDate){
							var rtnMsg = this.pivot.getMessage("validate",0002);

							return alert(rtnMsg);
						}
					}
				}else{
					//if(NxPivotUtil.isEmpty(valueDate)) return;
				}
			}else{
				//if(NxPivotUtil.isEmpty(value)) return;
			}
		}
		
		var filterYn = (this.settingPopInfo.filter.length>0)?true:false;	
		
		if(settingPop._operation != operation){
			isFilterUpdate = true;
		}else{
			if(NxPivotUtil.isEmpty(operation)){
				isFilterUpdate = false;
			}else{		
				if(settingPop._type == "date"){
					if(operation == "between"){
						if(settingPop._filterStr != popCalItemStart_value+","+popCalItemEnd_value){
							isFilterUpdate = true;
						}else{
							isFilterUpdate = false;
						}					
					}else{
						if(settingPop._filterStr != valueDate){
							isFilterUpdate = true;
						}else{
							isFilterUpdate = false;
						}
					}				
				}else{
					if(settingPop._filterStr != value){
						isFilterUpdate = true;
					}else{
						isFilterUpdate = false;
					}
				}
			}
		}

		var popInfoData = this.settingPopInfo.data;

		if(NxPivotUtil.isEmpty(operation)){
			this.settingPopInfo.filter = [];
		}else{
			if(operation == "between"){
				var values;			
				
				if(this.settingPopInfo.filter.length < 1){
					this.settingPopInfo.filter = [{
													id : popInfoData.id,		
													operation : operation,		
													values : [popCalItemStart_value ,popCalItemEnd_value],		
													type : popInfoData.type,		
													caseSensitive : popInfoData.caseSensitive,		
													}];	
				}
				
				this.settingPopInfo.filter[0].operation = operation;				
				this.settingPopInfo.filter[0].values = [popCalItemStart_value ,popCalItemEnd_value];	
			}else{
				if(this.settingPopInfo.filter.length < 1){
					this.settingPopInfo.filter = [{
													id : popInfoData.id,		
													operation : operation,		
													values : [],		
													type : popInfoData.type,		
													caseSensitive : popInfoData.caseSensitive,		
													}];
				}else{
					this.settingPopInfo.filter[0].operation = operation;
				}
				
				if(this.settingPopInfo.data.type == "date"){
					this.settingPopInfo.filter[0].values = [valueDate];
				}else{
					var arrValues = [];
					
					if(operation=="eq" || operation=="neq"){		
						arrValues = value.split(",");
					}else{
						arrValues = [value];
					}

					this.settingPopInfo.filter[0].values = arrValues;
				}
			}
		}

		var rtn_field = {
			data : popInfoData,
			filterDataSource : this.settingPopInfo.filterDataSource,
			filterList : this.settingPopInfo.filter
		};

		this.pivot.config.setFieldItemInfo(rtn_field);
		
		var item = this._getAxisItemObject(popInfoData.id);	
		item._statusChange();
		
		if(!this.isFilterUpdate) this.isFilterUpdate = isFilterUpdate;

		this.settingPop.closePopup("submit");	
	}finally{
		target = null;
		settingPop = null;
		settingPopComp = null;
		popCalItemStart_value = null;
		popCalItemEnd_value = null;
		operation = null;
		value = null;
		valueDate = null;
		isFilterUpdate = null;
		startDate = null;
		endDate = null;
		rtnMsg = null;
		filterYn = null;
		popInfoData = null;
		values = null;
		arrValues = null;
		rtn_field = null;
		item = null;
	}
};

/**
 * Filter Setting 팝업 닫기버튼 ClickEvent
 * @name _evtPanelSettingClose
 * @function 
 * @param {object} obj component 객체
 * @param {object} e nexacro.ClickEventInfo 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._evtPanelSettingClose = function( obj, e ) {
	this._panelSettingClose();
	
	this.settingPop.closePopup("close");
};

/**
 * Filter Setting 팝업 닫기시 처리
 * @name _panelSettingClose
 * @function 
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._panelSettingClose = function(){
	this.ondrag = false;
	
	var target = this.targetView;
	var settingPop = this.settingPop;

	var rtn_field = {
		data : this.settingPopInfo.data,
		filterDataSource : this.settingPopInfo.oriFilterDataSource,
		filterList : this.settingPopInfo.filter || []
	};
	
	this.pivot.config.setFieldItemInfo(rtn_field);
	
	if(rtn_field.data){
		rtn_field.data = null;
		rtn_field.filterDataSource = null;
		rtn_field.filterList = null;
	}
	
	rtn_field = null;
	settingPop = null;
	target = null;
};

/**
 * Axis 영역 항목정보 변경처리
 * @name _setUpdateExcute
 * @function 
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._setUpdateExcute = function(){
	if(this.pivot._isRended){
		if(this.isFilterUpdate){
			this.pivot.changeAxisValue();
		}else{
			if(this.isAggUpdate){
				NxPivotUtil.pivotUtil.changeAggreator(this.pivot);
			}
			
			if(this.isSortUpdate){
				NxPivotUtil.pivotUtil.sortAxis(this.pivot);
			}
			
			this._resetPanelIsUpdate();
		}
		return true;
	}else{
		return false;
	}
};

/**
 * Axis 영역 항목 Item onlbuttondown 이벤트
 * @name _compDragEvent
 * @function 
 * @param {object} obj component 객체
 * @param {object} e nexacro.MouseEventInfo 객체
 * @return {boolean} true|false
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._compDragEvent = function(obj ,e) {
	try{
		var objid = obj.id;

		if(objid.indexOf("_") > -1){
			var arrid = objid.split("_NxPivot");

			if( arrid[1]=="item"||arrid[1]=="status1"||arrid[1]=="status2"||arrid[1]=="title"||arrid[1]=="button" ){
				colid = arrid[0];
				
				var item = this._getAxisItemObject(colid);
				var itemObj = item.objLayout;
				var itemtitle = item.titleObj;
				
				this.dragItem.itemObj = itemObj;
				this.dragItem.itemtitle = itemtitle;
				this.dragItem._index = item._index;
				this.dragItem._id = item.id;
				this.dragItem._itemType = item._itemType;
				this.dragItem.bringToFront();

				var panel = this.targetPanel;
				var axisArea = panel.form[item._itemType];
				this.dragItem.oriLeft = axisArea.getOffsetLeft()+ itemObj.getOffsetLeft();
				this.dragItem.oriTop = axisArea.getOffsetTop()+ itemObj.getOffsetTop();

				this.ondrag = true;

				this._itemDragMove( this.dragItem.oriLeft, this.dragItem.oriTop );
			}else{
				 return false;
			}
		}else{
			return false;
		}
	}finally{
		objid = null;
		arrid = null;
		item = null;
		itemObj = null;
		itemtitle = null;
		panel = null;
		axisArea = null;
	}
};

/**
 * Axis 영역 Rect 값 셋팅
 * @name _setAxisAreaRect
 * @function 
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._setAxisAreaRect = function() {
	var panel = this.targetPanel;
	var panelTop = panel.getOffsetTop();
	var panelLeft = panel.getOffsetLeft();
	var fieldsArea = panel.form["fields"];
	var colAxisArea = panel.form["colAxis"];
	var rowAxisArea = panel.form["rowAxis"];
	var valuesArea = panel.form["values"];
	var axisAreaPos = {};
	var vscrollpos = 0;
	
	axisAreaPos = { x:panelLeft + fieldsArea.getOffsetLeft() ,y:panelTop + fieldsArea.getOffsetTop()};
	vscrollpos = (NxPivotUtil.isEmpty(fieldsArea.vscrollpos)?0:fieldsArea.vscrollpos);

	this.fieldAxisAreaRect = { vscrollpos:vscrollpos ,itemCnt:this.fieldsItems.length ,x:axisAreaPos.x ,y:axisAreaPos.y 
								,width:fieldsArea.getOffsetWidth() ,height:fieldsArea.getOffsetHeight() ,right:null ,bottom:null };
	
	axisAreaPos = { x:panelLeft + colAxisArea.getOffsetLeft() ,y:panelTop+fieldsArea.getOffsetTop()};
	vscrollpos = (NxPivotUtil.isEmpty(colAxisArea.vscrollpos)?0:colAxisArea.vscrollpos);
	this.colAxisAreaRect = { vscrollpos:vscrollpos ,itemCnt:this.colAxisItems.length ,x:axisAreaPos.x ,y:axisAreaPos.y 
								,width:colAxisArea.getOffsetWidth() ,height:colAxisArea.getOffsetHeight(), right:null ,bottom:null };
	
	axisAreaPos = { x:panelLeft + rowAxisArea.getOffsetLeft() ,y:panelTop+fieldsArea.getOffsetTop()};
	vscrollpos = (NxPivotUtil.isEmpty(rowAxisArea.vscrollpos)?0:rowAxisArea.vscrollpos);

	this.rowAxisAreaRect = { vscrollpos:vscrollpos ,itemCnt:this.rowAxisItems.length ,x:axisAreaPos.x ,y:axisAreaPos.y 
								,width:rowAxisArea.getOffsetWidth() ,height:rowAxisArea.getOffsetHeight(), right:null ,bottom:null };
	
	axisAreaPos = { x:panelLeft + valuesArea.getOffsetLeft() ,y:panelTop+fieldsArea.getOffsetTop()};
	vscrollpos = (NxPivotUtil.isEmpty(valuesArea.vscrollpos)?0:valuesArea.vscrollpos);
	this.valuesAxisAreaRect = { vscrollpos:vscrollpos ,itemCnt:this.valuesItems.length ,x:axisAreaPos.x ,y:axisAreaPos.y 
								,width:valuesArea.getOffsetWidth() ,height:valuesArea.getOffsetHeight(), right:null ,bottom:null };	
								
	panel = null;
	panelTop = null;
	panelLeft = null;
	fieldsArea = null;
	colAxisArea = null;
	rowAxisArea = null;
	valuesArea = null;
	axisAreaPos = null;
	vscrollpos = null;
};

/**
 * Axis 영역 항목 Item onlbuttonup 시 발생
 * @name _compDropEvent
 * @function 
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._compDropEvent = function( obj ) {
	this.ondrag = false;

	var fromAxisType = this.dragItem._itemType;
	var fromId = this.dragItem._id;
	var fromIndex = this.dragItem._index;
	var toAxisType = this.indicator._axisType;
	var toId = this.indicator._itemid;
	var toIndex = this.indicator._index;
	
	this.dragItem._itemType = "";
	this.dragItem._index = -999;
	this.dragItem._id = "";
	this.indicator._axisType = "";
	this.indicator._index = -999;
	this.indicator._itemid = "";
	
	this.dragItem.clientx = -999;
	this.dragItem.clienty = -999;

	if(this.indicator.visible) this.indicator.set_visible(false);
	if(this.dragItem.visible) this.dragItem.set_visible(false);

	if(toIndex != -999){
		if(fromAxisType != toAxisType){
			this._itemMove( "axis", fromAxisType ,fromId ,fromIndex, toAxisType ,toId ,toIndex );
		}else{
			if(fromId != toId){
				if(fromIndex != toIndex && fromIndex < toIndex){
					if(toIndex - fromIndex > 1){
						this._itemMove( "next", fromAxisType ,fromId ,fromIndex, toAxisType ,toId ,toIndex );
					}
				}else if(fromIndex != toIndex && fromIndex > toIndex){
					if(fromIndex - toIndex > 0){
						this._itemMove( "back", fromAxisType ,fromId ,fromIndex, toAxisType ,toId ,toIndex );
					}				
				}	
			}
		}
	}
	
	fromAxisType = null;
	fromId = null;
	fromIndex = null;
	toAxisType = null;
	toId = null;
	toIndex = null;
};

/**
 * Axis 영역 항목 Item onmousemove 시 발생
 * @name _compDragMoveEvent
 * @function 
 * @param {object} obj component 객체
 * @param {object} targetComp component 객체
 * @param {number} moveX 이동 X좌표
 * @param {number} moveY 이동 Y좌표
 * @param {object} e nexacro.MouseEventInfo 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._compDragMoveEvent = function(obj, targetComp, moveX, moveY, e) {
	var objid = NxPivotUtil.isEmpty(e.fromobject.id)?"":e.fromobject.id;
	
	if((objid != "" && e.fromobject != this.parent.targetGrid) || e.fromobject._is_form){

		if( objid != this.indicator.id && objid != this.dragItem.id && this.ondrag ){
			this.dragItem.clientx = e.clientx;
			this.dragItem.clienty = e.clienty;
			
			this._checkDropItemRect( e.fromobject );
		}
	}else{
		if(e.fromobject == this.parent.targetGrid) {
			this.dragItem.set_visible(false);
		}
	}
	
	objid = null;
};

/**
 * Axis 영역 항목 Item Drop 시 Item UI 및 관련 정보 변경
 * @name _checkDropItemRect
 * @function 
 * @param {string} objid Drop 발생된 fromobject id 문자열
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._checkDropItemRect = function( obj ) {
	try{
		this.dragItem.set_visible(true);
				
		this._setAxisAreaRect();

		var panelStyle = this.panelStyle;
		var itemObj = null;
		var axisCnt = 0;
		var tempArray = [];
		var bRtn = true;
		var axisType = "";
		var axisArea = null;
		var axisItemCnt = 0;
		var itemBorderVGap = this.itemInfo.borderRect[1] + this.itemInfo.borderRect[3];
		var itemBorderHGap = this.itemInfo.borderRect[0] + this.itemInfo.borderRect[2];
		var fieldAxisAreaRect = this.fieldAxisAreaRect;
		var colAxisAreaRect = this.colAxisAreaRect;
		var rowAxisAreaRect = this.rowAxisAreaRect;
		var valuesAxisAreaRect = this.valuesAxisAreaRect;
		var vscrollpos = 0;
		var x = this.dragItem.clientx;
		var y = this.dragItem.clienty;

		tempArray = tempArray.concat(this.fieldsItems, this.colAxisItems, this.rowAxisItems, this.valuesItems);
		axisCnt = tempArray.length;

		if( (x > fieldAxisAreaRect.x && x < (fieldAxisAreaRect.x + fieldAxisAreaRect.width)) 
			&& (y > fieldAxisAreaRect.y && y < (fieldAxisAreaRect.y + fieldAxisAreaRect.vscrollpos + fieldAxisAreaRect.height)) ){
			axisType = "fields";
			axisItemCnt = fieldAxisAreaRect.itemCnt;
			vscrollpos = NxPivotUtil.isEmpty(fieldAxisAreaRect.vscrollpos)?0:fieldAxisAreaRect.vscrollpos;
		}else if( (x > colAxisAreaRect.x && x < (colAxisAreaRect.x + colAxisAreaRect.width)) 
			&& (y > colAxisAreaRect.y && y < (colAxisAreaRect.y + colAxisAreaRect.vscrollpos + colAxisAreaRect.height)) ){
			axisType = "colAxis";
			axisItemCnt = colAxisAreaRect.itemCnt;
			vscrollpos = NxPivotUtil.isEmpty(colAxisAreaRect.vscrollpos)?0:colAxisAreaRect.vscrollpos;
		}else if( (x > rowAxisAreaRect.x && x < (rowAxisAreaRect.x + rowAxisAreaRect.width)) 
			&& (y > rowAxisAreaRect.y && y < (rowAxisAreaRect.y + rowAxisAreaRect.vscrollpos + rowAxisAreaRect.height)) ){
			axisType = "rowAxis";
			axisItemCnt = rowAxisAreaRect.itemCnt;
			vscrollpos = NxPivotUtil.isEmpty(rowAxisAreaRect.vscrollpos)?0:rowAxisAreaRect.vscrollpos;
		}else if( (x > valuesAxisAreaRect.x && x < (valuesAxisAreaRect.x + valuesAxisAreaRect.width)) 
			&& (y > valuesAxisAreaRect.y && y < (valuesAxisAreaRect.y + valuesAxisAreaRect.vscrollpos + valuesAxisAreaRect.height)) ){
			axisType = "values";
			axisItemCnt = valuesAxisAreaRect.itemCnt;
			vscrollpos = NxPivotUtil.isEmpty(valuesAxisAreaRect.vscrollpos)?0:valuesAxisAreaRect.vscrollpos;
		}else{
			axisType = "";
			axisItemCnt = 0;
		}
		
		var indicator = this.indicator;
		var indicatorWidth = indicator.getOffsetWidth();
		var indicatorHeight = indicator.getOffsetHeight();

		var posY = 0;
		var dragRect;
		var dragRectX;
		var dragRectY;
		var dragRectWidth;
		var dragRectHeight;
		var dragRectIndex;
		var dragRectAxisType;
		var dragRectAxisId;
		
		var toolbarHeight = this.targetToolbar.getOffsetHeight();
		var itemHeight = nexacro.toNumber(panelStyle.items.item.height);
		var itemGap = nexacro.toNumber(panelStyle.items.gap);

		for(var i=0;i<axisCnt;i++){
			dragRect = tempArray[i].dragRect;
			dragRectX = dragRect.targetX;
			dragRectY = dragRect.targetY;
			dragRectWidth = dragRect.targetWidth;
			dragRectHeight = dragRect.targetHeight;
			dragRectIndex = dragRect.targetIndex;
			dragRectAxisId = dragRect.targetColid;
			dragRectAxisType = axisType;

			if(axisType != ""){
				if(axisItemCnt > 0){
					posY = ((indicatorHeight - dragRectHeight)/2) - 1 + vscrollpos;

					if((x > dragRectX && x < (dragRectX + nexacro.round(dragRectWidth/2))) 
						&& (y > dragRectY && y < (dragRectY + dragRectHeight))){
						if(!obj._is_form){
							indicator.move((dragRectX+1)-(indicatorWidth/2),dragRectY - posY);					
							indicator._index = dragRectIndex;
							indicator._axisType = dragRectAxisType;
							indicator._itemid = dragRectAxisId;
							indicator.set_visible(true);
						}

						bRtn = false;
						break;
					}else if((x > (dragRectX + nexacro.round(dragRectWidth/2)) && x < (dragRectX + dragRectWidth)) 
						&& (y > dragRectY && y < (dragRectY + dragRectHeight))){
						if(!obj._is_form){
							indicator.move((dragRectX+dragRectWidth+2)-(indicatorWidth/2),dragRectY - posY);					
							indicator._index = dragRectIndex + 1;
							indicator._axisType = dragRectAxisType;
							indicator._itemid = dragRectAxisId;
							indicator.set_visible(true);
						}

						bRtn = false;
						break;
					}else{
						if(!obj._is_form){
							indicator.move((dragRectX+dragRectWidth-1)-(indicatorWidth/2),dragRectY - posY);	
							indicator._index = -999;
							indicator._axisType = "";
							indicator._itemid = "";
							indicator.set_visible(false);
						}else{
							if(!NxPivotUtil.isEmpty(axisType)){
								var items = this[axisType+"Items"];
								var item = items[axisItemCnt - 1];
								
								var dragRect_Last = item.dragRect;
								var dragRectX_Last = dragRect_Last.targetX;
								var dragRectY_Last = dragRect_Last.targetY;
								var dragRectWidth_Last = dragRect_Last.targetWidth;
								var dragRectHeight_Last = dragRect_Last.targetHeight;
								var dragRectIndex_Last = dragRect_Last.targetIndex;
								var dragRectAxisId_Last = dragRect_Last.targetColid;
								var dragRectAxisType_Last = axisType;
								
								posY = ((indicatorHeight - dragRectHeight_Last)/2) - 1 + vscrollpos;
								
								if(y > dragRectY_Last){
									indicator.move((dragRectX_Last+dragRectWidth_Last+2)-(indicatorWidth/2),dragRectY_Last - posY);					
									indicator._index = dragRectIndex_Last + 1;
									indicator._axisType = dragRectAxisType_Last;
									indicator._itemid = dragRectAxisId_Last;
									indicator.set_visible(true);
								}
							}
						}

						bRtn = false;
					}
				}else{
					posY = ((indicatorHeight - itemHeight)/2) - 1 + vscrollpos;

					var axisArea = this.targetPanel.form[axisType];
					var itemAreaTitle = axisArea.form["title"];
					var titlex = this.targetPanel.getOffsetLeft() + axisArea.getOffsetLeft() + itemAreaTitle.getOffsetLeft();
					var titley = this.targetPanel.getOffsetTop() + toolbarHeight + itemAreaTitle.getOffsetBottom() + itemGap;
					
					indicator.move(titlex - (indicatorWidth/2) ,titley - posY);
					
					indicator._index = 0;
					indicator._axisType = dragRectAxisType;
					indicator._itemid = "";
					indicator.set_visible(true);
					
					itemAreaTitle = null;				
					bRtn = false;
					break;
				}
			}
		}
		
		if(!obj._is_form)	this._itemDragMove( x + 3, y + 17 - vscrollpos );
		else this._itemDragMove( x + 3, y + 17 );
		
		axisArea = null;
		tempArray = null;
		itemObj = null;

		return bRtn;
	}finally{
		panelStyle = null;
		itemObj = null;
		axisCnt = null;
		tempArray = null;
		bRtn = null;
		axisType = null;
		axisArea = null;
		axisItemCnt = null;
		itemBorderVGap = null;
		itemBorderHGap = null;
		fieldAxisAreaRect = null;
		colAxisAreaRect = null;
		rowAxisAreaRect = null;
		valuesAxisAreaRect = null;
		vscrollpos = null;
		x = null;
		y = null;
		indicator = null;
		indicatorWidth = null;
		indicatorHeight = null;
		posY = null;
		dragRect = null;
		dragRectX = null;
		dragRectY = null;
		dragRectWidth = null;
		dragRectHeight = null;
		dragRectIndex = null;
		dragRectAxisType = null;
		dragRectAxisId = null;
		toolbarHeight = null;
		itemHeight = null;
		itemGap = null;
	}
};

/**
 * Axis 영역 항목 Item Drag 시 Drag Image 이동
 * @name _itemDragMove
 * @function 
 * @param {number} x 이동할 X좌표
 * @param {number} y 이동할 Y좌표
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._itemDragMove = function(x, y) {
	var itemtitle = this.dragItem.itemtitle;		
	var itemText = itemtitle.text;
	
	this.dragItem.set_text(itemText);
	this.dragItem.move( x , y );
	
	itemtitle = null;
	itemText = null;
};

/**
 * Axis 영역 vscroll 이동시 ScrollEvent
 * @name _evtAxisOnvscroll
 * @function 
 * @param {object} obj component 객체
 * @param {object} e nexacro.ScrollEventInfo 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._evtAxisOnvscroll = function(obj, e) {
	var panel = this.targetPanel;
	var fieldAxisAreaRect = this.fieldAxisAreaRect;
	var colAxisAreaRect = this.colAxisAreaRect;
	var rowAxisAreaRect = this.rowAxisAreaRect;
	var valuesAxisAreaRect = this.valuesAxisAreaRect;
	var pos = e.pos;
	
	var axisArea = panel.form[obj.id];
	axisArea.vscrollpos = pos;

	this.indicator.set_visible(false);

	if(this.ondrag) this.dragItem.set_visible(true);
	else this.dragItem.set_visible(false);
	
	var items = this[obj.id+"Items"];
	
	for(var i=0;i<items.legth;i++){
		items[i].dragRect.vscrollpos = pos;
	}
	
	panel = null;
	fieldAxisAreaRect = null;
	colAxisAreaRect = null;
	rowAxisAreaRect = null;
	valuesAxisAreaRect = null;
	pos = null;
	items = null;
};

/**
 * Axis 영역 사이즈 변경시 SizeEvent
 * @name _evtAxisOnsize
 * @function 
 * @param {object} obj component 객체
 * @param {object} e nexacro.SizeEventInfo 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._evtAxisOnsize = function( obj , e ) {
	var items;
	var itemCnt;
	var axisType = obj.id;
	var axisAreaInfo = this.axisAreaInfo;
	var axisCnt = this.axisAreaInfo.axistypes.length;
	var axisWidth = e.cx;
	
	for(var i=0;i<axisCnt;i++){
		items = this[axisAreaInfo.axistypes[i]+"Items"];
		itemCnt = items.length;
		
		if(itemCnt < 2) continue;
		
		var reLocateYn = this._reLocateCheck( axisAreaInfo.axistypes[i], axisWidth, items, itemCnt );

		if( reLocateYn ) this._itemRelocate( axisAreaInfo.axistypes[i], axisWidth, items, itemCnt );
	}
	
	this._setAxisItemDragRect(axisType);
	
	items = null;
	itemCnt = null;
	axisType = null;
	axisAreaInfo = null;
	axisCnt = null;
	axisWidth = null;
	reLocateYn = null;
};

/**
 * Axis 영역 item 재배치 여부 반환
 * @name _reLocateCheck
 * @function 
 * @param {string} axistype Axis 종류
 * @param {string} axisWidth Axis 영역 width
 * @param {object} items Axis 영역의 items
 * @param {number} itemCnt Axis 영역의 item 갯수
 * @return {boolean} true|false
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._reLocateCheck = function( axistype, axisWidth, items, itemCnt ) {
	try{
		var rtnValue = false;
		var itemRect;
		var itemRectY = nexacro.toNumber(items[0].rect.y);
		var itemRight = 0;
		
		axisWidth -= (this.axisAreaScrollbarWidth + nexacro.toNumber(this.panelStyle.items.gap));
		
		var checkCnt = 0;
		var i = 0;
		for(i=0;i<itemCnt;i++){
			checkCnt += 1;
			itemRect = items[i].rect;

			if(itemRectY != nexacro.toNumber(itemRect.y)){
				itemRight = (nexacro.toNumber(items[i-1].rect.x)+nexacro.toNumber(items[i-1].rect.width));
				break;
			}
			
			itemRight = (nexacro.toNumber(itemRect.x)+nexacro.toNumber(itemRect.width));
		}

		if(axisWidth < itemRight || axisWidth > itemRight + (nexacro.toNumber(itemRect.x)+nexacro.toNumber(itemRect.width))){
			rtnValue = true;
		}
		
		return rtnValue;
	}finally{
		rtnValue = null;
		itemRect = null;
		itemRectY = null;
		itemRight = null;
		checkCnt = null;
		i = null;
	}
};

/**
 * Pivot 영역 사이즈 변경시 SizeEvent
 * @name _evtPivotOnsize
 * @function 
 * @param {object} obj component 객체
 * @param {object} e nexacro.SizeEventInfo 객체
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._evtPivotOnsize = function( obj , e ) {

};

/**
 * Axis 영역 item 위치 이동
 * @name _itemMove
 * @function 
 * @param {string} moveType 이동 type (axis|next|back)
 * @param {string} fromAxisType Drag 항목의 Axis 종류 (fields|colAxis|rowAxis|values)
 * @param {string} fromId Drag 항목의 colid
 * @param {number} fromIndex Drag 항목의 index
 * @param {string} toAxisType Drop 항목의 Axis 종류 (fields|colAxis|rowAxis|values)
 * @param {string} toId Drop 항목의 colid
 * @param {number} toIndex Drop 항목의 index
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._itemMove = function( moveType, fromAxisType ,fromId ,fromIndex, toAxisType ,toId ,toIndex ) {
	var config = this.pivot.config;

	if(toAxisType == "values") this.pivot.config.getFieldItemInfo(fromId);
	
	var fromItem = this._getAxisItemObject(fromId);
	
	if(moveType == "axis") fromItem._itemDrop( fromId, fromAxisType, fromIndex , toId, toAxisType, toIndex );	
	
	this._itemSplice( moveType ,fromAxisType ,fromId ,fromIndex, toAxisType ,toId ,toIndex );	

	config.moveFieldItem( fromAxisType, fromIndex, toAxisType, toIndex );		
	
	this.isFilterUpdate = true;	
	
	if(this.autoexcute){
		var rtn = this._setUpdateExcute();
		if(!rtn) this.targetView.render();
	}
	
	config = null;
	fromItem = null;
	rtn = null;
};

/**
 * Axis 영역 item 위치 이동시 정보변경/컴포넌트 재배치
 * @name _itemSplice
 * @function 
 * @param {string} moveType 이동 type (axis|next|back)
 * @param {string} fromAxisType Drag 항목의 Axis 종류 (fields|colAxis|rowAxis|values)
 * @param {string} fromId Drag 항목의 colid
 * @param {number} fromIndex Drag 항목의 index
 * @param {string} toAxisType Drop 항목의 Axis 종류 (fields|colAxis|rowAxis|values)
 * @param {string} toId Axis Drop 항목의 colid
 * @param {number} toIndex Drop 항목의 index
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._itemSplice = function( moveType ,fromAxisType ,fromId ,fromIndex, toAxisType ,toId ,toIndex ) {
	var items = [];
	var item = null;
	
	items = this[fromAxisType+"Items"];
	
	var itemCnt = items.length;
	var itemd1 = null;
	var itemd2 = null;
	var itemd2Rect = null;
	var itemd2DragRect = null;
	var itemd2TargetColid;
	
	if(moveType == "axis"){
		if(itemCnt > 1){
			for(var i=itemCnt-1;i>fromIndex;i--){
				itemd1 = items[i-1];
				itemd2 = items[i];
				itemd1Rect = itemd1.rect;
				itemd1DragRect = itemd1.dragRect;

				itemd2._index = itemd2._index - 1;		
				itemd2.rect = itemd1Rect;
				itemd2.dragRect = itemd1DragRect;
				itemd2.dragRect.targetColid = itemd2.id;
				
				itemd1 = null;
				itemd2 = null;
				itemd2Rect = null;
				itemd2DragRect = null;
			}
		}

		item = items.splice(fromIndex, 1);

		this._itemArrange( items ,fromIndex ,fromAxisType );
		this._itemPush( item ,fromId ,toAxisType ,toId ,toIndex );
	}else if(moveType == "next"){
		var tempIndex = toIndex - 1;
		var tempRect = items[toIndex-1].rect;
		var tempDragRect = items[toIndex-1].dragRect;
		var tempDragRectTargetColid = items[fromIndex].dragRect.targetColid;

		for(var i=toIndex-1;i>fromIndex;i--){
			itemd1 = items[i-1];
			itemd2 = items[i];
			itemd1Rect = itemd1.rect;
			itemd1DragRect = itemd1.dragRect;

			itemd2._index = itemd2._index-1;		
			itemd2.rect = itemd1Rect;
			itemd2.dragRect = itemd1DragRect;
			itemd2.dragRect.targetColid = itemd2.id;

			itemd1 = null;
			itemd2 = null;
			itemd2Rect = null;
			itemd2DragRect = null;				
		}
		
		items[fromIndex]._index = tempIndex;
		items[fromIndex].rect = tempRect;
		items[fromIndex].dragRect = tempDragRect;
		items[fromIndex].dragRect.targetColid = tempDragRectTargetColid;
		
		var objItem = items.splice(fromIndex, 1);		
		items.splice(toIndex-1, 0, objItem[0]);

		this._itemArrange( items ,fromIndex ,fromAxisType );
	}else if(moveType == "back"){
		var tempIndex = toIndex;
		var tempRect = items[toIndex].rect;
		var tempDragRect = items[toIndex].dragRect;
		var tempDragRectTargetColid = items[fromIndex].dragRect.targetColid;

		for(var i=toIndex;i<fromIndex;i++){
			itemd1 = items[i+1];
			itemd2 = items[i];
			itemd1Rect = itemd1.rect;
			itemd1DragRect = itemd1.dragRect;

			itemd2._index = itemd2._index+1;
			itemd2.rect = itemd1Rect;
			itemd2.dragRect = itemd1DragRect;
			itemd2.dragRect.targetColid = itemd2.id;

			itemd1 = null;
			itemd2 = null;
			itemd2Rect = null;
			itemd2DragRect = null;	
			itemd2TargetColid = null;
		}

		items[fromIndex]._index = tempIndex;
		items[fromIndex].rect = tempRect;
		items[fromIndex].dragRect = tempDragRect;
		items[fromIndex].dragRect.targetColid = tempDragRectTargetColid;

		var objItem = items.splice(fromIndex, 1);		
		items.splice(toIndex, 0, objItem[0]);

		this._itemArrange( items ,toIndex ,fromAxisType );
	}
	
	
	items = null;
	item = null;
	itemCnt = null;
	itemd1 = null;
	itemd2 = null;
	itemd2Rect = null;
	itemd2DragRect = null;
	itemd2TargetColid = null;
	tempIndex = null;
	tempRect = null;
	tempDragRect = null;
	tempDragRectTargetColid = null;
	tempIndex = null;
	tempRect = null;
	tempDragRect = null;
	tempDragRectTargetColid = null;
	objItem = null;
};

/**
 * Drop Axis 영역 Item 위치 이동으로 Drop 항목 부터 마지막 항목 까지 Item 정보 및 Drag 정보 변경
 * @name _itemPush
 * @function 
 * @param {object} item 이동할 item 객체
 * @param {string} fromId Drag 항목의 colid
 * @param {string} toAxisType Drop 항목의 Axis 종류 (fields|colAxis|rowAxis|values)
 * @param {string} toId Axis Drop 항목의 colid
 * @param {number} toIndex Drop 항목의 index
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._itemPush = function( item ,fromId ,toAxisType ,toId ,toIndex ) {
	var panelStyle = this.panelStyle;
	var items = [];
	var itemCnt = 0;
	var preItem = [];
	var aftItem = [];
	
	item[0]._itemType = toAxisType;
	
	preItem = this[toAxisType+"Items"].slice(0,toIndex);		
	aftItem = this[toAxisType+"Items"].slice(toIndex);

	if(aftItem.length > 0)	this[toAxisType+"Items"] = preItem.concat(item, aftItem);
	else this[toAxisType+"Items"] = preItem.concat(item);

	items = this[toAxisType+"Items"];

	itemCnt = items.length;
	
	var itemd1 = null;
	var itemd2 = null;
	var itemd2Rect = null;
	var itemd2DragRect = null;	 

	var lastRect;
	var lastDragRect;		
	var top;
	var left;
	
	var gap = nexacro.toNumber(panelStyle.items.gap);
	var itemWidth = nexacro.toNumber(panelStyle.items.item.width);
	var itemHeight = nexacro.toNumber(panelStyle.items.item.height);
	var panelArea = this.targetPanel;
	var obj_div_itemType = panelArea.form[toAxisType];
	var obj_div_itemType_title = obj_div_itemType.form["title"];

	var axisLimitRight = obj_div_itemType.getOffsetWidth() - this.axisAreaScrollbarWidth;
	var axisVscrollpos = NxPivotUtil.isEmpty(obj_div_itemType.vscrollpos)?0:nexacro.toNumber(obj_div_itemType.vscrollpos);
	var axisLimitBottom = obj_div_itemType.getOffsetHeight() + axisVscrollpos;
	
	if(toIndex >= itemCnt-1){
		if(toIndex > itemCnt-1) toIndex = toIndex -1;
		
		if(itemCnt > 1){
			preItem = items[toIndex - 1];			
			itemd1 = items[toIndex];			
			itemd1._index = toIndex;
			
			itemd1.rect = { x:nexacro.toNumber(preItem.rect.x), y:nexacro.toNumber(preItem.rect.y), width:nexacro.toNumber(preItem.rect.width), height:nexacro.toNumber(preItem.rect.height) ,right:null ,bottom:null };
		}else{
			itemd1 = items[toIndex];	
			itemd1._index = toIndex;
			
			itemd1.rect = { x:nexacro.toNumber(obj_div_itemType_title.getOffsetLeft()), y:nexacro.toNumber(obj_div_itemType_title.getOffsetTop()) +  nexacro.toNumber(obj_div_itemType_title.getOffsetHeight()) + gap 
							,width:itemWidth, height:itemHeight ,right:null ,bottom:null };
		}
		
		itemd1._index = toIndex;
	}else{
		for(var i=toIndex;i<itemCnt-1;i++){
			itemd1 = items[i+1];
			itemd2 = items[i];
			
			itemd1._index = i+1;
			
			itemd1Rect = itemd1.rect;
			itemd1DragRect = itemd1.dragRect;

			itemd2._index = i;		
			itemd2.rect = itemd1Rect;
			itemd2.dragRect = itemd1DragRect;
			itemd2.dragRect.targetColid = itemd2.id;
		}
	}
	
	lastRect = itemd1.rect;
	lastDragRect = itemd1.dragRect;		
	top = nexacro.toNumber(lastRect.y);
	
	if(itemCnt > 1)	left = gap + nexacro.toNumber(lastRect.x) + nexacro.toNumber(lastRect.width);
	else left = nexacro.toNumber(lastRect.x);

	if(axisLimitRight < left + itemWidth){
		left = nexacro.toNumber(obj_div_itemType_title.getOffsetLeft());
		top = nexacro.toNumber(lastRect.y) + nexacro.toNumber(lastRect.height) + gap;
	}

	var dropX = left + obj_div_itemType.getOffsetLeft();
	var dropY = this.targetPanel.getOffsetTop() + this.targetToolbar.getOffsetHeight() + top;
	var dropWidth = lastRect.width;
	var dropHeight = lastRect.height;

	itemd1.rect = { x:left, y:top, width:lastRect.width, height:lastRect.height ,right:null ,bottom:null };
	itemd1.dragRect = { targetIndex:itemd1._index, targetColid:itemd1.id, targetX:dropX ,targetY:dropY ,targetWidth:dropWidth ,targetHeight:dropHeight 
						,targetRight:null ,targetBottom:null ,targetVscroll:axisVscrollpos };

	this._itemArrange( items, toIndex, toAxisType );
	
	panelStyle = null;
	items = null;
	itemCnt = null;
	preItem = null;
	aftItem = null;
	itemd1 = null;
	itemd2 = null;
	itemd2Rect = null;
	itemd2DragRect = null;	 
	lastRect = null;
	lastDragRect = null;
	top = null;
	left = null;
	gap = null;
	itemWidth = null;
	itemHeight = null;
	panelArea = null;
	obj_div_itemType = null;
	obj_div_itemType_title = null;
	axisLimitRight = null;
	axisVscrollpos = null;
	axisLimitBottom = null;
	dropX = null;
	dropY = null;
	dropWidth = null;
	dropHeight = null;
};

/**
 * Drop Axis 영역 Item 위치 이동으로 Drop 항목 부터 마지막 항목 까지 Component 재배치
 * @name _itemArrange
 * @function 
 * @param {object} items 해당 Axis 의 Items
 * @param {number} index 변경될 Drag 항목의 index
 * @param {string} axisType 변경될 Drag 항목의 Axis 종류 (fields|colAxis|rowAxis|values)
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._itemArrange = function( items , index, axisType ) {
	var panelArea = this.targetPanel;
	var axisArea = panelArea.form[axisType];
	var tempBottom = axisArea.form["tempBottom"];
	var gap = nexacro.toNumber(this.panelStyle.items.gap);
	
	var rect = {};
	var item = null;
	var itemCnt = items.length;
	
	var asixitems;
	var vscrollpos;
	
	index = NxPivotUtil.isEmpty(index)?0:index;

	for(var i=index;i<itemCnt;i++){
		item = this._getAxisItemObject(items[i].id);
		item._itemMove();
		
		rect = item.rect;
	}

	if(itemCnt>0){
		item = items[itemCnt-1];
		tempBottom.move( item.rect.x ,item.rect.y+item.rect.height+gap+2 );
	}
	
	axisArea.form.resetScroll();
	
	asixitems = this[axisType+"Items"];
	vscrollpos = axisArea.form.vscrollbar.pos;
	
	for(var i=0;i<asixitems.legth;i++){
		asixitems[i].dragRect.vscrollpos = vscrollpos;
	}
	
	axisArea.vscrollpos = vscrollpos;
	
	panelArea = null;
	axisArea = null;
	tempBottom = null;
	gap = null;
	rect = null;
	item = null;
	itemCnt = null;
	asixitems = null;
	vscrollpos = null;
};

/**
 * 해당 Axis 영역의 전체항목 Item Component 재배치
 * @name _itemRelocate
 * @function 
 * @param {string} axistype Axis 종류 (fields|colAxis|rowAxis|values)
 * @param {number} axisWidth 해당 Axis 의 width
 * @param {object} items 해당 Axis 의 Items
 * @param {number} itemCnt 해당 Axis 의 Item 갯수
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._itemRelocate = function( axistype, axisWidth, items, itemCnt ) {
	var panelStyle = this.panelStyle;
	var gap = nexacro.toNumber(panelStyle.items.gap);

	var panelArea = this.targetPanel;
	var obj_div_itemType = panelArea.form[axistype];
	var obj_div_itemType_title = obj_div_itemType.form["title"];

	var top = obj_div_itemType_title.getOffsetBottom() + gap;
	var left = nexacro.toNumber(obj_div_itemType_title.getOffsetLeft());
	
	var axisLimitRight = obj_div_itemType.getOffsetWidth() - this.axisAreaScrollbarWidth;
	var axisLimitBottom = obj_div_itemType.getOffsetHeight();
	var axisLeft = obj_div_itemType.getOffsetLeft();
	
	var lastItemBottom = -1;
	var itemWidth = nexacro.toNumber(panelStyle.items.item.width);
	var itemHeight = nexacro.toNumber(panelStyle.items.item.height);
	var borderRect = [];
	var item;
	var tempBottom;

	for(var i=0;i<itemCnt;i++){
		if(i > 0){
			if(axisLimitRight <= ( left + itemWidth + gap)){
				left = nexacro.toNumber(obj_div_itemType_title.getOffsetLeft());
				top += (itemHeight + gap);
			}
		}

 		item = items[i];
		item.rect = { x:left ,y:top ,width:itemWidth ,height:itemHeight ,right:null ,bottom:null };
		
		item._itemMove();
		
		left += (itemWidth + gap);
		lastItemBottom = (top +itemHeight + gap);
	}
	
	tempBottom = obj_div_itemType.form["tempBottom"];
	tempBottom.move(10, lastItemBottom + 2, itemWidth, 0, null, null);
	
	panelStyle = null;
	gap = null;
	panelArea = null;
	obj_div_itemType = null;
	obj_div_itemType_title = null;
	top = null;
	left = null;
	axisLimitRight = null;
	axisLimitBottom = null;
	axisLeft = null;
	lastItemBottom = null;
	itemWidth = null;
	itemHeight = null;
	borderRect = null;
	item = null;
	tempBottom = null;
};

/**
 * 해당 Axis 영역의 전체항목 Item Drag 정보 Update
 * @name _setAxisItemDragRect
 * @function 
 * @param {string} axistype Drop 항목의 Axis 종류 (fields|colAxis|rowAxis|values)
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._setAxisItemDragRect = function( axisType ) {
	var panelArea = this.targetPanel;
	var toolbarHeight = this.targetToolbar.getOffsetHeight();
	var objAxis = panelArea.form[axisType];
	var axistitle = objAxis.form["title"];
	var axisCnt = this.axisAreaInfo.axistypes.length;
	var axisLeft = objAxis.getOffsetLeft();
	var panelLeft = panelArea.getOffsetLeft();
	var panelTop = panelArea.getOffsetTop();
	var items = this[axisType+"Items"];
	var itemCnt = items.length;
	var item;
	var dropX;
	var dropY;
	var dropWidth;
	var dropHeight;

	axistitle.set_width(objAxis.getOffsetWidth() - 24);
	
	objAxis.form.resetScroll();
	objAxis.vscrollpos = nexacro.toNumber(objAxis.form.vscrollbar.pos);
	
	for(var i=0;i<itemCnt;i++){	
		item = items[i];

		dropX = panelLeft + axisLeft + item.objLayout.getOffsetLeft();
		dropY = panelTop + toolbarHeight + item.objLayout.getOffsetTop();
		dropWidth = item.objLayout.getOffsetWidth();
		dropHeight = item.objLayout.getOffsetHeight();

		item.dragRect = { targetIndex:item._index, targetColid:item.id, targetX:dropX ,targetY:dropY 
						,targetWidth:dropWidth ,targetHeight:dropHeight ,targetRight:null ,targetBottom:null ,targetVscroll:objAxis.vscrollpos };
	}
	
	panelArea = null;
	toolbarHeight = null;
	objAxis = null;
	axistitle = null;
	axisCnt = null;
	axisLeft = null;
	panelLeft = null;
	panelTop = null;
	items = null;
	itemCnt = null;
	item = null;
	dropX = null;
	dropY = null;
	dropWidth = null;
	dropHeight = null;
};

/**
 * 항목 Item 정보변경 여부 초기화
 * @name _resetPanelIsUpdate
 * @function 
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._resetPanelIsUpdate = function() {
	this.isAggUpdate = false;
	this.isSortUpdate = false;
	this.isFilterUpdate = false;
};

/**
 * 해당 Type 의 Toolbar 영역의 버튼 반환
 * @name _getToolbarButton
 * @function 
 * @param {string} sButtonId 검색할 버튼 Type 문자열
 * @return {object} 해당 버튼 Object
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._getToolbarButton = function( sButtonId ){
	try{
		var comps = this.targetToolbar.form.components;
		var compCnt = comps.length;
		var btnType;
		var rtnObj = null;

		for(var i=0;i<compCnt;i++){
			btnType = comps[i].type;
			
			if(sButtonId == btnType){
				rtnObj = comps[i];
				break;
			}
		}

		return rtnObj;
	}finally{
		comps = null;
		compCnt = null;
		btnType = null;
		rtnObj = null;
	}
};

/**
 * Toolbar 영역의 버튼 활성/비활성 처리
 * @name _enableToolbarButtons
 * @function 
 * @param {string[]} arrButtonId 활성여부를 변경할 Toolbar 버튼 ID 배열문자열 (["button1","button2"])
 * @param {boolean} bEnable 활성여부 (true|false)
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._enableToolbarButtons = function( arrButtonId, bEnable){
	var buttonIds = arrButtonId;
	var comps = this.targetToolbar.form.components;
	var compCnt = comps.length;
	var btnType;
	var resultIndex = -1;

	for(var i=0;i<compCnt;i++){
		btnType = comps[i].type;
		
		resultIndex = NxPivotUtil.indexOf( arrButtonId, comps[i].objid);
		
		if(resultIndex > -1){
			comps[i].set_enable(bEnable);
		}
	}

	buttonIds = null;
	comps = null;
	compCnt = null;
	btnType = null;
	resultIndex = null;
};

/**
 * 속성변경으로 인한 Panel Redraw
 * @name _redrawPanelByPivotProp
 * @function 
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._redrawPanelByPivotProp = function() {
	this._refreshPanel("redraw");
};

/**
 * Pivot usetoolbar 속성 변경시 Redraw
 * @name _set_usetoolbar
 * @function 
 * @param {boolean} bUse 사용여부 (true|false)
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._set_usetoolbar = function(bUse) {
	var usetoolbar = this.targetView.usetoolbar;

	if(this.usetoolbar != bUse){
		this.usetoolbar = bUse;
		
		this._refreshPanel("redraw");
	}	 
	
	usetoolbar = null;
};

/**
 * Pivot useitems 속성 변경시 Redraw
 * @name _set_useitems
 * @function 
 * @param {boolean} bUse 사용여부 (true|false)
 * @memberOf nexacro.NxPivot.View.Panel
 */
_pPanel._set_useitems = function(bUse) {
	var useitems = this.targetView.useitems;
	
	if(this.useitems != bUse){
		this.useitems = bUse;
		
		this._refreshPanel("redraw");
	}	
	
	useitems = null;
};

_pPanel = null;

/**
 * NxPivot > View > Panel > Item(항목) 객체
 * @namespace
 * @class
 * @param {object} parent 생성 scope.
 * @param {object} cfg configurationData객체의 config 정보
 * @memberof! <global>
 */
nexacro.NxPivot.View.Panel.Item = function( parent, cfg ) {
	this.parent = parent;
	this.panelStyle = this.parent.panelStyle;

	this.id = null;
	this._index = -1;
	this._itemType = null;
	
	this.rect = {};
	this.dragRect = {};
	
	this.objLayout = null;
	this.statusObj1 = null;
	this.statusObj2 = null;
	this.titleObj = null;
	this.buttonObj = null;
};

var _pItem = nexacro._createPrototype(Object, nexacro.NxPivot.View.Panel.Item);
nexacro.NxPivot.View.Panel.Item.prototype = _pItem;

/**
 * Axis 영역에 Item 생성
 * @name _createItem
 * @function 
 * @param {object} target Axis Div 객체.
 * @param {string} itemType Axis 종류 (fields|colAxis|rowAxis|values)
 * @param {object} itemObj 생성할 Item 정보를 담은 객체
 * @param {number} left 생성할 Item left
 * @param {number} top 생성할 Item top
 * @param {number} width 생성할 Item width
 * @param {number} height 생성할 Item height
 * @param {number} right 생성할 Item right
 * @param {number} bottom 생성할 Item bottom
 * @memberOf nexacro.NxPivot.View.Panel.Item
 */
_pItem._createItem = function(target ,itemType ,itemObj ,left, top, width, height, right, bottom) {
	try{
		var panelStyle = this.panelStyle;
		
		this.id = itemObj.id;
		this._itemType = itemType;
		
		var gap = nexacro.toNumber(panelStyle.items.gap);
		var statusgap = nexacro.toNumber(panelStyle.items.item.gap);
		var itemWidth = nexacro.toNumber(panelStyle.items.item.width);
		var itemHeight = nexacro.toNumber(panelStyle.items.item.height);
		var statusItemWidth = nexacro.toNumber(panelStyle.items.item.sortsize);
		var statusItemWidth2 = nexacro.toNumber(panelStyle.items.item.filtersize);
		var aggregatorItemWidth2 = nexacro.toNumber(panelStyle.items.item.aggregatorsize);
		var settingBtnWidth = nexacro.toNumber(panelStyle.items.item.buttonsize);

		var padding = panelStyle.items.item.padding.split(" ");
		
		var itemSt01Rect = {};
		var itemSt02Rect = {};
		
		var itemTitleRect = {};
		var itemButtonRect = {};
		var itemButtonVisible = true;
		
		this.rect = { x:left ,y:top ,width:width ,height:height ,right:null ,bottom:null };

		var item = new Static(itemObj.id+"_NxPivotitem", left, top, width, height, null, null);
		target.addChild(itemObj.id+"_NxPivotitem", item); 
		item.set_cssclass(panelStyle.items.item.cssclass);
		item.show();
		
		nexacro.NxPivot.View.Event.makeDragDrop(item, item, this.parent.itemDragFunc, this.parent, false);
		
		var itemLeft = left + nexacro.toNumber(padding[0]);
		var itemTop = top + nexacro.toNumber(padding[1]);
		var itemWidth = width;
		var itemHeight = height - (nexacro.toNumber(padding[1]) + nexacro.toNumber(padding[3]));
		var itemRight = item.getOffsetRight() + nexacro.toNumber(padding[2]);
		var itemBottom = top + height + nexacro.toNumber(padding[3]);
		var titleTop = top + 1;
		var titleHeight = height  - 2;
		
		var axisWidth = target.parent.getOffsetWidth();

		if(itemType == "fields"){
			itemSt01Rect = {x:itemLeft, y:itemTop, width:statusItemWidth, height:itemHeight, right:null, bottom:null};
			itemSt02Rect = {x:itemLeft+(statusItemWidth)+statusgap, y:itemTop, width:statusItemWidth2, height:itemHeight, right:null, bottom:null};
			itemTitleRect = {x:itemLeft, y:titleTop, width:null, height:titleHeight, right:itemRight, bottom:null};
			itemButtonRect = {x:null, y:itemTop, width:settingBtnWidth, height:itemHeight, right:itemRight, bottom:null};
			
			itemButtonVisible = false;
		}else if(itemType == "colAxis" || itemType == "rowAxis"){
			itemSt01Rect = {x:itemLeft, y:itemTop, width:statusItemWidth, height:itemHeight, right:null, bottom:null};
			itemSt02Rect = {x:itemLeft+(statusItemWidth)+statusgap, y:itemTop, width:statusItemWidth2, height:itemHeight, right:null, bottom:null};
			itemTitleRect = {x:itemLeft+(statusItemWidth)+(statusgap+statusItemWidth2)+statusgap, y:titleTop, width:null, height:titleHeight, right:itemRight-(statusgap+settingBtnWidth+statusgap), bottom:null};
			itemButtonRect = {x:null, y:itemTop, width:settingBtnWidth, height:itemHeight, right:itemRight, bottom:null};
		}else if(itemType == "values"){
			statusItemWidth = aggregatorItemWidth2;
			
			itemSt01Rect = {x:itemLeft, y:itemTop, width:statusItemWidth, height:itemHeight, right:null, bottom:null};
			itemSt02Rect = {x:itemLeft+(statusItemWidth+statusgap), y:itemTop, width:statusItemWidth2, height:itemHeight, right:null, bottom:null};
			itemTitleRect = {x:itemLeft+(statusItemWidth+statusgap)+(statusItemWidth2+statusgap), y:titleTop, width:null, height:titleHeight, right:itemRight-(statusgap+settingBtnWidth+statusgap), bottom:null};
			itemButtonRect = {x:null, y:itemTop, width:settingBtnWidth, height:itemHeight, right:itemRight, bottom:null};
			
			this.parent.pivot.config.getFieldItemInfo(itemObj.id);
		}

		var itemSt01 = new Static(itemObj.id+"_NxPivotstatus1", itemSt01Rect.x, itemSt01Rect.y, itemSt01Rect.width, itemSt01Rect.height, null, null);
		target.addChild(itemObj.id+"_NxPivotstatus1", itemSt01); 
	//	itemSt01.set_background("yellow");
		itemSt01.show();
		
		nexacro.NxPivot.View.Event.makeDragDrop(itemSt01, itemSt01, this.parent.itemDragFunc, this.parent, false);
		
		var itemSt02 = new Static(itemObj.id+"_NxPivotstatus2", itemSt02Rect.x, itemSt02Rect.y, itemSt02Rect.width, itemSt02Rect.height, null, null);
		target.addChild(itemObj.id+"_NxPivotstatus2", itemSt02); 
	//	itemSt02.set_background("green");
		itemSt02.show();
		
		nexacro.NxPivot.View.Event.makeDragDrop(itemSt02, itemSt02, this.parent.itemDragFunc, this.parent, false);

		var rst = this.parent.pivot.config.getFilterItem(itemObj.id);
		var bfilter = NxPivotUtil.isEmpty(rst)?false:true;
		var sSort = itemObj.sort.toLowerCase();
		var aggregatorType = (typeof itemObj.aggregator);

		if(itemType == "values"){
			itemSt01.type = "T";
			
			if(aggregatorType == "string"){
				var value = itemObj.aggregator.toLowerCase();
				
				var aggregator = this.parent.language.setting.aggregator;
				var leng = aggregator.length;
				var chk = false;
				
				for(var i=0;i<leng;i++){
					if(aggregator[i].key == value) chk = true;
				}

				if(chk){
					itemSt01.set_cssclass(panelStyle.items.item.aggregatorcssclass+"_"+value);
				}else{
					this.parent.pivot.error(this.targetView, "error", 5001, [ this.id, aggregator ]);
					return;
				}
			}else{	//userFunction
				itemSt01.set_cssclass(panelStyle.items.item.aggregatorcssclass+"_func");
			}
		}else if(itemType == "colAxis" || itemType == "rowAxis"){
			itemSt01.type = "S";
			
			if(sSort == "asc"){
				itemSt01.set_cssclass(panelStyle.items.item.sortasccssclass);
			}else{
				itemSt01.set_cssclass(panelStyle.items.item.sortdesccssclass);
			}

		}else if(itemType == "fields"){
			itemSt01.type = "";
			
			itemSt01.set_visible(false);
			itemSt02.set_visible(false);
		}

		if(itemType == "fields"){
			itemSt02.type = "";
		}else{
			//filter
			if(bfilter){
				itemSt02.type = "F";
				
				itemSt02.set_cssclass(panelStyle.items.item.filtercssclass);
				itemSt02.set_visible(true);
			}else{
				itemSt02.type = "";
				
				itemTitleRect.x -= (statusItemWidth2+statusgap);

				itemSt02.set_visible(false);
			}
		}

		var limitWidth = 0;
		
		if(itemType == "fields"){
			limitWidth = (itemTitleRect.right) - (itemTitleRect.x) - (nexacro.toNumber(padding[3]) + nexacro.toNumber(padding[0])); 
			itemTitleRect.width = limitWidth;
			itemButtonRect.x = itemRight - nexacro.toNumber(padding[2]) - itemButtonRect.width - statusgap;
		}else{
			limitWidth = (itemTitleRect.right - nexacro.toNumber(padding[3])) - itemTitleRect.x; 
			itemTitleRect.width = limitWidth;
			itemButtonRect.x = itemTitleRect.x + itemTitleRect.width + statusgap;
		}

		var itemTitle = new Static(itemObj.id+"_NxPivottitle", itemTitleRect.x, itemTitleRect.y, itemTitleRect.width, itemTitleRect.height, null, null);
		target.addChild(itemObj.id+"_NxPivottitle", itemTitle); 
		itemTitle.set_cssclass("NxPivot_axisArea_item_name");
	//	itemTitle.set_background("red");
		itemTitle.show();
		
		var limitText = this.parent._getAbbreviation(itemTitle ,limitWidth ,itemObj.itemText);
		
		itemTitle.set_text(limitText);
		
		if(limitText.indexOf("...") > -1){
			itemTitle.set_tooltiptext(itemObj.itemText);
		}
		
		nexacro.NxPivot.View.Event.makeDragDrop(itemTitle, itemTitle, this.parent.itemDragFunc, this.parent, false);
		
		//item 설정 Button 생성
		var itemButton = new Button(itemObj.id+"_NxPivotbutton", itemButtonRect.x, itemButtonRect.y, itemButtonRect.width, itemButtonRect.height, itemButtonRect.right, itemButtonRect.bottom);
		target.addChild(itemObj.id+"_NxPivotbutton", itemButton); 
		itemButton.set_cssclass(panelStyle.items.item.settingcssclass);
		itemButton.set_visible(itemButtonVisible);
		itemButton.set_tabstop(false);
	//	itemButton.set_background("black");
		itemButton.show();

		if(itemButton.findEventHandler("onclick", this.parent._settingListPopupOpen, this.parent) < 0){
			nexacro.NxPivot.View.Event.add("onclick" ,itemButton,this.parent._settingListPopupOpen,this.parent);
		}	
		
		nexacro.NxPivot.View.Event.makeDragDrop(itemButton, itemButton, this.parent.itemDragFunc, this.parent, false);
		
		itemSt01.bringToFront();
		itemSt02.bringToFront();
			
		this.objLayout = item;
		this.statusObj1 = itemSt01;
		this.statusObj2 = itemSt02;
		this.titleObj = itemTitle;
		this.buttonObj = itemButton;

		var dropX = this.parent.targetPanel.getOffsetLeft() + target.parent.getOffsetLeft() + item.getOffsetLeft();
		var dropY = this.parent.targetPanel.getOffsetTop() + nexacro.toNumber(panelStyle.toolbar.size) + item.getOffsetTop();
		
		var dropWidth = item.getOffsetWidth();
		var dropHeight = item.getOffsetHeight();
		var index = -1;
		var itemsCnt = 0;
		
		itemsCnt = this.parent[itemType+"Items"].length;
		
		index = itemsCnt;
		this._index = index;
		
		this.dragRect = { targetIndex:index, targetColid:itemObj.id, targetX:dropX ,targetY:dropY ,targetWidth:dropWidth ,targetHeight:dropHeight ,targetRight:null ,targetBottom:null ,targetVscroll:0 };
	}finally{
		panelStyle = null;
		gap = null;
		statusgap = null;
		itemWidth = null;
		itemHeight = null;
		statusItemWidth = null;
		statusItemWidth2 = null;
		aggregatorItemWidth2 = null;
		settingBtnWidth = null;
		padding = null;
		itemSt01Rect = null;
		itemSt02Rect = null;
		itemTitleRect = null;
		itemButtonRect = null;
		itemButtonVisible = null;
		item = null;
		itemLeft = null;
		itemTop = null;
		itemWidth = null;
		itemHeight = null;
		itemRight = null;
		itemBottom = null;
		titleTop = null;
		titleHeight = null;
		axisWidth = null;
		itemSt01 = null;
		itemSt02 = null;
		rst = null;
		bfilter = null;
		sSort = null;
		aggregatorType = null;
		value = null;
		aggregator = null;
		leng = null;
		chk = null;
		limitWidth = null;
		itemTitle = null;
		limitText = null;
		itemButton = null;
		dropX = null;
		dropY = null;
		dropWidth = null;
		dropHeight = null;
		index = null;
		itemsCnt = null;
	}

};

/**
 * Item 상태정보 변경
 * @name _statusChange
 * @function 
 * @memberOf nexacro.NxPivot.View.Panel.Item
 */
_pItem._statusChange = function() {
	try{
		var panelStyle = this.panelStyle;
		var config = this.parent.pivot.config;
		var panel = this.parent.targetPanel;
		var itemid = this.id;
		var itemType = this._itemType;
		var axisArea = panel.form[itemType];
		var itemComp = this.objLayout;
		var rstField = config.getFieldItem(itemid);
		var rstFilter = config.getFilterItem(itemid);
		var bfilter = NxPivotUtil.isEmpty(rstFilter)?false:true;
		var itemSt01 = this.statusObj1;
		var itemSt02 = this.statusObj2;
		var itemTitle = this.titleObj;
		var itemButton = this.buttonObj;
		var statusWidth = nexacro.toNumber(panelStyle.items.item.sortsize);
		var statusWidth2 = nexacro.toNumber(panelStyle.items.item.filtersize);
		var aggregatorWidth2 = nexacro.toNumber(panelStyle.items.item.aggregatorsize);	
		var settingBtnWidth = nexacro.toNumber(panelStyle.items.item.buttonsize);
		
		var statusgap = nexacro.toNumber(panelStyle.items.item.gap);
		
		var padding = this.panelStyle.items.item.padding.split(" ");
		var left = itemComp.getOffsetLeft();
		var width = itemComp.getOffsetWidth();
		var right = itemComp.getOffsetRight();
		var titleRight = (right+nexacro.toNumber(padding[2]))-(statusgap + settingBtnWidth + statusgap);
		
		var titleWidth = 0;
		
		itemSt01.set_visible(true);
		itemSt02.set_visible(true);
		itemTitle.set_visible(true);
		itemButton.set_visible(true);
		
		var aggregatorType = (typeof rstField.aggregator);	
		
		if(itemType == "values"){
			itemSt01.type = "T";
			
			if(aggregatorType == "string"){
				var value = rstField.aggregator.toLowerCase();

				var aggregator = this.parent.language.setting.aggregator;
				var leng = aggregator.length;
				var chk = false;
				
				for(var i=0;i<leng;i++){
					if(aggregator[i].key == value) chk = true;
				}

				if(chk){
					itemSt01.set_cssclass(panelStyle.items.item.aggregatorcssclass+"_"+value);
				}else{
					this.parent.pivot.error(this.targetView, "error", 5001, [ itemid, aggregator ]);
					return;
				}
			}else{
				itemSt01.set_cssclass(panelStyle.items.item.aggregatorcssclass+"_func");
			}
		}else if(itemType == "colAxis" || itemType == "rowAxis"){
			itemSt01.type = "S";
			
			if(rstField.sort == "asc"){
				itemSt01.set_cssclass(panelStyle.items.item.sortasccssclass);
			}else{
				itemSt01.set_cssclass(panelStyle.items.item.sortdesccssclass);
			}

		}else if(itemType == "fields"){
			itemSt01.type = "";
			
			itemSt01.set_visible(false);
			itemSt02.set_visible(false);
		}
		
		if(itemType != "fields"){
			if(bfilter){
				itemSt02.type = "F";
				
				itemTitle.set_left(left+nexacro.toNumber(padding[0]) + (statusWidth + statusgap) + (statusWidth2 + statusgap));	

				itemSt02.set_cssclass(panelStyle.items.item.filtercssclass);
				itemSt02.set_visible(true);
			}else {
				itemSt02.type = "";

				if(itemType == "values"){
					itemSt01.setOffsetWidth(aggregatorWidth2);
					itemTitle.set_left(left+nexacro.toNumber(padding[0]) + aggregatorWidth2 + statusgap);
				}else{
					itemSt01.setOffsetWidth(statusWidth);
					itemTitle.set_left(left+nexacro.toNumber(padding[0]) + statusWidth + statusgap);
				}	
				
				itemSt02.set_visible(false);
			}
		}else{
			itemTitle.set_left(left+nexacro.toNumber(padding[0]));
			
			itemButton.set_visible(false);
		}
		
		var limitWidth = 0;
		
		if(itemType == "fields"){
			titleWidth = (titleRight + (statusgap+settingBtnWidth+statusgap)) - (itemTitle.left) - (nexacro.toNumber(padding[3]) + nexacro.toNumber(padding[0])); 
			itemTitle.set_width(titleWidth);
		}else{
			titleWidth = (itemButton.left - statusgap) - itemTitle.left;
			itemTitle.set_width(titleWidth);
		}

		var limitText = this.parent._getAbbreviation(itemTitle ,titleWidth ,rstField.itemText);
		
		itemTitle.set_text(limitText);
	}finally{
		panelStyle = null;
		config = null;
		panel = null;
		itemid = null;
		itemType = null;
		axisArea = null;
		itemComp = null;
		rstField = null;
		rstFilter = null;
		bfilter = null;
		itemSt01 = null;
		itemSt02 = null;
		itemTitle = null;
		itemButton = null;
		statusWidth = null;
		statusWidth2 = null;
		aggregatorWidth2 = null;
		settingBtnWidth = null;
		statusgap = null;
		padding = null;
		left = null;
		width = null;
		right = null;
		titleRight = null;
		titleWidth = null;
		aggregatorType = null;
		value = null;
		aggregator = null;
		leng = null;
		chk = null;
		limitWidth = null;
		limitText = null;
	}

};

/**
 * Item 이동시 Drop 된 Item 정보변경
 * @name _itemDrop
 * @function 
 * @param {string} fromId Drag 항목의 colid
 * @param {string} fromAxisType Drag 항목의 Axis 종류 (fields|colAxis|rowAxis|values)
 * @param {number} fromIndex Drag 항목의 index
 * @param {string} toId Drop 항목의 colid
 * @param {string} toAxisType Drop 항목의 Axis 종류 (fields|colAxis|rowAxis|values)
 * @param {number} toIndex Drop 항목의 index
 * @memberOf nexacro.NxPivot.View.Panel.Item
 */
_pItem._itemDrop = function(fromId, fromAxisType, fromIndex, toId, toAxisType, toIndex) {
	var fromAxis = this.parent.targetPanel.form[fromAxisType];
	var toAxis = this.parent.targetPanel.form[toAxisType];
	var toAxisItems = null;

	var itemobj = this.objLayout;
	var itemid = itemobj.id;
	var statusObj1 = this.statusObj1;
	var status1id = statusObj1.id;
	var statusObj2 = this.statusObj2;
	var status2id = statusObj2.id;
	var titleObj = this.titleObj;
	var titleid = titleObj.id;
	var buttonObj = this.buttonObj;
	var buttonid = buttonObj.id;
	
	var removeItem = fromAxis.form.removeChild(itemid);	
	toAxis.form.addChild(itemid,removeItem);
	removeItem.show();
	this.objLayout = removeItem;

	removeItem = fromAxis.form.removeChild(status1id);	
	toAxis.form.addChild(status1id,removeItem);
	removeItem.show();
	this.statusObj1 = removeItem;

	removeItem = fromAxis.form.removeChild(status2id);	
	toAxis.form.addChild(status2id,removeItem);
	removeItem.show();
	this.statusObj2 = removeItem;

	removeItem = fromAxis.removeChild(titleid);	
	toAxis.form.addChild(titleid,removeItem);
	removeItem.show();
	this.titleObj = removeItem;
	
	removeItem = fromAxis.form.removeChild(buttonid);	
	toAxis.form.addChild(buttonid,removeItem);
	removeItem.show();
	this.buttonObj = removeItem;

	fromAxis = null;
	toAxis = null;
	toAxisItems = null;
	itemobj = null;
	itemid = null;
	statusObj1 = null;
	status1id = null;
	statusObj2 = null;
	status2id = null;
	titleObj = null;
	titleid = null;
	buttonObj = null;
	buttonid = null;
	removeItem = null;
};

/**
 * 정해진 위치로 item 이동
 * @name _itemMove
 * @function 
 * @memberOf nexacro.NxPivot.View.Panel.Item
 */
_pItem._itemMove = function() {
	var itemid = this.id;
	var axisType = this._itemType;
	var itemLeft;
	var itemTop;
	
	var objLayout = this.objLayout;
	var statusObj1 = this.statusObj1;
	var statusObj2 = this.statusObj2;
	var titleObj = this.titleObj;
	var buttonObj = this.buttonObj;
	
	var itemSt01Rect = { gabX:statusObj1.left-objLayout.left, gabY:statusObj1.top-objLayout.top };
	var itemSt02Rect = { gabX:statusObj2.left-objLayout.left, gabY:statusObj2.top-objLayout.top };
	var itemTitleRect = { gabX:titleObj.left-objLayout.left, gabY:titleObj.top-objLayout.top };
	var itemButtonRect = { gabX:buttonObj.left-objLayout.left, gabY:buttonObj.top-objLayout.top };

	objLayout.set_visible(false);
	statusObj1.set_visible(false);
	statusObj2.set_visible(false);
	titleObj.set_visible(false);
	buttonObj.set_visible(false);
	
	objLayout.move(0,0);
	statusObj1.move(0,0);
	statusObj2.move(0,0);
	titleObj.move(0,0);
	buttonObj.move(0,0);
	
	objLayout.move( this.rect.x, this.rect.y, this.rect.width, this.rect.height, this.rect.right, this.rect.bottom );
	
	itemLeft = objLayout.getOffsetLeft();
	itemTop = objLayout.getOffsetTop();
	
	statusObj1.move( itemLeft+itemSt01Rect.gabX, itemTop+itemSt01Rect.gabY );
	statusObj2.move( itemLeft+itemSt02Rect.gabX,  itemTop+itemSt01Rect.gabY );
	titleObj.move( itemLeft+itemTitleRect.gabX,  itemTop + 1 );
	buttonObj.move( itemLeft+itemButtonRect.gabX,  itemTop+itemButtonRect.gabY );

	objLayout.set_visible(true);
	
	this._statusChange();

	itemid = null;
	axisType = null;
	itemLeft = null;
	itemTop = null;
	objLayout = null;
	statusObj1 = null;
	statusObj2 = null;
	titleObj = null;
	buttonObj = null;
	itemSt01Rect = null;
	itemSt02Rect = null;
	itemTitleRect = null;
	itemButtonRect = null;
};

_pItem = null;


/**
 * NxPivot > View > Event 객체
 * @namespace
 * @class
 * @memberof! <global>
 */
nexacro.NxPivot.View.Event = {};
var _pEvent = nexacro.NxPivot.View.Event;

/**
 * 이벤트 추가
 * @name add
 * @function 
 * @param {string} eventId 추가할 이벤트ID
 * @param {object} obj 추가할 이벤트 대상 Object
 * @param {object} func 추가할 이벤트시 함수
 * @param {object} scope 추가할 이벤트 발생 Scope
 * @memberOf nexacro.NxPivot.View.Event
 */
_pEvent.add = function(eventId, obj, func, scope){
	obj.addEventHandler(eventId, func, scope);
};

/**
 * 이벤트 삭제
 * @name remove
 * @function 
 * @param {string} eventId 삭제할 이벤트ID
 * @param {object} obj 삭제할 이벤트 대상 Object
 * @param {object} func 삭제할 이벤트시 함수
 * @param {object} scope 삭제할 이벤트 발생 Scope
 * @memberOf nexacro.NxPivot.View.Event
 */
_pEvent.remove = function(eventId, obj, func, scope){
	obj.removeEventHandler(eventId, func, scope);
};

/**
 * Drag&Drop 이벤트 생성
 * @name makeDragDrop
 * @function 
 * @param {object} obj 추가할 이벤트 대상 Object
 * @param {object} objTarget 추가할 대상 Object 의 임의 전달 object 
 * @param {object} func 추가할 이벤트시 함수
 * @param {object} scope 추가할 이벤트 발생 Scope
 * @param {boolean} childYn 하위 객체 이벤트 추가여부
 * @memberOf nexacro.NxPivot.View.Event
 */
_pEvent.makeDragDrop = function(obj, objTarget, func, scope, childYn){
	var i;
	var objComp;
	
	if(childYn==true){
		obj.targetComp = objTarget;
		obj.dragFunc = func.dragevent;
		obj.dropFunc = func.dropevent;
		for(i=0;i<obj.form.components.length;i++){
			
			objComp = obj.form.components[i];
			objComp.targetComp = objTarget;
			this.add("onlbuttondown", objComp, nexacro.NxPivot.View.Event.onLButtonDown, scope);
			this.add("onlbuttonup", objComp, nexacro.NxPivot.View.Event.onLButtonUp, scope);
		}
	}else{
		obj.targetComp = objTarget;
		obj.dragFunc = func.dragevent;
		obj.dropFunc = func.dropevent;
		this.add("onlbuttondown", obj, nexacro.NxPivot.View.Event.onLButtonDown, scope);
		this.add("onlbuttonup", obj, nexacro.NxPivot.View.Event.onLButtonUp, scope);
	}
};

/**
 * mousemove 이벤트 생성
 * @name makeDragMove
 * @function 
 * @param {object} obj 추가할 이벤트 대상 Object
 * @param {object} func 추가할 이벤트시 함수
 * @param {object} scope 추가할 이벤트 발생 Scope
 * @memberOf nexacro.NxPivot.View.Event
 */
_pEvent.makeDragMove = function(obj, func, scope){
	obj.dragmoveFunc = func;
	this.add("onmousemove", obj, nexacro.NxPivot.View.Event.onMove, scope);
};

/**
 * Drag 시 발생 함수
 * @name onLButtonDown
 * @function 
 * @param {object} obj 이벤트 발생 Object
 * @param {object} e nexacro.MouseEventInfo 객체
 * @memberOf nexacro.NxPivot.View.Event
 */
_pEvent.onLButtonDown = function(obj, e){
	var arrs = [];
	this.dragData = {
						targetComp : obj.targetComp,
						x : e.screenx,
						y : e.screeny,
						status : "drag"
					}
	
	arrs[arrs.length] = obj.targetComp;
	arrs[arrs.length] = e;
	
	obj.targetComp.dragFunc.apply(this, arrs);
};

/**
 * Drop 시 발생 함수
 * @name onLButtonUp
 * @function 
 * @param {object} obj 이벤트 발생 Object
 * @param {object} e nexacro.MouseEventInfo 객체
 * @memberOf nexacro.NxPivot.View.Event
 */
_pEvent.onLButtonUp = function(obj, e){
	if(this.dragData!=null)
	{
		if(this.dragData.status=="dragmove"){
			e.preventDefault();
			e.stopPropagation();
			
			var arrs = [];
			arrs[arrs.length] = obj.targetComp;
			arrs[arrs.length] = e;
			
			obj.targetComp.dropFunc.apply(this, arrs);
		}
		this.dragData = null;
	}
};

/**
 * DragMove 시 발생 함수
 * @name onMove
 * @function 
 * @param {object} obj 이벤트 발생 Object
 * @param {object} e nexacro.MouseEventInfo 객체
 * @memberOf nexacro.NxPivot.View.Event
 */
_pEvent.onMove = function(obj, e){
	var moveX;
	var moveY;
	var arrs = [];
	
	if(this.dragData!=null)
	{
		this.dragData.status = "dragmove";
 		moveX = (e.screenx - this.dragData.x);
 		moveY = (e.screeny - this.dragData.y);
		
		arrs[arrs.length] = obj;
		arrs[arrs.length] = this.dragData.targetComp;
		arrs[arrs.length] = moveX;
		arrs[arrs.length] = moveY;
		arrs[arrs.length] = e;
			
		obj.dragmoveFunc.apply(this, arrs);
	}
};
	
_pEvent = null;

delete _pItem;
delete _pPanel;
delete _pGridView;
delete _pView;