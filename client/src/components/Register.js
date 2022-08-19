import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import React, { useContext, useState } from 'react';
// import { UserContext } from '@Context/UserContext';

const Register = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const formSubmitHandler = (e) => {
		console.log(e);
	};
	// const [userContext, setUserContext] = useContext(UserContext);

	// 	const formSubmitHandler = (e) => {
	// 		e.preventDefault();
	// 		setIsSubmitting(true);
	// 		setError('');
	//
	// 		const genericErrorMessage = 'Something went wrong! Please try again later.';
	//
	// 		fetch(process.env.REACT_APP_API_ENDPOINT + 'users/signup', {
	// 			method: 'POST',
	// 			credentials: 'include',
	// 			headers: { 'Content-Type': 'application/json' },
	// 			body: JSON.stringify({ firstName, lastName, username: email, password }),
	// 		})
	// 			.then(async (response) => {
	// 				setIsSubmitting(false);
	// 				if (!response.ok) {
	// 					if (response.status === 400) {
	// 						setError('Please fill all the fields correctly!');
	// 					} else if (response.status === 401) {
	// 						setError('Invalid email and password combination.');
	// 					} else if (response.status === 500) {
	// 						console.log(response);
	// 						const data = await response.json();
	// 						if (data.message) setError(data.message || genericErrorMessage);
	// 					} else {
	// 						setError(genericErrorMessage);
	// 					}
	// 				} else {
	// 					const data = await response.json();
	// 					setUserContext((oldValues) => {
	// 						return { ...oldValues, token: data.token };
	// 					});
	// 				}
	// 			})
	// 			.catch((error) => {
	// 				setIsSubmitting(false);
	// 				setError(genericErrorMessage);
	// 			});
	// 	};

	return (
		<>
			{error && <Alert variant='danger'>{error}</Alert>}
			<Form onSubmit={formSubmitHandler} className='auth-form'>
				<FormGroup>
					<Label for='firstName'>First Name</Label>
					<Input
						id='firstName'
						placeholder='First Name'
						onChange={(e) => setFirstName(e.target.value)}
						value={firstName}
					/>
				</FormGroup>
				<FormGroup>
					<Label for='lastName'>Last Name</Label>
					<Input
						id='lastName'
						placeholder='Last Name'
						onChange={(e) => setLastName(e.target.value)}
						value={lastName}
					/>
				</FormGroup>
				<FormGroup>
					<Label for='email'>Email</Label>
					<Input
						id='email'
						type='email'
						placeholder='Email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</FormGroup>
				<FormGroup>
					<Label for='password'>Password</Label>
					<Input
						id='password'
						type='password'
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</FormGroup>
				<Button
					variant='primary'
					disabled={isSubmitting}
					text={`${isSubmitting ? 'Registering' : 'Register'}`}
					type='submit'
				>
					Register
				</Button>
			</Form>
		</>
	);
};

export default Register;
