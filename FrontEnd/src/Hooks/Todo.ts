import { useEffect, useState } from "react";
import axios from "axios";
import { ITodo } from "../interfaces/todo";

const useAllTasks = () => {
  const [tasks, setTasks] = useState<ITodo[] | null>(null); // Assuming you are expecting an array of tasks
  const [loadingPage, setLoadingPage] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/todo');
        console.log("response.data");
        
        setTasks(response.data);
        setLoadingPage(false);
      } catch (err) {
        setError("Error fetching tasks data");
        setLoadingPage(false);
      }
    };

    fetchTasks();
  }, []);

  return { tasks, loadingPage, error };
};

export default useAllTasks;
