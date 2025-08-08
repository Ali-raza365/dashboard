
import { Box, Button, colors, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { mockInventoryData } from "../../data/mockInventoryData"; // Import the new mock data

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Footer from "../../components/Footer";
import PlusIcon from '@mui/icons-material/Add';
import AddVehicleModal from "../../components/AddVehicleModal";
import { evaluateFinancials, generateStockNumber } from "../../utils/helper";
import { loadVehicles, saveVehicles } from "../../data/storage";




const CustomToolbar = ({ colors, handleOpenModal, searchQuery, setSearchQuery, deleteSelectedRow, isDeleteDisabled }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
      p: 1,
    }}
  >
    {/* Left side: GridToolbar (includes export button) */}
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <GridToolbar />
      <Button
        // variant="contained"
        color="primary"
        size="small"
        onClick={handleOpenModal}
        startIcon={<PlusIcon />}
        sx={{
          boxShadow: 'none',
          padding: '3px 5px',
          alignSelf: "center",
          backgroundColor: 'transparent',
          color: "#000",
          '&:hover': {
            boxShadow: 'none',
          },
        }}
      >Add vehicle
      </Button>
      {/* <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleOpenModal}
        sx={{
          ml: '5px',
          // Use the imported color palette for custom styling
          backgroundColor: colors.secondary[100],
          '&:hover': {
            backgroundColor: colors.secondary[100],
          },
        }}
      >
        Add vehicle
      </Button> */}
    </Box>

    {/* Right side: Custom search and delete */}
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginRight: '10px', flex: 1 }}
      />
      <IconButton
        color={isDeleteDisabled ? 'default' : 'error'}
        onClick={deleteSelectedRow}
        disabled={isDeleteDisabled}
        aria-label="delete selected row"
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  </Box>
);

