import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required").min(3, "Minimum 3 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  age: Yup.number().required("Age is required").positive("Must be a positive number").integer("Must be a whole number"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  gender: Yup.string().required("Please select a gender"),
  terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
});

export default validationSchema;
