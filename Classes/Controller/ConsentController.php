<?php

namespace Websedit\WeCookieConsent\Controller;

use TYPO3\CMS\Core\Page\PageRenderer;
use TYPO3\CMS\Extbase\Domain\Model\Category;
use TYPO3\CMS\Extbase\Persistence\QueryResultInterface;
use TYPO3\CMS\Extbase\Utility\LocalizationUtility;
use Websedit\WeCookieConsent\Domain\Model\Cookie;
use Websedit\WeCookieConsent\Domain\Model\Service;

/***
 *
 * This file is part of the "we_cookie_consent" Extension for TYPO3 CMS.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 *  (c) 2019 Erwin Steinbinder <extensions@websedit.de>, websedit AG
 *
 ***/

/**
 * ConsentController
 */
class ConsentController extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController
{
    /**
     * serviceRepository
     *
     * @var \Websedit\WeCookieConsent\Domain\Repository\ServiceRepository
     */
    protected $serviceRepository = null;

    /**
     * Inject a service repository
     *
     * @param \Websedit\WeCookieConsent\Domain\Repository\ServiceRepository $serviceRepository
     */
    public function injectServiceRepository(\Websedit\WeCookieConsent\Domain\Repository\ServiceRepository $serviceRepository)
    {
        $this->serviceRepository = $serviceRepository;
    }

    /**
     * Generate JSON data for the consent Modal
     *
     * @return void
     */
    public function consentAction()
    {
        $services = $this->serviceRepository->findAll();

        /** @var PageRenderer $pageRenderer */
        $pageRenderer = $this->objectManager->get(\TYPO3\CMS\Core\Page\PageRenderer::class);

        $pageRenderer->addJsFooterInlineCode(
            'klaroConfig',
            'var klaroConfig = ' . $this->klaroConfigBuild($services) . ';',
        );
    }

    /**
     * Show used cookies at the data privacy page
     *
     * @return void
     */
    public function listAction()
    {
        $servicesUids = explode(',', $this->settings['flexforms']['services']);

        $services = [];
        foreach ($servicesUids as $uid) {
            //No custom findByUids function to keep the sorting
            $services[] = $this->serviceRepository->findByUid($uid);
        }

        $this->view->assignMultiple([
            'services' => $services
        ]);
    }

    /**
     * @param \TYPO3\CMS\Extbase\Mvc\RequestInterface $request
     */
    protected function renderAssetsForRequest($request)
    {
        if (!$this->view instanceof \TYPO3Fluid\Fluid\View\TemplateView) {
            return;
        }

        $services = $this->serviceRepository->findAll();

        /** @var PageRenderer $pageRenderer */
        $pageRenderer = $this->objectManager->get(\TYPO3\CMS\Core\Page\PageRenderer::class);

        $variables = [
            'request' => $request,
            'arguments' => $this->arguments,
            'services' => $services,
        ];

        $headerAssets = $this->view->renderSection('HeaderAssets', $variables, true);
        $footerAssets = $this->view->renderSection('FooterAssets', $variables, true);

        if (!empty(trim($headerAssets))) {
            $pageRenderer->addHeaderData($headerAssets);
        }
        if (!empty(trim($footerAssets))) {
            $pageRenderer->addFooterData($footerAssets);
        }
    }

