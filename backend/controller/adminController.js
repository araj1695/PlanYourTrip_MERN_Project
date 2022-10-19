const asyncHandler = require('express-async-handler')
const Admin = require('../model/adminModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


// @desc    Register Admin
// @route   POST api/admin/register
// @access  public
const registerAdmin = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please add all the fields')
    }

    // Check if user exists
    const adminExists = await Admin.findOne({email})
    if(adminExists){
        res.status(400)
        throw new Error('User already registered')
    } 

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword
    })
    if(admin){
        res.status(201).json({
            _id: admin.id,
            email: admin.email,
            name: admin.name,
            token: generateToken(admin._id) 
        })
    } else{
        res.status(400)
        throw new Error('Invalid user data')
    }
  })


// @desc    Login Admin
// @route   POST api/admin/login
// @access  public
const loginAdmin = asyncHandler(async (req,res) => {
    const {email, password} = req.body

    const admin = await Admin.findOne({email})
    if(!admin){
        res.status(400)
        throw new Error("Invalid credentials")
    }
    if(admin && (await bcrypt.compare(password, admin.password))){
        res.status(201).json({
            _id: admin.id,
            email: admin.email,
            name: admin.name,
            token: generateToken(admin._id) 
        })
    } else{
        res.status(400)
        throw new Error('Wrong password')
    }
})





// @desc    Get Admins
// @route   GET api/admin
// @access  private
const getAdmin = asyncHandler(async (req, res) => {
    const admin = await Admin.find()
    res.status(200).json(admin)
  })


  // Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}



  module.exports = {
    registerAdmin,
    getAdmin,
    loginAdmin,
  }