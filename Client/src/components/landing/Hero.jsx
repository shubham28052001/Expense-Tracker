import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import Stats from "./Stats";
import { Feather } from "lucide-react";
import Features from "./Features";
import Working from "./Working";
import Testimonials from "./Testimonials";
import CTA from "./CTA";
import {AuthContexts} from "../../context/AuthProvider";

function Hero() {
  const {token} = useContext(AuthContexts);

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <section className="bg-gradient-to-b from-indigo-100 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 py-16 md:grid md:grid-cols-2 md:items-center md:gap-28 lg:py-20">

          <div data-aos="fade-right">
            <span className="inline-block rounded-full bg-indigo-100 dark:bg-indigo-900 px-4 py-1 text-sm font-medium text-indigo-700 dark:text-indigo-200">
              AI Expense Tracking
            </span>

            <h1
              data-aos="fade-right"
              data-aos-delay="100"
              className="mt-5 max-w-2xl font-bold text-indigo-600 dark:text-blue-100 text-5xl sm:text-9xl lg:max-w-4xl lg:text-5xl"
            >
              Manage Your Finance with Intelligence
            </h1>

            <p data-aos="fade-right"
              data-aos-delay="400" className="mt-6 max-w-5xl text-center text-gray-600 dark:text-blue-200 text-lg leading-relaxed">
              Track your daily expenses effortlessly, set smart budgets, and gain powerful AI-driven insights
              into your spending habits.Analyze where your money goes, identify saving opportunities, and make
              smarter financial decisions with personalized recommendations.
            </p>

            <div data-aos="fade-up"
              data-aos-delay="600"
              className="mt-8 flex flex-wrap gap-4">
              {token ? (
                <Link
                  to="/dashboard"
                  className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white shadow-lg transition hover:bg-indigo-700  hover:scale-105"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white shadow-lg transition hover:bg-indigo-700 hover:scale-105"
                  >
                    Start Tracking Free
                  </Link>

                  <Link
                    to="/login"
                    className="rounded-lg border border-indigo-600 px-6 py-3 dark:border-indigo-400 font-medium text-indigo-600 dark:text-indigo-300 dark:hover:bg-gray-800 transition hover:bg-indigo-50"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>

          <div data-aos="zoom-in-left"
            data-aos-delay="300" className="mt-10 md:mt-0">
            <img
              src="/Landing.svg"
              alt="Expense Tracker"
              className="w-full transition duration-500 hover:scale-105 dark:brightness-90 dark:contrast-200"
            />
          </div>
        </div>
      </section>

      <Banner />
      <Stats />
      <Features />
      <Working />
      <Testimonials />
      <CTA />
    </div>
  );
}

export default Hero;