(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("ContentEditor");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(800,400);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsConfig", this);
            obj._setContents("<ColumnInfo><Column id=\"chk\" type=\"STRING\" size=\"256\"/><Column id=\"itemId\" type=\"STRING\" size=\"256\"/><Column id=\"itemText\" type=\"STRING\" size=\"256\"/><Column id=\"itemType\" type=\"STRING\" size=\"256\"/><Column id=\"itemWidth\" type=\"STRING\" size=\"256\"/><Column id=\"itemSort\" type=\"STRING\" size=\"256\"/><Column id=\"itemSortId\" type=\"STRING\" size=\"256\"/><Column id=\"itemAggregator\" type=\"STRING\" size=\"256\"/><Column id=\"itemAggregatorName\" type=\"STRING\" size=\"256\"/><Column id=\"itemAggregatorFunction\" type=\"STRING\" size=\"256\"/><Column id=\"filterOperation\" type=\"STRING\" size=\"256\"/><Column id=\"filterValue\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsFields", this);
            obj._setContents("<ColumnInfo><Column id=\"itemId\" type=\"STRING\" size=\"256\"/><Column id=\"itemText\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsRows", this);
            obj._setContents("<ColumnInfo><Column id=\"itemId\" type=\"STRING\" size=\"256\"/><Column id=\"itemText\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsColumns", this);
            obj._setContents("<ColumnInfo><Column id=\"itemId\" type=\"STRING\" size=\"256\"/><Column id=\"itemText\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsValues", this);
            obj._setContents("<ColumnInfo><Column id=\"itemId\" type=\"STRING\" size=\"256\"/><Column id=\"itemText\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsSortType", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">ASC</Col><Col id=\"value\">ASC</Col></Row><Row><Col id=\"code\">DESC</Col><Col id=\"value\">DESC</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsType", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">string</Col><Col id=\"value\">STRING</Col></Row><Row><Col id=\"code\">number</Col><Col id=\"value\">NUMBER</Col></Row><Row><Col id=\"code\">date</Col><Col id=\"value\">DATE</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsAggregatorType", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">SUM</Col><Col id=\"value\">SUM</Col></Row><Row><Col id=\"code\">AVG</Col><Col id=\"value\">AVG</Col></Row><Row><Col id=\"code\">CNT</Col><Col id=\"value\">COUNT</Col></Row><Row><Col id=\"code\">MIN</Col><Col id=\"value\">MIN</Col></Row><Row><Col id=\"code\">MAX</Col><Col id=\"value\">MAX</Col></Row><Row><Col id=\"code\">FUNC</Col><Col id=\"value\">FUNCTION</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsFilterOperationType_string", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">none</Col><Col id=\"value\">none</Col></Row><Row><Col id=\"code\">ct</Col><Col id=\"value\">like</Col></Row><Row><Col id=\"code\">nct</Col><Col id=\"value\">!like</Col></Row><Row><Col id=\"code\">eq</Col><Col id=\"value\">==</Col></Row><Row><Col id=\"code\">neq</Col><Col id=\"value\">!=</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsFilterOperationType_number", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">none</Col><Col id=\"value\">none</Col></Row><Row><Col id=\"code\">lt</Col><Col id=\"value\">&lt;</Col></Row><Row><Col id=\"code\">gt</Col><Col id=\"value\">&gt;</Col></Row><Row><Col id=\"code\">leq</Col><Col id=\"value\">&lt;=</Col></Row><Row><Col id=\"code\">geq</Col><Col id=\"value\">&gt;=</Col></Row><Row><Col id=\"code\">eq</Col><Col id=\"value\">==</Col></Row><Row><Col id=\"code\">neq</Col><Col id=\"value\">!=</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsFilterOperationType_date", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">none</Col><Col id=\"value\">none</Col></Row><Row><Col id=\"code\">between</Col><Col id=\"value\">between</Col></Row><Row><Col id=\"code\">after</Col><Col id=\"value\">&gt;</Col></Row><Row><Col id=\"code\">before</Col><Col id=\"value\">&lt;</Col></Row><Row><Col id=\"code\">eq</Col><Col id=\"value\">==</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsPopMenu", this);
            obj._setContents("<ColumnInfo><Column id=\"menuId\" type=\"STRING\" size=\"256\"/><Column id=\"menuText\" type=\"STRING\" size=\"256\"/><Column id=\"menuLvl\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"menuId\">1</Col><Col id=\"menuText\">checked</Col><Col id=\"menuLvl\">0</Col></Row><Row><Col id=\"menuId\">0</Col><Col id=\"menuText\">unchecked</Col><Col id=\"menuLvl\">0</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("DS_OriginData", this);
            obj._setContents("");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsControlList", this);
            obj._setContents("<ColumnInfo><Column id=\"controlId\" type=\"STRING\" size=\"256\"/><Column id=\"lvl\" type=\"STRING\" size=\"256\"/><Column id=\"controlName\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"controlId\">config</Col><Col id=\"lvl\">0</Col><Col id=\"controlName\"/></Row><Row><Col id=\"controlId\">panel</Col><Col id=\"lvl\">0</Col><Col id=\"controlName\">nexacro.PivotPanelControl</Col></Row><Row><Col id=\"controlId\">toolbar</Col><Col id=\"lvl\">1</Col><Col id=\"controlName\">nexacro.PivotToolbarControl</Col></Row><Row><Col id=\"controlId\">axis</Col><Col id=\"lvl\">1</Col><Col id=\"controlName\">nexacro.PivotAxisControl</Col></Row><Row><Col id=\"controlId\">item</Col><Col id=\"lvl\">1</Col><Col id=\"controlName\">nexacro.PivotItemControl</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsProperties", this);
            obj._setContents("<ColumnInfo><Column id=\"controlId\" type=\"STRING\" size=\"256\"/><Column id=\"lvl\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/><Column id=\"group\" type=\"STRING\" size=\"256\"/><Column id=\"scope\" type=\"STRING\" size=\"256\"/><Column id=\"displaytype\" type=\"STRING\" size=\"256\"/><Column id=\"edittype\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"controlId\">panel</Col><Col id=\"lvl\">0</Col><Col id=\"value\"/><Col id=\"group\">panel</Col><Col id=\"edittype\">none</Col><Col id=\"scope\">panel</Col></Row><Row><Col id=\"controlId\">size</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel</Col><Col id=\"value\">180</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col><Col id=\"scope\">panel.size</Col></Row><Row><Col id=\"controlId\">toolbar</Col><Col id=\"lvl\">0</Col><Col id=\"group\">panel</Col><Col id=\"edittype\">none</Col><Col id=\"scope\">panel.toolbar</Col></Row><Row><Col id=\"controlId\">size</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel</Col><Col id=\"value\">20</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col><Col id=\"scope\">panel.toolbar.size</Col></Row><Row><Col id=\"controlId\">cssclass</Col><Col id=\"lvl\">1</Col><Col id=\"value\">div_NxPivot_Toolbar</Col><Col id=\"group\">panel</Col><Col id=\"scope\">panel.toolbar.cssclass</Col></Row><Row><Col id=\"controlId\">items</Col><Col id=\"lvl\">0</Col><Col id=\"group\">panel</Col><Col id=\"edittype\">none</Col><Col id=\"scope\">panel.items</Col></Row><Row><Col id=\"controlId\">cssclass1</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel</Col><Col id=\"edittype\">none</Col><Col id=\"value\">div_NxPivot_Items01</Col><Col id=\"scope\">panel.items.cssclass1</Col></Row><Row><Col id=\"controlId\">cssclass2</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel</Col><Col id=\"edittype\">none</Col><Col id=\"value\">div_NxPivot_Items02</Col><Col id=\"scope\">panel.items.cssclass2</Col></Row><Row><Col id=\"controlId\">titlebar</Col><Col id=\"lvl\">0</Col><Col id=\"group\">panel</Col><Col id=\"scope\">panel.items.titlebar</Col></Row><Row><Col id=\"controlId\">size</Col><Col id=\"lvl\">1</Col><Col id=\"value\">20</Col><Col id=\"group\">panel</Col><Col id=\"scope\">panel.items.titlebar.size</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col></Row><Row><Col id=\"controlId\">cssclass</Col><Col id=\"lvl\">1</Col><Col id=\"value\">sta_NxPivot_Titlebar</Col><Col id=\"group\">panel</Col><Col id=\"scope\">panel.items.titlebar.cssclass</Col><Col id=\"edittype\">none</Col></Row><Row><Col id=\"controlId\">item</Col><Col id=\"lvl\">0</Col><Col id=\"group\">panel</Col><Col id=\"edittype\">none</Col><Col id=\"scope\">panel.items.item</Col></Row><Row><Col id=\"controlId\">width</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel</Col><Col id=\"value\">150</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col><Col id=\"scope\">panel.items.item.width</Col></Row><Row><Col id=\"controlId\">height</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel</Col><Col id=\"value\">30</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col><Col id=\"scope\">panel.items.item.height</Col></Row><Row><Col id=\"controlId\">margin</Col><Col id=\"lvl\">1</Col><Col id=\"value\">5 5 0 0</Col><Col id=\"group\">panel</Col><Col id=\"scope\">panel.items.item.margin</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col></Row><Row><Col id=\"value\">sta_NxPivot_item</Col><Col id=\"controlId\">cssclass</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel</Col><Col id=\"scope\">panel.items.item.cssclass</Col><Col id=\"edittype\">none</Col></Row><Row><Col id=\"controlId\">sortasccssclass</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel</Col><Col id=\"edittype\">none</Col><Col id=\"value\">sta_NxPivot_itemSortUpImg</Col><Col id=\"scope\">panel.items.item.sortasccssclass</Col></Row><Row><Col id=\"controlId\">sortdesccssclass</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel</Col><Col id=\"edittype\">none</Col><Col id=\"value\">sta_NxPivot_itemSortDownImg</Col><Col id=\"scope\">panel.items.item.sortdesccssclass</Col></Row><Row><Col id=\"controlId\">filtercsscalss</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel</Col><Col id=\"edittype\">none</Col><Col id=\"value\">sta_NxPivot_itemFilterImg</Col><Col id=\"scope\">panel.items.item.filtercssclass</Col></Row><Row><Col id=\"controlId\">aggregatorcssclass</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel</Col><Col id=\"edittype\">none</Col><Col id=\"value\">sta_NxPivot_itemValueImg</Col><Col id=\"scope\">panel.items.item.aggregatorcssclass</Col></Row><Row><Col id=\"controlId\">settingcssclass</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel</Col><Col id=\"edittype\">none</Col><Col id=\"value\">btn_NxPivot_ItemSettingImg</Col><Col id=\"scope\">panel.items.item.settingcssclass</Col></Row><Row><Col id=\"controlId\">statussize1</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel</Col><Col id=\"value\">15</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col><Col id=\"scope\">panel.items.item.statussize1</Col></Row><Row><Col id=\"controlId\">statusmargin1</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel</Col><Col id=\"value\">5 5 5 5</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col><Col id=\"scope\">panel.items.item.statusmargin1</Col></Row><Row><Col id=\"controlId\">statussize2</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel</Col><Col id=\"value\">15</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col><Col id=\"scope\">panel.items.item.statussize2</Col></Row><Row><Col id=\"controlId\">statusmargin2</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel</Col><Col id=\"value\">5 5 5 5</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col><Col id=\"scope\">panel.items.item.statusmargin2</Col></Row><Row><Col id=\"controlId\">buttonsize</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel</Col><Col id=\"value\">15</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col><Col id=\"scope\">panel.items.item.buttonsize</Col></Row><Row><Col id=\"controlId\">buttonmargin</Col><Col id=\"lvl\">1</Col><Col id=\"group\">panel</Col><Col id=\"value\">5 5 5 5</Col><Col id=\"displaytype\">editcontrol</Col><Col id=\"edittype\">normal</Col><Col id=\"scope\">panel.items.item.buttonmargin</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsCssClass", this);
            obj._setContents("<ColumnInfo><Column id=\"cssclass\" type=\"STRING\" size=\"256\"/><Column id=\"comptype\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"cssclass\">NxPivot_toolbarArea</Col><Col id=\"comptype\">DIV</Col></Row><Row><Col id=\"cssclass\">NxPivot_axisArea1</Col><Col id=\"comptype\">DIV</Col></Row><Row><Col id=\"cssclass\">NxPivot_axisArea2</Col><Col id=\"comptype\">DIV</Col></Row><Row><Col id=\"cssclass\">NxPivot_axisArea_title_fields</Col><Col id=\"comptype\">STATIC</Col></Row><Row><Col id=\"cssclass\">NxPivot_axisArea_title_colAxis</Col><Col id=\"comptype\">STATIC</Col></Row><Row><Col id=\"cssclass\">NxPivot_axisArea_title_rowAxis</Col><Col id=\"comptype\">STATIC</Col></Row><Row><Col id=\"cssclass\">NxPivot_axisArea_title_values</Col><Col id=\"comptype\">STATIC</Col></Row><Row><Col id=\"cssclass\">NxPivot_axisArea_item</Col><Col id=\"comptype\">STATIC</Col></Row><Row><Col id=\"cssclass\">NxPivot_axisArea_item_asc</Col><Col id=\"comptype\">STATIC</Col></Row><Row><Col id=\"cssclass\">NxPivot_axisArea_item_desc</Col><Col id=\"comptype\">STATIC</Col></Row><Row><Col id=\"cssclass\">NxPivot_axisArea_item_filter</Col><Col id=\"comptype\">STATIC</Col></Row><Row><Col id=\"cssclass\">NxPivot_axisArea_item_name</Col><Col id=\"comptype\">STATIC</Col></Row><Row><Col id=\"cssclass\">NxPivot_axisArea_item_aggregator</Col><Col id=\"comptype\">STATIC</Col></Row><Row><Col id=\"cssclass\">NxPivot_axisArea_item_aggregator_sum</Col><Col id=\"comptype\">STATIC</Col></Row><Row><Col id=\"cssclass\">NxPivot_axisArea_item_aggregator_func</Col><Col id=\"comptype\">STATIC</Col></Row><Row><Col id=\"cssclass\">NxPivot_axisArea_item_aggregator_avg</Col><Col id=\"comptype\">STATIC</Col></Row><Row><Col id=\"cssclass\">NxPivot_axisArea_item_aggregator_cnt</Col><Col id=\"comptype\">STATIC</Col></Row><Row><Col id=\"cssclass\">NxPivot_axisArea_item_aggregator_min</Col><Col id=\"comptype\">STATIC</Col></Row><Row><Col id=\"cssclass\">NxPivot_axisArea_item_aggregator_max</Col><Col id=\"comptype\">STATIC</Col></Row><Row><Col id=\"cssclass\">NxPivot_axisArea_item_setting</Col><Col id=\"comptype\">BUTTON</Col></Row><Row><Col id=\"cssclass\">NxPivot_toolbarButton_show</Col><Col id=\"comptype\">BUTTON</Col></Row><Row><Col id=\"cssclass\">NxPivot_toolbarButton_hide</Col><Col id=\"comptype\">BUTTON</Col></Row><Row><Col id=\"cssclass\">NxPivot_toolbarButton_execute</Col><Col id=\"comptype\">BUTTON</Col></Row><Row><Col id=\"cssclass\">NxPivot_toolbarButton_init</Col><Col id=\"comptype\">BUTTON</Col></Row><Row><Col id=\"cssclass\">NxPivot_toolbarButton_manual</Col><Col id=\"comptype\">BUTTON</Col></Row><Row><Col id=\"cssclass\">NxPivot_toolbarButton_auto</Col><Col id=\"comptype\">BUTTON</Col></Row><Row><Col id=\"cssclass\">NxPivot_toolbarButton_rowstatus_expand</Col><Col id=\"comptype\">BUTTON</Col></Row><Row><Col id=\"cssclass\">NxPivot_toolbarButton_rowstatus_collapse</Col><Col id=\"comptype\">BUTTON</Col></Row><Row><Col id=\"cssclass\">NxPivot_toolbarButton_colstatus_expand</Col><Col id=\"comptype\">BUTTON</Col></Row><Row><Col id=\"cssclass\">NxPivot_toolbarButton_colstatus_collapse</Col><Col id=\"comptype\">BUTTON</Col></Row><Row><Col id=\"cssclass\">NxPivot_popup</Col><Col id=\"comptype\">POPUPDIV</Col></Row><Row><Col id=\"cssclass\">NxPivot_popup_submit</Col><Col id=\"comptype\">BUTTON</Col></Row><Row><Col id=\"cssclass\">NxPivot_popup_close</Col><Col id=\"comptype\">BUTTON</Col></Row><Row><Col id=\"cssclass\">NxPivot_popup_subtitle</Col><Col id=\"comptype\">STATIC</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsSortId", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("divConfig","10","30",null,null,"10","10",null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_text("Div00");
            this.addChild(obj.name, obj);

            obj = new Grid("grdConfig","0","1",null,null,"10","41.67%",null,null,null,null,this.divConfig.form);
            obj.set_taborder("0");
            obj.set_autoenter("select");
            obj.set_selecttype("multirow");
            obj.set_autoupdatetype("itemselect");
            obj.set_cellsizingtype("col");
            obj.set_cssclass("grid_nxPv_editor");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"30\"/><Column size=\"90\"/><Column size=\"110\"/><Column size=\"100\"/><Column size=\"60\"/><Column size=\"70\"/><Column size=\"100\"/><Column size=\"100\"/><Column size=\"110\"/><Column size=\"100\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell displaytype=\"checkboxcontrol\" edittype=\"checkbox\" text=\"expr:dataset.getCaseCount(&quot;chk==1&quot;)==dataset.rowcount?&quot;1&quot;:&quot;0&quot;\"/><Cell col=\"1\" text=\"column\"/><Cell col=\"2\" text=\"name\"/><Cell col=\"3\" text=\"type\"/><Cell col=\"4\" text=\"width\"/><Cell col=\"5\" text=\"sort\"/><Cell col=\"6\" text=\"sortid\"/><Cell col=\"7\" text=\"aggregator\"/><Cell col=\"8\" text=\"filteroperation\"/><Cell col=\"9\" text=\"filtervalue\"/></Band><Band id=\"body\"><Cell displaytype=\"checkboxcontrol\" edittype=\"checkbox\" text=\"bind:chk\"/><Cell col=\"1\" text=\"bind:itemId\"/><Cell col=\"2\" text=\"bind:itemText\" edittype=\"normal\" displaytype=\"editcontrol\" editautoselect=\"true\"/><Cell col=\"3\" text=\"bind:itemType\" displaytype=\"combocontrol\" edittype=\"combo\" combodataset=\"dsType\" combocodecol=\"code\" combodatacol=\"value\" combodisplaynulltype=\"nulltext\"/><Cell col=\"4\" text=\"bind:itemWidth\" displaytype=\"editcontrol\" edittype=\"normal\" editautoselect=\"true\"/><Cell col=\"5\" text=\"bind:itemSort\" combodataset=\"dsSortType\" combocodecol=\"code\" combodatacol=\"value\" displaytype=\"combocontrol\" edittype=\"combo\"/><Cell col=\"6\" displaytype=\"combocontrol\" edittype=\"combo\" combodataset=\"dsSortId\" combocodecol=\"code\" combodatacol=\"value\" text=\"bind:itemSortId\"/><Cell col=\"7\" text=\"bind:itemAggregator\" displaytype=\"combocontrol\" edittype=\"combo\" combodataset=\"dsAggregatorType\" combocodecol=\"code\" combodatacol=\"value\" expandshow=\"show\"/><Cell col=\"8\" text=\"bind:filterOperation\" displaytype=\"combocontrol\" edittype=\"combo\" combocodecol=\"code\" combodatacol=\"value\" combodataset=\"expr:&quot;dsFilterOperationType_&quot;+itemType\"/><Cell col=\"9\" text=\"bind:filterValue\" displaytype=\"editcontrol\" edittype=\"normal\"/></Band></Format></Formats>");
            this.divConfig.addChild(obj.name, obj);

            obj = new Grid("grdFields","0","grdConfig:5","23.86%",null,null,"8",null,null,null,null,this.divConfig.form);
            obj.set_taborder("1");
            obj.set_autofittype("col");
            obj.set_cssclass("grid_nxPv_editor");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"168\"/><Column size=\"24\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell colspan=\"2\" text=\"fields\"/></Band><Band id=\"body\"><Cell text=\"expr:dataset.parent.fn_setItemText(itemId)\"/><Cell col=\"1\" cssclass=\"rowDel\" displaytype=\"buttoncontrol\"/></Band></Format></Formats>");
            this.divConfig.addChild(obj.name, obj);

            obj = new Grid("grdColumns","grdFields:10","grdConfig:5","23.86%",null,null,"8",null,null,null,null,this.divConfig.form);
            obj.set_taborder("2");
            obj.set_autofittype("col");
            obj.set_cellexprupdatecondition("none");
            obj.set_cssclass("grid_nxPv_editor");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"24\"/><Column size=\"24\"/><Column size=\"120\"/><Column size=\"24\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell colspan=\"4\" text=\"columns\"/></Band><Band id=\"body\"><Cell cssclass=\"expr:dataset.parent.fn_setSortCSS(itemId)\"/><Cell col=\"1\" cssclass=\"expr:dataset.parent.fn_setFilterCSS(itemId)\"/><Cell col=\"2\" text=\"expr:dataset.parent.fn_setItemText(itemId)\"/><Cell col=\"3\" background=\"url('imagerc::btn_mdi_tabClose.png') no-repeat center\" cssclass=\"rowDel\" displaytype=\"buttoncontrol\"/></Band></Format></Formats>");
            this.divConfig.addChild(obj.name, obj);

            obj = new Grid("grdRows","grdColumns:10","grdConfig:5","23.86%",null,null,"8",null,null,null,null,this.divConfig.form);
            obj.set_taborder("3");
            obj.set_autofittype("col");
            obj.set_cssclass("grid_nxPv_editor");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"24\"/><Column size=\"24\"/><Column size=\"120\"/><Column size=\"24\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell colspan=\"4\" text=\"rows\"/></Band><Band id=\"body\"><Cell cssclass=\"expr:dataset.parent.fn_setSortCSS(itemId)\"/><Cell col=\"1\" cssclass=\"expr:dataset.parent.fn_setFilterCSS(itemId)\"/><Cell col=\"2\" text=\"expr:dataset.parent.fn_setItemText(itemId)\"/><Cell col=\"3\" background=\"url('imagerc::btn_mdi_tabClose.png') no-repeat center\" cssclass=\"rowDel\" displaytype=\"buttoncontrol\"/></Band></Format></Formats>");
            this.divConfig.addChild(obj.name, obj);

            obj = new Grid("grdValues","grdRows:10","grdConfig:5",null,null,"10","8",null,null,null,null,this.divConfig.form);
            obj.set_taborder("4");
            obj.set_autofittype("col");
            obj.set_cssclass("grid_nxPv_editor");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"24\"/><Column size=\"120\"/><Column size=\"24\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell colspan=\"3\" text=\"values\"/></Band><Band id=\"body\"><Cell cssclass=\"expr:dataset.parent.fn_setAggregatorCSS(itemId)\"/><Cell col=\"1\" text=\"expr:dataset.parent.fn_setItemText(itemId)\"/><Cell col=\"2\" background=\"url('imagerc::btn_mdi_tabClose.png') no-repeat center\" cssclass=\"rowDel\" displaytype=\"buttoncontrol\"/></Band></Format></Formats>");
            this.divConfig.addChild(obj.name, obj);

            obj = new PopupMenu("popMenu","640","310","100","60",null,null,null,null,null,null,this);
            obj.set_captioncolumn("menuText");
            obj.set_idcolumn("menuId");
            obj.set_levelcolumn("menuLvl");
            obj.set_innerdataset("dsPopMenu");
            obj.set_cssclass("popmenu_nxPv_basic");
            this.addChild(obj.name, obj);

            obj = new Static("stDrag","640","270","20","20",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_border("2px dashed black");
            obj.set_visible("false");
            obj.set_text("");
            this.addChild(obj.name, obj);

            obj = new Button("btnConfig","10","10","60","15",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("config");
            obj.set_cssclass("btn_nxPv_tabBtn");
            obj.set_enable("false");
            this.addChild(obj.name, obj);

            obj = new Button("btnPanel","69","10","60","15",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("panel");
            obj.set_cssclass("btn_nxPv_tabBtn");
            this.addChild(obj.name, obj);

            obj = new Div("divPanel","158","483","200","150",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("Div00");
            obj.set_visible("false");
            obj.set_async("false");
            this.addChild(obj.name, obj);

            obj = new Div("divSettingPopup","168","493","200","150",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("Div00");
            obj.set_visible("false");
            obj.set_async("false");
            this.addChild(obj.name, obj);

            obj = new Button("btnSettigPopup","128","10","90","15",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("setting popup");
            obj.set_cssclass("btn_nxPv_tabBtn");
            this.addChild(obj.name, obj);

            obj = new PopupDiv("popDivAggregator","840","80","300","250",null,null,null,null,null,null,this);
            obj.set_visible("false");
            obj.set_cssclass("popdiv_nxPv_basic");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","10","0","40","30",null,null,null,null,null,null,this.popDivAggregator.form);
            obj.set_taborder("0");
            obj.set_text("Name");
            obj.set_cssclass("sta_nxPv_popTitle");
            this.popDivAggregator.addChild(obj.name, obj);

            obj = new Static("Static01","10","50","60","30",null,null,null,null,null,null,this.popDivAggregator.form);
            obj.set_taborder("1");
            obj.set_text("Function");
            obj.set_cssclass("sta_nxPv_popTitle");
            this.popDivAggregator.addChild(obj.name, obj);

            obj = new Edit("Edit00","10","25",null,"22","14",null,null,null,null,null,this.popDivAggregator.form);
            obj.set_taborder("2");
            obj.set_cssclass("edit_nxPv_popEdit");
            this.popDivAggregator.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","10","75",null,null,"14","15",null,null,null,null,this.popDivAggregator.form);
            obj.set_taborder("3");
            obj.set_acceptstab("true");
            obj.set_cssclass("txtarea_nxPv_popTxtarea");
            this.popDivAggregator.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",800,400,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","popDivAggregator.form.Edit00","value","dsConfig","itemAggregatorName");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","popDivAggregator.form.TextArea00","value","dsConfig","itemAggregatorFunction");
            this.addChild(obj.name, obj);
            obj.bind();
        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("ContentsEditor.xfdl", function() {
        //include "ContentsForm::Defines.xjs";

        /* internal variable */
        this._init_prop = null;
        this._pivotcontents = null;

        /* ContentsEditor Functions */
        this.setPrefixUrls = function ()
        {

        };

        this.GetSource = function ()
        {
        	//nexacro.__onNexacroStudioError("GetSource");
        	//nexacro.__onNexacroStudioError(this.makeJsonData());
        	return this.makeJsonData();
        };

        this.SetSource = function (sContents)
        {
        	//nexacro.__onNexacroStudioError("SetSource");

        	var configurationdata;

        	if(this.DS_OriginData.colcount>0)
        	{
        		this.makeConfigDataByDataset();
        	}

        	this.divPanel.form.makePanelDataByDataset();
        	this.divSettingPopup.form.makeSettingPopupDataByDataset();

        	if(this.isEmpty(sContents)==false)
        	{
        		configurationdata = JSON.parse(sContents);

        		if(this.isEmpty(configurationdata)==false)
        		{
        			if(this.isEmpty(configurationdata.config)==false){
        				this.makeConfigDataByConfig(configurationdata.config);
        			}

        			if(this.isEmpty(configurationdata.panel)==false){
        				this.divPanel.form.makePanelDataByConfig(configurationdata.panel);
        			}

        			if(this.isEmpty(configurationdata.settingpopup)==false){
        				this.divSettingPopup.form.makeSettingPopupDataByConfig(configurationdata.settingpopup);
        			}
        		}
        	}

        	if(this.btnPanel.enable==false)
        	{
        		this.divPanel.form.config = JSON.parse(this.makeConfigJsonData());
        		this.divPanel.form.onloadPanel();
        	}

        	if(this.btnSettigPopup.enable==false)
        	{
        		this.divSettingPopup.form.createSettingPopup();
        		this.divSettingPopup.form.createSettingPopupComp();
        	}

        	this.divConfig.form.grdConfig.set_binddataset("dsConfig");
        	this.divConfig.form.grdFields.set_binddataset("dsFields");
        	this.divConfig.form.grdRows.set_binddataset("dsRows");
        	this.divConfig.form.grdColumns.set_binddataset("dsColumns");
        	this.divConfig.form.grdValues.set_binddataset("dsValues");
        	this.divPanel.form.grdControlList.set_binddataset("dsProperties");
        };

        this.GetProperty = function (sPropName)
        {

        };

        this.SetProperty = function (sPropName,sPropVal,bSetDefault)
        {
        	//nexacro.CTSE.Chart.Util.recoverableProperty(this,this.controlName,"-1",sPropName,0,sPropVal,0,true,true,true);
        	return true;
        };

        this.SetDataset = function (sContents)
        {
        	//nexacro.__onNexacroStudioError("SetDataset");
        	if (!this.DS_OriginData)
        	{
        		var obj = new Dataset("DS_OriginData", this);
        		obj._setContents(sContents);
        		this.addChild(obj.name, obj);

        		this.on_created();
        	}else{
        		this.DS_OriginData._setContents(sContents);
        	}

        	return false;
        };

        this.CanUseUserProperty = function()
        {
        	return false;
        };

        this.AddUserProperty = function (property,value)
        {
        	return false;
        };

        this.DeleteUserProperty = function (property)
        {
        	return false;
        };

        this.GetUserPropertyList = function ()
        {
        	return "";
        };

        this.setZoom - function(v)
        {

        }

        this.getZoom = function()
        {
        	return 100;
        }
        this.SetComponentProperties = function (v)
        {
        	this._init_prop = v;
        };

        this.GetChangedComponentProperties = function ()
        {
        	var ret = [];

        	this.divPanel.form.config = JSON.parse(this.makeConfigJsonData());
        	this.divPanel.form.onloadPanel();

        	//ret.push("configurationdata:"+this.makeJsonData());

        	return ret;
        };

        this.GetUserPropertyList = function ()
        {
        	return "";
        };

        this.GetCommandList = function ()
        {
        	return "";
        };

        this.ExcuteAccelator = function(altkey,ctrlkey,shiftkey,keycode)
        {
        	return true;
        };

        this._canUndo = function()
        {

        };

        this.Undo = function()
        {

        };

        this.Redo = function()
        {

        };

        this._undo = function()
        {

        };

        this._canRedo = function()
        {

        };

        this._redo = function()
        {

        };

        this._addUndo = function(perform,data,save,execute,undraw,redraw)
        {

        };

        this._saveUndoBuffer = function()
        {

        };

        this.IsUnusePropertyGrid = function()
        {
        	return true;
        };

        this.callNotify_ContentsChange = function()
        {
        	//nexacro.__onNexacroStudioError("callNotify_ContentsChange");
        	return this.userNotifyCall(nexacro.CTSE.NotifyTypes.CHANGE_CONTENTS, null);
        };

        this.IsModified = function()
        {

        };

        this.EndEditor = function ()
        {

        };

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

        this.encodeString = function (source) {
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
        };

        this.decodeString = function (source) {
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
        };

        this.drag = false;

        this.Form_onload = function(obj,e)
        {
        	var objProp;
        	var configurationdata;

        	this.divPanel.set_url("ContentsForm::panel.xfdl");
        	this.divSettingPopup.set_url("ContentsForm::settingpopup.xfdl");
        	//this.setPrefixUrls();
        	this.divPanel.move(10, 30, null, null, 10, 10);
        	this.divSettingPopup.move(10, 30, null, null, 10, 10);

        	this.createCssClassList();

        	this.userNotifyCall(nexacro.CTSE.NotifyTypes.FORM_ONLOAD, "");
        };

        this.createCssClassList = function()
        {
        	var i;
        	var argList = {complist : []};
        	var arg = {};

        	var comptype;
        	var cssclass;

        	for(i=0;i<this.dsCssClass.rowcount;i++)
        	{
        		comptype = this.dsCssClass.getColumn(i, "comptype");
        		cssclass = this.dsCssClass.getColumn(i, "cssclass");

        		arg = {comptype : comptype, cssclass : cssclass, properties : []};

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

        		if(comptype=="STATIC"){
        			arg.properties[arg.properties.length] = "padding";
        			arg.properties[arg.properties.length] = "textAlign";
        			arg.properties[arg.properties.length] = "textDecoration";
        			arg.properties[arg.properties.length] = "verticalAlign";
        			arg.properties[arg.properties.length] = "wordWrap";
        		}else if(comptype=="BUTTON"){
        			arg.properties[arg.properties.length] = "icon";
        			arg.properties[arg.properties.length] = "iconPosition";
        			arg.properties[arg.properties.length] = "padding";
        			arg.properties[arg.properties.length] = "textAlign";
        			arg.properties[arg.properties.length] = "textDecoration";
        			arg.properties[arg.properties.length] = "textPadding";
        			arg.properties[arg.properties.length] = "verticalAlign";
        			arg.properties[arg.properties.length] = "wordWrap";
        		}
        		argList.complist[argList.complist.length]  = arg;
        	}
        	var argString = JSON.stringify(argList, null, "\t");
        	//nexacro.__onNexacroStudioError(argString);

        	//nexacro.__onNexacroStudioError(this.userNotifyCall(nexacro.CTSE.NotifyTypes.GET_COMPUTED_STYLE, argString));

        	this._cssclasslist = JSON.parse(this.userNotifyCall(nexacro.CTSE.NotifyTypes.GET_COMPUTED_STYLE, argString));
        	//nexacro.__onNexacroStudioError(JSON.stringify(this._cssclasslist, null, "\t"));
        }

        /* Form_ContentsEditor Util Function*/
        this.userNotifyCall = function (strId,strMsg,bRetry)
        {
        	var rtn;
        	try
        	{
        		rtn = nexacro.CTSE.userNotify(strId, strMsg);
        	}
        	catch(e)
        	{
        		if(!bRetry)
        		{
        			//trace("userNotifyCall error");
        			//trace(e.toString());
        		}
        		return false;
        	}
        	return rtn;
        };

        this.makeConfigDataByDataset = function(){
        	var i;
        	var nRow;
        	var nCount = this.DS_OriginData.colcount - this.DS_OriginData.constcount;

        	var objColumnInfo;
        	var sColumnId;
        	var sColumnType;
        	var nItemWidth = 100;

        	this.dsConfig.clearData();
        	this.dsFields.clearData();
        	this.dsColumns.clearData();
        	this.dsRows.clearData();
        	this.dsValues.clearData();
        	this.dsSortId.clearData();

        	this.dsSortId.set_enableevent(false);
        	this.dsConfig.set_enableevent(false);
        	for(i=0;i<nCount;i++){
        		nRow = this.dsConfig.addRow();
        		objColumnInfo = this.DS_OriginData.getColumnInfo(i);
        		sColumnId = objColumnInfo.name;
        		sColumnType = objColumnInfo.type;

        		if(sColumnType=="STRING"||sColumnType=="BLOB"||sColumnType=="TIME"){
        			sColumnType = "string";
        		}else if(sColumnType=="INT"||sColumnType=="FLOAT"||sColumnType=="BIGDECIMAL"){
        			sColumnType = "number";
        		}else if(sColumnType=="DATE"||sColumnType=="DATETIME"){
        			sColumnType = "date";
        		}

        		this.dsConfig.setColumn(nRow, "itemId", sColumnId);
        		this.dsConfig.setColumn(nRow, "itemText", sColumnId);
        		this.dsConfig.setColumn(nRow, "itemType", sColumnType);
        		this.dsConfig.setColumn(nRow, "itemWidth", nItemWidth);
        		this.dsConfig.setColumn(nRow, "itemSort", "ASC");
        		this.dsConfig.setColumn(nRow, "itemSortId", sColumnId);

        		if(sColumnType=="string"){
        			this.dsConfig.setColumn(nRow, "itemAggregator", "CNT");
        		}else if(sColumnType=="number"){
        			this.dsConfig.setColumn(nRow, "itemAggregator", "SUM");
        		}else if(sColumnType=="date"){
        			this.dsConfig.setColumn(nRow, "itemAggregator", "CNT");
        		}

        		this.dsConfig.setColumn(nRow, "filterOperation", "none");

        		nRow = this.dsSortId.addRow();
        		this.dsSortId.setColumn(nRow, "code", sColumnId);
        		this.dsSortId.setColumn(nRow, "value", sColumnId);
        	}
        	this.dsConfig.set_enableevent(true);
        	this.dsConfig.set_enableevent(false);
        	this.dsConfig.set_rowposition(-1);
        	this.dsConfig.set_rowposition(0);
        }

        this.makeConfigDataByConfig = function(config){
        	this.makeConfigItemsDataByConfig(config.fields, this.dsFields);
        	this.makeConfigItemsDataByConfig(config.colAxis, this.dsColumns);
        	this.makeConfigItemsDataByConfig(config.rowAxis, this.dsRows);
        	this.makeConfigItemsDataByConfig(config.values, this.dsValues);

        	this.makeConfigFiltersDataByConfig(config.filters);

        	this.divConfig.form.grdFields.redrawExprCell("body");
        	this.divConfig.form.grdColumns.redrawExprCell("body");
        	this.divConfig.form.grdRows.redrawExprCell("body");
        	this.divConfig.form.grdValues.redrawExprCell("body");
        }

        this.makeConfigItemsDataByConfig = function(items, targetDs){

        	var nCount = items.length;
        	var nFRow;
        	var id = "";
        	var itemText = "";
        	var type = "";
        	var itemWidth = "";
        	var sort = "";
        	var sortId = "";
        	var aggregator = "";
        	var aggregatorName = "";
        	var aggregatorFunc = "";
        	var filterOperation = "";
        	var filterValue = "";

        	if(this.DS_OriginData.colcount==0)return;

        	this.dsConfig.set_enableevent(false);
        	for(i=0;i<nCount;i++){
        		id = items[i].id;
        		itemText = items[i].itemText;
        		type = items[i].type;
        		itemWidth = items[i].itemWidth;
        		sort = items[i].sort;
        		sortId = this.isEmpty(items[i].sortId)==false ? items[i].sortId : id;
        		aggregator = items[i].aggregator;

        		if(aggregator==""){
        			aggregator = "FUNC";
        			aggregatorName = "";
        			aggregatorFunc = "";
        		}else if(typeof aggregator === "object"){
        			aggregator = "FUNC";
        			aggregatorName = items[i].aggregator.name;
        			aggregatorFunc = this.decodeString(items[i].aggregator.func);
        		}

        		targetDs.addRow();
        		targetDs.setColumn(i, "itemId", id);
        		targetDs.setColumn(i, "itemText", itemText);

        		nFRow = this.dsConfig.findRow("itemId", id);
        		if(nFRow>-1)
        		{

        			this.dsConfig.setColumn(nFRow, "chk", "1");
        			this.dsConfig.setColumn(nFRow, "itemText", itemText);
        			this.dsConfig.setColumn(nFRow, "itemType", type);
        			this.dsConfig.setColumn(nFRow, "itemWidth", itemWidth);
        			this.dsConfig.setColumn(nFRow, "itemSort", sort);
        			this.dsConfig.setColumn(nFRow, "itemSortId", sortId);
        			this.dsConfig.setColumn(nFRow, "itemAggregator", aggregator);
        			this.dsConfig.setColumn(nFRow, "itemAggregatorName", aggregatorName);
        			this.dsConfig.setColumn(nFRow, "itemAggregatorFunction", aggregatorFunc);
        		}
        	}
        	this.dsConfig.set_enableevent(true);
        };

        this.makeConfigFiltersDataByConfig = function(filters)
        {
        	var i;
        	var nFRow;
        	var id;
        	var operation;
        	var values;

        	if(this.DS_OriginData.colcount==0)return;

        	for(i=0;i<filters.length;i++)
        	{
        		id = filters[i].id;
        		operation = filters[i].operation;
        		values = filters[i].values;

        		nFRow = this.dsConfig.findRow("itemId", id);
        		if(nFRow>-1)
        		{
        			this.dsConfig.setColumn(nFRow, "filterOperation", operation);
        			this.dsConfig.setColumn(nFRow, "filterValue", values);
        		}
        	}
        };

        this.grdConfig_onheadclick = function(obj,e)
        {
        	var i;
        	var objDs = obj.getBindDataset();
        	var rowCount = objDs.rowcount;

        	if(e.col==0){
        		if(objDs.getCaseCount("chk==1")==rowCount){
        			for(i=0;i<rowCount;i++){
        				objDs.setColumn(i, "chk", "0");
        			}
        		}else{
        			for(i=0;i<rowCount;i++){
        				objDs.setColumn(i, "chk", "1");
        			}
        		}
        	}
        };

        this.grdConfig_onrbuttonup = function(obj,e)
        {
        	this.popMenu.trackPopupByComponent(obj, e.canvasx+this.divConfig.getOffsetLeft(), e.canvasy+this.divConfig.getOffsetTop());
        };

        this.popMenu_onmenuclick = function(obj,e)
        {
        	var i;
        	var arrRows =  this.divConfig.form.grdConfig.getSelectedDatasetRows();
        	var nLength = arrRows.length;
        	var rowIdx;

        	for(i=0;i<nLength;i++){
        		rowIdx = arrRows[i];

        		this.dsConfig.setColumn(rowIdx, "chk", e.id);
        	}

        	this.divConfig.form.grdFields.redrawExprCell("body");
        	this.divConfig.form.grdColumns.redrawExprCell("body");
        	this.divConfig.form.grdRows.redrawExprCell("body");
        	this.divConfig.form.grdValues.redrawExprCell("body");
        };

        this.fn_setItemText = function(itemId){
        	var nFRow = this.dsConfig.findRow("itemId", itemId);
        	if(nFRow<0)return;
        	var itemText = this.dsConfig.getColumn(nFRow, "itemText");

        	return itemText;
        }

        this.fn_setSortCSS = function(itemId){
        	var nFRow = this.dsConfig.findRow("itemId", itemId);
        	if(nFRow<0)return;

        	var itemSort = this.dsConfig.getColumn(nFRow, "itemSort");

        	if(itemSort=="ASC")return "cell_item_status_up";
        	else return "cell_item_status_down";
        }

        this.fn_setFilterCSS = function(itemId){
        	var nFRow = this.dsConfig.findRow("itemId", itemId);
        	if(nFRow<0)return;
        	var filterOperation = this.dsConfig.getColumn(nFRow, "filterOperation");

        	if(filterOperation=="none")return "";
        	else return "cell_item_status_filter";
        }

        this.fn_setAggregatorCSS = function(itemId){
        	var nFRow = this.dsConfig.findRow("itemId", itemId);
        	if(nFRow<0)return;
        	var itemAggregator = this.dsConfig.getColumn(nFRow, "itemAggregator");

        	return "cell_item_status_"+itemAggregator;
        }

        this.fn_setFilterText = function(itemId){
        	var nFRow = this.dsConfig.findRow("itemId", itemId);
        	if(nFRow<0)return;
        	var filterOperation = this.dsConfig.getColumn(nFRow, "filterOperation");

        	if(filterOperation=="none")return "";
        	else return "F";
        }

        this.dsConfig_oncolumnchanged = function(obj,e)
        {
        	var rowIdx;
        	var itemId;
        	this.callNotify_ContentsChange();
        	if(e.columnid=="chk"){
        		if(e.newvalue==1){
        			rowIdx = this.dsFields.addRow();
        			this.dsFields.copyRow(rowIdx, obj, e.row);
        		}else{
        			itemId = obj.getColumn(e.row, "itemId");

        			rowIdx = this.dsFields.findRow("itemId", itemId);
        			if(rowIdx>-1)this.dsFields.deleteRow(rowIdx);

        			rowIdx = this.dsColumns.findRow("itemId", itemId);
        			if(rowIdx>-1)this.dsColumns.deleteRow(rowIdx);

        			rowIdx = this.dsRows.findRow("itemId", itemId);
        			if(rowIdx>-1)this.dsRows.deleteRow(rowIdx);

        			rowIdx = this.dsValues.findRow("itemId", itemId);
        			if(rowIdx>-1)this.dsValues.deleteRow(rowIdx);
        		}

        	}else if(e.columnid=="itemAggregator")
        	{
        		obj.setColumn(e.row, "itemAggregatorName", "");
        		obj.setColumn(e.row, "itemAggregatorFunction", "");

        	}

        	this.divConfig.form.grdFields.redrawExprCell("body");
        	this.divConfig.form.grdColumns.redrawExprCell("body");
        	this.divConfig.form.grdRows.redrawExprCell("body");
        	this.divConfig.form.grdValues.redrawExprCell("body");
        };

        this.grdFields_oncellclick = function(obj,e)
        {
        	var objDs = obj.getBindDataset();
        	var itemId;
        	var rowIdx;

        	if(e.col==1){
        		itemId = objDs.getColumn(e.row, "itemId");
        		rowIdx = this.dsConfig.findRow("itemId", itemId);

        		this.dsConfig.set_enableevent(false);
        		this.dsConfig.setColumn(rowIdx, "chk", "0");
        		this.dsConfig.set_enableevent(true);
        		objDs.deleteRow(e.row);
        	}
        };

        this.grdColumns_oncellclick = function(obj,e)
        {
        	var objDs = obj.getBindDataset();
        	var itemId;
        	var rowIdx;

        	if(e.col==3){
        		itemId = objDs.getColumn(e.row, "itemId");
        		rowIdx = this.dsConfig.findRow("itemId", itemId);
        		this.dsConfig.set_enableevent(false);
        		this.dsConfig.setColumn(rowIdx, "chk", "0");
        		this.dsConfig.set_enableevent(true);
        		objDs.deleteRow(e.row);
        	}
        };

        this.grdRows_oncellclick = function(obj,e)
        {
        	var objDs = obj.getBindDataset();
        	var itemId;
        	var rowIdx;

        	if(e.col==3){
        		itemId = objDs.getColumn(e.row, "itemId");
        		rowIdx = this.dsConfig.findRow("itemId", itemId);
        		this.dsConfig.set_enableevent(false);
        		this.dsConfig.setColumn(rowIdx, "chk", "0");
        		this.dsConfig.set_enableevent(true);
        		objDs.deleteRow(e.row);
        	}
        };

        this.grdValues_oncellclick = function(obj,e)
        {
        	var objDs = obj.getBindDataset();
        	var itemId;
        	var rowIdx;

        	if(e.col==2){
        		itemId = objDs.getColumn(e.row, "itemId");
        		rowIdx = this.dsConfig.findRow("itemId", itemId);
        		this.dsConfig.set_enableevent(false);
        		this.dsConfig.setColumn(rowIdx, "chk", "0");
        		this.dsConfig.set_enableevent(true);
        		objDs.deleteRow(e.row);
        	}
        };

        this.grid_onlbuttondown = function(obj,e)
        {
        	this.drag = true;
        };

        this.grid_onlbuttonup = function(obj,e)
        {
        	if(this.drag==true){
        		this.drag = false;
        		this.stDrag.set_visible(false);
        	}
        };

        this.ContentEditor_ondragmove = function(obj,e)
        {
        	if(this.drag==true){
        		this.stDrag.set_visible(true);
        		this.stDrag.move(e.clientx+5, e.clienty+5);
        	}
        };

        this.grid_ondrag = function(obj,e)
        {
        	if(e.row>-1)
        	{
        		var objDs = obj.getBindDataset();
        		var itemId = objDs.getColumn(e.row, "itemId");
        		var userData = {targetDs:objDs, itemId:itemId};

        		e.userdata = userData;

        		return true;
        	}else
        	{
        		return false;
        	}
        };

        this.grid_ondrop = function(obj,e)
        {
        	var nFromRow;
        	var nToRow;
        	var objDs = obj.getBindDataset();
        	var targetDs = e.userdata.targetDs;
        	var itemId = e.userdata.itemId;

        	if(e.userdata.targetDs.name==objDs.name){
        		nFromRow = targetDs.findRow("itemId", itemId);
        		nToRow = e.row;
        		if(nToRow<0)nToRow = targetDs.rowcount-1;

        		objDs.moveRow(nFromRow, nToRow);

        	}else{
        		nFromRow = targetDs.findRow("itemId", itemId);

        		nToRow = e.row;

        		if(nToRow<0||nToRow==objDs.rowcount-1){
        			nToRow = objDs.addRow();
        		}else{
        			nToRow = objDs.insertRow(nToRow);
        		}

        		objDs.copyRow(nToRow, targetDs, nFromRow);

        		targetDs.deleteRow(nFromRow);
        	}
        	this.stDrag.set_visible(false);
        	this.callNotify_ContentsChange();
        	return true;
        };

        this.makeJsonData = function(){

        	var pivotcontents = "";
        		pivotcontents = '{"config":'+this.makeConfigJsonData();
        		pivotcontents += ',\n"panel":'+this.divPanel.form.makePanelJsonData();
        		pivotcontents += ',\n"settingpopup":'+this.divSettingPopup.form.makeSettingPopupJsonData();
        		pivotcontents += '}';

        	return pivotcontents;
        }

        this.makeConfigJsonData = function(){
        	var pivotcontents = '';
        		pivotcontents += '{	"fields" : [';
        		pivotcontents += this.makeItemJsonData(this.dsFields);
        		pivotcontents += '	],';

        		pivotcontents += '	"colAxis" : [';
        		pivotcontents += this.makeItemJsonData(this.dsColumns);
        		pivotcontents += '	],';

        		pivotcontents += '	"rowAxis" : [';
        		pivotcontents += this.makeItemJsonData(this.dsRows);
        		pivotcontents += '	],';

        		pivotcontents += '	"values" : [';
        		pivotcontents += this.makeItemJsonData(this.dsValues);
        		pivotcontents += '	],';

        		pivotcontents += '	"filters" : [';
        		pivotcontents += this.makeFilterJsonData();
        		pivotcontents += '	]}';
        	//nexacro.__onNexacroStudioError(pivotcontents);
        	var objJSON = JSON.parse(pivotcontents);
        	var sJSON = JSON.stringify(objJSON, null, "\t");

        	return sJSON;
        }

        this.makeItemJsonData = function(objDs){
        	var i;
        	var count = objDs.rowcount;
        	var findRowIdx;

        	var itemId;
        	var itemText;
        	var itemType;
        	var itemWidth;
        	var itemSort;
        	var itemSortId;
        	var itemAggregator;
        	var itemAggregatorName;
        	var itemAggregatorFunction;

        	var jsonString = "";

        	for(i=0;i<count;i++){
        		itemId = objDs.getColumn(i, "itemId");
        		findRowIdx = this.dsConfig.findRow("itemId", itemId);
        		itemText = this.dsConfig.getColumn(findRowIdx, "itemText");
        		itemType = this.dsConfig.getColumn(findRowIdx, "itemType");
        		itemWidth = this.dsConfig.getColumn(findRowIdx, "itemWidth");
        		itemSort = this.dsConfig.getColumn(findRowIdx, "itemSort");
        		itemSortId = this.dsConfig.getColumn(findRowIdx, "itemSortId");
        		itemAggregator = this.dsConfig.getColumn(findRowIdx, "itemAggregator");

        		if(itemAggregator=="FUNC")
        		{
        			itemAggregatorName = this.dsConfig.getColumn(findRowIdx, "itemAggregatorName");
        			itemAggregatorFunction = this.dsConfig.getColumn(findRowIdx, "itemAggregatorFunction");

        			if(this.isEmpty(itemAggregatorName)==true&&this.isEmpty(itemAggregatorFunction)==true)
        			{
        				itemAggregator = '""';
        			}else
        			{
        				itemAggregator = '{'

        				if(this.isEmpty(itemAggregatorName)==false)itemAggregator += '"name" : "'+itemAggregatorName+'"';
        				else itemAggregator += '"name" : ""';

        				if(this.isEmpty(itemAggregatorFunction)==false)itemAggregator += ', "func" : "'+this.encodeString(itemAggregatorFunction)+'"';
        				else itemAggregator += ', "func" : ""';

        				itemAggregator += '}';
        			}

        		}else
        		{
        			itemAggregator = '"'+itemAggregator+'"';
        		}

        		if(i==0)jsonString += '		{';
        		else jsonString += '		,{';
        		if(this.isEmpty(itemId)==false)jsonString += '"id":"'+itemId+'"';
        		if(this.isEmpty(itemText)==false)jsonString += ', "itemText":"'+itemText+'"';
        		if(this.isEmpty(itemType)==false)jsonString += ', "type":"'+itemType+'"';
        		if(this.isEmpty(itemWidth)==false)jsonString += ', "itemWidth":"'+itemWidth+'"';
        		if(this.isEmpty(itemSort)==false)jsonString += ', "sort":"'+itemSort+'"';
        		if(this.isEmpty(itemSortId)==false&&itemSortId!=itemId)jsonString += ', "sortId":"'+itemSortId+'"';
        		if(this.isEmpty(itemAggregator)==false)jsonString += ', "aggregator":'+itemAggregator;
        		jsonString += '}';
        	}

        	return jsonString;
        }

        this.makeFilterJsonData = function(){

        	var i;
        	var count = this.dsConfig.rowcount;
        	var findRowIdx;

        	var chk;
        	var itemId;
        	var filterOperation;
        	var filterValue;

        	var jsonString = "";

        	for(i=0;i<count;i++){
        		chk = this.dsConfig.getColumn(i, "chk");
        		if(chk=="1")
        		{
        			itemId = this.dsConfig.getColumn(i, "itemId");
        			filterOperation = this.dsConfig.getColumn(i, "filterOperation");
        			filterValue = this.dsConfig.getColumn(i, "filterValue");

        			if(filterOperation!="none")
        			{
        				jsonString += '{';
        				if(this.isEmpty(itemId)==false)jsonString += '"id":"'+itemId+'"';
        				if(this.isEmpty(filterOperation)==false)jsonString += ', "operation":"'+filterOperation+'"';
        				if(this.isEmpty(filterValue)==false)jsonString += ', "values":"'+filterValue+'"';
        				jsonString += '}';
        			}
        		}
        	}

        	if(jsonString!="")jsonString = nexacro.replaceAll(jsonString, "}{", "},{");

        	return jsonString;
        }

        this.btnConfig_onclick = function(obj,e)
        {
        	this.btnConfig.set_enable(true);
        	this.btnPanel.set_enable(true);
        	this.btnSettigPopup.set_enable(true);

        	obj.set_enable(false);

        	this.divConfig.set_visible(true);
        	this.divPanel.set_visible(false);
        	this.divSettingPopup.set_visible(false);
        };

        this.btnPanel_onclick = function(obj,e)
        {
        	this.btnConfig.set_enable(true);
        	this.btnPanel.set_enable(true);
        	this.btnSettigPopup.set_enable(true);

        	obj.set_enable(false);

        	this.divConfig.set_visible(false);
        	this.divPanel.set_visible(true);
        	this.divSettingPopup.set_visible(false);

        	this.divPanel.form.config = JSON.parse(this.makeConfigJsonData());

        	this.divPanel.form.onloadPanel();
        };

        this.btnSettigPopup_onclick = function(obj,e)
        {
        	this.btnConfig.set_enable(true);
        	this.btnPanel.set_enable(true);
        	this.btnSettigPopup.set_enable(true);

        	obj.set_enable(false);

        	this.divConfig.set_visible(false);
        	this.divPanel.set_visible(false);
        	this.divSettingPopup.set_visible(true);

        	this.divSettingPopup.form.createSettingPopup();
        	this.divSettingPopup.form.createSettingPopupComp();
        };

        this.divConfig_grdConfig_onexpanddown = function(obj,e)
        {
        	if(this.dsConfig.getColumn(e.row, "itemAggregator")=="FUNC")
        	{
        		var nLeft = 20 - this.popDivAggregator.getOffsetWidth();
        		var nTop = 20;
        		this.popDivAggregator.trackPopupByComponent(e.fromreferenceobject, nLeft, nTop);
        	}
        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_onload,this);
            this.addEventHandler("ondragmove",this.ContentEditor_ondragmove,this);
            this.divConfig.form.grdConfig.addEventHandler("onheadclick",this.grdConfig_onheadclick,this);
            this.divConfig.form.grdConfig.addEventHandler("onrbuttonup",this.grdConfig_onrbuttonup,this);
            this.divConfig.form.grdConfig.addEventHandler("onexpanddown",this.divConfig_grdConfig_onexpanddown,this);
            this.divConfig.form.grdFields.addEventHandler("onlbuttondown",this.grid_onlbuttondown,this);
            this.divConfig.form.grdFields.addEventHandler("onlbuttonup",this.grid_onlbuttonup,this);
            this.divConfig.form.grdFields.addEventHandler("ondrop",this.grid_ondrop,this);
            this.divConfig.form.grdFields.addEventHandler("ondrag",this.grid_ondrag,this);
            this.divConfig.form.grdFields.addEventHandler("oncellclick",this.grdFields_oncellclick,this);
            this.divConfig.form.grdColumns.addEventHandler("onlbuttondown",this.grid_onlbuttondown,this);
            this.divConfig.form.grdColumns.addEventHandler("onlbuttonup",this.grid_onlbuttonup,this);
            this.divConfig.form.grdColumns.addEventHandler("ondrag",this.grid_ondrag,this);
            this.divConfig.form.grdColumns.addEventHandler("ondrop",this.grid_ondrop,this);
            this.divConfig.form.grdColumns.addEventHandler("oncellclick",this.grdColumns_oncellclick,this);
            this.divConfig.form.grdRows.addEventHandler("oncellclick",this.grdRows_oncellclick,this);
            this.divConfig.form.grdRows.addEventHandler("onlbuttondown",this.grid_onlbuttondown,this);
            this.divConfig.form.grdRows.addEventHandler("onlbuttonup",this.grid_onlbuttonup,this);
            this.divConfig.form.grdRows.addEventHandler("ondrag",this.grid_ondrag,this);
            this.divConfig.form.grdRows.addEventHandler("ondrop",this.grid_ondrop,this);
            this.divConfig.form.grdValues.addEventHandler("oncellclick",this.grdValues_oncellclick,this);
            this.divConfig.form.grdValues.addEventHandler("onlbuttondown",this.grid_onlbuttondown,this);
            this.divConfig.form.grdValues.addEventHandler("onlbuttonup",this.grid_onlbuttonup,this);
            this.divConfig.form.grdValues.addEventHandler("ondrag",this.grid_ondrag,this);
            this.divConfig.form.grdValues.addEventHandler("ondrop",this.grid_ondrop,this);
            this.popMenu.addEventHandler("onmenuclick",this.popMenu_onmenuclick,this);
            this.btnConfig.addEventHandler("onclick",this.btnConfig_onclick,this);
            this.btnPanel.addEventHandler("onclick",this.btnPanel_onclick,this);
            this.btnSettigPopup.addEventHandler("onclick",this.btnSettigPopup_onclick,this);
            this.dsConfig.addEventHandler("oncolumnchanged",this.dsConfig_oncolumnchanged,this);
            this.dsProperties.addEventHandler("onrowposchanged",this.dsProperties_onrowposchanged,this);
            this.dsProperties.addEventHandler("oncolumnchanged",this.dsProperties_oncolumnchanged,this);
        };

        this.loadIncludeScript("ContentsEditor.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
