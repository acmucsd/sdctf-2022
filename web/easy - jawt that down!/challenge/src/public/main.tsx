import * as ReactDom from "react-dom";
import * as React from "react";
import TopBar from "./components/TopBar";
import ArticleSection, {ArticleSectionProps} from "./components/ArticleSection";
import Footer from "./components/Footer";

interface MainProps {}
interface MainState {}

const sections = [{
	title: "Bedegrayne and Aster, Consuls of the Two Kingdoms",
	img: "img/bedegrayne.jpg"
},{
	title: "Gwyneth and Eleonora, Advisors to the Throne",
	img: "img/gwyneth.jpg"
},{
	title: "Hrapenly, Grand Master of the Greens",
	img: "img/hrapenly.jpg"
},{
	title: "Coralia, Protector of the Forests",
	img: "img/coralia.jpg"
},{
	title: "Hardigrass, Town Crier",
	img: "img/hardigrass.jpg"
}] as ArticleSectionProps[];

class Main extends React.Component<MainProps, MainState> {
	constructor(props: MainProps) {
		super(props);
		this.state = {};
	}
	public render() {
		return <>
			<TopBar></TopBar>
			<h1>Goats I've Met in My Travels</h1>
			<div className="main-content">
				{sections.map(s=><ArticleSection {...s} />)}
				<Footer></Footer>
			</div>
		</>;
	}
}

ReactDom.render(<Main></Main>, document.getElementById("root"));

export default {};