import React, { useContext } from "react";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
import Context from "../store/context.js";

const OnDeletePopup = ({ openModal, toggle, removeTask, id }) => {
  const ctx = useContext(Context);

  const proceedDeletingHandler = () => {
    removeTask(id);
    ctx.setDeleted(true);
    toggle();
  };

  return (
    <Modal isOpen={openModal} toggle={toggle}>
      <ModalHeader
        color="danger"
        className=" border-danger-subtle bg-danger-subtle "
      >
        Are you sure you want to remove the task?
      </ModalHeader>

      <ModalFooter>
        <Button onClick={proceedDeletingHandler} color="danger" id={id}>
          Proceed
        </Button>
        <Button onClick={toggle} color="secondary">
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default OnDeletePopup;
