import React from 'react';

import { Switch, Route, Redirect } from 'react-router';
import { routes } from '../config/routes';
import EditPage from './EditPage';
import MainPage from './MainMenu/MainPage';
import LoadLabirint from './MainMenu/LoadLabirint';
import CreateNewLabirint from './MainMenu/CreateNewLabirint';

const ContentPage: React.FC = () => (
  <Switch>
    <Route exact path={routes.home} component={MainPage} />
    <Route path={routes.editPage} component={EditPage} />
    <Route path={routes.loadLabirint} component={LoadLabirint} />
    <Route path={routes.createNewLabirint} component={CreateNewLabirint} />
    <Redirect to={routes.home} />
  </Switch>
);

export default ContentPage;
