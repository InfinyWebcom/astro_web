import React, { Component } from 'react';
import { Row, Col, Label } from 'reactstrap';
import CardBox from 'components/CardBox'
import TextField from 'components/reactstrapText'
import TextField2 from 'components/reactNormalTextFiled'
import { connect } from 'react-redux'
import { required, emailField, number, validatePhone, speciaCharacter, latlong, arrayData, validatePinCode, notDecimal } from 'constants/validations'
import { Field, reduxForm, change, getFormInitialValues } from 'redux-form'
import Button from '@material-ui/core/Button';
import Cropper from 'components/imageCropper'
import { Editor } from '@tinymce/tinymce-react';
import { NotificationManager } from 'react-notifications';
import Axios from 'util/axiosRequest'
import AppConfig from 'constants/config';


class EditBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            croppedImage: ''
        }
    }
    onSubmit = async () => {
        const { croppedImage, content } = this.state
        if (croppedImage && content) {
            const { values } = this.props.editblogs
            let data = await Axios.axiosHelperFunc('post', 'blog/update', { Id: this.props.match.params.id, name: values.name, content: content, blog_image: croppedImage })
            if (data && data.data && data.data.error == false) {
                NotificationManager.success('Blog updated successfully')
                this.props.history.push('/admin/blogs/lists')
            } else if (data && data.data && data.data.error == true) {
                NotificationManager.error(data.data.title)
            } else {
                NotificationManager.error('Getting some issue while submitting.')
            }
        } else if (!croppedImage) {
            NotificationManager.error('Blog Image is required')
        } else if (!content.trim()) {
            NotificationManager.error('Blog Content is required')
        }
    }
    handleEditorChange = (e) => {
        console.log('e.target====', e)
        this.setState({ content: e })
    }
    componentDidMount = async () => {
        let tinymce = window.tinymce
        console.log('tinymce', tinymce)
        let data = await Axios.axiosHelperFunc('post', 'blog/find_by_id', { Id: this.props.match.params.id })
        console.log('data=======', data.data.data)
        if (data.data && data.data.error == false) {
            this.props.initialize({
                name: data.data.data.name
            })
            this.setState({ croppedImage: data.data.data.image ? `${AppConfig.imageUrl}${data.data.data.image}.jpg` : '', content: data.data.data.content })
        }

    }
    handlePhoto = (data, i) => {
        this.setState({ croppedImage: data.data })
    }
    render() {
        const { handleSubmit, submitting } = this.props
        return (
            <div className="parent animated slideInUpTiny animation-duration-3">


                <CardBox styleName="col-12" heading={''}
                    headerOutside>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <>
                            <Row>
                                <Col sm={12} xs={12} md={3} lg={3} xl={3}>

                                    <Cropper ratio={2} classNameField='card-business-logo1' label='Blog Image' croppedImage={this.state.croppedImage} index={0} handleCrop={this.handlePhoto} />


                                </Col>
                                <Col sm={12} xs={12} md={9} lg={9} xl={9}>
                                    <Row>
                                        <Col sm={12} xs={12} md={12} lg={12}>
                                            <Field name="name" type="text"
                                                component={TextField}
                                                fullWidth={true}
                                                validate={[required, speciaCharacter]}
                                                label='Name'
                                                margin="normal"
                                                classNameField='form-control form-control-lg'


                                            />
                                        </Col>
                                        <Col sm={12} xs={12} md={12} lg={12}>
                                            <Label className='mb-2' for={'Blog Content'}>{'Blog Content'}</Label>
                                            <Editor
                                                apiKey='bdkpjjgkwq8qzgo35dx49xj89dahozw4l1tliujt45jd6d9m'
                                                initialValue={this.state.content}
                                                value={this.state.content}
                                                init={{
                                                    menubar: true,
                                                    menubar: ' insert format ',
                                                    max_height: 600,
                                                    plugins: [
                                                        'advlist autolink lists image',
                                                        'searchreplace  code fullscreen',

                                                        'autoresize'
                                                    ],
                                                    toolbar: ' formatselect | ' +
                                                        'bold italic backcolor | alignleft aligncenter ' +

                                                        'alignright alignjustify | bullist numlist  | ' +
                                                        'removeformat ' + 'fontselect fontsizeselect formatselect  |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons |  insertfile image media template link anchor codesample',

                                                    // toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |',
                                                    /* enable title field in the Image dialog*/
                                                    image_title: true,
                                                    /* enable automatic uploads of images represented by blob or data URIs*/
                                                    automatic_uploads: true,
                                                    /*
                                                      URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
                                                      images_upload_url: 'postAcceptor.php',
                                                      here we add custom filepicker only to Image dialog
                                                    */
                                                    file_picker_types: 'image',
                                                    /* and here's our custom image picker*/
                                                    file_picker_callback: function (cb, value, meta) {
                                                        var input = document.createElement('input');
                                                        input.setAttribute('type', 'file');
                                                        input.setAttribute('accept', 'image/*');

                                                        /*
                                                          Note: In modern browsers input[type="file"] is functional without
                                                          even adding it to the DOM, but that might not be the case in some older
                                                          or quirky browsers like IE, so you might want to add it to the DOM
                                                          just in case, and visually hide it. And do not forget do remove it
                                                          once you do not need it anymore.
                                                        */

                                                        input.onchange = function () {
                                                            var file = this.files[0];

                                                            var reader = new FileReader();
                                                            reader.onload = function () {
                                                                /*
                                                                  Note: Now we need to register the blob in TinyMCEs image blob
                                                                  registry. In the next release this part hopefully won't be
                                                                  necessary, as we are looking to handle it internally.
                                                                */
                                                                var id = 'blobid' + (new Date()).getTime();
                                                                var blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
                                                                var base64 = reader.result.split(',')[1];
                                                                var blobInfo = blobCache.create(id, file, base64);
                                                                blobCache.add(blobInfo);

                                                                /* call the callback and populate the Title field with the file name */
                                                                cb(blobInfo.blobUri(), { title: file.name });
                                                            };
                                                            reader.readAsDataURL(file);
                                                        };

                                                        input.click();
                                                    },
                                                }}
                                                onEditorChange={this.handleEditorChange}
                                            />
                                            {/* <textarea id="editor" onChange={(e) => this.handleEditorChange(e)}></textarea> */}

                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-4 mb-2">
                                    <Button disabled={submitting} className="btn btn-primary jr-btn jr-btn-lg" type='submit' variant="contained" color="primary">
                                        Submit
                    </Button>

                                </Col>
                            </Row>
                        </>
                    </form>
                </CardBox>
            </div>

        );
    }
}

const mapStateToProps = ({ auth, form }) => {
    const { loader, alertMessage, showMessage, authUser, loading } = auth;
    const { editblogs } = form
    return { loader, alertMessage, showMessage, authUser, editblogs, loading }
};
EditBlog = connect(
    mapStateToProps,
    null              // bind account loading action creator
)(EditBlog)
EditBlog = reduxForm({
    form: 'editblogs',// a unique identifier for this form
    keepDirtyOnReinitialize: true,
    destroyOnUnmount: true,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    initialValues: getFormInitialValues('editblogs')(),
})(EditBlog)

export default EditBlog;