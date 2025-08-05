import React from 'react';
import { Box, Button, TextField, Modal, Typography, MenuItem, InputLabel, FormControl, Select } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";

// Modal style based on Aaron Automotive Group guidelines
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 800,
  bgcolor: 'white',
  borderRadius: '0.5rem', // Based on --radius-lg
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // Based on --shadow-lg
  border: '1px solid #e5e7eb', // Based on --gray-200
  p: '1.5rem', // Based on --space-6
  overflowY: 'auto',
  maxHeight: '90vh'
};

// Form schema based on new structure
const checkoutSchema = yup.object().shape({
  vin: yup.string().length(17, "VIN must be 17 characters").required("required"),
  year: yup.number().min(1990).max(new Date().getFullYear() + 1).required("required"),
  make: yup.string().required("required"),
  model: yup.string().required("required"),
  odometer: yup.number().min(1).max(500000).required("required"),

  purchase_date: yup.date().required("required"),
  channel: yup.string().required("required"),
  buyer_name: yup.string().required("required"),
  store_location: yup.string().required("required"),
  purchase_price: yup.number().min(500).max(200000).required("required"),

  mmr_value: yup.number().required("required"),
  kbb_wholesale: yup.number().required("required"),
  planned_retail: yup.number().required("required"),
  est_recon_cost: yup.number().min(0).required("required"),

  customer_name: yup.string(),
  initial_notes: yup.string(),
});

// Initial values based on new structure
const initialValues = {
  vin: "1HGCR2F58MA123456",
  year: "",
  make: "",
  model: "",
  odometer: "",

  purchase_date: "",
  channel: "",
  buyer_name: "",
  store_location: "sass",
  purchase_price: "2000",

  mmr_value: "23030",
  kbb_wholesale: "22030",
  planned_retail: "2020",
  est_recon_cost: "202002",

  customer_name: "",
  initial_notes: "",
};

// Helper function to generate years for the dropdown
const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear + 1; i >= 1990; i--) {
    years.push(i);
  }
  return years;
};

// List of major automotive brands
const majorCarBrands = [
  "Acura", "Alfa Romeo", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler",
  "Dodge", "Ford", "Genesis", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep",
  "Kia", "Land Rover", "Lexus", "Lincoln", "Maserati", "Mazda", "Mercedes-Benz", "Mitsubishi",
  "Nissan", "Porsche", "Ram", "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo"
];

