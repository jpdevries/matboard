var http = require('http'),
fs = require('fs'),
Twig = require("twig"),
express = require('express'),
formidable = require("formidable"),
pg = require('pg'),
app = express();

// This section is optional and used to configure twig.
app.set("twig options", {
    strict_variables: false
});






app.post('/add/user', function(req, res){
  console.log('add user');
  addUserQuickly(req,res).then(function(result){
    console.log(result);
  },function(){

  });
});


app.get('/api/users',function(req, res){
  getUserRows().then(function(result){
    res.json(result);
  },function(err){
    console.log(err);
  });
});





app.post('/delete/user',function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    console.log(fields);

    var message = 'YOLO';

    deleteUserById(fields.user_id).then(function(result){
      //Store the data from the fields in your data store.
      //The data store could be a file or database or any other store based
      //on your application.
      res.writeHead(200, {
        'content-type': 'text/html'
      });
      res.write('<h1>User ' + fields.username + ' has been deleted. This action was irreversible.</h1>');
      res.end('<h3><a href="/">' + 'Return to Manager Users' + '</a></h3>');
    },function(){ // error

    });


  });
});


app.post('/api/delete/user',function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    console.log(fields);

    deleteUserById(fields.user_id).then(function(result){
      //Store the data from the fields in your data store.
      //The data store could be a file or database or any other store based
      //on your application.
      res.json(true);
    },function(){ // error
      res.json(false);
    });


  });
});

app.get('/', function(req, res){
  getUserRows().then(function(result){
    res.render('index.twig', result);
  },function(err){
    console.log(err);
  });
});

/*app.post('/update/user', function(req, res){

});

app.post('/delete/user', function(req, res){

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
        if (err) reject(error);


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

function getUserRows() {
  return new Promise(function(resolve, reject) {
    // instantiate a new client
    // the client will read connection information from
    // the same environment varaibles used by postgres cli tools
    var client = new pg.Client();

    // connect to our database
    client.connect(function (err) {
      if (err) throw err;

      // execute a query on our database
      client.query('SELECT modx_users.username, modx_users.user_id as id, user_group, role, name as groupname, fullname, email, title, active, sudo FROM modx_users INNER JOIN modx_member_groups ON modx_member_groups.member = modx_users.user_id INNER JOIN modx_membergroup_names ON modx_member_groups.user_group = modx_membergroup_names.id INNER JOIN modx_user_attributes ON modx_user_attributes.id = modx_users.user_id;', function (err, result) {
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

        resolve({
          userGroups:userGroups,
          users:rows
        });
      });
    });
  });
}

function addUserQuickly() {
  return new Promise(function(resolve, reject) {
    // instantiate a new client
    // the client will read connection information from
    // the same environment varaibles used by postgres cli tools
    var client = new pg.Client();

    // connect to our database
    client.connect(function (err) {
      if (err) reject(err);



      // execute a query on our database
      client.query('INSERT INTO "modx_users" (username, active, primary_group, sudo) VALUES (\'mennopieterson\', 1,5,1);',function(err, result){
        if (err) reject(err);

        // disconnect the client
        client.end(function (err) {
          if (err) reject(err);
        });

        console.log(result);
        resolve(result);
      });
    });
  });
}

function handleAddUserQuickly(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
      console.log(fields);

      var username = fields.username,
      givenname = fields['given-name'],
      familyname = fields['family-name'],
      email = fields.email;

      var message = username + ' added';

      //Store the data from the fields in your data store.
      //The data store could be a file or database or any other store based
      //on your application.
      res.writeHead(200, {
        'content-type': 'text/html'
      });
      res.write('<h1>User Added</h1>');
      res.end('<p>' + message + '</p>');
    });
}

app.listen(process.env.PORT || 1186);

console.log("server listening on " + (process.env.PORT || 1186));
console.log("Visit http://localhost:" + (process.env.PORT || 1186) + " in your browser");
