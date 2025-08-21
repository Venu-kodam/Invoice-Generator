import logo from "../assets/logo.png"
import { useAppContext } from "../Context/appContext";
import { Button } from './ui/button'
import { Link, useLocation } from 'react-router-dom'
const Navbar = () => {
  const location = useLocation();
  const { token, setToken, navigate,logout } = useAppContext()

  return (
    <div className='bg-[#1F1F1F] px-4 sm:px-20 flex items-center justify-between py-4 '>
      <div className='flex items-center gap-2'>
        <img src={logo} alt="logo" className='w-[40px] h-[40px]' />
        <div className='text-white cursor-pointer' onClick={()=>navigate('/')}>
          <p className='text-2xl'>levitation</p>
          <p className='text-xs'>infotech</p>
        </div>
      </div>
      <div>
        {location.pathname === "/" && (
          <Link to="/login">
            <Button className="bg-[#CCF575] hover:bg-[#CCF575] py-2 text-black rounded-md cursor-pointer font-semibold">
              Login
            </Button>
          </Link>
        )}
        {location.pathname === "/login" && (
          <Button className="text-[#CCF575] hidden sm:block hover:bg-transparent bg-transparent  border border-[#CCF575] rounded-md cursor-pointer font-semibold">
            Connecting People With Technology
          </Button>
        )}
        
        {location.pathname === "/products" && (
          <Link to="/login" onClick={logout}>
            <Button className="bg-[#CCF575] hover:bg-[#CCF575] text-black rounded-md cursor-pointer font-semibold">
              Logout
            </Button>
          </Link>
        )}

      </div>
    </div>
  )
}

export default Navbar
