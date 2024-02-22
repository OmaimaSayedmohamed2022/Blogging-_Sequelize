const User = require("../models/userModel")
const jwt = require('jsonwebtoken')
const {validateEmail,validatePassword,validateString}= require("../config/validation")
const bcrypt = require('bcrypt')
const Post = require("../models/postModel")


const createNewUser = async (req, res) => {
  try {
      const { userName, email, password, roles } = req.body;

      // Validate email, password, and username
      if (!validateEmail(email)) 
          return res.status(400).json({ status: 0, message: 'Email is INVALID' });
      if (!validatePassword(password)) 
          return res.status(400).json({ status: 0, message: 'Invalid password' });
      if (!validateString(userName)) 
          return res.status(400).json({ status: 0, message: 'Invalid username' });

      // Hash the password
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Create the user without updatedAt
      const newUser = await User.create({ userName, email, password: hashedPassword, roles }, { timestamps: false });

      if (roles && roles.length > 0) {
          newUser.roles = roles;
      }
      res.status(201).json({ status: 1, success: 'User created successfully' });
  } catch (error) {
      if (error.name === 'SequelizeValidationError') {
          const errorMessages = error.errors.map(err => err.message);
          return res.status(400).json({ status: 0, message: 'Validation error', errors: errorMessages });
      }

      console.error('Error registering user:', error);
      res.status(500).json({ status: 0, message: 'Error registering user', error: error.message });
  }
};

    const updateUser = async (req, res) => {
      try {
          const { id, userName,email, roles, password } = req.body;
  
          if (!validateEmail(email)) 
          return res.status(400).json({ status: 0, message: 'Email is INVALID' });
      if (!validatePassword(password)) 
          return res.status(400).json({ status: 0, message: 'Invalid password' });
      if (!validateString(userName)) 
          return res.status(400).json({ status: 0, message: 'Invalid username' });
          const user = await User.findByPk(id);
          if (!user) {
              return res.status(400).json({ message: 'user not found' });
          }

          const duplicate = await User.findOne({ where: { userName } });
          if (duplicate && duplicate.id !== id) {
              return res.status(409).json({ message: 'Duplicate username' });
          }
          user.userName = userName;
          user.roles = roles;

          if (password) {
              const hashedPassword = bcrypt.hashSync(password, 10);
              user.password = hashedPassword;
          }
  
          await user.save();
  
          res.json({ message: `${user.userName} updated` });
      } catch (error) {
          console.error('Error updating user:', error);
          res.status(500).json({ message: 'Error updating user' });
      }
  };

const deleteUser = async(req , res )=>{
try{
const {id} = req.body
if (!id){
  return res.status(400).json({message:'user id required'})
}
const deletedUser = await User.destroy({
  where: { id }
});
if (!deletedUser){
  return res.status(400).json({message:"user not found"})
}
res.status(200).json({message:`user with id : ${id} deleted successfully`})
} 
catch (error) {
  console.error('Error deleting user:', error);
  res.status(500).json({ status : 0 , message: 'Error deleting user' });
}};

const getAllUsers = async (req, res) => {
  try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] } 
    });
      res.json(users);
  } catch (error) {
      console.error('Error getting all users:', error);
      res.status(500).json({ message: 'Error getting all users' });
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
   
      if (!validateEmail(email)) 
      return res.status(400).json({ status: 0, message: 'Email is INVALID' });
  if (!validatePassword(password)) 
      return res.status(400).json({ status: 0, message: 'Invalid password' });

      const user = await User.findOne({ where: { email } });

      if (!user || !bcrypt.compareSync(password, user.password)) {
          return res.status(401).json({ status: 0, message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.KEY_TOKEN);

      
      if (!user.tokens) {
          user.tokens = [];
      }

      if (user.tokens.length >= process.env.COUNT_TOKEN) {
          return res.status(500).json({ status: 0, message: `You do not have the authority to own more than ${process.env.COUNT_TOKEN} devices` });
      }
      user.tokens.push(token);
      await user.save();

      return res.status(201).json({ status: 1, success: 'Logged Successfully', token });
  } catch (error) {
      res.status(500).json({ status: 0, message: 'Error logging in', error: error.message });
  }
}

module.exports={
  createNewUser,
  updateUser,
  deleteUser,
  getAllUsers,
  loginUser,


  }