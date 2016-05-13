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
				//req.push(definicionF);
				res.json(definicionF);
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
				res.send('Respuesta Correcta');
				definicionF['Correctas:'] = respuesta;
				Estado.push(definicionF);
			}else{
				res.send('Respueta Fallida');
				definicionF['Fallidas:'] = respuesta;
				Estado.push(definicionF);
			}
				//next(Estado);
			console.log(Estado);
		}

};

