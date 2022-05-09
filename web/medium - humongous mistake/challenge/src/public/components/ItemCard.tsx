import * as React from "react";
import {Component} from "react";

interface ItemCardProps {
	imgsrc: string;
	title: string;
	price: string;
	isFlag?: boolean;
}
interface ItemCardState {}

export default class ItemCard extends Component<ItemCardProps, ItemCardState> {
	constructor(props: ItemCardProps) {
		super(props);
		this.state = {};
	}
	private buyShell() {
		let shellName = encodeURIComponent(this.props.title.toLowerCase().split(" ").join("-"));
		if (this.props.isFlag) {
			window.location = "/buyflagshell?shell=" + shellName as any;
		} else {
			window.location = "/buyshell?shell=" + shellName as any;
		}
	}

	public render() {
		return <div className="item-card">
			<div className="item-card-title">{this.props.title}</div>
			<img className="item-card-img" src={this.props.imgsrc}></img>
			<div className="item-card-bottom">
				<div className="item-price">{this.props.price}</div>
				<button role="link" className="buy-now" onClick={this.buyShell.bind(this)}>Buy now</button>
			</div>
		</div>;
	}
}
