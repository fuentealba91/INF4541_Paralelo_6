<?php 
	header('Access-Control-Allow-Origin: *'); 
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

	global $datos; 

	require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

	$conexion = retornarConexion(); // CREA LA CONEXION

	// REALIZA LA QUERY A LA DB
	$registros = mysqli_query($conexion, "SELECT p.id_Persona, p.apodo, p.foto, p.rut, p.nombre, p.segundo_nombre, p.a_paterno, 
	p.a_materno, p.correo, p.clave, p.pregunta_secreta, p.telefono, p.f_nacimiento, p.comuna, p.direccion, p.tel_emergencia, 
	p.sexo, p.id_apoderado FROM persona p WHERE id_Persona=$_GET[id]");

	// RECORRE EL RESULTADO Y LO GUARDA EN UN ARRAY
	while ($resultado = mysqli_fetch_array($registros))  
	{
		$datos[] = $resultado;
	}

	$json = json_encode($datos); // GENERA EL JSON CON LOS DATOS OBTENIDOS

	header('Content-Type: application/json'); //envía el encabezado http json al navegador para informarle qué tipo de datos espera.

	echo $json; // MUESTRA EL JSON GENERADO AL EJECUTAR DIRECTAMENTE EL LOCALHOST DE XAMPP
?>