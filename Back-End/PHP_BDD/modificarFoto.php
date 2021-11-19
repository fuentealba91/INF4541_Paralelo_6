<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  
  require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  $con = retornarConexion(); // CREA LA CONEXION
  
  
  $res = mysqli_query($con,"SELECT * FROM foto WHERE foto='$params->foto' AND idGaleria='$params->id_galeria'");
  $resp = mysqli_fetch_array($res);

  if($resp == NULL)
  {
    $result = mysqli_query($con,"UPDATE foto SET foto='$params->foto' WHERE idFoto='$params->id'");
  }
  else if($resp['idFoto'] == $params->id 
  )
  {
    $result = mysqli_query($con,"UPDATE foto SET foto='$params->foto' WHERE idFoto='$params->id'");
  }
  else
  {
    $result = 'NO';
  }
  
  class Result {}

  // GENERA LOS DATOS DE RESPUESTA
  $response = new Result();
  
  if($result == 'OK')
  {
    $response->resultado = 1;
  }
  elseif($result == 'NO')
  {
    $response->resultado = 2;
  }
  else
  {
	  $response->resultado = 0;
  }

  header('Content-Type: application/json');

  echo json_encode($response); // MUESTRA EL JSON GENERADO
?>