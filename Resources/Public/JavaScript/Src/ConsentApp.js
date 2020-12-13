const ConsentApp = new function () {
    //-- global variables ---
    window.dataLayer = window.dataLayer || [];

    //--- public functions ---
    /**
     * Callback function for GoogleTagManager Script to fire the dataLayer trigger
     * @param consent
     * @param service
     */
    this.gtmServiceChanged = function (consent, service) {
        if (consent) {
            window.dataLayer.push({
                event: service.gtm.trigger,
                [service.gtm.variable]: true
            });
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
        if (!consent && $element.length) {
            let hasOptIn = $parentElement.find('.service-opt-in').length > 0;
            if (hasOptIn) {
                return;
            }

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
        const translations = klaroConfig.translations[klaro.language()];

        return `<div data-service="${service.name}" class="service-opt-in">
            <p class="lead">${service.title}</p>
            ${service.optInText}
            <button class="btn btn-primary btn-sm" data-optin="${service.name}">${translations.activate}</button>
              <div class="form-check">
                <input id="optin-always-${service.name}" type="checkbox" class="form-check-input" data-optin-always="${service.name}" checked>
                <label for="optin-always-${service.name}" class="form-check-label">${translations.activateAlways}</label>
            </div>
          </div>`;
    };
};
