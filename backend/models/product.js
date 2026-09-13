const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  image: { type: String, required: true },
  heading: { type: String, required: true },
  description: { type: String, required: true, trim: true },
  availablesizes: { type: String, required: true }, // or change to [String] as needed
  flashpoint: { type: String, required: true },
  viscosityindex: { type: String, required: true },

  keyfeatures: {
    
    type: [String],
    required: true,
    validate: {
      validator: (arr) => arr.length > 0,
      message: 'Key features must have at least one item',
    }
  },
  applications: {
    type: [String],
    required: true,
    validate: {
      validator: (arr) => arr.length > 0,
      message: 'Applications must have at least one item',
    }
  },
  certifications: {
    type: [String],
    required: true,
    validate: {
      validator: (arr) => arr.length > 0,
      message: 'Certifications must have at least one item',
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
