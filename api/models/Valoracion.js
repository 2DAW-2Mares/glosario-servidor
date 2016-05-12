/**
* Valoracion.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  		usuario: {
  			type: 'string',
  			required: true
  		},

  		valoracion: {
  			type: 'string',
        enum: ['1', '2', '3', '4', '5'],
  			required: true
  		},

  		definicion: {
  			model: 'definicion'
  		}
  },
  indexes:[
    //a composite index
    {
       attributes:  ['usuario', 'definicion'],
       unique: true
    }
  ]
};

