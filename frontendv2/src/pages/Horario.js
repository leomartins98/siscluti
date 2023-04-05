import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, Form, Table, Button } from 'semantic-ui-react'
import {  DateTimeInput} from 'semantic-ui-calendar-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {format, parseISO} from 'date-fns'
import './Administrador.css'

export const Horario = () => {
    
    const {id} = useParams()
    const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3333/api/horario/${id}`)
      .then(response => {
        setHorarios(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <div>

      <br></br><h2>Horários do Professor</h2><br></br>
      
      <Table celled>
      <Table.Header>
      <Table.Row>
      <Table.HeaderCell>Id</Table.HeaderCell>
        <Table.HeaderCell>Hora de Início</Table.HeaderCell>
        <Table.HeaderCell>Horário Final</Table.HeaderCell>
        <Table.HeaderCell>Professor</Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
    {horarios.map(horario => (
            <Table.Row key={horario.idHorario}>
              <Table.Cell>{horario.idHorario}</Table.Cell>
              <Table.Cell>{format(parseISO(horario.horaInicio), "dd/MM/yyyy  --  HH:MM")}</Table.Cell>
              <Table.Cell>{format(parseISO(horario.horaFinal), "dd/MM/yyyy  --  HH:MM")}</Table.Cell>
              <Table.Cell>{horario.professor.nome}</Table.Cell>
              <Table.Cell textAlign='center'>
                <Link to={`/professor/${horario.professor.idProf}/update/${horario.idHorario}`}><Button color="green">Editar</Button></Link>
                <Link to={`/professor/${horario.professor.idProf}/horario/${horario.idHorario}`}><Button color='red'>Deletar</Button></Link></Table.Cell>
            </Table.Row>
          ))}
    </Table.Body>
    </Table>
    </div>
  );
}




export const AdicionarHorario = () => {
    
    const navigate = useNavigate()
    const {id} = useParams()

    const [horaInicio, setHoraInicio] = useState('');
    const [horaFinal, setHoraFinal] = useState('');

    const handleChangeInicio = (e, { value }) => {
        setHoraInicio(new Date(value));
      }

      const handleChangeFim = (e, { value }) => {
        setHoraFinal(new Date(value));
      }

    const CriarHorario = async (event) => {
      event.preventDefault();
      
       await axios.post("http://localhost:3333/api/horario", {
         horaInicio, horaFinal, profId: id
       }).then(res => {
         alert("Status "+res.status + ": Hora cadastrada!")
      }).catch(error => alert("Hora não cadastrada. "+error.response.data.msg))

      navigate(`/professor/${id}/horario`)

    }
  return (
    <Card centered>
      <Card.Content>
        <Card.Header textAlign='center'>Cadastrar Horário</Card.Header>
        <br></br>
        <Form onSubmit={(e) => CriarHorario(e)}>
          <Form.Field>
            <label>Hora Inicial</label>
            <DateTimeInput
                name="Hora de Início"
                dateFormat='YYYY/MM/DD'
                timeFormat='AMPM'
                placeholder="Hora do Início"
                value={horaInicio}
                iconPosition="left"
                onChange={handleChangeInicio}
                />
            </Form.Field>
            <Form.Field>
            <label>Hora Final</label>
            <DateTimeInput
                name="Hora de Início"
                dateFormat='YYYY/MM/DD'
                timeFormat='AMPM'
                placeholder="Hora Final"
                value={horaFinal}
                iconPosition="left"
                onChange={handleChangeFim}
                />
            </Form.Field>
          <center><Button align='center' type='submit'>Cadastrar Horário</Button></center>
        </Form>
      </Card.Content>
    </Card>
  );

}

export const UpdateHorario = () => {
    const navigate = useNavigate()
    const {idProf} = useParams()
    const {idHorario} = useParams()

    const [horaInicio, setHoraInicio] = useState('');
    const [horaFinal, setHoraFinal] = useState('');

    const handleChangeInicio = (e, { value }) => {
        setHoraInicio(new Date(value));
      }

      const handleChangeFim = (e, { value }) => {
        setHoraFinal(new Date(value));
      }

    const AtualizarHorario = async (event) => {
      event.preventDefault();
      
       await axios.put(`http://localhost:3333/api/horario/${idHorario}`, {
         horaInicio, horaFinal, profId: idProf
       }).then(res => {
         alert("Status "+res.status + ": Hora atualizada!")
      }).catch(error => alert("Não foi possível fazer a atualização. "+error.response.data.msg))

      navigate(`/professor/${idProf}/horario`)

    }
  return (
    <Card centered>
      <Card.Content>
        <Card.Header textAlign='center'>Atualizar Horário</Card.Header>
        <br></br>
        <Form onSubmit={(e) => AtualizarHorario(e)}>
        <Form.Field>
            <label>Hora Inicial</label>
            <DateTimeInput
                name="Hora de Início"
                dateFormat='YYYY/MM/DD'
                placeholder="Hora do Início"
                value={horaInicio}
                iconPosition="left"
                onChange={handleChangeInicio}
                />
            </Form.Field>
            <Form.Field>
            <label>Hora Final</label>
            <DateTimeInput
                name="Hora de Início"
                dateFormat='YYYY/MM/DD'
                placeholder="Hora Final"
                value={horaFinal}
                iconPosition="left"
                onChange={handleChangeFim}
                />
            </Form.Field>
          <center><Button align='center' type='submit'>Atualizar Horário</Button></center>
        </Form>
      </Card.Content>
    </Card>
  )
}

export const DeleteHorario = () => {
    const {idProf} = useParams()
    const {idHorario} = useParams()
  const navigate = useNavigate()

        axios.delete(`http://localhost:3333/api/horario/${idHorario}`)
        .then(res => {
          alert("Status "+res.status + ". Hora deletada com sucesso!")
          navigate(`/prof/${idProf}/horario`)})
        .catch(error => alert("Aluno não deletado. Status: "+error.response.data.msg))
        

  return (
    <></>
  )
}