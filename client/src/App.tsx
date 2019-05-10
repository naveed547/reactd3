import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route,  Switch} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import store from "./store";
import { TransactionAppState } from "./store/types";
import "./styles/styles.scss";
import TransactionContainer from 'Containers/TransactionContainer';

export default class App extends React.Component<any, TransactionAppState> {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" render={(props) => (<TransactionContainer {...props} />)} />
            <Route component={render => (<div>no data </div>)} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
