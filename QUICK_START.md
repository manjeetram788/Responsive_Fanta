# 🎯 QUICK REFERENCE - Local Server

## ⚡ Start Server in 10 Seconds

### Windows
```
Double-click:  start.bat
```

### Mac/Linux
```bash
bash start.sh
```

### Manual (Any OS)
```bash
npm install
npm run local
```

---

## 📍 Access Your Website

**Frontend:** `http://localhost:5000`

**API:** `http://localhost:5000/api/v1`

---

## ✅ What You Get

✅ Working website with all features
✅ Contact form that saves data
✅ Services management API
✅ Testimonials API
✅ Features management API
✅ No database setup needed
✅ Offline capable

---

## 💾 Where Data is Stored

```
data/
  ├── contacts.json
  ├── services.json
  ├── testimonials.json
  └── features.json
```

All as **plain JSON files** you can read/edit!

---

## 🔌 API Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `/api/v1/contact` | Submit contact |
| GET | `/api/v1/contact` | Get contacts |
| GET | `/api/v1/services` | Get services |
| POST | `/api/v1/services` | Add service |
| GET | `/api/v1/testimonials` | Get testimonials |
| POST | `/api/v1/testimonials` | Add testimonial |
| GET | `/api/v1/features` | Get features |
| POST | `/api/v1/features` | Add feature |

---

## 🧪 Test Contact Form

**In Browser:**
1. Go to `http://localhost:5000`
2. Scroll to Contact section
3. Fill form and submit
4. ✅ Should say "Message Sent!"

**In Terminal (curl):**
```bash
curl -X POST http://localhost:5000/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "subject": "Test",
    "message": "Testing API"
  }'
```

---

## 📂 Project Files

```
📁 Responsive_Fanta/
  ├── start.bat ← Double-click to run (Windows)
  ├── start.sh ← bash start.sh (Mac/Linux)
  ├── server-local.js ← Local file-based server
  ├── package.json ← npm config
  ├── FrontEnd/
  │   ├── index.html
  │   ├── styles.css
  │   └── script.js
  ├── data/ ← Your stored data
  └── LOCAL_SERVER.md ← Full documentation
```

---

## ⚙️ Common Commands

```bash
npm run local       # Start local server
npm install         # Install dependencies
npm run dev         # Start MongoDB server (if using)
```

---

## 🐛 Troubleshooting

**"Command not found: npm"**
- Install Node.js from https://nodejs.org

**"Port 5000 already in use"**
- Edit `.env` and change PORT to 5001
- Or restart computer

**"Connection refused"**
- Make sure server is running
- Check console for errors

**Data not saving**
- Check if `data/` folder exists
- Create it manually if needed

---

## 🎮 Features Working

✅ Hero section with CTA
✅ About section
✅ Services grid (loads from API)
✅ Features section
✅ Testimonials (loads from API)
✅ **Contact form (saves to API)**
✅ Dark/light mode toggle
✅ Mobile responsive
✅ Smooth animations

---

## 📊 View Your Data

### Open JSON Files
```
data/contacts.json   ← See submitted forms
data/services.json   ← See services
data/testimonials.json ← See testimonials
data/features.json   ← See features
```

Use any text editor to view/edit directly!

---

## 🔄 Reset Data

Delete the `data/` folder to start fresh:

**Windows:**
```bash
rmdir /s data
```

**Mac/Linux:**
```bash
rm -rf data
```

Then restart server to create fresh `data/` folder.

---

## 🚀 Next: Deploy to Production

Once working locally, deploy to:
- **Vercel** (free)
- **Heroku** (free tier)
- **AWS** (free tier)
- **Render.com** (free)

See `README.md` for deployment instructions.

---

## 📞 Need Help?

Check these files:
- `LOCAL_SERVER.md` - Detailed guide
- `README.md` - Complete documentation
- `SETUP.md` - Setup instructions
- Browser console (F12) - Error messages

---

## ✨ You're All Set!

Your website is now **fully functional** with a working backend!

**No MongoDB. No complexity. Just works!** 🎉
