import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot } from "@fortawesome/free-solid-svg-icons";

const Logo = () => {
	return (
		<div className="m-4 display-4 text-warning">
			<span className="border border-dark rounded-circle p-3">
				<FontAwesomeIcon icon={faCarrot} size="lg" />
			</span>
		</div>
	);
};

export default Logo;
