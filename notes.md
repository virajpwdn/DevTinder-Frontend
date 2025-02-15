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

