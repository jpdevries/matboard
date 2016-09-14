require('babel-core/register')({
    presets: ['es2015', 'react']
});

var http = require('http'),
fs = require('fs'),
Twig = require("twig"),
express = require('express'),
formidable = require("formidable"),
pg = require('pg').native,
React = require('react'),
createStore = require('redux').createStore,
reducer = require('./_build/js/model/reducers'),
QuickCreateFieldset = require('./_build/js/view/quickcreatefieldset'),
ReactDOM = require('react-dom/server'),
store = require('./_build/js/model/store'),
actions = require('./_build/js/model/actions'),
compression = require('compression'),
app = express();

var settings = require('./_build/js/model/settings'),
paginateUsers = settings.paginateUsers,
endpoints = settings.endpoints;

pg.defaults.ssl = true;

// This section is optional and used to configure twig.
app.set("twig options", {
    strict_variables: false
});

/**
 * Quickly add the user to the database then get user data, get role data, get user groups data, and render the React form
 */
app.post(endpoints.ADD_USER, function(req, res){
  //console.log(endpoints.ADD_USER);
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    addUserQuickly(fields).then(function(result){
      console.log('renderUpdateUserPage',result);
      renderUpdateUserPage(req,res,result.user_id,false,'addeduser.twig');
    });
  });
});




/*app.post('/update/user', function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    quicklyUpdateUser(fields).then(function(result){
      //console.log(result);
      var username = result.fields.username;
      res.render('updateduser.twig', {
        user:{
          id:result.fields.id,
          username:result.fields.username
        }
      });
    },function(err){
      res.writeHead(200, {
        'content-type': 'text/html'
      });
      res.write('<h1>Error updating user with username ' + result.fields.username  + '</h1>');
      res.write('<p>Perhaps a user with that username already exists. <a href="#">Get help</a>.</p>');
      res.end('<h3><a href="/">' + 'Return to Manager Users' + '</a></h3>');
    });

  });
});*/

app.get(endpoints.API_USERS,function(req, res){
  getUserRows().then(function(result){
    res.json(result);
  },function(err){
    console.log(err);
  });
});

app.get(endpoints.API_USER_GROUPS, function(req, res){
  getUserGroups().then(function(userGroups){
    res.json({
      userGroups:userGroups
    })
  });
});

app.get(endpoints.API_ROLES,function(req, res){
  getRoles().then(function(roles){
    res.json({
      roles:roles
    });
  },function(err){
    console.log(err);
  });
});

app.post(endpoints.API_USER_ADD,function(req, res){
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    addUserQuickly(fields).then(function(result){
      res.json(true);
    },function(err){
      res.json(false);
    });
  });
});

app.post(endpoints.API_USER_UPDATE,function(req, res){
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    quicklyUpdateUser(fields).then(function(result) {
      res.json(true);
    },function(err){
      console.log(err);
      res.json(false);
    });
  });
});

/**
 * Syncronously delete a user
*/
app.post(endpoints.USER_DELETE, function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    deleteUserById(fields.user_id || fields.id).then(function(result){
      res.render('deletedusers.twig', {
        deleted:'Deleted',
        users:result.rows,
        endpoints:endpoints
      });
    },function(){ // error
      res.render('deletedusers.twig', {
        deleted:'Delete',
        endpoints:endpoints
      });
    });
  });
});

/**
 * Asyncronously delete a user
*/
app.delete(endpoints.API_USERS_DELETE,function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    deleteUsersById(fields.users).then(function(result){
      res.json(true);
    },function(){ // error
      res.json(false);
    });
  });
});

app.post(endpoints.USERS_DELETE,function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    var users = fields['users[]'];

    deleteUsersById(users).then(function(result){
      res.render('deletedusers.twig', {
        deleted:'Deleted',
        users:result.rows,
        endpoints:endpoints
      });
    },function(err,result){ // error
      res.render('deletedusers.twig', {
        deleted:'Delete',
        users:result.rows,
        endpoints:endpoints
      });
    });
  });
});

app.delete(endpoints.API_USER_DELETE,function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    //console.log(fields);

    deleteUserById(fields.user_id).then(function(result){
      res.json(true);
    },function(){ // error
      res.json(false);
    });
  });
});

app.post(endpoints.USERS_ACTIVATE, function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    activateUsersById(fields['users[]'], true).then(function(result){
      res.render('activatedusers.twig', {
        activated:'Activated',
        users:result.rows,
        endpoints:endpoints
      });
    },function(err,result){
      res.render('unabletoactivateusers.twig', {
        activate:'Activate',
        activated:'Activated',
        users:result.rows,
        endpoints:endpoints
      });
    });
  });
});

