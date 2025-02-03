import axios from 'axios'
import { signUpUserAction, signInUserAction, updateUserAction, errSignUpAction } from '../usersReducer'


export const fetchSignUp = (username: string, email: string, password: string) => {
  return (dispatch: Function) => {
    axios
      .post('https://blog-platform.kata.academy/api/users', {
        user: {
          username: username,
          email: email,
          password: password,
        },
      })
      .then((response) => {
        dispatch(signUpUserAction(response.data.user.token))
      })
      .catch((err) => {
        dispatch(errSignUpAction(err.response.data.errors))
        console.log(err.response.data.errors, 'ошибка при регистрации')
      })
  }
}

export const fetchSignIn = (email: string, password: string) => {
  return (dispatch: any) => {
    axios
      .post('https://blog-platform.kata.academy/api/users/login', {
        user: {
          email: email,
          password: password,
        },
      })
      .then((response) => {
        console.log(response.data.user)

        localStorage.setItem('user', JSON.stringify(response.data.user))
        dispatch(signInUserAction(response.data.user))
      })
      .catch((err) => {
        console.log(err.response.data.errors, 'ошибка при авторизации')
        dispatch(errSignUpAction(err.response.data.errors))
      })
  }
}

export const fetchUpdateUser = (email: string, username: string, bio: string, image: any = null, password: string) => {
  return (dispatch: Function) => {
    axios
      .put(
        'https://blog-platform.kata.academy/api/user',
        {
          user: {
            email: email,
            username: username,
            bio: bio,
            image: image,
            password: password,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') || 'default')?.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data)
        dispatch(updateUserAction())
      })
      .catch((err) => console.log(err.name, 'ошибка при обновлении юзера'))
  }
}
