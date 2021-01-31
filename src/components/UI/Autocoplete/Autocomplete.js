import React from 'react';
import styles from './Autocomplete.module.css';
import { Collapse, Table } from 'reactstrap';

class Autocomplete extends React.Component {
  state = { suggestions: [] };

  componentDidUpdate(prevProps) {
    if (
      prevProps.searchTerm !== this.props.searchTerm &&
      this.props.searchTerm !== ''
    ) {
      const suggestions = this.searchForTerm(
        this.props.searchTerm,
        this.props.elList
      );
      this.setState({ suggestions });
    }
  }
  searchForTerm = (searchQuery, elList) => {
    let i;
    const resultArray = [];
    if (elList && searchQuery) {
      for (i = 0; i < elList.length; i++) {
        if (elList[i].toUpperCase().indexOf(searchQuery.toUpperCase()) > -1) {
          resultArray.push(elList[i]);
        }
      }
    }
    return resultArray;
  };

  render() {
    let renderSuggestions = [];
    const showSuggestions = Boolean(
      this.props.searchTerm.length && this.state.suggestions.length
    );

    if (this.state.suggestions.length) {
      renderSuggestions = this.state.suggestions.map((suggestion) => (
        <tr key={suggestion} onClick={() => this.props.setResult(suggestion)}>
          <td>{suggestion}</td>
        </tr>
      ));
    }

    return (
      <div className='position-relative'>
        {this.props.children}
        <Collapse isOpen={showSuggestions} className={styles.collapse}>
          <div className={styles.autocomplete}>
            {renderSuggestions.length ? (
              <Table hover size='sm' className='m-0'>
                <tbody>{renderSuggestions}</tbody>
              </Table>
            ) : (
              ''
            )}
          </div>
        </Collapse>
      </div>
    );
  }
}
export default Autocomplete;
