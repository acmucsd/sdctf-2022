import * as React from "react";
import * as ReactDom from "react-dom";
import {Component} from "react";
import TopBar from "./components/TopBar";
import {URLS} from "./Config";

interface UploadProps {}
interface UploadState {}

export default class Upload extends Component<UploadProps, UploadState> {
	constructor(props: UploadProps) {
		super(props);
		this.state = {};
		document.addEventListener("click", this.clearForm.bind(this));
	}

	private handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
		(e.target.parentElement as HTMLFormElement).submit();
	}
	private clearForm(e: React.ChangeEvent<HTMLLabelElement>) {
		let bu = (document.querySelector("#bird-uploader") as HTMLInputElement);
		if (bu) {
			bu.value = null;
		}
	}

	public render() {
		return <div className="flexy">
			<TopBar pages={URLS}></TopBar>
			<div className="upload-box">
				<div className="upload-container">
					<div className="prompt">Do you have a bird photo?</div>
					<form id="upload-form" action="/upload" method="POST" encType="multipart/form-data">
						<input onChange={
							this.handleUpload.bind(this)
						} id="bird-uploader" type="file" accept="image/jpeg,image/png" name="bird"></input>
					</form>
					<label htmlFor="bird-uploader" className="response">Upload It!</label>
				</div>
			</div>
		</div>;
	}
}

ReactDom.render(<Upload></Upload>, document.getElementById("root"));