import React from 'react';
import styles from './Autocomplete.module.css';
import { Collapse, Table } from 'reactstrap';

class Autocomplete extends React.Component {
  state = { suggestions: [], currSuggestion: 0 };

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

  contains = (parent, child) => {
    if (!child || !child.parentElement) return false;
    if (child.parentElement === parent) return true;

    return this.contains(parent, child.parentElement);
  };

  handleBlur = (e) => {
    const target = e.relatedTarget;
    const parent = e.currentTarget;
    if (!this.contains(parent, target)) {
      this.props.onBlur(e);
    }
  };

  handleKeyboard = (e) => {
    let newSuggestionIndex;
    if (
      e.keyCode === 40 &&
      this.state.currSuggestion < this.state.suggestions.length - 1
    )
      newSuggestionIndex = this.state.currSuggestion + 1;
    else if (e.keyCode === 38 && this.state.currSuggestion > 0)
      newSuggestionIndex = this.state.currSuggestion - 1;
    else if (e.keyCode === 13)
      this.props.setResult(this.state.suggestions[this.state.currSuggestion]);

    if (newSuggestionIndex !== undefined)
      this.setState({ currSuggestion: newSuggestionIndex });
  };

  render() {
    let renderSuggestions = [];
    const showSuggestions = Boolean(
      this.props.searchTerm.length && this.state.suggestions.length
    );

    if (this.state.suggestions.length) {
      renderSuggestions = this.state.suggestions.map((suggestion, index) => (
        <tr
          className={
            index === this.state.currSuggestion ? `${styles.rowOnArrow}` : ''
          }
          key={suggestion}
        >
          <td onClick={() => this.props.setResult(suggestion)}>{suggestion}</td>
        </tr>
      ));
    }

    return (
      <div
        className='position-relative'
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyboard}
      >
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
