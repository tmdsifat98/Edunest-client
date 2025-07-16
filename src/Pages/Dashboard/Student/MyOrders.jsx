import React from "react";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { RiDownloadFill } from "react-icons/ri";
import NoDataFound from "../../Extra/NoDataFound";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["myOrders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${user?.email}`);
      return res.data;
    },
  });
  const generateInvoice = (order) => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "in",
    });

    doc.setFontSize(20);
    doc.text("Order Invoice", 70, 20);

    doc.setFontSize(12);
    doc.text(`Student Email: ${user.studentEmail}`, 20, 42);
    doc.text(`Transaction ID: ${order.transaction_id}`, 20, 49);
    autoTable(doc, {
      head: [["Class Title", "transaction Id", "Price", "Teacher Email"]],
      body: [
        [
          order.title,
          order.transaction_id,
          `${order.price} tk`,
          order.teacherEmail,
        ],
      ],
    });

    doc.save(`Invoice_${order.title}.pdf`);
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-primary">
        My Orders
      </h2>

      {isLoading ? (
        <LoadingSpinner />
      ) : orders.length === 0 ? (
        <NoDataFound message="No orders found" btnMsg="Enroll Classes" redirectTo="/all-classes-page"/>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full text-center">
            <thead className=" dark:text-white">
              <tr>
                <th>SL</th>
                <th>Class Title</th>
                <th>Price</th>
                <th>Transaction ID</th>
                <th>Your Email</th>
                <th>Teacher Email</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.title}</td>
                  <td>৳{order.price}</td>
                  <td>{order.transaction_id}</td>
                  <td>{order.studentEmail}</td>
                  <td>{order.teacherEmail}</td>
                  <td>
                    <button
                      onClick={() => generateInvoice(order)}
                      className="btn btn-sm btn-primary text-black"
                    >
                      Download PDF <RiDownloadFill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
