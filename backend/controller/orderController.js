const asyncHandler = require('express-async-handler')
const Order = require('../model/orderModel')

// @desc    Get Orders
// @route   GET api/orders
// @access  private
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
  res.status(200).json(orders)
})

const getOrderByUserId = asyncHandler(async (req,res) => {
  const id = req.params.id
  const orders = await Order.find({userId: id}) 
  if (orders) {
    res.status(200).json(orders)
  } else {
    res.status(400)
    throw new Error('No Order Found')
  }
})

const createOrder = asyncHandler(async (req, res) => {
  const {
    userId,
    hotelId,
    peopleCount,
    roomCount,
    checkInDate,
    checkOutDate,
    nightCount,
    totalAmount,
    city,
    paid,
    booked,
    cancelled,
    paymentMethod
  } = req.body

  const newOrder = await Order.create({
    userId,
    hotelId,
    peopleCount,
    roomCount,
    checkInDate,
    checkOutDate,
    nightCount,
    totalAmount,
    city,
    paid,
    booked,
    cancelled,
    paymentMethod
  })
  if (newOrder) {
    res.status(200).json(newOrder)
  } else {
    res.status(400)
    throw new Error('Incorrect Data')
  }
})

const updateOrder = asyncHandler(async (req, res) => {

  const {
    userId,
    hotelId,
    peopleCount,
    roomCount,
    checkInDate,
    checkOutDate,
    nightCount,
    totalAmount,
    paymentMethod,
    paid,
  } = await Order.findById(req.body.id)

  const newUpdatedOrder = {
    userId,
    hotelId,
    peopleCount,
    roomCount,
    checkInDate,
    checkOutDate,
    nightCount,
    totalAmount,
    paymentMethod,
    paid,
    booked: req.body.booked,
    cancelled: req.body.cancelled,
  }

  const order = await Order.findById(req.body.id)
  if(!order){
    res.status(400)
    throw new Error("Order not found")
  } else{
    const updatedOrder = await Order.findByIdAndUpdate(req.body.id, newUpdatedOrder, {new:true})
    res.status(200).json(updatedOrder)
  }
})

const deleteOrder = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id)
    if(!order){
        res.status(400)
        throw new Error("Order not found")
    } else{
        const deletedOrder = await Order.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedOrder)
    }
})

module.exports = {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderByUserId
}
