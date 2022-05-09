import * as ReactDom from "react-dom";
import * as React from "react";
import {Component} from "react";
import Backsplash from "./components/Backsplash";
import TopBar, {LINKS} from "./components/TopBar";
import AcctMgmt from "./components/AcctMgmt";

interface LoginProps {}
interface LoginState {}

export default class Login extends Component<LoginProps, LoginState> {
	constructor(props: LoginProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <>
			<Backsplash></Backsplash>
			<TopBar links={LINKS}></TopBar>
			<AcctMgmt></AcctMgmt>
		</>;
	}
}

ReactDom.render(<Login></Login>, document.getElementById("root"))
