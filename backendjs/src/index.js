require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); 

const routes = require('./routes'); 

// rotas basicas para teste
app.get('/', (req, res) => {
    res.json({ message: 'API Node.js dos Pacientes rodando!' });
});


app.use('/api/v1', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
