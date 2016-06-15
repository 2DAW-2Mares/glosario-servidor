// config/passport.js

var _ = require('lodash');
var _super = require('sails-permissions/config/passport');

_.merge(exports, _super);
_.merge(exports, {

  // Extend with custom logic here by adding additional fields, methods, etc.

  passport: {
		google : {
		    name: 'Google',
		    protocol: 'oauth2',
		    strategy: require('passport-google-oauth').OAuth2Strategy,
		    options: {
		      clientID: '328156475210-98crr3l1oef8ucimrj9sou0lb72arsgm.apps.googleusercontent.com',
		      clientSecret: 'B-eANd6KroupdcKnGVqWgn-O',
		      scope: ['profile', 'email'],
		      
		    }
	  }
	}
});
