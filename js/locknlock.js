jQuery(window).load(function(){
	//본문 바로가기
	jQuery(".shortCut").css("top","-100px");
	jQuery(".shortCut").focusin(function(){
		jQuery(this).css("top", "0");
	}).focusout(function(){
		jQuery(this).css("top","-100px");
	});

	// gnb
	jQuery("header").mouseenter(function(){
		jQuery(this).addClass("on");
		jQuery("nav").addClass("hover");
		jQuery("#header").css({
			background : "#fff",
			overflow : "visible"
		});
		jQuery(".langBt, .hSrchBt, .hBar").addClass("on")
		jQuery("#header h1 a").addClass("on")
	})
	jQuery("header").mouseleave(function(){
		jQuery(this).removeClass("on");
		jQuery("nav").removeClass("hover");
		jQuery(".langBt, .hBar").removeClass("on")
		jQuery("#header").css("background", "url('/common/ko_kr/images/icon/h_offBg.png') repeat");
		jQuery("#header h1 a").removeClass("on")

		if ( $(".hSrchBt").hasClass("click") ) {
			jQuery(".hSrchBt").addClass("on");
		}else{
			jQuery(".hSrchBt").removeClass("on");
		}
	})

	jQuery("nav li").mouseenter(function(){
		jQuery(".langBt, .hSrchBt, .hBar").addClass("on");
		jQuery(this).find('> a').addClass("hover");
		jQuery("nav").addClass("on");
		jQuery("#header").css({
			background : "#fff",
			overflow : "visible"
		});
		jQuery("#header").stop().animate({height:397}, 300, "easeOutCubic");
		jQuery("#header .header").stop().animate({height:397}, 300, "easeOutCubic");
		jQuery("#header h1 a").addClass("on")
	})
	jQuery("nav li").focusin(function(){
		jQuery(this).mouseenter();
	})

	jQuery("nav li").mouseleave(function(){
		if ( jQuery("header").hasClass("on") ) {
			jQuery(this).find('> a').removeClass("hover");
			jQuery("nav").removeClass("on");
			jQuery("#header").css({
				background : "#fff",
				overflow : "visible"
			});
			jQuery("#header").stop().animate({height:130}, 200, "easeOutCubic");
			jQuery("#header .header").stop().animate({height:130}, 200, "easeOutCubic");
			jQuery("#header h1 a").addClass("on")
		} else {
			jQuery(".langBt, .hSrchBt, .hBar").removeClass("on");
			jQuery(this).find('> a').removeClass("hover");
			jQuery("nav").removeClass("on");
			jQuery("#header").css("background", "url('/common/ko_kr/images/icon/h_offBg.png') repeat");
			jQuery("#header").stop().animate({height:130}, 200, "easeOutCubic");
			jQuery("#header .header").stop().animate({height:130}, 200, "easeOutCubic");
			jQuery("#header h1 a").removeClass("on")
		}
	}).focusout(function(){
		jQuery(this).mouseleave();
	})

	jQuery("nav .twoD a").mouseenter(function(){
		jQuery(this).addClass("on");
	})
	jQuery("nav .twoD a").focusin(function(){
		jQuery(this).mouseenter();
	})

	jQuery("nav .twoD a").mouseleave(function(){
		jQuery(this).removeClass("on");
	})
	jQuery("nav .twoD a").focusout(function(){
		jQuery(this).mouseleave();
	})

	// 키워드 검색
	$(".hSrchBt").click(function(){
		$(this).css({
			position: 'absolute',
			zIndex: 1
		})
		$(this).animate({right:45}, 100, "easeOutCubic")
		$(this).addClass("click");
		$(".hSrchIp").css("display","block")
		$(".hSrchClose").css("display","block")
		$(".hSrchIp").animate({width:386}, 100, "easeOutCubic", function(){
			$(".hSrchClose").animate({opacity:1},100)
		})
	})
	$(".hSrchClose").click(function(){
		$(".hSrchBt").animate({right:4}, 100, "easeOutCubic")
		$(".hSrchIp").animate({width:0}, 50, "easeOutCubic", function(){
			$(".hSrchIp").css("display","none")
		})
		$(".hSrchClose").animate({opacity:0},50, function(){
			$(".hSrchClose").css("display","none")
		});
		$(".hSrchBt").removeClass("click");
		$("#header .utillW .utillA .utill .hSrchIp input").val("");
	})

	// 언어선택
	var langNum = 0;
	$(".langBt").click(function(){
		if ( langNum == 0 ) {
			$(this).addClass("clk")
			$(this).removeClass("on")
			$(".langA").css("display","block")
			$(".whiteBg").css("height", "100%")
			$(".whiteBg").fadeIn(300);
			$("#header").css("zIndex",1000)
			langNum = 1
		} else {
			$(this).removeClass("clk")
			$(this).addClass("on")
			$(".langA").css("display","none")
			$(".whiteBg").fadeOut(0);
			$("#header").css("zIndex",2)
			langNum = 0
		}
	})
	$(".langA a").click(function(){
		$(".langBt").removeClass("clk")
		$(".langBt").addClass("on")
		$(".langA").css("display","none")
		$(".whiteBg").fadeOut(0);
		$("#header").css("zIndex",4)
		langNum = 0
	})
	$(".whiteBg").click(function(){
		$(".langBt").removeClass("on")
		$(".langBt").removeClass("clk")
		$(".langA").css("display","none")
		$(".whiteBg").fadeOut(0);
		$("#header").css("zIndex",4)
		langNum = 0
	})

	// lnb 관련
	jQuery("#lnbA ul li").each(function(){
		if ( $(this).find(".depth3A").size() > 0 ) {
			$(this).addClass('dthYtp');
		}
	})
	jQuery("#lnbA ul li").mouseenter(function(){
		if ( $(this).find(".depth3A").size() > 0 ) {
			$(this).addClass('dthYon');
			$(this).stop().animate({height:(jQuery(this).find(".depth3A").find("a").size() * 30) + 85}, 400, "easeOutCubic");
		} else {
			$(this).addClass('dthNon');
		}
	})
	jQuery("#lnbA ul li").mouseleave(function(){
		if ( $(this).find(".depth3A").size() > 0) {
			$(this).removeClass('dthYon');
			$(this).stop().animate({height:50}, 400, "easeOutCubic");
		} else {
			$(this).removeClass('dthNon');
		}
	})
	jQuery("#lnbA ul li").focusin(function(){
		if ( $(this).find(".depth3A").size() > 0 ) {
			$(this).addClass('dthYon');
			$(this).stop().animate({height:(jQuery(this).find(".depth3A").find("a").size() * 30) + 79}, 0, "easeOutCubic");
		} else {
			$(this).addClass('dthNon');
		}
	})
	jQuery("#lnbA ul li").focusout(function(){
		if ( $(this).find(".depth3A").size() > 0) {
			$(this).removeClass('dthYon');
			$(this).stop().animate({height:50}, 0, "easeOutCubic");
		} else {
			$(this).removeClass('dthNon');
		}
	})

	// SNS 공유 관련
	jQuery(".pShareD .bt").mouseenter(function(){
		jQuery(".pShareA").css("right", 0);
	})
	jQuery(".pShareA").mouseleave(function(){
		jQuery(".pShareA").css("right", -300);
	})

	jQuery(".pShareD .pShareA a").focusin(function(){
		jQuery(".pShareA").css("right", 0);	
	});
	jQuery(".pShareD .pShareA a").focusout(function(){
		jQuery(".pShareA").css("right", -300);
	});

	// 패밀리 사이트 관련
	var famClick = false;
	$(".famBt").click(function(){
		if(!famClick){ //false 일때 
			famClick = true;
			$(".famBt a").addClass("on");
			$(".famListA").stop().animate({height:185}, 200);
			$(".famListA").css('display','block')

			$(".whiteBg").height(jQuery(document).height());
			$(".whiteBg").fadeIn(300);
			$("#footer .familyD").css('z-index', 1000)
		}else{
			famClick = false;
			$(".famBt a").removeClass("on");
			$(".famListA").stop().animate({height:0}, 200, function(){
				$(".famListA").css('display','none')
			});

			$(".whiteBg").fadeOut(300);
			$("#footer .familyD").css('z-index', 1000)
		}
	})

	$(".famListA a").click(function(){
		famClick = false;
		$(".famBt a").removeClass("on");
		$(".famListA").stop().animate({height:0}, 200, function(){
			$(".famListA").css('display','none')
		});
		$(".whiteBg").fadeOut(300);
	})

	$(".whiteBg").click(function(){
		famClick = false;
		$(".famBt a").removeClass("on");
		$(".famListA").stop().animate({height:0}, 200, function(){
			$(".famListA").css('display','none')
		});
		$(".whiteBg").fadeOut(300);
	})

	// 체크박스 관련
	var curCheck = -1;

	$(".chkTp").each(function(q){
		$(this).find("label").click(function(){
			if(curCheck != q){
				curCheck = q;
				if(jQuery(".chkTp label").eq(curCheck).hasClass("selected")){
					jQuery(".chkTp label").eq(curCheck).removeClass("selected");
					curCheck = -1;
				}else{
					jQuery(".chkTp label").eq(curCheck).addClass("selected");
				}
			}else if(curCheck == q){
				jQuery(".chkTp label").eq(curCheck).removeClass("selected");
				curCheck = -1;
			}
		});
	})

	// 팝업공통
	jQuery(".popClose").click(function(){
		jQuery(".layerPop").css("display", "none");
		jQuery(".blackBg").fadeOut(300);
	});

	jQuery(".blackBg").click(function(){
		jQuery(".layerPop").css("display", "none");
		jQuery(this).fadeOut(300);
	});

	// 탭 버튼 on됐을시 상단보더
	$(".tabBtList2 li").each(function(){
		if ( $(this).find("a").hasClass("on") ) {
			$(this).css("borderTop","3px solid #0168b7")
		}
	})

	//bg이미지 설정
	$(".bgA").each(function(q){
		if($(".bgA").eq(q).parent().find(".imgA").find("img").size() > 0){
			$(".bgA").eq(q).find("img").css("visibility","hidden");
		}else{
			$(".bgA").eq(q).find("img").css("visibility","visible");
		}
	})

	// 헤더 비주얼 스크롤 효과
	jQuery(window).scroll(function(){
		if(jQuery(window).scrollTop() >= 204) {
			jQuery("#header.sub").css({
				position: "absolute",
				top: 204
			})
		} else if(jQuery(window).scrollTop() < 204) {
			jQuery("#header.sub").css({
				position: "fixed",
				top: 0
			})
		}
		if(jQuery(window).scrollTop() >= 334) {
			jQuery(".fWrap").css({
				position: "fixed",
				top: 0
			})
			jQuery(".lnbLogo").css({
				display: "block"
			})
			jQuery(".lnbLogo").stop().animate({left:40}, 200, "easeOutCubic");
			jQuery(".fWrap").addClass('on');

			// 언어선택 영역 삭제
			$(".langBt").removeClass("on")
			$(".langBt").removeClass("clk")
			$(".langA").css("display","none")
			$(".whiteBg").fadeOut(0);
			$("#header").css("zIndex",4)
			langNum = 0

			// 키워드 검색 삭제
			$(".hSrchBt").css("right", 4);
			$(".hSrchIp").css({
				display: 'none',
				width : 0
			});
			$(".hSrchClose").css({
				display: 'none',
				opacity : 0
			});
			$(".hSrchBt").removeClass("on");
			$(".hSrchBt").removeClass("click");
			$("#header .utillW .utillA .utill .hSrchIp input").val("");
		} else if(jQuery(window).scrollTop() < 334) {
			jQuery(".fWrap").css({
				position: "relative"
			})
			jQuery(".lnbLogo").stop().animate({left:-120}, 200, "easeOutCubic", function(){
				jQuery(".lnbLogo").css("display","none");
			});
			jQuery(".fWrap").removeClass('on');
		}
	})


	jQuery(window).scroll(function(){
		if(jQuery(window).scrollTop() >= 100) { // 스크롤 내렸을 때
			  $( ".scrollTop" ).css("display","block");
			  $( ".scrollTop" ).animate({opacity: 1}, 500);
		} else if(jQuery(window).scrollTop() == 0) { // 스크롤 최상단 도달했을 때
				$( ".scrollTop" ).css("display","none");
		}
	})
	jQuery(window).scroll(function(){
		var bodyH = $("body").height() - 1200;
		if(jQuery(window).scrollTop() >= bodyH) { // 스크롤 내렸을 때
			jQuery(".scrollTop").css({
				position: "absolute"
			})
		} else if(jQuery(window).scrollTop() < bodyH) { // 스크롤 최상단 도달했을 때
			jQuery(".scrollTop").css({
				position: "fixed"
			})
		}
	})
})

$(function(){
	// LNB 중앙에 위치
	jQuery("#lnbA ul").css("left", ($("#lnbA .wrap").width()/2)-(jQuery("#lnbA ul").find("li").size() * 170/2));

	// Top 버튼 스크롤 탑 
	$( '.scrollTop' ).click(function() {
		$("html, body").stop(true,true).animate({scrollTop:0},500);
	});

	$(window).scroll(function(){
		$("#subVisual .stceA").css({
			opacity: (0.4-1) / (100-30)*($(window).scrollTop()-30)+1,
			paddingTop: (244-209) / (100-30)*($(window).scrollTop()-30)+209
		});

		$("#subVisual .stceA .sCopy").css({
			marginTop: (6-14) / (100-30)*($(window).scrollTop()-30)+14
		});
	});
})
jQuery(window).resize(function(){
	jQuery("#lnbA ul").css("left", ($("#lnbA .wrap").width()/2)-(jQuery("#lnbA ul").find("li").size() * 170/2));
})