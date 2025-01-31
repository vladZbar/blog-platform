import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import cl from './NewArticle.module.css'
import { useForm, SubmitHandler } from 'react-hook-form'
import { addTagAction, changeCurrentTagAction, deleteTagAction } from '../../store/articleReducer'
import { v4 as uuidv4 } from 'uuid'
import { fetchCreateArticle } from '../../store/asynkActions/article'

interface IFormInput {
  title: string
  desc: string
  text: string
}

const NewArticle = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state: any) => state.users.currentUser) || localStorage.getItem('user')
  const currentTag = useSelector((state: any) => state.article.currentTag)
  const tags = useSelector((state: any) => state.article.tags)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data, tags)
    // @ts-ignore
    dispatch(fetchCreateArticle(data.title, data.desc, data.text, tags))

    reset()
  }

  useEffect(() => {
    if (!user) {
      navigate('/sign-in')
    }
  }, [])

  const tagHandler = (e: any) => {
    dispatch(changeCurrentTagAction(e.target.value))
  }

  const addTag = () => {
    if (tags.includes(currentTag)) {
      console.log('такой тег уже есть')
    } else {
      dispatch(addTagAction(currentTag))
    }
  }

  const deleteTag = (tag: any) => {
    console.log(tag)
    dispatch(deleteTagAction(tag))
  }

  const clearText = () => {
    dispatch(changeCurrentTagAction(''))
  }

  const elements = tags.map((tag: any) => {
    return (
      <div key={uuidv4()} className={cl.tag_btn_wrap}>
        <input
          disabled
          value={tag}
          className={`${cl.inp} ${cl.inp_tag}`}
          type="text"
          placeholder="Tag"
          style={{ color: '#000' }}
        />
        <div onClick={() => deleteTag(tag)} className={cl.btn_delete}>
          Delete
        </div>
      </div>
    )
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cl.signup_wrap}>
      <h2 className={cl.title}>Create new article</h2>
      <div className={cl.input_wrap}>
        <div className={cl.oneinput_wrap}>
          <span className={cl.inp_title}>Title</span>
          <input
            {...register('title', {
              required: 'Title is required',
            })}
            className={cl.inp}
            type="text"
            placeholder="Title"
            style={{ border: errors.title ? '1px solid #F5222D' : '1px solid #D9D9D9' }}
            autoComplete="email"
          />
          {errors.title && <p className={cl.error_text}>{errors.title.message}</p>}
        </div>

        <div className={cl.oneinput_wrap}>
          <span className={cl.inp_title}>Short description</span>
          <input
            {...register('desc', {
              required: 'Description is required',
            })}
            className={cl.inp}
            type="text"
            placeholder="Short description"
            style={{ border: errors.desc ? '1px solid #F5222D' : '1px solid #D9D9D9' }}
          />
          {errors.desc && <p className={cl.error_text}>{errors.desc.message}</p>}
        </div>

        <div className={cl.oneinput_wrap}>
          <span className={cl.inp_title}>Text</span>
          <textarea
            {...register('text', {
              required: 'Text is required',
            })}
            className={`${cl.inp} ${cl.inp_text}`}
            placeholder="Text"
            style={{ border: errors.text ? '1px solid #F5222D' : '1px solid #D9D9D9' }}
          />
          {errors.text && <p className={cl.error_text}>{errors.text.message}</p>}
        </div>
      </div>

      <div className={cl.tags_wrap}>
        <div className={cl.oneinput_wrap}>
          <span className={cl.inp_title}>Tags</span>
          {elements}
          <div className={cl.tag_btn_wrap}>
            <input
              value={currentTag}
              onChange={tagHandler}
              className={`${cl.inp} ${cl.inp_tag}`}
              type="text"
              placeholder="Tag"
            />
            <div onClick={clearText} className={cl.btn_delete}>
              Delete
            </div>
            <div onClick={addTag} className={cl.btn_add}>
              Add tag
            </div>
          </div>
        </div>
      </div>

      <div className={cl.create_wrap}>
        <button type="submit" className={cl.create_btn}>
          Send
        </button>
      </div>
    </form>
  )
}

export default NewArticle
