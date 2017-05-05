// JavaScript Document
//by chen jin pei 
//15779356528@163.com
(function($){
	"use strict";
	var theData,vYear,vMon,vDay,yer,mer,day,firstDay,week,object;
	$.fn.chooseTime=function(options){
			$(this).click(function(e){e.stopPropagation();});
			var setting=$.extend({//设置默认值
					begintime:'1995-9-22',
					adminTime:'unknown'
				},options);//
			var d=new Date(setting.begintime);
			var dataStr;
			return this.each(function(){
					object=$(this);
					$('.chooseTimebox').remove();
				  	var off=$(this).offset();
					$('body').append("<div class='chooseTimebox'><div class='timeboxhead'><span class='lastmonth'>&lt;</span><span class='lastyear'>&lt;</span><div class='showtimebox'></div><span class='nextyear'>&gt;</span><span  class='nextmonth'>&gt;</span></div></div>");
					$('.chooseTimebox').append('<div class="timeweek"></div>');
					$('.timeweek').append('<ul><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li><li>日</li></ul>');
					$('.chooseTimebox').append('<div class="allday"><ul></ul></div>');
					$('.chooseTimebox').append('<div class="timectrl"></div>');
					$('.timectrl').append('<a href="javascript:" id="sureChooseTime">确定</a><a href="javascript:"id="chooseTimeCancel">取消</a>');
					//载入默认时间
					suredata();
					listyle(vDay);
					cantusetime(vYear,vMon);
					var tm=theData.getMonth()+1;
					$('.showtimebox').text(theData.getFullYear()+' , '+tm);
					var w=$(this).width();
					$('.chooseTimebox').css('left',off.left-100+w+ 'px').css('top',off.top +$(this).height()+2+ 'px').fadeIn(500);
					//显示时间选择框
					$(document).click(function(){
						$('.chooseTimebox').fadeOut(500,function(){$('.chooseTimebox').remove();});
						});
						/*文档任意位置点击收起*/
					$(document).off('click','.chooseTimebox');
					$(document).on('click','.chooseTimebox',function(e){
						e.stopPropagation();
						});
						/*组织事件冒泡*/
					$(document).off('click','#sureChooseTime');
					$(document).on('click','#sureChooseTime',function(e){
						e.stopPropagation();
						dataStr=yer+'-'+mer+'-'+day;
						object.text(dataStr);
						object.val(dataStr);
						$('.chooseTimebox').fadeOut(500,function(){$('.chooseTimebox').remove();});
						});
						/*确定时间*/
					$(document).off('click','#chooseTimeCancel');
					$(document).on('click','#chooseTimeCancel',function(){
						$('.chooseTimebox').fadeOut(500,function(){$('.chooseTimebox').remove();});
						});
						/*退出*/
					$(document).off('click','.nextmonth');
					$(document).on('click','.nextmonth',function(){
						//alert(mer);
						if(mer!==12){//
							mer=mer*1+1;
							$('.showtimebox').text(yer+' , '+mer);
							var first = new Date(yer,mer-1, 1);
							var we=first.getDay();
							loadtime(yer,mer,we);
							listyle(vDay);
							cantusetime(yer,mer);
							}else{
								mer=1;
								yer=yer*1+1;
								$('.showtimebox').text(yer+' , '+mer);
								var first = new Date(yer,mer-1, 1);
								var we=first.getDay();
								loadtime(yer,mer,we);
								listyle(vDay);
								cantusetime(yer,mer);
								}
						});
						/*下一个月*/
					$(document).off('click','.nextyear');
					$(document).on('click','.nextyear',function(){
						yer=yer+1;
						$('.showtimebox').text(yer+' , '+mer);
						var first = new Date(yer,mer-1, 1);
						var we=first.getDay();
						loadtime(yer,mer,we);
						listyle(vDay);
						cantusetime(yer,mer);
						});
						/*下一年*/
					$(document).off('click','.lastmonth');
					$(document).on('click','.lastmonth',function(){
						 if(yer>d.getFullYear()){
							 if(mer!==1){
								 mer=mer-1;
								 $('.showtimebox').text(yer+' , '+mer);
							 	 var first = new Date(yer,mer-1, 1);
						 	 	 var we=first.getDay();
						 	 	 loadtime(yer,mer,we);
							 	 listyle(vDay);
							 	 cantusetime(yer,mer);
								 }else{
									 mer=12;
									 yer=yer*1-1;
									 $('.showtimebox').text(yer+' , '+mer);
							 		 var first = new Date(yer,mer-1, 1);
						 	 	     var we=first.getDay();
						 	 		 loadtime(yer,mer,we);
							 		 listyle(vDay);
							 		 cantusetime(yer,mer);
									 }
							 }else if(yer===d.getFullYear()){
								 if(mer>d.getMonth()+1){//年份相同
									 mer=mer-1;
									 $('.showtimebox').text(yer+' , '+mer);
							 		 var first = new Date(yer,mer-1, 1);
						 	 		 var we=first.getDay();
						 	 		 loadtime(yer,mer,we);
							 		 listyle(vDay);
							 		 cantusetime(yer,mer);
									 }
								 }
						});
						/*上一个月*/
					$(document).on('click','.lastyear');
					$(document).on('click','.lastyear',function(){
						if(yer>d.getFullYear()+1){
							yer=yer-1;
							$('.showtimebox').text(yer+' , '+mer);
							var first = new Date(yer,mer-1, 1);
						 	var we=first.getDay();
						 	loadtime(yer,mer,we);
							listyle(vDay);
							cantusetime(yer,mer);
							}else if(yer===d.getFullYear()+1){
								yer=yer-1;
								if(mer<d.getMonth()+1){
									mer=d.getMonth()+1;
									}
								$('.showtimebox').text(yer+' , '+mer);
								var first = new Date(yer,mer-1, 1);
						 		var we=first.getDay();
						 		loadtime(yer,mer,we);
								listyle(vDay);
								cantusetime(yer,mer);
								}
						});
						/*上一年*/
					$(document).on('click','.allday li',function(){
						if(!$(this).hasClass('cantclick')){
							$('.allday li').removeClass('background');
							day=$(this).text();
							$(this).addClass('background');
						}
					});/*
						*****点击日期********
					*/	
				});	//主要实现
			function suredata(){
					if(setting.adminTime==='unknown'){
							theData= new Date();
						}else {
							theData= new Date(setting.adminTime);
							if(theData<d){
								theData= new Date();
								}//
							}
					vYear = theData.getFullYear();
					vMon = theData.getMonth() + 1;
					vDay = theData.getDate();
					yer=vYear;
					mer=vMon;
					day=vDay;
					firstDay = new Date(theData.getFullYear(), theData.getMonth(), 1);
					week=firstDay.getDay();
					loadtime(vYear,vMon,week);
				}
				//初始化时间参数
			function listyle(m){
				var k=$('.allday li').length;
				for(var i=0;i<k;i++){
					var text=$(".allday li:eq("+i+")").text();
					if(text==m){
						$(".allday li:eq("+i+")").addClass("background");
					}
				}
			}/*
			*******当前日期高亮*******
			*/
			function loadtime(y,m,w){
				$('.allday li').text('');
				if((y%4==0&&y%100!=0)||(y%400==0)){
					if(m==2){
						if(w!=0){
							loadli(35);
							for(var i=1;i<=29;i++){
								$('#'+w).text(i);
								w++;
							}
						}else{
							w=7;
							loadli(42);
							for(var i=1;i<=29;i++){
							$('#'+w).text(i);
							w++;
							}
						}/*确认一个月几天*/
					}else  if(m==4||m==6||m==9||m==11){
						if(w!=0){
							if(w==6){
								loadli(42);
								}else{loadli(35);}
						for(var i=1;i<=30;i++){
							$('#'+w).text(i);
							w++;
							}
						}else{
							loadli(42);
							w=7;
							for(var i=1;i<=30;i++){
								$('#'+w).text(i);
								w++;
								}
							}/*确认一个月几天*/
						}
						else {
							if(w!=0){
								if(w>5){
									loadli(42);
									}else{loadli(35);}
								for(var i=1;i<=31;i++){
									$('#'+w).text(i);
									w++;
									}
							}else{
								loadli(42);
								w=7;
								for(var i=1;i<=31;i++){
									$('#'+w).text(i);
									w++;
									}
								}/*确认一个月几天*/
							}
					}else{
					if(m==2){
					if(w!=0){
						loadli(35);
					for(var i=1;i<=28;i++){
						$('#'+w).text(i);
						w++;
						}
					}else{
						loadli(35);
						w=7;
						for(var i=1;i<=28;i++){
						$('#'+w).text(i);
						w++;
						}
						}/*确认一个月几天*/
				} else if(m==4||m==6||m==9||m==11){
					if(w!=0){
						if(w>=6){
								loadli(42);
								}else{
									loadli(35);
									}
					for(var i=1;i<=30;i++){
						$('#'+w).text(i);
						w++;
						}
					}else{
						w=7;
						loadli(42);
						for(var i=1;i<=30;i++){
						$('#'+w).text(i);
						w++;
						}
						}/*确认一个月几天*/
					}else{
						if(w!=0){
							if(w>=5){
								loadli(42);
								}else{loadli(35);}
					for(var i=1;i<=31;i++){
						$('#'+w).text(i);
						w++;
						}
					}else{
						w=7;
						loadli(42);
						for(var i=1;i<=31;i++){
						$('#'+w).text(i);
						w++;
						}
						}/*确认一个月几天*/
					}
				}
			}
				/*载入时间函数*/
		function loadli(m){
			$('.allday>ul').html('');
			for(var i=0;i<m;i++){
				$('.allday>ul').append('<li id="'+(i+1)+'"></li>');}
			}/*
			*******载入li个数*******
			*/
		function cantusetime(y,m){
			var thevMon =d.getMonth() + 1;
			var thevDay =d.getDate();
			var theYear=d.getFullYear();
			if(y==theYear&&m==thevMon){
				var k=$('.allday li').length;
				for(var i=0;i<k;i++){
					var text=$(".allday li:eq("+i+")").text();
					if(text<thevDay){
						$(".allday li:eq("+i+")").addClass("cantclick");
					}
				}/*for循环结束*/
			}
			else{
				var k=$('.allday li').length;
				for(var i=0;i<k;i++){
				var text=$(".allday li:eq("+i+")").text();
				if(text==''||text==null){
				$(".allday li:eq("+i+")").addClass("cantclick");
					}
				}/*for循环结束*/
				}
			}/*
			*******不可用时间加灰色背景******
			*/
		};
		/*
		******************************插件总体
		*/
	}
)(jQuery);