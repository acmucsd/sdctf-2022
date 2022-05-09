import * as React from "react";
import {Component} from "react";

interface TopBarProps {
	pages: string[];
}
interface TopBarState {}

export default class TopBar extends Component<TopBarProps, TopBarState> {
	constructor(props: TopBarProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <div className="topbar">
			<a href="/">
				<img className="logo" src="img/logo.svg"></img>
			</a>
			{this.props.pages.map(n=>
				<a className="nav-link" href={"/"+n.toLowerCase()} key={n}>{n.toUpperCase()}</a>
			)}			
		</div>;
	}
}
