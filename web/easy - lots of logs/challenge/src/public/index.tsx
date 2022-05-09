import * as ReactDom from "react-dom";
import * as React from "react";
import Splash from "./components/Splash";
import About from "./components/About";
import PostContainer from "./components/PostContainer";
import Footer from "./components/Footer";
import Post, {PostProps} from "./components/Post";

interface MainProps {}
interface MainState {}

const POSTS = [{
	title: "The Immaculate Log",
	description: "Oh the beauty of the freshly chopped trunk, from it's captivating concentric rings to its potentially edible exterior. If there's anything I like more than chopping logs, it's logging logs with my logger. As I always say, the day's a slog without some logs. And at least if I haven't logged, I make sure that I've blogged.",
	date: "Wednesday March 9th, 2022",
	filepath: "/logs/2022/3/9/Wed.log",
	imgurl: "img/log1.jpg"
},{
	title: "Groundlogs",
	description: "Like groundhogs but not quite. Oh what is a groundlog you ask? Why, it is merely a log that has fallen on the ground. What, thought it was something special? I apologize for my lack of recent posts; I would post more but wood posts are in heavy demand right now. I can't blog much because of that, but my logger still logs.",
	date: "Tuesday December 14th, 2021",
	filepath: "/logs/2021/12/14/Tue.log",
	imgurl: "img/log2.jpg"
},{
	title: "Log n'Squared",
	description: "Processing logs is about as fun as chopping them down, especially if you're a big fan of square-based rectangular prisms. Through the magic of the mill, cylinders are transformed into long bits of wood that may someday end up in the walls of your house or in other wood-attracting places. No matter how much we chop, it seems the world can't get enough of our wood.",
	date: "Saturday July 31st, 2021",
	filepath: "/logs/2021/7/31/Sat.log",
	imgurl: "img/log3.jpg"
}] as PostProps[];

class Main extends React.Component<MainProps, MainState> {
	constructor(props: MainProps) {
		super(props);
		this.state = {};
	}
	public render() {
		return <>
			<Splash></Splash>
			<About statement="I'm John Logger" description="It's sort of funny I became a lumberjack considering my last name. I post a blog about logs that I've logged."></About>
			<PostContainer title="Recent Posts">{
				POSTS.map(n=>(
					<Post {...n}></Post>
				))
			}</PostContainer>
			<Footer></Footer>
		</>;
	}
}

ReactDom.render(<Main></Main>, document.getElementById("root"));

export default {};