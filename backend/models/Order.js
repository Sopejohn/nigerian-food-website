const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  customerInfo: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  total: { type: Number, required: true },
  tip: { type: Number, default: 0 },
  status: { type: String, enum: ['pending', 'confirmed', 'preparing', 'delivered'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);