		function keywordRule(str)
		{
			if(str.length==0){
				alert("规则内容不能为空");
				return false;
			}
			/*将不可见字符，包括空格、制表符、换页符去掉*/
			var newStr = str.replace(/\s+/g,"");	
			//var reg = new RegExp("[~@\$%^\*\+-/{}'\":;\\\,.<>/\?￥……（）！【】‘；：”“'。，、？\\[\\]]");
			var reg =/(\\)|([~@\$%\^\*\+-/\{\}\'\":;,.<>/\?￥……（）！【】‘；：”“'。，、？\[\]])/;
			//判断是否含有特殊字符
			if(reg.test(newStr)){
				alert("有非法字符存在");
				return false;
			}
			/*”(“直接加除!外的运算符或者运算符直接加")"错误或者运算符组合(除了&!)或者两个空括号()、)(或者开头是除！"("外运算符、结尾是除")"外运算符*/
			reg = /(\([&|#|\|])|([!|&|#|\|]\))|([!|#|\|][!|&|#|\|]+)|([&][&|#|\|]+)|(\(\))|(\)\()|(^[&|#|\|\)])|([!|&|#|\|\(]$)/;
			if(reg.test(newStr)){
				alert("运算符组合错误");
				return false;	
			}
			var num = 0;
			/*判断左右括号的个数是否相等*/
			var leftNum = 0;//左括号的个数
			for (var i = 0; i < newStr.length; i++) {
				var a = newStr.charAt(i);
				if(a=='('){
					num++;
					leftNum++;
				}else if(a==')'){
					num--;
				}	
				if (num < 0) {// ')'多了，直接错误
					alert("括号错误");
					return false;
				}
			}
			if (num != 0) {
				alert("左右括号的个数不等");
				return false;
			}
			/* !的前面不能存在除"(,&"之外的其他字符(除非!在第一个字符)、)的右边必须是&、|、#、)(除非)在最后一个字符)，
			(的左边必须是(、&、|、#、！(除非(在第一个字符)*/
			var s = newStr;
			if(newStr.charAt(0)=='!'){
				s = newStr.substring(1, newStr.length);
				alert(""+s);
			}
			reg = /([^&\(]+!)/;
			if(reg.test(s)){
				alert("运算符!组合错误");
				return false;	
			}	
			//不考虑开头的括号(，将其换成!
			s = newStr;
			if(newStr.charAt(0)=='('){
				s = "!"+newStr.substring(1, newStr.length);

			}
			reg = /([^&#!\|\(]+\()/;
			if(reg.test(s)){
				alert("运算符组合错误");
				return false;	
			}
			//不考虑结尾的括号)，将其换成&
			s = newStr;
			if(newStr.charAt(newStr.length-1)==')'){
				s = newStr.substring(0, newStr.length-1)+"&";
			}
			reg = /(\)[^&#\|\)]+)/;
			if(reg.test(s)){
				alert("运算符组合错误");
				return false;	
			}
			// 需要添加括号进行限定 1&2|3,1&(2|3)|4错误，1&(2|3)正确
			//括号自动匹配
			
			var ss = newStr;
			reg = /([&#!\|][^\)\(&!#\|]+[&!#\|])|([!|#|\|][!|&|#|\|]+)|([&][&|#|\|]+)/;
			for (var i = 0; i <= leftNum; i++) {					
				if (reg.test(ss)||reg.test(newStr)) {
					alert("需添加括号进行限定");
					return false;
				}
				ss = ss.replace(/\([^\(\)]+\)/g, "");
				
			}
			reg = /\(\)/;
			var reg2 = /\([^\(\)&!#\|]+\)/;
			if (ss.length==0||reg.test(ss)||reg2.test(newStr)) {
				alert("存在多余的括号");
				return false;
			}

			//判断是否存在重复的关键词	
			//将运算符替换成空格，按空格进行分割
			newStr = newStr.replace(/[&\|!#\(\)]+/g," ");
			//去掉两边的空格
			newStr = newStr.replace(/(^\s+)|(\s+$)/g, "");
			var strs = new Array(); //定义一个数组 
			strs = newStr.split(" "); //字符分割 
			for (var i=0;i<strs.length-1;i++ ){
				for (var j=i+1;j<strs.length;j++ ){
					if(strs[i]==strs[j]){
						alert("规则中存在重复");
						return false;	
					}
				}
			}
			//alert("OK");
			return true;
			  
		}
		//规则组合
		function ruleCombination(str, size){
			//var str = "((1&2)|3&4)";
			if(keywordRule(str)){
				/*将不可见字符，包括空格、制表符、换页符替换掉*/
				var newStr = str.replace(/\s+/g,"");
				//将运算符替换成空格，按空格进行分割
				newStr = newStr.replace(/[&\|!#\(\)]+/g," ");
				//去掉两边的空格
				newStr = newStr.replace(/(^\s+)|(\s+$)/g, "");
				//判断是不是只存在数字和空格
				var reg = /[^\d\s]/;
				if(reg.test(newStr)){
					alert("规则组合错误");
					return false;	
				}
				var strs = new Array(); //定义一个数组 
				strs = newStr.split(" "); //字符分割 
				
				//判断每一项是否存在，并且不重复
				//假设现在有size个规则，序号为1、2、3、4
				if(strs.length>size){
					alert("规则错误");
					return false;
				}		
				for (i=0;i<=strs.length;i++ ) 
				{ 
					if(parseInt(strs[i])==0 || parseInt(strs[i])>size){
						alert("有规则存在错误");
						return false;
					}
				}
				//for (i=0;i<strs.length;i++) 
				//{ 
				//	document.write(strs[i]+"<br/>"); //字符输出 
				//}
				return true;
				
			}
			return false;
		}