// Modal component
const AddVehicleModal = ({ open, handleClose ,onAddVehicle }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {


  onAddVehicle &&  onAddVehicle(values);

  handleClose &&  handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-vehicle-modal"
      aria-describedby="add-new-vehicle-form"
    >
      <Box sx={modalStyle}>
        <Header title="ADD VEHICLE" subtitle="Enter details for a new vehicle acquisition" />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="1.5rem" // Based on --space-6
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                {/* SECTION 1: Vehicle Information */}
                <Typography variant="h4" sx={{ gridColumn: "span 4", mt: "1rem" }}>
                  Vehicle Information
                </Typography>
                <TextField fullWidth variant="filled" type="text" label="VIN" onBlur={handleBlur} onChange={handleChange} value={values.vin} name="vin" error={!!touched.vin && !!errors.vin} helperText={touched.vin && errors.vin} placeholder="1HGCV1F13KA012345" sx={{ gridColumn: "span 2" }} />
                <FormControl variant="filled" fullWidth sx={{ gridColumn: "span 1" }}>
                  <InputLabel id="year-label">Year</InputLabel>
                  <Select
                    labelId="year-label"
                    name="year"
                    value={values.year}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.year && !!errors.year}
                    displayEmpty
                    renderValue={(selected) => {
                      if (selected === '') {
                        // return <em>Select Year</em>;
                      }
                      return selected;
                    }}
                  >
                    {/* <MenuItem value="" disabled>
                      <em>Select Year</em>
                    </MenuItem> */}
                    {generateYears().map((year) => (
                      <MenuItem key={year} value={year}>{year}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl variant="filled" fullWidth sx={{ gridColumn: "span 1" }}>
                  <InputLabel id="make-label">Make</InputLabel>
                  <Select
                    labelId="make-label"
                    name="make"
                    value={values.make}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.make && !!errors.make}
                    displayEmpty
                    renderValue={(selected) => {
                      if (selected === '') {
                        // return <em>Select Make</em>;
                      }
                      return selected;
                    }}
                  >
                    {/* <MenuItem value="" disabled>
                      <em>Select Make</em>
                    </MenuItem> */}
                    {majorCarBrands.map((brand) => (
                      <MenuItem key={brand} value={brand}>{brand}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField fullWidth variant="filled" type="text" label="Model" onBlur={handleBlur} onChange={handleChange} value={values.model} name="model" error={!!touched.model && !!errors.model} helperText={touched.model && errors.model} placeholder="Camry" sx={{ gridColumn: "span 2" }} />
                <TextField fullWidth variant="filled" type="number" label="Odometer" onBlur={handleBlur} onChange={handleChange} value={values.odometer} name="odometer" error={!!touched.odometer && !!errors.odometer} helperText={touched.odometer && errors.odometer} placeholder="50000" sx={{ gridColumn: "span 2" }} />

                {/* SECTION 2: Acquisition Details */}
                <Typography variant="h4" sx={{ gridColumn: "span 4", mt: "1rem" }}>
                  Acquisition Details
                </Typography>
                <TextField fullWidth variant="filled" type="date" label="Purchase Date" onBlur={handleBlur} onChange={handleChange} value={values.purchase_date} name="purchase_date" error={!!touched.purchase_date && !!errors.purchase_date} helperText={touched.purchase_date && errors.purchase_date}  sx={{ gridColumn: "span 2" }} />
                <FormControl variant="filled" fullWidth sx={{ gridColumn: "span 2" }}>
                  <InputLabel id="channel-label">Acquisition Channel</InputLabel>
                  <Select
                    labelId="channel-label"
                    name="channel"
                    value={values.channel}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.channel && !!errors.channel}
                    displayEmpty
                    renderValue={(selected) => {
                      if (selected === '') {
                        // return <em>Select Channel</em>;
                      }
                      return selected;
                    }}
                  >
                    {/* <MenuItem value="" disabled>
                      <em>Select Channel</em>
                    </MenuItem> */}
                    <MenuItem value="trade_in">Trade-In</MenuItem>
                    <MenuItem value="auction">Auction</MenuItem>
                    <MenuItem value="private_party">Private Party</MenuItem>
                    <MenuItem value="service_drive">Service Drive</MenuItem>
                    <MenuItem value="wholesale">Wholesale</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="filled" fullWidth sx={{ gridColumn: "span 2" }}>
                  <InputLabel id="buyer_name-label">Buyer Name</InputLabel>
                  <Select
                    labelId="buyer_name-label"
                    name="buyer_name"
                    value={values.buyer_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.buyer_name && !!errors.buyer_name}
                    displayEmpty
                    renderValue={(selected) => {
                      if (selected === '') {
                        // return <em>Select Buyer</em>;
                      }
                      return selected;
                    }}
                  >
                    {/* <MenuItem value="" disabled>
                      <em>Select Buyer</em>
                    </MenuItem> */}
                    <MenuItem value="john_smith">John Smith (JS)</MenuItem>
                    <MenuItem value="jane_doe">Jane Doe (JD)</MenuItem>
                    <MenuItem value="mike_lee">Mike Lee (ML)</MenuItem>
                    <MenuItem value="sara_khan">Sara Khan (SK)</MenuItem>
                    <MenuItem value="tom_nguyen">Tom Nguyen (TN)</MenuItem>
                  </Select>
                </FormControl>
                <TextField fullWidth variant="filled" type="text" label="Store Location" onBlur={handleBlur} onChange={handleChange} value={values.store_location} name="store_location" error={!!touched.store_location && !!errors.store_location} helperText={touched.store_location && errors.store_location} placeholder="Dallas" sx={{ gridColumn: "span 2" }} />
                <TextField fullWidth variant="filled" type="number" label="Purchase Price" onBlur={handleBlur} onChange={handleChange} value={values.purchase_price} name="purchase_price" error={!!touched.purchase_price && !!errors.purchase_price} helperText={touched.purchase_price && errors.purchase_price} placeholder="25000" sx={{ gridColumn: "span 4" }} />

                {/* SECTION 3: Financial Information */}
                <Typography variant="h4" sx={{ gridColumn: "span 4", mt: "1rem" }}>
                  Financial Information
                </Typography>
                <TextField fullWidth variant="filled" type="number" label="MMR Value" onBlur={handleBlur} onChange={handleChange} value={values.mmr_value} name="mmr_value" error={!!touched.mmr_value && !!errors.mmr_value} helperText={touched.mmr_value && errors.mmr_value} placeholder="26500" sx={{ gridColumn: "span 2" }} />
                <TextField fullWidth variant="filled" type="number" label="KBB Wholesale" onBlur={handleBlur} onChange={handleChange} value={values.kbb_wholesale} name="kbb_wholesale" error={!!touched.kbb_wholesale && !!errors.kbb_wholesale} helperText={touched.kbb_wholesale && errors.kbb_wholesale} placeholder="27000" sx={{ gridColumn: "span 2" }} />
                <TextField fullWidth variant="filled" type="number" label="Planned Retail Price" onBlur={handleBlur} onChange={handleChange} value={values.planned_retail} name="planned_retail" error={!!touched.planned_retail && !!errors.planned_retail} helperText={touched.planned_retail && errors.planned_retail} placeholder="30000" sx={{ gridColumn: "span 2" }} />
                <TextField fullWidth variant="filled" type="number" label="Estimated Recon Cost" onBlur={handleBlur} onChange={handleChange} value={values.est_recon_cost} name="est_recon_cost" error={!!touched.est_recon_cost && !!errors.est_recon_cost} helperText={touched.est_recon_cost && errors.est_recon_cost} placeholder="1200" sx={{ gridColumn: "span 2" }} />

                {/* SECTION 4: Additional Details */}
                <Typography variant="h4" sx={{ gridColumn: "span 4", mt: "1rem" }}>
                  Additional Details
                </Typography>
                <TextField fullWidth variant="filled" type="text" label="Customer Name" onBlur={handleBlur} onChange={handleChange} value={values.customer_name} name="customer_name" error={!!touched.customer_name && !!errors.customer_name} helperText={touched.customer_name && errors.customer_name} placeholder="John Doe" sx={{ gridColumn: "span 2" }} />
                <TextField fullWidth variant="filled" multiline rows={4} label="Initial Notes" onBlur={handleBlur} onChange={handleChange} value={values.initial_notes} name="initial_notes" error={!!touched.initial_notes && !!errors.initial_notes} helperText={touched.initial_notes && errors.initial_notes} placeholder="Add any initial notes about the vehicle." sx={{ gridColumn: "span 4" }} />
              </Box>
              <Box display="flex" justifyContent="end" mt="1.25rem"> {/* Based on --space-5 */}
                {/* Button styled as a .btn-primary */}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: '#2563eb', // --aaron-blue-primary
                    color: 'white',
                    padding: '0.75rem 1.25rem', // Based on --space-3 and --space-5
                    '&:hover': {
                      bgcolor: '#1d4ed8', // --aaron-blue-secondary
                    }
                  }}
                >
                  Add New Vehicle
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddVehicleModal;