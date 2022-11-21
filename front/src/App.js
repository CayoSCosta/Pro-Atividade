import './App.css'
import { Button, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import React from 'react'
import AtividadeForm from './Components/AtividadeForm'
import AtividadeLista from './Components/AtividadeLista'
import api from './api/atividade'

function App() {
  const [showAtividadeModal, setShowAtividadeModal] = useState(false)
  const [smShowConfirmModal, setSmShowConfirmModal] = useState(false)

  const [atividades, setAtividades] = useState([])
  const [atividade, setAtividade] = useState({ id: 0 })

  const handleAtividadeModal = () => setShowAtividadeModal(!showAtividadeModal)

  const handleConfirmModal = id => {
    if (id !== 0 && id !== undefined) {
      const atividade = atividades.filter(atividade => atividade.id === id)
      setAtividade(atividade[0])
    } else {
      setAtividade({ id: 0 })
    }
    setSmShowConfirmModal(!smShowConfirmModal)
  }

  const pegaTodasAtividades = async () => {
    const response = await api.get('atividade')
    return response.data
  }

  useEffect(() => {
    const getAtividades = async () => {
      const todasAtividades = await pegaTodasAtividades()
      if (todasAtividades) {
        setAtividades(todasAtividades)
      }
    }
    getAtividades()
  }, [])

  const novaAtividade = () => {
    setAtividade({ id: 0 })
    handleAtividadeModal()
  }

  const addAtividade = async ativ => {
    handleAtividadeModal()
    const response = await api.post('atividade', ativ)
    setAtividades([...atividades, response.data])
  }

  function cancelarAtividade() {
    setAtividade({ id: 0 })
    handleAtividadeModal()
  }

  const deletarAtividades = async id => {
    handleConfirmModal(0)
    if (await api.delete(`atividade/${id}`)) {
      const filtro = atividades.filter(ativ => ativ.id !== id)
      setAtividades([...filtro])
    }
  }

  const editarAtividades = async ativ => {
    handleAtividadeModal()
    const response = await api.put(`atividade/${ativ.id}`, ativ)
    const { id } = response.data
    setAtividades(
      atividades.map(item => (item.id === id ? response.data : item))
    )
    setAtividade({ id: 0 })
  }

  const pegarAtividade = id => {
    const atividade = atividades.filter(atividade => atividade.id === id)
    setAtividade(atividade[0])
    handleAtividadeModal()
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1">
        <h1 className="m-0 p-0">
          Atividade{/*{atividade.id !== 0 ? atividade.id : ''} */}
        </h1>
        <Button variant="outline-secondary" onClick={novaAtividade}>
          <i className="fas fa-plus" />
        </Button>
      </div>
      <AtividadeLista
        atividades={atividades}
        pegarAtividade={pegarAtividade}
        handleConfirmModal={handleConfirmModal}
        editarAtividades={editarAtividades}
      />

      <Modal show={showAtividadeModal} onHide={handleAtividadeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Atividade {atividade.id !== 0 ? atividade.id : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtividadeForm
            addAtividade={addAtividade}
            editarAtividades={editarAtividades}
            cancelarAtividade={cancelarAtividade}
            atividades={atividades}
            ativSelecionada={atividade}
          />
        </Modal.Body>
      </Modal>

      <Modal size="sm" show={smShowConfirmModal} onHide={handleConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Excluir atividade {atividade.id !== 0 ? atividade.id : ''} ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir a atividade {atividade.id}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-outline-success me-2"
            onClick={() => deletarAtividades(atividade.id)}
          >
            <i className="fas fa-check me-2" />
            Sim
          </button>
          <button
            type="button"
            className="btn btn-danger me-2"
            onClick={() => handleConfirmModal(0)}
          >
            <i className="fas fa-times me-2" />
            Não
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default App
