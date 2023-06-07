import { defineStore } from 'pinia';
import storage from 'localstorage-slim';

type Session = {
    username: string,
    password: string,
    startingAmount: number,
    expireAt: Date,
    accessToken: String,
    id: String,
}

export const useSessionStore = defineStore('session', {
    state: () => {
        const session: Session = storage.get('session', {
            decrypt: true,
        }) || {
            username: '',
            password: '',
            startingAmount: 0,
            expireAt: new Date(),
            accessToken: '',
            id: '',
        }

        return {
            session: session,
        }
    },
    actions: {
        getLocal() {
            this.session = storage.get('session', {
                decrypt: true,
            });
        },
        clearLocal() {
            storage.remove('session');
        },
        setExpireToken() {
            const expireAt = new Date();
            expireAt.setDate(expireAt.getDate() + 7);
            storage.set('session', { ...this.session ,expireAt: expireAt });
            this.getLocal();
        },
        authenticate(username: string, password: string, startingAmount: number, accessToken: any, id: string) {
            storage.set('session', {
                username: username, 
                password: password, 
                startingAmount: startingAmount,
                accessToken: accessToken,
                id: id,
            });
            this.getLocal();
            this.setExpireToken();
        },
    },
    getters: {
        isAuthenticated(state) {
            this.getLocal();
            if(this.session){
                const expire = new Date(this.session.expireAt);
                const current = new Date();
                return !!this.session.username && expire > current;
            } else {
                return false;
            }
        }
    }
})
