import { Link, useNavigate } from 'react-router-dom'
import cl from './Header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import img from '../../assets/Rectangle 1.png'
import { logOutAction } from '../store/usersReducer'
import { setPageAction } from '../store/articleReducer'
import { fetchArticles } from '../store/asynkActions/article'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const page = useSelector((state: any) => state.article.page)

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

  const toArticle = () => {
    dispatch(setPageAction(page))
    
    let offset = page > 1 ? page * 10 - 10 : 0
    // @ts-ignore
    dispatch(fetchArticles(offset))
    navigate('/articles/')
  }

  const user = useSelector((state: any) => state.users.currentUser) || localStorage.getItem('user')

  return (
    <header className={cl.header}>
      <button onClick={toArticle} className={cl.logo_title}>
        Realworld Blog
      </button>
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
