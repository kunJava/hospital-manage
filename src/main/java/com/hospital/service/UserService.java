package com.hospital.service;

import com.hospital.model.User;
import javax.servlet.http.HttpServletRequest;

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

    User getUserByAccount(String account);

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
     * @Author: qyj
     * @Description:修改密码
     * @return String 修改结果
     * @Date: 17:14 2017/12/20
     */
    String changePassword(String phoneNum,String newPassword);

    /**
     * 更新用户信息
     * @param request request
     * @return String 修改结果
     * @author zhou.zhengkun
     * @date 2017/12/20 0020 18:18
     */
    String update(HttpServletRequest request);

    /**
     * 通过ID查询User
     * @param id userId
     * @return USER
     * @author zhou.zhengkun
     * @date 2017/12/21 0021 16:48
     */
    User selectById(String id);
}
