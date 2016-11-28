JPY = (function() {
    var U = {
        random: 0,
        dealySecond: [3, 5],
        startIndex: 1,
        guide: 0,
        endTs: ['6750854', '1339f3c'], // 到期时间 2016.03.16
        debug: 0
    };
    if (U.debug) {
        U.startIndex = 273;
    }

    return {
        amount: $('[spid][colid]').length,
        millisecond: 0,
        random: U.random,
        currentIndex: U.startIndex - 1,
        outDateMsg: 'tips', // 脚本已过期！不能使用！
        endTs: U.endTs,
        main: function() {
            // if (this.hasOutOfDate()) {
            //     alert(this.outDateMsg);
            //     return;
            // }

            this.wizard();
            this.play();
        },
        play: function() {
            if (this.currentIndex > this.amount) {
                this.currentIndex = 0
            }
            var unWatch = $('[spid][colid][class!=haveClick]');
            var nextWatch = $();
            if (unWatch.length > 0) {
                var n = this.random ? this.getRandom({range: [0, unWatch.length - 1]}) : 0;
                nextWatch = unWatch.eq(n);
            } else {
                var n = this.random ? this.getRandom({range: [0, this.amount - 1]}) : (this.currentIndex++);
                nextWatch = $('[spid][colid][class=haveClick]').eq(n);
            }
            nextWatch.trigger('click')
        },
        getDelayMs: function() {
            var min = U.dealySecond[0];
            var max = U.dealySecond[1];
            var ms = this.getRandom({range: [min, max]}) * 1000;
            this.millisecond = ms;
            return this.millisecond
        },
        getRandom: function(params) {
            var p = $.extend({
                range: [1, 100]
            }, params);

            var min = p.range[0];
            var max = p.range[1];
            var number = (Math.floor(Math.random() * 1000) % (max - min + 1) + min);

            return number;
        },
        wizard: function() {
            if (U.guide) {
                var delaySecond = prompt('tips', '3 20'); // 延迟播放的时间范围，以秒为单位，以空格隔开，默认值为 3~20 秒
                delaySecond = delaySecond ? delaySecond.trim().split(' ') : U.dealySecond;
                U.dealySecond = [delaySecond.shift(), delaySecond.pop()];

                if ($('[spid][colid][class!=haveClick]').length == 0) {
                    var random = confirm('tips'); // tips
                    U.random = random;

                    if (!random) {
                        var startIndex = prompt('tips' + JPY.amount + 'tips'); // 共 x 个视频，要从第几个视频开始观看？（直接输入数字）
                        U.startIndex = startIndex ? ((startIndex >= 1 && startIndex <= JPY.amount) ? startIndex : 1) : 1;
                    }
                }

                this.refreshConfig();
            }
        },
        refreshConfig: function() {
            JPY.random = U.random;
            JPY.currentIndex = U.startIndex - 1;
        },
        hasOutOfDate: function() {
            if (this.validate()) {
                var ret = (new Date()).getTime() >= this.endTimestamp;
                return ret;
            } else {
                return true;
            }
        },
        validate: function() {
            var num = this.endTs[0];
            num = num.split('').reverse().join('');
            num = Math.pow(10, 12) + num * Math.pow(10, 5);

            var hex = this.endTs[1];
            hex = parseInt(hex, 16).toString();
            hex = [hex.substr(0, 4), hex.substr(4, 2) - 1, hex.substr(6, 2)];

            var endTimestamp = num;
            if (endTimestamp == (new Date(hex[0], hex[1], hex[2]).getTime())) {
                this.endTimestamp = endTimestamp;
                return true;
            } else {
                return false;
            }
        }
    };
})();


function playerstop() {
    if (rule == 1) {
        JPY.getDelayMs();
        ajaxEditXxgj();

        setTimeout(function() {
            JPY.play();
        }, JPY.millisecond);
    } else {
        if (clearZero == 0)
            return;
        if (!ve) {
            ajaxEditXxgj();
            setTimeout(function() {
                JPY.play();
            }, JPY.millisecond);
            return;
        }
        $(".vm_content").css("z-index", "-1");
        $(".vm_content").css("position", "absolute");
        $(".vm_content object").attr("height", "0").attr("width", "0");
        $(".vm_content object embed").attr("height", "0").attr("width", "0");
        $("#sptm").show();
        clearZero = 0;
        answer('A');
    }

    dqbh = dqbh + 1;
    if (dqbh >= flvurl.length) {
        dqbh = 0
    }
}

function ajaxEditXxgj() {
    if (myRecordTimeId) {
        clearInterval(myRecordTimeId)
    }
    var realVideoTime = parseInt(CKobject.getObjectById('ckplayer_a1').getStatus()["totalTime"]);
    var myPlayTime = realVideoTime + JPY.millisecond / 1000;
    var TokenValue = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        url: "/StudentManage/EditXxgj",
        type: "get",
        data: {
            __RequestVerificationToken: TokenValue,
            lmid: lmid,
            spid: spid,
            myFlag: myFlag,
            realVideoTime: realVideoTime,
            myRecordTime: myPlayTime
        },
        dataType: "json",
        success: function(result) {
            if (result) {
                if (result.msg == -1) {
                    alert("您今日已经学满4个学时，不再记录学时！")
                } else if (result.msg == -2) {
                    alert("登录超时，可能原因：1、还没有激活学习卡 2、用户在其他地方登录 3、同一台电脑登录了多个账号。请重新登录！")
                }
            }
        }
    })
}

function answer(ans) {
    $.ajax({
        url: "/StudentManage/AnswerQ",
        type: "post",
        cache: false,
        data: {id: 11, answer: ans},
        dataType: "json",
        timeout: 5000, //超时时间设置，单位毫秒
        async: false,
        success: function(data) {
            var value = data.Value;

            if (value == 1) {
                ajaxEditXxgj();
                setTimeout(function() {
                    JPY.play();
                }, JPY.millisecond);
            } else {
                answer(data.Data);
            }
            $("#sptm").hide();
            $(".vm_content").css("z-index", "1");
            $(".vm_content object").attr("height", "575").attr("width", "600");
            $(".vm_content object embed").attr("height", "575").attr("width", "600");
        },
        complete: function(XMLHttpRequest, status) {
            if (status == 'timeout') {
                answer.abort();
                if (confirm("传送学时超时，是否继续传送？")) {
                    answer();
                }
            }
        }
    });
}

JPY.main();