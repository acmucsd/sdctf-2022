import * as React from "react";
import {Component} from "react";

interface CenterBoxProps {
	title: string;
	className?: string;
}
interface CenterBoxState {}

export default class CenterBox extends Component<CenterBoxProps, CenterBoxState> {
	constructor(props: CenterBoxProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <div className={`center-box-container ${this.props.className ? this.props.className : ""}`}>
			<div className="center-box">
				{this.props.title ? <div className="cbox-title">{this.props.title}</div> : ""}
				{this.props.children}
			</div>
		</div>;
	}
}
