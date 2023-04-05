import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Administrador, CadastroAdministrador, UpdateAdministrador, DeleteAdministrador} from './pages/Administrador';
import { Aluno, CadastroAluno, CadastroArma, UpdateAluno, DeleteAluno } from './pages/Aluno';
import {  Funcionario, CadastroFuncionario, UpdateFuncionario, DeleteFuncionario } from './pages/Funcionario';
import {  Professor, CadastroProfessor, UpdateProfessor, DeleteProfessor } from './pages/Professor';
import {Agendamento, CadastroAgendamento, UpdateAgendamento, DeleteAgendamento  } from './pages/Agendamento'
import {Pagamento, SelectPagamento, EditaPagamento, AtualizaPagamento, DeletePagamento} from './pages/Pagamento'
import {Arma, AdicionarArma, UpdateArma, DeleteArma} from './pages/Arma'
import {Login} from './pages/Login'

import { Horario, AdicionarHorario, UpdateHorario, DeleteHorario } from './pages/Horario';

import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/login" element={<Login />} />      
        <Route path="/adm" element={<Administrador />} />
        <Route path='/adm/cadastro' element={<CadastroAdministrador />} />
        <Route path='/adm/update/:id' element={<UpdateAdministrador />} />
        <Route path='/adm/delete/:id' element={<DeleteAdministrador />} />

        <Route path='/aluno' element={<Aluno />} />
        <Route path='/aluno/cadastro' element={<CadastroAluno />} />
        <Route path='/aluno/update/:id' element={<UpdateAluno />} />
        <Route path='/aluno/delete/:id' element={<DeleteAluno />} />

        <Route path='/aluno/:id/armas' element={<Arma /> } />
        <Route path='/aluno/cadastro/armas' element={<CadastroArma /> } />
        <Route path='/aluno/adicionar/arma/:id' element={<AdicionarArma /> } />
        <Route path='/aluno/:idAluno/update/:idArma' element={<UpdateArma /> } />
        <Route path='/aluno/:idAluno/arma/:id' element={<DeleteArma /> } />        

        <Route path='/funcionario' element={<Funcionario />} />
        <Route path='/funcionario/cadastro' element={<CadastroFuncionario />} />
        <Route path='/funcionario/update/:id' element={<UpdateFuncionario />} />
        <Route path='/funcionario/delete/:id' element={<DeleteFuncionario />} />

        <Route path='/professor' element={<Professor />} />
        <Route path='/professor/cadastro' element={<CadastroProfessor />} />
        <Route path='/professor/update/:id' element={<UpdateProfessor />} />
        <Route path='/professor/delete/:id' element={<DeleteProfessor />} />

        <Route path='/professor/:id/horario' element={<Horario /> } />
        <Route path='/professor/adicionarhorario/:id' element={<AdicionarHorario />} />
        <Route path='/professor/:idProf/update/:idHorario' element={<UpdateHorario />} />
        <Route path='/professor/:idProf/horario/:idHorario' element={<DeleteHorario />} />

        <Route path='/agendamento' element={<Agendamento />} />
        <Route path='/agendamento/cadastro' element={<CadastroAgendamento />} />
        <Route path='/agendamento/update/:id' element={<UpdateAgendamento />} />
        <Route path='/agendamento/delete/:id' element={<DeleteAgendamento />} />

        <Route path='/pagamento' element={<Pagamento />} />
        <Route path='/pagamento/select/:id' element={<SelectPagamento />} />
        <Route path='/pagamento/update/:id' element={<EditaPagamento />} />
        <Route path='/pagamento/:id' element={<AtualizaPagamento />} />
        <Route path='/pagamento/delete/:id' element={<DeletePagamento />} />

      </Routes>
    </Router>
  );
}

export default App;