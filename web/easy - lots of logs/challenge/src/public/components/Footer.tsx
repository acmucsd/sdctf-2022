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
			<a href="/credits">Credits</a>
		</div>;
	}
}
