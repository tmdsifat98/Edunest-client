import React from "react";
import { Link } from "react-router";
import discountImg from "../../../assets/discount.png";

const DiscountOffer = () => {
  return (
    <section className="bg-gradient-to-b lg:bg-gradient-to-r from-primary to-secondary py-16 px-6 text-white rounded-xl w-11/12 lg:w-9/12 mx-auto my-24 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
      {/* Left Part */}
      <div className="md:w-1/2 space-y-3 text-center lg:text-left lg:pl-24">
        <h2 className="text-4xl lg:text-5xl font-bold">
          Special Offer: Get <br /> <span className="text-yellow-400 text-5xl mt-4 inline-block">25% OFF</span>
        </h2>
        <p className="text-lg">
          Unlock full access to all our premium courses at a 25% discounted
          rate! Invest once and learn everything — from programming to design,
          editing, and more...!
        </p>
        <Link to="/all-classes-page">
          <button className="btn bg-yellow-400 text-black font-semibold hover:bg-yellow-300">
            Grab This Deal Now
          </button>
        </Link>
      </div>

      {/* Right Part */}
      <div className="md:w-1/2">
        <img
          src={discountImg}
          alt="Discount Offer"
          className="w-full max-w-md mx-auto"
        />
      </div>
    </section>
  );
};

export default DiscountOffer;
