import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faSquare } from "@fortawesome/free-regular-svg-icons";

const Checkbox = (props) => {
	return (
		<div className="w-100" onClick={() => props.onClick()}>
			{props.checked ? (
				<FontAwesomeIcon icon={faCheckSquare} />
			) : (
				<FontAwesomeIcon icon={faSquare} />
			)}
			<span className="pl-2">{props.children}</span>
		</div>
	);
};

export default Checkbox;
