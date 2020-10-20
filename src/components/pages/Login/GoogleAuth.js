import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

class GoogleAuth extends React.Component {
	state = { isSignedIn: null };
	componentDidMount() {
		window.gapi.load("client:auth2", () => {
			window.gapi.client
				.init({
					clientId: `${process.env.REACT_APP_GAPI}`,
					scope: "email",
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.setState({
						isSignedIn: this.auth.isSignedIn.get(),
					});
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}

	onSignIn = () => {
		this.state.isSignedIn ? this.onAuthChange() : this.auth.signIn();
	};

	onAuthChange = () => {
		const isSignedIn = this.auth.isSignedIn.get();
		this.setState({ isSignedIn: isSignedIn });
		if (isSignedIn) {
			const user = this.auth.currentUser.get();
			if (user) {
				const id_token = user.getAuthResponse().id_token;
				this.onReturnToken(id_token);
			}
		} else
			this.setState({
				idtoken: null,
			});
	};

	onReturnToken = (id_token) => {
		this.props.onLogIn(id_token);
	};

	render() {
		return (
			<div>
				<div className="container">
					<button
						type="button"
						className="btn w-100 btn-primary"
						onClick={this.onSignIn}
					>
						<FontAwesomeIcon icon={faGoogle} />
						<span className="pl-2">Zaloguj przez Google</span>
					</button>
				</div>
			</div>
		);
	}
}

export default GoogleAuth;
