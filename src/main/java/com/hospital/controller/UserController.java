package com.hospital.controller;

import com.hospital.common.CookieUtil;
import com.hospital.common.JsonUtils;
import com.hospital.common.ParamUtil;
import com.hospital.model.User;
import com.hospital.service.UserService;
import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
    @RequestMapping(value = "/changePassword")
    @ResponseBody
    public String resetPassword(User user){
        String message = userService.changePassword(user);
        return message;
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
