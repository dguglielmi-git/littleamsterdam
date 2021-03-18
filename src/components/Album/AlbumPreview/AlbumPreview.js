import React, { useState } from "react";
import { Image, Icon, Confirm } from "semantic-ui-react";
import ImgNotFound from "../../../assets/imgNotFound.png";
import { DELETE_ALBUM } from "../../../gql/album";
import { Tooltip } from "primereact/tooltip";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import "./AlbumPreview.scss";

export default function PreviewPublication(props) {
  const { album, isAlbum, refetchAlbum, handleAlbumSelect } = props;
  const [showConfig, setShowConfirm] = useState(false);
  const [removeAlbum] = useMutation(DELETE_ALBUM);

  const handleConfirm = () => {
    setShowConfirm(true);
  };

  const closeConfirm = () => setShowConfirm(false);

  const deleteAlbum = async () => {
    try {
      await removeAlbum({
        variables: { idAlbum: album.id },
      });
      toast.success("El album se ha eliminado correctamente");
      refetchAlbum();
    } catch (error) {
      toast.error("Error al intentar eliminar el Album");
    }
    setShowConfirm(false);
  };

  return (
    <React.Fragment>
      <div className="preview-album">
        <div className="preview-album__title">
          <strong>{album.title}</strong>
          {isAlbum && (
            <div
              className="preview-album__title delete"
              data-pr-tooltip="Eliminar Album"
            >
              <Tooltip target=".delete" position="bottom" />
              <Icon
                link
                name="trash alternate"
                color="black"
                onClick={() => handleConfirm()}
              />
            </div>
          )}
        </div>
        <Image
          className="preview-album__image"
          src={album.picture === "none" ? ImgNotFound : album.picture}
          onClick={() => handleAlbumSelect(album.id)}
        />
      </div>
      <Confirm
        open={showConfig}
        onCancel={closeConfirm}
        onConfirm={deleteAlbum}
        content="Desea eliminar el album?"
        size="mini"
      />
    </React.Fragment>
  );
}
