import * as React from "react";
import {Component} from "react";

export interface PostProps {
	title: string;
	date: string;
	filepath: string;
	description: string;
	imgurl: string;
}
interface PostState {}

export default class Post extends Component<PostProps, PostState> {
	constructor(props: PostProps) {
		super(props);
		this.state = {};
	}

	private viewLog() {
		window.location = this.props.filepath as any as Location;
	}

	public render() {
		return <div className="post">
			<div className="post-content">
				<div className="post-title">{this.props.title}</div>
				<div className="posted-at">
					<img src="img/clock.svg"></img>
					{this.props.date}
				</div>
				<button className="check-log" onClick={this.viewLog.bind(this)}>View raw log</button>
				<div className="post-description">{this.props.description}</div>
			</div>
			<div className="post-image">
				<img src={this.props.imgurl}></img>
			</div>
		</div>;
	}
}
