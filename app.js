var express = require('express');
var app = express();
var http = require('http');
var Instagram = require('instagram-node-lib');
server = http.createServer(app);
port = process.env.PORT || 3000;


app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

var io = require('socket.io')(server);

Instagram.set('client_id', process.env.INSTAGRAM_CLIENT_ID);
Instagram.set('client_secret', process.env.INSTAGRAM_CLIENT_SECRET);
Instagram.set('callback_url', 'https://372ad4f5.ngrok.io');

app.get('/', function(req, res) {
  res.render('index');
})

server.listen(port, function() {
  console.log('Server started on http://localhost:' + port);
});

 Instagram.tags.info({
  name: 'football',
  complete: function(data){
    console.log(data);
  }
});

Instagram.subscriptions.subscribe({ 
       object: 'tag',
        object_id: 'football',
        aspect: 'media',
        callback_url: 'https://372ad4f5.ngrok.io/callback',
        type: 'subscription',
        id: '#' 
});

app.get('/callback', function(request, response){
  Instagram.subscriptions.handshake(request, response); 
});

