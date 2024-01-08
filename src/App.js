import './App.css';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from './components/HomePage/homePage';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Homepage/>}></Route>
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
