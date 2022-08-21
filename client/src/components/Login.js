import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/js/bootstrap.min.js';
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

const Login = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [userContext, setUserContext] = useContext(UserContext);

	const formSubmitHandler = (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError('');

		const genericErrorMessage = 'Something went wrong! Please try again later.';

		// const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3001';
		const apiEndpoint = 'https://my-light-novels.herokuapp.com/login';

		fetch(apiEndpoint, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: email, password }),
		})
			.then(async (response) => {
				setIsSubmitting(false);

				if (!response.ok) {
					if (response.status === 400) {
						setError('Please fill out all the fields correctly!');
					} else if (response.status === 401) {
						setError('Invalid email and password combination.');
					} else {
						setError(genericErrorMessage);
					}
				} else {
					const data = await response.json();
					setUserContext((oldValues) => {
						return { ...oldValues, token: data.token };
					});
				}
			})
			.catch((error) => {
				setIsSubmitting(false);
				setError(genericErrorMessage);
			});
	};

	return (
		<>
			{error && <Alert variant='danger'>{error}</Alert>}
			<p>
				If you are currently seeing this form, feel free to enter{' '}
				<span className='highlight'>user@example.com</span> and{' '}
				<span className='highlight'>pass</span> as the credentials. You can also
				register your own account, via the Register tab
			</p>

			<Form onSubmit={formSubmitHandler} className='auth-form'>
				<FormGroup>
					<Label for='email'>Email</Label>
					<Input
						id='email'
						placeholder='Email'
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label for='password'>Password</Label>
					<Input
						id='password'
						placeholder='Password'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</FormGroup>
				<Button
					variant='primary'
					disabled={isSubmitting}
					text={`${isSubmitting ? 'Signing In' : 'Sign In'}`}
					type='submit'
				>
					Sign In
				</Button>
			</Form>
		</>
	);
};

export default Login;
