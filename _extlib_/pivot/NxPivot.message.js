/**
 * NxPivot > Message 객체
 * @namespace
 * @class 
 * @param {object} parent parent
 * @memberof! <global>
 */	 
nexacro.NxPivot.Message = function(parent) {
	this.parent = parent;
};

var _pMessage = nexacro._createPrototype(Object, nexacro.NxPivot.Message);
nexacro.NxPivot.Message.prototype = _pMessage;

/**
 * 언어종류
 * @name nexacro.NxPivot.Message.language
 * @property {object} en_us - 영문
 * @property {object} ko_kr - 한글
 * @memberof nexacro.NxPivot.Message
 */
_pMessage.language = {
	en_us:{},
	ko_kr:{}
};

/**
 * 필터조건 종류(영문)
 * @name language.en_us.filter
 * @property {array} number - 숫자
 * @property {array} string - 문자열
 * @property {array} date - 날짜
 * @memberof nexacro.NxPivot.Message
 */
_pMessage.language.en_us.filter = {
	number: [
		 {key: "lt",
		  text:"less than"
		 },
		 {key: "gt",
		  text:"greater than"
		 },
		 {key: "leq",
		  text:"less than or equal"
		 },
		 {key: "geq",
		  text:"greater than or equal"
		 },
		 {key: "eq",
		  text:"equal"
		 },
		 {key: "neq",
		  text:"not equal"
		 }
	],
	
	string: [
		 {key: "ct",
		  text:"contains"
		 },
		 {key: "nct",
		  text:"not contains"
		 },
		 {key: "eq",
		  text:"equal"
		 },
		 {key: "neq",
		  text:"not equal"
		 }
	],
	
	date: [
		{key: "between",
		 text:"Between"	
		},
		{key: "geq",
		 text:"After"	
		},
		{key: "leq",
		 text:"Before"	
		},
		{key: "eq",
		 text:"Equal"	
		}
	]
};

/**
 * 필터조건 종류(한글)
 * @name language.ko_kr.filter
 * @property {array} number - 숫자
 * @property {array} string - 문자열
 * @property {array} date - 날짜
 * @memberof nexacro.NxPivot.Message
 */
_pMessage.language.ko_kr.filter = {
	number: [
		 {key: "lt",
		  text:"보다 작음"
		 },
		 {key: "gt",
		  text:"보다 큼"
		 },
		 {key: "leq",
		  text:"작거나 같음"
		 },
		 {key: "geq",
		  text:"크거나 같음"
		 },
		 {key: "eq",
		  text:"같음"
		 },
		 {key: "neq",
		  text:"같지 않음"
		 }
	],
	
	string: [
		 {key: "ct",
		  text:"포함"
		 },
		 {key: "nct",
		  text:"비포함"
		 },
		 {key: "eq",
		  text:"같음"
		 },
		 {key: "neq",
		  text:"같지 않음"
		 }
	],
	
	date: [
		{key: "between",
		 text:"기간"	
		},
		{key: "geq",
		 text:"이후"	
		},
		{key: "leq",
		 text:"이전"	
		},
		{key: "eq",
		 text:"같음"	
		}		
	]	
};

/**
 * 셋팅관련 코드(영문)
 * @name language.en_us.setting
 * @property {array} checkflag - 필터팝업 그리드 Head
 * @property {array} filter - 필터조건 "없음"
 * @property {array} aggregator - 집계종류
 * @property {array} itemList - 필터팝업 관련
 * @property {array} viewDetails - 상세보기팝업 관련
 * @memberof nexacro.NxPivot.Message
 */
