import { FC, useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { MdDateRange } from "react-icons/md";
import AddTask from "./AddTask";
import DeleteTask from "./DeleteTask";
import useAllTasks from "../../Hooks/Todo";
import { ITodo } from "../../interfaces/todo";
import EditTask from "./EditTask";
import axios from "axios";

interface IProps {}

const Todo: FC<IProps> = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [taskDetails, setTaskDetails] = useState<ITodo | null>(null); // State to hold task details
  const { tasks, loadingPage, error } = useAllTasks();
  const [renderTasks, setRenderTasks] = useState<ITodo[]>([]);

  useEffect(() => {
    if (tasks) {
      setRenderTasks(tasks);
    }
  }, [tasks]);

  if (loadingPage) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


 


  const renderTasksAfterAdded = (newTasks: ITodo[]) => {
    setRenderTasks(newTasks);
  };

  const renderTasksAfterDeleted = (newTasks: ITodo[]) => {
    setRenderTasks(newTasks);
  };

  const renderTasksAfterUpdated = (newTasks: ITodo[]) => {
    setRenderTasks(newTasks);
  };

  // Function to handle displaying task details based on ID
  const showTaskDetails = async (taskId: number) => {
    setSelectedTaskId(taskId);
    try {
      const response = await axios.get<ITodo>(`http://localhost:3000/todo/${taskId}`);
      setTaskDetails(response.data);
      setShowDetails(true);
    } catch (error) {
      console.error('Error fetching task details:', error);
    }
  };

  // Function to hide task details
  const hideTaskDetails = () => {
    setSelectedTaskId(null);
    setTaskDetails(null);
    setShowDetails(false);
  };

  // Function to handle checkbox change
  // Function to handle checkbox change
const handleCheckboxChange = async (taskId: number, checked: boolean) => {
  try {
    const response = await axios.put<ITodo>(`http://localhost:3000/todo/${taskId}`, {
      complete: checked,
    });
    const updatedTask = response.data;

    // Update the task in the renderTasks state
    setRenderTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );

    // Update task details if the selected task is the updated one
    if (taskDetails && taskDetails.id === updatedTask.id) {
      setTaskDetails(updatedTask);
    }

    // Filter renderTasks to show only completed tasks
    updateTaskAfterCompleted();

  } catch (error) {
    console.error('Error updating task status:', error);
  }
};

const formatDate = () => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' } as const;
  const today = new Date();
  return today.toLocaleDateString('en-US', options);
};

  const updateTaskAfterCompleted = () => {
    const completedTasks = renderTasks.filter(task => task.complete);
    setRenderTasks(completedTasks);
  };

  //----------------render tasks---------------------------------------
  const renderTaskItems = renderTasks
  .filter(task => task.complete===false) // Filter tasks to show only completed tasks
  .map((task, index) => (
    <div key={index} className="rounded-lg w-full border p-1 flex justify-between items-center hover:bg-slate-300">
      <div className="p-3">
        <div className="flex gap-1 items-center justify-start">
          <Checkbox
            checked={task.complete}
            onChange={(event) => handleCheckboxChange(task.id, event.target.checked)}
            inputProps={{ "aria-label": "controlled" }}
            size={"small"}
          />
          <button
            onClick={() => {
              showTaskDetails(task.id);
            }}
          >
            <p className="text-lg">{task.name}</p>
          </button>
        </div>
        <div className="flex items-center text-xs text-slate-400 px-10">
          <MdDateRange size={15} />
          {task.dateTime}
        </div>
      </div>
      <div className="flex me-10">
        <DeleteTask
          renderTasksAfterDeleted={renderTasksAfterDeleted}
          id={task.id}
        />
        <EditTask
          renderTasksAfterUpdated={renderTasksAfterUpdated}
          id={task.id}
        />
      </div>
    </div>
  ));

  
  return (
    <>
      <div className="flex">
        <div className={`flex flex-col gap-6 ${showDetails ? "w-9/12" : "w-full"}`}>
          <div className="space-y-5 pl-10 py-5 border-b">
            <div className="flex text-sm text-blue-900">
              <p>General {'>'} </p>
              <p>Todo</p>
            </div>
            <div className="font-semibold text-3xl text-blue-900">Todo</div>
          </div>
          <div>
            <div className="flex justify-between items-center p-10">
              <h3 className="text-lg font-semibold text-stone-950">Today, {formatDate()}</h3>
              <AddTask renderTasksAfterAdded={renderTasksAfterAdded} />
            </div>
          </div>
          <div className="p-10 flex flex-col gap-3 scroll-m-0">{renderTaskItems}</div>
        </div>
        <div className={`border-l ${showDetails ? "w-3/12" : "hidden"}`}>
          {showDetails && selectedTaskId !== null && taskDetails && (
            <div className="p-1 text-blue-950">
              <h2 className="text-xl font-semibold p-5">Task Details</h2>
              <div className="border rounded-lg h-96 p-10 pt-3 pl-3">
                <h4 className="font-semibold text-xl text-center">{taskDetails.name}</h4>
                <p className="mt-6 text-sm text-start text-gray-400">{taskDetails.description}</p>
                <p className="mt-6 flex items-center">
                  <MdDateRange size={50} />
                  <span className="text-gray-400">{taskDetails.dateTime}</span>
                </p>
                <p><strong>Complete:</strong> {taskDetails.complete ? "Yes" : "No"}</p>
              </div>
              <button className="mt-4 text-blue-500" onClick={hideTaskDetails}>
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Todo;
