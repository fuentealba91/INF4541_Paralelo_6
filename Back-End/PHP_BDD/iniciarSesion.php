<?php 
	header('Access-Control-Allow-Origin: *'); 
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	
	$json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

  	$params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE

	require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

	$conexion = retornarConexion(); // CREA LA CONEXION

	// $encriptada = base64_encode($params->clave);
	$encriptada = md5($params->clave);

	// REALIZA LA QUERY A LA DB
	$registros = mysqli_query($conexion, "SELECT * FROM persona WHERE correo = '$params->correo' AND clave = '$encriptada'");

	// RECORRE EL RESULTADO Y LO GUARDA EN UN ARRAY
	if($resultado = mysqli_fetch_array($registros))  
	{
		$datos[] = $resultado;
	}
	else
	{
		$datos[] = null;
	}

	$json = json_encode($datos); // GENERA EL JSON CON LOS DATOS OBTENIDOS

	header('Content-Type: application/json'); //envía el encabezado http json al navegador para informarle qué tipo de datos espera.

	echo $json; // MUESTRA EL JSON GENERADO AL EJECUTAR DIRECTAMENTE EL LOCALHOST DE XAMPP
?>