app.post(endpoints.API_USERS_ACTIVATE,function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    //console.log(fields);

    activateUsersById(fields.users, true).then(function(result){
      res.json(true);
    },function(){ // error
      res.json(false);
    });
  });
});

app.post(endpoints.USERS_DEACTIVATE, function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    activateUsersById(fields['users[]'], false).then(function(result){
      //console.log(result.rows);
      res.render('activatedusers.twig', {
        activated:'Suspended',
        users:result.rows,
        endpoints:endpoints
      });
    },function(err,result){
      res.render('unabletoactivateusers.twig', {
        activate:'Suspend',
        activated:'Suspended',
        users:result.rows,
        endpoints:endpoints
      });
    });
  });
});

console.log(endpoints.USER_REMOVE + ':userid' + '/group/' + ':groupid');
app.post(endpoints.USER_REMOVE + ':userid' + '/group/' + ':groupid', function(req, res) {
  //console.log(req.params);
  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    //console.log(fields);
    var user = parseInt(fields.user_id),
    group = parseInt(req.params.groupid);
    //console.log(user,group);
    removeUserFromUserGroup(user,group).then(function(result){
      console.log(req.params.userid,result.rows[0].name,result.rows[0].username);
      res.render('userremovedfromgroup.twig', {
        userid:req.params.userid,
        user_group:result.rows[0].name,
        username:result.rows[0].username
      });
    },function(err){
      res.render('userremovedfromgroup.twig', {
        userid:req.params.userid,
        user_group:result.rows[0].name,
        username:result.rows[0].username,
        failed:true
      });
    });
  });


});

app.post(endpoints.API_REMOVE_USER_FROM_GROUP, function(req, res) {
  console.log(endpoints.API_REMOVE_USER_FROM_GROUP);
  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    console.log(fields);
    var user = fields.user,
    group = fields.group;

    removeUserFromUserGroup(user,group).then(function(result){
      console.log(result);
      res.json(true)
    },function(){
      res.json(false)
    })
  });
});

function removeUserFromUserGroup(user, group) {
  //console.log('deleteUsersById',users);
  return new Promise(function(resolve, reject) {
    var client = new pg.Client(process.env.DATABASE_URL);

    // connect to our database
    client.connect(function (err) {
      if (err) reject(err);

      // IN (1)
      var query = `
        WITH "remove_user_from_user_group" AS (
          DELETE FROM "modx_member_groups" WHERE member = ${user} AND user_group = ${group}
          RETURNING *
        )
        SELECT member,user_group,role,username,modx_membergroup_names.name FROM "remove_user_from_user_group"
        INNER JOIN modx_users ON modx_users.user_id = remove_user_from_user_group.member
        INNER JOIN modx_membergroup_names ON modx_membergroup_names.id = remove_user_from_user_group.user_group
        INNER JOIN modx_user_attributes ON modx_user_attributes.id = remove_user_from_user_group.member;
      `;

        //console.log(query);

      // execute a query on our database
      client.query(query, function (err, result) {
        if (err) reject(err, result);

        // disconnect the client
        client.end(function (err) {
          if (err) reject(err, result);
        });

        resolve(result);
      });
    });
  });
}

app.post(endpoints.API_USERS_DEACTIVATE,function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    //console.log(fields);

    activateUsersById(fields.users, false).then(function(result){
      res.json(true);
    },function(){ // error
      res.json(false);
    });
  });
});

app.get(endpoints.ADD_USER, function(req, res){
  //console.log('/add/user',req.query);
  getRoles().then(function(roles){
    store.dispatch(actions.setRoles(roles));
    return roles;
  }).then(function(roles){
    return new Promise(function(resolve,reject){
      getUserGroups().then(function(userGroups){
        var group = req.query.group || undefined;
        store.dispatch(actions.flushQuickCreate({
          roles:(group) ? {[group]:[roles[0].id]} : {[userGroups[0].id]:[roles[0].id]} // default new users to Administrators User Group with Administrator role (or whichever is the first of each)
        }));
        resolve({
          roles:roles,
          userGroups:userGroups
        })
      })
    });
  }).then(function(data){
    store.dispatch(actions.setUserGroups(data.userGroups));
    store.dispatch(actions.updateQuickCreate({
      sudo:false
    }));
    return data;
  }).then(function(data){
    res.render('createuser.twig', {
      endpoints:endpoints,
      react: ReactDOM.renderToStaticMarkup(
        React.createElement(QuickCreateFieldset,{
          quickCreate:store.getState().quickCreate,
          roles:store.getState().roles,
          userGroups:store.getState().userGroups
        })
      )
    });
  });
});

