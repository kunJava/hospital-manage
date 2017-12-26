package com.hospital.controller;

import com.cloopen.rest.sdk.CCPRestSmsSDK;
import com.hospital.common.*;
import com.hospital.model.User;
import com.hospital.service.UserService;
import net.sf.json.JSONObject;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;

/**
 * Created by Kun on 2017/04/25 0025.
 */
@Controller
@RequestMapping(value = "user")
public class UserController {

    @Resource
    private UserService userService;

    /**
     * 跳转用户注册页面
     * @return view
     * @author zhou.zhengkun
     * @date 2017/12/12 0012 17:13
     */
    @RequestMapping(value = "/toRegisterPage")
    public String toRegisterPage(){
        return "user/register";
    }

    /**
     * @des : 用户注册
     * @param user 用户对象
     * @return String Json字符串
     * @author zhou.zhengkun
     * @date 2017/04/25 0025 23:35
     */
    @RequestMapping(value = "register",produces="application/json;charset=UTF-8")
    @ResponseBody
    public String register(User user){
        String message = userService.register(user);
        return message;
    }

    /**
     * @des : 跳转登录界面
     * @return view
     * @author zhou.zhengkun
     * @date 2017/12/13 0013 10:52
     */
    @RequestMapping(value = "/toLoginPage")
    public String toLoginPage(){
        return "user/login";
    }

