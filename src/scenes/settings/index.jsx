import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Grid,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// A simple Header component to replace the one from the original code
const Header = ({ title, subtitle }) => (
  <Box mb="20px">
    <Typography
      variant="h2"
      color="textPrimary"
      fontWeight="bold"
      sx={{ m: "0 0 5px 0" }}
    >
      {title}
    </Typography>
    <Typography variant="h5" color="secondary">
      {subtitle}
    </Typography>
  </Box>
);

const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

const Settings = () => {
  // State for System Settings
  const [hqPriceThreshold, setHqPriceThreshold] = useState(25000);
  const [hqMileageThreshold, setHqMileageThreshold] = useState(50000);
  const [ucmReviewDeadline, setUcmReviewDeadline] = useState(48);
  const [overMarketThreshold, setOverMarketThreshold] = useState(1500);
  const [minGrossProfit, setMinGrossProfit] = useState(500);
  const [maxReconPercentage, setMaxReconPercentage] = useState(0.05);

  // State for Email Configuration
  const [ucmEmail, setUcmEmail] = useState("ucm@dealership.com");
  const [directorEmail, setDirectorEmail] = useState("director@dealership.com");
  const [emailUcmAlerts, setEmailUcmAlerts] = useState("TRUE");
  const [emailDirectorAlerts, setEmailDirectorAlerts] = useState("TRUE");

  // State for Dropdown Management
  const [dropdownType, setDropdownType] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [newOptionValue, setNewOptionValue] = useState("");
  const [newOptionDisplay, setNewOptionDisplay] = useState("");

  // Placeholder data for dropdown types
  const dropdownTypes = [
    { value: "channels", label: "Channels" },
    { value: "sources", label: "Sources" },
    { value: "users", label: "Users" },
  ];

  // Placeholder functions for button actions
  const handleUpdateSystemSettings = () => {
    console.log("Updating System Settings:", {
      hqPriceThreshold,
      hqMileageThreshold,
      ucmReviewDeadline,
      overMarketThreshold,
      minGrossProfit,
      maxReconPercentage,
    });
    // Add API call or state update logic here
  };

  const handleResetToDefaults = () => {
    console.log("Resetting to defaults...");
    setHqPriceThreshold(25000);
    setHqMileageThreshold(50000);
    setUcmReviewDeadline(48);
    setOverMarketThreshold(1500);
    setMinGrossProfit(500);
    setMaxReconPercentage(0.05);
  };

  const handleLoadDropdownOptions = (type) => {
    console.log(`Loading options for: ${type}`);
    // Simulate fetching data based on the dropdown type
    if (type === "channels") {
      setDropdownOptions([{ value: "online", display: "Online" }, { value: "in_store", display: "In-Store" }]);
    } else if (type === "sources") {
      setDropdownOptions([{ value: "facebook", display: "Facebook" }, { value: "google", display: "Google" }]);
    } else {
      setDropdownOptions([]);
    }
    setDropdownType(type);
  };

  const handleAddDropdownOption = () => {
    console.log("Adding new option:", {
      type: dropdownType,
      value: newOptionValue,
      display: newOptionDisplay,
    });
    // Add logic to save the new option
    setNewOptionValue("");
    setNewOptionDisplay("");
  };

  const handleUpdateEmailSettings = () => {
    console.log("Updating Email Settings:", { ucmEmail, directorEmail, emailUcmAlerts, emailDirectorAlerts });
  };

  const handleTestEmailNotifications = () => {
    console.log("Testing email notifications...");
  };

  const handleSystemAction = (action) => {
    console.log(`Executing system action: ${action}`);
  };

  return (
    <Box m="20px">
      <Header title="SYSTEM SETTINGS" subtitle="Manage global application configuration" />

      {/* System Settings Section */}
      <SectionPaper elevation={2}>
        <Typography variant="h5" mb={2}>
          📊 System Settings
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="HQ Price Threshold ($)"
              type="number"
              value={hqPriceThreshold}
              onChange={(e) => setHqPriceThreshold(Number(e.target.value))}
              helperText="Vehicles over this amount require HQ appraisal"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="HQ Mileage Threshold"
              type="number"
              value={hqMileageThreshold}
              onChange={(e) => setHqMileageThreshold(Number(e.target.value))}
              helperText="Mileage requiring HQ appraisal"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="UCM Review Deadline (Hours)"
              type="number"
              value={ucmReviewDeadline}
              onChange={(e) => setUcmReviewDeadline(Number(e.target.value))}
              helperText="Time limit for UCM to review trade-ins"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Over Market Threshold ($)"
              type="number"
              value={overMarketThreshold}
              onChange={(e) => setOverMarketThreshold(Number(e.target.value))}
              helperText="Amount over MMR to trigger red flag"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Minimum Gross Profit ($)"
              type="number"
              value={minGrossProfit}
              onChange={(e) => setMinGrossProfit(Number(e.target.value))}
              helperText="Minimum acceptable gross profit"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Max Recon Percentage"
              type="number"
              value={maxReconPercentage}
              onChange={(e) => setMaxReconPercentage(Number(e.target.value))}
              helperText="Maximum recon cost as percentage of purchase"
            />
          </Grid>
        </Grid>
        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" color="primary" onClick={handleUpdateSystemSettings}>
            💾 Update Settings
          </Button>
          <Button variant="outlined" color="inherit" onClick={handleResetToDefaults}>
            🔄 Reset to Defaults
          </Button>
        </Box>
      </SectionPaper>

      {/* Dropdown Management Section */}
      <SectionPaper elevation={2}>
        <Typography variant="h5" mb={2}>
          📝 Dropdown Management
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Dropdown Type</InputLabel>
              <Select
                value={dropdownType}
                label="Dropdown Type"
                onChange={(e) => handleLoadDropdownOptions(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select Type to Manage</em>
                </MenuItem>
                {dropdownTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {dropdownType && (
            <>
              <Grid item xs={12}>
                <Typography variant="subtitle1" mb={1}>Current Options:</Typography>
                {dropdownOptions.length > 0 ? (
                  <Box>
                    {dropdownOptions.map((option) => (
                      <Chip key={option.value} label={option.display} onDelete={() => console.log('Delete ' + option.display)} sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" color="textSecondary">No options loaded.</Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" mb={1}>➕ Add New Option</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Option Value (internal)"
                      value={newOptionValue}
                      onChange={(e) => setNewOptionValue(e.target.value)}
                      helperText="Used internally by the system"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Display Name (what users see)"
                      value={newOptionDisplay}
                      onChange={(e) => setNewOptionDisplay(e.target.value)}
                      helperText="What appears in dropdowns and forms"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleAddDropdownOption} startIcon={<span>➕</span>}>
                      Add Option
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </SectionPaper>

      {/* Email Configuration Section */}
      <SectionPaper elevation={2}>
        <Typography variant="h5" mb={2}>
          📧 Email Configuration
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="UCM Email Address"
              type="email"
              value={ucmEmail}
              onChange={(e) => setUcmEmail(e.target.value)}
              helperText="Receives trade-in review notifications"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Director Email Address"
              type="email"
              value={directorEmail}
              onChange={(e) => setDirectorEmail(e.target.value)}
              helperText="Receives red flag alerts and reports"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Enable UCM Review Alerts</InputLabel>
              <Select
                value={emailUcmAlerts}
                label="Enable UCM Review Alerts"
                onChange={(e) => setEmailUcmAlerts(e.target.value)}
              >
                <MenuItem value="TRUE">✅ Enabled</MenuItem>
                <MenuItem value="FALSE">❌ Disabled</MenuItem>
              </Select>
              <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>Send email notifications for UCM reviews</Typography>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Enable Director Red Flag Alerts</InputLabel>
              <Select
                value={emailDirectorAlerts}
                label="Enable Director Red Flag Alerts"
                onChange={(e) => setEmailDirectorAlerts(e.target.value)}
              >
                <MenuItem value="TRUE">✅ Enabled</MenuItem>
                <MenuItem value="FALSE">❌ Disabled</MenuItem>
              </Select>
              <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>Send email notifications for red flags</Typography>
            </FormControl>
          </Grid>
        </Grid>
        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" color="secondary" onClick={handleUpdateEmailSettings}>
            📧 Update Email Settings
          </Button>
          <Button variant="outlined" color="inherit" onClick={handleTestEmailNotifications}>
            🧪 Test Notifications
          </Button>
        </Box>
      </SectionPaper>
    </Box>
  );
};

export default Settings;
