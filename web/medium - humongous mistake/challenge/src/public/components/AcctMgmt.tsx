import * as React from "react";
import {Component} from "react";

interface AcctMgmtProps {}
interface AcctMgmtState {
	isLogin: boolean;
}

export default class AcctMgmt extends Component<AcctMgmtProps, AcctMgmtState> {
	constructor(props: AcctMgmtProps) {
		super(props);
		this.state = {
			isLogin: true
		};
	}

	private toggleRole() {
		this.setState({isLogin: !this.state.isLogin});
	}

	public render() {
		return <div className="acct-container">
			<form className="acct-box" method="POST" action={this.state.isLogin ? "/login" : "/signup"}>
				<div className="acct-title">{this.state.isLogin ? "Login" : "Signup"}</div>
				{this.state.isLogin ? "" : <div className="input-box">
					<label htmlFor="discord">Discord Username</label>
					<input id="discord" name="discord" type="text" required pattern="^[^#]+#\d{4}$" maxLength={120} placeholder="USER#1234"></input>
				</div>}
				<div className="input-box">
					<label htmlFor="username">Username</label>
					<input id="username" name="username" type="text" required maxLength={40}></input>
				</div>
				<div className="input-box">
					<label htmlFor="password">Password</label>
					<input id="password" type="password" name="password" required maxLength={40}></input>
				</div>
				<a tabIndex={3} className="change-login" onClick={this.toggleRole.bind(this)} role="link">{
					this.state.isLogin ? "Don't have an account? Create one!" : "Have an account? Log in instead!"
				}</a>
				<button type="submit">{this.state.isLogin ? "Login" : "Sign Up"}</button>
			</form>
		</div>;
	}
}
