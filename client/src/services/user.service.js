import axios from 'axios';

const API_URL = process.env.REACT_APP_API_ENDPOINT;
const getPublicContent = () => {
	// return axios.get(API_URL + 'all');
	return axios.get(`${API_URL}/novels/fetch`);
};

const getUserBoard = () => {
	return axios.get(API_URL + '/user');
};

const getModeratorBoard = () => {
	return axios.get(API_URL + '/mod');
};

const getAdminBoard = () => {
	return axios.get(API_URL + '/admin');
};

const UserService = {
	getPublicContent,
	getUserBoard,
	getModeratorBoard,
	getAdminBoard,
};

export default UserService;
