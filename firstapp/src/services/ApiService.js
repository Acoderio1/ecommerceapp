
const ApiService = {
  getProducts : async (qparams) => {
    return await fetch(process.env.REACT_APP_BASE_URL + `/products/get?${qparams}`)
  },

  addProducts : async (value) => {
    return await fetch(process.env.REACT_APP_BASE_URL + '/products/add', {
      method: 'post',
      body: JSON.stringify(value),
      headers: {
        'Content-type' : 'application/json'
      }
     })
  }
}

export default ApiService