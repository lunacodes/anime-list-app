import React from 'react';
import LoginForm from './LoginForm';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Register from './Register';

const LoginTabs = () => {
	return (
		<div className='col-md-12'>
			<div className='card card-container login-card'>
				<Tabs defaultActiveKey='login' id='loginTabs' className='mb-3'>
					<Tab eventKey='login' title='Login'>
						<LoginForm />
					</Tab>
					<Tab eventKey='register' title='Register'>
						<Register />
					</Tab>
				</Tabs>
			</div>
		</div>
	);
};

const Login = () => {
	return <LoginTabs />;
};

export default Login;
