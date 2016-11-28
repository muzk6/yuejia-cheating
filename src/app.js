var U = {
    random: 0,
    dealySecond: [3, 5],
};

class YuejiaCheating {
    constructor(test = 0) {
        this.test = test;
        this.millisecond = 0;

        this.override();
    }

    start() {
        this.play();
    }

    play() {
        if (this.test) {
            $("#ulTreeList a[spid=2002][colid=2004]").click();
        } else {
            let unWatch = $('#ulTreeList a[class!=haveClick]:first');
            if (unWatch.length) {
                unWatch[0].click();
            } else {
                let watched = $('#ulTreeList a[class*=haveClick]');
                let index = (new Date()).getTime() % watched.length;
                watched.eq(index)[0].click();
            }
        }
    }

    answer(ans) {
        let _this = this;
        $.ajax({
            url: "/StudentManage/AnswerQ",
            type: "post",
            cache: false,
            data: {id: 11, answer: ans},
            dataType: "json",
            timeout: 5000, //超时时间设置，单位毫秒
            async: false,
            success: function (data) {
                let value = data.Value;

                if (value == 1) {
                    ajaxEditXxgj();
                    setTimeout(function () {
                        _this.play();
                    }, _this.millisecond);
                } else {
                    this.answer(data.Data);
                }
                $("#sptm").hide();
                $(".vm_content").css("z-index", "1");
                $(".vm_content object").attr("height", "575").attr("width", "600");
                $(".vm_content object embed").attr("height", "575").attr("width", "600");
            },
            complete: function (XMLHttpRequest, status) {
                if (status == 'timeout') {
                    answer.abort();
                    if (confirm("传送学时超时，是否继续传送？")) {
                        this.answer();
                    }
                }
            }
        });
    }

    getDelayMs() {
        let min = U.dealySecond[0];
        let max = U.dealySecond[1];
        let ms = this.getRandom({range: [min, max]}) * 1000;
        this.millisecond = ms;
        return this.millisecond;
    }

    override() {
        let _this = this;
        window.playerstop = () => {
            if (rule == 1) {
                _this.getDelayMs();
                ajaxEditXxgj();

                setTimeout(function () {
                    _this.play();
                }, _this.millisecond);
            } else {
                if (clearZero == 0)
                    return;
                if (!ve) {
                    ajaxEditXxgj();
                    setTimeout(function () {
                        _this.play();
                    }, _this.millisecond);
                    return;
                }
                $(".vm_content").css("z-index", "-1");
                $(".vm_content").css("position", "absolute");
                $(".vm_content object").attr("height", "0").attr("width", "0");
                $(".vm_content object embed").attr("height", "0").attr("width", "0");
                $("#sptm").show();
                clearZero = 0;
                this.answer('A');
            }

            dqbh = dqbh + 1;
            if (dqbh >= flvurl.length) {
                dqbh = 0
            }
        };

        window.ajaxEditXxgj = () => {
            if (myRecordTimeId) {
                clearInterval(myRecordTimeId)
            }
            let realVideoTime = parseInt(CKobject.getObjectById('ckplayer_a1').getStatus()["totalTime"]);
            let myPlayTime = realVideoTime + this.millisecond / 1000;
            let TokenValue = $("input[name=__RequestVerificationToken]").val();
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
                success: function (result) {
                    if (result) {
                        if (result.msg == -1) {
                            alert("您今日已经学满4个学时，不再记录学时！")
                        } else if (result.msg == -2) {
                            alert("登录超时，可能原因：1、还没有激活学习卡 2、用户在其他地方登录 3、同一台电脑登录了多个账号。请重新登录！")
                        }
                    }
                }
            })
        };
    }
}

let obj = new YuejiaCheating();
obj.start();