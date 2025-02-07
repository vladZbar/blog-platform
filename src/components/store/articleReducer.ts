interface ArticlesState {
  articles: any
  totalPage: number
  page: number
  currentSlug: string
  tags: any
  currentTag: string
  loading: boolean
  createTags: any[]
}

const initialState: ArticlesState = {
  articles: [],
  totalPage: 0,
  page: 1,
  currentSlug: '',
  // @ts-ignore
  tags: JSON.parse(localStorage.getItem('Current-article'))?.tagList || [],
  createTags: [],
  currentTag: '',
  loading: true,
}

const GET_ARTICLES = 'GET_ARTICLES'
const SET_PAGE = 'SET_PAGE'
const SET_SLUG = 'SET_SLUG'

const ADD_TAG = 'ADD_TAG'
const ADD_CREATE_TAG = 'ADD_CREATE_TAG'
const DELETE_TAG = 'DELETE_TAG'
const CHANGE_CURRENT_TAG = 'CHANGE_CURRENT_TAG'

const CREATE_ARTICLE = 'CREATE_ARTICLE'
const UPDATE_ARTICLE = 'UPDATE_ARTICLE'
const DELETE_ARTICLE = 'DELETE_ARTICLE'
const SET_LIKE = 'SET_LIKE'
const DELETE_LIKE = 'DELETE_LIKE'

export const articleReducer = (state = initialState, action: any): ArticlesState => {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: [...action.payload.articles],
        totalPage: action.payload.articlesCount,
        currentSlug: action.payload.articles[0].slug,
        loading: false,
      }
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      }
    case SET_SLUG:
      return {
        ...state,
        currentSlug: action.payload,
        // @ts-ignore
        tags: JSON.parse(localStorage.getItem('Current-article'))?.tagList || []
        
      }
    case ADD_TAG:
      return {
        ...state,
        tags: [...state.tags, action.payload],
        currentTag: '',
      }
    case ADD_CREATE_TAG:
      return {
        ...state,
        createTags: [...state.createTags, action.payload],
        currentTag: '',
      }
    case CHANGE_CURRENT_TAG:
      return {
        ...state,
        currentTag: action.payload,
      }
    case DELETE_TAG:
      return {
        ...state,
        tags: state.tags.filter((tag: any) => tag !== action.payload),
      }
    case CREATE_ARTICLE:
      return {
        ...state,
        tags: [],
      }
    case UPDATE_ARTICLE:
      return {
        ...state,
        tags: [],
      }
    case DELETE_ARTICLE:
      return {
        ...state,
      }
    case SET_LIKE:
      return {
        ...state,
        articles: state.articles.map((article: any) => {
          return article.slug === action.payload.slug ? action.payload : article
        }),
      }
    case DELETE_LIKE:
      return {
        ...state,
        articles: state.articles.map((article: any) => {
          return article.slug === action.payload.slug ? action.payload : article
        }),
      }
    default:
      return state
  }
}

export const getArticlesAction = (payload: any[]) => ({ type: GET_ARTICLES, payload })
export const setPageAction = (payload: number) => ({ type: SET_PAGE, payload })
export const setSlugAction = (payload: number) => ({ type: SET_SLUG, payload })
export const addTagAction = (payload: string) => ({ type: ADD_TAG, payload })
export const addCreateTagAction = (payload: string) => ({ type: ADD_CREATE_TAG, payload })
export const changeCurrentTagAction = (payload: string) => ({ type: CHANGE_CURRENT_TAG, payload })
export const deleteTagAction = (payload: string) => ({ type: DELETE_TAG, payload })
export const createAticleAction = () => ({ type: CREATE_ARTICLE })
export const updateAticleAction = () => ({ type: UPDATE_ARTICLE })
export const deleteArticleAction = () => ({ type: DELETE_ARTICLE })
export const setLikeAction = (payload: object) => ({ type: SET_LIKE, payload })
export const deleteLikeAction = (payload: object) => ({ type: SET_LIKE, payload })
