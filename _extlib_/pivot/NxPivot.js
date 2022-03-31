if (!nexacro.NxPivot) {
	/**
	 * NxPivot 객체
	 * @namespace
	 * @class 
	 * @param {string} id id
	 * @param {number} left left
	 * @param {number} top top
	 * @param {number} width width
	 * @param {number} height height
	 * @param {number} right right
	 * @param {number} bottom bottom
	 * @param {number} minwidth minwidth
	 * @param {number} maxwidth maxwidth
	 * @param {number} minheight minheight
	 * @param {number} maxheight maxheight
	 * @param {object} parent parent
	 * @memberof! <global>
	 */	 
	nexacro.NxPivot = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Div.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
		
		this.pivot = null;		
		
		this.form = new nexacro._InnerForm("form", 0, 0, width, height, null, null, null, null, null, null, this);
		
		this.form.on_created_contents = function (win)
		{
			nexacro.FormBase.prototype.on_created_contents.call(this, win);
			this._changeUserStatus("contents", true);
		    
			this.parent.onloadPivot();
		};
	};

	var _pNxPivot = nexacro._createPrototype(nexacro.Div, nexacro.NxPivot);
	nexacro.NxPivot.prototype = _pNxPivot;
	_pNxPivot._type_name = "NxPivot";
	
	//신규추가 ???
	_pNxPivot.binddataset = null;
	_pNxPivot._binddataset = null;	
	_pNxPivot.contentsxml = null;	
	_pNxPivot.configurationdata = null;	
	_pNxPivot.coltotalposition = "none";
	_pNxPivot.rowtotalposition = "none";	
	_pNxPivot.colgrandtotalposition = "none";
	_pNxPivot.rowgrandtotalposition = "none";	
	_pNxPivot.gridheadheight = 20;	
	_pNxPivot.gridbodyheight = 20;	
	_pNxPivot.gridsummheight = 20;	
	_pNxPivot.roundfractiondigit = 2;
	_pNxPivot.casesensitive = false;
	_pNxPivot.totaltext = "";
	_pNxPivot.grandtotaltext = "";	
	_pNxPivot.usetoolbar = true;	
	_pNxPivot.useitems = true;	
	_pNxPivot.loadingimage = "";
	
	//_pNxPivot._is_scrollable = true;
	
    _pNxPivot.call_on_create_contents = false;
	_pNxPivot.call_set_rowgrandtotalposition = false;
	
	_pNxPivot._cell_elem = null;
  

	_pNxPivot.async = true;
	//_pNxPivot.url = "";
	//_pNxPivot.urlchangeeffect = "";
	_pNxPivot.text = "";
	_pNxPivot.textAlign = "center";
	_pNxPivot.verticalAlign = "middle";


	//_pNxPivot._urlchangeeffect = null;


	_pNxPivot._apply_client_padding = false;
	_pNxPivot._is_simple_control = true;
	_pNxPivot._is_container = true;


	_pNxPivot.accessibilityrole = "form";
	
	_pNxPivot._event_list = {
		"cancreate" : 1,
		"oncreate" : 1,
		"canrender" : 1,
		"onrender" : 1,
		"onerror" : 1,
		"cantoolbarbuttonclick" : 1,
		"ontoolbarbuttonclick" : 1,
		"onclick" : 1, 
		"ondblclick" : 1, 
		"ongridcellclick" : 1, 
		"ongridcelldblclick" : 1, 
		"ongridselectchanged" : 1, 
		"onkillfocus" : 1, 
		"onsetfocus" : 1, 
		"onkeypress" : 1, 
		"onkeydown" : 1, 
		"onkeyup" : 1, 
		"onlbuttondown" : 1, 
		"onlbuttonup" : 1, 
		"onrbuttondown" : 1, 
		"onrbuttonup" : 1, 
		"onmouseenter" : 1, 
		"onmouseleave" : 1, 
		"onmousemove" : 1, 
		"onmousewheel" : 1, 
		"ondrag" : 1, 
		"ondragenter" : 1, 
		"ondragleave" : 1, 
		"ondragmove" : 1, 
		"ondrop" : 1, 
		"onmove" : 1, 
		"onsize" : 1, 
		"oncontextmenu" : 1, 
		"onvscroll" : 1, 
		"onhscroll" : 1, 
		"onmouseup" : 1, 
		"onmousedown" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1
	};	
	
	_pNxPivot._contentsDef = '{"config":{';
	_pNxPivot._contentsDef += '		"fields": [],';
	_pNxPivot._contentsDef += '		"colAxis": [],';
	_pNxPivot._contentsDef += '		"rowAxis": [],';
	_pNxPivot._contentsDef += '		"values": [],';
	_pNxPivot._contentsDef += '		"filters": []';
	_pNxPivot._contentsDef += '	},';
	_pNxPivot._contentsDef += '	"panel":{';
	_pNxPivot._contentsDef += '		"toolbar": {';
	_pNxPivot._contentsDef += '			"size": "28",';
	_pNxPivot._contentsDef += '			"padding": "3 3 3 3",';
	_pNxPivot._contentsDef += '			"gap": "2",';
	_pNxPivot._contentsDef += '			"buttonsize": "20",';
	_pNxPivot._contentsDef += '			"cssclass": "NxPivot_toolbarArea"';
	_pNxPivot._contentsDef += '		},';
	_pNxPivot._contentsDef += '		"items": {';
	_pNxPivot._contentsDef += '			"size": "120",';
	_pNxPivot._contentsDef += '			"cssclass1": "NxPivot_axisArea1",';
	_pNxPivot._contentsDef += '			"cssclass2": "NxPivot_axisArea2",';
	_pNxPivot._contentsDef += '			"padding": "5 5 5 5",';
	_pNxPivot._contentsDef += '			"gap": "5",';
	_pNxPivot._contentsDef += '			"titlebarsize": "15",';
	_pNxPivot._contentsDef += '			"titlebarcssclass": "NxPivot_axisArea_title",';
	_pNxPivot._contentsDef += '			"indicatorwidth": "16",';
	_pNxPivot._contentsDef += '			"indicatorheight": "42",';
	_pNxPivot._contentsDef += '			"indicatorcssclass": "NxPivot_drag_indicator",';
	_pNxPivot._contentsDef += '			"item": {';
	_pNxPivot._contentsDef += '				"width": "150",';
	_pNxPivot._contentsDef += '				"height": "25",';
	_pNxPivot._contentsDef += '				"padding": "6 6 6 6",';
	_pNxPivot._contentsDef += '				"gap": "4",';
	_pNxPivot._contentsDef += '				"cssclass": "NxPivot_axisArea_item",';
	_pNxPivot._contentsDef += '				"sortasccssclass": "NxPivot_axisArea_item_asc",';
	_pNxPivot._contentsDef += '				"sortdesccssclass": "NxPivot_axisArea_item_desc",';
	_pNxPivot._contentsDef += '				"filtercssclass": "NxPivot_axisArea_item_filter",';
	_pNxPivot._contentsDef += '				"aggregatorcssclass": "NxPivot_axisArea_item_aggregator",';
	_pNxPivot._contentsDef += '				"settingcssclass": "NxPivot_axisArea_item_setting",';
	_pNxPivot._contentsDef += '				"sortsize": "16",';
	_pNxPivot._contentsDef += '				"filtersize": "16",';
	_pNxPivot._contentsDef += '				"aggregatorsize": "20",';
	_pNxPivot._contentsDef += '				"buttonsize": "16"';
	_pNxPivot._contentsDef += '			}';
	_pNxPivot._contentsDef += '		}';
	_pNxPivot._contentsDef += '	},';
	_pNxPivot._contentsDef += '	"settingpopup":{';
	_pNxPivot._contentsDef += '		"cssclass": "NxPivot_popup",';
	_pNxPivot._contentsDef += '		"width": "230",';
	_pNxPivot._contentsDef += '		"height": "250",';
	_pNxPivot._contentsDef += '		"padding": "10 10 10 10",';
	_pNxPivot._contentsDef += '		"buttonwidth": "50",';
	_pNxPivot._contentsDef += '		"buttonheight": "25",';
	_pNxPivot._contentsDef += '		"buttonalign": "center",';
	_pNxPivot._contentsDef += '		"okbuttoncssclass": "NxPivot_popup_submit",';
	_pNxPivot._contentsDef += '		"cancelbuttoncssclass": "NxPivot_popup_close",';
	_pNxPivot._contentsDef += '		"labelcssclass": "NxPivot_popup_subtitle",';
	_pNxPivot._contentsDef += '		"dateformat": "yyyy-MM-dd"';
	_pNxPivot._contentsDef += '	}}';
	
	_pNxPivot._applyElementVisible = function (v) {
		this._control_element.setElementDisplay(v ? "" : "none");
	};

	
	_pNxPivot.on_create_contents = function () {
			
		this.call_on_create_contents = true;
		//크롬에서 아래 구문 실행 순서가 Div와 다륾.
		//
		if (!this.url) {
			this.form.createComponent(true);
		}
		
		//trace("this.binddataset="+this.binddataset);
		
		if (this.binddataset && !this._binddataset) {
			var ds = this._findDataset(this.binddataset);
			
			if (ds) {
				this.setBindDataset(ds);
			}
		}
		
		ds = null;
	};


	_pNxPivot.on_created_contents = function (win) {
		
		var form = this.form;

		if (!this.url) {
			form.on_created(win);
		}
		else {
			if (!form._url) {
				form.loadForm(this.url, this.async, true, this._url);
			}
			if (form._is_loaded && !form._is_created) {
				form.createComponent();
			}
		}
		
		this.on_apply_text();
		this._recalcLayout();
		
		form = null;
	};
	
	_pNxPivot.updateToDataset = function () {
		if(this.pivot) this.pivot.updateToDataset();
	};
	
	_pNxPivot.onloadPivot = function() {
		try{
			if(NxPivotUtil.isEmpty(this.configurationdata)) {
				this.configurationdata = JSON.parse(this._contentsDef);
			}
			
			var configurationData = {};

			this.on_fire_cancreate(this);

			configurationData = this.configurationdata;
			
			var pThis = this;
			var config = configurationData.config;
			
			this.convertStringToFunction(config);
			
			var binddataset = "";
			
			if(!NxPivotUtil.isEmpty(this.binddataset)) {
				binddataset = this._binddataset;
			}
		
			config.dataSource = binddataset;
			config.targetView = pThis;
			config.colTotalPosition = pThis.coltotalposition;
			config.rowTotalPosition = pThis.rowtotalposition;
			config.casesensitive = pThis.casesensitive;
			config.roundfractiondigit = pThis.roundfractiondigit;
			config.totalText = pThis.totaltext;
			config.grandTotalText = pThis.grandtotaltext;
			config.allMemberName = "(All)";
			config.colGrandtotalPosition = pThis.colgrandtotalposition;
			config.rowGrandtotalPosition = pThis.rowgrandtotalposition;
			config.gridheadheight = pThis.gridheadheight;
			config.gridbodyheight = pThis.gridbodyheight;
			config.gridsummheight = pThis.gridsummheight;
			
			if(!this.pivot) {
				this.pivot = new nexacro.NxPivot.Pivot(this.parent, configurationData);
				this.on_fire_oncreate(this);
			}
		}finally{
			configurationData = null;
			pThis = null;
			config = null;
			binddataset = null;
		}
	};
	
    _pNxPivot.render = function () {
		var rtn = this.on_fire_canrender(this);
		
		if(rtn){
			var rtn2 = this.pivot.view.panel._setUpdateExcute();

			if(!rtn2) rtn = this.pivot.render();				
		}
	};	
	
	_pNxPivot.setLoadingbar = function(objFunc, bChkRender){
		
		if(NxPivotUtil.isEmpty(this.loadingimage)==true){
			this.form.setWaitCursor(true);
			this.fnTest = objFunc;
			nexacro._OnceCallbackTimer.callonce(this, function () {	this.pivot[this.fnTest](bChkRender); this.form.setWaitCursor(false);},30);
		}else
		{
			this.pivot.view.createLoadingbar(this.form, this.loadingimage);
			this.form.loadingbar.bringToFront();
			this.form.loadingbar.set_visible(true);
			this.fnTest = objFunc;
			nexacro._OnceCallbackTimer.callonce(this, function () {	this.pivot[this.fnTest](bChkRender); this.form.loadingbar.set_visible(false);},30);
		}
	}
	
	_pNxPivot.convertStringToFunction = function(config){
		this.convertStringToFunctionItems(config.fields);
		this.convertStringToFunctionItems(config.colAxis);
		this.convertStringToFunctionItems(config.rowAxis);
		this.convertStringToFunctionItems(config.values);
		this.convertStringToArrayItems(config.filters);
	}
	
	_pNxPivot.convertStringToFunctionItems = function(items){
		try{
			var i;
			var aggregator;
			
			for(i=0;i<items.length;i++)
			{
				aggregator = items[i].aggregator;
				if(typeof aggregator==="object")aggregator.func = eval("("+NxPivotUtil.decodeString(aggregator.func)+")");
			}
			
			return items;
		}finally{
			i = null;
			aggregator = null;
		}
	};
	
	_pNxPivot.convertFunctionToStringItems = function(items){
		try{
			var i;
			var aggregator;
			
			for(i=0;i<items.length;i++)
			{
				aggregator = items[i].aggregator;
				if(typeof aggregator==="object")
				{
					aggregator.func = aggregator.func.toString();
				}
			}
			
			return items;
		}finally{
			i = null;
			aggregator = null;			
		}
	};
	
	_pNxPivot.convertStringToArrayItems = function(items){
		var i;
		var j;
		var values;
		var arrValues = [];
		
		for(i=0;i<items.length;i++){
			
			if(items[i].values)values = items[i].values.toString().split(",");
			else values = [];
			
			items[i].values = values;
		}
		
		i = null;
		j = null;
		values = null;
		arrValues = null;
	};
	
	_pNxPivot.redraw = function(){
		this.pivot.view.panel._redrawPanelByPivotProp();
	};
	
	_pNxPivot.enableToolbarButtons = function(arr, v){
		this.pivot.view.panel._enableToolbarButtons(arr, v);
	};
	
	_pNxPivot.getPivotGrid = function(){
		return this.pivot.view.targetGrid;
	};
	
	_pNxPivot.setConfig = function(config, changeOrg){

		var configData = null;
		
		if(this.pivot){
			configData = this.pivot;
		}else{
			configData = this.configurationdata;
		}

		if(typeof config === "object")
		{
			configData.config.colAxis = NxPivotUtil.clone(config.colAxis, true)|| [];
			configData.config.rowAxis = NxPivotUtil.clone(config.rowAxis, true)|| [];
			configData.config.values  = NxPivotUtil.clone(config.values, true)|| [];	
			configData.config.fields  = NxPivotUtil.clone(config.fields, true)|| [];
			configData.config.filters = NxPivotUtil.clone(config.filters, true)|| [];
		}
		else if(typeof config === "string")
		{
			var configJson = JSON.parse(config);
			configData.config.colAxis = this.convertStringToFunctionItems(NxPivotUtil.clone(configJson.colAxis, true))|| [];
			configData.config.rowAxis = this.convertStringToFunctionItems(NxPivotUtil.clone(configJson.rowAxis, true))|| [];
			configData.config.values  = this.convertStringToFunctionItems(NxPivotUtil.clone(configJson.values, true))|| [];	
			configData.config.fields  = this.convertStringToFunctionItems(NxPivotUtil.clone(configJson.fields, true))|| [];
			configData.config.filters = NxPivotUtil.clone(configJson.filters, true)|| [];
		}

		if(this.pivot){
			configData.config.initData();
			
			if(changeOrg!=false)
			{
				configData._orgConfig.config.colAxis = NxPivotUtil.clone(configData.config.colAxis, true);
				configData._orgConfig.config.rowAxis = NxPivotUtil.clone(configData.config.rowAxis, true);
				configData._orgConfig.config.values = NxPivotUtil.clone(configData.config.values, true);
				configData._orgConfig.config.fields = NxPivotUtil.clone(configData.config.fields, true);
				configData._orgConfig.config.filters = NxPivotUtil.clone(configData.config.filters, true);
				
				var dataSource = configData.config.dataSource;
				configData._orgConfig.config.dataSource = dataSource;

				dataSource = null;
			}
		}

		configData = null;

	};
	
	_pNxPivot.getConfig = function(){
		try{
			var orgConfig = null;
			
			var config = {};
			
			if(this.pivot){
				orgConfig = this.pivot.config;
			}else{
				orgConfig = this.configurationdata.config;
			}
			
			config.colAxis = NxPivotUtil.clone(orgConfig.colAxis, true);
			config.rowAxis = NxPivotUtil.clone(orgConfig.rowAxis, true);
			config.values  = NxPivotUtil.clone(orgConfig.values, true);	
			config.fields  = NxPivotUtil.clone(orgConfig.fields, true);
			config.filters = NxPivotUtil.clone(orgConfig.filters, true);
			
			config.colAxis = this.convertFunctionToStringItems(config.colAxis);
			config.rowAxis = this.convertFunctionToStringItems(config.rowAxis);
			config.values = this.convertFunctionToStringItems(config.values);
			config.fields = this.convertFunctionToStringItems(config.fields);
			
			return JSON.stringify(config, null, "\t");
		}finally{ 
			orgConfig = null;		
			config = null;
		}
	};
	
	_pNxPivot.setPanel = function(panel, changeOrg){
		var config = {};
		
		if(this.pivot){
			config = this.pivot.config;		
		}else{
			config = this.configurationdata;	
		}
		
		if(typeof panel === "object")
		{
			config.panel = this.setPanelConfig(NxPivotUtil.clone(panel, true));
		}
		else if(typeof panel === "string")
		{
			var panelJson = JSON.parse(panel);
			config.panel = this.setPanelConfig(NxPivotUtil.clone(panelJson, true));
		}
		
		if(this.pivot){
			if(changeOrg!=false)
			{
				this.pivot._orgConfig.panel = NxPivotUtil.clone(config.panel, true);
			}
		}

		config = null;
	};
	
	_pNxPivot.getPanel = function(){
		try{
			var panel = {};
			
			if(this.pivot){
				panel = this.pivot.config.panel;		
			}else{
				panel = this.configurationdata.panel;	
			}
			
			return JSON.stringify(panel, null, "\t");
		}finally{
			panel = null;
		}
	};
	
	_pNxPivot.setSettingPopup = function(settingpopup, changeOrg){
		var config = {};
		
		if(this.pivot){
			config = this.pivot.config;
		}else{
			config = this.configurationdata;
		}
		
		if(typeof settingpopup === "object")
		{
			config.settingpopup = this.setPanelConfig(NxPivotUtil.clone(settingpopup, true));
		}
		else if(typeof settingpopup === "string")
		{
			var settingpopupJson = JSON.parse(settingpopup);
			config.settingpopup = this.setPanelConfig(NxPivotUtil.clone(settingpopupJson, true));
		}
		
		if(this.pivot){
			if(changeOrg!=false)
			{
				this.pivot._orgConfig.settingpopup = NxPivotUtil.clone(config.settingpopup, true);
			}
		}
		
		config = null;

	};
	
	_pNxPivot.getSettingPopup = function(){
		try{
			var settingpopup = {};
			
			if(this.pivot){
				settingpopup = this.pivot.config.settingpopup;
			}else{
				settingpopup = this.configurationdata.settingpopup;
			}
			
			return JSON.stringify(settingpopup, null, "\t");
		}finally{
			settingpopup = null;
		}
	};
	
	_pNxPivot.getSelectedPivotData = function(nRowIdx, nCellIdx, arrValues, sType){
		try{
			var GridView = this.pivot.view.gridView;
			
			return GridView.getSelectedPivotData(nRowIdx, nCellIdx, arrValues, sType);
		}finally{
			GridView = null;
		}
	};
	
	_pNxPivot.getSelectedPivotDetailData = function(nRowIdx, nCellIdx){
		try{
			var GridView = this.pivot.view.gridView;
			
			return GridView.makeDetailDatasetXML(nRowIdx, nCellIdx);
		}finally{
			GridView = null;
		}
	};
	
	_pNxPivot.set_coltotalposition = function(v) {		
		try{
			var coltotalposition_enum = ["none", "first", "last"];
			
			if (coltotalposition_enum.indexOf(v) == -1)
			{
				return;
			}
			
			if (this.coltotalposition != v)
			{
				this.coltotalposition = v;
			}
			
			if(this.pivot) {
				this.pivot.config.colTotalPosition = v;
			}
		}finally{
			coltotalposition_enum = null;
		}
	};
	
	_pNxPivot.set_rowtotalposition = function(v) {
		
		if(NxPivotUtil.isEmpty(v)) {
			return;
		}
		
		this.rowtotalposition = v;
		
		if(this.pivot) {
			this.pivot.config.rowTotalPosition = v;
		}
	};	
	
	_pNxPivot.set_colgrandtotalposition = function(v) {
		
		if(NxPivotUtil.isEmpty(v)) {
			return;
		}
		
		this.colgrandtotalposition = v;
		
		if(this.pivot) {
			this.pivot.config.colGrandtotalPosition = v;
			if(this.pivot.config.colGrandtotalPosition != "none" || this.pivot.config.rowGrandtotalPosition != "none") {
				this.pivot.config.showGrandTotal = true; //총계 표시
			}
	}
	};
	
	_pNxPivot.set_rowgrandtotalposition = function(v) {
		
		this.call_set_rowgrandtotalposition = true;
		if(NxPivotUtil.isEmpty(v)) {
			return;
		}
		
		this.rowgrandtotalposition = v;
		
		if(this.pivot) {
			this.pivot.config.rowGrandtotalPosition = v;
			if(this.pivot.config.colGrandtotalPosition != "none" || this.pivot.config.rowGrandtotalPosition != "none") {
				this.pivot.config.showGrandTotal = true; //총계 표시
			}
		}
	};		
	
	_pNxPivot.set_roundfractiondigit = function(v) {
				
		if(NxPivotUtil.isEmpty(v)) {
			v = 2;
		}
		
		this.roundfractiondigit = Number(v);
		
		if(this.pivot) {
			this.pivot.config.roundfractiondigit = v;
		}
	};	
	
	_pNxPivot.set_casesensitive = function(v) {
		
		if(NxPivotUtil.isEmpty(v)) {
			return;
		}
		
		v = nexacro._toBoolean(v);
		
		this.casesensitive = v;
		
		if(this.pivot) {
			this.pivot.config.casesensitive = v;
		}
	};		
	
	
	_pNxPivot.set_totaltext = function(v) {
		if(NxPivotUtil.isEmpty(v)) {
			return;
		}
		
		this.totaltext = v;
		
		if(this.pivot) {
			this.pivot.config.totalText = v;
		}
	};	
	
	
	_pNxPivot.set_grandtotaltext = function(v) {
		
		if(NxPivotUtil.isEmpty(v)) {
			return;
		}
		
		this.grandtotaltext = v;
		
		if(this.pivot) {
			this.pivot.config.grandTotalText = v;
		}
	};		
	
	_pNxPivot.set_usetoolbar = function(v) {
		
		if(NxPivotUtil.isEmpty(v)) {
			return;
		}
		
		v = nexacro._toBoolean(v);
		
		if(this.usetoolbar!=v)
		{
			this.usetoolbar = v;
			
			if(this.pivot)this.pivot.view.panel._set_usetoolbar(v);
		}
	};		
	
	_pNxPivot.set_useitems = function(v) {
		
		if(NxPivotUtil.isEmpty(v)) {
			return;
		}
		
		v = nexacro._toBoolean(v);
		
		if(this.useitems!=v)
		{
			this.useitems = v;
			if(this.pivot)this.pivot.view.panel._set_useitems(v);
		}
	};	
	
	_pNxPivot.set_loadingimage = function(v) {	
		
		this.loadingimage = v;
	};	
	
	_pNxPivot.set_gridheadheight = function(v) {
				
		if(NxPivotUtil.isEmpty(v)) {
			v = 20;
		}
		
		this.gridheadheight = Number(v);
		
		if(this.pivot) {
			this.pivot.config.grid.headHeight = v;
		}
	};	
	
	_pNxPivot.set_gridbodyheight = function(v) {
				
		if(NxPivotUtil.isEmpty(v)) {
			v = 20;
		}
		
		this.gridbodyheight = Number(v);
		
		if(this.pivot) {
			this.pivot.config.grid.bodyHeight = v;
		}
	};	
	
	_pNxPivot.set_gridsummheight = function(v) {
				
		if(NxPivotUtil.isEmpty(v)) {
			v = 20;
		}
		
		this.gridsummheight = Number(v);
		
		if(this.pivot) {
			this.pivot.config.grid.summHeight = v;
		}
	};	
	
	// [START] binddataset 관련 ---------------------------------------
	_pNxPivot.setBindDataset = function (obj) {		
		
		if (obj instanceof nexacro.Dataset) {
			if (this._binddataset) {
				this._removeDSEventHandlers(this._binddataset);
			}

			if (!obj) {
				this._binddataset = null;
				this.binddataset = "";
			}
			else {
				this._binddataset = obj;
				this.binddataset = obj.id;
			}
			this.on_apply_prop_binddataset();
		}		
		
	};
		
	_pNxPivot.getBindDataset = function () {
		return this._binddataset;
	};
	
	_pNxPivot.set_binddataset = function (str) {
		
		
		if (str && typeof str != "string") {
			this.setBindDataset(str);
			
			if(this.pivot){
				this.pivot.config.dataSource = this._binddataset;
				this.updateToDataset();
			}
			
			return;
		}
		if (str != this.binddataset || this.binddataset && !this._binddataset) {
			if (this._binddataset) {
				this._removeDSEventHandlers(this._binddataset);
			}

			if (!str) {
				this._binddataset = null;
				this.binddataset = "";
			}
			else {
				str = str.replace("@", "");
				this._binddataset = this._findDataset(str);
				this.binddataset = str;
				
			}
			
			this.on_apply_prop_binddataset();
		}
		
		if(this.pivot){
			this.pivot.config.dataSource = this._binddataset;
			this.updateToDataset();
		}
		
		return this.binddataset;
	};
	
	_pNxPivot._setDSEventHandlers = function (ds) {
		/*
		ds._setEventHandler("onload", this.on_dsnotify_onload, this);
		ds._setEventHandler("onrowposchanged", this.on_dsnotify_onrowposchanged, this);
		ds._setEventHandler("oncolumnchanged", this.on_dsnotify_oncolumnchanged, this);
		ds._setEventHandler("onrowsetchanged", this.on_dsnotify_onrowsetchanged, this);
		*/
	};

	_pNxPivot._removeDSEventHandlers = function (ds) {
		/*
		ds._removeEventHandler("onload", this.on_dsnotify_onload, this);
		ds._removeEventHandler("onrowposchanged", this.on_dsnotify_onrowposchanged, this);
		ds._removeEventHandler("oncolumnchanged", this.on_dsnotify_oncolumnchanged, this);
		ds._removeEventHandler("onrowsetchanged", this.on_dsnotify_onrowsetchanged, this);
		*/
	};	
	
	_pNxPivot.on_apply_prop_binddataset = function () {
		
		/*
		var dsobj = this._binddataset;
		if (dsobj) {
			this.binddataset = dsobj.id;
			this.rowcount = this._rowcount = dsobj.rowcount;
			this._rowposition = dsobj.rowposition;

			this._exprcache = {
			};
			this._initTreeStates();
			this._recreate_contents_all(true, true);
			this._initSelect(this._rowposition);
			this._setDSEventHandlers(dsobj);
		}
		else {
			this.rowcount = this._rowcount = 0;
			this._rowposition = -1;
			this._exprcache = {
			};
			this._initTreeStates();
			this._recreate_contents_all(true, true);
			this._initSelect(this._rowposition);
		}
		*/
	};	
	
	// [END] binddataset 관련 ---------------------------------------
	
	_pNxPivot.on_destroy_contents = function () {

		this._binddataset = null;
		this.binddataset = "";

		this._user_property_list = null; 

		if(this.pivot){
			this.pivot.config.dataSource = null;
			this.pivot._orgConfig.config.dataSource = null;

			this.pivot.view.panel.aggDsDatasource = null;
			this.pivot.view.panel.filterCodeDatasource = null;
			this.pivot.view.panel.settingPopInfo.filterDataSource = null;			
			
			this.pivot.cube._distinctValuesOfId = [];
			this.pivot.cube._distinctValuesOfId = null;
			this.pivot.cube.valueIdList = [];
			this.pivot.cube.valueIdList = null;
			this.pivot.cube.valuesAggregatorMap = {};
			this.pivot.cube.valuesAggregatorMap = null;
			this.pivot.cube.colAxisDisplayMembers = null;
			this.pivot.cube.rowAxisDisplayMembers = null;
			this.pivot.cube.colAxisFields = [];
			this.pivot.cube.colAxisFields = null;
			this.pivot.cube.rowAxisFields = [];
			this.pivot.cube.rowAxisFields = null;
			this.pivot.cube.cubeNodePool = [];
			this.pivot.cube.cubeNodePool = null;

			this.pivot.cube.releaseCubeNode();
			this.pivot.cube.pathToNodeMap = {};

			this.pivot.cube.pivotDataSource = null;
			this.pivot.cube.sortDataSource = null;
			this.pivot.cube.filterDataSource = null;

			//view
			this.pivot.view.parent = null;
			this.pivot.view.targetView = null;
			this.pivot.view.panelType = null;
			this.pivot.view.panelTop = null;
			
			//panel
			this.pivot.view.panel.parent = null;
			this.pivot.view.panel.pivot = null;
			this.pivot.view.panel.targetView = null;
			this.pivot.view.panel.targetPanel = null;
			this.pivot.view.panel.targetToolbar = null;
			this.pivot.view.panel.aggDsDatasource = null;
			this.pivot.view.panel.filterCodeDatasource  = null;			
			this.pivot.view.panel.panelStyle = null;
			this.pivot.view.panel.settingPopStyle = null;			
			this.pivot.view.panel.commToolbarStyle = null;
			this.pivot.view.panel.commSettingPopup = null;
			this.pivot.view.panel.language = null;			
			this.pivot.view.panel.panelType = null;
			this.pivot.view.panel.panelLimitWidth = null;			
			this.pivot.view.panel.usetoolbar = null;
			this.pivot.view.panel.commCodeToolbar = null;
			this.pivot.view.panel.toolbarButtonType = null;									
			this.pivot.view.panel.commButtonsInfo = null;
			this.pivot.view.panel.toolbarAreaInfo = null;			
			this.pivot.view.panel.useitems = null;
			this.pivot.view.panel.commCodeAxis = null;
			this.pivot.view.panel.axisAreaInfo = null;
			this.pivot.view.panel.axisAreaScrollbarWidth = null;
			this.pivot.view.panel.pivotGridGap = null;			
			this.pivot.view.panel.fieldAxisAreaRect = null;
			this.pivot.view.panel.colAxisAreaRect = null;
			this.pivot.view.panel.rowAxisAreaRect = null;
			this.pivot.view.panel.valuesAxisAreaRect = null;			
			this.pivot.view.panel.itemInfo = null;			
			this.pivot.view.panel.fieldsItems = null;
			this.pivot.view.panel.colAxisItems = null;
			this.pivot.view.panel.rowAxisItems = null;
			this.pivot.view.panel.valuesItems = null;			
			this.pivot.view.panel.ondrag = null;
			this.pivot.view.panel.itemDragFunc = null;
			this.pivot.view.panel.dragItem = null;
			this.pivot.view.panel.indicator = null;
			this.pivot.view.panel.setPopupListComp = null;
			this.pivot.view.panel.settingPop = null;
			this.pivot.view.panel.settingPopInfo.data = null;
			this.pivot.view.panel.settingPopInfo.oriFilterDataSource = null;
			this.pivot.view.panel.settingPopInfo.filterDataSource = null;
			this.pivot.view.panel.settingPopInfo.filter = null;			
			this.pivot.view.panel.settingPopCalendarInfo = null;			
			this.pivot.view.panel.settingPopComp = null;			
			this.pivot.view.panel.popGridFormat1 = null;			
			this.pivot.view.panel.popGridFormat2 = null;							
			this.pivot.view.panel.popGridFormat3 = null;
			this.pivot.view.panel.rowtotalposition = null;
			this.pivot.view.panel.coltotalposition = null;			
			this.pivot.view.panel.autoexcute = null;			
			this.pivot.view.panel.isAggUpdate = null;
			this.pivot.view.panel.isSortUpdate = null;
			this.pivot.view.panel.isFilterUpdate = null;
			
			//config
			this.pivot.config.parent = null;
			this.pivot.config.colAxis = null;
			this.pivot.config.rowAxis = null;
			this.pivot.config.values  = null;
			this.pivot.config.fields  = null;
			this.pivot.config.filters = null;			
			this.pivot.config.customAggregator = null;			
			this.pivot.config.defaultItemWidth = null;
			this.pivot.config.defaultAggregator = null;
			this.pivot.config.defaultCaseSensitive = null;
			this.pivot.config.defaultFieldType = null;
			this.pivot.config.defaultSort = null;			
			this.pivot.config.casesensitive = null;
			this.pivot.config.roundfractiondigit = null;			
			this.pivot.config.allMemberName = null;
			this.pivot.config.allMemberDisplayWithOwnName = null;			
			this.pivot.config.colTotalPosition = null;
			this.pivot.config.rowTotalPosition = null;			
			this.pivot.config.colGrandtotalPosition = null;
			this.pivot.config.rowGrandtotalPosition = null;
			this.pivot.config.showGrandTotal = null;
			this.pivot.config.totalText = null;
			this.pivot.config.grandTotalText = null;
			this.pivot.config.emptyDataText = null;			
			this.pivot.config.targetView = null;			
			this.pivot.config.grid = null;			
			this.pivot.config.commtoolbars = null;			
			this.pivot.config.commsettingpopup = null;			
			this.pivot.config.panel = null;
			
			this.pivot.config.settingpopup = null;
			
			//pivot
			this.pivot.scope = null;
			this.pivot.message = null;
			this.pivot.config = null;
			this.pivot._orgConfig = null;
			this.pivot.filterStr = null;
			this.pivot.cube = null;
			this.pivot.view = null;
			this.pivot = null;
		}
		
		this._destroyTextElement();
		this._destroyFormControl();
	};

	_pNxPivot.on_create_contents_command = function () {
		try{
			var str = "";
			return str;
		}finally{
			str = null;
		}
	};

	_pNxPivot.on_attach_contents_handle = function (win) {
		var form = this.form;

		if (!this.url) {
			form.on_created(win);
		}
		else {
			if (this.url && form._is_loaded && !form._is_created) {
				form.createComponent();
			}
		}

		this.on_apply_text();
		this._recalcLayout();
		
		form = null;
	};

	_pNxPivot.on_change_containerRect = function (width, height) {
		if (this._cell_elem) {
			this._cell_elem.setElementSize(width, height);
		}

		this._recalcLayout();
	};

	_pNxPivot.on_change_containerPos = function () {
	};

	_pNxPivot.on_apply_prop_enable = function (v) {
		if (this.form) {
			this.form._setEnable(v);
		}
	};

	_pNxPivot.on_get_css_assumedtypename = function () {
		return this._type_name;
	};

	_pNxPivot.on_apply_text = function (text) {
		try{
			var form = this.form;
			
			if (form && ((form._child_list && form._child_list.length > 0) || this.url) || !this._is_alive) {
				return;
			}

			var control_elem = form.getElement();
			
			if (control_elem) {
				if (!text) {
					text = this._displaytext;
				}

				var cell_elem = this._cell_elem;
				if (!cell_elem && text) {
					var win = this._getWindow();
					cell_elem = this._cell_elem = new nexacro.TextBoxElement(control_elem);
					cell_elem.create(win);
				}

				if (cell_elem) {
					cell_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
					cell_elem.setElementVerticalAlign(this.verticalAlign);
					cell_elem.setElementTextAlign(this.textAlign);
					cell_elem.setElementText(text);
				}
			}
		}finally{
			form = null;
		}
	};
	
	//_pNxPivot.set_url = function (v) {};

	//_pNxPivot.on_apply_url = function (reload) {};

	//_pNxPivot.set_urlchangeeffect = function (v) {};

	_pNxPivot.set_async = function (v) {
		v = nexacro._toBoolean(v);
		if (this.async != v) {
			this.async = v;
			if (this.form) {
				this.form._async = v;
			}
		}
	};

	_pNxPivot.set_padding = nexacro._emptyFn;

	_pNxPivot.reload = function () {
		//this.on_apply_url(true);
	};

	_pNxPivot.getFocus = function () {
		return this.parent ? this.parent.getFocus() : null;
	};

	_pNxPivot.getParentContext = function () {
		return this.parent;
	};

	_pNxPivot.getSetter = function (name, fnname) {
		if (!this._user_property_list) {
			this._user_property_list = [];
		}
		this._user_property_list[name] = 1;
		if (!fnname) {
			fnname = "set_" + name;
		}
		var fn = this[fnname];
		if (fn) {
			return new nexacro.SetterBinder(this, name, fn);
		}
		return new nexacro.PropBinder(this, name);
	};

	_pNxPivot.getOwnerFrame = function () {
		return this._getOwnerFrame();
	};

	_pNxPivot.addChild = function (id, obj) {
		try{
			var form = this.form;
			var ret = form.addChild(id, obj);

			return ret;
		}finally{
			form = null;
			ret = null;
		}
	};

	_pNxPivot.insertChild = function (idx, id, obj) {
		try{
			var form = this.form;
			var ret = form.insertChild(idx, id, obj);

			return ret;
		}finally{
			form = null;
			ret = null;
		}
	};

	_pNxPivot.removeChild = function (id) {
		try{
			var obj = null;
			if (!this._is_alive && id === "form") {
				obj = this.form;
				if (obj) {
					var is_focused = false;
					var _window = this._getWindow();
					if (_window) {
						is_focused = (_window._indexOfCurrentFocusPaths(obj) > -1);
					}

					if (obj._control_element) {
						if (obj._control_element) {
							obj._control_element._removeFromContainer();
						}

						if (is_focused) {
							if (obj instanceof nexacro.Form) {
								obj._on_deactivate();
							}

							_window._removeFromCurrentFocusPath(obj, true);
						}
					}
				}

				obj.parent = null;
				delete this[id];
			}
			else {
				var form = this.form;
				obj = form.removeChild(id);
			}

			return obj;
		}finally{
			obj = null;
			form = null;
		}
	};

	_pNxPivot.addLayout = function (name, obj) {
		try{
			var form = this.form;
			if (form) {
				form.addLayout(name, obj);
			}
		}finally{
			form = null;
		}
	};

	_pNxPivot._on_activate = function () {
		nexacro.Component.prototype._on_activate.call(this);

		if (this.form) {
			this.form._on_activate();
		}

		return true;
	};

	_pNxPivot._on_deactivate = function () {
		nexacro.Component.prototype._on_deactivate.call(this);

		if (this.form) {
			this.form._on_deactivate();
		}

		return true;
	};

	_pNxPivot._on_bubble_beforeclose = function (root_closing_comp, event_bubbles, fire_comp, refer_comp) {
		return this.parent._on_bubble_beforeclose(root_closing_comp, event_bubbles, fire_comp, refer_comp);
	};

	_pNxPivot._on_bubble_close = function (event_bubbles, fire_comp, refer_comp) {
		return this.parent._on_bubble_close(event_bubbles, fire_comp, refer_comp);
	};

	_pNxPivot._clearUserFunctions = nexacro._emptyFn;

	_pNxPivot._loadedForm = nexacro._emptyFn;

	_pNxPivot._destroyTextElement = function () {
		if (this._cell_elem) {
			this._cell_elem.destroy();
			this._cell_elem = null;
		}
	};

	_pNxPivot._destroyFormControl = function () {
		if (this.form) {
			this.form._destroy();
			this.form = null;
		}
	};

	_pNxPivot._loadInclude = function (mainurl, url) {
		var asyncmode = this.async;
		if (!this._is_created) {
			if (!this.parent || !this.parent._is_created) {
				asyncmode = true;
			}
		}

		this._loadIncludeJS.call(this, mainurl, url, asyncmode);
		
		asyncmode = null;
	};

	_pNxPivot._loadIncludeJS = function (mainurl, url, asyncmode) {
		var service = nexacro._getServiceObject(url);
		this._load_manager.loadIncludeModule(url, null, asyncmode, service);
		
		service = null;
	};

	_pNxPivot._closeForm = function () {
		this._destroyFormControl();
	};

	_pNxPivot._recalcLayout = function () {
		var form = this.form;
		if (form) {
			var pos = this._getFormPosition();

			form._setPos(pos.left, pos.top);
			form._setSize(pos.width, pos.height);
		}
		
		form = null;
	};

	_pNxPivot._on_orientationchange = function (orientation) {
		if (this.form) {
			this.form._on_orientationchange(orientation);
		}
	};

	_pNxPivot._setContents = function (str) {	
		
		this.configurationdata = str;
		
		return true;
	};

	_pNxPivot._getFormPosition = function () {
		var left = 0;
		var top = 0;
		var width = 0;
		var height = 0;

		width = this._getClientWidth();
		height = this._getClientHeight();

		if (!this._is_initcssselector) {
			this._initCSSSelector();
		}

		var border = this._getCurrentStyleBorder();
		var border_l = 0, border_t = 0, border_r = 0, border_b = 0;

		if (border) {
			if (border.left) {
				border_l = border.left._width;
			}
			if (border.top) {
				border_t = border.top._width;
			}
			if (border.right) {
				border_r = border.right._width;
			}
			if (border.bottom) {
				border_b = border.bottom._width;
			}
		}

		left = 0;
		top = 0;

		return {
			left : left, 
			top : top, 
			width : width, 
			height : height
		};
	};

	_pNxPivot._getComponentsByTaborder = function () {
		if (!this.form._isEnable() || !this.form._child_list || this.form._child_list.length == 0) {
			return null;
		}

		return [this.form];
	};

	_pNxPivot._searchNextTabFocus = function (current, bSearchFromFirst, opt_force_cycle, filter_type) {
		var ret = nexacro.FormBase.prototype._searchNextTabFocus.call(this, current, bSearchFromFirst, opt_force_cycle, filter_type);

		if (bSearchFromFirst && ret && ret[0] === this.form) {
			return this.parent._searchNextTabFocus(this, undefined, undefined, filter_type);
		}

		return ret;
	};

	_pNxPivot._searchPrevTabFocus = function (current, bSearchFromLast, opt_force_cycle, filter_type) {
		var ret = nexacro.FormBase.prototype._searchPrevTabFocus.call(this, current, bSearchFromLast, opt_force_cycle, filter_type);

		if (bSearchFromLast && ret && ret[0] === this.form) {
			return [this];
		}

		return ret;
	};

	_pNxPivot._getTabOrderNext = function (current, direction, filter_type) {
		return nexacro.FormBase.prototype._getTabOrderNext.call(this, current, direction, filter_type);
	};

	_pNxPivot._getTabOrderFirst = function (filter_type) {
		return nexacro.FormBase.prototype._getTabOrderFirst.call(this, filter_type);
	};

	_pNxPivot._getTabOrderLast = function (filter_type) {
		return nexacro.FormBase.prototype._getTabOrderLast.call(this, filter_type);
	};
	
	_pNxPivot.on_fire_cancreate = function(obj){
		try{
			if (this.cancreate && this.cancreate._has_handlers) {
				var evt = new nexacro.EventInfo(obj, "cancreate");

				this._is_canchange = this.cancreate._fireCheckEvent(this, evt);
				return this._is_canchange;
			}
			
			return true;
		}finally{
			evt = null;
		}
	};
	
	_pNxPivot.on_fire_oncreate = function(obj){
		try{
			if (this.oncreate && this.oncreate._has_handlers) {
				var evt = new nexacro.EventInfo(obj, "oncreate");
				this.oncreate._fireEvent(this, evt);
			}
		}finally{
			evt = null;
		}
	};
	
	_pNxPivot.on_fire_canrender = function(obj){
		try{
			if (this.canrender && this.canrender._has_handlers) {
				var evt = new nexacro.EventInfo(obj, "canrender");

				this._is_canchange = this.canrender._fireCheckEvent(this, evt);
				return this._is_canchange;
			}

			return true;
		}finally{
			evt = null;
		}
	};
	
	_pNxPivot.on_fire_onrender = function(obj){
		try{
			if (this.onrender && this.onrender._has_handlers) {
				var evt = new nexacro.EventInfo(obj, "onrender");
				this.onrender._fireEvent(this, evt);
			}
		}finally{
			evt = null;
		}
	};
	
	_pNxPivot.on_fire_onerror = function(obj, errortype, errormsg, statuscode){
		try{
			if (this.onerror && this.onerror._has_handlers) {
				var evt = new nexacro.ErrorEventInfo(obj, "onerror", errortype, errormsg, obj, statuscode, "requesturi", "locationuri");
				this.onerror._fireEvent(this, evt);
			}
		}finally{
			evt = null;
		}
	};
	
	_pNxPivot.on_fire_cantoolbarbuttonclick = function(obj, id, postvalue, prevalue){
		try{
			if (this.cantoolbarbuttonclick && this.cantoolbarbuttonclick._has_handlers) {
				var evt = new nexacro.ToolbarButtonClickEventInfo(obj, id, postvalue, prevalue);

				this._is_canchange = this.cantoolbarbuttonclick._fireCheckEvent(this, evt);
				return this._is_canchange;
			}
			return true;
		}finally{
			evt = null;
		}
	};
	
	_pNxPivot.on_fire_ontoolbarbuttonclick = function(obj, id, postvalue, prevalue){
		try{
			if (this.ontoolbarbuttonclick && this.ontoolbarbuttonclick._has_handlers) {
				var evt = new nexacro.ToolbarButtonClickEventInfo(obj, id, postvalue, prevalue);
				this.ontoolbarbuttonclick._fireEvent(this, evt);
			}
		}finally{
			evt = null;
		}
	};
	
	_pNxPivot.on_fire_onsize = function (width, height) {
		try{
			if(this.pivot && this.pivot.view.panel && this.pivot.view.panel._evtPivotOnsize){
				var evt = new nexacro.SizeEventInfo(this, "onsize", width, height);
				this.pivot.view.panel._evtPivotOnsize(this, evt);
			}
			
			if (this.onsize && this.onsize._has_handlers) {
				var evt = new nexacro.SizeEventInfo(this, "onsize", width, height);
				return this.onsize._fireEvent(this, evt);
			}
			return false;
		}finally{
			evt = null;
		}
	};
	
	_pNxPivot.on_fire_ongridcellclick = function(obj, evt){
		if (this.ongridcellclick && this.ongridcellclick._has_handlers) {
            return this.ongridcellclick._fireEvent(obj, evt);
		}
		return true;
	};
	
	_pNxPivot.on_fire_ongridcelldblclick = function(obj, evt){
		if (this.ongridcelldblclick && this.ongridcelldblclick._has_handlers) {
            return this.ongridcelldblclick._fireEvent(obj, evt);
		}
		return true;
	};
	
	_pNxPivot.on_fire_ongridselectchanged = function(obj, evt){
		if (this.ongridselectchanged && this.ongridselectchanged._has_handlers) {
            return this.ongridselectchanged._fireEvent(obj, evt);
		}
		return true;
	};
	
	_pNxPivot.setPanelConfig = function(panelConfig){
		try{
			var panel;
			var configurationData = JSON.parse(this._contentsDef);
			var panelDef = configurationData.panel;
							
			panel = NxPivotUtil.setMergeJson(panelDef, panelConfig);
		
			return panel;
		}finally{
			panel = null;
			configurationData = null;
			panelDef = null;
		}
	};
	
	_pNxPivot.setSettingPopupConfig = function(settingPopupConfig){
		try{
			var settingPopup;
			var configurationData = JSON.parse(this._contentsDef);
			var settingpopupDef = configurationData.settingpopup;
				
			settingPopup = NxPivotUtil.setMergeJson(settingpopupDef, settingPopupConfig);

			return settingPopup;
		}finally{
			settingPopup = null;
			configurationData = null;
			settingpopupDef = null;
		}		
	};
	
	/**
	 * NxPivotUtil 객체
	 * @namespace
	 * @name NxPivotUtil
	 * @property {string} version - nx version 정보
	 * @property {string} language - 사용언어(default: "ko_kr"|"en_us")
	 * @property {boolean} isNexacro - (실행환경) nexacro platform 여부
	 * @memberof! <global>
	 */	
	(function(nm, obj) {
		var context;
		obj.isNexacro = 0;
		obj.language = "ko_kr"; //kor

		if (nexacro) {
			context = _global_context;
			obj.log = trace;
			obj.isNexacro = 1;

			if( nexacro._Browser != "Runtime" && window.console && window.console.log) {
				if (nexacro._Browser == "IE") {
					obj.log = trace;
				} else {
					obj.log = window.console.log;	
				}
			}
			
			
		} else if (window) { //pure web 용.
			if (window._popup === true) {
				context = window;
				
			} else {
				context = _global_context;
			}		

			obj.log = console.log;
			if (navigator.appVersion.indexOf('MSIE') > -1){
				//추후 SystemBase_HTML5.js의 trace 로직 사용할 것.
			}
		} else {
			alert("error: Init nx");
		}
		
		context[nm]= obj;
		obj.context = context;
		obj.browser = {
			name: nexacro._Browser,
			type: nexacro._BrowserType,
			version: nexacro._BrowserVersion};	
			
		context = null;
		
	}("NxPivotUtil", {version: 0.1}));
	
	/**
	 * 언어 셋팅
	 * @name setLanguage
	 * @function 
	 * @param {string} v 설정할 언어 문자열. ex) 언어 + "_" + 지역. "ko_kr","en_us",...
	 * @memberOf NxPivotUtil
	 */		
	NxPivotUtil.setLanguage = function(v) {
		if(NxPivotUtil.isEmpty(v) || (!this.pivot.message.language[v])) {
			NxPivotUtil.log("NxPivotUtil.setLanguage(): invalid value. value= " + v);
			return;		
		}
			
		this.language = v;
		
		//언어 변경 후처리 작업 필요!!
	};
	
	/**
	 * NxPivotUtil log 설정
	 * false값을 인자로 주면 NxPivotUtil.log가 동작하지 않는다
	 * @name setDebugMode
	 * @function
	 * @param {boolean} NxPivotUtil.log 활성화 여부
	 * @memberOf NxPivotUtil
	 */
	NxPivotUtil.setDebugMode = function(value)
	{
		if(value === false) {
			NxPivotUtil.log = function(){};
			
		} else if(value === true) {
			if(NxPivotUtil.isNexacro) {
				NxPivotUtil.log = trace;
				if( nexacro._Browser != "Runtime" && console && console.log) {
					NxPivotUtil.log = console.log;
				}			
			} else if (window) {
				obj.log = console.log;
				
			} else {
				alert("[NxPivotUtil.setDebugMode] An unknown error occurred.");
			}
		}	
		
	};
	
	/**
	 * alphabet character code
	 * charvalue값 => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, a, b, c, d, e, f]
	 * @private
	 * @constant
	 * @memberOf NxPivotUtil
	 */
	NxPivotUtil.CHAR_CODES = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102];
	NxPivotUtil.ORDER_FIRST_CHAR = unescape("\u0020".replace(/\\/gi, "%"));
	NxPivotUtil.ORDER_LAST_CHAR  = unescape("\uFFFD".replace(/\\/gi, "%"));

	/**
	 * 중괄호 치환
	 * @name replaceBraces
	 * @function
	 * @param {string} srcStr 대상 문자열. ex) "I {0} a {1}."
	 * @param {string[]} replaceList. 치환 할 문자배열 ex) ["am", "boy"]
	 * @return {string} 치환된 문자열
	 * @memberOf NxPivotUtil
	 */		
	NxPivotUtil.replaceBraces = function(srcStr, replaceList){
		return srcStr.replace(/({\d})/g, function(j) { 
				return replaceList[j.replace(/{/, '').replace(/}/, '')];
			});
	};

	/**
	 * 유일 ID 반환
	 * @name getUniqueId
	 * @function
	 * @param {string=} prefix id 앞에 붙일 문자열
	 * @param {string=} separator id 생성시 구분용 문자(default: '-' )
	 * @return {string} id
	 * @memberOf NxPivotUtil
	 */	
	NxPivotUtil.getUniqueId = function(prefix, separator) {
		prefix = prefix? prefix: "";
		separator = separator? separator.charCodeAt(0) : 45;
		
		var charcode = NxPivotUtil.CHAR_CODES,
			math = Math;
		var seq = 0;
		var seq0;
		var tmpArray = new Array(36);
		var idx = -1;
		
		while (seq < 8) 
		{
			tmpArray[++idx] = charcode[math.random() * 16 | 0];
			seq++;
		}
		seq = 0;
		while (seq < 3) 
		{
			tmpArray[++idx] = separator;//45 => "-", 95=> "_"
			seq0 = 0;
			while (seq0 < 4) 
			{
				tmpArray[++idx] = charcode[math.random() * 16  | 0];
				seq0++;
			}
			seq++;
		}
		tmpArray[++idx] = separator; //45 => "-", 95=> "_"

		var tmpStr = (new Date()).getTime();
		tmpStr = ("0000000" + tmpStr.toString(16)).substr(-8);
		seq = 0;
		while (seq < 8) 
		{
			tmpArray[++idx] = tmpStr.charCodeAt(seq);
			seq++;
		}
		seq = 0;
		while (seq < 4) 
		{
			tmpArray[++idx] = charcode[math.random() * 16 | 0];
			seq++;
		}
		return prefix + String.fromCharCode.apply(null, tmpArray);
	};	

	/**
	 * item에서 id 추출
	 * @name collectFieldID
	 * @function
	 * @param {object[]} list item 배열
	 * @return {string[]} 추출된 id 목록
	 * @memberOf NxPivotUtil
	 */	
	NxPivotUtil.collectFieldID = function(list) {
		var idList = [];
		var len = list.length;

		for(var i=0; i<len; i++) {
			idList[idList.length] = list[i].id;
		}

		return idList;
	};	

	/**
	* 지정된 항목이 처음 나오는 배열 위치를 반환한다
	* @name indexOf
	* @function
	* @param {array} array 검색 대상 Array
	* @param {object} item 찾고자 하는 Item
	* @param {number=} from 검색의 시작 위치 (default: 0)
	* @param {boolean=} strict true: 형변환 없이 비교('==='), false: 형변환 후 비교('==') (default: false)
	* @return {number} 검색된 배열 위치. 없다면 -1 리턴
	* @memberOf NxPivotUtil
	*/
	NxPivotUtil.indexOf = function(array, item, from, strict) {
		var len = array.length;
		if ( from == null ) from = 0;;
		strict == !!strict;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0)
		{
			from += len;
		}
		
		if (strict)
		{
			for (; from < len; from++) 
			{
				if ( array[from] === item)
				{
					return from;
				}
			}
		}
		else
		{
			for (; from < len; from++) 
			{
				if ( array[from] == item)
				{
					return from;
				}
			}
		}
		
		return -1;	
	};	

	/**
	* 원하는 항목을 배열에서 삭제 처리한다
	* @name remove
	* @function
	* @param {array} array remove 대상 Array
	* @param {object} item remove하고자 하는 item
	* @memberOf NxPivotUtil
	*/
	NxPivotUtil.remove = function(array, item) {
		var index = NxPivotUtil.indexOf(array, item);

		if (index !== -1) {
			array.splice(index, 1);
		}	
	};

	/**
	* 배열 형태로 변환 처리한다
	* @name toArray
	* @function
	* @param {object} iterant 변환 대상 Obejct
	* @param {number=} start 시작 위치 (default: start Index)
	* @param {number=} end 끝 위치 (default: end Index)
	* @return {array} 변환된 Array
	* @memberOf NxPivotUtil
	*/
	NxPivotUtil.toArray = function(iterant, start, end) {
		if (!iterant || !iterant.length) 
		{
			return [];
		}
		
		if ( NxPivotUtil.isArray(iterant) )
		{
			if ( arguments.length == 1 ) return iterant;
			else if ( arguments.length == 2 ) return iterant.slice(start);
			else return iterant.slice(start, end);
		}

		if (typeof iterant === "string") 
		{
			iterant = iterant.split("");
		}

		var i, array = [],
		start = start || 0;
		
		end = end ? ((end < 0) ? iterant.length + end : end) : iterant.length;

		for (i = start; i < end; i++) 
		{
			array.push(iterant[i]);
		}

		return array;	
	};	



	/**
	* 배열 형태로 전달된 number값들에 대한 합계처리
	* @name arraySum
	* @function
	* @param {number[]} array 합계 대상 배열
	* @return {number} sum
	* @memberOf NxPivotUtil
	*/
	NxPivotUtil.arraySum = function(array){
		var len = array.length;
		var sum = 0;
		for (var i=0 ; i<len; sum+=(array[i++] * 1));
		return sum;
	};

	/**
	 * value의 Array 여부 반환
	 * @name isArray
	 * @function
	 * @param {*} value 확인 할 value
	 * @return {boolean} Array 여부
	 * @memberOf NxPivotUtil
	 */			
	if(Array.isArray) {
		NxPivotUtil.isArray = function(value) {
			return Array.isArray(value);
		};
	} else {
		//IE 8
		NxPivotUtil.isArray = function(value) {
			return Object.prototype.toString.call(obj) === "[object Array]";
		};
	}

	/**
	 * value의 number 여부 반환
	 * @name isNumber
	 * @function
	 * @param {*} value 확인 할 value
	 * @return {boolean} number 여부
	 * @memberOf NxPivotUtil
	 */
	NxPivotUtil.isNumber = function(value) {
		return typeof value === 'number' && isFinite(value);
	};

	/**
	 * value의 string 여부 반환
	 * @name isString
	 * @function
	 * @param {*} value 확인할 value
	 * @return {boolean} string 여부
	 * @memberOf NxPivotUtil
	 */	
	NxPivotUtil.isString = function(value) {
		return typeof value === 'string';
	};

	/**
	 * value의 nexacro Component 여부 반환
	 * @name isXComponent
	 * @function
	 * @param {*} value 확인할 value
	 * @return {boolean} nexacro Component 여부
	 * @memberOf NxPivotUtil
	 */	
	NxPivotUtil.isXComponent = function(value) {
		if ( value === null || value === undefined  ) return false;
		
		return value instanceof nexacro.Component;
	};

	/**
	 * value의 Object 여부 반환
	 * @name isObject
	 * @function
	 * @param {*} value 확인할 value
	 * @return {boolean} Object 여부
	 * @memberOf NxPivotUtil
	 */
	NxPivotUtil.isObject = function(value) {
		if ( value === null || value === undefined ) return false;
		
		// nexacro Component
		if ( this.isXComponent(value) ) return false;	
		
		// nexacro Object (e.g. Dataset)
		if( value instanceof nexacro.Object ) return false;	
		
		var type = typeof value;
		return typeof value == "object" && 
			   'constructor' in value &&
			   value.constructor === Object;	
	};

	NxPivotUtil._toString = Object.prototype.toString;		
		
	/**
	 * value의 Function 여부 반환
	 * @name isFunction
	 * @function
	 * @param {*} value 확인할 value
	 * @return {boolean} Function 여부
	 * @memberOf NxPivotUtil
	 */		
	NxPivotUtil.isFunction = function(value) {
		return this._toString.call( value ) === '[object Function]';
	};

	/**
	 * value의 Date 여부 반환
	 * @name isDate
	 * @function
	 * @param {date} value 확인할 value
	 * @return {boolean} Date 여부
	 * @memberOf NxPivotUtil
	 */
	NxPivotUtil.isDate = function(value) 
	{
		return this._toString.call( value ) === '[object Date]';
	};

	/**
	 * primitive type (undefined, null, boolean, string, number) 여부 반환
	 * @name isPrimitive
	 * @function
	 * @param {*} value 확인할 value
	 * @return {boolean} primitive type 여부
	 * @memberOf NxPivotUtil
	 */
	NxPivotUtil.isPrimitive = function(value)
	{
		return value === null || /^[usbn]/.test(typeof value);
	};	

	/**
	 * value의 빈값 여부 반환.
	 * 1. null, undefined type : true 반환<br>
	 * 2. string, array type : length 가 0인 경우 true 반환<br>
	 * 3. object type : 하위 속성이 존재할 경우 true 반환<br>
	 * 4. boolean, number, date type : false 반환
	 *
	 * @name isEmpty
	 * @function
	 * @param {*} value 확인할 value
	 * @return {boolean} empty 여부
	 * @memberOf NxPivotUtil
	 */		
	NxPivotUtil.isEmpty = function(value) {
		if ( value === null ||  value === undefined) return true;

		if ( this.isString(value) || this.isArray(value) ) {
			return value.length == 0 ? true : false;
		} else if ( this.isObject(value) ) {
			for (var p in value) {
				if ( value.hasOwnProperty(p) ) {
					return false;
				}
			}
			return true;
		}

		return false;
	};

	/**
	 * 주어진 문장열에서 '-' 제거하고 제거된 위치에서 첫 문자만 대문자 변경
	 * @name camelize
	 * @function
	 * @param {string} str 문자열
	 * @return {string} 처리된 문자
	 * @memberOf NxPivotUtil
	 */		
	NxPivotUtil.camelize = function(str) {
		return str.replace(/-(.)/g, function(all, chr) {
			return chr.toUpperCase();
		});	
	};

	/**
	 * value의 복사본을 반환
	 * @name clone
	 * @function
	 * @param {*} value 복사할 value
	 * @param {boolean} deep Object type의 경우 하위 속성이 Object 일 경우 복사여부
	 * @param {array=} clone 에서 제외 할 속성들 exclude property name을 array
	 * @return {*} value의 복사본
	 * @memberOf NxPivotUtil
	 */
	NxPivotUtil.clone = function(value, deep, exclude)
	{
		try{
			if ( this.isObject(value) || this.isArray(value) )
			{
				var objectClone,
					chkFunc = this.indexOf;
				if ( value.constructor == Array ) 
				{
					objectClone = [];
				}			
				else
				{
					objectClone = {};
				}
				
				for (var property in value) 
				{
					if ( value.hasOwnProperty(property) && (!exclude || chkFunc(exclude, property) == -1) )
					{
						var _tmpValue = value[property];
						if (!deep)
						{
							objectClone[property] = _tmpValue; 
						}
						else if (typeof _tmpValue == 'object') 
						{
							//nexacro component & Dataset은 그대로 유지.
							if(this.isXComponent(_tmpValue)) {
								objectClone[property] = _tmpValue;
							
							} else if(_tmpValue.toString() == "[object Dataset]") {
								objectClone[property] = _tmpValue;
								
							} else {
								objectClone[property] = this.clone(_tmpValue, deep, exclude); 
							}
							
						}
						else 
						{
							objectClone[property] = _tmpValue; 
						}
					}
				}
				
				return objectClone;
			}
			else if ( this.isDate(value) )
			{
				var dateClone = new Date();
				dateClone.setTime(value.getTime());
				return dateClone;
			}
			else if ( this.isXComponent(value) )
			{
				trace("[this.clone] TO-DO==> clone if nexacro Component");
				return null;
			}
			else if ( this.isPrimitive(value) )
			{
				return value;
			}
			else if ( value && ( typeof value.clone == "function" ) )
			{
				return value.clone();
			}
			else
			{
				return null;
			}
		}finally{
			objectClone = null;
			chkFunc = null;
			dateClone = null;
		}
	};

	/**
	 * object에 속성명칭들을 array로 넘겨준다
	 * @name getPropertyNames
	 * @function
	 * @param {object} object 속성명 추출 대상 객체
	 * @return {array} 속성명칭 Array
	 * @memberOf NxPivotUtil
	 */
	NxPivotUtil.getPropertyNames = function(object) {
		return Object.keys(object);
	};	

	/**
	 * 주어진 Form 을 포함하는 최상위 Form을 찾는다
	 * @name getTopLevelForm
	 * @function
	 * @param {Form} curForm 검색 시작 Form.
	 * @return {Form} 최상위 Form.
	 * @memberOf NxPivotUtil
	 */	
	NxPivotUtil.getTopLevelForm = function(curForm) {
		try{
			var p = curForm;
			while (p && !(p instanceof ChildFrame))
			{
				p = p.parent;
			}
			
			return p.form;	
		}finally{
			p = null;
		}
	};

	/**
	 * 주어진 객체와 포인트가 충돌하는지 여부를 확인한다
	 * @name getPropertyNames
	 * @function
	 * @param {object} rect 확인 객체
	 * @param {number} Point X 좌표값
	 * @param {number} Point Y 좌표값
	 * @return {boolean} 충돌여부
	 * @memberOf NxPivotUtil
	 */	
	NxPivotUtil.intersectPoint = function(rect, x, y)
	{
		try{
			var x1 = rect.left;
			var x2 = x1 + rect.width;
			var y1 = rect.top;
			var y2 = y1 + rect.height;
			
			var bChk = false;
			
			if(x1<=x && y1<=y && x2>=x && y2>=y)bChk = true;
			
			return bChk;
		}finally{
			x1 = null;
			x2 = null;
			y1 = null;
			y2 = null;
			bChk = null;
		}
	}

	/**
	 * 인수로 전달된 문자열의 특수문자를 치환
	 * @name encodeString
	 * @function
	 * @param {string} 문자열
	 * @return {string} 치환된 문자열
	 * @memberOf NxPivotUtil
	 */	
	NxPivotUtil.encodeString = function (source) {
		try{
			if (source === undefined || source === null) {
				return source;
			}
			if (typeof (source) != 'string') {
				return source;
			}
			var value = source;
			value = value.replace(/\&/g, "&amp;");
			value = value.replace(/\</g, "&lt;");
			value = value.replace(/\>/g, "&gt;");
			value = value.replace(/\"/g, "&quot;");
			value = value.replace(/\'/g, "&apos;");
			value = value.replace(/\ /g, "&#32;");
			value = value.replace(/\r/g, "&#13;");
			value = value.replace(/\n/g, "&#10;");
			value = value.replace(/\t/g, "&#9;");
			value = value.replace(/\\/g, "&#92;");
			value = value.replace(/\x1e/g, "&#30;");
			value = value.replace(/\x1f/g, "&#31;");
			value = value.replace(/\x03/g, "&#3;");
			return value;
		}finally{
			value = null;
		}
	};

	/**
	 * 인수로 전달된 문자열의 치환된 특수문자를 복원
	 * @name decodeString
	 * @function
	 * @param {string} 치환된 문자열
	 * @return {string} 복원된 문자열
	 * @memberOf NxPivotUtil
	 */	
	NxPivotUtil.decodeString = function (source) {
		try{
			if (source === undefined || source === null) {
				return source;
			}
			if (typeof (source) != 'string') {
				return source;
			}
			var value = source;
			value = value.replace(/\&lt\;/g, "<");
			value = value.replace(/\&gt\;/g, ">");
			value = value.replace(/\&quot\;/g, "\"");
			value = value.replace(/\&apos\;/g, "'");
			value = value.replace(/\&\#32\;/g, " ");
			value = value.replace(/\&\#13\;/g, "\r");
			value = value.replace(/\&\#10\;/g, "\n");
			value = value.replace(/\&\#9\;/g, "\t");
			value = value.replace(/\&\#92\;/g, "\\");
			value = value.replace(/\&\#30\;/g, String.fromCharCode(30));
			value = value.replace(/\&\#31\;/g, String.fromCharCode(31));
			value = value.replace(/\&\#3\;/g, String.fromCharCode(3));
			value = value.replace(/\&amp\;/g, "&");
			return value;
		}finally{
			value = null;
		}
	};
	
	/**
	* nexacro component의 border width(px)를 반환한다
	* @name getBorderWidth
	* @function
	* @param {XComp} xComp nexacro component
	* @return {number[]} [ leftWdith, topWdith, rightWdith, bottomWdith ]
	* @memberOf NxPivotUtil
	*/		
	NxPivotUtil.getBorderWidth = function(xComp) {
		try{
			var border = xComp._getCurrentStyleBorder();
			var leftWidth = 0,topWidth = 0,rightWidth = 0,bottomWidth = 0;
			
			if (border)	{
				leftWidth   = border.left.width;
				topWidth    = border.top.width;
				rightWidth  = border.right.width;
				bottomWidth = border.bottom.width;
				
				leftWidth   = nexacro.toNumber(leftWidth.replace("px",""), 0);
				topWidth    = nexacro.toNumber(topWidth.replace("px",""), 0);
				rightWidth  = nexacro.toNumber(rightWidth.replace("px",""), 0);
				bottomWidth = nexacro.toNumber(bottomWidth.replace("px",""), 0);
				
				return [leftWidth, topWidth, rightWidth, bottomWidth];
			}

			return [0, 0, 0, 0];	
		}finally{
			border = null;
			leftWidth = null;
			topWidth = null;
			rightWidth = null;
			bottomWidth = null;
		}
	};	


	/**
	* nexacro component의 Padding Size를 반환한다
	* @name getPadding
	* @function
	* @param {XComp} xComp nexacro component.
	* @return {number[]} [ leftSize, topSize, rightSize, bottomSize ]
	* @memberOf NxPivotUtil
	*/
	NxPivotUtil.getPadding = function(xComp) {
		try{
			var padding = xComp._getCurrentStylePadding();
			var leftSize = 0, topSize = 0, rightSize = 0, bottomSize = 0;

			if ( padding ) {
				topSize    = (isNaN(padding.top) ? 0 : padding.top);
				bottomSize = (isNaN(padding.bottom) ? 0 : padding.bottom);
				leftSize   = (isNaN(padding.left) ? 0 : padding.left);
				rightSize  = (isNaN(padding.right) ? 0 : padding.right);
			}

			return [leftSize, topSize, rightSize, bottomSize];	
		}finally{
			padding = null;
			leftSize = null; 
			topSize = null;
			rightSize = null;
			bottomSize = null;
		}
	};	
	
	NxPivotUtil.setMergeJson = function(panel1, panel2){
		try{
			var rtn;
			var scopeId;
			
			for(scopeId in panel2)
			{
				if(typeof panel2[scopeId] ==="object")
				{
					if(!panel1[scopeId])
					{				
						panel1[scopeId] = JSON.parse(JSON.stringify(panel2[scopeId]));
					}else
					{
						rtn = NxPivotUtil.setMergeJson(panel1[scopeId], panel2[scopeId]);
						panel1[scopeId] = rtn;
					}
				}else
				{
					panel1[scopeId] = panel2[scopeId];
				}
			}
			
			return panel1;
		}finally{
			rtn = null;
			scopeId = null;
		}
	};

	/**
	 * NxPivotUtil > dataFilter 객체
	 * @namespace
	 * @name NxPivotUtil.dataFilter 
	 * @property {string} name - name
	 * @property {object} number - number
	 * @property {object} string - string
	 * @property {object} date - date
	 * @memberof! <global>
	 */
	NxPivotUtil.dataFilter = {
		name: "dataFilter",
		number: {
			lt:  " < ",
			gt:  " > ",
			leq: " <= ",
			geq: " >= ",
			eq:  " == ",
			neq: " != ",
			
			logicalOperator: {neq: " && "}
		},
		string: {
			ct: function(id, caseSensitive, value) { //contains
				if(!caseSensitive) {
					var re = new RegExp(value,"i");
					return re + ".test(" + id + ")";				
				} else {
					return id + ".indexOf('" + value + "') > -1";
				}
			},

			nct: function(id, caseSensitive, value) { //not contains
				if(!caseSensitive) {
					var re = new RegExp(value,"i");
					return "!(" + re + ".test(" + id + "))";				
				} else {
					return id + ".indexOf('" + value + "') < 0";
				}
			},		
			
			eq: function(id, caseSensitive, value) { //equal
				if(!caseSensitive) {
					return id + ".toLowerCase() == '" + value.toLowerCase() + "'";
				} else {
					return id + " == '" + value + "'";
				}
			},
			
			neq: function(id, caseSensitive, value) { //not equal
				if(!caseSensitive) {
					return id + ".toLowerCase() !== '" + value.toLowerCase() + "'";
				} else {
					return id + " != '" + value + "'";
				}
			},
			
			logicalOperator: {nct: " && ", neq: " && "}
		},
		date: {
			between: function(id, from, to){
				return id + " >= " + from  + " && " + id + " <= " + to;
			},
			
			eq: function(id, caseSensitive, value) { //equal
				return id + " == '" + value + "'";
			},
			
			neq: function(id, caseSensitive, value) { //not equal
				return id + " != '" + value + "'";
			},		
			
			lt: function(id, caseSensitive, value) { 
				return id + " < '" + value + "'";
			},
			
			gt: function(id, caseSensitive, value) { 
				return id + " > '" + value + "'";
			},
			
			leq: function(id, caseSensitive, value) { 
				return id + " <= '" + value + "'";
			},
			
			geq: function(id, caseSensitive, value) { 
				return id + " >= '" + value + "'";
			},
			
			logicalOperator: {neq: " && "}
		}
	};
		
	var _pFilter = NxPivotUtil.dataFilter;

	/**
	 * Filter string 반환
	 * @name generateFilterStr
	 * @function
	 * @param {object} id field id
	 * @param {string} type field data type('string','number', 'date')
	 * @param {boolean} caseSensitive 대소문자 구분유무
	 * @param {string} operation 연산자
	 * @param {string} values filter values
	 * @param {object} filter NxPivotUtil.dataFilter object
	 * @return {string} filter string
	 * @memberOf NxPivotUtil.dataFilter
	 */
	_pFilter.generateFilterStr = function(id, type, caseSensitive, operation, values, filter, pivot) {
		try{
			var str = "";
			var filterStr = "";
			var filterList = [];
			var filterType = filter[type];
			var _nUtil = NxPivotUtil;
			
			if(_nUtil.isEmpty(filterType)) {
				//1001
				pivot.error(pivot.config.targetView, "error", 1001, [ this.name, type ]);

				return str;
			}		
			
			var defaultOperator = " || ";
			var operator = filterType["logicalOperator"][operation] || defaultOperator;
			var len = values.length;
			
			if(len < 1) {
				//1002
				pivot.error(pivot.config.targetView, "error", 1002, [ this.name ]);
				return str;		
			}
			

			operation = filterType[operation];
			if(_nUtil.isEmpty(operation)) {
				//1003
				pivot.error(pivot.config.targetView, "error", 1003, [ this.name, operation ]);
				return str;
			}
			
			if(type == "date") {
				if(operation == "between") {
					if(len != 2) {
						//1004
						pivot.error(pivot.config.targetView, "error", 1004, [ this.name, values ]);
						return str;
					}
					
					if(values[0] > values[1]) {
						//1005
						pivot.error(pivot.config.targetView, "error", 1005, [ this.name, values ]);
						return str;
					}
					
					filterStr = operation(id, values[0], values[1]);
					filterList.push(filterStr);			
				} else {
					for(var i=0; i<len; i++) {
						filterStr = operation(id, caseSensitive, values[i]);
						filterList.push(filterStr);
					}			
					
				}
				
				
			} else {
			
				for(var i=0; i<len; i++) {
					if(type == "string") {
						filterStr = operation(id, caseSensitive, values[i]);
						
					} else if(type == "number") {
						filterStr = id + operation + values[i];
						
					}	
					
					filterList.push(filterStr);
				}
			}
			
			str = filterList.join(operator);	
			str = "( " + str + " )";
			//NxPivotUtil.log("%c     gen 결과: " + str , "color:blue");
			return str;
		}finally{
			str = null;
			filterStr = null;
			filterList = null;
			filterType = null;
			_nUtil = null;
			defaultOperator = null;
			operator = null;
			len = null;
		}
	};	

	_pFilter = null;

	/**
	 * NxPivotUtil > pivotUtil 객체
	 * @namespace
	 * @name NxPivotUtil.pivotUtil 
	 * @property {string} name - name
	 * @memberof! <global>
	 */
	NxPivotUtil.pivotUtil = {
		name:"NxPivotUtil.pivotUtil"
	};
	
	var _pUtil = NxPivotUtil.pivotUtil;

	/**
	 * 집계방식 변경시 호출.
	 * Pivot Data 갱신.
	 * @name changeAggreator
	 * @function 
	 * @param {object} pivot Pivot object.
	 * @memberOf NxPivotUtil.pivotUtil
	 */
	_pUtil.changeAggreator = function(pivot) {
		try{
			if(!pivot._isValidForRender()) {
				return false;
			}
			
			//render가 실행된 적이 없으면.
			if(!pivot._isRended) {
				pivot.render();
				return;
			}

			var cube = pivot.cube;
			var config = pivot.config;
			var colAxisDisplayMembers = cube.colAxisDisplayMembers;
			var rowAxisDisplayMembers = cube.rowAxisDisplayMembers;
			var rowTotalPosition = config.rowTotalPosition;
			var colTotalPosition = config.colTotalPosition;
			var colAxisRootNode = cube._colAxisRootNode;
			var rowAxisRootNode = cube._rowAxisRootNode;
			var colAxisFields = cube.colAxisFields;
			var rowAxisFields = cube.rowAxisFields;
			var resultDs = cube.pivotDataSource;
			
			//AggregatorMap 재설정.
			cube.setValuesAggregatorMap(config);
			
			NxPivotUtil.pivotUtil._setPivotData(cube,
									colAxisRootNode,
									rowAxisRootNode,
									colAxisFields,
									rowAxisFields, true);
									
			NxPivotUtil.pivotUtil._setPivotCSSData(cube);			
			
			if(rowTotalPosition!="none")pivot.view.gridView.drillDownRowDepth(0);
			else resultDs.set_enableevent(true);
									
			if(colTotalPosition!="none")pivot.view.gridView.drillDownColDepth(0);
			else resultDs.set_enableevent(true);
			
		}finally{
			cube = null;
			config = null;
			colAxisDisplayMembers = null;
			rowAxisDisplayMembers = null;
			rowTotalPosition = null;
			colTotalPosition = null;
			colAxisRootNode = null;
			rowAxisRootNode = null;
			colAxisFields = null;
			rowAxisFields = null;
			resultDs = null;
		}
	};	


	/**
	 * Pivot sort 실행.
	 * @name sortAxis
	 * @function 
	 * @param {object} pivot Pivot object.
	 * @memberOf NxPivotUtil.pivotUtil
	 */
	_pUtil.sortAxis = function(pivot) {
		try{
			var pUtil = NxPivotUtil.pivotUtil;
			var cfg   = pivot.config;
			var cube  = pivot.cube;
			var colAxisDisplayMembers = cube.colAxisDisplayMembers;
			var rowAxisDisplayMembers = cube.rowAxisDisplayMembers;
			
			var colAxis = cfg.colAxis;
			var rowAxis = cfg.rowAxis;
			var colTotalPosition = cfg.colTotalPosition;
			var rowTotalPosition = cfg.rowTotalPosition;	
			
			cube.colAxisDisplayMembers = pUtil.sortDisplayMembers(cube, colAxis, colAxisDisplayMembers, colTotalPosition);
			cube.rowAxisDisplayMembers = pUtil.sortDisplayMembers(cube, rowAxis, rowAxisDisplayMembers, rowTotalPosition);
			
			var colAxisRootNode = cube._colAxisRootNode;
			var rowAxisRootNode = cube._rowAxisRootNode;
			
			var colAxisFields = cube.colAxisFields; //field id list
			var rowAxisFields = cube.rowAxisFields; //field id list
			
			if(NxPivotUtil.isEmpty(colAxisRootNode) || NxPivotUtil.isEmpty(rowAxisRootNode) 
				|| colAxisFields.length == 0 || rowAxisFields.length == 0 ) {
				//1006
				pivot.error(pivot.config.targetView, "error", 1006);
				return;
			}	
			
			pUtil._setPivotData(cube,
									colAxisRootNode,
									rowAxisRootNode,
									colAxisFields,
									rowAxisFields);
									
			pUtil._setPivotCSSData(cube);
									
			pivot.view.gridView.makeGridFormat();
		}finally{
			pUtil = null;
			cfg   = null;
			cube  = null;
			colAxisDisplayMembers = null;
			rowAxisDisplayMembers = null;
			colAxis = null;
			rowAxis = null;
			colTotalPosition = null;
			rowTotalPosition = null;
			colAxisRootNode = null;
			rowAxisRootNode = null;
			colAxisFields = null;
			rowAxisFields = null;
		}
	};
		

	/**
	 * config의 filter 정보를 기반으로 filter 처리.
	 * @name setFilterData
	 * @function  
	 * @param {object} pivot Pivot object.
	 * @param {object} cfg pivot 설정 정보.
	 * @return {boolean} dataSource filter 적용여부. 변경 내역이 없을 경우에도 false 반환.
	 * @memberOf NxPivotUtil.pivotUtil
	 */
	_pUtil.setFilterData = function(pivot, cfg) {
		try{
			var filters = cfg.filters;
			
			if(NxPivotUtil.isEmpty(filters)) { 
				if(pivot.filterStr != "") { //filter를 아이템설정에서 모두 뺐을 경우. 
					pivot.filterStr = "";
					cfg.dataSource.filter("");
				}	
				return true;
			}	
			
			var filterCondition = " && ";
			var distinctValuesOfId = pivot.cube._distinctValuesOfId;
			
			var len = filters.length;
			var data = {};
			var item;
			var str = "";
			var nxFilter = NxPivotUtil.dataFilter;
			var filterList = [];
			var tempFilterStr;
			var id, 
				type, 
				caseSensitive, 
				operation, 
				values;
				
			for(var i=0; i<len; i++) {
				item   = filters[i];
				id = item.id;
				
				if(distinctValuesOfId[id] === undefined) {
					//1007
					pivot.error(pivot.config.targetView, "error", 1007, [ id ]);
					return false;	
				}
				
				if(!cfg._isValidFilterId(id, ["colAxis", "rowAxis", "values"])) {
					continue;
				}
				
				type           = item.type || "string";
				caseSensitive = cfg.casesensitive;
				operation      = item.operation;
				values         = item.values;
				
				var str = item.filterStr = nxFilter.generateFilterStr(id, type, caseSensitive, operation, values, nxFilter, pivot);
				filterList.push(str);
			}
			
			tempFilterStr = filterList.join(filterCondition);
			filterList.length = 0;
			
			//변경내역 확인.
			if(tempFilterStr == pivot.filterStr) {
				return false;
			}
			
			pivot.filterStr = tempFilterStr;
			
			cfg.dataSource.filter(pivot.filterStr);
			
			//NxPivotUtil.log("%cfor 최종:" + pivot.filterStr, "color:red");
			
			return true;
		}finally{
			filters = null;
			filterCondition = null;
			distinctValuesOfId = null;
			len = null;
			data = null;
			item = null;
			str = null;
			nxFilter = null;
			filterList = null;
			tempFilterStr = null;
			id = null;
			type = null;
			caseSensitive = null;
			operation = null;
			values = null;
		}
	};


	_pUtil.getFilterItemData = function(pivot, id)
	{
		try{
			var nRow;
			var Values;
			var distinctValue;
			var filterDs = pivot.cube.filterDataSource;
			var distinctValuesOfId = pivot.cube._distinctValuesOfId;
			
			filterDs.set_enableevent(false);
			filterDs.deleteAll();
			filterDs.clear();
			
			filterDs.addColumn("chk", "string");
			filterDs.addColumn("value", "string");
				
			if(NxPivotUtil.isEmpty(distinctValuesOfId)==false){
				
				distinctValue = distinctValuesOfId[id];
				
				for(Values in distinctValue)
				{
					nRow = filterDs.addRow();
					
					filterDs.setColumn(nRow, "chk", 1);
					filterDs.setColumn(nRow, "value", Values);
				}
			}
			
			filterDs.set_enableevent(true);
			return filterDs;
		}finally{
//===============================================
			nRow = null;
			Values = null;
			distinctValue = null;
			filterDs = null;
			distinctValuesOfId = null;
		}
	}

	/**
	 * Cube 구성을 위한 child node 반환.
	 * @name getChildNode
	 * @function 
	 * @param {object} cube Cube.
	 * @param {string|number} member member data.
	 * @param {object} parentNode parent CubeNode.
	 * @return {object} CubeNode.
	 * @memberOf NxPivotUtil.pivotUtil
	 */
	_pUtil.getChildNode = function(cube, member, parentNode) {
		try{
			var node = parentNode.getChild(member);
			if (!node) {
				node = this.getCubeNode(cube, member, parentNode);
			}
			
			return node;
		}finally{
//===============================================
			node = null;
		}
	};


	/**
	 * node에 value 설정.
	 * @name addValueToNode
	 * @function  
	 * @param {object} node CubeNode.
	 * @param {number} valueCount
	 * @param {array} valueIdList value값에 해당하는 field-id array.
	 * @param {object} ds data source.
	 * @param {number} row row index.
	 * @memberOf NxPivotUtil.pivotUtil
	 */
	_pUtil.addValueToNode = function(node, valueCount, valueIdList, ds, row) {
		var valueId = "";
		for (var i=0; i<valueCount; i++) {
			valueId = valueIdList[i];
			node.addValue(valueId, ds.getColumn(row, valueId) );
		}	

		valueId = null;
	};


	/**
	 * field id별 유일값 추출.
	 * @name setDistinctValueOfId
	 * @function   
	 * @param {object} cube Cube.
	 * @param {object} ds data source.
	 * @memberOf NxPivotUtil.pivotUtil
	 */
	_pUtil.setDistinctValueOfId = function(cube, dataSource) {
		var config = cube.parent.config;
		var wholeFields = [config.colAxis, config.rowAxis, config.values, config.fields];
		var fieldList;
		var fieldIdList = [];
		var distinctValuesOfId = {};
		
		for (var i=0,len=wholeFields.length; i<len; i++) {
			
			fieldList = wholeFields[i];
			
			for (var j=0,len2=fieldList.length; j<len2; j++) {
				var fieldId = fieldList[j].id;
				fieldIdList[fieldIdList.length] = fieldId;
				distinctValuesOfId[fieldId] = {};
			}
		}
		
		var rowCount = dataSource.getRowCount();
		var value;
		for (var row=0; row<rowCount; row++) {
			
			for (var i=0,len=fieldIdList.length; i<len; i++) {
				var fieldId = fieldIdList[i];
				value = dataSource.getColumn(row, fieldId);
				
				if ( !distinctValuesOfId[fieldId].hasOwnProperty(value) ) {
					distinctValuesOfId[fieldId][value] = 1;
				}
			}
		}
		
		cube._distinctValuesOfId = distinctValuesOfId;
		cube._isCompleteDistinctValues = true;

//===============================================
		config = null;
		wholeFields = null;
		fieldList = null;
		fieldIdList = null;
		distinctValuesOfId = null;
		fieldId = null;
		rowCount = null;
		value = null;
	}

	/**
	 * cube 생성.
	 * @name generateCube
	 * @function 
	 * @param {object} pivot Pivot.
	 * @param {object} cube Cube.
	 * @memberOf NxPivotUtil.pivotUtil
	 */
	_pUtil.generateCube = function(pivot, cube) {

		// cube node 해제
		cube.releaseCubeNode();
		var config = pivot.config;
		var colTotalPosition = config.colTotalPosition;
		var rowTotalPosition = config.rowTotalPosition;

		var colAxis = config.colAxis;
		var rowAxis = config.rowAxis;
		var colAxisFields = NxPivotUtil.collectFieldID(colAxis);
		var rowAxisFields = NxPivotUtil.collectFieldID(rowAxis);
		
		cube.colAxisFields = colAxisFields;
		cube.rowAxisFields = rowAxisFields;
		
		var pUtil = NxPivotUtil.pivotUtil;

		var colAxisRootNode = pUtil.getCubeNode(cube, "root", null);
		var colAxisDisplayMembers = [];
		var dataSource = pivot.config.dataSource;
		
		
		var values = pivot.config.values;
		var valueCount = values.length;
		var valueIdList = [];
		
		for (var i=0; i<valueCount; i++) {
			valueIdList[valueIdList.length] = values[i].id;
		}
		
		pUtil.buildNode(dataSource, cube,
					 colAxisRootNode,
					 colAxisFields,
					 rowAxisFields,
					 colAxisDisplayMembers, colTotalPosition, valueIdList);

		var rowAxisRootNode = pUtil.getCubeNode(cube, "root", null);
		var rowAxisDisplayMembers = [];

		pUtil.buildNode(dataSource, cube,
					 rowAxisRootNode,
					 rowAxisFields,
					 colAxisFields,
					 rowAxisDisplayMembers, rowTotalPosition, valueIdList);

		// row axis 'all' member, col axis 'all' member 에 해당하는 측정값 추출을 위한 노드 생성
		//total용.
		var tempNode;
		var rowAxisCount = rowAxisFields.length - 1;
		var rowTotalFields;
		var colTotalFields = colAxisFields.concat([]);
		if ( colTotalFields.length > 1 )  {
			colTotalFields.splice(colTotalFields.length-1, 1);
		}

		for (var i=rowAxisCount; i>0; i--) {
			rowTotalFields = rowAxisFields.concat([]);
			rowTotalFields.splice(i, rowTotalFields.length-i);
		
			tempNode = pUtil.getCubeNode(cube, "root", null);
			
			//NxPivotUtil.log("[NxPivotUtil.pivotUtil.generateCube] rowAxisCount 2이상시 test 필요");
			pUtil.buildNodeForAll(dataSource, cube, tempNode, rowTotalFields, colTotalFields, valueIdList);
			tempNode = null;
		}
		
		cube.colAxisDisplayMembers = pUtil.sortDisplayMembers(cube, colAxis, colAxisDisplayMembers, colTotalPosition);
		colAxisDisplayMembers.length = 0;
		cube.rowAxisDisplayMembers = pUtil.sortDisplayMembers(cube, rowAxis, rowAxisDisplayMembers, rowTotalPosition);
		rowAxisDisplayMembers.length = 0;

		pUtil._setPivotData(cube,
								colAxisRootNode,
								rowAxisRootNode,
								colAxisFields,
								rowAxisFields);
								
		cube._colAxisRootNode = colAxisRootNode;
		cube._rowAxisRootNode = rowAxisRootNode;
		
		pUtil._setPivotCSSData(cube);

		colAxisRootNode = null;
		rowAxisRootNode = null;

//===============================================
		colAxis = null;
		rowAxis = null;	
		colAxisDisplayMembers = null;
		dataSource = null;
		values = null;
		valueCount = null;
		valueIdList = null;
		rowAxisDisplayMembers = null;
		tempNode = null;
		rowAxisCount = null;
		rowTotalFields = null;
		colTotalFields = null;		
		colAxisFields = null;
		rowAxisFields = null;
		
		config = null;
		pUtil = null;	
		
	};



	/**
	 * node 및 부분합 생성.
	 * @name buildNode
	 * @function  
	 * @param {object} dataSource Data source.
	 * @param {object} cube Cube.
	 * @param {object} rootNode 최상위 노드.
	 * @param {string[]} mainAxis 기준 축.
	 * @param {string[]} crossAxis cross 축.
	 * @param {array} distinctMemberList 유일한 member(field value)가 설정될 array.
	 * @param {string} totalPosition total position 위치.
	 * @param {string[]} valueIdList value값에 해당하는 field-id array.
	 * @memberOf NxPivotUtil.pivotUtil
	 */
	_pUtil.buildNode = function(dataSource, cube, rootNode, mainAxis, crossAxis, 
				distinctMemberList, totalPosition, valueIdList) {
		var ds = dataSource;
		var rowCount = ds.getRowCount();
		var axisFields = mainAxis.concat(crossAxis);
		var axisFieldCount = axisFields.length;
		var mainAxisCount = mainAxis.length;
		var valueCount = valueIdList.length;
		var emptyDataText = cube.parent.config.emptyDataText;
		
		var node;
		var parentNode;
		var member;
		var members = [];
		var distinctMember
		var distinctMembers;
		var distinctMemberMap = {};
		var pUtil = NxPivotUtil.pivotUtil;
		
		for (var row=0; row<rowCount; row++) {
			// member 구하기
			for (var i=0; i<axisFieldCount; i++) {
				var value = ds.getColumn(row, axisFields[i]);
				if(value === "" || value === undefined || value === null) {
					value = emptyDataText;
				}

				members[i] = value + "";
			}

			parentNode = rootNode;
			
			distinctMembers = [];

			// node 생성
			for (var i=0; i<axisFieldCount; i++) {
				member = members[i];

				// distinct member
				if (i < mainAxisCount) {
					distinctMembers[distinctMembers.length] = member;
				}

				parentNode = node = pUtil.getChildNode(cube, member, parentNode);
			}

			
			// set distinct member to map
			distinctMember = distinctMembers.join("");
			if ( !distinctMemberMap.hasOwnProperty(distinctMember) ) {
				distinctMemberMap[distinctMember] = true;
				distinctMemberList[distinctMemberList.length] = distinctMembers;
			}
				
			pUtil.addValueToNode(node, valueCount, valueIdList, ds, row);
			
			node = null;
			parentNode = null;
		} //rowCount for문 종료

		//pathToNodeMap = null;
		distinctMemberMap = null;

		
		// axis 에 dimension 이 하나일 경우 'all' member 없음
		// 'all' member에 unique id 를 지정하고 정렬 및 위치 지정시 이용한다.
		if(totalPosition != "none" && mainAxis.length > 1 ) {
			// add 'all' member to distinct member list
			var depth = 1;
			var distinctMemberCount = distinctMemberList.length;
			var allMemberId = cube.allMemberId;

			do {
				var checkAllMap = {};
				var checkMember, checkMembers;
				for (var i=0; i<distinctMemberCount; i++)  {
					checkMembers = [];
					for (var j=0; j<depth; j++) {
						checkMembers[checkMembers.length] = distinctMemberList[i][j];
					}

					checkMember = checkMembers.join("");

					if ( !checkAllMap.hasOwnProperty(checkMember) ) {
						checkAllMap[checkMember] = true;

						// 부분합은 표시 위치 및 정렬 고려하여
						// 실제 명칭을 바로 보여주지 않고 id 로 지정해 놓은 후
						// 결과 데이터셋을 생성할 때 치환하여 화면에 보여준다.
						checkMembers[checkMembers.length] = allMemberId;
						distinctMemberList[distinctMemberList.length] = checkMembers;
					}
				}

				depth += 1;

			} while ( depth < mainAxisCount )
		}

//===============================================
		ds = null;
		rowCount = null;
		axisFields = null;
		axisFieldCount = null;
		mainAxisCount = null;
		valueCount = null;
		emptyDataText = null;
		
		node = null;
		parentNode = null;
		member = null;
		members = null;
		distinctMember = null;
		distinctMembers = null;
		distinctMemberMap = null;
		pUtil = null;
	};

	/**
	 * total값 생성을 위한 row axis 'all' member, col axis 'all' member 에 해당하는 측정값 추출을 위한 노드 생성
	 * (※ rowAxis 기준)
	 * @name buildNodeForAll
	 * @function
	 * @param {object} dataSource Data source.
	 * @param {object} cube Cube.
	 * @param {object} rootNode 최상위 노드.
	 * @param {string[]} mainAxis 기준 축.
	 * @param {string[]} crossAxis cross 축.
	 * @param {string[]} valueIdList value값에 해당하는 field-id array.
	 * @memberOf NxPivotUtil.pivotUtil
	 */
	_pUtil.buildNodeForAll = function(dataSource, cube, rootNode, mainAxis, crossAxis, valueIdList) {
		var ds = dataSource;
		var rowCount = ds.getRowCount();
		var axisFields = mainAxis.concat(crossAxis);
		var axisFieldCount = axisFields.length;
		var valueCount = valueIdList.length;
		var emptyDataText = cube.parent.config.emptyDataText;

		var node;
		var parentNode;
		var members = [];

		var pUtil = NxPivotUtil.pivotUtil;
		
		for (var row=0; row<rowCount; row++) {
			parentNode = rootNode;
			
			// member 구하기
			for (var i=0; i<axisFieldCount; i++) {
				var value = ds.getColumn(row, axisFields[i]);
				if(value === "" || value === undefined || value === null) {
					value = emptyDataText;
				}			
				
				members[i] = value;
				parentNode = pUtil.getChildNode(cube, members[i], parentNode);
			}

			node = parentNode;
			
			pUtil.addValueToNode(node, valueCount, valueIdList, ds, row);
			
			node = null;
			parentNode = null;
		} //rowCount for문 종료

		pathToNodeMap = null;
//===============================================		
		ds = null;
		rowCount = null;
		axisFields = null;
		axisFieldCount = null;
		valueCount = null;
		emptyDataText = null;

		node = null;
		parentNode = null;
		members = null;

		pUtil = null;

	};


	/**
	 * 지정된 node 집계 값을 반환한다.
	 * @name getAggregateValue
	 * @function
	 * @param {object} cube 대상 cube 객체.
	 * @param {object} node 값을 구할 대상 노드.
	 * @param {string} valueId value를 찾기 위한 field-id.
	 * @param {string|function} aggregator 집계 함수명 또는 집계 함수.
	 * @return {number} 집계 처리 결과.
	 * @memberOf NxPivotUtil.pivotUtil
	*/
	_pUtil.getAggregateValue = function(cube, node, valueId, aggregator)
	{
		try{
			var value = 0;
			var values = node.getValues(valueId);
			var _nUtil = NxPivotUtil;
						
			var roundfractiondigit = cube.parent.config.roundfractiondigit;
			if ( values && values.length > 0 ) {
				if(_nUtil.isString(aggregator)) {
					aggregator = aggregator.toLowerCase();
					switch(aggregator) {
						case 'sum' :
							value = nexacro.round(_nUtil.arraySum(values), roundfractiondigit);
							break;
						case 'avg' :
							value = nexacro.round((_nUtil.arraySum(values) / values.length), roundfractiondigit);
							break;
						case 'cnt' :
							value = nexacro.round(values.length, roundfractiondigit);
							break;
						case 'min' :
							value = nexacro.round(Math.min.apply(Math, values), roundfractiondigit);
							break;
						case 'max' :
							value = nexacro.round(Math.max.apply(Math, values), roundfractiondigit);
							break;
						default :
							cube.parent.error(cube.parent.config.targetView, "error", 1008, [ aggregator ]);
					}
					
				} else if(_nUtil.isObject(aggregator)) {
					value = aggregator.func(node);
				}
			}

			return value;
		}finally{
//===============================================	
			value = null;
			values = null;
			_nUtil = null;
			roundfractiondigit = null;
		}
	};


	/**
	 * 지정된 node의 하위에 포함된 노드의 값을 칼럼 데이터에 지정한다.
	 * @name setColumnDataByNode
	 * @function 
	 * @param {CubeNode} cube 대상 cube 객체
	 * @param {array} values 객체
	 * @param {Dataset} resultDs 결과 데이터셋
	 * @param {number} row 결과 데이터셋에 값을 세팅할 대상 행
	 * @param {number} depth 칼럼축 첫 노드 depth
	 * @param {CubeNode} node 값을 구할 대상 노드
	 * @param {object} columnIndexMap 칼럼값 명칭으로 칼럼의 index를 찾기 위한 map object
	 * @memberOf NxPivotUtil.pivotUtil
	*/
	_pUtil.setColumnDataByNode = function(cube, values, resultDs, row, depth, node, columnIndexMap)
	{
		var path, fullPath;
		var child;
		var children = node.getChildren();
		var c;
		var path, columnIndex;

		var valueCount = values.length;
		var valueId;
		var pUtil = NxPivotUtil.pivotUtil;
		var map = cube.valuesAggregatorMap;
		var aggregator = "";
		var aggValue = "";
		
		if ( children == null ) {
			for (var j=0; j<valueCount; j++) {
				valueId = values[j].id;
				aggregator = map[valueId];
				columnIndex = columnIndexMap[valueId];
				aggValue = pUtil.getAggregateValue(cube, node, valueId, aggregator);
				resultDs.setColumn(row, columnIndex, aggValue);
			}

		} else {
			for (var i=0,len=children.length; i<len; i++) {
				child = children[i];
				fullPath = child.path;
				path = "";

				for (var j=depth,len2=fullPath.length; j<len2; j++) {
					path += "["+fullPath[j]+"]";
				}

				for (var j=0; j<valueCount; j++) {
					valueId = values[j].id;
					aggregator = map[valueId];
					columnIndex = columnIndexMap[path + valueId];
					
					if(columnIndex) {
						aggValue = pUtil.getAggregateValue(cube, child, valueId, aggregator);
						resultDs.setColumn(row, columnIndex, aggValue);
					}
				}

				c = child.getChildren();
				if ( c && c.length > 0 ) {
					pUtil.setColumnDataByNode(cube, values, resultDs, row, depth, child, columnIndexMap);
				}
			}
		}

		c = null;
		child = null;
		children = null;
		aggValue = null;
		
//===============================================	
		path = null;
		columnIndex = null;

		valueCount = null;
		valueId = null;
		pUtil = null;
		map = null;
		aggregator = null;
	};



	/**
	 * CubeNode 인스턴스를 얻어온다.
	 * @name getCubeNode
	 * @function 
	 * @param {CubeNode} cube CubeNode
	 * @param {string} nm CubeNode name.
	 * @param {CubeNode} parentNode parent CubeNode.
	 * @memberOf NxPivotUtil.pivotUtil.
	*/
	_pUtil.getCubeNode = function(cube, nm, parentNode) {
		try{
			var cubeNodeCount = (cube.cubeNodeCount += 1);
			var nodePool = cube.cubeNodePool;
			var node;
			if ( cubeNodeCount < nodePool.length ) {
				node = nodePool[cubeNodeCount];
				node.init(cube, nm, parentNode);
			} else {
				node = new nexacro.NxPivot.Pivot.Cube.CubeNode(cube, nm, parentNode);
				nodePool[nodePool] = node;
			}

			return node;
		}finally{
//===============================================	
			cubeNodeCount = null;
			nodePool = null;
			node = null;
		}
	};


	/**
	 * 계층 구조의 노드에서 데이터를 추출하여 결과 데이터셋을 생성한다.
	 * @name _setPivotData
	 * @function 
	 * @private
	 * @param {Cube} cube Cube 객체
	 * @param {CubeNode} colAxisRootNode column 축 최상위 노드
	 * @param {CubeNode} rowAxisRootNode row 축 최상위 노드
	 * @param {array} colAxisFields column 축 dimension 에 바인딩될 원본 데이터셋 컬럼 목록
	 * @param {array} rowAxisFields row 축 dimension 에 바인딩될 원본 데이터셋 컬럼 목록
	 * @param {boolean} keepGridFormat grid format 유지 여부. 집계만 변경시에는 유지하는 편이 빠름.
	 * @memberOf NxPivotUtil.pivotUtil.
	 */
	_pUtil._setPivotData = function(cube,
										 colAxisRootNode,
										 rowAxisRootNode,
										 colAxisFields,
										 rowAxisFields, 
										 keepGridFormat)
	{
		var config = cube.parent.config;
		var rowTotalPosition = config.rowTotalPosition;
		var colTotalPosition = config.colTotalPosition;
		
		var grdStyle = config.grid;
		var showGrandTotal = config.showGrandTotal;
		var colGrandtotalPosition = config.colGrandtotalPosition;
		var rowGrandtotalPosition = config.rowGrandtotalPosition;
		var totalText = config.totalText;
		var allMemberId = cube.allMemberId;
		var allMemberDisplayWithOwnName = totalText;

		var colAxisMembers = cube.colAxisDisplayMembers;
		var rowAxisMembers = cube.rowAxisDisplayMembers;
		var colAxisMemberCnt = colAxisMembers.length;
		var rowAxisMemberCnt = rowAxisMembers.length;
		var rowAxisFieldCount = rowAxisFields.length;
		var baseIsEmpty = NxPivotUtil.isEmpty;
		var pUtil = NxPivotUtil.pivotUtil;
		var map = cube.valuesAggregatorMap;
		var aggregator = "";
		
		var resultDs = cube.pivotDataSource;
		resultDs.set_enableevent(false);
		resultDs.deleteAll();
		resultDs.clear();

		// row axis 에 해당하는 dataset column 생성
		for (var i=0; i<rowAxisFieldCount; i++) {
			resultDs.addColumn(rowAxisFields[i], "string");
		}

		var colAxisMember;
		var rowAxisMember;
		var memberName;
		var columnName;
		var columnValue;
		var columnIndexMap = {};
		var defaultColName = colAxisFields.join("_");
		var rowPath, colPath;

		var valueIdList = cube.valueIdList;
		var values = config.values;
		var valuesCount = values.length;	

		// column axis member에 해당하는 dataset column 생성 및 칼럼 map 정보 추가
		var colIndex;
		for (var i=0; i<colAxisMemberCnt; i++) {
			columnName = defaultColName + "_" + i;

			colAxisMember = colAxisMembers[i];
			rowPath = "";

			for (var j=0,len=colAxisMember.length; j<len; j++) {
				memberName = colAxisMember[j];

				if ( !baseIsEmpty(memberName) && memberName.toString().substr(1) != allMemberId ) {	
					rowPath += "["+memberName+"]";
				}
			}

			for (var j=0; j<valuesCount; j++) {
				valueId = valueIdList[j];
				colIndex = resultDs.addColumn(columnName + "_" + valueId, "float");
				columnIndexMap[rowPath+valueId] = colIndex;
			}
		}

		// right band 에 표시될 칼럼 생성
		if ( colGrandtotalPosition != "none" ) {
			for (var j=0; j<valuesCount; j++) {
				valueId = valueIdList[j];
				resultDs.addColumn("_GRAND_TOTAL_" + valueId, "float");
			}
		}

		// all member depth column 생성
		resultDs.addColumn("_ALL_MEMBER_DEPTH", "int");

		// row axis drill down 기능을 위한 column 생성
		resultDs.addColumn("_FILTER_YN", "string");
		resultDs.addColumn("_ORG_ROW", "int");
		for (var i=0; i<(rowAxisFieldCount); i++) {
			resultDs.addColumn("_"+rowAxisFields[i]+"_BACKGROUND", "string");
		}

		// data setting
		memberName = "";
		var node, findNode;
		
		var pathToNodeMap = cube.pathToNodeMap;
		var hasRowAllMember = false;
		var hasColAllMember = false;
		var aggValue = "";
		var drillDownOpenBg = grdStyle.drillDownCloseBodyClass;
		

		for (var row=0; row<rowAxisMemberCnt; row++) {
			resultDs.addRow();
			resultDs.setColumn(row, "_FILTER_YN", "N");
			resultDs.setColumn(row, "_ORG_ROW", row);

			node = rowAxisRootNode;

			rowAxisMember = rowAxisMembers[row];
			rowPath = "";
			hasRowAllMember = false;

			for (var i=0,len=rowAxisMember.length; i<len; i++) {
				memberName = rowAxisMember[i];

				if ( !baseIsEmpty(memberName) ) {
					if (rowTotalPosition != "none" && memberName.toString().substr(1) == allMemberId ) {
						if ( allMemberDisplayWithOwnName ) {
							var txt = NxPivotUtil.replaceBraces(totalText, [rowAxisMember[i-1]]);
							resultDs.setColumn(row, i, txt);

						} else {
							resultDs.setColumn(row, i, totalText);
						}

						hasRowAllMember = true;

					} else {
						resultDs.setColumn(row, i, memberName);
						// row axis - drill down 표시를 위한 정보 지정
						
						if ( i < (rowAxisFieldCount-1) ) {
							if ( row == 0 || (row > 0 && memberName != rowAxisMembers[row-1][i]) ) {
								
								//row axis - drill down 표시를 위한 정보 지정 ★★★★ "추후 적용!!!"
								resultDs.setColumn(row, "_"+rowAxisFields[i]+"_BACKGROUND", drillDownOpenBg);
							}
						}

						node = node.getChild(memberName);
						rowPath += "["+memberName+"]";
					}
				}
			}

			if ( !hasRowAllMember ) {
				// [ 'all' member 가 포함되지 않은 행 ]
				// row axis 기준으로 생성된 node 에 존재하는
				// col axis 축에 표시될 node (부분합포함) 를 찾아
				// values 값을 추출하여 집계한 후 데이터셋에 세팅.
				pUtil.setColumnDataByNode(cube, values, resultDs, row, node.depth+1, node, columnIndexMap);

			} else {

				for (var i=0; i<colAxisMemberCnt; i++) {
					colAxisMember = colAxisMembers[i];
					colPath = "";
					findNode = null;
					hasColAllMember = false;

					for (var j=0,len=colAxisMember.length; j<len; j++) {
						memberName = colAxisMember[j];
						if ( memberName.toString().substr(1) == allMemberId ) {
							hasColAllMember = true;
							break;
						}
					}

					if ( !hasColAllMember ) {
						// [ 'all' member 가 포함된 행 - 'all' member 가 포함지않은 칼럼 ]
						// col axis 기준으로 생성된 node 에 존재하는
						// row axis 축의 부분합 노드를 찾아
						// values 값을 추출하여 집계한 후 데이터셋에 세팅.

						// col Axis 에 dimension이 없는 경우 (member가 empty)
						if ( colAxisMemberCnt == 1 && baseIsEmpty(colAxisMember[0]) ) {
							colPath = "";
						} else {
							colPath = "["+colAxisMember.join("][")+"]";
						}

						findNode = pathToNodeMap["[root]"+colPath+rowPath];

					} else {
						// [ 'all' member 가 포함된 행 - 'all' member 가 포함된 칼럼 ]
						// row axis 축의 dimension 을 마지막부터 제거하여 생성한 노드에
						// 존재하는 col axis 축의 부분합 노드를 찾아
						// values 값을 추출하여 집계한 후 데이터셋에 세팅.
						var colAllMembers = [];
						for (var j=colAxisMember.length-1; j>=0; j--) {
							memberName = colAxisMember[j];

							if ( !baseIsEmpty(memberName)  &&  colTotalPosition != "none"  && memberName.toString().substr(1) != allMemberId ) {	
								colAllMembers[colAllMembers.length] = "["+memberName+"]";
							}
						}
						colPath = colAllMembers.reverse().join("");
						findNode = pathToNodeMap["[root]"+rowPath+colPath];
					}

					if ( findNode ) {
						for (var j=0; j<valuesCount; j++) {
							valueId = valueIdList[j];
							aggregator = map[valueId];
							colIndex = columnIndexMap[colPath + valueId];
							
							 aggValue = pUtil.getAggregateValue(cube, findNode, valueId, aggregator);
									
							resultDs.setColumn(row, "_ALL_MEMBER_DEPTH", node.depth);
							resultDs.setColumn(row, colIndex, aggValue);
						}
					}
				}
			}

			// grand total - right band 에 표시될 데이터 생성
			if ( colGrandtotalPosition != "none" ) {
				for (var i=0; i<valuesCount; i++)  {
					valueId = valueIdList[i];
					aggregator = map[valueId];
					aggValue = pUtil.getAggregateValue(cube, node, valueId, aggregator);
					
					resultDs.setColumn(row, "_GRAND_TOTAL_" + valueId, aggValue);
				}
			}
		}

		// grand total - summ band data
		if ( showGrandTotal ) {
			for (var i=0; i<colAxisMemberCnt; i++) {
				colAxisMember = colAxisMembers[i];
				colPath = "";
				findNode = null;
				hasColAllMember = false;

				for (var j=0,len=colAxisMember.length; j<len; j++) {
					memberName = colAxisMember[j];
					if ( memberName.toString().substr(1) == allMemberId ) {
						hasColAllMember = true;
						break;
					}
				}

				if ( !hasColAllMember ) {
					if ( colAxisMemberCnt == 1 && baseIsEmpty(colAxisMember[0]) ) {
						colPath = "";

					} else {
						colPath = "["+colAxisMember.join("][")+"]";
					}

					findNode = pathToNodeMap["[root]"+colPath];

				} else {
					var colAllMembers = [];
					for (var j=colAxisMember.length-1; j>=0; j--) {
						memberName = colAxisMember[j];

						if ( !baseIsEmpty(memberName) && memberName.toString().substr(1) != allMemberId ) {
							colAllMembers[colAllMembers.length] = "["+memberName+"]";
						}
					}
					colPath = colAllMembers.reverse().join("");
					findNode = pathToNodeMap["[root]"+colPath];
				}

				if(rowGrandtotalPosition != "none") {
					// const column 생성 및 데이터 지정
					for (var k=0; k<valuesCount; k++) {
						valueId = valueIdList[k];
						aggregator = map[valueId];
						aggValue = pUtil.getAggregateValue(cube, findNode, valueId, aggregator);
						
						resultDs.addConstColumn("_GRAND_TOTAL_" + i + "_" + valueId, aggValue);
					}				
				}	
			}

			if(colGrandtotalPosition != "none" && rowGrandtotalPosition != "none" ) {
				// row & col grand total
				for (var k=0; k<valuesCount; k++) {
					valueId = valueIdList[k];
					aggregator = map[valueId];
					aggValue = pUtil.getAggregateValue(cube, colAxisRootNode, valueId, aggregator);
					
					resultDs.addConstColumn("_GRAND_TOTAL_ALL_" + valueId, aggValue);
				}		
			}

		}
		
		//this._setPivotCSSData(cube);
				
		colAxisMember = null;
		rowAxisMember = null;
		colAxisMembers = null;
		rowAxisMembers = null;

		node = null;
		findNode = null;
		pathToNodeMap = null;
		aggValue = null;
		
		resultDs.set_rowposition(0);
		
//===============================================	

		rowTotalPosition = null;
		colTotalPosition = null;
		
		grdStyle = null;
		showGrandTotal = null;
		colGrandtotalPosition = null;
		rowGrandtotalPosition = null;
		totalText = null;
		allMemberId = null;
		allMemberDisplayWithOwnName = null;

		colAxisMembers = null;
		rowAxisMembers = null;
		colAxisMemberCnt = null;
		rowAxisMemberCnt = null;
		rowAxisFieldCount = null;
		baseIsEmpty = null;
		pUtil = null;
		map = null;
		aggregator = null;
		
		resultDs = null;	

		colAxisMember = null;
		rowAxisMember = null;
		memberName = null;
		columnName = null;
		columnValue = null;
		columnIndexMap = null;
		defaultColName = null;
		rowPath = null; 
		colPath = null;

		valueIdList = null;
		values = null;
		valuesCount = null;	

		colIndex = null;
		
		node = null;
		findNode = null;
		
		pathToNodeMap = null;
		hasRowAllMember = null;
		hasColAllMember = null;
		aggValue = null;
		drillDownOpenBg = null;
		
		config = null;
	};

	/**
	 * 결과데이터셋에서 사용되는 Cell별 CSS를 설정한다.
	 * @name _setPivotCSSData
	 * @function 
	 * @private
	 * @param {Cube} cube Cube 객체
	 * @memberOf NxPivotUtil.pivotUtil.
	 */
	_pUtil._setPivotCSSData = function(cube)
	{
		var colAxisFields = cube.colAxisFields;
		var colAxisMembers = cube.colAxisDisplayMembers;
		var colAxisMemberCnt = colAxisMembers.length;
		
		var rowAxisFields = cube.rowAxisFields;
		var rowAxisFieldCount = rowAxisFields.length;
		
		var valueIdList = cube.valueIdList;
		var values = cube.parent.config.values;
		var valuesCount = values.length;	
		var colGrandtotalPosition = cube.parent.config.colGrandtotalPosition;
		
		var allMemberId = cube.allMemberId;
		
		var defaultColName = colAxisFields.join("_");
		
		var colIndex;
		
		var baseIsEmpty = NxPivotUtil.isEmpty;
		
		var resultDs =  cube.pivotDataSource;
		
		var value;
		
		for (var i=0; i<colAxisMemberCnt; i++) {
			columnName = defaultColName + "_" + i;

			for (var j=0; j<valuesCount; j++) {
				valueId = valueIdList[j];
				resultDs.addColumn(columnName + "_" + valueId+"_CSS", "string");
			}
		}

		// right band 에 표시될 칼럼 생성
		if ( colGrandtotalPosition != "none" ) {
			for (var j=0; j<valuesCount; j++) {
				valueId = valueIdList[j];
				resultDs.addColumn("_GRAND_TOTAL_" + valueId+"_CSS", "string");
			}
		}
		
		for(var rowIdx=0;rowIdx<resultDs.getRowCountNF();rowIdx++)
		{
			_ALL_MEMBER_DEPTH = resultDs.getColumnNF(rowIdx, "_ALL_MEMBER_DEPTH");
			
			for (var i=0; i<colAxisMemberCnt; i++) {
				columnName = defaultColName + "_" + i;

				for (var j=0; j<valuesCount; j++) {
					valueId = valueIdList[j];
					
					if(baseIsEmpty(_ALL_MEMBER_DEPTH))
					{
						if(colAxisMembers[i].toString().indexOf(allMemberId)!=-1){
							resultDs.setColumnNF(rowIdx, columnName + "_" + valueId+"_CSS", "cell_total");
						}else
						{
							//value CSS함수 처리부
						}
					}else
					{
						resultDs.setColumnNF(rowIdx, columnName + "_" + valueId+"_CSS", "cell_total");
					}
				}
			}
			
			// right band 에 표시될 칼럼 생성
			if ( colGrandtotalPosition != "none" ) {
				for (var j=0; j<valuesCount; j++) {
					valueId = valueIdList[j];
					resultDs.setColumnNF(rowIdx, "_GRAND_TOTAL_" + valueId+"_CSS", "cell_total");
				}
			}
			
			if(baseIsEmpty(_ALL_MEMBER_DEPTH)==false){
				for (var j=_ALL_MEMBER_DEPTH;j<rowAxisFieldCount;j++){
					resultDs.setColumnNF(rowIdx, "_"+rowAxisFields[j]+"_BACKGROUND", "cell_total");
				}
			}
		}
		
		colAxisFields = null;
		colAxisMembers = null;
		colAxisMemberCnt = null;		
		rowAxisFields = null;
		rowAxisFieldCount = null;		
		valueIdList = null;
		values = null;
		valuesCount = null;	
		colGrandtotalPosition = null;		
		allMemberId = null;		
		defaultColName = null;		
		colIndex = null;		
		baseIsEmpty = null;		
		resultDs =  null;		
		value;
	};
	
	/**
	 * display member sorting.
	 * @name sortDisplayMembers.
	 * @function 
	 * @param {CubeNode} cube CubeNode.
	 * @param {object[]} axisFields axis Fields.
	 * @param {*[]} axisDisplayMembers axis display members.
	 * @param {string} totalPosition total 표시 위치.
	 * @return {*[]} sorted members.
	 * @memberOf NxPivotUtil.pivotUtil.
	 */
	_pUtil.sortDisplayMembers = function(cube, axisFields, axisDisplayMembers, totalPosition)
	{
		try{
			var sortDs = cube.sortDataSource;
			var dataSource = cube.parent.config.dataSource;
			var baseIsEmpty = NxPivotUtil.isEmpty;
			var emptyDataText = cube.parent.config.emptyDataText;
			
			sortDs.set_enableevent(false);
			sortDs.deleteAll();
			sortDs.clear();

			var columnName;
			var sortType   = "";
			var sortOrders = [];
			var sortKeys   = [];
			var sortValue  = "desc";
			var valueTypes = [];
			var valueType = "string";
			var sortId = "";
			var sortIds = [];
			var coulumId = "";
			var coulumIds = [];
			var changeColumn = "";
			var changeColumns = [];
			var value = "";
			var nFRow;
			
			for (var i=0,len=axisFields.length; i<len; i++) {
				sortValue = axisFields[i].sort;
				coulumId = axisFields[i].id;
				sortId = axisFields[i].sortId;
				
				
				columnName = "Column"+i;
				valueType = (axisFields[i].type == "number" ? "float" : "string");
				
				sortDs.addColumn(columnName, valueType);

				sortType = (sortValue == "desc" ? "-" : "+");
				coulumIds.push(coulumId);
				sortIds.push(sortId);
				sortOrders.push(sortValue);
				sortKeys.push(sortType+columnName);
				valueTypes.push(valueType);
			}

			var allMemberId = cube.allMemberId;
			var memberList, member;

			var firstChar = NxPivotUtil.ORDER_FIRST_CHAR;	
			var lastChar  = NxPivotUtil.ORDER_LAST_CHAR;
			for (var i=0,len=axisDisplayMembers.length; i<len; i++) {
				sortDs.addRow();

				memberList = axisDisplayMembers[i];
				for (var j=0,len2=memberList.length; j<len2; j++) {
					member = memberList[j];
					
					if(valueTypes[j]=="string"){
						if ( member == allMemberId ) {
							// 정렬을 위한 문자열 추가
							if ( sortOrders[j] == "asc" ) {
								member = (totalPosition=="first" ? firstChar : lastChar) + member;

							} else {
								member = (totalPosition=="first" ? lastChar : firstChar) + member;
							}

						} else if ( !baseIsEmpty(member) && member.toString().substr(1) == allMemberId ) {
							// Dimension 옵션 변경에 의해 재구성 할 경우
							if ( sortOrders[j] == "asc" ) {
								member = (totalPosition=="first" ? firstChar : lastChar) + allMemberId;

							} else {
								member = (totalPosition=="first" ? lastChar : firstChar) + allMemberId;
							}
						} else if(sortIds[j])
						{
							nFRow = dataSource.findRowExpr(coulumIds[j]+'=="'+member+'"');
							if(nFRow!=-1)
							{
								changeColumn = dataSource.getColumn(nFRow, sortIds[j]);
								
								changeColumns[changeColumn] = member;
								member = changeColumn;
							}
						}
					}else
					{
						if ( member == allMemberId ) {
							// 정렬을 위한 문자열 추가
							if ( sortOrders[j] == "asc" ) {
								member = (totalPosition=="first" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY);

							} else {
								member = (totalPosition=="first" ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY);
							}

						} else if ( !baseIsEmpty(member) && member.toString().substr(1) == allMemberId ) {
							// Dimension 옵션 변경에 의해 재구성 할 경우
							if ( sortOrders[j] == "asc" ) {
								member = (totalPosition=="first" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY);

							} else {
								member = (totalPosition=="first" ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY);
							}
						} else if(member==emptyDataText){
							member = Number.MIN_VALUE;
						} else if(sortIds[j])
						{
							nFRow = dataSource.findRowExpr(coulumIds[j]+'=="'+member+'"');
							if(nFRow!=-1)
							{
								changeColumn = dataSource.getColumn(nFRow, sortIds[j]);
								
								changeColumns[changeColumn] = member;
								member = changeColumn;
							}
						}
					}
					
					sortDs.setColumn(i, "Column"+j, member);
				}
			}
			sortDs.set_keystring("S:" + sortKeys.join(""));

			var sortMember = [];
			var sortMembers = [];

			if ( !NxPivotUtil.isEmpty(axisDisplayMembers) && sortDs.getRowCount() == 0 ) {
				sortMembers.push("");

			} else {
				var colCount = sortDs.getColCount();
				for (var i=0,len=sortDs.getRowCount(); i<len; i++) {
					sortMember = [];
					
					for (var j=0; j<colCount; j++) {
						value = baseIsEmpty(sortDs.getColumn(i, "Column"+j))==false?sortDs.getColumn(i, "Column"+j).toString():"";
						if(valueTypes[j]=="string"){
							if(sortIds[j])
							{
								changeColumn = changeColumns[value];
								
								if(changeColumn)sortMember[j] = changeColumns[value];
								else sortMember[j] = value;
								
							}else
							{
								sortMember[j] = value;
							}
							
						}else if(valueTypes[j]=="float"){
							if(value==Number.NEGATIVE_INFINITY){
								sortMember[j] = firstChar + allMemberId;
							}else if(value==Number.POSITIVE_INFINITY){	
								sortMember[j] = lastChar + allMemberId;
							}else if(value==(Number.MIN_VALUE)){	
								sortMember[j] = emptyDataText;
							}else if(sortIds[j]){
								changeColumn = changeColumns[value];
								
								if(changeColumn)sortMember[j] = changeColumns[value];
								else sortMember[j] = value;
								
							}else{
								sortMember[j] = value;
							}
						}else{
							if(sortIds[j]){
								changeColumn = changeColumns[value];
								
								if(changeColumn)sortMember[j] = changeColumns[value];
								else sortMember[j] = value;
								
							}else{
								sortMember[j] = value;
							}
						}
					}
					sortMembers.push(sortMember);
				}
			}
			sortDs.deleteAll();
			sortDs.clear();
			sortDs.set_enableevent(true);

			axisDisplayMembers = null;
			sortOrders = null;
			sortKeys = null;

			return sortMembers;
		}finally{
//===============================================	
			sortDs = null;
			dataSource = null;
			baseIsEmpty = null;
			emptyDataText = null;
			
			columnName = null;
			sortType   = null;
			sortOrders = null;
			sortKeys   = null;
			sortValue  = null;

			allMemberId = null;
			memberList = null; 
			member = null;

			firstChar = null;	
			lastChar  = null;

			sortMember = null;
			sortMembers = null;
			
			valueType = null;
			valueTypes = null;
			
			sortId = null;
			sortIds = null;
			coulumId = null;
			coulumIds = null;
			changeColumn = null;
			changeColumns = null;
			value = null;
		}
	};

	_pUtil = null;
	
	
	/*********************************************************************
	 * 함 수 명 	: gfn_CheckTime
	 * 함수설명 	: 현재의 시간을 return 한다.
	 * 입    력 	: 없음 		  	  
	 * 결    과 	: 현재의 시간을 return 한다.
	 *********************************************************************/
	NxPivotUtil.gfn_CheckTime = function()
	{
		var objDate = new Date();
		var strTime  = this.gfn_Right("0" + objDate.getHours(), 2);
			strTime += this.gfn_Right("0" + objDate.getMinutes(), 2);
			strTime += this.gfn_Right("0" + objDate.getSeconds(), 2);
			strTime += this.gfn_Right("0" + objDate.getMilliseconds(), 3);
			
		return strTime;
	}

	/*********************************************************************
	 * 함 수 명 	: gfn_Right
	 * 함수설명 	: 문자열의 오른쪽부분을 지정한 길이만큼 Return 한다.
	 * 입    력 	: strString	- 대상 문자열
	 *			  	  nSize		- 얻어올 크기. [Default Value = 0]
	 * 결    과 	: 오른쪽 부분이 얻어진 문자열.
	 *********************************************************************/
	NxPivotUtil.gfn_Right = function(strString, nSize)
	{
		var nStart 	= String(strString).length;
		var nEnd 	= Number(nStart) - Number(nSize);   
		var rtnVal 	= strString.substring(nStart, nEnd);

		return rtnVal;
	}

	/*******************************************************************************
	 * 함 수 명 	: gfn_diffTime
	 * 함수설명 	: 두 시간간의 차이 계산
	 * 입    력 	: sStartTime(HHmmss형태의 From 시간) 	( 예 : "033025" )
	 *              : sEndTime(HHmmss형태의 To 시간) 		( 예 : "034025" )
	 *              : sType(구하고자하는 타입(시, 분, 초)) ( 예 : "HH" )
	 * 결    과 	: integer
	******************************************************************************/
	NxPivotUtil.gfn_diffTime = function(sStartTime, sEndTime, sType)
	{
		this.nFrom_HH = parseInt(sStartTime.substring(0, 2));
		this.nFrom_mm = parseInt(sStartTime.substring(2, 4));
		this.nFrom_ss = parseInt(sStartTime.substring(4, 6));
		this.nFrom_ms = parseInt(sStartTime.substring(6, 9));
		
		this.nTo_HH = parseInt(sEndTime.substring(0, 2));
		this.nTo_mm = parseInt(sEndTime.substring(2, 4));
		this.nTo_ss = parseInt(sEndTime.substring(4, 6));
		this.nTo_ms = parseInt(sEndTime.substring(6, 9))+200;
		this.nFromTotal_ss = (this.nFrom_HH * 3600) + (this.nFrom_mm * 60) + this.nFrom_ss+(this.nFrom_ms*0.001);
		this.nToTotal_ss   = (this.nTo_HH * 3600) + (this.nTo_mm * 60) + this.nTo_ss+(this.nTo_ms*0.001);
		
		if(sType == "HH")
		{
			return (Math.floor((this.nToTotal_ss - this.nFromTotal_ss) / 3600000));
		} else if(sType == "mm") {
			return (Math.floor((this.nToTotal_ss - this.nFromTotal_ss) / 60000));
		} else if(sType == "ss") {
			
			return (parseFloat(this.nToTotal_ss) - parseFloat(this.nFromTotal_ss)).toString().substr(0, 5);
		}
	}
	
	delete _pFilter;
	delete _pUtil;
	delete _pNxPivot;
	
	nexacro.ToolbarButtonClickEventInfo = function (obj, id, postvalue, prevalue) {
		this.id = this.eventid = id || "ToolbarButtonClick";
		this.fromobject = this.fromreferenceobject = obj;

		this.postvalue = postvalue;
		this.prevalue = prevalue;
	};
	var _pToolbarButtonClickEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ToolbarButtonClickEventInfo);
	nexacro.ToolbarButtonClickEventInfo.prototype = _pToolbarButtonClickEventInfo;
	_pToolbarButtonClickEventInfo._type_name = "ToolbarButtonClickEventInfo";
	
	delete _pToolbarButtonClickEventInfo;
}