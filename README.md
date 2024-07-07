# EasyPrice

EasyPrice is a web application designed to help users track the prices of various products over time. It allows users to monitor price changes and get notifications when the price drops to a desired level.

## Features

- *Product Tracking*: Add products to your watchlist and monitor their prices.
- *Price History*: View the historical price data of tracked products.
- *Notifications*: Receive notifications when a product's price drops to your specified target.
- *User Authentication*: Securely log in and manage your tracked products.
- *Responsive Design*: Access the app on any device with a responsive and user-friendly interface.

## Technologies Used

- *Frontend*: Next.js, React, Tailwind CSS
- *Backend*: Node.js, Express
- *Database*: MongoDB
- *Web Scraping*: Puppeteer
- *Authentication*: JWT (JSON Web Tokens)
- *Hosting*: Vercel (Frontend), Heroku (Backend)
- *Version Control*: GitHub

## Installation

To get a local copy of the project up and running, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB instance (local or cloud-based)

### Frontend Setup

1. Clone the repository:
   bash
   git clone https://github.com/kashishsinghal13/PriceTracker.git
   cd PriceTracker/frontend
   

2. Install the dependencies:
   bash
   npm install
   

3. Create a .env.local file in the frontend directory and add the following environment variables:
   env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   

4. Run the development server:
   bash
   npm run dev
   

### Backend Setup

1. Navigate to the backend directory:
   bash
   cd ../backend
   

2. Install the dependencies:
   bash
   npm install
   

3. Create a .env file in the backend directory and add the following environment variables:
   env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   

4. Run the backend server:
   bash
   npm start
   

### Running the App

With both the frontend and backend servers running, you can access the app at http://localhost:3000.

## Usage

1. *Sign Up/Log In*: Create an account or log in to your existing account.
2. *Add Products*: Use the search bar to find products and add them to your watchlist.
3. *Set Price Alerts*: Specify your desired price for each product to receive notifications.
4. *View Price History*: Access the historical price data for any tracked product.
5. *Receive Notifications*: Get notified when a product's price drops to your target.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/YourFeature).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature/YourFeature).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Puppeteer](https://pptr.dev/)
- [Vercel](https://vercel.com/)
- [Heroku](https://www.heroku.com/)

---

Feel free to modify this README as needed to better suit your project and preferences.
