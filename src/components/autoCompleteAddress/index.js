import React from 'react';
import { FormFeedback } from 'reactstrap'
import { NotificationManager } from 'react-notifications';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { Input, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
export default class LocationSearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            selectedAddress: '',
            latLng: ''
        };
    }

    handleChange = address => {
        this.props.onhandleAddress(address, 'userAddress')
    };
    getZipcode = async (address) => {
        let temp = ''
        const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + 'AIzaSyDu0B9dKAnwVIdntFlsNBxnnOfLiqro8mI';
        await axios({
            method: 'get',
            url: url
        })
            .then((result, error) => {
                console.log('results zipcode=', result, result.data.results.length > 0)
                // temp = result.data.results[0].geometry.location
                let index = result.data.results.length > 0 && result.data.results[0].address_components.findIndex(value => value.types[0] === 'postal_code')
                let indexCity = result.data.results.length > 0 && result.data.results[0].address_components.findIndex(value => value.types[0] === 'locality')
                let indexCountry = result.data.results.length > 0 && result.data.results[0].address_components.findIndex(value => value.types[0] === 'country')
                let indexState = result.data.results.length > 0 && result.data.results[0].address_components.findIndex(value => value.types[0] === 'administrative_area_level_1')
                console.log('results index', index)
                if (index > -1) {
                    console.log('results zipcode=', result.data.results[0].address_components[index].long_name)
                    console.log('results temp=', result.data.results[0].address_components.length, result.data.results[0].address_components[result.data.results[0].address_components.length - 2])
                    temp = {
                        zipcode: result.data.results[0].address_components[index].long_name,
                        country: indexCountry > -1 ? result.data.results[0].address_components[indexCountry].long_name : '',
                        state: indexState > -1 ? result.data.results[0].address_components[indexState].long_name : '',
                        city: indexCity > -1 ? result.data.results[0].address_components[indexCity].long_name : ''
                    }

                } else {

                }



            })

        return temp && temp
    }
    handleSelect = async (address) => {
        console.log('results address=', address)
        let zipcode = await this.getZipcode(address)
        console.log('results zipcode1=', zipcode)
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => this.props.onhandleAddress({ userAddress: address, latLng: latLng, zipCode: zipcode.zipcode, city: zipcode.city, country: zipcode.country, state: zipcode.state }, 'latlng'))
            .catch((error) => {
                console.log('error address', error)
                NotificationManager.error('Please enter valid address')
            });
    };
    handleValidation = () => {
    }
    clearAddress = () => {
        this.props.clearAddress()
    }
    render() {
        console.log('PlacesAutocompleteProps', this.props)
        return (
            <PlacesAutocomplete
                value={this.props.userAddress}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                className='form-control-lg'
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <React.Fragment>
                        <FormGroup className="has-wrapper form-group">
                            <Label className='mb-2'>Address</Label>
                            <Input value={this.props.userAddress} style={{
                                height: 'calc(1.5em + 1.2rem + 2px)',
                                padding: '0.6rem 1.2rem',
                                fontSize: '0.9375rem',
                                lineHeight: 1.5,
                                borderRadius: '0.3rem',
                            }} className='form-control form-control-lg'
                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'location-search-input',
                                })}
                                disabled={this.props.disabled}
                            />

                        </FormGroup>
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {

                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </React.Fragment>
                )}
            </PlacesAutocomplete>
        );
    }
}