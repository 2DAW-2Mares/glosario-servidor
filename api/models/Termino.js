/**
* Termino.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	nombre : { type: 'string', size: 30, required: true },

  	definiciones:{
  		collection: 'definicion',
  		via:'termino'
  	},

  	alumnos:{
  		collection: 'alumno',
  		via: 'terminos'
  	}
  }
};

