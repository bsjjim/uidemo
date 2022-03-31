/**
*  Validation 체크
*  @FileName 	Validation.js 
*  @Creator 	양경호
*  @CreateDate 	2022.01.28
*  @Desction   	validation check
************** 소스 수정 이력 ***********************************************
*  date          		Modifier                Description
*******************************************************************************
*  2022.01.28     	양경호 	                최초 생성 

*******************************************************************************
*/

var pForm = nexacro.Form.prototype;

/************************************************************************************************
* 정합성 check 공통 기능
************************************************************************************************/

// Validation ERROR class 사용 여부
pForm.useErrorClass = false;

/**
 * Dataset에 설정된 정합성체크 RuleSet을 Clear한다.
 * @param {Dataset} obj - 데이터셋 Object
 * @return N/A
 */  
pForm.gfnClearValidation = function(obj)
{
	obj.validationRuleSet = "";
};


/**
 * Dataset의 Column별로 정합성체크 Rule을 등록한다.
 * @param {Dataset} obj - 데이터셋 Object
 * @param {String} sColumID - 체크대상 컬럼명
 * @param {String} sColumName - 컬럼명의 오류메세지 처리 제목
 * @param {String} sValidRule - 정합성체크 Rule(required, length, min, max, code 등의 체크 형식)
 * @return N/A
 */
pForm.gfnSetValidation = function(obj, sColumID, sColumName, sValidRule)
{
	var validObj = new Array();
	
	// title이 2개가 올 경우 구분자를 변경
	// checkrule == "equalto" || checkrule == "fromto" || checkrule == "comparebig" || checkrule == "comparesmall"
	if (sColumName.indexOf(",") != -1) sColumName = nexacro.replaceAll(sColumName, ",", "^_^");
    
	// Dataset에 RuleSet이 존재하면
	if (!this.gfnIsNull(obj.validationRuleSet))
	{
		validObj = JSON.parse(obj.validationRuleSet);
		for(var index in validObj)
		{
			// 컬럼에 Rule이 존재하면 변경 처리
			if( validObj[index].name == sColumID )
			{            
				validObj[index].title = sColumName;
				validObj[index].value = sValidRule;
				if (""+sValidRule.indexOf("required") > -1) {
					validObj[index].notnull = true;
				}
				else {
					validObj[index].notnull = false;
				}
				obj.validationRuleSet = JSON.stringify(validObj);
				return true;
			}
		}
	}
	
	// Rule 지정
	var validationRule = 
	{
		 name  : sColumID		// Column
		,title : sColumName		// Title
		,value : sValidRule		// 정합성 Rule
	};
	// Rule에 필수여부 추가
	if (""+sValidRule.indexOf("required") > -1) {
		validationRule.notnull = true;
	}
	else {
		validationRule.notnull = false;
	}				
	validObj.push(validationRule);

	obj.validationRuleSet = JSON.stringify(validObj);
};


/**
 * 컴포넌트에 validationRole이 적용된 기준으로 정합성 체크를 진행한다.
 * @param  {Components} obj Check 대상 Object(Grid,Edit,MaskEdit 등)
 * @return {Boolean} 정상 true / 오류 false
 */
pForm.gfnValidation = function(obj)
{
    if(obj instanceof Grid)
	{
	    return this._ValidGrid(obj);
	}
	else
	{
		if(obj instanceof Div && this.gfnIsNull(obj.url))
		{
		    var oComp;		    
		    var aComp = new Array();
			
			//넥사크로 collection정보를 array로 넣기
			for(var i=0; i<obj.form.components.length; i++) aComp[i] = obj.form.components[i];
			
			//컴포넌트를 탭오더 기준으로 정렬
			aComp.sort(function (a, b) {
			  if (a.taborder > b.taborder) {
				return 1;
			  }
			  if (a.taborder < b.taborder) {
				return -1;
			  }
			  return 0;
			});
			
			//정렬된 컴포넌트 기준으로 정합성 체크
		    for(var i=0; i<aComp.length; i++)
			{
			    oComp = aComp[i];
				
			    if(oComp instanceof Grid)
				{
					if(!this._ValidGrid(oComp)) return false;
				}
				else
				{
				    //Div인경우 컴포지트 컴포지트와 구분하기 위해 Url여부 체크
				    if(oComp instanceof Div && this.gfnIsNull(oComp.url))
					{
					    //일반 Div라면 재귀호출진행
						if(!this.gfnValidation(oComp)) return false;
					}
					else
					{
						if(!this._ValidComp(oComp)) return false;
					}
				}
			}
			
			return true;
		}
		else
		{
		    return this._ValidComp(obj);
		}
	}
	
}

