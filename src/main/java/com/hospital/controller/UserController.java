package com.hospital.controller;

import com.hospital.common.JsonUtils;
import com.hospital.model.User;
import com.hospital.service.UserService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

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
    @RequestMapping(value = "/login")
    public String login(String phoneNum,String password,String yzm){
        //todo 1 参数验证 2 验证码对比 3 数据库验证
        return null;
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


}
