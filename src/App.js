import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import React from 'react'

let initialState = [
  { id: 1, prioridade: '1', titulo: 'Título 1', descricao: 'Estudar .NET' },
  {
    id: 2,
    prioridade: '2',
    titulo: 'Título 2',
    descricao: 'Estudar REACT'
  },
  {
    id: 3,
    prioridade: '3',
    titulo: 'Título 3',
    descricao: 'Estudar ANGULAR'
  },
  { id: 4, prioridade: '0', titulo: 'Título 4', descricao: 'Juntar Tudo' }
]

function App() {
  const [atividades, setAtividades] = useState(initialState)
  //jeito antigo de somar +1 id
  // let lastIndex = initialState.length - 1
  // let lastId = initialState[lastIndex].id
  // document.getElementById('id').innerText = lastId

  function addAtividade(e) {
    e.preventDefault()

      //jeito antigo de somar +1 id
    // let lastIndex = atividades.length - 1
    // let lastId = atividades[lastIndex].id
    // let newId = lastId + 1

    const atividade = {
      id: document.getElementById('id').value,
      prioridade: document.getElementById('prioridade').value,
      titulo: document.getElementById('titulo').value,
      descricao: document.getElementById('descricao').value
    }

    setAtividades([...atividades, { ...atividade }])
  }

  function prioridadeLabel(param) {
    switch (param) {
      case '1':
        return 'Baixa'
      case '2':
        return 'Normal'
      case '3':
        return 'Alta'
      default:
        return 'Não definido'
    }
  }

  function prioridadeStyle(param, icone) {
    switch (param) {
      case '1':
        return icone ? 'smile' : 'success'
      case '2':
        return icone ? 'meh' : 'dark'
      case '3':
        return icone ? 'frown' : 'warning'
      default:
        return 'Não definido'
    }
  }

  function deletarAtividades(id){
    const filtro = atividades.filter(ativ => ativ.id !== id)
    setAtividades([...filtro])
  }

  return (
    <>
      <form className="row g-3">
        <div className="col-md-6">
          <label className="form-label">ID:</label>
          <input
            id="id"
            type="text"
            className="form-control"
            disabled={true}
            value={Math.max.apply(Math, atividades.map((item) => item.id) ) +1}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Prioridade</label>
          <select id="prioridade" className="form-select">
            <option defaultValue="0">Selecionar...</option>
            <option value="1">Baixa</option>
            <option value="2">Normal</option>
            <option value="3">Alta</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Título:</label>
          <input id="titulo" type="text" className="form-control" />
        </div>
        <div className="col-md-6">
          <label className="form-label">Descrição:</label>
          <input id="descricao" type="text" className="form-control" />
        </div>
        <hr />
        <div className="col-12">
          <button className="btn btn-success" onClick={addAtividade}>
            + Atividade
          </button>
        </div>
      </form>

      <div className="mt-3">
        {atividades.map(ativ => (
          <div
            key={ativ.id}
            className={
              'card mb-2 shadow p-3 mb-5 bg-body rounded border-' +
              prioridadeStyle(ativ.prioridade)
            }
          >
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">
                  <span className="badge text-bg-secondary me-1">
                    {ativ.id}
                  </span>
                  - {ativ.titulo}
                </h5>
                <h6>
                  Prioridade:
                  <span
                    className={'ms-1 text-' + prioridadeStyle(ativ.prioridade)}
                  >
                    <i
                      className={
                        'me-1 far fa-' + prioridadeStyle(ativ.prioridade, true)
                      }
                    ></i>
                    {prioridadeLabel(ativ.prioridade)}
                  </span>
                </h6>
              </div>
              <p className="card-text">
                {ativ.id} - {ativ.descricao}
              </p>
              <div className="d-flex justify-content-end pt-2 border-top">
                <button className="btn btn-sm btn-outline-primary me-2">
                  <i className="fas fa-pen me-2"></i>
                  Editar
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => deletarAtividades(ativ.id)}>
                  <i className="fas fa-trash me-2"></i>
                  Deletar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
