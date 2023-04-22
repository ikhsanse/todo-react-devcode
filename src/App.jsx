import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ActivityHome from "./components/ActivityHome";
import ActivityDetails from "./components/ActivityDetails";

function App() {
  return (
    <div className="w-full bg-secondary h-auto py-5 min-h-screen font-link">
      <Header />
      <div className="px-5 md:px-10 lg:px-0 max-w-[1002px] m-auto pt-20">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ActivityHome />}></Route>
            <Route path="detail/:id" element={<ActivityDetails />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
