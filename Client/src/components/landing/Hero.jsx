import React from 'react'

function Hero() {
  return (
    <div>
      <section class="bg-white">
        <div class="mx-auto w-screen max-w-7xl px-3 py-0 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-2 lg:py-24">
          <div class=" text-left">
            <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl">
              Take control of your money and
              <strong class="text-indigo-600">  grow  your </strong>
              savings
            </h1>

            <p class="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              Track your daily expenses effortlessly, set smart budgets, and get clear insights into your spending habits. Achieve your financial goals faster with our easy-to-use expense tracker.
            </p>

            <div class="mt-4 flex justify-center gap-4 sm:mt-6">
              <a class="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700" href="#">
                Start Tracking for Free
              </a>


            </div>
          </div>

          <img
            src="/Landing.svg"
            alt="Landing"
          />


        </div>
      </section>

    </div>

  )
}

export default Hero;
