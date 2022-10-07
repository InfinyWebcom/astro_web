import AxiosFunction from 'util/axiosRequest'

const asyncValidate = async (values) => {
    console.log("Axios values", values.email)
    let user_id = values.user_id ? values.user_id : ''
    let errors = {}
    if (values.email) {
        let data = await AxiosFunction.axiosHelperFunc('post', 'user/validateEmail', { email: values.email, user_id, user_type: 'astrologer' })
        console.log("Axios", data)
        if (data.data.isExist) {
            errors.email = 'Email already taken'
        }
    }
    if (values.mobile) {
        let data = await AxiosFunction.axiosHelperFunc('post', 'user/validateEmail', { mobile: values.mobile, user_id, user_type: 'astrologer' })
        console.log("Axios", data)
        if (data.data.isExist) {
            errors.mobile = 'This contact number already taken'
        }
    }
    if (errors.mobile || errors.email) {
        throw errors
    }



};

export default asyncValidate;