package com.hospital.controller;

import com.hospital.common.CookieUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Kun on 2017/04/25 0025.
 */
@Controller
@RequestMapping("")
public class BaseController {

    /**
     * @des : 欢迎页面
     * @author zhou.zhengkun
     * @date 2017/04/25 0025 23:39
     */
    @RequestMapping("")
    public String index(HttpServletRequest request) {
        String userId = CookieUtil.getUserId(request);
        return "index";
    }

}
