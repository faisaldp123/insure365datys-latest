import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function InsuranceChatbot() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [step, setStep] = useState(1);
  const [insuranceType, setInsuranceType] = useState("");
  const [requirement, setRequirement] = useState("");

  const whatsappNumber = "9870220211"; // Replace with your WhatsApp Number

  const sendToWhatsApp = () => {
    const message = `
Hello Insure365Days,

Name: ${name}
Insurance Type: ${insuranceType}
Requirement: ${requirement}

Please contact me with more details.
`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <>
      {/* Floating Chat Widget */}
      {!open && (
        <div className="fixed bottom-22 right-4 z-[9999] flex flex-col items-end sm:bottom-26 sm:right-6">
          {/* Text Bubble */}
          <div className="bg-white shadow-xl border rounded-xl px-4 py-2 mb-3 text-sm font-medium text-gray-700">
            Need Help?
            <br />
            <span className="text-xs text-blue-600">
              Chat with our advisor
            </span>
          </div>

          {/* Chat Icon */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open insurance advisor chat"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl ring-4 ring-background transition-all duration-300 hover:scale-110 hover:bg-primary/90"
          >
            <MessageCircle size={26} />
          </button>
        </div>
      )}

      {/* Chat Modal */}
      {open && (
        <div
  className="
    fixed
    bottom-20
    sm:bottom-6
    right-2
    sm:right-6
    z-[9999]
    w-[calc(100vw-16px)]
    sm:w-[380px]
    max-w-[380px]
    bg-white
    rounded-2xl
    shadow-2xl
    border
    overflow-hidden
    transition-all
    duration-300
  "
>
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">
                Insure365Days Assistant
              </h3>

              <p className="text-xs opacity-90">
                Online Insurance Advisor
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="hover:opacity-80"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-5">
            {/* STEP 1 */}
            {step === 1 && (
              <>
                <h4 className="font-semibold text-lg mb-2">
                  Welcome 👋
                </h4>

                <p className="text-sm text-gray-600 mb-4">
                  Thank you for visiting Insure365Days.
                </p>

                <p className="text-sm font-medium mb-2">
                  May I know your name?
                </p>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  disabled={!name.trim()}
                  onClick={() => setStep(2)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
                >
                  Continue
                </button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <h4 className="font-semibold text-lg mb-2">
                  Hi {name} 👋
                </h4>

                <p className="text-sm text-gray-600 mb-4">
                  Hope you're having a great day.
                </p>

                <p className="font-medium mb-3">
                  What type of insurance are you looking for?
                </p>

                <div className="space-y-2">
                  {[
                    "Health Insurance",
                    "Life Insurance",
                    "Motor Insurance",
                    "General Insurance",
                    "Claim Assistance",
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setInsuranceType(option);
                        setStep(3);
                      }}
                      className="w-full text-left border rounded-lg px-3 py-2 hover:bg-blue-50 transition"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <h4 className="font-semibold text-lg mb-3">
                  {insuranceType}
                </h4>

                <p className="font-medium mb-3">
                  Who are you looking to insure?
                </p>

                <div className="space-y-2">
                  {[
                    "Self",
                    "Family",
                    "Parents",
                    "Senior Citizen",
                    "Business",
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setRequirement(option);
                        setStep(4);
                      }}
                      className="w-full text-left border rounded-lg px-3 py-2 hover:bg-blue-50 transition"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <>
                <h4 className="font-semibold text-lg mb-3">
                  Great Choice, {name}! 🎉
                </h4>

                <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm">
                  <p>
                    <strong>Name:</strong> {name}
                  </p>

                  <p>
                    <strong>Insurance:</strong> {insuranceType}
                  </p>

                  <p>
                    <strong>Requirement:</strong> {requirement}
                  </p>
                </div>

                <p className="font-medium mb-3">
                  What would you like to do next?
                </p>

                <div className="space-y-2">
                  <button
                    onClick={sendToWhatsApp}
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    Talk to Advisor on WhatsApp
                  </button>

                  <button
                    onClick={sendToWhatsApp}
                    className="w-full border py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    Get Free Quote
                  </button>

                  <button
                    onClick={sendToWhatsApp}
                    className="w-full border py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    Compare Plans
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
