var actions = require('./../model/actions');
var store = require('./../model/store');

var ManageUserFormHeader = React.createClass({
  getInitialState:function(){
    return {
      quickCreateOpen:false
    }
  },
  render:function(){
    var props = this.props;

    var quickCreate = this.state.quickCreateOpen ? (
      <fieldset>
        <legend>Quick Create User</legend>
        <div className="n field-group">
          <div className="field-username">
            <label for="username" id="username-label">Username</label>
            <input type="text" ref="quickCreateUsername" autoFocus={true} aria-describedby="username-label" name="username" id="username" className="nickname" aria-required="true"  aria-invalid="false" required />
          </div>
          <div className="field-given-name">
            <label for="given-name">First Name</label>
            <input type="text" ref="quickCreateGivenName" name="given-name" id="given-name" className="given-name" />
          </div>
          <div className="field-family-name">
            <label for="family-name">Last Name</label>
            <input type="text" ref="quickCreateFamilyName" name="family-name" id="family-name" className="family-name" />
          </div>
          <div className="field-email">
            <label for="email">Email</label>
            <input type="email" ref="quickCreateEmail" name="email" id="email" className="email" aria-required="true"  aria-invalid="false" required />
          </div>
        </div>
        <div className="field-group user-group-field user-status-field">
          <div className="field">
            <input checked type="checkbox" ref="quickCreateUserActive" name="user-active" id="user-active" />
            <label for="user-active">Active</label>
          </div>
          <div className="field">
            <input type="checkbox" ref="quickCreateUserSudo" name="user-sudo" id="user-sudo" />
            <label for="user-sudo">Sudo</label>
          </div>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
        <div className="field-group">
          <fieldset className="field">
            <legend>User Groups</legend>
            <p>Users can belong to any number of User Groups. User are assigned Roles that define their priveldges as a member of the User Group. A user can below to the same User Group with multiple&nbsp;roles.</p>
            <fieldset>
              <legend>Administrator</legend>
              <label for="user-group-editor-roles[]">Roles</label>
              <label><input type="checkbox" checked ref="userGroupEditorRoles" name="user-group-editor-roles[]" />&nbsp;Editor</label>
              <label><input type="checkbox" ref="userGroupEditorRoles" name="user-group-editor-roles[]" />&nbsp;Super User</label>
            </fieldset>
            <fieldset>
              <legend>Editor</legend>
              <label for="user-group-editor-roles[]">Roles</label>
              <label><input type="checkbox" name="user-group-editor-roles[]" />&nbsp;Editor</label>
              <label><input type="checkbox" name="user-group-editor-roles[]" />&nbsp;Super User</label>
            </fieldset>
          </fieldset>
        </div>
        <footer>
          <button type="submit">Submit</button>
        </footer>
      </fieldset>
    ) : false;

    var quickCreateUserBtn = this.state.quickCreateOpen ? false : (
      <button formaction="/quick-create/user" onClick={(event) => (
        this.setState({quickCreateOpen:true})
      )}>Quick Create User</button>
    );

    return (
      <header>
        <h1>Manage Users</h1>
        <div className="create-user-module">
          <form ref="createSettingForm" action="/add/user" method="post" className="create-setting-form" onSubmit={(event) => {
            //console.log(this.refs.createSettingForm);
            event.preventDefault();

            // consider: https://www.npmjs.com/package/react-form-data
            store.dispatch(actions.addUser({ // todo: pull user groups out of the form
              username:this.refs.quickCreateUsername.value,
              givenName:this.refs.quickCreateGivenName.value,
              familyName:this.refs.quickCreateFamilyName.value,
              email:this.refs.quickCreateEmail.value,
              active:this.refs.quickCreateUserActive.checked,
              sudo:this.refs.quickCreateUserSudo.checked,
              userGroups:[1]
            }));

            this.setState({quickCreateOpen:false});
          }}>
            <div className="top-bar">
              {quickCreateUserBtn}
              <button id="create-user" formaction="./../user-edit/index.html">Create User</button>
            </div>
            {quickCreate}
          </form>
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
              <option value="1">Editors</option>
              <option value="0">Administrators</option>
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
