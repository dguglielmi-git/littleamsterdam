import React, { useEffect } from "react";
import { map } from "lodash";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "../../../../gql/comment";
import {formatDate} from "../../../../utils/util"
import ImageNotFound from "../../../../assets/notLogin.png";
import "./Comments.scss";

export default function Comments(props) {
  const { publication } = props;
  const { data, loading, startPolling, stopPolling } = useQuery(GET_COMMENTS, {
    variables: {
      idPublication: publication.id,
    },
  });
  console.log(publication)

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return null;
  const { getComments } = data;

  return (
    <div className="comments">
      {map(getComments, (comment, index) => (
        <Link
          key={index}
          to={`/profile/${comment.idUser.username}`}
          className="comment"
        >
          <Image src={comment.idUser.avatar || ImageNotFound} avatar />
          <div>
            <p>{comment.idUser.username} - {formatDate(new Date(comment.createAt * 1))}</p>
            <p>{comment.comment}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
