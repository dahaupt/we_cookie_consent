const ConsentApp = new function () {
    //-- global variables ---
    window.dataLayer = window.dataLayer || [];

    //--- public functions ---
    /**
     * Callback function for GoogleTagManager Script to fire the dataLayer trigger
     * @param consent
     * @param service
     */
    this.consentChanged = function (consent, service) {
        if (consent === true) {
            if (service.name.indexOf('google-tagmanager-service') !== -1) {
                window.dataLayer.push({
                    event: service.gtm.trigger,
                    [service.gtm.variable]: true
                });
            }
        }

        //Check if the own callback function is allready defined
        if (typeof window[service.ownCallback] === "function") {
            window[service.ownCallback](consent, service);
        } else if (service.ownCallback !== '') {
            console.error('The Callback function ' + service.ownCallback + ' is not yet defined. Please create it first.');
        }
    };

    /**
     * Evaluates the consent and initiates all further opt-in modifications.
     *
     * @param consent
     * @param service
     * @param $element
     * @param $parentElement
     */
    this.checkConsentOptIn = function (consent, service, $element, $parentElement) {
        if (!consent) {
            $element.hide();
            $parentElement.prepend(this.createConsentOptInContainer(service));

            $('button[data-optin="' + service.name + '"]').click(function () {
                klaro.getManager().updateConsent(service.name, true);

                if ($('input[data-optin-always="' + service.name + '"]').is(':checked')) {
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
     * Creates a service opt-in container based on the provided service.
     *
     * @param service
     * @returns {string}
     */
    this.createConsentOptInContainer = function (service) {
        return `<div data-service="${service.name}" class="service-opt-in">
            <p class="lead">${service.title}</p>
            ${service.optInText}
            <button class="btn btn-primary btn-sm" data-optin="${service.name}">${klaroConfig.translations.en.activate}</button>
              <div class="form-check">
                <input id="optin-always-${service.name}" type="checkbox" class="form-check-input" data-optin-always="${service.name}" checked>
                <label for="optin-always-${service.name}" class="form-check-label">${klaroConfig.translations.en.activateAlways}</label>
            </div>
          </div>`;
    };
};
