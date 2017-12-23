package com.hospital.common;

import org.apache.commons.lang.BooleanUtils;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.StringRedisTemplate;

import javax.annotation.Resource;
import java.io.*;

/**
 * Created by Kun on 2017/12/14 0014.
 */
public class RedisUtil {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    /**
     * 将对象序列化:要求对象要实现序列化接口
     */
    public static byte[] serialize(Object obj ){
        ObjectOutputStream oos = null; //对象输出流
        ByteArrayOutputStream baos = null;//字节数组输出流
        byte[] bt=null;
        try {
            baos = new ByteArrayOutputStream();
            oos=new ObjectOutputStream(baos);
            oos.writeObject(obj);
            bt=baos.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
        }finally{
            if(baos!=null){
                try {
                    baos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return bt;
    }
    /**
     * 反序列化，将byte字节转换为对象
     */
    public static Object unSerialize(byte[] bt){
        ByteArrayInputStream bais = null;
        Object object =null;
        try {
            bais = new ByteArrayInputStream(bt);
            ObjectInputStream ois = new ObjectInputStream(bais);
            object  = ois .readObject();
        } catch (Exception e) {
            e.printStackTrace();
        }finally{
            if(bais!=null){
                try {
                    bais.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return object;
    }


    /***
     * redis中设置值
     * @param key 键
     * @param data 值
     * @param expired key的过期时间 单位:秒
     * @return
     */
    public boolean setDataByKey(final String key, final String data, final long expired){
        boolean result=false;
        if(StringUtils.isBlank(key)||StringUtils.isBlank(data)){
            return result;
        }
        Boolean flag= (Boolean) stringRedisTemplate.execute(new RedisCallback() {
            @Override
            public Object doInRedis(RedisConnection redisConnection) throws DataAccessException {
                long exTmp=expired<0?0:expired;
                redisConnection.set(key.getBytes(),data.getBytes());
                if(expired>0){
                    redisConnection.expire(key.getBytes(),expired);
                }
                return true;
            }
        });
        if(BooleanUtils.isTrue(flag)){
            result=true;
        }
        return result;
    }

    /***
     * redis 中获取值
     */
    public String getDataByKey(final String key){
        if(StringUtils.isBlank(key)){
            return null;
        }
        String result = (String) stringRedisTemplate.execute(new RedisCallback() {
            @Override
            public String doInRedis(RedisConnection redisConnection) throws DataAccessException {
                if(redisConnection.get(key.getBytes())==null){
                    return null;
                }
                return new String(redisConnection.get(key.getBytes()));
            }
        });
        return result;
    }

    /***
     * redis 删除
     */
    public Long removeBykey(final String key){
        if(StringUtils.isBlank(key)){
            return null;
        }
        Long result = (Long) stringRedisTemplate.execute(new RedisCallback<Long>() {
            @Override
            public Long doInRedis(RedisConnection redisConnection) throws DataAccessException {

                return redisConnection.del(key.getBytes());
            }
        });
        return result;
    }
}
