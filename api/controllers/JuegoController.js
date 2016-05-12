/**
 * JuegoController
 *
 * @description :: Server-side logic for managing juegoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		
		muestraDefinicion: function(req, res, next){
			definicionF = {};
			Definicion.find().limit(20).then(function(definiciones){
				rango = definiciones.length;
				//console.log(rango);
				aleatorio = Math.floor(Math.random() * rango);
				definicionF = definiciones[aleatorio];

				res.json(definicionF);
			})
		},
};

