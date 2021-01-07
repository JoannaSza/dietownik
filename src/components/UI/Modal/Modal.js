import React from "react";
import styles from "./Modal.module.css";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const fullModal = (props) => {
	return (
		<Modal
			isOpen={props.isOpen}
			toggle={props.toggle}
			className={props.className}
		>
			<ModalHeader toggle={props.toggle}>{props.title}</ModalHeader>
			<ModalBody className={styles.Modal}>{props.children}</ModalBody>
			<ModalFooter>
				{props.btn1 ? (
					<Button color="celadon-blue" onClick={props.onSubmit}>
						{props.btn1}
					</Button>
				) : null}
				{props.btn2 ? (
					<Button color="secondary" onClick={props.onReject}>
						{props.btn2}
					</Button>
				) : null}
			</ModalFooter>
		</Modal>
	);
};
export default fullModal;
