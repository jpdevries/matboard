var actions = require('./../model/actions');
var store = require('./../model/store');

var Select = require('./select');
var CountrySelect = require('./countryselect');
var ContextSelect = require('./contextselect');
var ContactFieldset = require('./contactfieldset');
var TemplateSelect = require('./templateselect');
var LanguageSelect = require('./languageselect');

var GeneralInformationFieldset = function(props) {

  var handleGenderChange = function(event) {
    store.dispatch(actions.updateBio({
        gender:event.target.value
    }));
  };

  return (
    <fieldset>
      <legend>General Information</legend>
      <div className="n field-group">
        <div className="field-username">
          <label for="username">Username</label>
          <input type="text" className="nickname" value={props.bio.username} required onChange={(event) => (
            store.dispatch(actions.updateBio({
                username:event.target.value
            }))
          )} />
        </div>
        <div className="field-given-name">
          <label for="given-name">First Name</label>
          <input type="text" className="given-name" onChange={(event) => (
            store.dispatch(actions.updateBio({
                givenName:event.target.value
            }))
          )}  />
        </div>
        <div className="field-family-name">
          <label for="family-name">Last Name</label>
          <input type="text" className="family-name" onChange={(event) => (
            store.dispatch(actions.updateBio({
                familyName:event.target.value
            }))
          )}  />
        </div>
        <div className="field-email">
          <label for="email">Email</label>
          <input type="email" className="email" required onChange={(event) => (
            store.dispatch(actions.updateContact({
                email:event.target.value
            }))
          )}  />
        </div>

        <div className="field-website">
          <label for="website">Website</label>
          <input type="url" name="website" className="url" onChange={(event) => (
            store.dispatch(actions.updateBio({
                website:event.target.value
            }))
          )}  />
        </div>
        <div className="field-gravatar">
          <label for="gravatar">Gravatar</label>
          <input type="text" name="gravatar" className="photo" onChange={(event) => (
            store.dispatch(actions.updateBio({
                gravatar:event.target.value
            }))
          )}  />
        </div>
        <div className="field-bday">
          <label for="bday">Date of birth</label>
          <input type="date" name="bday" className="bday" onChange={(event) => (
            store.dispatch(actions.updateBio({
                bday:event.target.value
            }))
          )}  />
        </div>



        <div className="field-gender">
          <label for="gender">Gender</label>
          <input type="radio" checked={props.bio.gender == ""} name="gender" value="" onChange={handleGenderChange} />&nbsp;Unspecified<br />
          <input type="radio" checked={props.bio.gender == "man"} name="gender" value="man" onChange={handleGenderChange} />&nbsp;Man<br />
          <input type="radio" checked={props.bio.gender == "woman"} name="gender" value="woman" onChange={handleGenderChange} />&nbsp;Woman<br />
          <input type="radio" checked={props.bio.gender == "trans"} name="gender" value="trans" onChange={handleGenderChange} />&nbsp;Trans<br />
          <input type="radio" checked={props.bio.gender !== "" && props.bio.gender !== "man" && props.bio.gender !== "woman" && props.bio.gender !== "trans"} name="gender" value="other" onChange={handleGenderChange} />&nbsp;<input type="text" name="gender_other" placeholder="Other"  onChange={handleGenderChange} /><br />
        </div>
      </div>
    </fieldset>
  );
};

