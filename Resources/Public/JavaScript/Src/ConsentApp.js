const ConsentApp = new function () {
    //-- global variables ---
    window.dataLayer = window.dataLayer || [];

    //--- private variables ---
    var cloneButttonInterval, counter = 0;

    //--- public functions ---
    /**
     * Callback function for GoogleTagManager Script to fire the dataLayer trigger
     * @param bool state
     * @param object app
     */
    this.consentChanged = function (state, app) {
        if (state === true) {
            if (app.name.indexOf('google-tagmanager-service') !== -1) {
                let tempObj = {
                    event: app.gtm.trigger
                };
                tempObj[app.gtm.variable] = true;
                window.dataLayer.push(tempObj);

                /*
                //ES6 - https://stackoverflow.com/questions/11508463/javascript-set-object-key-by-variable
                window.dataLayer.push({
                    event: app.name,
                    [app.name]: true
                });
                */
            }
        }

        //Check if the own callback function is allready defined
        if (typeof window[app.ownCallback] === "function") {
            window[app.ownCallback](state, app);
        } else if (app.ownCallback !== '') {
            console.error('The Callback function ' + app.ownCallback + ' is not yet defined. Please create it first.');
        }
    };

    /**
     * Replace the klaro "OK" button with a clone to remove all attached event listeners.
     * Otherwise our own defined listener gets not fired.
     */
    this.cloneButton = function () {
        if ($('.cookie-notice .cm-btn-success').length > 0) {
            let currentButton = $('.cookie-notice .cm-btn-success');
            let cloneButton = currentButton.clone();
            let configLink = $('.cookie-notice p a');

            //Replace the original button with the new
            currentButton.replaceWith(cloneButton);

            //Workaround to link the privacypage inside the consent text https://github.com/KIProtect/klaro/issues/116
            $('.cn-body p:first').html(function (index, text) {
                let link = $('<a>', {
                    text: klaroConfig.translations.en.consentModal.privacyPolicy.name,
                    title: klaroConfig.translations.en.consentModal.privacyPolicy.name,
                    href: klaroConfig.privacyPolicy,
                    class: 'privcyPage'
                })
                return text.replace("[privacyPage]", link[0].outerHTML);
            });

            clearInterval(cloneButttonInterval);
            counter = 0;
        }

        if (counter > 1000) {
            clearInterval(cloneButttonInterval);
        }
        counter++;
    };

    /**
     * Evaluates the state of the consent and initiates all further opt-in modifications.
     *
     * @param state
     * @param app
     * @param $element
     * @param $parentElement
     */
    this.checkConsentOptIn = function (state, app, $element, $parentElement) {
        if (!state) {
            $element.hide();
            $parentElement.prepend(this.createConsentOptInContainer(app));

            $('button[data-optin="' + app.name + '"]').click(function () {
                klaro.getManager().updateConsent(app.name, true);

                if ($('input[data-optin-always="' + app.name + '"]').is(':checked')) {
                    klaro.getManager().saveAndApplyConsents();
                } else {
                    klaro.getManager().applyConsents();
                }
            });
        } else {
            $parentElement.find('.service-opt-in').remove();
            $element.show();
        }
    };

    /**
     * Creates a service opt-in container based on the provided app.
     *
     * @param app
     * @returns {string}
     */
    this.createConsentOptInContainer = function (app) {
        return `<div data-service="${app.name}" class="service-opt-in">
            <p class="lead">${app.title}</p>
            ${app.optInText}
            <button class="btn btn-primary btn-sm" data-optin="${app.name}">${klaroConfig.translations.en.activate}</button>
              <div class="form-check">
                <input id="optin-always-${app.name}" type="checkbox" class="form-check-input" data-optin-always="${app.name}" checked>
                <label for="optin-always-${app.name}" class="form-check-label">${klaroConfig.translations.en.activateAlways}</label>
            </div>
          </div>`;
    };

    //--- constructor ---
    (function construct() {
        $(document).ready(function () {
            //Workaround if modal ist closed without save
            $(document).on('click', 'div.cm-bg, button.hide', function (event) {
                event.preventDefault();
                ConsentApp.cloneButton();
            });

            //Only execute, if no decision is made yet (first visit).
            if (klaro.getManager().confirmed === false) {
                //Workaround for issue https://github.com/KIProtect/klaro/issues/138
                $(document).on('click', '.cookie-notice .cm-btn-success', function (event) {
                    klaroConfig.services.forEach(function (element, index) {
                        klaroConfig.services[index].default = klaroConfig.services[index].defaultIfNoConsent;
                    });
                    klaro.getManager().resetConsents();
                    klaro.getManager().saveAndApplyConsents();

                    $('.cookie-notice ').remove();
                });

                //Workaround, because there is no klaro callback function
                cloneButttonInterval = setInterval(ConsentApp.cloneButton, 1);
            }
        });
    })();
};
