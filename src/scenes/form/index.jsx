import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { loadUsers, saveUsers } from "../../data/storage";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
    loadUsers().then((data) => {
       saveUsers([...data, values]);
    })
    // navigator('/users');
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

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
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="First Name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.firstName}
          name="firstName"
          error={touched.firstName && !!errors.firstName}
          helperText={touched.firstName && errors.firstName}
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Last Name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.lastName}
          name="lastName"
          error={touched.lastName && !!errors.lastName}
          helperText={touched.lastName && errors.lastName}
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="email"
          label="Email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name="email"
          error={touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          sx={{ gridColumn: "span 4" }}
        />
          <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Username"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.username} // Ensure your initialValues include 'username'
          name="username"
          error={touched.username && !!errors.username}
          helperText={touched.username && errors.username}
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="password" // Set to password type
          label="Password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password} // Ensure your initialValues include 'password'
          name="password"
          error={touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          sx={{ gridColumn: "span 2" }}
        />
      
        <TextField
          fullWidth
          multiline // Enable multiline for the comments textarea
          rows={4}
          variant="filled"
          type="text"
          label="Comments"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.comments} // Ensure your initialValues include 'comments'
          name="comments"
          error={touched.comments && !!errors.comments}
          helperText={touched.comments && errors.comments}
          sx={{ gridColumn: "span 4" }}
        />
      </Box>
      <Box display="flex" justifyContent="end" mt="20px">
        <Button type="submit" color="secondary" variant="contained">
          Create New User
        </Button>
      </Box>
    </form>
  )}
</Formik>

    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

export default Form;
