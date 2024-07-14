import {create} from 'zustand';

type AuthDataProps = {
    token? : string;
    user? : Object;
    setToken : (token : string) => void;
    setUser : (user : Object) => void;
    logout : () => void;
}

const useAuth = create<AuthDataProps>()((set) => ({
    token : "",
    user : undefined,
    setToken : (token) => {
        console.log("sebuah token",token)
        set({token})
        localStorage.setItem('token', token)
    },
    setUser : (user) => set({user}),
    logout : () => {
        set({user : undefined, token : undefined})
        localStorage.setItem('token', '')
    }
}))

export default useAuth;