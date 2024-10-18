import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Início',
    path: '/adm',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: 'Visualizar Alunos',
    path: '/aluno',
    icon: <IoIcons.IoMdPeople />,
  },
  {
    title: 'Visualizar Funcionários',
    path: '/funcionario',
    icon: <IoIcons.IoMdPeople />,
  },
  {
    title: 'Visualizar Professor',
    path: '/professor',
    icon: <IoIcons.IoMdPeople />,
  },
  {
    title: 'Agendamento',
    path: '/agendamento',
    icon: <FaIcons.FaCartPlus />
  },
  {
    title: 'Pagamentos',
    path: '/pagamento',
    icon: <IoIcons.IoIosPaper />
  },
  {
    title: 'Sair',
    path: '/logout',
  }
];