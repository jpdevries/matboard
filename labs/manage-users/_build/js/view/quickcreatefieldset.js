if(!React) var React = require("react"); // only require React if need be (server-side rendering)

var actions = require('./../model/actions'),
store = require('./../model/store');

export default class QuickCreateFieldset extends React.Component {
  render() {
    var props = this.props;
    var fieldsetRoles = props.fieldsetRoles;
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
    });

    var otherButtons = (props.quickCreate.updating) ? (
      <div>
        <div>
          <button type="submit" formaction="/duplicate/user" formmethod="put">Duplicate User</button>
          <button type="submit" formaction="/delete/user" formmethod="delete">Delete User</button>
        </div>
        <div>
          <a className="button" href={"mailto:" + props.quickCreate.email + "?subject=MODX%20Next"}>Email User</a>
        </div>
      </div>
    ) : false;

    return (
      <fieldset>
            <legend>Quick {props.quickCreate.updating ? 'Update' : 'Create'} User</legend>
            <div className="n field-group">
              <div className="field-username">
                <label htmlFor="username" id="username-label">Username</label>
                <input type="text" value={props.quickCreate.username} ref="quickCreateUsername" autoFocus={!props.quickCreate.updating} aria-describedby="username-label" name="username" id="username" className="nickname" aria-required="true"  aria-invalid="false" required />
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
                <label htmlFor="user-active">Active</label>
              </div>
              <div className="field">
                <input type="checkbox" checked={props.quickCreate.sudo} onChange={(event) => {
                  store.dispatch(actions.updateQuickCreate({
                    sudo:event.target.checked
                  }))
                }} ref="quickCreateUserSudo" name="user-sudo" id="user-sudo" />
                <label htmlFor="user-sudo">Sudo</label>
              </div>
            </div>
            <div>
              <div className="balanced">
                <button className="comfortably" type="submit">{props.quickCreate.updating ? 'Update' : 'Create'} User</button>
              </div>
            </div>
            <div className="field-group">
              <fieldset className="field">
                <legend>User Groups</legend>
                <p>Users can belong to any number of User Groups. User are assigned Roles that define their priveldges as a member of the User Group. A user can below to the same User Group with multiple&nbsp;roles.</p>
                {fieldsetRolesMarkup}
              </fieldset>
            </div>
            <footer>
              <div>
                <button type="submit">{props.quickCreate.updating ? 'Update' : 'Create'} User</button>
              </div>
              {otherButtons}
            </footer>
          </fieldset>
    );
  }
}

module.exports = QuickCreateFieldset;
