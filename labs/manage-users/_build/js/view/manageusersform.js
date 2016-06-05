var actions = require('./../model/actions');
var store = require('./../model/store');

var ManageUserFormHeader = require('./manageuserformheader');
var SettingsGridSection = require('./settingsgridsection');

var ManageUsersForm = React.createClass({
  getInitialState:() => ({
    filter:undefined,
    filterBy:undefined
  }),
  render:function(){
    var props = this.props;

    var sections = props.userGroups.filter((userGroup) => (
      (this.state.filterBy === undefined) ? true : this.state.filterBy == userGroup.id
    )).map((userGroup) => (
      <SettingsGridSection bulkActions={true} key={userGroup.id} filter={this.state.filter} users={props.users.filter((user) => (
        user.userGroups.includes(userGroup.id)
      ))} title={userGroup.title} userGroup={userGroup} />
    ));

    return (
      <div>
        <ManageUserFormHeader handleFilterBy={(filterBy) => (
          this.setState({
            filterBy:isNaN(filterBy) ? undefined : filterBy
          })
        )} handleFilter={(filter) => (
          this.setState({
            filter:filter.length ? filter : undefined
          })
        )} />
        <div className="settings-grid">
          {sections}
        </div>
      </div>
    );
  }
});

module.exports = ManageUsersForm;
