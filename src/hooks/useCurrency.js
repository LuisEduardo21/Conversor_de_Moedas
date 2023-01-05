import React from 'react';

const initialState = {
  dolar: 0,
  euro: 0,
  libra: 0,
  francoSuico: 0,
  yuan: 0,
};

function reducer(state, action) {
  console.log('--Reducer action: ', action);
  switch (action.type) {
    case 'dolar':
      return {
        ...state,
        dolar: action,
      };
    case 'euro':
      return {
        ...state,
        euro: action,
      };
    case 'libra':
      return {
        ...state,
        libra: action,
      };
    case 'francoSuico':
      return {
        ...state,
        francoSuico: action,
      };
    case 'yuan':
      return {
        ...state,
        yuan: action,
      };
    default:
      return state;
  }
}

export function useCurrency() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return {
    state,
    dispatch,
  };
}
