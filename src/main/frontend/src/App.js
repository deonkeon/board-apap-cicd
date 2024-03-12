import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import { store } from "./store/store";
import BoardList from "./pages/BoardList";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Post from "./pages/Post";
import Board from "./pages/Board";

export let persiststore = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persiststore}>
        <Routes>
          <Route element={<Layout></Layout>}>
            <Route path="/app/" element={<Home></Home>}></Route>
            <Route path="/app/join" element={<Join></Join>}></Route>
            <Route path="/app/login" element={<Login></Login>}></Route>
            <Route path="/app/board-list" element={<BoardList></BoardList>}></Route>
            <Route path="/app/post" element={<Post></Post>}></Route>
            <Route path="/app/board/:boardNo" element={<Board></Board>}></Route>
          </Route>
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
