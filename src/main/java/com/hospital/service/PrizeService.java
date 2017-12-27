package com.hospital.service;

import com.hospital.model.Prize;
import java.util.List;

/**
 * 奖品Service
 * @author zhou.zhengkun
 * @date 2017/12/27 0027 10:05
 */
public interface PrizeService {

    /**
     * 获取奖品列表
     * @return 奖品列表
     * @author zhou.zhengkun
     * @date 2017/12/27 0027 10:06
     */
    List<Prize> getPrizeList();
}
