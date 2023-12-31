import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const isConfirmationAllowed = () => {
  const storedData = localStorage.getItem("confirmationData");
  const parsedData = storedData ? JSON.parse(storedData) : {};
  return parsedData && Object.keys(parsedData).length > 0;
};
const Confirmation = () => {
  const navigate = useNavigate();

  // State variable to store parsed data
  const [confirmationData, setConfirmationData] = useState({});

  // Retrieve total price, quantity, and base price from local storage
  useEffect(() => {
    const storedData = localStorage.getItem("confirmationData");
    const parsedData = storedData ? JSON.parse(storedData) : {};
    setConfirmationData(parsedData);
  }, []); // Empty dependency array to run the effect only once

  // Check confirmationData after the state has been updated
  useEffect(() => {
    if (!isConfirmationAllowed()) {
      navigate("/");
    }
  }, [navigate]);

  const finalTotal = () => {
    return (
      parseFloat(confirmationData.totalPrice) +
      parseFloat(confirmationData.vatPrice) +
      parseFloat(confirmationData.discountPrice)
    ).toFixed(2);
  };

  const initialValues = {
    name: "",
    email: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    zipcode: Yup.string().required("Zip code is required"),
    country: Yup.string().required("Country is required"),
    address: Yup.string().required("Address is required"),
  });

  const handleFormSubmit = (formData) => {
    // Combine form data with calculation data
    const ticketData = JSON.parse(localStorage.getItem("confirmationData"));
    const additionalData = {
      finalTotal: finalTotal(),
      // Add other data as needed
    };
    // Navigate to the final confirmation page and pass formData and calculationData as props
    navigate("/ticketdetail", { state: { formData, ticketData,additionalData} });
  };

  return (
    <>
      <div className="breadcrumbs bg-dark-second py-2 max-lg:px-6">
        <div className="container mx-auto">
          <ul className="flex flex-wrap py-2 text-base text-sm">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to={`/${confirmationData.type}`} className="capitalize">
                {confirmationData.type}
              </Link>
            </li>
            <li>
              <Link
                to={`/details/${confirmationData.id}`}
                className="capitalize"
              >
                {confirmationData.name}
              </Link>
            </li>
            <li>Checkout</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto py-14 max-lg:px-6">
        <h1 className="mb-10 border-b border-b-grey pb-3 text-2xl font-semibold">
          Order Confirmation
        </h1>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleFormSubmit(values);
            setSubmitting(false);
          }}
        >
          <Form className="confirm-form">
            <div className="movies-wrapper flex items-baseline space-x-8 max-sm:flex-wrap max-lg:block max-lg:space-x-0 max-lg:space-y-8">
              <div className="order-details w-4/6 rounded-lg border border-grey bg-dark-second p-6 max-lg:w-full">
                <h3 className="text-xl">Information</h3>

                <div className="w-full">
                  <label htmlFor="name">Full Name *</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="eg. Ram Cha"
                  />
                  <ErrorMessage
                    className="pt-2 text-xs text-red"
                    name="name"
                    component="div"
                  />
                </div>
                <div className="flex gap-6 max-sm:flex-wrap">
                  <div className="w-6/12 max-sm:w-full">
                    <label htmlFor="email">Email *</label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="ramcha@gmail.com"
                    />
                    <ErrorMessage
                      className="pt-2 text-xs text-red"
                      name="email"
                      component="div"
                    />
                  </div>

                  <div className="w-6/12 max-sm:w-full">
                    <label htmlFor="address">Address *</label>
                    <Field type="text" id="address" name="address" />
                    <ErrorMessage
                      className="pt-2 text-xs text-red"
                      name="address"
                      component="div"
                    />
                  </div>
                </div>
                <div className="flex gap-6 max-sm:flex-wrap">
                  <div className="w-6/12 max-sm:w-full">
                    <label htmlFor="country">Country *</label>
                    <Field as="select" id="country" name="country">
                      <option value="" disabled>
                        Select a country
                      </option>
                      <option value="nepal">Nepal</option>
                      <option value="india">India</option>
                      {/* Add more countries as needed */}
                    </Field>
                    <ErrorMessage
                      className="pt-2 text-xs text-red"
                      name="country"
                      component="div"
                    />
                  </div>
                  <div className="w-6/12 max-sm:w-full ">
                    <label htmlFor="state">State</label>
                    <Field type="text" id="state" name="state" />
                  </div>
                </div>
                <div className="flex gap-6 max-sm:flex-wrap">
                  <div className="w-6/12 max-sm:w-full">
                    <label htmlFor="city">City</label>
                    <Field type="text" id="city" name="city" />
                  </div>
                  <div className="w-6/12 max-sm:w-full">
                    <label htmlFor="zipcode">Zip/Post code *</label>
                    <Field type="number" id="zipcode" name="zipcode" />
                    <ErrorMessage
                      className="pt-2 text-xs text-red"
                      name="zipcode"
                      component="div"
                    />
                  </div>
                </div>
              </div>
              <div className=" w-2/6 rounded-lg border border-grey bg-dark-second p-6  max-lg:w-4/6 max-sm:w-full">
                <h3 className="pb-4 text-2xl font-semibold capitalize">
                  Checkout Summary
                </h3>
                <ul className="detail-box">
                  <li className="!block">
                    <h5 className="mb-1 text-lg">{confirmationData.name}</h5>
                    <p className="text-text-dark text-sm capitalize">
                      {confirmationData.type}
                      <span className="px-2">&#8226;</span>
                      {confirmationData.location}
                    </p>
                  </li>
                  <li>
                    <p className="text-text-dark flex w-full items-center justify-between text-sm">
                      <span>Normal</span>
                      <span className="text-white">
                        X{confirmationData.quantity}
                      </span>
                      <b className="font-semibold  text-white">
                        ${confirmationData.basePrice}
                      </b>
                    </p>
                    <p className="text-text-dark flex w-full items-center justify-between text-sm">
                      <span>Sub Total</span>
                      <b className="font-semibold  text-white">
                        ${confirmationData.totalPrice}
                      </b>
                    </p>
                    <p className="text-text-dark flex w-full items-center justify-between text-sm">
                      <span>Tax(13 %)</span>
                      <b className="font-semibold  text-white">
                        ${confirmationData.vatPrice}
                      </b>
                    </p>
                    <p className="text-text-dark flex w-full items-center justify-between text-sm">
                      <span>Discount(0 %)</span>
                      <b className="font-semibold  text-white">
                        ${confirmationData.discountPrice}
                      </b>
                    </p>
                  </li>
                  <li>
                    <p className="text-text-dark flex w-full items-center justify-between text-base">
                      <span>Total</span>
                      <b className="text-2xl font-semibold text-white">
                        <span className="text-text-dark pr-2 text-xs font-normal">
                          USD
                        </span>
                        ${finalTotal()}
                      </b>
                    </p>
                  </li>
                  <li>
                    <button type="submit" className="btn-red w-full">
                      Confirm & Pay
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Confirmation;
