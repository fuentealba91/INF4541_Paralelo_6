<?php 
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

    $json = file_get_contents('php://input');

    $params = json_decode($json);

    require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

    $con = retornarConexion(); // CREA LA CONEXION

    $foto = $params->foto;

    if($foto != null && $foto != "")
    {
        // REALIZA LA QUERY A LA DB
        $result = mysqli_query($con, "UPDATE tienda SET foto = '$params->foto', titulo = '$params->titulo', descripcion = '$params->descripcion', precio = '$params->precio'
        WHERE idTienda = '$params->id'");
    }
    else
    {
        // REALIZA LA QUERY A LA DB
        $result = mysqli_query($con, "UPDATE tienda SET titulo = '$params->titulo', descripcion = '$params->descripcion', precio = '$params->precio'
        WHERE idTienda = '$params->id'");
    }
    
    
    class Result {}

    // GENERA LOS DATOS DE RESPUESTA
    $response = new Result();

    if($result == 'OK')
    {
        $response->resultado = 1;
    }
    else if($result == 'NO')
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