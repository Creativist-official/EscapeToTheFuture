import { BrowserRouter, Routes, Route } from "react-router";
import "@assets/style/index.css";

import Bitritto from "./schools/Bitritto";
import Modugno from "./schools/Modugno";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/bitritto" element={<Bitritto />} />
        <Route path="/modugno" element={<Modugno />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
