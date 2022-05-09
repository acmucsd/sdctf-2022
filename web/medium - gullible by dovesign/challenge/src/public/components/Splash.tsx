import * as React from "react";
import {Component} from "react";
import TopBar from "./TopBar";
import {URLS} from "../Config";

interface SplashProps {}
interface SplashState {}

export default class Splash extends Component<SplashProps, SplashState> {
	constructor(props: SplashProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <div className="splash">
			<TopBar pages={URLS}></TopBar>
			<img className="backsplash-bird" src="img/bird.svg"></img>
			<div className="statement">{this.props.children}</div>
		</div>;
	}
}
