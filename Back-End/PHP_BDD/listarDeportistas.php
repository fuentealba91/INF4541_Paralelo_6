<?php 
	header('Access-Control-Allow-Origin: *'); 
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

	global $datos; 

	require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB


	$conexion = retornarConexion(); // CREA LA CONEXION

	// REALIZA LA QUERY A LA DB
	$registros = mysqli_query($conexion,"SELECT pc.id, pc.idPersona, pc.idCategoria, pc.estado, p.nombre as 'nombrePersona', 
	p.a_Paterno as 'paterno', p.correo, p.telefono, c.nombre as 'categoria', d.idDeporte as 'idDeporte', d.nombre as 'deporte' FROM persona_categoria pc 
    INNER JOIN persona p ON pc.idPersona = p.id_Persona 
    INNER JOIN categoria c ON pc.idCategoria = c.idCategoria
    INNER JOIN deporte d ON c.id_deporte = d.idDeporte");

	// RECORRE EL RESULTADO Y LO GUARDA EN UN ARRAY
	while ($resultado = mysqli_fetch_array($registros))  
	{
	    $datos[] = $resultado;
	}

	$json = json_encode($datos); // GENERA EL JSON CON LOS DATOS OBTENIDOS

	header('Content-Type: application/json'); //envía el encabezado http json al navegador para informarle qué tipo de datos espera.

	echo $json; // MUESTRA EL JSON GENERADO AL EJECUTAR DIRECTAMENTE EL LOCALHOST DE XAMPP
?>