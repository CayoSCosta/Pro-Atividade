import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import React from 'react'
import AtividadeForm from './Components/AtividadeForm'
import AtividadeLista from './Components/AtividadeLista'

let initialState = [
  { id: 1, prioridade: '1', titulo: 'Título 1', descricao: 'Estudar .NET' },
  { id: 2, prioridade: '2', titulo: 'Título 2', descricao: 'Estudar REACT' },
  { id: 3, prioridade: '3', titulo: 'Título 3', descricao: 'Estudar ANGULAR' },
  { id: 4, prioridade: '0', titulo: 'Título 4', descricao: 'Juntar Tudo' }
]

function App() {
  const [index, setIndex] = useState(0)
  const [atividades, setAtividades] = useState(initialState)
  const [atividade, setAtividade] = useState({id: 0})

useEffect(() =>{
  atividades.length <= 0 ? setIndex(1) : 
  setIndex(Math.max.apply(Math, atividades.map(item => item.id)) + 1)
},[atividades])

  function addAtividade() {
    setAtividades([...atividades, { ...atividade, id: index }])
  }

  function cancelarAtividade(){
    setAtividade({id: 0})
  }

  function atualizarAtividade(ativ){
    setAtividades(atividades.map(item => item.id === ativ.id ? ativ : item))
    setAtividade({id: 0})
  }

  function deletarAtividades(id) {
    const filtro = atividades.filter(ativ => ativ.id !== id)
    setAtividades([...filtro])
  }

  function editarAtividades(id){
    const atividade = atividades.filter(ativ => ativ.id === id)
    setAtividade(atividade[0])
  }

  return (
    <>
      <AtividadeForm
        addAtividade={addAtividade}
        atualizarAtividade={atualizarAtividade}
        cancelarAtividade={cancelarAtividade}
        atividades={atividades}
        ativSelecionada={atividade}
      />
      <AtividadeLista 
        atividades={atividades}
        setAtividades={setAtividades}
        deletarAtividades={deletarAtividades}
        editarAtividades={editarAtividades}
      />
    </>
  )
}

export default App