    /**
     * @des : 用户登录
     * @param phoneNum 帐号(电话)
     * @param password 密码
     * @param yzm 验证码
     * @return String
     * @author zhou.zhengkun
     * @date 2017/12/13 0013 10:54
     */
    @RequestMapping(value = "/login",produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String login(String phoneNum,String password,String yzm){
        //todo  yzm验证
        if (StringUtils.isBlank(phoneNum) || StringUtils.isBlank(password)){
            return JsonUtils.turnJson(false,"参数错误",null);
        }else{
            User user = userService.login(phoneNum,password);
            if (user == null){
                return JsonUtils.turnJson(false,"帐号密码错误",null);
            }
            JSONObject jsonObject = JSONObject.fromObject(user);
            return JsonUtils.turnJson(true,"success",jsonObject);
        }
    }

    /**
     * @des : 验证账户是否存在
     * @param request
     * @author zhou.zhengkun
     * @date 2017/06/27 0027 15:48
     */
    @RequestMapping(value = "validateUserIsExist",produces="application/json;charset=UTF-8")
    @ResponseBody
    public String validateUserIsExist(HttpServletRequest request){
        String account = request.getParameter("account");
        if (StringUtils.isBlank(account)){
            return JsonUtils.turnJson(false,"参数错误!",null);
        }else{
            String message = userService.selectByAccount(account);
            return message;
        }
    }

    /**
     * 用户中心
     * @param userId 用户Id
     * @return view
     * @author zhou.zhengkun
     * @date 2017/12/13 0013 18:38
     */
    @RequestMapping(value = "/userCenter")
    public String userCenter(String userId){
        return "user/userCenter";
    }

    /**
     * 用户中心 - 个人信息页面
     * @return VIEW
     * @author zhou.zhengkun
     * @date 2017/12/15 0015 16:26
     */
    @RequestMapping(value = "/userInfo")
    public String userInfo(HttpServletRequest request,Model model) {
        String userId = CookieUtil.getCookie(request,"user_id_cd");
        User bean = userService.selectById(userId);
        model.addAttribute("bean",bean);
        return "user/userInfo";
    }


    /**
     * 跳转修改密码页面
     * @return view
     * @author zhou.zhengkun
     * @date 2017/12/21 0021 10:33
     */
    @RequestMapping(value = "/toChangePasswordPage")
    public String toChangePasswordPage(){
        return "user/changePassword";
    }

    /**
     * @Author: qyj
     * @Description: 修改密码
     * @Date: 16:31 2017/12/20
     */
    @RequestMapping(value = "/changePassword",produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String changePassword(HttpServletRequest request,String oldPassword,String newPassword){
        String phoneNum = CookieUtil.getCookie(request,"phoneNum_cd");
        if (StringUtils.isBlank(oldPassword)){
            return JsonUtils.turnJson(false,"参数错误",null);
        }else{
            User user = userService.login(phoneNum,oldPassword);
            if (user == null){
                return JsonUtils.turnJson(false,"旧密码输入错误",null);
            }
            return userService.changePassword(phoneNum,newPassword);
        }
    }

    /**
     * 跳转重置密码页面
     * @return view
     * @author qyj
     * @date 2017/12/25
     */
    @RequestMapping(value = "/toResetPasswordPage")
    public String toResetPasswordPage(){
        return "user/resetPassword";
    }

    /**
     * @Author: qyj
     * @Description: 重置密码
     * @Date: 16:31 2017/12/20
     */
    @RequestMapping(value = "/resetPassword",produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String resetPassword(String account,String newPassword,String zymCode){
        if (StringUtils.isBlank(account) || StringUtils.isBlank(newPassword) ||  StringUtils.isBlank(zymCode)){
            return JsonUtils.turnJson(false,"参数错误",null);
        }else{
            User user = userService.getUserByAccount(account);
            if (user == null){
                return JsonUtils.turnJson(false,"此用户不存在",null);
            }
            String phoneNum = user.getPhone();
            if (zymCode.equals(RedisUtil.getValueByKey(phoneNum))){
                return userService.changePassword(phoneNum,newPassword);
            }else {
                return JsonUtils.turnJson(false,"验证码不正确",null);
            }

        }
    }

    /**
     * @Author: qyj
     * @Description: 发送验证码
     * @Date: 16:31 2017/12/20
     */
    @RequestMapping(value = "/sendCode",produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String sendCode(String account) {
        String phoneNum;
        if (StringUtils.isBlank(account)){
            return JsonUtils.turnJson(false,"账户不能为空",null);
        }else{
            User user = userService.getUserByAccount(account);
            if (user == null){
                return JsonUtils.turnJson(false,"此用户不存在",null);
            }
            phoneNum = user.getPhone();
        }
        try {
            HashMap<String, Object> result = null;
            CCPRestSmsSDK restAPI = new CCPRestSmsSDK();
            // *沙盒环境（用于应用开发调试）：restAPI.init("sandboxapp.cloopen.com", "8883");*
            // *生产环境（用户应用上线使用）：restAPI.init("app.cloopen.com", "8883"); *
            // *******************************************************************************
            //短信接口调用准备:1 初始化,2 设置账户,3 设置应用ID
            restAPI.init("sandboxapp.cloopen.com", "8883");
            restAPI.setAccount("8aaf07085af9176d015afb5428de0045", "e7ceed5b6a55489f8c605a6a0cd7da3a");
            restAPI.setAppId("8aaf07085af9176d015afb542a91004b");

            String yzmStr = String.valueOf((int)((Math.random() * 9 + 1) * 100000));//使用随机数生成一个6位数验证码
            System.out.println("六位数验证码："+yzmStr);
            boolean isOk = RedisUtil.setValueByKey(phoneNum, yzmStr, 30);
            if(isOk) {
                // 参数说明:1:电话号码 2短信模版ID(免费测试模版为1) 3第一个为短信内容,第二个是几分钟之内输入
                result = restAPI.sendTemplateSMS(phoneNum, "165211", new String[]{yzmStr, "30秒"});
                String statusCode = MapUtils.getString(result, "statusCode", "");
                if (StringUtils.equals("000000", statusCode)) {
                    return JsonUtils.turnJson(true, "验证短信已下发，请在30秒内输入。", null);
                } else if (StringUtils.equals("160040", statusCode)) {
                    return JsonUtils.turnJson(false, "同一手机一天发送验证码次数超过限制", null);
                } else if (StringUtils.equals("160038", statusCode)) {
                    return JsonUtils.turnJson(false, "短信验证码发送过频繁", null);
                } else {
                    // 异常返回输出错误码和错误信息
                    System.err.println("错误码=" + result.get("statusCode") + " 错误信息= "
                            + result.get("statusMsg"));
                    return JsonUtils.turnJson(false, "验证短信发送不成功", null);
                }

            }
            return JsonUtils.turnJson(true, "短信系统错误，请稍后再试。", null);

        } catch (Exception e) {
            e.printStackTrace();
            return JsonUtils.turnJson(false, "验证短信发送不成功,内部异常", e.getMessage());
        }
    }

    /**
     * 个人中心 -- 选择地图
     * @return 详细地址及经纬度
     * @author zhou.zhengkun
     * @date 2017/12/20 0020 17:18
     */
    @RequestMapping(value = "/toMap")
    public String toMap(){
        return "map/map";
    }

    /**
     * 个人中心 - 修改个人信息
     * @param
     * @return
     * @author zhou.zhengkun
     * @date 2017/12/20 0020 18:02
     */
    @RequestMapping(value = "/myInfoSaveOrUpdate",produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String myInfoSaveOrUpdate(HttpServletRequest request){
        try{
            if (request == null){
                return JsonUtils.turnJson(false,"参数异常","request:"+request);
            }else{
                return userService.update(request);
            }
        }catch (Exception e){
            return JsonUtils.turnJson(false,"error",e);
        }
    }

    /**
     * fastDFS测试
     * @author zhou.zhengkun
     * @date 2017/12/22 0022 11:02
     */
    @RequestMapping(value = "fastDFSTest")
    public String fastDFSTest(){
        return "testPages/fastDFSTest";
    }
}
