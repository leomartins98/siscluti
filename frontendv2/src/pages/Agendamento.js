import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, Form, Table, Button } from 'semantic-ui-react'
import {  DateTimeInput } from 'semantic-ui-calendar-react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import './Administrador.css'
import {format, parseISO} from 'date-fns'

export const CadastroAgendamento = () => {

    const navigate = useNavigate()  
  
      const [opcoes, setOpcoes] = useState([])
      const [opcoes2, setOpcoes2] = useState([])
      const [horaInicioAgendamento, sethoraInicioAgendamento] = useState('');
      const [horaTerminoAgendamento, sethoraTerminoAgendamento] = useState('');
      const [alunoId, setAlunofId] = useState('');
      const [funcId, setFuncId] = useState('')

      function handleSubmit(event) {
        event.preventDefault();
        console.log(horaInicioAgendamento, horaTerminoAgendamento)
        axios.post('http://localhost:3333/api/agendamento',  {
            horaInicioAgendamento, horaTerminoAgendamento, alunoId, funcId
        }).then(res => alert("Status "+res.status + ": Agendamento submetido!"))
        .catch(error => alert("Agendamento não realizado. "+error.response.data.msg))

        navigate('/agendamento')
      }
  
      const handleChangeAluno = (e, { value }) => {
        setAlunofId(value);
      }
  
      const handleChangeFuncionario = (e, { value }) => {
        setFuncId(value);
      }
  
      const handleChangeInicio = (e, { value }) => {
        sethoraInicioAgendamento(new Date(value));
      }

      const handleChangeFim = (e, { value }) => {
        sethoraTerminoAgendamento(new Date(value));
      }
  
      const getAluno = () => {
        try {
          axios.get(`http://localhost:3333/api/aluno`).then( response => {
          const opcoesdoBanco = response.data.map(item => ({
            key: item.idAluno,
            text: item.nome,
            value: item.idAluno
          }))
          setOpcoes(opcoesdoBanco)
          }).catch(error => {
            console.log(error)
          })
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect (() => {
      getAluno()
      }, [])
  
  const getFuncionario = () => {
    try {
      axios.get(`http://localhost:3333/api/funcionario`).then( response => {
        const opcoesdoBanco = response.data.map(item => ({
          key: item.idFunc,
          text: item.nome,
          value: item.idFunc
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
    getFuncionario()
  }, [])
    
      return (
        <Card centered>
          <Card.Content>
            <Card.Header textAlign='center'>Novo Agendamento</Card.Header>
            <br></br>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
              <label>Hora de Início</label>
              <DateTimeInput
                name="Hora de Início"
                dateFormat='YYYY-MM-DD'
                placeholder="Hora do Início"
                value={horaInicioAgendamento}
                iconPosition="left"
                onChange={handleChangeInicio}
                />
                </Form.Field>
              
              <Form.Field >
                <label>Hora Final</label>
                <DateTimeInput
                  name="Hora Final"
                  dateFormat='YYYY-MM-DD'
                  placeholder="Hora do Final"
                  value={horaTerminoAgendamento}
                  iconPosition="left"
                  onChange={handleChangeFim}
                />
              </Form.Field>
              <Form.Select
                fluid
                label='Aluno'
                options={opcoes}
                placeholder='Aluno'
                onChange={handleChangeAluno}
              />
              <Form.Field>
                <Form.Select
                  fluid
                  label='Funcionário'
                  options={opcoes2}
                  placeholder='Funcionário'
                  onChange={handleChangeFuncionario}
                />
              </Form.Field>
              <center><Button align='center' type='submit'> Submeter Agendamento </Button></center>
            </Form>
          </Card.Content>
        </Card>
      );
    }

export const Agendamento = () => {
    
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3333/api/agendamento')
      .then(response => {
        setAgendamentos(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <br></br><h2>Agendamentos</h2><Link to={`/agendamento/cadastro`}><Button className='btn' floated='right' color='blue'>Adicionar agendamento</Button></Link><br></br>
      
      <Table celled>
      <Table.Header>
      <Table.Row>
      <Table.HeaderCell>Id</Table.HeaderCell>
        <Table.HeaderCell>Aluno</Table.HeaderCell>
        <Table.HeaderCell>Funcionário</Table.HeaderCell>
        <Table.HeaderCell>Horário de Início</Table.HeaderCell>
        <Table.HeaderCell>Horário de Término</Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {agendamentos.map(agendamento => (
            <Table.Row key={agendamento.idAgendamento}>
              <Table.Cell>{agendamento.idAgendamento}</Table.Cell>
              <Table.Cell>{agendamento.aluno.nome}</Table.Cell>
              <Table.Cell>{agendamento.funcionario.nome}</Table.Cell>
              <Table.Cell>{format(parseISO(agendamento.horaInicioAgendamento), "dd/MM/yyyy hh:mm")}</Table.Cell>
              <Table.Cell>{format(parseISO(agendamento.horaTerminoAgendamento), "dd/MM/yyyy hh:mm")}</Table.Cell>
              <Table.Cell textAlign='center'>
                <Link to={`/agendamento/update/${agendamento.idAgendamento}`}><Button color="green">Editar</Button></Link>
                <Link to={`/agendamento/delete/${agendamento.idAgendamento}`}><Button color='red'>Deletar</Button></Link></Table.Cell>
            </Table.Row>
          ))}
    </Table.Body>
    </Table>
    </div>
  );
}


export const UpdateAgendamento = () => {

        const navigate = useNavigate()  
        const {id} = useParams()
          const [opcoes, setOpcoes] = useState([])
          const [opcoes2, setOpcoes2] = useState([])
          const [horaInicioAgendamento, sethoraInicioAgendamento] = useState('');
          const [horaTerminoAgendamento, sethoraTerminoAgendamento] = useState('');
          const [alunoId, setAlunoId] = useState('');
          const [funcId, setFuncId] = useState('')

          const getAgendamento = async () => {
            try {
              const response = await axios.get(`http://localhost:3333/api/agendamento/${id}`);
              const data = response.data;
              sethoraInicioAgendamento(data.horaInicioAgendamento);
              sethoraTerminoAgendamento(data.horaTerminoAgendamento)
              setAlunoId(data.alunoId)
              setFuncId(data.funcId)
            } catch (error) {
              console.log(error);
            }
          };
        
          useEffect(() => {
            getAluno();
          }, []);

    
          function handleSubmit(event) {
            event.preventDefault();
            console.log(horaInicioAgendamento, horaTerminoAgendamento)
            axios.post('http://localhost:3333/api/agendamento',  {
                horaInicioAgendamento, horaTerminoAgendamento, alunoId, funcId
            }).then(res => alert("Status "+res.status + ": Agendamento submetido!"))
            .catch(error => alert("Agendamento não realizado. "+error.response.data.msg))
    
            navigate('/agendamento')
          }
      
          const handleChangeAluno = (e, { value }) => {
            setAlunoId(value);
          }
      
          const handleChangeFuncionario = (e, { value }) => {
            setFuncId(value);
          }
      
          const handleChangeInicio = (e, { value }) => {
            sethoraInicioAgendamento(new Date(value));
          }
    
          const handleChangeFim = (e, { value }) => {
            sethoraTerminoAgendamento(new Date(value));
          }
      
          const getAluno = () => {
            try {
              axios.get(`http://localhost:3333/api/aluno`).then( response => {
              const opcoesdoBanco = response.data.map(item => ({
                key: item.idAluno,
                text: item.nome,
                value: item.idAluno
              }))
              setOpcoes(opcoesdoBanco)
              }).catch(error => {
                console.log(error)
              })
            } catch (error) {
                console.log(error)
            }
        }
        
        useEffect (() => {
          getAluno()
          }, [])
      
      const getFuncionario = () => {
        try {
          axios.get(`http://localhost:3333/api/funcionario`).then( response => {
            const opcoesdoBanco = response.data.map(item => ({
              key: item.idFunc,
              text: item.nome,
              value: item.idFunc
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
        getFuncionario()
      }, [])
        
          return (
            <Card centered>
              <Card.Content>
                <Card.Header textAlign='center'>Novo Agendamento</Card.Header>
                <br></br>
                <Form onSubmit={handleSubmit}>
                  <Form.Field>
                  <label>Hora de Início</label>
                  <DateTimeInput
                    name="Hora de Início"
                    dateFormat='YYYY-MM-DD'
                    placeholder="Hora do Início"
                    value={horaInicioAgendamento}
                    iconPosition="left"
                    onChange={handleChangeInicio}
                    />
                    </Form.Field>
                  
                  <Form.Field >
                    <label>Hora Final</label>
                    <DateTimeInput
                      name="Hora Final"
                      dateFormat='YYYY-MM-DD'
                      placeholder="Hora do Final"
                      value={horaTerminoAgendamento}
                      iconPosition="left"
                      onChange={handleChangeFim}
                    />
                  </Form.Field>
                  <Form.Select
                    fluid
                    label='Aluno'
                    options={opcoes}
                    placeholder='Aluno'
                    onChange={handleChangeAluno}
                  />
                  <Form.Field>
                    <Form.Select
                      fluid
                      label='Funcionário'
                      options={opcoes2}
                      placeholder='Funcionário'
                      onChange={handleChangeFuncionario}
                    />
                  </Form.Field>
                  <center><Button align='center' type='submit'> Atualizar Agendamento </Button></center>
                </Form>
              </Card.Content>
            </Card>
          );
        }


export const DeleteAgendamento = () => {
    
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {  
        axios.delete(`http://localhost:3333/api/agendamento/${id}`)
        .then(res => {
          alert("Status "+res.status + ": Agendamento cancelado!")
          navigate('/agendamento')})
        .catch(error => alert("Não foi possível cancelar o agendamento. Status: "+error.response.data.msg))
        
  }, [])
  return (
    <></>
  )
}
  