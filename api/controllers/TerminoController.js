/**
 * TerminoController
 *
 * @description :: Server-side logic for managing terminoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	load: function(req, res, next) {
		Termino.findOne({
			where: { id: Number(req.params.terminoId)}
		}).then(function(termino){
			if(termino) {
				req.termino = termino;
				next();
			} else { next(new Error('No existe el termino con el id' + req.params.terminoId));}
		}).catch(function(error){next(error);});
	},

	ultimos: function(req, res, next){
		Termino.find().sort('id DESC').limit(5).then(function(terminos){
			if(terminos){
				res.json(terminos);
			}
		})
	},

	ultimoMaterias: function(req, res, next){
		//console.log(req.materia);
		Termino.find({
			where: {materia: req.materia.id}
		}).sort('id DESC').limit(5).then(function(terminos){
			if(terminos){
				res.json(terminos);
			}
			
		})
	},


	busquedaDirecta: function(req, res, next){
		var busqueda = req.param('nombre');
		Termino.find(
			{nombre: {'contains' : busqueda}}
		).then(function(termino){
			if(termino){
				res.json(termino);
			}else{
				res.send("Ningun termino encontrado con ese nombre!");
			}
		})
	},

	anyadir: function(req, res, next){
		var definicion = req.body.definicion;
		//console.log(req.session);
		//Alumno.findOne({
		//	where: {user: req.session.passport.user}
		//}).then(function(alumno){
			//if(alumno){
				Definicion.create({definicion: definicion, termino: req.termino.id, alumno: 4})
				.exec(function createdCB(err, created){
					if(err){
						next(new Error(err));
					}else{
						console.log(created);
						res.json(created);
					}
				})
			//}
		//})
	},

	definiciones: function(req, res, next){
		Definicion.find({
			where: {termino: req.termino.id /*denunciado: false/*, alumno: req.session.passport.user*/}
		}).populate('valoraciones').then(function(definiciones){
			//console.log(definiciones);
			if(definiciones){

				definiciones.forEach(function(definicion){
					suma = 0;
					total = 0;
					rango = 0;
					respuesta = definicion.valoraciones;
					rango = respuesta.length;
					if(!rango){
						rango=0;
					}
					respuesta.forEach(function(valoracion){
						suma += parseInt(valoracion.valoracion);
					})

					if(suma!=0){
						total = parseInt(suma/rango);
					}else{
						total = 0;
					}
					definicion.media = total;
				})
				res.send(definiciones);
			}else{
				res.send("No se enontraron definiciones!");
			}
		})
	}

};

