import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, Form, Table, Button } from 'semantic-ui-react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Administrador.css'

export const Professor = () => {

    const [professores, setProfessores] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:3333/api/professor')
        .then(response => {
          setProfessores(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
  
    return (
      <div>
        <br></br><h2>Professores</h2><Link to={`/professor/cadastro`}><Button className='btn' floated='right' color='blue'>Adicionar Professor</Button></Link><br></br>
        
        <Table celled>
        <Table.Header>
        <Table.Row>
        <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Nome</Table.HeaderCell>
          <Table.HeaderCell>Salário</Table.HeaderCell>
          <Table.HeaderCell>Local</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>Horários</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
  
      <Table.Body>
      {professores.map(professor => (
              <Table.Row key={professor.idProf}>
                <Table.Cell>{professor.idProf}</Table.Cell>
                <Table.Cell>{professor.nome}</Table.Cell>
                <Table.Cell>{professor.salario}</Table.Cell>
                <Table.Cell>{professor.local.nome}</Table.Cell>
                <Table.Cell textAlign='center'>
                    <Link to={`/professor/adicionarhorario/${professor.idProf}`}><Button color="blue">Adicionar Horário</Button></Link>
                    <Link to={`/professor/${professor.idProf}/horario`}><Button color="grey">Visualizar Horários</Button></Link>
                </Table.Cell>
                <Table.Cell textAlign='center'>
                <Link to={`/professor/update/${professor.idProf}`}><Button color="green">Editar</Button></Link>
                  <Link to={`/professor/delete/${professor.idProf}`}><Button color='red'>Deletar</Button></Link>
                </Table.Cell>
              </Table.Row>
            ))}
      </Table.Body>
      </Table>
      </div>
    );
  }

  export const CadastroProfessor = () => {
    const navigate = useNavigate()

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
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


  const handleSubmit = async () => {
    await axios.post("http://localhost:3333/api/professor", {
      nome, email, cpf, localId, salario
  })
  .then(res => alert("Status "+res.status + ": Professor cadastrado!"))
  .catch(error => alert("Professor não cadastrado. "+error.response.data.msg))

    navigate('/professor')
  };

  return (
    <Card centered>
      <Card.Content>
        <Card.Header textAlign='center'>Novo Professor</Card.Header>
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

  export const UpdateProfessor = () => {

    const navigate = useNavigate()
    const {id} = useParams()

  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('')
  const [salario, setSalario] = useState('');
  const [localId, setLocalId] = useState('')
  const [opcoes2, setOpcoes2] = useState([])

  const getProfessor = async () => {
    try {
      const response = await axios.get(`http://localhost:3333/api/professor/${id}`);
      const data = response.data;
      setNome(data.nome);
      setCPF(data.cpf)
      setSalario(data.salario)
      setLocalId(data.localId)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfessor();
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
    await axios.put(`http://localhost:3333/api/professor/${id}`, {
      nome, cpf, localId, salario
  })
  .then(res => alert("Status "+res.status + ": Professor atualizado!"))
  .catch(error => alert("Professor não atualizado. "+error.response.data.msg))

    navigate('/professor')
  };

  return (
    <Card centered>
      <Card.Content>
        <Card.Header textAlign='center'>Novo Professor</Card.Header>
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
            <label>CPF</label>
            <input
              placeholder="CPF"
              value={cpf}
              onChange={(event) => setCPF(event.target.value)}
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

          <center><Button align='center' type="submit">Atualizar</Button></center>
        </Form>
      </Card.Content>
    </Card>
  );
  }

  export const DeleteProfessor = () => {
        
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {  
        axios.delete(`http://localhost:3333/api/professor/${id}`)
        .then(res => {
          alert("Status "+res.status + ". Professor deletado com sucesso!")
          navigate('/professor')})
        .catch(error => alert("Professor não deletado. Status: "+error.response.data.msg))
  }, [])


  return (
    <></>
  )
  }