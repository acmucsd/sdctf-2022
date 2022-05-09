import * as ReactDom from "react-dom";
import * as React from "react";
import {Component} from "react";
import Backsplash from "./components/Backsplash";
import TopBar, {LINKS} from "./components/TopBar";
import CenterBox from "./components/CenterBox";

interface BoughtShellProps {}
interface BoughtShellState {}

export default class BoughtShell extends Component<BoughtShellProps, BoughtShellState> {
	constructor(props: BoughtShellProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <>
			<Backsplash></Backsplash>
			<TopBar links={LINKS}></TopBar>
			<CenterBox title="Successfully purchased shell!">
				<div className="remaining-balance">
					Remaining balance: <em>Infinity</em>
				</div>
			</CenterBox>
		</>;
	}
}

ReactDom.render(<BoughtShell></BoughtShell>, document.getElementById("root"))