var AccessFieldset = React.createClass({
  getInitialState:() => ({
    newPassword:false
  }),
  render:function() {
    var props = this.props,
    newPassword;

    var handlePasswordNotificationMethodChange = (event) => {
      store.dispatch(actions.updateSecurity({
        passwordNotify:event.target.value
      }));
    };

    var handlePassworMethodChange = (event) => {
      store.dispatch(actions.updateSecurity({
        passwordGenerateMethod:event.target.value
      }));
    };

    if(this.state.newPassword) {
      newPassword = (
        <div style={{marginRight:"1em"}}>
          <h4>Password Notification Method:</h4>
          <label for="pw-notify"><input type="radio" checked={props.security.passwordNotify == "email"} value="email" name="pw-notify" onChange={handlePasswordNotificationMethodChange} />&nbsp; Send the new password by email.</label>
          <label for="pw-notify"><input type="radio" checked={props.security.passwordNotify !== "email"} value="screen" name="pw-notify" onChange={handlePasswordNotificationMethodChange} />&nbsp; Show the new password on screen.</label>

          <h4>New Password Method:</h4>
          <label for="new-pw"><input type="radio" checked={props.security.passwordGenerateMethod == "modx"} value="modx" name="new-pw" onChange={handlePassworMethodChange} />&nbsp; Let MODX generate a password.</label>
          <label for="new-pw"><input type="radio" checked={props.security.passwordGenerateMethod !== "modx"} value="user" name="new-pw" onChange={handlePassworMethodChange} />&nbsp; Let me specify a password.</label>
        </div>
      );
    }

    return (
      <fieldset>
        <legend>Access</legend>
        <div className="field-active">
          <label for="active"><input type="checkbox" name="active" checked={props.access.active} value={props.access.active} onChange={(event) => (
            store.dispatch(actions.updateAccess({
              active:event.target.checked
            }))
          )} />&nbsp;Active</label>
        </div>
        <div className="field-sudo">
          <label for="sudo"><input type="checkbox" name="sudo" checked={props.access.sudo} value={props.access.sudo} onChange={(event) => (
            store.dispatch(actions.updateAccess({
              sudo:event.target.checked
            }))
          )} />&nbsp;Sudo User</label>
        </div>
        <div className="field-blocked">
          <label for="blocked"><input type="checkbox" name="blocked" checked={props.access.blocked} value={props.access.blocked} onChange={(event) => (
            store.dispatch(actions.updateAccess({
              blocked:event.target.checked
            }))
          )} />&nbsp;Blocked</label>
        </div>
        <div className="field-group">
          <fieldset className="field-new-password">
            <legend>Password</legend>
            <label for="new-password"><input type="checkbox" name="new-password" value={this.state.newPassword} onChange={(event) => (
              this.setState({
                newPassword:event.target.checked
              })
            )} />&nbsp;New Password</label>
            {newPassword}
          </fieldset>
        </div>

        <div className="field-blocked-until">
          <label for="blocked-until">Blocked Until</label>
          <input type="date" name="blocked-until" placeholder={props.access.blockedUntil} onChange={(event) => {
            store.dispatch(actions.updateAccessDate('blockedUntil',event.target.value))
          }} />
        </div>
        <div className="field-blocked-after">
          <label for="blocked-after">Blocked After</label>
          <input type="date" name="blocked-after" placeholder={props.access.blockedAfter} onChange={(event) => (
            store.dispatch(actions.updateAccessDate('blockedAfter',event.target.value))
          )} />
        </div>
        <div className="field-num-logins">
          <label for="num-logins">Number of Logins</label>
          <input type="text" className="selfless" name="num-logins" value={props.access.numLogins} readonly />
        </div>
        <div className="field-last-login">
          <label for="last-login">Last Login</label>
          <input type="date" name="last-login" value={props.access.lastLogin} readonly />
        </div>
        <div className="field-failed-logins">
          <label for="failed-logins" className="failed-logins">Failed Logins</label>
          <input type="text" name="failed-logins" readonly value={props.access.failedLogins} />
        </div>
        <div className="field-class-key">
          <label for="class-key">Class Key</label>
          <select name="class-key" defaultValue={props.access.classKey} onChange={(event) => (
            store.dispatch(actions.updateAccess({
              classKey:event.target.value
            }))
          )}>
            <option value="modUser" checked>modUser</option>
          </select>
        </div>

      </fieldset>
    );

  }
});

var AccessPermisssionFieldset = React.createClass({
  getInitialState:function(){
    return {
      addUserToGroup:this.props.addUserToGroup || false,
      disableAddUserToGroupButton:false
    }
  },
  render:function() {
    var addUserToGroupMarkup,
    addUserGroupButton,
    props = this.props;

    if(this.state.showAddUserToGroup) {
      var addUserToGroupButton = (
        <button disabled={this.state.disableAddUserToGroupButton} onClick={(event) => {
          event.preventDefault();
          store.dispatch(actions.addUserToUserGroup(this.refs.addUserToGroupGroup.value,this.refs.addUserToGroupRole.value));
          this.setState({showAddUserToGroup:false,disableAddUserToGroupButton:true});
        }}>Add User to Group</button>
      );
      addUserToGroupMarkup = (
        <fieldset>
          <legend>Add User to Group</legend>
          <div className="field-add-user-to-group">
            <label for="add-user-to-group">User Group</label>
            <select ref="addUserToGroupGroup" name="add-user-to-group">
              <option value="Administrator">Administrator</option>
              <option value="Editors">Editors</option>
            </select>
          </div>
          <div className="field-add-user-role">
            <label for="add-user-role">Use Role</label>
            <select ref="addUserToGroupRole" name="add-user-role">
              <option value="Super User">Super User</option>
              <option value="Editor">Editor</option>
            </select>
          </div>

          {addUserToGroupButton}

        </fieldset>
      )
    } else {
      addUserGroupButton = (
       <button id="add-user-to-group" onClick={(event) => {
         event.preventDefault();
         this.setState({showAddUserToGroup:true,disableAddUserToGroupButton:false});
       }} style={{marginBottom:"1em"}}>Add User to Group</button>
     );
    }

    var trGroups = this.props.accessPermissions.userGroups.map((group,index) => (
      <tr key={index}>
        <td>{group.name}</td>
        <td>{group.role}</td>
        <td>{group.rank}</td>
      </tr>
    ));

    return (
      <fieldset>
        <legend>Access Permissions</legend>
        <div>
          <p>Here you can select which User Groups this user belongs to. You can drag and drop each row to reorder the rank of each User Group. The User Group that has a rank of 0 will be declared the User's Primary Group, and will be the User Group that determines the User's Dashboard.</p>
          <hr />
        </div>

        {addUserGroupButton}

        {addUserToGroupMarkup}

        <table>
          <thead>
            <tr>
              <th>User Group</th>
              <th>Role</th>
              <th>Rank</th>
            </tr>
          </thead>
          <tbody>
            {trGroups}
          </tbody>
        </table>
      </fieldset>
    );
  }
});

