import { FC, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Dayjs } from 'dayjs';
import axios from 'axios';
import { ITodo } from '../../interfaces/todo';
interface IProps{
  renderTasksAfterAdded:(tasks:ITodo[])=>void;
}
const AddTask:FC<IProps> = ({renderTasksAfterAdded}) => {

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [taskDetails, setTaskDetails] = useState<ITodo>({
    name: '',
    dateTime: '',
    description: '',
    userId: 1
  });

//---------------handle open and close modal----------------------------------------------
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

//------------------------handle submit task----------------------------------------------

  const handleSubmitTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());

      const updatedTaskDetails = {
        ...taskDetails,
        name: formJson.name as string,
        dateTime: selectedDate?.toISOString() || '',
        description: formJson.description as string,
      };

      const response = await axios.post('http://localhost:3000/todo', updatedTaskDetails);

      console.log('Task added successfully:', response.data);
      renderTasksAfterAdded(response.data);
      handleClose(); 
    } catch (error) {
      console.error('Error adding task:', error);
    
    }
  };



  return (
    <>
      <button
        onClick={handleClickOpen}
        className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1 text-white font-bold text-sm py-2 px-4 border-b-4 border-blue-800 hover:border-blue-900 rounded-lg"
      >
        <IoIosAddCircleOutline color="white" size={24} /> New Task
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          style: { width: '550px', maxWidth: '90%' },
          onSubmit: handleSubmitTask,
        }}
      >
        <Typography
          component="div"
          className="text-center p-2 rounded-t-lsm text-white bg-blue-600"
          gutterBottom
        >
          Add Your Task
        </Typography>
        <DialogContent>
          <div className="flex flex-col gap-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Date & Time"
                value={selectedDate}
                onChange={(newValue: Dayjs | null) => setSelectedDate(newValue)}
              />
            </LocalizationProvider>
            <TextField
              autoFocus
              required
              fullWidth
              margin="dense"
              id="taskName"
              name="name"
              label="Task Name"
              type="text"
              variant="standard"
            />
            <TextField
              id="Description"
              label="Description"
              name="description"
              multiline
              rows={4}
              variant="filled"
              fullWidth
              margin="dense"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add Task</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTask;
