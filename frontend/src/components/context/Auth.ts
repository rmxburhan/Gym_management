import {create} from 'zustand';

type AuthDataProps = {
    token? : string;
    user? : Object;
    setToken : (token : string) => void;
    setUser : (user : Object) => void
}

const useAuth = create<AuthDataProps>()((set) => ({
    token : "",
    user : undefined,
    setToken : (token) => set({token}),
    setUser : (user) => set({user}),
}))
export default useAuth;