import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, Form, Table, Button } from 'semantic-ui-react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Administrador.css'

export const CadastroAdministrador = () => {

const navigate = useNavigate()

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [salario, setSalario] = useState('');

  const handleSubmit = async () => {

    await axios.post("http://localhost:3333/api/administrador", {
      nome, email, cpf, salario, senha
  })
  .then(res => alert("Status "+res.status + ": Administrador cadastrado!"))
  .catch(error => alert("Administrador não cadastrado. "+error.response.data.msg))

    navigate('/adm')
  };

  return (
    <Card centered>
      <Card.Content>
        <Card.Header textAlign='center'>Novo Administrador</Card.Header>
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
              onChange={(event) => setCpf(event.target.value)}
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
          <center><Button align='center' type="submit">Enviar</Button></center>
        </Form>
      </Card.Content>
    </Card>
  );
}

export const Administrador = () => {

  const [adms, setAdms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3333/api/administrador/')
      .then(response => {
        setAdms(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <br></br><h2>Administradores</h2><Link to={`/adm/cadastro`}><Button className='btn' floated='right' color='blue'>Adicionar Administrador</Button></Link><br></br>
      
      <Table celled>
    <Table.Header>
      <Table.Row>
      <Table.HeaderCell>Id</Table.HeaderCell>
        <Table.HeaderCell>Nome</Table.HeaderCell>
        <Table.HeaderCell>CPF</Table.HeaderCell>
        <Table.HeaderCell>E-mail</Table.HeaderCell>
        <Table.HeaderCell>Salário</Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {adms.map(adm => (
            <Table.Row key={adm.idAdm}>
              <Table.Cell>{adm.idAdm}</Table.Cell>
              <Table.Cell>{adm.nome}</Table.Cell>
              <Table.Cell>{adm.cpf}</Table.Cell>
              <Table.Cell>{adm.email}</Table.Cell>
              <Table.Cell>{adm.salario}</Table.Cell>
              <Table.Cell textAlign='center'>
                <Link to={`/adm/update/${adm.idAdm}`}><Button color="green">Editar</Button></Link>
                <Link to={`/adm/delete/${adm.idAdm}`}><Button color='red'>Deletar</Button></Link></Table.Cell>
            </Table.Row>
          ))}
    </Table.Body>
    </Table>
    </div>
  );
};

export const UpdateAdministrador = () => {

  
  const navigate = useNavigate()
  const [nome, setNome] = useState('');
  const {id} = useParams()
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [salario, setSalario] = useState('');

  const getAdm = async () => {
    try {
      const response = await axios.get(`http://localhost:3333/api/administrador/${id}`);
      const data = response.data;
      setNome(data.nome);
      setCpf(data.cpf);
      setEmail(data.email);
      setSenha(data.senha);
      setSalario(data.salario);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdm();
  }, []);


  const handleSubmit = async () => {
      
      await axios.put(`http://localhost:3333/api/administrador/${id}`, {
      nome, email, cpf, salario, senha
  })
  .then(res => alert("Status "+res.status + ": Administrador atualizado!"))
  .catch(error => alert("Erro ao atualizar administrador. "+error.response.data.msg))

    navigate('/adm')
  };

  return (
    <Card centered>
      <Card.Content>
        <Card.Header textAlign='center'>Novo Administrador</Card.Header>
        <br></br>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Nome</label>
            <input
              placeholder="Nome"
              value={nome || ""}
              onChange={(event) => setNome(event.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>CPF</label>
            <input
              placeholder="CPF"
              value={cpf || ""}
              onChange={(event) => setCpf(event.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>E-mail</label>
            <input
              placeholder="E-mail"
              value={email || ""}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Senha</label>
            <input
              type="password"
              placeholder="Senha"
              value={senha || ""}
              onChange={(event) => setSenha(event.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Salário</label>
            <input
              type="number"
              placeholder="Salário"
              value={salario || ""}
              onChange={(event) => setSalario(event.target.value)}
            />
          </Form.Field>
          <center><Button align='center' type="submit">Enviar</Button></center>
        </Form>
      </Card.Content>
    </Card>
  )
}

export const DeleteAdministrador = () => {

  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {  
        axios.delete(`http://localhost:3333/api/administrador/${id}`)
        .then(res => {
          alert("Status "+res.status + ": Administrador deletado com sucesso!")
          navigate('/adm')})
        .catch(error => alert("Administrador não deletado. Status: "+error.response.data.msg))
        
  }, [])
  return (
    <></>
  )
}