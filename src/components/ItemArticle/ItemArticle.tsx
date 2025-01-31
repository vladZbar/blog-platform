import cl from './ItemArticle.module.css'
import img from '../../assets/Rectangle 1.png'
import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { setSlugAction } from '../store/articleReducer'
import { useDispatch, useSelector } from 'react-redux'

import { normalTag, normalTitle, normalDesc } from '../../utils/utils'
import { fetchDeleteLike, fetchSetLike } from '../store/asynkActions/article'

const ItemArticle = ({
  title,
  description,
  tagList,
  createdAt,
  author,
  likes,
  slug,
}: {
  title: any
  description: any
  tagList: any
  createdAt: any
  author: any
  likes: any
  slug: any
}) => {
  const dispatch = useDispatch()
  const user = useSelector((state: any) => state.users.currentUser) || localStorage.getItem('user')

  const formattedDate = format(createdAt, 'MMMM d, yyyy')

  const tags =
    Array.isArray(tagList) && tagList.length > 0
      ? tagList.map((tag) => {
          if (tag === '' || tag === '\s' || !/\w/.test(tag)) return
          return (
            <button key={uuidv4()} className={cl.tag}>
              {normalTag(tag)}
            </button>
          )
        })
      : ''

  const handleSlug = async () => {
    dispatch(setSlugAction(slug))
  }

  const handleLike = () => {
    if (user) {
      if (localStorage.getItem(slug) === 'true') {
        localStorage.setItem(slug, 'false')
        dispatch(fetchDeleteLike(slug))
      } else {
        localStorage.setItem(slug, 'true')
        dispatch(fetchSetLike(slug))
      }
    }
  }

  return (
    <li onClick={handleSlug} className={cl.item}>
      <div className={cl.content_wrap}>
        <div className={cl.title_wrap}>
          {/* <h2 className={cl.title}></h2> */}
          <Link className={cl.title} to={`/articles/${slug}`}>
            {normalTitle(title)}
          </Link>

          <div className={cl.like_wrap}>
            <button
              onClick={handleLike}
              className={localStorage.getItem(slug) === 'true' && user ? cl.liked : cl.like}
            ></button>
            <span>{likes}</span>
          </div>
        </div>

        <div className={cl.tags_wrap}>{tags}</div>
        <span className={cl.content_text}>{normalDesc(description)}</span>
      </div>

      <div className={cl.avatar_wrap}>
        <div className={cl.avatat_text}>
          <span className={cl.text_name}>{author.username}</span>
          <span className={cl.text_date}>{formattedDate}</span>
        </div>
        <img className={cl.img} src={author.image || img} alt="avatar" width={46} height={46} />
      </div>
    </li>
  )
}

export default ItemArticle
