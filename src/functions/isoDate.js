module.exports = () => {
    let currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    end = createIsoDate(currentDate)
    return end
}

createIsoDate = (date) => {
    var dd = date.getDate()
    var MM = date.getMonth() + 1
    if (dd < 10) {
        dd = '0' + dd
    }
    if (MM < 10) {
        MM = '0' + MM
    }
    return (date.getFullYear() + '-' + MM + '-' + dd)
}