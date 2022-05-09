import * as ReactDom from "react-dom";
import * as React from "react";
import {Component} from "react";
import Backsplash from "./components/Backsplash";
import TopBar, {LINKS} from "./components/TopBar";
import CenterBox from "./components/CenterBox";

interface AboutProps {}
interface AboutState {}

export default class About extends Component<AboutProps, AboutState> {
	constructor(props: AboutProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <>
			<Backsplash></Backsplash>
			<TopBar links={LINKS}></TopBar>
			<CenterBox title="Our Payment System" className="smaller-title">
				<div>
					We accept payments to our shop only through Beachfront Points (BP), our own custom rewards system. You can purchase BP through our payment provider BayPal. Each order over 200 BP nets you 25 additional points in rewards, so get spending!
				</div>
			</CenterBox>
		</>;
	}
}

ReactDom.render(<About></About>, document.getElementById("root"))
