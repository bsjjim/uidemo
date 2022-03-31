/**
 * NxPivot > Config 객체
 * @namespace
 * @class
 * @param {object} parent parent
 * @param {object} cfg configuration object
 * @memberof! <global>
 */	 
nexacro.NxPivot.Config = function(parent, cfg) {
	this.parent = parent;
	
	if(!cfg) {
		this.parent.error(cfg.config.targetView, "error", 2001);
		return;
	}
	
	this.dataSource = cfg.config.dataSource;
	
	this.colAxis = cfg.config.colAxis || [];
	this.rowAxis = cfg.config.rowAxis || [];
	this.values  = cfg.config.values  || [];	
	this.fields  = cfg.config.fields  || [];
	this.filters = cfg.config.filters || [];
	
	this.customAggregator = {}; //item id별 사용자 정의 집계정보
	
	this.defaultItemWidth     = 100;
	this.defaultAggregator    = "cnt";
	this.defaultCaseSensitive = true;
	this.defaultFieldType      = "string";
	this.defaultSort           = "asc";
	
	this.casesensitive = cfg.config.casesensitive || false;
	this.roundfractiondigit = cfg.config.roundfractiondigit;
	
	this.allMemberName = cfg.config.allMemberName || "소계";//"Total"; // old 부분합 표시 텍스트
	this.allMemberDisplayWithOwnName = cfg.config.allMemberDisplayWithOwnName; //부분합 명칭을 표시할 때 소속된 member 의 명칭을 보여줄지 여부
	
	this.colTotalPosition = cfg.config.colTotalPosition || "none"; //부분합 표시위치
	this.rowTotalPosition = cfg.config.rowTotalPosition || "none"; //부분합 표시위치
	
	this.colGrandtotalPosition = cfg.config.colGrandtotalPosition || "none";  // col 총계 표시
	this.rowGrandtotalPosition = cfg.config.rowGrandtotalPosition || "none";; // row 총계 표시
	this.showGrandTotal = false; //총계 표시
	if(this.colGrandtotalPosition != "none" || this.rowGrandtotalPosition != "none") {
		this.showGrandTotal = true; //총계 표시
	}

	this.totalText = cfg.config.totalText || "Total"; //부분합 표시 텍스트
	this.grandTotalText = cfg.config.grandTotalText || "Grand Total"; //(row 축) 총합에 표시할 명칭
	this.emptyDataText = "-";
	
	this.targetView = cfg.config.targetView;
	this.grid = {
		limitHeight : 200,
		itemHeight : 20,
		headHeight : cfg.config.gridheadheight || 20,
		bodyHeight : cfg.config.gridbodyheight || 20,
		summHeight : cfg.config.gridsummheight || 20,
		drillDownOpenHeadClass : "cell_drilldown_open",
		drillDownCloseHeadClass : "cell_drilldown_close",
		drillDownOpenBodyClass : "cell_drilldown_open",
		drillDownCloseBodyClass : "cell_drilldown_close",
		gridClass : "NxPivot_grid"
	};
	
	this.commtoolbars = {
		cssclass : {
			show : "NxPivot_toolbarButton_show",
			hide : "NxPivot_toolbarButton_hide",
			rowstatus_expand : "NxPivot_toolbarButton_rowstatus_expand",
			rowstatus_collapse : "NxPivot_toolbarButton_rowstatus_collapse",
			colstatus_expand : "NxPivot_toolbarButton_rowstatus_expand",
			colstatus_collapse : "NxPivot_toolbarButton_rowstatus_collapse",
			auto : "NxPivot_toolbarButton_auto",
			manual : "NxPivot_toolbarButton_manual",
			init : "NxPivot_toolbarButton_init",
			execute : "NxPivot_toolbarButton_execute"
		}
	};
	
	this.commsettingpopup = {
		cssclass : {
			setListPopup : "NxPivot_setListPopup",
			list : "NxPivot_setListPopup_list",
			line : "NxPivot_setListPopup_line",
			asc : "NxPivot_setListPopup_asc",
			desc : "NxPivot_setListPopup_desc",
			check : "NxPivot_setListPopup_check",
			clearfilter : "NxPivot_setListPopup_clearFilter",
			addfilter : "NxPivot_setListPopup_addFilter",
			combo_cssclass : "NxPivot_popup_combo",
			edit_cssclass : "NxPivot_popup_edit",
			calendar_cssclass : "NxPivot_popup_calendar",
			grid_cssclass : "NxPivot_popup_grid"
		}
	};

	this.panel = this.targetView.setPanelConfig(cfg.panel);
	this.settingpopup = this.targetView.setSettingPopupConfig(cfg.settingpopup);

	this.initData();
};

