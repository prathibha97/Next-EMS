

import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

let storage: any;

if (typeof window !== 'undefined') {
  // Use createWebStorage in the browser environment
  storage = createWebStorage('local');
} else {
  // Create a minimal storage implementation for non-browser environments
  storage = {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
}

export default storage;
