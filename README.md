# Daily Expense Tracking App

A daily expense tracking app developed using Express.js and Node.js, aimed at helping users track their daily spending with ease. This app offers secure authentication, simple user interface, and efficient data management.

## Features

- **User Authentication**: Secure authentication using JWT (JSON Web Token).
- **Password Encryption**: Passwords are securely stored using Bcrypt hashing.
- **Expense Management**: Users can add, update, and delete daily expenses.
- **Data Storage**: Managed with MongoDB and Mongoose.
- **Responsive UI**: Designed with EJS and TailwindCSS for a clean and responsive user experience.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT, Bcrypt
- **Frontend**: EJS, TailwindCSS
- **Version Control**: Git, GitHub

## Installation

To set up the Daily Expense Tracking App on your local machine:

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [Git](https://git-scm.com/)

### Clone the Repository

```bash
git clone https://github.com/anzer115/Khatabook.git
```
### Navigate to the Project Directory
```bash
cd expense-tracker
```
### Install Dependencies
```bash
npm install
```
### Set up Environment Variables
```bash
MONGODB_URI=your-mongodb-url
```
### Run the Application

To start the server using Node.js, run the following command:

```bash
node app.js
```
The app will now be running at http://localhost:3000.


## Instructions

### 1. Create an Account
- Fill in the registration form with your **email**, and **password**.
- After successful registration, you will be redirected to the login page.

### 2. Login

- Enter your registered email and password to log in.
- Upon successful login, you will be redirected to the dashboard where you can manage your expenses (Hisaabs).

### 3. Create a New Hisaab (Expense Entry)

- After logging in, you will see an option to create a new Hisaab (expense).
- Click the **Create New Hisaab** button.
- Fill out the form with details such as:
  - **Title**: The amount spent.
  - **Description**: A brief note about the expense.
- Submit the form to create your Hisaab. The newly created Hisaab will appear in your expense list.

### 4. Update a Hisaab

- To update a Hisaab, navigate to your list of expenses.
- Find the Hisaab you want to edit and click the **Edit** button next to it.
- Modify the details such as the title, amount, description, and save the changes.

### 5. Delete a Hisaab

- To delete a Hisaab, navigate to your list of expenses.
- Find the Hisaab you wish to delete and click the **Delete** button next to it.


### 6. Explore More Features

- The app allows you to:
  - Track your daily expenses easily.
  - View your Hisaabs for past days, weeks, or months.
  - Get an overview of your spending habits.

Start exploring the app to manage your daily expenses more efficiently!
