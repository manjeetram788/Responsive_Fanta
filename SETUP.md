# 🚀 Quick Start Guide

## One-Time Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start MongoDB
- **Option A:** Local MongoDB
  ```bash
  mongod
  ```
  
- **Option B:** MongoDB Atlas (Cloud)
  - Create account at https://www.mongodb.com/cloud/atlas
  - Get connection string
  - Update `.env`: `MONGODB_URI=your_connection_string`

### 3. Seed Database (First Time Only)
```bash
node seed.js
```

### 4. Start Backend Server
```bash
npm run dev
```
- Server runs at: `http://localhost:5000`

### 5. Open Frontend in Browser
- Open `FrontEnd/index.html` in your browser OR
- Navigate to `http://localhost:5000`

## 📁 File Structure Overview

```
Responsive_Fanta/
├── FrontEnd/                 # Frontend files
│   ├── index.html           # Main page
│   ├── styles.css           # Styling
│   └── script.js            # Interactivity & API calls
├── models/                   # Database schemas
├── routes/                   # API endpoints
├── server.js                # Express server
├── seed.js                  # Initialize database
├── package.json             # Dependencies
├── .env                     # Configuration
└── README.md               # Full documentation
```

## 🔌 Available APIs

### Contact Form
```javascript
POST /api/v1/contact
Body: { name, email, subject, message }
```

### Get Services
```javascript
GET /api/v1/services
```

### Get Testimonials
```javascript
GET /api/v1/testimonials
```

### Get Features
```javascript
GET /api/v1/features
```

## 🌐 Frontend Features

✅ Fully responsive design
✅ Dark/light mode toggle
✅ Smooth animations
✅ Contact form with validation
✅ Dynamic content from backend
✅ Mobile-friendly navigation

## 🔧 Common Commands

```bash
npm run dev        # Start server (dev mode with auto-reload)
npm start          # Start server (production)
node seed.js       # Seed database with sample data
```

## ❓ Troubleshooting

**Error: Cannot find module**
```bash
npm install
```

**MongoDB Connection Error**
- Check if MongoDB is running
- Verify `MONGODB_URI` in `.env`

**Port 5000 Already in Use**
- Change `PORT` in `.env` to different port (e.g., 5001)
- Or kill process: `lsof -i :5000 | kill -9`

**API Not Responding**
- Ensure server is running: `npm run dev`
- Check console for errors
- Verify `API_BASE_URL` in `FrontEnd/script.js` matches server

## 📚 Next Steps

1. **Customize Content**
   - Edit services, testimonials, and features in database
   - Use API endpoints to add/update data

2. **Deploy**
   - See README.md for deployment instructions
   - Recommended: Heroku (free), AWS, or Vercel

3. **Add Features**
   - Authentication system
   - Blog section
   - Booking system
   - Payment integration

## 💡 Tips

- Use MongoDB Compass GUI to manage database
- Test APIs with Postman or Thunder Client
- Check browser console for errors: F12 → Console tab
- Use `npm run dev` during development for auto-reload

## 📞 Support

For detailed documentation, see **README.md**
For issues, check error messages in:
- Browser console (F12)
- Server logs
- `.env` configuration

Happy coding! 🎉
