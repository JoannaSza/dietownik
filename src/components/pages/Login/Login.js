import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
	faUser,
	faKey,
	faEye,
	faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

import styles from "./Login.module.css";
import Input from "../../UI/InputGroup";
import Checkbox from "../../UI/Checkbox";
import RstPswdModal from "./RstPswdModal";
import { Spinner } from "reactstrap";
import Modal from "../../UI/Modal/Modal";
import LoginCard from "./LoginCard";

import { updateObject, checkValidity } from "../../../shared/utility";
import { getErrorMsg } from "./getErrorMsg";

class Login extends React.Component {
	state = {
		showResetPswd: false,
		showLoginError: false,
		stayLoggedIn: false,
		isGoogleAuth: false,
		inputsAreValid: false,
		submitted: false,
		method: "login",
		inputs: {
			email: {
				prepend: faUser,
				value: "",
				elementConfig: {
					type: "email",
					placeholder: "Email",
				},
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				errorMsg: "",
			},
			password: {
				prepend: faKey,
				value: "",
				elementConfig: { type: "password", placeholder: "Hasło" },
				append: faEye,
				appendOnClick: () => this.toggleEye(),
				validation: {
					required: true,
					minLength: 6,
				},
				valid: false,
				errorMsg: "",
			},
		},
	};

	inputChangedHandler = (event, inputId) => {
		const updatedInputElement = updateObject(this.state.inputs[inputId], {
			value: event.target.value,
			...checkValidity(
				event.target.value,
				this.state.inputs[inputId].validation
			),
		});
		const updatedInputs = updateObject(this.state.inputs, {
			[inputId]: updatedInputElement,
		});

		let inputsAreValid = true;
		for (let inputId in updatedInputs) {
			inputsAreValid = updatedInputs[inputId].valid && inputsAreValid;
		}
		this.setState({ inputs: updatedInputs, inputsAreValid });
	};

	checkboxClickHandler = () => {
		const stayLoggedInVal = !this.state.stayLoggedIn;
		this.setState({ stayLoggedIn: stayLoggedInVal });
		this.props.onSetNotLogout(stayLoggedInVal);
	};

	toggleEye = () => {
		const newType =
			this.state.inputs.password.elementConfig.type === "password"
				? "text"
				: "password";
		const newAppendIcon = newType === "password" ? faEye : faEyeSlash;
		const updatedInputConfig = updateObject(
			this.state.inputs.password.elementConfig,
			{ type: newType }
		);
		const updatedInputElement = updateObject(this.state.inputs.password, {
			append: newAppendIcon,
			elementConfig: updatedInputConfig,
		});
		const updatedInputs = updateObject(this.state.inputs, {
			password: updatedInputElement,
		});
		this.setState({ inputs: updatedInputs });
	};

	submitHandler = (event, method) => {
		event.preventDefault();
		if (this.state.inputsAreValid) {
			this.props.onAuth(
				this.state.inputs.email.value,
				this.state.inputs.password.value,
				method
			);
		} else this.setState({ submitted: true });
	};

	googleAuthHandler = () => {
		this.props.onGAuth();
		this.setState({ isGoogleAuth: true });
	};

	onShowResetPswd = () => {
		this.setState((prevState) => ({ showResetPswd: !prevState.showResetPswd }));
	};

