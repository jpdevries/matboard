var actions = require('./../model/actions');
var store = require('./../model/store');

var CountrySelect = require('./countryselect');

//todo: https://github.com/googlei18n/libphonenumber/tree/master/javascript
var ContactFieldset = function(props) {
  return (
    <fieldset>
      <legend for="contact">Contact</legend>
      <div className="phone-numbers">
        <div className="field-mobile-phone">
          <label for="mobile-phone">Mobile Phone Number</label>
          <input type="tel" title="Mobile Phone Number: (+1 555 555 5555)" className="tel" val={props.contact.phone.mobile} onChange={(event) => (
            store.dispatch(actions.updateContact({
              phone:{
                mobile:event.target.value
              }
            }))
          )} />
        </div>
        <div className="field-mobile-fax">
          <label for="fax">Fax</label>
          <input type="tel" name="fax" val={props.contact.phone.fax} onChange={(event) => (
            store.dispatch(actions.updateContact({
              phone:{
                fax:event.target.value
              }
            }))
          )}  />
        </div>
      </div>
      <div className="adr">
        <div className="field-street-address">
          <label for="street-address">Address</label>
          <textarea type="address" rows="4" className="street-address" val={props.contact.streetAddress} onChange={(event) => (
            store.dispatch(actions.updateContact({
              streetAddress:event.target.value
            }))
          )} />
        </div>
      </div>

      <div className="field-locality">
        <label for="locality">City</label>
        <input type="text" className="locality" val={props.contact.locality} onChange={(event) => (
          store.dispatch(actions.updateContact({
            locality:event.target.value
          }))
        )} />
      </div>
      <div className="field-region">
        <label for="region">State</label>
        <input type="text" className="region" val={props.contact.locality} onChange={(event) => (
          store.dispatch(actions.updateContact({
            region:event.target.value
          }))
        )} />
      </div>
      <div className="field-postal-code">
        <label for="postal-code">Postal Code</label>
        <input type="text" className="postal-code" val={props.contact.postalCode} onChange={(event) => (
          store.dispatch(actions.updateContact({
            postalCode:event.target.value
          }))
        )} />
      </div>
      <div className="field-country">
        <label for="country">Country</label>
        <CountrySelect name="country" className="country-name" defaultValue="US" onChange={(event) => (
          store.dispatch(actions.updateContact({
            country:event.target.value
          }))
        )} />
      </div>
    </fieldset>
  );
};

module.exports = ContactFieldset;
