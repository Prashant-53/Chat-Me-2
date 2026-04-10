import { BrowserRouter,Routes ,Route } from "react-router-dom";
import Signup from './pages/signUp';
import Join from "./pages/Join"
import Chat from './pages/Chat';
import './App.css'
import Login from './pages/login';
import ProtectedRoute from './components/protectedRoutes';

function App() {

  return (
   <BrowserRouter>

   <div className='min-h-screen bg-gray-900 text-white flex-col h-screen'>
    <Routes>
      <Route path='/'
      element={<Signup/>}/>

      <Route path='/login'
      element={<Login/>}/>

      <Route path='/join'
      element={
      <ProtectedRoute>
      <Join/>
      </ProtectedRoute>}
      />

      <Route path ='/chat'
       element={
       <ProtectedRoute>
        <Chat/>
       </ProtectedRoute>}/>

    </Routes>

   </div>

   </BrowserRouter>
  )
}

export default App
