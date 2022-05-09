import * as ReactDom from "react-dom";
import * as React from "react";
import {Component} from "react";
import Backsplash from "./components/Backsplash";
import TopBar, {LINKS} from "./components/TopBar";
import CenterBox from "./components/CenterBox";

interface CreditsProps {}
interface CreditsState {}

export default class Credits extends Component<CreditsProps, CreditsState> {
	constructor(props: CreditsProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <>
			<Backsplash></Backsplash>
			<TopBar links={LINKS}></TopBar>
			<CenterBox title="Image and Asset Attribution" className="smaller-title">
				<div className="wiki-attribution">
					<a href="https://www.flickr.com/people/47445767@N05">James St. John</a>, <a href="https://commons.wikimedia.org/wiki/File:Hexaplex_erythrostomus_(pink_mouthed_murex_snail)_2_(15529519438).jpg">Hexaplex erythrostomus (pink mouthed murex snail) 2 (15529519438)</a>, <a href="https://creativecommons.org/licenses/by/2.0/legalcode" rel="license">CC BY 2.0</a>
				</div>
				<div className="wiki-attribution">
					<a href="https://commons.wikimedia.org/wiki/User:Veronidae">Veronidae</a>, <a href="https://commons.wikimedia.org/wiki/File:Strombus alatus Gmelin, 1791 2013 000.JPG">Strombus alatus Gmelin, 1791 2013 000</a>, Cropped image, <a href="https://creativecommons.org/licenses/by-sa/3.0/legalcode" rel="license">CC BY-SA 3.0</a>
				</div>
				<div className="wiki-attribution">
					<a href="https://commons.wikimedia.org/wiki/User:Archaeodontosaurus">Didier Descouens</a>, <a href="https://commons.wikimedia.org/wiki/File:Melo melo.jpg">Melo melo</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/legalcode" rel="license">CC BY-SA 3.0</a>
				</div>
				<div className="wiki-attribution">
					<a href="https://commons.wikimedia.org/wiki/User:Hectonichus">Hectonichus</a>, <a href="https://commons.wikimedia.org/wiki/File:Fasciolariidae - Triplofusus giganteus.JPG">Fasciolariidae - Triplofusus giganteus</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/legalcode" rel="license">CC BY-SA 3.0</a>
				</div>
				<div className="wiki-attribution">
					<a href="https://commons.wikimedia.org/wiki/User:Hectonichus">Hectonichus</a>, <a href="https://commons.wikimedia.org/wiki/File:Cardiidae - Dinocardium robustum.JPG">Cardiidae - Dinocardium robustum</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/legalcode" rel="license">CC BY-SA 3.0</a>
				</div>
				<div className="wiki-attribution">
					<a href="https://www.flickr.com/people/47377886@N05">FWC Fish and Wildlife Research Institute</a>, <a href="https://commons.wikimedia.org/wiki/File:Calico Clam (11670782353).jpg">Calico Clam (11670782353)</a>, Changed background, <a href="https://creativecommons.org/licenses/by/2.0/legalcode" rel="license">CC BY 2.0</a>
				</div>
				<div className="wiki-attribution">
					<a href="https://commons.wikimedia.org/wiki/User:GrahamBould">GrahamBould</a>, <a href="https://commons.wikimedia.org/wiki/File:Tucetona laticostata 2.JPG">Tucetona laticostata 2</a>, marked as public domain, more details on <a href="https://commons.wikimedia.org/wiki/Template:PD-author">Wikimedia Commons</a>
				</div>
				<div className="wiki-attribution">
					<a href="https://commons.wikimedia.org/wiki/User:Llez">H. Zell</a>, <a href="https://commons.wikimedia.org/wiki/File:Architectonica perspectiva 01.JPG">Architectonica perspectiva 01</a>, Cropped image, <a href="https://creativecommons.org/licenses/by-sa/3.0/legalcode" rel="license">CC BY-SA 3.0</a>
				</div>
				<div className="wiki-attribution">
					<a href="https://commons.wikimedia.org/wiki/User:Llez">H. Zell</a>, <a href="https://commons.wikimedia.org/wiki/File:Oliva_sayana_02.JPG">Oliva sayana 02</a>, Cropped image, <a href="https://creativecommons.org/licenses/by-sa/3.0/legalcode" rel="license">CC BY-SA 3.0</a>
				</div>
				<div className="wiki-attribution">
					<a href="https://commons.wikimedia.org/wiki/User:Archaeodontosaurus">Didier Descouens</a>, <a href="https://commons.wikimedia.org/wiki/File:MurexPecten.jpg">MurexPecten</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/legalcode" rel="license">CC BY-SA 4.0</a>
				</div>
				<div className="wiki-attribution">
					<a href="https://commons.wikimedia.org/wiki/User:Llez">H. Zell</a>, <a href="https://commons.wikimedia.org/wiki/File:Clypeomorus_bifasciata_persica_01.jpg">Clypeomorus bifasciata persica 01</a>, Cropped image, <a href="https://creativecommons.org/licenses/by-sa/3.0/legalcode" rel="license">CC BY-SA 3.0</a>
				</div>
				<div className="wiki-attribution">
					<a href="https://www.flickr.com/photos/44124348109@N01">Steve Jurvetson</a> from Menlo Park, USA, <a href="https://commons.wikimedia.org/wiki/File:Wentletrap_001.jpg">Wentletrap 001</a>, Cropped image, <a href="https://creativecommons.org/licenses/by/2.0/legalcode" rel="license">CC BY 2.0</a>
				</div>
				<div className="wiki-attribution">
					<a href="https://commons.wikimedia.org/wiki/User:Llez">H. Zell</a>, <a href="https://commons.wikimedia.org/wiki/File:Harpa_davidis_01.JPG">Harpa davidis 01</a>, Cropped image, <a href="https://creativecommons.org/licenses/by-sa/3.0/legalcode" rel="license">CC BY-SA 3.0</a>
				</div>
				<div className="wiki-attribution">
					Shell logo by <a href="https://thenounproject.com/qorinafiljan2121/">Orin zuu</a> from <a href="https://thenounproject.com">The Noun Project</a>
				</div>
				<div className="wiki-attribution">
					Cowrie by <a href="https://unsplash.com/@rishal1123?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">M Rishal</a> on <a href="https://unsplash.com/@rishal1123?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
				</div>
			</CenterBox>
		</>;
	}
}

ReactDom.render(<Credits></Credits>, document.getElementById("root"))
/*

		
		*/