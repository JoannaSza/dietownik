import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';

class OverflowTip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overflowed: false,
      tooltipOpen: false,
    };
    this.textElement = React.createRef();
  }

  componentDidMount() {
    const childrenArray = this.textElement.current.children;
    this.setState({
      overflowed: childrenArray[0].scrollWidth > childrenArray[0].clientWidth,
    });
  }

  toggleTooltip = () => this.setState({ tooltipOpen: !this.state.tooltipOpen });

  render() {
    const tooltipID =
      'TooltipTarget-' + this.props.tooltip.replace(/[^A-Za-z0-9]/g, '-');
    return (
      <div
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        <div id={tooltipID} ref={this.textElement}>
          {this.props.children}
        </div>
        {this.state.overflowed ? (
          <Tooltip
            target={tooltipID}
            isOpen={this.state.tooltipOpen}
            toggle={this.toggleTooltip}
          >
            {this.props.tooltip}
          </Tooltip>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default OverflowTip;
