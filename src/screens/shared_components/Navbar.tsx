import logo from '../../assets/images/garager-transparent-logo.svg'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

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
  const { workshopId } = useParams()
  const isUserOwnerOfThisWorkshop =
    user &&
    user.isWorkshopOwner &&
    String(user.workshop_id) === String(workshopId)

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b bg-gg-sunglow ">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center flex-shrink-0 cursor-pointer"
            onClick={() => navigate('/')}
          >
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
              <div>
                <p className="font-bold">{user.name}</p>
                {user.workshop && (
                  <p className="font-normal">{user.workshop.name}</p>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="py-2 px-8 rounded-full bg-gg-lavender-blush hover:text-white hover:bg-gg-rich-black transition duration-200 ease-in-out"
              >
                Login
              </Link>
            )}

            {user && user.isWorkshopOwner && !isUserOwnerOfThisWorkshop && (
              <Link
                to={`/workshop/${user.workshop_id}`}
                className="py-2 px-8 rounded-full bg-gg-lavender-blush hover:text-white hover:bg-gg-rich-black transition duration-200 ease-in-out"
              >
                Gerenciar minha oficina
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
        </div>
      </div>
    </nav>
  )
}

export default Navbar
