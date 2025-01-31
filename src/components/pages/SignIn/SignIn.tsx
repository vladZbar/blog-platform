import cl from './SignIn.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { emailAction, passwordAction } from '../../store/usersReducer'
import { fetchSignIn } from '../../store/asynkActions/users'

interface IFormInput {
  email: string
  password: string
}

const SignIn = () => {
  const dispatch = useDispatch()
  const email = useSelector((state: any) => state.users.email)
  const password = useSelector((state: any) => state.users.password)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data)

    dispatch(fetchSignIn(data.email, data.password))
    dispatch(emailAction(''))
    dispatch(passwordAction(''))

    reset()
    navigate('/articles')
  }

  // console.log(JSON.parse(localStorage.getItem('user')).username)
  // console.log(localStorage.removeItem('user'))
  // console.log(JSON.parse(localStorage.getItem('user'))

  // const test = () => {
  //   axios
  //     .post('https://blog-platform.kata.academy/api/users/login', {
  //       user: {
  //         email: 'qsadewertq@gmail.com',
  //         password: 'eunrodnem729ry',
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data.user)
  //     })
  // }
  // test()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cl.signup_wrap}>
      <h2 className={cl.title}>Sign In</h2>
      <div className={cl.input_wrap}>
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
            defaultValue={email}
            className={cl.inp}
            type="text"
            placeholder="Email address"
            style={{ border: errors.email ? '1px solid #F5222D' : '1px solid #D9D9D9' }}
            autoComplete="email"
          />
          {errors.email && <p className={cl.error_text}>{errors.email.message}</p>}
        </div>

        <div className={cl.oneinput_wrap}>
          <span className={cl.inp_title}>Password</span>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
              maxLength: { value: 40, message: 'Your password needs to be at not more 40 characters.' },
            })}
            defaultValue={password}
            className={cl.inp}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            style={{ border: errors.password ? '1px solid #F5222D' : '1px solid #D9D9D9' }}
          />
          {errors.password && <p className={cl.error_text}>{errors.password.message}</p>}
        </div>
      </div>

      <div className={cl.create_wrap}>
        <button type="submit" className={cl.create_btn}>
          Login
        </button>
        <span className={cl.create_content}>
          Don’t have an account?{' '}
          <Link className={cl.link} to={'/sign-up'}>
            Sign Up.
          </Link>{' '}
        </span>
      </div>
    </form>
  )
}

export default SignIn
