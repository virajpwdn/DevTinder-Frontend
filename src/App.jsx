import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";
import Login from "./components/Login";
import Signup from "./components/Signup";
import appStore from "./store/appStore";
import { Provider } from "react-redux";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connection from "./components/Connection";
import Requests from "./components/Requests";

// New shop premium imports
import Premium from "./shop/Premium";

// New Chat imports
import Chat from "./chat/Chat";

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile/view" element={<Profile />} />
              <Route path="/connections" element={<Connection />} />
              <Route path="/requests" element={<Requests />} />
              {/* New Shop Premium Routes - testing phase */}
              <Route path="/premium" element={<Premium />} />

              {/* New chat Routes - testing phase */}
              <Route path="/chat/:targetId" element={<Chat />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
