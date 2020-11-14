"use strict";var ConsentApp=new function(){window.dataLayer=window.dataLayer||[];var a,b=0;this.consentChanged=function(a,b){if(!0===a&&-1!==b.name.indexOf("google-tagmanager-service")){var c={event:b.gtm.trigger};c[b.gtm.variable]=!0,window.dataLayer.push(c)}"function"==typeof window[b.ownCallback]?window[b.ownCallback](a,b):""!==b.ownCallback&&console.error("The Callback function "+b.ownCallback+" is not yet defined. Please create it first.")},this.cloneButton=function(){if(0<$(".cookie-notice .cm-btn-success").length){var c=$(".cookie-notice .cm-btn-success"),d=c.clone(),e=$(".cookie-notice p a");c.replaceWith(d),$(".cn-body p:first").html(function(a,b){var c=$("<a>",{text:klaroConfig.translations.en.consentModal.privacyPolicy.name,title:klaroConfig.translations.en.consentModal.privacyPolicy.name,href:klaroConfig.privacyPolicy,class:"privcyPage"});return b.replace("[privacyPage]",c[0].outerHTML)}),clearInterval(a),b=0}1e3<b&&clearInterval(a),b++},this.checkConsentOptIn=function(a,b,c,d){a?(d.find(".service-opt-in").remove(),c.show()):(c.hide(),d.prepend(this.createConsentOptInContainer(b)),$("button[data-optin=\""+b.name+"\"]").click(function(){klaro.getManager().updateConsent(b.name,!0),$("input[data-optin-always=\""+b.name+"\"]").is(":checked")?klaro.getManager().saveAndApplyConsents():klaro.getManager().applyConsents()}))},this.createConsentOptInContainer=function(a){return"<div data-service=\"".concat(a.name,"\" class=\"service-opt-in\">\n            <p class=\"lead\">").concat(a.title,"</p>\n            ").concat(a.optInText,"\n            <button class=\"btn btn-primary btn-sm\" data-optin=\"").concat(a.name,"\">").concat(klaroConfig.translations.en.activate,"</button>\n              <div class=\"form-check\">\n                <input id=\"optin-always-").concat(a.name,"\" type=\"checkbox\" class=\"form-check-input\" data-optin-always=\"").concat(a.name,"\" checked>\n                <label for=\"optin-always-").concat(a.name,"\" class=\"form-check-label\">").concat(klaroConfig.translations.en.activateAlways,"</label>\n            </div>\n          </div>")},function(){$(document).ready(function(){$(".js-showConsentModal").on("click",function(a){a.preventDefault(),klaro.show()}),$(document).on("click","div.cm-bg, button.hide",function(a){a.preventDefault(),ConsentApp.cloneButton()}),!1===klaro.getManager().confirmed&&($(document).on("click",".cookie-notice .cm-btn-success",function(){klaroConfig.services.forEach(function(a,b){klaroConfig.services[b]["default"]=klaroConfig.services[b].defaultIfNoConsent}),klaro.getManager().resetConsents(),klaro.getManager().saveAndApplyConsents(),$(".cookie-notice ").remove()}),a=setInterval(ConsentApp.cloneButton,1))})}()};
//# sourceMappingURL=ConsentApp.js.map
