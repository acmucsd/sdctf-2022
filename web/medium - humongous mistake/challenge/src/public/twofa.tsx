import * as ReactDom from "react-dom";
import * as React from "react";
import {Component} from "react";
import Backsplash from "./components/Backsplash";
import CenterBox from "./components/CenterBox";
import TopBar, {LINKS} from "./components/TopBar";

interface TwofaProps {}
interface TwofaState {}

export default class Twofa extends Component<TwofaProps, TwofaState> {
	constructor(props: TwofaProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <>
			<Backsplash></Backsplash>
			<TopBar links={LINKS}></TopBar>
			<CenterBox title="Two-Factor Authentication" className="twofa">
				<form action="/2fa" method="POST">
					<input type="text" name="code" pattern="^[0-9a-fA-F]{6}$" maxLength={6}></input>
					<button className="twofa-submit" type="submit">Submit</button>
				</form>				
			</CenterBox>
		</>;
	}
}

ReactDom.render(<Twofa></Twofa>, document.getElementById("root"));