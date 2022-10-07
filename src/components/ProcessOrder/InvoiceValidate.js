// import React, { Component } from 'react'
// import FormHelperText from '@material-ui/core/FormHelperText'

// const renderFromHelper = ({ touched, error }) => {
//     if (!(touched && error)) {
//         return
//     } else {
//         return <FormHelperText className='text-center' style={{color: '#f44336'}}>{touched && error}</FormHelperText>
//     }
// }

// export default class FieldFileInput extends Component {
//     constructor(props) {
//         super(props)
//     }

//     handleFileSelect(e) {
//         const { input: { onChange } } = this.props
//         let document = "";
//         let reader = new FileReader();
//         console.log('e.target.files', e.target.files);
//         reader.readAsDataURL(e.target.files[0]);
//         reader.onload = () => {
//             document = reader.result;
//             onChange(document)
//             console.log('e.....', document);
//         };
//         reader.onerror = function (error) {
//             console.log('Error: ', error);
//             console.log('e.....', document);
//         };
//     }

//     render() {
//         const { input: { value } } = this.props
//         const { input, label, required, meta: { touched, error, warning } } = this.props  //whatever props you send to the component from redux-form Field
//         console.log("value254......", value)
//         let val = (touched && error) || (warning ? true : false)
//         return (
//             <div className='text-center'>
//                 <div>
//                     <input
//                         type='file'
//                         accept='.jpg, .png, .jpeg, .pdf'
//                         style={{ display: 'none' }}
//                         onChange={(e) => this.handleFileSelect(e)} ref={(ref) => this.drugLic20B = ref}
//                     />
//                     <img src={value !== '' ? require('../../../../assets/img/camera_3.png') : require('../../../../assets/img/camera_1.png')} className='d-block mx-auto' onClick={(e) => this.drugLic20B.click()} />
//                 </div>
//                 <label >{label}</label>
//                 {renderFromHelper({ touched, error })}
//             </div>
//         )
//     }
// }