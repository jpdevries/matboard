import { createStore } from 'redux';

import { connect } from 'react-redux';
import { Provider } from 'react-redux';

var actions = require('./model/actions');
var store = require('./model/store');

var ManageUsersForm = require('./view/manageusersform');

var ManageUsers = function() {
  store.subscribe(() => {
    console.log(store.getState());
  });

  /*store.dispatch(actions.addUserGroup({
    title:'modmore'
  }));

  store.dispatch(actions.addUser({
    username:'marcjenkins',
    givenName:'Marc',
    familyName:'Jenkins',
    email:'marc@modmore.com',
    active:true,
    sudo:true,
    jobTitle:'Marketing Director',
    userGroups:[1]
  }));*/

  //store.dispatch(actions.addUserToGroup(0,2));

  var ManageUsersFormController = connect(function(state, props) {
    return {
      quickCreate:state.quickCreate,
      users:state.users.sort((a,b) => ( // sort alphabetically
        (a.username > b.username) ? 1 : -1
      )),
      userGroups:state.userGroups,
      roles:state.roles,
      viewProps:state.viewProps
    }
  })(ManageUsersForm);

  ReactDOM.render(
    <Provider store={store}>
      <ManageUsersFormController />
    </Provider>,
    document.getElementById('manage-users-form')
  );
};

exports.ManageUsers = ManageUsers;
