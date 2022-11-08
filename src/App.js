import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import React from 'react'

let initialState = [
  { id: 1, descricao: 'Estudar .NET' },
  { id: 2, descricao: 'Estudar REACT' },
  { id: 3, descricao: 'Estudar ANGULAR' },
  { id: 4, descricao: 'Juntar Tudo' }
]

function App() {
  const [atividades, setAtividades] = useState(initialState)

  function addAtividade(e) {
    e.preventDefault()

    const atividade = {
      id: document.getElementById('id').value,
      descricao: document.getElementById('descricao').value
    }

    console.log(atividade)
    setAtividades([...atividades, { ...atividade }])
  }

  return (
    <>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="id" className="form-label">
            ID:
          </label>
          <input id="id" type="text" className="form-control" />
        </div>
        <div className="col-md-6">
          <label htmlFor="descricao" className="form-label">
            Descrição:
          </label>
          <input id="descricao" type="text" className="form-control" />
        </div>
        <hr />
        <div className="col-12">
          <button className="btn btn-outline-secondary" onClick={addAtividade}>
            + Atividade
          </button>
        </div>
      </form>

      <div className="mt-3">
        {atividades.map(ativ => (
          <div key={ativ.id} className="card mb-2 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">
                  <span className="badge text-bg-secondary me-1">
                    {ativ.id}
                  </span>
                  - Titulo
                </h5>
                <h6>
                  Prioridade:
                  <span className="ms-1 text-black">
                    <i className="me-1 far fa-smile"></i>
                  </span>
                  Normal
                </h6>
              </div>
              <p className="card-text">
                {ativ.id} - {ativ.descricao}
              </p>
              <div className="d-flex justify-content-end">
                <button className="btn btn-outline-primary">Editar</button>
                <button className="btn btn-outline-danger">Deletar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
