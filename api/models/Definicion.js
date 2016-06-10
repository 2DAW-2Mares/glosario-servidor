/**
* Definicion.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  		definicion: {
  			type: 'string',
  			required: true
  		},

      denunciado: {
        type: 'boolean',
        defaultsTo: false
      },

  		valoraciones:{
  			collection: 'valoracion',
  			via: 'definicion'
  		},

      media:{
        type: 'integer',
        defaultsTo: 0
      },

  		termino:{
  			model: 'termino'
  		},

  		alumno:{
  			model: 'alumno'
  		},
  }
};

