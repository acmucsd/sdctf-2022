import * as React from "react";
import {Component} from "react";

interface GalleryImageProps {
	src: string;
	desc: string;
}
interface GalleryImageState {}

export default class GalleryImage extends Component<GalleryImageProps, GalleryImageState> {
	constructor(props: GalleryImageProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return <div className="gallery-image">
			<div className="image-body" style={{backgroundImage: `url(${this.props.src})`}}></div>
			<div className="image-description">{this.props.desc}</div>
		</div>;
	}
}
