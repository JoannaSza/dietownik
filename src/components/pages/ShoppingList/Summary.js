import React from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import ItemsTable from './ItemsTable';

const Summary = (props) => {
  const summaryList = {};
  if (
    //if all lists are already downloaded to redux state
    props.shoppingLists &&
    props.shoppingLists.hasOwnProperty('own') &&
    props.shoppingLists.hasOwnProperty('diet') &&
    props.shoppingLists.hasOwnProperty('csv')
  ) {
    //create shorter names for every list
    const own = props.shoppingLists.own;
    const diet = props.shoppingLists.diet;
    const csv = props.shoppingLists.csv;
    //1) create list of all existing in these lists products categories
    let categories = [
      ...new Set([
        ...Object.keys(own),
        ...Object.keys(diet),
        ...Object.keys(csv),
      ]),
    ];

    //2) for each category add products from every list
    categories.forEach((category) => {
      summaryList[category] = {};
      if (own.hasOwnProperty(category)) {
        Object.keys(own[category]).forEach((product) => {
          summaryList[category][product] = own[category][product];
        });
      }
      if (diet.hasOwnProperty(category)) {
        Object.keys(diet[category]).forEach((product) => {
          // if (summaryList[category][product])
          summaryList[category][product] =
            ~~summaryList[category][product] + diet[category][product];
          //else summaryList[category][product] = diet[category][product];
        });
      }
      if (csv.hasOwnProperty(category)) {
        Object.keys(csv[category]).forEach((product) => {
          //  if (summaryList[category][product])
          summaryList[category][product] =
            ~~summaryList[category][product] + csv[category][product];
          //  else summaryList[category][product] = csv[category][product];
        });
      }
    });
  }
  return <ItemsTable shoppingList={summaryList} listType='summary' />;
};

const mappStateToProps = (state) => ({
  shoppingLists: state.shoppingList.shoppingList,
});

export default connect(mappStateToProps)(Summary);
