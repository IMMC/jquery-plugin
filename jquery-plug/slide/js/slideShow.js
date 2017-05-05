/**
 * Created by jinpei chen on 2017/4/17.
 */
(function ($) {
    var imageData=["images/image1.jpg","images/image2.jpg","images/image3.jpg","images/image4.jpg"];
    var imageWidth,
        offsetLength=0;//偏移长度
    var length=imageData.length,
        imagePosition=2,
        middlePosition=1,
        lastPosition=0;//用于记录后退
    if(imageData.length>3){
        length=4;
    }
    var loadLength=imageData.length>3?imageData.length:3;
    var loadLi=[];//需要载入的li
    var barButton=[];//底部导航条
    for(var i=0;i<loadLength;i++){
        loadLi.push('<li class="oneImageBox2" id="theImgBox'+i+'"></li>');
        barButton.push('<button data-cid="'+i+'"></button>');
    }
    //
    $(".slideImageBox ul").append(loadLi.join(""));
    $("#theImgBox"+middlePosition).removeClass("oneImageBox2").addClass("oneImageBox");
    //
    imageWidth=$("#theImgBox"+middlePosition).width();
    for(var i=0;i<length;i++){
        var id="#theImgBox"+i;
        $(id).append("<img src='"+imageData[i]+"' width='"+imageWidth+"' height='auto'>");
        //
    }
    //预加载图片
    for(var i=length;i<imageData.length;i++){
      loadimg(imageData[i],i);
    }
    //
    if(imageWidth>800){
        $(".slideImageBox").height(imageWidth*0.4);
    }else{
        $(".slideImageBox").height(imageWidth*0.5);
    }
    var mTop= "top:"+($(".slideImageBox").height()*0.5-25)+"px";
    $(".slideImageBox").append("<div class='NEXTBOX' style='"+mTop+"' id='nextIMG'><div class='right-next'></div> </div>");
    $(".slideImageBox").append("<div class='LASTBOX' style='"+mTop+"' id='lastIMG'><div class='left-last'></div> </div>");

    autoShow();
    //载入底部导航条
    var cleft=($(".slideImageBox").width()-30*loadLength-5*(loadLength+1))/2+"px";
    var cTop=$(".slideImageBox").height()-40+"px";
    var load='<div class="chooseBar" style="left: '+cleft+';top:'+cTop+';">'+barButton.join("")+'</div>';
    $('.slideImageBox').append(load);
    updateButton(middlePosition);
    /*
    * *****事件委托，点击下一张图片******
    * */
    $(document).on("click","#nextIMG",function () {
        //clearInterval(t);
        NEXT();
    });
    /*
    * ********上一张图片*******
    * */
    $(document).on("click","#lastIMG",function(){
        //clearInterval(t);
        LAST();
    })
    /*
    * *****底部导航条点击
    * */
    $(document).on("click",".chooseBar button",function () {
        var n=Number($(this).attr("data-cid"));
        updateButton(n);
        var cz=n-middlePosition;
        if(cz>0){
            for(var i=0;i<cz;i++){
                NEXT();
            }
        }else{
            for(var i=0;i<-cz;i++){
                LAST();
            }
        }
    });
    /*
    * *****预加载图片
    * */
    function loadimg(url,position){
        var img=new Image();
        img.onload=function(){
            img.onload=null;
            $("#theImgBox"+position).append("<img src='"+imageData[i]+"' width='"+imageWidth+"' height='auto'>");
        }
        img.src=url;
    }
    //图片自动播放
    var t;
    function autoShow() {
        t=setInterval(function () {
            NEXT();
        },6000);
    }
    /*
    * ****更新底部导航条
    * */
    function updateButton(position){
        $(".chooseBar button").css("background","rgba(255,255,255,.5)");
        $(".chooseBar button").eq(position).css("background","#3498DB");
    }
    /*
    * *******下一张图片
    * */
    function NEXT() {
        if(imagePosition<imageData.length-1){
            imagePosition++;
            lastPosition++;
            offsetLength=-imageWidth;
        }else{
            var d=$(".slideImageBox ul li:first-child").clone();
            d.removeAttr("style");
            $(".slideImageBox ul li:first-child").remove();
            $(".slideImageBox ul").append(d);
        }
        $(".slideImageBox ul li:first-child").css({"margin-left":offsetLength+"px"});
        $("#theImgBox"+middlePosition).removeClass("oneImageBox").addClass("oneImageBox2");
        ++middlePosition;
        middlePosition=middlePosition>imageData.length-1?0:middlePosition;//
        updateButton(middlePosition);
        $("#theImgBox"+middlePosition).removeClass("oneImageBox2").addClass("oneImageBox");
    }
    /*
    * ***上一张
    * */
    function LAST() {
        if(lastPosition>0){
            lastPosition--;
            imagePosition--;
            offsetLength+=imageWidth;
        }else{
            var d=$(".slideImageBox ul li:last-child").clone();
            d.css("margin-left",-imageWidth+"px");
            $(".slideImageBox ul li:last-child").remove();
            $(".slideImageBox ul li:first-child").removeAttr("style");
            $(".slideImageBox ul").prepend(d);//向前添加
        }
        //强制触发重绘
        setTimeout(function () {
            $(".slideImageBox ul li:first-child").css({"margin-left":offsetLength+"px"});
            $("#theImgBox"+middlePosition).removeClass("oneImageBox").addClass("oneImageBox2");
            --middlePosition;
            middlePosition=middlePosition>-1?middlePosition:imageData.length-1;//
            updateButton(middlePosition);
            $("#theImgBox"+middlePosition).removeClass("oneImageBox2").addClass("oneImageBox");
        });
        ///
    }
})(jQuery);
