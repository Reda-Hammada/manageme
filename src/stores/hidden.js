import {defineStore} from 'pinia'

export const useHiddenStore = defineStore(
    'hidden', {
        state: () =>({
            isHidden:false,
        })
    }
)

