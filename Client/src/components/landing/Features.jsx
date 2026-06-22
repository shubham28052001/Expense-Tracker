import React from "react";
import {
  Wallet,
  Brain,
  PieChart,
  Target,
  Bell,
  Shield,
} from "lucide-react";

function Features() {
  const features = [
    {
      icon: <Wallet size={30} />,
      title: "Expense Tracking",
      desc: "Record and organize your daily expenses effortlessly.",
    },
    {
      icon: <Brain size={30} />,
      title: "AI Insights",
      desc: "Get AI-powered recommendations based on your spending habits.",
    },
    {
      icon: <PieChart size={30} />,
      title: "Smart Analytics",
      desc: "Visualize trends with detailed charts and reports.",
    },
    {
      icon: <Target size={30} />,
      title: "Budget Planning",
      desc: "Set monthly budgets and monitor your financial goals.",
    },
    {
      icon: <Bell size={30} />,
      title: "Spending Alerts",
      desc: "Receive alerts when you're close to your budget limits.",
    },
    {
      icon: <Shield size={30} />,
      title: "Secure Data",
      desc: "Your financial information is protected with modern security.",
    },
  ];

  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12"
          data-aos="fade-up"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-blue-50">
            Everything you need to manage your finances
          </h2>

          <p className="mt-4 text-lg text-gray-600 max-w-3xl dark:text-gray-300 mx-auto">
            Track expenses, analyze spending patterns with AI,
            create budgets, and make smarter financial decisions
            from a single dashboard.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              data-aos="zoom-in-up"
              data-aos-delay={index * 100}
              className="group rounded-2xl border border-gray-200 p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500 dark:hover:border-amber-300 hover:shadow-xl"
            >
              <div className="inline-flex h-14 w-14 items-center dark:text-gray-900 justify-center rounded-xl bg-indigo-100 text-indigo-600">
                {feature.icon}
              </div>

              <h3 className="mt-5 text-xl font-semibold text-gray-900 dark:text-blue-100">
                {feature.title}
              </h3>

              <p className="mt-3 text-gray-600 dark:text-gray-200">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;