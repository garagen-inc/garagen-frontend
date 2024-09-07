import logo from '../../assets/images/garager-transparent-logo.svg'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
const Navbar = () => {
  const { user, logout } = useAuth()

  // const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // const toggleNavBar = () => {
  //   setMobileDrawerOpen(!mobileDrawerOpen);
  // };

  // const handleResize = () => {
  //   if (window.innerWidth >= 1024) {
  //     // Define o breakpoint para desktop (exemplo: 1024px para larguras grandes)
  //     setMobileDrawerOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);

  //   // Remove o listener quando o componente for desmontado
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b bg-gg-sunglow ">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img src={logo} className="size-16" alt="logo"></img>
          </div>
          {/* <ul className="hidden lg:flex ml-14 space-x-12">
            {navElements.map((item, index) => (
              <li>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul> */}
          <div className="flex justify-center space-x-12 items-center font-bold">
            {user ? (
              <p>{user.name}</p>
            ) : (
              <Link
                to="/login"
                className="py-2 px-8 rounded-full bg-gg-lavender-blush hover:text-white hover:bg-gg-rich-black transition duration-200 ease-in-out"
              >
                Login
              </Link>
            )}
            {user ? (
              <p
                className="cursor-pointer bg-gg-rich-black text-white hover:text-black hover:bg-gg-lavender-blush whitespace-nowrap font-bold py-2 px-3 rounded-full transition duration-200 ease-in-out"
                onClick={logout}
              >
                Sair
              </p>
            ) : (
              <Link
                to="/registeruser"
                className="bg-gg-rich-black text-white hover:text-black hover:bg-gg-lavender-blush whitespace-nowrap font-bold py-2 px-3 rounded-full transition duration-200 ease-in-out"
              >
                Criar Conta
              </Link>
            )}
          </div>
          {/* <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavBar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div> */}
        </div>
        {/* {mobileDrawerOpen && (
          <div className="right-0 z-20 bg-gg-sunglow w-full p12 flex flex-col justify-center items-center lg-hidden">
            <ul>
              {navElements.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <a href="#" className="py-2 px-3 border rounded-md">
                Login
              </a>
              <a
                href="#"
                className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-700 to-blue-700"
              >
                Criar Conta
              </a>
            </div>
          </div>
        )} */}
      </div>
    </nav>
  )
}

export default Navbar
