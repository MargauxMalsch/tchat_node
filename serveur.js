const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

mongoose
  .connect("mongodb+srv://margo:Password@allo.lh527.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/quoi', (req, res) => {
    res.sendFile(__dirname + '/bdd.js');
});


var msgSchema = new mongoose.Schema({
    pseudo: String,
    message: String,
});


io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
    console.log(msg)

      var msgModel = mongoose.model('msg', msgSchema);

      var monMsg = new msgModel({pseudo : 'Nvcq'});
      monMsg.message = msg;

      monMsg.save(function (err) {
          if (err) { throw err; }
          console.log('Commentaire ajouté avec succès !');
          mongoose.connection.close();
      });
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

