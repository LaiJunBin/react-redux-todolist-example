import {DELETE_TODO_FROM_INDEX, PUSH_TODO, SET_SEARCH_TEXT, SET_TODOS, UPDATE_TODO} from "./actionTypes";

export const pushTodo = todo => ({type: PUSH_TODO, todo});
export const updateTodo = (index, todo) => ({type: UPDATE_TODO, index, todo});
export const deleteTodoFromIndex = index => ({type: DELETE_TODO_FROM_INDEX, index});
export const setTodos = todos => ({type: SET_TODOS, todos});

export const setSearchText = text => ({type: SET_SEARCH_TEXT, text});
