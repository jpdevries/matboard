var actions = require('./../model/actions');
var store = require('./../model/store');

var ManageUserFormHeader = require('./manageuserformheader');
var SettingsGridSection = require('./settingsgridsection');

var ManageUsersForm = React.createClass({
  getInitialState:() => ({
    filter:undefined,
    filterBy:undefined
  }),
  handleFilterBy:function(filterBy) {
    this.setState({
      filterBy:isNaN(filterBy) ? undefined : filterBy
    })
  },
  render:function(){
    var props = this.props,
    expanded = this.state.filterBy !== undefined;

    var sections = props.userGroups.filter((userGroup) => (
      (this.state.filterBy === undefined) ? true : this.state.filterBy == userGroup.id
    )).map((userGroup) => (
      <SettingsGridSection bulkActions={true} viewProps={props.viewProps} userGroup={userGroup} key={userGroup.id} expanded={expanded} filter={this.state.filter} handleFilterBy={this.handleFilterBy} users={props.users.filter((user) => (
        user.userGroups.includes(userGroup.id)
      ))} title={userGroup.title} />
    ));

    return (
      <div>
        <div id="manage-user-form__header">
          <ManageUserFormHeader filterBy={this.state.filterBy} viewProps={props.viewProps} roles={props.roles} userGroups={props.userGroups} quickCreate={props.quickCreate} handleFilterBy={this.handleFilterBy} handleFilter={(filter) => (
            this.setState({
              filter:filter.length ? filter : undefined
            })
          )} />
        </div>
        <div id="fold" className="settings-grid">
          {sections}
        </div>
      </div>
    );
  }
});

module.exports = ManageUsersForm;
