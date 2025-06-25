import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Dashboard/Sidebar";
import AppRoutes from "./Routes";
import Navbar from "./components/Dashboard/Navbar";

function App() {
  return (
    <Router>
     <div className="bg-white dark:bg-gray-900 min-h-screen text-black dark:text-white pt-16">
        <Navbar />

        <div className="flex flex-1">
          <Sidebar />

         <main className="flex-1 ml-64 p-6 bg-gray-100 dark:bg-gray-800">
            <AppRoutes />
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