var _pConfig = nexacro._createPrototype(Object, nexacro.NxPivot.Config);
nexacro.NxPivot.Config.prototype = _pConfig;

/**
 * Config 객체 초기화
 * @name initData
 * @function
 * @memberOf nexacro.NxPivot.Config
 */	
_pConfig.initData = function() {
	var _nUtil = NxPivotUtil;
	var itemWidth     = this.defaultItemWidth;
	var aggregator    = this.defaultAggregator;
	var fieldType     = this.defaultFieldType;
	var caseSensitive = this.defaultCaseSensitive;	
	var sort          = this.defaultSort;
	
	var list = ["colAxis", "rowAxis", "values", "fields"];
	var len = list.length;
	var item;

	//aggregator 목록 생성.
	this.setAggregatorList();
	
	//item 초기화.
	for(var i=0; i<len; i++) {
		item = this[list[i]];
		this.initItems(item, itemWidth, aggregator, fieldType, caseSensitive, sort);
	}
	
	this.aggregatorList.length = 0; //사용 후 필요없는 내용 제거.
	this.aggregatorList = null;
	
	//filter type 설정.
	var srcItem;
	var filterList = this.filters;
	len = filterList.length;

	for(var i =0; i<len; i++) {
		item = filterList[i];
		srcItem = this.getFieldItem(item.id);
		item.type = srcItem.type;
		
		if(_nUtil.isEmpty(item.caseSensitive)) {
			item.caseSensitive = caseSensitive;
		}
	}
	
	_nUtil = null;
	itemWidth = null;
	aggregator = null;
	fieldType = null;
	caseSensitive = null;
	sort = null;
	srcItem = null;
	filterList = null;
	list = null;
	len = null;
	item = null;
};	

/**
 * 언어에 따른 aggregator 목록 생성. 유효성 체크
 * @name setAggregatorList
 * @function
 * @memberOf nexacro.NxPivot.Config
 */ 
_pConfig.setAggregatorList = function() {
	try{
		var language = NxPivotUtil.language;
		var settingLanguage = this.parent.message.language[language];
		var msg = "language.setting";

		if(NxPivotUtil.isEmpty(settingLanguage)) {
			this.parent.error(this.targetView, "error", 2002, [msg, language]);
			return false;
		}	

		var settingAggregator = settingLanguage.setting.aggregator;
		
		if(NxPivotUtil.isEmpty(settingAggregator)) {
			this.parent.error(this.targetView, "error", 2003, [msg, language]);
			return false;
		}

		this.aggregatorList = NxPivotUtil.clone(settingAggregator, true);
	}finally{
		language = null;
		settingLanguage = null;
		msg = null;
		settingAggregator = null;
	}
};	

/**
 * item의 Aggregator 유효성 체크
 * expr일 경우 함수로 변환
 * @name isValidAggregator
 * @function
 * @param {object} item item object
 * @return {boolean} 유효성 여부 반환
 * @memberOf nexacro.NxPivot.Config
 */
