/* eslint-disable @typescript-eslint/ban-types */
import axios from 'axios';

interface fetchWrapProps {
  method: 'get' | 'post';
  url: string;
  body?: {};
  signal?: AbortSignal;
}

const fetchWrap = async ({ method, url, body, signal }: fetchWrapProps) => {
  const jwtToken = sessionStorage.getItem('jwtToken');
  const config = {
    baseURL: 'http://localhost:3333/api',
    headers: {
      Authorization: jwtToken ? `Bearer ${jwtToken}` : '',
    },
    signal: signal,
  };

  const { data } =
    (method === 'get' && (await axios.get(url, config))) ||
    (method === 'post' && (await axios.post(url, body, config))) ||
    {};
  return data;
};

export const GET = (url: string, signal?: AbortSignal) =>
  fetchWrap({ method: 'get', url, signal });

export const POST = (url: string, body?: {}) =>
  fetchWrap({ method: 'post', url, body });
