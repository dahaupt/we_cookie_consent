<?php

namespace Websedit\WeCookieConsent\Domain\Model;


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
 * Cookie
 */
class Cookie extends \TYPO3\CMS\Extbase\DomainObject\AbstractEntity
{
    /**
     * Name des Cookies
     * String oder RegEx des Cookie Namens. Diese Cookies werden automatisch gelöscht,
     * wenn der Besucher der Verwendung dieser App nicht zustimmt (z. B. /^_ga_.*$/
     * oder custom_tracker_cookie)
     *
     * @var string
     */
    protected $title = '';

    /**
     * regex
     *
     * @var string
     */
    protected $regex = '';

    /**
     * Beschreibung
     *
     * @var string
     */
    protected $description = '';

    /**
     * maxAge
     *
     * @var string
     */
    protected $maxAge = '';

    /**
     * Returns the title
     *
     * @return string title
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * Sets the title
     *
     * @param string $title
     * @return void
     */
    public function setTitle(string $title)
    {
        $this->title = $title;
    }

    /**
     * Returns the description
     *
     * @return string description
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * Sets the description
     *
     * @param string $description
     * @return void
     */
    public function setDescription(string $description)
    {
        $this->description = $description;
    }

    /**
     * Returns the maxAge
     *
     * @return string maxAge
     */
    public function getMaxAge(): string
    {
        return $this->maxAge;
    }

    /**
     * Sets the maxAge
     *
     * @param string $maxAge
     * @return void
     */
    public function setMaxAge(string $maxAge)
    {
        $this->maxAge = $maxAge;
    }

    /**
     * Returns the regex
     *
     * @return string $regex
     */
    public function getRegex(): string
    {
        return $this->regex;
    }

    /**
     * Sets the regex
     *
     * @param string $regex
     * @return void
     */
    public function setRegex(string $regex)
    {
        $this->regex = $regex;
    }
}
