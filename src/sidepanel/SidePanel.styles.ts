export const sidePanelStyles = {
  sidePanel: {
    width: '300px',
    borderRight: '1px solid #ccc',
    padding: '10px',
    overflowY: 'auto',
    backgroundColor: '#f9f9f9',
  },
  accordion: {
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  accordionHeader: {
    padding: '10px 15px',
    cursor: 'pointer',
    fontWeight: 'bold',
    backgroundColor: '#eaeaea',
    borderBottom: '1px solid #ddd',
    '&:hover': {
      backgroundColor: '#dcdcdc',
    },
  },
  accordionContent: {
    padding: '10px 15px',
    backgroundColor: '#fff',
  },
  noteList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  noteItem: {
    padding: '10px 15px',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, padding 0.3s ease',
    '&:last-child': {
      borderBottom: 'none',
    },
    '&:hover': {
      backgroundColor: '#f0f0f0',
      paddingLeft: '20px',
    },
    '&:active': {
      backgroundColor: '#dcdcdc',
    },
  },
  selectedNote: {
    backgroundColor: '#e0f7fa',
    borderLeft: '5px solid #00796b',
    fontWeight: 'bold',
  },
  placeholderText: {
    fontStyle: 'italic',
    color: '#888',
  },
  newNoteButton: {
    alignSelf: 'flex-end',
    marginTop: '5px',
    marginBottom: '5px',
    padding: '8px 16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
    '&:active': {
      backgroundColor: '#004085',
    },
  },
  dialog: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    zIndex: '1000',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  dialogText: {
    fontSize: '16px',
    marginBottom: '20px',
  },
  dialogButton: {
    backgroundColor: '#0078d4',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 15px',
    fontSize: '14px',
    cursor: 'pointer',
    margin: '0 10px',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#005a8e',
    },
    '&:focus': {
      outline: 'none',
      boxShadow: '0 0 5px rgba(0, 120, 212, 0.7)',
    },
    '&:last-child': {
      backgroundColor: '#f44336',
    },
    '&:last-child:hover': {
      backgroundColor: '#d32f2f',
    },
  },
  dialogOverlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '999',
  },
};
