import * as React from 'react'
import { Router, Route, IndexRoute, Link, browserHistory, hashHistory } from 'react-router'

import { App } from './App'


const Welcome = () => <h3>Welcome Page</h3>
const About = () => <h3>Abount Page</h3>


class RouterComponent extends React.PureComponent<Router.RouteComponentProps<{}, {}>, {}> {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/app">App</Link></li>
          <li><Link to="/welcome">welcome</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}


export const routerElement = (
  <Router history={hashHistory}>
    <Route path="/" component={RouterComponent}>
      <IndexRoute component={App} />
      <Route path="app" component={App} />
      <Route path="welcome" component={Welcome} />
      <Route path="about" component={About} />
    </Route>
  </Router>
)
