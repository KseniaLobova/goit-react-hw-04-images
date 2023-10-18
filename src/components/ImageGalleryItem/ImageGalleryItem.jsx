import Modal from 'react-modal';
import { Img, Item } from './ImageGalleryItem.styled';
import { useState } from 'react';
import { ModalWrap } from 'components/Modal/Modal';

const customStyles = {
  overlay: {
    backgroundColor: '#4D4948',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ABA6A5',
  },
};
Modal.setAppElement('#root');

export const ImageGalleryItem = ({ id, largeImg, webImg }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Item key={id}>
      <Img src={webImg} alt="" onClick={openModal} />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalWrap img={largeImg} />
      </Modal>
    </Item>
  );
};
