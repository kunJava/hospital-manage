package com.hospital.service;


import com.hospital.common.DateUtils;
import com.hospital.common.JsonUtils;
import com.hospital.common.PasswordEncoder;
import com.hospital.common.StringUtils;
import com.hospital.dao.UserMapper;
import com.hospital.model.User;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    public String update(User user) {
        int result = userMapper.updateByPrimaryKeySelective(user);
        if (result > 0){
            return JsonUtils.turnJson(true,"success",user);
        }else{
            return JsonUtils.turnJson(false,"error",null);
        }
    }
}
