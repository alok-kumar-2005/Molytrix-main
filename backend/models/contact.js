const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }, 
  company: { type: String, required: true },
  phone: { type: String, required: true }, 
  inquiryType: {
    type: String,
    enum: [
      'General Inquiry',
      'Request Quote',
      'Technical Support',
      'Partnership Opportunity',
      'Complaint/Issue'
    ],
    required: true
  },
  subject: { type: String, required: true },
  message: { type: String, required: true, trim: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', ContactSchema);
