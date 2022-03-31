(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("settingpopup");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(1100,430);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsSettingPopupProperties", this);
            obj._setContents("<ColumnInfo><Column id=\"controlId\" type=\"STRING\" size=\"256\"/><Column id=\"lvl\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/><Column id=\"group\" type=\"STRING\" size=\"256\"/><Column id=\"scope\" type=\"STRING\" size=\"256\"/><Column id=\"displaytype\" type=\"STRING\" size=\"256\"/><Column id=\"edittype\" type=\"STRING\" size=\"256\"/><Column id=\"combodataset\" type=\"STRING\" size=\"256\"/><Column id=\"combocodecol\" type=\"STRING\" size=\"256\"/><Column id=\"combodatacol\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"controlId\">settingpopup</Col><Col id=\"lvl\">0</Col><Col id=\"value\"/><Col id=\"group\">settingpopup</Col><Col id=\"edittype\">none</Col><Col id=\"scope\">settingpopup</Col></Row><Row><Col id=\"controlId\">cssclass</Col><Col id=\"lvl\">1</Col><Col id=\"group\">settingpopup</Col><Col id=\"value\">NxPivot_popup</Col><Col id=\"edittype\">none</Col><Col id=\"scope\">settingpopup.cssclass</Col></Row><Row><Col id=\"controlId\">width</Col><Col id=\"lvl\">1</Col><Col id=\"group\">settingpopup</Col><Col id=\"value\">230</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col><Col id=\"scope\">settingpopup.width</Col></Row><Row><Col id=\"controlId\">height</Col><Col id=\"lvl\">1</Col><Col id=\"group\">settingpopup</Col><Col id=\"value\">250</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col><Col id=\"scope\">settingpopup.height</Col></Row><Row><Col id=\"controlId\">padding</Col><Col id=\"lvl\">1</Col><Col id=\"value\">10 10 10 10</Col><Col id=\"group\">settingpopup</Col><Col id=\"scope\">settingpopup.padding</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col></Row><Row><Col id=\"group\">settingpopup</Col><Col id=\"controlId\">buttonwidth</Col><Col id=\"lvl\">1</Col><Col id=\"value\">50</Col><Col id=\"scope\">settingpopup.buttonwidth</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col></Row><Row><Col id=\"group\">settingpopup</Col><Col id=\"controlId\">buttonheight</Col><Col id=\"lvl\">1</Col><Col id=\"value\">25</Col><Col id=\"scope\">settingpopup.buttonheight</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col></Row><Row><Col id=\"controlId\">buttonalign</Col><Col id=\"lvl\">1</Col><Col id=\"value\">center</Col><Col id=\"group\">settingpopup</Col><Col id=\"scope\">settingpopup.buttonalign</Col><Col id=\"displaytype\">combocontrol</Col><Col id=\"edittype\">combo</Col><Col id=\"combodataset\">dsAlign</Col><Col id=\"combocodecol\">code</Col><Col id=\"combodatacol\">value</Col></Row><Row><Col id=\"group\">settingpopup</Col><Col id=\"controlId\">okbuttoncssclass</Col><Col id=\"lvl\">1</Col><Col id=\"value\">NxPivot_popup_submit</Col><Col id=\"scope\">settingpopup.okbuttoncssclass</Col><Col id=\"edittype\">none</Col></Row><Row><Col id=\"group\">settingpopup</Col><Col id=\"controlId\">cancelbuttoncssclass</Col><Col id=\"lvl\">1</Col><Col id=\"value\">NxPivot_popup_close</Col><Col id=\"scope\">settingpopup.cancelbuttoncssclass</Col><Col id=\"edittype\">none</Col></Row><Row><Col id=\"controlId\">lablecssclass</Col><Col id=\"lvl\">1</Col><Col id=\"value\">NxPivot_popup_subtitle</Col><Col id=\"group\">settingpopup</Col><Col id=\"scope\">settingpopup.lablecssclass</Col><Col id=\"edittype\">none</Col></Row><Row><Col id=\"controlId\">dateformat</Col><Col id=\"lvl\">1</Col><Col id=\"value\">yyyy-MM-dd</Col><Col id=\"group\">settingpopup</Col><Col id=\"scope\">settingpopup.dateformat</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsAlign", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">center</Col><Col id=\"value\">center</Col></Row><Row><Col id=\"code\">right</Col><Col id=\"value\">right</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new ImageViewer("btnSpliter",null,"0","10",null,"400","0",null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_cursor("e-resize");
            obj.set_cssclass("NxPivot_comp_splitterH");
            this.addChild(obj.name, obj);

            obj = new Grid("grdControlList","btnSpliter:0","0",null,null,"0","0",null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_treeinitstatus("expand,all");
            obj.set_treeusebutton("use");
            obj.set_treeusecheckbox("false");
            obj.set_treeuseline("false");
            obj.set_treeuseimage("false");
            obj.set_cellsizingtype("col");
            obj.set_cellsizebandtype("allband");
            obj.set_autofittype("col");
            obj.set_autoenter("select");
            obj.set_autoupdatetype("itemselect");
            obj.set_binddataset("dsSettingPopupProperties");
            obj.set_cssclass("grd_nxPv_treeGrid");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"180\" band=\"left\"/><Column size=\"48\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell/><Cell col=\"1\"/></Band><Band id=\"body\"><Cell text=\"bind:controlId\" displaytype=\"treeitemcontrol\" edittype=\"tree\" treelevel=\"bind:lvl\" cssclass=\"expr:lvl==0?&quot;treeLv0&quot;:&quot;treeLv1&quot;\"/><Cell col=\"1\" text=\"bind:value\" displaytype=\"expr:displaytype\" edittype=\"expr:edittype\" editautoselect=\"true\" combodataset=\"bind:combodataset\" combocodecol=\"bind:combocodecol\" combodatacol=\"bind:combodatacol\" cssclass=\"expr:lvl==0?&quot;treeLv0&quot;:&quot;treeLv1&quot;\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Div("divSettingPopup","0","0",null,null,"btnSpliter:0","0",null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("Div00");
            obj.set_cssclass("div_nxPv_conBorder");
            this.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1100,430,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("settingpopup.xfdl", function() {
        this.isEmpty = function(value){
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
        }

        this.isString = function(value) {
        	return typeof value === 'string';
        };

        this.isArray = function(value) {
        	return Array.isArray(value);
        };

        this.isObject = function(value) {
        	if ( value === null || value === undefined ) return false;

        	// nexacro Component
        	if ( this.isXComponent(value) ) return false;

        	// nexacro Object (e.g. Dataset)
        	if( value instanceof nexacro.Object ) return false;

        	var type = typeof value;
        	return typeof value == "object" &&
        		   'constructor' in value &&
        		   value.constructor === Object;

        	//return type === 'function' || type === 'object' && !!value;
        };

        this.isXComponent = function(value) {
        	if ( value === null || value === undefined  ) return false;

        	return value instanceof nexacro.Component;
        };

        this.fn_makePropertiesData = function(obj, path){

        	var scope;
        	var nFRow;
        	this.dsSettingPopupProperties.set_enableevent(false);
        	for(scope in obj){
        		if(typeof obj[scope] ==="object"){
        			path += "." + scope;

        			this.fn_makePropertiesData(obj[scope], path);
        		}else if(typeof obj[scope] ==="string"){

        			nFRow = this.dsSettingPopupProperties.findRow("scope", path+"."+scope);

        			if(nFRow>-1){

        				this.dsSettingPopupProperties.setColumn(nFRow, "value", obj[scope]);
        			}
        		}
        	}
        	this.dsSettingPopupProperties.set_enableevent(true);
        }

        this.settingpopup_onload = function(obj,e)
        {
        	if(this.parent.name!="divSettingPopup")
        	{
        		this.createSettingPopup();
        	}
        };

        this.makeSettingPopupDataByDataset = function(){
        	this.dsSettingPopupProperties.reset();
        }

        this.makeSettingPopupDataByConfig = function(settingpopup){
        	this.fn_makePropertiesData(settingpopup, "settingpopup");
        }

        this.createSettingPopup = function(){

        	this.settingpopup = {
        							"cssclass" : this.getFindData(this.dsSettingPopupProperties, "settingpopup.cssclass", "value"),
        							"width" : this.getFindData(this.dsSettingPopupProperties, "settingpopup.width", "value"),
        							"height" : this.getFindData(this.dsSettingPopupProperties, "settingpopup.height", "value"),
        							"padding" : this.getFindData(this.dsSettingPopupProperties, "settingpopup.padding", "value"),
        							"buttonwidth" : this.getFindData(this.dsSettingPopupProperties, "settingpopup.buttonwidth", "value"),
        							"buttonheight" : this.getFindData(this.dsSettingPopupProperties, "settingpopup.buttonheight", "value"),
        							"buttonalign" : this.getFindData(this.dsSettingPopupProperties, "settingpopup.buttonalign", "value"),
        							"okbuttoncssclass" : this.getFindData(this.dsSettingPopupProperties, "settingpopup.okbuttoncssclass", "value"),
        							"cancelbuttoncssclass" : this.getFindData(this.dsSettingPopupProperties, "settingpopup.cancelbuttoncssclass", "value"),
        							"labelcssclass" : this.getFindData(this.dsSettingPopupProperties, "settingpopup.lablecssclass", "value"),
        							"dateformat" : this.getFindData(this.dsSettingPopupProperties, "settingpopup.dateformat", "value")
        	};
        }

        this.removeSettingPopupComp = function(){
        	var i;
        	var parentComp = this.divSettingPopup.form;
        	var comps = parentComp.components;
        	var count = comps.length;

        	for(i=count-1;i>=0;i--){
        		parentComp.removeChild(comps[i].name);
        	}
        }

        this.createSettingPopupComp = function(){

        	this.divSettingPopup.set_visible(false);

        	this.removeSettingPopupComp();

        	var difHeight = 20;
        	var difGap = 5;
        	var cssclass = this.settingpopup.cssclass;
        	var width = nexacro.toNumber(this.settingpopup.width);
        	var height = nexacro.toNumber(this.settingpopup.height);
        	var padding = this.settingpopup.padding.split(" ");
        	var buttonwidth = nexacro.toNumber(this.settingpopup.buttonwidth);
        	var buttonheight = nexacro.toNumber(this.settingpopup.buttonheight);
        	var buttonalign = this.settingpopup.buttonalign;
        	var okbuttoncssclass = this.settingpopup.okbuttoncssclass;
        	var cancelbuttoncssclass = this.settingpopup.cancelbuttoncssclass;
        	var labelcssclass = this.settingpopup.labelcssclass;
        	var dateformat = this.settingpopup.dateformat;
        	var paddLeft = nexacro.toNumber(padding[0]);
        	var paddTop = nexacro.toNumber(padding[1]);
        	var paddRight = nexacro.toNumber(padding[2]);
        	var paddBottom = nexacro.toNumber(padding[3]);

        	var compLeft;
        	var compTop;
        	var compWidth;
        	var compHeight;
        	var compRight;
        	var compBottom;
        	var objComp;

        	var objSettingPopupComp = this.createComp("settingpopup", cssclass, 10, 10, width, height, null, null, "", "DIV", this.divSettingPopup);

        	objSettingPopupComp.set_border("1px solid #000000");

        	compLeft = paddLeft;
        	compTop = paddTop;
        	compWidth = null;
        	compHeight = difHeight;
        	compRight = paddRight;
        	compBottom = null;

        	this.createComp("stFilterLabel", labelcssclass, compLeft, compTop, compWidth, compHeight, compRight, compBottom, "항목필터", "STATIC", objSettingPopupComp);

        	compLeft = paddLeft;
        	compTop = compTop + difHeight + difGap;
        	compWidth = 80;
        	compHeight = difHeight;
        	compRight = null;
        	compBottom = null;

        	objComp = this.createComp("cbType", "", compLeft, compTop, compWidth, compHeight, compRight, compBottom, "", "COMBO", objSettingPopupComp);

        	compLeft = objComp.name+":"+difGap;
        	compWidth = null;
        	compHeight = difHeight;
        	compRight = paddRight;
        	compBottom = null;

        	this.createComp("edFilter", "", compLeft, compTop, compWidth, compHeight, compRight, compBottom, "", "EDIT", objSettingPopupComp);

        	compLeft = paddLeft;
        	compTop = compTop + difHeight + difGap;
        	compWidth = 60;
        	compHeight = difHeight;
        	compRight = null;
        	compBottom = null;

        	objComp = this.createComp("stSearchLabel", labelcssclass, compLeft, compTop, compWidth, compHeight, compRight, compBottom, "검색", "STATIC", objSettingPopupComp);
        	//this.createComp("settingpopup", cssclass, 10, 10, width, height, null, null, "", "DIV", this.divSettingPopup);

        	compLeft = objComp.name+":"+difGap;
        	compWidth = null;
        	compHeight = difHeight;
        	compRight = paddRight;
        	compBottom = null;

        	this.createComp("edSearch", "", compLeft, compTop, compWidth, compHeight, compRight, compBottom, "", "EDIT", objSettingPopupComp);

        	compLeft = paddLeft;
        	compTop = compTop + difHeight + difGap;
        	compWidth = null;
        	compHeight = null;
        	compRight = paddRight;
        	compBottom = buttonheight + paddBottom + difGap;

        	this.createComp("grdSearch", "", compLeft, compTop, compWidth, compHeight, compRight, compBottom, "", "GRID", objSettingPopupComp);

        	if(buttonalign=="center")
        	{
        		compLeft = (width/2) - ((buttonwidth*2+difGap)/2);
        		compRight = null;
        	}else
        	{
        		compLeft = null;
        		compRight = paddRight + buttonwidth + difGap;
        	}

        	compTop = null;
        	compWidth = buttonwidth;
        	compHeight = buttonheight;
        	compBottom = paddBottom;

        	objComp = this.createComp("btnOk", okbuttoncssclass, compLeft, compTop, compWidth, compHeight, compRight, compBottom, "적용", "BUTTON", objSettingPopupComp);

        	compLeft = objComp.name+":"+difGap;
        	compTop = null;
        	compWidth = buttonwidth;
        	compHeight = buttonheight;
        	compRight = null;
        	compBottom = paddBottom;

        	this.createComp("btnCancel", cancelbuttoncssclass, compLeft, compTop, compWidth, compHeight, compRight, compBottom, "닫기", "BUTTON", objSettingPopupComp);

        	this.divSettingPopup.set_visible(true);
        }

        this.createComp = function(id, cssclass, left, top, width, height, right, bottom, text, type, parent){

        	var objComp;

        	if(type=="DIV")objComp = new Div();
        	else if(type=="STATIC")objComp = new Static();
        	else if(type=="BUTTON")objComp = new Button();
        	else if(type=="COMBO")objComp = new Combo();
        	else if(type=="EDIT")objComp = new Edit();
        	else if(type=="GRID")objComp = new Grid();

        	objComp.init(id, left, top, width, height, right, bottom);
        	parent.form.addChild(objComp.name, objComp);
        	objComp.show();

        	if(this.isEmpty(cssclass)==false)this.setCompCssClass(objComp, cssclass);
        	if(this.isEmpty(text)==false)objComp.set_text(text);

        	return objComp;
        }

        this.setCompCssClass = function(obj, cssclass){

        	var property;
        	if(this.isEmpty(cssclass)==true){
        		return;
        	}

        	if(this.isEmpty(this.parent.parent._cssclasslist[cssclass].properties)==true)
        	{
        		return;
        	}

        	//nexacro.__onNexacroStudioError(cssclass);
        	//nexacro.__onNexacroStudioError(JSON.stringify(this.parent.parent._cssclasslist, null, "\t"));
        	var cssclassdata = JSON.parse(this.parent.parent._cssclasslist[cssclass].properties);

        	for(property in cssclassdata){
        		if(property == "background"){
        			if(cssclass.indexOf("NxPivot_axisArea_title")>-1)
        				cssclassdata[property] = cssclassdata[property].replace("center 50%", "left center");
        			else if(cssclass=="NxPivot_axisArea_item_setting")
        				cssclassdata[property] = cssclassdata[property].replace("center 50%", "left center");
        		}
        		//nexacro.__onNexacroStudioError(property);
        		obj["set_"+property](cssclassdata[property]);

        	}
        	//nexacro.__onNexacroStudioError(cssclassdata);
        }

        this.getFindData = function(obj, scope, columnId){
        	var sRtn;
        	var nFRow = obj.findRow("scope", scope);
        	if(nFRow == -1) return "";

        	sRtn = obj.getColumn(nFRow, columnId);

        	return sRtn;
        }

        this.makeSettingPopupJsonData = function(){
        	this.createSettingPopup();
        	return JSON.stringify(this.settingpopup, null, "\t");
        }

        this.dsSettingPopupProperties_oncolumnchanged = function(obj,e)
        {
        	this.createSettingPopup();
        	this.createSettingPopupComp();
        	this.parent.parent.callNotify_ContentsChange();
        };

        this.btnSpliter_onlbuttondown = function(obj,e)
        {
        	obj.orgLeft = nexacro.toNumber(obj.getOffsetLeft());

        	this.dragData = {
        						targetComp : obj,
        						x : e.screenx,
        						y : e.screeny,
        						status : "drag"
        					}
        };

        this.btnSpliter_onlbuttonup = function(obj,e)
        {
        	if(this.dragData!=null)
        	{
        		if(this.dragData.status=="dragmove"){
        			e.preventDefault();
        			e.stopPropagation();
        		}
        		this.dragData = null;
        	}
        };

        this.settingpopup_onmousemove = function(obj,e)
        {
        	var moveX;
        	var nLeft;

        	if(this.dragData!=null)
        	{
        		this.dragData.status = "dragmove";
         		moveX = (e.screenx - this.dragData.x);

        		nLeft = this.dragData.targetComp.orgLeft + moveX;

        		this.dragData.targetComp.move(nLeft, this.dragData.targetComp.getOffsetTop());
        		this.resetScroll();
        	}
        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.settingpopup_onload,this);
            this.addEventHandler("onmousemove",this.settingpopup_onmousemove,this);
            this.btnSpliter.addEventHandler("onlbuttondown",this.btnSpliter_onlbuttondown,this);
            this.btnSpliter.addEventHandler("onlbuttonup",this.btnSpliter_onlbuttonup,this);
            this.dsSettingPopupProperties.addEventHandler("oncolumnchanged",this.dsSettingPopupProperties_oncolumnchanged,this);
        };

        this.loadIncludeScript("settingpopup.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
