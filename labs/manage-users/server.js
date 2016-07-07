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

app.get('/', function(req, res){
  //res.render('index.twig');
  fs.readFile('index.html', function (err, data) {
    res.writeHead(200, {
        'Content-Type': 'text/html',
            'Content-Length': data.length
    });
    res.write(data);
    res.end();
  });
});

app.get('/users',function(req, res){
  // instantiate a new client
  // the client will read connection information from
  // the same environment varaibles used by postgres cli tools
  var client = new pg.Client();

  // connect to our database
  client.connect(function (err) {
    if (err) throw err;

    // execute a query on our database
    client.query('SELECT modx_users.username, user_group, role, name, fullname, email, title FROM modx_users INNER JOIN modx_member_groups ON modx_member_groups.member = modx_users.id INNER JOIN modx_membergroup_names ON modx_member_groups.user_group = modx_membergroup_names.id INNER JOIN modx_user_attributes ON modx_user_attributes.id = modx_users.id;', function (err, result) {
      if (err) throw err;

      // disconnect the client
      client.end(function (err) {
        if (err) throw err;
      });

      res.json(result.rows);
    });
  });
});

app.post('/add/user', function(req, res){
  processAllFieldsOfTheForm(req,res);
});

app.use(express.static(__dirname));

function processAllFieldsOfTheForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
      console.log(fields);

      var message = 'YOLO';

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
