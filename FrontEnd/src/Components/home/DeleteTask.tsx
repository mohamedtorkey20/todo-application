import React, { FC, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';
import { ITodo } from '../../interfaces/todo';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
  id?:number
  renderTasksAfterDeleted:(tasks:ITodo[])=>void;

}


const DeleteTask: FC<IProps> = ({id,renderTasksAfterDeleted}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //----------------------handle delete Task----------------------------------------
  const handleDeleteTask = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/todo/${id}`);

      console.log('Task Deleted successfully:', response.data);

      renderTasksAfterDeleted(response.data);
      handleClose();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ textAlign: '', mt: 1 }}>
        <Button  onClick={handleClickOpen}>
        <MdDeleteForever className="text-red-600 hover:text-red-700 w-7 h-7 transition-transform duration-300 hover:scale-150 "/>     
           </Button>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ '& .MuiDialog-paper': { width: '600px', maxWidth: '600px' } }}
      >
        <Typography component="div" className="text-center p-2 rounded-t-lsm text-white bg-blue-600" gutterBottom>
          Delete Your Task
        </Typography>
        <DialogTitle className='text-red-500'>Confirm Delete Your Task?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} >Cancel</Button>
          <Button  className='text-red-500' onClick={handleDeleteTask}>Delete</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteTask;
