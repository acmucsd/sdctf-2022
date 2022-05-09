import * as ReactDom from "react-dom";
import * as React from "react";
import Backsplash from "./components/Backsplash";
import TopBar, {LINKS} from "./components/TopBar";
import CenterBox from "./components/CenterBox";

interface MainProps {}
interface MainState {}

class Main extends React.Component<MainProps, MainState> {
	constructor(props: MainProps) {
		super(props);
		this.state = {};
	}
	public render() {
		return <>
			<Backsplash></Backsplash>
			<TopBar links={LINKS}></TopBar>
			<CenterBox title="We sell seashells by the seashore" className="big-top-margin"></CenterBox>
			<div className="action-dialogue">
				<div className="action-statement">
					<a href="/login">Create an account </a>
					today and buy the shell of your dreams
				</div>
				<div className="or-separator">Or</div>
				<div className="action-statement">
					<a href="/shop">Peruse our stock </a>
					first to find a shell to catch your fancy
				</div>
			</div>
		</>;
	}
}

ReactDom.render(<Main></Main>, document.getElementById("root"));

export default {};