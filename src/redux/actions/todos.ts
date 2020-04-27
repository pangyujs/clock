import {ADD_TODO, ADD_TOMATO, EDIT_TODO, INIT_TODOS, UPDATE_TODO} from '../actionType';


export const addTodo = (payload: any) => {
  return {
    type: ADD_TODO,
    payload
  };
};
export const initTodos = (payload: any) => {
  return {
    type: INIT_TODOS,
    payload
  };
};
export const updateTodo = (payload: any) => {
  return {
    type: UPDATE_TODO,
    payload
  };
};
export const editTodo = (payload: number) => {
  return {
    type: EDIT_TODO,
    payload
  };
};
