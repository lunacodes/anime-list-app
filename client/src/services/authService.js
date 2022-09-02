import axios from 'axios';

const API_URL = process.env.REACT_APP_API_ENDPOINT;

const register = (firstName, lastName, username, email, password) => {
	return axios.post(`${API_URL}/users/signup`, {
		firstName,
		lastName,
		username,
		email,
		password,
	});
};

const login = (username, password) => {
	return axios
		.post(`${API_URL}/users/authenticate`, {
			username,
			password,
		})
		.then((response) => {
			if (response.data.username) {
				localStorage.setItem('user', JSON.stringify(response.data));
			}

			return response.data;
		});
};

const logout = () => {
	localStorage.removeItem('user');
	return axios.post(`${API_URL}/signout`).then((response) => {
		return response.data;
	});
};

const getCurrentUser = () => {
	return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
	register,
	login,
	logout,
	getCurrentUser,
};

export default AuthService;
