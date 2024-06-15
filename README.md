# PIXZA ( An Online Food Delivery Platform ) - Next.js Full Stack Web Application

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

This is a full-stack web application built with Next.js, Tailwind CSS, and MongoDB. The application allows users to sign up, log in, browse food items, add/remove items from their cart, place orders using Razorpay for payment, and view their order details. Admin users have additional privileges to manage food items and users.

## Features

- User authentication (Sign up, Log in)
- Browse and search for food items
- Add/remove food items to/from the cart
- Place orders with Razorpay payment integration
- View order details
- Admin panel to manage food items and users

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: MongoDB
- **Payment Gateway**: Razorpay

## Installation

### Prerequisites

- Node.js (>=14.x.x)
- MongoDB (local or Atlas)
- Razorpay account for payment integration

### Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/thefarhanahmad/PIXZA-An-Online-Food-Delivery-Platform.git

   cd yourprojectname
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env.local` file in the root directory and add the following environment variables:

   ```env
   MONGODB_URI = your_mongodb_connection_string
   NEXT_PUBLIC_RAZORPAY_KEY = your_razorpay_key_id
   RAZORPAY_KEY = your_razorpay_key_secret
   JWT_SECRET = your_jwt_secret
   RAZORPAY_SECRET = your_razorpay_secret
   ```

4. Run the development server:

   ```sh
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### User Flow

1. **Sign Up / Log In**: Users can sign up for a new account or log in with existing credentials.
2. **Browse Food Items**: Users can browse the available food items and add them to their cart.
3. **Cart Management**: Users can view their cart, update quantities, and remove items.
4. **Place Order**: Users can proceed to checkout and place an order using Razorpay for payment.
5. **View Orders**: After successful payment, users can view their order details.
6. **Admin Panel**: Admin users can add, edit, and delete food items, as well as manage user accounts.

### Admin Panel

- **Manage Food Items**: Admins can add new food items, edit existing items, and delete items.
- **Manage Users**: Admins can view and delete user accounts.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you would like to contribute to this project.

## License

This project is licensed under the MIT License.

## Contact

- GitHub: [thefarhanahmad](https://github.com/thefarhanahmad)
- Email: akhtarfarhan281@gmail.com
