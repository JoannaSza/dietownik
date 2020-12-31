import React from "react";
import { Container, Row, Col, Spinner } from "reactstrap";
import {
	faSearch,
	faTimesCircle,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { connect } from "react-redux";
import * as actions from "../../../store/actions";

import InputGroup from "../../UI/InputGroup";
import Filters from "./Filters";
import Footer from "./Footer";
import MealsList from "./MealsList";
import mealStyle from "./Meal.module.css";
import Pagination from "../../UI/PaginationEl";

import { updateObject } from "../../../shared/utility";

class Diet extends React.Component {
	state = {
		searchbar: {
			prepend: faSearch,
			value: "",
			elementConfig: {
				type: "text",
				placeholder: "Szukaj",
			},
		},
		filters: {
			meal: "śniadanie",
			temp: "",
		},
		activePage: 1,
		pagesNumber: 5,
	};

	componentDidMount = () => {
		const category = this.props.match.params.category;
		let filters = { ...this.state.filters };
		let newActivePage;

		//set meal category
		if (category) {
			this.props.onGetMeals(category);
			filters = updateObject(this.state.filters, { meal: category });
		} else this.props.onGetMeals(this.state.filters.meal);

		//set page for pagination
		const searchParams = new URLSearchParams(this.props.location.search);

		//get page param and set it as newActivePage - if exists else 0
		newActivePage = searchParams.get("page");
		newActivePage = newActivePage ? +newActivePage : 0;

		this.props.history.push(`/posilki/${filters.meal}`);
		this.setState({ filters: filters, activePage: newActivePage });
	};

	componentDidUpdate = () => {
		if (!this.props.match.params.category)
			this.props.history.push(`/posilki/${this.state.filters.meal}`);
	};

	clearSearchbar = () => {
		this.setState({
			searchbar: updateObject(this.state.searchbar, { value: "" }),
		});
	};

	inputChangedHandler = (event) => {
		const value = event.target.value;
		this.setState({
			searchbar: updateObject(this.state.searchbar, {
				value: value,
			}),
		});
		this.props.onGetMeals(this.state.activeCategory, value);
	};

	filterChangeHandler = (filter, value) => {
		this.setState({
			filters: updateObject(this.state.filters, { [filter]: value }),
		});
		if (filter === "meal") {
			this.props.onGetMeals(value);

			this.props.history.push(`/posilki/${value}`);
		}
	};

	pageClickHandler = (cmd, target) => {
		let newActivePage;

		switch (cmd) {
			case "page":
				newActivePage = target;
				break;
			case "prev":
				this.state.activePage > 0
					? (newActivePage = this.state.activePage - 1)
					: (newActivePage = 0);
				break;
			case "next":
				this.state.activePage < this.state.pagesNumber - 2
					? (newActivePage = this.state.activePage + 1)
					: (newActivePage = this.state.pagesNumber - 1);
				break;
			default:
				break;
		}
		this.setState({ activePage: newActivePage });

		const location = {
			...this.props.location,
			search: new URLSearchParams({
				page: newActivePage,
			}).toString(),
		};
		this.props.history.push(location);
	};

	render() {
		const renderAddMeal = (
			<div
				onClick={() => this.props.history.push("/posilki/nowy")}
				className={`py-2 px-4 my-2 card-link rounded border border-ash-gray border-rounded w-100 text-justify ${mealStyle.AddButton}`}
			>
				<h5 className="mb-1 text-center text-light border-bottom border-light">
					<small>Dodaj nowy posiłek </small>
					<a href="#" className="px-2 py-0 btn text-celadon-blue">
						<FontAwesomeIcon icon={faPlus} size="sm" />
					</a>
				</h5>
			</div>
		);
		return (
			<div className="d-flex flex-grow-1 no-gutters bg-rich-black flex-column">
				<div className="h-100">
					<Container className="my-3 border border-ash-gray rounded bg-ash-gray">
						<InputGroup
							className={"m-3"}
							prepend={this.state.searchbar.prepend}
							elementConfig={this.state.searchbar.elementConfig}
							value={this.state.searchbar.value}
							append={faTimesCircle}
							appendOnClick={this.clearSearchbar}
							changed={this.inputChangedHandler}
							touched={false}
						/>
					</Container>
					<Container>
						<Row>
							<Col className="pl-0 d-flex flex-column" xs="4">
								<Filters
									activeMeal={this.state.filters.meal}
									onMealChange={(value) =>
										this.filterChangeHandler("meal", value)
									}
									activeTemp={this.state.filters.temp}
									onTempChange={(value) =>
										this.filterChangeHandler("temp", value)
									}
								/>
								{renderAddMeal}
							</Col>
							<Col className="pl-0 d-flex flex-column" xs="8">
								<div className="container py-2 border border-ash-gray rounded">
									<MealsList history={this.props.history} />
								</div>
								<div>
									<Pagination
										className="d-flex justify-content-center pagination-celadon-blue"
										size="sm"
										currentPage={this.state.activePage}
										pagesCount={this.state.pagesNumber} //here will be calculation based on number of records
										handlePageClick={(e, page) =>
											this.pageClickHandler("page", page)
										}
										handlePreviousClick={() => this.pageClickHandler("prev")}
										handleNextClick={() => this.pageClickHandler("next")}
									/>
								</div>
							</Col>
						</Row>
					</Container>
				</div>

				<Footer />
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onGetMeals: (activeCategory, query) =>
			dispatch(actions.getMeals(activeCategory, query)),
	};
};

export default connect(null, mapDispatchToProps)(Diet);
