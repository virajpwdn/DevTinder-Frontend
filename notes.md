# Frontend Setup with React, Vite, Tailwind & React Router

## 🚀 Initial Setup
1. **Installed React using Vite**
   ```sh
   npm create vite@latest my-project --template react
   cd my-project
   npm install
   ```
2. **Installed Tailwind CSS**
   ```sh
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
3. **Installed Daisy UI for React Components**
   ```sh
   npm install daisyui
   ```

## 🎨 Tailwind Configuration
- Modified `tailwind.config.js` according to the documentation:
   ```js
   module.exports = {
     content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
     theme: {
       extend: {},
     },
     plugins: [require("daisyui")],
   };
   ```

## 🏗️ Routes Setup
### Implemented inside `App.jsx`:
```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## 🏗️ Body Component Structure (`Body.jsx`)
```jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Body() {
  return (
    <div>
      <Navbar />  {/* Renders on all pages */}
      <Outlet />  {/* Handles child routes */}
      <Footer />  {/* Renders on all pages */}
    </div>
  );
}

export default Body;
```

## ✅ Summary
- Installed **React** with **Vite** for a fast setup.
- Integrated **Tailwind CSS** for styling and **DaisyUI** for pre-designed components.
- Configured **React Router** for navigation.
- Defined a structured **component-based architecture** with `Body.jsx` managing layout.

This setup ensures **scalability, performance, and modularity** for our frontend application! 🚀

</br>
</br>
# MERN Stack Application Notes

## Handling CORS in a MERN Stack Application

### What is CORS?
CORS (**Cross-Origin Resource Sharing**) is a security feature implemented by browsers that restricts web applications from making requests to a different domain or port than the one that served the web page. This is to prevent unauthorized access and potential security risks.

By default, browsers block frontend applications from accessing APIs hosted on different origins (e.g., different domains or ports). Even if the frontend and backend are running on the same server but on different ports (e.g., frontend on `http://localhost:3000` and backend on `http://localhost:5000`), the browser enforces CORS restrictions.

### Solving CORS Issues in Backend
To allow the frontend to communicate with the backend, we need to configure CORS properly in our Node.js server.

#### Installing CORS Middleware
Use the following command to install the CORS middleware in your backend project:
```sh
npm install cors
```

#### Setting Up CORS in Express (Backend)
In the backend, we configure the middleware to allow requests from the frontend URL:

```javascript
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: "http://localhost:3000", // Replace with the frontend server URL
  credentials: true // Allows cookies and authentication headers to be shared
}));
```

This setup ensures that the frontend (React) can access the backend API (Express) without CORS errors.

### Handling CORS on the Frontend
When making API requests using **Axios** from the frontend, we need to explicitly enable credentials (cookies, authorization headers, etc.). Without this setting, cookies won't be stored in the browser.

#### Making API Calls with Axios
```javascript
import axios from "axios";

axios.get("http://localhost:5000/api/data", {
  withCredentials: true // Ensures cookies and credentials are included
})
.then(response => console.log(response.data))
.catch(error => console.error("Error fetching data:", error));
```

### Summary
1. **CORS prevents frontend-backend communication across different origins** for security reasons.
2. **To enable cross-origin requests**, we use the `cors` middleware in our backend (`app.use(cors({ origin: "frontend_URL", credentials: true }))`).
3. **On the frontend**, we set `{ withCredentials: true }` when making requests using Axios to ensure that cookies and authentication data are included.

This setup ensures smooth communication between the frontend and backend in a MERN stack application. 🚀