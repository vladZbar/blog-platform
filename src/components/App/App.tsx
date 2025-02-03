import Header from '../Header/Header'
// import './reset.css'
import './App.module.css'
import cl from './App.module.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ArticleList from '../pages/ArticleList/ArticleList'
import Article from '../pages/Article/Article'
import SignIn from '../pages/SignIn/SignIn'
import SignUp from '../pages/SignUp/SignUp'
import Profile from '../pages/Profile/Profile'
import NewArticle from '../pages/NewArticle/NewArticle'
import EditArticle from '../pages/EditArcticle/EditArticle'

const App = () => {
  const path = localStorage.getItem('user') ? '/new-article' : '/articles'
  return (
    <div className={cl.wrap}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles/" element={<ArticleList />} />
          <Route path="/articles/:id" element={<Article />} />
          <Route path="/articles/:id/edit" element={<EditArticle />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new-article" element={<NewArticle />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
