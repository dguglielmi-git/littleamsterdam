import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import "./PasswordForm.scss";

export default function PasswordForm(props) {
  const { logout } = props;
  const [updateUser] = useMutation(UPDATE_USER);
  /*
     Estructura del formulario con sus respectivas validaciones
     Luego esto se relaciona con el Formulario normal para que esten conectados.
  */
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(),
      newPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("repeatNewPassword")]),
      repeatNewPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("newPassword")]),
    }),
    onSubmit: async (formValues) => {
      try {
        const result = await updateUser({
          variables: {
            input: {
              currentPassword: formValues.currentPassword,
              newPassword: formValues.newPassword,
            },
          },
        });

        if (!result.data.updateUser) {
          toast.error("Error al cambiar el password");
        } else {
          toast.success("El password ha sido actualizado correctamente.");
          logout();
        }
      } catch (error) {
        toast.error("Error al cambiar el password");
      }
    },
  });

  return (
    /*
        Relacionamos nuestro formulario con el objeto formik que posee las configuraciones
        le agregamos las propiedades:
        value={formik.values.<campo>
        onChange={formik.handleChange}
        error={formik.errors.<campo>}
        ***si queremos que el campo no muestre mensaje pero que se marque con rojo usamos lo siguiente:
        error={formik.errors.<campo> && true}
    */
    <Form className="password-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        type="password"
        placeholder="Contraseña Actual"
        name="currentPassword"
        value={formik.values.currentPassword}
        onChange={formik.handleChange}
        error={formik.errors.currentPassword && true}
      />
      <Form.Input
        type="password"
        placeholder="Nueva Contraseña"
        name="newPassword"
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        error={formik.errors.newPassword && true}
      />
      <Form.Input
        type="password"
        placeholder="Repetir Nueva Contraseña"
        name="repeatNewPassword"
        values={formik.values.repeatNewPassword}
        onChange={formik.handleChange}
        error={formik.errors.repeatNewPassword && true}
      />
      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
}

function initialValues() {
  return {
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };
}
