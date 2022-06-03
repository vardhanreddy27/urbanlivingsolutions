!function(e){"use strict";"undefined"!=typeof wpcf7&&null!==wpcf7&&(wpcf7=e.extend({cached:0,inputs:[]},wpcf7),e(function(){wpcf7.supportHtml5=function(){var t={},a=document.createElement("input");t.placeholder="placeholder"in a;return e.each(["email","url","tel","number","range","date"],function(e,i){a.setAttribute("type",i),t[i]="text"!==a.type}),t}(),e("div.wpcf7 > form").each(function(){var t=e(this);wpcf7.initForm(t),wpcf7.cached&&wpcf7.refill(t)})}),wpcf7.getId=function(t){return parseInt(e('input[name="_wpcf7"]',t).val(),10)},wpcf7.initForm=function(t){var a=e(t);a.submit(function(t){wpcf7.supportHtml5.placeholder||e("[placeholder].placeheld",a).each(function(t,a){e(a).val("").removeClass("placeheld")}),"function"==typeof window.FormData&&(wpcf7.submit(a),t.preventDefault())}),e(".wpcf7-submit",a).after('<span class="ajax-loader"></span>'),wpcf7.toggleSubmit(a),a.on("click",".wpcf7-acceptance",function(){wpcf7.toggleSubmit(a)}),e(".wpcf7-exclusive-checkbox",a).on("click","input:checkbox",function(){var t=e(this).attr("name");a.find('input:checkbox[name="'+t+'"]').not(this).prop("checked",!1)}),e(".wpcf7-list-item.has-free-text",a).each(function(){var t=e(":input.wpcf7-free-text",this),a=e(this).closest(".wpcf7-form-control");e(":checkbox, :radio",this).is(":checked")?t.prop("disabled",!1):t.prop("disabled",!0),a.on("change",":checkbox, :radio",function(){e(".has-free-text",a).find(":checkbox, :radio").is(":checked")?t.prop("disabled",!1).focus():t.prop("disabled",!0)})}),wpcf7.supportHtml5.placeholder||e("[placeholder]",a).each(function(){e(this).val(e(this).attr("placeholder")),e(this).addClass("placeheld"),e(this).focus(function(){e(this).hasClass("placeheld")&&e(this).val("").removeClass("placeheld")}),e(this).blur(function(){""===e(this).val()&&(e(this).val(e(this).attr("placeholder")),e(this).addClass("placeheld"))})}),wpcf7.jqueryUi&&!wpcf7.supportHtml5.date&&a.find('input.wpcf7-date[type="date"]').each(function(){e(this).datepicker({dateFormat:"yy-mm-dd",minDate:new Date(e(this).attr("min")),maxDate:new Date(e(this).attr("max"))})}),wpcf7.jqueryUi&&!wpcf7.supportHtml5.number&&a.find('input.wpcf7-number[type="number"]').each(function(){e(this).spinner({min:e(this).attr("min"),max:e(this).attr("max"),step:e(this).attr("step")})}),e(".wpcf7-character-count",a).each(function(){var t=e(this),i=t.attr("data-target-name"),n=t.hasClass("down"),c=parseInt(t.attr("data-starting-value"),10),s=parseInt(t.attr("data-maximum-value"),10),p=parseInt(t.attr("data-minimum-value"),10),o=function(a){var i=e(a).val().length,o=n?c-i:i;t.attr("data-current-value",o),t.text(o),s&&s<i?t.addClass("too-long"):t.removeClass("too-long"),p&&i<p?t.addClass("too-short"):t.removeClass("too-short")};e(':input[name="'+i+'"]',a).each(function(){o(this),e(this).keyup(function(){o(this)})})}),a.on("change",".wpcf7-validates-as-url",function(){var t=e.trim(e(this).val());t&&!t.match(/^[a-z][a-z0-9.+-]*:/i)&&-1!==t.indexOf(".")&&(t="http://"+(t=t.replace(/^\/+/,""))),e(this).val(t)})},wpcf7.submit=function(t){if("function"==typeof window.FormData){var a=e(t);e(".ajax-loader",a).addClass("is-active"),wpcf7.clearResponse(a);var i=new FormData(a.get(0)),n={id:a.closest("div.wpcf7").attr("id"),status:"init",inputs:[],formData:i};e.each(a.serializeArray(),function(e,t){if("_wpcf7"==t.name)n.contactFormId=t.value;else if("_wpcf7_version"==t.name)n.pluginVersion=t.value;else if("_wpcf7_locale"==t.name)n.contactFormLocale=t.value;else if("_wpcf7_unit_tag"==t.name)n.unitTag=t.value;else if("_wpcf7_container_post"==t.name)n.containerPostId=t.value;else if(t.name.match(/^_wpcf7_\w+_free_text_/)){var a=t.name.replace(/^_wpcf7_\w+_free_text_/,"");n.inputs.push({name:a+"-free-text",value:t.value})}else t.name.match(/^_/)||n.inputs.push(t)}),wpcf7.triggerEvent(a.closest("div.wpcf7"),"beforesubmit",n);e.ajax({type:"POST",url:wpcf7.apiSettings.getRoute("/contact-forms/"+wpcf7.getId(a)+"/feedback"),data:i,dataType:"json",processData:!1,contentType:!1}).done(function(t,i,c){!function(t,a,i,c){n.id=e(t.into).attr("id"),n.status=t.status,n.apiResponse=t;var s=e(".wpcf7-response-output",c);switch(t.status){case"validation_failed":e.each(t.invalidFields,function(t,a){e(a.into,c).each(function(){wpcf7.notValidTip(this,a.message),e(".wpcf7-form-control",this).addClass("wpcf7-not-valid"),e("[aria-invalid]",this).attr("aria-invalid","true")})}),s.addClass("wpcf7-validation-errors"),c.addClass("invalid"),wpcf7.triggerEvent(t.into,"invalid",n);break;case"acceptance_missing":s.addClass("wpcf7-acceptance-missing"),c.addClass("unaccepted"),wpcf7.triggerEvent(t.into,"unaccepted",n);break;case"spam":s.addClass("wpcf7-spam-blocked"),c.addClass("spam"),wpcf7.triggerEvent(t.into,"spam",n);break;case"aborted":s.addClass("wpcf7-aborted"),c.addClass("aborted"),wpcf7.triggerEvent(t.into,"aborted",n);break;case"mail_sent":s.addClass("wpcf7-mail-sent-ok"),c.addClass("sent"),wpcf7.triggerEvent(t.into,"mailsent",n);break;case"mail_failed":s.addClass("wpcf7-mail-sent-ng"),c.addClass("failed"),wpcf7.triggerEvent(t.into,"mailfailed",n);break;default:var p="custom-"+t.status.replace(/[^0-9a-z]+/i,"-");s.addClass("wpcf7-"+p),c.addClass(p)}wpcf7.refill(c,t),wpcf7.triggerEvent(t.into,"submit",n),"mail_sent"==t.status&&(c.each(function(){this.reset()}),wpcf7.toggleSubmit(c)),wpcf7.supportHtml5.placeholder||c.find("[placeholder].placeheld").each(function(t,a){e(a).val(e(a).attr("placeholder"))}),s.html("").append(t.message).slideDown("fast"),s.attr("role","alert"),e(".screen-reader-response",c.closest(".wpcf7")).each(function(){var a=e(this);if(a.html("").attr("role","").append(t.message),t.invalidFields){var i=e("<ul></ul>");e.each(t.invalidFields,function(t,a){if(a.idref)var n=e("<li></li>").append(e("<a></a>").attr("href","#"+a.idref).append(a.message));else n=e("<li></li>").append(a.message);i.append(n)}),a.append(i)}a.attr("role","alert").focus()})}(t,0,0,a),e(".ajax-loader",a).removeClass("is-active")}).fail(function(t,i,n){var c=e('<div class="ajax-error"></div>').text(n.message);a.after(c)})}},wpcf7.triggerEvent=function(t,a,i){var n=e(t),c=new CustomEvent("wpcf7"+a,{bubbles:!0,detail:i});n.get(0).dispatchEvent(c),n.trigger("wpcf7:"+a,i),n.trigger(a+".wpcf7",i)},wpcf7.toggleSubmit=function(t,a){var i=e(t),n=e("input:submit",i);void 0===a?i.hasClass("wpcf7-acceptance-as-validation")||(n.prop("disabled",!1),e(".wpcf7-acceptance",i).each(function(){var t=e(this),a=e("input:checkbox",t);if(!t.hasClass("optional")&&(t.hasClass("invert")&&a.is(":checked")||!t.hasClass("invert")&&!a.is(":checked")))return n.prop("disabled",!0),!1})):n.prop("disabled",!a)},wpcf7.notValidTip=function(t,a){var i=e(t);if(e(".wpcf7-not-valid-tip",i).remove(),e('<span role="alert" class="wpcf7-not-valid-tip"></span>').text(a).appendTo(i),i.is(".use-floating-validation-tip *")){var n=function(t){e(t).not(":hidden").animate({opacity:0},"fast",function(){e(this).css({"z-index":-100})})};i.on("mouseover",".wpcf7-not-valid-tip",function(){n(this)}),i.on("focus",":input",function(){n(e(".wpcf7-not-valid-tip",i))})}},wpcf7.refill=function(t,a){var i=e(t),n=function(t,a){e.each(a,function(e,a){t.find(':input[name="'+e+'"]').val(""),t.find("img.wpcf7-captcha-"+e).attr("src",a);var i=/([0-9]+)\.(png|gif|jpeg)$/.exec(a);t.find('input:hidden[name="_wpcf7_captcha_challenge_'+e+'"]').attr("value",i[1])})},c=function(t,a){e.each(a,function(e,a){t.find(':input[name="'+e+'"]').val(""),t.find(':input[name="'+e+'"]').siblings("span.wpcf7-quiz-label").text(a[0]),t.find('input:hidden[name="_wpcf7_quiz_answer_'+e+'"]').attr("value",a[1])})};void 0===a?e.ajax({type:"GET",url:wpcf7.apiSettings.getRoute("/contact-forms/"+wpcf7.getId(i)+"/refill"),beforeSend:function(e){var t=i.find(':input[name="_wpnonce"]').val();t&&e.setRequestHeader("X-WP-Nonce",t)},dataType:"json"}).done(function(e,t,a){e.captcha&&n(i,e.captcha),e.quiz&&c(i,e.quiz)}):(a.captcha&&n(i,a.captcha),a.quiz&&c(i,a.quiz))},wpcf7.clearResponse=function(t){var a=e(t);a.removeClass("invalid spam sent failed"),a.siblings(".screen-reader-response").html("").attr("role",""),e(".wpcf7-not-valid-tip",a).remove(),e("[aria-invalid]",a).attr("aria-invalid","false"),e(".wpcf7-form-control",a).removeClass("wpcf7-not-valid"),e(".wpcf7-response-output",a).hide().empty().removeAttr("role").removeClass("wpcf7-mail-sent-ok wpcf7-mail-sent-ng wpcf7-validation-errors wpcf7-spam-blocked")},wpcf7.apiSettings.getRoute=function(e){var t=wpcf7.apiSettings.root;return t=t.replace(wpcf7.apiSettings.namespace,wpcf7.apiSettings.namespace+e)})}(jQuery),function(){if("function"==typeof window.CustomEvent)return!1;function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var a=document.createEvent("CustomEvent");return a.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),a}e.prototype=window.Event.prototype,window.CustomEvent=e}()