    /**
     * Build the klaro config object used in frontend
     *
     * @param QueryResultInterface $services
     * @return string
     */
    private function klaroConfigBuild(QueryResultInterface $services): string
    {
        if (is_numeric($this->settings['klaro']['privacyPolicy'])) {
            $privacyPage = $this->uriBuilder
                ->reset()
                ->setTargetPageUid((int)$this->settings['klaro']['privacyPolicy'])
                ->build();
        } else {
            $privacyPage = $this->settings['klaro']['privacyPolicy'];
        }

        if (is_numeric($this->settings['klaro']['poweredBy'])) {
            $poweredByPage = $this->uriBuilder
                ->reset()
                ->setTargetPageUid((int)$this->settings['klaro']['poweredBy'])
                ->build();
        } else {
            $poweredByPage = $this->settings['klaro']['poweredBy'];
        }

        $languageCode = $GLOBALS['TYPO3_REQUEST']->getAttribute('language')->getTwoLetterIsoCode();

        $klaroConfig = [
            'elementID' => $this->settings['klaro']['elementID'],
            'storageMethod' => $this->settings['klaro']['storageMethod'],
            'stylePrefix' => $this->settings['klaro']['stylePrefix'],
            'cookieName' => $this->settings['klaro']['cookieName'],
            'cookieExpiresAfterDays' => $this->settings['klaro']['cookieExpiresAfterDays'],
            'default' => $this->settings['klaro']['default'] === '1',
            'mustConsent' => $this->settings['klaro']['mustConsent'] === '1',
            'noticeAsModal' => $this->settings['klaro']['noticeAsModal'] === '1',
            'groupByPurpose' => $this->settings['klaro']['groupByPurpose'] === '1',
            'hideDeclineAll' => $this->settings['klaro']['hideDeclineAll'] === '1',
            'hideLearnMore' => $this->settings['klaro']['hideLearnMore'] === '1',
            'htmlTexts' => true,
            'poweredBy' => $poweredByPage,
            'lang' => $languageCode,
            'translations' => [
                $languageCode => [
                    'privacyPolicyUrl' => $privacyPage,
                    'privacyPolicy' => [
                        'name' => LocalizationUtility::translate('klaro.privacyPolicy.name', 'we_cookie_consent'),
                        'text' => LocalizationUtility::translate('klaro.privacyPolicy.text', 'we_cookie_consent')
                    ],
                    'consentModal' => [
                        'title' => LocalizationUtility::translate('klaro.consentModal.title', 'we_cookie_consent'),
                        'description' => LocalizationUtility::translate('klaro.consentModal.description', 'we_cookie_consent'),
                    ],
                    'consentNotice' => [
                        'description' => LocalizationUtility::translate('klaro.consentNotice.description', 'we_cookie_consent', [$privacyPage]),
                        'learnMore' => LocalizationUtility::translate('klaro.consentNotice.learnMore', 'we_cookie_consent')
                    ],
                    'ok' => LocalizationUtility::translate('klaro.ok', 'we_cookie_consent'),
                    'save' => LocalizationUtility::translate('klaro.save', 'we_cookie_consent'),
                    'acceptSelected' => LocalizationUtility::translate('klaro.save', 'we_cookie_consent'),
                    'decline' => LocalizationUtility::translate('klaro.decline', 'we_cookie_consent'),
                    'poweredBy' => LocalizationUtility::translate('klaro.poweredBy', 'we_cookie_consent'),
                    'activate' => LocalizationUtility::translate('klaro.activate', 'we_cookie_consent'),
                    'activateAlways' => LocalizationUtility::translate('klaro.activateAlways', 'we_cookie_consent')
                ]
            ],
        ];

        /** @var Service $service */
        foreach ($services as $service) {
            $purposes = [];
            /** @var Category $purpose */
            foreach ($service->getCategories() as $purpose) {
                $purposes[] = strtolower($purpose->getTitle());
                $klaroConfig['translations'][$languageCode]['purposes'][strtolower($purpose->getTitle())] = $purpose->getTitle();
            }

            $cookies = [];
            /** @var Cookie $cookie */
            foreach ($service->getCookies() as $cookie) {
                $cookies[] = [$cookie->getTitle(), '/', ''];
            }

            $serviceConfig = [
                'name' => $service->getProvider() . '-' . $service->getUid(),
                'title' => $service->getTitle(),
                'description' => $service->getDescription(),
                'default' => $service->isRequired() || $service->isPreselected(),
                'gtm' => $service->getGtmTriggerName(),
                'variable' => $service->getGtmVariableName(),
                'defaultIfNoConsent' => $service->isState(),
                'required' => $service->isRequired(),
                'optOut' => $service->isOptOut(),
                'purposes' => $purposes,
                'cookies' => $cookies,
                'optInText' => $service->getOptInText()
            ];

            if (strpos($service->getProvider(), 'google-tagmanager-service') !== false) {
                $serviceConfig['callback'] = "#!!ConsentApp.gtmServiceChanged!!#";
            }

            if ($service->getCallback()) {
                $serviceConfig['callback'] = "#!!" . $service->getCallback() . "!!#";
            }

            $klaroConfig['services'][] = $serviceConfig;
        }

        $klaroConfig = json_encode($klaroConfig);

        // Workaround to add JS callback functions to JSON
        $klaroConfig = str_replace('"#!!', '', $klaroConfig);
        $klaroConfig = str_replace('!!#"', '', $klaroConfig);

        return $klaroConfig;
    }
}
