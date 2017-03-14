var curLnb = false;

//비주얼
var isMove = false;
var rollNum = 0;
var rollMax;
var rollInterval;
var rollTime = 8000;

var banMax, banMove=false, banNum =0, banStop = false;
var banInterval, banDuration = 8000; 


var wHeight = $(window).height()

$(function(){
	jQuery(".mainVisual").height(wHeight)

	$('.scrollBt').click(function(){
		TweenMax.to($("html, body"), 1.2, {scrollTop:wHeight, ease:Power3.easeOut});
	});
})

jQuery(window).resize(function(){
	var wHeight = $(window).height()

	jQuery(".mainVisual").css("height", $(window).height());
	$('.scrollBt').click(function(){
		TweenMax.to($("html, body"), 1.2, {scrollTop:wHeight, ease:Power3.easeOut});
	});
})

$(function(){
	// VIEWPORT 관련 2017-01-29 추가
	if ( jQuery(window).width() == 1701 || jQuery(window).width() == 1276 ) {
		$("html, body").css({
			overflowX: "hidden"
		})
	}
	jQuery(window).resize(function(){
		if ( jQuery(window).width() > 1701 ) {
			$("html, body").css({
				overflowX: "visible"
			})
		} else if ( jQuery(window).width() < 1701 && jQuery(window).width() > 1276 ) {
			$("html, body").css({
				overflowX: "visible"
			})
		} else if ( jQuery(window).width() < 1276 ) {
			$("html, body").css({
				overflowX: "visible"
			})
		}
	})

	rollMax = jQuery(".mVisual .rollU").size()-1;
	rInterval = setInterval("rVisual()", rollTime);

	if($(".mVisual .rollU.one .obj .tit").height() >= 140){
		jQuery(".mVisual .rollU.one .obj .tit").animate({opacity : 0, top : 250}, 0);
		jQuery(".mVisual .rollU.one .obj .txt").animate({opacity : 0, top : 446}, 0);
		jQuery(".mVisual .rollU.one .obj .btn").animate({opacity : 0, top : 555}, 0);
	}else{
		jQuery(".mVisual .rollU.one .obj .tit").animate({opacity : 0, top : 250}, 0);
		jQuery(".mVisual .rollU.one .obj .txt").animate({opacity : 0, top : 365}, 0);
		jQuery(".mVisual .rollU.one .obj .btn").animate({opacity : 0, top : 474}, 0);
	}

	isMove = true;

	if($(".mVisual .rollU.one .obj .tit").height() >= 140){
		jQuery(".mVisual .rollU.one .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
		jQuery(".mVisual .rollU.one .obj .txt").stop().delay(350).animate({opacity : 1, top : 406}, 550, "easeOutCubic");
		jQuery(".mVisual .rollU.one .obj .btn").stop().delay(550).animate({opacity : 1, top : 505}, 550, "easeOutCubic", function(){
			isMove = false;
		});
	}else{
		jQuery(".mVisual .rollU.one .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
		jQuery(".mVisual .rollU.one .obj .txt").stop().delay(350).animate({opacity : 1, top : 325}, 550, "easeOutCubic");
		jQuery(".mVisual .rollU.one .obj .btn").stop().delay(550).animate({opacity : 1, top : 424}, 550, "easeOutCubic", function(){
			isMove = false;
		});
	}


	//메인비주얼
	jQuery(".mVisual .contBt").each(function(q){
		jQuery(this).click(function(){
			if(q == 1){
				jQuery(".mVisual .numBt .contBt2").eq(rollNum).find("img").attr("src", jQuery(".mVisual .numBt .contBt2").eq(rollNum).find("img").attr("src").replace("_on.png", ".png"));
				jQuery(".mVisual .rollU").eq(rollNum).stop().animate({left : '-100%'}, 600, "easeOutCubic");
				if($(".mVisual .rollU.one .obj .tit").height() >= 140){
					jQuery(".mVisual .rollU.one .obj .tit").animate({opacity : 0, top : 250}, 0);
					jQuery(".mVisual .rollU.one .obj .txt").animate({opacity : 0, top : 446}, 0);
					jQuery(".mVisual .rollU.one .obj .btn").animate({opacity : 0, top : 555}, 0);
				}else{
					jQuery(".mVisual .rollU.one .obj .tit").animate({opacity : 0, top : 250}, 0);
					jQuery(".mVisual .rollU.one .obj .txt").animate({opacity : 0, top : 365}, 0);
					jQuery(".mVisual .rollU.one .obj .btn").animate({opacity : 0, top : 474}, 0);
				}
				if($(".mVisual .rollU.two .obj .tit").height() >= 140){
					jQuery(".mVisual .rollU.two .obj .tit").animate({opacity : 0, top : 250}, 0);
					jQuery(".mVisual .rollU.two .obj .txt").animate({opacity : 0, top : 446}, 0);
					jQuery(".mVisual .rollU.two .obj .btn").animate({opacity : 0, top : 555}, 0);
				}else{
					jQuery(".mVisual .rollU.two .obj .tit").animate({opacity : 0, top : 250}, 0);
					jQuery(".mVisual .rollU.two .obj .txt").animate({opacity : 0, top : 365}, 0);
					jQuery(".mVisual .rollU.two .obj .btn").animate({opacity : 0, top : 474}, 0);
				}
				if($(".mVisual .rollU.thr .obj .tit").height() >= 140){
					jQuery(".mVisual .rollU.thr .obj .tit").animate({opacity : 0, top : 250}, 0);
					jQuery(".mVisual .rollU.thr .obj .txt").animate({opacity : 0, top : 446}, 0);
					jQuery(".mVisual .rollU.thr .obj .btn").animate({opacity : 0, top : 555}, 0);
				}else{
					jQuery(".mVisual .rollU.thr .obj .tit").animate({opacity : 0, top : 250}, 0);
					jQuery(".mVisual .rollU.thr .obj .txt").animate({opacity : 0, top : 365}, 0);
					jQuery(".mVisual .rollU.thr .obj .btn").animate({opacity : 0, top : 474}, 0);
				}

				rollNum ++;
				if(rollNum > rollMax) rollNum = 0;
				jQuery(".mVisual .numBt .contBt2").eq(rollNum).find("img").attr("src", jQuery(".mVisual .numBt .contBt2").eq(rollNum).find("img").attr("src").replace(".png", "_on.png"));
				jQuery(".mVisual .rollU").eq(rollNum).stop().animate({left : '100%'}, 0, "easeOutCubic");
				jQuery(".mVisual .rollU").eq(rollNum).stop().animate({left : 0}, 600, "easeOutCubic", function(){
					if($(".mVisual .rollU.one .obj .tit").height() >= 140){
						jQuery(".mVisual .rollU.one .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.one .obj .txt").stop().delay(350).animate({opacity : 1, top : 406}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.one .obj .btn").stop().delay(550).animate({opacity : 1, top : 505}, 550, "easeOutCubic", function(){
							isMove = false;
						});
					}else{
						jQuery(".mVisual .rollU.one .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.one .obj .txt").stop().delay(350).animate({opacity : 1, top : 325}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.one .obj .btn").stop().delay(550).animate({opacity : 1, top : 424}, 550, "easeOutCubic", function(){
							isMove = false;
						});
					}
					if($(".mVisual .rollU.two .obj .tit").height() >= 140){
						jQuery(".mVisual .rollU.two .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.two .obj .txt").stop().delay(350).animate({opacity : 1, top : 406}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.two .obj .btn").stop().delay(550).animate({opacity : 1, top : 505}, 550, "easeOutCubic", function(){
							isMove = false;
						});
					}else{
						jQuery(".mVisual .rollU.two .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.two .obj .txt").stop().delay(350).animate({opacity : 1, top : 325}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.two .obj .btn").stop().delay(550).animate({opacity : 1, top : 424}, 550, "easeOutCubic", function(){
							isMove = false;
						});
					}
					if($(".mVisual .rollU.thr .obj .tit").height() >= 140){
						jQuery(".mVisual .rollU.thr .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.thr .obj .txt").stop().delay(350).animate({opacity : 1, top : 406}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.thr .obj .btn").stop().delay(550).animate({opacity : 1, top : 505}, 550, "easeOutCubic", function(){
							isMove = false;
						});
					}else{
						jQuery(".mVisual .rollU.thr .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.thr .obj .txt").stop().delay(350).animate({opacity : 1, top : 325}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.thr .obj .btn").stop().delay(550).animate({opacity : 1, top : 424}, 550, "easeOutCubic", function(){
							isMove = false;
						});
					}
				});
			}else if(q == 0){
				jQuery(".mVisual .numBt .contBt2").eq(rollNum).find("img").attr("src", jQuery(".mVisual .numBt .contBt2").eq(rollNum).find("img").attr("src").replace("_on.png", ".png"));
				jQuery(".mVisual .rollU").eq(rollNum).stop().animate({left : '100%'}, 600, "easeOutCubic");
				if($(".mVisual .rollU.one .obj .tit").height() >= 140){
					jQuery(".mVisual .rollU.one .obj .tit").animate({opacity : 0, top : 250}, 0);
					jQuery(".mVisual .rollU.one .obj .txt").animate({opacity : 0, top : 446}, 0);
					jQuery(".mVisual .rollU.one .obj .btn").animate({opacity : 0, top : 555}, 0);
				}else{
					jQuery(".mVisual .rollU.one .obj .tit").animate({opacity : 0, top : 250}, 0);
					jQuery(".mVisual .rollU.one .obj .txt").animate({opacity : 0, top : 365}, 0);
					jQuery(".mVisual .rollU.one .obj .btn").animate({opacity : 0, top : 474}, 0);
				}
				if($(".mVisual .rollU.two .obj .tit").height() >= 140){
					jQuery(".mVisual .rollU.two .obj .tit").animate({opacity : 0, top : 250}, 0);
					jQuery(".mVisual .rollU.two .obj .txt").animate({opacity : 0, top : 446}, 0);
					jQuery(".mVisual .rollU.two .obj .btn").animate({opacity : 0, top : 555}, 0);
				}else{
					jQuery(".mVisual .rollU.two .obj .tit").animate({opacity : 0, top : 250}, 0);
					jQuery(".mVisual .rollU.two .obj .txt").animate({opacity : 0, top : 365}, 0);
					jQuery(".mVisual .rollU.two .obj .btn").animate({opacity : 0, top : 474}, 0);
				}
				if($(".mVisual .rollU.thr .obj .tit").height() >= 140){
					jQuery(".mVisual .rollU.thr .obj .tit").animate({opacity : 0, top : 250}, 0);
					jQuery(".mVisual .rollU.thr .obj .txt").animate({opacity : 0, top : 446}, 0);
					jQuery(".mVisual .rollU.thr .obj .btn").animate({opacity : 0, top : 555}, 0);
				}else{
					jQuery(".mVisual .rollU.thr .obj .tit").animate({opacity : 0, top : 250}, 0);
					jQuery(".mVisual .rollU.thr .obj .txt").animate({opacity : 0, top : 365}, 0);
					jQuery(".mVisual .rollU.thr .obj .btn").animate({opacity : 0, top : 474}, 0);
				}

				rollNum --;
				if(rollNum < 0) rollNum = rollMax;
				jQuery(".mVisual .numBt .contBt2").eq(rollNum).find("img").attr("src", jQuery(".mVisual .numBt .contBt2").eq(rollNum).find("img").attr("src").replace(".png", "_on.png"));
				jQuery(".mVisual .rollU").eq(rollNum).stop().animate({left : '-100%'}, 0, "easeOutCubic");

				jQuery(".mVisual .rollU").eq(rollNum).stop().animate({left : 0}, 600, "easeOutCubic", function(){
					if($(".mVisual .rollU.one .obj .tit").height() >= 140){
						jQuery(".mVisual .rollU.one .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.one .obj .txt").stop().delay(350).animate({opacity : 1, top : 406}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.one .obj .btn").stop().delay(550).animate({opacity : 1, top : 505}, 550, "easeOutCubic", function(){
							isMove = false;
						});
					}else{
						jQuery(".mVisual .rollU.one .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.one .obj .txt").stop().delay(350).animate({opacity : 1, top : 325}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.one .obj .btn").stop().delay(550).animate({opacity : 1, top : 424}, 550, "easeOutCubic", function(){
							isMove = false;
						});
					}
					if($(".mVisual .rollU.two .obj .tit").height() >= 140){
						jQuery(".mVisual .rollU.two .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.two .obj .txt").stop().delay(350).animate({opacity : 1, top : 406}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.two .obj .btn").stop().delay(550).animate({opacity : 1, top : 505}, 550, "easeOutCubic", function(){
							isMove = false;
						});
					}else{
						jQuery(".mVisual .rollU.two .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.two .obj .txt").stop().delay(350).animate({opacity : 1, top : 325}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.two .obj .btn").stop().delay(550).animate({opacity : 1, top : 424}, 550, "easeOutCubic", function(){
							isMove = false;
						});
					}
					if($(".mVisual .rollU.thr .obj .tit").height() >= 140){
						jQuery(".mVisual .rollU.thr .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.thr .obj .txt").stop().delay(350).animate({opacity : 1, top : 406}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.thr .obj .btn").stop().delay(550).animate({opacity : 1, top : 505}, 550, "easeOutCubic", function(){
							isMove = false;
						});
					}else{
						jQuery(".mVisual .rollU.thr .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.thr .obj .txt").stop().delay(350).animate({opacity : 1, top : 325}, 550, "easeOutCubic");
						jQuery(".mVisual .rollU.thr .obj .btn").stop().delay(550).animate({opacity : 1, top : 424}, 550, "easeOutCubic", function(){
							isMove = false;
						});
					}
				});
			}
		})
	});

	$(".numBt .contBt2").each(function(index){
		$(this).click(function(){
			if(index != rollNum) {
				if(!index) {
					jQuery(".mVisual .numBt .contBt2").eq(rollNum).find("img").attr("src", jQuery(".mVisual .numBt .contBt2").eq(rollNum).find("img").attr("src").replace("_on.png", ".png"));
					jQuery(".mVisual .rollU").eq(rollNum).stop().animate({left : '100%'}, 600, "easeOutCubic");
					if($(".mVisual .rollU.one .obj .tit").height() >= 140){
						jQuery(".mVisual .rollU.one .obj .tit").animate({opacity : 0, top : 250}, 0);
						jQuery(".mVisual .rollU.one .obj .txt").animate({opacity : 0, top : 446}, 0);
						jQuery(".mVisual .rollU.one .obj .btn").animate({opacity : 0, top : 555}, 0);
					}else{
						jQuery(".mVisual .rollU.one .obj .tit").animate({opacity : 0, top : 250}, 0);
						jQuery(".mVisual .rollU.one .obj .txt").animate({opacity : 0, top : 365}, 0);
						jQuery(".mVisual .rollU.one .obj .btn").animate({opacity : 0, top : 474}, 0);
					}
					if($(".mVisual .rollU.two .obj .tit").height() >= 140){
						jQuery(".mVisual .rollU.two .obj .tit").animate({opacity : 0, top : 250}, 0);
						jQuery(".mVisual .rollU.two .obj .txt").animate({opacity : 0, top : 446}, 0);
						jQuery(".mVisual .rollU.two .obj .btn").animate({opacity : 0, top : 555}, 0);
					}else{
						jQuery(".mVisual .rollU.two .obj .tit").animate({opacity : 0, top : 250}, 0);
						jQuery(".mVisual .rollU.two .obj .txt").animate({opacity : 0, top : 365}, 0);
						jQuery(".mVisual .rollU.two .obj .btn").animate({opacity : 0, top : 474}, 0);
					}
					if($(".mVisual .rollU.thr .obj .tit").height() >= 140){
						jQuery(".mVisual .rollU.thr .obj .tit").animate({opacity : 0, top : 250}, 0);
						jQuery(".mVisual .rollU.thr .obj .txt").animate({opacity : 0, top : 446}, 0);
						jQuery(".mVisual .rollU.thr .obj .btn").animate({opacity : 0, top : 555}, 0);
					}else{
						jQuery(".mVisual .rollU.thr .obj .tit").animate({opacity : 0, top : 250}, 0);
						jQuery(".mVisual .rollU.thr .obj .txt").animate({opacity : 0, top : 365}, 0);
						jQuery(".mVisual .rollU.thr .obj .btn").animate({opacity : 0, top : 474}, 0);
					}

					rollNum = index;

					jQuery(".mVisual .numBt .contBt2").eq(rollNum).find("img").attr("src", jQuery(".mVisual .numBt .contBt2").eq(rollNum).find("img").attr("src").replace(".png", "_on.png"));
					jQuery(".mVisual .rollU").eq(rollNum).stop().animate({left : '-100%'}, 0, "easeOutCubic");

					jQuery(".mVisual .rollU").eq(rollNum).stop().animate({left : 0}, 600, "easeOutCubic", function(){
						if($(".mVisual .rollU.one .obj .tit").height() >= 140){
							jQuery(".mVisual .rollU.one .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.one .obj .txt").stop().delay(350).animate({opacity : 1, top : 406}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.one .obj .btn").stop().delay(550).animate({opacity : 1, top : 505}, 550, "easeOutCubic", function(){
								isMove = false;
							});
						}else{
							jQuery(".mVisual .rollU.one .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.one .obj .txt").stop().delay(350).animate({opacity : 1, top : 325}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.one .obj .btn").stop().delay(550).animate({opacity : 1, top : 424}, 550, "easeOutCubic", function(){
								isMove = false;
							});
						}
						if($(".mVisual .rollU.two .obj .tit").height() >= 140){
							jQuery(".mVisual .rollU.two .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.two .obj .txt").stop().delay(350).animate({opacity : 1, top : 406}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.two .obj .btn").stop().delay(550).animate({opacity : 1, top : 505}, 550, "easeOutCubic", function(){
								isMove = false;
							});
						}else{
							jQuery(".mVisual .rollU.two .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.two .obj .txt").stop().delay(350).animate({opacity : 1, top : 325}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.two .obj .btn").stop().delay(550).animate({opacity : 1, top : 424}, 550, "easeOutCubic", function(){
								isMove = false;
							});
						}
						if($(".mVisual .rollU.thr .obj .tit").height() >= 140){
							jQuery(".mVisual .rollU.thr .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.thr .obj .txt").stop().delay(350).animate({opacity : 1, top : 406}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.thr .obj .btn").stop().delay(550).animate({opacity : 1, top : 505}, 550, "easeOutCubic", function(){
								isMove = false;
							});
						}else{
							jQuery(".mVisual .rollU.thr .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.thr .obj .txt").stop().delay(350).animate({opacity : 1, top : 325}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.thr .obj .btn").stop().delay(550).animate({opacity : 1, top : 424}, 550, "easeOutCubic", function(){
								isMove = false;
							});
						}
					});
				} else {
					jQuery(".mVisual .numBt .contBt2").eq(rollNum).find("img").attr("src", jQuery(".mVisual .numBt .contBt2").eq(rollNum).find("img").attr("src").replace("_on.png", ".png"));
					jQuery(".mVisual .rollU").eq(rollNum).stop().animate({left : '-100%'}, 600, "easeOutCubic");
					if($(".mVisual .rollU.one .obj .tit").height() >= 140){
						jQuery(".mVisual .rollU.one .obj .tit").animate({opacity : 0, top : 250}, 0);
						jQuery(".mVisual .rollU.one .obj .txt").animate({opacity : 0, top : 446}, 0);
						jQuery(".mVisual .rollU.one .obj .btn").animate({opacity : 0, top : 555}, 0);
					}else{
						jQuery(".mVisual .rollU.one .obj .tit").animate({opacity : 0, top : 250}, 0);
						jQuery(".mVisual .rollU.one .obj .txt").animate({opacity : 0, top : 365}, 0);
						jQuery(".mVisual .rollU.one .obj .btn").animate({opacity : 0, top : 474}, 0);
					}
					if($(".mVisual .rollU.two .obj .tit").height() >= 140){
						jQuery(".mVisual .rollU.two .obj .tit").animate({opacity : 0, top : 250}, 0);
						jQuery(".mVisual .rollU.two .obj .txt").animate({opacity : 0, top : 446}, 0);
						jQuery(".mVisual .rollU.two .obj .btn").animate({opacity : 0, top : 555}, 0);
					}else{
						jQuery(".mVisual .rollU.two .obj .tit").animate({opacity : 0, top : 250}, 0);
						jQuery(".mVisual .rollU.two .obj .txt").animate({opacity : 0, top : 365}, 0);
						jQuery(".mVisual .rollU.two .obj .btn").animate({opacity : 0, top : 474}, 0);
					}
					if($(".mVisual .rollU.thr .obj .tit").height() >= 140){
						jQuery(".mVisual .rollU.thr .obj .tit").animate({opacity : 0, top : 250}, 0);
						jQuery(".mVisual .rollU.thr .obj .txt").animate({opacity : 0, top : 446}, 0);
						jQuery(".mVisual .rollU.thr .obj .btn").animate({opacity : 0, top : 555}, 0);
					}else{
						jQuery(".mVisual .rollU.thr .obj .tit").animate({opacity : 0, top : 250}, 0);
						jQuery(".mVisual .rollU.thr .obj .txt").animate({opacity : 0, top : 365}, 0);
						jQuery(".mVisual .rollU.thr .obj .btn").animate({opacity : 0, top : 474}, 0);
					}

					rollNum = index;

					jQuery(".mVisual .numBt .contBt2").eq(rollNum).find("img").attr("src", jQuery(".mVisual .numBt .contBt2").eq(rollNum).find("img").attr("src").replace(".png", "_on.png"));
					jQuery(".mVisual .rollU").eq(rollNum).stop().animate({left : '100%'}, 0, "easeOutCubic");
					jQuery(".mVisual .rollU").eq(rollNum).stop().animate({left : 0}, 600, "easeOutCubic", function(){
						if($(".mVisual .rollU.one .obj .tit").height() >= 140){
							jQuery(".mVisual .rollU.one .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.one .obj .txt").stop().delay(350).animate({opacity : 1, top : 406}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.one .obj .btn").stop().delay(550).animate({opacity : 1, top : 505}, 550, "easeOutCubic", function(){
								isMove = false;
							});
						}else{
							jQuery(".mVisual .rollU.one .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.one .obj .txt").stop().delay(350).animate({opacity : 1, top : 325}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.one .obj .btn").stop().delay(550).animate({opacity : 1, top : 424}, 550, "easeOutCubic", function(){
								isMove = false;
							});
						}
						if($(".mVisual .rollU.two .obj .tit").height() >= 140){
							jQuery(".mVisual .rollU.two .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.two .obj .txt").stop().delay(350).animate({opacity : 1, top : 406}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.two .obj .btn").stop().delay(550).animate({opacity : 1, top : 505}, 550, "easeOutCubic", function(){
								isMove = false;
							});
						}else{
							jQuery(".mVisual .rollU.two .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.two .obj .txt").stop().delay(350).animate({opacity : 1, top : 325}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.two .obj .btn").stop().delay(550).animate({opacity : 1, top : 424}, 550, "easeOutCubic", function(){
								isMove = false;
							});
						}
						if($(".mVisual .rollU.thr .obj .tit").height() >= 140){
							jQuery(".mVisual .rollU.thr .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.thr .obj .txt").stop().delay(350).animate({opacity : 1, top : 406}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.thr .obj .btn").stop().delay(550).animate({opacity : 1, top : 505}, 550, "easeOutCubic", function(){
								isMove = false;
							});
						}else{
							jQuery(".mVisual .rollU.thr .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.thr .obj .txt").stop().delay(350).animate({opacity : 1, top : 325}, 550, "easeOutCubic");
							jQuery(".mVisual .rollU.thr .obj .btn").stop().delay(550).animate({opacity : 1, top : 424}, 550, "easeOutCubic", function(){
								isMove = false;
							});
						}
					});
				}
			}
		});
	});

	//재생,스탑버튼
	var curMovie = false;
	jQuery(".mVisual .numBt a.play").click(function(){
		if(curMovie == false){
			jQuery(this).find("img").attr("src", jQuery(this).find("img").attr("src").replace("_stopBt.png", "_playBt.png"));
			clearInterval(rInterval);
			curMovie = true;
		}else if(curMovie == true){
			jQuery(this).find("img").attr("src", jQuery(this).find("img").attr("src").replace("_playBt.png", "_stopBt.png"));
			clearInterval(rInterval);
			rInterval = setInterval("rVisual()", rollTime);
			curMovie = false;
		}
	}).hover(function(){
		clearInterval(rInterval);
	}, function(){
		if(curMovie == false){
			clearInterval(rInterval);
			rInterval = setInterval("rVisual()", rollTime);
		}
	})

	jQuery(".mVisual .contBt").hover(function(){
		clearInterval(rInterval);
	}, function(){
		if(curMovie == false){
			clearInterval(rInterval);
			rInterval = setInterval("rVisual()", rollTime);
		}
	});

	// 배너 비쥬얼 모션
	banMax = $(".banBtA .bt").size()-1;
	banInterval = setInterval("banRoll()", banDuration);

	jQuery(".banImgA .imgA").hide();
	jQuery(".banImgA .imgA").eq(0).show();
	jQuery(".banBtA .bt").each(function(q){
		jQuery(this).click(function(){
			if(banNum !=q) {
				jQuery(".banImgA .imgA").eq(banNum).stop(true, true).fadeOut(300);
				jQuery(".banBtA .bt").eq(banNum).removeClass("on");
				banNum = q;
				jQuery(".banImgA .imgA").eq(banNum).stop(true, true).fadeIn(300);
				jQuery(".banBtA .bt").eq(banNum).addClass("on");
			}
		})	.hover(function(){
			clearInterval(banInterval);
		}, function(){
			clearInterval(banInterval);
			if(!banStop && banMax >= 1) banInterval = setInterval("banRoll()", banDuration);
		})
	});

	// 버튼 사라짐
	jQuery(window).resize(function(){
		if ( jQuery(window).width() < 1176 ) {
			$(".contBt").fadeOut(300);
		} else {
			$(".contBt").fadeIn(300);
		}
	}); jQuery(window).resize();
}); 


