import * as ReactDom from "react-dom";
import * as React from "react";
import Splash from "./components/Splash";
import CallToAction from "./components/CallToAction";
import Gallery from "./components/Gallery";
import {BIRD_BATH, TOP} from "./Config";

interface MainProps {}
interface MainState {}

class Main extends React.Component<MainProps, MainState> {
	constructor(props: MainProps) {
		super(props);
		this.state = {};
	}
	public render() {
		return <>
			<Splash>
				We need your bird photos
			</Splash>
			<CallToAction>
				Submit your photos today to expand upon our small but ever-growing collection of birds from all around the world!
			</CallToAction>
			<Gallery title="This Week's Top Birds" images={
				TOP
			}></Gallery>
			<Gallery title="Recent Contributions" images={
				pickNFrom(BIRD_BATH, 4)
			}></Gallery>
			<CallToAction>
				<a className="contribute" href="/upload">Contribute Today</a>
			</CallToAction>
		</>;
	}
}

function pickNFrom(arr: any[], num: number): any[] {
	let array = arr.slice();
	let ret = [];
	for (let i = num; i > 0 && array.length > 0; i--) {
		ret.push(array.splice((Math.random()*array.length)|0, 1)[0]);
	}
	return ret;
}

ReactDom.render(<Main></Main>, document.getElementById("root"));

export default {};