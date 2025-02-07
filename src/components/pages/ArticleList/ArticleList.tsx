import { useDispatch, useSelector } from 'react-redux'
import ItemArticle from '../../ItemArticle/ItemArticle'
import cl from './ArticleList.module.css'
import { Pagination } from 'antd'
import { ConfigProvider } from 'antd'
import { fetchArticles } from '../../store/asynkActions/article'
import { useEffect } from 'react'
import { setPageAction } from '../../store/articleReducer'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const ArticleList = () => {
  const dispatch = useDispatch()
  const articles = useSelector((state: any) => state.article.articles)
  const pages = useSelector((state: any) => state.article.totalPage)
  const page = useSelector((state: any) => state.article.page)
  const loading = useSelector((state: any) => state.article.loading)

  // useEffect(() => {
  //   // @ts-ignore
  //   dispatch(fetchArticles())
  // }, [])

  console.log(articles)

  const handlePage = (page: any) => {
    dispatch(setPageAction(page))

    let offset = page > 1 ? page * 10 - 10 : 0
    // @ts-ignore
    dispatch(fetchArticles(offset))
  }

  const elements = articles.map((el: any) => {
    const { title, description, tagList, slug, createdAt, author, favoritesCount, body } = el

    return (
      <ItemArticle
        key={slug}
        title={title}
        description={description}
        tagList={tagList}
        createdAt={createdAt}
        author={author}
        favoritesCount={favoritesCount}
        slug={slug}
        // @ts-ignore
        body={body}
      />
    )
  })

  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemActiveBg: '#1890FF',
            itemBg: '#EBEEF3',
            colorPrimary: '#ffffff',
            colorPrimaryHover: '#ffffff',
          },
        },
      }}
    >
      <div className={cl.wrap_list}>
        {loading ? (
          <div style={{ marginBottom: '20px' }}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          </div>
        ) : (
          <>
            <ul className={cl.list_container}>{elements}</ul>
            <Pagination
              current={page}
              onChange={handlePage}
              defaultCurrent={1}
              total={pages}
              pageSize={10}
              showSizeChanger={false}
            />
          </>
        )}
      </div>
    </ConfigProvider>
  )
}

export default ArticleList
