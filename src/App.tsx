import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Explore from '@/pages/explore.tsx';
import Home from '@/pages/home';
import Navbar from './components/navbar';
import Docs from "@/pages/docs.tsx";
import Stats from "@/pages/stats.tsx";
import Footer from "@/components/footer.tsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
               <Route path="/explore" element={<Explore />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="/stats" element={<Stats />} />
               <Route path="/home" element={<Home />} />

            </Routes>
          <Footer/>
        </div>
    </Router>
  );
}

export default App;
