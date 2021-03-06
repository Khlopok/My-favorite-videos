import axios from 'axios';

const api = 'http://localhost:3500';

export const signup = async (userData) => await axios.post(`${api}/signup`, userData);

export const signin = async (userData) => await axios.post(`${api}/signin`, userData);

export const logout = async _=> await axios.get(`${api}/logout`);