require('babel-core/register')({
    presets: ['es2015', 'react']
});

var http = require('http'),
fs = require('fs'),
Twig = require("twig"),
express = require('express'),
formidable = require("formidable"),
pg = require('pg').native,
React = require('React'),
createStore = require('redux').createStore,
reducer = require('./_build/js/model/reducers'),
QuickCreateFieldset = require('./_build/js/view/quickcreatefieldset'),
ReactDOM = require('react-dom/server'),
store = require('./_build/js/model/store'),
actions = require('./_build/js/model/actions'),
app = express();



// This section is optional and used to configure twig.
app.set("twig options", {
    strict_variables: false
});


app.post('/add/user', function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {

    res.writeHead(200, {
      'content-type': 'text/html'
    });

    addUserQuickly(fields).then(function(result){
      console.log(result);
      var username = result.username;
      res.write('<h1>User ' + username + ' has been added with an id of ' + result.user_id + '.</h1>');
      res.end('<h3><a href="/">' + 'Return to Manager Users' + '</a></h3>');
    },function(err){
      res.write('<h1>Error adding user with username ' + fields.username  + '</h1>');
      res.write('<p>Perhaps a user with that username already exists. <a href="#">Get help</a>.</p>');
      res.end('<h3><a href="/">' + 'Return to Manager Users' + '</a></h3>');
    });

  });
});

/*app.post('/update/user', function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {

    res.writeHead(200, {
      'content-type': 'text/html'
    });

    addUserQuickly(fields).then(function(result){
      console.log(result);
      var username = result.username;
      res.write('<h1>User ' + username + ' has been added with an id of ' + result.user_id + '.</h1>');
      res.end('<h3><a href="/">' + 'Return to Manager Users' + '</a></h3>');
    },function(err){
      res.write('<h1>Error adding user with username ' + fields.username  + '</h1>');
      res.write('<p>Perhaps a user with that username already exists. <a href="#">Get help</a>.</p>');
      res.end('<h3><a href="/">' + 'Return to Manager Users' + '</a></h3>');
    });

  });
});*/


app.get('/api/users',function(req, res){
  getUserRows().then(function(result){
    res.json(result);
  },function(err){
    console.log(err);
  });
});

app.post('/api/user/add',function(req, res){
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    addUserQuickly(fields).then(function(result){
      res.json(true);
    },function(err){
      res.json(false);
    });
  });
});

app.post('/api/user/update',function(req, res){
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


app.delete('/delete/user', function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    console.log(fields);

    var message = 'YOLO';

    deleteUserById(fields.user_id).then(function(result){
      res.writeHead(200, {
        'content-type': 'text/html'
      });
      res.write('<h1>User ' + fields.username + ' has been deleted. This action was irreversible.</h1>');
      res.end('<p><a href="/">' + 'Return to Manager Users' + '</a></p>');
    },function(){ // error
      res.writeHead(200, { // should we throw a different status code?
        'content-type': 'text/html'
      });
      res.write('<h1>Unable to delete user ' + fields.username + '.</h1>');
      res.end('<p><a href="/">' + 'Return to Manager Users' + '</a></p>');
    });
  });
});

app.delete('/api/users/delete',function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    //console.log(fields);

    deleteUsersById(fields.users).then(function(result){
      res.json(true);
    },function(){ // error
      res.json(false);
    });
  });
});


app.delete('/api/user/delete',function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    console.log(fields);

    deleteUserById(fields.user_id).then(function(result){
      res.json(true);
    },function(){ // error
      res.json(false);
    });
  });
});

app.post('/api/users/activate',function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    console.log(fields);

    activateUsersById(fields.users, true).then(function(result){
      res.json(true);
    },function(){ // error
      res.json(false);
    });
  });
});

app.post('/api/users/deactivate',function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    console.log(fields);

    activateUsersById(fields.users, false).then(function(result){
      res.json(true);
    },function(){ // error
      res.json(false);
    });
  });
});

