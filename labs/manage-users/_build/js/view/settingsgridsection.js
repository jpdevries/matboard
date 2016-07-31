var update = require('react-addons-update');
var store = require('./../model/store');
var actions = require('./../model/actions');
var ReactFormData = require('react-form-data');

var settings = require('./../model/settings'),
endpoints = settings.endpoints;

// can't use this until a future version of React
var SettingTableRowGroup = React.createClass({
  getInitialState:function(){
    return {
      showSettings:false
    }
  },
  render:function(){
    var props = this.props;
    var user = props.user;
    return (
        <SettingsTableRow user={user} className="contextual-setting" />
    );
  }
});

var SettingsGridSectionBulkActionsFieldset = React.createClass({
  mixins: [ ReactFormData ],
  getInitalState:() => ({
    formAction:'',
    formMethod:'push'
  }),
  handleBulkButtonClick:function(event) {
    this.setState({
      formAction:event.target.getAttribute('formaction'),
      formMethod:event.target.getAttribute('formmethod')
    })
  },
  render:function(){
    var props = this.props;
    var bulkToggledUsers = props.bulkToggledUsers;

    var hiddenBulkToggleInputs = [],
    bulkSelectedUsers = [];
    Object.keys(bulkToggledUsers).forEach(function(key) {
      if(bulkToggledUsers[key]) {
        bulkSelectedUsers.push(key.toString());
        hiddenBulkToggleInputs.push((
          <input key={key} type="hidden" name="bulk-toggle-users[]" value={key} />
        ));
      }
   });

    return (
      <form action="/bulk/actions" method="post" onChange={this.updateFormData} onSubmit={(event) => {


        /*try {
          var formData = new FormData(event.target);
          for(var pair of formData.entries()) {
            console.log(pair);
          }
        } catch (e) {

          console.log(this.formData);
          for (var key in this.formData) {
            console.log(key);
          }
        }*/

        try {
          switch(this.state.formAction) {
            case endpoints.API_USERS_ACTIVATE:
            event.preventDefault();
            store.dispatch(actions.activateUsers(bulkSelectedUsers));
            break;

            case endpoints.API_USERS_DEACTIVATE:
            event.preventDefault();
            store.dispatch(actions.deactivateUsers(bulkSelectedUsers));
            break;

            case endpoints.API_USERS_DELETE:
            event.preventDefault();
            store.dispatch(actions.deleteUsers(bulkSelectedUsers));
            break;
          }
        } catch (e) { }

      }}>
        {hiddenBulkToggleInputs}
        <fieldset>
          <legend>Bulk Actions</legend>
          <button type="submit" disabled={!props.emails.length} className="go" formAction={endpoints.API_USERS_ACTIVATE} formMethod="post" onClick={this.handleBulkButtonClick}>Activate</button>
          <button type="submit" disabled={!props.emails.length} className="danger" formAction={endpoints.API_USERS_DEACTIVATE} formMethod="post" onClick={this.handleBulkButtonClick}>Suspend</button>
          <button type="submit" disabled={!props.emails.length} className="danger" formAction={endpoints.API_USERS_DELETE} formMethod="delete" onClick={this.handleBulkButtonClick}>Delete</button>
          <a className="button" disabled={!props.emails.length} href={'mailto:' + props.emails.join(',') + '?subject=MODX%20Next&body='}>Email</a>
          <a className="button" disabled={!props.emails.length} href={'https://' + props.slackChannel + '.slack.com/messages/@' + props.slackHandles.join(',')} target="_blank">Slack DM</a>
        </fieldset>
      </form>
    );
  }
});

var SettingsTable = React.createClass({
  getInitialState:() => ({
    userFormsToShow:{}
  }),
  handleQuickEdit:function(user,event){
    event.preventDefault();
    event.stopPropagation();
    //console.log('handleQuickEdit!!!',user);
  },
  render:function(){
    var props = this.props;

    var bulkTh;
    if(props.bulkActions) bulkTh = <th><input type="checkbox" onChange={(event) => {
      try {
        this.props.handleBulkAllCheck(event.target.checked)
      } catch(e) {}
    }} /></th>;

    var rows = props.users.map((user) => {

      return([
        <SettingsTableRow user={user} userGroup={props.userGroup} bulkToggle={props.bulkToggledUsers[user.id] !== undefined ? props.bulkToggledUsers[user.id] : false} bulkActions={props.bulkActions}
          handleFocus={(event) => (
            this.setState({
              userFormsToShow:update({}, {[user.id]: {$set:true}})
            })
          )} handleBulkToggle={(id,checked) => {
            try {
              props.handleBulkToggle(id,checked);
            } catch(e) {}
          }}
        />,
        (this.state.userFormsToShow[user.id]) ? <SettingsTableRowForm slackChannel={props.userGroup.slackChannel} handleQuickEdit={this.handleQuickEdit.bind(null, user)} className="contextual-setting"  user={user} userGroup={props.userGroup} colspan={props.bulkActions ? "3" : "2"} /> : undefined
      ]);

    });

    return (
      <table className="settings-table">
        <thead>
          <tr>
            {bulkTh}
            <th className="username">User</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
      </table>
    );
  }
});

