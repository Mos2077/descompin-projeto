import { useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Modal } from '../../components/Modal/Modal';
import { Button } from '../../components/Button/Button';
import { useAppContext } from '../../store/AppContext';
import { closeModalsAction } from '../../store/actions';
import { 
  fetchFoldersAction,
  openModalCreateFolder,
  savePinInFolderAction 
} from '../../store/actions';

export const ModalSavePin = ({ open }) => {
  const { state, dispatch } = useAppContext();
  const handleClose = () => {
    console.log('fechando!!')
    dispatch(closeModalsAction())
  };

  const handleClickCreateFolder = () => {
    console.log('Clicou em criar pasta');
    dispatch(openModalCreateFolder());
  };

  const handleClick = (folderId) => {
    savePinInFolderAction(dispatch, state.activePinId, folderId);
  };

  const foldersNormalized = state.folders.map(folder => {
    return ({
      ...folder,
      saved: folder.pins.includes(state.activePinId)
    })
  })

  useEffect(() => {
    fetchFoldersAction(dispatch);
  }, [])


  return (
    <Modal
      title="Salvar pin"
      open={open}
      onHide={handleClose}
      controls={[
        {
          label: 'Criar pasta',
          variant: 'secondary',
          loading: false,
          loadingLabel: 'Criando',
          onClick: handleClickCreateFolder
        }
      ]}>
      <ListGroup variant="flush">
        {foldersNormalized.map((folder, folderIndex) => (
          <ListGroup.Item key={folderIndex}>
            <Row>
              <Col xs={8}>{folder.name}</Col>
              <Col xs={4} className="text-end">
                <Button
                  label={folder.saved ? 'Salvo' : 'Salvar'}
                  loadingLabel="Salvando"
                  onClick={() => handleClick(folder.id)}
                  variant={folder.saved ? 'secondary' : 'primary'}
                  disabled={folder.saved}
                />
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Modal>
  )
}