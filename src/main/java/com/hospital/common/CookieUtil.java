package com.hospital.common;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

/**
 * Created by Kun on 2017/12/01 0001.
 */
public class CookieUtil {

    /**
     * 获取COOKIE
     * @author zhou.zhengkun
     * @date 2017/12/01 0001 17:37
     */
    public static String getCookie(HttpServletRequest request, String cookieName) {
        Cookie cookies[] = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie != null && cookie.getName() != null) {
                    if (cookie.getName().equals(cookieName)) {
                        String val = cookie.getValue();
                        if("user_id".equals(cookieName)||"seller_id".equals(cookieName)){
                            //return AESDecode(val);
                            return URLDecoder.decode(val);
                        }else{
                            return URLDecoder.decode(val);
                        }
                    }
                }
            }
        }
        return null;
    }

    /**
     * description:获取用户ID
     */
    public static String getUserId(HttpServletRequest request) {
        return getCookie(request, "user_id");
    }

    /**
     * description:获取用户名称
     */
    public static String getUserName(HttpServletRequest request) {
        return getCookie(request, "user_name");
    }

    /**
     * 设置cookie
     * @author zhou.zhengkun
     * @date 2017/12/01 0001 17:41
     */
    public static void setcookie(HttpServletResponse resp, String cookieName, String cookieValue) {
        Cookie c;
        try {
            c = new Cookie(cookieName, URLEncoder.encode(cookieValue, "UTF-8"));
            // 设置生命周期为1小时，秒为单位
            c.setMaxAge(7 * 24 * 60 * 60 * 1000);
            c.setPath("/");
            resp.addCookie(c);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

    }
}
