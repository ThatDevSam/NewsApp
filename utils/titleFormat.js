
//This function removes the news source name followed by a dash from the title argument and returns a new title string.
const titleFormat = (title) => {
    let newTitle = ''
    let indexOfDash = title.lastIndexOf('-')
    newTitle = title.slice(0, indexOfDash)
    return newTitle
}

export default titleFormat