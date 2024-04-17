// import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { AdminLayout } from './components/layouts/AdminLayout';
import UserLayout from './components/layouts/UserLayout';
import About from './pages/About';
import Contact from './pages/Contact';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Service from './pages/Service';

import Addcar from './pages/Addcar';
import AdminCar from './pages/Admin-Cars';
import AdminContacts from './pages/Admin-Contacts';
import AdminUpdate from './pages/Admin-Update';
import AdminUsers from './pages/Admin-Users';
import Bill from './pages/Bill';
import BookCar from './pages/BookCar';
import CarUpdate from './pages/Car-Update';
import Cardetail from './pages/Cardetail';
import EmailVerify from './pages/EmailVerify';
import Managecar from './pages/Managecar';
import PasswordResetPage from './pages/PasswordResetPage';
import Updateuser from './pages/Updateuser';
import User_history from './pages/User_history';

const App = () => { 

  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/service' element={<Service/>} />
        <Route path='/register' element={<Register/>} />
        <Route path="/:id/verify/:token" element={<EmailVerify/>} />
        <Route path="/reset/:id/:token" element={<PasswordResetPage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/logout' element={<Logout/>} /> 
        <Route path='/addcar' element={<Addcar/>} /> 
        <Route path='/*' element={<Error/>} /> 
        <Route path='/admin' element={<AdminLayout/>} />

        <Route path='/userhome' element={<UserLayout/>} />

        <Route path='/userhistory' element={<User_history/>} />

        <Route path='/admin/users' element = {<AdminUsers/>} />
        <Route path='/admin/user/:id/edit' element = {<AdminUpdate/>} />
        <Route path='/admin/contacts' element = {<AdminContacts/>} />

        <Route path='/admin/cars' element = {<AdminCar/>} />
        <Route path='/admin/cars/:id/edit' element = {<CarUpdate/>} />

        <Route path='/managecar' element = {<Managecar/>} /> 

        <Route path='/user/users/:id/edit'element = {<Updateuser/>} /> 

        <Route path='/user/cardetails/:id'element = {<Cardetail/>} /> 

        <Route path='/user/bookcar/:id' element = {<BookCar/>} />

        <Route path='/user/bookcar/bill/:id' element = {<Bill/>} />
      </Routes> 
      <Footer/>    
    </BrowserRouter>
    </>
  )
}

export default App
