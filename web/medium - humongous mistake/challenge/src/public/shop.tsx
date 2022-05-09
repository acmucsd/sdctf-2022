import * as ReactDom from "react-dom";
import * as React from "react";
import {Component} from "react";
import Backsplash from "./components/Backsplash";
import TopBar, {LINKS} from "./components/TopBar";
import ItemCard from "./components/ItemCard";
import CenterBox from "./components/CenterBox";

interface ShopProps {}
interface ShopState {}

const ITEMS = [{
	imgsrc: "img/dog.jpg",
	title: "Large Dog Cockle",
	price: "25BP/ea"
},{
	imgsrc: "img/calico.jpg",
	title: "Calico Clam Shell",
	price: "10BP/ea"
},{
	imgsrc: "img/ffc.jpg",
	title: "Florida Fighting Conch",
	price: "120BP/ea"
},{
	imgsrc: "img/giant_cockle.jpg",
	title: "Giant Cockle",
	price: "17BP/ea"
},{
	imgsrc: "img/harp.jpg",
	title: "Harp Shell",
	price: "180BP/ea"
},{
	imgsrc: "img/horse.jpg",
	title: "Horse Conch",
	price: "100BP/ea"
},{
	imgsrc: "img/melon.jpg",
	title: "Melon Shell",
	price: "90BP/ea"
},{
	imgsrc: "img/murex.jpg",
	title: "Pink Murex",
	price: "40BP/ea"
},{
	imgsrc: "img/flagshell.png",
	title: "Flag-Shaped Shell",
	price: "17BP/ea",
	isFlag: true
},{
	imgsrc: "img/olive.jpg",
	title: "Olive Shell",
	price: "20BP/ea"
},{
	imgsrc: "img/persiancerith.jpg",
	title: "Persian Cerith",
	price: "2BP/ea"
},{
	imgsrc: "img/sundial.jpg",
	title: "Sundial Shell",
	price: "70BP/ea"
},{
	imgsrc: "img/venuscomb.jpg",
	title: "Venus Comb",
	price: "160BP/ea"
},{
	imgsrc: "img/wentletrap.jpg",
	title: "Wentletrap",
	price: "110BP/ea"
}];

export default class Shop extends Component<ShopProps, ShopState> {
	constructor(props: ShopProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <>
			<Backsplash></Backsplash>
			<TopBar links={LINKS}></TopBar>
			<CenterBox title="Our Products" className="beeg-margin"></CenterBox>
			<div className="item-card-holder">{ITEMS.map(i=>(
				<ItemCard {...i} key={i.imgsrc}></ItemCard>
			))}</div>
		</>;
	}
}

ReactDom.render(<Shop></Shop>, document.getElementById("root"))
