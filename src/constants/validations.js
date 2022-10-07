export const required = value => {
    console.log('required', typeof value)
    if (Array.isArray(value)) {
        if (value.length > 0) {
            return undefined
        } else {
            return 'This field is required'
        }

    } else if ((value && typeof value === 'number') || (value && typeof value === 'object') || (value && value.trim())) {
        return undefined
    } else {
        return 'This field is required'
    }
}

export const emailField = (value) => {
    return (value ?
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
            'Invalid email address' : '' : 'Email is required')
}
export const number = value => (value && isNaN(Number(value))) ? 'Must be a number' : Number(value) <= 0 ? 'Value should be greater than zero' : undefined
export const validatePhone = (data) => {
    let phoneFormat = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/
    if (data.match(phoneFormat) && data.length == 10) {
        return ''
    } else {
        return 'Please enter correct phone number'
    }
}
export const notDecimal = (value) => {
    let regex = /^[-+]?[0-9]+\.[0-9]+$/;
    let match = (value.toString()).match(regex)
    return match ? "Experience should not be in decimals" : ''
}
export const validatePinCode = (value) => {

    let format = /^[1-9][0-9]{5}$/
    if (!value) {
        return ''
    }
    if (value.match(format)) {
        return ''
    } else {
        return 'Please enter correct pincode'
    }
}
export const speciaCharacter = (value) => {
    let regex = /^[a-zA-Z0-9 ]+$/;
    let isValid = value ? regex.test(value) : true
    if (!isValid) {
        return 'Special characters are not allowed'
    } else {
        return ''
    }
}
export const latlong = (value) => {
    console.log('value', value)
    return (!value ? 'Please search and select address' : '')
}
export const arrayData = (value) => value.length === 0 ? 'Please select atleast one option' : ''
export const validateDate = (value) => {
    let date = new Date()
    let selectedDate = new Date(value)
    if (selectedDate < date) {
        return "Selected date should be greater than today's date"
    }
}
export const shouldNotBeLess = (value, allValues, props) => {
    console.log('data')
}
