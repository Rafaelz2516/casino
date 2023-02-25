import { Login } from '../models/login';
import { User } from './../models/user';
import { GET, POST } from './config';

export const loginUser = (body: Login) => POST('/auth/login', body);

export const getUser = (): Promise<User> => GET('/user');
