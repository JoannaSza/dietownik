import React from 'react';
import styles from './Diet.module.css';

class Diet extends React.Component {
  render() {
    return (
      <div>
        Strona - Dieta
        <div className={styles.smallScreen}>Visible on small screen</div>
      </div>
    );
  }
}

export default Diet;
