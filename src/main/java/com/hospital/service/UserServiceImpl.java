package com.hospital.service;


import com.hospital.common.*;
import com.hospital.dao.UserMapper;
import com.hospital.model.User;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Kun on 2017/04/25 0025.
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    /**
     * @des : 用户注册
     * @param user
     * @return User
     * @author zhou.zhengkun
     * @date 2017/04/25 0025 16:26
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public String register(User user) {

        try {
            if (StringUtils.isBlank(user.getAccount())||StringUtils.isBlank(user.getPassword())){
                return JsonUtils.turnJson(false,"账户名密码不能为空",null);
            }
            User isRegistedUser = userMapper.getUserByAccount(user.getAccount());
            if (isRegistedUser!=null){
                return JsonUtils.turnJson(false,"您已经注册过帐号,不需要重复注册",null);
            }else{

                try {
                    PasswordEncoder encoderMd5 = new PasswordEncoder("wisesoft", "MD5");
                    String encode = encoderMd5.encode(user.getPassword());
                    user.setPassword(encode);
                } catch (Exception e) {
                    e.printStackTrace();
                    return JsonUtils.turnJson(false, "转换加密密码的时候发生错误", null);
                }

                user.setId(StringUtils.getUUid());
                user.setCreateTime(new Date());
                user.setPhone(user.getAccount());
                user.setNickName(user.getAccount());
                user.setStatus(1);
                userMapper.insertUser(user);
                JSONObject jsonObject = JSONObject.fromObject(user);
                return JsonUtils.turnJson(true,"success",jsonObject);
            }
        }catch (Exception e){
            return e.getMessage();
        }

    }

    @Override
    public String selectByAccount(String account) {
        User user = userMapper.getUserByAccount(account);
        JSONObject jsonObject = JSONObject.fromObject(user);
        if (user!=null){
            return JsonUtils.turnJson(true,"查询到用户",jsonObject);
        }else{
            return JsonUtils.turnJson(false,"未查询到用户",null);
        }
    }

    @Override
    public User login(String phoneNum, String password) {
        password = PasswordEncoder.getMd5Str(password);
        Map<String,Object> paraMap = new HashMap<String,Object>(4);
        paraMap.put("account",phoneNum);
        paraMap.put("password",password);
        User user = userMapper.userLogin(paraMap);
        return user;
    }

    @Override
    public String changePassword(String phoneNum,String newPassword) {
        newPassword = PasswordEncoder.getMd5Str(newPassword);
        Map<String, Object> paraMap = new HashMap<String, Object>(4);
        paraMap.put("account", phoneNum);
        paraMap.put("newPassword", newPassword);
        int result = userMapper.userChangePassword(paraMap);
        if (result > 0){
            return JsonUtils.turnJson(true,"修改成功",null);
        }else{
            return JsonUtils.turnJson(false,"修改失败",null);
        }

    }

    @Override
    public String update(HttpServletRequest request) {
        //检查登录
        String userId = CookieUtil.getCookie(request,"user_id_cd");
        if (StringUtils.isBlank(userId)){
            return JsonUtils.turnJson(false,"请先登录",null);
        }
        User user = getUserBeanFromRequest(request);
        user.setId(userId);
        int result = userMapper.updateByPrimaryKeySelective(user);
        if (result > 0){
            JSONObject jsonObject = JSONObject.fromObject(user);
            return JsonUtils.turnJson(true,"修改成功",jsonObject);
        }else{
            return JsonUtils.turnJson(false,"修改失败",null);
        }
    }

    @Override
    public User selectById(String id) {
        return userMapper.selectByPrimaryKey(id);
    }

    private User getUserBeanFromRequest(HttpServletRequest request){

        String nickName = ParamUtil.getString(request,"nickName");
        String realName = ParamUtil.getString(request,"realName");
        String headImg = ParamUtil.getString(request,"headImg");
        String qq = ParamUtil.getString(request,"qq");
        String weixin = ParamUtil.getString(request,"weixin");
        String email = ParamUtil.getString(request,"email");
        int gender = ParamUtil.getInt(request,"gender",1);
        Date birthday = ParamUtil.getDate(request,"birthday");
        String address = ParamUtil.getString(request,"address");
        String lon = ParamUtil.getString(request,"lon");
        String lat = ParamUtil.getString(request,"lat");
        String userDesc = ParamUtil.getString(request,"userDesc");
        Integer age = DateUtils.getAge(birthday);

        User user = new User();
        user.setHeadImg(headImg);
        user.setNickName(nickName);
        user.setRealName(realName);
        user.setQq(qq);
        user.setWeixin(weixin);
        user.setEmail(email);
        user.setGender(gender);
        user.setBirthday(birthday);
        user.setAddress(address);
        user.setLon(lon);
        user.setLat(lat);
        user.setUserDesc(userDesc);
        user.setAge(age);
        user.setUpdateTime(new Date());

        return user;
    }
}
