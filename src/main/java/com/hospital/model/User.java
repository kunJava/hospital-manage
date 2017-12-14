package com.hospital.model;

/**
 * Created by Kun on 2017/04/25 0025.
 */
public class User {

    /**
     * 主键ID
     **/
    private String id;
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    /**
     * 登录帐号
     **/
    private String account;
    public String getAccount() {
        return account;
    }
    public void setAccount(String account) {
        this.account = account;
    }

    /**
     * 登录密码
     **/
    private String password;
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * 用户名
     **/
    private String userName;
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * 状态
     **/
    private String status;
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * 创建时间
     **/
    private String createTime;
    public String getCreateTime() {
        return createTime;
    }
    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    /**
     * 更新时间
     **/
    private String updateTime;
    public String getUpdateTime() {
        return updateTime;
    }
    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    /**
     * 手机号
     **/
    private String phone;
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }

    /**
     * 邮箱
     **/
    private String email;
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * 开始玩LOL的时间
     **/
    private String joinLolDate;
    public String getJoinLolDate() {
        return joinLolDate;
    }
    public void setJoinLolDate(String joinLolDate) {
        this.joinLolDate = joinLolDate;
    }

    /**
     * 性别
     **/
    private String sex;
    public String getSex() {
        return sex;
    }
    public void setSex(String sex) {
        this.sex = sex;
    }

    /**
     *
     **/
    private String like;
    public String getLike() {
        return like;
    }
    public void setLike(String like) {
        this.like = like;
    }

    /**
     * 排序
     **/
    private String sort;
    public String getSort() {
        return sort;
    }
    public void setSort(String sort) {
        this.sort = sort;
    }
}
