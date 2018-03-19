export type User = {
    id: number | string | null,
    username: string | null
}

export interface State {
    user: User
}

export const initialState: State = {
    user: {
        id: null,
        username: null
    }
}