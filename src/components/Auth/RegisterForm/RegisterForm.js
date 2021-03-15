import React from "react";
import { Form, Button, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Logo from "../../../assets/Logo.png";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../../gql/user";
import "./RegisterForm.scss";

export default function RegisterForm(props) {
  const { setShowLogin } = props;

  const [register] = useMutation(REGISTER);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      name: Yup.string().required(true),
      username: Yup.string()
        .matches(
          /^[a-zA-Z0-9-]*$/,
          "El nombre del usuario no puede tener espacios"
        )
        .required(true),
      email: Yup.string().email("El email no es valido").required(true),
      password: Yup.string()
        .required("Password es obligatorio")
        .oneOf([Yup.ref("repeatPassword")], "Los Passwords no coinciden"),
      repeatPassword: Yup.string()
        .required("Password es obligatorio")
        .oneOf([Yup.ref("password")], "Los passwords no coinciden"),
    }),
    onSubmit: async (formData) => {
      try {
        const newUser = formData;
        delete newUser.repeatPassword;

        await register({
          variables: {
            input: newUser,
          },
        });
        toast.success("Usuario registrado correctamente.");
        setShowLogin(true);
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <Form className="register-form" onSubmit={formik.handleSubmit}>
      <div className="register-form__logo">
        <Image src={Logo} />
      </div>
      <h3>Complete los datos para el registro.</h3>
      <Form.Input
        type="text"
        placeholder="Nombre y Apellido"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Input
        type="text"
        placeholder="Nombre de Usuario"
        name="username"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.errors.username}
      />
      <Form.Input
        type="text"
        placeholder="Email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        type="password"
        placeholder="Ingrese Password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <Form.Input
        type="password"
        placeholder="Repita el password"
        name="repeatPassword"
        value={formik.values.repeatPassword}
        onChange={formik.handleChange}
        error={formik.errors.repeatPassword}
      />
      <Button fluid type="submit" className="btn-submit">
        Registrese
      </Button>
    </Form>
  );
}

function initialValues() {
  return {
    name: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
}
