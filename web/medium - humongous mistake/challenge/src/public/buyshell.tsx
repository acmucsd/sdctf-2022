import * as ReactDom from "react-dom";
import * as React from "react";
import {Component} from "react";
import Backsplash from "./components/Backsplash";
import TopBar, {LINKS} from "./components/TopBar";
import CenterBox from "./components/CenterBox";

interface BuyShellProps {}
interface BuyShellState {}

export default class BuyShell extends Component<BuyShellProps, BuyShellState> {
	constructor(props: BuyShellProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <>
			<Backsplash></Backsplash>
			<TopBar links={LINKS}></TopBar>
			<CenterBox title="Insufficient Funds"></CenterBox>
		</>;
	}
}

ReactDom.render(<BuyShell></BuyShell>, document.getElementById("root"))
