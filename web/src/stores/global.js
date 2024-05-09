import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import mpServices from "../services/mpServices";

export const useGlobalStore = defineStore('counter', () => {
  const navList = ref([])
  const getNavList = () => {
    mpServices.global('get_nav_list').then(
      (ret) => {
        navList.value = ret.data.map(x=>({name:x.name,href:`${import.meta.env.VITE_MAIN_URL}/${x.href}`}))
      })
  }
  return {navList, getNavList}
})
