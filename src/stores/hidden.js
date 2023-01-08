import {defineStore} from 'pinia'

export default defineStore(
    'hidden', {
        state: () =>({
            isHidden: false,
        }),
    }
);

