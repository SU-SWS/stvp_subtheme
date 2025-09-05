# [STVP Subtheme](https://github.com/SU-SWS/stvp_subtheme)
##### Version:  1.0.0

Description
---

STVP Subtheme is a Drupal 9 and is sub theme of Stanford Basic theme that integrates with the [Decanter Project](https://github.com/SU-SWS/decanter).

It incorporates redesign of the following components and paragraphs:

    Pending


Installation
---

Install this theme like any other theme. [See Drupal Documentation](https://www.drupal.org/docs/8/extending-drupal-8/installing-themes)

This theme depends on the [`Components`](https://www.drupal.org/project/components) module to register template
namespaces. If downloading this theme via composer, the module is already downloaded and simply needs to be enabled
before the theme can be enabled.

If using this theme in conjunction with configuration management and doing site install, a patch is included in the
composer.json. Ensure that your project's root composer.json has [patching enabled](https://github.com/cweagans/composer-patches#allowing-patches-to-be-applied-from-dependencies)
or download and patch Drupal Core manually.

Configuration
---

Nothing special needed. Install, enable, and set as the default active theme. Once you have the theme enabled, be sure to check out the appearance settings for additional configuration items.


Troubleshooting
---

If you are experiencing issues with this theme try disabling and clear the cache first. If you are still experiencing issues try posting an issue on the GitHub issues page.

This theme is not intended to be used as an administration theme. Please use something else for that.

Developer
---

Development tools: To build and compile the CSS, Javascript, and Image assets required to make this theme great, you will need to have npm and nvm installed.
Navigate to the root of the theme then.

Run:
```
nvm use
npm install
corepack enable
yarn install
```

This project uses webpack to assemble the assets for this theme. To compile sass, javascript and push all assets in to place:

Run:
```
yarn build
```

Or for development you can watch for changes and compile automatically with:
```
yarn run watch
```