app.get('/update/user/:userid', function(req, res){
  var userid = req.params.userid;

  getUserRows(`WHERE user_id = ${userid}`).then(function(result){
    console.log(result);
    var user = result.users[0],
    userGroups = result.userGroups;
    console.log(user.user_groups);
    store.dispatch(actions.updateQuickCreate({
      username:user.username,
      givenName:user.fullname,
      familyName:'',
      email:user.email,
      active:user.active == 1,
      sudo:user.sudo == 1,
      open:true,
      updating:true,
      id:user.id
    }));
    res.render('updateuser.twig', {
      user:user,
      react: ReactDOM.renderToStaticMarkup(
        React.createElement(QuickCreateFieldset,{
          fieldsetRoles:store.getState().fieldsetRoles,
          quickCreate:store.getState().quickCreate
        })
      )
    });
  },function(){

  });


});

/*
<Provider store={store}>
      <QuickCreateFieldset />
</Provider>
*/

app.get('/', function(req, res){
  getUserRows().then(function(result){
    res.render('index.twig', result);
  },function(err){
    console.log(err);
  });
});



/*app.post('/delete/user', function(req, res){

});

app.post('/delete/user', function(req, res){

});

app.get('/duplicate/user', function(req, res){

});

app.post('/delete/user/from/group', function(req, res){

});*/

app.use(express.static(__dirname));


function deleteUserById(user_id) {
  return new Promise(function(resolve, reject) {
    // instantiate a new client
    // the client will read connection information from
    // the same environment varaibles used by postgres cli tools
    var client = new pg.Client();

    // connect to our database
    client.connect(function (err) {
      if (err) reject(err);

      // execute a query on our database
      client.query('DELETE FROM "modx_users" WHERE user_id = $1;', [user_id], function (err, result) {
        if (err) reject(err);

        // disconnect the client
        client.end(function (err) {
          if (err) reject(err);
        });

        resolve({
          user_id:user_id
        });
      });
    });
  });
}

function activateUsersById(users,active = true) {
  console.log('activateUsersById',users);
  active = active ? 1 : 0;
  return new Promise(function(resolve, reject) {
    // instantiate a new client
    // the client will read connection information from
    // the same environment varaibles used by postgres cli tools
    var client = new pg.Client();

    usersList = users.join(', ');
    console.log('usersList',usersList);

    // connect to our database
    client.connect(function (err) {
      if (err) reject(err);

      var query = `
        UPDATE "modx_users" SET active = ${active} WHERE user_id IN (${usersList});
        `;

      // execute a query on our database
      client.query(query, function (err, result) {
        if (err) reject(err);

        // disconnect the client
        client.end(function (err) {
          if (err) reject(err);
        });

        resolve({
          users:users
        });
      });
    });
  });
}

function deleteUsersById(users) {
  console.log('deleteUsersById',users);
  return new Promise(function(resolve, reject) {
    // instantiate a new client
    // the client will read connection information from
    // the same environment varaibles used by postgres cli tools
    var client = new pg.Client();

    usersList = users.join(', ');
    console.log('usersList',usersList);

    // connect to our database
    client.connect(function (err) {
      if (err) reject(err);

      var query = `
        DELETE FROM "modx_users" WHERE user_id IN (${usersList});
        `;
        console.log(query);

      // execute a query on our database
      client.query(query, function (err, result) {
        if (err) reject(err);

        // disconnect the client
        client.end(function (err) {
          if (err) reject(err);
        });

        resolve({
          users:users
        });
      });
    });
  });
}