_pConfig.isValidAggregator = function(item) {
	try{
		var _nUtil = NxPivotUtil;
		var aggregator = item.aggregator;
		var evalResult = "";
		var msg = "[Error] Aggregator";
		
		var customAggregator = this.customAggregator;
		var aggregatorList = this.aggregatorList;
		var listLen = aggregatorList.length;
		var isBasicAggregator = false; //기본(sum, max,...) 집계함수 여부.
		
		if(_nUtil.isEmpty(aggregator)) {
			this.parent.error(this.targetView, "error", 2004, [msg, item.id]);
			return false;
		}
		
		if(_nUtil.isString(aggregator)) {
			var lowerCaseTxt = "";
			for(var i=0; i<listLen; i++) {
				lowerCaseTxt = aggregator.toLowerCase();
				if(lowerCaseTxt == aggregatorList[i].key) {
					item.aggregator = lowerCaseTxt;
					isBasicAggregator = true;
					break;
				}
			}
			
			if(!isBasicAggregator) {
				this.parent.error(this.targetView, "error", 2005, [aggregator, item.id]);
				return false;
			}	
			
			return true;
		}

		if(_nUtil.isObject(aggregator)) {
			var aggregatorName = aggregator["name"];
			var itemId = item.id;
			
			if(_nUtil.isEmpty(aggregatorName)) {
				this.parent.error(this.targetView, "error", 2006, [msg, item.id]);
				return false;
			}
			
			if(_nUtil.isEmpty(aggregator["func"])) {
				this.parent.error(this.targetView, "error", 2007, [msg, item.id]);
				return false;
			}
			
			if(!_nUtil.isFunction(aggregator["func"])) {
				this.parent.error(this.targetView, "error", 2008, [msg, item.id]);
				return false;
			}

			this.customAggregator[itemId] = aggregator;	
		}
		
		return true;
	}finally{
		_nUtil = null;
		aggregator = null;
		evalResult = null;
		msg = null;
		customAggregator = null;
		aggregatorList = null;
		listLen = null;
		isBasicAggregator = null;
		lowerCaseTxt = null;
		aggregatorName = null;
		itemId = null;
	}
};	

/**
 * items default value 적용
 * @name initItems
 * @function
 * @param {object[]} list item list
 * @param {number} itemWidth default item width
 * @param {string} aggregator default aggregator
 * @param {string} fieldType default field type
 * @param {boolean} caseSensitive default case sensitive
 * @param {string} sort default sort
 * @memberOf nexacro.NxPivot.Config
 */	
_pConfig.initItems = function(list, itemWidth, aggregator, fieldType, caseSensitive, sort) {
	var len = list.length;
	var item;
	var _isValidAggregator = true;
	
	for(var i =0; i<len; i++) {
		item = list[i];
		this.initItem(item, itemWidth, aggregator, fieldType, caseSensitive, sort);	
		this.isValidAggregator(item);
	}
	
	len = null;
	item = null;
	_isValidAggregator = null;
};	

/**
 * item default value 적용
 * @name initItem
 * @function
 * @param {object} item item
 * @param {number} itemWidth default item width
 * @param {string} aggregator default aggregator
 * @param {string} fieldType default field type
 * @param {boolean} caseSensitive default case sensitive
 * @param {string} sort default sort
 * @memberOf nexacro.NxPivot.Config
 */	
_pConfig.initItem = function(item, itemWidth, aggregator, fieldType, caseSensitive, sort) {
	var _nUtil = NxPivotUtil;
	
	if(_nUtil.isEmpty(item.itemWidth)) {
		item.itemWidth = itemWidth;
	}
	
	if(_nUtil.isEmpty(item.aggregator)) {
		item.aggregator = aggregator;
	}

	if(_nUtil.isEmpty(item.type)) {
		item.type = fieldType;
	} else {
		item.type = item.type.toLowerCase();
	}
	
	if(_nUtil.isEmpty(item.caseSensitive)) {
		item.caseSensitive = caseSensitive;
	}
	
	if(_nUtil.isEmpty(item.sort)) {
		item.sort = sort;
	} else {
		item.sort = item.sort.toLowerCase();
	}
	
	_nUtil = null;
};	

/**
 * item 초기화 단독 호출
 * @name _initItem
 * @function
 * @private
 * @param {object} item item
 * @memberOf nexacro.NxPivot.Config
 */	
_pConfig._initItem = function(item) {
	this.initItem(item, this.defaultItemWidth, this.defaultAggregator
				, this.defaultFieldType, this.defaultCaseSensitive, this.defaultSort);
};	


/**
 * Item 반환
 * @name getFieldItem
 * @function
 * @param {string} id item id
 * @return {(object|undefined)} item.일치하는 item이 없을 경우 undefined 반환
 * @memberOf nexacro.NxPivot.Config
 */	
_pConfig.getFieldItem = function(id) {
	try{
		var list = ["colAxis", "rowAxis", "values", "fields"];
		var len = list.length;
		var itemList;
		var value;
		
		for(var i=0; i<len; i++) {
			itemList = this[list[i]];
			value = this._getItem(itemList, id);
			
			if(value) {
				return value;
			}
		}
		
		return;		
	}finally{
		list = null;
		len = null;
		itemList = null;
		value = null;
	}
};	

