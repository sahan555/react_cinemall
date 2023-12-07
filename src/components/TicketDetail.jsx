import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const TicketDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const downloadPdf = () => {
    const capture = document.querySelector(".pdf-ticket");
    setLoader(true);
    html2canvas(capture, {
      allowTaint: true,
      useCORS: true,
      scale: 2,
      dpi: 144,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componenetWidth = doc.internal.pageSize.getWidth();
      const componenetHeight = doc.internal.pageSize.getHeight();
      console.log(componenetWidth);
      doc.addImage(imgData, "PNG", 0, 0, componenetWidth, componenetHeight);
      setLoader(false);
      doc.save("ticket.pdf");
    });
  };

  useEffect(() => {
    const { formData, ticketData, additionalData } = location.state || {};
    //to prevent user directly access this page
    if (
      !formData ||
      Object.keys(formData).length === 0 ||
      !ticketData ||
      Object.keys(ticketData).length === 0 ||
      !additionalData ||
      Object.keys(additionalData).length === 0
    ) {
      navigate("/");
    }
  }, [location.state, navigate]);
  console.log(location.state);

  const generateRandomId = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomId = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  };
  const invoiceId = generateRandomId(6); // Replace with your logic to generate an invoice ID
  const dateCreated = new Date().toLocaleDateString(); // Use
  return (
    <div className="container mx-auto py-14">
      <div className="pdf-ticket mx-auto w-[1028px] text-dark">
        <h1 className="flex bg-red p-6 text-xl text-white">
          <img src="/logo.svg" alt="logo" className="pr-2" />
          TickTicketing
        </h1>
        <div className="invoice-wrapper p-6">
          <h3 className="mb-3 text-2xl font-semibold">Invoice</h3>
          <div className="flex justify-between">
            <ul>
              <li>
                <p className="capitalize">
                  Invoice to {location.state?.formData?.name}
                </p>
              </li>
              <li>
                <p>{location.state?.formData?.email}</p>
              </li>
              <li>
                <p className="capitalize">
                  {location.state?.formData?.country}
                </p>
              </li>
            </ul>
            <ul>
              <li>Invoice ID:{invoiceId}</li>
              <li>Order Date:{dateCreated}</li>
            </ul>
          </div>
          <div className="table-wrapper rounded-xl border">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Movie Detail</th>
                  <th>Type</th>
                  <th>Ticket</th>
                  <th>Unit Price</th>
                  <th>Discount</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td>1</td>
                  <td>{location.state?.formData?.name}</td>
                  <td>{location.state?.ticketData?.type}</td>
                  <td>x{location.state?.ticketData?.quantity}</td>
                  <td>${location.state?.ticketData?.basePrice}</td>
                  <td>${location.state?.ticketData?.discountPrice}</td>
                  <td>${location.state?.additionalData?.finalTotal}</td>
                </tr>
                <tr className="border-t">
                  <td
                    colSpan="7"
                    className="!pb-10 !pt-6 text-right !text-xl !font-semibold"
                  >
                    Invoice Total: USD $
                    {location.state?.additionalData?.finalTotal}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <ul className="ticket-box  p-6">
          {/* Use Array.from to create an array with a length equal to the quantity */}
          {Array.from({ length: location.state?.ticketData?.quantity }).map(
            (_, index) => (
              <li key={index} className="boxed mt-6 pt-6">
                <div className="flex w-[500px] flex-wrap gap-5 border bg-white p-5">
                  <figure className="h-[120px] w-[110px] overflow-hidden rounded-xl">
                    <img
                      src={location.state?.ticketData?.poster}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </figure>
                  <div>
                    <h4 className="mb-1 text-lg font-semibold">
                      {location.state?.ticketData?.name}
                    </h4>
                    <ul>
                      <li className="mb-1 text-xs text-[#556987]">
                        {dateCreated}
                      </li>
                      <li className="mb-1 flex items-center gap-1 text-sm text-[#556987]">
                        <img src="ticket.svg" alt="" /> <span>x1</span>
                      </li>
                      <li className="text-sm text-[#556987]">
                        Total:{" "}
                        <b className="text-dark">
                          ${location.state?.ticketData?.basePrice}
                        </b>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            ),
          )}
        </ul>
      </div>
      <div className="fixed bottom-[15%] right-3">
        <button
          className="btn-red"
          onClick={downloadPdf}
          disabled={!(loader === false)}
        >
          {loader ? <span>Downloading Pdf</span> : <span>Download Pdf</span>}
        </button>
      </div>
    </div>
  );
};

export default TicketDetail;
