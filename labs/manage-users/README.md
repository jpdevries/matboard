Manage Users Lab
========

A progressively enhanced proof of concept for a Manage Users CMP&nbsp;page.

![](http://j4p.us/0Q160P2j0E1J/Screen%20Shot%202016-07-25%20at%203.08.32%20AM.png)

## Watch
[Play the GIF&nbsp;preview](http://j4p.us/180i1B3Z0L11/manageusers_eradme.gif).

[Play the Manage Users screencast](https://vimeo.com/176084699).

## What you need

In order to build our front end assets, you need to have Node.js/npm latest and git 1.7 or later.
(Earlier versions might work OK, but are not tested.)

For Windows you have to download and install [git](http://git-scm.com/downloads) and [Node.js](http://nodejs.org/download/).

Mac OS users should install [Homebrew](http://mxcl.github.com/homebrew/). Once Homebrew is installed, run `brew install git` to install git,
and `brew install node` to install Node.js.

Linux/BSD users should use their appropriate package managers to install git and Node.js, or build from source
if you swing that way. Easy-peasy.

Install the [grunt-cli](http://gruntjs.com/getting-started#installing-the-cli) package if you haven't before. These should be done as global installs:

```bash
npm install -g grunt-cli
```

Make sure you have `grunt` installed by testing:

```bash
grunt --version
```

To interact with the application you'll need to be running PostgreSQL for the database. [Install Postgres](https://www.postgresql.org/download/) if you haven't already. Mac users can [install Postgres via brew](https://www.moncefbelyamani.com/how-to-install-postgresql-on-a-mac-with-homebrew-and-lunchy/).

Create a manageusers&nbsp;database.

```bash
psql
CREATE DATABASE manageuser;
\q
```

Next import our example&nbsp;data.

```bash
psql
CREATE DATABASE manageusers;
\q #exit psql command line
```

```bash
psql manageusers < _build/db/manageusers.sql
```

## Getting Started
First, clone a copy of this git repo by running:

```bash
git clone -b grunt git@github.com:jpdevries/matboard.git
```

Then cd into the `manage-users` lab and install the Node&nbsp;dependencies:
```bash
cd matboard/labs/manage-users
npm install
```

You should now be able to build the files and run the Node&nbsp;server!
```bash
grunt build
npm run serve
```

By default this lab runs on port 1186. To run it on a different port use the `PORT` environmental variable:
```bash
PORT=8081 npm run serve #visit http://localhost:8081 in your browser
```

## DOM Overview
An HTML layer is initially served by the Node server to keep the application progressive, optimal, stable, and accessible under any condition. It can truly weather the storms of&nbsp;web.

[Play the DOM Overview section of the screencast](https://vimeo.com/176084699).

## Synchronous Endpoints
Being progressive in nature, JavaScript is not required to create, update, or remove users. "Old school" synchronous HTML `<form>`s are used along with synchronous endpoints in the Node server to accept and process user input on a new page. As we progressively enhance the front end, we also enhance the Node server to support asynchronous endpoints that serve JSON over XHR&nbsp;requests.

[Play the Synchronous Endpoints section of the screencast](https://vimeo.com/176084699#t=6m42s).

## Progressive Enhancements
A lightweight (11kb) JavaScript driver is used to bring asynchronous enhancements into our&nbsp;experience.

[Play the Synchronous Endpoints section of the screencast](https://vimeo.com/176084699#t=6m42s).

## Isomorphism
Our code is isomorphic if it is used to render multiple areas of our application such as both the server and client side. We want to keep our code DRY (DON'T-REPEAT-YOURSELF) meaning changes only have to be made in one place. Without isomorphism our HTML&ndash;first synchronous view would be more expensive. Changes would have to be made in multiple places which takes time and introduces more risk for bugs. Luckily for, we've been able to take advantage of isomorphism in several areas. The markup for the `QuickCreateFieldset` component, which renders the create and update user form, is rendered both on the server&ndash;side and client&ndash;side from the same exact React&nbsp;module!

Our HTML layer itself is isomorphic. As described in the DOM Consumption section below, the data contained in the HTML layer is also consumed by the progressive&nbsp;enhancements.

We also find isomorphism in our Node server which uses the same Promises to interact with the database for both the synchronous and asynchronous&nbsp;endpoints. For&nbsp;example:

```js
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
```

The synchronous and asynchronous endpoint paths leverage isomorphism by being defined in a single `settings` module that is referenced by both the backend Node server and the front end React code. This allows us to modify the endpoints, such as `/add/users` in one spot. Not only is this convenient it helps reduce the possibility of introducing&nbsp;bugs.

## Bandwidth Considerations
React and Redux are loaded from a common CDN. This not only delivers the assets quicker, as they will be served from a server nearest the user's location, but it reduces the weight of our experience by leveraging the browser cache. Browsers cache files by the URL. These concepts are for a management interface. Imagine you may log in to 20 different websites on different domains that use the same manager interface. The first time you login on a fresh cache React and Redux will be cached for all the other interfaces you haven't even logged into or visited&nbsp;yet! By leveraging the browser cache, the more our application is distributed across the web the more performance, optimal, and and accessible it becomes in relation to the world wide&nbsp;web.

[Play the Bandwidth Considerations section of the screencast](https://vimeo.com/176084699#t=25m20s).

## DOM Consumption
Many single page web applications load from an empty `<div id="app"></div>`. First they have to load script dependencies, then they have to reach out for JSON over XHR, then they process the JSON and hopefully serve a meaningful byte to the user. In terms of optimization, speed, and accessibility this process is a series of worst practices. If the scripts break you are left with a meaningless blank screen. Even if everything works, it takes too long to get meaningful content to the user.

Search Engines rank your experience on how quickly you deliver the first byte of meaningful content. In other words, literally nothing outperforms GZIP'ed HTML. By serving an HTML layer first our SEO score is exceptional. Our accessibility is exceptional. Scripts can break or be disabled and the app is still fully functional. Optimization? Hyper speeds, our app is ready to use before React or Redux even&nbsp;loads.

When we initially deliver HTML initially we realize that there is no need to reach out for the data to render the app as JSON over XHR. We already have it! Our HTML document semantically contains all the data we need. Our JavaScript parses the HTML document and populates the model before React consumes and assumes ownership. Sure, we'll probably want to reach out the server every 30 seconds or so to see if the data has updated, but the important thing to understand is by not reaching out over AJAX for JSON initially, our time to first meaningful byte is hyper optimal. With the enhanced JavaScript layer drawing itself from the initially delivered HTML, the experience couldn't be any&nbsp;snappier.

[Play the DOM Consumption section of the screencast](https://vimeo.com/176084699#t=17m20s).

## Screen Reader Considerations
It is important to not only consider how our document is seen but also how it is heard. Accessibly hidden text is used so that labels like 'Filter by' actually read 'Filter Users by User Groups'. Whenever something is visually conveyed, we try and convey it audible&nbsp;also.

[Play the DOM Consumption section of the screencast](https://vimeo.com/176084699#t=22m30s).

## High Contrast Mode
In consideration of not only visually impaired users, but night owls as well, we support a simple high contrast mode which forces backgrounds to black, colors to white, and uses yellow for focused and input&nbsp;elements.

![](http://j4p.us/3I3w0n0u280h/Screen%20Shot%202016-07-25%20at%202.23.22%20AM.png)

[Play the High Contrast Mode section of the screencast](https://vimeo.com/176084699#t=41m24s).

## Responsive Layout
Our interface uses Flexbox for a simple mobile first and fluid&nbsp;layout.

[Play the Responsive Layout section of the screencast](https://vimeo.com/176084699#t=39m8s).

## Oh Node You Didn't
I know, I know. These concepts are written with MODX Next in mind which of course is built on PHP. This lab intends to prove front end (HTML,CSS,JS) concepts. Aside from the HTML or JSON that is served, it does not prove or have opinion of the server side architect it may one day be hooked up to. Node is used as a simple "mock" backend to provide synchronous and asynchronous end points for the user interface to interact with. Idea being, these endpoints and the HTML/JSON they return could be hooked up to PHP and the front end would be none the&nbsp;wiser.

## Twig
Twig is great! And it sounds like it will be found in MODX Next. So, it found its way into this lab as well. The Twig templates used to author the HTML via a Node backend can seamlessly be integrated with a MODX PHP&nbsp;backend.
