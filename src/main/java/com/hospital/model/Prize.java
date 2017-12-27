package com.hospital.model;


/**
 * 所属类别:实体类
 * 用途: 奖品表的实体类
 *
 * @author: Kun
 * @date: 2017-12-14 10:50
 */
public class Prize {

    public Prize() {

    }

    public Prize(String id, String prizeName, int prizeAmount, int prizeWeight) {
        this.id = id;
        this.prizeName = prizeName;
        this.prizeAmount = prizeAmount;
        this.prizeWeight = prizeWeight;
    }

    /**
     * 主键ID
     */
    private String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    /**
     * 奖品名字
     */
    private String prizeName;

    public String getPrizeName() {
        return prizeName;
    }

    public void setPrizeName(String prizeName) {
        this.prizeName = prizeName;
    }

    /**
     * 剩余数量
     */
    private int prizeAmount;

    public int getPrizeAmount() {
        return prizeAmount;
    }

    public void setPrizeAmount(int prizeAmount) {
        this.prizeAmount = prizeAmount;
    }

    /**
     * 权重
     */
    private int prizeWeight;

    public int getPrizeWeight() {
        return prizeWeight;
    }

    public void setPrizeWeight(int prizeWeight) {
        this.prizeWeight = prizeWeight;
    }



}