/**
 * id에 해당하는 item이 "colAxis", "rowAxis", "values"에 존재하는 item인지 여부를 반환
 * @name _isValidFilterId
 * @function
 * @param {string} id item id
 * @param {array} list ex) ["colAxis", "rowAxis", "values"]
 * @return {boolean} 일치하는 item이 있을 경우 true, 없으면 false 반환
 * @private
 * @memberOf nexacro.NxPivot.Config
 */	
_pConfig._isValidFilterId = function(id, list) {
	try{
		var len = list.length;
		var itemList;
		var value;
		
		for(var i=0; i<len; i++) {
			itemList = this[list[i]];
			value = this._getItem(itemList, id);
			
			if(value) {
				return true;
			}
		}
		
		return false;		
	}finally{
		len = null;
		itemList = null;
		value = null;
	}
};	

/**
 * Filter item 반환
 * @name getFilterItem
 * @function
 * @param {string} id item id
 * @return {(object|undefined)} item.일치하는 item이 없을 경우 undefined 반환
 * @memberOf nexacro.NxPivot.Config
 */	
_pConfig.getFilterItem = function(id) {
	return this._getItem(this.filters, id);
};

/**
 * Item 반환
 * @name _getItem
 * @function
 * @private
 * @param {object[]} itemList item list
 * @param {string} id item id
 * @return {(object|undefined)} item.일치하는 item이 없을 경우 undefined 반환
 * @memberOf nexacro.NxPivot.Config
 */	
_pConfig._getItem = function(itemList, id) {
	try{
		var itemLen = itemList.length;
		var field;
		
		for(var i=0; i<itemLen; i++) {
			field = itemList[i];
			
			if(id == field.id) {
				return field;
			}
		}
		return;		
	}finally{
		itemLen = null;
		field = null;
	}
};	


/**
 * Sort 정보 설정
 * @name setSortInfo
 * @function
 * @param {object[]} list sort 정보 object
 * @return {boolean} 성공시 true, 실패시 false
 * @memberOf nexacro.NxPivot.Config
 */	
_pConfig.setSortInfo = function(list) {
	try{
		var msg = "[Error] config.setSortInfo >";
		if( !NxPivotUtil.isArray(list) ) {
			this.parent.error(this.targetView, "error", 2009, [msg, list]);
			return false;
		}	
		
		var len = list.length;
		var info;
		var validInfoList = [];
		var itemList = [];
		var item;
		var id;
		var temp;
		var sortText = "";
		
		//check valid.
		for(var i=0; i<len; i++) {
			info = list[i];
			
			if(!NxPivotUtil.isObject(info)){
				this.parent.error(this.targetView, "error", 2010, [msg, i, info]);
				return false;
			}
			
			id = info.id;
			sortText = info.sort.toLowerCase();
			
			item = this.getFieldItem(id);
			if(!item) {
				this.parent.error(this.targetView, "error", 2011, [msg, id]);

				validInfoList.length = 0;
				itemList.length = 0;
				return false;
			} else {
				if( (sortText != "desc") && (sortText != "asc") ) {
					this.parent.error(this.targetView, "error", 2012, [msg, sortText]);
					return false;
				}
				
				validInfoList.push(info);
				itemList.push(item);
			}
		}
		
		//apply
		for(var i=0; i<len; i++) {
			itemList[i].sort = validInfoList[i].sort;
		};
		
		return true;
	}finally{
		msg = null;
		len = null;
		info = null;
		validInfoList = null;
		itemList = null;
		item = null;
		id = null;
		temp = null;
		sortText = null;
	}
};


/**
 * Filter 정보 설정
 * @name setFilterInfo
 * @function
 * @param {object[]} list filter 정보 object
 * @return {boolean} 성공시 true, 실패시 false
 * @memberOf nexacro.NxPivot.Config
 */	
