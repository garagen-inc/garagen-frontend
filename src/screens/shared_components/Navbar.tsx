import logo from '../../assets/images/garager-transparent-logo.svg'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import avatarIcon from '../../assets/icons/avatar.icon.svg'
import chevronDown from '../../assets/icons/chevron-down.icon.svg'
import { useState } from 'react'
import EditUserModal from './components/EditUserModal'
import ChangePasswordModal from './components/ChangePasswordModal'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const { workshopId } = useParams()
  const isUserOwnerOfThisWorkshop =
    user &&
    user.isWorkshopOwner &&
    String(user.workshop_id) === String(workshopId)

  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenEditProfileModal, setIsOpenEditProfileModal] = useState(false)
  const [isOpenChangePasswordModal, setIsOpenChangePasswordModal] =
    useState(false)

  const handleMenuOptions = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  const handleOpenEditProfile = () => {
    setIsOpenMenu(false)
    setIsOpenEditProfileModal(true)
  }

  const handleOpenChangePassword = () => {
    setIsOpenMenu(false)
    setIsOpenChangePasswordModal(true)
  }

  return (
    <>
      <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b bg-gg-sunglow ">
        <div className="container relative text-sm">
          <div className="flex justify-between items-center mx-8">
            <div
              className="flex items-center flex-shrink-0 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <img src={logo} className="size-16" alt="logo"></img>
            </div>

            <div className="flex justify-center space-x-12 items-center font-bold">
              {user && (
                <div className="flex flex-row gap-4 items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white">
                    <img
                      src={avatarIcon}
                      alt="avatar icon"
                      className="size-5"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="relative select-none">
                      <div
                        className="flex flex-row gap-2 items-center cursor-pointer"
                        onClick={handleMenuOptions}
                      >
                        <p className="font-bold">{user.name}</p>
                        <img
                          src={chevronDown}
                          alt="chevron down"
                          className={`size-3 transform rotate-${
                            isOpenMenu ? 180 : 0
                          } transition-transform duration-200`}
                        />
                      </div>

                      {isOpenMenu && (
                        <div className="absolute left-[-8px] mt-2 w-40 bg-white rounded-lg shadow-lg z-40">
                          <ul className="py-2">
                            <li
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-normal"
                              onClick={handleOpenEditProfile}
                            >
                              Editar dados
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-normal"
                              onClick={handleOpenChangePassword}
                            >
                              Alterar senha
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                              onClick={logout}
                            >
                              Sair
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                    {user.workshop && (
                      <Link
                        to={`/workshop/${user.workshop_id}`}
                        className="flex flex-row gap-2 items-center cursor-pointer"
                      >
                        <p className="font-normal">{user.workshop.name}</p>
                        {user &&
                          user.isWorkshopOwner &&
                          !isUserOwnerOfThisWorkshop && (
                            <img
                              src={chevronDown}
                              alt="chevron down"
                              className={`size-2 rotate-90`}
                            />
                          )}
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {!user && (
                <Link
                  to="/login"
                  className="bg-gg-rich-black text-white hover:text-black hover:bg-gg-lavender-blush whitespace-nowrap font-bold py-2 px-3 rounded-full transition duration-200 ease-in-out"
                >
                  Entrar
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      {isOpenChangePasswordModal && user && (
        <ChangePasswordModal
          onClose={() => setIsOpenChangePasswordModal(false)}
          onConfirm={() => setIsOpenChangePasswordModal(false)}
          user={user}
        />
      )}
      {isOpenEditProfileModal && user && (
        <EditUserModal
          onClose={() => setIsOpenEditProfileModal(false)}
          onConfirm={() => setIsOpenEditProfileModal(false)}
          user={user}
        />
      )}
    </>
  )
}

export default Navbar
