import { FC, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import { ITodo } from '../../interfaces/todo';
import { FaRegEdit } from "react-icons/fa";
import 'dayjs/locale/en'; // import locale if necessary

interface IProps {
  id?: number;
  renderTasksAfterUpdated: (tasks: ITodo[]) => void;
}

const EditTask: FC<IProps> = ({ renderTasksAfterUpdated, id }) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [taskDetails, setTaskDetails] = useState<ITodo>({
    name: '',
    dateTime: '',
    description: '',
    userId: 1,
    complete: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchTaskDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/todo/${id}`);
      const { name, dateTime, description, userId, complete } = response.data;
      setTaskDetails({ name, dateTime, description, userId, complete });
      setSelectedDate(dateTime ? dayjs(dateTime) : null);
      console.log('Fetch Task details successfully:', response.data);
    } catch (error) {
      console.error('Error fetching task details:', error);
    }
  };

  useEffect(() => {
    if (open && id) {
      fetchTaskDetails();
    }
  }, [open, id]);

  const handleUpdateTask = async (event: React.FormEvent<HTMLFormElement>) => {
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

      const response = await axios.put(`http://localhost:3000/todo/${id}`, updatedTaskDetails);

      console.log('Task updated successfully:', response.data);
      renderTasksAfterUpdated(response.data);
      handleClose();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <>
      <Button onClick={handleClickOpen}>
        <FaRegEdit size={20} className="text-blue-600 hover:text-blue-700 w-6 h-6 transition-transform duration-300 hover:scale-150 " />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          style: { width: '550px', maxWidth: '90%' },
          onSubmit: handleUpdateTask,
        }}
      >
        <Typography
          component="div"
          className="text-center p-2 rounded-t-lsm text-white bg-blue-600"
          gutterBottom
        >
          Update Your Task
        </Typography>
        <DialogContent>
          <div className="flex flex-col gap-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Date & Time"
                value={selectedDate}
                onChange={(newValue: Dayjs | null) => setSelectedDate(newValue)}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    value={selectedDate ? selectedDate.format('MM/DD/YYYY hh:mm A') : ''} 
                  />
                )}
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
              value={taskDetails.name}
              onChange={(e) => setTaskDetails({ ...taskDetails, name: e.target.value })}
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
              value={taskDetails.description}
              onChange={(e) => setTaskDetails({ ...taskDetails, description: e.target.value })}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Update Task</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditTask;
