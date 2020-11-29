import React from "react";
import styles from "./Meal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const Meal = (props) => {
	return (
		<div
			className={`py-2 px-4 my-2 rounded bg-light border-ash-gray border-rounded w-100 text-justify ${styles.MealTitle}`}
		>
			<h5 className="mb-1">
				<small>{props.meal}</small>
			</h5>
			<div className="border-top border-rich-black text-right pt-1">
				<a
					onClick={props.onViewClick}
					href="#"
					className="px-2 py-0 btn text-celadon-blue"
				>
					<FontAwesomeIcon icon={faEye} size="sm" />
				</a>
				<a
					onClick={props.onEditClick}
					href="/"
					className="px-2 py-0 btn text-celadon-blue"
				>
					<FontAwesomeIcon icon={faPen} size="sm" />
				</a>
				<a
					onClick={props.onDeleteClick}
					href="/"
					className="px-2 py-0 btn text-celadon-blue"
				>
					<FontAwesomeIcon icon={faTrash} size="sm" />
				</a>
			</div>
		</div>
	);
};

export default Meal;
