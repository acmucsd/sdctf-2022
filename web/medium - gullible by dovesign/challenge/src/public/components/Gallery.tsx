import * as React from "react";
import {Component} from "react";
import GalleryImage from "./GalleryImage";

interface GalleryProps {
	title: string;
	images: {
		name: string,
		url: string
	}[]
}
interface GalleryState {}

export default class Gallery extends Component<GalleryProps, GalleryState> {
	constructor(props: GalleryProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <div className="gallery">
			<div className="gallery-title">{this.props.title}</div>
			<div className="gallery-items">{
				this.props.images.map(img =>
					<GalleryImage src={img.url} desc={img.name}></GalleryImage>
				)
			}</div>
		</div>;
	}
}
