import Stripe from "stripe";
import config from "../config";

const stripe = new Stripe(config.stripeKey);

export default stripe;
