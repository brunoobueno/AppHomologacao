const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors'); // Importe o módulo CORS
const app = express();
const port = 3000;
const moment = require('moment');


// Configuração da conexão com o banco de dados
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_alquimia',
});

app.use(express.json());

// Use o middleware CORS com as opções personalizadas
app.use(cors());

// Rota de autenticação
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Consulta ao banco de dados para verificar as credenciais
    const [rows] = await db.query('SELECT * FROM usuario WHERE login_usuario = ? AND senha_usuario = ?', [email, password]);

    if (rows.length === 1) {
      // Credenciais válidas

      // Adicione o tipo do usuário à resposta
      const userType = rows[0].tipo_usuario;

      res.status(200).json({ message: 'Autenticado com sucesso', userType });
    } else {
      // Credenciais inválidas
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


// Rota para buscar todos os produtos
app.get('/produtos', async (req, res) => {
  try {
    // Consulta ao banco de dados para buscar todos os produtos
    const [rows] = await db.query('SELECT * FROM ins_insumo');
    res.status(200).json(rows); // Retorne os dados dos produtos como JSON
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para obter produtos com menos de 30 dias de vencimento
app.get('/lista-vencimento-proximo', async (req, res) => {
  try {
    // Obtém a data atual
    const currentDate = new Date();

    // Consulta ao banco de dados para obter produtos com menos de 30 dias de vencimento
    const [rows] = await db.query('SELECT * FROM ins_insumo WHERE DATEDIFF(ins_vencimento, ?) <= 30', [currentDate]);

    // Retorna a lista de produtos
    res.status(200).json({ produtosVencimentoProximo: rows });
  } catch (error) {
    console.error('Erro ao obter produtos com vencimento próximo:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


//Rota para Cadastrar Produto
app.post('/inserir-produto', async (req, res) => {
  const { nomeProduto, quantityProduct, batchNumber, ins_medida, ins_cadastro, ins_vencimento } = req.body;

  console.log('Recebendo requisição para cadastrar produto:', req.body);

  try {
    // Execute a lógica para inserir o produto no banco de dados
    const [result] = await db.query('INSERT INTO ins_insumo (ins_nome, ins_quantidade, ins_lote, ins_medida, ins_cadastro, ins_vencimento) VALUES (?, ?, ?, ?, ?, ?)', [nomeProduto, quantityProduct, batchNumber, ins_medida, ins_cadastro, ins_vencimento]);

    if (result.affectedRows === 1) {
      // Produto inserido com sucesso
      res.status(200).json({ message: 'Produto inserido com sucesso.' });
    } else {
      // Se não foi possível inserir o produto
      res.status(500).json({ message: 'Erro ao inserir produto.' });
    }
  } catch (error) {
    // Se ocorrer um erro durante a execução da operação no banco de dados
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}); 

// Rota para contar a quantidade de produtos com estoque baixo
app.get('/estoque-baixo', async (req, res) => {
  try {
    // Consulta ao banco de dados para contar produtos com estoque baixo (quantidade < 50)
    const [rows] = await db.query('SELECT COUNT(*) as quantidadeEstoqueBaixo FROM ins_insumo WHERE ins_quantidade < 50');
    const { quantidadeEstoqueBaixo } = rows[0];
    res.status(200).json({ quantidadeEstoqueBaixo });
  } catch (error) {
    console.error('Erro ao contar produtos com estoque baixo:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

//Rota para listar quais produtos estão com estoque abaixo do definido
app.get('/lista-estoque-baixo', async (req, res) => {
  try {
    // Consulta ao banco de dados para obter produtos com estoque baixo (quantidade < 50)
    const [rows] = await db.query('SELECT * FROM ins_insumo WHERE ins_quantidade < 50');
    res.status(200).json({ produtosEstoqueBaixo: rows });
  } catch (error) {
    console.error('Erro ao obter produtos com estoque baixo:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


// Rota para contar itens com menos de 30 dias de vencimento
app.get('/vencimento-proximo', async (req, res) => {
  try {
    // Obtém a data atual
    const currentDate = new Date();

    // Consulta ao banco de dados para contar itens com menos de 30 dias de vencimento
    const [rows] = await db.query('SELECT COUNT(*) as quantidadeVencimentoProximo FROM ins_insumo WHERE DATEDIFF(ins_vencimento, ?) <= 30', [currentDate]);

    const { quantidadeVencimentoProximo } = rows[0];
    res.status(200).json({ quantidadeVencimentoProximo });
  } catch (error) {
    console.error('Erro ao contar itens com vencimento próximo:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});



// Rota para contar produtos com lacunas não preenchidas
app.get('/produtos-com-lacunas', async (req, res) => {
  try {
    // Consulta ao banco de dados para contar produtos com lacunas não preenchidas
    const [rows] = await db.query('SELECT COUNT(*) as quantidadeProdutosComLacunas FROM ins_insumo WHERE ins_id IS NULL OR ins_nome IS NULL OR ins_quantidade IS NULL OR ins_medida IS NULL OR ins_lote IS NULL OR ins_preco IS NULL');

    const { quantidadeProdutosComLacunas } = rows[0];
    res.status(200).json({ quantidadeProdutosComLacunas });
  } catch (error) {
    console.error('Erro ao contar produtos com lacunas não preenchidas:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para obter produtos com lacunas não preenchidas
app.get('/lista-produtos-com-lacunas', async (req, res) => {
  try {
    // Consulta ao banco de dados para obter produtos com lacunas não preenchidas
    const [rows] = await db.query('SELECT * FROM ins_insumo WHERE ins_id IS NULL OR ins_nome IS NULL OR ins_quantidade IS NULL OR ins_medida IS NULL OR ins_lote IS NULL OR ins_preco IS NULL');

    res.status(200).json({ produtosComLacunas: rows });
  } catch (error) {
    console.error('Erro ao obter produtos com lacunas não preenchidas:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para atualizar um produto
app.put('/atualizar-produto/:id', async (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body; // As informações atualizadas do produto

  try {
    const [result] = await db.query('UPDATE ins_insumo SET ins_nome = ?, ins_quantidade = ?, ins_medida = ? WHERE ins_id = ?', [
      updatedProduct.ins_nome,
      updatedProduct.ins_quantidade,
      updatedProduct.ins_medida,
      productId,
    ]);

    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'Produto atualizado com sucesso.' });
    } else {
      res.status(404).json({ message: 'Produto não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao atualizar o produto:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// Rota para excluir um produto
app.delete('/excluir-produto/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const [result] = await db.query('DELETE FROM ins_insumo WHERE ins_id = ?', [productId]);

    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'Produto excluído com sucesso.' });
    } else {
      res.status(404).json({ message: 'Produto não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao excluir o produto:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});




app.listen(port, () => {
  console.log(`Servidor API rodando na porta ${port}`);
});
