import { useNavigate } from 'react-router-dom'
import cl from './Header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import img from '../../assets/Rectangle 1.png'
import { logOutAction } from '../store/usersReducer'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const toSignIn = () => {
    navigate('/sign-in')
  }

  const toSignUp = () => {
    navigate('/sign-up')
  }

  const logOutHandler = () => {
    dispatch(logOutAction())
    localStorage.removeItem('user')
    navigate('/articles/')
  }

  const toNewArticle = () => {
    navigate('/new-article')
  }
  // console.log(JSON.parse(localStorage.getItem('user')).username)
  // console.log(localStorage.removeItem('user'))
  // console.log(JSON.parse(localStorage.getItem('user')))
  // console.log(localStorage.getItem('user'))
  // onClick={() => localStorage.removeItem('user')}

  const user = useSelector((state: any) => state.users.currentUser) || localStorage.getItem('user')
  // const image = JSON.parse(localStorage.getItem('user')).image || img
  // const user = localStorage.getItem('user')
  console.log(user)

  return (
    <header className={cl.header}>
      <h1 className={cl.logo_title}>Realworld Blog</h1>
      <div>
        {!user ? (
          <>
            <button onClick={toSignIn} className={cl.header__btn}>
              Sign In
            </button>
            <button onClick={toSignUp} className={`${cl.header__btn} ${cl.header__btn__green}`}>
              Sign Up
            </button>
          </>
        ) : (
          <div className={cl.users_wrap}>
            <button onClick={toNewArticle} className={cl.create_article_btn}>
              Create article
            </button>
            <div onClick={() => navigate('/profile')} className={cl.img_wrap}>
              <span>{JSON.parse(localStorage.getItem('user') || 'default')?.username}</span>
              <img src={img} alt="avatar" />
            </div>
            <button onClick={logOutHandler} className={`${cl.header__btn} ${cl.logout_btn}`}>
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