app.post(endpoints.UPDATE_USER + ':userid', function(req, res) {
  var userid = req.params.userid,
  form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    quicklyUpdateUser(fields).then(function(result){
      var username = result.fields.username;
      return userid;
    },function(err){
      res.writeHead(200, {
        'content-type': 'text/html'
      });
      res.write('<h1>Error updating user with username ' + result.fields.username  + '</h1>');
      res.write('<p>Perhaps a user with that username already exists. <a href="#">Get help</a>.</p>');
      res.end('<h3><a href="/">' + 'Return to Manager Users' + '</a></h3>');
    }).then(function(userid){
      renderUpdateUserPage(req, res, true);
    });

  });
});

function prepGroupRolesQuickCreate(group_roles) {
  var userGroupRoles = {};
  group_roles.map((groupRole,index) => {
    userGroupRoles[groupRole.group] = groupRole.roles;
  });
  return userGroupRoles;
}

function renderUpdateUserPage(req, res, userid, updated = false, template='updateuser.twig') {
  getUserRows(`WHERE user_id = ${userid}`).then((userRows) => (
    userRows.users
  )).then(function(users){
    var user = users[0],
    userGroupRoles = {};
    user.group_roles.map((groupRole,index) => {
      userGroupRoles[groupRole.group] = groupRole.roles;
    });
    user.userGroupRoles = userGroupRoles;
    return user;
  }).then((user) => ({
    user:user
  })).then((data) => (
    new Promise(function(resolve,reject){
      getUserGroups().then(function(userGroups){
        store.dispatch(actions.setUserGroups(userGroups));
        return userGroups;
      }).then(function(userGroups){
        resolve(Object.assign({},data,{
          userGroups:userGroups
        }));
      })
    })
  )).then((data) => (
    new Promise(function(resolve,reject){
      getRoles().then(function(roles){
        store.dispatch(actions.setRoles(roles));
        return roles;
      }).then(function(roles){
        resolve(Object.assign({},data,{
          roles:roles
        }));
      });
    })
  )).then(function(data){
    var user = data.user,
    userGroups = data.userGroups,
    userGroupRoles = prepGroupRolesQuickCreate(user.group_roles);
    //console.log(user);
    store.dispatch(actions.updateQuickCreate({
      username:user.username,
      givenName:user.givenname,
      familyName:user.familyname,
      email:user.email,
      active:user.active == 1,
      sudo:user.sudo == 1,
      open:true,
      updating:true,
      id:user.id,
      roles:userGroupRoles
    }));

    res.render(template, {
      user:user,
      updated:updated,
      endpoints:endpoints,
      react:ReactDOM.renderToStaticMarkup(
        React.createElement(QuickCreateFieldset,{
          quickCreate:store.getState().quickCreate,
          roles:store.getState().roles,
          userGroups:store.getState().userGroups
        })
      )
    });

  });
}

app.get(endpoints.UPDATE_USER + ':userid', function(req, res) {
  renderUpdateUserPage(req, res, req.params.userid);
});

function getUserRowsAndPrepareData(where = '',userGroupsWhere = '') {
  return getUserRows(where).then(function(results){
    return new Promise(function(resolve,reject){
      getRoles().then(function(roles){
         resolve({
          results:results,
          roles:roles
         });
      })
    })
  }).then(function(data){
    return Object.assign({},data.results,{
      roles:data.roles
    });
  }).then(function(data){
    return new Promise(function(resolve,reject){ // legacy userGroup didn't contain props like slackchannel overwrite with necessary data
      getUserGroups(userGroupsWhere).then(function(userGroups){
        resolve(Object.assign({},data,{
          userGroups:userGroups
        }))
      })
    })
  });
}

app.get('/', function(req, res){
  getUserRowsAndPrepareData().then(function(data){
    res.render('index.twig', Object.assign({},data,{
      paginateUsers:paginateUsers,
      endpoints:endpoints,
      production:process.env.NODE_ENV == 'production'
    }));
  },function(err){
    //console.log(err);
  });
});

