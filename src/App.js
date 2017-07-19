import React, { Component } from 'react';
import './App.css';
import plux from './app/plux';
import { 
  Grid,
  Row,
  Col 
} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import stores from './app/stores';
import actions from './app/actions';
import Home from './views/home';


const ChoiceDetail = ({ match }) => (
  <div>
    <h3>-{match.params.choiceId}-</h3>
  </div>
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {dataloaded: false};
  }

  viewRender(dataloaded){
    if(dataloaded){
      return (
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/choice/:choiceId" component={ChoiceDetail}/>
          </div>
        )
    }else{
      return (
          <p>Data is being loaded...</p>
        )
    }
  }

  componentDidMount() {
    stores();
    actions.loadconfig();
    plux.once("shared", (state) => this.setState({dataloaded: true}), (state) => state.dataloaded ? state : false);
  }

  render() {
    return (
      <Router>
        <div>
          <div>
            {/* Top Header */}
            {/* <NavLink to="/" activeClassName="selected" exact>Home</NavLink> | <NavLink to="/choice/mychoice" activeClassName="selected">Choice</NavLink> */}
          </div>
          <div>
            {/* Primary View */}
            { this.viewRender(this.state.dataloaded) }
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
