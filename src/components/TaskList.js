import { useEffect } from 'react';
import { useGetAllTasks } from '../service/graphql/graphql-service';



function TaskList() {
    
    const { data, loading, error } = useGetAllTasks();
    console.log('%c: Data', 'color: red;', data)
  
    useEffect(() => {
      if (data) {
        console.log('Data:', data);
      }
      if (error) {
        console.error('Error:', error);
      }
    }, [data, error]);
  
    return null;
  }
  
  export default TaskList;
  