export const getRootComments = (comments) => {
  try {
    return (
      comments &&
      comments
        .filter((c) => !c.comment_parent)
        .sort(
          (a, b) => new Date(b.commentCreatedAt) - new Date(a.commentCreatedAt)
        )
    );
  } catch (error) {
    console.log(error);
  }
};

export const getReplyComments = (comments, commentId) => {
  try {
    return (
      comments &&
      comments
        .filter((c) => c.comment_parent === commentId)
        .sort(
          (a, b) => new Date(b.commentCreatedAt) - new Date(a.commentCreatedAt)
        )
    );
  } catch (error) {
    console.log(error);
  }
};

export const handleOpenModal = (setOpenModal) => {
  setOpenModal(true);
  document.body.style.overflow = "hidden";
};

export const handleCloseModal = (setOpenModal) => {
  setOpenModal(false);
  document.body.style.overflow = "auto";
};
