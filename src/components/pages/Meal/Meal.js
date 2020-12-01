import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { correctEndOfLineWords } from "../../../shared/utility";

import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Ingredients from "./Ingredients";

class Meal extends React.Component {
	componentDidMount = () => {
		const mealTitle = this.props.match.params.title;
		const category = this.props.match.params.category;
		this.props.onGetMeal(category, mealTitle);
	};
	render() {
		const mealTitle = this.props.match.params.title;

		return (
			<div className="flex-grow-1 bg-rich-black">
				<Container>
					<Row className="mb-5">
						<Col className="text-right">
							<Button className="mt-2" color="ash-gray" size="sm">
								Wróć do listy posiłków
							</Button>
						</Col>
					</Row>
					<Row className="px-5">
						<h3 className="mb-3 pb-2 text-celadon-blue text-center font-courgette">
							{correctEndOfLineWords(mealTitle)}
						</h3>
						<div className="px-2 w-100">
							<Ingredients />
						</div>
					</Row>
					<Row className="text-light px-5 my-5 text-justify">
						<small>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
							maximus, nulla ut commodo sagittis, sapien dui mattis dui, non
							pulvinar lorem felis nec erat Lorem ipsum dolor sit amet,
							consectetur adipiscing elit. Nunc maximus, nulla ut commodo
							sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
							maximus, nulla ut commodo sagittis, sapien dui mattis dui, non
							pulvinar lorem felis nec erat Lorem ipsum dolor sit amet,
							consectetur adipiscing elit. Nunc maximus, nulla ut commodo
							sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
							maximus, nulla ut commodo sagittis, sapien dui mattis dui, non
							pulvinar lorem felis nec erat Lorem ipsum dolor sit amet,
							consectetur adipiscing elit. Nunc maximus, nulla ut commodo
							sagittis, sapien dui mattis dui, non pulvinar lorem felis nec
							eratLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
							maximus, nulla ut commodo sagittis, sapien dui mattis dui, non
							pulvinar lorem felis nec erat Lorem ipsum dolor sit amet,
							consectetur adipiscing elit. Nunc maximus, nulla ut commodo
							sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat
							<br />
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
							maximus, nulla ut commodo sagittis, sapien dui mattis dui, non
							pulvinar lorem felis nec erat Lorem ipsum dolor sit amet,
							consectetur adipiscing elit. Nunc maximus, nulla ut commodo
							sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat
						</small>
					</Row>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onGetMeal: (category, title) => dispatch(actions.getMeal(category, title)),
	};
};

export default connect(null, mapDispatchToProps)(Meal);
