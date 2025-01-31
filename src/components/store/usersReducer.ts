const initialState = {
  token: '',
  username: '',
  email: '',
  password: '',
  bio: '',
  image: '',
  auth: false,
  currentUser: null,
}

const SING_UP_USER = 'SING_UP_USER'
const SIGN_IN_USER = 'SIGN_IN_USER'
const LOG_OUT = 'LOG_OUT'
const USERNAME = 'USERNAME'
const EMAIL = 'EMAIL'
const PASSWORD = 'PASSWORD'
const UPDATE_USER = 'UPDATE_USER'

export const usersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SING_UP_USER:
      return {
        ...state,
        token: action.payload,
      }
    case SIGN_IN_USER:
      return {
        ...state,
        email: action.payload.email,
        token: action.payload.token,
        username: action.payload.username,
        auth: true,
        currentUser: action.payload,
      }
    case UPDATE_USER:
      return {
        ...state,
        auth: false,
        currentUser: null,
      }
    case LOG_OUT:
      return {
        ...state,
        currentUser: null,
      }
    case USERNAME:
      return {
        ...state,
        username: action.payload,
      }
    case EMAIL:
      return {
        ...state,
        email: action.payload,
      }
    case PASSWORD:
      return {
        ...state,
        password: action.payload,
      }

    default:
      return state
  }
}

export const signUpUserAction = (payload: string) => ({ type: SING_UP_USER, payload })
export const signInUserAction = (payload: object) => ({ type: SIGN_IN_USER, payload })
export const logOutAction = () => ({ type: LOG_OUT })
export const updateUserAction = () => ({ type: UPDATE_USER })
export const usernameAction = (payload: string) => ({ type: USERNAME, payload })
export const emailAction = (payload: string) => ({ type: EMAIL, payload })
export const passwordAction = (payload: string) => ({ type: PASSWORD, payload })
