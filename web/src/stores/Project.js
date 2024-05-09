import {defineStore} from 'pinia'
import {ref, computed, watch} from 'vue'
import mpServices from "../services/mpServices";

export const userProjectStore = defineStore('project', () => {
  //project 信息
  //对比项目列表
  //重构数据结构
  // id: {
  //     name: '',
  //         budgetData: '',
  //         itemsData:[],
  //         href: '',
  //         isMain: '',
  //
  // }
  const focusProjects = ref({})
  //获取关注项目名列表
  const focusProjectNames = computed(() => Object.values(focusProjects.value).map(x => x.name))
  const focusProjectIds = computed(() => Object.keys(focusProjects.value))
  const focusProjectItems = computed(()=>Object.values(focusProjects.value).map(x => x.itemsData))

  const allProjectBudgetDataDone = computed(() => {
    const allNotDoneProjectIds = focusProjectIds.value.filter(x => {
      return !focusProjects.value[x]['budgetData']
    })
    return allNotDoneProjectIds.length === 0 ? true : false
  })

  const updateFocusProjects = () => {
    //把当前的缓存清理从新负值，比加一堆判断靠谱
    focusProjects.value = {}
    mpServices.project('get_compare_project_list').then(ret => {
      ret.data.forEach(x => {
        //card data
        initProject(x)
      })
    })
  }
  const addFocusProject = (projectId) => {
    //
    if (focusProjects.value[projectId]) delete focusProjects.value[projectId]
    getProjectInfo(projectId).then(x=>initProject(x))
  }

  const deleteFocusProject = (projectId) => {
    delete focusProjects.value[projectId]
  }

  const initProject = (projectInfo) => {
    const itemsData = [
      {name: "项目", value: projectInfo.name},
      {name: "属主", value: projectInfo.author},
      {name: "项目ID", value: projectInfo.id},
      {name: "当前状态", value: projectInfo.status},
    ]
    focusProjects.value[projectInfo.id] = {
      name: projectInfo.name,
      budgetData: undefined,
      itemsData: itemsData,
    }
    getProjectBudgetData(projectInfo.id).then(data => {
      focusProjects.value[projectInfo.id]['budgetData'] = data
    })
  }

  //设置关注取消
  const setFocusProject = (projectId, opt) => {
    return mpServices.project('set_compare_project_id', {'project_id': projectId, 'opt': opt}).then(
      (ret) => {
        //状态修改成功，切换状态值
        //
        if (opt === "add") {
          addFocusProject(projectId)
        } else {
          deleteFocusProject(projectId)
        }
        return ret.status === 201 ? true : false
      }
    )
  }
  //是否关注
  const isFocusProject = (projectId) => {
    return mpServices.project('check_is_compare', {'project_id': projectId}).then(
      (ret) => {
        //状态修改成功，切换状态值
        return ret.data.status
      }
    )
  }

  //查询
  const searchProject = (queryString) => {
    return mpServices.project('get_list', {'project_name': queryString}).then(
      (ret) => {
        const filterList = ret.data.filter(x => {
          return x.name.toLowerCase().indexOf(queryString.toLowerCase()) != -1
        })
        return filterList
      })
  }

  const getProjectInfo = async (projectId) => {
    const ret = await mpServices.project('get_list', {'project_ids': projectId})
    return ret.data[0]
  }

  //获取项目详细数据

  const getProjectBudgetData = async (projectId) => {
    const ret = await mpServices.project('get_budget_summary', {'project_id': projectId})
    return ret.data
  }

  //项目别名
  const getAlias = (projectId) => {
    return mpServices.project('get_alias', {'project_id': projectId}).then(ret => {
      return ret.data
    })
  }

  const setAlias = (projectId, alias) => {
    return mpServices.project('set_alias', {'project_id': projectId, 'alias': alias}).then(ret => {
      return ret.status === 201 ? true : false
    })
  }

  return {
    focusProjectItems,
    updateFocusProjects,
    focusProjects,
    focusProjectNames,
    focusProjectIds,
    allProjectBudgetDataDone,
    setFocusProject,
    isFocusProject,
    searchProject,
    getAlias, setAlias
  }

})
