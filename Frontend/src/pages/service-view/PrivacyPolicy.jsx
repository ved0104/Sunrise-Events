import React from "react";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/Footer";

const PrivacyPolicy = () => {
  return (<>
    <Layout>
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-900 pt-20">
      <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p className="text-gray-700">Welcome to <span className="font-semibold">Sunrise Events</span>. Your privacy is important to us, and we are committed to protecting your personal information.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><span className="font-semibold">Personal Information:</span> Name, email, phone number, etc.</li>
          <li><span className="font-semibold">Usage Data:</span> IP address, browser type, and device info.</li>
          <li><span className="font-semibold">Cookies and Tracking Technologies:</span> Used for user experience enhancement.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
        <p className="text-gray-700">We use the collected data to improve our services, communicate with you, ensure security, and comply with legal obligations.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. How We Share Your Information</h2>
        <p className="text-gray-700">We do not sell your data. However, we may share it with service providers and legal authorities when required.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Your Rights and Choices</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Access, update, or delete your personal information.</li>
          <li>Opt-out of marketing communications.</li>
          <li>Manage cookies via browser settings.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Contact Us</h2>
        <p className="text-gray-700">If you have any questions, contact us at <span className="font-semibold">[your-email@example.com]</span>.</p>
      </section>
    </div>
    </Layout>
    </>
  );
};

export default PrivacyPolicy;