pForm._ValidComp = function(obj)
{
	if(this.gfnIsNull(obj.validationRuleSet)) return true;
	
	var validlist = JSON.parse(obj.validationRuleSet);
	var aCheckList = (""+validlist[0].value).split(",");
	var sTitle = validlist[0].title;
	var bNullcheck = validlist[0].notnull;
	var sValue;
	
	if(obj instanceof Div)
	{
		sValue = obj.form.fnGetValue();
	}
	else
	{
		sValue = obj.value;
	}
	
	// 필수입력 체크
    if (bNullcheck == true)
    {
	   if(this.gfnIsNull(sValue))
	   {
		   this.gfnAlert("msg.err.validator.required", [sTitle],
		   function(sId,sVal)
		   {
			   obj.setFocus();
		   });
		   
		   return false;
	   }
    }
	
	//값이 없으면 체크 패스
    if(this.gfnIsNull(sValue)) return true;
	
	// Rule에 따른 정합성 체크
	for(var k=0;k<aCheckList.length;k++)
	{
		var msg = "";

		// 컬럼의 두개의 값을 이용해서 처리하는 check 대상
		var sCheckRole =  aCheckList[k].split(":")[0];
		if (sCheckRole == "equalto" || sCheckRole == "fromto" || sCheckRole == "comparebig" || sCheckRole == "comparesmall")
		{
			var compare1;
			var compare2;

			if( aCheckList[k].split(":").length == 3 ) {
				compare1 = oDs.getColumn(i, aCheckList[k].split(":")[1]);
				compare2 = oDs.getColumn(i, aCheckList[k].split(":")[2]);
			}
			else {
				compare1 = oDs.getColumn(i, sColId);
				compare2 = oDs.getColumn(i, aCheckList[k].split(":")[1]);
			}
			msg = this.gfnValidationCheckRule(sTitle, sValue, aCheckList[k], compare1, compare2);
		}
		// 컬럼의 한개 값을 이용해서 처리하는 check 대상
		else {
			msg = this.gfnValidationCheckRule(sTitle, sValue, aCheckList[k]);
		}

		// 에러시
		if (!this.gfnIsNull(msg))
		{								
			this.gfnAlert("msg.err.validator", [msg],
			function(sId,sVal)
			{
				obj.setFocus();
			});								
			return false;
		}
	}  // Rule에 따른 정합성 체크			
	
	return true;
}

