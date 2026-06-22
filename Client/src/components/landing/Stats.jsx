import React from "react";
import {
  Wallet,
  ReceiptText,
  Brain,
  Target,
} from "lucide-react";

function Stats() {
  const stats = [
    {
      icon: <Wallet size={32} />,
      value: "₹50L+",
      label: "Expenses Managed",
    },
    {
      icon: <ReceiptText size={32} />,
      value: "10K+",
      label: "Transactions Tracked",
    },
    {
      icon: <Brain size={32} />,
      value: "500+",
      label: "AI Insights Generated",
    },
    {
      icon: <Target size={32} />,
      value: "95%",
      label: "Budget Accuracy",
    },
  ];

  return (
    <section>
      <div className="max-w-9xl mx-auto px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <div
              key={index}
              data-aos="zoom-in-up"
              data-aos-delay={index * 200}
              className="group rounded-2xl border border-gray-200 bg-blue-50 px-8 py-2 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                {item.icon}
              </div>

              <h3 className="mt-6 text-4xl font-bold text-gray-900">
                {item.value}
              </h3>

              <p className="mt-2 text-gray-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;