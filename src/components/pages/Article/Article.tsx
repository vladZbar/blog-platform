import { useDispatch, useSelector } from 'react-redux'
import cl from '../../ItemArticle/ItemArticle.module.css'
import classes from './Article.module.css'
import { v4 as uuidv4 } from 'uuid'
import { normalDesc, normalTag, normalTitle } from '../../../utils/utils'
import { format } from 'date-fns'
import Markdown from 'markdown-to-jsx'
import { useNavigate } from 'react-router-dom'
import type { PopconfirmProps } from 'antd'
import { Popconfirm } from 'antd'
import { fetchDeleteArticle, fetchDeleteLike, fetchSetLike } from '../../store/asynkActions/article'
// @ts-nocheck
const Article = () => {
  const articles = useSelector((state: any) => state.article.articles)
  const user = useSelector((state: any) => state.users.currentUser) || localStorage.getItem('user')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const id = useSelector((state: any) => state.article.currentSlug)
  const currentArticle = articles.slice(0, articles.length).filter((art: any) => art.slug === id)

  const { title, description, tagList, createdAt, author, favoritesCount, slug, body } =
    // @ts-ignore
    currentArticle[0] || JSON.parse(localStorage.getItem('Current-article'))
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
  console.log(author)

  const formattedDate = format(createdAt, 'MMMM d, yyyy')
  console.log(currentArticle)

  const confirm: PopconfirmProps['onConfirm'] = () => {
    // console.log(e)
    // message.success('Click on Yes')
    // @ts-ignore
    dispatch(fetchDeleteArticle(slug))
    navigate('/articles')
  }

  const cancel: PopconfirmProps['onCancel'] = () => {
    // console.log(e)
    // message.error('Click on No')
  }

  const handleLike = () => {
    if (user) {
      if (localStorage.getItem(slug) === 'true') {
        localStorage.setItem(slug, 'false')
        // @ts-ignore
        dispatch(fetchDeleteLike(slug))
      } else {
        localStorage.setItem(slug, 'true')
        // @ts-ignore
        dispatch(fetchSetLike(slug))
      }
    }
  }

  return (
    <div className={classes.container}>
      <li style={{ height: 'max-content', position: 'relative' }} className={cl.item}>
        <div className={cl.content_wrap}>
          <div className={cl.title_wrap}>
            {/* <h2 className={cl.title}></h2> */}
            <h2 className={cl.title}>{normalTitle(title)}</h2>

            <div className={cl.like_wrap}>
              <button
                onClick={handleLike}
                className={localStorage.getItem(slug) === 'true' && user ? cl.liked : cl.like}
              ></button>
              <span>{favoritesCount}</span>
            </div>

            <div style={{ minHeight: 'max-content', position: 'absolute', right: 15 }} className={cl.avatar_wrap}>
              <div className={cl.avatat_text}>
                <span className={cl.text_name}>{author.username}</span>
                <span className={cl.text_date}>{formattedDate}</span>

                {!user ? false : user.username === author.username ||
                // @ts-ignore
                JSON.parse(localStorage.getItem('user')).username === author.username ? (
                  <div className={classes.btn_wrap}>
                    <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this article?"
                      onConfirm={confirm}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                      placement={'right'}
                    >
                      <button className={classes.delete_btn}>Delete</button>
                    </Popconfirm>

                    <button onClick={() => {
                      // localStorage.setItem('Current-article')
                      navigate(`/articles/${slug}/edit`)
                      }} className={classes.edit_btn}>
                      Edit
                    </button>
                  </div>
                ) : (
                  false
                )}
              </div>
              <img className={cl.img} src={author.image} alt="avatar" width={46} height={46} />
            </div>
          </div>

          <div className={cl.tags_wrap}>{tags}</div>
          <span style={{ color: '#00000080' }} className={cl.content_text}>
            {normalDesc(description)}
          </span>
          <div className={classes.body_wrap}>
            <Markdown>{body}</Markdown>
          </div>
        </div>
      </li>
    </div>
  )
}

export default Article
