import React, { Component } from 'react';
import plux from '../app/plux';
import { 
  Grid,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import actions from '../app/actions';


class Home extends Component {
  constructor(props) {
    super(props);
    const sharedState = plux.getState("shared");
    this.state = {
      'options': sharedState.options,
      'choices': sharedState.choices
    }
  }

  componentDidMount() {
    this.subscription = plux.subscribe("shared", (sharedState) => {
      this.setState({ 'options': sharedState.options });
      this.setState({ 'choices': sharedState.choices });
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={2} >
              { this.state.options.map((option) => <Option name={option.name} active={option.active} key={option.name} />) }
            </Col>
            <Col md={10}>
              { this.state.choices.filter(choice => choice.available).map((choice) => <Choice key={choice.name} name={choice.name} />) }
              { this.state.choices.filter(choice => choice.available).length == 0 ? <p>No choices!</p> : null }
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

class Option extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  handleClick(e) {
    actions.toggleoption(this.props.name);
  }

  render() {
    return (
      <ul className="optionMenu">
        <li><Button bsSize="xsmall" bsStyle={this.props.active ? 'primary' : 'default'} active={this.props.active} onClick={ this.handleClick.bind(this) } block>{ this.props.name }</Button></li>
      </ul>
    )
  }
}

class Choice extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <p>{this.props.name}</p>
    )
  }
}


export default Home;
