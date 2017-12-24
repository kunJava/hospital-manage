package com.hospital.dao;

import com.hospital.model.User;

import java.util.Map;

/**
 * Created by Kun on 2017/04/25 0025.
 */
public interface UserMapper {

    User getUserByAccount(String account);

    int insertUser(User user);

    User userLogin(Map map);

    User queryUser(Map map);

    int userChangePassword(Map map);

    int insertSelective(User record);

    int updateByPrimaryKeySelective(User record);

    User selectByPrimaryKey(String id);

}
