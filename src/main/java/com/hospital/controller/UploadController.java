package com.hospital.controller;

import com.hospital.common.JsonUtils;
import com.hospital.common.UploadUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

/**
 * 网站文件上传都走这个Controller
 * Created by Kun on 2017/12/22 0022.
 * @author kun
 */
@Controller
@RequestMapping(value = "upload")
public class UploadController {

    /**
     * 上传图片
     * @param headImgUp 文件
     * @return Map,其中包含服务器放回的文件String ,以及组装之后的可访问路径
     * @author zhou.zhengkun
     * @date 2017/12/22 0022 10:31
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @RequestMapping(value = "/uploadImage",produces = "application/json;charset=UTF-8",method = {RequestMethod.POST, RequestMethod.GET})
    @ResponseBody
    public String uploadImage(@RequestParam(required = false) MultipartFile headImgUp) throws Exception {
        try{
            //得到文件map对象
            String fileId = UploadUtils.uploadFile(headImgUp,null);
            String fileUrl = UploadUtils.getFileUrl(fileId);
            Map<String,Object> result = new HashMap<String,Object>(4);
            result.put("fileId",fileId);
            result.put("fileUrl",fileUrl);
            return JsonUtils.turnJson(true,"上传成功",result);
        }catch (Exception e) {
            e.printStackTrace();
            return JsonUtils.turnJson(false,"上传异常",e);
        }
    }
}
