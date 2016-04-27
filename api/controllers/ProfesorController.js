/**
 * ProfesorController
 *
 * @description :: Server-side logic for managing profesors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	listarAlumnos: function(req, res, next){
		Alumno.find()
		.then(function(alumnos){
			console.log(alumnos.definiciones);
			if(alumnos.definiciones != null){
				console.log(alumnos);
			}
		})
	}
	
};

