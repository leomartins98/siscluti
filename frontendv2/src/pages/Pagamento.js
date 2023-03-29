import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, Form, Table, Button } from 'semantic-ui-react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Administrador.css'

export const Pagamento = () => {

    const [pagamentos, setPagamentos] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:3333/api/pagamento/')
        .then(response => {
          setPagamentos(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
  
    return (
      <div>
        <br></br><h2>Pagamentos</h2><br></br>
        
        <Table celled>
      <Table.Header>
        <Table.Row>
        <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Valor</Table.HeaderCell>
          <Table.HeaderCell>Tipo</Table.HeaderCell>
          <Table.HeaderCell>Aluno</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
  
      <Table.Body>
      {pagamentos.map(pagamento => (
              <Table.Row key={pagamento.idPagamento}>
                <Table.Cell>{pagamento.idPagamento}</Table.Cell>
                <Table.Cell>{pagamento.valor}</Table.Cell>
                <Table.Cell>{pagamento.tipo}</Table.Cell>
                <Table.Cell>{pagamento.aluno.nome}</Table.Cell>
                <Table.Cell textAlign='center'>
                  <Link to={`/pagamento/select/${pagamento.aluno.idAluno}`}><Button color="brown">Verificar Pendências</Button></Link>
                  <Link to={`/pagamento/update/${pagamento.idPagamento}`}><Button color="green">Editar Pagamento</Button></Link>
                  <Link to={`/pagamento/delete/${pagamento.idPagamento}`}><Button color='red'>Deletar</Button></Link></Table.Cell>
              </Table.Row>
            ))}
      </Table.Body>
      </Table>
      </div>
    );
  };

  export const SelectPagamento = () => {

    const [pagamentos, setPagamentos] = useState([]);
    const {id} = useParams()
    useEffect(() => {
      axios.get(`http://localhost:3333/api/pagamento/${id}`)
        .then(response => {
          setPagamentos(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

    return (
      <div>

        <br></br><h2>Pagamentos</h2><br></br>
        
        <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Aluno</Table.HeaderCell>
          <Table.HeaderCell>Valor</Table.HeaderCell>
          <Table.HeaderCell>Tipo</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
  
      <Table.Body>
      {pagamentos.map(pagamento => (
              <Table.Row key={pagamento.idPagamento}>
                <Table.Cell>{pagamento.aluno.nome}</Table.Cell>
                <Table.Cell>{pagamento.valor}</Table.Cell>
                <Table.Cell>{pagamento.tipo}</Table.Cell>
                <Table.Cell textAlign='center'>
                  <Link to={`/pagamento/${pagamento.idPagamento}`}><Button color="green">Efetuar Pagamento</Button></Link>
                </Table.Cell>
              </Table.Row>
            ))}
      </Table.Body>
      </Table>
      </div>
    );
  };

  export const AtualizaPagamento = () => {
    
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {  
        axios.put(`http://localhost:3333/api/pagamento/${id}`)
        .then(res => {
          alert("Status "+res.status + ": Pagamento efetuado com sucesso!")
          navigate('/pagamento')})
        .catch(error => alert("Pagamento não realizado. Motivo: "+error.response.data.msg))
        
  }, [])


  return (
    <></>
  )
  }









  export const EditaPagamento = () => {
    
    const navigate = useNavigate()  
      const {id} = useParams()
      const [opcoes, setOpcoes] = useState([])
      const [tipo, setTipo] = useState('');
      const [valor, setValor] = useState('');
      const [alunoId, setAlunoId] = useState();
      const [status, setStatus] = useState();

      const handleSubmit = async () => {
      
        await axios.put(`http://localhost:3333/api/pagamento/edit/${id}`, {
        valor, tipo, alunoId
    })
    .then(res => alert("Status "+res.status + ": Pagamento atualizado!"))
    .catch(error => alert("Erro ao atualizar pagamento. "+error.response.data.msg))
    
    navigate('/pagamento')
  }
  
      const handleChangeAluno = (e, { value }) => {
        setAlunoId(value);
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
    
      return (
        <Card centered>
          <Card.Content>
            <Card.Header textAlign='center'>Editar Pagamento</Card.Header>
            <br></br>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>Tipo</label>
                <input
                  placeholder="Tipo"
                  value={tipo}
                  onChange={(event) => setTipo(event.target.value)}
                />
                </Form.Field>
              
              <Form.Field >
                <label>Valor</label>
                <input
                type='number'
                  placeholder="Valor"
                  value={valor}
                  onChange={(event) => setValor(event.target.value)}
                />
              </Form.Field>
              <Form.Select
                fluid
                label='Aluno'
                options={opcoes}
                placeholder='Aluno'
                onChange={handleChangeAluno}
              />
              <center><Button align='center' type='submit'>Atualizar Pagamento</Button></center>
            </Form>
          </Card.Content>
        </Card>
      );
  }

  export const DeletePagamento = () => {
    const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {  
        axios.delete(`http://localhost:3333/api/pagamento/${id}`)
        .then(res => {
          alert("Status "+res.status + ": Pagamento deletado com sucesso!")
          navigate('/pagamento')})
        .catch(error => alert("Pagamento não deletado. Motivo: "+error.response.data.msg))
        
  }, [])


  return (
    <></>
  )
  }