import React from "react";

const Ingredient = (props) => {
	return (
		<tr>
			<th scope="row">props.title</th>
			<td>props.waga</td>
			<td>props.ilosc</td>
			<td>props.kcal</td>
		</tr>
	);
};

export default Ingredient;