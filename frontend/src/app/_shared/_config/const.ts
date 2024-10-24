
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
            all: `chat/group/all`,
            currentUser : {
                byCurrentUserId: `chat/group/currentUser/byCurrentUserId`
            }
            
        },
    },
    
    product: {
        list: `product/list`,
        detail: `product/detail`
    }
}