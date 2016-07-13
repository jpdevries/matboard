var update = require('react-addons-update');

var store = require('./../model/store');
var actions = require('./../model/actions');

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
    //<SettingsTableRowForm user={user} colspan="2" />
    return (
        <SettingsTableRow user={user} className="contextual-setting"
          handleBlur={(event) => (
            console.log('showSetting',this.state.showSetting)
           //this.setState({showSetting:false})
         )} handleFocus={(event) => (
           console.log('showSetting',this.state.showSetting)
           //this.setState({showSetting:true})
         )}
        />
    );
  }
});

var SettingsGridSectionBulkActionsFieldset = function(props) {
  return (
    <form action="/bulk/actions" method="post">
      <fieldset>
        <legend>Bulk Actions</legend>
        <button disabled={!props.emails.length} formAction="bulkactions/activate">Activate</button>
        <button disabled={!props.emails.length} formAction="bulkactions/Suspend">Suspend</button>
        <button disabled={!props.emails.length} formAction="bulkactions/delete">Delete</button>
        <button disabled={!props.emails.length} formAction={'mailto:' + props.emails.join(',') + '?subject=MODX%20Next'} formTarget="_blank">Email</button>
      </fieldset>
    </form>
  );
};

var SettingsTable = React.createClass({
  getInitialState:() => ({
    userFormsToShow:{}
  }),
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
        <SettingsTableRow user={user} className="contextual-setting" bulkToggle={props.bulkToggledUsers[user.id] !== undefined ? props.bulkToggledUsers[user.id] : false} bulkActions={props.bulkActions}
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
        (this.state.userFormsToShow[user.id]) ? <SettingsTableRowForm user={user} userGroup={props.userGroup} colspan={props.bulkActions ? "3" : "2"} /> : undefined
      ]);

    });

    return (
      <table className="settings-table">
        <thead>
          <tr>
            {bulkTh}
            <th>User</th>
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

    if(props.filter !== undefined && props.filter.length) {
      users = users.filter((user) => {
        if(user.username.indexOf(props.filter) > -1) return true;
        return false;
      });
    }

    var bulkActionsFieldset = users.length >= minimumUsersBulkAction ? <SettingsGridSectionBulkActionsFieldset emails={emails} /> : undefined;

    console.log(emails);

    return (
      <section id="core-settings">
        <header>
          <h2>{props.title}</h2>
        </header>
        <div>
          {bulkActionsFieldset}
          <SettingsTable bulkActions={users.length >= minimumUsersBulkAction ? props.bulkActions : false} users={users} bulkToggledUsers={this.state.bulkToggledUsers} userGroup={props.userGroup} handleBulkToggle={(id,checked) => {
            this.setState({
              bulkToggledUsers:update(this.state.bulkToggledUsers, {[id]: {$set:checked}})
            });
          }} handleBulkAllCheck={(allChecked) => {
            console.log('handleBulkAllCheck',allChecked);
            var all = {};
            if(allChecked) {
              users.map((user) => {
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
          <p><a href="#">View all {props.title} users</a></p>
        </footer>
      </section>
    );
  }
});

var SettingsTableRow = function(props) {
  var user = props.user;

  var bulkActionsTd;
  var bulkName = 'bulk-' + user.username;
  if(props.bulkActions) bulkActionsTd = <td><label><input type="checkbox" name={bulkName} checked={props.bulkToggle} onChange={(event) => {
    try {
      props.handleBulkToggle(user.id,event.target.checked)
    } catch(e) {}
  }} /></label></td>;

  return (
    <tr tabIndex="0" onFocus={(event) => {
          try {
            props.handleFocus();
          } catch(e) {}
    }} onBlur={(event) => {
          try {
            props.handleBlur();
          } catch(e) {}
    }}>
      {bulkActionsTd}
      <td>{user.username}</td>
      <td>
        <label>
          <span a11y-hidden>Active: </span>
          <input checked={user.active} type="checkbox" onChange={(event) => (
            store.dispatch(actions.updateUser(user.id,{
              active:event.target.checked
            }))
          )} />
        </label>
      </td>
    </tr>
  );
};

var SettingsTableRowForm = function(props) {
  var user = props.user;
  var userGroup = props.userGroup;

  return (
    <tr {...props}>
      <td colSpan={props.colspan}>
          <form action="/" method="post">
            <input name="user_id" type="hidden" value={user.id} />
            <input name="username" type="hidden" value={user.username} />
            <div className="friendly-labels">
              <label>Sudo: <input name="sudo" checked={user.sudo} type="checkbox" onChange={(event) => {
                store.dispatch(actions.updateUser(user.id,{
                  sudo:event.target.checked
                }))
              }} /></label>
              <label>Active: <input name="active" checked={user.active} type="checkbox" onChange={(event) => {
                store.dispatch(actions.updateUser(user.id,{
                  active:event.target.checked
                }))
              }} /></label>
            </div>
            <p className="subtle balanced oblique">{user.jobTitle}</p>
            <div>
              <button type="submit" className="save">Save</button>
            </div>
            <div><button className="save">Next User</button></div>
            <div>
              <button type="submit" formAction="./quick-edit/user.html">Quick Edit</button>
              <button type="submit" formAction="./../user-edit/index.html">Edit</button>
            </div>
            <div>
              <button type="submit" formAction="duplicate/user" className="save">Duplicate</button>
              <button type="submit" formAction="/api/delete/user">Delete</button>
              <button type="submit" formAction={'mailto:' + user.email + '?subject=MODX%20Next'} formTarget="_blank">Email</button>
            </div>
            <div>
              <button type="submit" className="save">Save</button>
            </div>
            <div style={{marginTop:"1em"}}>
              <button formAction="removefromgroup/user" onClick={(event) => {
                event.preventDefault();
                store.dispatch(actions.removeUserFromGroup(user.id,userGroup.id));
              }}>Remove from Group</button>
            </div>
          </form>
          <footer className="subtle oblique balanced">
            <p>{user.givenName} {user.familyName}’ last login was Jan 23, 2016 4:52pm from Leeuwarden,&nbsp;Nederlands</p>
          </footer>
      </td>
    </tr>
  );
};

module.exports = SettingsGridSection;
