const mongoose = require('mongoose');

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB conectado')).catch(err => console.log(err));