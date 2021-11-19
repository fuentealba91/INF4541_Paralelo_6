<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  
  require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  $con = retornarConexion(); // CREA LA CONEXION
  
    $result = mysqli_query($con, "UPDATE tipo_actividad SET estado='$params->estado' WHERE idTipo_Actividad=$params->idTipo_Actividad");
  
  class Result {}

  // GENERA LOS DATOS DE RESPUESTA
  $response = new Result();
  
  if($result == 'OK')
  {
    $response->resultado = 1;
  }
  else
  {
	$response->resultado = 0;
  }

  header('Content-Type: application/json');

  echo json_encode($response); // MUESTRA EL JSON GENERADO
?>