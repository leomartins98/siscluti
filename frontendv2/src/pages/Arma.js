import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, Form, Table, Button } from 'semantic-ui-react'
import {  DateInput } from 'semantic-ui-calendar-react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import './Administrador.css'

export const Arma = () => {
    
    const {id} = useParams()
    const [armas, setArmas] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3333/api/arma/${id}`)
      .then(response => {
        setArmas(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <div>

      <br></br><h2>Armas do aluno</h2><Link to={`/aluno/adicionar/arma/${id}`}><Button className='btn' floated='right' color='blue'>Adicionar Arma</Button></Link><br></br>
      
      <Table celled>
      <Table.Header>
      <Table.Row>
      <Table.HeaderCell>Id</Table.HeaderCell>
        <Table.HeaderCell>Nome</Table.HeaderCell>
        <Table.HeaderCell>Tipo</Table.HeaderCell>
        <Table.HeaderCell>Aluno</Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
    {armas.map(arma => (
            <Table.Row key={arma.id}>
              <Table.Cell>{arma.id}</Table.Cell>
              <Table.Cell>{arma.nome}</Table.Cell>
              <Table.Cell>{arma.tipo}</Table.Cell>
              <Table.Cell>{arma.aluno.nome}</Table.Cell>
              <Table.Cell textAlign='center'>
                <Link to={`/aluno/${arma.aluno.idAluno}/update/${arma.id}`}><Button color="green">Editar</Button></Link>
                <Link to={`/aluno/${arma.aluno.idAluno}/arma/${arma.id}`}><Button color='red'>Deletar</Button></Link></Table.Cell>
            </Table.Row>
          ))}
    </Table.Body>
    </Table>
    </div>
  );
}




export const AdicionarArma = () => {
    
    const navigate = useNavigate()
    const {id} = useParams()

    const [nomeArma, setNomeArma] = useState('');
    const [tipo, setTipo] = useState('');

    const CriarArma = async (event) => {
      event.preventDefault();
      
       await axios.post("http://localhost:3333/api/arma", {
         nomeArma, tipo, alunoId: id
       }).then(res => {
         alert("Status "+res.status + ": Arma cadastrada!")
      }).catch(error => alert("Arma não cadastrada. "+error.response.data.msg))

      navigate(`/aluno/${id}/armas`)

    }
  return (
    <Card centered>
      <Card.Content>
        <Card.Header textAlign='center'>Cadastrar Arma</Card.Header>
        <br></br>
        <Form onSubmit={(e) => CriarArma(e)}>
          <Form.Field>
            <label>Nome da Arma</label>
            <input
              placeholder="Nome da Arma..."
              value={nomeArma}
              onChange={(event) => setNomeArma(event.target.value)}
            />
            </Form.Field>
            <Form.Field>
            <label>Tipo da Arma</label>
            <input
              placeholder="Tipo da Arma..."
              value={tipo}
              onChange={(event) => setTipo(event.target.value)}
            />
            </Form.Field>
          <center><Button align='center' type='submit'>Cadastrar nova Arma</Button></center>
        </Form>
      </Card.Content>
    </Card>
  );

}

export const UpdateArma = () => {
    const navigate = useNavigate()
    const {idAluno} = useParams()
    const {idArma} = useParams()

    const [nomeArma, setNomeArma] = useState('');
    const [tipo, setTipo] = useState('');

    const CriarArma = async (event) => {
      event.preventDefault();
      
       await axios.put(`http://localhost:3333/api/arma/${idArma}`, {
         nomeArma, tipo
       }).then(res => {
         alert("Status "+res.status + ": Arma atualizada!")
      }).catch(error => alert("Não foi possível fazer a atualização. "+error.response.data.msg))

      navigate(`/aluno/${idAluno}/armas`)

    }
  return (
    <Card centered>
      <Card.Content>
        <Card.Header textAlign='center'>Atualizar Arma</Card.Header>
        <br></br>
        <Form onSubmit={(e) => CriarArma(e)}>
          <Form.Field>
            <label>Nome da Arma</label>
            <input
              placeholder="Nome da Arma..."
              value={nomeArma}
              onChange={(event) => setNomeArma(event.target.value)}
            />
            </Form.Field>
            <Form.Field>
            <label>Tipo da Arma</label>
            <input
              placeholder="Tipo da Arma..."
              value={tipo}
              onChange={(event) => setTipo(event.target.value)}
            />
            </Form.Field>
          <center><Button align='center' type='submit'>Cadastrar nova Arma</Button></center>
        </Form>
      </Card.Content>
    </Card>
  )
}

export const DeleteArma = () => {
    const {id} = useParams()
    const {idAluno} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
        axios.delete(`http://localhost:3333/api/arma/${id}`)
        .then(res => {
          alert("Status "+res.status + ". Arma deletada com sucesso!")
          
        .catch(error => alert("Aluno não deletado. Status: "+error.response.data.msg))
  }, [])
  navigate(`/aluno/${idAluno}/armas`)})

  return (
    <></>
  )
}