/* eslint-disable @typescript-eslint/ban-types */
import axios from 'axios';

interface fetchWrapProps {
  method: 'get' | 'post';
  url: string;
  body?: {};
}

const fetchWrap = async ({ method, url, body }: fetchWrapProps) => {
  const jwtToken = sessionStorage.getItem('jwtToken');
  const config = {
    baseURL: 'http://localhost:3333/api',
    headers: {
      Authorization: jwtToken ? `Bearer ${jwtToken}` : '',
    },
  };

  const { data } =
    (method === 'get' && (await axios.get(url, config))) ||
    (method === 'post' && (await axios.post(url, body, config))) ||
    {};
  return data;
};

export const GET = (url: string) => fetchWrap({ method: 'get', url });

export const POST = (url: string, body?: {}) =>
  fetchWrap({ method: 'post', url, body });
