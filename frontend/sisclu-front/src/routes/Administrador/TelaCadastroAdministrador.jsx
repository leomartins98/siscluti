import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import './TelaCadastroAdministrador.css';

function AdminForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const adm = {nome, email, senha, cpf, salario}
    const res = axios.post('http://localhost:3333/api/administrador', {
        body: adm
    }).then(res => alert("Status "+res.status + ": Administrador criado!"))
    .catch(error => alert("ADM não criado. Erro: "+error.msg))

  }

  return (
    <div className="admin-form-container d-flex align-items-center justify-content-center">
      <Form onSubmit={handleSubmit} className="admin-form">
        <Form.Group controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="cpf">
          <Form.Label>CPF</Form.Label>
          <Form.Control type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="salary">
          <Form.Label>Salário</Form.Label>
          <Form.Control type="text" value={salary} onChange={(e) => setSalary(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">Cadastrar</Button>
      </Form>
    </div>
  );
}

export default AdminForm;
