import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useCart from "../../../hooks/useCart";
import CheckoutForm from "./CheckoutForm";
// TODO : PROVIDE publishedable key 
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {
const [cart] = useCart();
const total=cart.reduce((sum,item)=>sum + item.price,0);
const price =parseFloat(total.toFixed(2))
    return (
        <div>
            <SectionTitle subHeading={"please process "} heading={"payment"}></SectionTitle>
            <h2 className="text-3xl">Payment here !!</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm price={price}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;