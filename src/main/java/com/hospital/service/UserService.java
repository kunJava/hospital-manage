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
}
