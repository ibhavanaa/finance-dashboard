# 📊 Financial Dashboard

A powerful admin dashboard for analyzing financial transactions with JWT authentication, advanced filtering, visual charts, configurable CSV export, and responsive design.


# Postman Collection Link

https://gist.github.com/ibhavanaa/7d5d605d820dc84d059aaaa2e63ef341

# Live Deployed Project URL

https://finance-dashboard-fawn-kappa.vercel.app/login


# Github Code Link
https://github.com/ibhavanaa
---

## 🚀 Tech Stack

### 💻 Frontend
- **Framework**: Next.js (React + TypeScript)
- **UI Library**: Tailwind CSS
- **Charts**: Chart.js (via react-chartjs-2)
- **Icons**: react-icons

### 🌐 Backend
- **Server**: Node.js + Express + TypeScript
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **CSV Export**: json2csv

---

## ✅ Features

- 🔐 **Secure Admin Login with JWT**
- 📋 **Responsive Transaction Table**
- 🔎 **Multi-field Filtering**
  - Status, Category, User ID, Date Range, Min/Max Amount
- 🧠 **Real-Time Search**
- ↕️ **Column-Based Sorting**
- 📈 **Visual Charts**
  - Revenue vs Expense, Paid vs Pending, Daily Totals
- 📤 **CSV Export Modal**
  - Select fields to export
- 💡 **Attractive & Clean UI**
- 📱 **Fully Responsive**

---

## 🔑 Demo Login Credentials

Username: admin
Password: admin123



---

## ⚙️ Environment Variables

### 🔒 Backend (.env)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


---

## 🧩 Setup Instructions

### 📦 Backend Setup
```bash
cd backend
npm install
npm run dev

🎨 Frontend Setup
cd frontend
npm install
npm run dev

Visit: http://localhost:3000

📡 API Endpoints
| Method | Endpoint                   | Description                      |
| ------ | -------------------------- | -------------------------------- |
| POST   | `/api/auth/login`          | Login user (returns JWT token)   |
| GET    | `/api/transactions`        | Get filtered transaction data    |
| GET    | `/api/transactions/export` | Export CSV with selected filters |

Query Parameters for /transactions

status=Paid|Pending

category=Revenue|Expense

user_id=<string>

minAmount=<number>

maxAmount=<number>

startDate=<yyyy-mm-dd>

endDate=<yyyy-mm-dd>

columns=id,date,status,... (for export)

📄 Documentation
✅ Setup instructions (above)

✅ JWT-secured APIs

✅ CSV Export with column selection

✅ Fully responsive dashboard UI


🙌 Author
 Bhavana Choudhary
