<?php 
	header('Access-Control-Allow-Origin: *'); 
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

	global $datos; 

	require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB


	$conexion = retornarConexion(); // CREA LA CONEXION

	// REALIZA LA QUERY A LA DB
	$registros = mysqli_query($conexion,"SELECT p.id_persona, p.rut, p.nombre, p.a_paterno, p.telefono, p.correo, r.id_rol, r.descripcion, rp.profesion, rp.estado FROM rol_persona rp
    INNER JOIN persona p ON rp.persona = p.id_persona INNER JOIN rol r ON rp.rol = r.id_rol");

	// RECORRE EL RESULTADO Y LO GUARDA EN UN ARRAY
	while ($resultado = mysqli_fetch_array($registros))  
	{
	$datos[] = $resultado;
	}

	$json = json_encode($datos); // GENERA EL JSON CON LOS DATOS OBTENIDOS

	header('Content-Type: application/json'); //envía el encabezado http json al navegador para informarle qué tipo de datos espera.

	echo $json; // MUESTRA EL JSON GENERADO AL EJECUTAR DIRECTAMENTE EL LOCALHOST DE XAMPP
?>