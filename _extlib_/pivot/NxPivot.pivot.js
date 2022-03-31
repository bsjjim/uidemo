/**
 * NxPivot > Pivot 객체
 * @namespace
 * @class 
 * @param {object} scope 생성 scope
 * @param {object} configurationData pivot 설정 정보
 * @memberof! <global>
 */
nexacro.NxPivot.Pivot = function(scope, configurationData) {
	this.scope = scope;

	this.message = new nexacro.NxPivot.Message(this);	
	
	this.config = new nexacro.NxPivot.Config(this, configurationData);

	this._orgConfig = NxPivotUtil.clone(configurationData, true); //초기화시 사용할 초기설정 속성.

	this.filterStr = ""; //dataSource의 filterStr을 이용할지 여부 추후 검토!
	this.cube = new nexacro.NxPivot.Pivot.Cube(this, configurationData.config);
	this.view = new nexacro.NxPivot.View(this, configurationData.config);
	this._isRended = false; //데이터 변경 후 최초 render 실행 여부.
	//changeAxisValue에서 체크용.
};

var _pPivot = nexacro._createPrototype(Object, nexacro.NxPivot.Pivot);
nexacro.NxPivot.Pivot.prototype = _pPivot;


/**
 * 전달된 scope에 data source 생성 또는 반환.
 * @name createDataSource
 * @function
 * @param {object} scope 생성 scope
 * @param {string} type data source type
 * @param {string} name data source name
 * @return {DataSource} data source
 * @memberOf nexacro.NxPivot.Pivot
 */
_pPivot.createDataSource = function(scope, type, name) {
	var ds = scope.parent.form[name];
	var datasource = null;
	
	try{
		if(ds){
			ds.deleteAll();
			ds.clear();
			
			return ds;
		}
	
		datasource = new Dataset;
		scope.parent.form.addChild(name, datasource);

		datasource.set_updatecontrol(false);
		datasource.set_enableevent(false);
			
		return datasource;
	}finally{
		ds = null;
		datasource = null;
	}
};

/**
 * Pivot Render
 * @name render
 * @function  
 * @param {boolean} bChkRender 이전 render 실행 체크여부
 * @memberOf nexacro.NxPivot.Pivot
 */
_pPivot.render = function(bChkRender) {
	try{
		var config = this.config;
		var targetView = config.targetView;
		
		if(!this._isValidForRender()) {
			targetView.on_fire_onrender(targetView);
			return false;
		}
		
		targetView.setLoadingbar("renderProcess", bChkRender);
		
		return true;
	}finally{
		config = null;
		targetView = null;
	}
};	

/**
 * Pivot Render 실행
 * @name renderProcess
 * @function  
 * @param {boolean} bChkRender 이전 render 실행 체크여부
 * @memberOf nexacro.NxPivot.Pivot
 */
_pPivot.renderProcess = function(bChkRender){
	try{
		var cube = this.cube;
		var config = this.config;
		var targetView = config.targetView;
		var ds_updatecontrol = this.config.dataSource.updatecontrol;
		var ds_enableevent = this.config.dataSource.enableevent;
		
		this.config.dataSource.set_updatecontrol(false);
		this.config.dataSource.set_enableevent(false);

		this._isRended = false;
		
		this.cube._isCompleteDistinctValues = false;
		this.config.dataSource.filter("");
		this.filterStr = "";
		
		//AggregatorMap 재설정.
		cube.setValuesAggregatorMap(config);
		
		if(cube._isCompleteDistinctValues == false) {
			//[주의] filter 유효성 검사를 위해 setDistinctValueOfId()이 호출 되야함.
			NxPivotUtil.pivotUtil.setDistinctValueOfId(cube, config.dataSource);
		}
		
		var result = NxPivotUtil.pivotUtil.setFilterData(this, config);
		
		if(!result){
			this.config.dataSource.set_updatecontrol(ds_updatecontrol);
			this.config.dataSource.set_enableevent(ds_enableevent);
		
			this.error(targetView, "error", 1009);
			targetView.on_fire_onrender(targetView);
			return false;
		}
		
		//항목변경여부 초기화
		this.view.panel._resetPanelIsUpdate();
		
		NxPivotUtil.pivotUtil.generateCube(this, cube);
		
		this.view.gridView.makeGridFormat();
		
		if(bChkRender!=false)this._isRended = true;
		
		this.config.dataSource.set_updatecontrol(ds_updatecontrol);
		this.config.dataSource.set_enableevent(ds_enableevent);
		
		targetView.on_fire_onrender(targetView);
	}finally{
		cube = null;
		config = null;
		targetView = null;
		ds_updatecontrol = null;
		ds_enableevent = null;	
	}
}

