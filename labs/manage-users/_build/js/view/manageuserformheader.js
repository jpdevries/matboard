var actions = require('./../model/actions');
var store = require('./../model/store');
var ReactFormData = require('react-form-data');
var QuickCreateFieldset = require('./quickcreatefieldset');

var CreateSettingsForm = React.createClass({
  mixins: [ ReactFormData ],
  getInitialState:function(){
    return {
      quickCreateOpen:false
    }
  },
  componentWillMount: function() {
    store.subscribe(() => {
      this.setState({quickCreateOpen:store.getState().quickCreate.open})
    });
  },
  handleSubmit: function() {

  },
  render:function() {
    var props = this.props;
    console.log(props);
    var quickCreateUserBtn = this.state.quickCreateOpen ? false : (
      <button onClick={(event) => (
        this.setState({quickCreateOpen:true})
      )}>Quick {props.quickCreate.updating ? 'Update' : 'Create'} User</button>
    );
    /*var fieldsetRoles = [
        {
          key:'administrator',
          title:'Administrator',
          id:1,
          roles:[{
            title:'Super User',
            id:1,
            key:1
          },{
            title:'Editor',
            id:2,
            key:2
          }]
        },
        {
          key:'modmore',
          title:'modmore',
          id:2,
          roles:[{
            title:'Super User',
            id:1,
            key:1
          },{
            title:'Editor',
            id:2,
            key:2
          }]
        },
        {
          key:'mgab',
          title:'MGAB',
          id:3,
          roles:[{
            title:'Super User',
            id:1,
            key:1
          },{
            title:'Editor',
            id:2,
            key:2
          }]
        },
        {
          key:'sterc',
          title:'Sterc',
          id:4,
          roles:[{
            title:'Super User',
            id:1,
            key:1
          },{
            title:'Editor',
            id:2,
            key:2
          }]
        },
        {
          key:'sitebuilders',
          title:'Site Builders',
          id:5,
          roles:[{
            title:'Super User',
            id:1,
            key:1
          },{
            title:'Editor',
            id:2,
            key:2
          }]
        }
    ];
    var fieldsetRolesMarkup = [];
    fieldsetRoles.map(function(group,index){
      var roles = [];
      group.roles.map(function(role,index){
        roles.push(
          <label key={index} htmlFor={'user-group-' + group.key + '-roles[]'}><input type="checkbox" checked={role.checked} ref="userGroupEditorRoles" name={'user-group-' + group.key + '-roles[]'} value={group.id + '|' + role.id} />&nbsp;{role.title}</label>
        );
      });
      fieldsetRolesMarkup.push((
        <fieldset key={index}>
          <legend>{group.title}</legend>
          {roles}
        </fieldset>
      ));
    });*/

    var quickCreate = this.state.quickCreateOpen ? (
      <QuickCreateFieldset  {...props} />
    ) : false;

    console.log('props',props);

    return(
      <form ref="createSettingForm" action={props.quickCreate.updating ? "/update/user" : "/add/user"} method="post" className="create-setting-form" onChange={this.updateFormData} onSubmit={(event) => {
        event.preventDefault();

        var user = {};
        var userGroups = [];

        try { // try to use modern FormData
          var formData = new FormData(this.refs.createSettingForm);
          for(var pair of formData.entries()) {
            user[pair[0]] = pair[1];
            if(pair[0].indexOf('-role') > -1) userGroups.push(parseInt(pair[1].split('|')[0]));
          }
        } catch(e) { // fallback to react-form-data
          for (var key in this.formData) {
            console.log(key);
            user[key] = this.formData[key];
            if(key.indexOf('-role') > -1) {
                this.formData[key].map(function(pair,index){
                  userGroups.push(parseInt(pair.split('|')[0]));
                });
            }
          }
        }

        console.log('user',user);


        userGroups = [...new Set(userGroups)]; // remove duplicates

        var userParams = {
          id:props.quickCreate.id,
          username:props.quickCreate.username,
          givenName:props.quickCreate.givenName,
          familyName:props.quickCreate.familyName,
          email:props.quickCreate.email,
          active:props.quickCreate.active,
          sudo:props.quickCreate.sudo,
          userGroups:userGroups
        };

        if(props.quickCreate.updating) store.dispatch(actions.updateUser(props.quickCreate.id,userParams));
        else store.dispatch(actions.addUser(userParams));


        //this.setState({quickCreateOpen:false});
    }}>
      <div className="top-bar">
        {quickCreateUserBtn}
        <button id="create-user" formaction="./../user-edit/index.html">Create User</button>
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

    var filterBuyOptions = props.fieldsetRoles;

    var filterBuyOptions = props.fieldsetRoles.map((fieldset,index) => (
      <option key={fieldset.id} value={fieldset.id}>{fieldset.title}</option>
    ));

    return (
      <header>
        <h1>Manage Users</h1>
        <div className="create-user-module">
          <CreateSettingsForm {...props} />
        </div>
        <hr />
        <div>
          <h3>Search Users</h3>
          <form action="#" id="search" className="search-settings">
            <label for="search-users">
              <span a11y-hidden>Search: </span>
              <input name="search-users" id="search-users" type="text" placeholder="Search for any User. We'll try and find them." onChange={(event) => {
                try {
                  this.props.handleFilter(event.target.value);
                } catch (e) {}
              }} />
            </label>
            <button type="submit">Search</button>
            <label for="filter-by">Filter by:</label>
            <select name="filter-by" id="filter-by" onChange={(event) => {
              try {
                props.handleFilterBy(parseInt(event.target.value));
              } catch (e) { console.log(e) }
            }}>
              <option checked value="">All</option>
              {filterBuyOptions}
            </select>
          </form>
          <p>Below you will users who have logged in recently per user group.</p>
        </div>
        <hr />
      </header>
    );
  }
});

module.exports = ManageUserFormHeader;
