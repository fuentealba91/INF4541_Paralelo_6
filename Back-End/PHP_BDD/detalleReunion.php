<?php 
	header('Access-Control-Allow-Origin: *'); 
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

	global $datos; 

	require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

	$conexion = retornarConexion(); // CREA LA CONEXION

	// REALIZA LA QUERY A LA DB
	$registros = mysqli_query($conexion, "SELECT re.idReunion, re.fecha, re.lugar, re.puntosTratar, re.acuerdos, per.nombre, 
    per.a_paterno, per.a_materno, tp.descripcion, re.archivo FROM reunion re INNER JOIN persona per ON re.encargado = per.id_Persona
	INNER JOIN tipo_reunion tp ON re.tipoReunion = tp.idTipo WHERE idReunion=$_GET[id]");

	// RECORRE EL RESULTADO Y LO GUARDA EN UN ARRAY
	while ($resultado = mysqli_fetch_array($registros))  
	{
		$datos[] = $resultado;
	}

	$json = json_encode($datos); // GENERA EL JSON CON LOS DATOS OBTENIDOS

	header('Content-Type: application/json'); //envía el encabezado http json al navegador para informarle qué tipo de datos espera.

	echo $json; // MUESTRA EL JSON GENERADO AL EJECUTAR DIRECTAMENTE EL LOCALHOST DE XAMPP
?>