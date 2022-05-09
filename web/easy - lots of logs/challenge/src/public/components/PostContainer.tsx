import * as React from "react";
import {Component} from "react";

interface PostContainerProps {
	title: string;
}
interface PostContainerState {}

export default class PostContainer extends Component<PostContainerProps, PostContainerState> {
	constructor(props: PostContainerProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <div className="posts">
			<div className="section-title">{this.props.title}</div>
			{this.props.children}
		</div>;
	}
}