pForm._ValidGrid = function(obj)
{
	var nColCnt = obj.getFormatColCount();
	var validlist = new Array();
	var oDs = obj.getBindDataset();
	
	if(this.gfnIsNull(obj.validationRuleSet)) return true;
	
	if(oDs.rowcount == 0) return true;
	
	validlist = JSON.parse(obj.validationRuleSet);
	
	var sText;
	var sColId;

	for(var i=0; i<oDs.rowcount; i++)
	{
		for(var m=0; m<nColCnt; m++)
		{
			sText = obj.getCellProperty("body",m,"text");
			
			if(!this.gfnIsNull(sText) && sText.indexOf("bind:") > -1)
			{
			   sColId = sText.replace("bind:","");
			   
			   var sCss = obj.getCellProperty("head",m,"cssclass");
			   var sTitle = obj.getCellProperty("head",m,"text");
			   var sValue = oDs.getColumn(i,sColId);
			   var nValidIdx = validlist.findIndex(k => k.name == sColId);
			   
			   //그외 밸리데이션 항목이 있고 값이 있는 항목에 대해 밸리데이션 체크
			   if(nValidIdx > -1)
			   {
			   
				   var bNullcheck = validlist[nValidIdx].notnull;			   
				   sTitle = (this.gfnIsNull(validlist[nValidIdx].title)) ? sTitle : validlist[nValidIdx].title;
					// 필수입력 체크
				   if (bNullcheck == true)
				   {
					   if(this.gfnIsNull(sValue))
					   {
						   this.gfnAlert("msg.err.validator.required", [sTitle],
						   function(sId,sVal)
						   {
							   oDs.set_rowposition(i);
							   obj.setCellPos(m);
							   obj.showEditor(true);
						   });
						   
						   return false;
					   }
				   }
			   
			       if(!this.gfnIsNull(sValue))
				   {
					   var aCheckList = (""+validlist[nValidIdx].value).split(",");
					   
						// Rule에 따른 정합성 체크
						for(var k=0;k<aCheckList.length;k++)
						{
							var msg = "";

							// 컬럼의 두개의 값을 이용해서 처리하는 check 대상
							var sCheckRole =  aCheckList[k].split(":")[0];
							if (sCheckRole == "equalto" || sCheckRole == "fromto" || sCheckRole == "comparebig" || sCheckRole == "comparesmall")
							{
								var compare1;
								var compare2;

								if( aCheckList[k].split(":").length == 3 ) {
									compare1 = oDs.getColumn(i, aCheckList[k].split(":")[1]);
									compare2 = oDs.getColumn(i, aCheckList[k].split(":")[2]);
								}
								else {
									compare1 = oDs.getColumn(i, sColId);
									compare2 = oDs.getColumn(i, aCheckList[k].split(":")[1]);
								}
								msg = this.gfnValidationCheckRule(sTitle, sValue, aCheckList[k], compare1, compare2);
							}
							// 컬럼의 한개 값을 이용해서 처리하는 check 대상
							else {
								msg = this.gfnValidationCheckRule(sTitle, sValue, aCheckList[k]);
							}

							// 에러시
							if (!this.gfnIsNull(msg))
							{								
								this.gfnAlert("msg.err.validator", [msg],
								function(sId,sVal)
								{
									oDs.set_rowposition(i);
									obj.setCellPos(m);
									obj.showEditor(true);
								});								
								return false;
							}
						}  // Rule에 따른 정합성 체크					   
				   }
			   }
			}
		}
	}
	
	return true;
}

/**
 * 데이터의 정합성을 체크하여 그 결과를 리턴한다. 메세지가 "" 널이면.. 정상 널이 아니면 실패이다.
 * @param {String} itemName - Column title
 * @param {Stirng} itemValue - Column 값
 * @param {String} validationRuleSet - validation Rule
 * @return {Stirng} 정상이면 "" 실패이면 "XXX는 7자리입니다." 와 같은 완성형 에러메세지
 */
