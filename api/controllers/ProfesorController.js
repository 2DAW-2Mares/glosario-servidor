/**
 * ProfesorController
 *
 * @description :: Server-side logic for managing profesors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	load: function(req, res, next) {
		Profesor.findOne({
			where: { id: Number(req.params.profesorId)}
		}).then(function(profesor){
			if(profesor) {
				req.profesor = profesor;
				next();
			} else { next(new Error('No existe el profesor con el id' + req.params.profesorId));}
		}).catch(function(error){next(error);});
	},

	listarAlumnos: function(req, res, next){
		var numeroDefiniciones = 0;
		var ndefinicion = 0;
		definicionesTotales = {};
		dFinal = [];
		Alumno.find()
		.then(function(alumnos){
			//console.log(alumnos);
			alumnos.forEach(function(alumno){
				Definicion.find({
					where: {alumno: alumno.id}
				}).then(function(definiciones){
					numeroDefiniciones = definiciones.length;
					ndefinicion = numeroDefiniciones;
					console.log(numeroDefiniciones);
				})
				definicionesTotales = {
					'definiciones': ndefinicion,
					'alumno': alumno.nombre
				}
				console.log(numeroDefiniciones);
				dFinal.push(definicionesTotales);
				
			})
			res.json(dFinal);
		})
	}
	
};