function rVisual(){
	if(isMove == false){
		isMove = true;
		jQuery(".mVisual .numBt .contBt2").eq(rollNum).find("img").attr("src", jQuery(".mVisual .numBt .contBt2").eq(rollNum).find("img").attr("src").replace("_on.png", ".png"));
		jQuery(".mVisual .rollU").eq(rollNum).stop().animate({left : '-100%'}, 600, "easeOutCubic");
		
		if($(".mVisual .rollU.one .obj .tit").height() >= 140){
			jQuery(".mVisual .rollU.one .obj .tit").animate({opacity : 0, top : 250}, 0);
			jQuery(".mVisual .rollU.one .obj .txt").animate({opacity : 0, top : 446}, 0);
			jQuery(".mVisual .rollU.one .obj .btn").animate({opacity : 0, top : 555}, 0);
		}else{
			jQuery(".mVisual .rollU.one .obj .tit").animate({opacity : 0, top : 250}, 0);
			jQuery(".mVisual .rollU.one .obj .txt").animate({opacity : 0, top : 365}, 0);
			jQuery(".mVisual .rollU.one .obj .btn").animate({opacity : 0, top : 474}, 0);
		}
		if($(".mVisual .rollU.two .obj .tit").height() >= 140){
			jQuery(".mVisual .rollU.two .obj .tit").animate({opacity : 0, top : 250}, 0);
			jQuery(".mVisual .rollU.two .obj .txt").animate({opacity : 0, top : 446}, 0);
			jQuery(".mVisual .rollU.two .obj .btn").animate({opacity : 0, top : 555}, 0);
		}else{
			jQuery(".mVisual .rollU.two .obj .tit").animate({opacity : 0, top : 250}, 0);
			jQuery(".mVisual .rollU.two .obj .txt").animate({opacity : 0, top : 365}, 0);
			jQuery(".mVisual .rollU.two .obj .btn").animate({opacity : 0, top : 474}, 0);
		}
		if($(".mVisual .rollU.thr .obj .tit").height() >= 140){
			jQuery(".mVisual .rollU.thr .obj .tit").animate({opacity : 0, top : 250}, 0);
			jQuery(".mVisual .rollU.thr .obj .txt").animate({opacity : 0, top : 446}, 0);
			jQuery(".mVisual .rollU.thr .obj .btn").animate({opacity : 0, top : 555}, 0);
		}else{
			jQuery(".mVisual .rollU.thr .obj .tit").animate({opacity : 0, top : 250}, 0);
			jQuery(".mVisual .rollU.thr .obj .txt").animate({opacity : 0, top : 365}, 0);
			jQuery(".mVisual .rollU.thr .obj .btn").animate({opacity : 0, top : 474}, 0);
		}

		rollNum ++;
		if(rollNum > rollMax) rollNum = 0;
		jQuery(".mVisual .numBt .contBt2").eq(rollNum).find("img").attr("src", jQuery(".mVisual .numBt .contBt2").eq(rollNum).find("img").attr("src").replace(".png", "_on.png"));
		jQuery(".mVisual .rollU").eq(rollNum).stop().animate({left : '100%'}, 0, "easeOutCubic");
		jQuery(".mVisual .rollU").eq(rollNum).stop().animate({left : 0}, 600, "easeOutCubic", function(){
			if($(".mVisual .rollU.one .obj .tit").height() >= 140){
				jQuery(".mVisual .rollU.one .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
				jQuery(".mVisual .rollU.one .obj .txt").stop().delay(350).animate({opacity : 1, top : 406}, 550, "easeOutCubic");
				jQuery(".mVisual .rollU.one .obj .btn").stop().delay(550).animate({opacity : 1, top : 505}, 550, "easeOutCubic", function(){
					isMove = false;
				});
			}else{
				jQuery(".mVisual .rollU.one .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
				jQuery(".mVisual .rollU.one .obj .txt").stop().delay(350).animate({opacity : 1, top : 325}, 550, "easeOutCubic");
				jQuery(".mVisual .rollU.one .obj .btn").stop().delay(550).animate({opacity : 1, top : 424}, 550, "easeOutCubic", function(){
					isMove = false;
				});
			}
			if($(".mVisual .rollU.two .obj .tit").height() >= 140){
				jQuery(".mVisual .rollU.two .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
				jQuery(".mVisual .rollU.two .obj .txt").stop().delay(350).animate({opacity : 1, top : 406}, 550, "easeOutCubic");
				jQuery(".mVisual .rollU.two .obj .btn").stop().delay(550).animate({opacity : 1, top : 505}, 550, "easeOutCubic", function(){
					isMove = false;
				});
			}else{
				jQuery(".mVisual .rollU.two .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
				jQuery(".mVisual .rollU.two .obj .txt").stop().delay(350).animate({opacity : 1, top : 325}, 550, "easeOutCubic");
				jQuery(".mVisual .rollU.two .obj .btn").stop().delay(550).animate({opacity : 1, top : 424}, 550, "easeOutCubic", function(){
					isMove = false;
				});
			}
			if($(".mVisual .rollU.thr .obj .tit").height() >= 140){
				jQuery(".mVisual .rollU.thr .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
				jQuery(".mVisual .rollU.thr .obj .txt").stop().delay(350).animate({opacity : 1, top : 406}, 550, "easeOutCubic");
				jQuery(".mVisual .rollU.thr .obj .btn").stop().delay(550).animate({opacity : 1, top : 505}, 550, "easeOutCubic", function(){
					isMove = false;
				});
			}else{
				jQuery(".mVisual .rollU.thr .obj .tit").stop().delay(50).animate({opacity : 1, top : 190}, 550, "easeOutCubic");
				jQuery(".mVisual .rollU.thr .obj .txt").stop().delay(350).animate({opacity : 1, top : 325}, 550, "easeOutCubic");
				jQuery(".mVisual .rollU.thr .obj .btn").stop().delay(550).animate({opacity : 1, top : 424}, 550, "easeOutCubic", function(){
					isMove = false;
				});
			}

			isMove = false;
		});
	}
}

// 배너 인터벌 
function banRoll(){
	jQuery(".banImgA .imgA").eq(banNum).stop(true, true).fadeOut(300);
	jQuery(".banBtA .bt").eq(banNum).removeClass("on");
	banNum ++;
	if(banNum > banMax) banNum =0;
	jQuery(".banImgA .imgA").eq(banNum).stop(true, true).fadeIn(300);
	jQuery(".banBtA .bt").eq(banNum).addClass("on");
}

