import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDownIcon,
  ArrowUpIcon,
  UserCircleIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import Layout from '../Layout';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/navbar';
// -------------------------
// Main Page Component
// -------------------------
const PolicyPage = () => {
  // Refs for sections
  const sections = {
    about: useRef(null),
    faq: useRef(null),
    booking: useRef(null),
    cancellation: useRef(null),
    getStarted: useRef(null),
  };

  const [activeSection, setActiveSection] = useState('about');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [authTab, setAuthTab] = useState('login');

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25, rootMargin: '-100px 0px -40% 0px' }
    );

    Object.values(sections).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll position tracker for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const smoothScroll = (section) => {
    sections[section].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    // <Layout>
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#fff5ed] mt-15">
      {/* Sticky Navigation */}
      {/* <nav className="sticky top-0 bg-white shadow-sm z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-blue-600">Sunrise Events</h1>
            <div className="hidden md:flex space-x-8">
              {Object.keys(sections).map((section) => (
                <button
                  key={section}
                  onClick={() => smoothScroll(section)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${activeSection === section
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                    } transition-colors`}
                >
                  {section
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (str) => str.toUpperCase())}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* About Us Section */}
        <section id="about" ref={sections.about} className="scroll-mt-24 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Crafting Unforgettable Moments Since 2012
              </h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    At Sunrise Events, we transform ordinary occasions into extraordinary experiences.
                    With over a decade of expertise in event curation, our passionate team brings precision,
                    creativity, and innovation to every celebration.
                  </p>
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-3">
                        <CheckCircleIcon className="h-6 w-6 text-blue-600" />
                        <span>500+ Successful Events</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircleIcon className="h-6 w-6 text-blue-600" />
                        <span>40+ Awards</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircleIcon className="h-6 w-6 text-blue-600" />
                        <span>ISO-Certified Processes</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircleIcon className="h-6 w-6 text-blue-600" />
                        <span>24/7 Client Support</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src="src\assets\images\galleryImages\sangeet.webp"
                    alt="Sunrise Events Team"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section id="faq" ref={sections.faq} className="scroll-mt-24 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border rounded-xl">
                    <button
                      onClick={() =>
                        setOpenFaqIndex(openFaqIndex === index ? null : index)
                      }
                      className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50"
                    >
                      <span className="text-lg font-medium">{faq.question}</span>
                      <motion.span animate={{ rotate: openFaqIndex === index ? 180 : 0 }}>
                        <ChevronDownIcon className="h-6 w-6" />
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {openFaqIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2">
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Policy Sections */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Booking Policy */}
          <section id="booking" ref={sections.booking} className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-blue-300 rounded-2xl shadow-lg p-8 h-full">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Booking Policy</h2>
                <div className="space-y-6">
                  <PolicyCard
                    icon={<CalendarIcon className="h-8 w-8" />}
                    title="Reservation Process"
                    items={[
                      '50% deposit to secure your date',
                      'Flexible payment plans available',
                      'Final payment due 7 days pre-event',
                    ]}
                  />
                  <PolicyCard
                    icon={<CurrencyDollarIcon className="h-8 w-8" />}
                    title="Payment Options"
                    items={[
                      'Credit/Debit Cards (3% fee)',
                      'Bank Transfers (No fee)',

                    ]}
                  />
                </div>
              </div>
            </motion.div>
          </section>

          {/* Cancellation & Refund */}
          <section id="cancellation" ref={sections.cancellation} className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-red-300 rounded-2xl shadow-lg p-8 h-full">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Cancellation & Refund</h2>
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">Cancellation Timeline</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <tbody>
                          {cancellationTerms.map((term, index) => (
                            <tr key={index} className="border-b last:border-b-0">
                              <td className="py-3 px-4">{term.days}</td>
                              <td className="py-3 px-4 font-medium">{term.refund}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 m-10">
                    * Force majeure cancellations will be handled on a case-by-case basis.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>
        </div>

        {/* Get Started Section */}
        {/* <section id="getStarted" ref={sections.getStarted} className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Start Your Journey With Us
              </h2>
              <div className="max-w-md mx-auto">
                <div className="flex mb-8 border-b">
                  <TabButton
                    active={authTab === 'login'}
                    onClick={() => setAuthTab('login')}
                  >
                    <LockClosedIcon className="h-5 w-5 mr-2" />
                    Login
                  </TabButton>
                  <TabButton
                    active={authTab === 'signup'}
                    onClick={() => setAuthTab('signup')}
                  >
                    <UserCircleIcon className="h-5 w-5 mr-2" />
                    Sign Up
                  </TabButton>
                </div>
                <AuthForm authTab={authTab} />
              </div>
            </div>
          </motion.div>
        </section> */}

        {/* Back to Top Button */}
        {/* <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUpIcon className="h-6 w-6" />
            </motion.button>
          )}
        </AnimatePresence> */}
      </main>
    </div>
    <Footer/>
    </>
    // </Layout>
  );
};

// -------------------------
// Reusable Components
// -------------------------
const PolicyCard = ({ icon, title, items }) => (
  <div className="bg-gray-50 rounded-xl p-6">
    <div className="flex items-center mb-4">
      <div className="p-2 bg-blue-100 rounded-lg">{icon}</div>
      <h3 className="ml-3 text-xl font-semibold">{title}</h3>
    </div>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <CheckIcon className="h-5 w-5 text-green-600 flex-shrink-0 mt-1 mr-2" />
          <span className="text-gray-600">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const TabButton = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-1 py-4 flex items-center justify-center ${active
      ? 'border-b-2 border-blue-600 text-blue-600'
      : 'text-gray-500 hover:text-gray-700'
      }`}
  >
    {children}
  </button>
);

const AuthForm = ({ authTab }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., API call)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {authTab === 'signup' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          required
          minLength="8"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        {authTab === 'login' ? 'Login' : 'Create Account'}
      </button>
    </form>
  );
};

// -------------------------
// Data Arrays
// -------------------------
const faqs = [
  {
    question: 'How far in advance should I book my event?',
    answer:
      'We recommend booking at least 3-6 months in advance for weddings and 1-2 months for corporate events to ensure availability and proper planning.',
  },
  {
    question: 'Do you handle destination weddings?',
    answer:
      'Yes! We specialize in destination events with partnerships in over 20 countries. Our team handles all logistics for seamless execution.',
  },
  {
    question: "How do you handle corona virus spread?",
    answer: "By ensuring all staff are fully vaccinated and following all local health guidelines.",
  },

];

const cancellationTerms = [
  { days: '90+ days before event', refund: '80% Refund' },
  { days: '60-89 days before event', refund: '50% Refund' },
  { days: '30-59 days before event', refund: '30% Refund' },
  { days: 'Less than 30 days', refund: 'No Refund' },
];

// -------------------------
// Icon Components
// -------------------------
const CheckCircleIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CheckIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const CalendarIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
    />
  </svg>
);

const CurrencyDollarIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8c-2 0-3 .667-3 2s1 2 3 2 3 .667 3 2-1 2-3 2"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16" />
  </svg>
);

export default PolicyPage;