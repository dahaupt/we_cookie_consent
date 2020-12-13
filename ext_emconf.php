<?php
$EM_CONF[$_EXTKEY] = [
    'title' => 'Cookie Consent for TYPO3 – GDPR Optin',
    'description' => 'Cookie Consent Panel (Optin) with DSGVO/GDPR compliant use of cookies. Preconfigured modules for Google Analytics, Facebook and other frequently used services. Arbitrary expandability with tracking scripts that generate cookies on your website. Support of Google Tag Manager and easy export of Google Tag Manager. Third-party cookies and scripts are only loaded when active consent is given. Website visitors can edit their privacy settings at any time. Automatic update of cookie information when new cookies/scripts are inserted with secure consent procedure. Cookies can be automatically added to the privacy policy via a plugin. Multilingual and full support for desktop, tablet and mobile. Four standard modes for displaying the content solution. Based on Klaro!.',
    'category' => 'fe',
    'author' => 'Roman Liedtke, Erwin Steinbinder',
    'author_email' => 'extensions@websedit.de',
    'author_company' => 'websedit AG',
    'state' => 'beta',
    'clearCacheOnLoad' => false,
    'version' => '2.0.0',
    'constraints' => [
        'depends' => [
            'typo3' => '9.5.0-10.4.99',
        ],
    ],
];