var SettingsGridSection = React.createClass({
  getInitialState:function() {
    return {
      bulkToggledUsers:{}
    }
  },
  render:function(){
    var props = this.props;
    var users = props.users;
    var minimumUsersBulkAction = props.minimumUsersBulkAction !== undefined ? props.minimumUsersBulkAction : 3;

    var emails = users.map((user) => (
      (this.state.bulkToggledUsers[user.id]) ? user.email : undefined
    )).filter((email) => email);

    var slackHandles = users.map((user) => (
      (this.state.bulkToggledUsers[user.id]) ? user.slack : undefined
    )).filter((slack) => slack);

    if(props.filter !== undefined && props.filter.length) {
      users = users.filter((user) => {
        if(user.username.indexOf(props.filter) > -1) return true;
        return false;
      });
    }

    var paginationAmount = 12,
    bulkActionsFieldset = users.length >= minimumUsersBulkAction ? <SettingsGridSectionBulkActionsFieldset bulkToggledUsers={this.state.bulkToggledUsers} emails={emails} slackChannel={props.userGroup.slackChannel} slackHandles={slackHandles} /> : false,
    viewAll = (this.props.expanded || this.props.viewProps.pageType == 'detail') ? false : (users.length > paginationAmount) ? (<p><a onClick={(event) => {
      event.preventDefault();
      this.props.handleFilterBy(props.userGroup.id);
    }} href={`${ endpoints.GROUPS }${props.userGroup.id}#fold`}>View all {props.title} users</a></p>) : false,
    paginatedUsers = (this.props.expanded || this.props.viewProps.pageType == 'detail') ? users : users.slice(0, paginationAmount);

    function cssSafeName(name) {
      return name.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '').toLowerCase()
    }

    return (paginatedUsers.length) ? (
      <section id={"user-group-" + props.userGroup.id}>
        <div>
          <header>
            <h2 id={cssSafeName(props.title)}><a className="subtle" href={`${ endpoints.GROUPS }${props.userGroup.id}#fold`}>{props.title}</a></h2>
          </header>
          <div className="balanced">
            <a className="button" href={endpoints.ADD_USER + "?group=" + props.userGroup.id + "#fold"} style={{marginBottom:"2em"}} onClick={(event) => {
              event.preventDefault();
              store.dispatch(actions.flushQuickCreate({
                active:true,
                open:true,
                updating:false,
                roles:{
                  [props.userGroup.id]:[store.getState().roles[0].id]
                }
              }));
              window.scrollTo(0, 0);
            }}>{'Create ' + props.title + ' User'}</a>
          </div>
          <div>
            {bulkActionsFieldset}
            <SettingsTable slackChannel={props.userGroup.slackChannel} bulkActions={paginatedUsers.length >= minimumUsersBulkAction ? props.bulkActions : false} users={paginatedUsers} bulkToggledUsers={this.state.bulkToggledUsers} userGroup={props.userGroup} handleBulkToggle={(id,checked) => {
              this.setState({
                bulkToggledUsers:update(this.state.bulkToggledUsers, {[id]: {$set:checked}})
              });
            }} handleBulkAllCheck={(allChecked) => {
              var all = {};
              if(allChecked) {
                paginatedUsers.map((user) => {
                  all[user.id] = true;
                });
              }
              this.setState({
                bulkToggledUsers:all
              });
            }} />
            {bulkActionsFieldset}
          </div>
          <footer>
            {viewAll}
          </footer>
        </div>
      </section>
    ) : false;
  }
});

