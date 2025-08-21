# Invoice Generator

A full-stack invoice generator application built with **React**, **TypeScript**, **Node/Express** (backend), **MongoDB**. Users can sign up, log in, add products, and generate invoices as PDFs. 

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Demo](#demo)  

---

## Features

- User authentication (Signup/Login) using **JWT**.  
- Add, view, and manage products. 
- Generate **PDF invoices** from product data.  
- Responsive design with modern UI.  
- Protected routes with authentication.  

---

## Tech Stack

- **Frontend:** React, TypeScript, TailwindCSS, Shadcn, React Hook Form, Zod.  
- **Backend:** Node.js, Express, JWT Authentication, MongoDB, Puppeteer for PDF generation. 
- **Other Tools:** axios, sonner for toast notifications .  

---

## Installation

### 1. Clone the repository

```
git clone <repository_url>
cd Invoice-Generator
```
### 2. Backend Setup
```
cd backend
npm install

Create a .env file:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the backend:
npm run server
```

### 3. Frontend Setup

```
cd frontend
npm install

Create a .env file:
VITE_API_BASE_URL=http://localhost:4000

Start the frontend:
npm run dev
```
---
## Usage

- **Sign Up / Login**
    - Users can sign up with name, email, and password.
    - Login returns a JWT token stored in localStorage.

- **Add Products**
    - Enter product name, price, and quantity.
    - Subtotal and GST are calculated automatically.

- **Generate Invoice**
    - Click “Generate PDF Invoice” to download a PDF invoice of all added products.

---
## Demo

Check out the live link here: [invoice-generator](https://invoice-generator-frotend.vercel.app)