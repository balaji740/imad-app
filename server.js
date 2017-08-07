var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={
    'article-one':{
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

    'article-two':{
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
 
  'article-three':{
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
    },
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
            ${date}
           </div>
        
            <div>
             ${content}
            </div>
       </div>
    </body>
</html>`;
return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req, res) {
    var articleName = req.params.articleName;
   res.send(createTemplate(articles[articleName]));
});

//app.get('/article-two', function (req, res) {
//   res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
//});

//app.get('/article-three', function (req, res) {
//   res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
//});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function(req,res) {
    res.sendFile(path.join(_dirname, 'ui','main.js'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/favicon.ico', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'favicon.ico'));
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
