<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<!doctype html>
<html>
<head>
    <title>VampireKun</title>
    <style type="text/css">
        .hide_class {
            display: none
        }

        .m-panel .panel-head {
            border-bottom: 1px solid #ddd !important;
        }

        .m-panel .panel-head .m-toolbar {
            background: #ff9900 !important
        }

        .m-panel .panel-head .m-toolbar .item .title #title {
            color: #fff !important
        }

        div.signState {
            float: left;
            margin-left: 20px;
            line-height: 35px;
            height: 35px;
            padding: 2px;
        }

        div.signState .headImg {
            width: 30px;
            height: 30px;
            border-radius: 30px;
            float: left;
        }

        .signState .userName {
            float: left;
        }

        .signState .userName:hover {
            color: #FF9900
        }

        .loginOut {
            margin-left: 20px;
            cursor: pointer;
        }

        .loginOut:hover {
            color: #FF9900
        }
    </style>
</head>
<body>
<div class="sy-lunbo">
    <div class="syLeft-menu">
        <div class="syLMbox"> <img src="${base}/resources/andyui/admin/skin/tiejiaoban/img/u61.png" alt="" />
            <div class="syMP">
                <p>线路</p>
                <p><a href="#">推荐线路</a><a href="#">推荐线路1</a></p>
            </div>
        </div>
        <div class="syLMbox"> <img src="${base}/resources/andyui/admin/skin/tiejiaoban/img/u61.png" alt="" />
            <div class="syMP">
                <p class="f-c1">景点</p>
                <p><a href="#">乌江</a><a href="#">赤水丹霞</a></p>
            </div>
        </div>
        <div class="syLMbox"> <img src="${base}/resources/andyui/admin/skin/tiejiaoban/img/u61.png" alt="" />
            <div class="syMP">
                <p class="f-c2">酒店</p>
                <p><a href="#">推荐线路</a><a href="#">推荐线路</a></p>
            </div>
        </div>
        <div class="syLMbox"> <img src="${base}/resources/andyui/admin/skin/tiejiaoban/img/u61.png" alt="" />
            <div class="syMP">
                <p>旅游组合</p>
                <p><a href="#">推荐线路</a><a href="#">推荐线路</a></p>
            </div>
        </div>
        <div class="syLMbox"> <img src="${base}/resources/andyui/admin/skin/tiejiaoban/img/u61.png" alt="" />
            <div class="syMP">
                <p>美食</p>
                <p><a href="#">推荐线路</a><a href="#">推荐线路</a></p>
            </div>
        </div>
        <div class="syLMbox"> <img src="${base}/resources/andyui/admin/skin/tiejiaoban/img/u61.png" alt="" />
            <div class="syMP">
                <p>土特产</p>
                <p><a href="#">推荐线路</a><a href="#">推荐线路</a></p>
            </div>
        </div>
        <div class="syLMbox"> <img src="${base}/resources/andyui/admin/skin/tiejiaoban/img/u61.png" alt="" />
            <div class="syMP">
                <p>娱乐</p>
                <p><a href="#">推荐线路</a><a href="#">推荐线路</a></p>
            </div>
        </div>
        <div class="syLMbox"> <img src="${base}/resources/andyui/admin/skin/tiejiaoban/img/u61.png" alt="" />
            <div class="syMP">
                <p>租车</p>
                <p><a href="#">推荐线路</a><a href="#">推荐线路</a></p>
            </div>
        </div>
    </div>
    <div class="sytj">
        <p class="p1"><span>9月</span><span>推荐<br/>目的地</span></p>
        <p class="p2">September</p>
    </div>
    <div class="m-carousel li-inline">
        <ul id="carousel">
            <li><img src="${base}/resources/andyui/admin/skin/tiejiaoban/img/u53.png" alt=""/>
                <div class="sylb-info">
                    <h2>赤水河谷</h2>
                    <div>赤水河谷旅游公路起于仁怀市茅台镇，途经习水县土城镇，止于赤水市区，其中机动车道主线全长153.6公里，自行车道慢行系统154.3公里，沿线经过了12个乡镇。主线分别由G212、S303和G546组成，采用设计时速40公里、路基宽度8.5米的二级公路标准，给全国游客提供了一条生态旅游路。</div>
                    <p><span>距离您的位置</span><span>122km</span><img src="${base}/resources/andyui/admin/skin/tiejiaoban/img/u614.png" alt="" /></p>
                </div>
            </li>
            <li><img src="${base}/resources/andyui/admin/skin/tiejiaoban/img/u53.png" alt=""/>
                <div class="sylb-info">
                    <h2>赤水河谷</h2>
                    <div>赤水河谷旅游公路起于仁怀市茅台镇，途经习水县土城镇，止于赤水市区，其中机动车道主线全长153.6公里，自行车道慢行系统154.3公里，沿线经过了12个乡镇。主线分别由G212、S303和G546组成，采用设计时速40公里、路基宽度8.5米的二级公路标准，给全国游客提供了一条生态旅游路。</div>
                    <p><span>距离您的位置</span><span>122km</span><img src="${base}/resources/andyui/admin/skin/tiejiaoban/img/u614.png" alt="" /></p>
                </div>
            </li>
            <li><img src="${base}/resources/andyui/admin/skin/tiejiaoban/img/u53.png" alt=""/>
                <div class="sylb-info">
                    <h2>赤水河谷</h2>
                    <div>赤水河谷旅游公路起于仁怀市茅台镇，途经习水县土城镇，止于赤水市区，其中机动车道主线全长153.6公里，自行车道慢行系统154.3公里，沿线经过了12个乡镇。主线分别由G212、S303和G546组成，采用设计时速40公里、路基宽度8.5米的二级公路标准，给全国游客提供了一条生态旅游路。</div>
                    <p><span>距离您的位置</span><span>122km</span><img src="${base}/resources/andyui/admin/skin/tiejiaoban/img/u614.png" alt="" /></p>
                </div>
            </li>
        </ul>
        <div class="pager" id="carousel-pager"></div>
        <i class="prev" id="carousel-prev"><img src="${base}/resources/andyui/admin/skin/tiejiaoban/img/u630.png" alt="" /></i> <i class="next" id="carousel-next"><img src="${base}/resources/andyui/admin/skin/tiejiaoban/img/u631.png" alt="" /></i> </div>
