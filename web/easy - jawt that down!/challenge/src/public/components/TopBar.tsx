import * as React from "react";
import {Component} from "react";

interface TopBarProps {}
interface TopBarState {
	links: string[];
}

export default class TopBar extends Component<TopBarProps, TopBarState> {
	constructor(props: TopBarProps) {
		super(props);
		this.state = {
			links: []
		};
		this.updateLinks();
	}

	private async updateLinks() {
		let links = await (await fetch(`/links?nonce=${
			Array.from(crypto.getRandomValues(new Uint8Array(16))).map(n=>n.toString(16)).join("")
		}`, {
			method: "POST", 
			credentials: "include"
		})).json();
		this.setState({
			links: links
		});
	}

	public render() {
		let links = this.state.links.map(link => {
			return <a href={
				"/" + link.toLowerCase()
			} className="nav-link" key={link}>{
				link.toLowerCase() === "s" ? 
					"Flag" :
					link
			}</a>;
		});
		return <div className="nav">
			<div className="nav-left">
				<a href="/">
					<img className="nav-logo" src="img/goat.svg"></img>
				</a>
				{links}
				<a className="nav-login" href="/login">Login</a>
			</div>
		</div>;
	}
}
