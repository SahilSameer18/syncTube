import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does the playback synchronization work?",
      answer: "SyncTube uses real-time WebSockets to synchronize video playheads. When the host pauses, plays, or seeks, the event is broadcasted instantly to all other participants. Our player engine automatically compensates for network latency so that playback remains aligned down to the millisecond."
    },
    {
      question: "Do my friends need accounts to join my room?",
      answer: "No! Your friends do not need to create accounts, enter passwords, or purchase subscriptions to join your watch party. You can simply copy your room URL, send it to them, and they can join immediately with just a nickname."
    },
    {
      question: "What video sources do you support?",
      answer: "Out of the box, we support YouTube video URLs. Premium and Pro users can also load custom direct video paths (.mp4, .webm), HLS streaming links (.m3u8), and Twitch streams."
    },
    {
      question: "Is there a limit to how many rooms I can create?",
      answer: "Not at all. You can spin up as many rooms as you like. Free tier rooms automatically shut down after all participants disconnect. Pro users can register permanent, custom room URLs that stay open 24/7."
    },
    {
      question: "How does the voice chat feature work?",
      answer: "Our voice chat utilizes WebRTC peer-to-peer connections for ultra-low latency audio. Voice streams go directly between room members rather than routing through our servers, keeping conversation real-time and crystal clear."
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-surface border-t border-line">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-accent text-sm font-semibold tracking-wider uppercase">FAQ</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Frequently Asked Questions
          </h3>
          <p className="text-muted text-base sm:text-lg">
            Got questions about SyncTube? We have answers. If you need more help, feel free to reach out.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-bg border border-line rounded-xl overflow-hidden transition-colors duration-300"
              >
                {/* Header button */}
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-primary select-none pr-4">
                    {faq.question}
                  </span>
                  
                  {/* Chevron icon */}
                  <span className={`text-muted transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-accent" : "rotate-0"}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {/* Answer body */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[250px] border-t border-line/40 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="px-6 py-5 text-xs sm:text-sm text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
