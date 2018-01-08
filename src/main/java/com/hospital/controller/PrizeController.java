package com.hospital.controller;

import com.hospital.common.JsonUtils;
import com.hospital.model.Prize;

import java.util.ArrayList;
import java.util.List;
import com.hospital.service.PrizeService;
import net.sf.json.JSONObject;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * Created by Kun on 2017/12/27 0027.
 */
@Controller
@RequestMapping(value = "/prize")
public class PrizeController {

    @Resource
    private PrizeService prizeService;

    /**
     * 抽奖页面
     * @return view
     * @author zhou.zhengkun
     * @date 2017/12/27 0027 16:39
     */
    @RequestMapping(value = "/lotteryDrawPage")
    public String lotteryDrawPage(){
        return "lotteryDraw/lotteryDraw";
    }


    /**
     * 抽奖
     * @return 奖品
     * @author zhou.zhengkun
     * @date 2017/12/27 0027 10:03
     */
    @RequestMapping(value = "/lotteryDraw",produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String lotteryDraw(){
        try{
            List<Prize> prizeList = prizeService.getPrizeList();
//            List<Prize> prizeList = virtualList();
            if (CollectionUtils.isEmpty(prizeList)){
                return JsonUtils.turnJson(false,"奖品池中还未放进任何奖品...",null);
            }
            int prizeIndex = getPrizeIndex(prizeList);
            Prize prize = prizeList.get(prizeIndex);
            JSONObject jsonObject = JSONObject.fromObject(prize);
            return JsonUtils.turnJson(true,"success",jsonObject);
        }catch (Exception e){
            return JsonUtils.turnJson(false,"error",e);
        }
    }

    /**
     * 吗的公司断网访问不了数据库,这里先写一个死的
     * @return List<Prize>
     * @author zhou.zhengkun
     * @date 2017/12/27 0027 10:20
     */
    private List<Prize> virtualList(){
        List<Prize> prizeList = new ArrayList<Prize>();
        Prize one =  new Prize("1","桌游吧畅玩券",5,5);
        Prize two =  new Prize("2","COCO奶茶券",30,30);
        Prize three =  new Prize("3","公元网咖20元网费",20,20);
        Prize four =  new Prize("4","国色天香圣诞夜场票",2,2);
        prizeList.add(one);
        prizeList.add(two);
        prizeList.add(three);
        prizeList.add(four);
        return prizeList;
    }

     /**
     * 根据Math.random()产生一个double型的随机数，判断每个奖品出现的概率
     * @param prizes
     * @return random：奖品列表prizes中的序列（prizes中的第random个就是抽中的奖品）
     */
    private int getPrizeIndex(List<Prize> prizes){
        int random = -1;
        try{
            //计算总权重
            double sumWeight = 0;
            for(Prize p : prizes){
                sumWeight += p.getPrizeWeight();
            }

            //产生随机数
            double randomNumber;
            randomNumber = Math.random();

            //根据随机数在所有奖品分布的区域并确定所抽奖品
            double d1 = 0;
            double d2 = 0;
            for(int i=0;i<prizes.size();i++){
                d2 += Double.parseDouble(String.valueOf(prizes.get(i).getPrizeWeight()))/sumWeight;
                if(i==0){
                    d1 = 0;
                }else{
                    d1 +=Double.parseDouble(String.valueOf(prizes.get(i-1).getPrizeWeight()))/sumWeight;
                }
                if(randomNumber >= d1 && randomNumber <= d2){
                    random = i;
                    break;
                }
            }
        }catch(Exception e){
            System.out.println("生成抽奖随机数出错，出错原因：" +e.getMessage());
        }
        return random;
    }
}
