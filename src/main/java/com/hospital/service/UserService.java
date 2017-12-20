package com.hospital.service;

import com.hospital.model.User;

/**
 * Created by Kun on 2017/04/25 0025.
 */
public interface UserService {

    /**
     * 用户注册
     * @param user
     * @return User
     * @author zhou.zhengkun
     * @date 2017/04/25 0025 16:26
     */
    String register(User user);


    String selectByAccount(String account);

    /**
     * 用户登录
     * @param phoneNum 电话(登录帐号)
     * @param password 密码
     * @return user对象
     * @author zhou.zhengkun
     * @date 2017/12/14 0014 10:24
     */
    User login(String phoneNum,String password);

    /**
     * 更新用户信息
     * @param user user对象
     * @return String 修改结果
     * @author zhou.zhengkun
     * @date 2017/12/20 0020 18:18
     */
    String update(User user);
}
