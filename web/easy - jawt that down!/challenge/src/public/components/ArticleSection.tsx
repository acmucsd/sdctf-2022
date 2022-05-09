import * as React from "react";
import {Component} from "react";

export interface ArticleSectionProps {
	title: string;
	img?: string;
}
interface ArticleSectionState {}

export default class ArticleSection extends Component<ArticleSectionProps, ArticleSectionState> {
	constructor(props: ArticleSectionProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <div className="article-section">
			<div className="article-heading">{this.props.title}</div>
			{this.props.img ? <img className="article-img" src={this.props.img}></img> : ""}
			{this.props.children ? this.props.children : ""}
		</div>;
	}
}
