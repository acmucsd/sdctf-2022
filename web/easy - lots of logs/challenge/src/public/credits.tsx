import * as ReactDom from "react-dom";
import * as React from "react";
import {Component} from "react";
import Splash from "./components/Splash";

interface CreditsProps {}
interface CreditsState {}

export default class Credits extends Component<CreditsProps, CreditsState> {
	constructor(props: CreditsProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <>
			<Splash>
				Photos by <a href="https://unsplash.com/@jaymantri?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jay Mantri</a>, <a href="https://unsplash.com/@theforestbirds?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Joel & Jasmin Førestbird</a>, <a href="https://unsplash.com/@websitethink?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Harlow Kasprak - Websitethink.com</a>, and <a href="https://unsplash.com/@jatin_graphix?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jatin Jangid</a><br/><p></p>
				John Logger photo by <a href="https://this-person-does-not-exist.com/">this-person-does-not-exist.com</a>
			</Splash>
  		</>;
	}
}

ReactDom.render(<Credits></Credits>, document.getElementById("root"))
