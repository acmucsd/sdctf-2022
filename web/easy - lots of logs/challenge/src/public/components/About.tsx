import * as React from "react";
import {Component} from "react";

interface AboutProps {
	statement: string;
	description: string;
}
interface AboutState {}

export default class About extends Component<AboutProps, AboutState> {
	constructor(props: AboutProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <div className="about-me">
			<img className="about-img" src="img/john.jpg"></img>
			<div className="about-desc">
				<div className="about-statement">{this.props.statement}</div>
				<div className="about-description">{this.props.description}</div>
			</div>
		</div>;
	}
}
