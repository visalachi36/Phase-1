// Manages authentication state
export const auth = {
    isAuthenticated: false,
    login(callback) {
      auth.isAuthenticated = true;
      setTimeout(callback, 100); // Simulate async login
    },
    logout(callback) {
      auth.isAuthenticated = false;
      setTimeout(callback, 100);
    },
  };
  