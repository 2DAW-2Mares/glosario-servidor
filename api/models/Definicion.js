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
        type: 'boolean'
      },

  		valoraciones:{
  			collection: 'valoracion',
  			via: 'definicion'
  		},

  		termino:{
  			model: 'termino'
  		},

  		alumno:{
  			model: 'alumno'
  		},
  }
};

