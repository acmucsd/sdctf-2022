import * as React from "react";
import {Component} from "react";
import * as ReactDOM from "react-dom";
import ArticleSection from "./components/ArticleSection";
import TopBar from "./components/TopBar";

interface AboutProps {}
interface AboutState {}

export default class About extends Component<AboutProps, AboutState> {
	constructor(props: AboutProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <>
			<TopBar></TopBar>
			<div className="main-content">
				<ArticleSection title="Asset Attribution">
					<div className="asset-attr-holder">
						<a href="https://unsplash.com/@sardinien_blog?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jürgen Scheeff</a>
						<a href="https://unsplash.com/@natinati?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Nati Melnychuk</a>
						<a href="https://unsplash.com/@baileymahon?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">BAILEY MAHON</a>
						<a href="https://unsplash.com/@iamamanartist?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Amandeep Chaudhary</a>
						<a href="https://unsplash.com/@strvngefilmss?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Strvnge Films</a>
						<a href="https://thenounproject.com/winncreative/">Winn Creative</a>
					</div>
				</ArticleSection>
			</div>
		</>;
	}
}

ReactDOM.render(<About/>, document.getElementById("root"));