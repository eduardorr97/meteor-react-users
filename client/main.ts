import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/renderRoutes';
import '../imports/startup/client';
import '../imports/startup/both';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('react-target'));
});
