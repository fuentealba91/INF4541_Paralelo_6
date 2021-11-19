<?php 
	header('Access-Control-Allow-Origin: *'); 
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

	global $datos; 

	require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB


	$conexion = retornarConexion(); // CREA LA CONEXION

	// REALIZA LA QUERY A LA DB
	$registros = mysqli_query($conexion,"SELECT act.idActividad, act.fecha, act.lugar, act.resultado, cat.nombre AS 'categoria', act.objetivo, dep.nombre AS 'deporte', ta.descripcion 
	FROM actividad act INNER JOIN deporte dep ON act.deporte = dep.idDeporte 
	INNER JOIN categoria cat ON act.categoria = cat.idCategoria 
	INNER JOIN tipo_actividad ta ON act.tipo = ta.idTipo_Actividad WHERE act.categoria = $_GET[id] ORDER BY act.fecha DESC");

	// RECORRE EL RESULTADO Y LO GUARDA EN UN ARRAY
	while ($resultado = mysqli_fetch_array($registros))  
	{
	$datos[] = $resultado;
	}

	$json = json_encode($datos); // GENERA EL JSON CON LOS DATOS OBTENIDOS

	header('Content-Type: application/json'); //envía el encabezado http json al navegador para informarle qué tipo de datos espera.

	echo $json; // MUESTRA EL JSON GENERADO AL EJECUTAR DIRECTAMENTE EL LOCALHOST DE XAMPP
?>