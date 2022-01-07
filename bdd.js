var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://margo:Password@allo.lh527.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function(err) {
    if (err) { throw err; }
});

var msgSchema = new mongoose.Schema({
    pseudo: String,
    message: String,
});

var msgModel = mongoose.model('msg', msgSchema);

var monMsg = new msgModel({pseudo : 'Nvcq'});
monMsg.message = 'SHEEEEEEEEEEESHHH';

monMsg.save(function (err) {
   if (err) { throw err; }
   console.log('Commentaire ajouté avec succès !');
   mongoose.connection.close();
});