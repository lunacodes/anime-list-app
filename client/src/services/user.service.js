import axios from 'axios';

const API_URL = 'http://localhost:3000/users/';

const getPublicContent = () => {
	// return axios.get(API_URL + 'all');
	return axios.get('http://localhost:8081/novels/fetch');
};

const getUserBoard = () => {
	return axios.get(API_URL + 'user');
};

const getModeratorBoard = () => {
	return axios.get(API_URL + 'mod');
};

const getAdminBoard = () => {
	return axios.get(API_URL + 'admin');
};

const UserService = {
	getPublicContent,
	getUserBoard,
	getModeratorBoard,
	getAdminBoard,
};

export default UserService;
