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
        dolar: action.dolar,
      };
    case 'euro':
      return {
        ...state,
        euro: action.euro,
      };
    case 'libra':
      return {
        ...state,
        libra: action.libra,
      };
    case 'francoSuico':
      return {
        ...state,
        francoSuico: action.francoSuico,
      };
    case 'yuan':
      return {
        ...state,
        yuan: action.yuan,
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
