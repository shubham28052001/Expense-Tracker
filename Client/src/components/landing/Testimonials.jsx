import React from "react";
import { Star } from "lucide-react";

function Testimonials() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Freelancer",
      review:
        "The AI insights helped me identify unnecessary expenses and save more every month.",
    },
    {
      name: "Priya Patel",
      role: "Software Engineer",
      review:
        "Budget tracking is simple and the analytics give me a clear picture of my spending habits.",
    },
    {
      name: "Amit Verma",
      role: "Business Owner",
      review:
        "A powerful expense tracker with intelligent recommendations. Exactly what I needed.",
    },
  ];

  return (
    <section id="testimonials" className="py-6">
      <div className="max-w-7xl mx-auto px-1">

        <div className="text-center mb-14" data-aos="fade-up">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-blue-100">
            What Our Users Say
          </h2>

          <p className="mt-2 -mb-6 text-gray-600 dark:text-gray-200">
            Thousands of users trust our platform to manage their finances smarter.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((user, index) => (
            <div
              key={index}
              data-aos="zoom-in-up"
              data-aos-delay={index * 150}
              className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex gap-1 text-yellow-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              <p className="text-gray-600 italic dark:text-blue-100">
                "{user.review}"
              </p>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 dark:text-blue-100">
                  {user.name}
                </h4>

                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {user.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;