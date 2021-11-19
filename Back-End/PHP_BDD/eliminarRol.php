<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	
  require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  $con = retornarConexion(); // CREA LA CONEXION
  
  // REALIZA LA QUERY A LA DB
  $result = mysqli_query($con, "DELETE FROM rol WHERE id_rol=$_GET[id]");

  class Result {}
  $response = new Result();
  // GENERA LOS DATOS DE RESPUESTA
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