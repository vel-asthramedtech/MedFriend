# MedFriend — Full Stack Medical App

## Project Structure
```
medfriend-full/
├── client/          → React.js frontend
├── server/          → Node.js + Express backend
├── ai-service/      → Python FastAPI (OCR + Groq AI)
└── README.md
```

## Quick Start

### 1. Fill in environment variables
- Copy `server/.env.example` → `server/.env` and fill values
- Copy `client/.env.example` → `client/.env` and fill values
- Copy `ai-service/.env.example` → `ai-service/.env` and fill values

### 2. Start MongoDB
Make sure MongoDB is running locally or use MongoDB Atlas URI.

### 3. Start backend
```bash
cd server
npm install
npm run dev
```

### 4. Start Python AI service
```bash
cd ai-service
pip install -r requirements.txt
python main.py
```

### 5. Start frontend
```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173

## API Keys needed
- **GROK_API_KEY** → https://console.groq.com/ (Groq AI)
- **GMAIL_USER + GMAIL_APP_PASSWORD** → Google Account → Security → App Passwords
- **MONGODB_URI** → MongoDB Atlas or local mongodb://localhost:27017/medfriend
- **JWT_SECRET** → any long random string (e.g. run: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
- **Cloudinary** → https://cloudinary.com (free tier, currently commented out)
