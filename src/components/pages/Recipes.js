import React from 'react';

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
      </div>
    );
  }
}

export default Diet;