pForm.gfnValidationCheckRule = function(itemName, itemValue, validationRuleSet, compare1, compare2)
{
	var titile     = "";
	var columname1 = "";
	var columname2 = "";
	if (itemName.indexOf("^_^") != -1) {
		titile     = itemName.split("^_^")[0];
		columname1 = itemName.split("^_^")[0];
		columname2 = itemName.split("^_^")[1];
	}
	else {
		titile = itemName;
	}
				
	var arrItem2  =  validationRuleSet.split(":");
	var checkrule =  arrItem2[0];

	checkrule = checkrule.toLowerCase();
	switch(checkrule)
	{
		// size 크기 지정 : length:7
		case "length":
			if( (itemValue+"").length != parseInt(arrItem2[1]))
			{
				//return this.gfnGetKoreanTarget(titile, "은(는)")+" "+arrItem2[1]+"자리 입니다.";
				// {0} 의 입력값은 {1} 자리이어야 합니다.
				return this.gfnMsg("msg.err.validator.length",[titile, arrItem2[1]]);
			}
			break;
		// size 크기의 범위 : rangelength:2:3
		case "rangelength":
			if( (itemValue+"").length < parseInt(arrItem2[1]) || (itemValue+"").length > parseInt(arrItem2[2]))
			{
				//return this.gfnGetKoreanTarget(titile, "은(는)")+" ("+arrItem2[1]+")자리에서 ("+arrItem2[2]+")자리로 등록해야 합니다.";
				// {0} 은(는) {1} 와(과) {2} 사이의 자리이어야 합니다.
				return this.gfnMsg("msg.err.validator.rangelength",[titile, arrItem2[1], arrItem2[2]]);
			}
			break;
		// 최대 size 크기: maxlength:7
		case "maxlength":
			if (itemValue.length > parseInt(arrItem2[1]))
			{
				//return this.gfnGetKoreanTarget(titile, "은(는)")+" 최대 "+arrItem2[1]+"자리 입니다.";
				// {0} 의 입력값의 길이는 {1} 이하이어야 합니다.
				return this.gfnMsg("msg.err.validator.maxlength",[titile, arrItem2[1]]);
			}
			break;
		// 최소 size 크기: minlength:7
		case "minlength":
			if (itemValue.length < parseInt(arrItem2[1]))
			{
				//return this.gfnGetKoreanTarget(titile, "은(는)")+" 최소 "+arrItem2[1]+"자리 이상이어야 합니다.";
				// {0} 의 입력값의 길이는 {1} 이상이어야 합니다.
				return this.gfnMsg("msg.err.validator.minlength",[titile, arrItem2[1]]);
			}
			break;
		// 최대 size 크기(Byte) : maxlengthB:3
		case "maxlengthbyte":
			if (this.lookupFunc("gfnLengthByte").call(itemValue) > parseInt(arrItem2[1]))
			{
				//return this.gfnGetKoreanTarget(titile, "은(는)")+" 최대 "+arrItem2[1]+"자리 입니다.";
				// {0} 의 입력값의 길이는 {1} 이하이어야 합니다.
				return this.gfnMsg("msg.err.validator.maxlength",[titile, arrItem2[1]]);
			}
			break;
		// 최소 size 크기(Byte) : minlengthB:3
		case "minlengthbyte":
			if (this.lookupFunc("gfnLengthByte").call(itemValue) < parseInt(arrItem2[1]))
			{
				//return this.gfnGetKoreanTarget(titile, "은(는)")+" 최소 "+arrItem2[1]+"자리 이상이어야 합니다.";
				// {0} 의 입력값의 길이는 {1} 이상이어야 합니다.
				return this.gfnMsg("msg.err.validator.minlength",[titile, arrItem2[1]]);
			}
			break;
		// 숫자 여부 : digits
		case "digits":		
			if (!this.lookupFunc("gfnIsDigit").call(itemValue))
			{
				//return this.gfnGetKoreanTarget(titile, "은(는)")+" 숫자만 입력 가능합니다.";
				// {0} 은(는) 숫자만 입력 가능합니다.
				return this.gfnMsg("msg.err.validator.digits",[titile]);
			}
			break;
		// 해당 숫자 이하 : min:7
		case "min":
			if (parseFloat(itemValue) < parseFloat(arrItem2[1]))
			{
				//return this.gfnGetKoreanTarget(titile, "은(는)")+" "+arrItem2[1]+" 이상의 숫자만 입력 가능합니다.";
				// {0} 은(는) {1} 이상의 숫자만 입력 가능합니다.
				return this.gfnMsg("msg.err.validator.min",[titile, arrItem2[1]]);
			}
			break;
		// 해당 숫자 이상 : max:7
		case "max":
			if (parseFloat(itemValue) > parseFloat(arrItem2[1]))
			{
				//return this.gfnGetKoreanTarget(titile, "은(는)")+" "+arrItem2[1]+" 이하의 숫자만 입력 가능합니다.";
				// {0} 은(는) {1} 이하의 숫자만 입력 가능합니다.
				return this.gfnMsg("msg.err.validator.max",[titile, arrItem2[1]]);
			}
			break;
		// 소숫점 자리수 비교 - declimit:3
		case "declimit":
			var isExistDot = (""+itemValue).indexOf(".");
			if (isExistDot == -1)
			{
				//return this.gfnGetKoreanTarget(titile, "은(는)")+" 소숫점 "+arrItem2[1]+" 자리로 구성되어야 합니다.";
				// {0} 은(는) 소숫점 {1} 자리로 구성되어야 합니다.
				return this.gfnMsg("msg.err.validator.declimit",[titile, arrItem2[1]]);
			}
			else
			{
				var decLen = (""+itemValue).substr(isExistDot + 1, itemValue.length);
				if (decLen.length != parseInt(arrItem2[1]))
				{
					//return this.gfnGetKoreanTarget(titile, "은(는)")+" 소숫점 "+arrItem2[1]+" 자리로 구성되어야 합니다.";
					// {0} 은(는) 소숫점 {1} 자리로 구성되어야 합니다.
					return this.gfnMsg("msg.err.validator.declimit",[titile, arrItem2[1]]);
				}
			}
			break;
		// 날짜 년월일 체크 : date
		case "date":
			if (!this.lookupFunc("gfnIsYMD").call(itemValue))
			{
				//return titile + "에 등록된 날짜가 잘못되었습니다.";
				// {0} 은(는) 유효하지 않은 날짜 형식입니다.
				return this.gfnMsg("msg.err.validator.date",[titile]);
			}
			break;
		// 날짜 년월 체크 : dateym
		case "dateym":
			if (!this.lookupFunc("gfnIsYM").call(itemValue))
			{
				//return titile + "에 등록된 년월 형식의 날짜가 잘못되었습니다.";
				// {0} 은(는) 유효하지 않은 년월 형식입니다.
				return this.gfnMsg("msg.err.validator.dateym",[titile]);
			}
			break;
		// 사이의 값인지 비교 - range:40:100
		case "range":
			if (parseInt(itemValue) < parseInt(arrItem2[1]) || parseInt(itemValue) > parseInt(arrItem2[2]))
			{
				//return titile + "의 값은 "+arrItem2[1]+" 와(과) "+arrItem2[2]+" 사이의 값이어야 합니다.";
				// {0} 은(는) {1} 와(과) {2} 사이의 값입니다.
				return this.gfnMsg("msg.err.validator.range",[titile,arrItem2[1],arrItem2[2]]);
			}
			break;
		// 코드값이 목록내의 값인지 비교 - code:1:2:3
		case "code":
			for (var i = 1; i < arrItem2.length; i++)
			{
				if (parseInt(itemValue) == parseInt(arrItem2[i]))
				{
					return "";
				}
			}
			//return this.gfnGetKoreanTarget(titile, "은(는)")+" "+nexacro.replaceAll(validationRuleSet.split("code:")[1],":",",")+" 중 하나의 값이어야 합니다.";
			// {0} 은(는) {1} 중 하나의 값이어야 합니다.
			return this.gfnMsg("msg.err.validator.code",[titile,nexacro.replaceAll(validationRuleSet.split("code:")[1],":",",")]);
			break;
		// 타 칼럼값과 같은지 비교 - equalto:target칼럼명
		case "equalto":
			if( compare1 != compare2 )
			{
				if (itemName.indexOf("^_^") != -1 ) {
					//return this.gfnGetKoreanTarget(columname1, "이(가)") + " "+columname2+"과 일치하지 않습니다.";
					// {0} 이(가) {1} 와(과) 일치하지 않습니다.
					return this.gfnMsg("msg.err.validator.equalto",[columname1,columname2]);
				}
				// 비교대상 칼럼의 title을 넘겨주지 않았을 경우 해당 값을 표시
				else {
					//return  titile + "의 값과 "+compare2+"와 일치하지 않습니다.";
					// {0} 이(가) {1} 와(과) 일치하지 않습니다.
					return this.gfnMsg("msg.err.validator.equalto",[titile,compare2]);
				}
			}
			break;
		// 날짜 from ~ to 비교 : comparedate:target칼럼명
		case "fromto":
			if (compare1 < compare2)
			{
				if( itemName.indexOf("^_^") > -1 )
				{
					//return columname1 + "의 날짜가 "+columname2+"의 날짜보다 작습니다.";
					// {0} 의 날짜가 {1} 의 날짜보다 작습니다.
					return this.gfnMsg("msg.err.validator.fromto",[columname1,columname2]);
				}
				// 비교대상 칼럼의 title을 넘겨주지 않았을 경우 해당 값을 표시
				else {
					//return  titile + "의 날짜가 "+compare2+"일 보다 작습니다.";
					// {0} 의 날짜가 {1} 의 날짜보다 작습니다.
					return this.gfnMsg("msg.err.validator.fromto",[titile,compare2]);
				}
			}
			break;
		// 타 칼럼값보다 큰값인지 비교 - comparemax:target칼럼명
		case "comparebig":
			if( parseFloat(compare1) < parseFloat(compare2) )
			{
				if( itemName.indexOf("^_^") != -1 ) {
					//return columname1 + "의 값은 "+columname2+"의 값보다 커야 합니다.";
					// {0} 이(가) {1} 보다 작습니다.
					return this.gfnMsg("msg.err.validator.comparebig",[columname1,columname2]);
				}
				// 비교대상 칼럼의 title을 넘겨주지 않았을 경우 해당 값을 표시
				else {
					//return titile + "의 값은 "+compare2+"보다 커야 합니다.";
					// {0} 이(가) {1} 보다 작습니다.
					return this.gfnMsg("msg.err.validator.comparebig",[titile,compare2]);
				}
			}
			break;
		// 타 칼럼값과 작은값인지 비교 - comparemin:comparetarget
		case "comparesmall":
			if( parseFloat(compare1) > parseFloat(compare2) )
			{
				if( itemName.indexOf("^_^") != -1 ) {
					//return columname1 + "의 값은 "+columname2+"의 값보다 작아야 합니다.";
					// {0} 이(가) {1} 보다 큽니다.
					return this.gfnMsg("msg.err.validator.comparesmall",[columname1,columname2]);
				}
				// 비교대상 칼럼의 title을 넘겨주지 않았을 경우 해당 값을 표시
				else {
					//return titile + "의 값은 "+compare2+"보다 작아야 합니다.";
					// {0} 이(가) {1} 보다 큽니다.
					return this.gfnMsg("msg.err.validator.comparesmall",[titile,compare2]);
				}
			}
			break;

		// 아래부터는 해당 프로젝트에서 추가한 Validation 함수로 체크 로직 추가 가능

		// 주민등록번호 체크 - isssn
		case "isssn":
			if (!this.lookupFunc("gfnIsSSN").call(itemValue))
			{
				//return this.gfnGetKoreanTarget(titile, "은(는)") + " 올바른 주민번호가 아닙니다.";
				// {0} 은(는) 올바른 주민번호가 아닙니다.
				return this.gfnMsg("msg.err.validator.ssn",[titile]);
				
			}
			break;
		// 외국인등록번호 체크 - isfrn
		case "isfrn":
			if (!this.lookupFunc("gfnIsFrnrIdNo").call(itemValue))
			{
				return this.gfnGetKoreanTarget(titile, "은(는)") + " 올바른 외국인등록번호가 아닙니다.";
			}
			break;
		// 사업자등록번호 체크 - isbzid
		case "isbzid":
			if (!this.lookupFunc("gfnIsBzIdNo").call(itemValue))
			{
				return this.gfnGetKoreanTarget(titile, "은(는)") + " 올바른 사업자등록번호가 아닙니다.";
			}
			break;
		// 법인등록번호 체크 - isfirmid
		case "isfirmid":
			if (!this.lookupFunc("gfnIsFirmIdNo").call(itemValue))
			{
				return this.gfnGetKoreanTarget(titile, "은(는)") + " 올바른 법인등록번호가 아닙니다.";
			}
			break;
		// 신용카드번호 체크 - iscardno
		case "iscardno":
			if (!this.lookupFunc("gfnIsCardNo").call(itemValue))
			{
				return this.gfnGetKoreanTarget(titile, "은(는)") + " 올바른 신용카드번호가 아닙니다.";
			}
			break;
		// 이메일 체크 - isemail
		case "isemail":
			if (!this.lookupFunc("gfnIsEmail").call(itemValue))
			{
				//return this.gfnGetKoreanTarget(titile, "은(는)") + " 올바른 이메일이 아닙니다.";
				// e-mail이 잘못된 형태로 입력 되었습니다.
				return this.gfnMsg("msg.err.validator.email",[titile]);
			}
			break;

		default:
			return "";
			break;
	}
	return "";
};




