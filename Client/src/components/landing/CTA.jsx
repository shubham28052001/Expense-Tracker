import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContexts } from "../../context/AuthProvider";

function CTA() {
    const {token} = useContext(AuthContexts);
  return (
    <section>
      <div className="w-full">
        <div
          className="bg-gradient-to-r from-indigo-600 to-blue-600 p-10 text-center dark:bg-gradient-to-r dark:from-indigo-900 dark:to-blue-300 shadow-2xl"
        >
          <h2 className="text-4xl font-bold text-white dark:text-gray-900">
            Ready to Take Control of Your Finances?
          </h2>

          <p className="mt-4 text-lg text-indigo-100 max-w-2xl mx-auto dark:text-black">
            Start tracking expenses, receive AI-powered insights,
            and make smarter financial decisions today.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {token ? (
              <Link
                to="/dashboard"
                className="rounded-lg bg-white dark:bg-yellow-200 dark:text-black px-6 py-3 font-semibold text-indigo-600 transition hover:scale-105"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="rounded-lg bg-white px-6 py-3 font-semibold text-indigo-600 transition hover:scale-105"
                >
                  Start Tracking Free
                </Link>

                <Link
                  to="/login"
                  className="rounded-lg border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-indigo-600"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;