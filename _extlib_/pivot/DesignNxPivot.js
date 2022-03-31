if (nexacro.NxPivot) {
	var _pNxPivot= nexacro.NxPivot.prototype;

	_pNxPivot._use_makeContentsString = false;
	
	_pNxPivot.createCssDesignContents = function () {
		this.set_text("NxPivot");
	};

	_pNxPivot.resetScroll = function () {
		var form = this.form;

		if (form) {
			form.resetScroll();
		}
	};
	
	_pNxPivot.makeContentsString  = function()
	{
		return "<Contents><![CDATA[" + this._contentsDef + "]]></Contents>";
	};
	
	_pNxPivot.set_usetoolbar = function(v) {
		trace("■ set_usetoolbar 호출");
		if(NxPivotUtil.isEmpty(v)) {
			return;
		}
		
		v = nexacro._toBoolean(v);
		
		if(this.usetoolbar!=v)
		{
			this.usetoolbar = v;
			this._setContents(this.jsonContents);
		}
	};		
	
	_pNxPivot.set_useitems = function(v) {
		trace("■ set_useitems 호출");
		if(NxPivotUtil.isEmpty(v)) {
			return;
		}
		
		v = nexacro._toBoolean(v);
		
		if(this.useitems!=v)
		{
			this.useitems = v;
			this._setContents(this.jsonContents);
		}
	};	
	
	_pNxPivot._setContents = function(str)
	{
		var sId;
		var nLeft;
		var nTop;
		var nWidth;
		var nHeight;
		var nRight;
		var nBottom;
		var sCssClass;
		var sText;
		
		if(NxPivotUtil.isEmpty(str))str = JSON.parse(this._contentsDef);
		
		this.jsonContents = str;//JSON.parse(this.decodeString(str.replace("<Contents>", "").replace("</Contents>", "")));
		var sXML = "";
		
		var panel;
		var toolbar;
		var items;
		
		if(NxPivotUtil.isEmpty(this.jsonContents.panel)==false){
			panel = this.jsonContents.panel
		}
		
		if(NxPivotUtil.isEmpty(panel.toolbar)==false){
			toolbar = panel.toolbar;
		}
		
		if(NxPivotUtil.isEmpty(panel.items)==false){
			items = panel.items;
		}
						
		var nCompCount = this.form.components.length;
				
		for(i=nCompCount-1;i>=0;i--){
			
			this.form.removeChild(this.form.components[i].name);
		}
		
		sId = "divPanel";
		nLeft = 0;
		nTop = 0;
		nWidth = null;
		nHeight = 0;
		nRight = 0;
		nBottom = null;
		sCssClass = null;
		sText = null;
		
		if(this.usetoolbar==true){
			nHeight += nexacro.toNumber(toolbar.size);
		}
		
		if(this.useitems==true){
			nHeight += nexacro.toNumber(items.size);
		}
		
		sXML += '<Layouts>\n';
		sXML += '<Layout>\n';
		sXML += this.makeCompXML("DIV", sId, nLeft, nTop, nWidth, nHeight, nRight, nBottom, sCssClass, sText);
		sXML += '<Layouts>\n';
		sXML += '<Layout>\n';
		
		if(this.usetoolbar==true)sXML += this.makeToolbarXML(this.jsonContents);
		if(this.useitems==true)sXML += this.makeItemsXML(this.jsonContents, "fields", null);
		if(this.useitems==true)sXML += this.makeItemsXML(this.jsonContents, "colAxis", "fields");
		if(this.useitems==true)sXML += this.makeItemsXML(this.jsonContents, "rowAxis", "colAxis");
		if(this.useitems==true)sXML += this.makeItemsXML(this.jsonContents, "values", "rowAxis");
		
		sXML += '</Layout>\n';
		sXML += '</Layouts>\n';
		sXML += '</Div>\n';
		
		if(this.usetoolbar==false&&this.useitems==false)sXML += '<Grid id="grdPivot" left="0" top="divPanel:0" right="0" bottom="0" cssclass="NxPivot_grid"/>';
		else sXML += '<Grid id="grdPivot" left="0" top="divPanel:10" right="0" bottom="0" cssclass="NxPivot_grid"/>';
			
		sXML += '</Layout>\n';
		sXML += '</Layouts>\n';
		
		this._setContentsXML(sXML);
	};
	
	_pNxPivot.makeToolbarXML = function(objJson){
		
		var sId;
		var nLeft;
		var nTop;
		var nWidth;
		var nHeight;
		var nRight;
		var nBottom;
		var sCssClass;
		var sText;
		var sToggle;
		var sButtonId;
		var objButton;
		
		var panel = objJson.panel;
		var toolbar = panel.toolbar;
		var lbuttons = toolbar.lbuttons;
		var rbuttons = toolbar.rbuttons;
		var items = panel.items;
		
		var arrPadding = toolbar.padding.split(" ");
		var nGap = nexacro.toNumber(toolbar.gap);
		var nButtonSize = nexacro.toNumber(toolbar.buttonsize);
		
		sId = "divToolbar";
		nLeft = 0;
		nTop = 0;
		nWidth = null;
		nHeight = nexacro.toNumber(toolbar.size);
		nRight = 0;
		nBottom = null;
		sCssClass = toolbar.cssclass;
		sText = null;
		
		var sXML = "";
		sXML += this.makeCompXML("DIV", sId, nLeft, nTop, nWidth, nHeight, nRight, nBottom, sCssClass, sText);
		sXML += '<Layouts>\n';
		sXML += '<Layout>\n';
		
		nLeft = nexacro.toNumber(arrPadding[0]);
		for(sButtonId in lbuttons){
			objButton = lbuttons[sButtonId];
			sId = "btn"+sButtonId;
			nTop = nexacro.toNumber(arrPadding[1]);
			nWidth = nButtonSize;
			nHeight = null
			nRight = null;
			nBottom = nexacro.toNumber(arrPadding[3]);
			sCssClass = objButton.cssclass;
			sToggle = objButton.toggle;
			sToggleValue = objButton.togglevalue || "0";
			sText = null;
			
			sXML += this.makeCompXML("BUTTON", sId, nLeft, nTop, nWidth, nHeight, nRight, nBottom, sCssClass, sText, sToggle, sToggleValue);
			
			nLeft = nLeft + nWidth + nGap;
		}
		
		nRight = nexacro.toNumber(arrPadding[2]);
		for(sButtonId in rbuttons){
			objButton = rbuttons[sButtonId];
			sId = "btn"+sButtonId;
			nLeft = null;
			nTop = nexacro.toNumber(arrPadding[1]);
			nWidth = nButtonSize;
			nHeight = null
			nBottom = nexacro.toNumber(arrPadding[3]);
			sCssClass = objButton.cssclass;
			sToggle = objButton.toggle;
			sToggleValue = objButton.togglevalue || "0";
			sText = null;
			
			sXML += this.makeCompXML("BUTTON", sId, nLeft, nTop, nWidth, nHeight, nRight, nBottom, sCssClass, sText, sToggle, sToggleValue);
			
			nRight = nRight + nWidth + nGap;
		}
		
		sXML += '</Layout>\n';
		sXML += '</Layouts>\n';
		sXML += '</Div>\n';
		return sXML;
	}
	
	_pNxPivot.makeItemsXML = function(objJson, sItemsId, sItemsIdBefor){
		
		var i;
		var sId;
		var nLeft;
		var nTop;
		var nWidth;
		var nHeight;
		var nRight;
		var nBottom;
		var sCssClass;
		var sText;
		
		var configItemInfo;
		var configItemsInfo = objJson.config[sItemsId]	;
		var filters = objJson.config.filters;
		var nCount = configItemsInfo.length;
		
		var panel = objJson.panel;
		var items = panel.items;
		var itemsSize = nexacro.toNumber(items.size);
		var itemsPadding = items.padding.split(" ");
		var itemsPaddingLeft = nexacro.toNumber(itemsPadding[0]);
		var itemsPaddingTop = nexacro.toNumber(itemsPadding[1]);
		var itemsPaddingWidth = nexacro.toNumber(itemsPadding[2]);
		var itemsPaddingHeight = nexacro.toNumber(itemsPadding[3]);
		
		var itemsGap = nexacro.toNumber(items.gap);
		var itemsTitlebarSize = nexacro.toNumber(items.titlebarsize);
		var itemsCssClass1 = items.cssclass1; 
		var itemsCssClass2 = items.cssclass2;
		var itemsTitlebarCssClass = items.titlebarcssclass;
		
		var toolbar = panel.toolbar;
		var item = items.item;
		var itemWidth = nexacro.toNumber(item.width);
		var itemHeight = nexacro.toNumber(item.height);
		var itemPadding = item.padding.split(" ");
		var itemPaddingLeft = nexacro.toNumber(itemPadding[0]);
		var itemPaddingTop = nexacro.toNumber(itemPadding[1]);
		var itemPaddingWidth = nexacro.toNumber(itemPadding[2]);
		var itemPaddingHeight = nexacro.toNumber(itemPadding[3]);
		
		var itemGap = nexacro.toNumber(item.gap);
		var itemSortSize = nexacro.toNumber(item.sortsize);
		var itemFilterSize = nexacro.toNumber(item.filtersize);
		var itemAggregatorSize = nexacro.toNumber(item.aggregatorsize);
		var itemButtonSize = nexacro.toNumber(item.buttonsize);
		
		var itemCssClass = item.cssclass;
		var itemSortAscCssClass = item.sortasccssclass;
		var itemSortDescCssClass = item.sortdesccssclass;
		var itemFilterCssClass = item.filtercssclass;
		var itemAggregatorCssClass = item.aggregatorcssclass;
		var itemSettingCssClass = item.settingcssclass;
		var itemNameCssClass = item.namecssclass;
		
		var width = this.getOffsetWidth()/4;
		
		var itemCount = nexacro.floor(width/(itemWidth+itemsPaddingLeft+itemsPaddingWidth));
		
		if(itemCount==0)itemCount = 1;
		
		var sXML = "";
		
		sId = "div"+sItemsId;
		
		if(this.usetoolbar==true)nTop = nexacro.toNumber(toolbar.size);
		else nTop = 0;
			
		nWidth = "25%";
		nHeight = itemsSize;
		nRight = null;
		nBottom = null;
		sText = null;
		
		if(sItemsIdBefor==null)nLeft = 0;
		else nLeft = "div"+sItemsIdBefor+":-1";
		
		if(sItemsId=="fields"||sItemsId=="values")sCssClass = itemsCssClass1;
		else sCssClass = itemsCssClass2;
		
		if(sItemsId=="values"){
			nWidth = null;
			nRight = 0;
		}
		
		sXML += this.makeCompXML("DIV", sId, nLeft, nTop, nWidth, nHeight, nRight, nBottom, sCssClass, sText, null);
		sXML += '<Layouts>\n';
		sXML += '<Layout>\n';
		
		sId = "stTitle";
		nLeft = itemsPaddingLeft;
		nTop = itemsPaddingTop;
		nWidth = null;
		nHeight = itemsTitlebarSize;
		nRight = itemsPaddingWidth;
		nBottom = null;
		sCssClass = itemsTitlebarCssClass+"_"+sItemsId;
		sText = sItemsId;
		sXML += this.makeCompXML("STATIC", sId, nLeft, nTop, nWidth, nHeight, nRight, nBottom, sCssClass, sText, null);
		
		for(i=0;i<nCount;i++){
			configItemInfo = configItemsInfo[i];
			
			sId = configItemInfo.id+"Item";
			nLeft = itemsPaddingLeft + (itemWidth * (i%itemCount)) + ((itemGap) * (i%itemCount));
			nTop = itemsTitlebarSize + itemsPaddingTop + itemsGap + (nexacro.floor(i/itemCount)*(itemHeight+itemsGap));
			nWidth = itemWidth;
			nHeight = itemHeight;
			nRight = null;
			nBottom = null;
			sCssClass = itemCssClass;
			sText = null;
			
			sXML += this.makeCompXML("STATIC", sId, nLeft, nTop, nWidth, nHeight, nRight, nBottom, sCssClass, sText, null);
			
			itemAggregatorLeft = itemSortLeft = nLeft+itemPaddingLeft;
			itemAggregatorTop = itemSortTop = nTop+itemPaddingTop;
			
			itemFilterLeft = itemSortLeft + itemSortSize+itemGap;
			itemFilterTop = nTop+itemPaddingTop;
			
			itemStatusHeight = nHeight-itemPaddingTop-itemPaddingHeight;
			
			itemButtonLeft = nLeft+nWidth-itemButtonSize-itemPaddingWidth;
			itemButtonTop = nTop+itemPaddingTop;
			
			itemTextLeft = itemSortLeft;
			
			
			if((sItemsId=="colAxis"||sItemsId=="rowAxis")){
				if(configItemInfo.sort=="ASC")sCssClass = itemSortAscCssClass;
				else if(configItemInfo.sort=="DESC")sCssClass = itemSortDescCssClass;
				
				sId = configItemInfo.id+"img01";
				sXML += this.makeCompXML("STATIC", sId, itemSortLeft, itemSortTop, itemSortSize, itemStatusHeight, null, null, sCssClass, null, null);
				itemTextLeft  = itemSortLeft + itemSortSize + itemGap;
				
				for(j=0;j<filters.length;j++){
					if(filters[j].id==configItemInfo.id){
						sId = configItemInfo.id+"img02";
						sCssClass = itemFilterCssClass;
						sXML += this.makeCompXML("STATIC", sId, itemFilterLeft, itemFilterTop, itemFilterSize, itemStatusHeight, null, null, sCssClass, null, null);
						itemTextLeft = itemFilterLeft + itemFilterSize + itemGap;
					}
				}
				
				sId = configItemInfo.id+"btn";
				sCssClass = itemSettingCssClass;
				sXML += this.makeCompXML("BUTTON", sId, itemButtonLeft, itemButtonTop, itemButtonSize, itemStatusHeight, null, null, sCssClass, null, null);
			}else if(sItemsId=="values"){
				
				if(NxPivotUtil.isString(configItemInfo.aggregator)==true&&NxPivotUtil.isEmpty(configItemInfo.aggregator)==false)
				{
					aggregatorString = "_"+configItemInfo.aggregator.toLowerCase();
				}else
				{
					aggregatorString = "_func";
				}
				sId = configItemInfo.id+"img01";
				sCssClass = itemAggregatorCssClass+aggregatorString;
				
				sXML += this.makeCompXML("STATIC", sId, itemAggregatorLeft, itemAggregatorTop, itemAggregatorSize, itemStatusHeight, null, null, sCssClass, "", null);
				itemTextLeft  = itemAggregatorLeft + itemAggregatorSize + itemGap;
				
				sId = configItemInfo.id+"btn";
				sCssClass = itemSettingCssClass;
				sXML += this.makeCompXML("BUTTON", sId, itemButtonLeft, itemButtonTop, itemButtonSize, itemStatusHeight, null, null, sCssClass, null, null);
			}
			
			itemTextWidth = itemButtonLeft - itemTextLeft - itemGap;
			
			sId = configItemInfo.id+"txt";
			sCssClass = itemNameCssClass;
			sText = configItemInfo.itemText;
			sXML += this.makeCompXML("STATIC", sId, itemTextLeft, nTop, itemTextWidth, nHeight, null, null, sCssClass, sText, null);
			
		}
		
		sXML += '</Layout>\n';
		sXML += '</Layouts>\n';	
		sXML += '</Div>\n';	
		return sXML;
	}
	
	_pNxPivot.makeCompXML = function(sCompType, sId, nLeft, nTop, nWidth, nHeight, nRight, nBottom, sCssClass, sText, sToggle, sToggleValue){
	
		var strXML = "";
		var strParam = "";
		
		if(sId!=null)strParam += 'id="'+sId+'" ';
		if(nLeft!=null)strParam += 'left="'+nLeft+'" ';
		if(nTop!=null)strParam += 'top="'+nTop+'" ';
		if(nWidth!=null)strParam += 'width="'+nWidth+'" ';
		if(nHeight!=null)strParam += 'height="'+nHeight+'" ';
		if(nRight!=null)strParam += 'right="'+nRight+'" ';
		if(nBottom!=null)strParam += 'bottom="'+nBottom+'" ';
		
		if(sCssClass!=null){
			if(sToggle==1){
				strParam += 'cssclass="'+sCssClass.split(",")[sToggleValue]+'" ';
			}else{
				strParam += 'cssclass="'+sCssClass+'" ';
			}
		}
		
		if(sText!=null)strParam += 'text="'+sText+'" ';
			
		if(sCompType=="DIV"){
			strXML = '<Div '+ strParam + '>\n';
		}else if(sCompType=="STATIC"){
			strXML = '<Static '+ strParam + '/>\n';
		}else if(sCompType=="BUTTON"){
			strXML = '<Button '+ strParam + '/>\n';
		}
		
		return strXML;
	};
	
	_pNxPivot._setContentsXML = function (str) {
		//alert("_setContents");
		//??? 제너레이트 파일에 Layouts 태그 default값이 생성되지 않아 임시처리.
		if(str == "") {
		    str = "<Layouts><Layout/></Layouts>";
		};
		
		var doc = nexacro._parseXMLDocument(str);
		
		var layouts = doc.getElementsByTagName("Layouts")[0];
		
		if (!layouts) {
			layouts = doc;
		}
		
		var layout = layouts.getElementsByTagName("Layout")[0];

		if (!layout) {
			return false;
		}

		var ret = true;

		var node = layout.firstChild;

		while (node) {
			if (node.nodeType == 1) {
				var fnConstructor = nexacro[node.tagName];

				if (!fnConstructor) {
					return false;
				}

				if (fnConstructor && fnConstructor.prototype && fnConstructor.prototype._is_component) {
					var attr = {
					};
					var attr_props = {
					};
					for (var i = 0; i < node.attributes.length; i++) {
						var name = node.attributes[i].name;
						if (/^(id|left|top|width|height|right|bottom|minwidth|maxwidth|minheight|maxheight|)$/.test(name)) {
							attr[name] = node.attributes[i].value;
						}
						else {
							attr_props[name] = node.attributes[i].value;
						}
					}

					var obj = new fnConstructor(attr["id"], attr["left"], attr["top"], attr["width"], attr["height"], attr["right"], attr["bottom"], attr["minwidth"], attr["maxwidth"], attr["minheight"], attr["maxheight"], this.form);

					for (var v in attr_props) {
						if (obj["set_" + v]) {
							obj["set_" + v](attr_props[v]);
						}
						else {
							obj[v] = attr_props[v];
						}
					}

					if (node.firstChild) {
						
						var childnode = node.firstChild;

						var strXML = "";
						while (childnode) {
							if (node.nodeType == 1) {
								strXML += nexacro._documentToXml(childnode);
							}

							childnode = childnode.nextSibling;
						}
						ret = obj._setContents(strXML);
					}

					if (!ret) {
						return ret;
					}
					
					if(this.useitems==true&&obj.id=="divPanel")
					{
						obj.form.divfields.form.set_scrollbarsize(10);
						obj.form.divcolAxis.form.set_scrollbarsize(10);
						obj.form.divrowAxis.form.set_scrollbarsize(10);
						obj.form.divvalues.form.set_scrollbarsize(10);
						
						obj.form.divfields.form.set_scrolltype("vertical");
						obj.form.divcolAxis.form.set_scrolltype("vertical");
						obj.form.divrowAxis.form.set_scrolltype("vertical");
						obj.form.divvalues.form.set_scrolltype("vertical");
						
					}
					
					this.form.addChild(obj.id, obj);

					obj.show();
					obj = null;
				}
			}
			node = node.nextSibling;
		}
		doc = null;

		return ret;
	};
	
	_pNxPivot.getComputedStyles = function(arg)
	{
		var i;
		var objArg = JSON.parse(arg);
		var comptype;
		var cssclass; 
		var properties;
		
		var tempComp;
		
		var tempComp_DIV;
		var tempComp_STATIC;
		var tempComp_BUTTON;
		
		var controlElm;
		
		var rtn;
		var rtnList = {};
		var rtnString;
		
		for(i=0;i<objArg.complist.length;i++)
		{
			comptype = objArg.complist[i].comptype;
			cssclass = objArg.complist[i].cssclass;
			properties = objArg.complist[i].properties;
			
			rtn = {cssclass : cssclass, properties : ""};
			
			if(comptype=="DIV")tempComp = new Div(cssclass, 0, 0, 10, 10, null, null, null, null, null, null, this.form);
			else if(comptype=="STATIC")tempComp = new Static(cssclass, 0, 0, 10, 10, null, null, null, null, null, null, this.form);
			else if(comptype=="BUTTON")tempComp = new Button(cssclass, 0, 0, 10, 10, null, null, null, null, null, null, this.form);
			else if(comptype=="POPUPDIV")tempComp = new PopupDiv(cssclass, 0, 0, 10, 10, null, null, null, null, null, null, this.form);
						
			tempComp.set_cssclass(cssclass);
			
			tempComp.createComponent();
			
			nexacro._flushCommand(this._getWindow());
			
			control_elem = tempComp.getElement();
						
			rtn.properties = nexacro._getComputedStyleProperties(control_elem, properties, null, true);
			
			rtnList[cssclass] = rtn;
			
			tempComp.destroy();
		}
		
		rtnString = JSON.stringify(rtnList);
		
		return rtnString;
	};
	
	_pNxPivot.onloadPivot = function() {
		if(NxPivotUtil.isEmpty(this.configurationdata)) {
			this.configurationdata = JSON.parse(this._contentsDef);
		}
	};
	
	delete _pNxPivot;
}