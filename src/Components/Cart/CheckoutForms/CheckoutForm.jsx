import { useState, useRef } from "react";
import classes from "./CheckoutForms.module.css";

const isEmpty = (value) => value.trim() === "";
const notSixChars = (value) => value.trim().length !== 6;
const CheckoutForm = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    pincode: true,
    landmark: true,
  });
  const nameInputRef = useRef("");
  const streetInputRef = useRef("");
  const cityInputRef = useRef("");
  const pincodeInputRef = useRef("");
  const landmarkInputRef = useRef("");
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPincode = pincodeInputRef.current.value;
    const enteredLandmark = landmarkInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredLandmarkIsValid = !isEmpty(enteredLandmark);
    const enteredPincodeIsValid = !notSixChars(enteredPincode);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      pincode: enteredPincodeIsValid,
      landmark: enteredLandmarkIsValid,
    });
    const formIsValid =
      enteredNameIsValid &&
      enteredPincodeIsValid &&
      enteredStreetIsValid &&
      enteredLandmarkIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }
    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      pincode: enteredPincode,
      landmark: enteredLandmark,
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div
        className={`${classes.control} ${
          !formInputValidity.name && classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter the valid name</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputValidity.street && classes.invalid
        }`}
      >
        <label htmlFor="street">Street/Locality</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter the valid street</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputValidity.city && classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter the valid city</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputValidity.pincode && classes.invalid
        }`}
      >
        <label htmlFor="pincode">Pin Code</label>
        <input
          type="text"
          id="pincode"
          pattern="[0-9]{6}"
          title="Six digit zip code"
          ref={pincodeInputRef}
        />
        {!formInputValidity.pincode && (
          <p>Please enter the valid postal code of 6 numbers</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          !formInputValidity.landmark && classes.invalid
        }`}
      >
        <label htmlFor="landmark">LandMark</label>
        <input type="text" id="landmark" ref={landmarkInputRef} />
        {!formInputValidity.landmark && <p>Please enter the valid landmark</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
