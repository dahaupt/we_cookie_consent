# Changelog
All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),

## [1.3.3] - 2020-09-28 - ES
### Added
- .htaccess for the Resources/Private/ Folder
- Extended the documentation about categories
### Fixed
- Link to privacy page in xlf label of default language
- CSS for the floated views

## [1.3.2] - 2020-08-20 - ES
### Fixed
- Classes, Configuration and Resources folder were empty in last TER release

## [1.3.1] - 2020-08-20 - ES
### Added
- README.md
### Fixed
- typo in constants.ts
- replace notation in composer.json
- Classes, Configuration and Resources folder were empty in last TER release

## [1.3.0] - 2020-07-15 - ES
### Added
- Setting - storageMethod (Default: cookie, alternative: localStorage)
- Setting - hideDeclineAll (Default: false)
- Setting - hideLearnMore (Default: false)
### Changed
- Changed Vendor in namespace from 'WE' to 'Websedit' for better compatibility with Composer and Packagist
- Update the klaro library from 0.2.21 to 0.4.28
- Reorder and grouped TypoScript constants in Constants-Editor for better usability.
### Fixed
- Output of sys_category as purpose of an service.

## [1.2.1] - 2020-05-15 - ES
### Fixed
- URI generation for privacy and poweredBy Links if external URIs are used.

## [1.2.0] - 2020-04-23 - ES
### Added
- TYPO3 10 LTS compatibility
### Fixed
- Corrected if condition for iteration in partial "App.html"

## [1.1.1] - 2020-01-23 - ES
### Fixed
- If 'required' is set for a service, overwrite 'preselected' automatically with true

## [1.1.0] - 2020-01-23 - ES
### Added
- TYPO3 7 LTS compatibility
### Changed
- Update the klaro library from 0.2.14 to 0.2.21
- Set correct category in ext_emconf.php
- Replaced h3 with a span in cookie list (for better SEO)
### Fixed
- Typo in constants.ts and setup.ts
- CSS optimizations for the center--floated view 

## [1.0.2] - 2020-01-28 - ES
### Changed
- Update locallang.xlf files

## [1.0.1] - 2020-01-23 - ES
### Changed
- Update the klaro library from initial 0.2.9 to 0.2.14