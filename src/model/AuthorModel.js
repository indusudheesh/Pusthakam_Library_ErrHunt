const mongoose = require('mongoose');
// add {useNewUrlParser: true, useUnifiedTopology: true} to mongoclient.connect() to avoid deprecation
mongoose.connect('mongodb+srv://indusudheesh:nilaindu@cluster0.amzv5.mongodb.net/Library?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true});
const Schema = mongoose.Schema;


const AuthorSchema = new Schema({
    title : String,
    image: String,
    about: String
    
});

const authordata = mongoose.model('authordata',AuthorSchema);

module.exports = authordata;