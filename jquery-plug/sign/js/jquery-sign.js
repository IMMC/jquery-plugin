// JavaScript Document
(function($){
	var cX,cY,indexId=0,removeId,Data=[],DOM,changeSignColor=false,signColor;
	var changeBodyColor=false,bodyColor,changeFontColor=false,fontColor;
	var Rleft,Rtop;//需要删除的坐标
	jQuery.sign={
		bindSign:function(dom){
			DOM=dom;
			defined(dom);
			},//初始化，绑定元素
		setSignColor:function(color){
			changeSignColor=true;
			signColor=color;
			},//设定标记框的颜色
		setBodyColor:function(color){
			changeBodyColor=true;
			bodyColor=color;
			},//设定提示框颜色
		setFontColor:function(color){
			changeFontColor=true;
			fontColor=color;
			},//设定字体颜色
		getSignMessage:function(){
			return Data;
			},//获得标记位置数据
		loadingSign:function(data){
			loading(data);
			Data.concat(data);
			}
		};
		/*
		********定义插件
		*/
	document.oncontextmenu = function(e){
         e.preventDefault();
         };//阻止鼠标右键默认事件
	function defined(dom){
		$(document).on("mousedown",dom,function(e){
		e.preventDefault();
		if(e.which==3){
			$('.chooseBox').remove();
			$(dom).append("<div class='chooseBox'><ul><li id='addsign'>添加标记</li></ul></div>");
			var l=e.clientX-$(dom).offset().left;
			var t=e.clientY-$(dom).offset().top;
			$('.chooseBox').css({"left":l,"top":t});
			cX=l;
			cY=t;
			}//鼠标右键
		});
		//注册鼠标右键点击事件
		$(document).on("click","#addsign",function(e){
			e.preventDefault();
			$(dom).append("<div class='inputSignBox'></div>");
			$('.inputSignBox').append("<div class='outSignbox'>X</div>");
			$('.inputSignBox').append("<div class='signbox' contenteditable='true' id='inputText' tabindex='-1'><em id='deflutText'>输入标记</em></div>");
			$('.inputSignBox').append("<div class='sureSign'>确定</div>");
			$('.inputSignBox').css({"left":cX,"top":cY});
		});
		//添加编辑
		$(document).on('click','#inputText',function(){
			$(this).focus();
			$('.signbox em').remove();
			});//编辑框聚焦
			$(document).on('click','.outSignbox',function(){
				$('.inputSignBox').remove();
			});//退出编辑
		$(document).on('click','.sureSign',function(){
			if($('.signbox em').length>0){
					$('.inputSignBox').remove();
				}else if($('.signbox').text().length<=0){
					$('.inputSignBox').remove();
					}else{
						var text=$('.signbox').text();
						$('.inputSignBox').remove();
						$(dom).append("<div class='signIndex' id='Ts"+indexId+"' theSign='"+text+"'></div>");
						$('#Ts'+indexId).css({"left":cX-15,"top":cY-15});
						if(changeSignColor){
							$('#Ts'+indexId).css("border",signColor+" 3px solid");
							}//改变了颜色
						indexId++;
						var mes={left:cX-15,top:cY-15,message:text};
						Data[Data.length]=mes;
						}
			});//确认编辑
		$(document).on('mousedown','[id*=Ts]',function(e){
			var m=$(this).attr('id').replace(/[^0-9]/ig, "");
			if(e.which==3){
				e.stopPropagation();
				removeId=m;
				$('.chooseBox').remove();
				Rleft=$(this).css("left").replace(/[^0-9]/ig, "");
				Rtop=$(this).css("top").replace(/[^0-9]/ig, "");
				var l=e.clientX-$(dom).offset().left,t=e.clientY-$(dom).offset().top;
				$(dom).append("<div class='chooseBox'><ul><li id='deleteSign'>删除标记</li></ul></div>");
				$('.chooseBox').css({"left":l,"top":t});
				}
			});//弹出取消标记
		$(document).on('click','#deleteSign',function(){
			deleteData(Rleft,Rtop);
			$('#Ts'+removeId).remove();
		});//删除标记
		$(document).on('mouseover','[id*=Ts]',function(){
			var l=$(this).offset().left,T=$(this).offset().top;
			$('.hintBox').remove();
			var t=$(this).attr("theSign");
			$('body').append("<div class='hintBox'>"+t+"</div>");
			var Hw=$('.hintBox').width(),Hh=$('.hintBox').height();
			if(Hh>35){
				$('.hintBox').css({"text-align":"left"});
			}
			$('.hintBox').append("<div class='triangle-down'></div>");
			$('.triangle-down').css({"left":Hw/2-10,"top":Hh});
			$('.hintBox').css({"left":l-Hw/2+20,"top":T-Hh-10});
			if(changeBodyColor){
				$('.hintBox').css("background",bodyColor);
				$('.triangle-down').css("border-top","10px solid "+bodyColor);
				}
			if(changeFontColor){
				$('.hintBox').css("color",fontColor);
				}
			});//显示提示
		$(document).on('mouseleave','[id*=Ts]',function(){
			 $('.hintBox').remove();
			});//
		$(document).click(function(){
			$('.chooseBox').remove();
			});
		//点击消失
		}
		/*
		********定义事件
		*/
	function deleteData(left,top){
		for(var i=0;i<Data.length;i++){
			if(Data[i].left==left&&Data[i].top==top){
				Data.splice(i,1);
				break;
				}else{
					continue;
					}
			}
		}//删除数据
	function loading(data){
		 var l=Data.length;
		 for(var i=0;i<data.length;i++){
			 $(DOM).append("<div class='signIndex' id='Ts"+l+"' theSign='"+data[i].message+"'></div>");
			 $('#Ts'+l).css({"left":data[i].left,"top":data[i].top});
			 if(changeSignColor){
				$('#Ts'+l).css("border",signColor+" 3px solid");
				}//改变了颜色
				l++;
			 }
		indexId=l;
		}//载入数据
	})(jQuery);