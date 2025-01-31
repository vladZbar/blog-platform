import axios from 'axios'


import {
  createAticleAction,
  deleteArticleAction,
  deleteLikeAction,
  getArticlesAction,
  setLikeAction,
  updateAticleAction,
} from '../articleReducer'

export const fetchArticles = (offset = 0) => {
  return (dispatch: any) => {
    axios
      .get(`https://blog-platform.kata.academy/api/articles?offset=${offset}&limit=10`)
      .then((response) => {
        const articles = response.data

        dispatch(getArticlesAction(articles))
      })
      .catch((err: any) => console.log(err.name, 'ошибка при получении статей'))
  }
}

console.log(1)

export const fetchCreateArticle = (title: string, description: string, body: string, tagList: any[] = []) => {
  return (dispatch: any) => {
    axios
      .post(
        'https://blog-platform.kata.academy/api/articles',
        {
          article: {
            title: title,
            description: description,
            body: body,
            tagList: tagList,
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
        dispatch(createAticleAction())
      })
      .catch((err) => console.log(err.name, 'ошибка при создании статьи'))
  }
}

export const fetchUpdateArticle = (
  title: string,
  description: string,
  body: string,
  tagList: any[] = [],
  slug: string
) => {
  return (dispatch: any) => {
    axios
      .put(
        `https://blog-platform.kata.academy/api/articles/${slug}`,
        {
          article: {
            title: title,
            description: description,
            body: body,
            tagList: tagList,
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
        dispatch(updateAticleAction())
      })
      .catch((err) => console.log(err.name, 'ошибка при обновлении статьи'))
  }
}

export const fetchDeleteArticle = (slug: string) => {
  return (dispatch: any) => {
    axios
      .delete(`https://blog-platform.kata.academy/api/articles/${slug}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') || 'default')?.token}`,
        },
      })
      // @ts-ignore
      .then((response: any) => {
        dispatch(deleteArticleAction())
      })
      .catch((err) => console.log(err.name, 'ошибка при удалении статьи'))
  }
}

export const fetchSetLike = (slug: string) => {
  return (dispatch: any) => {
    axios
      .post(
        `https://blog-platform.kata.academy/api/articles/${slug}/favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') || 'default')?.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.article)
        dispatch(setLikeAction(response.data.article))
      })
      .catch((err) => console.log(err.name, 'ошибка при лайке'))
  }
}

export const fetchDeleteLike = (slug: string) => {
  return (dispatch: any) => {
    axios
      .delete(`https://blog-platform.kata.academy/api/articles/${slug}/favorite`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') || 'default')?.token}`,
        },
      })
      .then((response) => {
        console.log(response.data.article)
        dispatch(deleteLikeAction(response.data.article))
      })
      .catch((err) => console.log(err.name, 'ошибка при снятии лайка'))
  }
}