</div>
<div  class="g-box1200 f-clear" style="padding-top: 30px">
    <div class="f-left syLeft"> <img src="#" alt="" style="width:270px;height:272px;"/>
        <div class="syTjxl">
            <div class="sytjTit f-clear">
                <span>线路</span><span>推荐</span>
                <div class = "m-combo f-right" id = "htmlcombo" style = "width:60px" an-combo>
                    <div class="u-group" combo = "ul1">
                        <input class = "item item-l u-input nohover" value = "全部" readonly >
                        <i class="iconfont mark item item-r">&#xe613;</i>
                    </div>
                    <ul class="combo m-menu" combo = "ul1">
                        <li class="first" value = "1" listId = "1"><a href="javascript:;">全部</a></li>
                        <li value = "2" listId = "2"><a href="javascript:;">全部</a></li>
                        <li value = "3" listId = "3"><a href="javascript:;">全部</a></li>
                        <li value = "4" listId = "4"><a href="javascript:;">全部</a></li>
                        <li value = "5" listId = "5"><a href="javascript:;">全部</a></li>
                    </ul>
                </div>
            </div>
            <ul class="m-list-s" style="width: 280px;">
                <li><a href="" class="u-img"><img src="#" width="85px" height="85px"></a>
                    <p><a href="">广州直飞贵阳3天2晚自由行（含2晚贵阳市区豪华酒店/1晚市区+1晚黄果树...</a></p>
                    <p class="price"><span>￥1200</span> 起</p>
                </li>
                <li><a href="" class="u-img"><img src="#" width="85px" height="85px"></a>
                    <p><a href="">广州直飞贵阳3天2晚自由行（含2晚贵阳市区豪华酒店/1晚市区+1晚黄果树...</a></p>
                    <p class="price"><span>￥1200</span> 起</p>
                </li>
                <li><a href="" class="u-img"><img src="#" width="85px" height="85px"></a>
                    <p><a href="">广州直飞贵阳3天2晚自由行（含2晚贵阳市区豪华酒店/1晚市区+1晚黄果树...</a></p>
                    <p class="price"><span>￥1200</span> 起</p>
                </li>
                <li><a href="" class="u-img"><img src="#" width="85px" height="85px"></a>
                    <p><a href="">广州直飞贵阳3天2晚自由行（含2晚贵阳市区豪华酒店/1晚市区+1晚黄果树...</a></p>
                    <p class="price"><span>￥1200</span> 起</p>
                </li>
            </ul>
        </div>
        <img src="#" style="width:270px;height:212px;"/>
        <div class="syTjhd">
            <div class="sytjTit f-clear"><span>活动</span><span>推荐</span></div>
            <ul class="m-list-act">
                <li><a href="" class="u-img"><img src="#" width="60px" height="60px"></a>
                    <p><a href="">成都出发，探秘那黔北的赤水丹霞~</a></p>
                    <p>2017-9-5 至 2017-10-1</p>
                </li>
                <li><a href="" class="u-img"><img src="#" width="60px" height="60px"></a>
                    <p><a href="">成都出发，探秘那黔北的赤水丹霞~</a></p>
                    <p>2017-9-5 至 2017-10-1</p>
                </li>
                <li><a href="" class="u-img"><img src="#" width="60px" height="60px"></a>
                    <p><a href="">成都出发，探秘那黔北的赤水丹霞~</a></p>
                    <p>2017-9-5 至 2017-10-1</p>
                </li>
                <li><a href="" class="u-img"><img src="#" width="60px" height="60px"></a>
                    <p><a href="">成都出发，探秘那黔北的赤水丹霞~</a></p>
                    <p>2017-9-5 至 2017-10-1</p>
                </li>
            </ul>
        </div>
        <img src="#" style="width:270px;height:365px;"/> </div>
    <div class="f-right syRight">
        <div class="syTjth f-clear">
            <div class="sytjTit f-clear"><span class="u-first">特惠</span><span>推荐</span>
                <ul class="f-right box-pagin f-clear">
                    <li class="f-left u-li1"><a>1</a>/3</li>
                    <li class="f-left u-li2 on"></li>
                    <li class="f-left u-li3"></li>
                </ul>
            </div>
            <ul class="sythBox">
                <li><a href="" class="u-img"><img src="#" width="213px" height="170px"></a>
                    <p class="u-title-bg"><span><b>￥128</b>/晚</span>起</p>
                    <p class="u-title">赤水赤天化宾馆 十一特惠活动，在线预定特享价格</p>
                    <span class="label">特惠</span></li>
                <li class="u-green"><a href="" class="u-img"><img src="#" width="213px" height="170px"></a>
                    <p class="u-title-bg"><span><b>￥128</b>/晚</span>起</p>
                    <p class="u-title">赤水赤天化宾馆 十一特惠活动，在线预定特享价格</p>
                    <span class="label">特惠</span></li>
                <li><a href="" class="u-img"><img src="#" width="213px" height="170px"></a>
                    <p class="u-title-bg"><span><b>￥128</b>/晚</span>起</p>
                    <p class="u-title">赤水赤天化宾馆 十一特惠活动，在线预定特享价格</p>
                    <span class="label">特惠</span></li>
                <li><a href="" class="u-img"><img src="#" width="213px" height="170px"></a>
                    <p class="u-title-bg"><span><b>￥128</b>/晚</span>起</p>
                    <p class="u-title">赤水赤天化宾馆 十一特惠活动，在线预定特享价格</p>
                    <span class="label">特惠</span></li>
            </ul>
        </div>
        <div class="syTjyj">
            <div class="sytjTit2 f-clear">
                <div class="f-left f-clear titDiv">
                    <span class="u-first">游记</span><span>推荐</span>
                </div>
                <button class="u-btn f-right">我要写游记</button>
                <input type="text" class="u-input search f-right" placeholder="输入关键字">
            </div>
            <ul class="m-list-index">
                <li> <a href="" class="u-img"><img src="#" width="240px;" height="165px;"></a>
                    <p class="u-title"><a href="">成都出发，探秘那黔北的赤水丹霞~</a></p>
                    <p class="u-info">在黔川边界的赤水，有着茂密的森林，阵阵竹海，一片天然氧吧，更为独特的丹霞地貌上有着成群的瀑布。还能在铺满斑驳石板路的古镇里，寻找红军“四渡赤水”的足迹。跟随我从成都出发，一起去探秘赤水。</p>
                    <p class="u-jingdian"><strong>相关景点：</strong><a href="">赤水丹霞</a><a href="">黄果树</a><a href="">桐梓花海</a></p>
                    <p class="u-bottom"><span><img src="${base}/resources/andyui/admin/img/u232.png">by 遵义</span><span class="u-tx"><img src="${base}/resources/andyui/admin/img/u230.png">小萌子</span><span class="u-btns">231名 小伙伴准备出发</span> <span class="f-right"><span><img src="${base}/resources/andyui/admin/img/u239.png">1554885</span><span><img src="${base}/resources/andyui/admin/img/u637.png">14848</span><span><img src="${base}/resources/andyui/admin/img/u244.png">48485</span><span><img src="${base}/resources/andyui/admin/img/u249.png">84848</span></span></p>
                </li>
                <li> <a href="" class="u-img"><img src="#" width="240px;" height="165px;"></a>
                    <p class="u-title"><a href="">成都出发，探秘那黔北的赤水丹霞~</a></p>
                    <p class="u-info">在黔川边界的赤水，有着茂密的森林，阵阵竹海，一片天然氧吧，更为独特的丹霞地貌上有着成群的瀑布。还能在铺满斑驳石板路的古镇里，寻找红军“四渡赤水”的足迹。跟随我从成都出发，一起去探秘赤水。</p>
                    <p class="u-jingdian"><strong>相关景点：</strong><a href="">黄果树</a><a href="">桐梓花海</a></p>
                    <p class="u-bottom"><span><img src="${base}/resources/andyui/admin/img/u232.png">by 遵义</span><span class="u-tx"><img src="${base}/resources/andyui/admin/img/u230.png">小萌子</span><span class="u-btns">231名 小伙伴准备出发</span> <span class="f-right"><span><img src="${base}/resources/andyui/admin/img/u239.png">1554885</span><span><img src="${base}/resources/andyui/admin/img/u637.png">14848</span><span><img src="${base}/resources/andyui/admin/img/u244.png">48485</span><span><img src="${base}/resources/andyui/admin/img/u249.png">84848</span></span></p>
                </li>
                <li> <a href="" class="u-img"><img src="#" width="240px;" height="165px;"></a>
                    <p class="u-title"><a href="">成都出发，探秘那黔北的赤水丹霞~</a></p>
                    <p class="u-info">在黔川边界的赤水，有着茂密的森林，阵阵竹海，一片天然氧吧，更为独特的丹霞地貌上有着成群的瀑布。还能在铺满斑驳石板路的古镇里，寻找红军“四渡赤水”的足迹。跟随我从成都出发，一起去探秘赤水。</p>
                    <p class="u-jingdian"><strong>相关景点：</strong><a href="">桐梓花海</a><a href="">赤水丹霞</a><a href="">赤水丹霞</a><a href="">黄果树</a><a href="">桐梓花海</a></p>
                    <p class="u-bottom"><span><img src="${base}/resources/andyui/admin/img/u232.png">by 遵义</span><span class="u-tx"><img src="${base}/resources/andyui/admin/img/u230.png">小萌子</span><span class="u-btns">231名 小伙伴准备出发</span> <span class="f-right"><span><img src="${base}/resources/andyui/admin/img/u239.png">1554885</span><span><img src="${base}/resources/andyui/admin/img/u637.png">14848</span><span><img src="${base}/resources/andyui/admin/img/u244.png">48485</span><span><img src="${base}/resources/andyui/admin/img/u249.png">84848</span></span></p>
                </li>
                <li> <a href="" class="u-img"><img src="#" width="240px;" height="165px;"></a>
                    <p class="u-title"><a href="">成都出发，探秘那黔北的赤水丹霞~</a></p>
                    <p class="u-info">在黔川边界的赤水，有着茂密的森林，阵阵竹海，一片天然氧吧，更为独特的丹霞地貌上有着成群的瀑布。还能在铺满斑驳石板路的古镇里，寻找红军“四渡赤水”的足迹。跟随我从成都出发，一起去探秘赤水。</p>
                    <p class="u-jingdian"><strong>相关景点：</strong><a href="">黄果树</a><a href="">桐梓花海</a><a href="">赤水丹霞</a></p>
                    <p class="u-bottom"><span><img src="${base}/resources/andyui/admin/img/u232.png">by 遵义</span><span class="u-tx"><img src="${base}/resources/andyui/admin/img/u230.png">小萌子</span><span class="u-btns">231名 小伙伴准备出发</span> <span class="f-right"><span><img src="${base}/resources/andyui/admin/img/u239.png">1554885</span><span><img src="${base}/resources/andyui/admin/img/u637.png">14848</span><span><img src="${base}/resources/andyui/admin/img/u244.png">48485</span><span><img src="${base}/resources/andyui/admin/img/u249.png">84848</span></span></p>
                </li>
                <li> <a href="" class="u-img"><img src="#" width="240px;" height="165px;"></a>
                    <p class="u-title"><a href="">成都出发，探秘那黔北的赤水丹霞~</a></p>
                    <p class="u-info">在黔川边界的赤水，有着茂密的森林，阵阵竹海，一片天然氧吧，更为独特的丹霞地貌上有着成群的瀑布。还能在铺满斑驳石板路的古镇里，寻找红军“四渡赤水”的足迹。跟随我从成都出发，一起去探秘赤水。</p>
                    <p class="u-jingdian"><strong>相关景点：</strong><a href="">桐梓花海</a></p>
                    <p class="u-bottom"><span><img src="${base}/resources/andyui/admin/img/u232.png">by 遵义</span><span class="u-tx"><img src="${base}/resources/andyui/admin/img/u230.png">小萌子</span><span class="u-btns">231名 小伙伴准备出发</span> <span class="f-right"><span><img src="${base}/resources/andyui/admin/img/u239.png">1554885</span><span><img src="${base}/resources/andyui/admin/img/u637.png">14848</span><span><img src="${base}/resources/andyui/admin/img/u244.png">48485</span><span><img src="${base}/resources/andyui/admin/img/u249.png">84848</span></span></p>
                </li>
                <li> <a href="" class="u-img"><img src="#" width="240px;" height="165px;"></a>
                    <p class="u-title"><a href="">成都出发，探秘那黔北的赤水丹霞~</a></p>
                    <p class="u-info">在黔川边界的赤水，有着茂密的森林，阵阵竹海，一片天然氧吧，更为独特的丹霞地貌上有着成群的瀑布。还能在铺满斑驳石板路的古镇里，寻找红军“四渡赤水”的足迹。跟随我从成都出发，一起去探秘赤水。</p>
                    <p class="u-jingdian"><strong>相关景点：</strong><a href="">黄果树</a><a href="">桐梓花海</a></p>
                    <p class="u-bottom"><span><img src="${base}/resources/andyui/admin/img/u232.png">by 遵义</span><span class="u-tx"><img src="${base}/resources/andyui/admin/img/u230.png">小萌子</span><span class="u-btns">231名 小伙伴准备出发</span> <span class="f-right"><span><img src="${base}/resources/andyui/admin/img/u239.png">1554885</span><span><img src="${base}/resources/andyui/admin/img/u637.png">14848</span><span><img src="${base}/resources/andyui/admin/img/u244.png">48485</span><span><img src="${base}/resources/andyui/admin/img/u249.png">84848</span></span></p>
                </li>
            </ul>
            <div class="sc-paginer">
                <ul>
                    <li class="pagin-num">共2500页/3000条</li>
                    <li class="pagin-prev"><a href="#">上一页</a></li>
                    <li class="activate"><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                    <li><a href="#">6</a></li>
                    <li><a href="#">7</a></li>
                    <li class="pagin-next"><a href="#">下一页</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="g-box1200 f-clear">
    <div class="sy-bot">
        <div class="sy-botbox">
            <div class="sytjTit2 f-clear">
                <div class="f-left f-clear titDiv"><span class="f-c1">吃在</span><span>遵义</span></div>
                <a href="#" class="f-right more">找更多</a> </div>
            <ul class="m-list-s m-list-bot">
                <li><a href="" class="u-img"><img src="#" width="80px" height="80px"></a>
                    <p><a href="" class="title">【人民路】世纪柏源酒店</a></p>
                    <p>仅售138元！价值168元的单人海鲜自助餐，提供免费WiFi。</p>
                </li>
                <li><img src="#" width="80px" height="80px" class="u-img">
                    <p><a href="" class="title">【宁波路】盐品宴自助火锅</a></p>
                    <p>仅售55元！价值58元的单人火锅自助，提供免费WiFi。</p>
                </li>
                <li><img src="#" width="80px" height="80px" class="u-img">
                    <p><a href="" class="title">【广州路】MAGIC COFFEE</a></p>
                    <p>仅售9.9元！最高价值32元的饮品7选1，建议单人使用，提供免费WiFi</p>
                </li>
            </ul>
        </div>
        <div class="sy-botbox">
            <div class="sytjTit2 f-clear">
                <div class="f-left f-clear titDiv"><span class="f-c2">玩在</span><span>遵义</span></div>
                <a href="#" class="f-right more">找更多</a> </div>
            <ul class="m-list-s m-list-bot">
                <li><a href="" class="u-img"><img src="#" width="80px" height="80px"></a>
                    <p><a href="" class="title">【4店通用】博文网咖</a></p>
                    <p>仅售6元，价值12元单人优惠时段！</p>
                </li>
                <li><img src="#" width="80px" height="80px" class="u-img">
                    <p><a href="" class="title">【沿江路】柏晶印象影院式足疗</a></p>
                    <p>仅售76元，价值158元柏晶印象影院式足疗 洗华桥，节假日通用，免费WiFi！</p>
                </li>
                <li><img src="#" width="80px" height="80px" class="u-img">
                    <p><a href="" class="title">【2店通用】欢唱时尚KTV</a></p>
                    <p>仅售10元，价值48元12:00~18:00包段欢唱，免开机费，免费WiFi！</p>
                </li>
            </ul>
        </div>
        <div class="sy-botbox">
            <div class="sytjTit2 f-clear">
                <div class="f-left f-clear titDiv"><span class="f-c3">特产</span><span>遵义</span></div>
                <a href="#" class="f-right more">找更多</a> </div>
            <ul class="m-list-s m-list-bot">
                <li><a href="" class="u-img"><img src="#" width="80px" height="80px"></a>
                    <p><a href="" class="title">睿富酱酒</a></p>
                    <p>茅台镇独有天然洞藏，纯粮酿造，包装精美高端，是商务接待，馈赠佳品</p>
                </li>
                <li><img src="#" width="80px" height="80px" class="u-img">
                    <p><a href="" class="title">酱牛肉</a></p>
                    <p>没有你买不到的，只有你想不到的，我们家全心满足你</p>
                </li>
                <li><img src="#" width="80px" height="80px" class="u-img">
                    <p><a href="" class="title">财神赐</a></p>
                    <p class="u-ov">茅台镇独有天然洞藏，纯粮酿造，包装精美高端，是商务接待，馈赠佳品茅台镇独有天然洞藏，纯粮酿造，包装精美高端，是商务接待，馈赠佳茅台镇独有天然洞藏，纯粮酿造，包装精美高端，是商务接待，馈赠佳！</p>
                </li>
            </ul>
        </div>
    </div>
</div>
<!--侧边栏-->
<ul class="slider_bar">
    <li class="to_top_list">
        <i class="iconfont">&#xe615;</i>
        <div class="to_top">返回<br>顶部</div>
    </li>
    <li><i class="iconfont">&#xe7a1;</i></li>
    <li class="erweima_list">
        <i class="iconfont">&#xe70a;</i>
        <div class="erweima_box">
            <img src="#" style="width: 134px;height: 134px;" alt=""/>
        </div>
    </li>
    <li><img src="${base}/resources/andyui/admin/skin/tiejiaoban/img/kf.png" style="width:43px;height:44px;" alt="" /></li>
</ul>
</body>
</html>
