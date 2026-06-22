import React from "react";
import { UserPlus, CreditCard, Brain, TrendingUp, ArrowRight } from "lucide-react";

function Working() {
    const steps = [
        {
            icon: <UserPlus size={28} />,
            title: "Sign Up in Seconds",
            desc: "Create your account and set up your personal finance dashboard instantly.",
        },
        {
            icon: <CreditCard size={28} />,
            title: "Add Your Expenses",
            desc: "Track daily spending manually or sync transactions automatically.",
        },
        {
            icon: <Brain size={28} />,
            title: "AI Analysis",
            desc: "Our AI analyzes your spending patterns and finds hidden insights.",
        },
        {
            icon: <TrendingUp size={28} />,
            title: "Save & Grow",
            desc: "Get smart suggestions and improve your financial health over time.",
        },
    ];

    return (
        <section id="working" className="py-20">
            <div className="max-w-7xl mx-auto px-2">

                {/* Heading */}
                <div className="text-center mb-16"
                    data-aos="fade-up"
                >
                    <h2 className="text-4xl font-bold text-gray-900">
                        How It Works
                    </h2>

                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
                        Start managing your money in just 4 simple steps with AI-powered intelligence.
                    </p>
                </div>

                {/* Steps */}
                <div className="relative py-2">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                data-aos="zoom-in-up"
                                data-aos-delay={index * 150}
                                className="relative rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                {/* Step number */}
                                <span className="absolute -top-4 left-6 rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white">
                                    Step {index + 1}
                                </span>

                                {/* Icon */}
                                <div className="text-indigo-600">{step.icon}</div>

                                {/* Content */}
                                <h3 className="mt-5 text-xl font-semibold text-gray-900">
                                    {step.title}
                                </h3>

                                <p className="mt-3 text-gray-600">{step.desc}</p>

                                {/* Arrow (only show if not last item) */}
                                {index !== steps.length - 1 && (
                                    <div className="hidden lg:flex absolute top-1/2 -right-8 -translate-y-1/2 text-gray-400">
                                        <ArrowRight size={28} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Working;