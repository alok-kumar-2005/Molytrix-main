const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const nodemailer = require('nodemailer'); 

const ADMIN_EMAIL = "molytrixpetrochem25@gmail.com"


const User = require('./models/user'); 
const Contact = require('./models/contact');
const Product = require('./models/product');
const Distributors=require('./models/distributors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Setup Multer for image upload (diskStorage)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});
const upload = multer({ storage });

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "User not found" });
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ Serve static files from /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Register Route
// ✅ Fixed Register Route - Now generates token
app.post('/api/auth/register', async (req, res) => {
  const { name, email, company, phone, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, company, phone, password: hashedPassword });
    await newUser.save();

    // ✅ Generate JWT token for the newly registered user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // ✅ Return token and user data (similar to login response)
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        company: newUser.company,
        phone: newUser.phone,
        createdAt: newUser.createdAt,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/auth/Distributor',protect,async(req,res)=>{
  const {country,company,address,phone}=req.body;
  try{
    const distributors=await Distributors.create({
      country,
      company,
      address,
      phone,
    });
    res.status(201).json({ message: 'Distributor added successfully',distributors });
  }catch(err){
    console.error(err);
    res.status(500).json({ message: err.message });
  }
})



// ✅ Login Route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        company: user.company,
        phone: user.phone,
        createdAt: user.createdAt,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Contact Route
// ✅ Add this to the top

app.post('/api/auth/contact', async (req, res) => {
  const { name, email, company, phone, inquiryType, subject, message } = req.body;

  try {
    // ✅ Save contact to DB
    const contact = await Contact.create({
      name,
      email,
      company,
      phone,
      inquiryType,
      subject,
      message,
    });

    // ✅ Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or use host/port if using another provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Define email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // or your desired receiver
      subject: `📨 New Inquiry from ${name} - ${inquiryType}`,
      html: `
        <h3>New Contact Inquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    };

    // ✅ Send the email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Contact saved and email sent successfully", contact });
  } catch (err) {
    console.error("Error processing contact:", err);
    res.status(500).json({ error: "Failed to send message or save contact" });
  }
});


// ✅ Auth middleware to protect routes



app.post('/api/products', protect, upload.single('image'), async (req, res) => {
  try {
    if (req.user.email !== ADMIN_EMAIL) {
      return res.status(403).json({ message: 'Access denied: Not an admin' });
    }

    const {
      heading,
      description,
      availablesizes,
      flashpoint,
      viscosityindex,
      keyfeatures,
      applications,
      certifications
    } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const product = await Product.create({
      image,
      heading,
      description,
      availablesizes,
      flashpoint,
      viscosityindex,
      keyfeatures: JSON.parse(keyfeatures),
      applications: JSON.parse(applications),
      certifications: JSON.parse(certifications)
    });

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    console.error('Product creation error:', err);
    res.status(500).json({ error: 'Product creation failed' });
  }
});

// DELETE route for distributors (add this to your backend)
app.delete('/api/auth/Distributor/:id', protect, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.email !== ADMIN_EMAIL) {
      return res.status(403).json({ message: 'Access denied: Not an admin' });
    }

    const { id } = req.params;
    console.log('Attempting to delete distributor with ID:', id);
    
    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid distributor ID format' });
    }
    
    // Find and delete the distributor
    const deletedDistributor = await Distributors.findByIdAndDelete(id);
    
    if (!deletedDistributor) {
      return res.status(404).json({ message: 'Distributor not found' });
    }

    console.log('Distributor deleted successfully:', deletedDistributor);
    res.status(200).json({ 
      message: 'Distributor deleted successfully', 
      deletedDistributor 
    });
  } catch (err) {
    console.error('Error deleting distributor:', err);
    res.status(500).json({ message: 'Failed to delete distributor', error: err.message });
  }
});

// Add this DELETE route for products in your backend (server.js)
app.delete('/api/products/:id', protect, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.email !== ADMIN_EMAIL) {
      return res.status(403).json({ message: 'Access denied: Not an admin' });
    }

    const { id } = req.params;
    console.log('Attempting to delete product with ID:', id);
    
    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }
    
    // Find and delete the product
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    console.log('Product deleted successfully:', deletedProduct);
    res.status(200).json({ 
      message: 'Product deleted successfully', 
      deletedProduct 
    });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Failed to delete product', error: err.message });
  }
});


app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({ products });
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});
app.get('/api/Distributor', async (req, res) => {
  try {
    const distributors = await Distributors.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({ distributors });
  } catch (err) {
    console.error('Error fetching distributors:', err.message);
    res.status(500).json({ message: 'Failed to fetch distributors' });
  }
});


// ✅ Simple Hello Route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// ✅ Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
