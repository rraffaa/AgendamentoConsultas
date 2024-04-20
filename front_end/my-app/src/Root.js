import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AgendarConsultaForm from './components/agendarconsultaform';

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={AgendarConsultaForm} />
      </Switch>
    </Router>
  );
};

export default Root;