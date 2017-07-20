import React, { Component } from 'react';
import plux from '../app/plux';
import { 
  Grid,
  Row,
  Col,
  Button,
  Collapse,
  Glyphicon
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
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

  clearOptions() {
    actions.clearoptions();
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={2} >
              <ul className="optionMenu">
                <li><Button bsSize="xsmall" bsStyle="danger" onClick={ this.clearOptions.bind(this) } block><Glyphicon glyph="remove" /> Clear</Button></li>
                { this.state.options.map((option) => <Option name={option.name} active={option.active} key={option.index} />) }
              </ul>
            </Col>
            <Col md={10}>
              { this.state.choices.map((choice) => <Choice key={choice.index} id={choice.index} name={choice.name} active={choice.available} />) }
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
      <li><Button bsSize="xsmall" bsStyle={this.props.active ? 'primary' : 'default'} active={this.props.active} onClick={ this.handleClick.bind(this) } block>{ this.props.name }</Button></li>
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
      <Collapse in={this.props.active}>
        <div>
          <p><Link to={`/choice/${this.props.id}`}>{this.props.name}</Link></p>
        </div>
      </Collapse>
    )
  }
}


export default Home;