/**
 * Pivot Axis or Value item 목록변경
 * @name changeAxisValue
 * @function  
 * @param {boolean} bChkRender 이전 render 실행 체크여부
 * @memberOf nexacro.NxPivot.Pivot
 */
_pPivot.changeAxisValue = function(bChkRender) {
	try{
		var config = this.config;
		var targetView = config.targetView;
		
		if(!this._isValidForRender()) {
			return false;
		}
		
		targetView.setLoadingbar("changeAxisValueProcess", bChkRender);
	}finally{
		config = null;
		targetView = null;		
	}
};	

/**
 * Pivot Axis or Value item 목록변경 실행
 * @name changeAxisValueProcess
 * @function  
 * @param {boolean} bChkRender 이전 render 실행 체크여부
 * @memberOf nexacro.NxPivot.Pivot
 */
_pPivot.changeAxisValueProcess = function(bChkRender){
	try{
		//render가 실행된 적이 없으면.
		if(!this._isRended) {
			this.render(bChkRender);
			return;
		}
		var cube = this.cube;
		var config = this.config;
		var targetView = config.targetView;
		
		var ds_updatecontrol = this.config.dataSource.updatecontrol;
		var ds_enableevent = this.config.dataSource.enableevent;
		
		this.config.dataSource.set_updatecontrol(false);
		this.config.dataSource.set_enableevent(false);
		
		//AggregatorMap 재설정.
		cube.setValuesAggregatorMap(config);
		
		if(cube._isCompleteDistinctValues == false) {
			//[주의] filter 유효성 검사를 위해 setDistinctValueOfId()이 호출 되야함.
			NxPivotUtil.pivotUtil.setDistinctValueOfId(cube, config.dataSource);
		}
		
		NxPivotUtil.pivotUtil.setFilterData(this, config);
		 
		//항목변경여부 초기화
		this.view.panel._resetPanelIsUpdate();
		 
		NxPivotUtil.pivotUtil.generateCube(this, cube);
		this.view.gridView.makeGridFormat();
		
		this.config.dataSource.set_updatecontrol(ds_updatecontrol);
		this.config.dataSource.set_enableevent(ds_enableevent);
	
	}finally{
		cube = null;
		config = null;
		targetView = null;
		ds_updatecontrol = null;
		ds_enableevent = null;
	}	

}

/**
 * Binding data 변경시 실행
 * @name updateToDataset
 * @function  
 * @memberOf nexacro.NxPivot.Pivot
 */
_pPivot.updateToDataset = function() {
	this._isRended = false;
	
	this.view.refresh();
};	

/**
 * Pivot 설정 초기화
 * @name refresh
 * @function  
 * @memberOf nexacro.NxPivot.Pivot
 */
_pPivot.refresh = function() {
	var orgConfigurationData = NxPivotUtil.clone(this._orgConfig, true);
	this.config = new nexacro.NxPivot.Config(this, orgConfigurationData);	
	this.cube.releaseCubeNode();

	this.cube.pivotDataSource.deleteAll();
	this.cube.pivotDataSource.clear();
	
	orgConfigurationData = null;
};	


