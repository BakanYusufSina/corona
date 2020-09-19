module.exports = (x) => {
    return x !== 0 ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ''
}
