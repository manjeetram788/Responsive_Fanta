# 🚀 Local Server - Quick Start (No MongoDB Required!)

## What is This?

A **file-based local server** that:
- ✅ Requires NO MongoDB installation
- ✅ NO external databases needed
- ✅ Stores data in JSON files
- ✅ Works completely offline
- ✅ Perfect for development & testing

## 🎯 Quick Setup (30 seconds)

### Option A: Windows Users

1. **Double-click** `start.bat` 
2. **Wait** for "Server running" message
3. **Open browser** → `http://localhost:5000`

### Option B: Mac/Linux Users

1. **Open terminal** in project folder
2. **Run command:**
   ```bash
   bash start.sh
   ```
3. **Open browser** → `http://localhost:5000`

### Option C: Manual Start (Any OS)

```bash
npm install
node server-local.js
```

---

## ✨ Features

✅ **Contact Form** - Saves to `data/contacts.json`
✅ **Services** - Saves to `data/services.json`
✅ **Testimonials** - Saves to `data/testimonials.json`
✅ **Features** - Saves to `data/features.json`
✅ **All APIs working** - Same as MongoDB version
✅ **No setup needed** - Works immediately

---

## 📁 Data Storage

All data saved in `data/` folder as JSON files:

```
data/
├── contacts.json
├── services.json
├── testimonials.json
└── features.json
```

You can **view and edit** these files directly!

---

## 🔌 All APIs Work!

Same endpoints as MongoDB version:

```
POST   /api/v1/contact              - Submit contact form
GET    /api/v1/contact              - Get all contacts
GET    /api/v1/services             - Get services
POST   /api/v1/services             - Add service
GET    /api/v1/testimonials         - Get testimonials
POST   /api/v1/testimonials         - Add testimonial
GET    /api/v1/features             - Get features
POST   /api/v1/features             - Add feature
```

---

## 📝 Test the API

### Submit Contact Form

```bash
curl -X POST http://localhost:5000/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test",
    "message": "Hello!"
  }'
```

### Get All Contacts

```bash
curl http://localhost:5000/api/v1/contact
```

### Add a Service

```bash
curl -X POST http://localhost:5000/api/v1/services \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Service",
    "description": "Service description",
    "icon": "🎨",
    "price": 1000
  }'
```

---

## 🎮 How It Works

1. **User submits form** in browser
2. **Frontend sends** to `http://localhost:5000/api/v1/contact`
3. **Server receives** request
4. **Data saved** to `data/contacts.json`
5. **Response sent** back to browser

---

## 💾 View Your Data

Open `data/contacts.json` to see submitted forms:

```json
[
  {
    "id": "abc123xyz",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test",
    "message": "Hello!",
    "status": "pending",
    "createdAt": "2026-04-28T10:30:00.000Z"
  }
]
```

---

## 🔄 Clear All Data

Delete files in `data/` folder to reset:

```bash
rm data/*.json          # Mac/Linux
del data\*.json         # Windows
```

Or just delete the `data` folder completely.

---

## ⚙️ Advanced: Custom Port

Edit `.env`:
```env
PORT=8080
```

Then start server - it will use port 8080.

---

## 🎓 Learning

This local server shows:
- How APIs work
- How data is sent/received
- How Node.js/Express works
- How to store data

Perfect for **learning and development**!

---

## ❌ Limitations vs MongoDB Version

| Feature | Local Server | MongoDB |
|---------|-------------|---------|
| Offline | ✅ Yes | ❌ No |
| Setup | ✅ 0 steps | ❌ Complex |
| Data Persistence | ⚠️ JSON files | ✅ Database |
| Scalability | ⚠️ Limited | ✅ Enterprise |
| Multiple users | ⚠️ Limited | ✅ Yes |
| Performance | ⚠️ Good | ✅ Better |

---

## 🚀 When to Use?

**Use Local Server for:**
- ✅ Development
- ✅ Testing
- ✅ Learning
- ✅ Demos
- ✅ Offline work

**Use MongoDB for:**
- ✅ Production
- ✅ Multiple users
- ✅ Large data
- ✅ Real applications

---

## 📞 Troubleshooting

**Error: Port 5000 already in use**
- Change PORT in `.env`
- Or kill process using port 5000

**Error: npm install fails**
- Make sure Node.js is installed
- Download from https://nodejs.org

**Server won't start**
- Check terminal for error message
- Make sure you're in the project folder
- Try: `npm install` first

**Data not saving**
- Check if `data/` folder exists
- Make sure you have write permissions
- Check browser console for errors (F12)

---

## ✨ That's It!

Your website is now running locally with a working backend! 🎉

No databases. No complexity. Just **click and go**! 🚀
