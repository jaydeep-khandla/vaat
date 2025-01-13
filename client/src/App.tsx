import { useState } from "react";
// import "./App.css";
import "./App.css";
import Button from "@/components/ui/Button";
import {
  PopoverRoot,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverFooter,
  PopoverTitle,
} from "@/components/ui/Popover";
import Footer from "./components/ui/Footer";
import Navbar from "./components/ui/Navbar";
import LandingPage from "./views/LandingPage";
import { Route, Routes } from "react-router";
import JoinPage from "./views/JoinPage";

function App() {
  const [popoverVisible, setPopoverVisible] = useState(false);

  const handlePopoverToggle = () => {
    setPopoverVisible(!popoverVisible);
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/join" element={<JoinPage />} />
    </Routes>
  );
}

export default App;
