import { createStore } from 'redux';

import { connect } from 'react-redux';
import { Provider } from 'react-redux';

var actions = require('./model/actions');
var store = require('./model/store');

var UserEditForm = require('./view/usereditform');

var UserEdit = function() {
  store.subscribe(() => {
    console.log(store.getState());
    document.title = 'User ' + store.getState().bio.username;
  });

  store.dispatch(actions.updateBio({
    username:'jpdevries'
  }));


  store.dispatch(actions.addTemplate({
    name:'Product',
    value:'1'
  }));

  store.dispatch(actions.addUser({
    name:'skytoaster',
    value:'skytoaster',
    id:1
  }));

  store.dispatch(actions.addUser({
    name:'modmore',
    value:'modmore',
    id:2
  }));

  /*
  store.dispatch(actions.addNamespace({
    name:'redactor',
    value:'redactor'
  }));
  */


  var UserEditFormController = connect(function(state, props) {
    return {
      bio:state.bio,
      access:state.access,
      security:state.security,
      contact:state.contact,
      settings:state.settings,
      accessPermissions:state.accessPermissions,
      memo:state.memo,
      data:state.data
    }
  })(UserEditForm);

  //return;

  ReactDOM.render(
    <Provider store={store}>
      <UserEditFormController />
    </Provider>,
    document.getElementById('user-edit')
  );
};

exports.UserEdit = UserEdit;
