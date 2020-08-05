
export const PATH_FOR_TESTERS_NAMES = 'all'

export function fetchBugs(testerName) {
        return fetchData(testerName)
}

export function fetchTesters() {
        return fetchData(PATH_FOR_TESTERS_NAMES)
}

function fetchData(path) {
        return fetch(`http://localhost:5000/${path}`, {
                        method: 'GET',
        }).then(response => response.json())
}
