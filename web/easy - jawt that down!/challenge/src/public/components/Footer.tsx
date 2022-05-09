import * as React from "react";
import {Component} from "react";

interface FooterProps {}
interface FooterState {}

export default class Footer extends Component<FooterProps, FooterState> {
	constructor(props: FooterProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <div className="footer">
			Website protected by 
			<img className="security" src="img/ods.png"></img>
		</div>;
	}
}