/**
 * render 실행 전 validation 체크
 * @name _isValidForRender
 * @function  
 * @private
 * @return {boolean} colAxis, rowAxis, values가 각각 최소 1개 이상 있을 경우만 true 반환
 * @memberOf nexacro.NxPivot.Pivot
 */
_pPivot._isValidForRender = function() {
	var config = this.config;

	try{
		if(config.colAxis.length == 0) {
			return false;
		}
		
		if(config.rowAxis.length == 0) {
			return false;
		}
		
		if(config.values.length == 0) {
			return false;
		}
		
		return true;
	}finally{
		config = null;
	}
};	



/**
 * Pivot sort 정보 설정
 * @name setSortInfo
 * @function   
 * @param {object[]} list sort 정보 객체 배열
 * @return {boolean} 성공 여부
 * @memberOf nexacro.NxPivot.Pivot
 */
_pPivot.setSortInfo = function(list) {
	return this.config.setSortInfo(list);
},	


/**
 * Pivot sort 실행.
 * @name sort
 * @function  
 * @memberOf nexacro.NxPivot.Pivot
 */
_pPivot.sort = function() {
	NxPivotUtil.pivotUtil.sortAxis(this);
};

/**
 * Pivot filter 정보 설정
 * @name setFilterInfo
 * @function   
 * @param {object[]} list filter 정보 객체 배열
 * @return {boolean} 성공 여부
 * @memberOf nexacro.NxPivot.Pivot
 */
_pPivot.setFilterInfo = function(list) {
	return this.config.setFilterInfo(list);
},	


/**
 * Pivot filter 제거
 * @name removeFilter
 * @function 
 * @memberOf nexacro.NxPivot.Pivot
 */
_pPivot.removeFilter = function() {
	this.config.filters.length = 0;
};	

/**
 * Pivot filter 실행
 * @name filter
 * @function  
 * @memberOf nexacro.NxPivot.Pivot
 */
_pPivot.filter = function() {
	var ds_updatecontrol = this.config.dataSource.updatecontrol;
	var ds_enableevent = this.config.dataSource.enableevent;
	
	this.config.dataSource.set_updatecontrol(false);
	this.config.dataSource.set_enableevent(false);
	
	var result = NxPivotUtil.pivotUtil.setFilterData(this, this.config);
	if(!result){
		this.config.dataSource.set_updatecontrol(ds_updatecontrol);
		this.config.dataSource.set_enableevent(ds_enableevent);
	
		return;
	}
	
	NxPivotUtil.pivotUtil.generateCube(this, this.cube);
	this.view.gridView.makeGridFormat();
	
	this.config.dataSource.set_updatecontrol(ds_updatecontrol);
	this.config.dataSource.set_enableevent(ds_enableevent);
};

/**
 * Pivot Error 발생
 * @name error
 * @function  
 * @param {object} obj 에러발생 Object
 * @param {string} errortype 에러종류
 * @param {number|string} statuscode 에러코드 0001~0999:common, 1000~1999:pivot, 2000~2999:config, 3000~3999:view, 4000~4999:panel, 5000~5999:item
 * @param {string[]} arrValues 에러메시지 치환 문자열배열
 * @memberOf nexacro.NxPivot.Pivot
 */
_pPivot.error = function(obj, errortype, statuscode, arrValues) {
	try{
		var config = this.config;
		var targetView = config.targetView;
		
		var error = this.message.language[NxPivotUtil.language].message[errortype];
		var errormsg = "";
		var _arrValues = [];
		var msg404_idx = -1;
		var msg200_idx = -1;
		
		if(!NxPivotUtil.isEmpty(statuscode)) statuscode = statuscode.toString().padLeft(4, "0");

		for(var i=0;i<error.length;i++){
			if(error[i].key == "0001") msg404_idx = i;
			if(error[i].key == statuscode){
				msg200_idx = i;
				
				if(!NxPivotUtil.isEmpty(arrValues)){
					for(var j=0;j<arrValues.length;j++){
						_arrValues[_arrValues.length] = arrValues[j];
					}
					errormsg = NxPivotUtil.replaceBraces(error[i].text, _arrValues);
				}else{
					errormsg = error[i].text;
				}
				break;
			}
		}
		
		if(!NxPivotUtil.isEmpty(statuscode)){
			if(msg200_idx < 0){
				errormsg = NxPivotUtil.replaceBraces( error[msg404_idx].text, [statuscode]);
				statuscode = "0001";
			}
		}
		
		targetView.on_fire_onerror(obj, errortype, errormsg, statuscode);
	}finally{
		config = null;
		targetView = null;		
		error = null;
		errormsg = null;
		_arrValues = null;
		msg404_idx = null;
		msg200_idx = null;
	}
}

