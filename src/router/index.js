import Vue from 'vue';
import Router from 'vue-router';

// Components
import Home from '@/pages/Home.vue';
import Post from '@/pages/Post.vue';
import Page from '@/pages/Page.vue';

Vue.use(Router);

// read the homepage attribute to decide if it's either a static page or the blog overview
const homepage = document.querySelector('body').getAttribute('data-homepage');

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: homepage ? Page : Home,
    },
    {
      // Assuming you're using the default permalink structure for posts
      path: '/:year/:month/:day/:postSlug',
      name: 'Post',
      component: Post,
    },
    {
      path: '/:pageSlug',
      name: 'Page',
      component: Page,
    },
  ],
  mode: 'history',
  base: '',

  // Prevents window from scrolling back to top
  // when navigating between components/views
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.afterEach((to) => { // (to, from)
  // Add a body class specific to the route we're viewing
  let body = document.querySelector('body');

  const slug = !(to.params.postSlug)
    ? to.params.pageSlug
    : to.params.postSlug;
  body.classList.add('page--' + slug);
});

export default router;
