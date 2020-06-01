import axios from 'axios';

const base_url = 'https://alallskdjfhalall-todo-spring.herokuapp.com/api/todos';

export const getTodos = async () => {
     try{
        let response = await axios.get(base_url);
        let {data} = await axios.get(base_url)
        console.log("Response", response)
        console.log("data", data)
        return response.data;
    } catch(error) {
        return error;
    }
};

export const getTodoById = (id: number) => {

}

export const postTodo = () => {

}

export const updateTodoById = () => {

}

export const deleteTodoById = (id: number) => {

}