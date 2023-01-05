import React from 'react';

const initialState = {
  dolar: 0,
  euro: 0,
  libra: 0,
  francoSuico: 0,
  yuan: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dolar':
      return {
        ...state,
        dolar: action.payload,
      };
    case 'euro':
      return {
        ...state,
        euro: action.payload,
      };
    case 'libra':
      return {
        ...state,
        libra: action.payload,
      };
    case 'francoSuico':
      return {
        ...state,
        francoSuico: action.payload,
      };
    case 'yuan':
      return {
        ...state,
        yuan: action.payload,
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
