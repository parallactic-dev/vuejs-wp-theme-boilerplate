import axios from 'axios';

// prevent cross-site request forgery (CSRF)
try {
  axios.defaults.headers.common = {
    'X-CSRF-TOKEN':
      typeof window.WordPress !== 'undefined' ? window.WordPress.csrfToken : '',
    'X-Requested-With': 'XMLHttpRequest'
  };
} catch (e) {
  console.error(e);
}