function quicklyUpdateUser(fields) {
  console.log('quicklyUpdateUser',fields);
  return new Promise(function(resolve, reject) {
    // instantiate a new client
    // the client will read connection information from
    // the same environment varaibles used by postgres cli tools
    var client = new pg.Client(),
    user_id = fields.id,
    username = fields.username,
    givenname = fields.givenName,
    familyname = fields.familyName,
    email = fields.email,
    groupSelects = (fields.userGroups !== undefined) ? getGroupSelects(fields.userGroups,'update_user') : undefined,
    active = (fields.active) ? 1 : 0,
    sudo = (fields.sudo) ? 1 : 0;

    // DANGEROUS!!!
    var updateUserGroups = (fields.userGroups !== undefined) ? `, "delete_modx_member_groups" AS (
      DELETE FROM "modx_member_groups" WHERE "member" = ${user_id}
    ), "modx_member_groups" AS (
      INSERT INTO "modx_member_groups" (user_group, member, role, rank)
      ${groupSelects}
      RETURNING *
    )` : undefined;

    // connect to our database
    client.connect(function (err) {
      if (err) reject(err);

      var query = `WITH "update_user" AS (
        UPDATE "modx_users"
          SET active = ${active}, sudo = ${sudo} WHERE "user_id" = ${user_id}
        RETURNING *
      ), "modx_user_attributes" AS (
        UPDATE "modx_user_attributes"
          SET fullname ='${givenname} ${familyname}', email = '${email}' WHERE "internalkey" = ${user_id}
          RETURNING *
      ) ${updateUserGroups}
      SELECT * FROM "update_user";`;

      // execute a query on our database
      client.query(query, function (err, result) {
        if (err) reject(err);

        // disconnect the client
        client.end(function (err) {
          if (err) reject(err);
        });

        resolve({
          user_id:user_id
        });
      });
    });
  });
}

function getUserRows(where = '') {
  return new Promise(function(resolve, reject) {
    // instantiate a new client
    // the client will read connection information from
    // the same environment varaibles used by postgres cli tools
    var client = new pg.Client();

    // connect to our database
    client.connect(function (err) {
      if (err) throw err;

      // execute a query on our database
      client.query(`
        SELECT modx_users.username, modx_users.user_id as id, user_group, role, name as groupname, fullname, email, title, active, sudo FROM modx_users INNER JOIN modx_member_groups ON modx_member_groups.member = modx_users.user_id INNER JOIN modx_membergroup_names ON modx_member_groups.user_group = modx_membergroup_names.id INNER JOIN modx_user_attributes ON modx_user_attributes.id = modx_users.user_id ${where};
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

          var newRow = filtered[0];
          delete newRow['user_group'];
          delete newRow['groupname'];

          newRow.user_groups = userGroups;
          return newRow;
        });

        var userGroups = [];
        for(var key in userGroupNamesHash) {
          userGroups.push(userGroupNamesHash[key]);
        }

        console.log(rows);

        resolve({
          userGroups:userGroups,
          users:rows
        });
      });
    });
  });
}

function getGroupSelects(userGroups, userrelation = 'new_user') {
  var groupSelects = [];
  userGroups.map(function(userGroup,index){
    var role = 1;
    groupSelects.push(...[`SELECT ${userGroup}, ${userrelation}.user_id, ${role}, 0 FROM ${userrelation}`,'UNION'])
  });

  groupSelects.pop();
  return groupSelects.join('\n');
}

function addUserQuickly(fields) {
  console.log(fields);
  return new Promise(function(resolve, reject){
    var username = fields.username,
    givenname = fields.givenName,
    familyname = fields.familyName,
    email = fields.email,
    groupSelects = getGroupSelects(fields.userGroups);

    if(!username || !email) reject(new Error('Username and Email are required'));

    var message = username + ' added';

    // instantiate a new client
    // the client will read connection information from
    // the same environment varaibles used by postgres cli tools
    var client = new pg.Client();

    // connect to our database
    client.connect(function (err) {
      if (err) reject(err);

      var query = `WITH "new_user" AS (
        INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
        VALUES (nextval('user_id_sequence'),'${username}', 1,1,0) RETURNING *
      ), "new_user_attributes" AS (
        INSERT INTO "modx_user_attributes" (id, internalKey, fullname, email, phone, title)
        SELECT new_user.user_id,new_user.user_id,'${givenname} ${familyname}','${email}','','' FROM new_user
        RETURNING *
      ), "modx_member_group" AS (
        INSERT INTO "modx_member_groups" (user_group, member, role, rank)
        ${groupSelects}
        RETURNING *
      )
      SELECT * FROM "new_user";`;

      // execute a query on our database
      client.query(query,function(err, result){
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
