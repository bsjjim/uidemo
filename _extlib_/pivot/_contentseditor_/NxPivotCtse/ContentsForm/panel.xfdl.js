(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("panelForm");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(1100,430);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsProperties", this);
            obj._setContents("<ColumnInfo><Column id=\"controlId\" type=\"STRING\" size=\"256\"/><Column id=\"lvl\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/><Column id=\"group\" type=\"STRING\" size=\"256\"/><Column id=\"scope\" type=\"STRING\" size=\"256\"/><Column id=\"displaytype\" type=\"STRING\" size=\"256\"/><Column id=\"edittype\" type=\"STRING\" size=\"256\"/><Column id=\"combodataset\" type=\"STRING\" size=\"256\"/><Column id=\"combocodecol\" type=\"STRING\" size=\"256\"/><Column id=\"combodatacol\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"controlId\">toolbar</Col><Col id=\"lvl\">0</Col><Col id=\"group\">panel.toolbar</Col><Col id=\"edittype\">none</Col><Col id=\"scope\">panel.toolbar</Col></Row><Row><Col id=\"controlId\">size</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel.toolbar</Col><Col id=\"value\">28</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col><Col id=\"scope\">panel.toolbar.size</Col></Row><Row><Col id=\"controlId\">padding</Col><Col id=\"lvl\">1</Col><Col id=\"value\">3 3 3 3</Col><Col id=\"group\">panel.toolbar</Col><Col id=\"scope\">panel.toolbar.padding</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col></Row><Row><Col id=\"controlId\">gap</Col><Col id=\"lvl\">1</Col><Col id=\"value\">2</Col><Col id=\"group\">panel.toolbar</Col><Col id=\"scope\">panel.toolbar.gap</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col></Row><Row><Col id=\"controlId\">buttonsize</Col><Col id=\"lvl\">1</Col><Col id=\"value\">20</Col><Col id=\"group\">panel.toolbar</Col><Col id=\"scope\">panel.toolbar.buttonsize</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col></Row><Row><Col id=\"controlId\">cssclass</Col><Col id=\"lvl\">1</Col><Col id=\"value\">NxPivot_toolbarArea</Col><Col id=\"group\">panel.toolbar</Col><Col id=\"scope\">panel.toolbar.cssclass</Col><Col id=\"edittype\">none</Col></Row><Row><Col id=\"controlId\">lbuttons</Col><Col id=\"lvl\">0</Col><Col id=\"group\">panel.toolbar.lbuttons</Col><Col id=\"scope\">panel.toolbar.lbuttons</Col><Col id=\"edittype\">none</Col></Row><Row><Col id=\"controlId\">rbuttons</Col><Col id=\"lvl\">0</Col><Col id=\"group\">panel.toolbar.rbuttons</Col><Col id=\"scope\">panel.toolbar.rbuttons</Col><Col id=\"edittype\">none</Col></Row><Row><Col id=\"controlId\">items</Col><Col id=\"lvl\">0</Col><Col id=\"group\">panel.items</Col><Col id=\"edittype\">none</Col><Col id=\"scope\">panel.items</Col></Row><Row><Col id=\"controlId\">size</Col><Col id=\"lvl\">1</Col><Col id=\"value\">120</Col><Col id=\"group\">panel.items</Col><Col id=\"scope\">panel.items.size</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col></Row><Row><Col id=\"controlId\">cssclass1</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel.items</Col><Col id=\"edittype\">none</Col><Col id=\"value\">NxPivot_axisArea1</Col><Col id=\"scope\">panel.items.cssclass1</Col></Row><Row><Col id=\"controlId\">cssclass2</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel.items</Col><Col id=\"edittype\">none</Col><Col id=\"value\">NxPivot_axisArea2</Col><Col id=\"scope\">panel.items.cssclass2</Col></Row><Row><Col id=\"controlId\">padding</Col><Col id=\"lvl\">1</Col><Col id=\"value\">5 5 5 5</Col><Col id=\"group\">panel.items</Col><Col id=\"scope\">panel.items.padding</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col></Row><Row><Col id=\"controlId\">gap</Col><Col id=\"lvl\">1</Col><Col id=\"value\">5</Col><Col id=\"group\">panel.items</Col><Col id=\"scope\">panel.items.gap</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col></Row><Row><Col id=\"controlId\">titlebarsize</Col><Col id=\"lvl\">1</Col><Col id=\"value\">15</Col><Col id=\"group\">panel.items</Col><Col id=\"scope\">panel.items.titlebarsize</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col></Row><Row><Col id=\"controlId\">titlebarcssclass</Col><Col id=\"lvl\">1</Col><Col id=\"value\">NxPivot_axisArea_title</Col><Col id=\"group\">panel.items</Col><Col id=\"scope\">panel.items.titlebarcssclass</Col><Col id=\"edittype\">none</Col></Row><Row><Col id=\"controlId\">indicatorwidth</Col><Col id=\"lvl\">1</Col><Col id=\"value\">16</Col><Col id=\"group\">panel.items</Col><Col id=\"scope\">panel.items.indicatorwidth</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col></Row><Row><Col id=\"controlId\">indicatorheight</Col><Col id=\"lvl\">1</Col><Col id=\"value\">42</Col><Col id=\"group\">panel.items</Col><Col id=\"scope\">panel.items.indicatorheight</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col></Row><Row><Col id=\"controlId\">indicatorcssclass</Col><Col id=\"lvl\">1</Col><Col id=\"value\">NxPivot_drag_indicator</Col><Col id=\"group\">panel.items</Col><Col id=\"scope\">panel.items.indicatorcssclass</Col><Col id=\"edittype\">none</Col></Row><Row><Col id=\"controlId\">item</Col><Col id=\"lvl\">0</Col><Col id=\"group\">panel.items.item</Col><Col id=\"edittype\">none</Col><Col id=\"scope\">panel.items.item</Col></Row><Row><Col id=\"controlId\">width</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel.items.item</Col><Col id=\"value\">150</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col><Col id=\"scope\">panel.items.item.width</Col></Row><Row><Col id=\"controlId\">height</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel.items.item</Col><Col id=\"value\">25</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col><Col id=\"scope\">panel.items.item.height</Col></Row><Row><Col id=\"controlId\">padding</Col><Col id=\"lvl\">1</Col><Col id=\"value\">6 6 6 6</Col><Col id=\"group\">panel.items.item</Col><Col id=\"scope\">panel.items.item.padding</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col></Row><Row><Col id=\"controlId\">gap</Col><Col id=\"lvl\">1</Col><Col id=\"value\">4</Col><Col id=\"group\">panel.items.item</Col><Col id=\"scope\">panel.items.item.gap</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col></Row><Row><Col id=\"controlId\">cssclass</Col><Col id=\"lvl\">1</Col><Col id=\"value\">NxPivot_axisArea_item</Col><Col id=\"group\">panel.items.item</Col><Col id=\"scope\">panel.items.item.cssclass</Col><Col id=\"edittype\">none</Col></Row><Row><Col id=\"controlId\">sortasccssclass</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel.items.item</Col><Col id=\"edittype\">none</Col><Col id=\"value\">NxPivot_axisArea_item_asc</Col><Col id=\"scope\">panel.items.item.sortasccssclass</Col></Row><Row><Col id=\"controlId\">sortdesccssclass</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel.items.item</Col><Col id=\"edittype\">none</Col><Col id=\"value\">NxPivot_axisArea_item_desc</Col><Col id=\"scope\">panel.items.item.sortdesccssclass</Col></Row><Row><Col id=\"controlId\">filtercsscalss</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel.items.item</Col><Col id=\"edittype\">none</Col><Col id=\"value\">NxPivot_axisArea_item_filter</Col><Col id=\"scope\">panel.items.item.filtercssclass</Col></Row><Row><Col id=\"controlId\">aggregatorcssclass</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel.items.item</Col><Col id=\"edittype\">none</Col><Col id=\"value\">NxPivot_axisArea_item_aggregator</Col><Col id=\"scope\">panel.items.item.aggregatorcssclass</Col></Row><Row><Col id=\"controlId\">settingcssclass</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel.items.item</Col><Col id=\"edittype\">none</Col><Col id=\"value\">NxPivot_axisArea_item_setting</Col><Col id=\"scope\">panel.items.item.settingcssclass</Col></Row><Row><Col id=\"value\">NxPivot_axisArea_item_name</Col><Col id=\"controlId\">namecssclass</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel.items.item</Col><Col id=\"scope\">panel.items.item.namecssclass</Col><Col id=\"edittype\">none</Col></Row><Row><Col id=\"controlId\">sortsize</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel.items.item</Col><Col id=\"value\">16</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col><Col id=\"scope\">panel.items.item.sortsize</Col></Row><Row><Col id=\"controlId\">filtersize</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel.items.item</Col><Col id=\"value\">16</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col><Col id=\"scope\">panel.items.item.filtersize</Col></Row><Row><Col id=\"controlId\">aggregatorsize</Col><Col id=\"lvl\">1</Col><Col id=\"value\">20</Col><Col id=\"group\">panel.items.item</Col><Col id=\"scope\">panel.items.item.aggregatorsize</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col></Row><Row><Col id=\"controlId\">buttonsize</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel.items.item</Col><Col id=\"value\">16</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col><Col id=\"scope\">panel.items.item.buttonsize</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsPopMenuPanelToolbar", this);
            obj._setContents("<ColumnInfo><Column id=\"menuId\" type=\"STRING\" size=\"256\"/><Column id=\"menuText\" type=\"STRING\" size=\"256\"/><Column id=\"menuLvl\" type=\"STRING\" size=\"256\"/><Column id=\"menuEnable\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"menuId\">01</Col><Col id=\"menuText\">Add Left Button</Col><Col id=\"menuLvl\">0</Col><Col id=\"menuEnable\">1</Col></Row><Row><Col id=\"menuText\">Add Right Button</Col><Col id=\"menuLvl\">0</Col><Col id=\"menuId\">02</Col><Col id=\"menuEnable\">1</Col></Row><Row><Col id=\"menuId\">03</Col><Col id=\"menuText\">Delete</Col><Col id=\"menuLvl\">0</Col><Col id=\"menuEnable\">0</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsToolbarButtonProperties", this);
            obj._setContents("<ColumnInfo><Column id=\"controlId\" type=\"STRING\" size=\"256\"/><Column id=\"lvl\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/><Column id=\"group\" type=\"STRING\" size=\"256\"/><Column id=\"scope\" type=\"STRING\" size=\"256\"/><Column id=\"displaytype\" type=\"STRING\" size=\"256\"/><Column id=\"edittype\" type=\"STRING\" size=\"256\"/><Column id=\"combodataset\" type=\"STRING\" size=\"256\"/><Column id=\"combocodecol\" type=\"STRING\" size=\"256\"/><Column id=\"combodatacol\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"controlId\">type</Col><Col id=\"lvl\">1</Col><Col id=\"value\">addnew</Col><Col id=\"group\">panel.toolbar.button</Col><Col id=\"scope\">panel.toolbar.button.type</Col><Col id=\"displaytype\">combocontrol</Col><Col id=\"edittype\">combo</Col><Col id=\"combodataset\">dsToolbarButtonType</Col><Col id=\"combocodecol\">code</Col><Col id=\"combodatacol\">value</Col></Row><Row><Col id=\"controlId\">id</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel.toolbar.button</Col><Col id=\"value\">addnew</Col><Col id=\"scope\">panel.toolbar.button.id</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col><Col id=\"combodataset\"/><Col id=\"combocodecol\"/><Col id=\"combodatacol\"/></Row><Row><Col id=\"controlId\">toggle</Col><Col id=\"lvl\">1</Col><Col id=\"value\">0</Col><Col id=\"group\">panel.toolbar.button</Col><Col id=\"scope\">panel.toolbar.button.toggle</Col><Col id=\"displaytype\">combocontrol</Col><Col id=\"edittype\">none</Col><Col id=\"combodataset\">dsYn</Col><Col id=\"combocodecol\">code</Col><Col id=\"combodatacol\">value</Col></Row><Row><Col id=\"controlId\">togglevalue</Col><Col id=\"lvl\">1</Col><Col id=\"value\">0</Col><Col id=\"group\">panel.toolbar.button</Col><Col id=\"scope\">panel.toolbar.button.togglevalue</Col><Col id=\"displaytype\">combocontrol</Col><Col id=\"edittype\">none</Col><Col id=\"combodataset\">dsBoolean</Col><Col id=\"combocodecol\">code</Col><Col id=\"combodatacol\">value</Col></Row><Row><Col id=\"controlId\">tooltip</Col><Col id=\"lvl\">1</Col><Col id=\"value\"/><Col id=\"group\">panel.toolbar.button</Col><Col id=\"scope\">panel.toolbar.button.tooltip</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col></Row><Row><Col id=\"controlId\">cssclass</Col><Col id=\"lvl\">1</Col><Col id=\"value\"/><Col id=\"group\">panel.toolbar.button</Col><Col id=\"scope\">panel.toolbar.button.cssclass</Col><Col id=\"edittype\">normal</Col><Col id=\"displaytype\">editcontrol</Col></Row><Row><Col id=\"controlId\">align</Col><Col id=\"lvl\">1</Col><Col id=\"value\"/><Col id=\"group\">panel.toolbar.button</Col><Col id=\"scope\">panel.toolbar.button.align</Col><Col id=\"displaytype\">combocontrol</Col><Col id=\"edittype\">combo</Col><Col id=\"combodataset\">dsAlign</Col><Col id=\"combocodecol\">code</Col><Col id=\"combodatacol\">value</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsToolbarButtonType", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/><Column id=\"toggle\" type=\"STRING\" size=\"256\"/><Column id=\"togglevalue\" type=\"STRING\" size=\"256\"/><Column id=\"tooltip\" type=\"STRING\" size=\"256\"/><Column id=\"cssclass\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">toolbarstatus</Col><Col id=\"value\">toolbarstatus</Col><Col id=\"toggle\">1</Col><Col id=\"tooltip\">패널접기, 패널 펼치기</Col><Col id=\"cssclass\">NxPivot_toolbarButton_show,NxPivot_toolbarButton_hide</Col><Col id=\"togglevalue\">0</Col></Row><Row><Col id=\"code\">execute</Col><Col id=\"value\">execute</Col><Col id=\"toggle\">0</Col><Col id=\"tooltip\">실행</Col><Col id=\"cssclass\">NxPivot_toolbarButton_execute</Col></Row><Row><Col id=\"code\">initialization</Col><Col id=\"value\">initialization</Col><Col id=\"toggle\">0</Col><Col id=\"tooltip\">초기화</Col><Col id=\"cssclass\">NxPivot_toolbarButton_init</Col></Row><Row><Col id=\"code\">autoexecute</Col><Col id=\"value\">autoexecute</Col><Col id=\"toggle\">1</Col><Col id=\"tooltip\">자동 실행 중지,자동 실행 사용</Col><Col id=\"cssclass\">NxPivot_toolbarButton_manual,NxPivot_toolbarButton_auto</Col><Col id=\"togglevalue\">0</Col></Row><Row><Col id=\"code\">rowsstatus</Col><Col id=\"value\">rowsstatus</Col><Col id=\"toggle\">1</Col><Col id=\"tooltip\">전체 row 펼치기,전체 row 접기</Col><Col id=\"cssclass\">NxPivot_toolbarButton_rowstatus_expand,NxPivot_toolbarButton_rowstatus_collapse</Col><Col id=\"togglevalue\">0</Col></Row><Row><Col id=\"code\">columnsstatus</Col><Col id=\"value\">columnsstatus</Col><Col id=\"toggle\">1</Col><Col id=\"tooltip\">전체 column 펼치기, 전체 column 접기</Col><Col id=\"cssclass\">NxPivot_toolbarButton_colstatus_expand,NxPivot_toolbarButton_colstatus_collapse</Col><Col id=\"togglevalue\">0</Col></Row><Row><Col id=\"code\">addnew</Col><Col id=\"value\">addnew</Col><Col id=\"toggle\">0</Col><Col id=\"tooltip\"/><Col id=\"cssclass\"/></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsLeftTopButtons", this);
            obj._setContents("<ColumnInfo><Column id=\"type\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsRightBottomButtons", this);
            obj._setContents("<ColumnInfo><Column id=\"type\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsAlign", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">left</Col><Col id=\"value\">left</Col></Row><Row><Col id=\"code\">right</Col><Col id=\"value\">right</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsYn", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">1</Col><Col id=\"value\">yes</Col></Row><Row><Col id=\"code\">0</Col><Col id=\"value\">no</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsBoolean", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">0</Col><Col id=\"value\">false</Col></Row><Row><Col id=\"code\">1</Col><Col id=\"value\">true</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new ImageViewer("btnSpliter",null,"0","10",null,"400","0",null,null,null,null,this);
            obj.set_taborder("1");
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
            obj.set_cssclass("grd_nxPv_treeGrid");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"180\" band=\"left\"/><Column size=\"48\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell/><Cell col=\"1\"/></Band><Band id=\"body\"><Cell text=\"bind:controlId\" displaytype=\"treeitemcontrol\" edittype=\"tree\" treelevel=\"bind:lvl\" cssclass=\"expr:lvl==0?&quot;treeLv0&quot;:&quot;treeLv1&quot;\"/><Cell col=\"1\" text=\"bind:value\" displaytype=\"expr:displaytype\" edittype=\"expr:edittype\" editautoselect=\"true\" combodataset=\"bind:combodataset\" combocodecol=\"bind:combocodecol\" combodatacol=\"bind:combodatacol\" cssclass=\"expr:lvl==0?&quot;treeLv0&quot;:&quot;treeLv1&quot;\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new PopupMenu("popMenuPanelToolbar","640","310","160","80",null,null,null,null,null,null,this);
            obj.set_captioncolumn("menuText");
            obj.set_idcolumn("menuId");
            obj.set_levelcolumn("menuLvl");
            obj.set_innerdataset("dsPopMenuPanelToolbar");
            obj.set_enablecolumn("menuEnable");
            this.addChild(obj.name, obj);

            obj = new Div("divContents","0","0",null,null,"btnSpliter:0","0",null,null,null,null,this);
            obj.set_taborder("2");
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
        this.registerScript("panel.xfdl", function() {
        this.selectComp = null;

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

        this.getUniqueId = function(prefix, separator)
        {
        	if ( this.isEmpty(prefix) ) prefix = "";
        	if ( this.isEmpty(separator) ) {
        		separator = 45;
        	} else {
        		separator = separator.charCodeAt(0);
        	}

        	var charcode = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102],
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

        this.getFindData = function(obj, scope, columnId){
        	var sRtn;
        	var nFRow = obj.findRow("scope", scope);
        	if(nFRow == -1) return "";

        	sRtn = obj.getColumn(nFRow, columnId);

        	return sRtn;
        }

        this.fn_makePropertiesData = function(obj, path){

        	var scope;
        	var nFRow;
        	this.dsProperties.set_enableevent(false);
        	for(scope in obj){
        		if(typeof obj[scope] ==="object"){

        			if(scope=="lbuttons"||scope=="rbuttons"){
        				this.fn_makePropertiesButtonData(obj[scope], path+"."+scope);
        			}else
        			{
        				this.fn_makePropertiesData(obj[scope], path+"."+scope);
        			}
        		}else if(typeof obj[scope] ==="string"){

        			nFRow = this.dsProperties.findRowNF("scope", path+"."+scope);
        			if(nFRow>-1){
        				this.dsProperties.setColumnNF(nFRow, "value", obj[scope]);
        			}
        		}
        	}
        	this.dsProperties.set_enableevent(true);
        }

        this.fn_makePropertiesButtonData = function(obj, path){

        	var sButtonId;
        	this.dsProperties.filter("");

        	if(path=="panel.toolbar.lbuttons"){
        		for(sButtonId in obj){
        			nFRow = this.dsProperties.findRow("scope", "panel.toolbar.rbuttons");

        			this.addToolbarButtonsPropertiesByConfig(nFRow, "left", sButtonId, obj[sButtonId]);

        			nFRow = this.dsLeftTopButtons.addRow();
        			this.dsLeftTopButtons.setColumn(nFRow, "type", path+"."+sButtonId);
        		}
        	}else if(path=="panel.toolbar.rbuttons"){
        		for(sButtonId in obj){
        			nFRow = this.dsProperties.findRow("scope", "panel.items");

        			this.addToolbarButtonsPropertiesByConfig(nFRow, "right", sButtonId, obj[sButtonId]);

        			nFRow = this.dsRightBottomButtons.addRow();
        			this.dsRightBottomButtons.setColumn(nFRow, "type", path+"."+sButtonId);
        		}
        	}
        };

        this.addToolbarButtonsPropertiesByConfig = function(nFRow, align, buttonId, obj){

        	var sGroup;

        	if(align=="left"){
        		sGroup = "panel.toolbar.lbuttons."+buttonId;
        	}else{
        		sGroup = "panel.toolbar.rbuttons."+buttonId;
        	}

        	if(obj.toggle=="1"){
        		if(!obj.togglevalue)obj.togglevalue = "0";
        	}

        	this.dsProperties.set_enableevent(false);
        	var nRow = this.dsProperties.insertRow(nFRow);
        	this.dsProperties.copyRow(nRow, this.dsToolbarButtonProperties, 6);
        	this.dsProperties.setColumn(nRow, "value", obj.align);
        	this.dsProperties.setColumn(nRow, "group", sGroup);
        	this.dsProperties.setColumn(nRow, "scope", sGroup+".align");

        	nRow = this.dsProperties.insertRow(nFRow);
        	this.dsProperties.copyRow(nRow, this.dsToolbarButtonProperties, 5);
        	this.dsProperties.setColumn(nRow, "value", obj.cssclass);
        	this.dsProperties.setColumn(nRow, "group", sGroup);
        	this.dsProperties.setColumn(nRow, "scope", sGroup+".cssclass");

        	if(obj.type=="addnew")this.dsProperties.setColumn(nRow, "edittype", "normal");
        	else this.dsProperties.setColumn(nRow, "edittype", "none");

        	nRow = this.dsProperties.insertRow(nFRow);
        	this.dsProperties.copyRow(nRow, this.dsToolbarButtonProperties, 4);
        	this.dsProperties.setColumn(nRow, "value", obj.tooltip);
        	this.dsProperties.setColumn(nRow, "group", sGroup);
        	this.dsProperties.setColumn(nRow, "scope", sGroup+".tooltip");

        	nRow = this.dsProperties.insertRow(nFRow);
        	this.dsProperties.copyRow(nRow, this.dsToolbarButtonProperties, 3);
        	this.dsProperties.setColumn(nRow, "value", obj.togglevalue);
        	this.dsProperties.setColumn(nRow, "group", sGroup);
        	this.dsProperties.setColumn(nRow, "scope", sGroup+".togglevalue");

        	if(obj.toggle=="1")this.dsProperties.setColumn(nRow, "edittype", "combo");
        	else this.dsProperties.setColumn(nRow, "edittype", "none");

        	nRow = this.dsProperties.insertRow(nFRow);
        	this.dsProperties.copyRow(nRow, this.dsToolbarButtonProperties, 2);
        	this.dsProperties.setColumn(nRow, "value", obj.toggle);
        	this.dsProperties.setColumn(nRow, "group", sGroup);
        	this.dsProperties.setColumn(nRow, "scope", sGroup+".toggle");

        	nRow = this.dsProperties.insertRow(nFRow);
        	this.dsProperties.copyRow(nRow, this.dsToolbarButtonProperties, 1);
        	this.dsProperties.setColumn(nRow, "value", obj.id);
        	this.dsProperties.setColumn(nRow, "group", sGroup);
        	this.dsProperties.setColumn(nRow, "scope", sGroup+".id");

        	nRow = this.dsProperties.insertRow(nFRow);
        	this.dsProperties.copyRow(nRow, this.dsToolbarButtonProperties, 0);
        	this.dsProperties.setColumn(nRow, "value", obj.type);
        	this.dsProperties.setColumn(nRow, "group", sGroup);
        	this.dsProperties.setColumn(nRow, "scope", sGroup+".type");
        	this.dsProperties.set_enableevent(true);
        }

        this.panel_onload = function(obj,e)
        {

        };

        this.makePanelDataByDataset = function()
        {
        	this.dsProperties.filter("");
        	this.dsProperties.reset();
        	this.dsLeftTopButtons.reset();
        	this.dsRightBottomButtons.reset();
        }

        this.makePanelDataByConfig = function(panel)
        {
        	this.fn_makePropertiesData(panel, "panel");
        }

        this.onloadPanel = function(type)
        {
        	this.dsProperties.filter("");
        	this.setProperties();
        	this.itemCount = this.getItemCount((this.getOffsetWidth()-this.grdControlList.getOffsetWidth())/4);

        	this.createPanel();
        	this.createPanelComp();
        }

        this.makePanelJsonData = function(){
        	var i, j;
        	var panel = {};
        	var arrScope;
        	var scope = panel;
        	var objJson;

        	this.dsProperties.filter("");

        	for(i=1;i<this.dsProperties.rowcount;i++)
        	{
        		arrScope = this.dsProperties.getColumn(i, "scope").split(".");
        		for(j=1;j<arrScope.length-1;j++)
        		{
        			if(this.isEmpty(scope[arrScope[j]])==true)
        			{

        				scope[arrScope[j]] = {};
        			}

        			scope = scope[arrScope[j]];

        		}
        		scope[arrScope[arrScope.length-1]] = this.dsProperties.getColumn(i, "value");
        		scope = panel;
        	}

        	return JSON.stringify(panel, null, "\t");
        }

        this.objcomp_onclick = function(obj, e)
        {
        	this.setSelectComp(obj);
        }

        this.setSelectComp = function(comp){

        	var sTemp;
        	if(this.selectComp!=null){
        		if(this.selectComp instanceof Div){
        			//this.selectComp.form.set_border(null);
        		}else{
        			//this.selectComp.set_border(null);
        		}

        		this.selectComp.parent.removeChild("selectDummyLeftComp");
        		this.selectComp.parent.removeChild("selectDummyTopComp");
        		this.selectComp.parent.removeChild("selectDummyRightComp");
        		this.selectComp.parent.removeChild("selectDummyBottomComp");
        	}

        	if(comp.name=="panelForm"){
        		this.selectComp = this.divPanel;
        	}else{
        		if(comp.type=="text"||comp.type=="button"||comp.type=="aggregator"||comp.type=="sort"||comp.type=="filter")
        		{
        			sTemp = comp.name.replace("txt", "").replace("btn", "").replace("img01", "").replace("img02", "")+"Item";
        			this.selectComp = comp.parent.components[sTemp];
        		}else
        		{
        			this.selectComp = comp;
        		}

        	}
        	var nLeft = nexacro.toNumber(this.selectComp.getOffsetLeft());
        	var nTop = nexacro.toNumber(this.selectComp.getOffsetTop());
        	var nWidth = nexacro.toNumber(this.selectComp.getOffsetWidth());
        	var nHeight = nexacro.toNumber(this.selectComp.getOffsetHeight());

        	var objLeft = new Static("selectDummyLeftComp", nLeft, nTop, 1, nHeight);

        	var objTop = new Static("selectDummyTopComp", nLeft, nTop, nWidth, 1);

        	var objRight = new Static("selectDummyBottomComp", nLeft+nWidth-1, nTop, 1, nHeight);

        	var objBottom = new Static("selectDummyRightComp", nLeft, nTop+nHeight-1, nWidth, 1);

        	objLeft.set_border("1px solid #000000");
        	objTop.set_border("1px solid #000000");
        	objRight.set_border("1px solid #000000");
        	objBottom.set_border("1px solid #000000");

        	this.selectComp.parent.addChild(objLeft.name, objLeft);
        	this.selectComp.parent.addChild(objTop.name, objTop);
        	this.selectComp.parent.addChild(objRight.name, objRight);
        	this.selectComp.parent.addChild(objBottom.name, objBottom);

        	objLeft.show();
        	objTop.show();
        	objRight.show();
        	objBottom.show();

        	if(this.selectComp instanceof Div){
        		//this.selectComp.form.set_border("1px solid #000000");
        	}else{
        		//this.selectComp.set_border("1px solid #000000");
        	}

        	this.dsProperties.filter("group=='"+this.selectComp.type+"'");
        }

        this.setProperties = function(){

        	this.panelSize = nexacro.toNumber(this.getFindData(this.dsProperties, "panel.items.size", "value"));
        	this.toolbarSize = nexacro.toNumber(this.getFindData(this.dsProperties, "panel.toolbar.size", "value"));
        	this.toolbarPadding = this.getFindData(this.dsProperties, "panel.toolbar.padding", "value").split(" ");
        	this.toolbarGap = this.getFindData(this.dsProperties, "panel.toolbar.gap", "value");
        	this.toolbarButtonSize = this.getFindData(this.dsProperties, "panel.toolbar.buttonsize", "value");
        	this.toolbarCssClass = this.getFindData(this.dsProperties, "panel.toolbar.cssclass", "value");
        	this.itemsCssClass1 = this.getFindData(this.dsProperties, "panel.items.cssclass1", "value");
        	this.itemsCssClass2 = this.getFindData(this.dsProperties, "panel.items.cssclass2", "value");
        	this.itemsPadding = this.getFindData(this.dsProperties, "panel.items.padding", "value").split(" ");
        	this.itemsGap = this.getFindData(this.dsProperties, "panel.items.gap", "value");
        	this.itemsTitleSize = this.getFindData(this.dsProperties, "panel.items.titlebarsize", "value");
        	this.itemsTitleCssClass = this.getFindData(this.dsProperties, "panel.items.titlebarcssclass", "value");

        	this.itemWidth = this.getFindData(this.dsProperties, "panel.items.item.width", "value");
        	this.itemHeight = this.getFindData(this.dsProperties, "panel.items.item.height", "value");
        	this.itemPadding = this.getFindData(this.dsProperties, "panel.items.item.padding", "value").split(" ");
        	this.itemGap = this.getFindData(this.dsProperties, "panel.items.item.gap", "value");
        	this.itemCssClass = this.getFindData(this.dsProperties, "panel.items.item.cssclass", "value");

        	this.itemSortAscCssClass = this.getFindData(this.dsProperties, "panel.items.item.sortasccssclass", "value");
        	this.itemSortDescCssClass = this.getFindData(this.dsProperties, "panel.items.item.sortdesccssclass", "value");
        	this.itemFilterCssClass = this.getFindData(this.dsProperties, "panel.items.item.filtercssclass", "value");
        	this.itemAggregatorCssClass = this.getFindData(this.dsProperties, "panel.items.item.aggregatorcssclass", "value");
        	this.itemSettingCssClass = this.getFindData(this.dsProperties, "panel.items.item.settingcssclass", "value");
        	this.itemNameCssClass = this.getFindData(this.dsProperties, "panel.items.item.namecssclass", "value");

        	this.itemSortSize = this.getFindData(this.dsProperties, "panel.items.item.sortsize", "value");
        	this.itemFilterSize = this.getFindData(this.dsProperties, "panel.items.item.filtersize", "value");
        	this.itemAggregatorSize = this.getFindData(this.dsProperties, "panel.items.item.aggregatorsize", "value");
        	this.itemButtonSize = this.getFindData(this.dsProperties, "panel.items.item.buttonsize", "value");
        }

        this.createPanelComp = function(){
        	var i;
        	var items;
        	var objItems;
        	var objPanel;
        	var panel = this.panel;

        	this.removePanelComp();

        	objPanel = this.createComp(panel, this);

        	this.createItems(objPanel, panel, "toolbar");
        	this.createItems(objPanel, panel, "fields", "전체");
        	this.createItems(objPanel, panel, "colAxis", "열");
        	this.createItems(objPanel, panel, "rowAxis", "행");
        	this.createItems(objPanel, panel, "values", "값");

        	if(this.selectComp==null)this.setSelectComp(this.divPanel);
        	else this.setSelectComp(this.selectComp);
        }

        this.removePanelComp = function(){

        	var objComp;

        	if(this.isEmpty(this.divPanel)==false){
        		this.removeChild("divPanel");
        	}
        }

        this.createItems = function(objPanel, panel, items, title){
        	var i;
        	var objItems = panel[items];
        	var objItemsComp = this.createComp(objItems, objPanel);
        	var lbuttons;
        	var rbuttons;
        	var objItem;
        	var objElem;

        	if(this.isEmpty(objItems)==false){
        		if(items=="toolbar"){
        			lbuttons = objItems.items.lbuttons;
        			rbuttons = objItems.items.rbuttons;
        			if(this.isEmpty(lbuttons)==false){
        				if(lbuttons.length>0){
        					for(i=0;i<lbuttons.length;i++){
        						objItem = lbuttons[i];
        						this.createComp(objItem, objItemsComp);
        					}
        				}
        			}

        			if(this.isEmpty(rbuttons)==false){
        				if(rbuttons.length>0){
        					for(i=0;i<rbuttons.length;i++){
        						objItem = rbuttons[i];
        						this.createComp(objItem, objItemsComp);
        					}
        				}
        			}
        		}else{
        			if(this.isEmpty(objItems.items.title)==false){
        				objItem = objItems.items.title;
        				objItemComp = this.createComp(objItem, objItemsComp, title);
        			}

        			objItem = objItems.items.item;

        			if(this.isEmpty(objItem)==false){
        				if(objItem.length>0){
        					for(i=0;i<objItem.length;i++){
        						objElem = objItem[i].itemElm;
        						this.createComp(objElem, objItemsComp);

        						objElem = objItem[i].textElm;
        						this.createComp(objElem, objItemsComp);

        						if(this.isEmpty(objItem[i].imgElm01)==false){
        							objElem = objItem[i].imgElm01;
        							this.createComp(objElem, objItemsComp);
        						}

        						if(this.isEmpty(objItem[i].imgElm02)==false){
        							objElem = objItem[i].imgElm02;
        							this.createComp(objElem, objItemsComp);
        						}

        						objElem = objItem[i].btnElm;
        						this.createComp(objElem, objItemsComp);
        					}
        				}
        			}
        		}
        	}
        }

        this.createComp = function(objItem, objParent, title){
        	var objComp;
        	var compType = objItem.comptype;
        	var cssclass;
        	if(compType=="DIV")objComp = new Div();
        	else if(compType=="STATIC")objComp = new Static();
        	else if(compType=="BUTTON")objComp = new Button();

        	objComp.init(objItem.id, objItem.left, objItem.top, objItem.width, objItem.height, objItem.right, objItem.bottom);
        	objParent.addChild(objComp.name, objComp);
        	objComp.show();

        	if(this.isEmpty(objItem.onsize)==false)objComp.addEventHandler("onsize", objItem.onsize, this);
        	if(this.isEmpty(objItem.onclick)==false)objComp.addEventHandler("onclick", objItem.onclick, this);
        	if(this.isEmpty(objItem.type)==false)objComp.type = objItem.type;
        	if(this.isEmpty(objItem.toggle)==false)objComp.toggle = objItem.toggle;
        	else objComp.toggle = 0;

        	if(this.isEmpty(objItem.cssclass)==false){
        		if(objComp.toggle==0){
        			cssclass = objItem.cssclass;
        		}else{
        			cssclass = objItem.cssclass.split(",")[objItem.togglevalue];
        		}
        	}

        	//objComp.set_cssclass(cssclass);
        	if(this.isEmpty(objItem.text)==false){
        		if(objComp.toggle==0){
        			if (this.isEmpty(title)==true)
        				objComp.set_text(objItem.text);
        			else objComp.set_text(title);
        		}else{

        			objComp.set_text(objItem.text.split(",")[objItem.togglevalue]);
        		}
        	}
        	if(this.isEmpty(objItem.tooltip)==false){
        		if(objComp.toggle==0){
        			objComp.set_tooltiptext(objItem.tooltip);
        		}else{
        			objComp.set_tooltiptext(objItem.tooltip.split(",")[objItem.togglevalue]);
        		}
        	}

        	if(this.isEmpty(this.selectComp)==false){
        		if(objComp.name==this.selectComp.name)this.selectComp = objComp;
        	}

        	this.setCompCssClass(objComp, cssclass);

        	return objComp;
        }

        this.setCompCssClass = function(obj, cssclass){

        	var property;
        	if(this.isEmpty(cssclass)==true){
        		return;
        	}
        	//nexacro.__onNexacroStudioError("["+cssclass+"]");

        	if(this.isEmpty(this.parent.parent._cssclasslist[cssclass])==true)
        	{
        		this.getUserCssInfo(cssclass);
        	}

        	if(this.isEmpty(this.parent.parent._cssclasslist[cssclass].properties)==true)
        	{
        		return;
        	}

        	var cssclassdata = JSON.parse(this.parent.parent._cssclasslist[cssclass].properties);

        	for(property in cssclassdata){
        		if(property == "background"){
        			if(cssclass.indexOf("NxPivot_axisArea_title")>-1)
        				cssclassdata[property] = cssclassdata[property].replace("center 50%", "left center");
        			else if(cssclass=="NxPivot_axisArea_item_setting")
        				cssclassdata[property] = cssclassdata[property].replace("center 50%", "left center");
        		}

        		obj["set_"+property](cssclassdata[property]);

        	}
        	//nexacro.__onNexacroStudioError(cssclassdata);
        }

        this.getUserCssInfo = function(cssclass){
        	var argList = {complist : []};
        	var arg = {};

        	arg = {comptype : "BUTTON", cssclass : cssclass, properties : []};

        	arg.properties[0] = "border";
        	arg.properties[1] = "edge";
        	arg.properties[2] = "background";
        	arg.properties[3] = "borderRadius";
        	arg.properties[4] = "boxShadow";
        	arg.properties[5] = "color";
        	arg.properties[6] = "cursor";
        	arg.properties[7] = "font";
        	arg.properties[8] = "letterSpacing";
        	arg.properties[9] = "opacity";
        	arg.properties[10] = "wordSpacing";

        	arg.properties[arg.properties.length] = "icon";
        	arg.properties[arg.properties.length] = "iconPosition";
        	arg.properties[arg.properties.length] = "padding";
        	arg.properties[arg.properties.length] = "textAlign";
        	arg.properties[arg.properties.length] = "textDecoration";
        	arg.properties[arg.properties.length] = "textPadding";
        	arg.properties[arg.properties.length] = "verticalAlign";
        	arg.properties[arg.properties.length] = "wordWrap";

        	argList.complist[argList.complist.length]  = arg;

        	var argString = JSON.stringify(argList, null, "\t");

        	var _cssclass = JSON.parse(this.parent.parent.userNotifyCall(nexacro.CTSE.NotifyTypes.GET_COMPUTED_STYLE, argString));

        	this.parent.parent._cssclasslist[cssclass] = {cssclass : cssclass, properties : _cssclass[cssclass].properties};
        }

        this.createPanel = function(){

        	var nLeft = 0;
        	var nTop = this.toolbarSize;
        	var nWidth = "25%";
        	var nBottom = 0;
        	var itemsCompBefor;
        	var itemsComp;
        	var itemsInfo;
        	var nCount = 0;
        	var panelHeight = this.panelSize+this.toolbarSize;
        	this.panel = {
        					"type" : "panel",
        					"id" : "divPanel",
        					"left" : "10",
        					"top" : "10",
        					"width" : null,
        					"height" : panelHeight,
        					"right" : "btnSpliter:10px",
        					"bottom" : null,
        					"cssclass": "",
        					"comptype" : "DIV",
        					"text" : "",
        					"onsize" : this.divPanel_onsize,
        					"toolbar" : {"id":"toolbar", "cssclass":"", "left":"", "top":"", "width":"", "height":"", "right":"", "bottom":"", "items" : {}},
        					"fields" : {"id":"fields", "cssclass":"", "left":"", "top":"", "width":"", "height":"", "right":"", "bottom":"", "items" : {}},
        					"colAxis" : {"id":"colAxis", "cssclass":"", "left":"", "top":"", "width":"", "height":"", "right":"", "bottom":"", "items" : {}},
        					"rowAxis" : {"id":"rowAxis", "cssclass":"", "left":"", "top":"", "width":"", "height":"", "right":"", "bottom":"", "items" : {}},
        					"values" : {"id":"values", "cssclass":"", "left":"", "top":"", "width":"", "height":"", "right":"", "bottom":"", "items" : {}}
        				};

        	this.setItemParams("panel.toolbar", this.panel.toolbar, "toolbar", this.toolbarCssClass, 0, 0, null, this.toolbarSize, 0, null, "", "", "", "", "DIV", "", this.objcomp_onclick);

        	this.createButtons(this.panel.toolbar.items);

        	for(itemsInfo in this.config){
        		if(nCount==0){
        			this.setItemParams("panel.items", this.panel[itemsInfo], itemsInfo, this.itemsCssClass1, nLeft, nTop, nWidth,  null, null, nBottom, "", "", "", "", "DIV", this.divItems_onsize, this.objcomp_onclick);

        		}else if(nCount==3){
        			this.setItemParams("panel.items", this.panel[itemsInfo], itemsInfo, this.itemsCssClass1, itemsCompBefor+":-1", nTop, null,  null, 0, nBottom, "", "", "", "", "DIV", this.divItems_onsize, this.objcomp_onclick);
        		}else{
        			this.setItemParams("panel.items", this.panel[itemsInfo], itemsInfo, this.itemsCssClass2, itemsCompBefor+":-1", nTop, nWidth,  null, null, nBottom, "", "", "", "", "DIV", this.divItems_onsize, this.objcomp_onclick);
        		}

        		this.createItem(this.panel[itemsInfo], itemsInfo, this.config[itemsInfo]);

        		nCount++;
        		itemsCompBefor = itemsInfo;
        		if(nCount==4){
        			return;
        		}
        	}
        }

        this.createButtons = function(items){
        	var i;
        	var sId;
        	var sType;
        	var nFRow;
        	var nCount;

        	var nLeft = nexacro.toNumber(this.toolbarPadding[0]);
        	var nTop = nexacro.toNumber(this.toolbarPadding[1]);
        	var nWidth = this.toolbarButtonSize;
        	var nHeight = null;
        	var nRight = null;
        	var nBottom = nexacro.toNumber(this.toolbarPadding[3]);
        	var gap = nexacro.toNumber(this.toolbarGap);
        	var bToggle;
        	var sTooltip;
        	var sCssClass;

        	items.lbuttons = [];

        	nCount = this.dsLeftTopButtons.rowcount;
        	for(i=0;i<nCount;i++){
        		sType = this.dsLeftTopButtons.getColumn(i, "type");
        		nFRow = this.dsProperties.findRow("group", sType);
        		bToggle = this.dsProperties.getColumn(nFRow+2, "value");//toggle
        		bTogglevalue = this.dsProperties.getColumn(nFRow+3, "value");//togglevalue
        		sTooltip = this.dsProperties.getColumn(nFRow+4, "value");//tooltip
        		sCssClass = this.dsProperties.getColumn(nFRow+5, "value");//cssclass

        		nLeft = nexacro.toNumber(this.toolbarPadding[0]) + (i*nWidth) + (i*gap);
        		items.lbuttons[i] = {};
        		this.setItemParams(sType, items.lbuttons[i], sType, sCssClass, nLeft, nTop, nWidth, nHeight, nRight, nBottom, "", bToggle, bTogglevalue, sTooltip, "BUTTON", "", this.objcomp_onclick);
        	}

        	items.rbuttons = [];
        	nCount = this.dsRightBottomButtons.rowcount;
        	for(i=0;i<nCount;i++){
        		sType = this.dsRightBottomButtons.getColumn(i, "type");
        		nFRow = this.dsProperties.findRow("group", sType);
        		bToggle = this.dsProperties.getColumn(nFRow+2, "value");//toggle
        		bTogglevalue = this.dsProperties.getColumn(nFRow+3, "value");//togglevalue
        		sTooltip = this.dsProperties.getColumn(nFRow+4, "value");//tooltip
        		sCssClass = this.dsProperties.getColumn(nFRow+5, "value");//cssclass

        		nLeft = null;
        		nRight = nexacro.toNumber(this.toolbarPadding[2]) + (i*nWidth) + (i*gap);
        		items.rbuttons[i] = {};
        		this.setItemParams(sType, items.rbuttons[i], sType, sCssClass, nLeft, nTop, nWidth, nHeight, nRight, nBottom, "", bToggle, bTogglevalue, sTooltip, "BUTTON", "", this.objcomp_onclick);
        	}
        }

        this.createItem = function(panel, title, itemsInfo){

        	var i, j;
        	var nCount = itemsInfo.length;
        	var itemInfo;
        	var itemComp;
        	var nitemTitleHeight = nexacro.toNumber(this.itemsTitleSize);
        	var filters = this.config.filters;

        	var nitemWidth = nexacro.toNumber(this.itemWidth);
        	var nitemHeight = nexacro.toNumber(this.itemHeight);

        	var nitemsPaddingLeft = nexacro.toNumber(this.itemsPadding[0]);
        	var nitemsPaddingTop = nexacro.toNumber(this.itemsPadding[1]);
        	var nitemsPaddingWidth = nexacro.toNumber(this.itemsPadding[2]);
        	var nitemsPaddingHeight = nexacro.toNumber(this.itemsPadding[3]);

        	var nitemsGap = nexacro.toNumber(this.itemsGap);

        	var nitemPaddingLeft = nexacro.toNumber(this.itemPadding[0]);
        	var nitemPaddingTop = nexacro.toNumber(this.itemPadding[1]);
        	var nitemPaddingWidth = nexacro.toNumber(this.itemPadding[2]);
        	var nitemPaddingHeight = nexacro.toNumber(this.itemPadding[3]);

        	var nitemGap = nexacro.toNumber(this.itemGap);

        	var nitemSortSize = nexacro.toNumber(this.itemSortSize);
        	var nitemFilterSize = nexacro.toNumber(this.itemFilterSize);
        	var nitemAggregatorSize = nexacro.toNumber(this.itemAggregatorSize);
        	var nitemButtonSize = nexacro.toNumber(this.itemButtonSize);

        	var nitemTextLeft;
        	var nitemTextTop = nexacro.toNumber(this.itemsPadding[1]);
        	var nitemTextWidth;

        	var aggregatorString;
        	var aggregatorChar;

        	var nitemLeft;
        	var nitemTop = this.itemsTitleSize;
        	var cssclass;
        	var text;

        	panel.items.title = {};
        	this.setItemParams("title", panel.items.title, "title", this.itemsTitleCssClass+"_"+title, nitemsPaddingLeft, nitemsPaddingTop, null, nitemTitleHeight, 0, null, title, "", "", "", "STATIC");

        	panel.items.item = [];

        	for(i=0;i<nCount;i++){
        		itemInfo = itemsInfo[i];

        		nitemLeft = nitemsPaddingLeft + (nitemWidth * (i%this.itemCount)) + ((nitemsGap) * (i%this.itemCount));
        		nitemTop = nitemTitleHeight + nitemsPaddingTop + nitemsGap + (nexacro.floor(i/this.itemCount)*(nitemHeight+nitemsGap));

        		nitemTextLeft = nitemAggregatorLeft = nitemSortLeft = nitemLeft+nitemPaddingLeft;
        		nitemAggregatorTop = nitemSortTop = nitemTop+nitemPaddingTop;

        		nitemFilterLeft = nitemSortLeft + nitemSortSize+nitemGap;
        		nitemFilterTop = nitemTop+nitemPaddingTop;

        		nitemStatusHeight = nitemHeight-nitemPaddingTop-nitemPaddingHeight;

        		nitemButtonLeft = nitemLeft+nitemWidth-nitemButtonSize-nitemPaddingWidth;
        		nitemButtonTop = nitemTop+nitemPaddingTop;

        		panel.items.item[i] = {"itemElm" : {}, "textElm":{}, "imgElm01":{}, "imgElm02":{}, "btnElm":{}}
        		this.setItemParams("panel.items.item", panel.items.item[i].itemElm, itemInfo.id+"Item", this.itemCssClass, nitemLeft, nitemTop, nitemWidth, nitemHeight, null, null, "", "", "", "", "STATIC", "", this.objcomp_onclick);

        		if((panel.id=="colAxis"||panel.id=="rowAxis")){
        			if(itemInfo.sort=="ASC")cssclass = this.itemSortAscCssClass;
        			else if(itemInfo.sort=="DESC")cssclass = this.itemSortDescCssClass;

        			this.setItemParams("sort", panel.items.item[i].imgElm01, itemInfo.id+"img01", cssclass, nitemSortLeft, nitemSortTop, nitemSortSize, nitemStatusHeight, null, null, "", "", "", "", "STATIC", "", this.objcomp_onclick);
        			nitemTextLeft  = nitemSortLeft + nitemSortSize + nitemGap;

        			for(j=0;j<filters.length;j++){
        				if(filters[j].id==itemInfo.id){
        					this.setItemParams("filter", panel.items.item[i].imgElm02, itemInfo.id+"img02", this.itemFilterCssClass, nitemFilterLeft, nitemFilterTop, nitemFilterSize, nitemStatusHeight, null, null, "", "", "", "", "STATIC", "", this.objcomp_onclick);
        					nitemTextLeft = nitemFilterLeft + nitemFilterSize + nitemGap;
        				}
        			}
        		}else if(panel.id=="values"){

        			if(this.isString(itemInfo.aggregator)==true&&this.isEmpty(itemInfo.aggregator)==false)
        			{
        				aggregatorString = "_"+itemInfo.aggregator.toLowerCase();
        			}else
        			{
        				aggregatorString = "_func";
        			}

        			this.setItemParams("aggregator", panel.items.item[i].imgElm01, itemInfo.id+"img01", this.itemAggregatorCssClass+aggregatorString, nitemAggregatorLeft, nitemAggregatorTop, nitemAggregatorSize, nitemStatusHeight, null, null, "", "", "", "", "STATIC", "", this.objcomp_onclick);
        			nitemTextLeft = nitemAggregatorLeft + nitemAggregatorSize + nitemGap;
        		}
        		nitemTextWidth = nitemButtonLeft - nitemTextLeft - nitemGap;

        		this.setItemParams("text", panel.items.item[i].textElm, itemInfo.id+"txt", this.itemNameCssClass, nitemTextLeft, nitemTop, nitemTextWidth, nitemHeight, null, null, itemInfo.itemText, "", "", "", "STATIC", "", this.objcomp_onclick);
        		this.setItemParams("button", panel.items.item[i].btnElm, itemInfo.id+"btn", this.itemSettingCssClass, nitemButtonLeft, nitemButtonTop, nitemButtonSize, nitemStatusHeight, null, null, "", "", "", "", "BUTTON", "", this.objcomp_onclick);
        	}
        }

        this.setItemParams = function(type, objItem, id, cssclass, left, top, width, height, right, bottom, text, toggle, togglevalue, tooltip, comptype, onsize, onclick){

        	//nexacro.__onNexacroStudioError(type +" : " + comptype);

        	objItem.type = type;
        	objItem.id = id;
        	objItem.cssclass = cssclass;
        	objItem.left = left;
        	objItem.top = top;
        	objItem.width = width;
        	objItem.height = height;
        	objItem.right = right;
        	objItem.bottom = bottom;
        	objItem.text = text;
        	objItem.toggle = toggle;
        	objItem.togglevalue = togglevalue;
        	objItem.tooltip = tooltip;
        	objItem.comptype = comptype;
        	objItem.onsize = onsize;
        	objItem.onclick = onclick;
        }

        this.divPanel_onsize = function(obj,e)
        {
        	var nLeft = nexacro.toNumber(this.selectComp.getOffsetLeft());
        	var nTop = nexacro.toNumber(this.selectComp.getOffsetTop());
        	var nWidth = nexacro.toNumber(this.selectComp.getOffsetWidth());
        	var nHeight = nexacro.toNumber(this.selectComp.getOffsetHeight());

        	this.selectComp.parent.selectDummyLeftComp.move(nLeft, nTop, 1, nHeight);
        	this.selectComp.parent.selectDummyTopComp.move(nLeft, nTop, nWidth, 1);
        	this.selectComp.parent.selectDummyBottomComp.move(nLeft+nWidth-1, nTop, 1, nHeight);
        	this.selectComp.parent.selectDummyRightComp.move(nLeft, nTop+nHeight-1, nWidth, 1);
        }

        this.divItems_onsize = function(obj,e)
        {
        	if(obj.name=="values"){
        		var itemCount = this.getItemCount((this.getOffsetWidth()-this.grdControlList.getOffsetWidth())/4);

        		if(this.itemCount != itemCount){
        			this.itemCount = itemCount;
        			this.createPanel();
        			this.createPanelComp();
        		}
        	}
        };

        this.getItemCount = function(width){
        	var itemCount = nexacro.floor(width/(nexacro.toNumber(this.itemWidth)+nexacro.toNumber(this.itemsPadding[0])+nexacro.toNumber(this.itemsPadding[2])));
        	if(itemCount==0)itemCount = 1;
        	return itemCount;
        }

        this.dsProperties_oncolumnchanged = function(obj,e)
        {
        	var sScope = obj.getColumn(e.row, "scope");
        	var sGroup = obj.getColumn(e.row, "group");
        	var sConvertGroup;

        	var nFRow;
        	var nFromRow;
        	var nToRow;

        	var type;
        	var toggle;
        	var togglevalue;
        	var tooltip;
        	var cssclass;

        	this.dsProperties.set_enableevent(false);
        	if(sScope.indexOf("panel.toolbar.")>-1&&sScope.indexOf(".type")>-1){

        		nFRow = this.dsToolbarButtonType.findRow("code", e.newvalue);

        		type = e.newvalue;
        		toggle = this.dsToolbarButtonType.getColumn(nFRow, "toggle");
        		togglevalue = this.dsToolbarButtonType.getColumn(nFRow, "togglevalue");
        		tooltip = this.dsToolbarButtonType.getColumn(nFRow, "tooltip");
        		cssclass = this.dsToolbarButtonType.getColumn(nFRow, "cssclass");

        		obj.setColumn(e.row+1, "value", type);
        		obj.setColumn(e.row+2, "value", toggle);
        		obj.setColumn(e.row+3, "value", togglevalue);
        		obj.setColumn(e.row+4, "value", tooltip);
        		obj.setColumn(e.row+5, "value", cssclass);

        		if(type=="addnew"){
        			obj.setColumn(e.row+5, "edittype", "normal");
        		}else{
        			obj.setColumn(e.row+5, "edittype", "none");
        		}

        		if(toggle=="1"){
        			obj.setColumn(e.row+3, "edittype", "combo");
        		}else
        		{
        			obj.setColumn(e.row+3, "edittype", "none");
        		}

        	}else if(sScope.indexOf("panel.toolbar.")>-1&&sScope.indexOf(".align")>-1){

        		obj.filter("");
        		if(e.newvalue=="right"){

        			sConvertGroup = sGroup.replace("lbuttons", "rbuttons");

        			nToRow = this.dsRightBottomButtons.addRow();
        			this.dsRightBottomButtons.setColumn(nToRow, "type", sConvertGroup);

        			nFromRow = this.dsLeftTopButtons.findRow("type", sGroup);
        			this.dsLeftTopButtons.deleteRow(nFromRow);

        			nFromRow = this.dsProperties.findRow("group", sGroup);
        			nToRow = this.dsProperties.findRow("scope", "panel.items")-1;

        			for(i=0;i<7;i++){
        				this.dsProperties.setColumn(nFromRow, "group", sConvertGroup);
        				this.dsProperties.setColumn(nFromRow, "scope", this.dsProperties.getColumn(nFromRow, "scope").replace("lbuttons", "rbuttons"));
        				this.dsProperties.moveRow(nFromRow, nToRow);
        			}
        		}else if(e.newvalue=="left"){
        			sConvertGroup = sGroup.replace("rbuttons", "lbuttons");

        			nToRow = this.dsLeftTopButtons.addRow();
        			this.dsLeftTopButtons.setColumn(nToRow, "type", sConvertGroup);

        			nFromRow = this.dsRightBottomButtons.findRow("type", sGroup);
        			this.dsRightBottomButtons.deleteRow(nFromRow);

        			nFromRow = this.dsProperties.findRow("group", sGroup);
        			nToRow = this.dsProperties.findRow("scope", "panel.toolbar.rbuttons");

        			for(i=0;i<7;i++){
        				this.dsProperties.setColumn(nFromRow+i, "group", sConvertGroup);
        				this.dsProperties.setColumn(nFromRow+i, "scope", this.dsProperties.getColumn(nFromRow+i, "scope").replace("rbuttons", "lbuttons"));

        				this.dsProperties.moveRow(nFromRow+i, nToRow+i);
        			}
        		}
        		this.selectComp.name = sConvertGroup;
        	}
        	this.dsProperties.set_enableevent(true);
        	this.onloadPanel();

        	this.parent.parent.callNotify_ContentsChange();
        };


        this.panelForm_onrbuttonup = function(obj,e)
        {
        	if(this.selectComp.type.indexOf("toolbar")>-1)
        	{
        		if(this.selectComp.type.indexOf("toolbar.lbuttons")>-1||this.selectComp.type.indexOf("toolbar.rbuttons")>-1){
        			this.dsPopMenuPanelToolbar.setColumn(2, "menuEnable", 1);
        		}else{
        			this.dsPopMenuPanelToolbar.setColumn(2, "menuEnable", 0);
        		}

        		this.popMenuPanelToolbar.trackPopupByComponent(obj, e.canvasx, e.canvasy);
        	}
        };

        this.popMenuPanelToolbar_onmenuclick = function(obj,e)
        {
        	var nFRow;
        	var nIdx;
        	var sGroup;

        	this.dsProperties.set_enableevent(false);
        	this.dsProperties.filter("");

        	if(e.id=="01"){
        		nFRow = this.dsProperties.findRow("scope", "panel.toolbar.rbuttons");

        		sGroup = this.addToolbarButtonsProperties(nFRow, "left");

        		nFRow = this.dsLeftTopButtons.addRow();
        		this.dsLeftTopButtons.setColumn(nFRow, "type", sGroup);

        	}else if(e.id=="02"){
        		nFRow = this.dsProperties.findRow("scope", "panel.items");

        		sGroup = this.addToolbarButtonsProperties(nFRow, "right");

        		nFRow = this.dsRightBottomButtons.addRow();
        		this.dsRightBottomButtons.setColumn(nFRow, "type", sGroup);


        	}else if(e.id=="03"&&this.dsPopMenuPanelToolbar.getColumn(2, "menuEnable")=="1"){
        		nFRow = this.dsLeftTopButtons.findRow("type", this.selectComp.type);
        		if(nFRow>-1)this.dsLeftTopButtons.deleteRow(nFRow);

        		nFRow = this.dsRightBottomButtons.findRow("type", this.selectComp.type);
        		if(nFRow>-1)this.dsRightBottomButtons.deleteRow(nFRow);

        		while(1){
        			nFRow = this.dsProperties.findRow("group", this.selectComp.type);

        			if(nFRow>-1){
        				this.dsProperties.deleteRow(nFRow);
        			}else{
        				break;
        			}
        		}

        		this.selectComp = null;
        	}

        	this.dsProperties.set_enableevent(true);

        	this.parent.parent.callNotify_ContentsChange();

        	this.onloadPanel();
        };

        this.addToolbarButtonsProperties = function(nFRow, align){

        	var sGroup;
        	this.dsProperties.set_enableevent(false);
        	if(align=="left"){
        		sGroup = "panel.toolbar.lbuttons."+this.getUniqueId("", "");
        	}else{
        		sGroup = "panel.toolbar.rbuttons."+this.getUniqueId("", "");
        	}

        	var nRow = this.dsProperties.insertRow(nFRow);
        	this.dsProperties.copyRow(nRow, this.dsToolbarButtonProperties, 6);
        	this.dsProperties.setColumn(nRow, "value", align);
        	this.dsProperties.setColumn(nRow, "group", sGroup);
        	this.dsProperties.setColumn(nRow, "scope", sGroup+".align");

        	nRow = this.dsProperties.insertRow(nFRow);
        	this.dsProperties.copyRow(nRow, this.dsToolbarButtonProperties, 5);
        	this.dsProperties.setColumn(nRow, "group", sGroup);
        	this.dsProperties.setColumn(nRow, "scope", sGroup+".cssclass");

        	nRow = this.dsProperties.insertRow(nFRow);
        	this.dsProperties.copyRow(nRow, this.dsToolbarButtonProperties, 4);
        	this.dsProperties.setColumn(nRow, "group", sGroup);
        	this.dsProperties.setColumn(nRow, "scope", sGroup+".tooltip");

        	nRow = this.dsProperties.insertRow(nFRow);
        	this.dsProperties.copyRow(nRow, this.dsToolbarButtonProperties, 3);
        	this.dsProperties.setColumn(nRow, "group", sGroup);
        	this.dsProperties.setColumn(nRow, "scope", sGroup+".togglevalue");

        	nRow = this.dsProperties.insertRow(nFRow);
        	this.dsProperties.copyRow(nRow, this.dsToolbarButtonProperties, 2);
        	this.dsProperties.setColumn(nRow, "group", sGroup);
        	this.dsProperties.setColumn(nRow, "scope", sGroup+".toggle");

        	nRow = this.dsProperties.insertRow(nFRow);
        	this.dsProperties.copyRow(nRow, this.dsToolbarButtonProperties, 1);
        	this.dsProperties.setColumn(nRow, "group", sGroup);
        	this.dsProperties.setColumn(nRow, "scope", sGroup+".id");

        	nRow = this.dsProperties.insertRow(nFRow);
        	this.dsProperties.copyRow(nRow, this.dsToolbarButtonProperties, 0);
        	this.dsProperties.setColumn(nRow, "group", sGroup);
        	this.dsProperties.setColumn(nRow, "scope", sGroup+".type");

        	this.selectComp.name = sGroup;

        	this.dsProperties.set_enableevent(true);
        	this.dsProperties.filter("group=='"+sGroup+"'");

        	return sGroup;
        }

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

        this.panelForm_onmousemove = function(obj,e)
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
            this.addEventHandler("onload",this.panel_onload,this);
            this.addEventHandler("onclick",this.objcomp_onclick,this);
            this.addEventHandler("onrbuttonup",this.panelForm_onrbuttonup,this);
            this.addEventHandler("onmousemove",this.panelForm_onmousemove,this);
            this.btnSpliter.addEventHandler("onlbuttondown",this.btnSpliter_onlbuttondown,this);
            this.btnSpliter.addEventHandler("onlbuttonup",this.btnSpliter_onlbuttonup,this);
            this.popMenuPanelToolbar.addEventHandler("onmenuclick",this.popMenuPanelToolbar_onmenuclick,this);
            this.dsProperties.addEventHandler("oncolumnchanged",this.dsProperties_oncolumnchanged,this);
        };

        this.loadIncludeScript("panel.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
