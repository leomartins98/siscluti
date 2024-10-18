import { useState } from "react"
import { Card, Form, Button } from 'semantic-ui-react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export const Login = () => {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()

    const AutenticaLogin = async() => {
        try {
            if (!email || !senha) {
                alert('Entre com um e-mail válido!')
                return
            }
    
            const {data:users} = await axios.get('http://localhost:3333/api/pessoa')
              
            for (let i = 0; i < users.length;i++) {
                if (email === users[i].email && senha === users[i].senha){
                    if (users[i].cargo === 1) {
                      localStorage.setItem('token', 'tokenparaadm');
                      // Redireciona para a página protegida
                      navigate('/adm');
                      return navigate('/adm')
                    }
                    else {
                      localStorage.setItem('token', 'tokenparaaluno');
                      navigate('/aluno');
                    }
                } 
            }
          
            alert('Usuário ou senha não encontrados!')

    
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Card centered>
          <Card.Content>
            <Card.Header textAlign='center'>Login</Card.Header>
            <br></br>
            <Form onSubmit={(e) => AutenticaLogin(e)}>
              <Form.Field>
                <label>E-mail</label>
                <input
                    type='email'
                  placeholder="E-mail"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                </Form.Field>
                <Form.Field>
                <label>Senha</label>
                <input
                    type='password'
                  placeholder="Senha"
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                />
                </Form.Field>
              <center><Button align='center' type='submit'>Acessar Conta</Button></center>
            </Form>
          </Card.Content>
        </Card>
      )
}

