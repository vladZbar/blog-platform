import cl from './Profile.module.css'

import { useDispatch, useSelector } from 'react-redux'
import { emailAction, logOutAction, passwordAction, usernameAction } from '../../store/usersReducer'
import { useForm, SubmitHandler } from 'react-hook-form'
import { fetchUpdateUser } from '../../store/asynkActions/users'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

interface IFormInput {
  username: string
  email: string
  password: string
  img: string
}

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data)

    dispatch(fetchUpdateUser(data.email, data.username, data.bio, data.img, data.password))
    dispatch(usernameAction(''))
    dispatch(emailAction(''))
    dispatch(passwordAction(''))
    dispatch(logOutAction())
    localStorage.removeItem('user')

    reset()
    navigate('/sign-in')
  }

  const user = useSelector((state: any) => state.users.currentUser) || localStorage.getItem('user')

  useEffect(() => {
    if (!user) {
      navigate('/sign-in')
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cl.signup_wrap}>
      <h2 className={cl.title}>Edit Profile</h2>
      <div className={cl.input_wrap}>
        <div className={cl.oneinput_wrap}>
          <span className={cl.inp_title}>Username</span>
          <input
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 3, message: 'Your password needs to be at least 3 characters.' },
              maxLength: { value: 20, message: 'Your password needs to be at not more 20 characters.' },
            })}
            defaultValue={''}
            className={cl.inp}
            type="text"
            placeholder="Username"
            style={{ border: errors.username ? '1px solid #F5222D' : '1px solid #D9D9D9' }}
          />

          {errors.username && <p className={cl.error_text}>{errors.username.message}</p>}
        </div>

        <div className={cl.oneinput_wrap}>
          <span className={cl.inp_title}>Email address</span>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /(^[a-z][a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/,
                message: 'Email incorrect',
              },
            })}
            defaultValue={''}
            className={cl.inp}
            type="text"
            autoComplete="email"
            placeholder="Email address"
            style={{ border: errors.email ? '1px solid #F5222D' : '1px solid #D9D9D9' }}
          />
          {errors.email && <p className={cl.error_text}>{errors.email.message}</p>}
        </div>

        <div className={cl.oneinput_wrap}>
          <span className={cl.inp_title}>New password</span>
          <input
            {...register('password', {
              required: 'password is required',
              minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
              maxLength: { value: 40, message: 'Your password needs to be at not more 40 characters.' },
            })}
            defaultValue={''}
            className={cl.inp}
            type="password"
            autoComplete="new-password"
            placeholder="Password"
            style={{ border: errors.password ? '1px solid #F5222D' : '1px solid #D9D9D9' }}
          />
          {errors.password && <p className={cl.error_text}>{errors.password.message}</p>}
        </div>

        <div className={cl.oneinput_wrap}>
          <span className={cl.inp_title}>Avatar image (url)</span>
          <input
            {...register('img', {
              pattern: {
                value: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)(:[0-9]{1,5})?(\/[^\s]*)?$/,
                message: 'URL incorrect',
              },
            })}
            className={cl.inp}
            type="text"
            placeholder="Avatar image"
            style={{ border: errors.img ? '1px solid #F5222D' : '1px solid #D9D9D9' }}
            defaultValue={''}
          />
          {errors.img && <p className={cl.error_text}>{errors.img.message}</p>}
        </div>
      </div>

      <div className={cl.create_wrap}>
        <button type="submit" className={cl.create_btn}>
          Save
        </button>
      </div>
    </form>
  )
}

export default Profile