_pMessage.language.en_us.setting = {
	checkflag : [
		{key : "uncheckall", text : "Clear all"},
		{key : "checkall", text : "Select All"}
	],
	
	filter : [
		{key : "", text : "NO"}
	],
	
	aggregator : [
		{key : "sum", text : "Sum"},
		{key : "avg", text : "Avg"},
		{key : "cnt", text : "Cnt"},
		{key : "min", text : "Min"},
		{key : "max", text : "Max"}
	],
	
	itemList : [
		{key : "filterTitle", text : "Filter"},
		{key : "search", text : "Search"},
		{key : "submit", text : "Submit"},
		{key : "close", text : "Close"}
	],
	viewDetails : [
		{key : "viewDetails", text : "View Details"}
	]
}

/**
 * 셋팅관련 코드(한글)
 * @name language.ko_kr.setting
 * @property {array} checkflag - 필터팝업 그리드 Head
 * @property {array} filter - 필터조건 "없음"
 * @property {array} aggregator - 집계종류
 * @property {array} itemList - 필터팝업 관련
 * @property {array} viewDetails - 상세보기팝업 관련
 * @memberof nexacro.NxPivot.Message
 */
_pMessage.language.ko_kr.setting = {
	checkflag : [
		{key : "uncheckall", text : "전체해제"},
		{key : "checkall", text : "전체선택"}
	],
	
	filter : [
		{key : "", text : "설정안함"}
	],
	
	sort :[
		{key : "asc", text : "ASC"},
		{key : "desc", text : "DESC"}
	],
	
	aggregator : [
		{key : "sum", text : "합계"},
		{key : "avg", text : "평균"},
		{key : "cnt", text : "갯수"},
		{key : "min", text : "최소값"},
		{key : "max", text : "최대값"}
	],
	
	itemList : [
		{key : "filterTitle", text : "항목필터"},
		{key : "search", text : "검색"},
		{key : "submit", text : "적용"},
		{key : "close", text : "닫기"}
	],
	viewDetails : [
		{key : "viewDetails", text : "상세보기"}
	]
}

/**
 * Axis 종류 코드(영문)
 * @name language.en_us.axisArea
 * @property {array} types - Axis 종류
 * @memberof nexacro.NxPivot.Message
 */
_pMessage.language.en_us.axisArea = {
	types : [
		{key : "fields", text : "All"},
		{key : "colAxis", text : "Columns"},
		{key : "rowAxis", text : "Rows"},
		{key : "values", text : "Values"}
	]
}

/**
 * Axis 종류 코드(한글)
 * @name language.ko_kr.axisArea
 * @property {array} types - Axis 종류
 * @memberof nexacro.NxPivot.Message
 */
_pMessage.language.ko_kr.axisArea = {
	types : [
		{key : "fields", text : "전체"},
		{key : "colAxis", text : "열"},
		{key : "rowAxis", text : "행"},
		{key : "values", text : "값"}
	]
}

/**
 * Toolbar 버튼 관련 코드(영문)
 * @name language.en_us.toolbar
 * @property {array} buttonaligntype - Toolbar Button 정렬
 * @property {array} buttontypes - Toolbar Button 종류
 * @memberof nexacro.NxPivot.Message
 */
_pMessage.language.en_us.toolbar = {
	buttonaligntype : [
		{key : "left-top", text : "LEFT&TOP"},
		{key : "right-bottom", text : "RIGHT|BOTTOM"}
	],
	buttontypes : [
		{key : "toolbarstatus", text : "hide,show", toggleflag : "show,hide"},
		{key : "rowsstatus", text : "collapse,expand", toggleflag : "expand,collapse"},
		{key : "columnsstatus", text : "collapse,expand", toggleflag : "expand,collapse"},
		{key : "autoexecute", text : "manual,auto", toggleflag : "manual,auto"},
		{key : "initialization", text : "init"},
		{key : "execute", text : "execute"}
	]
}

/**
 * Toolbar 버튼 관련 코드(한글)
 * @name language.ko_kr.toolbar
 * @property {array} buttonaligntype - Toolbar Button 정렬
 * @property {array} buttontypes - Toolbar Button 종류
 * @memberof nexacro.NxPivot.Message
 */
