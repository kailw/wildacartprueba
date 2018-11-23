-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 23-11-2018 a las 08:23:38
-- Versión del servidor: 5.7.23
-- Versión de PHP: 7.1.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `wildcart`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `id` int(11) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `iva` float DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`id`, `fecha`, `iva`, `id_usuario`) VALUES
(1, NULL, 5, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `linea`
--

CREATE TABLE `linea` (
  `id` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `id_factura` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `linea`
--

INSERT INTO `linea` (`id`, `cantidad`, `id_producto`, `id_factura`) VALUES
(1, 22, 33, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `codigo` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `desc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `existencias` int(11) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `foto` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_tipoProducto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `codigo`, `desc`, `existencias`, `precio`, `foto`, `id_tipoProducto`) VALUES
(1, 'tomate', 'tomate', 21, 14, 'IMAGEN TOMATE', 1),
(2, 'C3', 'Aparejo de Jardineria para desbrozar', 3, 38.64, 'fotoProducto', 1),
(3, 'A1', 'Utensillo Cortante para medir', 2, 85.02, 'fotoProducto', 1),
(4, 'U8', 'Generador Pequeno para medir', 4, 56.89, 'fotoProducto', 1),
(5, 'P7', 'Generador Circular para reposteria', 3, 24.13, 'fotoProducto', 1),
(6, 'P7', 'Utensillo Facil para medir', 3, 87.92, 'fotoProducto', 1),
(7, 'B2', 'Generador Electrico para medir', 3, 6.84, 'fotoProducto', 1),
(8, 'A1', 'Utensillo de Jardineria para reposteria', 4, 57.25, 'fotoProducto', 1),
(9, 'M6', 'Herramienta de Jardineria para medir', 4, 17.53, 'fotoProducto', 1),
(10, 'T5', 'Mecanismo Pequeno para cortar', 5, 90.58, 'fotoProducto', 1),
(11, 'T5', 'Utensillo Manual para carpinteria', 5, 3.99, 'fotoProducto', 1),
(12, 'C3', 'Aparejo Manual para desbrozar', 1, 52.44, 'fotoProducto', 1),
(13, 'U8', 'Generador Electrico para carpinteria', 3, 71.7, 'fotoProducto', 1),
(14, 'T5', 'Instrumento Manual para romper', 1, 58.66, 'fotoProducto', 1),
(15, 'C3', 'Mecanismo Circular para romper', 5, 76.98, 'fotoProducto', 1),
(16, 'M6', 'Utensillo Manual para romper', 5, 12.64, 'fotoProducto', 1),
(17, 'M6', 'Herramienta de Jardineria para lijar', 4, 68.95, 'fotoProducto', 1),
(18, 'K4', 'Aparejo de Jardineria para perforar', 1, 15.49, 'fotoProducto', 1),
(19, 'U8', 'Aparejo Circular para desbrozar', 5, 30.31, 'fotoProducto', 1),
(20, 'K4', 'Mecanismo Circular para reposteria', 2, 100, 'fotoProducto', 1),
(21, 'U8', 'Instrumento Largo para medir', 5, 66.94, 'fotoProducto', 1),
(22, 'K4', 'Maquina Facil para romper', 3, 38.36, 'fotoProducto', 1),
(23, 'B2', 'Generador Manual para lijar', 3, 96.38, 'fotoProducto', 1),
(24, 'U8', 'Maquina Circular para reposteria', 2, 73.83, 'fotoProducto', 1),
(25, 'B2', 'Maquina Cortante para perforar', 1, 85.04, 'fotoProducto', 1),
(26, 'C3', 'Maquina Largo para carpinteria', 4, 26.15, 'fotoProducto', 1),
(27, 'C3', 'Maquina Pequeno para medir', 3, 84.39, 'fotoProducto', 1),
(28, 'T5', 'Instrumento Largo para cortar', 3, 20.8, 'fotoProducto', 1),
(29, 'T5', 'Maquina Cortante para lijar', 5, 15.79, 'fotoProducto', 1),
(30, 'C3', 'Mecanismo Manual para medir', 2, 92.07, 'fotoProducto', 1),
(31, 'M6', 'Herramienta Facil para reposteria', 1, 54.31, 'fotoProducto', 1),
(32, 'B2', 'Utensillo Facil para medir', 4, 10.05, 'fotoProducto', 1),
(33, 'A1', 'Generador de Jardineria para medir', 3, 61.31, 'fotoProducto', 1),
(34, 'U8', 'Maquina Circular para romper', 1, 81.3, 'fotoProducto', 1),
(35, 'K4', 'Aparejo Circular para reposteria', 2, 15.79, 'fotoProducto', 1),
(36, 'P7', 'Instrumento Pequeno para medir', 3, 73.46, 'fotoProducto', 1),
(37, 'T5', 'Generador Pequeno para carpinteria', 5, 94.73, 'fotoProducto', 1),
(38, 'A1', 'Herramienta Pequeno para romper', 3, 13.65, 'fotoProducto', 1),
(39, 'ASDFSADF', 'DASFASDF', 43, 398, 'HOLA', 1),
(40, 'asdf', 'asdf', 2, 3.45, 'asdf', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoproducto`
--

CREATE TABLE `tipoproducto` (
  `id` int(11) NOT NULL,
  `desc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `tipoproducto`
--

INSERT INTO `tipoproducto` (`id`, `desc`) VALUES
(1, 'verduras');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipousuario`
--

CREATE TABLE `tipousuario` (
  `id` int(11) NOT NULL,
  `desc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `tipousuario`
--

INSERT INTO `tipousuario` (`id`, `desc`) VALUES
(1, 'Administrador'),
(2, 'Cliente'),
(3, 'kailwe'),
(4, 'jefe'),
(5, 'Delicuente'),
(6, 'kailwe'),
(7, 'kailwee'),
(8, 'ASDF');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `dni` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nombre` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ape1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ape2` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `login` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pass` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_tipoUsuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `dni`, `nombre`, `ape1`, `ape2`, `login`, `pass`, `id_tipoUsuario`) VALUES
(8, '24465145T', 'Maria', 'hola', 'Fernandez', 'logfff', 'null', 1),
(9, '74194431W', 'Maria', 'Dominguez', 'Mohamed', 'hehhhh', 'null', 1),
(11, '74194431W', 'Maria', 'Garcia', 'Gonzalez', 'tupa', 'null', 5),
(12, '16812040Y', 'Maria', 'Rodriguez', 'Gonzalez', 'fdf', '3333', 1),
(13, '16812040Y', 'Juan', 'Martinez', 'Gonzalez', 'aatrfff', NULL, 1),
(14, '74194431W', 'Pedro', 'Rodriguez', 'Sanchez', 'jauan', '4444', 1),
(15, '68447883V', 'Maria', 'Martinez', 'Sanchez', 'aatr', '3333', 1),
(16, '243412121A', 'Maria', 'Martinez', 'Sanchez', 'tupa', '1111', 1),
(18, '243412121A', 'kailwe', 'Dominguez', 'Mohamed', 'jauan', '1111', 1),
(19, '68447883V', 'kailwe', 'Segundo', 'Sanchez', 'aatr', '5555', 1),
(20, '24341211A', 'Pedro', 'Martinez', 'Lopez', 'dfggasdf', 'null', 1),
(21, '68447883V', 'Pepe', 'Garcia', 'Mohamed', 'fdfrff', 'null', 1),
(22, '74194431W', 'kailwe', 'Martinez', 'Fernandez', 'fdf', '1111', 1),
(23, '16812040Y', 'Maria', 'Dominguez', 'Gonzalez', 'tuuiy', '1111', 1),
(24, '243412121A', 'Maria', 'Rodriguez', 'Lopez', 'tuuiy', '2222', 1),
(25, '16812040Y', 'Pepe', 'Martinez', 'Sanchez', 'jauan', '3333', 1),
(26, '74194431W', 'Pedro', 'Segundo', 'Sanchez', 'tupa', '2222', 1),
(27, '243412121A', 'Maria', 'Segundo', 'Gonzalez', 'tuuiy', '3333', 1),
(28, '243412121A', 'Juan', 'Martinez', 'Gonzalez', 'fdf', '4444', 1),
(29, '68447883V', 'kailwe', 'Segundo', 'Gonzalez', 'aatr', '2222', 1),
(30, '74194431W', 'kailwe', 'Segundo', 'Mohamed', 'fdf', '2222', 1),
(31, '74194431W', 'kailwe', 'Dominguez', 'Fernandez', 'fdf', '5555', 1),
(32, '68447883V', 'kailwe', 'Martinez', 'Gonzalez', 'tupa', '3333', 5),
(33, '74194431W', 'kailwe', 'Martinez', 'Sanchez', 'aatr', '4444', 5),
(34, '243412121A', 'Pepe', 'Rodriguez', 'Mohamed', 'aatr', '1111', 5),
(35, '74194431W', 'kailwe', 'Dominguez', 'Lopez', 'tuuiy', '4444', 1),
(36, '243412121A', 'Maria', 'Martinez', 'Mohamed', 'aatr', '2222', 4),
(37, '07251643L', 'Juan', 'Dominguez', 'Sanchez', 'aatr', '3333', 3),
(38, '21244444T', 'Kevin', 'Dominguez', 'kevin', 'kevin', 'B221D9DBB083A7F33428D7C2A3C3198AE925614D70210E28716CCAA7CD4DDB79', 1),
(39, '12345555T', 'FFFF', 'FFFF', 'FFF', 'FFF', '824da7fe0d3a58cecfe9fde29e6cf5bec4383460b4cb7d6e61b9889e9a781763', 1),
(40, '99999999T', 'QWERTY', 'QWERTY', 'QWERTY', 'QWERTY', '435c554a2e9cd54d2d3431b8af2b5d7ba740c64f1dca92b7af8a76b05d484ef3', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_factura_usuario1_idx` (`id_usuario`);

--
-- Indices de la tabla `linea`
--
ALTER TABLE `linea`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_linea_producto1_idx` (`id_producto`),
  ADD KEY `fk_linea_factura1_idx` (`id_factura`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_producto_tipoProducto1_idx` (`id_tipoProducto`);

--
-- Indices de la tabla `tipoproducto`
--
ALTER TABLE `tipoproducto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipousuario`
--
ALTER TABLE `tipousuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario_tipoUsuario_idx` (`id_tipoUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `linea`
--
ALTER TABLE `linea`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `tipoproducto`
--
ALTER TABLE `tipoproducto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tipousuario`
--
ALTER TABLE `tipousuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `fk_factura_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `linea`
--
ALTER TABLE `linea`
  ADD CONSTRAINT `fk_linea_factura1` FOREIGN KEY (`id_factura`) REFERENCES `factura` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_linea_producto1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fk_producto_tipoProducto1` FOREIGN KEY (`id_tipoProducto`) REFERENCES `tipoproducto` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario_tipoUsuario` FOREIGN KEY (`id_tipoUsuario`) REFERENCES `tipousuario` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
