!function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return e[r].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t){JPY=function(){var e={random:0,dealySecond:[3,5],startIndex:1,guide:0,endTs:["6750854","1339f3c"],debug:0};return e.debug&&(e.startIndex=273),{amount:$("[spid][colid]").length,millisecond:0,random:e.random,currentIndex:e.startIndex-1,outDateMsg:"脚本已过期！不能使用！",endTs:e.endTs,main:function(){this.wizard(),this.play()},play:function(){this.currentIndex>this.amount&&(this.currentIndex=0);var e=$("[spid][colid][class!=haveClick]"),t=$();if(e.length>0){var n=this.random?this.getRandom({range:[0,e.length-1]}):0;t=e.eq(n)}else{var n=this.random?this.getRandom({range:[0,this.amount-1]}):this.currentIndex++;t=$("[spid][colid][class=haveClick]").eq(n)}t.trigger("click")},getDelayMs:function(){var t=e.dealySecond[0],n=e.dealySecond[1],r=1e3*this.getRandom({range:[t,n]});return this.millisecond=r,this.millisecond},getRandom:function(e){var t=$.extend({range:[1,100]},e),n=t.range[0],r=t.range[1],a=Math.floor(1e3*Math.random())%(r-n+1)+n;return a},wizard:function(){if(e.guide){var t=prompt("延迟播放的时间范围，以秒为单位，以空格隔开，默认值为 3~20 秒","3 20");if(t=t?t.trim().split(" "):e.dealySecond,e.dealySecond=[t.shift(),t.pop()],0==$("[spid][colid][class!=haveClick]").length){var n=confirm("是否随机播放？");if(e.random=n,!n){var r=prompt("共"+JPY.amount+"个视频，要从第几个视频开始观看？（直接输入数字）");e.startIndex=r&&r>=1&&r<=JPY.amount?r:1}}this.refreshConfig()}},refreshConfig:function(){JPY.random=e.random,JPY.currentIndex=e.startIndex-1},hasOutOfDate:function(){if(this.validate()){var e=(new Date).getTime()>=this.endTimestamp;return e}return!0},validate:function(){var e=this.endTs[0];e=e.split("").reverse().join(""),e=Math.pow(10,12)+e*Math.pow(10,5);var t=this.endTs[1];t=parseInt(t,16).toString(),t=[t.substr(0,4),t.substr(4,2)-1,t.substr(6,2)];var n=e;return n==new Date(t[0],t[1],t[2]).getTime()&&(this.endTimestamp=n,!0)}}}(),JPY.main()}]);