app.post('/', function(req, res){
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    var query = fields.search,
    filteredGroup = parseInt(fields['filter-by']) || undefined,
    andfilter = (filteredGroup) ? ` AND user_group = ${filteredGroup}` : '',
    where = (query) ? `WHERE (username ILIKE '%${query}%'${andfilter}) OR (givenname ILIKE '%${query}%'${andfilter}) OR (familyname ILIKE '%${query}%'${andfilter}) OR (email ILIKE '%${query}%'${andfilter}) OR (title ILIKE '%${query}%'${andfilter})` : '';
    console.log(fields,query,where,filteredGroup);
    getUserRowsAndPrepareData(where).then(function(data){
      res.render('index.twig', Object.assign({},data,{
        paginateUsers:paginateUsers,
        endpoints:endpoints,
        query:query,
        filteredGroup:filteredGroup,
        showReturnTo:true,
        production:process.env.NODE_ENV == 'production'
      }));
    },function(err){
      //console.log(err);
    });

  });
});

app.get(endpoints.GROUPS + ':groupid', function(req, res){
  getUserRowsAndPrepareData(`WHERE user_group = ${req.params.groupid}`).then(function(data){
    res.render('index.twig', Object.assign({},data,{
      pageType:'detail',
      showFilterBy:false,
      showReturnTo:true,
      filteredGroup:req.params.groupid,
      paginateUsers:paginateUsers,
      endpoints:endpoints,
      production:process.env.NODE_ENV == 'production'
    }));
  },function(err){
    //console.log(err);
  });
});

app.use(compression());
app.use(express.static(__dirname));

function getRoles() {
  return new Promise(function(resolve, reject){
    // instantiate a new client
    // the client will read connection information from
    // the same environment varaibles used by postgres cli tools
    var client = new pg.Client(process.env.DATABASE_URL);

    // connect to our database
    client.connect(function (err) {
      if (err) reject(err);

      // execute a query on our database
      client.query('SELECT * FROM "modx_user_group_roles";', function (err, result) {
        //console.log(result);
        if (err) reject(err);

        // disconnect the client
        client.end(function (err) {
          if (err) reject(err);
        });

        resolve(result.rows);
      });
    });
  });
}


function deleteUserById(user_id) {
  return deleteUsersById([user_id]);
}

function activateUsersById(users,active = true) {
  //console.log('activateUsersById',users);
  active = active ? 1 : 0;
  return new Promise(function(resolve, reject) {
    // instantiate a new client
    // the client will read connection information from
    // the same environment varaibles used by postgres cli tools
    var client = new pg.Client(process.env.DATABASE_URL);

    usersList = users.join(', ');
    //console.log('usersList',usersList);

    // connect to our database
    client.connect(function (err) {
      if (err) reject(err,users);

      /*var query = `
        UPDATE "modx_users" SET active = ${active} WHERE user_id IN (${usersList});
        `;
        console.log(query);*/

      var query = `
      WITH "update_user" AS (
        UPDATE "modx_users" SET active = ${active} WHERE user_id IN (${usersList})
        RETURNING *
      )
      SELECT user_id,username,givenname, familyname FROM "update_user"
        INNER JOIN modx_user_attributes ON modx_user_attributes.id = update_user.user_id;
      `;

      //console.log(query);

      // execute a query on our database
      client.query(query, function (err, result) {
        if (err) reject(err,users);

        // disconnect the client
        client.end(function (err) {
          if (err) reject(err,users);
        });

        resolve(result);
      });
    });
  });
}

function deleteUsersById(users) {
  //console.log('deleteUsersById',users);
  return new Promise(function(resolve, reject) {
    // instantiate a new client
    // the client will read connection information from
    // the same environment varaibles used by postgres cli tools
    var client = new pg.Client(process.env.DATABASE_URL);

    usersList = users.join(', ');
    //console.log('usersList',usersList);

    // connect to our database
    client.connect(function (err) {
      if (err) reject(err);

      /*var query = `
        DELETE FROM "modx_users" WHERE user_id IN (${usersList});
        `;*/

        var query = `
        WITH "delete_users" AS (
          DELETE FROM "modx_users" WHERE user_id IN (${usersList})
          RETURNING *
        )
          SELECT user_id,username,givenname, familyname FROM "delete_users"
          INNER JOIN modx_user_attributes ON modx_user_attributes.id = delete_users.user_id;
        `;

        //console.log(query);

      // execute a query on our database
      client.query(query, function (err, result) {
        if (err) reject(err, result);

        // disconnect the client
        client.end(function (err) {
          if (err) reject(err, result);
        });

        resolve(result);
      });
    });
  });
}

