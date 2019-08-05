$(function(){

    // 方法集合
    function Methods(){
        var ua = navigator.userAgent;
        this.isIos =  !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ;// ios
        this.isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1 ;// 安卓
        this.isWeixin =  /MicroMessenger/i.test(ua.toLowerCase());
    }
    

    var method = new Methods();

    ;(function(){
        try{
            $(".phone_number").html(setData.phone_number).attr("href","tel:" + setData.phone_number);
            $(".wechat_number").html(setData.wechat_number);
        }catch(err){
            console.log(err);
            window.location.reload();
        }
    }());

    
    $(".ios_click").on("click",function(){
        if( method.isWeixin ){
            // if( !method.isIos ){
                tips2();
            // }else{
            //     window.location.href = setData.ios;
            // }
        }else {
            if( !method.isIos ){
                tips1("请下载Android版");
            }else{
                window.location.href = setData.ios;
            }
        }
    })

    $(".android_click").on("click",function(){
        if(method.isIos){
            tips1("请下载ios版")
        }else {
            if(method.isWeixin){
                tips2();
            }else {
                window.location.href = setData.android;
            }
        }
    })

    $("body").on("click",".prompt",function(){
        $(this).remove();
    })

    var tipsTime = null;
    function tips1(txt){
        clearTimeout(tipsTime);
        $(".alert_all").remove();
        var html = '';
        html += '<div class="alert_all">';
        html += '<div class="alert_content">';
        html += '<div class="loading_content">' +txt+ '</div>';       
        html += '</div></div>';
        $("body").append(html);
        tipsTime = setTimeout(function(){
            $(".alert_all").remove()
        },1500)
    }

    function tips2(){
        var html = '<div class="prompt"><img src="static/img/yd/wechat_tips.png"></div>';
        $("body").append(html);
    }
})