import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const ModalWindow = ({
  open,
  contentText,
  confirmBtnText,
  closeBtnText,
  handleClose,
  onConfirmation,
}) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-describedby="dialog-description"
  >
    <DialogContent>
      <DialogContentText id="dialog-description">
        {contentText}
      </DialogContentText>
    </DialogContent>
    <DialogActions style={{ justifyContent: "center" }}>
      {onConfirmation && (
        <Button
          onClick={onConfirmation}
          color="primary"
          autoFocus
          variant="contained"
        >
          {confirmBtnText}
        </Button>
      )}
      <Button onClick={handleClose} variant="contained">
        {closeBtnText}
      </Button>
    </DialogActions>
  </Dialog>
);

ModalWindow.propTypes = {
  open: PropTypes.bool.isRequired,
  contentText: PropTypes.string.isRequired,
  confirmBtnText: PropTypes.string,
  closeBtnText: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  onConfirmation: PropTypes.func,
};

export default ModalWindow;