	render() {
		const formInputsArray = [];
		for (let key in this.state.inputs) {
			formInputsArray.push({
				id: key,
				config: this.state.inputs[key],
			});
		}
		const renderInputs = (className) =>
			formInputsArray.map((input) => (
				<Input
					className={className}
					key={input.id}
					prepend={input.config.prepend}
					elementConfig={input.config.elementConfig}
					value={input.config.value}
					append={input.config.append}
					appendOnClick={input.config.appendOnClick}
					changed={(event) => this.inputChangedHandler(event, input.id)}
					valid={input.config.valid}
					errorText={input.config.errorMsg}
					touched={this.state.submitted}
				/>
			));

		const additionalDataLogin = (
			<div>
				<div className="w-100 text-right">
					<a
						className={`btn btn-sm p-0 text-ash-gray`}
						onClick={(e) => {
							e.preventDefault();
							this.onShowResetPswd();
						}}
						href="/"
					>
						Zresetuj hasło
					</a>
				</div>

				<a
					className="row text-center mb-3 mt-2 p-0 btn text-ash-gray"
					onClick={(e) => e.preventDefault()}
					href="/"
				>
					<Checkbox
						onClick={this.checkboxClickHandler}
						checked={this.state.stayLoggedIn}
					>
						Nie wylogowuj mnie
					</Checkbox>
				</a>

				<h6 className="mb-2 text-ash-gray">
					Nie masz konta?{" "}
					<a
						href="/"
						className={`pl-2 py-0 btn text-ash-gray`}
						onClick={(e) => {
							e.preventDefault();
							this.setState({ method: "signup" });
						}}
					>
						<u>Zarejestruj się</u>
					</a>
				</h6>
			</div>
		);

		const additionalDataSignup = (
			<div className="w-100 text-right">
				<a
					className={`btn btn-sm p-0 text-ash-gray`}
					onClick={(e) => {
						e.preventDefault();
						this.setState({ method: "login" });
					}}
					href="/"
				>
					<u>Wróć do logowania</u>
				</a>
			</div>
		);
		const gAuthButton = (
			<button
				type="button"
				className="btn w-100 btn-primary"
				onClick={this.googleAuthHandler}
			>
				{this.props.loading && this.state.isGoogleAuth ? (
					<Spinner size="sm" color="text-light" />
				) : (
					<span>
						<FontAwesomeIcon icon={faGoogle} />
						<span className="pl-2">Zaloguj przez Google</span>
					</span>
				)}
			</button>
		);

		//************************ PAGE CONTENT ************************
		return (
			<div className="d-flex flex-grow-1 no-gutters">
				{/* ---------------------- MODALS ------------------------------ */}
				{/* reset password */}
				<RstPswdModal
					isOpen={this.state.showResetPswd}
					toggle={this.onShowResetPswd}
					onReject={this.onShowResetPswd}
				/>
				<Modal
					isOpen={Boolean(this.props.error)}
					toggle={this.props.onClearError}
					onReject={this.props.onClearError}
					onSubmit={this.props.onClearError}
					btn1="OK"
					title="Błąd"
				>
					<div
						className={`container no-gutters mx-auto text-center ${styles.Modal}`}
					>
						{getErrorMsg(this.props.error)}
					</div>
				</Modal>
				{this.props.isBigScreen ? (
					<div className={`col-5 ${styles.Background}`} />
				) : (
					""
				)}
				<div className="col d-flex bg-rich-black">
					{this.state.method === "login" ? (
						<LoginCard
							cardTitle="Zaloguj się do dietownika, aby rozpocząć"
							inputs={renderInputs()}
							onSubmit={(e) => this.submitHandler(e, this.state.method)}
							additionalData={additionalDataLogin}
							submitText="Zaloguj"
							googleAuth={gAuthButton}
						/>
					) : (
						<LoginCard
							cardTitle="Podaj dane do utworzenia konta"
							inputs={renderInputs()}
							onSubmit={(e) => this.submitHandler(e, this.state.method)}
							submitText="Utwórz konto"
							additionalData={additionalDataSignup}
						/>
					)}
				</div>
			</div>
		);
	}
}

// ************************ Connect to store ************************
const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (user, password, method) =>
			dispatch(actions.auth(user, password, method)),
		onResetPassword: (email) => dispatch(actions.resetPswd(email)),
		onClearError: () => dispatch(actions.clearError()),
		onGAuth: () => dispatch(actions.gauth()),
		onSetNotLogout: (value) => dispatch(actions.setNotLogout(value)),
	};
};

const mapStateToProps = (state) => ({
	loading: state.auth.loading,
	error: state.auth.error,
	actionSuccess: state.auth.actionSuccess,
	logout: state.auth.logout,
	isBigScreen: !state.window.isSmall,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
