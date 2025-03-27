import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "./validationSchema";

const initialValues = {
  name: "",
  email: "",
  age: "",
  password: "",
  gender: "",
  terms: false,
};

const onSubmit = (values, { resetForm }) => {
  console.log("Submitted Data:", values);
  alert("Form submitted successfully!");
  resetForm();
};

const ComplexForm = () => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          {/* Name Field */}
          <div>
            <label>Name:</label>
            <Field type="text" name="name" placeholder="Enter your name" />
            <ErrorMessage name="name" component="div" style={{ color: "red" }} />
          </div>

          {/* Email Field */}
          <div>
            <label>Email:</label>
            <Field type="email" name="email" placeholder="Enter your email" />
            <ErrorMessage name="email" component="div" style={{ color: "red" }} />
          </div>

          {/* Age Field */}
          <div>
            <label>Age:</label>
            <Field type="number" name="age" placeholder="Enter your age" />
            <ErrorMessage name="age" component="div" style={{ color: "red" }} />
          </div>

          {/* Password Field */}
          <div>
            <label>Password:</label>
            <Field type="password" name="password" placeholder="Enter your password" />
            <ErrorMessage name="password" component="div" style={{ color: "red" }} />
          </div>

          {/* Gender Dropdown */}
          <div>
            <label>Gender:</label>
            <Field as="select" name="gender">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Field>
            <ErrorMessage name="gender" component="div" style={{ color: "red" }} />
          </div>

          {/* Terms and Conditions Checkbox */}
          <div>
            <Field type="checkbox" name="terms" />
            <label>I accept the terms and conditions</label>
            <ErrorMessage name="terms" component="div" style={{ color: "red" }} />
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={isSubmitting} style={{ marginTop: "10px", padding: "8px", cursor: "pointer" }}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ComplexForm;
