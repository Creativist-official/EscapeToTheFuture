import { BrowserRouter, Routes, Route } from "react-router";
import "@assets/style/index.css";

import Bitritto from "./schools/Bitritto/Bitritto";
import Modugno from "./schools/Modugno/Modugno";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/EscapeToTheFuture/bitritto" element={<Bitritto />} />
        <Route path="/EscapeToTheFuture/modugno" element={<Modugno />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
