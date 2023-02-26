import { CreateUser } from '../models/create-user';
import { CreateBet } from '../models/game';
import { Login } from '../models/login';
import { User } from './../models/user';
import { GET, POST } from './config';

export const loginUser = (body: Login) => POST('/auth/login', body);

export const getUser = (): Promise<User> => GET('/user');

export const registerUser = (body: CreateUser) => POST('/user/register', body);

export const createBet = (body: CreateBet) => POST('/user/createBet', body);
