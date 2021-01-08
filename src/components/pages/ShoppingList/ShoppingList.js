import React from "react";
import Tabs from "../../UI/Tabs/Tabs";
import { Container, Row, Col } from "reactstrap";

const tabNames = ["tab1", "tab2"];

const tab1 = () => {
	return (
		<Row className="text-light">
			<Col sm="12">
				<h4>Tab 1 Content</h4>
			</Col>
		</Row>
	);
};

const tab2 = () => {
	return (
		<Row className="text-light">
			<Col sm="12">
				<h4>Tab 2 Content</h4>
			</Col>
		</Row>
	);
};

const tabsContent = [<tab1 />, <tab2 />];

class ShoppingList extends React.Component {
	render() {
		console.log(tabsContent);
		return (
			<div className="d-flex flex-grow-1 no-gutters bg-rich-black flex-column">
				<Container className="mt-4">
					<Tabs tabNames={tabNames}>
						<Row className="text-light">
							<Col sm="12">
								<h4>Tab 1 Content</h4>
							</Col>
						</Row>
						<Row className="text-light">
							<Col sm="12">
								<h4>Tab 2 Content</h4>
							</Col>
						</Row>
					</Tabs>
				</Container>
			</div>
		);
	}
}

export default ShoppingList;
