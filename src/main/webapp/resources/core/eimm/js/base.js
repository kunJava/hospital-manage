var P = {
    previousPage: function () {
        var form = $("#listForm");
        var pageNumber = $("#pageNumber").val();
        var previousNumber = parseInt(pageNumber) && parseInt(pageNumber) - 1;
        $("#pageNumber").val(previousNumber);
        form.submit();
    },
    nextPage: function () {
        var form = $("#listForm");
        var pageNumber = $("#pageNumber").val();
        var nextNumber = parseInt(pageNumber) && parseInt(pageNumber) + 1;
        $("#pageNumber").val(nextNumber);
        form.submit();
    },
    tripGotoPage: function (pageNumber, id) {
        id = document.getElementById(id).form.id;
        $("#pageNumber").val(pageNumber);
        $("#" + id).submit();
    }
    ,
    tripPreviousPage: function (id) {
        id = document.getElementById(id).form.id;
        var form = $("#" + id);
        var pageNumber = $("#pageNumber").val();
        var previousNumber = parseInt(pageNumber) && parseInt(pageNumber) - 1;
        $("#pageNumber").val(previousNumber);
        form.submit();
    },
    tripNextPage: function (id) {
        id = document.getElementById(id).form.id;
        var form = $("#" + id);
        var pageNumber = $("#pageNumber").val();
        var nextNumber = parseInt(pageNumber) && parseInt(pageNumber) + 1;
        document.getElementById("pageNumber").value=nextNumber;
      //  $("#pageNumber").val(nextNumber);
        form.submit();
    },
    gotoPage: function (pageNumber) {
        $("#pageNumber").val(pageNumber);
        $("#listForm").submit();
    }
    ,
    gotoPage2: function () {
        var inPageNumber = $("#inPageNumber").val();
        $("#pageNumber").val(inPageNumber);
        $("#listForm").submit();
    }
    ,
    pageSizeChange: function () {
        $("#pageNumber").val(1);
        $("#listForm").submit();
    }
};
function msgSuccess() {
    $(document).an_dialog({
        id: 'msgSuccess',
        massage: {
            type: '成功',
            content: '操作成功！',
            callback: function (dialog, event) {
                alert(event.target.innerText);
            }
        }
    })
}
function msgFail() {
    $(document).an_dialog({
        id: 'msgFail',
        massage: {
            type: '失败',
            content: '操作失败！'
        }
    })
}


function words_deal(id, len) {
    var curLength = $("#" + id).val().length;
    var str = $("#" + id).val();
    var brNumArray = str.match(/[\r\n]/g);
    var brNum = 0;
    if (brNumArray != null) {
        brNum = brNumArray.length;
    }

    if (curLength + brNum > len) {
        var num = $("#" + id).val().substr(0, len);
        $("#" + id).val(num);
        $("#" + id + "_textCount").text("0");
        alert("超过字数限制，多出的字将被截断！");
    } else {
        $("#" + id + "_textCount").text(len - $("#" + id).val().length - brNum);
    }
}


function sumitForm2(obj) {
    if (obj == '1') {
        $(".m-table-form").find("input").each(function (i) {
            $(this).val("");
        })
        $("#listForm").submit();
    } else {
        $("input[name='search']").val("");
        $("input[name='keyWord']").val("");
        $("#listForm").submit();
    }
}

function myAlert(msg) {
    layui.use('layer', function () {
        var layer = layui.layer;
        layer.msg(msg);
    });
}