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
import Footer from "./components/Footer";

function App() {
  const [popoverVisible, setPopoverVisible] = useState(false);

  const handlePopoverToggle = () => {
    setPopoverVisible(!popoverVisible);
  };

  return (
    <>
      {/* <PopoverRoot>
        <PopoverTrigger onClick={handlePopoverToggle}>
          <Button>Toggle Popover</Button>
        </PopoverTrigger>
        <Popover
          visible={popoverVisible}
          onClose={() => setPopoverVisible(false)}
          align="top"
          offset={100}
        >
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Popover Header</PopoverTitle>
            </PopoverHeader>
            <p>This is a simple popover content.</p>
            <PopoverFooter>
              <Button onClick={() => setPopoverVisible(false)}>Close</Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </PopoverRoot> */}
      <Footer />
    </>
  );
}

export default App;
