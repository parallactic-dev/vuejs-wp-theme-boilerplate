# vuejs WordPress Theme Boilerplate

This is a boilerplate WordPress theme based on vuejs. 

Instead of having static renderade pages by WordPress this theme uses WordPress headless and acts as single page application. Data is fetched via WP REST API from the cms but with no need of physical separation of front- and backend.

## Features

- [VueRouter](https://github.com/vuejs/vue-router)
- [Vuex](https://github.com/vuejs/vuex)
- [Axios](https://github.com/axios/axios)
- Browsersync for development
- SCSS support
- Basic setup and components
- Adds `menus` REST endpoint


## Getting started

1. **Clone** the repo inside your `wp-content/themes/` directory
2. **Navigate to the theme directory in your terminal** and run
   `npm install`
   `npm run watch` for development
   `npm run build` when you're ready to deploy the theme.
3. **Activate the theme** in your WordPress instance.

## Code Organization

All of the code you are going to edit is located in `/src/`.

- `/src`
  - `/api` for API requests
  - `/assets` for images mostly
  - `/components` vue components
  - `/pages` vue components representing router pages
  - `/router` vue-router directives
  - `/store` vuex store and modules
  - `/styles` static css styles and sass mixins
  - `/vendor` 3rd party scripts and libraries

All scripts and styles in `/src` are compiled down to the `/dist` directory, which is what you will deploy. **When you're ready to deploy don't deploy the src/ directory.**


## External References

- [Creating Vuex Modules](https://vuex.vuejs.org/en/modules.html)
- [vue-router](https://github.com/vuejs/vue-router)
- [WordPress REST API](http://v2.wp-api.org/)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)


### Credits

This project is inspired by [EvanAgee's vuejs-wordpress-theme-starter](https://github.com/EvanAgee/vuejs-wordpress-theme-starter)
