<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="v-on" uri="http://www.springframework.org/tags/form" %>
<c:set var="base" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <title>渐进式前端框架Vue</title>
    <script src="${base}/resources/vue.js"></script>
</head>
<body>
<div id="firstVue">
    <p>{{ message }}</p>
    <input v-model="message">
</div>

<div id="app-2">
  <span v-bind:title="message">
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
  </span>
</div>

<div id="app-3">
    <p v-if="seen">现在你看到我了</p>
</div>

<div id='app-4'>
    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
    <label for="jack">Jack</label>
    <input type="checkbox" id="john" value="John" v-model="checkedNames">
    <label for="john">John</label>
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
    <label for="mike">Mike</label>
    <br>
    <span>Checked names: {{ checkedNames }}</span>
</div>
<script>
    new Vue({
        el: '#firstVue',
        data: {
            message: 'Hello Vue!'
        }
    });

    new Vue({
        el: '#app-2',
        data:{
            message: '页面加载于'+new Date().toLocaleDateString()
        }
    });

    new Vue({
        el: '#app-3',
        data: {
            seen: true
        }
    });

    new Vue({
        el: '#app-4',
        data: {
            checkedNames: []
        }
    })

</script>
</body>
</html>
