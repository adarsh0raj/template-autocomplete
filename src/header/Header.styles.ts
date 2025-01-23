export const headerStyles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#f5f5f5',
      borderBottom: '1px solid #ddd',
    },
    headerLeft: {
      flex: 1,
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      margin: 0,
    },
    headerCenter: {
      flex: 2,
      display: 'flex',
      justifyContent: 'center',
    },
    searchBar: {
      width: '100%',
      maxWidth: '400px',
      padding: '8px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    headerRight: {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-end',
    },
    githubLink: {
      color: '#333',
      textDecoration: 'none',
      '&:hover': {
        color: '#000',
      },
    },
    searchWrapper: {
      position: "relative",
      width: "100%",
      maxWidth: "300px",
    },
    dropdown: {
      position: "absolute",
      top: "100%",
      left: 0,
      width: "100%",
      maxHeight: "200px",
      overflowY: "auto",
      border: "1px solid #ccc",
      borderRadius: "4px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      zIndex: 10,
      listStyle: "none",
      margin: 0,
      padding: 0,
    },
    dropdownItem: {
      padding: "10px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#f0f0f0",
      },
    },
};