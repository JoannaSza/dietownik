import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

class Tabs extends React.Component {
  state = { activeTab: '1' };

  toggle = (tab) => {
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  };

  render() {
    const renderTabLinks =
      this.props.tabNames.length !== 0
        ? this.props.tabNames.map((navTab, index) => (
            <NavItem key={'tabNavItem-' + index}>
              <NavLink
                className={`btn btn-sm btn-outline-celadon-blue my-1 ${
                  this.state.activeTab === String(index + 1) ? 'active' : ''
                }`}
                onClick={() => {
                  this.toggle(String(index + 1));
                }}
              >
                {navTab}
              </NavLink>
            </NavItem>
          ))
        : null;
    console.log(this.props.children);
    const renderTabContent =
      this.props.children.length !== 0
        ? this.props.children.map((cont, index) => (
            <TabPane tabId={String(index + 1)} key={'tabCont' + index}>
              {cont}
            </TabPane>
          ))
        : null;
    return (
      <div>
        <Nav tabs>{renderTabLinks}</Nav>
        <TabContent
          className='border border-light'
          activeTab={this.state.activeTab}
        >
          {renderTabContent}
        </TabContent>
      </div>
    );
  }
}

export default Tabs;
