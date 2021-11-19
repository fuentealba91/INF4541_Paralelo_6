-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-11-2021 a las 02:23:55
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `deportivostmargarets`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad`
--

CREATE TABLE `actividad` (
  `idActividad` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `lugar` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `resultado` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `categoria` int(11) NOT NULL,
  `objetivo` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `deporte` int(11) NOT NULL,
  `tipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `actividad`
--

INSERT INTO `actividad` (`idActividad`, `fecha`, `lugar`, `resultado`, `categoria`, `objetivo`, `deporte`, `tipo`) VALUES
(66, '2021-11-25 17:36:00', 'fqwfweq', '', 8, 'fqwefqew', 7, 4),
(67, '2021-11-20 20:57:00', 'lktghsdgh', '', 8, 'sdghsehsdf', 7, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `entrenamientos` text COLLATE utf8_spanish_ci DEFAULT NULL,
  `valores` text COLLATE utf8_spanish_ci DEFAULT NULL,
  `estado` tinyint(1) NOT NULL,
  `fecha` date NOT NULL,
  `genero` char(1) COLLATE utf8_spanish_ci NOT NULL,
  `edad` int(11) NOT NULL,
  `cupo` int(11) NOT NULL,
  `id_deporte` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `nombre`, `entrenamientos`, `valores`, `estado`, `fecha`, `genero`, `edad`, `cupo`, `id_deporte`) VALUES
