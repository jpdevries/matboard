var update = require('react-addons-update');
var store = require('./../model/store');
var actions = require('./../model/actions');
var ReactFormData = require('react-form-data');

var settings = require('./../model/settings'),
endpoints = settings.endpoints;

function cssSafeName(name) {
  return name.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '').trim().replace(/ /g,'').toLowerCase()
}

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
          <legend aria-label="Bulk Actions are conditionally enabled options such as activate, suspend, delete or email that can be executed on selected users.">Bulk Actions</legend>
          <button type="submit" aria-hidden={!props.emails.length} disabled={!props.emails.length} className="go" formAction={endpoints.API_USERS_ACTIVATE} formMethod="post" onClick={this.handleBulkButtonClick}>Activate</button>
          <button type="submit" aria-hidden={!props.emails.length} disabled={!props.emails.length} className="danger" formAction={endpoints.API_USERS_DEACTIVATE} formMethod="post" onClick={this.handleBulkButtonClick}>Suspend</button>
          <button type="submit" aria-hidden={!props.emails.length} disabled={!props.emails.length} className="danger" formAction={endpoints.API_USERS_DELETE} formMethod="delete" onClick={this.handleBulkButtonClick}>Delete</button>
          <a className="button" aria-hidden={!props.emails.length} disabled={!props.emails.length} tabIndex={props.emails.length ? "0" : "-1"} href={props.emails.length ? 'mailto:' + props.emails.join(',') + '?subject=MODX%20Next&body=' : undefined}>Email</a>
          <a className="button" aria-hidden={!props.emails.length} disabled={!props.emails.length} tabIndex={props.emails.length ? "0" : "-1"} href={props.emails.length ? 'https://' + props.slackChannel + '.slack.com/messages/@' + props.slackHandles.join(',') : undefined} target="_blank">Slack DM</a>
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
    if(props.bulkActions) bulkTh = <th><input type="checkbox" id={`bulk-select-all-${props.userGroup.id}`} onChange={(event) => {
      try {
        this.props.handleBulkAllCheck(event.target.checked)
      } catch(e) {}
    }} /> <label htmlFor={`bulk-select-all-${props.userGroup.id}`} className='accessibly-hidden'>Select all {props.userGroup.title} Members</label></th>;

    var rows = props.users.map((user) => {

      return([
        <SettingsTableRow user={user} pressed={(this.state.userFormsToShow[user.id])} userGroup={props.userGroup} bulkToggle={props.bulkToggledUsers[user.id] !== undefined ? props.bulkToggledUsers[user.id] : false} bulkActions={props.bulkActions}
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
        (this.state.userFormsToShow[user.id]) ? <SettingsTableRowForm handleNextBtnClicked={(event) => {
          this.setState({
            userFormsToShow:update({}, {[user.id]: {$set:false}})
          })
        }} slackChannel={props.userGroup.slackChannel} handleQuickEdit={this.handleQuickEdit.bind(null, user)} className="contextual-setting"  user={user} userGroup={props.userGroup} colspan={props.bulkActions ? "3" : "2"} /> : false
      ]);

    });

    return (
      <table className="settings-table">
        <thead>
          <tr>
            {bulkTh}
            <th className="username" aria-label="User Column">User</th>
            <th aria-label="Active Column">Active</th>
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

    var paginationAmount = settings.paginateUsers,
    bulkActionsFieldset = users.length >= minimumUsersBulkAction ? <SettingsGridSectionBulkActionsFieldset bulkToggledUsers={this.state.bulkToggledUsers} emails={emails} slackChannel={props.userGroup.slackChannel} slackHandles={slackHandles} /> : false,
    viewAll = (this.props.expanded || this.props.viewProps.pageType == 'detail') ? false : (users.length > paginationAmount) ? (<footer><p><a onClick={(event) => {
      event.preventDefault();
      this.props.handleFilterBy(props.userGroup.id);
    }} href={`${ endpoints.GROUPS }${props.userGroup.id}#fold`}>View all {props.title} users</a></p></footer>) : false,
    paginatedUsers = (this.props.expanded || this.props.viewProps.pageType == 'detail') ? users : users.slice(0, paginationAmount);

    return (paginatedUsers.length) ? (
      <section id={"user-group-" + props.userGroup.id}>
        <div>
          <header>
            <h2 id={cssSafeName(props.title)} aria-label={props.title}><a aria-hidden className="subtle" href={`#${cssSafeName(props.title)}`} data-view-all-href={`${ endpoints.GROUPS }${props.userGroup.id}#fold`}>{props.title}</a></h2>
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
          {viewAll}
        </div>
      </section>
    ) : false;
  }
});

