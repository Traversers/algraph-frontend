const storageService = {
  getData: (key) => {
    return JSON.parse(localStorage.getItem(key)) || [];
  },

  setData: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export default storageService;