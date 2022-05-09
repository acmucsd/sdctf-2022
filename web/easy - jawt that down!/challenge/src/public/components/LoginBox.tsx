import * as React from "react";
import {Component} from "react";

interface LoginBoxProps {}
interface LoginBoxState {}

export default class LoginBox extends Component<LoginBoxProps, LoginBoxState> {
	constructor(props: LoginBoxProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <form action="/login" method="POST" className="login-form">
			<span className="heading">Admin Sign In</span>
			<label htmlFor="username" dangerouslySetInnerHTML={{__html: "<!-- REMOVE ME IN PUBLISHED SITE! Username: AzureDiamond -->Username"}}></label>
			<input type="text" id="username" name="username"></input>
			<label htmlFor="password" dangerouslySetInnerHTML={{__html: "<!-- REMOVE ME IN PUBLISHED SITE! Password: hunter2 -->Password"}}></label>
			<input type="password" id="password" name="password"></input>
			<button type="submit">Sign In</button>
		</form>;
	}
}