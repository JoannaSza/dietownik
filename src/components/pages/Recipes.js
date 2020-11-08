import React from 'react';
import Fade from './Diet/test';

class Diet extends React.Component {
  state = { showComp: true };
  render() {
    return (
      <div>
        Strona - Przepisy
        <button
          onClick={() => {
            this.setState((prevState) => {
              console.log(!prevState.showComp);
              return { showComp: !prevState.showComp };
            });
          }}
        >
          show
        </button>
        <Fade inProp={this.state.showComp} />
      </div>
    );
  }
}

export default Diet;
