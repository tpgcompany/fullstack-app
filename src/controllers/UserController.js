const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
  static registerUser = async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      username,
      password: hashedPassword
    });

    await newUser.save();

    res.json({
      message: 'Usuário registrado com sucesso!'
    });
  };

  static loginUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if(!user || !(bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: user._id, userName: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  }

  static profileUser = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Acesso negado' });
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        res.json({ message: 'Perfil do usuário', user });
    });
  }
}

module.exports = UserController;