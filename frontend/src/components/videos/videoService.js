import axios from 'axios';

const api = 'http://192.168.0.100:3500';

axios.interceptors.request.use(
    (config) => {
        config.headers.authorization = `Bearer ${localStorage.getItem('sessionToken')}`;
        return config;
    },
    (err) => {return Promise.reject(err)}
);

export const createVideo = async (video) => await axios.post(`${api}/videos/${localStorage.getItem('sessionUser')}`, video);

export const getVideo = async (id) => await axios.get(`${api}/video/${id}`);

export const getVideos = async _=> await axios.get(`${api}/videos/${localStorage.getItem('sessionUser')}`);

export const updateVideo = async (id, video) => await axios.put(`${api}/videos/${id}`, video);

export const deleteVideo = async (id) => await axios.delete(`${api}/videos/${id}`);

export const updateUser = async (video) => await axios.put(`${api}/user/${localStorage.getItem('sessionUser')}`, video);