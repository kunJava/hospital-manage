package com.hospital.common;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;
import java.util.UUID;

/**
 * Created by Kun on 2017/04/25 0025.
 */
public class StringUtils {

    public static String[] split(String source, String delim) {
        String[] wordLists;
        if (source == null) {
            wordLists = new String[1];
            wordLists[0] = source;
            return wordLists;
        }
        if (delim == null) {
            delim = ",";
        }
        StringTokenizer st = new StringTokenizer(source, delim);
        int total = st.countTokens();
        wordLists = new String[total];
        for (int i = 0; i < total; i++) {
            wordLists[i] = st.nextToken();
        }
        return wordLists;
    }


    public static boolean isBlank(String str) {
        int strLen;
        if(str != null && (strLen = str.length()) != 0) {
            for(int i = 0; i < strLen; ++i) {
                if(!Character.isWhitespace(str.charAt(i))) {
                    return false;
                }
            }

            return true;
        } else {
            return true;
        }
    }

    public static boolean isNotBlank(String str) {
        return !isBlank(str);
    }

    public static String getUUid(){
        try {
            String uuid = UUID.randomUUID().toString();
            String result = uuid.replaceAll("-","");
            return result;
        }catch (Exception e){
            return "";
        }
    }

    /**
     * 转utf8格式
     * @param str 参数
     * @return String
     * @author zhou.zhengkun
     * @date 2017/12/21 0021 16:07
     */
    public static String toUTF8(String str) {
        try {
            if (str == null){
                return null;
            }
            str = new String(str.getBytes("ISO-8859-1"), "UTF-8");
            return str;
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        return null;
    }
}
