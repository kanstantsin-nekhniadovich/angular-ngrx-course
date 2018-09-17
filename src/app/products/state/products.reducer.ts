export function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_DISPLAY_CODE':
      return {
        ...state,
        showProductCode: action.payload
      }
    default:
      return state;
  }
}