_pConfig.setFilterInfo = function(list) {
	try{
		var _nUtil = NxPivotUtil;
		if( !_nUtil.isArray(list) ) {
			this.parent.error(this.targetView, "error", 2013, [list]);
			return false;
		}		
		
		var len = list.length;
		var info;
		var validInfoList = [];
		var item;
		var id;
		var msg = "[Error] config.setFilterInfo >";
		
		//check valid.
		for(var i=0; i<len; i++) {
			info = list[i];
			
			if(!_nUtil.isObject(info)){
				this.parent.error(this.targetView, "error", 2014, [msg, i, info]);
				return false;
			}
			
			id = info.id;
			
			item = this.getFieldItem(id);
			
			if(!item) {
				this.parent.error(this.targetView, "error", 2015, [msg, id]);
				return false;
				
			} else {
				if(_nUtil.isEmpty(info.operation)) {
					this.parent.error(this.targetView, "error", 2016, [msg, id]);
					return false;
				}
				
				if(!_nUtil.isArray(info.values)) {
					this.parent.error(this.targetView, "error", 2017, [msg, id]);
					return false;
				}
				
				if(_nUtil.isEmpty(info.values)) {
					this.parent.error(this.targetView, "error", 2018, [msg, id]);
					return false;
				}
				
				info.type = item.type;
				
				if(info.type == "string" && _nUtil.isEmpty(info.caseSensitive)) {
					info.caseSensitive = this.defaultCaseSensitive;
				}
				
				 validInfoList.push(info);
			}
		}	
		
		
		var filters = this.filters;
		var tempInfo;
		 //config에 설정되어 있는 config 초기화
		filters.length = 0;
		
		//apply
		for(var i=0; i<len; i++) {
			tempInfo = validInfoList[i];
			
			filters.push(tempInfo);
		};	
		
		//NxPivotUtil.log("pivot.setFilterInfo > 설정 후 확인 ", filters);
		
		return true;
	}finally{
		_nUtil = null;
		len = null;
		info = null;
		validInfoList = null;
		item = null;
		id = null;
		msg = null;
		filters = null;
		tempInfo = null;
	}
};	

/**
 * Item 이동
 * @name moveFieldItem
 * @function
 * @param {object[]} list 시작 item 정보 object
 * @param {number} list 시작 item index
 * @param {object[]} list 종료 item 정보 object
 * @param {number} list 종료 item index
 * @memberOf nexacro.NxPivot.Config
 */	
_pConfig.moveFieldItem = function(fromAxis, fromIdx, toAxis, toIdx){
	
	var objItem = this[fromAxis].splice(fromIdx, 1);
	
	this[toAxis].splice(toIdx, 0, objItem[0]);
	
	objItem = null;
};

/**
 * 해당 id 를 가지고 있는 item 정보 반환
 * @name getFieldItemInfo
 * @function
 * @param {string} id item colid
 * @return {object} 입력 id에 해당하는 item object 반환
 * @memberOf nexacro.NxPivot.Config
 */	
_pConfig.getFieldItemInfo = function(id){
	try{
		var i;
		var fieldItem;
		var filters = this.filters;
		var filterList = [];
		var objItem;
		var filterDataSource;
		
		fieldItem = this.getFieldItem(id);
		
		if(NxPivotUtil.isEmpty(fieldItem)==true)return;
		
		filterDataSource = NxPivotUtil.pivotUtil.getFilterItemData(this.parent, id);
		
		for(i=filters.length-1;i>=0;i--){
			if(filters[i].id==id){
				objItem = filters.splice(i, 1)[0];
				filterList[filterList.length] = objItem;
			}
		}
		
		var field  = {
						data : this.getFieldItem(id),
						filterDataSource : filterDataSource,
						filterList : filterList
					};
		return field;
	}finally{
		i = null;
		fieldItem = null;
		filters = null;
		filterList = null;
		objItem = null;
		filterDataSource = null;
		field = null;
	}
}

/**
 * 해당 item 정보 변경
 * @name setFieldItemInfo
 * @function
 * @param {object} field item 정보를 담고있는 object
 * @memberOf nexacro.NxPivot.Config
 */	
_pConfig.setFieldItemInfo = function(field){
	var data = field.data;
	var filterDataSource = field.filterDataSource;
	var filterList = field.filterList;

	var item = this.getFieldItem(data.id);

	item.id = data.id;
	item.type = data.type;
	item.itemText = data.itemText;
	item.itemWidth = data.itemWidth;
	item.sort = data.sort;
	item.aggregator = data.aggregator;

	if(filterList.length > 0){
		this.filters[this.filters.length] = filterList[0];
	}
	
	data = null;
	filterDataSource = null;
	filterList = null;
	item = null;
}
	
_pConfig = null;

delete _pConfig;