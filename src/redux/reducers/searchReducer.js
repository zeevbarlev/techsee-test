import {
  INVALIDATE_REQUEST,
  RECEIVE_BUGS,
  RECEIVE_TESTERS,
  REQUEST_BUGS,
  REQUEST_TESTERS
} from '../actions/searchAction'

const initialState = {
  data: [],
  didInvalidate: false,
  isFetching: false,
  isNotFound: false
}

const parseData = (data) => data && JSON.parse(data)  
export default function requestData(state = initialState, action) {
  switch (action.type) {
    case REQUEST_BUGS:
    case REQUEST_TESTERS:
      return {
        ...state,
        ...initialState,
        isFetching: true,
        query: action.query
      }
    case RECEIVE_BUGS:
    const parsedData = parseData(action.data)

      return {
        ...state,
        ...initialState,
        data: parsedData ? [ parsedData ] : [],
        isNotFound: !action.data
      }
    case RECEIVE_TESTERS:
      return {
        ...state,
        ...initialState,
        data: parseData(action.data) || [],
        isNotFound: !action.data
      }
    case INVALIDATE_REQUEST:
      return {
        ...state,
        ...initialState,
        didInvalidate: true,
      }
    default:
      return state
  }
}