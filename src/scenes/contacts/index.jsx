import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Users from "../../data/Data.json";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";


import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Footer from "../../components/Footer";
import { loadUsers, saveUsers } from "../../data/storage";

const CustomToolbar = ({ searchQuery, setSearchQuery, deleteSelectedRow, isDeleteDisabled }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px',  }}>
    <TextField
      variant="outlined"
      size="small"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{ marginRight: '10px', flex: 1 }}
    />
    <IconButton  color={isDeleteDisabled ? 'white' : 'error'} onClick={deleteSelectedRow} disabled={isDeleteDisabled}>
      <DeleteIcon />
    </IconButton>
  </div>
);

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
   
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState(null); // Change to hold a single selected row
  const handleRowSelection = (selectionModel) => {
    // Allow only one row to be selected
    const selectedId = selectionModel.length > 0 ? selectionModel[0] : null;
    setSelectedRow(selectedId);
  };

  const deleteSelectedRow = () => {
    // Only delete if there's a selected row
    if (selectedRow !== null) {
      const updatedUsers = users.filter((user) => user.id !== selectedRow);
      setUsers(updatedUsers);
      setSelectedRow(null); // Clear the selected row after deletion
    }
  };


   useEffect(() => {
      loadUsers().then((data) => {
        setUsers(data);
        if (!data?.length) {
          saveUsers(Users)
          setUsers(Users);
        }
      });
    }, [])
  
    useEffect(() => {
      if (users?.length) {
        saveUsers(users);
      }
    }, [users]);

  // Filter users based on the search query
  const filteredUsers = users.filter((user) => {
    return (
      user.first_name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      user.Username?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery?.toLowerCase())
    );
  });


  const columns = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "Username", headerName: "Username", flex: 1 },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "Gender",
      headerName: "Gender",
      flex: 1,
    },
    {
      field: "create_on",
      headerName: "Created On",
      flex: 1,
    },
    {
      field: "first_login",
      headerName: "First Login",
      flex: 1,
      hide: true, // Optionally hide this column for security reasons

    },
    {
      field: "comments",
      headerName: "Comments",
      flex: 1,
    },
    {
      field: "password",
      headerName: "Password",
      flex: 1,
      hide: true, // Optionally hide this column for security reasons
    },
    {
      field: "status",
      headerName: "Status",
      type: "boolean",
      flex: 1,
    },
  ];

  let user =users?.[selectedRow] ||null
  

  return (
    <Box m="20px" mt={0}>
      <Box
        m="40px 0 0 0"
        height="50vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
          overflow: "auto",
        }}
      >
      <DataGrid
        rows={filteredUsers}
        columns={columns}
       components={{
          Toolbar: () => (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <GridToolbar /> {/* Default MUI Grid Toolbar for filtering, exporting, etc. */}
            <CustomToolbar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              deleteSelectedRow={deleteSelectedRow}
              isDeleteDisabled={selectedRow === null}
            />
          </div>
          ),
        }}
        onSelectionModelChange={handleRowSelection}
        selectionModel={selectedRow ? [selectedRow] : []} // Allow only one selection
      />
      </Box>
      <Box
        m="20px 0 0 0"
        height="22vh"
        sx={{
         backgroundColor:colors.primary[400],
          overflow: "auto",
          borderRadius: 2,
          p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
        }}
      >
       {user?.first_name ? <>
      <Typography variant="h4" gutterBottom>
        User Details
      </Typography>
      <Box>
        <Typography variant="body1"><strong>First Name:</strong> {user?.first_name}</Typography>
        <Typography variant="body1"><strong>Last Name:</strong> {user?.last_name}</Typography>
        <Typography variant="body1"><strong>Username:</strong> {user?.Username}</Typography>
        <Typography variant="body1"><strong>Email:</strong> {user?.email}</Typography>
        <Typography variant="body1"><strong>Gender:</strong> {user?.Gender}</Typography>
        <Typography variant="body1"><strong>Comment:</strong> {user?.comments}</Typography>
      </Box>
        

      </>: null}
      </Box>
      <Footer/>
    </Box>
  );
};

export default Contacts;
