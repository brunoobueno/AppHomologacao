-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 20/11/2023 às 07:19
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db_alquimia`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `actor`
--

CREATE TABLE `actor` (
  `actor_id` smallint(5) UNSIGNED NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `actor_info`
--

CREATE TABLE `actor_info` (
  `actor_id` int(11) DEFAULT NULL,
  `first_name` int(11) DEFAULT NULL,
  `last_name` int(11) DEFAULT NULL,
  `film_info` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `address`
--

CREATE TABLE `address` (
  `address_id` smallint(5) UNSIGNED NOT NULL,
  `address` varchar(50) NOT NULL,
  `address2` varchar(50) DEFAULT NULL,
  `district` varchar(20) NOT NULL,
  `city_id` smallint(5) UNSIGNED NOT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `category`
--

CREATE TABLE `category` (
  `category_id` tinyint(3) UNSIGNED NOT NULL,
  `name` varchar(25) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `city`
--

CREATE TABLE `city` (
  `city_id` smallint(5) UNSIGNED NOT NULL,
  `city` varchar(50) NOT NULL,
  `country_id` smallint(5) UNSIGNED NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `com_compra`
--

CREATE TABLE `com_compra` (
  `com_id` int(11) NOT NULL,
  `data_compra` date DEFAULT NULL,
  `for_fornecedor_for_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `country`
--

