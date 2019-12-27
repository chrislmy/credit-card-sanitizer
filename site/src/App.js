import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './pages/Home/index';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Guide from './pages/Guide';
import Navbar from './components/Navbar';

const routes = () => (
  <Switch>
    <Route path={`${process.env.PUBLIC_URL}/guide`}>
      <Guide />
    </Route>
    <Route path={`${process.env.PUBLIC_URL}/`}>
      <Home />
    </Route>
  </Switch>
);

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      {routes()}
      <Footer />
    </div>
  );
};

export default withRouter(App);
