/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewOrder = ({ handleAddOrder }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: "",
        customer_name: "",
        customer_email: "",
        product: "",
        quantity: ""
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "quantity" && parseInt(value) === 0) {
            return;
        }
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (typeof handleAddOrder === 'function') {
            handleAddOrder(formData);
            navigate("/");
            console.log(formData);
        } else {
            console.error("handleAddOrder is not a function");
        }
    };

    return (
        <section className="px-auto ">
            <h1 className="md:text-5xl text-4xl font-bold leading-7 ">
                Create New Order
            </h1>
            <p className="md:text-lg text-base font-[500] leading-7 pt-5">
                Add a new order by providing the necessary details to ensure accurate and complete information.
            </p>

            <div className="w-full md-[840px]:w-[700px] mx-auto mt-[40px]">
                <h3 className="text-center mx-auto text-lg md:text-xl font-bold">
                    Order Form
                </h3>
                <form onSubmit={handleSubmit} className="bg-[#F1EAFF] space-y-4 md:space-y-8 mt-[20px] border-[3px] rounded-lg border-solid border-[#000] p-[15px] md:p-[30px]">
                    <div className="flex flex-col md:flex-row items-center justify-between mx-[20px]">
                        <label htmlFor="orderId" className="form_label">
                            Order ID
                        </label>
                        <input
                            type="text"
                            id="id"
                            placeholder="Enter order ID"
                            className="form_input mt-1 md:ml-2"
                            value={formData.id}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between mx-[20px]">
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

                    <div className="flex flex-col md:flex-row items-center justify-between mx-[20px]">
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

                    <div className="flex flex-col md:flex-row items-center justify-between mx-[20px]">
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

                    <div className="flex flex-col md:flex-row items-center justify-between mx-[20px]">
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

                    <div className="flex justify-evenly md-[840px]:justify-evenly">
                        <button
                            type="submit"
                            className="bg-black text-white text-base font-semibold px-4 py-2 md:w-[250px] w-[200px] mx-auto  rounded-md hover:bg-gray-800"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default NewOrder;
