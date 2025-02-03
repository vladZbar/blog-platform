import cl from './SignUp.module.css'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { emailAction, passwordAction, usernameAction } from '../../store/usersReducer'
import { fetchSignUp } from '../../store/asynkActions/users'
import { useForm, SubmitHandler } from 'react-hook-form'

interface IFormInput {
  username: string
  email: string
  password: string
  repeatPassword: string
  agree: boolean
}

const SignUp = () => {
  const dispatch = useDispatch()
  const username = useSelector((state: any) => state.users.username)
  const email = useSelector((state: any) => state.users.email)
  const password = useSelector((state: any) => state.users.password)
  const err = useSelector((state: any) => state.users.err)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data)
    // @ts-ignore
    dispatch(fetchSignUp(data.username, data.email, data.password))
    dispatch(usernameAction(''))
    dispatch(emailAction(''))
    dispatch(passwordAction(''))

    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cl.signup_wrap}>
      <h2 className={cl.title}>Create new account</h2>
      <div className={cl.input_wrap}>
        <div className={cl.oneinput_wrap}>
          <span className={cl.inp_title}>Username</span>
          <input
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 3, message: 'Your password needs to be at least 3 characters.' },
              maxLength: { value: 20, message: 'Your password needs to be at not more 20 characters.' },
            })}
            defaultValue={username}
            className={cl.inp}
            type="text"
            placeholder="Username"
            style={{ border: errors.username ? '1px solid #F5222D' : '1px solid #D9D9D9' }}
          />

          {errors.username && <p className={cl.error_text}>{errors.username.message}</p>}
          {err.username && <p className={cl.error_text}>Username {err.username}</p>}
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
            defaultValue={email}
            className={cl.inp}
            type="text"
            autoComplete="email"
            placeholder="Email address"
            style={{ border: errors.email ? '1px solid #F5222D' : '1px solid #D9D9D9' }}
          />
          {errors.email && <p className={cl.error_text}>{errors.email.message}</p>}
          {err.email && <p className={cl.error_text}>Email {err.username}</p>}
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
            autoComplete="new-password"
            placeholder="Password"
            style={{ border: errors.password ? '1px solid #F5222D' : '1px solid #D9D9D9' }}
          />
          {errors.password && <p className={cl.error_text}>{errors.password.message}</p>}
        </div>

        <div className={cl.oneinput_wrap}>
          <span className={cl.inp_title}>Repeat Password</span>
          <input
            {...register('repeatPassword', {
              required: 'Please repeat your password',
              validate: (value) => value === watch('password') || 'Passwords must match',
            })}
            className={cl.inp}
            type="password"
            autoComplete="new-password"
            placeholder="Repeat Password"
            style={{ border: errors.repeatPassword ? '1px solid #F5222D' : '1px solid #D9D9D9' }}
          />
          {errors.repeatPassword && <p className={cl.error_text}>{errors.repeatPassword.message}</p>}
        </div>
      </div>

      <div className={cl.agree_wrap}>
        <input
          {...register('agree', { required: 'You must agree to the terms' })}
          className={cl.checkbox}
          type="checkbox"
        />
        <span>I agree to the processing of my personal information</span>
        {errors.agree && <p className={cl.error_text}>{errors.agree.message}</p>}
      </div>

      <div className={cl.create_wrap}>
        <button type="submit" className={cl.create_btn}>
          Create
        </button>
        <span className={cl.create_content}>
          Already have an account?{' '}
          <Link className={cl.link} to={'/sign-in'}>
            Sign In.
          </Link>{' '}
        </span>
      </div>
    </form>
  )
}

export default SignUp
