<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="base" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <title>测试fastDFS文件上传</title>
</head>
<body>
<form action="${base}/upload/uploadImage" method="post"  enctype="multipart/form-data">
    <div>
        选择文件 :
        <input type="file" name="fileRequest" value="" />
        <input type="submit" value="submit">
    </div>
</form>
</body>
</html>
