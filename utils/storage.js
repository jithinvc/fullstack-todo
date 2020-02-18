/**
 * Created by jithin on 02/02/20.
 */
const asyncLocalStorage = {
  setItem: (key, value) => {
    return Promise.resolve().then(() => {
      localStorage.setItem(key, value);
    });
  },
  getItem: key => {
    return Promise.resolve().then(() => {
      return localStorage.getItem(key);
    });
  },
  removeItem: key => {
    return Promise.resolve().then(() => {
      return localStorage.removeItem(key);
    });
  },
};

export default asyncLocalStorage;
