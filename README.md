# NGO Registration and Donation Management System

A secure, backend-driven web application for NGO user registration and transparent donation tracking with Razorpay sandbox integration.

This system ensures that **user data is preserved independently of payment completion** and that **donations are verified ethically using payment gateway signature validation**.

---

## Features

### User

* Register & Login (JWT based authentication)
* View profile details
* Donate any amount using Razorpay (sandbox)
* Track donation history with status:

  * Pending
  * Success
  * Failed

### Admin

* Dashboard with metrics:

  * Total users
  * Total successful donations
  * Pending payments count
* View and filter all users
* Export users as CSV
* View and filter all donations
* Donation aggregation and timestamps

### System

* Role-based access control (User / Admin)
* Razorpay payment verification using signature validation
* Secure APIs with rate limiting, validation, and headers
* Data integrity for all donation attempts

---

## Tech Stack

### Frontend

* Next.js (App Router)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Razorpay SDK

### Security

* Helmet
* Rate Limiting


---

## System Architecture

```
Frontend (Next.js)
       |
       | REST API
       v
Backend (Node + Express)
       |
       v
MongoDB Database
       |
Payment Gateway (Razorpay Sandbox)
```

---

## Database Schema

### User

```json
{
  _id,
  name,
  email,
  password,
  role,
  createdAt
}
```

### Donation

```json
{
  _id,
  userId,
  amount,
  status,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
  createdAt,
  updatedAt
}
```

---

## Project Structure

```
ngo-donation-system/
│
├── client/                    # Next.js frontend
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── register/
│   │   │   └── login/
│   │   ├── (protected)/
│   │   │   ├── dashboard/
│   │   │   ├── donate/
│   │   │   └── history/
│   │   ├── admin/
│   │   └── page.js
│   ├── components/
│   ├── styles/
│   └── package.json
│
├── server/                    # Node.js backend
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── donationController.js
│   │   ├── paymentController.js
│   │   └── adminController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Donation.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── user.js
│   │   ├── payment.js
│   │   └── admin.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── config/
│   │   └── db.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Deployment URLs

### Frontend
[https://ngo-donation-system-mu.vercel.app/](https://ngo-donation-system-mu.vercel.app/)

### Backend
[https://ngo-donation-system-2yw8.onrender.com/](https://ngo-donation-system-2yw8.onrender.com/)

---


## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/skmachra/ngo-donation-system.git
cd ngo-donation-system
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
```

Run backend:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

### 3. Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

## 💳 Razorpay Test Details

Use these credentials for sandbox testing:

```
Card Number: 4111 1111 1111 1111
Expiry: Any future date
CVV: 123
OTP: 123456
```

---

## 🔐 API Overview

### Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`

### User

* GET `/api/user/profile`
* GET `/api/donations/user`

### Payments

* POST `/api/payments/create-order`
* POST `/api/payments/verify`

### Admin

* GET `/api/admin/users`
* GET `/api/admin/donations`
* GET `/api/admin/stats`

---

## Payment Handling Rules (Followed)

* Registration stored even if payment fails
* Donations created as **pending**
* Only marked **success** after signature verification
* Failed/cancelled payments recorded clearly
* No forced or fake success logic

---


## Admin Access

To make a user admin:

```js
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

---

## Future Enhancements

* Email notifications
* Deployment (Docker + cloud hosting)
* Payment refund support
* Graph analytics
* Audit logging
* Multi-NGO support

---

## 👤 Author

**Sunil Kumar**