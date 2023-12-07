// FinalConfirmationPage.js

import { useLocation } from "react-router-dom";

const TicketDetail = () => {
  // Use formData and calculationData to display the final confirmation details
  const location = useLocation();
  const formData = location.state?.formData || {};
  const calculationData = location.state?.calculationData || {};
  return (
    <div>
      <h2>Final Confirmation Page</h2>
      <p>Name: {formData.name}</p>
      <p>Email: {formData.email}</p>
      <p>Phone Number: {formData.phoneNumber}</p>
      {/* Display data received from the calculation page */}
      <p>Total Price: ${calculationData.totalPrice}</p>
      <p>Quantity: {calculationData.quantity}</p>
      <p>Base Price: ${calculationData.basePrice}</p>
    </div>
  );
};

export default TicketDetail;
