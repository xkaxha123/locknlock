
var Lib = function() {
	this.IsPosting = false;
	this.RegExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; 
	this.RegExpPhone = /^\d{2,3}-\d{3,4}-\d{4}$/;
	this.RegExpPwd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
	this.RegExpBizno = /^[0-9]{3}-?[0-9]{2}-?[0-9]{5}$/;
	this.RegExpEng = /^[a-zA-Z0-9-\.\_]+$/;

    //2017.01.10 박주석 채용에 영문이름(영어 + 띄워쓰기)
	this.RegExpEngNm = /^[a-zA-Z\s]+$/;

	this.RegExpNumber = /[^0-9]/g;
	this.RegExpId = /^[a-zA-Z]{1}[a-zA-Z0-9_]{5,20}$/;
	this.RegExpKor = /^[가-힣]+$/;
	
	var isCKEditorCSRF = false;
	var isIE7 = false;
	var isIE8 = false;
	var isIE9 = false;
	var isIE10 = false;
	var isIE11 = false;
	var cid="";
	var $focusObjectAfterPopUpClose = null;
	var DeptTreePop = function(url, selector) {
		var obj = $(selector);
		if ($.trim(obj.html()) == "") {
			if (Metronic.isIE8() || Metronic.isIE9()) {
				obj.css({"margin-top":"38px"});
			}
			$.get(url, function (d) {
				obj.html(d);
			});
		} else {
			obj.slideToggle();

		}		
	}
	var smartTrim = function(string, maxLength) {
		if (!string) return string;
		if (maxLength < 1) return string;
		if (string.length <= maxLength) return string;
		if (maxLength == 1) return string.substring(0,1) + '...';

		var midpoint = Math.ceil(string.length / 2);
		var toremove = string.length - maxLength;
		var lstrip = Math.ceil(toremove/2);
		var rstrip = toremove - lstrip;
		return string.substring(0, midpoint-lstrip) + '...' + string.substring(midpoint+rstrip);
	}
	var AddThis = function(obj, initial_) {
        var clone = $(obj).clone(true);
        $(obj).parent().append(clone);
		if (initial_ != undefined) {

			$(obj).find("input:text, textarea").val("");
		} else {
			$(obj).find("select").each(function (i) {
				$(obj).parent().children().last().find("select").eq(i).val($(this).val());
			});
		}
		$(obj).parent().find("input:text").each(function(i) {
			$(this).attr("title", "파일첨부_" + i);
		});
		$(obj).parent().find("input:file").each(function(i) {
			$(this).attr("title", "파일첨부_" + i);
		});
	}
	var RemoveThis = function(obj) {
        if ($(obj).parent().children().size() > 1)
            $(obj).remove();
		else {
			
			$(obj).find("input:text, textarea").val("");
		}
	}
	var checkboxAll = function(obj) {
		var frmObj = $(obj).parents("form");
		
		var index = $(frmObj).find("input:checkbox").index(obj);

		$(frmObj).find("input:checkbox").each(function(i) {
			if (i != index) {

				if ($(this).parent().parent().hasClass("checker")) {
					if ($(this).is(":checked")) {
						$(this).attr("checked", false);
						$(this).parent().removeClass("checked");
					} else {
						$(this).attr("checked", true);
						$(this).parent().addClass("checked");
					}			
				}
			}

		});

	}

	var _safe_tags_replace = function(str) {
		if (str != null && str != "") {
			var regex = /<img(.*?)>/g

			//물음표 생성 오류로 추가 2014.06.25 이현우
			while (str.indexOf(unescape("%uFEFF")) > -1) {
				str = str.replace(unescape("%uFEFF"), "");
			}
			
			while (str.indexOf(unescape("%uFF1F")) > -1) {
				str = str.replace(unescape("%uFF1F"), "");
			}

			return str
					.replace(/&amp;/g, "&")
					.replace(/&lt;/g, "<")
					.replace(/&gt;/g, ">")
					.replace(regex, "<img $1 />")
					.replace(/<br>/g, "<br/>")
					.replace(/<BR>/g, "<br/>")
					.replace(/&/g, "&amp;")
					.replace(/</g, "&lt;")
					.replace(/>/g, "&gt;");
		} else {
			return "";
		}

	} 
	var _safe_search_keyword = function(str) {
		return str
				.replace(/&/g, ";amp;")
				.replace(/\//g, ";slh;")
				.replace(/</g," ")
				.replace(/>/g," ");
	}
	var _tags_replace = function(str) {
		return str
				.replace(/&amp;/g, "&")
				.replace(/&lt;/g, "<")
				.replace(/&gt;/g, ">");
	} 

	var Left = function (str, n){
		if (n <= 0)
		  return "";
		else if (n > String(str).length)
		  return str;
		else
		  return String(str).substring(0,n);
		}
	var Right = function(str, n){
		  if (n <= 0)
			 return "";
		  else if (n > String(str).length)
			 return str;
		  else {
			 var iLen = String(str).length;
			 return String(str).substring(iLen, iLen - n);
		  }
		}
	var getUrlHost = function() {
		var url = $.url();
		var rtnValue = url.attr("protocol") + "://" + url.attr('host');
		var port = url.attr("port");
		if (port != "80")
		{
			rtnValue += ":" + port;
		}

		return rtnValue;
	}
	var gettab = function() {
		var url = $.url();
		return url.attr("fragment");

	}
	var SelectText = function(element) {
		var doc = document
			, text = doc.getElementById(element)
			, range, selection
		;    
		if (doc.body.createTextRange) {
			range = document.body.createTextRange();
			range.moveToElementText(text);
			range.select();
		} else if (window.getSelection) {
			selection = window.getSelection();        
			range = document.createRange();
			range.selectNodeContents(text);
			selection.removeAllRanges();
			selection.addRange(range);
		}
	}
	var getTimeString = function(milisecond, opt) {
		
		var s = parseInt(milisecond);
		 var ms = s % 1000;
		  s = (s - ms) / 1000;
		  var secs = s % 60;
		  s = (s - secs) / 60;
		  var mins = s % 60;
		  var hrs = (s - mins) / 60;
		  if (opt == undefined)
		  {
			if (hrs == 0 && mins == 0)
			{
				return "";
			}
			return Right("0" + hrs, 2) + ':' + Right("0" + mins, 2);//+ ':' + secs + '.' + ms;
			
		  } else {
			if (hrs == 0 && mins == 0 && secs == 0)
			{
				return "";
			}
			return Right("0" + hrs, 2) + ':' + Right("0" + mins, 2) + ':' + Right("0" + secs, 2);
		  }
		  



	}
	var autoImgResize = function(obj, maxSize, IsResize) {
			//console.log(obj.size());
			if (maxSize==0)
			{
				maxSize = $(window).width()-60;
			}
			obj.each(function() {
				var width = 0, height = 0;
				width = parseInt($(this).width(), 10);
				height = parseInt($(this).height(), 10);
				var data_width = $(this).attr("data-width");

				if (data_width == undefined) {
					//alert(width+":"+height);
					if(width > maxSize) {
						$(this).css({width: maxSize+"px", height: Math.round(height * (maxSize / width))+"px" });
						$(this).attr("data-width",width);
					}
				} else {
					var max_data_width = parseInt($(this).attr("data-width"), 10);

					if (max_data_width > maxSize) {
						$(this).css({width: maxSize+"px", height: Math.round(height * (maxSize / width))+"px" });
					}
				}
				
				//alert($(this).width()+":::"+$(this).height());
			});
	} 

	var loadScript = function(url, callback) {
		var script = document.createElement("script")
		script.type = "text/javascript";

		if (script.readyState){  //IE
			script.onreadystatechange = function(){
				if (script.readyState == "loaded" ||
						script.readyState == "complete"){
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {  //Others
			script.onload = function(){
				callback();
			};
		}

		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);
	}

	var getBrowserType = function(){
          
        var _ua = navigator.userAgent;
        var rv = -1;
         
        //IE 11,10,9,8
        var trident = _ua.match(/Trident\/(\d.\d)/i);
        if( trident != null )
        {
            if( trident[1] == "7.0" ) return rv = "IE" + 11;
            if( trident[1] == "6.0" ) return rv = "IE" + 10;
            if( trident[1] == "5.0" ) return rv = "IE" + 9;
            if( trident[1] == "4.0" ) return rv = "IE" + 8;
        }
         
        //IE 7...
        if( navigator.appName == 'Microsoft Internet Explorer' ) return rv = "IE" + 7;
         
        /*
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if(re.exec(_ua) != null) rv = parseFloat(RegExp.$1);
        if( rv == 7 ) return rv = "IE" + 7; 
        */
         
        //other
        var agt = _ua.toLowerCase();
        if (agt.indexOf("chrome") != -1) return 'Chrome';
        if (agt.indexOf("opera") != -1) return 'Opera'; 
        if (agt.indexOf("staroffice") != -1) return 'Star Office'; 
        if (agt.indexOf("webtv") != -1) return 'WebTV'; 
        if (agt.indexOf("beonex") != -1) return 'Beonex'; 
        if (agt.indexOf("chimera") != -1) return 'Chimera'; 
        if (agt.indexOf("netpositive") != -1) return 'NetPositive'; 
        if (agt.indexOf("phoenix") != -1) return 'Phoenix'; 
        if (agt.indexOf("firefox") != -1) return 'Firefox'; 
        if (agt.indexOf("safari") != -1) return 'Safari'; 
        if (agt.indexOf("skipstone") != -1) return 'SkipStone'; 
        if (agt.indexOf("netscape") != -1) return 'Netscape'; 
        if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
    }

	var CKEditorCSRF = function(csrfname, csrfvalue) {
	  $(document).ready(function(){  

		  if (!isCKEditorCSRF) {
			   CKEDITOR.on('dialogDefinition', function(ev) {
				var dialogName = ev.data.name;
				var dialogDefinition = ev.data.definition;
				
				if(dialogName == 'image' || dialogName == 'link') {
				
				 var uploadTab = dialogDefinition.getContents('Upload');
				 if (uploadTab == null && dialogName == 'link')
				 {	
					uploadTab = dialogDefinition.getContents('upload');
				 }
				 for (var i =0; i < uploadTab.elements.length; i++)
				 {
				  var el = uploadTab.elements[i];
				  if(el.type != 'fileButton') {
				   continue;
				  }

				  var onClick = el.onClick;

				  el.onClick = function(evt){
				   var dialog = this.getDialog();
				   var fb = dialog.getContentElement(this['for'][0], this['for'][1]);
				   var action = fb.getAction();
				   var editor = dialog.getParentEditor();
				   editor._.filebrowserSe = this;
					// CSRF Protection 코드
				   $(fb.getInputElement().getParent().$)
											.append('<input type="hidden" name="' + csrfname + '" value="' + csrfvalue + '" />');
				   if(onClick && onClick.call(evt.sender, evt) === false) {
					return false;
				   }
				   return true;
				  };
				 }
				}
			   }); 
			   isCKEditorCSRF = true;
		  }
	  }); 

	}
	var formatBytes = function(bytes,decimals) {
	   if(bytes == 0) return '0 Byte';
	   var k = 1000;
	   var dm = decimals + 1 || 3;
	   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	   var i = Math.floor(Math.log(bytes) / Math.log(k));
	   return (bytes / Math.pow(k, i)).toPrecision(dm) + ' ' + sizes[i];
	}





	var _CKEditorUpdateElement = function(frmObj, callback) {
		for(var instanceName in CKEDITOR.instances)
			CKEDITOR.instances[instanceName].updateElement();

		var IsValid = true;
		//$("form").each(function() {
		//	var frmObj = $(this);
			$(frmObj).find("input, textarea").each(function() {
				if (_IsValidCheck(this)) {
					$(this).val(_safe_tags_replace($(this).val()));
				} else {
					IsValid = false;
					return false;
				}
			});
		//});
		if (typeof callback == "function" && IsValid)
		{
			callback();
		}
	}
	var _CKEditorReverseElement=function(frmObj) {
		//$("form").each(function() {
		//	var frmObj = $(this);
			$(frmObj).find("input:text, textarea").each(function() {
				$(this).val(_tags_replace($(this).val()));
			});
		//});
	}
	var _CKEditorPopup = function(num, textareaname) {
		var $iframe = $("[name='" + textareaname + "']").parent().find("iframe.cke_wysiwyg_frame");
		var $iframeBody = null;
		
		if ($iframe.size() > 0) 
			$iframeBody = $iframe.contents().find("body");
		if ($iframeBody != null && $iframeBody.size() > 0) {
			var $container = $iframeBody.find(".editor-layerpopup").eq(num);
			if ($container.css("display") == "none") {
				$container.show();
			} else {
				$container.hide();
			}
		}
	}
	var _CKEditorTabActivity = function(num, textareaname, taboptions) {

		var $iframe = $("[name='" + textareaname + "']").parent().find("iframe.cke_wysiwyg_frame");
		var $iframeBody = null;
		
		if ($iframe.size() > 0) 
			$iframeBody = $iframe.contents().find("body");
		if ($iframeBody != null && $iframeBody.size() > 0) {
			var $container = $iframeBody.find(taboptions.tabcontainer);
			$container.each(function() {
				var $that = $(this);
				var isAccordian = $(this).hasClass("accordian") ? true :false;
				var $tabs = $that.find(taboptions.tabselector);
				var $tabcontents = $that.find(taboptions.tabcontentselector);
				//if ($tabs.size() > num && $tabcontents.size() > num) {
				if (isAccordian) {
					$tabs.parent().removeClass(taboptions.tabactclass)
						 .eq(num).addClass(taboptions.tabactclass);
				} else {
					$tabs.removeClass(taboptions.tabactclass)
						 .eq(num).addClass(taboptions.tabactclass);
					
				}
				$tabcontents.hide().eq(num).show();
				//} else {
				//	bootbox.alert("해당 탭이 컨텐츠에 존재하지 않습니다.");
				//}
			});
		}

	}
	var _IsValidCheck = function(frmObj) {
		var $that = $(frmObj);
		var RequiredText = $that.attr("data-required");
		var value = $that.val();
		if (RequiredText != undefined &&
			$.trim(value) == "") {
			bootbox.alert(RequiredText, function() {
				$that.focus();
			});
			return false;
		}
		return true;
	}
    var _ByteCheck = function(str) {
        var byteLength = 0;
        var TBox = str;

        if (TBox.length != 0) {
            for (var i = 0; i < TBox.length; i++) {
                var oneChar = escape(TBox.charAt(i));

                if (oneChar.length == 1) {
                    byteLength++;
                }
                else if (oneChar.indexOf("%u") != -1) {
                    byteLength += 2;
                }
                else if (oneChar.indexOf("%") != -1) {
                    if (escape(oneChar) == "%250D") {
                        byteLength++;
                        byteLength--;
                    }
                    else {
                        byteLength += oneChar.length / 3;
                    }
                }
            }
        }

        return byteLength;
    }
	var _EditorTab = function() {
		var hash = window.location.hash;
		$(".tabs").each(function() {
			var isAccordian = $(this).hasClass("accordian") ? true :false;
			var $that = $(this);
			$that.find(".btn").click(function() {
				var index = $that.find(".btn").index($(this));
				
				if (isAccordian) {
				    if ($(this).parent().hasClass("on")) {
				        $(this).parent().removeClass("on");
				        $that.find(".contentdiv").eq(index).slideUp(200, function () { });
				    } else {
				        $that.find(".btn").parent().removeClass("on").eq(index).addClass("on");
				        $that.find(".contentdiv").not(":eq(" + index + ")").slideUp(200, function () {
				            $that.find(".contentdiv").eq(index).slideDown(200, function () {
				                jQuery("body, html").stop().animate({ scrollTop: $that.find(".on").offset().top }, 0);
				            });
				        });
				    }
				} else {
					$that.find(".btn").removeClass("on").eq(index).addClass("on");
					$that.find(".contentdiv").hide().eq(index).show();
				}
			});
		});
		$(".tabs a[href='" + hash + "']").trigger("click");
	}
	var _LayerPopUp = function() {
		    jQuery(window).resize(function () {
				var PopHeight = jQuery(".layerPop").height() / 2;
				var PopWidth = jQuery(".layerPop").width() / 2;
		        jQuery(".layerPop").css({
		            top: (jQuery(window).height() / 2) - PopHeight + jQuery(window).scrollTop() - 40,
		            left: (jQuery(window).width() / 2) - PopWidth - 40
		        });
		        jQuery(".layerPop").css({
		            top: (jQuery(window).height() / 2) - PopHeight + jQuery(window).scrollTop() - 40,
		            left: (jQuery(window).width() / 2) - PopWidth - 40
		        });
		    })
		    jQuery(".popClose, .pCancel, .blackBg").click(function () {
				var scrollNum = $(this).attr("data-scroll");
		        $("#wrap").css({
		            position: "relative",
		            overflowY: "auto",
		            top: 0
		        });
		        $("html,body").scrollTop(scrollNum);
		        $(".layerPop").css("display", "none");
		        $(".blackBg").fadeOut(300);
				//if ($focusObjectAfterPopUpClose != null)
				//	$focusObjectAfterPopUpClose.focus();
		    });

	        // 락앤락수출국 팝업 버튼 클릭
		    jQuery(".globalLayerPop .tabBtnList li").each(function (e) {
		        jQuery(this).find("a").click(function () {
		            jQuery(".globalLayerPop .tabBtnList li").removeClass("on");
		            jQuery(this).parent("li").addClass("on");
		            var scrollHeight = 0;
		            if (e == 0) {
		                scrollHeight = 0;
		            } else {
		                for (var num = 0 ; num < e ; num++) {
		                    scrollHeight = scrollHeight + jQuery(".stateList").find(".list").eq(num).outerHeight(true);
		                }
		            }
		            //console.log(scrollHeight);
		            jQuery(".stateList").stop().animate({ scrollTop: scrollHeight }, 0);
		        });
		    });
	}
	var _GetFaceBook = function (root) {
		var token = "692140504282579|mPk38svd71Q7XzrZzKDp3ljsPMo";
		var pageId = "ilocknlock";
		var pageSize = 4;
		var fields = ["picture", "full_picture", "message", "link", "likes", "comments", "created_time"];
		var url = "https://graph.facebook.com/" + pageId + "/posts?access_token=" + token + "&fields=" + fields.join(",") + "&limit=" + pageSize + "&callback=?";

		var $container = root == '/mobile' ? $(".snsBody.fb") : $(".faceBookA > .multiTypeA > ul");
		var listhtml = $container.html();
		
		//console.log(listhtml);
		$.getJSON(url, function (json) {
			$container.html("");
			$.each(json.data,function(i,fb){
				var link = fb.link != undefined ? fb.link : "";
				var full_picture = fb.full_picture != undefined ? fb.full_picture : "";
				var message = fb.message != undefined ? fb.message.substring(0,50) + "..." : "";
				var likecnt = fb.likes != undefined ? fb.likes.data.length : 0;
				var cmtcnt = fb.comments != undefined ? fb.comments.data.length : 0;
				var created_time = fb.created_time != undefined ? fb.created_time.substring(0,10) : "";
				$container.append(
					$(listhtml
						.replace("{linkurl}", link)
						.replace("{imgurl}", full_picture)
						.replace("{title}", message)
						.replace("{date}", created_time)
						.replace("{likecnt}", likecnt)
						.replace("{cmtcnt}", cmtcnt)).show()
				);
			});
			if (root != '/mobile') {
				$(".multiTypeA li").filter(function (index) {
					return index % 4 == 0
				}).css({
					marginLeft: 0
				})
			}
		});
	}
	var _GetInstagram = function(root) {
		var url = "/nowlocknlock/getinstagram"
		var $container = root == '/mobile' ? $(".snsBody.insta") : $(".instagramA > .instaCon > ul.instaList");
		var listhtml = $container.html();
		$.getJSON(url,function(json){
			$container.html("");
			$.each(json.data,function(i,insta){
				var link = insta.link != undefined ? insta.link : "";
				var picture = insta.images.low_resolution.url != undefined ? insta.images.low_resolution.url : "";
				var caption = insta.caption != undefined ? insta.caption.text : "";
				var likecnt = insta.likes != undefined ? insta.likes.count : 0;
				
				$container.append(
					$(listhtml
						.replace("{linkurl}", link)
						.replace("{imgurl}", picture)
						.replace("{title}", caption)
						.replace("{likecnt}", likecnt)).show()
				);
			});
			if (root != '/mobile') {
				// 인스타그램 list 간격 값
				$(".instaList li").filter(function (index) {
					return index % 4 == 0
				}).css({
					marginLeft: 0
				})
				$(".instaList li").filter(function (index) {
					return index > 3
				}).css({
					marginTop: 22
				})
				$(".multiTypeA li").filter(function (index) {
					return index % 4 == 0
				}).css({
					marginLeft: 0
				})
				$(".famSiteList ul li").filter(function (index) {
					return index > 3
				}).css({
					marginTop: 12
				})
				$(".globalSiteList li").filter(function (index) {
					return index > 2
				}).css({
					marginTop: 30
				})
			}
		});
	}
	var _GetNaverBlog = function(root) {
		var root_ = root == undefined ? "" : root;
		var url = "/nowlocknlock/getnaverblog/";
		$.get(url, {}, function(html) {
			$(".naverBlogA").html(html);
		});

	}
	var _GetSupporters = function(root) {
		var root_ = root == undefined ? "" : root;
		var url = "/nowlocknlock/getsupporters/";
		$.get(url, {}, function(html) {
			$(".supportA").html(html);
		});

	}
	var _setCookie = function(name, value, expirehours) {
        var todayDate = new Date();
        todayDate.setHours(todayDate.getHours() + expirehours);
        document.cookie = name + "=" + escape(value) + ";path=/;expires=" + todayDate.toGMTString() + ";";
	}
	var _closeWin = function(name, value, expirehours) {
		_setCookie(name, value, expirehours);

	}
	var _keydown_number = function(event, Includekeypad) {
		var code = event.which || event.keyCode;
		if (
			(code >= 48 && code <= 57) ||
			(code >= 96 && code <= 105)
		) {
				return true;
		}
		return false;
	}
	var _keydown_specialkey = function(event) {
		var code = event.which || event.keyCode;
		if (
			code == 186 || //:
			code == 187 || //-
			code == 188 ||  //,
			code == 189 ||  //-
			code == 190 ||  //.
			code == 191 || //?
			code == 219 || //[
			code == 220 || //\
			code == 221 || //]
			code == 222 || //"
			code == 111	||   //키패드/
			code == 106	||   //키패드*
			code == 109	||   //키패드-
			code == 107	||   //키패드+
			code == 110	     //키패드.
			) {
				return true;
			}
		return false;
	}
	var _keydown_utility = function(event) {
		var code = event.which || event.keyCode;
		if (( code >=37 && code <= 40 ) || //arrowkey
			code == 8 ||  //backspace
			code == 9 ||  //tab
			code == 36 || //home
			code == 35 || //end
			code == 46 //delete
			) {
				return true;
			}
		return false;
	}
	var _keydown_copypaste = function(event) {
		var code = event.which || event.keyCode;
		if (event.ctrlKey && 
			(code == 67 || code == 86)
			) {
				return true;
		}
		return false;
	}
	var _keydown_money = function(event, minus) {
		var code = event.which || event.keyCode;
		if (code == 110 ||//키패드 마침표
			(!event.shiftKey && code == 190) || //마침표
			(!event.shiftKey && code == 188) ||// 콤마
			(minus == undefined && 
				(code == 109 || //키패드 -
				 (!event.shiftKey && (code == 109 || code == 189) )
				)
			 ) // - 예외처리
			) {
				return true;
		}
		return false;
	}
	var _socialRoll = function () {
        var isMove = false;
		var newRNum;
		var newRMax;
		var curRnum = 1;

		jQuery(".mRollDiv").each(function(q){
			//class add
			$(this).addClass("r"+(q+1));

			//초기 위치선정
			jQuery(this).find(".unit").each(function(k){
				$(this).css("left", k*527);
			});

			//aCount 맥스값
			$(this).find(".aCount").text($(this).find("div > .unit").length)
			var currentN = 1;

			//버튼 이벤트
			$(this).find(".bts a").each(function(k){
				$(this).click(function(){
					if(!isMove) {
						isMove = true;
						if(!k) {
							var curN = parseInt($(this).parents(".mRollDiv").attr("class").split("r")[1])-1;
							var lastDetach = $(".mRollDiv").eq(curN).find(".unit:last").detach();
							$(".mRollDiv").eq(curN).find(".unitDiv").prepend(lastDetach);
							$(".mRollDiv").eq(curN).find(".unit:first").css("left", -527);
							$(".mRollDiv").eq(curN).find(".unit").each(function(j){
								TweenMax.to($(this), 0.5, {left:parseInt($(this).css("left").split("p")[0]) + 527, ease:Power3.easeOut, onComplete:function(){
									isMove = false;
								}});
							});
									
							currentN--;
							if(currentN < 1) currentN = $(".mRollDiv").eq(curN).find("div > .unit").length;
							$(".mRollDiv").eq(curN).find(".nCount").text(currentN);
						} else {
							var curN = parseInt($(this).parents(".mRollDiv").attr("class").split("r")[1])-1;
							$(".mRollDiv").eq(curN).find(".unit").each(function(j){
								TweenMax.to($(this), 0.5, {left:parseInt($(this).css("left").split("p")[0]) - 527, ease:Power3.easeOut, onComplete:function(){
									isMove = false;

									if(!j) {
										var firstDetach = $(".mRollDiv").eq(curN).find(".unit:first").detach();
										$(".mRollDiv").eq(curN).find(".unitDiv").append(firstDetach);
										$(".mRollDiv").eq(curN).find(".unit:last").css("left", ($(".mRollDiv").eq(curN).find(".unit").size()-1) * 527);
									}
								}});
							});

							currentN++;
							if(currentN > $(".mRollDiv").eq(curN).find("div > .unit").length) currentN = 1;
							$(".mRollDiv").eq(curN).find(".nCount").text(currentN);
						}
					}
				});
			});
		});
	}

	return {
		UrlHost: function() {
			return getUrlHost();
		},
		init: function(isMobile) {
			$(function() {
				isIE7 = !! navigator.userAgent.match(/MSIE 7.0/);
				isIE8 = !! navigator.userAgent.match(/MSIE 8.0/);
				isIE9 = !! navigator.userAgent.match(/MSIE 9.0/);
				isIE10 = !! navigator.userAgent.match(/MSIE 10.0/);	
				isIE11 = !! navigator.userAgent.match(/MSIE 11.0/);	
			});
			/*$(window).load(function() {

				if (isMobile == "True") {
					autoImgResize( $("#cBody .subCon .boardView .viewCon .viewD img"), 0);
				}

				$(window).resize(function() {
					autoImgResize( $("#cBody .subCon .boardView .viewCon .viewD img"), 0);
				});
			});*/
			_EditorTab();
			_LayerPopUp();
			_socialRoll();
		},
		IsIE: function() {
			return isIE7 || isIE8 || isIE9 || isIE10 || isIE11
		},
		smartTrim: function(string, maxLength) {
			return smartTrim(string, maxLength);
		},
		DeptTreePop: function(url, selector) {

			DeptTreePop(url, selector);
		},
		AddThis: function (obj, initial_) {
		    AddThis(obj, initial_);
		},
		RemoveThis: function (obj) {
		    RemoveThis(obj);
		},
		checkboxAll: function (obj) {
			checkboxAll(obj);
		},
		safe_tags: function (str) {
			return _safe_tags_replace(str);
		},
		html_tags: function (str) {
			return  _tags_replace(str);
		},
		Left: function(str, n) {
			return Left(str, n);
		},
		Right: function(str, n) {
			return Right(str, n);
		},
		SelectText: function(element) {
			SelectText(element);
		},
		getTimeString: function(milisecond) {
			return getTimeString(milisecond);
		},
		resizeTextArea:	function(obj) {
				obj.style.height = "1px";
				obj.style.height = (20 + obj.scrollHeight) + "px";
		},
		gettab: function() {
			return gettab();
		},
		numComma:	function (x) {
			x = x.toString().replace(/,/g, "");
			//return $.trim(x).toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	    },
		num: function(x) {
			x = x.toString().replace(/,/g, "");
			return x;
		},
		formatBytes: function(bytes, decimals) {
			if (decimals != undefined && decimals == null)
			{
				decimals = 1024;
			}
			return formatBytes(bytes, decimals);
		},
		now: function() {

			return new Date().getTime();
		},
		autoImgResize: function(obj, maxSize) {

			autoImgResize(obj, maxSize);
		},
		getBrowserType : function(str){
			return getBrowserType();
		},
		MainPopUp: function (language) {
		    $(function () {
				//var $obj = $(obj);
				//var id = $obj.attr("data-id");
		        var cookiename = "mainpopup" + language;
				var cookie = document.cookie;	
				if (cookie.indexOf(cookiename + "=done") < 0) {
				    $(".mPopClose").click(function () {
				        if ($(this).closest(".layerPop").find(":checkbox").is(":checked")) {
				            _closeWin(cookiename, "done", 24);
				        }
				        $(".layerPop").css("display", "none");
				        $(".blackBg").fadeOut(300);
				    });
				}
			});
		},
		MainMobilePopUp: function (language) {
		    $(function () {
		        //var $obj = $(obj);
		        //var id = $obj.attr("data-id");
		        var cookiename = "m_mainpopup" + language;
		        var cookie = document.cookie;
		        if (cookie.indexOf(cookiename + "=done") < 0) {
		            $(".mPopClose").click(function () {
		                if ($(this).closest(".mRollPop").find(":checkbox").is(":checked")) {
		                    _closeWin(cookiename, "done", 24);
		                }
		                $(".mRollPop").css("display", "none");
		            });
		        }
		    });
		},
		BrowserUpdate: function() {
			$(function() {
				//alert("isIE7:" + isIE7 + "\nisIE8:" + isIE8 + "\nisIE9:" +isIE9+ "\nisIE10:" +isIE10);
				if (isIE7 || isIE8 || isIE9 || isIE10) {
					var cookie = document.cookie;	
					if (cookie.indexOf("browserupdate=done") < 0) {
						Lib.LayerPopUp($(this), ".browUpPop", ".browUpPop");
						$(".browUpPop .popClose").click(function() {
							if ($(".browUpPop input:checkbox").is(":checked")) {
								_closeWin("browserupdate", "done", 24);
							}
						});
					}
				}
			});
		},
		IsPosting:IsPosting,
		RegExpEmail:RegExpEmail,
		RegExpPhone:RegExpPhone,
		RegExpPwd:RegExpPwd,
		RegExpBizno:RegExpBizno,
		RegExpEng: RegExpEng,
		RegExpEngNm : RegExpEngNm,
		RegExpKor:RegExpKor,
		RegExpNumber:RegExpNumber,
		RegExpId:RegExpId,

		playWav:function(url) {
			
			//var t = new Date().getTime();
			//url += "?t=" + t;

			if ($("#sound").size() == 0)
			{

				$("body").append("<audio id='playaudio' src='' style='display:none;'></audio>")
						.append("<bgsound id='sound'/>");
			}
			document.all.sound.src = url;
			
			
			$("#playaudio").attr("src", url).each(function() {

				this.play();
			});
		},
		playWavMobile: function(url) {
			var audio = new Audio(url);
			audio.play();
		},
		safeForm: function(frmObj, callback) {
			$(frmObj).find("input:text, textarea").each(function() {
				$(this).val(_safe_tags_replace($(this).val()));
			});
			if (typeof callback == "function")
			{
				callback();
			}
			

		},
		unsafeForm: function(frmObj, callback) {
			$(frmObj).find("input:text, textarea").each(function() {
				$(this).val(_tags_replace($(this).val()));
			});
			if (typeof callback == "function")
			{
				callback();
			}
		},
		
		loadScript: function(url, callback) {
			loadScript(url, callback);
		},
		loadCKEditor: function(options_) {
			var options = {
				"toolbar": "light",
				"ckeditor": "/common/ckeditor/ckeditor.js",
				"css": ['/common/css/edit.css'],
				"textarea": "CONTENTS",
				"csrfname":"csrf",
				"csrfvalue":"protect",
				"uploadurl":"/File/Upload",
				"taboptions":{
					"tabcontainer":".tabs",
					"tabselector":".tab ul li",
					"tabcontentselector":".contentdiv",
					"tabactclass":"on"
				},
				"height":"500px"
			}
			
			options = $.extend({}, options , options_);
			var toolbar = null;
			switch(options.toolbar) {
				case "light":
					toolbar = [
									['ajaxsave'],
					                ['Bold', 'Italic', 'Underline', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink' ],
					                ['Cut','Copy','Paste','PasteText','PasteFromWord'],
					                ['Undo','Redo','-','RemoveFormat'],
									["JustifyLeft","JustifyCenter","JustifyRight","JustifyBlock", "Table"],
					                ['Font','FontSize', 'TextColor', 'BGColor' ],
					                ['Maximize', 'Image'],
					                ['Source']
								]
					break;
				case "normal":
					toolbar = [
									["Source","-","Save","NewPage","Preview","-","Templates"],
									["Cut","Copy","Paste","PasteText","PasteFromWord","-","Print", "SpellChecker", "Scayt"],
									["Undo","Redo","-","Find","Replace","-","SelectAll","RemoveFormat"],
									["Form", "Checkbox", "Radio", "TextField", "Textarea", "Select", "Button", "ImageButton", "HiddenField"],
									"/",
									["Bold","Italic","Underline","Strike","-","Subscript","Superscript"],
									["NumberedList","BulletedList","-","Outdent","Indent","Blockquote"],
									["JustifyLeft","JustifyCenter","JustifyRight","JustifyBlock"],
									["Link","Unlink","Anchor"],
									["Image","Flash","Table","HorizontalRule","Smiley","SpecialChar","PageBreak"],
									"/",
									["Styles","Format","Font","FontSize"],
									["TextColor","BGColor"],
									["Maximize", "ShowBlocks","-","About"]
								]
					break;

				default:
					toolbar = [
									["Source","-","Save","NewPage","Preview","-","Templates"],
									["Cut","Copy","Paste","PasteText","PasteFromWord","-","Print", "SpellChecker", "Scayt"],
									["Undo","Redo","-","Find","Replace","-","SelectAll","RemoveFormat"],
									["Form", "Checkbox", "Radio", "TextField", "Textarea", "Select", "Button", "ImageButton", "HiddenField"],
									"/",
									["Bold","Italic","Underline","Strike","-","Subscript","Superscript"],
									["NumberedList","BulletedList","-","Outdent","Indent","Blockquote"],
									["JustifyLeft","JustifyCenter","JustifyRight","JustifyBlock"],
									["Link","Unlink","Anchor"],
									["Image","Flash","Table","HorizontalRule","Smiley","SpecialChar","PageBreak"],
									"/",
									["Styles","Format","Font","FontSize"],
									["TextColor","BGColor"],
									["Maximize", "ShowBlocks","-","About"]
								]

					break;



			}
		    //CKEDITOR.config.contentsCss = options.css;
            //정지만 : 에디터 높이값 추가
			//alert(CKEDITOR.config.height);
			//CKEDITOR.config.height = options.height;
			//alert(CKEDITOR.config.height);
			CKEditorCSRF(options.csrfname, options.csrfvalue);
			var editor = CKEDITOR.replace(options.textarea, { 
						toolbar : toolbar,
						filebrowserUploadUrl : options.uploadurl,
						height:options.height,
						contentsCss:options.css});
			//$("#" + options.textarea + ", [name='" + options.textarea + "']").addCss(options.css);
			// 외부 탭 구현
			var $tabActivity = $("[name='" + options.textarea + "']").parent().find(".tabActivity button");
			$tabActivity.click(function() {
				var num = $tabActivity.index(this);
				//console.log(options.taboptions);
				_CKEditorTabActivity(num, options.textarea, options.taboptions);

			});
			var $popup = $("[name='" + options.textarea + "']").parent().find(".layerpopup button");
			$popup.click(function() {
				var num = $popup.index(this);
				_CKEditorPopup(num, options.textarea); 
			});
			// 외부 탭 구현

		},
		dateFromTo: function(from, to) {
			var dates = $("#" + from + ", #" + to).datepicker({
				//defaultDate: "+1w",
				changeMonth: true, changeYear: true,
				//numberOfMonths: 3,
				onSelect: function (selectedDate) {
					var option = this.id == from ? "minDate" : "maxDate",
					instance = $(this).data("datepicker"),
					date = $.datepicker.parseDate(
						instance.settings.dateFormat ||
						$.datepicker._defaults.dateFormat,
						selectedDate, instance.settings)
					dates.not(this).datepicker("option", option, date);
				}
			});
			return dates;
		},
		checkExtension: function(filePath, allowExtensions) {

			if ($.trim(filePath) != "")
			{
				var ext = filePath.split(".").pop().toLowerCase();

				if ($.inArray(ext, allowExtensions) == -1)
				{
					return false;
				}
			}
			return true;
			
		},
		FileDelete: function(parentObj) {
			var id = $(parentObj).attr("id");


			bootbox.confirm("해당 파일을 삭제하시겠습니까?", function(re) {
				if (re) {
					$.post("/File/Delete", {
						id: id
					}, function(rtnvalue) {
						$(parentObj).remove();
					});
				}
			})

		},
		buildTab: function(selector) {
			$(selector).each(function() {
				var $pobj = $(this);
				var $tabcontents = $(this).next();
				$(this).children().click(function() {
					var tabanchor = $(this).parent().children();
					var idx = tabanchor.index($(this));
					tabanchor.removeClass("on").eq(idx).addClass("on");
					$tabcontents.children().hide().eq(idx).fadeIn();
				});


			});
		},
		DaumPost: function(postcodeId, address1Id) {

			var htmlDiv = "<div id=\"layer\" style=\"display:none;position:fixed;overflow:hidden;z-index:1;-webkit-overflow-scrolling:touch;\"><img src=\"//i1.daumcdn.net/localimg/localimages/07/postcode/320/close.png\" id=\"btnCloseLayer\" style=\"cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1\" onclick=\"closeDaumPostcode()\" alt=\"닫기 버튼\"></div>";
			$(htmlDiv).insertBefore($("#"+postcodeId));
			var element_layer = document.getElementById('layer');
			new daum.Postcode({
				oncomplete: function(data) {
					// 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

					// 각 주소의 노출 규칙에 따라 주소를 조합한다.
					// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
					var fullAddr = data.address; // 최종 주소 변수
					var extraAddr = ''; // 조합형 주소 변수

					// 기본 주소가 도로명 타입일때 조합한다.
					if(data.addressType === 'R'){
						//법정동명이 있을 경우 추가한다.
						if(data.bname !== ''){
							extraAddr += data.bname;
						}
						// 건물명이 있을 경우 추가한다.
						if(data.buildingName !== ''){
							extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
						}
						// 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
						fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
					}
					// 우편번호와 주소 정보를 해당 필드에 넣는다.
					document.getElementById(postcodeId).value = data.zonecode; //5자리 새우편번호 사용
					document.getElementById(address1Id).value = fullAddr;
					//document.getElementById('sample2_addressEnglish').value = data.addressEnglish;

					// iframe을 넣은 element를 안보이게 한다.
					// (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
					element_layer.style.display = 'none';
				},
				width : '100%',
				height : '100%'
			}).embed(element_layer);

			// iframe을 넣은 element를 보이게 한다.
			element_layer.style.display = 'block';

			// iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
			//initLayerPosition();

			var width = 300; //우편번호서비스가 들어갈 element의 width
			var height = 460; //우편번호서비스가 들어갈 element의 height
			var borderWidth = 5; //샘플에서 사용하는 border의 두께

			// 위에서 선언한 값들을 실제 element에 넣는다.
			element_layer.style.width = width + 'px';
			element_layer.style.height = height + 'px';
			element_layer.style.border = borderWidth + 'px solid';
			// 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
			element_layer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/2 - borderWidth) + 'px';
			element_layer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';

		},

		CKEditorFormSubmit:function(options_) {

			var options = {
				form: document.forms[0],
				message: "해당 컨텐츠를 업데이트하시겠습니까?",
				success: function () {
					document.forms[0].submit();
				},
				cancel: function () {
					
				}
			}
			options = $.extend({}, options , options_);

			_CKEditorUpdateElement(options.form, function () {
				bootbox.confirm(options.message, function (re) {
					if (re) {
						options.success();
					} else {
						_CKEditorReverseElement(options.form);
						options.cancel();
					}
				});
			});

		},
		BarCharts:function(id,options_) {
			var options = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    type: 'category'//,
                    /*labels: {
                        rotation: 0,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }*/
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '%'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Population in 2008: <b>{point.y:.1f} millions</b>'
                },            
				credits: {
                enabled: false
				},
				exporting: { enabled: false },
                series: [{
                    name: 'Population',
                    data: [
                        ['Shanghai', 23.7],
                        ['Lagos', 16.1],
                        ['Mexico City', 8.9],
                        ['Lima', 8.9]
                    ],
                    dataLabels: {
                        enabled: true,
                        rotation: 0,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.1f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
			};
			options = $.extend({}, options , options_);

			Highcharts.chart(id, options);
		},
		PieCharts:function(id, options_) {
			var options ={
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false,
					type: 'pie'
				},
				title: {
					text: ''
				},
				tooltip: {
					pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: false
						},
						showInLegend: true
					}
				},
				credits: {
                enabled: false
				},
				exporting: { enabled: false },
				series: [{
					name: 'Brands',
					colorByPoint: true,
					data: [{
						name: 'Microsoft Internet Explorer',
						y: 56.33
					}, {
						name: 'Chrome',
						y: 24.03,
						sliced: true,
						selected: true
					}, {
						name: 'Firefox',
						y: 10.38
					}, {
						name: 'Safari',
						y: 4.77
					}, {
						name: 'Opera',
						y: 0.91
					}, {
						name: 'Proprietary or Undetectable',
						y: 0.2
					}]
				}]
			}
			options = $.extend({}, options , options_);

			Highcharts.chart(id, options);


		},
		ByteCheck: function(str) {

			return _ByteCheck(str);
		},
		LayerPopUpMobile: function($obj, layerpopup, content) {
				jQuery(layerpopup).show();
				jQuery(content).css("top", jQuery(".globalTop .btn").offset().top);
				jQuery("body, html").stop().animate({scrollTop : jQuery(content).offset().top}, 0);

			jQuery(layerpopup).find(".closeBt").off("click").click(function(){
				jQuery(layerpopup).hide();
			});
		},
		LayerPopUp: function($obj, layerpopup, content) {
			$focusObjectAfterPopUpClose = $obj;
			var $blackBg = $(".blackBg");
			$obj.each(function() {
				var layerPopup = layerpopup;//$(this).attr("data-layerpopup");
				var layerPopupContent = content;//$(this).attr("data-layerpopupcontent");
				var $that = $(this);

			    //PC수출국 레이어 팝업이벤트
                if ($obj.hasClass('exportNBt')) {
				    $("#wrap").css({
				        position: "fixed",
				        overflowY: "scroll"
				    });
				    $(".tabBtList li").each(function () {
				        $(this).find("a").click(function () {
				            $(".tabBtList li a").removeClass("on");
				            $(this).addClass("on");
				            $(this).focus();
				        })
				    })
				}


				var $detachedLayer = $(layerPopup).detach();
				$(".commonlayerpopup").append($detachedLayer.clone(true).show()).show();
				var $layerPopup = $(layerPopup);
				if (!$layerPopup.hasClass("initialize")) {
					_EditorTab();
					$layerPopup.addClass("initialize");
				}
				/*
				//....
				var $detachedLayer = $(layerPopup).detach();
				var $layerPopup = $(".commonlayerpopup").append($detachedLayer.clone(true).show());
				$(".backuplayer").html("").append($detachedLayer.clone(true));
				*/
					var PopHeight = $layerPopup.height() / 2;
					var PopWidth = $layerPopup.width() / 2;
					var scrollNum = $(window).scrollTop();
					$blackBg.attr("data-scroll", scrollNum);
		            /*$("#wrap").css({
		                position: "fixed",
		                overflowY: "scroll",
		                top: -scrollNum
		            })*/
		            $layerPopup.css({
		                display: "block",
		                top: ($(window).height() / 2) - PopHeight + scrollNum - 40,
		                left: ($(window).width() / 2) - PopWidth - 40
		            });
		            $(".blackBg").css("height", "100%")
		            $(".blackBg").fadeIn(300);
		            $layerPopup.attr("tabIndex", 0).focus();
			});
		},
		GetNowLocknLock:function(root) {
			_GetInstagram(root);
			_GetFaceBook(root);
			_GetSupporters(root);
			_GetNaverBlog(root);

		},
		Search: function (frm) {
		    /**
		    var query = frm.usersearch.value; query = query.trim();
		    if (query != "") {
		        location.href = "/search/" + query;
		    } else {
		        alert("검색어를 입력하여 주세요.");
		    }
            **/
		    if ($(frm).attr("data-mobile") == "1" || $(frm).attr("name") == "searchpage") {
		        var query = $(frm).find("input[name='usersearch']").val(); query = query.trim();
		        query = _safe_search_keyword(query);
		        location.href = "/search/" + query;
		        return false;
		    } else {
		        if ($(".hSrchIp").css("display") != "block") {
		            $(".hSrchBt").css({
		                position: 'absolute',
		                zIndex: 1
		            })
		            $(".hSrchBt").animate({ right: 45 }, 100, "easeOutCubic")
		            $(".hSrchBt").addClass("click");
		            $(".hSrchIp").css("display", "block")
		            $(".hSrchClose").css("display", "block")
		            $(".hSrchIp").animate({ width: 386 }, 100, "easeOutCubic", function () {
		                $(".hSrchClose").animate({ opacity: 1 }, 100)
		            })
		        } else {
		            var query = $(frm).find("input[name='usersearch']").val(); query = query.trim();
		            query = _safe_search_keyword(query);
		            location.href = "/search/" + query;
		            return false;
		        }
		    }
		    return false;
		},
		EngSearch: function (frm) {
			if ($(frm).attr("data-mobile") == "1" || $(frm).attr("name")=="searchpage") {
			    var query = $(frm).find("input[name='usersearch']").val(); query = query.trim();	
				query = _safe_search_keyword(query);
				location.href = "/eng/search/" + query;	
				return false;
			} else {
				if ($(".hSrchIp").css("display") != "block") {
					$(".hSrchBt").css({
						position: 'absolute',
						zIndex: 1
					})
					$(".hSrchBt").animate({ right: 45 }, 100, "easeOutCubic")
					$(".hSrchBt").addClass("click");
					$(".hSrchIp").css("display", "block")
					$(".hSrchClose").css("display", "block")
					$(".hSrchIp").animate({ width: 386 }, 100, "easeOutCubic", function () {
						$(".hSrchClose").animate({ opacity: 1 }, 100)
					})
				} else {
					var query = $(frm).find("input[name='usersearch']").val(); query = query.trim();
					query = _safe_search_keyword(query);
					location.href = "/eng/search/" + query;		  
					return false;
				}
			}
		    
		},
		KeyLimit: function(type, event) {
			switch(type) {
				case "number":
					return _keydown_number(event) || _keydown_money(event) || _keydown_utility(event) || _keydown_copypaste(event);
					break;
				case "numberonly":
					if (!event.shiftKey)
						return  _keydown_number(event) || _keydown_utility(event) || _keydown_copypaste(event);
					else
						return false;
					break;
				case "money":
					return _keydown_number(event) || _keydown_money(event) || _keydown_utility(event) || _keydown_copypaste(event);
					break;
				case "moneyonly":
					return  _keydown_number(event) || _keydown_money(event) || _keydown_utility(event) || _keydown_copypaste(event);
					break;
				case "text":
					return (!_keydown_number(event) && !_keydown_specialkey(event) ) || _keydown_utility(event) || _keydown_copypaste(event);
					break;
				default:
					return true;
					break;


			}


		},
		ImageRefresh: function(imgObj) {
			$(imgObj).each(function() {
				var t = Date.now();
				var osrc = $(this).attr("src");
				osrc += osrc.indexOf("?") > 0 ? "&_=" + t : "?_=" + t;
				$(this).attr("src", osrc);

			});

		},
		parameterChange: function (url, param, paramVal) {
		    var newAdditionalURL = "";
		    var tempArray = url.split("?");
		    var baseURL = tempArray[0];
		    var additionalURL = tempArray[1];
		    var temp = "";
		    if (additionalURL) {
		        tempArray = additionalURL.split("&");
		        for (var i = 0; i < tempArray.length; i++) {
		            if (tempArray[i].split('=')[0] != param) {
		                newAdditionalURL += temp + tempArray[i];
		                temp = "&";
		            }
		        }
		    }

		    var rows_txt = temp + "" + param + "=" + paramVal;
		    return baseURL + "?" + newAdditionalURL + rows_txt;
		},
		StyleOnOff: function(OnOff_) {
			for (var instanceName in CKEDITOR.instances) {
				//CKEDITOR.instances[instanceName].updateElement();

				//var obj = CKEDITOR.instances[instanceName];
				//obj["config"].contentsCss = ["/Common/css/edit_eng_m.css"];
				//console.log(instanceName, obj["config"].contentsCss);
				//obj.destroy(true);
				//CKEDITOR.replace(instanceName, { contentCss: ['/common/css/edit_eng_m.css'] });
				var $iframe = $("[name='" + instanceName + "']").parent().find("iframe.cke_wysiwyg_frame");
				var $iframeHead = null;


				var OnOff = OnOff_ != undefined ? OnOff_ : false;
				if ($iframe.size() > 0)
					$iframeHead = $iframe.contents().find("head");
				if ($iframeHead != null && $iframeHead.size() > 0) {

					var $styles = $iframeHead.find("link");
					$styles.each(function () {
						var cssurl = $(this).attr("href");
						//console.log(cssurl);
						if (cssurl.toLowerCase().indexOf("/common/css/") > -1) {
							if (OnOff) {
								//스타일On
								$(this).attr("href", cssurl.replace("_edit", "edit"));
							} else {
								//스타일Off
								$(this).attr("href", cssurl.replace("_edit", "edit").replace("edit", "_edit"));
							}
						}
					});
				}
			}
		}
	};
}();




Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
 
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};


var DateDiff = {

    inDays: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(24*3600*1000));
    },

    inWeeks: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(24*3600*1000*7));
    },

    inMonths: function(d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return (d2M+12*d2Y)-(d1M+12*d1Y);
    },

    inYears: function(d1, d2) {
        return d2.getFullYear()-d1.getFullYear();
    }
}


