import * as ReactDom from "react-dom";
import * as React from "react";
import {Component} from "react";
import Backsplash from "./components/Backsplash";
import TopBar, {LINKS} from "./components/TopBar";
import CenterBox from "./components/CenterBox";

interface FundsProps {}
interface FundsState {}

export default class Funds extends Component<FundsProps, FundsState> {
	constructor(props: FundsProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <>
			<Backsplash></Backsplash>
			<TopBar links={LINKS}></TopBar>
			<CenterBox title="500 Internal Server Error" className="server-error">
				<div className="no-pay" dangerouslySetInnerHTML={{__html: `
					<!-- TODO: Debug on admin account -->
					We're sorry, the payment server cannot be reached! Cannot add funds to account at this time.`
				}}>
				</div>
			</CenterBox>
		</>;
	}
}

ReactDom.render(<Funds></Funds>, document.getElementById("root"))