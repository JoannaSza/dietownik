import React from "react";
import { Link } from "react-router-dom";
import { Transition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUserCog,
	faCaretRight,
	faCaretLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
	Navbar,
	Container,
	NavbarToggler,
	Collapse,
	Nav,
	NavItem,
	NavLink,
	NavbarText,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";

import Logo from "../../../IMG/logo.svg";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import styles from "./Navbar.module.css";
import { withRouter } from "react-router-dom";

class NavbarMenu extends React.Component {
	state = {
		isOpen: false,
		navbarItems: [
			{ tagName: "Dieta", linkTo: "/", isDropdown: false },
			{ tagName: "Posiłki", linkTo: "/posilki", isDropdown: false },
			{ tagName: "Lista zakupów", linkTo: "/listaZakupow", isDropdown: false },
		],
	};

	componentDidMount = () => {
		let i;
		const currPath = this.props.location.pathname;
		if (currPath !== this.state.navbarItems[0].linkTo) {
			for (i = 1; i < this.state.navbarItems.length; i++) {
				if (currPath.search(this.state.navbarItems[i].linkTo) !== -1)
					this.props.onPageChange(i);
			}
		}
	};

	pageChangeHandler = (index) => {
		this.setState({ isOpen: false });
		this.props.onPageChange(index);
	};

	toggle = () => this.setState((prevState) => ({ isOpen: !prevState.isOpen }));

	render() {
		const renderedItems = this.state.navbarItems.map((item, ind) => (
			<NavItem active={this.props.activeIdx === ind} key={"navlink-0" + ind}>
				<NavLink
					active={this.props.activeIdx === ind}
					onClick={() => this.pageChangeHandler(ind)}
					tag={Link}
					to={item.linkTo}
				>
					{item.tagName}
				</NavLink>
			</NavItem>
		));

		const renderMobileShowBtn = (
			<div
				className="position-absolute text-center"
				style={{ zIndex: 100, opacity: 0.9 }}
				onClick={this.toggle}
			>
				<div
					className="position-absolute bg-light"
					style={{ width: "15px", height: "30px" }}
				></div>
				<div
					className="position-absolute bg-light rounded-circle"
					style={{ width: "30px", height: "30px", lineHeight: "30px" }}
				>
					<FontAwesomeIcon icon={faCaretRight} size="lg" />
				</div>
			</div>
		);
		const renderMobileHideBtn = (
			<div
				className="position-absolute text-center"
				style={{ zIndex: 100, opacity: 0.9, right: 0, top: 0 }}
				onClick={this.toggle}
			>
				<div
					className="position-absolute bg-light"
					style={{ width: "15px", height: "30px", right: 0 }}
				></div>
				<div
					className="position-absolute bg-light rounded-circle"
					style={{
						width: "30px",
						height: "30px",
						lineHeight: "30px",
						right: 0,
					}}
				>
					<FontAwesomeIcon icon={faCaretLeft} size="lg" />
				</div>
			</div>
		);

		const defaultStyle = {
			position: `${this.props.isSmallScreen ? "absolute" : "static"}`,
			transitionProperty: "left",
			transitionDuration: "1000ms",
		};

		const transitionStyles = {
			entering: { left: "0%" },
			entered: { left: "0%" },
			exiting: { left: "-100%" },
			exited: { left: "-100%" },
		};

		const renderNavbar = (
			<Transition
				in={this.state.isOpen || !this.props.isSmallScreen}
				timeout={1000}
			>
				{(state) => (
					<div
						key="navbar"
						style={{ ...defaultStyle, ...transitionStyles[state] }}
					>
						<Navbar
							className={`${
								this.props.isSmallScreen ? styles.NavbarSmallScreen : ""
							}`}
							color="dark"
							dark
							expand="sm"
						>
							<Container className="p-0">
								{this.props.isSmallScreen ? (
									renderMobileHideBtn
								) : (
									<NavbarToggler onClick={this.toggle} />
								)}
								<Link className="navbar-brand" to="/">
									<div className="border rounded-circle border-light p-2">
										<img src={Logo} alt="Logo" width="20" />
									</div>
								</Link>
								<Collapse
									isOpen={this.props.isSmallScreen || this.state.isOpen}
									navbar
								>
									<Nav className="mr-auto" navbar>
										{renderedItems}
									</Nav>
									<NavbarText>
										<UncontrolledDropdown>
											<DropdownToggle nav caret>
												<FontAwesomeIcon icon={faUserCog} />
											</DropdownToggle>
											<DropdownMenu right className="bg-dark">
												<DropdownItem
													className="nav-link bg-dark text-light"
													onClick={this.props.onLogout}
												>
													Wyloguj
												</DropdownItem>
											</DropdownMenu>
										</UncontrolledDropdown>
									</NavbarText>
								</Collapse>
							</Container>
						</Navbar>
					</div>
				)}
			</Transition>
		);

		return (
			<div>
				{this.props.isSmallScreen && !this.state.isOpen
					? renderMobileShowBtn
					: ""}
				{renderNavbar}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: Boolean(state.auth.token),
		isSmallScreen: state.window.isSmall,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onLogout: () => dispatch(actions.logout()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(NavbarMenu));
