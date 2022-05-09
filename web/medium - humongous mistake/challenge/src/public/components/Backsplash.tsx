import * as React from "react";
import {Component} from "react";

interface BacksplashProps {}
interface BacksplashState {}

export default class Backsplash extends Component<BacksplashProps, BacksplashState> {
	constructor(props: BacksplashProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <div className="backsplash">
			<div className="bs-deepwater"></div>
			<div className="bs-shallowater"></div>
			<div className="bs-foam"></div>
			<div className="bs-sand"></div>
		</div>;
	}
}
