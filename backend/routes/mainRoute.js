const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {updateUsers, deleteUsers, registerUser, loginUser, getMe} = require("../controller/userController")
const {getHotels, setHotels, updateHotels, deleteHotels} = require("../controller/hotelController")
const {getOrders, createOrder, updateOrder, deleteOrder} = require('../controller/orderController')
const {registerAdmin, getAdmin, loginAdmin} = require('../controller/adminController')

// User Routes
router.route('/users/:id').put(updateUsers).delete(deleteUsers)
router.post('/users/register', registerUser)
router.post('/users/login', loginUser)
router.get('/users/me', getMe)

// Hotel Routes
router.route('/hotels').get( getHotels).post(setHotels)
router.route('/hotels/:id').put(updateHotels).delete(deleteHotels)

// Order Routes
router.route('/orders').get( getOrders).post(createOrder)
router.route('/orders/:id').put(updateOrder).delete(deleteOrder)

// Admin routes
router.route('/admin/register').post(registerAdmin)
router.route('/admin/login').post(loginAdmin)
router.route('/admin').get(getAdmin)
// router.route('/admin/login').post()



module.exports = router