_pMessage.language.ko_kr.toolbar = {
	buttonaligntype : [
		{key : "left-top", text : "좌상"},
		{key : "right-bottom", text : "우하"}
	],
	buttontypes : [
		{key : "toolbarstatus", text : "패널접기,패널펼치기", toggleflag : "show,hide"},
		{key : "rowsstatus", text : "행모두펼치기,행모두접기", toggleflag : "collapse,expand"},
		{key : "columnsstatus", text : "열모두펼치기,열모두접기", toggleflag : "collapse,expand"},
		{key : "autoexecute", text : "수동적용,자동적용", toggleflag : "manual,auto"},
		{key : "initialization", text : "초기화"},
		{key : "execute", text : "Pivot실행"}
	]
}

/**
 * 팝업관련 코드(영문)
 * @name language.en_us.settingPopList
 * @property {array} rowCol - 셋팅팝업 리스트
 * @memberof nexacro.NxPivot.Message
 */
_pMessage.language.en_us.settingPopList = {
	rowCol : [
		{key : "asc", text : "Sort A to Z"},
		{key : "desc", text : "Sort Z to A"},
		{key : "clearfilter", text : "Clear filter from"},
		{key : "addfilter", text : "Label filters"}
	]
}

/**
 * 팝업관련 코드(한글)
 * @name language.ko_kr.settingPopList
 * @property {array} rowCol - 셋팅팝업 리스트
 * @memberof nexacro.NxPivot.Message
 */
_pMessage.language.ko_kr.settingPopList = {
	rowCol : [
		{key : "asc", text : "Sort A to Z"},
		{key : "desc", text : "Sort Z to A"},
		{key : "clearfilter", text : "Clear filter from"},
		{key : "addfilter", text : "Label filters"}
	]
}

/**
 * 팝업관련 코드(영문)
 * @name language.en_us.message
 * @property {array} error - 에러 메시지
 * @property {array} validate - validate 메시지
 * @memberof nexacro.NxPivot.Message
 */
_pMessage.language.en_us.message = {
	error : [
		{key : "0001", text : "Error statuscode '{0}' is not exist"},	//common
		{key : "1001", text : "[Error] {0} > Invalid filter type. type = {1}"},	//pivot
		{key : "1002", text : "[Error] {0} > values is empty."},
		{key : "1003", text : "[Error] {0} > Invalid operation. operation = {1}"},
		{key : "1004", text : "[Error] {0} > Invalid values. values = {1}"},
		{key : "1005", text : "[Error] {0} > Invalid date range. values = {1}"},
		{key : "1006", text : "[Error] pivotUtil.sortAxis > Invalid staus. node or fields is not INIT."},
		{key : "1007", text : "[Error] pivotUtil.setFilterData(): Invalid id. id={0}"},
		{key : "1008", text : "Aggregator '{0}' is undefined !!"},
		{key : "1009", text : "Invalid Item filter values."},
		{key : "2001", text : "The config arguments is required."},	//config
		{key : "2002", text : "{0} is Empty!. language= {1}"},
		{key : "2003", text : "{0}.aggregator is Empty!. language= {1}"},
		{key : "2004", text : "{0} is Empty!. id= {1}"},
		{key : "2005", text : "[Error] invalid aggregator! aggregator={0},  id= {1}"},
		{key : "2006", text : "{0} 'name' is Empty!. id= {1}"},
		{key : "2007", text : "{0} 'func' is Empty!. id= {1}"},
		{key : "2008", text : "{0} 'func' is not function!. id= {1}"},
		{key : "2009", text : "{0} PARAM is not array. list= {1}"},
		{key : "2010", text : "{0} value is not object. list[{1}]= {2}"},
		{key : "2011", text : "{0} ID({1}) is not exist!"},
		{key : "2012", text : "{0} Invalid sortText. sortText={1}"},
		{key : "2013", text : "[Error] config.setFilterInfo > PARAM is not array. list= {0}"},
		{key : "2014", text : "{0} value is not object. list[{1}]= {2}"},
		{key : "2015", text : "{0} ID({1}) is not exist!"},
		{key : "2016", text : "{0} operation property is not exist! id= {1}"},
		{key : "2017", text : "{0} values property is not Array! id= {1}"},
		{key : "2018", text : "{0} values property is empty id= {1}"},
		{key : "3001", text : ""},	//view
		{key : "4001", text : "Invalid Panel Type."},	//panel
		{key : "4002", text : "Panel undefined."},
		{key : "4003", text : "Invalid PopupDiv Component."},
		{key : "5001", text : "'{0}' aggregator '{1}' is undefined."}	//item
	],
	validate : [
		{key : "0001", text : "Message statuscode '{0}' is not exist"},
		{key : "0002", text : "Start date is greater than end date."}
	]
}

