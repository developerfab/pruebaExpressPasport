
/*
 * GET home page.
 */
var passport = require('passport');
exports.index = function(req, res){
    try{
        var usern = req.user.username;
        }
    catch(err){
        var usern="No has iniciado sesion";
        }
  res.render('index', { title: 'Express', username:usern });
};
