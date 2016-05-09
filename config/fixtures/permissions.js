// config/fixtures/permissions.js

var Promise = require('bluebird');


exports.create = function () {


		var actions = ['read', 'create', 'delete', 'update'];
		var modelosAlumno = ['Termino', 'Definicion', 'Materia', 'Valoracion'];
		var permisosAlumno = [];

		actions.forEach(function(action){
			modelosAlumno.forEach(function(modeloAlumno){
				permiso = {role: 'Alumno', model: modeloAlumno, action: action};
				if (action == 'delete') {permiso.relation = 'owner'};
				permisosAlumno.push(permiso);
			})
		})

		var actionsProfesor = ['read', 'create', 'delete', 'update'];
		var modelosProfesor = ['Termino', 'Definicion', 'Grupo'];
		var permisosProfesor = [];

		actionsProfesor.forEach(function(action){
			modelosProfesor.forEach(function(modeloProfesor){
				permiso = {role: 'Profesor', model: modeloProfesor, action: action};
				if (action == 'delete') {permiso.relation = 'owner'};
				permisosProfesor.push(permiso);
			})
		})
		//sails.log.verbose(permisosProfesor);

	  return Promise.all([
	    Role.findOrCreate({ name: 'profesor' }, { name: 'profesor' }),
	    Role.findOrCreate({ name: 'alumno' }, { name: 'alumno' })
	  ]).then(function(role){
	  		return Promise.all([
	  			PermissionService.grant(permisosAlumno),
			    PermissionService.grant(permisosProfesor), 
		  ])
	  })
};
