
export const API_ENDPOINTS = {
    user: {
        signup: `api/user/signup`,
        login: `api/user/login`,
        all: `api/user/all`,
        current: `api/user/current`,
        byId: (id: string | number) => `api/user/${id}`
    },
    product: {
        list: `api/product/list`,
        detail: `api/product/detail`
    }
}