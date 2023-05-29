import styled from 'styled-components';

export const Title = styled.h3`
  margin: 0 0 0.75rem;

  font-size: 1.25rem;
`;

export const modalStyles = {
  content: {
    borderRadius: '0',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '0',
    backgroundColor: 'transparent',
    boxShadow: '1px 2px 6px 0 rgba(25, 25, 27, 0.15)',
    overflow: 'none',
    padding: 0,
  },
  overlay: {
    zIndex: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

export const ModalCloseButton = styled.div`
  position: absolute;
  top: 0;
  right: -2.1rem;
`;

export const ModalWrapper = styled.div`
  position: relative;

  min-width: 18rem;
  max-width: 90vw;
  height: fit-content;
  max-height: calc(var(--vh) * 90);
  overflow-y: auto;

  background-color: white;
`;
