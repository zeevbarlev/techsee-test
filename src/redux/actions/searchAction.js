import * as appServise from "../../servises/searchServise";
export const REQUEST_BUGS = 'REQUEST_BUGS'
export const REQUEST_TESTERS = 'REQUEST_TESTERS'
export const INVALIDATE_REQUEST = 'INVALIDATE_REQUEST'
export const RECEIVE_BUGS = 'RECEIVE_BUGS'
export const RECEIVE_TESTERS = 'RECEIVE_TESTERS'


export function requestBugs(testerName) {
  return {
    type: REQUEST_BUGS,
    query: testerName
  }
}


export function requestTesters() {
  return {
    type: REQUEST_TESTERS,
    query: 'all'
  }
}

export function invalidateRequest() {
  return {
    type: INVALIDATE_REQUEST
  }
}


function receiveBugs(res) {
  return {
    type: RECEIVE_BUGS,
    data: res
  }
}

function receiveTesters(res) {
  return {
    type: RECEIVE_TESTERS,
    data: res
  }
}

export function search(query){
  if(query && query.toLowerCase() === appServise.PATH_FOR_TESTERS_NAMES){
    return fetchTesters(query)
  }

  return fetchBugs(query)
}
function fetchBugs(testerName) {
  return dispatch => {
    dispatch(requestBugs(testerName))
    return appServise.fetchBugs(testerName)
    .then(res => dispatch(receiveBugs(res)))
    .catch(e => dispatch(invalidateRequest(e)))
      
  }
}

function fetchTesters() {
  return dispatch => {
    dispatch(requestTesters())
    return appServise.fetchTesters()
    .then(res => dispatch(receiveTesters(res)))
    .catch(e => dispatch(invalidateRequest(e)))

  }
}