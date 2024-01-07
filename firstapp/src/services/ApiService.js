const ApiService = {
  addUser: async (payload) => {
    return await fetch(process.env.REACT_APP_BASE_URL + `/user/register`, {
      method: "post",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  getProducts: async (qparams) => {
    return await fetch(
      process.env.REACT_APP_BASE_URL + `/products/get?${qparams || ""}`
    );
  },

  addProducts: async (value) => {
    return await fetch(process.env.REACT_APP_BASE_URL + "/products/add", {
      method: "post",
      body: JSON.stringify(value),
      headers: {
        "Content-type": "application/json",
      },
    });
  },
};

export default ApiService;
