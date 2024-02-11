import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ordersData from "../assets/data/DummyData.json";
import { jwtDecode } from "jwt-decode";
import { BiDownArrowCircle, BiUpArrowCircle } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UpdateOrder from "./UpdateOrder";
import NewOrder from "./NewOrder";

const Home = () => {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 45;
    const [showScrollDownButton, setShowScrollDownButton] = useState(false);
    const [showScrollUpButton, setShowScrollUpButton] = useState(false);
    const [showNewOrder, setShowNewOrder] = useState(false);
    const [showUpdateOrder, setShowUpdateOrder] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const newOrderRef = useRef(null);
    const updateOrderRef = useRef(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const userObject = JSON.parse(loggedInUser);
            setUser(userObject);
        }
    }, []);

    const handleCallbackResponse = (res) => {
        console.log("Encoded JWT ID token: " + res.credential);
        const userObject = jwtDecode(res.credential);
        console.log(userObject);
        setUser(userObject);
        localStorage.setItem("user", JSON.stringify(userObject));
        toast.success('Successfully Logged In!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const handleSignOut = () => {
        setUser(null);
        localStorage.removeItem("user");
        toast.success('Successfully Logged Out!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

        setInterval(() => {
            window.location.reload();
        }, 1000);
    }

    useEffect(() => {
        /*global google*/
        google.accounts.id.initialize({
            client_id: "119860729949-k85vcpf3pvq4tbddepjtlruolo9gs5b6.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        )

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    useEffect(() => {
        setOrders(ordersData);
    }, []);

    const handleDelete = (orderId) => {
        setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
        toast.success('Successfully Deleted!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const handleAddOrder = (newOrder) => {
        setOrders(prevOrders => [...prevOrders, newOrder]);
        toast.success('Successfully Added New Order!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        setShowNewOrder(false);
    }

    const handleEditOrder = (editedOrder) => {
        const updatedOrders = orders.map(order => {
            if (order.id === editedOrder.id) {
                return editedOrder;
            }
            return order;
        });
        setOrders(updatedOrders);
        toast.success('Successfully Updated Order!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const handleEditButtonClick = (order) => {
        setSelectedOrder(order);
        setShowUpdateOrder(true);
        scrollToUpdateOrder();
    }

    const handleUpdateOrder = (updatedOrder) => {
        handleEditOrder(updatedOrder);
        setShowUpdateOrder(false);
    }

    const handleScroll = () => {
        if (window.pageYOffset > 100) {
            setShowScrollDownButton(true);
        } else {
            setShowScrollDownButton(false);
        }

        if (window.pageYOffset < document.documentElement.scrollHeight - window.innerHeight - 100) {
            setShowScrollUpButton(true);
        } else {
            setShowScrollUpButton(false);
        }
    }

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const scrollToNewOrder = () => {
        newOrderRef.current.scrollIntoView({ behavior: "smooth" });
    }

    const scrollToUpdateOrder = () => {
        updateOrderRef.current.scrollIntoView({ behavior: "smooth" });
    }

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            {!user && (
                <section className="flex flex-col items-center justify-evenly gap-5">
                    <h1 className="md:text-5xl text-4xl font-bold leading-7 ">Login</h1>
                    <p className="md:text-base text-sm font-[500] leading-7 pt-3">Login to see the Orders and Details.</p>
                    <div id="signInDiv"></div>
                </section>
            )}

            {user && (
                <section>
                    <div className="md:h-[250px] md:w-[450px] h-[150px] w-[300px]  md:top-[-85px]  top-[-40px]  border-[2px] border-solid border-black md:mb-10 mb-8 px-7 relative flex items-center justify-between gap-2">
                        <img src={user.picture} alt="" className="rounded-md  md:h-[150px] h-[80px]" />
                        <div className="flex flex-col items-center justify-between md:gap-8 gap-3 ">
                            <h3 className="text-sm md:text-lg font-[500] leading-10">Name: {user.name}</h3>
                            <h3 className="text-sm md:text-lg font-[500] leading-4">Email: {user.email}</h3>
                            <Link to="/" className="bg-red-500 md:p-3 p-2 md:text-base text-xs text-white rounded-xl" onClick={handleSignOut}>Sign Out</Link>
                        </div>
                    </div>
                    <h1 className="md:text-5xl text-4xl font-bold leading-7 ">Orders</h1>
                    <p className="md:text-base text-sm font-[500] leading-7 pt-3">
                        Presenting our list of orders.
                    </p>
                    <div className="flex items-end mt-4">
                        <button className="md:p-3 p-2 text-sm text-white font-[400] bg-black hover:bg-gray-800 rounded-md flex items-center" onClick={() => { setShowNewOrder(true); scrollToNewOrder(); }}>
                            New Order
                        </button>
                    </div>
                    <div className="mt-4 w-full flex flex-col flex-grow">
                        <table className="w-full border-collapse">
                            <thead className="text-sm font-[450]">
                                <tr className="bg-[#E5D4FF]">
                                    <th className="bx">Order ID</th>
                                    <th className="bx">Customer Name</th>
                                    <th className="bx">Customer Email</th>
                                    <th className="bx">Product</th>
                                    <th className="bx">Quantity</th>
                                    <th className="bx">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-center border-solid border-[1.2px] border-black">
                                {currentOrders.map(order => (
                                    <tr key={order.id}>
                                        <td className="bx2">{order.id}</td>
                                        <td className="bx2">{order.customer_name}</td>
                                        <td className="bx2">{order.customer_email}</td>
                                        <td className="bx2">{order.product}</td>
                                        <td className="bx2">{order.quantity}</td>
                                        <td className="bx2">
                                            <button onClick={() => handleEditButtonClick(order)}>Edit</button> |
                                            <button onClick={() => handleDelete(order.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex items-center justify-center gap-5 mt-4">
                            <button className="h-[30px] w-[70px] text-sm md:text-base border-solid border-black border-[1px] rounded-md hover:bg-black hover:text-white " onClick={() => paginate(1)} disabled={currentPage === 1}>
                                First
                            </button>
                            <button className="h-[30px] w-[70px] text-sm md:text-base border-solid border-black border-[1px] rounded-md hover:bg-black hover:text-white " onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                Previous
                            </button>
                            <p className="h-[30px] w-[30px] text-sm md:text-base border-solid border-black border-[1px] rounded-md">
                                {currentPage}
                            </p>
                            <button className="h-[30px] w-[70px] text-sm md:text-base border-solid border-black border-[1px] rounded-md hover:bg-black hover:text-white" onClick={() => paginate(currentPage + 1)} disabled={indexOfLastOrder >= orders.length}>
                                Next
                            </button>
                            <button className="h-[30px] w-[70px] text-sm md:text-base border-solid border-black border-[1px] rounded-md hover:bg-black hover:text-white" onClick={() => paginate(Math.ceil(orders.length / ordersPerPage))} disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}>
                                Last
                            </button>
                        </div>
                    </div>
                    {showNewOrder && (
                        <div ref={newOrderRef}>
                            <NewOrder handleAddOrder={handleAddOrder} />
                        </div>
                    )}
                    {showUpdateOrder && (
                        <div ref={updateOrderRef}>
                            <UpdateOrder orders={selectedOrder} handleUpdateOrder={handleUpdateOrder} />
                        </div>
                    )}
                </section>
            )}

            {showScrollDownButton && (
                <div className="fixed bottom-8 right-8">
                    <BiDownArrowCircle className="text-4xl text-gray-500 hover:text-black cursor-pointer" onClick={scrollToBottom} />
                </div>
            )}

            {showScrollUpButton && (
                <div className="fixed top-8 right-8">
                    <BiUpArrowCircle className="text-4xl text-gray-500 hover:text-black cursor-pointer" onClick={scrollToTop} />
                </div>
            )}
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

export default Home;
