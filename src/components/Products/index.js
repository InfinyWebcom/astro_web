import React from 'react';
import { Col } from 'reactstrap';
import AppConfig from 'constants/config'

const PopularProduct = ({ product, styleName }) => {
    const { product_id, title, description, offerPrice, rate, quantity } = product;
    if (!styleName) {
        styleName = "col-sm-6 col-12 mb-3";
    }
    return (
        <Col sm={12} xs={12} md={6} lg={6} xl={6} className='mb-4'>
            <div className="row no-gutters">
                <div className="col-sm-5 col-12">
                    <img className="img-fluid rounded" src={product_id ? `${AppConfig.imageUrl}${product_id.image_url}.jpg` : ''} alt={product_id ? product_id.name : ''} />
                </div>
                <div className="col-sm-7 col-12 pl-sm-3 pt-3 pt-sm-0">
                    <h5 className="mb-1"> {product_id ? product_id.name : ''}</h5>
                    <p className="text-light mb-1"> {product_id.description ? product_id.description : ''}</p>
                    <div className="d-flex align-items-end">
                        <i className="zmdi zmdi-layers" />
                        <h4 className='mb-0'> {quantity} {quantity > 1 ? 'products' : 'product'}</h4>
                    </div>
                    <div className="d-flex align-items-end">

                        <h4 className='mb-0'>₹ {rate} </h4>
                    </div>
                </div>
            </div>
        </Col>
    )
};

export default PopularProduct;

