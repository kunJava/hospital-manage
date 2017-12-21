/**
 * cookie操作工具类
 */
var CookieUtil={
		/**
		 * 设置cookie
		 * @param name 名称
		 * @param value 值
		 */
		setCookie:function (name,value){
			var Days = 7;
			var exp = new Date();
			exp.setTime(exp.getTime() + Days*24*60*60*1000);
			document.cookie = name + "="+ encodeURI (value) + ";expires=" + exp.toGMTString()+";path=/";
		},
		/**
		 * 获取cookie
		 * @param name
		 * @returns
		 */
		getCookie:function(name){
			var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			if(arr=document.cookie.match(reg))
			return decodeURI(arr[2]);
			else
			return "";
		},
		/**
		 * 删除cookie
		 * @param name
		 */
		delCookie:function(name){
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval=this.getCookie(name);
			if(cval!=null)
			document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/";
		},
		/**
		 * 获取用户ID
		 */
		getUserId:function(){
			return this.getCookie("user_id_cd");
		},
		/**
		 * 获取用户名
		 * @returns
		 */
		getUserName:function(){
			return this.getCookie("user_name_cd");
		},
		/**
		 * 获取头像
		 * @returns
		 */
		getHeadImg:function(){
			return this.getCookie("head_img_cd");
		},
		/**
		 * 检查是否 存在cookie userId
		 * @returns
		 */
		checkIsLogin:function(){
			var userId = this.getCookie("user_id_cd");
			return StringUtil.isNotNull(userId);
		},
		/**
		 * 注销
		 */
		logOut:function(){
			this.delCookie("tjb_token_cd");
			this.delCookie("tjb_user_cd");
			this.delCookie("user_name_cd");
			this.delCookie("user_id_cd");
			this.delCookie("head_img_cd");
			this.delCookie("seller_id_cd");
		},
		/**
		 * 检查地图数据
		 */
		checkMap:function(){
			var index_map = this.getCookie("index_map");
			if(StringUtil.isNotNull(index_map)){
				return true;
			}else{
				return false;
			}
		},
		setMap:function(){
			this.setCookie("index_map", "user have visited our site.");
		},
		/**
		 * 获取站点ID
		 */
		getSiteId:function(){
			return this.getCookie("siteId_cd");
		},
		/**
		 * 获取站点名称
		 * @returns
		 */
		getSiteName:function(){
			return this.getCookie("siteName_cd");
		}
};