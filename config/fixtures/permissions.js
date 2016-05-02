// config/fixtures/permissions.js

var Promise = require('bluebird');


exports.create = function () {


		var actions = ['read', 'create', 'delete', 'update'];
		var modelosAlumno = ['Termino', 'Definicion', 'Materia'];
		var permisosAlumno = [];

		actions.forEach(function(action){
			modelosAlumno.forEach(function(modeloAlumno){
				permiso = {role: 'Alumno', model: modeloAlumno, action: action};
				if (action == 'delete') {permiso.relation = 'owner'};
				permisosAlumno.push(permiso);
			})
		})
		//sails.log.verbose(permisosProfesor);

	  return Promise.all([
	    Role.findOrCreate({ name: 'profesor' }, { name: 'profesor' }),
	    Role.findOrCreate({ name: 'alumno' }, { name: 'alumno' })
	  ]).then(function(role){
	  		return Promise.all([
	  			PermissionService.grant(permisosAlumno),
			    PermissionService.grant({ role: 'profesor', model: 'Termino', action: 'read'}), 
			    PermissionService.grant({ role: 'profesor', model: 'Termino', action: 'create'}), 
			    PermissionService.grant({ role: 'profesor', model: 'Termino', action: 'delete', relation: 'owner'}), 
			    PermissionService.grant({ role: 'profesor', model: 'Termino', action: 'update'}), 
			    PermissionService.grant({ role: 'profesor', model: 'Definicion', action: 'read'}), 
			    PermissionService.grant({ role: 'profesor', model: 'Definicion', action: 'create'}), 
			    PermissionService.grant({ role: 'profesor', model: 'Definicion', action: 'delete', relation: 'owner'}), 
			    PermissionService.grant({ role: 'profesor', model: 'Definicion', action: 'update'}), 
			   
		  ])
	  })
};
