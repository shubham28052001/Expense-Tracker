import React from 'react'
import { Link } from "react-router-dom"

function Hero() {

  const token = localStorage.getItem("token");

  return (
    <div>
      <section className="bg-white">
        <div className="mx-auto w-screen max-w-7xl px-3 mt-6 sm:mt-0 py-2 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-2 lg:py-12">

          <div className="text-left">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Take control of your money and
              <strong className="text-indigo-600"> grow your </strong>
              savings
            </h1>

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              Track your daily expenses effortlessly, set smart budgets,
              and get clear insights into your spending habits. Achieve
              your financial goals faster with our easy-to-use expense tracker.
            </p>

            <div className="mt-4 flex justify-center gap-4 sm:mt-6">

              {token ? (
                <Link
                  to="/dashboard"
                  className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                >
                  Explore free Services
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                >
                  Start Tracking for Free
                </Link>
              )}

            </div>
          </div>

          <div className='mt-2'>
              <img
              src="/Landing.svg"
              alt="Landing"
            />
          </div>

          
        </div>
      </section>
    </div>
  )
}

export default Hero;