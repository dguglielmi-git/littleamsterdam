import React, { useState } from "react";
import ImgNotFound from "../../../assets/imgNotFound.png";
import { Image, Icon, Confirm } from "semantic-ui-react";
import { DELETE_ALBUM } from "../../../gql/album";
import { useMutation } from "@apollo/client";
import { Tooltip } from "primereact/tooltip";
import { toast } from "react-toastify";
import "./AlbumPreview.scss";

export default function PreviewPublication(props) {
  const { album, isAlbum, refetchAlbum, handleAlbumSelect } = props;
  const [showConfig, setShowConfirm] = useState(false);
  const [removeAlbum] = useMutation(DELETE_ALBUM);

  const CONFIRM_DELETE = "Desea eliminar el album?";
  const ERROR_ON_DELETE = "Error al intentar eliminar el Album";
  const ALBUM_DELETED = "El album se ha eliminado correctamente";

  const handleConfirm = () => setShowConfirm(true);
  const closeConfirm = () => setShowConfirm(false);

  const deleteAlbum = async () => {
    try {
      await removeAlbum({
        variables: { idAlbum: album.id },
      });
      toast.success(ALBUM_DELETED);
      refetchAlbum();
    } catch (error) {
      toast.error(ERROR_ON_DELETE);
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
        <div className="preview-album__image-box">
          <Image
            className="preview-album__image"
            src={album.picture === "none" ? ImgNotFound : album.picture}
            onClick={() => handleAlbumSelect(album.id)}
          />
        </div>
      </div>
      <Confirm
        open={showConfig}
        onCancel={closeConfirm}
        onConfirm={deleteAlbum}
        content={CONFIRM_DELETE}
        size="mini"
      />
    </React.Fragment>
  );
}