/**
 * Message 등록된 문자열 반환
 * @name getMessage
 * @function  
 * @param {string} messagetype 메시지종류
 * @param {number|string} statuscode 메시지코드
 * @param {string[]} arrValues 메시지 치환 문자열배열
 * @return {string} 해당 메시지 문자열
 * @memberOf nexacro.NxPivot.Pivot
 */
_pPivot.getMessage = function(messagetype, statuscode, arrValues){
	try{
		var message = this.message.language[NxPivotUtil.language].message[messagetype];
		var rtnmsg = "";
		var _arrValues = [];
		var msg404_idx = -1;
		var msg200_idx = -1;
		
		if(!NxPivotUtil.isEmpty(statuscode)) statuscode = statuscode.toString().padLeft(4, "0");

		for(var i=0;i<message.length;i++){
			if(message[i].key == "0001") msg404_idx = i;
			if(message[i].key == statuscode){
				msg200_idx = i;
				
				if(!NxPivotUtil.isEmpty(arrValues)){
					for(var j=0;j<arrValues.length;j++){
						_arrValues[_arrValues.length] = arrValues[j];
					}
					rtnmsg = NxPivotUtil.replaceBraces(message[i].text, _arrValues);
				}else{
					rtnmsg = message[i].text;
				}
				break;
			}
		}
		
		if(!NxPivotUtil.isEmpty(statuscode)){
			if(msg200_idx < 0) rtnmsg = NxPivotUtil.replaceBraces( message[msg404_idx].text, [statuscode]);
		}	

		return rtnmsg;
	}finally{
		message = null;
		rtnmsg = null;
		_arrValues = null;
		msg404_idx = null;
		msg200_idx = null;
	}
}

_pPivot = null;

/**
 * NxPivot > Pivot > Cube Data 객체
 * @namespace
 * @class
 * @param {object} parent parent.
 * @param {object} cfg configuration object
 * @memberof! <global>
 */ 
nexacro.NxPivot.Pivot.Cube = function(parent, cfg) {
	if(!cfg) {
		NxPivotUtil.log("The config arguments is required.");
		return;
	}

	this.parent = parent; //NxPivotUtil.pivot

	var sortId  = NxPivotUtil.getUniqueId("sortDataSource" + "_");
	var pivotId = NxPivotUtil.getUniqueId("pivotDataSource" + "_");
	var filterId = NxPivotUtil.getUniqueId("filterDataSource" + "_");
	this.sortDataSource = parent.createDataSource(this.parent.scope, "dataset", sortId);
	this.pivotDataSource = parent.createDataSource(this.parent.scope, "dataset", pivotId);
	this.filterDataSource = parent.createDataSource(this.parent.scope, "dataset", filterId);
	
	this.valueIdList = [];
	this.valuesAggregatorMap = {};
	this.pathToNodeMap = {};
	
	this.allMemberId = NxPivotUtil.getUniqueId();

	this.colAxisDisplayMembers = null; // column 축에 표시될 member 목록
	this.rowAxisDisplayMembers = null; // row 축에 표시될 member 목록
	
	this.colAxisFields = []; //field id list
	this.rowAxisFields = []; //field id list
	
	this.cubeNodePool = []; // CubeNode 재사용을 위한 Pool
	this.cubeNodeCount = -1; //현재 사용중인 CubeNode 개수
	
	this.setValuesAggregatorMap(cfg);
	
	this._isCompleteDistinctValues = false;
};

