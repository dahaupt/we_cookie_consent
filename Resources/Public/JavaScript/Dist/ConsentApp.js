"use strict";function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var ConsentApp=new function(){window.dataLayer=window.dataLayer||[],this.consentChanged=function(a,b){!0===a&&-1!==b.name.indexOf("google-tagmanager-service")&&window.dataLayer.push(_defineProperty({event:b.gtm.trigger},b.gtm.variable,!0)),"function"==typeof window[b.ownCallback]?window[b.ownCallback](a,b):""!==b.ownCallback&&console.error("The Callback function "+b.ownCallback+" is not yet defined. Please create it first.")},this.checkConsentOptIn=function(a,b,c,d){a?(d.find(".service-opt-in").remove(),c.show()):(c.hide(),d.prepend(this.createConsentOptInContainer(b)),$("button[data-optin=\""+b.name+"\"]").click(function(){klaro.getManager().updateConsent(b.name,!0),$("input[data-optin-always=\""+b.name+"\"]").is(":checked")?klaro.getManager().saveAndApplyConsents():klaro.getManager().applyConsents()}))},this.createConsentOptInContainer=function(a){return"<div data-service=\"".concat(a.name,"\" class=\"service-opt-in\">\n            <p class=\"lead\">").concat(a.title,"</p>\n            ").concat(a.optInText,"\n            <button class=\"btn btn-primary btn-sm\" data-optin=\"").concat(a.name,"\">").concat(klaroConfig.translations.en.activate,"</button>\n              <div class=\"form-check\">\n                <input id=\"optin-always-").concat(a.name,"\" type=\"checkbox\" class=\"form-check-input\" data-optin-always=\"").concat(a.name,"\" checked>\n                <label for=\"optin-always-").concat(a.name,"\" class=\"form-check-label\">").concat(klaroConfig.translations.en.activateAlways,"</label>\n            </div>\n          </div>")}};
//# sourceMappingURL=ConsentApp.js.map
