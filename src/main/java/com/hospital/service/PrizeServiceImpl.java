package com.hospital.service;

import com.hospital.dao.PrizeMapper;
import com.hospital.model.Prize;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 奖品实现类
 */
@Service
public class PrizeServiceImpl implements PrizeService {

    @Resource
    private PrizeMapper prizeMapper;

    @Override
    public List<Prize> getPrizeList() {
        return prizeMapper.getPrizeList();
    }
}
