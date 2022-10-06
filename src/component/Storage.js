const StorageHelper = {
    get: (key) => {
      try {
        return sessionStorage.getItem(key);
      } catch (e) {
        return undefined;
      }
    },
    set: (key, value) => {
      sessionStorage.setItem(key, value);
    },
    clear: (key) => {
      sessionStorage.removeItem(key);
    },
  };

export default StorageHelper;