function quicklyUpdateUser(fields) {
  //console.log('quicklyUpdateUser',fields);
  return new Promise(function(resolve, reject) {
    // instantiate a new client
    // the client will read connection information from
    // the same environment varaibles used by postgres cli tools
    var client = new pg.Client(process.env.DATABASE_URL),
    user_id = fields.id,
    username = fields.username,
    givenname = fields.givenName || fields['given-name'], // #janky
    familyname = fields.familyName || fields['family-name'],
    email = fields.email,
    preparedGroupRoles = prepGroupRoles(fields),
    groupRoleSelects = getGroupRoleSelects(preparedGroupRoles, 'update_user'),
    active = (fields.active) ? 1 : 0,
    sudo = (fields.sudo) ? 1 : 0;

    if(fields['user-active'] == 'on') active = 1;
    if(fields['user-sudo'] == 'on') sudo = 1;

    // DANGEROUS!!!
    var updateUserGroups = (preparedGroupRoles.length) ? `, "delete_modx_member_groups" AS (
      DELETE FROM "modx_member_groups" WHERE "member" = ${user_id}
    ), "modx_member_groups" AS (
      INSERT INTO "modx_member_groups" (user_group, member, role, rank)
      ${groupRoleSelects}
      RETURNING *
    )` : '';

    // connect to our database
    client.connect(function (err) {
      if (err) reject(err);

      var query = `WITH "update_user" AS (
        UPDATE "modx_users"
          SET active = ${active}, sudo = ${sudo} WHERE "user_id" = ${user_id}
        RETURNING *
      ), "modx_user_attributes" AS (
        UPDATE "modx_user_attributes"
          SET givenname ='${givenname}', familyname = '${familyname}', email = '${email}' WHERE "internalkey" = ${user_id}
          RETURNING *
      ) ${updateUserGroups}
      SELECT * FROM "update_user";`;

      //console.log(query);

      // execute a query on our database
      client.query(query, function (err, result) {
        if (err) reject(err);

        // disconnect the client
        client.end(function (err) {
          if (err) reject(err);
        });

        resolve({
          user_id:user_id,
          fields:fields
        });
      });
    });
  });
}

function getUserGroups(where = '') {
  return new Promise(function(resolve, reject){
    var client = new pg.Client(process.env.DATABASE_URL);

    client.connect(function (err) {
      if (err) throw err;

      // execute a query on our database
      client.query(`
        SELECT * FROM "modx_membergroup_names" ${where};
        `, function (err, results) {
        if (err) reject(err);

        // disconnect the client
        client.end(function (err) {
          if (err) reject(err);
        });

        resolve(results.rows);
      });
    });

  });
}

function getUserRows(where = '') {
  return new Promise(function(resolve, reject) {
    // instantiate a new client
    // the client will read connection information from
    // the same environment varaibles used by postgres cli tools
    var client = new pg.Client(process.env.DATABASE_URL);

    // connect to our database
    client.connect(function (err) {
      if (err) throw err;

      // execute a query on our database
      client.query(`
        SELECT modx_users.username, modx_users.user_id as id, user_group, role, name as groupname, givenname, familyname, email, slack, title, active, sudo FROM modx_users INNER JOIN modx_member_groups ON modx_member_groups.member = modx_users.user_id INNER JOIN modx_membergroup_names ON modx_member_groups.user_group = modx_membergroup_names.id INNER JOIN modx_user_attributes ON modx_user_attributes.id = modx_users.user_id ${where};
        `, function (err, result) {
        if (err) reject(err);

        // disconnect the client
        client.end(function (err) {

          if (err) reject(err);
        });

        var rows = Object.assign({}, result).rows;
        var usernames = [...new Set(rows.map((row) => (
          row.username
        )))];

        var userGroupNamesHash = {};
        rows = usernames.map((username) => {
          var filtered = rows.filter((row) => (
            row.username == username
          ));

          var userGroups = filtered.map((user) => {
            if(!userGroupNamesHash[user['user_group']]) userGroupNamesHash[user['user_group']] = {id:parseInt(user['user_group']), name:user['groupname']};
            return user.user_group;
          });

          var groupRolesHash = {};
          var groupRoles = [];
          filtered.map((user) => {
            if(!groupRolesHash[user.user_group]) groupRolesHash[user.user_group] = [];
            groupRolesHash[user.user_group].push(user.role);
          });

          for (var groupId in groupRolesHash) {
            groupRoles.push({
              group:groupId,
              roles:groupRolesHash[groupId]
            });
          }

          var newRow = filtered[0];
          delete newRow['user_group'];
          delete newRow['groupname'];

          newRow.user_groups = userGroups;
          newRow.group_roles = groupRoles;

          return newRow;
        });

        var userGroups = [];
        for(var key in userGroupNamesHash) {
          userGroups.push(userGroupNamesHash[key]);
        }

        //console.log(rows);

        resolve({
          userGroups:userGroups,
          users:rows
        });
      });
    });
  });
}

