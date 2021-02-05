import React, { useState } from "react";
import { Icon, Button, Label } from "semantic-ui-react";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_LIKE,
  ADD_NOT_LIKE,
  ADD_TRASH,
  IS_LIKE,
  IS_NOT_LIKE,
  IS_TRASH,
  DELETE_LIKE,
  DELETE_NOT_LIKE,
  DELETE_TRASH,
  COUNT_LIKE,
  COUNT_NOT_LIKE,
  COUNT_TRASH,
} from "../../../../gql/like";
import "./Actions.scss";

export default function Actions(props) {
  const { publication } = props;
  const [loadingAction, setLoadingAction] = useState(false);
  const { width } = useWindowDimensions();

  const [addLike] = useMutation(ADD_LIKE);
  const [addNotLike] = useMutation(ADD_NOT_LIKE);
  const [addTrash] = useMutation(ADD_TRASH);
  const [deleteLike] = useMutation(DELETE_LIKE);
  const [deleteNotLike] = useMutation(DELETE_NOT_LIKE);
  const [deleteTrash] = useMutation(DELETE_TRASH);

  const { data, loading, refetch } = useQuery(IS_LIKE, {
    variables: {
      idPublication: publication.id,
    },
  });

  const {
    data: dataNotLike,
    loading: loadingNotLike,
    refetch: refetchNotLike,
  } = useQuery(IS_NOT_LIKE, {
    variables: {
      idPublication: publication.id,
    },
  });

  const {
    data: dataTrash,
    loading: loadingTrash,
    refetch: refetchTrash,
  } = useQuery(IS_TRASH, {
    variables: {
      idPublication: publication.id,
    },
  });

  const {
    data: dataCount,
    loading: loadingCount,
    refetch: refetchCount,
  } = useQuery(COUNT_LIKE, {
    variables: {
      idPublication: publication.id,
    },
  });

  const {
    data: dataCountNotLike,
    loading: loadingCountNotLike,
    refetch: refetchCountNotLike,
  } = useQuery(COUNT_NOT_LIKE, {
    variables: {
      idPublication: publication.id,
    },
  });

  const {
    data: dataCountTrash,
    loading: loadingCountTrash,
    refetch: refetchCountTrash,
  } = useQuery(COUNT_TRASH, {
    variables: {
      idPublication: publication.id,
    },
  });

  const onAddLike = async () => {
    setLoadingAction(true);
    try {
      await addLike({
        variables: {
          idPublication: publication.id,
        },
      });
      refetch();
      refetchCount();
    } catch (error) {
      console.log(error);
    }
    setLoadingAction(false);
  };

  const onAddNotLike = async () => {
    setLoadingAction(true);
    try {
      await addNotLike({
        variables: {
          idPublication: publication.id,
        },
      });
      refetchNotLike();
      refetchCountNotLike();
    } catch (error) {
      console.log(error);
    }
    setLoadingAction(false);
  };

  const onAddTrash = async () => {
    setLoadingAction(true);
    try {
      await addTrash({
        variables: {
          idPublication: publication.id,
        },
      });
      refetchTrash();
      refetchCountTrash();
    } catch (error) {
      console.log(error);
    }
    setLoadingAction(false);
  };

  const onDeleteLike = async () => {
    setLoadingAction(true);
    try {
      await deleteLike({
        variables: {
          idPublication: publication.id,
        },
      });
      refetch();
      refetchCount();
    } catch (error) {
      console.log(error);
    }
    setLoadingAction(false);
  };

  const onDeleteNotLike = async () => {
    setLoadingAction(true);
    try {
      await deleteNotLike({
        variables: {
          idPublication: publication.id,
        },
      });
      refetchNotLike();
      refetchCountNotLike();
    } catch (error) {
      console.log(error);
    }
    setLoadingAction(false);
  };

  const onDeleteTrash = async () => {
    setLoadingAction(true);
    try {
      await deleteTrash({
        variables: {
          idPublication: publication.id,
        },
      });
      refetchTrash();
      refetchCountTrash();
    } catch (error) {
      console.log(error);
    }
    setLoadingAction(false);
  };

  const onAction = (param) => {
    if (!loadingAction) {
      switch (param) {
        case "like":
          onDeleteLike();
          onDeleteNotLike();
          onDeleteTrash();
          onAddLike();
          break;
        case "notLike":
          onDeleteLike();
          onDeleteNotLike();
          onDeleteTrash();
          onAddNotLike();
          break;
        case "trash":
          onDeleteLike();
          onDeleteNotLike();
          onDeleteTrash();
          onAddTrash();
          break;
        default:
          break;
      }
    }
  };

  const rightSize = () => {
    if (width < 500) {
      return "mini";
    } else return "medium";
  };

  if (
    loading ||
    loadingCount ||
    loadingNotLike ||
    loadingCountNotLike ||
    loadingTrash ||
    loadingCountTrash
  )
    return null;

  const { isLike } = data;
  const { countLikes } = dataCount;
  const { isNotLike } = dataNotLike;
  const { countNotLikes } = dataCountNotLike;
  const { isTrash } = dataTrash;
  const { countTrash } = dataCountTrash;

  return (
    <div className={width < 500 ? "actions-cell" : "actions"}>
      <Button as="div" labelPosition="right">
        <Button
          color="blue"
          onClick={() => onAction("like")}
          size={rightSize()}
        >
          <Icon name="thumbs up outline" />
          Me gusta
        </Button>
        <Label as="a" basic color="blue" pointing="left">
          {countLikes}
        </Label>
      </Button>
      <Button as="div" labelPosition="right">
        <Button
          color="red"
          onClick={() => onAction("notLike")}
          size={rightSize()}
        >
          <Icon name="thumbs down outline" />
          No me gusta
        </Button>
        <Label as="a" basic color="red" pointing="left">
          {countNotLikes}
        </Label>
      </Button>
      <Button as="div" labelPosition="right">
        <Button
          color="green"
          onClick={() => onAction("trash")}
          size={rightSize()}
        >
          <Icon name="trash alternate outline" />
          Me chupa un huevo
        </Button>
        <Label as="a" basic color="green" pointing="left">
          {countTrash}
        </Label>
      </Button>
    </div>
  );
}
