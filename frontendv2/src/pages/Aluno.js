import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, Form, Table, Button } from 'semantic-ui-react'
import {  DateInput } from 'semantic-ui-calendar-react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import './Administrador.css'
import {format, parseISO} from 'date-fns'

export const Aluno = () => {

  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3333/api/aluno')
      .then(response => {
        setAlunos(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <br></br><h2>Alunos</h2><Link to={`/aluno/cadastro`}><Button className='btn' floated='right' color='blue'>Adicionar Aluno</Button></Link><br></br>
      
      <Table celled>
      <Table.Header>
      <Table.Row>
      <Table.HeaderCell>Id</Table.HeaderCell>
        <Table.HeaderCell>Nome</Table.HeaderCell>
        <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
        <Table.HeaderCell>Professor</Table.HeaderCell>
        <Table.HeaderCell>Local</Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {alunos.map(aluno => (
            <Table.Row key={aluno.idAluno}>
              <Table.Cell>{aluno.idAluno}</Table.Cell>
              <Table.Cell>{aluno.nome}</Table.Cell>
              <Table.Cell>{format(parseISO(aluno.nasc), "dd/MM/yyyy")}</Table.Cell>
              <Table.Cell>{aluno.professor.nome}</Table.Cell>
              <Table.Cell>{aluno.local.nome}</Table.Cell>
              <Table.Cell textAlign='center'>
                <Link to={`/aluno/update/${aluno.idAluno}`}><Button color="green">Editar</Button></Link>
                <Link to={`/aluno/delete/${aluno.idAluno}`}><Button color='red'>Deletar</Button></Link></Table.Cell>
            </Table.Row>
          ))}
    </Table.Body>
    </Table>
    </div>
  );
};














export const CadastroAluno = () => {

  const navigate = useNavigate()  

    const [opcoes, setOpcoes] = useState([])
    const [opcoes2, setOpcoes2] = useState([])
    const [nome, setNome] = useState('');
    const [nasc, setNasc] = useState('');
    const [profId, setprofId] = useState();
    const [localId, setLocalId] = useState('')
  
    function handleSubmit(event) {
      event.preventDefault();
      navigate(`/aluno/cadastro/armas?nome=${nome}&nasc=${nasc}&profId=${profId}&localId=${localId}`);
    }

    const handleChangeProfesor = (e, { value }) => {
      setprofId(value);
    }

    const handleChangeLocal = (e, { value }) => {
      setLocalId(value);
    }

    const handleChangeData = (e, { value }) => {
      setNasc(value);
    }

    const getProfessor = () => {
      try {
        axios.get(`http://localhost:3333/api/professor`).then( response => {
        const opcoesdoBanco = response.data.map(item => ({
          key: item.idProf,
          text: item.nome,
          value: item.idProf
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
    getProfessor()
    }, [])

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
  
    return (
      <Card centered>
        <Card.Content>
          <Card.Header textAlign='center'>Novo Aluno</Card.Header>
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
            
            <Form.Field >
              <label>Data de Nascimento</label>
              <DateInput
                name="date"
                dateFormat='YYYY-MM-DD'
                placeholder="Date"
                value={nasc}
                iconPosition="left"
                onChange={handleChangeData}
        />
            </Form.Field>
            <Form.Select
              fluid
              label='Professor'
              options={opcoes}
              placeholder='Professor'
              onChange={handleChangeProfesor}
            />
            <Form.Field>
              <Form.Select
                fluid
                label='Local'
                options={opcoes2}
                placeholder='Local'
                onChange={handleChangeLocal}
              />
            </Form.Field>
            <center><Button align='center' type='submit'>Cadastrar Armas</Button></center>
          </Form>
        </Card.Content>
      </Card>
    );
  }












  export const CadastroArma = ({dadosAluno}) => {
    const navigate = useNavigate()
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const nome = params.get('nome');
    const dataNasc = params.get('nasc');

    const nasc = new Date(dataNasc)

    const professorId = params.get('profId')
    const localId = params.get('localId')
    const [nomeArma, setNomeArma] = useState('');
    const [tipo, setTipo] = useState('');
    let alunoId 

    const CriarAluno = async (event) => {
      event.preventDefault();

      await axios.post("http://localhost:3333/api/aluno", {
        nome, nasc, professorId, localId
      })
      .then(res => {
        alunoId = res.data.newAluno.idAluno        
        console.log("Status "+res.status + ": Aluno cadastrado!")
       } )
      .catch(error => {
        alert("Aluno não cadastrado. "+error.response.data.msg)
        navigate('/aluno')
      })
      
       await axios.post("http://localhost:3333/api/arma", {
         nomeArma, tipo, alunoId
       }).then(res => {
         alert("Status "+res.status + ": Aluno cadastrado!")
      }).catch(error => alert("Aluno não cadastrado. "+error.response.data.msg))

      navigate('/aluno')

    }
  return (
    <Card centered>
      <Card.Content>
        <Card.Header textAlign='center'>Cadastrar Arma</Card.Header>
        <br></br>
        <Form onSubmit={(e) => CriarAluno(e)}>
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
          <center><Button align='center' type='submit'>Cadastrar novo Aluno</Button></center>
        </Form>
      </Card.Content>
    </Card>
  );

  }










  




















  export const UpdateAluno = () => {

    const navigate = useNavigate()  
      const {id} = useParams()
      const [opcoes, setOpcoes] = useState([])
      const [opcoes2, setOpcoes2] = useState([])
      const [nome, setNome] = useState('');
      const [nasc, setNasc] = useState('');
      const [profId, setprofId] = useState();
      const [localId, setLocalId] = useState('')
    
      const getAluno = async () => {
        try {
          const response = await axios.get(`http://localhost:3333/api/aluno/${id}`);
          const data = response.data;
          setNome(data.nome);
          setNasc(data.nasc)
          setprofId(data.profId)
          setLocalId(data.localId)
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getAluno();
      }, []);

      const handleSubmit = async () => {
      
        await axios.put(`http://localhost:3333/api/aluno/${id}`, {
        nome, nasc, profId, localId
    })
    .then(res => alert("Status "+res.status + ": Aluno atualizado!"))
    .catch(error => alert("Erro ao atualizar aluno. "+error.response.data.msg))
    
    navigate('/aluno')
  }
  
      const handleChangeProfesor = (e, { value }) => {
        setprofId(value);
      }
  
      const handleChangeLocal = (e, { value }) => {
        setLocalId(value);
      }
  
      const handleChangeData = (e, { value }) => {
        setNasc(new Date(value));
      }
  
      const getProfessor = () => {
        try {
          axios.get(`http://localhost:3333/api/professor`).then( response => {
          const opcoesdoBanco = response.data.map(item => ({
            key: item.idProf,
            text: item.nome,
            value: item.idProf
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
      getProfessor()
      }, [])
  
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
    
      return (
        <Card centered>
          <Card.Content>
            <Card.Header textAlign='center'>Novo Aluno</Card.Header>
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
              
              <Form.Field >
                <label>Data de Nascimento</label>
                <DateInput
                  name="date"
                  dateFormat='YYYY-MM-DD'
                  placeholder="Date"
                  value={nasc}
                  iconPosition="left"
                  onChange={handleChangeData}
          />
              </Form.Field>
              <Form.Select
                fluid
                label='Professor'
                options={opcoes}
                placeholder='Professor'
                onChange={handleChangeProfesor}
              />
              <Form.Field>
                <Form.Select
                  fluid
                  label='Local'
                  options={opcoes2}
                  placeholder='Local'
                  onChange={handleChangeLocal}
                />
              </Form.Field>
              <center><Button align='center' type='submit'>Atualizar Aluno</Button></center>
            </Form>
          </Card.Content>
        </Card>
      );
    }







export const DeleteAluno = () => {

  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {  
        axios.delete(`http://localhost:3333/api/aluno/${id}`)
        .then(res => {
          alert("Status "+res.status + ". Aluno deletado com sucesso!")
          navigate('/aluno')})
        .catch(error => alert("Aluno não deletado. Status: "+error.response.data.msg))
  }, [])


  return (
    <></>
  )
}