var ButtonBar = function(props) {
  return (
    <div className="button-bar">
      <div>
        <button disabled={!props.save} type="submit">Save</button>
      </div>
      <div>
        <button formaction="/resource/duplicate">Duplicate</button>
      </div>
      <div>
        <button>Delete</button>
      </div>
    </div>
  );
};

var UserSettingsFieldset = function(props) {

};

var CreateUserSettingFieldset = React.createClass({
  getInitialState:function(){
    return {
      creatingSetting:false,
      disableCreateSettingButton:true,
      fieldType:'textarea'
    }
  },
  handleCreateSettingKeyNameChange:function(event) {
    this.setState({disableCreateSettingButton:(!(this.refs.settingKey.value && this.refs.settingName.value))});

  },
  render:function() {
    //if(!this.props.creatingSetting) return;

    var createSettingButton = (
      <button style={{marginTop:"1em"}} disabled={this.state.disableCreateSettingButton} type="submit" onClick={(event) => {
        event.preventDefault();
        console.log(this.refs.settingSettingValue,this.refs.settingSettingValue.value);
        store.dispatch(actions.newSetting({
          key:this.refs.settingKey.value,
          name:this.refs.settingName.value,
          description:this.refs.settingDescription.value,
          fieldType:this.refs.settingFieldType.value,
          lexiconEntry:this.refs.settingLexiconEntry.value,
          value:(this.refs.settingSettingValue.state.value !== undefined) ? this.refs.settingSettingValue.state.value : this.refs.settingSettingValue.value
        }));

        this.setState({creatingSetting:false,disableCreateSettingButton:true}); // todo: async don't close until server confirms setting is added
        this.props.handleSettingCreated();
      }}>Create Setting</button>
    );

    var settingValue = (() => {
      var ref = "settingSettingValue",
      name = "setting-value";

      switch(this.state.fieldType) {
        case 'textarea':
        return (<textarea ref={ref} name={name}></textarea>);
        break;

        case 'boolean':
        return (<input type="checkbox" ref={ref} name={name} defaultChecked />);
        break;

        case 'country':
        return (<CountrySelect ref={ref} name={name} defaultValue="US" />);

        case 'context':
        return (<ContextSelect ref={ref} name={name} defaultValue="0" />);

        case 'password':
        return (<input type="password" ref={ref} name={name} />);
        break;

        case 'template':
        return (<Select ref={ref} name={name} defaultValue="0" options={this.props.data.templates} />);
        break;

        case 'namespace':
        return (<Select ref={ref} name={name} defaultValue="core" options={this.props.data.namespaces} />);

        case 'user':
        return (<Select ref={ref} name={name} defaultValue="" options={this.props.data.users} />);

        case 'user-group':
        return (<Select ref={ref} name={name} defaultValue="" options={this.props.data.userGroups} />);

        case 'language':
        return (
          <LanguageSelect ref={ref} name={name} className={"language-select"} options={this.props.data.languages.map((language) => ({
            name:language.English,
            value:language.alpha2
          }))} defaultValue="en" />
        );

        default:
        return (<input type="text" ref={ref} name={name} />);
        break;
      }
    })();

    return (
      <fieldset>
        <legend>Create User Setting</legend>
        <div>
          <div>
            <label for="setting-key">Key</label>
            <input type="text" ref="settingKey" name="setting-key" onChange={this.handleCreateSettingKeyNameChange} />
          </div>
          <div>
            <label for="setting-name">Name</label>
            <input type="text" ref="settingName" name="setting-name" onChange={this.handleCreateSettingKeyNameChange} />
          </div>
          <div>
            <label for="setting-description">Description</label>
            <textarea ref="settingDescription" name="setting-description" rows="2"></textarea>
          </div>
        </div>
        <div>
          <div>
            <label for="setting-field-type">Field Type</label>
            <select defaultValue={this.state.fieldType} ref="settingFieldType" name="setting-field-type" onChange={(event) => (this.setState({fieldType:event.target.value}))}>
              <option value="textfield">Textfield</option>
              <option value="textarea">Textarea</option>
              <option value="boolean">Yes/No</option>
              <option value="password">Password</option>
              <option value="category">Category</option>
              <option value="charset">Charset</option>
              <option value="country">Country</option>
              <option value="context">Context</option>
              <option value="country">Country</option>
              <option value="context">Context</option>
              <option value="namespace">Namespace</option>
              <option value="template">Template</option>
              <option value="user">User</option>
              <option value="user-group">User Group</option>
              <option value="language">Language</option>
            </select>
          </div>
          <div>
            <label for="setting-namespace">Namespace</label>
            <Select ref="settingNamespace" name="setting-namespace" defaultValue="core" options={this.props.data.namespaces} />
          </div>
          <div>
            <label for="lexicon-entry">Area Lexicon Entry</label>
            <input ref="settingLexiconEntry" type="text" name="lexicon-entry" />
          </div>
        </div>
        <footer>
          <div>
            <label for="setting-value">Value</label>
            {settingValue}
          </div>
          {createSettingButton}
        </footer>
      </fieldset>
    );
  }
});