/**
 * 한글의 은(는) 이(가) 을(를)에 대한 메세지처리를 초정/중성/종성의 갯수로 파악해서 처리한다.
 * @param {String} itemName - 대상 한글
 * @param {String} option - 접미사
 * @return {String} 완성형 메세지
 */
pForm.gfnGetKoreanTarget = function(itemName, option)
{
    if (option == "은(는)")
    {
        if (itemName[itemName.length-1].toKorChars().length == 2) {
            return itemName+"는";
        } 
		else {
            return itemName+"은";
		}
    }
    else if (option == "이(가)")
    {
        if (itemName[itemName.length-1].toKorChars().length == 2) {
            return itemName+"가";
        } 
		else {
            return itemName+"이";
		}
    }
    else if (option == "을(를)")
    {
        if (itemName[itemName.length-1].toKorChars().length == 2) {
            return itemName+"를";
        } 
		else {
            return itemName+"은";
		}
    }
    else {
         itemName;
    }
};

/**
 *      	문자열(한글)의 초성/중성/종성의 정보를 가져온다.
 * @return 		{Array} 초성/중성/종성의 갯수만큼을 Array 배열로 리턴한다.
 */
String.prototype.toKorChars = function()
{
    var cCho  = [ 'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ],
        cJung = [ 'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ' ],
        cJong = [ '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ],
        cho, jung, jong;

    var str = this,
        cnt = str.length,
        chars = [],
        cCode;

    for (var i = 0; i < cnt; i++) 
	{
        cCode = str.charCodeAt(i);

		if (cCode == 32) { continue; }

        // 한글이 아닌 경우
        if (cCode < 0xAC00 || cCode > 0xD7A3) {
            chars.push(str.charAt(i));
            continue;
        }

        cCode  = str.charCodeAt(i) - 0xAC00;

        jong = cCode % 28; // 종성
        jung = ((cCode - jong) / 28 ) % 21 // 중성
        cho  = (((cCode - jong) / 28 ) - jung ) / 21 // 초성

        chars.push(cCho[cho], cJung[jung]);
		if (cJong[jong] !== '') { chars.push(cJong[jong]); }
    }

    return chars;
};


/************************************************************************************************
* Validation function List
************************************************************************************************/

/**
 * 숫자체크
 * @param {String} sValue
 * @return {Boolean}
 */
pForm.gfnIsDigit = function(sNum)
{
	var c;
	var point_cnt=0;
	var ret=true;

	if ( this.gfnIsNull(sNum) )	return false;

	for (var i=0; i<sNum.length; i++)
	{
		c = sNum.charAt(i);
		if (i == 0 && (c == "+" || c == "-"));
		else if (c >= "0" && c <= "9");
		else if (c == ".")
		{
			point_cnt++;
			if ( point_cnt > 1 )
			{
				ret = false;
				break;
			}
		}
		else
		{
			ret = false;
			break;
		}
	}
	return ret;
};

/**
 * 한글만으로 되어 있는지 Check한다.
 * @param {String} strValue
 * @return {Boolean}
 */
pForm.gfnIsKoreanChar = function(strValue)
{
	var retVal = true;
	
	for (i = 0; i < strValue.length; i++){
		if (!((strValue.charCodeAt(i) > 0x3130 && strValue.charCodeAt(i) < 0x318F) || (strValue.charCodeAt(i) >= 0xAC00 && strValue.charCodeAt(i) <= 0xD7A3))){
			retVal = false;
		}
	}
	
	return retVal;
};

/**
 * 특수문자가 있는지 Check한다.
 * @param {String} strValue
 * @return {Boolean}
 */
pForm.gfnIsSpecialChar = function(strValue)
{
	var retVal = false;
	if(strValue.search(/\W|\s/g) > -1) retVal = true;

	return retVal;
};

/**
 * 주민등록번호 여부를 확인한다.
 * @param {String} sJuminNo - 입력문자열(주민번호 13자리)
 * @return {Boolean}
 */
pForm.gfnIsSSN = function(sJuminNo)
{
	var birthYear = this.gfnGetBirthYear(sJuminNo);
	
	birthYear += sJuminNo.substr(0, 2);
	var birthMonth = sJuminNo.substr(2, 2)-1;
	var birthDate = sJuminNo.substr(4, 2);
	var birth = new Date(birthYear, birthMonth, birthDate);

	if ( birth.getYear() % 100 != sJuminNo.substr(0, 2) ||
		birth.getMonth() != birthMonth ||
		birth.getDate() != birthDate) 
	{
		return false;
	}

	// Check Sum 코드의 유효성 검사
	buf = new Array(13);
	for (i = 0; i < 6; i++) buf[i] = parseInt(sJuminNo.charAt(i));
	for (i = 6; i < 13; i++) buf[i] = parseInt(sJuminNo.charAt(i));
	  
	multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
	for (i = 0, sum = 0; i < 12; i++) sum += (buf[i] *= multipliers[i]);

	if ((11 - (sum % 11)) % 10 != buf[12]) {
		return false;
	}else{
		return true;
	}
};

/**
 * 외국인 등록번호 여부를 확인한다.
 * @param {String} strNo - 입력문자열(등록번호13자리)
 * @return {Boolean}
 */
pForm.gfnIsFrnrIdNo = function(strNo)
{
	if (strNo.length != 13 || !isNumber(strNo)) return false;
	
	var month = Number(strNo.substr(2, 2));
	var day	  = Number(strNo.substr(4, 2));
		
	if (month < 1 || month > 12) return false;
	if (day < 1 || day > 31) return false;
	
	var sum = 0;
	var odd = 0;
	var buf = array(13);
	var multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
	
	for (var i=0; i<13; i++) {
		buf[i] = Number(strNo.charAt(i));
	}
	
	if (buf[11] < 6) return false;
	
	odd = buf[7] * 10 + buf[8];
	if((odd%2) != 0) return false;
	
	for (var i=0; i<12; i++) {
		sum += (buf[i] * multipliers[i]);
	}
	
	sum = 11 - (sum % 11);
	
	if (sum >= 10) sum -= 10;
	sum += 2;
	if (sum >= 10) sum -= 10;
	
	if (buf[12] == sum) {
		return true;
	} else {
		return false;
	}
};

/**
 * 사업자 등록번호 여부를 확인한다.
 * @param {String} strCustNo - 입력문자열(등록번호10자리)
 * @return {Boolean}
 */
pForm.gfnIsBzIdNo = function(strCustNo)
{
	if (strCustNo.length != 10) return false;
	else {
		
		var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
		var tmpcustNo, i, chkSum=0, c2, remander;

		for (i=0; i<=7; i++) chkSum += checkID[i] * strCustNo.charAt(i);

		c2 = "0" + (checkID[8] * strCustNo.charAt(8));
		c2 = c2.substring(c2.length - 2, c2.length);

		chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));

		remander = (10 - (chkSum % 10)) % 10 ;

		if (Math.floor(strCustNo.charAt(9)) == remander) return true; // OK!
		return false;
	}

	return true;
};

