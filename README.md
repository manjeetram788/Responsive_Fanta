# Responsive Fanta - Complete Web Solution

A modern, professional, fully responsive landing page with integrated backend and database.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Frontend Integration](#frontend-integration)
- [Deployment](#deployment)

## ✨ Features

### Frontend
- ✅ Fully responsive design (mobile-first)
- ✅ Dark/Light mode toggle
- ✅ Smooth animations and transitions
- ✅ Loading animation
- ✅ Mobile hamburger menu
- ✅ Form validation
- ✅ Parallax effects
- ✅ Scroll animations
- ✅ SEO optimized
- ✅ Accessibility features

### Backend
- ✅ RESTful API
- ✅ Form submission handling
- ✅ Service management
- ✅ Testimonial management
- ✅ Feature management
- ✅ Input validation
- ✅ Error handling
- ✅ CORS enabled

### Database
- ✅ MongoDB integration
- ✅ Mongoose ODM
- ✅ Data validation
- ✅ Timestamp tracking
- ✅ Status management

## 📁 Project Structure

```
Responsive_Fanta/
├── FrontEnd/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # All CSS styling
│   ├── script.js           # Frontend JavaScript
│   ├── Fox.css             # (Optional)
│   └── backend.js          # (Optional)
├── models/
│   ├── Contact.js          # Contact schema
│   ├── Service.js          # Service schema
│   ├── Testimonial.js      # Testimonial schema
│   └── Feature.js          # Feature schema
├── routes/
│   ├── contactRoutes.js    # Contact API endpoints
│   ├── servicesRoutes.js   # Services API endpoints
│   ├── testimonialRoutes.js # Testimonials API endpoints
│   └── featureRoutes.js    # Features API endpoints
├── server.js               # Express server setup
├── seed.js                 # Database seeding script
├── package.json            # Dependencies
├── .env                    # Environment variables
└── README.md              # This file
```

## 🔧 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

## 📦 Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create/update `.env` file:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/responsive-fanta
DB_NAME=responsive-fanta
CORS_ORIGIN=http://localhost:3000
```

### 3. Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**MongoDB Atlas (Cloud):**
- Go to https://www.mongodb.com/cloud/atlas
- Create cluster and get connection string
- Update `MONGODB_URI` in `.env`

### 4. Seed Database (Optional)

```bash
node seed.js
```

This creates sample services, features, and testimonials.

### 5. Start Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server runs at: `http://localhost:5000`

## 🔌 API Endpoints

### Contact Endpoints
```
POST   /api/v1/contact              - Submit contact form
GET    /api/v1/contact              - Get all contacts
GET    /api/v1/contact/:id          - Get single contact
PUT    /api/v1/contact/:id          - Update contact status
DELETE /api/v1/contact/:id          - Delete contact
```

### Services Endpoints
```
POST   /api/v1/services             - Create service
GET    /api/v1/services             - Get active services
GET    /api/v1/services/admin/all   - Get all services
GET    /api/v1/services/:id         - Get single service
PUT    /api/v1/services/:id         - Update service
DELETE /api/v1/services/:id         - Delete service
```

### Testimonials Endpoints
```
POST   /api/v1/testimonials         - Create testimonial
GET    /api/v1/testimonials         - Get active testimonials
GET    /api/v1/testimonials/admin/all - Get all testimonials
GET    /api/v1/testimonials/:id     - Get single testimonial
PUT    /api/v1/testimonials/:id     - Update testimonial
DELETE /api/v1/testimonials/:id     - Delete testimonial
```

### Features Endpoints
```
POST   /api/v1/features             - Create feature
GET    /api/v1/features             - Get active features
GET    /api/v1/features/admin/all   - Get all features
GET    /api/v1/features/:id         - Get single feature
PUT    /api/v1/features/:id         - Update feature
DELETE /api/v1/features/:id         - Delete feature
```

### Health Check
```
GET    /api/v1/health               - Server status
```

## 💾 Database Models

### Contact
```javascript
{
  _id: ObjectId,
  name: String (required, 2-100 chars),
  email: String (required, valid email),
  subject: String (max 200 chars),
  message: String (required, 10-5000 chars),
  status: 'pending' | 'reviewed' | 'responded',
  response: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Service
```javascript
{
  _id: ObjectId,
  title: String (required, 3-100 chars),
  description: String (required, 10-1000 chars),
  icon: String (emoji),
  price: Number,
  duration: String,
  features: [String],
  isActive: Boolean (default: true),
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Testimonial
```javascript
{
  _id: ObjectId,
  text: String (required, 10-500 chars),
  author: String (required, 2-100 chars),
  position: String,
  company: String,
  rating: Number (1-5, default: 5),
  image: String,
  isActive: Boolean (default: true),
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Feature
```javascript
{
  _id: ObjectId,
  title: String (required, 3-100 chars),
  description: String (required, 5-500 chars),
  number: Number (required, 1-99),
  icon: String (emoji),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

## 🌐 Frontend Integration

The frontend automatically connects to the backend. Update the API base URL in `FrontEnd/script.js` if needed:

```javascript
const API_BASE_URL = 'http://localhost:5000/api/v1';
```

### Example API Call from Frontend

```javascript
// Submit contact form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Inquiry',
        message: 'Hello, I have a question...'
    };

    try {
        const response = await fetch('http://localhost:5000/api/v1/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
});
```

## 🚀 Deployment

### Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri

# Deploy
git push heroku main
```

### AWS
- Use AWS Elastic Beanstalk or EC2
- Connect to MongoDB Atlas or AWS DocumentDB
- Configure environment variables

### Vercel (Frontend Only)
```bash
npm i -g vercel
vercel
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB service is running
- Check `MONGODB_URI` in `.env`
- For MongoDB Atlas: Verify IP whitelist and credentials

### CORS Errors
- Update `CORS_ORIGIN` in `.env`
- Ensure frontend URL matches configuration

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

## 📚 Technologies Used

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Validation:** express-validator
- **Security:** bcryptjs, CORS
- **Other:** dotenv, nodemailer

## 📝 License

MIT

## 📧 Support

For issues and questions, create an issue in the repository or contact support.