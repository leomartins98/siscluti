import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, Form, Table, Button } from 'semantic-ui-react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Administrador.css'

export const Funcionario = () => {

  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3333/api/funcionario')
      .then(response => {
        setFuncionarios(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <br></br><h2>Funcionários</h2><Link to={`/funcionario/cadastro`}><Button className='btn' floated='right' color='blue'>Adicionar Funcionário</Button></Link><br></br>
      
      <Table celled>
      <Table.Header>
      <Table.Row>
      <Table.HeaderCell>Id</Table.HeaderCell>
        <Table.HeaderCell>Nome</Table.HeaderCell>
        <Table.HeaderCell>E-mail</Table.HeaderCell>
        <Table.HeaderCell>Salário</Table.HeaderCell>
        <Table.HeaderCell>Administrador</Table.HeaderCell>
        <Table.HeaderCell>Local</Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {funcionarios.map(funcionario => (
            <Table.Row key={funcionario.idFunc}>
              <Table.Cell>{funcionario.idFunc}</Table.Cell>
              <Table.Cell>{funcionario.nome}</Table.Cell>
              <Table.Cell>{funcionario.email}</Table.Cell>
              <Table.Cell>{funcionario.salario}</Table.Cell>
              <Table.Cell>{funcionario.administrador.nome}</Table.Cell>
              <Table.Cell>{funcionario.local.nome}</Table.Cell>
              <Table.Cell textAlign='center'>
                <Link to={`/funcionario/update/${funcionario.idFunc}`}><Button color="green">Editar</Button></Link>
                <Link to={`/funcionario/delete/${funcionario.idFunc}`}><Button color='red'>Deletar</Button></Link></Table.Cell>
            </Table.Row>
          ))}
    </Table.Body>
    </Table>
    </div>
  );
};






export const CadastroFuncionario = () => {

  const navigate = useNavigate()

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCPF] = useState('')
  const [salario, setSalario] = useState('');
  const [localId, setLocalId] = useState('')
  const [opcoes2, setOpcoes2] = useState([])

  const getLocal = () => {
    try {
      axios.get(`http://localhost:3333/api/local`).then( response => {
        const opcoesdoBanco = response.data.map(item => ({
          key: item.idLocal,
          text: item.nome,
          value: item.idLocal
        }))
        setOpcoes2(opcoesdoBanco)
        }).catch(error => {
          console.log(error)
        })
      } catch (error) {
          console.log(error)
      }
  }
  
    useEffect (() => {
    getLocal()
  }, [])

  const handleChangeLocal = (e, { value }) => {
    setLocalId(value);
  }

  let admId = 2

  const handleSubmit = async () => {
    await axios.post("http://localhost:3333/api/funcionario", {
      nome, email, senha, cpf, localId, admId, salario
  })
  .then(res => alert("Status "+res.status + ": Funcionário cadastrado!"))
  .catch(error => alert("Funcionário não cadastrado. "+error.response.data.msg))

    navigate('/funcionario')
  };

  return (
    <Card centered>
      <Card.Content>
        <Card.Header textAlign='center'>Novo Funcionário</Card.Header>
        <br></br>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Nome</label>
            <input
              placeholder="Nome"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>E-mail</label>
            <input
              placeholder="E-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>CPF</label>
            <input
              placeholder="CPF"
              value={cpf}
              onChange={(event) => setCPF(event.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Senha</label>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
            />
            </Form.Field>
            <Form.Field>
            <label>Salário</label>
            <input
              type="number"
              placeholder="Salário"
              value={salario}
              onChange={(event) => setSalario(event.target.value)}
            />
            </Form.Field>
            <Form.Field>
              <Form.Select
                fluid
                label='Local'
                options={opcoes2}
                placeholder='Local'
                onChange={handleChangeLocal}
              />
            </Form.Field>

          <center><Button align='center' type="submit">Enviar</Button></center>
        </Form>
      </Card.Content>
    </Card>
  );

}













export const UpdateFuncionario = () => {
    
    const navigate = useNavigate()
    const {id} = useParams()

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCPF] = useState('')
    const [salario, setSalario] = useState('');
    const [localId, setLocalId] = useState('')
    const [opcoes2, setOpcoes2] = useState([])

    const getFuncionario = async () => {
        try {
          const response = await axios.get(`http://localhost:3333/api/funcionario/${id}`);
          const data = response.data;
          setNome(data.nome);
          setEmail(data.email)
          setSenha(data.senha)
          setCPF(data.cpf)
          setSalario(data.salario)
          setLocalId(data.localId)
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getFuncionario();
      }, []);
  
    const getLocal = () => {
      try {
        axios.get(`http://localhost:3333/api/local`).then( response => {
          const opcoesdoBanco = response.data.map(item => ({
            key: item.idLocal,
            text: item.nome,
            value: item.idLocal
          }))
          setOpcoes2(opcoesdoBanco)
          }).catch(error => {
            console.log(error)
          })
        } catch (error) {
            console.log(error)
        }
    }
    
      useEffect (() => {
      getLocal()
    }, [])
  
    const handleChangeLocal = (e, { value }) => {
      setLocalId(value);
    }
  
    const handleSubmit = async () => {
      await axios.put(`http://localhost:3333/api/funcionario/${id}`, {
        nome, email, senha, cpf, localId, salario
    })
    .then(res => alert("Status "+res.status + ": Funcionário atualizado!"))
    .catch(error => alert("Funcionário não atualizado. "+error.response.data.msg))
  
      navigate('/funcionario')
    };
  
    return (
      <Card centered>
        <Card.Content>
          <Card.Header textAlign='center'>Novo Funcionário</Card.Header>
          <br></br>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Nome</label>
              <input
                placeholder="Nome"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>E-mail</label>
              <input
                placeholder="E-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>CPF</label>
              <input
                placeholder="CPF"
                value={cpf}
                onChange={(event) => setCPF(event.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Senha</label>
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
              />
              </Form.Field>
              <Form.Field>
              <label>Salário</label>
              <input
                type="number"
                placeholder="Salário"
                value={salario}
                onChange={(event) => setSalario(event.target.value)}
              />
              </Form.Field>
              <Form.Field>
                <Form.Select
                  fluid
                  label='Local'
                  options={opcoes2}
                  placeholder='Local'
                  onChange={handleChangeLocal}
                />
              </Form.Field>
  
            <center><Button align='center' type="submit">Enviar</Button></center>
          </Form>
        </Card.Content>
      </Card>
    );

}

















export const DeleteFuncionario = () => {

    
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {  
        axios.delete(`http://localhost:3333/api/funcionario/${id}`)
        .then(res => {
          alert("Status "+res.status + ". Funcionário deletado com sucesso!")
          navigate('/aluno')})
        .catch(error => alert("Funcionário não deletado. Status: "+error.response.data.msg))
  }, [])


  return (
    <></>
  )

}
