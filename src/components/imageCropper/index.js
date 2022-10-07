import React, { Component } from 'react';
import { Cropper } from 'react-image-cropper';
import {
    Modal, ModalBody, ModalHeader, ModalFooter, Input, FormLabel,
    FormFeedback, Col, Row, Label, FormGroup
} from 'reactstrap';
import Button from 'components/button'
import './index.css'
class ImageCropper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModalImage: false,
            images: '',
            iamgePreview: '',
            imageLoaded: false,
            croppedImage: "",
        }
    }
    handleImageLoaded = (state) => {
        this.setState({
            [state + 'Loaded']: true
        })
    }
    closeCropper = () => {
        this.setState({ openModalImage: false, imageLoaded: false, images: '', iamgePreview: '' })
    }
    onConfirm = (image) => {
        let node = this['image']
        this.props.handleCrop({ data: node.crop(), index: this.props.index })
        this.setState({ openModalImage: false })


    }
    openAlert = (e, key) => {
        console.log('files=', e.target.files[0], e.target.files)
        this.setState({ images: e.target.files, image: '' })
        var file = e.target.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        console.log('url=,', url)
        reader.onloadend = function (e) {
            this.setState({
                iamgePreview: [reader.result]
            })
        }.bind(this);
        console.log('url=,', url)

        this.setState({ [key]: true });
        console.log('files=', e.target.files[0])

    }
    selectImage = () => {
        this.setState({ tool: false })
        this.refs.upload.click();
    }
    render() {
        const selectPhoto = { title: 'Upload Photo', color: 'primary', className: 'ml-2 mt-3' }
        const cancelButton = { title: 'Cancel', color: 'danger' }
        let confirm = { title: 'Crop', color: 'primary' }
        const { openModalImage, croppedImage } = this.state
        const { label, classNameField, ratio } = this.props
        return (
            <React.Fragment>
                <FormGroup className='d-inline'>
                    {
                        label && <Label className='mt-1 mb-2' >{label}</Label>
                    }


                    <div className={classNameField ? classNameField : 'card-business-logo'} onClick={this.selectImage} style={{ backgroundImage: `url(${this.props.croppedImage ? this.props.croppedImage : require('assets/images/upload3.png')})`, backgroundRepeat: 'no-repeat', backgroundSize: (classNameField && !this.props.croppedImage) ? 'auto' : 'cover' }} >
                        <input invalid accept="image/*" ref='upload' id='upload' type='file' hidden onChange={(e) => this.openAlert(e, 'openModalImage')} />
                        <Input hidden type='text' value={this.props.croppedImage} />

                    </div>


                    {/* <Button className = ' mt-1 btn btn-sm ml-3' onClick={this.selectImage}>Select Photo</Button> */}
                </FormGroup>
                <Modal

                    isOpen={openModalImage}
                    toggle={this.closeCropper}
                >
                    <ModalBody>
                        {
                            this.state.iamgePreview &&

                            <Cropper src={this.state.iamgePreview[0]} newItem={100} width={200} height={200}
                                ref={ref => { this.image = ref }}
                                ratio={ratio ? ratio : 1}
                                allowNewSelection={false}
                                fixedRatio={true}
                                onImgLoad={() => this.handleImageLoaded('image')}
                            />
                        }
                    </ModalBody>
                    <ModalFooter>
                        <div className='list-action'>
                            {<Button name='Cancel' onClick={this.closeCropper} className="btn btn-secondary " variant="contained" color="secondary" />}{' '}{<Button name='Confirm' onClick={this.onConfirm} className="btn btn-primary " variant="contained" color="primary" />}
                        </div>
                    </ModalFooter>
                </Modal>

            </React.Fragment>
        );
    }
}

export default ImageCropper;