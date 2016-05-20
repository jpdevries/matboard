import { createStore } from 'redux';

import { connect } from 'react-redux';
import { Provider } from 'react-redux';

var actions = require('./model/actions');
var store = require('./model/store');

var ResourceEditForm = require('./view/resourceeditform');

var MetaBox = function() {
  store.subscribe(() => {
    console.log(store.getState());
    document.title = 'Editing ' + store.getState().meta.pagetitle;
  }
  );

  store.dispatch(actions.updateMeta({
    pagetitle:'Hello World!'
  }));

  store.dispatch(actions.updateMeta({
    template:1
  }));

  store.dispatch(actions.updateSettings({
    searchable:true,
    richText:true
  }));

  store.dispatch(actions.updatePublication({
    publishedon:new Date()
  }));

  store.dispatch(actions.updateMeta({
    pagetitle:'rad'
  }));

  //store.dispatch(actions.updateResourceGroup(0,true));

  store.dispatch(actions.updateContent('This is content'));

  var ResourceEditFormController = connect(function(state, props) {
    return {
      meta:state.meta,
      settings:state.settings,
      publication:state.publication,
      resourceGroups:state.resourceGroups,
      content:state.content
    }
  })(ResourceEditForm);

  ReactDOM.render(
    <Provider store={store}>
      <ResourceEditFormController />
    </Provider>,
    document.getElementById('resource-edit-form')
  );
};

exports.MetaBox = MetaBox;