function _alert(msg) {
	if (typeof bootbox != "undefined")
		bootbox.alert(msg);
	else
		alert(msg);
}

/** 
* string String::cutByte(int len)
* 글자를 앞에서부터 원하는 바이트만큼 잘라 리턴합니다.
* 한글의 경우 2바이트로 계산하며, 글자 중간에서 잘리지 않습니다.
*/
String.prototype.cutByte = function(len) {
	var str = this;
	var count = 0;
	 
	for(var i = 0; i < str.length; i++) {
		if(escape(str.charAt(i)).length >= 4)
			count += 2;
		else
			if(escape(str.charAt(i)) != "%0D")
				count++;


		if(count >  len) {
			if(escape(str.charAt(i)) == "%0A")
				i--;
			break;		
		}
	}
	return str.substring(0, i);
}

/** 
* bool String::byte(void)
* 해당스트링의 바이트단위 길이를 리턴합니다. (기존의 length 속성은 2바이트 문자를 한글자로 간주합니다)
*/
String.prototype.byte = function() {
	var str = this;
        var length = 0; 
	for(var i = 0; i < str.length; i++)
	{
		if(escape(str.charAt(i)).length >= 4)
			length += 2;
		else if(escape(str.charAt(i)) == "%A7")
			length += 2;
		else
			if(escape(str.charAt(i)) != "%0D")
				length++;
	}
        return length; 
}










