var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var config = {
    user: 'balaji740',
    database: 'balaji740',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
    
    

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

var articles={
    'article-one': {
    title: 'Article one:by Balaji Seshadri',
    date: 'date:Aug 08',
    heading:'Article One',
    content:` <p>This is content for second article.This is content for first article.
                 This is content for first article.This is content for first article.
              </p>
              <p>This is content for first article.This is content for first article.
               This is content for first article.This is content for first article.
              </p>
              <p>This is content for first article.This is content for first article.
               This is content for first article.This is content for first article.
              </p>`
    },

    'article-two': {
    title: 'Article two:by Balaji Seshadri',
    date: 'date:Aug 08',
    heading:'Article One',
    content:` <p>This is content for second article.This is content for second article.
                 This is content for second article.This is content for second article.
              </p>
              <p>This is content for second article.This is content for second article.
               This is content for second article.This is content for second article.
              </p>
              <p>This is content for second article.This is content for second article.
               This is content for second article.This is content for second article.
              </p>`
    },
 
  'article-three': {
    title: 'Article three:by Balaji Seshadri',
    date: 'date:Aug 08',
    heading:'Article three',
    content:` <p>This is content for second article.This is content for second article.
                 This is content for second article.This is content for second article.
              </p>
              <p>This is content for second article.This is content for second article.
               This is content for second article.This is content for second article.
              </p>
              <p>This is content for second article.This is content for second article.
               This is content for second article.This is content for second article.
              </p>`
    }
};

//var articleOne={
//    title: 'Article one:by Balaji Seshadri',
//    date: 'date:Aug 08',
//    heading:'Article One',
//    content:` <p>This is content for second article.This is content for first article.
//                 This is content for first article.This is content for first article.
//              </p>
//              <p>This is content for first article.This is content for first article.
//               This is content for first article.This is content for first article.
//              </p>
//              <p>This is content for first article.This is content for first article.
//               This is content for first article.This is content for first article.
//              </p>`
//};

function createTemplate(data){
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
    
    var htmlTemplate = `
    
    <html>
    <head>
        <title>
            ${title}
        </title>
        <meta name = "viewport" content="width=device-width, initial-scale=1"/>
        <link href="ui/style.css" rel="stylesheet"/>
    </head>
        
    <body>
       <div class="container">
           <div>
               <a href='/'>Home</a>
           </div>
           <hr/>
           <h3>
           ${heading}
           </h3>
           <div>
            ${date.toDateString()}
           </div>
        
            <div>
             ${content}
            </div>
       </div>
    </body>
</html>`;
return htmlTemplate;
}

var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
    res.send(counter.toString());
}); 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
 //   return hashed.toString('hex');
    return["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:input' , function(req,res){
    var hashedString = hash(req.params.input, 'this is some string');
    res.send(hashedString);
});

var Pool = new Pool(config);
app.post('/create-user',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    console.log('test');
    var salt = crypto.randomBytes(128).toString('hex');
    console.log('test1');
    var dbstring = hash(password,salt);
    console.log(dbstring);
    Pool.query('INSERT into "user" (username, password) VALUES ($1, $2)', [username, dbstring], function(err, result){
        if(err){
            res.status(500).send(err.toString());
            } else {
                res.send('user successfully created:' + username);
            }
    });
});


app.post('/login',function(req,res){
     var username = req.body.username;
     var password = req.body.password;
    // console.log('serverjs');
    // console.log(password);
    Pool.query('SELECT * FROM "user" where username= $1',[username], function(err, result){
        if(err){
            res.status(500).send(err.toString());
            } else {
                if (result.rows.length === 0) {
                    res.status(403).send('userid/password is invalid' );
                } else {
                var dbstring = result.rows[0].password;
                var salt = dbstring.split('$')[2];
                  console.log(password);
                   console.log(dbstring);
                var hashedPassword = hash(password,salt);
                console.log(hashedPassword);
                if (hashedPassword == dbstring) {
                   res.send('credentials are correct');
                   }else {
                       res.send('userid/password is invalid');
                   }
                 }
            }
    });
});
//var Pool = new Pool(config);

app.get('/test-db', function(req,res){
   Pool.query('SELECT * FROM test' , function(err, result){
       if (err)
       {
       res.status(500).send(err.tostring());    
       } else {
           res.send(JSON.stringify(result.rows));
       }
   }) ;
});
//app.get('/submit-name/:name',function(req,res){
  app.get('/submit-name', function(req,res){ 
//   var name = req.params.name;
   var name = req.query.name; 
   names.push(name);
   res.send(JSON.stringify(names));
});

//app.get('/:articleName', function (req, res) {
  app.get('/articles/:articleName', function(req,res) {
    var articleName = req.params.articleName;
 //   res.send(createTemplate(articles[articleName]));

//Pool.query("SELECT * FROM ariclea WHERE title='" + req.params.articleName + "'", function(err,result) {
  Pool.query("SELECT * FROM articlea WHERE title = $1",[req.params.articleName],function(err,result) { 
  
    if (err){
        res.status(500).send(err.toString());
    }  else {
        if (result.rows.length===0) {
            res.status(404).send('Article not Found');
        } else {
        var articleData = result.rows[0];
        res.send(createTemplate(articleData));
        }  
     } 
 
}); 
 
}); 

app.get('/article-one', function(req,res){
    res.sendFile(path.join(_dirname, 'ui', 'article-one.html'));
});
app.get('/article-two', function (req, res) {
   res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

//app.get('/article-three', function (req, res) {
//   res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
//});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function(req,res) {
    res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/favicon.ico', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'favicon.ico'));
});
var names =[];

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
