import { defineStore } from 'pinia';
import { store } from '@/store';
import { ref, Ref } from 'vue';
import { filter } from 'xe-utils';

interface BugItem {
  owner: string;
  group: string;
  depart: string;
  mod: string;
  status: string;
  type: string;
  issueTyp: string;
  herf: string;
}
interface BugFilterItem {
  name: string;
  value: string;
}
interface ProjectBug {
  bugList: BugItem[];
  bugFilter: BugFilterItem[];
}

export const useProjectBugStore = defineStore({
  id: 'projectBug',
  state: (): ProjectBug => ({
    bugList: [],
    bugFilter: [],
  }),
  getters: {
    getBugFilter(state): BugFilterItem[] {
      return state.bugFilter;
    },
  },
  actions: {
    setBugFilter(filter: BugFilterItem[]) {
      this.bugFilter.splice(0, this.bugFilter.length);
      filter.forEach((x) => {
        this.bugFilter.push(x);
      });
    },
    clearBugFilter() {
      this.bugFilter.splice(0, this.bugFilter.length);
    },
    addBugFilter(filter: BugFilterItem) {
      if (this.bugFilter.some(({ name }) => name === filter.name)) {
        this.bugFilter.forEach((x) => {
          if (x.name === filter.name) x.value = filter.value;
        });
      } else {
        this.bugFilter.push(filter);
      }
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useProjectBugStore(store);
}
