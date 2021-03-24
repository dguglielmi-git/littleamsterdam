import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { ADD_ALBUM } from "../../../gql/album";
import { Form, TextArea, Button } from "semantic-ui-react";
import "./AlbumForm.scss";

export default function AlbumForm(props) {
  const { setShowModal, refetchAlbum } = props;
  const [addAlbum] = useMutation(ADD_ALBUM);

  const formik = useFormik({
    initialValues: {
      title: "new Album",
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      try {
        await addAlbum({
          variables: {
            input: {
              title: formData.title,
            },
          },
        });
        toast.success("New Album has been added.");
        refetchAlbum();
        setShowModal(false);
      } catch (error) {
        toast.error("Error saving new Album...");
      }
    },
  });
  return (
    <div className="albumForm">
      <Form className="album-form" onSubmit={formik.handleSubmit}>
        <TextArea
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          className={formik.errors.title && "error"}
        />
        <Button type="submit" className="btn-submit">
          Agregar
        </Button>
      </Form>
    </div>
  );
}
