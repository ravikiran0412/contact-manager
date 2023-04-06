const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/contacts_list_db');

const db= mongoose.connection;

db.on('error',console.error.bind(console,'error while connectig to db'));

db.once('open',function(){
    console.log('connection to db is succesful')
});