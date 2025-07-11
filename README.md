# 🌐 EduNest - Modern Learning & Teaching Platform

Welcome to **EduNest**, an interactive MERN-stack-based education management platform built for students, teachers, and admins. Empower learning, teaching, and creativity — all in one place.

---

## 🔐 Admin Access Info

- **Username (email)**: `admin@gmail.com`  
- **Password**: `Aa1234`

---

## 🔗 Live Website

👉 [Visit EduNest](https://edunest-st.web.app)

---

## ✨ Key Features

✅ Role-based dashboard for **Admin**, **Teacher**, and **Student**  
✅ Teachers can **add classes** with pending approval system  
✅ Admin can **approve/reject classes** directly from the dashboard  
✅ Students can **enroll in classes** using **Stripe** secure payments  
✅ View **class progress**: total enrollments, total assignments, and submissions  
✅ Teachers can **create assignments**, and students can **submit** those  
✅ Students can **evaluate teachers** with ratings and feedback  
✅ Each student can download a **PDF invoice** after successful payment  
✅ Hackathon/competition registration system with **live registration count**  
✅ **Popular classes**, **partner logos**, **discount offers**, and **statistics** on homepage  

---

## 🚀 Tech Stack Used

- **Frontend**: React.js, Tailwind CSS, Swiper.js, React Query, SweetAlert2  
- **Backend**: Node.js, Express.js, MongoDB  
- **Authentication**: Firebase  
- **Payment**: Stripe  
- **PDF Generation**: jsPDF & jsPDF-AutoTable  
- **File Uploads**: Image + Text based

---

## 🧪 Test Login (Student)

- Email: `student@gmail.com`  
- Password: `ffffff`

---

## 📦 Installation & Run Locally

### 1. Clone the Repo
```bash
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-tmdsifat98
cd assignment-12
```

### Install Dependencies
```bash
npm install
```

###Create a .env file in the root:
```bash
(also the firebase credentials)
VITE_API_URL=http://localhost:3000
VITE_STRIPE_PUBLISHABLE_KEY=your_key_here
```

###Run the Development Server
```bash
npm run dev
```