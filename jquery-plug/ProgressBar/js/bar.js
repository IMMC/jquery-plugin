// JavaScript Document
$(function(){
	var isAction=true;
	var width=$('.TheBar').width();
	var thewidth=0;
	var CurrTime=0;//记录当前进度条表示时间
	var t;
	var addHour=0,addMinute=0,addSecond=0,TheHour=0,TheMinute=0,TheSecond=0;
	var flag=0;//标志位
	var alltime=7*1000;//总时间毫秒
	var addwidth;//每次增加的长度
	var offsetW=0;//偏移量
	var times=alltime/1000;
	var rwidth=width-4;
	var isclick=0;
	var lt=TransitionTime(alltime);
	$('.FinishTime').html(lt.StringTime);
	addwidth=(width-5)/times;
	OpenBar();//
	$('.contralButton').click(function(){
		if(isclick==0){
			isclick=1;
			StopBar();
			$(this).html("开始");
			}else{
				isclick=0;
				OpenBar();
				$(this).html("停止");
				}
		});//点击事件
	/*
	*****处理拖动事件********
	*/
	var down=false;
	var BarMove=false;//正在移动
	var lastX=0,NewX=0;//记录前后位置
	$(document).on("mousedown",'.TimeBall',function(event){
		lastX=event.clientX;
		event.preventDefault();
		down=true;
		BarMove=true;
		if(isAction){
			StopBar();//停止滑动
			}
		});//鼠标按下
	/*$(document).on("mousemove",".TimeBall",function(event){
		event.preventDefault();
		if(down){
			BarMove=true;
			lastX=event.clientX;
			}
		});//鼠标拖动
		*/
	$(document).mousemove(function(event){
		event.preventDefault();
		NewX=event.clientX;
		if(BarMove){
			//console.log(changeM);
			var mcs=NewX-lastX;
			lastX=NewX;
			//console.log(mcs+" "+lastX+" "+NewX);
			if(mcs<0){
				if(thewidth-(-mcs)>0){
					thewidth=thewidth-(-mcs);
					}
				}else{
					if(thewidth+mcs<rwidth){
						thewidth=thewidth+mcs;
						}else{
							thewidth=rwidth;
							}
					}
			//console.log(changeM+" "+mcs);
			timechange();
			$('.TheColorBar').css("width",thewidth+1);
			$('.TimeBall').css("left",thewidth);
			//down=false;
			}
		});
		//文档上鼠标拖动
	$(document).mouseup(function(){
		if(BarMove){
			BarMove=false;
			down=false;
			NewX=0;
			var xo=parseInt(CurrTime/1000);
			offsetW=thewidth-xo*addwidth;
			//console.log(thewidth+" "+rwidth+" "+addwidth+" "+offsetW);
			//console.log(thewidth+addwidth-offsetW+" "+parseInt(CurrTime/1000)*addwidth);
			if(isAction){
				OpenBar();//重新开始计时
				}
			}
		});
		//文档上鼠标抬起
	
	/*
	*****其他样式实现*******
	*/
	function timechange(){
		CurrTime=parseInt(thewidth/rwidth*alltime);
		var ltx=TransitionTime(CurrTime);
		if(TheHour>0){
			if(ltx.hHour){
				$('.BeginTime').html(ltx.StringTime);
				}else{
					$('.BeginTime').html("00:"+ltx.StringTime);
					}
			}else{
				$('.BeginTime').html(ltx.StringTime);
				}
		addSecond=ltx.Tsec;
		addMinute=ltx.Tmin;
		addHour=ltx.Thour;
		}
		//时间拖动时改变时间
	function changeBar(){
		var second,minute,hour;
		thewidth=thewidth*1+addwidth-offsetW;
		if(offsetW>0){
			offsetW=0;
			}
		if(thewidth<rwidth&&CurrTime<alltime){
			CurrTime=CurrTime+1*1000;//
			addSecond=addSecond+1;
			if(addSecond>59){
				addSecond=0;
				addMinute=addMinute+1;
				if(addMinute>59){
					addMinute=0;
					addHour=addHour+1;
					}
				}//时间累加判断
			if(addSecond>9){
				second=""+addSecond;
				}else{
					second="0"+addSecond;
					}
			if(addMinute>9){
				minute=""+addMinute;
				}else{
					minute="0"+addMinute;
					}
			if(addHour>9){
				hour=""+addHour;
				}else{
					hour="0"+addHour;
					}
			if(addHour>0){
				flag=1;
				}
			//
			if(flag==0){
				$('.BeginTime').html(minute+":"+second);
			}else{
				$('.BeginTime').html(hour+":"+minute+":"+second);
			}//
			}else{
				//console.log(thewidth+" "+rwidth);
				thewidth=rwidth;
				StopBar();
				}
		$('.TheColorBar').css("width",thewidth+1);
		$('.TimeBall').css("left",thewidth);
		}
		//改变进度条
	function TransitionTime(str){
		var m=parseFloat(str)/1000;
		var time="";
		var second,minute,hour;
		var haveHour=false;
		var ch=0,csx=0,cm=0;
		if(m>=60&&m<60*60){//分钟
			if(parseInt(m/60.0)<10){
				minute="0"+parseInt(m/60.0);
				}else{
					minute=parseInt(m/60.0);
					}
			var cs=parseInt(m-parseInt(m/60.0)*60);
			if(cs<10){
				second="0"+cs;
				}else{
					second=""+cs;
					}
			TheMinute=parseInt(m/60.0);
			TheSecond=cs;
			cm=TheMinute;
			TheHour=0;
			csx=cs;
			time=minute+":"+second;
			$('.BeginTime').html("00:00");
			}else if(m>=60*60){//到达小时
				flag=1;
				haveHour=true;
				ch=parseInt(m/3600.0);
				cm=parseInt((parseFloat(m /3600.0) -  parseInt(m/3600.0)) *60);
				csx=parseInt((parseFloat((parseFloat(m/3600.0) - parseInt(m/3600.0)) *60) - parseInt((parseFloat(m /3600.0) - parseInt(m/3600.0)) *60)) *60);
				if(ch<10){
					hour="0"+ch;
					}else{
						hour=""+ch;
						}
				if(cm<10){
					minute="0"+cm;
					}else{
						minute=""+cm;
						}
				if(csx<10){
					second="0"+csx;
					}else{
						second=""+csx;
						}
				TheHour=ch;
				TheMinute=cm;
				TheSecond=csx;
				time=hour+":"+minute+":"+second;
				$('.BeginTime').html("00:00:00");
				}else{//秒
					$('.BeginTime').html("00:00");
					csx=parseInt(m);
					if(parseInt(m)>9){
						second=""+parseInt(m);
						}else{
							second="0"+parseInt(m);
							}
					TheMinute=0;
					TheSecond=parseInt(m);
					TheHour=0;
					time="00:"+second;
					}//
		var tt={hHour:haveHour,Thour:ch,Tmin:cm,Tsec:csx,StringTime:time};
		return tt;
		//$('.FinishTime').html(time);
		}
		//毫秒转换成分钟小时格式
	function StopBar(){
		if(!down){
			isAction=false;
			}
		clearInterval(t);
		}
		//进度停止
	function OpenBar(){
		isAction=true;
		t=setInterval(changeBar,1000);
		}
		//进度条开始
	});