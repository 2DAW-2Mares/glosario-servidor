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
				aleatorio = Math.round((Math.random() - ((1 / rango) / 2 )) / (1 / rango));
				definicionF = definiciones[aleatorio];
				//req.push(definicionF);
				res.json(definicionF.definicion);
			}).then(function(definicionF){
				next(definicionF);
			})
		},

		respondeTermino: function(req, res, next){
			console.log(definicionF.termino);
			Estado = [];
			respuesta = req.body.respuesta;
			console.log(respuesta);
			if(definicionF.termino == respuesta){
				//Estado.push(definicionF.termino);
				//Estado.push(respuesta);
				next();
			}else{
				//Estado.push(definicionF.termino);
				//Estado.push(respuesta);
				next();
			}
			
			//console.log("Lista de pregunta y respuesta: "+Estado);
		}

};

