import { Cookies } from 'react-cookie';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const cookiesObj = new Cookies();

export const apiTransport = async (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data: object = {},
  displayError = false
) => {
  try {
    const config = {
      headers: {
        Authorization: 'Bearer ' + cookiesObj.get('user_jwt'),
      },
      params: method === 'GET' ? data : null,
    };

    const response = await axios({
      method: method,
      url: BACKEND_URL + url,
      headers: config.headers,
      data: method === 'GET' ? null : data,
    });

    return response.data;
  } catch (e) {
    return false;
  }
};