(1, 'Sub 14', 'Martes: 18:00 - 19:30 hrs (Polideportivo)\nMiercoles: 16:30 - 18:00 hrs (Polideportivo)\nViernes: 16:30 - 18:00 hrs (Polideportivo)', 'Matricula: $10.000\nMensualidad: $20.000', 0, '2021-09-06', 'M', 14, 40, 6),
(7, 'Sub 15', 'Lunes: 18:30 - 20:00 hrs (Estadio Italiano)\nViernes: 16:00 - 18:00 hrs (Estadio Italiano)', 'Matricula: $1UF\nMensualidad: $10.000', 0, '2021-10-28', 'F', 15, 100, 1),
(8, 'Adulta', 'rqrqwere\nqwerqwerqwe', '', 1, '2021-10-28', 'M', 18, 41234231, 7),
(9, 'Sub 14', 'qefqwe\nfqwfqwefwe rqwefweqf', '165900505', 1, '2021-10-28', 'F', 14, 25, 6),
(10, 'Super', 'fasdf das', 'qrwerqwe ', 1, '2021-11-08', 'M', 18, 1111, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE `contacto` (
  `idContacto` int(11) NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `correo` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `telefono` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `asunto` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `mensaje` varchar(400) COLLATE utf8_spanish_ci NOT NULL,
  `fecha` date NOT NULL,
  `estado` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `id_curso` int(11) NOT NULL,
  `descripcion` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `persona` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `deporte`
--

CREATE TABLE `deporte` (
  `idDeporte` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `deporte`
--

INSERT INTO `deporte` (`idDeporte`, `nombre`, `estado`, `fecha`) VALUES
(1, 'Voleibol', 1, NULL),
(6, 'Futbol', 1, '2021-08-03'),
(7, 'fasdf', 1, '2021-08-04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `directiva`
--

CREATE TABLE `directiva` (
  `idDirectorio` int(11) NOT NULL,
  `personalidadJuridica` date NOT NULL,
  `presidente` int(11) NOT NULL,
  `secretario` int(11) NOT NULL,
  `tesorero` int(11) NOT NULL,
  `directivo` int(11) NOT NULL,
  `directivoDesignado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `directiva`
--

INSERT INTO `directiva` (`idDirectorio`, `personalidadJuridica`, `presidente`, `secretario`, `tesorero`, `directivo`, `directivoDesignado`) VALUES
(2, '2021-11-30', 12, 48, 49, 47, 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foto`
--

CREATE TABLE `foto` (
  `idFoto` int(11) NOT NULL,
  `foto` longtext COLLATE utf8_spanish_ci NOT NULL,
  `idGaleria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `foto`
--

INSERT INTO `foto` (`idFoto`, `foto`, `idGaleria`) VALUES
(1, 'WhatsApp Image 2021-09-07 at 12.35.04 (1).jpeg', 1),
(2, 'WhatsApp Image 2021-11-02 at 15.39.35.jpeg', 2),
(3, 'WhatsApp Image 2021-09-07 at 12.35.04.jpeg', 1),
(4, 'WhatsApp Image 2021-09-27 at 09.17.10.jpeg', 3),
(5, 'WhatsApp Image 2021-09-07 at 12.35.04.jpeg', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `galeria`
--

CREATE TABLE `galeria` (
  `idGaleria` int(11) NOT NULL,
  `titulo` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `galeria`
--

INSERT INTO `galeria` (`idGaleria`, `titulo`, `fecha`) VALUES
(1, 'Tenis', '2021-11-17'),
(2, 'Futbol', '2021-11-17'),
(3, 'Hockey', '2021-11-17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticias`
--

CREATE TABLE `noticias` (
  `idNoticia` int(11) NOT NULL,
  `titulo` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `imagen` longtext COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` text COLLATE utf8_spanish_ci NOT NULL,
  `estado` tinyint(4) DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `noticias`
--

INSERT INTO `noticias` (`idNoticia`, `titulo`, `imagen`, `descripcion`, `estado`, `fecha`) VALUES
(5, 'fwfqwefw', 'WhatsApp Image 2021-09-07 at 12.35.04 (1).jpeg', 'fqwfqwe', 1, '2021-11-17'),
(6, 'gwgeqwe', 'WhatsApp Image 2021-09-07 at 12.35.04.jpeg', 'gqwegeew', 1, '2021-11-17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `id_Persona` int(11) NOT NULL,
  `apodo` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `foto` text COLLATE utf8_spanish_ci DEFAULT NULL,
  `rut` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `segundo_nombre` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `a_paterno` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `a_materno` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `correo` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `clave` text COLLATE utf8_spanish_ci DEFAULT NULL,
  `pregunta_secreta` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `telefono` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `f_nacimiento` date NOT NULL,
  `comuna` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `direccion` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `tel_emergencia` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `sexo` char(1) COLLATE utf8_spanish_ci NOT NULL,
  `id_apoderado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`id_Persona`, `apodo`, `foto`, `rut`, `nombre`, `segundo_nombre`, `a_paterno`, `a_materno`, `correo`, `clave`, `pregunta_secreta`, `telefono`, `f_nacimiento`, `comuna`, `direccion`, `tel_emergencia`, `sexo`, `id_apoderado`) VALUES
(12, 'Pipe 2', 'wp5723757-razer-colorful-abstract-wallpapers.jpg', '17.560.710-2', 'Felipe', 'Andrés', 'Fuentealba', 'Illanes', 'administradorSTM@gmail.com', '0f01bafd4e5011bc17bded1d439677f8', 'valparaiso', '+56979479785', '1991-09-28', 'Quilpue', 'las acacias 432111', '322720462', 'M', NULL),
(47, NULL, NULL, '7.398.867-5', 'Cecilia', '', 'Illanes', 'Castro', 'ceicas27@gmail.com', 'aafe06e46da6f8158e7a90926b1b7a84', 'Osorno', '986892046', '1957-10-27', 'Santiago', 'Santiago 123', NULL, 'F', NULL),
(48, NULL, NULL, '15.077.838-7', 'Eduardo', 'Enrique', 'Ribera', 'Illanes', 'edoribera@gmail.com', '96dee1bb26cf7cd9167a4882dc494b8c', 'fqwfweqfqwe', '123456789', '1982-06-24', 'Quilpué', 'qwfwefqwe', NULL, 'M', NULL),
(49, NULL, NULL, '11.111.111-1', 'khqwjflkwej', 'kqwjhfkqwe', 'qwfefqwe', 'fqwfw', 'fqwfeq@fqwf.com', '96dee1bb26cf7cd9167a4882dc494b8c', 'efqwefwef', '1234123423', '1988-06-21', 'fqwfwef', 'fqwfqwef', NULL, 'M', NULL),
(50, NULL, NULL, '18.449.796-4', 'Raffaella', 'Beatrice', 'Molinari', 'Cardenas', 'raffaella.rm@gmail.com', 'aafe06e46da6f8158e7a90926b1b7a84', 'quilpue', '12341234', '1993-12-16', 'Concón', 'Los Cedros 720', NULL, 'F', NULL),
(51, NULL, NULL, '19.169.518-6', 'Prueba', 'Menor', 'Edad', 'Edad', 'edad@menor.com', 'aafe06e46da6f8158e7a90926b1b7a84', 'Ovalle', '123456789', '2021-11-03', 'Los Lagos', 'Los Lagos 1234', NULL, 'F', 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona_actividad`
--

CREATE TABLE `persona_actividad` (
  `id` int(11) NOT NULL,
  `idPersona` int(11) NOT NULL,
  `idActividad` int(11) NOT NULL,
  `asistio` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `persona_actividad`
--

INSERT INTO `persona_actividad` (`id`, `idPersona`, `idActividad`, `asistio`) VALUES
(30, 12, 66, 2),
(31, 48, 66, 0),
(32, 48, 67, 0),
(33, 12, 67, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona_categoria`
--

CREATE TABLE `persona_categoria` (
  `id` int(11) NOT NULL,
  `idPersona` int(11) NOT NULL,
  `idCategoria` int(11) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `persona_categoria`
--

INSERT INTO `persona_categoria` (`id`, `idPersona`, `idCategoria`, `estado`) VALUES
(17, 12, 8, 1),
(18, 48, 8, 1),
(19, 12, 10, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona_reunion`
--

CREATE TABLE `persona_reunion` (
  `id` int(11) NOT NULL,
  `persona` int(11) NOT NULL,
  `reunion` int(11) NOT NULL,
  `asistio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `persona_reunion`
--

INSERT INTO `persona_reunion` (`id`, `persona`, `reunion`, `asistio`) VALUES
(44, 48, 63, 3),
(45, 12, 63, 3),
(46, 47, 64, 0),
(47, 50, 64, 0),
(48, 47, 65, 0),
(49, 50, 65, 0),
(50, 12, 65, 0),
(51, 48, 65, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reunion`
--

CREATE TABLE `reunion` (
  `idReunion` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `lugar` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `puntosTratar` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `acuerdos` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `encargado` int(11) NOT NULL,
  `tipoReunion` int(11) NOT NULL,
  `archivo` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `reunion`
--

INSERT INTO `reunion` (`idReunion`, `fecha`, `lugar`, `puntosTratar`, `acuerdos`, `encargado`, `tipoReunion`, `archivo`) VALUES
(63, '2021-12-02 18:51:00', 'fwqefew', 'fwefqew', '', 48, 18, 'Primer avance evaluación clave.pdf'),
(64, '2021-09-21 20:39:00', 'vfwergerwg', 'gwergwerg', 'qkhjkhfklwj jkl ghwerlkgj h', 48, 18, 'Tarea 2_Felipe Andrés Fuentealba Illanes.pdf'),
(65, '2021-12-12 20:45:00', 'fqwefqwe', 'fqwefqwefw', '', 12, 18, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `descripcion` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `descripcion`) VALUES
(1, 'Administrador'),
(2, 'Socio Interno'),
(3, 'Socio Externo'),
(4, 'Secretario'),
(5, 'Deportista'),
(6, 'Miembro'),
(16, 'Entrenador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_persona`
--

CREATE TABLE `rol_persona` (
  `persona` int(11) NOT NULL,
  `rol` int(11) NOT NULL,
  `profesion` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `rol_persona`
--

INSERT INTO `rol_persona` (`persona`, `rol`, `profesion`, `estado`) VALUES
(12, 5, '', 0),
(47, 4, '', 0),
(12, 1, '', 0),
(48, 5, '', 0),
(47, 2, 'grvasvas', 1),
(50, 3, 'hbhvbjvh', 1),
(12, 2, 'rtrgr', 1),
(48, 2, 'qwwejhskjhfjkl', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tienda`
--

CREATE TABLE `tienda` (
  `idTienda` int(11) NOT NULL,
  `titulo` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` text COLLATE utf8_spanish_ci NOT NULL,
  `estado` tinyint(4) NOT NULL,
  `foto` text COLLATE utf8_spanish_ci NOT NULL,
  `precio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tienda`
--

INSERT INTO `tienda` (`idTienda`, `titulo`, `descripcion`, `estado`, `foto`, `precio`) VALUES
(2, 'Pelota', 'fqwefqwefqwe', 1, 'WhatsApp Image 2021-09-07 at 12.35.04.jpeg', 15087);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_actividad`
--

CREATE TABLE `tipo_actividad` (
  `idTipo_Actividad` int(11) NOT NULL,
  `descripcion` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tipo_actividad`
--

INSERT INTO `tipo_actividad` (`idTipo_Actividad`, `descripcion`, `estado`) VALUES
(1, 'Entrenamiento', 0),
(2, 'Partido Oficial', 1),
(3, 'Partido Amistoso', 1),
(4, 'Campeonato', 1),
(5, 'qwekhjqwejkf ', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_reunion`
--

CREATE TABLE `tipo_reunion` (
  `idTipo` int(11) NOT NULL,
  `descripcion` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tipo_reunion`
--

INSERT INTO `tipo_reunion` (`idTipo`, `descripcion`, `estado`) VALUES
(1, 'Asamblea Ordinaria', 0),
(18, 'Asamblea Extraordinaria', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividad`
--
ALTER TABLE `actividad`
  ADD PRIMARY KEY (`idActividad`),
  ADD KEY `categoria` (`categoria`),
  ADD KEY `deporte` (`deporte`),
  ADD KEY `tipo` (`tipo`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`),
  ADD KEY `id_deporte` (`id_deporte`);

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`idContacto`);

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`id_curso`),
  ADD KEY `persona` (`persona`);

--
-- Indices de la tabla `deporte`
--
ALTER TABLE `deporte`
  ADD PRIMARY KEY (`idDeporte`);

--
-- Indices de la tabla `directiva`
--
ALTER TABLE `directiva`
  ADD PRIMARY KEY (`idDirectorio`),
  ADD KEY `presidente` (`presidente`),
  ADD KEY `secretario` (`secretario`),
  ADD KEY `tesorero` (`tesorero`),
  ADD KEY `directivo` (`directivo`),
  ADD KEY `directivoDesignado` (`directivoDesignado`);

--
-- Indices de la tabla `foto`
--
ALTER TABLE `foto`
  ADD PRIMARY KEY (`idFoto`),
  ADD KEY `idGaleria` (`idGaleria`);

--
-- Indices de la tabla `galeria`
--
ALTER TABLE `galeria`
  ADD PRIMARY KEY (`idGaleria`);

--
-- Indices de la tabla `noticias`
--
ALTER TABLE `noticias`
  ADD PRIMARY KEY (`idNoticia`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`id_Persona`),
  ADD KEY `apoderado_FK` (`id_apoderado`);

--
-- Indices de la tabla `persona_actividad`
--
ALTER TABLE `persona_actividad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPersona` (`idPersona`),
  ADD KEY `idActividad` (`idActividad`);

--
-- Indices de la tabla `persona_categoria`
--
ALTER TABLE `persona_categoria`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPersona` (`idPersona`),
  ADD KEY `idCategoria` (`idCategoria`);

--
-- Indices de la tabla `persona_reunion`
--
ALTER TABLE `persona_reunion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `persona` (`persona`),
  ADD KEY `reunion` (`reunion`);

--
-- Indices de la tabla `reunion`
--
ALTER TABLE `reunion`
  ADD PRIMARY KEY (`idReunion`),
  ADD KEY `tipoReunion` (`tipoReunion`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `rol_persona`
--
ALTER TABLE `rol_persona`
  ADD KEY `persona` (`persona`),
  ADD KEY `rol` (`rol`);

--
-- Indices de la tabla `tienda`
--
ALTER TABLE `tienda`
  ADD PRIMARY KEY (`idTienda`);

--
-- Indices de la tabla `tipo_actividad`
--
ALTER TABLE `tipo_actividad`
  ADD PRIMARY KEY (`idTipo_Actividad`);

--
-- Indices de la tabla `tipo_reunion`
--
ALTER TABLE `tipo_reunion`
  ADD PRIMARY KEY (`idTipo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividad`
--
ALTER TABLE `actividad`
  MODIFY `idActividad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `contacto`
--
ALTER TABLE `contacto`
  MODIFY `idContacto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `id_curso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `deporte`
--
ALTER TABLE `deporte`
  MODIFY `idDeporte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `directiva`
--
ALTER TABLE `directiva`
  MODIFY `idDirectorio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `foto`
--
ALTER TABLE `foto`
  MODIFY `idFoto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `galeria`
--
ALTER TABLE `galeria`
  MODIFY `idGaleria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `noticias`
--
ALTER TABLE `noticias`
  MODIFY `idNoticia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `id_Persona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `persona_actividad`
--
ALTER TABLE `persona_actividad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `persona_categoria`
--
ALTER TABLE `persona_categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `persona_reunion`
--
ALTER TABLE `persona_reunion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `reunion`
--
ALTER TABLE `reunion`
  MODIFY `idReunion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `tienda`
--
ALTER TABLE `tienda`
  MODIFY `idTienda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipo_actividad`
--
ALTER TABLE `tipo_actividad`
  MODIFY `idTipo_Actividad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tipo_reunion`
--
ALTER TABLE `tipo_reunion`
  MODIFY `idTipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividad`
--
ALTER TABLE `actividad`
  ADD CONSTRAINT `actividad_ibfk_1` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`idCategoria`),
  ADD CONSTRAINT `actividad_ibfk_2` FOREIGN KEY (`deporte`) REFERENCES `deporte` (`idDeporte`),
  ADD CONSTRAINT `actividad_ibfk_3` FOREIGN KEY (`tipo`) REFERENCES `tipo_actividad` (`idTipo_Actividad`);

--
-- Filtros para la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD CONSTRAINT `categoria_ibfk_1` FOREIGN KEY (`id_deporte`) REFERENCES `deporte` (`idDeporte`);

--
-- Filtros para la tabla `curso`
--
ALTER TABLE `curso`
  ADD CONSTRAINT `curso_ibfk_1` FOREIGN KEY (`persona`) REFERENCES `persona` (`id_Persona`);

--
-- Filtros para la tabla `directiva`
--
ALTER TABLE `directiva`
  ADD CONSTRAINT `directiva_ibfk_1` FOREIGN KEY (`presidente`) REFERENCES `persona` (`id_Persona`),
  ADD CONSTRAINT `directiva_ibfk_2` FOREIGN KEY (`secretario`) REFERENCES `persona` (`id_Persona`),
  ADD CONSTRAINT `directiva_ibfk_3` FOREIGN KEY (`tesorero`) REFERENCES `persona` (`id_Persona`),
  ADD CONSTRAINT `directiva_ibfk_4` FOREIGN KEY (`directivo`) REFERENCES `persona` (`id_Persona`),
  ADD CONSTRAINT `directiva_ibfk_5` FOREIGN KEY (`directivoDesignado`) REFERENCES `persona` (`id_Persona`);

--
-- Filtros para la tabla `foto`
--
ALTER TABLE `foto`
  ADD CONSTRAINT `foto_ibfk_1` FOREIGN KEY (`idGaleria`) REFERENCES `galeria` (`idGaleria`);

--
-- Filtros para la tabla `persona`
--
ALTER TABLE `persona`
  ADD CONSTRAINT `apoderado_FK` FOREIGN KEY (`id_apoderado`) REFERENCES `persona` (`id_Persona`);

--
-- Filtros para la tabla `persona_actividad`
--
ALTER TABLE `persona_actividad`
  ADD CONSTRAINT `persona_actividad_ibfk_1` FOREIGN KEY (`idPersona`) REFERENCES `persona` (`id_Persona`),
  ADD CONSTRAINT `persona_actividad_ibfk_2` FOREIGN KEY (`idActividad`) REFERENCES `actividad` (`idActividad`);

--
-- Filtros para la tabla `persona_categoria`
--
ALTER TABLE `persona_categoria`
  ADD CONSTRAINT `persona_categoria_ibfk_1` FOREIGN KEY (`idPersona`) REFERENCES `persona` (`id_Persona`),
  ADD CONSTRAINT `persona_categoria_ibfk_2` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`);

--
-- Filtros para la tabla `persona_reunion`
--
ALTER TABLE `persona_reunion`
  ADD CONSTRAINT `persona_reunion_ibfk_1` FOREIGN KEY (`persona`) REFERENCES `persona` (`id_Persona`),
  ADD CONSTRAINT `persona_reunion_ibfk_2` FOREIGN KEY (`reunion`) REFERENCES `reunion` (`idReunion`);

--
-- Filtros para la tabla `reunion`
--
ALTER TABLE `reunion`
  ADD CONSTRAINT `reunion_ibfk_1` FOREIGN KEY (`tipoReunion`) REFERENCES `tipo_reunion` (`idTipo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `rol_persona`
--
ALTER TABLE `rol_persona`
  ADD CONSTRAINT `rol_persona_ibfk_1` FOREIGN KEY (`persona`) REFERENCES `persona` (`id_Persona`),
  ADD CONSTRAINT `rol_persona_ibfk_2` FOREIGN KEY (`rol`) REFERENCES `rol` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
