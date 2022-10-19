const asyncHandler = require('express-async-handler')
const Order = require('../model/orderModel')

// @desc    Get Orders
// @route   GET api/orders
// @access  private
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
  res.status(200).json(orders)
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
    paid,
  } = await Order.findById(req.params.id)

  const newUpdatedOrder = {
    userId,
    hotelId,
    peopleCount,
    roomCount,
    checkInDate,
    checkOutDate,
    nightCount,
    totalAmount,
    paid,
    booked: req.body.booked,
    cancelled: req.body.cancelled,
  }

  const order = await Order.findById(req.params.id)
  if(!order){
    res.status(400)
    throw new Error("Order not found")
  } else{
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, newUpdatedOrder, {new:true})
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
  deleteOrder
}
