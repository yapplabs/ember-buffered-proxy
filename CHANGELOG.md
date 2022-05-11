# Changelog




## v2.1.1 (2022-05-11)

#### :house: Internal
* [#93](https://github.com/yapplabs/ember-buffered-proxy/pull/93) Remove ember-notify-property-change-polyfill ([@fsmanuel](https://github.com/fsmanuel))

#### Committers: 1
- Manuel Wiedenmann ([@fsmanuel](https://github.com/fsmanuel))

## v2.1.0 (2022-05-11)

Drops support for Ember < 3.13. This should have been a major release. Apologies!
#### :rocket: Enhancement
* [#90](https://github.com/yapplabs/ember-buffered-proxy/pull/90) Conditionally choose notifyPropertyChange context based on Ember version ([@fsmanuel](https://github.com/fsmanuel)) Built on original work from @achambers.
* [#87](https://github.com/yapplabs/ember-buffered-proxy/pull/87) Update ember-cli to 3.28 ([@fsmanuel](https://github.com/fsmanuel))

#### :house: Internal
* [#92](https://github.com/yapplabs/ember-buffered-proxy/pull/92) Set timeout for ci jobs ([@fsmanuel](https://github.com/fsmanuel))
* [#91](https://github.com/yapplabs/ember-buffered-proxy/pull/91) Fix ci badge ([@fsmanuel](https://github.com/fsmanuel))

#### Committers: 1
- Manuel Wiedenmann ([@fsmanuel](https://github.com/fsmanuel))


## v2.0.0 (2021-08-03)

#### :boom: Breaking Change
* [#78](https://github.com/yapplabs/ember-buffered-proxy/pull/78) Update ember-cli-babel and set node to minimum of version 12. ([@lukemelia](https://github.com/lukemelia))

#### :house: Internal
* [#78](https://github.com/yapplabs/ember-buffered-proxy/pull/78) Update ember-cli-babel and set node to minimum of version 12. ([@lukemelia](https://github.com/lukemelia))
* [#69](https://github.com/yapplabs/ember-buffered-proxy/pull/69) Update ember version and CI setup ([@lukemelia](https://github.com/lukemelia))

#### Committers: 2
- Luke Melia ([@lukemelia](https://github.com/lukemelia))
- Tomek Nieżurawski ([@tniezurawski](https://github.com/tniezurawski))

## [v2.0.0-beta.0](https://github.com/yapplabs/ember-buffered-proxy/tree/v1.0.1) (2020-01-10)

[Full Changelog](https://github.com/yapplabs/ember-buffered-proxy/compare/v1.0.1...2.0.0-beta.0)

**Breaking changes:**
- Requires Ember v3.8+

**Merged pull requests:**

- Fix buffer notification on changes discard [\#53](https://github.com/yapplabs/ember-buffered-proxy/pull/53) ([tniezurawski](https://github.com/tniezurawski))
- Compatibility section with version breakdown [\#52](https://github.com/yapplabs/ember-buffered-proxy/pull/52) ([tniezurawski](https://github.com/tniezurawski))
- Fix Travis config after upgrading Ember [\#51](https://github.com/yapplabs/ember-buffered-proxy/pull/51) ([tniezurawski](https://github.com/tniezurawski))
- Fix an issue with notifying about changes in Ember 3.13 and upgrade the addon [\#49](https://github.com/yapplabs/ember-buffered-proxy/pull/49) ([tniezurawski](https://github.com/tniezurawski))

## [v1.0.1](https://github.com/yapplabs/ember-buffered-proxy/tree/v1.0.1) (2019-04-09)

[Full Changelog](https://github.com/yapplabs/ember-buffered-proxy/compare/v1.0.0...v1.0.1)

**Merged pull requests:**

- Add additional check for meta.isInitializing \(With node update\) [\#46](https://github.com/yapplabs/ember-buffered-proxy/pull/46) ([lukemelia](https://github.com/lukemelia))

## [v1.0.0](https://github.com/yapplabs/ember-buffered-proxy/tree/v1.0.0) (2018-04-24)

[Full Changelog](https://github.com/yapplabs/ember-buffered-proxy/compare/v1.0.0-beta.0...v1.0.0)

**Merged pull requests:**

- Tweak README and ember-try config [\#38](https://github.com/yapplabs/ember-buffered-proxy/pull/38) ([lukemelia](https://github.com/lukemelia))

## [v1.0.0-beta.0](https://github.com/yapplabs/ember-buffered-proxy/tree/v1.0.0-beta.0) (2018-03-23)

[Full Changelog](https://github.com/yapplabs/ember-buffered-proxy/compare/v0.8.1...v1.0.0-beta.0)

**Merged pull requests:**

- Utilize notifyPropertyChange instead of property\(Will|Did\)Change [\#37](https://github.com/yapplabs/ember-buffered-proxy/pull/37) ([rondale-sc](https://github.com/rondale-sc))

## [v0.8.1](https://github.com/yapplabs/ember-buffered-proxy/tree/v0.8.1) (2017-11-29)

[Full Changelog](https://github.com/yapplabs/ember-buffered-proxy/compare/v0.8.0...v0.8.1)

**Merged pull requests:**

- Remove unnecessary `bower` dependency [\#35](https://github.com/yapplabs/ember-buffered-proxy/pull/35) ([Turbo87](https://github.com/Turbo87))

## [v0.8.0](https://github.com/yapplabs/ember-buffered-proxy/tree/v0.8.0) (2017-11-21)

[Full Changelog](https://github.com/yapplabs/ember-buffered-proxy/compare/v0.7.0...v0.8.0)

**Merged pull requests:**

- Upgrades for cli, source, and deps to 2.15 [\#34](https://github.com/yapplabs/ember-buffered-proxy/pull/34) ([thoov](https://github.com/thoov))
- Update "ember-cli-babel" to v6.6.0 [\#33](https://github.com/yapplabs/ember-buffered-proxy/pull/33) ([Turbo87](https://github.com/Turbo87))

## [v0.7.0](https://github.com/yapplabs/ember-buffered-proxy/tree/v0.7.0) (2017-04-07)

[Full Changelog](https://github.com/yapplabs/ember-buffered-proxy/compare/v0.6.0...v0.7.0)

**Merged pull requests:**

- Upgrade ember-cli and ember to 2.12 [\#31](https://github.com/yapplabs/ember-buffered-proxy/pull/31) ([lukemelia](https://github.com/lukemelia))
- Fix typo in README [\#30](https://github.com/yapplabs/ember-buffered-proxy/pull/30) ([acorncom](https://github.com/acorncom))
- Add .hasChanged\(key\) method [\#29](https://github.com/yapplabs/ember-buffered-proxy/pull/29) ([thoov](https://github.com/thoov))
- Upgrade to ember-cli 2.8 [\#28](https://github.com/yapplabs/ember-buffered-proxy/pull/28) ([thoov](https://github.com/thoov))

## [v0.6.0](https://github.com/yapplabs/ember-buffered-proxy/tree/v0.6.0) (2016-06-01)

[Full Changelog](https://github.com/yapplabs/ember-buffered-proxy/compare/v0.5.1...v0.6.0)

**Merged pull requests:**

- Release 0.6.0 [\#27](https://github.com/yapplabs/ember-buffered-proxy/pull/27) ([blimmer](https://github.com/blimmer))
- Migrate to versionCompatibility flavor ember-try. [\#26](https://github.com/yapplabs/ember-buffered-proxy/pull/26) ([blimmer](https://github.com/blimmer))
- Allow defining additional values at create time. [\#25](https://github.com/yapplabs/ember-buffered-proxy/pull/25) ([blimmer](https://github.com/blimmer))
- Upgrade to ember-cli 2.5 and update to ES2015 [\#24](https://github.com/yapplabs/ember-buffered-proxy/pull/24) ([thoov](https://github.com/thoov))
- fix object literal typo [\#19](https://github.com/yapplabs/ember-buffered-proxy/pull/19) ([miguelcobain](https://github.com/miguelcobain))
- Fix example typo [\#18](https://github.com/yapplabs/ember-buffered-proxy/pull/18) ([knownasilya](https://github.com/knownasilya))
- Show how to get a list of changes on the buffer [\#17](https://github.com/yapplabs/ember-buffered-proxy/pull/17) ([brandonparsons](https://github.com/brandonparsons))

## [v0.5.1](https://github.com/yapplabs/ember-buffered-proxy/tree/v0.5.1) (2015-07-06)

[Full Changelog](https://github.com/yapplabs/ember-buffered-proxy/compare/v0.2.3...v0.5.1)

**Merged pull requests:**

- Fixed deprecations with Ember 1.13.3 [\#13](https://github.com/yapplabs/ember-buffered-proxy/pull/13) ([antramm](https://github.com/antramm))
- document hasChanges [\#11](https://github.com/yapplabs/ember-buffered-proxy/pull/11) ([samselikoff](https://github.com/samselikoff))
- Upgrading packages for ember-cli 0.2 [\#8](https://github.com/yapplabs/ember-buffered-proxy/pull/8) ([thoov](https://github.com/thoov))
- \[Enhancement\] Minor cleanup / refactoring [\#6](https://github.com/yapplabs/ember-buffered-proxy/pull/6) ([thoov](https://github.com/thoov))

## [v0.2.3](https://github.com/yapplabs/ember-buffered-proxy/tree/v0.2.3) (2014-11-18)

[Full Changelog](https://github.com/yapplabs/ember-buffered-proxy/compare/8f60869fba3bb2a55840678b19c101a4299cdc3e...v0.2.3)

**Merged pull requests:**

- Add shorter method aliases [\#5](https://github.com/yapplabs/ember-buffered-proxy/pull/5) ([mitchlloyd](https://github.com/mitchlloyd))
- Use the correct repository url [\#3](https://github.com/yapplabs/ember-buffered-proxy/pull/3) ([marcioj](https://github.com/marcioj))
- \[Enhancement\] Adding the ability to apply or discard a subset of keys [\#2](https://github.com/yapplabs/ember-buffered-proxy/pull/2) ([thoov](https://github.com/thoov))



\* *This Changelog was automatically generated by [github_changelog_generator](https://github.com/github-changelog-generator/github-changelog-generator)*
