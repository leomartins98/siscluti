import { createContext, useState, useEffect } from "react";
import axios from 'axios'

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {

    const [Users, setUsers] = useState()
    
    useEffect(() => {
        axios.get('http://localhost:3333/api/pessoa')
          .then(response => {
            setUsers(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

    const [user, setUser] = useState()
    

    useEffect (() => {
        const userToken = localStorage.getItem('user_token')
        const usersStorage = localStorage.getItem('user_db')

        if (userToken && usersStorage) {
            const hasUser = JSON.parse(usersStorage)?.filter(
                (user) => user.email === JSON.parse(userToken).email
            )

            if (hasUser) setUser(hasUser[0])

        }
    }, [])

    const signin = (email) => {
        localStorage.setItem('users_db', JSON.stringify(Users))
        const usersStorage = JSON.parse(localStorage.getItem('users_db'))
        
        const hasUser = usersStorage?.filter((user) => user.email === email)

        if (hasUser?.length) {
            if (hasUser[0].email === email) {
                const token = Math.random().toString(36).substring(2)
                const id = hasUser[0].id
                localStorage.setItem('user_token', JSON.stringify({id, email, token}))
                setUser({email})
                return
                
        } else {
            return "Email incorreto"
        } 
        } else {
            return "Usuário não cadastrado"
        }

    }

    const signout = () => {
        setUser(null)
        localStorage.removeItem('user_token')
    }

    return <AuthContext.Provider value={{user, signed: !!user, signin, signout}}>{children}</AuthContext.Provider> 

}