/**
 * 법인 등록번호 여부를 확인한다.
 * @param {String} strNo - 입력문자열(법인번호13자리)
 * @return {Boolean}
 */
pForm.gfnIsFirmIdNo = function(strNo)
{
	if (strNo.length != 13 || !isNumber(strNo)) return false;
	
	var sum = 0;
	var buf = new Array(13);
	var multipliers = [1,2,1,2,1,2,1,2,1,2,1,2];
	
	for (var i=0; i<13; i++) {
		buf[i] = Number(strNo.charAt(i));
	}
	
	for (var i=0; i<12; i++) {
		sum += (buf[i] * multipliers[i]);
	}
	
	sum = (10 - (sum % 10)) % 10;
	
	if (buf[12] == sum) {
		return true;
	} else {
		return false;
	}
};

/**
 * 신용카드번호 여부를 확인한다.
 * @param {String} strNo - 카드번호16자리
 * @return {Boolean}
 */
pForm.gfnIsCardNo = function(strNo)
{
	if (strNo.length < 13 || strNo.length > 19 || !nexacro.isNumeric(strNo)) return false;
	
	var sum = 0;
	var buf = new Array();
	
	for (var i=0; i<strNo.length; i++) {
		buf[i] = Number(strNo.charAt(i));
	}
	
	var temp;
	for (var i=buf.length-1, j=0; i>=0; i--, j++) {
		temp = buf[i] * ((j%2) + 1);
		if (temp >= 10) {
			temp = temp - 9;
		}
		sum += temp;
	}
	
	if ((sum % 10) == 0) {
		return true;
	} else {
		return false;
	}
};

/**
 * 이메일 형식에 맞는지 Check한다.
 * @param {String} strValue
 * @return {Boolean}
 */
pForm.gfnIsEmail = function(strValue)
{
	var retVal = false;
	var sTmp = "";
	var sRegExp = "[a-z0-9]+[a-z0-9.,]+@[a-z0-9]+[a-z0-9.,]+\\.[a-z0-9]+";

	var regexp = new RegExp(sRegExp,"ig");
	sTmp = regexp.exec(strValue);

	if (sTmp == null) {
		retVal = false;
	} 
	else {
		if (( sTmp.index == 0 ) && (sTmp[0].length == strValue.length )) {
			retVal = true;
		} else {
			retVal = false;
		}
	}
	return retVal;
};