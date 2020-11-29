import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { correctEndOfLineWords } from "../../../shared/utility";

class Meal extends React.Component {
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
						<h3 className="text-celadon-blue text-center font-courgette">
							{correctEndOfLineWords(mealTitle)}
						</h3>
					</Row>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

export default Meal;
