import React from "react";
import styles from "./Ingredients.module.css";
import { Container, Row, Input, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChild } from "@fortawesome/free-solid-svg-icons";

import Ingredient from "./Ingredient";

const Ingredients = (props) => {
	return (
		<Container className={styles.IngredientsContainer}>
			<Row className="font-weight-bold pt-2 px-3 d-flex justify-content-between">
				<h4 className="mb-0 align-self-center">Składniki</h4>
				<h4 className="d-flex mb-0">
					<div className="pr-2 align-self-center">
						<FontAwesomeIcon icon={faChild} />
					</div>

					<Input
						className="align-self-center"
						type="number"
						size="sm"
						style={{ width: "60px", height: "80%" }}
					/>
				</h4>
			</Row>
			<hr className="border-light rounded mx-3 mt-2" />
			<Row className="px-5">
				<Table className="text-light" borderless hover>
					<tbody>
						<Ingredient />
						<tr>
							<th scope="row">2</th>
							<td>Jacob</td>
							<td>Thornton</td>
							<td>@fat</td>
						</tr>
						<tr>
							<th scope="row">3</th>
							<td>Larry</td>
							<td>the Bird</td>
							<td>@twitter</td>
						</tr>
					</tbody>
				</Table>
			</Row>
		</Container>
	);
};

export default Ingredients;
