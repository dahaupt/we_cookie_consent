plugin.tx_wecookieconsent_pi1 {
    view {
        templateRootPaths {
            0 = EXT:we_cookie_consent/Resources/Private/Templates/
            10 = EXT:we_template/Resources/Private/Templates/we_cookie_consent/
            20 = {$plugin.tx_wecookieconsent_pi1.view.templateRootPath}
        }

        partialRootPaths {
            0 = EXT:we_cookie_consent/Resources/Private/Partials/
            10 = EXT:we_template/Resources/Private/Partials/we_cookie_consent/
            20 = {$plugin.tx_wecookieconsent_pi1.view.partialRootPath}
        }

        layoutRootPaths {
            0 = EXT:we_cookie_consent/Resources/Private/Layouts/
            10 = EXT:we_template/Resources/Private/Layouts/we_cookie_consent/
            20 = {$plugin.tx_wecookieconsent_pi1.view.layoutRootPath}
        }
    }

    persistence {
        storagePid = {$plugin.tx_wecookieconsent_pi1.persistence.storagePid}
    }

    features {
        skipDefaultArguments = 1
        ignoreAllEnableFieldsInBe = 0
        requireCHashArgumentForActionArguments = 1
    }

    mvc {
        callDefaultActionIfActionCantBeResolved = 1
    }

    settings {
        klaro {
            elementID = {$plugin.tx_wecookieconsent_pi1.settings.klaro.elementID}
            storageMethod = {$plugin.tx_wecookieconsent_pi1.settings.klaro.storageMethod}
            cookieName = {$plugin.tx_wecookieconsent_pi1.settings.klaro.cookieName}
            cookieExpiresAfterDays = {$plugin.tx_wecookieconsent_pi1.settings.klaro.cookieExpiresAfterDays}
            privacyPolicy = {$plugin.tx_wecookieconsent_pi1.settings.klaro.privacyPolicy}
            default = {$plugin.tx_wecookieconsent_pi1.settings.klaro.default}
            mustConsent = {$plugin.tx_wecookieconsent_pi1.settings.klaro.mustConsent}
            hideDeclineAll = {$plugin.tx_wecookieconsent_pi1.settings.klaro.hideDeclineAll}
            hideLearnMore = {$plugin.tx_wecookieconsent_pi1.settings.klaro.hideLearnMore}
            poweredBy = {$plugin.tx_wecookieconsent_pi1.settings.klaro.poweredBy}
            lang = {$plugin.tx_wecookieconsent_pi1.settings.klaro.lang}
            stylePrefix = {$plugin.tx_wecookieconsent_pi1.settings.klaro.stylePrefix}
        }
    }
}

module.tx_wecookieconsent_web_wecookieconsentmod1 {
    persistence {
        storagePid = {$module.tx_wecookieconsent_mod1.persistence.storagePid}
    }

    view {
        templateRootPaths {
            0 = EXT:we_cookie_consent/Resources/Private/Backend/Templates/
            10 = EXT:we_template/Resources/Private/Templates/Backend/we_cookie_consent/
            20 = {$module.tx_wecookieconsent_mod1.view.templateRootPath}
        }

        partialRootPaths {
            0 = EXT:we_cookie_consent/Resources/Private/Backend/Partials/
            10 = EXT:we_template/Resources/Private/Partials/Backend/we_cookie_consent/
            20 = {$module.tx_wecookieconsent_mod1.view.partialRootPath}
        }

        layoutRootPaths {
            0 = EXT:we_cookie_consent/Resources/Private/Backend/Layouts/
            10 = EXT:we_template/Resources/Private/Layouts/Backend/we_cookie_consent/
            20 = {$module.tx_wecookieconsent_mod1.view.layoutRootPath}
        }
    }
}

page {
    #Include Cookie Consent on every page
    525304800 < tt_content.list.20.wecookieconsent_pi1

    includeCSS {
        we_cookie_consent_style = EXT:we_cookie_consent/Resources/Public/Stylesheet/style.css
    }

    //Not compatible with the TYPO3 7 output because of the missing renderAssetsForRequest function. Can be reactivited if support for TYPO3 7 is dropped
    #includeJSFooter {
    #    we_cookie_consent_controller = EXT:we_cookie_consent/Resources/Public/JavaScript/Controller/ConsentController.js
    #}
}

#Disable mustConsent feature on the privacy page, else the privacy policy can't be read.
//[page["uid"] == {$plugin.tx_wecookieconsent_pi1.settings.klaro.privacyPolicy}] //TYPO3 9 Condition Syntax
[page|uid = {$plugin.tx_wecookieconsent_pi1.settings.klaro.privacyPolicy}]
	plugin.tx_wecookieconsent_pi1 {
		settings {
			klaro {
				mustConsent = 0
			}
		}
	}
[GLOBAL]

#Override locallang.xlf Labels
#config.tx_extbase._LOCAL_LANG {
#    default {
#        klaro\.poweredBy = EXT:we_cookie_consent
#        klaro\.consentNotice\.description = My custom message
#    }
#    de {
#        klaro\.poweredBy = EXT:we_cookie_consent
#        klaro\.consentNotice\.description = Mein eigener Text
#    }
#}