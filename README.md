# 🛢️ Molytrix Petrochem

A full-stack web application for **Molytrix Petrochem** — an industrial lubricants and greases company. Built with the **MERN stack** (MongoDB, Express, React, Node.js), the platform showcases the company's product catalog, global distributor network, and lets customers get in touch directly through the site.

🔗 **Live Site:** [www.molytrixpetrochem.com](https://www.molytrixpetrochem.com)

---

## ✨ Features

- 🔐 **User Authentication** — JWT-based register/login system
- 🧴 **Product Catalog** — Browse lubricants, greases, gear oils, hydraulic oils, engine oils, and aerosols
- 🌍 **Distributor Directory** — View distributors worldwide with country, company, and contact details
- 📩 **Contact Form** — Inquiries are saved to the database *and* emailed to the admin via Nodemailer
- 🛠️ **Admin Panel** — Restricted access to add/delete products and distributors (image upload supported via Multer)
- 👤 **User Dashboard** — Editable profile with account overview
- 📱 **Fully Responsive UI** — Built with Tailwind CSS, works smoothly across mobile, tablet, and desktop
- 💬 **WhatsApp Quick Contact** — Floating button for instant chat with the sales team

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React (Vite), React Router, Tailwind CSS, Framer Motion, Lucide Icons |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Auth** | JSON Web Tokens (JWT), bcryptjs |
| **File Upload** | Multer |
| **Email Service** | Nodemailer |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
Molytrix/
├── frontend/               # React + Vite client
│   ├── src/
│   │   ├── pages/          # Home, Login, Register, Dashboard, Contact, Distributors
│   │   ├── components/     # Navbar, Footer, Hero, AdminProduct, UI components
│   │   ├── img/             # Product images by category
│   │   └── App.jsx
│   └── package.json
│
├── backend/                 # Express server
│   ├── models/               # User, Product, Contact, Distributors schemas
│   ├── uploads/               # Uploaded product images
│   ├── server.js
│   └── package.json
│
└── vercel.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas URI (or local MongoDB instance)

### 1. Clone the repository
```bash
git clone https://github.com/alok-kumar-2005/Molytrix-main.git
cd Molytrix-main
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
PORT=8080
```

Run the server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:
```env
VITE_BACKEND_URL=http://localhost:8080
```

Run the dev server:
```bash
npm run dev
```

---

## 🔑 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT |
| `POST` | `/api/auth/contact` | Submit a contact inquiry |
| `GET` | `/api/products` | Fetch all products |
| `POST` | `/api/products` | Add a product *(admin only)* |
| `DELETE` | `/api/products/:id` | Delete a product *(admin only)* |
| `GET` | `/api/Distributor` | Fetch all distributors |
| `POST` | `/api/auth/Distributor` | Add a distributor *(auth required)* |
| `DELETE` | `/api/auth/Distributor/:id` | Delete a distributor *(admin only)* |

---

## 📸 Screenshots

> Add your homepage, product page, and dashboard screenshots here for a stronger first impression.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/alok-kumar-2005/Molytrix-main/issues).

---

## 📄 License

This project is for **Molytrix Petrochem** and is not licensed for public redistribution unless stated otherwise.

---

## 👨‍💻 Author

**Alok Kumar**
- GitHub: [@alok-kumar-2005](https://github.com/alok-kumar-2005)