var UserSettingsFieldset = React.createClass({
  getInitialState:function(){
    return {
      creatingSetting:false,
      disableCreateSettingButton:true
    }
  },
  render:function() {
    var settings = this.props.settings,
    trSettings;

    var trSettings = settings.map((setting,index) => (
      <tr key={index}>
        <td>{setting.name}</td>
        <td>{setting.key}</td>
        <td>{setting.value}</td>
        <td>{setting.lastModified.toLocaleDateString()}</td>
      </tr>
    ));

    var createNewSettingButton,
    createSettingButton,
    createUserSettingFieldset;
    if(!this.state.creatingSetting) {
      createNewSettingButton = (
        <button id="create-new-setting" style={{marginBottom:"1em"}} onClick={(event) => {
          event.preventDefault();
          this.setState({creatingSetting:true});
        }}>Create New Setting</button>
      );
    } else {
      createUserSettingFieldset = <CreateUserSettingFieldset data={this.props.data} handleSettingCreated={() => {
        this.setState({creatingSetting:false,disableCreateSettingButton:true})
      }} />;
    }

    return (
      <fieldset>
        <legend>User Settings</legend>
        <div>
          <p>Here you can manage specifc settings for the user.</p>
          <hr />
          {createNewSettingButton}
          {createUserSettingFieldset}

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Key</th>
                <th>Value</th>
                <th>Last Modified</th>
              </tr>
            </thead>
            <tbody>
              {trSettings}
            </tbody>
          </table>

        </div>
      </fieldset>
    );
  }
});

var MemoFieldset = function(props) {
  return (
    <fieldset>
      <legend>Memo</legend>
      <div>
        <div className="field-comment">
          <label for="field-comment">Comment</label>
          <textarea name="comment" rows="3" className="note" value={props.memo.note} onChange={(event) => (
            store.dispatch(actions.updateMemo(event.target.value))
          )} />
        </div>
      </div>
    </fieldset>
  );
};

var UserEditForm = React.createClass({
  render:function(){
    var allowSave = this.props.bio.username.length && this.props.contact.email.length;

    return (
      <div>
        <h1>User: {this.props.bio.username}</h1>
        <form action="#" className="vcard">
          <ButtonBar save={allowSave} />
          <GeneralInformationFieldset bio={this.props.bio} />
          <AccessFieldset access={this.props.access} security={this.props.security} />
          <ContactFieldset contact={this.props.contact} />
          <UserSettingsFieldset settings={this.props.settings} data={this.props.data} />
          <AccessPermisssionFieldset accessPermissions={this.props.accessPermissions} />
          <MemoFieldset memo={this.props.memo} />
          <footer>
            <ButtonBar save={allowSave} />
          </footer>
        </form>
      </div>
    );
  }
});

module.exports = UserEditForm;
