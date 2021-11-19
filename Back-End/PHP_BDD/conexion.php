<?php
	
	global $con;

	function retornarConexion()
	{
		$con=mysqli_connect("localhost","root","","deportivostmargarets");
		return $con;
	}
?>