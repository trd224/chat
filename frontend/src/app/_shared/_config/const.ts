
export const API_ENDPOINTS = {
    user: {
        signup: `user/signup`,
        login: `user/login`,
        all: `user/all`,
        current: `user/current`,
        byId: (id: string | number) => `user/${id}`
    },
    chat: {
        group: {
            all: `chat/group/all`
        },
    },
    
    product: {
        list: `product/list`,
        detail: `product/detail`
    }
}