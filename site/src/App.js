import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './pages/Home/index';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Guide from './pages/Guide';
import TryItYourself from './pages/TryItYourself';
import Navbar from './components/Navbar';

const routes = () => (
  <Switch>
    <Route path="/guide">
      <Guide />
    </Route>
    <Route path="/try-it-yourself">
      <TryItYourself />
    </Route>
    <Route path="/">
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
