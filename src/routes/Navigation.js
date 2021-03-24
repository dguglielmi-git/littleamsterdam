import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import routes from "./routes";
import { map } from "lodash";

export default function Navigation() {
  return (
    <Router>
      <TransitionGroup>
        <CSSTransition classNames="fade" timeout={300}>
          <Switch>
            {map(routes, (route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props) => (
                  <route.layout>
                    <route.component {...props} />
                  </route.layout>
                )}
              />
            ))}
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </Router>
  );
}
