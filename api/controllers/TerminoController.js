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
		Alumno.findOne({
			where: {user: req.session.passport.user}
		}).then(function(alumno){
			if(alumno){
				Definicion.create({definicion: definicion, termino: req.termino.id, alumno: alumno.id})
				.exec(function createdCB(err, created){
					if(err){
						next(new Error(err));
					}else{
						console.log(created);
						res.json(created);
					}
				})
			}
		})
	},

	definiciones: function(req, res, next){
		Definicion.find({
			where: {termino: req.termino.id, denunciado: false/*, alumno: req.session.passport.user*/}
		}).then(function(definiciones){
			console.log(definiciones);
			if(definiciones){
				res.send(definiciones);
			}else{
				res.send("No se enontraron definiciones!");
			}
		})
	}

};

