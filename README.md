# NutirutioN 🥗

**A Full-Stack Nutrition & Supplement E-Commerce Platform**

NutirutioN is a full-stack e-commerce application focused on nutrition products and supplements. It allows customers to explore products, discover supplement stacks based on their fitness goals, apply promo codes, and manage their orders.

The platform also provides an administrative workflow for managing orders, inventory, and promotional discounts.

🌐 **Live Demo:** [nutirutio-n.vercel.app](https://nutirutio-n.vercel.app/)

💻 **Source Code:** [GitHub Repository](https://github.com/louiesan/NutirutioN)

---

## ✨ Features

### 🏋️ Goal-Based Supplement Stacks

- Explore supplement stacks curated by the administrator.
- Discover plans tailored to different fitness goals:
  - Bulk
  - Cut
  - Endurance
  - High Performance

### 🛍️ E-Commerce & Order Management

- Browse available nutrition products.
- Place orders through the application.
- Track order status:
  - Pending
  - Accepted
- Dedicated administrative order management.
- Stock deduction when an administrator accepts an order.

### 🎟️ Promo Code System

- Apply promotional codes during checkout.
- Discount calculation.
- Usage tracking for promotional codes.
- Promo code usage updates upon redemption.

**Available demo promo codes:**

| Code | Discount |
|---|---:|
| `KANIXYATO` | 80% |
| `BEKIND20` | 20% |

*Promo code availability and conditions may change.*

### 📧 Email Notifications

- Automated email notification when an order is accepted.

### 🔐 Authentication & Authorization

- Customer and administrator roles.
- Protected application routes.
- Authentication handled with NextAuth.js.
- Route protection using Next.js Middleware.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Full-stack application framework |
| React 19 | User interface |
| TypeScript | Type safety |
| Redux Toolkit | Global state management |
| React Context API | Context-based state sharing |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| NextAuth.js | Authentication |
| bcryptjs | Password hashing |
| Tailwind CSS 4 | Styling |
| Framer Motion | UI animations |
| Cloudinary | Media management |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/louiesan/NutirutioN.git
   ```

2. Navigate into the project:

   ```bash
   cd NutirutioN
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure the environment variables required by the application.

   These include the credentials and connection settings for the database, authentication, media storage, and email services.

   **Never commit your secret keys or credentials to GitHub.**

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000).

---

## 📌 Project Notes

NutirutioN is an existing deployed project that I continue to revisit and improve. Recent maintenance included fixing a Next.js headers-related issue, refining parts of the application, and pushing updates.

---

## 👨‍💻 Developer

**GUEMIDI LOUIE IMAD**

Full-Stack Web Developer

- GitHub: [@louiesan](https://github.com/louiesan)

Feedback, suggestions, and code reviews are welcome!

