import _ from 'lodash';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
}
interface Action {
    setUser: (user: User) => void;
}

export const useMeStore = create<User & Action>()(persist((set) => ({
    _id: '',
    name: '',
    email: '',
    verified: false,
    createdAt: new Date(),
    updatedAt: new Date(),

    setUser : (user) => {
        set(user);
    }
    
}),{ name :"meStore", getStorage() {
    return localStorage;
},} ));

