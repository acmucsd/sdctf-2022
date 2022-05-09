import * as React from "react";
import {Component} from "react";

interface SplashProps {}
interface SplashState {}

export default class Splash extends Component<SplashProps, SplashState> {
	constructor(props: SplashProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <div className="splash-screen">
			<div className={(this.props.children ? "not-big-text " : "") + "main-text"}>
				{this.props.children ? this.props.children : <>Logger<br/>Logging</>}
			</div>
		</div>;
	}
}
