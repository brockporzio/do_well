import { gql, useMutation, useQuery } from "@apollo/client";

// Queries
export const GET_TASKS_FOR_USER = gql`
  query getTasksForUser {
    task(where: { task_user: { _eq: 4 } }) {
      task_name
      task_description
    }
  }
`;

export const GET_ALL_TASKS = gql`
  query getAllTasks {
    task {
      task_name
      task_description
      task_type
    }
  }
`;

export const GET_TASKS_WITH_LOCATION = gql`
  query GetTasksWithLocations {
    task {
      task_id
      task_name
      task_type
      task_location {
        task_location_day_hour
        task_location_task_id
      }
    }

  }
`;

// Mutations
export const INSERT_TASK = gql`
  mutation InsertTask(
    $task_id: Int!,
    $task_name: String!,
    $task_type: String!,
    $task_description: String,
    $task_user: Int!,
    $task_location_day_hour: json,
  ) {
    insert_task(objects: {
      task_id: $task_id,
      task_name: $task_name,
      task_type: $task_type,
      task_description: $task_description,
      task_user: $task_user,
    }) {
      returning {
        task_id
      }
    }
    insert_task_location(objects: {
      task_location_task_id: $task_id,
      task_location_day_hour: $task_location_day_hour,
    }) {
      returning {
        task_location_day_hour
      }
    }
  }
`;


export function useGetTasksForUser() {
  const { data, loading, error } = useQuery(GET_TASKS_FOR_USER);
  return { data, loading, error };
}

export function useGetAllTasks() {
  const { data, loading, error } = useQuery(GET_ALL_TASKS);
  return { data, loading, error };
}

export function useInsertTask() {
  const [insertTask, { data, loading, error }] = useMutation(INSERT_TASK);

  const addTask = (task_id, task_name, task_type, task_description = null, task_user, task_location_day_hour) => {
    insertTask({
      variables: {
        task_id,
        task_name,
        task_type,
        task_description,
        task_user,
        task_location_day_hour,
      }
    });
  };

  return { addTask, data, loading, error };
}

export const useGetTasksWithLocation = () => {
    const { data, loading, error } = useQuery(GET_TASKS_WITH_LOCATION);
    return { data, loading, error };
  };
