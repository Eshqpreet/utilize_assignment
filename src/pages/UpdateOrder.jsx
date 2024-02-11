/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateOrder = ({ orders, handleUpdateOrder  }) => {
    const navigate = useNavigate();
    const { orderId } = useParams();
    console.log("Orders:", orders);

    console.log(orderId);


    const [formData, setFormData] = useState({
        id: orders.id,
        customer_name: orders.customer_name,
        customer_email:orders.customer_email,
        product: orders.product,
        quantity:orders.quantity
    });

    useEffect(() => {
        if (orderId in orders) {
            const orderToUpdate = orders[orderId];
            setFormData(orderToUpdate);
        }
    }, [orderId, orders]);
    

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "orderId") {
            return;
        }
        if (id === "quantity" && parseInt(value) === 0) {
            return;
        }
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (typeof handleUpdateOrder === 'function') {
            handleUpdateOrder(formData);
            navigate("/"); 
            console.log(formData);
        } else {
            console.error("handleAddOrder is not a function");
        }
        navigate("/"); 
    }


    return (
        <section className="px-auto">
            <h1 className="text-4xl md:text-5xl font-bold md:leading-7 leading-10">
                Update Order Details
            </h1>
            <p className="text-base md:text-lg font-[500] leading-7 pt-8">
                Update the order details here by providing the updated information.
            </p>

            <div className="w-full md:w-[700px] mx-auto mt-8">
                <h3 className="text-center text-lg md:text-xl font-bold">
                    Order Form
                </h3>
                <form onSubmit={handleSubmit} className="bg-[#F1EAFF] space-y-4 md:space-y-8 mt-4 border-[3px] rounded-lg border-solid border-black p-5 md:p-10">
                    <div className="flex flex-col md:flex-row items-center justify-between mx-5">
                        <label htmlFor="orderId" className="form_label">
                            Order ID
                        </label>
                        <input
                            type="text"
                            id="id"
                            placeholder="Enter order ID"
                            className="form_input mt-1 md:ml-2"
                            value={formData.id}
                            readOnly 
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between mx-5">
                        <label htmlFor="customerName" className="form_label">
                            Customer Name
                        </label>
                        <input
                            type="text"
                            id="customer_name"
                            placeholder="Enter customer name"
                            className="form_input mt-1 md:ml-2"
                            value={formData.customer_name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between mx-5">
                        <label htmlFor="customerEmail" className="form_label">
                            Customer Email
                        </label>
                        <input
                            type="email"
                            id="customer_email"
                            placeholder="Enter customer email"
                            className="form_input mt-1 md:ml-2"
                            value={formData.customer_email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between mx-5">
                        <label htmlFor="product" className="form_label">
                            Product
                        </label>
                        <select
                            id="product"
                            className="form_input mt-1 md:ml-2"
                            value={formData.product}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Product</option>
                            <option value="Product 1">Product 1</option>
                            <option value="Product 2">Product 2</option>
                            <option value="Product 3">Product 3</option>
                        </select>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between mx-5">
                        <label htmlFor="quantity" className="form_label">
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            placeholder="Enter quantity"
                            className="form_input mt-1 md:ml-2"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="flex justify-evenly">
                        <button
                            type="submit"
                            className="bg-black text-white text-base font-semibold px-4 py-2 md:w-[250px] w-[200px] mx-auto rounded-md hover:bg-gray-800"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default UpdateOrder;