var _pCube = nexacro._createPrototype(Object, nexacro.NxPivot.Pivot.Cube);
nexacro.NxPivot.Pivot.Cube.prototype = _pCube;

/**
 * item id에 해당하는 aggregator 정보를 맵에 추가
 * @name setValuesAggregatorMap
 * @function
 * @param {object} config configuration object
 * @memberOf nexacro.NxPivot.Pivot.Cube
 */	
_pCube.setValuesAggregatorMap = function(config) {
	try{
		var valuesAggregatorMap = this.valuesAggregatorMap;
		var values = config.values;
		var valuesCount = values.length;
		var valueIdList = this.valueIdList = [];
		var valueId;
		var value = "";
		var id = "";
		for (var i=0,len=values.length; i<len; i++) {
			value = values[i];
			id = value.id;
			valueIdList[valueIdList.length] = id;
			valuesAggregatorMap[id] = value.aggregator;
		}	
	}finally{
		valuesAggregatorMap = null;
		values = null;
		valuesCount = null;
		valueIdList = null;
		valueId = null;
		value = null;
		id = null;
	}
};	


/**
 * cube에 존재하는 모든 CubeNode 인스턴스의 정보를 해제한다
 * @name releaseCubeNode
 * @function
 * @memberOf nexacro.NxPivot.Pivot.Cube
 */	
_pCube.releaseCubeNode = function() {
	try{
		var node;
		var map = this.pathToNodeMap;
		
		for (var p in map) {
			if ( map.hasOwnProperty(p) ) {
				node = map[p];
				map[p] = null;

				if ( node._released ) {
					node = null;
					continue;
				}

				node.release();
				node = null;
			}
		}
		map = null;

		this.pathToNodeMap = null;
		this.pathToNodeMap = {};

		this.cubeNodeCount = -1;
	}finally{
		node = null;
		map = null;
	}
};

_pCube = null;

/**
 * NxPivot > Pivot > Cube > CubeNode 객체
 * @class
 * @param {object} cube target cube
 * @param {string} nm CubeNode name
 * @param {CubeNode=} p parent CubeNode
 * @memberof! <global>
 */
nexacro.NxPivot.Pivot.Cube.CubeNode = function(cube, nm, p)
{
	this.init(cube, nm, p);
};

var _pCubeNode = nexacro._createPrototype(Object, nexacro.NxPivot.Pivot.Cube.CubeNode);
nexacro.NxPivot.Pivot.Cube.CubeNode.prototype = _pCubeNode;

/**
 * initialize CubeNode
 * @name init
 * @function
 * @param {object} cube target cube
 * @param {string} nm CubeNode name
 * @param {CubeNode=} p parent CubeNode
 * @memberOf nexacro.NxPivot.Pivot.Cube.CubeNode
 */
_pCubeNode.init = function(cube, nm, p)
{
	this.name = nm;
	this.Parent = p;
	this.children    = [];
	this.childrenMap = {};
	this.valueMap    = {}; //value 보관
	this.depth = 0;
	this.path  = [];

	var tempPath = [];
	var nodePath = "";
	
	if ( p ) {
		this.depth = p.depth + 1;

		if ( p.childrenMap == null ) {
			p.childrenMap = {};
		}

		if ( p.children == null ) {
			p.children = [];
		}

		p.childrenMap[nm] = this;
		p.children[p.children.length] = this;

		if ( p.path ) {
			tempPath = p.path.concat([]);
		}
	}

	tempPath = tempPath.concat(nm);

	this.path = tempPath;
	nodePath = "["+tempPath.join("][")+"]";
	//releaseCubeNode에서 사용.
	cube.pathToNodeMap[nodePath] = this;

	tempPath = null;
	nodePath = null;
};

