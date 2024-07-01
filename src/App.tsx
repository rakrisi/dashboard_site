import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import About from '@/pages/about';
import Home from '@/pages/home';
import Navbar from '@/components/navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold">Welcome to My Website</h1>
          <p>This is a simple example of a navigation bar using Tailwind CSS in a React application.</p>
        </div>
<div className="container mx-auto p-4">
<Routes>
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
</div>
       
      </div>
    </Router>
  );
}

export default App;
