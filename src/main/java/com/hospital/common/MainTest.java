package com.hospital.common;

import redis.clients.jedis.Jedis;

/**
 * Created by Kun on 2017/12/14 0014.
 */
public class MainTest {

    public static void main(String args[]){
//        Jedis jedis = RedisPool.getJedis();
//        if (jedis != null){
//            jedis.set("who am I","kun");
//            System.out.println(jedis.ping());
//            System.out.println(jedis.get("who am I"));
//        }else{
//            System.out.print("error");
//        }
        String str = new RedisUtil().getDataByKey("18382404470");
        System.out.println(str);


    }
}