CREATE TABLE `country` (
  `country_id` smallint(5) UNSIGNED NOT NULL,
  `country` varchar(50) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `customer`
--

CREATE TABLE `customer` (
  `customer_id` smallint(5) UNSIGNED NOT NULL,
  `store_id` tinyint(3) UNSIGNED NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `address_id` smallint(5) UNSIGNED NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `create_date` datetime NOT NULL,
  `last_update` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='Table storing all customers. Holds foreign keys to the address table and the store table where this customer is registered.\n\nBasic information about the customer like first and last name are stored in the table itself. Same for the date the record was created and when the information was last updated.';

-- --------------------------------------------------------

--
-- Estrutura para tabela `customer_list`
--

CREATE TABLE `customer_list` (
  `ID` int(11) DEFAULT NULL,
  `name` int(11) DEFAULT NULL,
  `address` int(11) DEFAULT NULL,
  `zip code` int(11) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `city` int(11) DEFAULT NULL,
  `country` int(11) DEFAULT NULL,
  `notes` int(11) DEFAULT NULL,
  `SID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `film`
--

CREATE TABLE `film` (
  `film_id` smallint(5) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `release_year` year(4) DEFAULT NULL,
  `language_id` tinyint(3) UNSIGNED NOT NULL,
  `original_language_id` tinyint(3) UNSIGNED DEFAULT NULL,
  `rental_duration` tinyint(3) UNSIGNED NOT NULL DEFAULT 3,
  `rental_rate` decimal(4,2) NOT NULL DEFAULT 4.99,
  `length` smallint(5) UNSIGNED DEFAULT NULL,
  `replacement_cost` decimal(5,2) NOT NULL DEFAULT 19.99,
  `rating` enum('G','PG','PG-13','R','NC-17') DEFAULT 'G',
  `special_features` set('Trailers','Commentaries','Deleted Scenes','Behind the Scenes') DEFAULT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `film_actor`
--

CREATE TABLE `film_actor` (
  `actor_id` smallint(5) UNSIGNED NOT NULL,
  `film_id` smallint(5) UNSIGNED NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `film_category`
--

CREATE TABLE `film_category` (
  `film_id` smallint(5) UNSIGNED NOT NULL,
  `category_id` tinyint(3) UNSIGNED NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `film_list`
--

CREATE TABLE `film_list` (
  `FID` int(11) DEFAULT NULL,
  `title` int(11) DEFAULT NULL,
  `description` int(11) DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `length` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `actors` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `film_text`
--

CREATE TABLE `film_text` (
  `film_id` smallint(5) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `fin_fornecedor_insumo`
--

CREATE TABLE `fin_fornecedor_insumo` (
  `ins_id` int(11) NOT NULL,
  `id_fornecedor` int(11) NOT NULL,
  `fin_id` int(11) NOT NULL,
  `com_compra_com_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `for_fornecedor`
--

CREATE TABLE `for_fornecedor` (
  `for_id` int(11) NOT NULL,
  `for_nome` varchar(45) DEFAULT NULL,
  `for_email` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `insumo_receita`
--

CREATE TABLE `insumo_receita` (
  `idInsumo_receita` int(11) NOT NULL,
  `insumo_id` int(11) DEFAULT NULL,
  `receita_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `ins_insumo`
--

CREATE TABLE `ins_insumo` (
  `ins_id` int(11) NOT NULL,
  `ins_nome` varchar(45) NOT NULL,
  `ins_quantidade` int(11) NOT NULL,
  `ins_medida` varchar(45) NOT NULL,
  `ins_cadastro` datetime NOT NULL,
  `ins_vencimento` datetime DEFAULT NULL,
  `ins_lote` varchar(45) NOT NULL,
  `ins_preco` varchar(45) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `ins_insumo`
--

INSERT INTO `ins_insumo` (`ins_id`, `ins_nome`, `ins_quantidade`, `ins_medida`, `ins_cadastro`, `ins_vencimento`, `ins_lote`, `ins_preco`, `usuario_id`) VALUES
(3, 'OLEO MINERAL', 3, 'LT', '2023-10-29 00:00:00', '2023-12-14 00:00:00', '29102023-2', '12,00', 0),
(4, 'ESSENCIA HIDROSSOLUVEL DE UVA', 90, 'LT', '2023-11-07 00:00:00', '2024-01-01 00:00:00', '29102023-4', '12,00', 0),
(6, 'ESSENCIA HIDROSSOLUVEL DE PESSÊGO', 34, 'LT', '2023-11-17 00:00:00', '2024-01-01 00:00:00', '29102023-822', NULL, 0),
(15, 'OLEO MINERAL 65', 3, 'LT', '2023-10-29 00:00:00', '2024-01-01 00:00:00', '29102023-2', '12,00', 0),
(20, 'SODA CAUSTICA 3345', 40, 'LT', '2023-10-29 00:00:00', '2024-01-01 00:00:00', '29102023-1', '11,00', 0),
(21, 'OLEO MINERAL  43421', 3, 'LT', '2023-10-29 00:00:00', '2024-01-01 00:00:00', '29102023-2', '12,00', 0),
(22, 'ESSENCIA HIDROSSOLUVEL DE UVA 5235', 90, 'LT', '2023-11-07 00:00:00', '2024-01-01 00:00:00', '29102023-4', '12,00', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `inventory`
--

CREATE TABLE `inventory` (
  `inventory_id` mediumint(8) UNSIGNED NOT NULL,
  `film_id` smallint(5) UNSIGNED NOT NULL,
  `store_id` tinyint(3) UNSIGNED NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `language`
--

CREATE TABLE `language` (
  `language_id` tinyint(3) UNSIGNED NOT NULL,
  `name` char(20) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `nicer_but_slower_film_list`
--

CREATE TABLE `nicer_but_slower_film_list` (
  `FID` int(11) DEFAULT NULL,
  `title` int(11) DEFAULT NULL,
  `description` int(11) DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `length` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `actors` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `ordem_serviço`
--

CREATE TABLE `ordem_serviço` (
  `id_ordem_serviço` int(11) NOT NULL,
  `solicitante` varchar(45) DEFAULT NULL,
  `data_solicitacao` date DEFAULT NULL,
  `solicitante_solicitante_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `payment`
--

CREATE TABLE `payment` (
  `payment_id` smallint(5) UNSIGNED NOT NULL,
  `customer_id` smallint(5) UNSIGNED NOT NULL,
  `staff_id` tinyint(3) UNSIGNED NOT NULL,
  `rental_id` int(11) DEFAULT NULL,
  `amount` decimal(5,2) NOT NULL,
  `payment_date` datetime NOT NULL,
  `last_update` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos_solitados`
--

CREATE TABLE `produtos_solitados` (
  `Ordem_serviço_id_ordem_serviço` int(11) NOT NULL,
  `Produto_final_idProduto_final` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto_final`
--

CREATE TABLE `produto_final` (
  `idProduto_final` int(11) NOT NULL,
  `nome_produto` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `produto_final`
--

INSERT INTO `produto_final` (`idProduto_final`, `nome_produto`) VALUES
(0, 'BRUNO BUENO SAFADO'),
(1, 'Produto Teste 1'),
(2, 'Produto Teste 2'),
(3, 'produto agora'),
(4, 'safadinho 123 safadão'),
(7, 'maae');

-- --------------------------------------------------------

--
-- Estrutura para tabela `quimico_responsavel`
--

CREATE TABLE `quimico_responsavel` (
  `idQuimico_responsavel` int(11) NOT NULL,
  `crq_quimico_responsavel` varchar(45) DEFAULT NULL,
  `data_admissao` date DEFAULT NULL,
  `data_vigencia` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `receita`
--

CREATE TABLE `receita` (
  `idReceita` int(11) NOT NULL,
  `nome_receita` varchar(45) DEFAULT NULL,
  `descricao_receita` varchar(45) DEFAULT NULL,
  `quiemico_responsavel_id` int(11) DEFAULT NULL,
  `Produto_final_idProduto_final` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `rental`
--

CREATE TABLE `rental` (
  `rental_id` int(11) NOT NULL,
  `rental_date` datetime NOT NULL,
  `inventory_id` mediumint(8) UNSIGNED NOT NULL,
  `customer_id` smallint(5) UNSIGNED NOT NULL,
  `return_date` datetime DEFAULT NULL,
  `staff_id` tinyint(3) UNSIGNED NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `sales_by_film_category`
--

CREATE TABLE `sales_by_film_category` (
  `category` int(11) DEFAULT NULL,
  `total_sales` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `sales_by_store`
--

CREATE TABLE `sales_by_store` (
  `store` int(11) DEFAULT NULL,
  `manager` int(11) DEFAULT NULL,
  `total_sales` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `solicitante`
--

CREATE TABLE `solicitante` (
  `solicitante_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `staff`
--

CREATE TABLE `staff` (
  `staff_id` tinyint(3) UNSIGNED NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `address_id` smallint(5) UNSIGNED NOT NULL,
  `picture` blob DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `store_id` tinyint(3) UNSIGNED NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `username` varchar(16) NOT NULL,
  `password` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `staff_list`
--

CREATE TABLE `staff_list` (
  `ID` int(11) DEFAULT NULL,
  `name` int(11) DEFAULT NULL,
  `address` int(11) DEFAULT NULL,
  `zip code` int(11) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `city` int(11) DEFAULT NULL,
  `country` int(11) DEFAULT NULL,
  `SID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `store`
--

CREATE TABLE `store` (
  `store_id` tinyint(3) UNSIGNED NOT NULL,
  `manager_staff_id` tinyint(3) UNSIGNED NOT NULL,
  `address_id` smallint(5) UNSIGNED NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `login_usuario` varchar(45) DEFAULT NULL,
  `senha_usuario` varchar(45) DEFAULT NULL,
  `tipo_usuario` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `login_usuario`, `senha_usuario`, `tipo_usuario`) VALUES
(0, 'adm@teste.com', 'teste123', 'ADM'),
(1, 'ope@teste.com', 'teste123', 'OPE');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `actor`
--
ALTER TABLE `actor`
  ADD PRIMARY KEY (`actor_id`),
  ADD KEY `idx_actor_last_name` (`last_name`);

--
-- Índices de tabela `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `idx_fk_city_id` (`city_id`);

--
-- Índices de tabela `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Índices de tabela `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`city_id`),
  ADD KEY `idx_fk_country_id` (`country_id`);

--
-- Índices de tabela `com_compra`
--
ALTER TABLE `com_compra`
  ADD PRIMARY KEY (`com_id`),
  ADD KEY `fk_com_compra_for_fornecedor1_idx` (`for_fornecedor_for_id`);

--
-- Índices de tabela `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`country_id`);

--
-- Índices de tabela `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`),
  ADD KEY `idx_fk_store_id` (`store_id`),
  ADD KEY `idx_fk_address_id` (`address_id`),
  ADD KEY `idx_last_name` (`last_name`);

--
-- Índices de tabela `film`
--
ALTER TABLE `film`
  ADD PRIMARY KEY (`film_id`),
  ADD KEY `idx_title` (`title`),
  ADD KEY `idx_fk_language_id` (`language_id`),
  ADD KEY `idx_fk_original_language_id` (`original_language_id`);

--
-- Índices de tabela `film_actor`
--
ALTER TABLE `film_actor`
  ADD PRIMARY KEY (`actor_id`,`film_id`),
  ADD KEY `idx_fk_film_id` (`film_id`),
  ADD KEY `fk_film_actor_actor_idx` (`actor_id`);

--
-- Índices de tabela `film_category`
--
ALTER TABLE `film_category`
  ADD PRIMARY KEY (`film_id`,`category_id`),
  ADD KEY `fk_film_category_category_idx` (`category_id`),
  ADD KEY `fk_film_category_film_idx` (`film_id`);

--
-- Índices de tabela `film_text`
--
ALTER TABLE `film_text`
  ADD PRIMARY KEY (`film_id`);
ALTER TABLE `film_text` ADD FULLTEXT KEY `idx_title_description` (`title`,`description`);

--
-- Índices de tabela `fin_fornecedor_insumo`
--
ALTER TABLE `fin_fornecedor_insumo`
  ADD PRIMARY KEY (`fin_id`),
  ADD KEY `fk_ins_Insumo_has_Fornecedor_Fornecedor1_idx` (`id_fornecedor`),
  ADD KEY `fk_ins_Insumo_has_Fornecedor_ins_Insumo1_idx` (`ins_id`),
  ADD KEY `fk_fin_fornecedor_insumo_com_compra1_idx` (`com_compra_com_id`);

--
-- Índices de tabela `for_fornecedor`
--
ALTER TABLE `for_fornecedor`
  ADD PRIMARY KEY (`for_id`);

--
-- Índices de tabela `insumo_receita`
--
ALTER TABLE `insumo_receita`
  ADD PRIMARY KEY (`idInsumo_receita`),
  ADD KEY `fk_insumo_receita_insuo_id_idx` (`insumo_id`),
  ADD KEY `fk_insumo_receita_receita_id_idx` (`receita_id`);

--
-- Índices de tabela `ins_insumo`
--
ALTER TABLE `ins_insumo`
  ADD PRIMARY KEY (`ins_id`),
  ADD KEY `id_ussuario_cadastro_idx` (`usuario_id`);

--
-- Índices de tabela `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventory_id`),
  ADD KEY `idx_fk_film_id` (`film_id`),
  ADD KEY `idx_store_id_film_id` (`store_id`,`film_id`),
  ADD KEY `fk_inventory_store_idx` (`store_id`);

--
-- Índices de tabela `language`
--
ALTER TABLE `language`
  ADD PRIMARY KEY (`language_id`);

--
-- Índices de tabela `ordem_serviço`
--
ALTER TABLE `ordem_serviço`
  ADD PRIMARY KEY (`id_ordem_serviço`),
  ADD KEY `fk_Ordem_serviço_solicitante1_idx` (`solicitante_solicitante_id`);

--
-- Índices de tabela `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `idx_fk_staff_id` (`staff_id`),
  ADD KEY `idx_fk_customer_id` (`customer_id`),
  ADD KEY `fk_payment_rental_idx` (`rental_id`);

--
-- Índices de tabela `produtos_solitados`
--
ALTER TABLE `produtos_solitados`
  ADD PRIMARY KEY (`Ordem_serviço_id_ordem_serviço`,`Produto_final_idProduto_final`),
  ADD KEY `fk_Ordem_serviço_has_Produto_final_Produto_final1_idx` (`Produto_final_idProduto_final`),
  ADD KEY `fk_Ordem_serviço_has_Produto_final_Ordem_serviço1_idx` (`Ordem_serviço_id_ordem_serviço`);

--
-- Índices de tabela `produto_final`
--
ALTER TABLE `produto_final`
  ADD PRIMARY KEY (`idProduto_final`);

--
-- Índices de tabela `quimico_responsavel`
--
ALTER TABLE `quimico_responsavel`
  ADD PRIMARY KEY (`idQuimico_responsavel`);

--
-- Índices de tabela `receita`
--
ALTER TABLE `receita`
  ADD PRIMARY KEY (`idReceita`),
  ADD KEY `fk_receita_quimico_responsavel_id_idx` (`quiemico_responsavel_id`),
  ADD KEY `fk_Receita_Produto_final1_idx` (`Produto_final_idProduto_final`);

--
-- Índices de tabela `rental`
--
ALTER TABLE `rental`
  ADD PRIMARY KEY (`rental_id`),
  ADD UNIQUE KEY `idx_rental` (`rental_date`,`inventory_id`,`customer_id`),
  ADD KEY `idx_fk_inventory_id` (`inventory_id`),
  ADD KEY `idx_fk_customer_id` (`customer_id`),
  ADD KEY `idx_fk_staff_id` (`staff_id`);

--
-- Índices de tabela `solicitante`
--
ALTER TABLE `solicitante`
  ADD PRIMARY KEY (`solicitante_id`);

--
-- Índices de tabela `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`),
  ADD KEY `idx_fk_store_id` (`store_id`),
  ADD KEY `idx_fk_address_id` (`address_id`);

--
-- Índices de tabela `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`store_id`),
  ADD UNIQUE KEY `idx_unique_manager` (`manager_staff_id`),
  ADD KEY `idx_fk_address_id` (`address_id`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `actor`
--
ALTER TABLE `actor`
  MODIFY `actor_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `address`
--
ALTER TABLE `address`
  MODIFY `address_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `category`
--
ALTER TABLE `category`
  MODIFY `category_id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `city`
--
ALTER TABLE `city`
  MODIFY `city_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `country`
--
ALTER TABLE `country`
  MODIFY `country_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `film`
--
ALTER TABLE `film`
  MODIFY `film_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `fin_fornecedor_insumo`
--
ALTER TABLE `fin_fornecedor_insumo`
  MODIFY `fin_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `for_fornecedor`
--
ALTER TABLE `for_fornecedor`
  MODIFY `for_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `ins_insumo`
--
ALTER TABLE `ins_insumo`
  MODIFY `ins_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de tabela `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inventory_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `language`
--
ALTER TABLE `language`
  MODIFY `language_id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `rental`
--
ALTER TABLE `rental`
  MODIFY `rental_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `staff`
--
ALTER TABLE `staff`
  MODIFY `staff_id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `store`
--
ALTER TABLE `store`
  MODIFY `store_id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `fk_address_city` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `city`
--
ALTER TABLE `city`
  ADD CONSTRAINT `fk_city_country` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `com_compra`
--
ALTER TABLE `com_compra`
  ADD CONSTRAINT `fk_com_compra_for_fornecedor1` FOREIGN KEY (`for_fornecedor_for_id`) REFERENCES `for_fornecedor` (`for_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `fk_customer_address` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_customer_store` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `film`
--
ALTER TABLE `film`
  ADD CONSTRAINT `fk_film_language` FOREIGN KEY (`language_id`) REFERENCES `language` (`language_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_film_language_original` FOREIGN KEY (`original_language_id`) REFERENCES `language` (`language_id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `film_actor`
--
ALTER TABLE `film_actor`
  ADD CONSTRAINT `fk_film_actor_actor` FOREIGN KEY (`actor_id`) REFERENCES `actor` (`actor_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_film_actor_film` FOREIGN KEY (`film_id`) REFERENCES `film` (`film_id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `film_category`
--
ALTER TABLE `film_category`
  ADD CONSTRAINT `fk_film_category_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_film_category_film` FOREIGN KEY (`film_id`) REFERENCES `film` (`film_id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `fin_fornecedor_insumo`
--
ALTER TABLE `fin_fornecedor_insumo`
  ADD CONSTRAINT `fk_fin_fornecedor_insumo_com_compra1` FOREIGN KEY (`com_compra_com_id`) REFERENCES `com_compra` (`com_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ins_Insumo_has_Fornecedor_Fornecedor1` FOREIGN KEY (`id_fornecedor`) REFERENCES `for_fornecedor` (`for_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ins_Insumo_has_Fornecedor_ins_Insumo1` FOREIGN KEY (`ins_id`) REFERENCES `ins_insumo` (`ins_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `insumo_receita`
--
ALTER TABLE `insumo_receita`
  ADD CONSTRAINT `fk_insumo_receita_insuo_id` FOREIGN KEY (`insumo_id`) REFERENCES `ins_insumo` (`ins_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_insumo_receita_receita_id` FOREIGN KEY (`receita_id`) REFERENCES `receita` (`idReceita`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `ins_insumo`
--
ALTER TABLE `ins_insumo`
  ADD CONSTRAINT `fk_insumo_usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`) ON UPDATE NO ACTION;

--
-- Restrições para tabelas `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `fk_inventory_film` FOREIGN KEY (`film_id`) REFERENCES `film` (`film_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_inventory_store` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `ordem_serviço`
--
ALTER TABLE `ordem_serviço`
  ADD CONSTRAINT `fk_Ordem_serviço_solicitante1` FOREIGN KEY (`solicitante_solicitante_id`) REFERENCES `solicitante` (`solicitante_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `fk_payment_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_payment_rental` FOREIGN KEY (`rental_id`) REFERENCES `rental` (`rental_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_payment_staff` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `produtos_solitados`
--
ALTER TABLE `produtos_solitados`
  ADD CONSTRAINT `fk_Ordem_serviço_has_Produto_final_Ordem_serviço1` FOREIGN KEY (`Ordem_serviço_id_ordem_serviço`) REFERENCES `ordem_serviço` (`id_ordem_serviço`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Ordem_serviço_has_Produto_final_Produto_final1` FOREIGN KEY (`Produto_final_idProduto_final`) REFERENCES `produto_final` (`idProduto_final`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `receita`
--
ALTER TABLE `receita`
  ADD CONSTRAINT `fk_Receita_Produto_final1` FOREIGN KEY (`Produto_final_idProduto_final`) REFERENCES `produto_final` (`idProduto_final`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_receita_quimico_responsavel_id` FOREIGN KEY (`quiemico_responsavel_id`) REFERENCES `quimico_responsavel` (`idQuimico_responsavel`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `rental`
--
ALTER TABLE `rental`
  ADD CONSTRAINT `fk_rental_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rental_inventory` FOREIGN KEY (`inventory_id`) REFERENCES `inventory` (`inventory_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rental_staff` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `fk_staff_address` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_staff_store` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `store`
--
ALTER TABLE `store`
  ADD CONSTRAINT `fk_store_address` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_store_staff` FOREIGN KEY (`manager_staff_id`) REFERENCES `staff` (`staff_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
