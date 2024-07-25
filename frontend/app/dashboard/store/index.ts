import _ from 'lodash';
import { create } from 'zustand';

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

export const useMeStore = create<User & Action>((set) => ({
    _id: '',
    name: '',
    email: '',
    verified: false,
    createdAt: new Date(),
    updatedAt: new Date(),

    setUser : (user) => {
        set(user);
    }
    
}));

