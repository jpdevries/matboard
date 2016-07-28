var actions = require('./../model/actions');
var store = require('./../model/store');
var ReactFormData = require('react-form-data');
var QuickCreateFieldset = require('./quickcreatefieldset');
var update = require('react-addons-update');

var settings = require('./../model/settings'),
endpoints = settings.endpoints;

var CreateSettingsForm = React.createClass({
  mixins: [ ReactFormData ],
  getInitialState:function(){
    return {
      quickCreateOpen:false,
      formMethod:''
    }
  },
  componentWillMount: function() {
    store.subscribe(() => {
      this.setState({quickCreateOpen:store.getState().quickCreate.open})
    });
  },
  handleDeleteUser:function(event) {
    //console.log('handleDeleteUser',event);
    this.setState({formMethod:'delete'});
  },
  render:function() {
    var props = this.props;
    //console.log(props);
    var quickCreateUserBtn = this.state.quickCreateOpen ? false : (
      <a href={endpoints.ADD_USER} className="button" onClick={(event) => {
        event.preventDefault();
        store.dispatch(actions.updateQuickCreate({open:true}));
      }}>Quick {props.quickCreate.updating ? 'Update' : 'Create'} User</a>
    );

    var quickCreate = this.state.quickCreateOpen ? (
      <QuickCreateFieldset  {...props} handleDeleteUser={this.handleDeleteUser} />
    ) : false;

    return(
      <form ref="createSettingForm" action={props.quickCreate.updating ? endpoints.UPDATE_USER + props.quickCreate.id : endpoints.ADD_USER} method="post" className="create-setting-form" onChange={this.updateFormData} onSubmit={(event) => {
        event.preventDefault();
        //console.log('onSubmit',this.state.formMethod,props.quickCreate);

        switch(this.state.formMethod) {
          case 'delete':
          store.dispatch(actions.deleteUser(
            update({},{$merge:{
              user_id:props.quickCreate.id,
              id:props.quickCreate.id
            }})
          )).then(() => (
          closeQuickCreate(this)
        ));
          return;
        }

        var user = {};
        var userGroups = [];

        try { // try to use modern FormData
          var formData = new FormData(this.refs.createSettingForm);
          for(var pair of formData.entries()) {
            user[pair[0]] = pair[1];
            if(pair[0].indexOf('-role') > -1) {
              userGroups.push(parseInt(pair[1].split('|')[0]));
            }
          }
        } catch(e) { // fallback to react-form-data
          //console.log(this.formData)
          for (var key in this.formData) {
            //console.log(key);
            user[key] = this.formData[key];
            if(key.indexOf('-role') > -1) {
                this.formData[key].map(function(pair,index){
                  userGroups.push(parseInt(pair.split('|')[0]));
                });
            }
          }
        }

        for(var group in props.quickCreate.roles) {
          //console.log('group',group,props.quickCreate.roles[group]);
          userGroups.push(parseInt(group));
        }

        userGroups = [...new Set(userGroups)]; // remove duplicates

        userGroups = userGroups.map((userGroup) => ( // make sure sure sure they are numbers #consider changing
          parseInt(userGroup)
        ));

        //console.log('userGroups',userGroups);

        userGroups = userGroups.filter((userGroup) => ( // kinda weird to have to do this, expected userGroups to be removed, maybe a formData bug with the React mixin (polyfill)
          (props.quickCreate.roles[userGroup] !== undefined && props.quickCreate.roles[userGroup].length) ? true : false
        ));

        //console.log('userGroups',userGroups,'props.quickCreate.roles',props.quickCreate.roles);

        var userParams = {
          id:props.quickCreate.id,
          username:props.quickCreate.username,
          givenName:props.quickCreate.givenName,
          familyName:props.quickCreate.familyName,
          email:props.quickCreate.email,
          active:props.quickCreate.active,
          sudo:props.quickCreate.sudo,
          roles:props.quickCreate.roles,
          userGroups:userGroups
        };


        (
          (props.quickCreate.updating) ? store.dispatch(actions.updateUser(props.quickCreate.id,userParams)) : store.dispatch(actions.addUser(userParams))
        ).then(() => (
          closeQuickCreate(this)
        ));

        function closeQuickCreate(that) {
          that.setState({quickCreateOpen:false});
          store.dispatch(actions.flushQuickCreate());
        }
    }}>
      <div className="top-bar">
        {quickCreateUserBtn}
        <a className="button" href={endpoints.ADD_USER}>Create User</a>
      </div>
      {quickCreate}
    </form>
  );
  }
});

var ManageUserFormHeader = React.createClass({
  getInitialState:function(){
    return {};
  },
  render:function(){
    var props = this.props;

    //console.log('props.viewProps',props.viewProps);

    var filterBuyOptions = props.userGroups.map((userGroup,index) => (
      <option key={userGroup.id} value={userGroup.id}>{userGroup.title}</option>
    ));

    var filterByLabel = (props.viewProps.showFilterBy) ? <label htmlFor="filter-by">Filter <span className="accessibly-hidden">Users</span> by<span className="accessibly-hidden"> User Group</span>:</label> : false;

    var filterBy = (props.viewProps.showFilterBy) ? (
      <select name="filter-by" id="filter-by" value={props.filterBy} onChange={(event) => {
        try {
          props.handleFilterBy(parseInt(event.target.value));
        } catch (e) { }
      }}>
      <option checked value="">All</option>
      {filterBuyOptions}
      </select>) : false;

    return (
      <header>
        <h1>Manage Users</h1>
        <div className="create-user-module">
          <CreateSettingsForm {...props} />
        </div>
        <hr />
        <div>
          <h3 id="search-users">Search Users</h3>
          <form action="#" id="search" className="search-settings">
            <label for="search-users">
              <span className="accessibly-hidden">Search: </span>
              <input name="search-users" id="search-users" type="text" placeholder="Search for any User. We'll try and find them." onChange={(event) => {
                try {
                  this.props.handleFilter(event.target.value);
                } catch (e) {}
              }} />
            </label>
            <div>
              <button type="submit">Search</button>
            </div>
            {filterByLabel}
            {filterBy}
          </form>
          <p>Below you will users who have logged in recently per user group.</p>
        </div>
        <hr />
      </header>
    );
  }
});

module.exports = ManageUserFormHeader;
