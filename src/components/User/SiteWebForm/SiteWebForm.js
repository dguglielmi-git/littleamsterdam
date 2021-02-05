import React from "react";
import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import "./SiteWebForm.scss";

export default function SiteWebForm(props) {
  const { setShowModal, currentSiteWeb, refetch } = props;
  const [updateUser] = useMutation(UPDATE_USER);
  const formik = useFormik({
    initialValues: {
      siteWeb: currentSiteWeb || "",
    },
    validationSchema: Yup.object({
      siteWeb: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      try {
        await updateUser({
          variables: {
            input: formData,
          },
        });
        refetch();
        toast.success("Se actualizo el sitio web correctamente");
        setShowModal(false);
      } catch (error) {
        toast.error("Error al actualizar el Sitio Web");
      }
    },
  });
  return (
    <Form className="site-web-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="siteWeb"
        placeholder="Sitio Web"
        value={formik.values.siteWeb}
        onChange={formik.handleChange}
        className={formik.errors.siteWeb && "error"}
      />
      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
}
