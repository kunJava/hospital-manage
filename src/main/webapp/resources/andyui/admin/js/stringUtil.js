var StringUtil={
		/**
		 * 判断字符为空
		 */
		isNull:function(str){
			if(str!=null && str!=undefined){
				//str = str.trim();
				str = $.trim(str);
				if(str!=''){
					return false;
				}
			}
			return true;
		},
		isNotNull:function(str){
			if(str!=null && str!=undefined){
				//str = str.trim();
				str = $.trim(str);
				if(str!=''){
					return true;
				}
			}
			return false;
		}
		
};