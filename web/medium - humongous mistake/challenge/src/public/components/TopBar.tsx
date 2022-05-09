import * as React from "react";
import {Component} from "react";

const isLoggedIn = readCookie("token");
export const LINKS = [isLoggedIn ? "Logout" : "Login", "Shop", "About", "Credits", isLoggedIn ? "Add Funds" : null].filter(n=>n!==null);

interface TopBarProps {
	links: string[];
}
interface TopBarState {
	linksVisible: boolean;
}

export default class TopBar extends Component<TopBarProps, TopBarState> {
	constructor(props: TopBarProps) {
		super(props);
		this.state = {
			linksVisible: false
		};
		window.addEventListener("click", e=>{
			let target = e.target as HTMLElement;
			while (target) {
				if (target.classList.contains("hamburger")) {
					return;
				}
				target = target.parentElement;
			}
			this.setState({linksVisible: false});
		});
	}

	private toggleBurgies() {
		this.setState({linksVisible: !this.state.linksVisible});
	}

	public render() {
		return <div className="topbar">
			<a href="/" className="logo-container">
				<img className="logo" src="img/shell.svg"></img>
				<div className="title-text">The Beachfront</div>
			</a>
			<div className={"hamburger" + (this.state.linksVisible ? " blue-burgies-yum" : "")}>
				<div className="burgie" onClick={this.toggleBurgies.bind(this)}>≡</div>
				{this.props.links.map(l=>(
					<a key={l} className="navlink" href={
						"/"+l.toLowerCase().replace(/\s/g, "")
					} style={this.state.linksVisible ? {}: {display: "none"}}>{l}</a>
				))}
			</div>
		</div>;
	}
}

function readCookie(name: string) {
	let cookies = {} as {[key: string]: string};
	document.cookie.split(';').map(cookie => { 
		return (cookie[0] === " " ? cookie.slice(1) : cookie).split('=')
	}).forEach(keyval => {
		cookies[keyval[0]] = keyval[1];
	});
	return cookies[name];
}