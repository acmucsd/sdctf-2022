import * as React from "react";
import {Component} from "react";

interface CallToActionProps {}
interface CallToActionState {}

export default class CallToAction extends Component<CallToActionProps, CallToActionState> {
	constructor(props: CallToActionProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <div className="call-to-action">
			{this.props.children}
		</div>;
	}
}
