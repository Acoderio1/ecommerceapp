import { configureStore } from 'react-redux'
const initialState = {
  variables: []
}

const variableReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_VARIABLE':
      return {
        ...state,
        variables: [...state.variables, action.payload]
      }
    default:
      return state;
  }
}

const store = configureStore({
  reducer: {
    variables: variableReducer,
},
});

export default store;