const Inventory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddVehicle = (vehicle) => {


    const stock_number = generateStockNumber(vehicle);
    const { hq_appraisal_suggested, projected_gross, market_variance, red_flag_status } = evaluateFinancials(vehicle);


    const newVehicle = {
      ...vehicle,
      stock_number: stock_number,
      id: Date.now(), // Ensure a unique id for DataGrid row
      date_logged: new Date().toISOString().split("T")[0],
      current_status: "Acquired",
      status_date: new Date().toISOString().split("T")[0],
      market_variance,
      projected_gross,
      hq_appraisal_suggested,
      red_flag_status,
    };

    // saveVehicles([...inventory]);
    setInventory(prev => [...prev, newVehicle]);
  };

  useEffect(() => {
    loadVehicles().then((data) => {
      setInventory(data);
      if (!data?.length) {
        saveVehicles(mockInventoryData)
        setInventory(mockInventoryData);
      }
    });
  }, [])

  useEffect(() => {
    if (inventory?.length) {
      saveVehicles(inventory);
    }
  }, [inventory]);

  const handleRowSelection = (selectionModel) => {
    // Allow only one row to be selected
    const selectedId = selectionModel.length > 0 ? selectionModel[0] : null;
    setSelectedRow(selectedId);
  };

  const deleteSelectedRow = () => {
    // Only delete if a row is selected
    if (selectedRow !== null) {
      const updatedInventory = inventory?.filter((item) => item?.id !== selectedRow);
      setInventory(updatedInventory);
      setSelectedRow(null);
    }
  };

  // Filter inventory items based on the search query across multiple fields
  const filteredInventory = inventory?.filter((item) => {
    const searchLower = searchQuery?.toLowerCase();
    return (
      item?.stock_number?.toLowerCase()?.includes(searchLower) ||
      item?.vin?.toLowerCase()?.includes(searchLower) ||
      item?.make?.toLowerCase()?.includes(searchLower) ||
      item?.model?.toLowerCase()?.includes(searchLower) ||
      item?.channel?.toLowerCase()?.includes(searchLower) ||
      item?.buyer_name?.toLowerCase()?.includes(searchLower) ||
      item?.customer_name?.toLowerCase()?.includes(searchLower)
    );
  });

  // Define all 30 columns for the DataGrid
  const columns = [
    { field: "stock_number", headerName: "Stock #", flex: 1.5, minWidth: 130, headerAlign: 'center', align: 'center' },
    { field: "date_logged", headerName: "Logged Date", flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
    { field: "vin", headerName: "VIN", flex: 2, minWidth: 150, headerAlign: 'center', align: 'center' },
    { field: "year", headerName: "Year", flex: 0.7, type: "number", minWidth: 100, headerAlign: 'center', align: 'center' },
    { field: "make", headerName: "Make", flex: 1.2, minWidth: 100, headerAlign: 'center', align: 'center' },
    { field: "model", headerName: "Model", flex: 1.5, minWidth: 100, headerAlign: 'center', align: 'center' },
    { field: "trim", headerName: "Trim", flex: 1.5, minWidth: 100, headerAlign: 'center', align: 'center' },
    { field: "odometer", headerName: "Odometer", flex: 1, type: "number", minWidth: 100, headerAlign: 'center', align: 'center' },
    { field: "purchase_date", headerName: "Purchase Date", flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
    { field: "channel", headerName: "Channel", flex: 1.2, minWidth: 100, headerAlign: 'center', align: 'center' },
    { field: "specific_source", headerName: "Source", flex: 1.5, minWidth: 100, headerAlign: 'center', align: 'center' },
    { field: "buyer_name", headerName: "Buyer", flex: 1.2, minWidth: 100, headerAlign: 'center', align: 'center' },
    { field: "store_location", headerName: "Store", flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
    {
      field: "purchase_price",
      headerName: "Purchase Price",
      flex: 1.2,
      type: "number",
      minWidth: 100,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: ({ value }) => `$${value?.toLocaleString()}`
    },
    { field: "customer_name", headerName: "Customer Name", flex: 1.5, minWidth: 120, headerAlign: 'center', align: 'center' },
    { field: "deal_number", headerName: "Deal #", flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
    {
      field: "mmr_value",
      headerName: "MMR Value",
      flex: 1.2,
      type: "number",
      minWidth: 100,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: ({ value }) => `$${value?.toLocaleString()}`
    },
    {
      field: "kbb_wholesale",
      headerName: "KBB Wholesale",
      flex: 1.2,
      type: "number",
      minWidth: 120,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: ({ value }) => `$${value?.toLocaleString()}`
    },
    {
      field: "market_variance",
      headerName: "Market Variance",
      flex: 1.2,
      minWidth: 120,
      type: "number",
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ value }) => (
        <Typography
          sx={{
            color: value < 0 ? "green" : "red",
            fontWeight: 600,
          }}
        >
          {value < 0 ? `-$${Math.abs(value)?.toLocaleString()}` : `+$${value?.toLocaleString()}`}
        </Typography>
      )
    },

    {
      field: "planned_retail",
      headerName: "Retail Price",
      flex: 1.2,
      type: "number",
      minWidth: 100,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: ({ value }) => `$${value?.toLocaleString()}`
    },
    {
      field: "est_recon_cost",
      headerName: "Est. Recon Cost",
      flex: 1.2,
      type: "number",
      minWidth: 120,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: ({ value }) => `$${value?.toLocaleString()}`
    },
    {
      field: "projected_gross",
      headerName: "Projected Gross",
      flex: 1.2,
      type: "number",
      minWidth: 120,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: ({ value }) => `$${value?.toLocaleString()}`
    },
    { field: "hq_appraisal_suggested", headerName: "HQ Appraisal", flex: 1, type: "boolean", minWidth: 120, headerAlign: 'center', align: 'center' },
    {
      field: "red_flag_status",
      headerName: "Red Flag",
      flex: 1.5,
      minWidth: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ value }) => {
        if (!value || value === "None") return <Typography>None</Typography>;

        let bgColor = "#F8D7DA";
        let textColor = "#721C24";

        return (
          <Box
            sx={{
              backgroundColor: bgColor,
              color: textColor,
              px: 1.5,
              py: 0.5,
              textTransform: "capitalize",
              borderRadius: 1,
              fontWeight: 600,
              fontSize: "0.600rem",
              textAlign: "center",
            }}
          >
            {value}
          </Box>
        );
      }
    },
    {
      field: "current_status",
      headerName: "Status",
      flex: 1.2,
      minWidth: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ value }) => {
        let bgColor, textColor;
        console.log(value)
        switch (value) {
          case "UCM REVIEW":
            bgColor = "#FFF3CD";
            textColor = "#856404";
            break;
          case "In Recon":
            bgColor = "#D6E4FF";
            textColor = "#1E40AF";
            break;
          case "FRONTLINE READY":
            bgColor = "#D4EDDA";
            textColor = "#155724";
            break;
          case "Acquired":
            bgColor = "#D4EDDA";
            textColor = "#155724";
            break;



          default:
            bgColor = "#F8F9FA";
            textColor = "#212529";
        }

        return (
          <Box
            sx={{
              backgroundColor: `${bgColor} !important`,
              color: textColor,
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontWeight: 600,
              fontSize: "0.875rem",
              textAlign: "center",
            }}
          >
            {value}
          </Box>
        );
      }
    },
    { field: "status_date", headerName: "Status Date", flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
  ];

  // ... (rest of the component)


  let selectedVehicle = inventory?.find(item => item?.id === selectedRow) || null;

  return (
    <Box m="20px" mt={0}>
      <Header title="Vehicle Inventory" subtitle="Managing All Used Vehicle Acquisitions" />
      <Box
        m="40px 0 0 0"
        height="50vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.secondary[100], borderBottom: "none", color: "#fff", borderRadius: "0" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.background[400] },
          "& .MuiDataGrid-footerContainer": { borderTop: "none", borderRadius: "0" },
          "& .MuiCheckbox-root": { color: `${colors.secondary[200]} !important` },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `${colors.grey[100]} !important` },
          overflow: "auto",
        }}
      >
        <DataGrid
          rows={filteredInventory}
          columns={columns}
          components={{
            Toolbar: () => (
              // <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              //   {/* <GridToolbar /> */}
              <CustomToolbar
                colors={colors}
                handleOpenModal={handleOpenModal}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                deleteSelectedRow={deleteSelectedRow}
                isDeleteDisabled={selectedRow === null}
              />
              // </div>
            ),
          }}
          onSelectionModelChange={handleRowSelection}
          selectionModel={selectedRow ? [selectedRow] : []}
        />
      </Box>
      <Box
        m="20px 0 0 0"
        height="22vh"
        sx={{
          backgroundColor: colors.background[400],
          overflow: "auto",
          borderRadius: 2,
          p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
        }}
      >
        {selectedVehicle ? (
          <Box>
            <Typography variant="h4" gutterBottom>
              Vehicle Details
            </Typography>
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap="16px">
              <Box>
                <Typography variant="body1"><strong>Stock #:</strong> {selectedVehicle.stock_number}</Typography>
                <Typography variant="body1"><strong>VIN:</strong> {selectedVehicle.vin}</Typography>
                <Typography variant="body1"><strong>Year:</strong> {selectedVehicle.year}</Typography>
                <Typography variant="body1"><strong>Make/Model:</strong> {selectedVehicle.make} {selectedVehicle.model}</Typography>
                <Typography variant="body1"><strong>Trim:</strong> {selectedVehicle.trim}</Typography>
                <Typography variant="body1"><strong>Odometer:</strong> {selectedVehicle.odometer}</Typography>
              </Box>
              <Box>
                <Typography variant="body1"><strong>Purchase Price:</strong> ${selectedVehicle.purchase_price?.toLocaleString()}</Typography>
                <Typography variant="body1"><strong>MMR Value:</strong> ${selectedVehicle.mmr_value?.toLocaleString()}</Typography>
                <Typography variant="body1"><strong>Market Variance:</strong> ${selectedVehicle.market_variance?.toLocaleString()}</Typography>
                <Typography variant="body1"><strong>Projected Gross:</strong> ${selectedVehicle.projected_gross?.toLocaleString()}</Typography>
                <Typography variant="body1"><strong>Status:</strong> {selectedVehicle.current_status}</Typography>
                <Typography variant="body1"><strong>Red Flag:</strong> {selectedVehicle.red_flag_status}</Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <Typography variant="h5" align="center" style={{ marginTop: '20px' }}>
            Select a vehicle from the table to view details.
          </Typography>
        )}
      </Box>
      <AddVehicleModal open={isModalOpen} onAddVehicle={handleAddVehicle} handleClose={handleCloseModal} />
      <Footer />
    </Box>
  );
};

export default Inventory;
