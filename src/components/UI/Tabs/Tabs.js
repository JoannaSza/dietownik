import React, { useState } from "react";
import {
	TabContent,
	TabPane,
	Nav,
	NavItem,
	NavLink,
	Card,
	Button,
	CardTitle,
	CardText,
	Row,
	Col,
} from "reactstrap";
import classnames from "classnames";

const Example = (props) => {
	const [activeTab, setActiveTab] = useState("1");
	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	const renderTabLinks =
		props.tabNames.length !== 0
			? props.tabNames.map((navTab, index) => (
					<NavItem key={"tabNavItem-" + index}>
						<NavLink
							className={`btn btn-sm btn-outline-celadon-blue my-1 ${
								activeTab === String(index + 1) ? "active" : ""
							}`}
							onClick={() => {
								toggle(String(index + 1));
							}}
						>
							{navTab}
						</NavLink>
					</NavItem>
			  ))
			: null;
	console.log(props.children);
	const renderTabContent =
		props.children.length !== 0
			? props.children.map((cont, index) => {
					<TabPane tabId={String(index)} key={"tabCont" + index}>
						{cont}
					</TabPane>;
			  })
			: null;

	console.log(renderTabContent);

	return (
		<div>
			<Nav tabs>{renderTabLinks}</Nav>
			<TabContent activeTab={activeTab}>{renderTabContent}</TabContent>
		</div>
	);
};

export default Example;
