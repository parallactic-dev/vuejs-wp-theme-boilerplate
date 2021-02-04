import axios from 'axios';
import SETTINGS from '../settings';

export default {
  getCategories(callback) {
    axios
      .get(
        SETTINGS.API_BASE_PATH +
          'categories?sort=name&hide_empty=true&per_page=50'
      )
      .then(response => {
        callback(response.data.filter(category => category.name !== 'Uncategorized'));
      })
      .catch(e => {
        callback(e);
      });
  },

  getPages(callback) {
    axios
      .get(SETTINGS.API_BASE_PATH + 'pages?per_page=10')
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        callback(error);
      });
  },

  getPage(slug, callback) {
    if(!slug) {
      return false;
    }

    axios
      .get(SETTINGS.API_BASE_PATH + `pages?slug=${slug}`)
      .then(response => {
        response.data.length > 0 
          ? callback(response.data[0])
          : callback(null);
      })
      .catch(error => {
        callback(error);
      });
  },

  getPosts(limit = 5, callback) {
    axios
      .get(SETTINGS.API_BASE_PATH + 'posts?per_page=' + limit)
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        callback(error);
      });
  },

  getMenus(callback) {
    axios
      .get(SETTINGS.API_BASE_PATH + `menus`)
      .then(response => {
        response.data 
          ? callback(response.data)
          : callback(null);
      })
      .catch(error => {
        callback(error);
      });
  },

  postContactForm(data, callback) {
    axios
      .post(SETTINGS.API_BASE_PATH + `contact-forms`, data)
      .then(response => {
        response 
          ? callback(response)
          : callback(null);
      })
      .catch(error => {
        callback(error);
      });
  },
};
