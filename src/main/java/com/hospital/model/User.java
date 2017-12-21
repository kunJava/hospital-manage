package com.hospital.model;

import java.util.Date;

/**
 * 所属类别:实体类 <br/>
 * 用途: 用户表的实体类<br/>
 * @author：Kun
 * @date：2017-12-14 10:50
 */
public class User{
    /**
     * 主键ID
     */
    private String id;
    public String getId(){
        return id;
    }
    public void setId(String id){
        this.id=id== null ? null : id.trim();
    }
    /**
     * 登录帐号
     */
    private String account;
    public String getAccount(){
        return account;
    }
    public void setAccount(String account){
        this.account=account== null ? null : account.trim();
    }
    /**
     * 密码
     */
    private String password;
    public String getPassword(){
        return password;
    }
    public void setPassword(String password){
        this.password=password== null ? null : password.trim();
    }
    /**
     * 昵称
     */
    private String nickName;
    public String getNickName(){
        return nickName;
    }
    public void setNickName(String nickName){
        this.nickName=nickName== null ? null : nickName.trim();
    }
    /**
     * 电话
     */
    private String phone;
    public String getPhone(){
        return phone;
    }
    public void setPhone(String phone){
        this.phone=phone== null ? null : phone.trim();
    }
    /**
     * 地址
     */
    private String address;
    public String getAddress(){
        return address;
    }
    public void setAddress(String address){
        this.address=address== null ? null : address.trim();
    }
    /**
     * 纬度
     */
    private String lat;
    public String getLat(){
        return lat;
    }
    public void setLat(String lat){
        this.lat=lat== null ? null : lat.trim();
    }
    /**
     * 经度
     */
    private String lon;
    public String getLon(){
        return lon;
    }
    public void setLon(String lon){
        this.lon=lon== null ? null : lon.trim();
    }
    /**
     * 性别
     */
    private int gender;
    public int getGender(){
        return gender;
    }
    public void setGender(int gender){
        this.gender=gender;
    }
    /**
     * 生日
     */
    private Date birthday;
    public Date getBirthday(){
        return birthday;
    }
    public void setBirthday(Date birthday){
        this.birthday=birthday;
    }
    /**
     * 年龄
     */
    private int age;
    public int getAge(){
        return age;
    }
    public void setAge(int age){
        this.age=age;
    }
    /**
     * 邮箱
     */
    private String email;
    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email=email== null ? null : email.trim();
    }
    /**
     * 微信
     */
    private String weixin;
    public String getWeixin(){
        return weixin;
    }
    public void setWeixin(String weixin){
        this.weixin=weixin== null ? null : weixin.trim();
    }
    /**
     * QQ
     */
    private String qq;
    public String getQq(){
        return qq;
    }
    public void setQq(String qq){
        this.qq=qq== null ? null : qq.trim();
    }
    /**
     *
     */
    private Date createTime;
    public Date getCreateTime(){
        return createTime;
    }
    public void setCreateTime(Date createTime){
        this.createTime=createTime;
    }
    /**
     *
     */
    private Date updateTime;
    public Date getUpdateTime(){
        return updateTime;
    }
    public void setUpdateTime(Date updateTime){
        this.updateTime=updateTime;
    }
    /**
     * -1 删除 1未删除
     */
    private int status;
    public int getStatus(){
        return status;
    }
    public void setStatus(int status){
        this.status=status;
    }
    /**
     * 部门ID
     */
    private String departmentId;
    public String getDepartmentId(){
        return departmentId;
    }
    public void setDepartmentId(String departmentId){
        this.departmentId=departmentId== null ? null : departmentId.trim();
    }
    /**
     * 角色ID
     */
    private String roleId;
    public String getRoleId(){
        return roleId;
    }
    public void setRoleId(String roleId){
        this.roleId=roleId== null ? null : roleId.trim();
    }
    /**
     * 介绍
     */
    private String userDesc;
    public String getUserDesc(){
        return userDesc;
    }
    public void setUserDesc(String userDesc){
        this.userDesc=userDesc== null ? null : userDesc.trim();
    }
    /**
     * 真实姓名
     */
    private String realName;
    public String getRealName(){
        return realName;
    }
    public void setRealName(String realName){
        this.realName=realName== null ? null : realName.trim();
    }
    /**
     * 头像
     */
    private String headImg;
    public String getHeadImg() {
        return headImg;
    }
    public void setHeadImg(String headImg) {
        this.headImg = headImg;
    }
}
