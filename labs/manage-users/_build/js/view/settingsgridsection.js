var update = require('react-addons-update');

var store = require('./../model/store');
var actions = require('./../model/actions');

var ReactFormData = require('react-form-data');

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
        <button disabled={!props.emails.length} formAction="bulkactions/delete" formMethod="delete">Delete</button>
        <button disabled={!props.emails.length} formAction={'mailto:' + props.emails.join(',') + '?subject=MODX%20Next'} formTarget="_blank">Email</button>
      </fieldset>
    </form>
  );
};

var SettingsTable = React.createClass({
  getInitialState:() => ({
    userFormsToShow:{}
  }),
  handleQuickEdit:function(user,event){
    event.preventDefault();
    event.stopPropagation();
    console.log('handleQuickEdit!!!',user);
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
        <SettingsTableRow user={user} bulkToggle={props.bulkToggledUsers[user.id] !== undefined ? props.bulkToggledUsers[user.id] : false} bulkActions={props.bulkActions}
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
        (this.state.userFormsToShow[user.id]) ? <SettingsTableRowForm handleQuickEdit={this.handleQuickEdit.bind(null, user)} className="contextual-setting"  user={user} userGroup={props.userGroup} colspan={props.bulkActions ? "3" : "2"} /> : undefined
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

    return (users.length) ? (
      <section id={"user-group-" + props.userGroup.id}>
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
    ) : false;
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

var SettingsTableRowForm = React.createClass({
  mixins: [ ReactFormData ],
  getInitialState:() => ({
    asyncAction:undefined
  }),
  render:function(){
    var props = this.props;
    var user = props.user;
    var userGroup = props.userGroup;

    console.log('SettingsTableRowForm');
    console.log(user);

    return (
      <tr {...props}>
        <td colSpan={props.colspan}>
            <form action={this.state.formAction} method={this.state.formMethod} onChange={this.updateFormData}>
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
              <div><a className="button">Next User</a></div>
              <div>
                <a className="button" href="/update/user" onClick={(event) => {
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
                    id:user.id
                  }));
                }}>Quick Edit</a>
                <button type="submit" formAction="./../user-edit/index.html">Edit</button>
              </div>
              <div>
                <button type="submit" formAction="duplicate/user" className="save">Duplicate</button>
                <button type="submit" onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  store.dispatch(actions.deleteUser(
                    Object.assign({},user,{
                      user_id:user.id
                    })
                  ));
                }} formMethod="delete" formAction="/delete/user" data-async-action="deleteuser">Delete</button>
                <a className="button" href={'mailto:' + user.email + '?subject=MODX%20Next'}>Email</a>
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
              <p>{user.givenName} {user.familyName}’ last login was Jan 23, 2016 4:52pm from Planet&nbsp;Earth</p>
            </footer>
        </td>
      </tr>
    );
  }
});


module.exports = SettingsGridSection;