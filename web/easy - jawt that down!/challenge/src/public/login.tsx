import * as ReactDom from "react-dom";
import * as React from "react";
import TopBar from "./components/TopBar";
import LoginBox from "./components/LoginBox";

interface LoginProps {}
interface LoginState {}

export default class Login extends React.Component<LoginProps, LoginState> {
	constructor(props: LoginProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <div className="columns">
			<div className="nav sidebar"></div>
			<div className="whole-page-center">
				<LoginBox></LoginBox>
			</div>
		</div>;
	}
}

ReactDom.render(<Login></Login>, document.getElementById("root"));