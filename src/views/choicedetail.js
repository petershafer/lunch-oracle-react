import React, { Component } from 'react';
import plux from '../app/plux';
import actions from '../app/actions';

class ChoiceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { 'details': { } };
  }

  componentDidMount() {
    actions.loaddetails(this.props.match.params.choiceId);
    this.subscription = plux.once("shared", (state) => {
      this.setState({ 'details': state.details, 'detailsloaded': true});
    }, (state) => {
      return state.detailsloaded ? state : false;
    });
  }

  componentWillUnmount() {
    this.subscription.cancel();
    this.setState({ 'details': {}, 'detailsloaded': false });
    actions.cleardetails();
  }

  render() {
    if(this.state.detailsloaded){
      return (
        <div>
          <h3>{this.state.details.name}</h3>
        </div>
      )
    }else{
      return (
        <div>Loading details...</div>
      )
    }
  }
}


export default ChoiceDetail;