$(function(){
	//input에 numberOnly="true" 설정해주면 숫자만 들어감.
	$("input:text[numberOnly]").each(function(){
		$(this).attr("style",$(this).attr("style") + " ime-mode: disabled");
	});
	$(document).on("keydown", "input:text[numberOnly]", function(event) {
		event = event || window.event;
		var keyID = (event.which) ? event.which : event.keyCode;
		if( ( keyID >=48 && keyID <= 57 ) || ( keyID >=96 && keyID <= 105 ) || keyID == 8 || keyID == 9 || keyID == 46 || keyID == 37 || keyID == 39 ) {	//<-. delete, 왼쪽, 오른쪽 화살표, 탭 추가
	  	} else {
	    	return false;
	  	}
	});
});

$(window).load(function(){
	/*
	$(".content img").each(function(){
		var maxWidth = 670; // Max width for the image
		var maxHeight = 1000;    // Max height for the image
		var ratio = 0;  // Used for aspect ratio
	    var width = $(this).width();    // Current image width
	    var height = $(this).height();  // Current image height

	    //console.log($(this).attr("src") + " : " + width + ", " + height);
	    // Check if the current width is larger than the max
		if(width > maxWidth){
    		ratio = maxWidth / width;   // get ratio for scaling image
        	$(this).css("width", maxWidth); // Set new width
        	$(this).css("height", height * ratio);  // Scale height based on ratio
        	height = height * ratio;    // Reset height to match scaled image
    	}

    	// Check if current height is larger than max
	    if(height > maxHeight){
	        ratio = maxHeight / height; // get ratio for scaling image
	        $(this).css("height", maxHeight);   // Set new height
	        if(width * ratio > maxWidth){
	        	$(this).css("width", maxWidth);    // Scale width based on ratio
	        }else{
	        	$(this).css("width", width * ratio);    // Scale width based on ratio
	        }
        	
        	width = width * ratio;    // Reset width to match scaled image
    	}
	});*/
});