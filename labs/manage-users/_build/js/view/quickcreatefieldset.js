if(!React) var React = require("react"); // only require React if need be (server-side rendering)

var actions = require('./../model/actions'),
store = require('./../model/store');

var settings = require('./../model/settings'),
endpoints = settings.endpoints;

export default class QuickCreateFieldset extends React.Component {
  render() {

    var props = this.props;
    var userGroups = props.userGroups;
    var roles = props.roles; // all the roles there are
    var userGroupsMarkup = [];
    var userRoles = props.quickCreate.roles; // an object containing what roles the user is in per group

    //console.log('userGroups',userGroups);
    //console.log('userRoles',userRoles);
    try {
      userGroups.map(function(group,index){
        var rolesMarkup = [];

        roles.map(function(role,index){
          var roleChecked = (function(){
            try {
              return userRoles[group.id].includes(role.id);
            } catch (e) {
              return false;
            }
          })();
          rolesMarkup.push(
            <label key={index} htmlFor={'user-group-' + (group.id) + '-roles[]'}>
              <input type="checkbox" onChange={(event) => {
                  if(event.target.checked) {
                    store.dispatch(actions.quickCreateRoleAdd(group.id,role.id));
                  } else {
                    store.dispatch(actions.quickCreateRoleRemove(group.id,role.id));
                  }
                }} checked={roleChecked} name={'user-group-' + (group.id) + '-roles[]'} value={group.id + '|' + role.id} />&nbsp;{role.name}
            </label>
          );
        });
        userGroupsMarkup.push((
          <fieldset key={index}>
            <legend>{group.title || group.name}</legend>
              {rolesMarkup}
          </fieldset>
        ));
      });
    } catch (e) { }

    var otherButtons = (props.quickCreate.updating) ? (
      <div>
        <div>
          <button type="submit" formaction="/duplicate/user" formMethod="put">Duplicate User</button>
          <button type="submit" onClick={this.props.handleDeleteUser} className="dangerous" formAction={endpoints.USER_DELETE} formMethod="post">Delete User</button>
        </div>
        <div>
          <a className="button" href={"mailto:" + props.quickCreate.email + "?subject=MODX%20Next"}>Email User</a>
        </div>
      </div>
    ) : false;

    return (
      <div>
      <fieldset>
            <legend>Quick {props.quickCreate.updating ? 'Update' : 'Create'} User</legend>
            <input type="hidden" name="id" value={props.quickCreate.id} />
            <div className="n quick-create-fields field-group">
              <div className="field-username">
                <label htmlFor="username" id="username-label">Username</label>
                <input type="text" autoComplete="off" value={props.quickCreate.username} disabled={props.quickCreate.updating} onChange={(event) => {
                  store.dispatch(actions.updateQuickCreate({
                    username:event.target.value
                  }))
                }} ref="quickCreateUsername" autoFocus={!props.quickCreate.updating} aria-describedby="username-label" name="username" id="username" className="nickname" aria-required="true"  aria-invalid="false" required />
              </div>
              <div className="field-given-name">
                <label htmlFor="given-name">First Name</label>
                <input type="text" value={props.quickCreate.givenName} onChange={(event) => {
                  store.dispatch(actions.updateQuickCreate({
                    givenName:event.target.value
                  }))
                }} ref="quickCreateGivenName" name="given-name" id="given-name" className="given-name" />
              </div>
              <div className="field-family-name">
                <label htmlFor="family-name">Last Name</label>
                <input type="text" value={props.quickCreate.familyName} onChange={(event) => {
                  store.dispatch(actions.updateQuickCreate({
                    familyName:event.target.value
                  }))
                }} ref="quickCreateFamilyName" name="family-name" id="family-name" className="family-name" />
              </div>
              <div className="field-email">
                <label htmlFor="email">Email</label>
                <input type="email" value={props.quickCreate.email} autoFocus={props.quickCreate.updating}  onChange={(event) => {
                  store.dispatch(actions.updateQuickCreate({
                    email:event.target.value
                  }))
                }} ref="quickCreateEmail" name="email" id="email" className="email" aria-required="true"  aria-invalid="false" required />
              </div>
            </div>
            <div className="field-group user-group-field user-status-field">
              <div className="field">
                <input type="checkbox" checked={props.quickCreate.active} onChange={(event) => {
                  store.dispatch(actions.updateQuickCreate({
                    active:event.target.checked
                  }))
                }} ref="quickCreateUserActive" name="user-active" id="user-active" />
                <label htmlFor="user-active">&emsp;Active</label>
              </div>
              <div className="field">
                <input type="checkbox" checked={props.quickCreate.sudo} onChange={(event) => {
                  store.dispatch(actions.updateQuickCreate({
                    sudo:event.target.checked
                  }))
                }} ref="quickCreateUserSudo" name="user-sudo" id="user-sudo" />
              <label htmlFor="user-sudo">&emsp;Sudo</label>
              </div>
            </div>
            <div className="button-bar">
              <div className="balanced">
                <button className="comfortably" type="submit">{props.quickCreate.updating ? 'Update' : 'Create'} User</button>
              </div>
            </div>
            <div className="field-group">
              <fieldset className="field">
                <legend>User Permissions</legend>
                <p>Users can belong to any number of User Groups. User are assigned Roles that define their priveldges as a member of the User Group. A user can belong to the same User Group with multiple&nbsp;roles.</p>
                <div className="user-group-roles">
                  {userGroupsMarkup}
                </div>
              </fieldset>
            </div>
          </fieldset>
          <footer className="balanced">
            <div>
              <button className="comfortably" type="submit">{props.quickCreate.updating ? 'Update' : 'Create'} User</button>
            </div>
            {otherButtons}
          </footer>
        </div>
    );
  }
}

module.exports = QuickCreateFieldset;
