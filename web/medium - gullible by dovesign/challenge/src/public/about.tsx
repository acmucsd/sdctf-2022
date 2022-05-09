import * as React from "react";
import * as ReactDom from "react-dom";
import {Component} from "react";
import TopBar from "./components/TopBar";
import {URLS} from "./Config";

interface AboutProps {}
interface AboutState {}

class About extends Component<AboutProps, AboutState> {
	constructor(props: AboutProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <>
			<div className="flexy">
				<TopBar pages={URLS}></TopBar>
				<div className="attribution-box">					
					<div className="attribution-container">
						<div className="assets">Asset Attribution</div>
						<a href="https://thenounproject.com/diegonaive/">Diego Naive</a>
						<a href="https://thenounproject.com/phlehmann/">Philipp Lehmann</a>
						<a href="https://unsplash.com/@vincentvanzalinge?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Vincent van Zalinge</a>
						<a href="https://unsplash.com/@borisworkshop?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Boris  Smokrovic</a>
						<a href="https://unsplash.com/@zmachacek?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Zdeněk Macháček</a>
						<a href="https://unsplash.com/@janmeeus?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jan Meeus</a>
						<a href="https://unsplash.com/@jackez2010?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jacques LE HENAFF</a>
						<a href="https://unsplash.com/@designbytholen?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">REGINE THOLEN</a>
						<a href="https://unsplash.com/@yskeong?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">SK Yeong</a>
						<a href="https://unsplash.com/@brock222?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Richard Lee</a>
						<a href="https://unsplash.com/@timothycdykes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Timothy Dykes</a>
						<a href="https://unsplash.com/@davidclode?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">David Clode</a>
						<a href="https://unsplash.com/@jcotten?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Joshua J. Cotten</a>
						<a href="https://unsplash.com/@timmossholder?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Tim Mossholder</a>
						<a href="https://unsplash.com/@sonderquest?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Sonder Quest</a>
						<a href="https://unsplash.com/@browaterboy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Trison Thomas</a>
						<a href="https://unsplash.com/@hansvantol?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Hans van Tol</a>
						<a href="https://unsplash.com/@hyneseyes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jeremy Hynes (@hyneseyes)</a>
						<a href="https://unsplash.com/@deepaknautiyal?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Deepak Nautiyal</a>
						<a href="https://unsplash.com/@markolsen?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mark Olsen</a>
						<a href="https://unsplash.com/@rayhennessy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ray Hennessy</a>
						<a href="https://unsplash.com/@cadop?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mathew Schwartz</a>
						<a href="https://unsplash.com/@tarpitgrover?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Tarpit Grover</a>
						<a href="https://unsplash.com/@stockcs60?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mohd Nasir</a>
					</div>	
				</div>
			</div>
		</>;
	}
}


ReactDom.render(<About></About>, document.getElementById("root"));