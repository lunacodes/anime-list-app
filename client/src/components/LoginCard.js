import React from 'react';
import Login from './Login';
import Register from './Register';

import {
	Col,
	Nav,
	NavItem,
	NavLink,
	Row,
	TabContent,
	TabPane,
} from 'reactstrap';
import classnames from 'classnames';

export default class LoginCard extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			activeTab: '1',
		};
	}

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab,
			});
		}
	}
	render() {
		return (
			<div className='login-card'>
				<Nav tabs>
					<NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === '1' })}
							onClick={() => {
								this.toggle('1');
							}}
						>
							Login
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === '2' })}
							onClick={() => {
								this.toggle('2');
							}}
						>
							Register
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={this.state.activeTab}>
					<TabPane tabId='1'>
						<Row>
							<Col sm='12'>
								<h4>Login</h4>
								<Login />
							</Col>
						</Row>
					</TabPane>
					<TabPane tabId='2'>
						<Row>
							<Col sm='12'>
								<h4>Register</h4>
								<Register />
							</Col>
						</Row>
					</TabPane>
				</TabContent>
			</div>
		);
	}
}
