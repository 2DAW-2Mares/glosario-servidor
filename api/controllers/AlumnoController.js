/**
 * AlumnoController
 *
 * @description :: Server-side logic for managing alumnoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	load: function(req, res, next) {
		Alumno.findOne({
			where: { id: Number(req.params.alumnoId)}
		}).populate('terminos').then(function(alumno){
			if(alumno) {
				req.alumno = alumno;
				next();
			} else { next(new Error('No existe el alumno con el id' + req.params.alumnoId));}
		}).catch(function(error){next(error);});
	},
	
	ultimos: function(req, res, next){
		var terminos = req.alumno.terminos;
		res.send(terminos.reverse());
	},

	materias: function(req, res, next){
		//console.log(req.materia);
		Termino.find({
			where: {materia: req.materia.id}
		}).then(function(terminos){
			res.send(terminos);
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
		Termino.findOne({
			where: {id: req.termino.id}
		}).then(function(termino){
			if(termino){
				Definicion.create({definicion: definicion, termino: req.termino.id, alumno: req.alumno.id})
				.exec(function createdCB(err, created){
					res.json(created);
				})
			}
		})
	},

	definiciones: function(req, res, next){
		Definicion.find({
			where: {termino: req.termino.id, alumno: req.alumno.id}
		}).then(function(definiciones){
			sails.log.verbose(req.termino.id+" Alumno :"+req.alumno.id);
			console.log(definiciones);
			if(definiciones){
				res.send(definiciones);
			}else{
				res.send("No se enontraron definiciones!");
			}
		})
	}

};

