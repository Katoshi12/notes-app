import axios from 'axios';

axios.defaults.baseURL = 'https://dist.nd.ru/api';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;
