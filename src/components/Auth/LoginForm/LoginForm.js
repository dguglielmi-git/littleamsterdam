import React, { useState } from "react";
import { Form, Button, Image } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import useAuth from "../../../hooks/useAuth";
import Logo from "../../../assets/Logo.png";
import { setToken, decodeToken } from "../../../utils/token";
import "./LoginForm.scss";

export default function LoginForm() {
  const [error, setError] = useState("");

  const { setUser } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      email: Yup.string().email("Wrong email").required("Email Required"),
      password: Yup.string().required("Password required"),
    }),
    onSubmit: async (formData) => {
      try {
        console.log(formData);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <div className="login-form__logo">
        <Image src={Logo} />
      </div>

      <Form.Input
        type="text"
        placeholder="Username or Email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        type="password"
        placeholder="Password required"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <Button fluid type="submit" className="btn-submit">
        Login
      </Button>
    </Form>
  );
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}
