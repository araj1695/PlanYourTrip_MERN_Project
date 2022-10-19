const asyncHandler = require('express-async-handler')
const Hotel = require('../model/hotelModel')

// @desc    Get hotels
// @route   GET api/hotels
// @access  private
const getHotels = asyncHandler(async (req, res) => {
  const hotels = await Hotel.find()
  if (hotels) {
    res.status(200).json(hotels)
  } else {
    res.status(400)
    throw new Error('Some Problem')
  }
})

// @desc    Set hotels
// @route   POST api/hotels
// @access  private
const setHotels = asyncHandler(async (req, res) => {
  const {
    title,
    subtitle,
    city,
    address,
    description,
    totalRooms,
    avalableRooms,
    photos,
    price,
    distance,
    contact,
    ratings,
    features
  } = req.body

  const newHotel = await Hotel.create({
    title,
    subtitle,
    city,
    address,
    description,
    totalRooms,
    avalableRooms,
    photos,
    price,
    distance,
    contact,
    ratings,
    features
  })

  if (newHotel) {
    res.status(200).json(newHotel)
  } else {
    res.status(400)
    throw new Error('Invalid hotel data')
  }
})

// @desc    Update hotels
// @route   PUT api/hotels
// @access  private
const updateHotels = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id)
  if(!hotel){
    res.status(400)
    throw new Error("Hotel not found")
  } else{
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(200).json(updatedHotel)
  }
})

// @desc    Delete hotels
// @route   DELETE api/hotels
// @access  private
const deleteHotels = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id)
  if(!hotel){
    res.status(400)
    throw new Error("Hotel not found")
  } else{
    const updatedHotel = await Hotel.findByIdAndDelete(req.params.id)
    res.status(200).json(updatedHotel)
  }
})

module.exports = {
  getHotels,
  setHotels,
  updateHotels,
  deleteHotels,
}
