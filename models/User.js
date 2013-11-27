var mongoose = require('mongoose');

//module.exports = function(mongoose){

var userSchema = new mongoose.Schema({
    username : String,
    password : String,
    });
//validate the password
userSchema.methods.validPassword = function (password) {
    if (password === this.password) {
        return true; 
    } else {
        return false;
    }
}
//}
exports.User = mongoose.model('User', userSchema);
mongoose.connect("mongodb://localhost/registro");
//mongoose.model('User', userSchema);
