package com.hospital.common;

import redis.clients.jedis.Jedis;

/**
 * Created by Kun on 2017/12/14 0014.
 */
public class MainTest {

    public static void main(String args[]){
        Jedis jedis = RedisPool.getJedis();
        if (jedis != null){
            jedis.set("who am I","kun");
            System.out.print(jedis.ping());
            System.out.print(jedis.get("who am I"));
        }else{
            System.out.print("error");
        }


    }
}