var SettingsTableRow = function(props) {
  const user = props.user,
  userGroup = props.userGroup;

  var bulkActionsTd;
  const bulkName = `bulk-${userGroup.id}-${user.username}`;
  const activeName = `active-${userGroup.id}-${user.username}`;
  const activeLabel = `Active status for user ${user.username}`;
  if(props.bulkActions) bulkActionsTd = <td><label hidden className="accessibly-hidden" htmlFor={bulkName}>Select {user.username}</label><input aria-label={`Select ${user.username}`} type="checkbox" id={bulkName} name={bulkName} checked={props.bulkToggle} onChange={(event) => {
    event.stopPropagation();
    try {
      props.handleBulkToggle(user.id,event.target.checked)
    } catch(e) {}
  }} /></td>;

  return (
    <tr>
      {bulkActionsTd}
      <td className="username" role="button" tabIndex="0" aria-expanded={props.pressed} aria-pressed={props.pressed} aria-haspopup="true" aria-controls={`user_popup_${cssSafeName(userGroup.title)}_${user.id}`} aria-flowto={`user_popup_${cssSafeName(userGroup.title)}_${user.id}`} onFocus={(event) => {
            try {
              props.handleFocus();
            } catch(e) {}
      }} onBlur={(event) => {
            try {
              props.handleBlur();
            } catch(e) {}
      }} onClick={(event) => {
        if(document.activeElement !== event.target) event.target.focus(); // needed for mobile (iOS)
      }}>{user.username}</td>
      <td className="shy balanced checkbox">
        <input id={activeName} name={activeName} aria-label={activeLabel} checked={user.active} type="checkbox" onChange={(event) => (
          store.dispatch(actions.updateUser(user.id,update(user,{$merge:{
            active:event.target.checked
          }})))
        )} />
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
    const props = this.props,
    user = props.user,
    userGroup = props.userGroup,
    nextUserBtn = (user.nextUser) ?
      <div><a className="button" href={`#bulk-${userGroup.id}-${user.nextUser.username}`} aria-label={`Escape to Next User ${user.nextUser.username}`} onClick={(event) => {
        console.log(`bulk-${userGroup.id}-${user.username}`);
        props.handleNextBtnClicked();
        document.getElementById(`bulk-${userGroup.id}-${user.nextUser.username}`).focus();
      }}>Next User</a></div>
    : false;

    //console.log('SettingsTableRowForm');
    //console.log(user);

    const userSudoCheckboxLabel = `sudo__${cssSafeName(userGroup.title)}-${userGroup.id}-${user.id}`,
    userActiveCheckboxLabel = `active__${cssSafeName(userGroup.title)}-${userGroup.id}-${user.id}`;

    return (
      <tr {...props} id={`user_popup_${cssSafeName(userGroup.title)}_${user.id}`} role="dialog" aria-labeledby={`user_popup_label_${user.id}`} aria-describedby={`user_popup_${user.id}_desc`}>
        <td colSpan={props.colspan}>
            <form action={this.state.formAction} method={this.state.formMethod} onChange={this.updateFormData}>
              <h3 hidden id={`user_popup_label_${user.id}`}>Edit or Contact {user.givenName} {user.familyName}</h3>
              <input name="user_id" type="hidden" value={user.id} />
              <input name="username" type="hidden" value={user.username} />
              <div className="friendly-labels">
                <span>
                  <label aria-hidden htmlFor={userSudoCheckboxLabel}>Sudo: </label>
                  <input aria-label="Sudo" id={userSudoCheckboxLabel} name={userSudoCheckboxLabel} checked={user.sudo} type="checkbox" onChange={(event) => {
                    store.dispatch(actions.updateUser(user.id,update(user,{$merge:{
                      sudo:event.target.checked
                    }})))
                  }} />
                </span>
                <span>
                  <label aria-hidden htmlForm={userActiveCheckboxLabel}>Active: </label>
                  <input aria-label="Active" id={userActiveCheckboxLabel} name={userActiveCheckboxLabel} checked={user.active} type="checkbox" onChange={(event) => {
                    store.dispatch(actions.updateUser(user.id,update(user,{$merge:{
                      active:event.target.checked
                    }})))
                  }} />
                </span>
              </div>
              <p className="subtle balanced oblique">{user.jobTitle}</p>

              {nextUserBtn}

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
            <footer id={`user_popup_${user.id}_desc`} className="subtle oblique balanced">
            <p>
              <span><span className="given-name">{user.givenName}</span> <span className="family-name">{user.familyName}</span>&#8217;{user.familyName.slice(-1) == 's' ? '' : 's'} last login was Jan&nbsp;23, 2016 4:52pm from Planet&nbsp;Earth</span>
            </p>
            </footer>
        </td>
      </tr>
    );
  }
});


module.exports = SettingsGridSection;
