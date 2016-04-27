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
		Termino.find().then(function(terminos){
			if(terminos){
				res.send(terminos.reverse());
			}
		})
	},

	ultimoMaterias: function(req, res, next){
		//console.log(req.materia);
		Termino.find({
			where: {materia: req.materia.id}
		}).then(function(terminos){
			if(terminos){
				res.send(terminos);
			}
			
		})
	},


	busquedaDirecta: function(req, res, next){
		var busqueda = req.body.answered;
		Termino.findOne({
			where: {nombre: busqueda}
		}).then(function(termino){
			if(termino){
				res.send(termino);
			}else{
				res.send("Ningun termino encontrado!");
			}
		})
	},

	añadir: function(req, res, next){
		var definicion = req.body.answered;
		//console.log(req.session);
		Termino.findOne({
			where: {id: req.termino.id}
		}).then(function(termino){
			if(termino){
				Definicion.create({definicion: definicion, termino: req.termino.id, alumno: req.session.passport.user})
				.exec(function createdCB(err, created){
					res.json(created);
				})
			}
		})
	},

	definiciones: function(req, res, next){
		Definicion.find({
			where: {termino: req.termino.id/*, alumno: req.session.passport.user*/}
		}).then(function(definiciones){
			if(definiciones){
				res.send(definiciones);
			}else{
				res.send("No se enontraron definiciones!");
			}
		})
	}

};

