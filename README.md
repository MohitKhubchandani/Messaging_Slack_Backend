
# 🚀 Messaging Slack Backend

*Backend for a real-time messaging platform inspired by Slack.*

## 🌟 Features

✅ **Real-Time Messaging** - Built with **Socket.IO** to enable instant message delivery.  
✅ **User Authentication** - Secure login and registration using **JWT (JSON Web Tokens)**.  
✅ **Chat Rooms** - Support for multiple channels (public and private).  
✅ **Private Messaging** - Direct message functionality between users.  
✅ **Message History** - Store and retrieve past messages.  
✅ **Typing Indicator** - Notify users when someone is typing.  

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js  
- **Real-time Communication:** Socket.IO  
- **Authentication:** JWT (JSON Web Tokens)  
- **Database:** MongoDB (for storing messages, users, and chat data)  
- **Development Tools:** ESLint, Prettier  

## 🎬 Demo

🚧 **Live demo coming soon!**  
(*For the frontend part, please refer to the companion repository.*)

## 📥 Installation

### 1️⃣ Clone the repository
```sh
git clone https://github.com/MohitKhubchandani/Messaging_Slack_Backend.git
cd Messaging_Slack_Backend
```

### 2️⃣ Install dependencies
Using npm:
```sh
npm install
```
Using Yarn:
```sh
yarn install
```

### 3️⃣ Run the development server
Using npm:
```sh
npm start
```
Using Yarn:
```sh
yarn start
```

The server should now be running on `http://localhost:5000`.

## 🔑 API Setup

This backend uses **Socket.IO** for real-time communication and **JWT** for authentication.

### 1. Create a `.env` file in the root directory and add your environment variables:
```sh
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongo_database_uri
```

### 2. **JWT Authentication Example:**
After the user successfully logs in, they'll receive a JWT token, which must be included in the Authorization header when making API requests:
```javascript
const response = await fetch('/api/messages', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${your_token_here}`,
  },
});
```

## 📂 Project Structure

```
Messaging_Slack_Backend/
│── controllers/      # Logic for handling requests
│── models/           # MongoDB schemas for users, messages, chat rooms
│── routes/           # API route handlers
│── socket/           # Socket.IO logic for real-time communication
│── .env.example      # Example environment variables
│── server.js         # Main entry point for the app
│── package.json      # Project dependencies
```

## 🏗 Roadmap

- **Upcoming Features:**
  - 🔐 Implement OAuth authentication (Google/Facebook login)
  - 🔄 Add message editing and deleting capabilities
  - 🛠 Improve error handling and validation
  - 🚀 Deploy to a cloud provider (e.g., AWS, Heroku)

## 🤝 Contributing

Contributions are welcome! Feel free to fork, create a branch, and submit a PR.

1. **Fork the repository**
2. **Create a new branch:** `git checkout -b feature-name`
3. **Commit your changes:** `git commit -m "Add new feature"`
4. **Push to the branch:** `git push origin feature-name`
5. **Open a pull request**

## 📜 License

This project is licensed under the **MIT License**.

## 💡 Acknowledgements

- [Socket.IO](https://socket.io/) ⚡  
- [JWT](https://jwt.io/) 🔑  
- [Express.js](https://expressjs.com/) 🌐  
- [MongoDB](https://www.mongodb.com/) 💾  

---

💙 _Made with passion by [Mohit Khubchandani](https://github.com/MohitKhubchandani)_ 🚀
