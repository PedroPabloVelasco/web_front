import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home/Home';
import About from './components/About/About';
import ViewOffer from './components/Ofertas/ViewOffer';
import PaginaPrincipal from './principal';
import JobOffer from './components/Ofertas/JobOffer';
import MyOffers from './components/Ofertas/MyOffers';
import SignUp from './components/Login/SignUp';
import Login from './components/Login/Login';
import SelectedEmployees from './components/Ofertas/SelectedEmployees';
import MyOffersCreated from './components/Ofertas/MyOffersCreated';
import PrivateRoute from './components/protectedRoutes';
import EditProfile from './components/Login/EditProfile';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />     
          <Route path="/principal" element={
            <PrivateRoute>
              <PaginaPrincipal />
            </PrivateRoute>
          } />
          <Route path="/viewoffer" element={
            <PrivateRoute>
              <ViewOffer />
            </PrivateRoute>
          } />
          <Route path="/JobOffer" element={
            <PrivateRoute>
              <JobOffer />
            </PrivateRoute>
          } />
          <Route path="/myoffers" element={
            <PrivateRoute>
              <MyOffers />
            </PrivateRoute>
          } />
          <Route path="/selectedemployees" element={
            <PrivateRoute>
              <SelectedEmployees />
            </PrivateRoute>
          } />
          <Route path="/myofferscreated" element={
            <PrivateRoute>
              <MyOffersCreated />
            </PrivateRoute>
          } />
          <Route path="/editprofile" element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
