const textCapitalize = (data) => {
    return data ? data.trim() ? data.charAt(0).toUpperCase() + data.slice(1) : data : data
}

module.exports = {
    textCapitalize
}