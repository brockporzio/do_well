import { gql, useQuery } from "@apollo/client";

export const GET_TASKS_FOR_USER = gql`
    query getTasksForUser {
        task(where: {task_user: {_eq: 4}}) {
            task_name
            task_description
        }
    }
`

export const GET_ALL_TASKS = gql`
    query getAllTasks {
        task {
            task_name
            task_description
        }
    }

`

export function useGetTasksForUser() {
    const { data, loading, error } = useQuery(GET_TASKS_FOR_USER);

    return { data, loading, error };
}

export function useGetAllTasks() {
    const { data, loading, error } = useQuery(GET_ALL_TASKS);

    return { data, loading, error };
}