var SettingsTableRow = function(props) {
  var user = props.user;

  var bulkActionsTd;
  var bulkName = 'bulk-' + props.userGroup.id + '-' + user.username;
  if(props.bulkActions) bulkActionsTd = <td><label htmlFor={bulkName} className="accessibly-hidden">Select {user.username}</label><input type="checkbox" name={bulkName} checked={props.bulkToggle} onChange={(event) => {
    event.stopPropagation();
    try {
      props.handleBulkToggle(user.id,event.target.checked)
    } catch(e) {}
  }} /></td>;

  return (
    <tr tabIndex="0" onFocus={(event) => {
        //console.log(event.nativeEvent);
          try {
            props.handleFocus();
          } catch(e) {}
    }} onBlur={(event) => {
          try {
            props.handleBlur();
          } catch(e) {}
    }}>
      {bulkActionsTd}
      <td className="username">{user.username}</td>
      <td className="shy balanced checkbox">
        <label>
          <span className="accessibly-hidden">Active: </span>
          <input checked={user.active} type="checkbox" onChange={(event) => (
            store.dispatch(actions.updateUser(user.id,update(user,{$merge:{
              active:event.target.checked
            }})))
          )} />
        </label>
      </td>
    </tr>
  );
};

var SettingsTableRowForm = React.createClass({
  mixins: [ ReactFormData ],
  getInitialState:() => ({
    asyncAction:undefined
  }),
  render:function(){
    var props = this.props;
    var user = props.user;
    var userGroup = props.userGroup;

    //console.log('SettingsTableRowForm');
    //console.log(user);

    return (
      <tr {...props}>
        <td colSpan={props.colspan}>
            <form action={this.state.formAction} method={this.state.formMethod} onChange={this.updateFormData}>
              <input name="user_id" type="hidden" value={user.id} />
              <input name="username" type="hidden" value={user.username} />
              <div className="friendly-labels">
                <label>Sudo: <input name="sudo" checked={user.sudo} type="checkbox" onChange={(event) => {
                  store.dispatch(actions.updateUser(user.id,update(user,{$merge:{
                    sudo:event.target.checked
                  }})))
                }} /></label>
                <label>Active: <input name="active" checked={user.active} type="checkbox" onChange={(event) => {
                  store.dispatch(actions.updateUser(user.id,update(user,{$merge:{
                    active:event.target.checked
                  }})))
                }} /></label>
              </div>
              <p className="subtle balanced oblique">{user.jobTitle}</p>

              <div><a className="button">Next User</a></div>
              <div>
                <a className="button" href={endpoints.UPDATE_USER + user.id} onClick={(event) => {
                  event.preventDefault();
                  //event.stopPropagation();
                  store.dispatch(actions.updateQuickCreate({
                    username:user.username,
                    givenName:user.givenName,
                    familyName:user.familyName,
                    email:user.email,
                    active:user.active,
                    sudo:user.sudo,
                    open:true,
                    updating:true,
                    id:user.id,
                    roles:user.roles
                  }));
                  window.scrollTo(0, 0);
                }}>Quick Edit</a>
                <a className="button" href={endpoints.UPDATE_USER + user.id}>Edit</a>
              </div>
              <div>
                <button type="submit" formAction="duplicate/user" className="save">Duplicate</button>
                <button className="delete" type="submit" onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  store.dispatch(actions.deleteUser(
                    update(user,{$merge:{
                      user_id:user.id
                    }})
                  ));
                }} formMethod="post" formAction={endpoints.USER_DELETE} data-async-action="deleteuser">Delete</button>
                <a className="button" href={'mailto:' + user.email + '?subject=MODX%20Next'}>Email</a>
              </div>
              <div>
                <a className="button" href={"https://" + props.slackChannel + ".slack.com/messages/@" + user.username} target="_blank">Slack DM</a>
              </div>

              <div style={{marginTop:"1em"}}>
                <button formAction={endpoints.USER_REMOVE_FROM_GROUP} onClick={(event) => {
                  event.preventDefault();
                  store.dispatch(actions.removeUserFromGroup(user.id,userGroup.id));
                }}>Remove from Group</button>
              </div>
            </form>
            <footer className="subtle oblique balanced">
              <p>{user.givenName} {user.familyName}’{user.familyName.slice(-1) == 's' ? '' : 's'} last login was Jan 23, 2016 4:52pm from Planet&nbsp;Earth</p>
            </footer>
        </td>
      </tr>
    );
  }
});


module.exports = SettingsGridSection;
