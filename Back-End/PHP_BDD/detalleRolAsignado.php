<?php 
	header('Access-Control-Allow-Origin: *'); 
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

	global $datos; 

	require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

	$conexion = retornarConexion(); // CREA LA CONEXION

	// REALIZA LA QUERY A LA DB
	$registros = mysqli_query($conexion,"SELECT persona.id_persona,persona.rut, persona.nombre, persona.a_paterno, rol.id_rol,rol.descripcion, rol_persona.estado FROM rol_persona 
    INNER JOIN persona ON rol_persona.persona = persona.id_persona 
	INNER JOIN rol ON rol_persona.rol = rol.id_rol WHERE persona.id_persona = $_GET[idPersona] AND rol.id_rol = $_GET[idRol]");

	// RECORRE EL RESULTADO Y LO GUARDA EN UN ARRAY
	while ($resultado = mysqli_fetch_array($registros))  
	{
		$datos[] = $resultado;
	}

	$json = json_encode($datos); // GENERA EL JSON CON LOS DATOS OBTENIDOS

	header('Content-Type: application/json'); //envía el encabezado http json al navegador para informarle qué tipo de datos espera.

	echo $json; // MUESTRA EL JSON GENERADO AL EJECUTAR DIRECTAMENTE EL LOCALHOST DE XAMPP
?>