import { defineStore } from 'pinia'
import { useBlogPageHelpers } from '@/composables/useBlogPage'

export const useBlogStore = defineStore('blog', {
  state: () => {
    return { 
      title: '' as string, 
      category: [] as any[],
      tags: [] as any[],
      postsOriginal: [] as any[],
      postsRecent: [] as any [],
      pagination:{
        total: 1,
      }
    }
  },
  actions: {
    buildCategoriesAndTags() {
      const { convertToSlug } = useBlogPageHelpers();
      
      const convertToCapitalized = (str: string) => {
        if (!str) return ''
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
      }

      const categories: any[] = []
      const tags: any[] = []

      const pushIfNotExist = (list: any[], item: any, key: 'category' | 'tags') => {
        if (typeof item?.text !== 'string') return
        const slug = convertToSlug(item.text)
        const exist = list.find(
          (elm: any) => convertToSlug(elm.text) === slug || convertToSlug(elm._path) === slug
        )
        if (!exist) {
          list.push({
            text: convertToCapitalized(item.text),
            name: slug,
            open_new_tab: item?.open_new_tab,
            // Keep path relative as components prepend their own base path
            _path: `/${slug}`,
          })
        }
      }

      this.postsOriginal.forEach((post: any) => {
        if (Array.isArray(post.category) && post.category.length > 0) {
          post.category.forEach((item: any) => pushIfNotExist(categories, item, 'category'))
        }
        if (Array.isArray(post.tags) && post.tags.length > 0) {
          post.tags.forEach((item: any) => pushIfNotExist(tags, item, 'tags'))
        }
      })

      this.setCategoryPosts(categories)
      this.setTagPosts(tags)
    },
    setSearchBlog(value:string) {
      this.title = value
    },
    setPostsOriginal(value:any){
      this.postsOriginal = value
    },
    setPostsRecent(value:any){
      this.postsRecent = value
    },
    setTotalPaginationPosts(lengthPosts:any,itemsPerPage:number){
      this.pagination.total = Math.ceil((lengthPosts / itemsPerPage))
    },
    setCategoryPosts(value:any){
      this.category = value
    },
    setTagPosts(value:any){
      this.tags = value
    },
  },
})