/**
 * name getter
 * @name getName
 * @function 
 * @return {string} name
 * @memberOf nexacro.NxPivot.Pivot.Cube.CubeNode
 */
_pCubeNode.getName = function()
{
	return this.name;
};

/**
 * name setter
 * @name setName
 * @function 
 * @param {string} value name
 * @memberOf nexacro.NxPivot.Pivot.Cube.CubeNode
 */
_pCubeNode.setName = function(value)
{
	this.name = value;
};

/**
 * children getter
 * @name getChildren
 * @function 
 * @return {array} children
 * @memberOf nexacro.NxPivot.Pivot.Cube.CubeNode
 */
_pCubeNode.getChildren = function()
{
	return this.children;
};

/**
 * Parent getter
 * @name getParent
 * @function  
 * @return {CubeNode} Parent
 * @memberOf nexacro.NxPivot.Pivot.Cube.CubeNode
 */
_pCubeNode.getParent = function()
{
	return this.Parent;
};

/**
 * depth getter
 * @name getDepth
 * @function  
 * @return {number} depth
 * @memberOf nexacro.NxPivot.Pivot.Cube.CubeNode
 */
_pCubeNode.getDepth = function()
{
	return this.depth;
};

/**
 * child node를 얻어온다
 * @name getChild
 * @function  
 * @param {string|number} c name or index
 * @return {CubeNode} child CubeNode
 * @memberOf nexacro.NxPivot.Pivot.Cube.CubeNode
 */
_pCubeNode.getChild = function(c)
{
	if ( NxPivotUtil.isString(c) ) {
		if ( this.childrenMap == null ) return null;
		return this.childrenMap[c];
	} else if ( NxPivotUtil.isNumber(c) ) {
		if ( this.children == null ) return null;
		return this.children[c];

	}

	return null;
};

/**
 * node에 value 추가
 * @name addValue
 * @function  
 * @param {string} name item id
 * @param {*} value item value
 * @memberOf nexacro.NxPivot.Pivot.Cube.CubeNode
 */
_pCubeNode.addValue = function(name, value)
{
	var valueMap   = this.valueMap;
	if ( !valueMap.hasOwnProperty(name) ) {
		valueMap[name]   = [];
	}

	valueMap[name][valueMap[name].length] = value;
	
	var _parent = this.Parent;
	if ( _parent ) {
		_parent.addValue.call(_parent, name, value);
	}
	
	valueMap = null;
};

/**
 * node 에 지정된 measure 값 목록을 얻어온다
 * @name getValues
 * @function  
 * @param {string} name node name
 * @memberOf nexacro.NxPivot.Pivot.Cube.CubeNode
 */
_pCubeNode.getValues = function(name)
{
	try{
		var valueMap = this.valueMap;
		if ( !valueMap[name] ) {
			return [];
		}

		return valueMap[name];
	}finally{
		valueMap = null;
	}
};

/**
 * CubeNode의 정보를 모두 해제
 * @name release
 * @function   
 * @memberOf nexacro.NxPivot.Pivot.Cube.CubeNode
 */
_pCubeNode.release = function()
{
	try{
		var child;
		var childrenMap = this.childrenMap;
		if ( childrenMap ) {
			for(var c in childrenMap) {
				if ( childrenMap.hasOwnProperty(c) ) {
					child = childrenMap[c];
					child.release();
					child = null;
					childrenMap[c] = null;
					this.childrenMap[c] = null;
				}
			}

			this.childrenMap = null;
			this.children.length = 0;
		}

		childrenMap = null;
		this.Parent = null;
		this.p = null;
		this.path.length = 0;
		this.path = null;

		var valueMap = this.valueMap;
		for (var p in valueMap) {
			if ( valueMap.hasOwnProperty(p) ) {
				valueMap[p] = null;
			}
		}
		
		valueMap = null;
		this.valueMap = null;

		this._released = true;
	}finally{
		child = null;
		childrenMap = null;
	}
};

_pCubeNode = null;

delete _pCubeNode;
delete _pCube;
delete _pPivot;