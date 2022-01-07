const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://margo:Password@allo.lh527.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect("mongodb+srv://margo:Password@allo.lh527.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))



app.get('/', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db('myFirstDatabase');
        dbo.collection('msgs').find({}).toArray(function (err, result) {
            if (err) throw err;
            res.sendFile(__dirname + '/index.html', result);
            db.close();
        });
    });

    // res.sendFile(__dirname + '/index.html');
});

app.get('/msg', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db('myFirstDatabase');
        dbo.collection('msgs').find({}).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);
            res.send(result);
            db.close();
        });
    });
});

var msgSchema = new mongoose.Schema({
    pseudo: String,
    message: String,
});


io.on('connection', (socket) => {
  socket.on('chat message', msg => {
      console.log(msg)


          io.emit('chat message', msg);
         var msgModel = mongoose.model('msg', msgSchema);

          var monMsg = new msgModel({pseudo : 'Nvcq'});
          monMsg.message = msg;

          monMsg.save(function (err) {
              if (err) { throw err; }
              console.log('Commentaire ajouté avec succès !');
              //mongoose.connection.close();
          });


  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

