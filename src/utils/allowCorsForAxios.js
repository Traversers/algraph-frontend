const allowCorsForAxios = (axios) => {
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
};

export default allowCorsForAxios;
