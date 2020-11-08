import BookCollections from './containers/BookCollections/BookCollections';
import BookSearch from "./containers/BookSearch/BookSearch";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import React from "react";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/search"/>}/>
        <Route path="/search" component={BookSearch} />
        <Route path="/collections" component={BookCollections} />
      </Switch>
    </Layout>
  );
};

export default App;