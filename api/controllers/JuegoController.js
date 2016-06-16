/**
 * JuegoController
 *
 * @description :: Server-side logic for managing juegoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		
		muestraDefinicion: function(req, res, next){
			Definicion.count().then(function(rango){
				aleatorio = Math.round((Math.random() - ((1 / rango) / 2 )) / (1 / rango));
				Definicion.find().limit(1).skip(aleatorio).then(function(definicion){
					res.json(definicion[0]);
				})
			})
			/*
			Definicion.find().limit(20).then(function(definiciones){
				rango = definiciones.length;
				//console.log(rango);
				
				definicionF = definiciones[aleatorio];
				//req.push(definicionF);
				
			}).then(function(definicionF){
				next(definicionF);
			})*/
		},

		respondeTermino: function(req, res, next){
			respuesta = req.body;
			Termino.find({
				where: {id: respuesta.id, nombre: respuesta.nombre}
			}).then(function(termino){
				if(termino){
					res.send(true);
				}else{
					res.send(false);
				}
			})
			/*
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
			
			//console.log("Lista de pregunta y respuesta: "+Estado);*/
		}

};

