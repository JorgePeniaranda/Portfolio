import projects from './projects.json'

function fetchData () {
  return Object.entries(projects)
}

export { fetchData }
