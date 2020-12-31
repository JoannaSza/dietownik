import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";

import FilterButton from "./MealButton";

import Breakfast from "../../../IMG/breakfast.svg";
import Smoothie from "../../../IMG/smoothie.svg";
import Dinner from "../../../IMG/dinner.svg";
import Soup from "../../../IMG/soup.svg";
import Supper from "../../../IMG/supper.svg";
import Cheescake from "../../../IMG/cheesecake.svg";
import Hot from "../../../IMG/hot.svg";
import Cold from "../../../IMG/cold.svg";

const MealButtonsData = [
	{ src: Breakfast, alt: "śniadanie" },
	{ src: Smoothie, alt: "II śniadanie" },
	{ src: Dinner, alt: "obiad" },
	{ src: Soup, alt: "podwieczorek" },
	{ src: Supper, alt: "kolacja" },
	{ src: Cheescake, alt: "Inne" },
];

const TempButtonsData = [
	{ src: Hot, alt: "Na ciepło" },
	{ src: Cold, alt: "Na zimno" },
];

const Diet = (props) => {
	const renderMealButtons = MealButtonsData.map((data, index) => (
		<FilterButton
			id={`mealButton-${index}`}
			key={`mealButton-${index}`}
			{...data}
			isActive={props.activeMeal === data.alt}
			onClick={() => props.onMealChange(data.alt)}
			isImage={true}
		/>
	));

	const renderTempButtons = TempButtonsData.map((data, index) => (
		<FilterButton
			id={`temperatureButton-${index}`}
			key={`temperatureButton-${index}`}
			{...data}
			isActive={props.activeTemp === data.alt}
			onClick={() => props.onTempChange(data.alt)}
			isImage={true}
		/>
	));

	return (
		<div>
			<div className="border border-ash-gray rounded mb-1 bg-celadon-blue d-flex align-items-center justify-content-between">
				<h6 className="m-0 p-1 text-light">Filtruj</h6>
				<span className="p-1">
					<FontAwesomeIcon icon={faThumbtack} />
				</span>
			</div>
			<div className="border border-ash-gray rounded mb-1 d-flex justify-content-center flex-wrap">
				{renderMealButtons}
			</div>
			<div className="border border-ash-gray rounded mb-1 d-flex justify-content-center flex-wrap">
				{renderTempButtons}
			</div>
			{/* <div className='border border-ash-gray rounded mb-1'> </div> */}
		</div>
	);
};

export default Diet;