/**
 * 팝업관련 코드(한글)
 * @name language.ko_kr.message
 * @property {array} error - 에러 메시지
 * @property {array} validate - validate 메시지
 * @memberof nexacro.NxPivot.Message
 */
_pMessage.language.ko_kr.message = {
	error : [
		{key : "0001", text : "Error statuscode '{0}' is not exist"},	//common
		{key : "1001", text : "[Error] {0} > Invalid filter type. type = {1}"},	//pivot
		{key : "1002", text : "[Error] {0} > values is empty."},
		{key : "1003", text : "[Error] {0} > Invalid operation. operation = {1}"},
		{key : "1004", text : "[Error] {0} > Invalid values. values = {1}"},
		{key : "1005", text : "[Error] {0} > Invalid date range. values = {1}"},
		{key : "1006", text : "[Error] pivotUtil.sortAxis > Invalid staus. node or fields is not INIT."},
		{key : "1007", text : "[Error] pivotUtil.setFilterData(): Invalid id. id={0}"},
		{key : "1008", text : "Aggregator '{0}' is undefined !!"},
		{key : "1009", text : "Invalid Item filter values."},
		{key : "2001", text : "The config arguments is required."},	//config
		{key : "2002", text : "{0} is Empty!. language= {1}"},
		{key : "2003", text : "{0}.aggregator is Empty!. language= {1}"},
		{key : "2004", text : "{0} is Empty!. id= {1}"},
		{key : "2005", text : "[Error] invalid aggregator! aggregator={0},  id= {1}"},
		{key : "2006", text : "{0} 'name' is Empty!. id= {1}"},
		{key : "2007", text : "{0} 'func' is Empty!. id= {1}"},
		{key : "2008", text : "{0} 'func' is not function!. id= {1}"},
		{key : "2009", text : "{0} PARAM is not array. list= {1}"},
		{key : "2010", text : "{0} value is not object. list[{1}]= {2}"},
		{key : "2011", text : "{0} ID({1}) is not exist!"},
		{key : "2012", text : "{0} Invalid sortText. sortText={1}"},
		{key : "2013", text : "[Error] config.setFilterInfo > PARAM is not array. list= {0}"},
		{key : "2014", text : "{0} value is not object. list[{1}]= {2}"},
		{key : "2015", text : "{0} ID({1}) is not exist!"},
		{key : "2016", text : "{0} operation property is not exist! id= {1}"},
		{key : "2017", text : "{0} values property is not Array! id= {1}"},
		{key : "2018", text : "{0} values property is empty id= {1}"},
		{key : "3001", text : ""},	//view
		{key : "4001", text : "Invalid Panel Type."},	//panel
		{key : "4002", text : "Panel undefined."},
		{key : "4003", text : "Invalid PopupDiv Component."},
		{key : "5001", text : "'{0}' aggregator '{1}' is undefined."}	//item
	],
	validate : [
		{key : "0001", text : "메시지코드 '{0}' 가 존재하지 않습니다."},
		{key : "0002", text : "시작날짜가 종료날짜보다 큽니다."}
	]
}

_pMessage = null;

delete _pMessage;