function getGroupSelects(userGroups, userrelation = 'new_user') { // depreciated todo: remove
  try {
    var groupSelects = [];
    userGroups.map(function(userGroup,index){
      var role = 1;
      groupSelects.push(...[`SELECT ${userGroup}, ${userrelation}.user_id, ${role}, 0 FROM ${userrelation}`,'UNION'])
    });

    groupSelects.pop();
    return groupSelects.join('\n');
  } catch (e) {
    return '';
  }
}

function getGroupRoleSelects(userGroupRoles, userrelation = 'new_user') {
  try {
    var groupSelects = [];
    userGroupRoles.map(function(groupRoles,index) {
      var userGroup = groupRoles.groupid,
      roles = groupRoles.roles;
      roles.map(function(role) {
        groupSelects.push(...[`SELECT ${userGroup}, ${userrelation}.user_id, ${role}, 0 FROM ${userrelation}`,'UNION']);
      });
    });

    groupSelects.pop();
    return groupSelects.join('\n');

    return groupSelects;
  } catch (e) { return []; }
}

function prepGroupRoles(fields){ // pretty nasty but turns the form data into an array of objects representing user group ids and respective roles of the user
  //console.log('prepGroupRoles',fields);
  var obj = {};
  for(var k in fields) {
    var split = k.split('-');
    //console.log(k);
    if(split[0] == 'user' && split[1] == 'group' && split[3] == 'roles[]') {
      var roles = fields[k];
      if(!Array.isArray(roles)) roles = [roles];

      roles.map(function(role,index){
        split = role.split('|');
        var group = split[0];
        var role = parseInt(split[1]);

        if(!obj[group]) obj[group] = [];
        obj[group].push(role);
      });

    }
  }

  var groups = [];
  var gl = (fields.roles) ? fields.roles : obj;
  for(k in gl) {
    groups.push({
      groupid:k,
      roles:gl[k]
    });
  }

  //console.log('groups',groups);

  return groups;
}

function addUserQuickly(fields) {
  //console.log('addUserQuickly',fields);
  return new Promise(function(resolve, reject){
    var username = fields.username,
    givenname = fields.givenName,
    familyname = fields.familyName,
    email = fields.email,
    groupRoleSelects = getGroupRoleSelects(prepGroupRoles(fields),'new_user'),
    groupSelectsBlock = '';

    //console.log(groupRoleSelects);

    if(groupRoleSelects) {
      groupSelectsBlock = `, "modx_member_group" AS (
        INSERT INTO "modx_member_groups" (user_group, member, role, rank)
        ${groupRoleSelects}
        RETURNING *
      )`;
    }

    if(!username || !email) console.log('Username and Email are required');
    if(!username || !email) reject(new Error('Username and Email are required'));

    var message = username + ' added';

    // instantiate a new client
    // the client will read connection information from
    // the same environment varaibles used by postgres cli tools
    var client = new pg.Client(process.env.DATABASE_URL);

    // connect to our database
    client.connect(function (err) {
      if (err) reject(err);

      var query = `WITH "new_user" AS (
        INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
        VALUES (nextval('user_id_sequence'),'${username}', 1,1,0) RETURNING *
      ), "new_user_attributes" AS (
        INSERT INTO "modx_user_attributes" (id, internalKey, givenname, familyname, email, phone, title)
        SELECT new_user.user_id,new_user.user_id,'${givenname}','${familyname}','${email}','','' FROM new_user
        RETURNING *
      ) ${groupSelectsBlock}
      SELECT * FROM "new_user";`;

      //console.log(query);

      // execute a query on our database
      client.query(query,function(err, result){
        //console.log(result);
        if (err) reject(err);

        // disconnect the client
        client.end(function (err) {
          if (err) reject(err);
        });

        try {
          resolve(result.rows[0]);
        } catch(e) {
          reject(new Error('No results found'));
        }

      });
    });
  });
}


app.listen(process.env.PORT || 1186);

console.log("server listening on " + (process.env.PORT || 1186));
console.log("Visit http://localhost:" + (process.env.PORT || 1186) + " in your browser");
