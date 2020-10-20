import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = (props) => {
	const append = props.append ? (
		<div className="input-group-append" onClick={() => props.appendOnClick()}>
			<div className={`input-group-text bg-white text-secondary btn`}>
				<FontAwesomeIcon icon={props.append} />
			</div>
		</div>
	) : null;
	return (
		<div className="row mb-0">
			<div className="col-1 pl-0 pr-1 my-auto text-muted">
				<FontAwesomeIcon icon={props.icon} />
			</div>
			<div className="input-group col p-0">
				<input
					className="form-control"
					type={props.type}
					placeholder={props.placeholder}
					value={props.value}
					onChange={(event) => {
						event.persist();
						if (event.target) return props.onChange(event);
					}}
				/>
				{append}
			</div>
		</div>
	);
};

// ${styles.AddHover}
export default Input;
