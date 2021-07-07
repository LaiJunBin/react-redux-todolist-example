import {DELETE_TODO_FROM_INDEX, PUSH_TODO, SET_SEARCH_TEXT, SET_TODOS, UPDATE_TODO} from "../actionTypes";

function pushTodo(state, action) {
    const todos = [...state.todos];
    todos.push(action.todo);
    return {...state, todos}
}

function updateTodo(state, action) {
    const todos = [...state.todos];
    todos[action.index] = action.todo;
    return {...state, todos}
}

function deleteTodoFromIndex(state, action) {
    const todos = [...state.todos];
    todos.splice(action.index, 1);
    return {...state, todos};
}

function setTodos(state, action) {
    return {...state, todos: action.todos};
}

function setSearchText(state, action) {
    return {...state, searchText: action.text};
}

export const reducer = (state, action) => {
    switch (action.type) {
        case PUSH_TODO:
            return pushTodo(state, action);
        case UPDATE_TODO:
            return updateTodo(state, action);
        case DELETE_TODO_FROM_INDEX:
            return deleteTodoFromIndex(state, action);
        case SET_TODOS:
            return setTodos(state, action);
        case SET_SEARCH_TEXT:
            return setSearchText(state, action);
        default:
            return state;
    }
}
