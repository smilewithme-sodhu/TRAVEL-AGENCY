import React, { useEffect } from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { FileText, Shield, Phone, Mail, MapPin, CheckCircle2, AlertCircle, ArrowUpRight, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TermsOfServicePage = () => {
  const { agencyPhone, openWhatsApp } = useWanderlust();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tocItems = [
    { id: "services", title: "1. Our Services" },
    { id: "ip", title: "2. Intellectual Property Rights" },
    { id: "userreps", title: "3. User Representations" },
    { id: "userreg", title: "4. User Registration" },
    { id: "purchases", title: "5. Purchases and Payment" },
    { id: "returnno", title: "6. Return & Refund Policy" },
    { id: "prohibited", title: "7. Prohibited Activities" },
    { id: "ugc", title: "8. User Generated Contributions" },
    { id: "license", title: "9. Contribution License" },
    { id: "reviews", title: "10. Guidelines for Reviews" },
    { id: "sitemanage", title: "11. Services Management" },
    { id: "ppno", title: "12. Privacy Policy" },
    { id: "copyrightno", title: "13. Copyright Infringements" },
    { id: "terms", title: "14. Term and Termination" },
    { id: "modifications", title: "15. Modifications & Interruptions" },
    { id: "law", title: "16. Governing Law" },
    { id: "disputes", title: "17. Dispute Resolution" },
    { id: "corrections", title: "18. Corrections" },
    { id: "disclaimer", title: "19. Disclaimer" },
    { id: "liability", title: "20. Limitations of Liability" },
    { id: "indemnification", title: "21. Indemnification" },
    { id: "userdata", title: "22. User Data" },
    { id: "electronic", title: "23. Electronic Communications" },
    { id: "misc", title: "24. Miscellaneous" },
    { id: "contact", title: "25. Contact Us" },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-800">
      
      {/* Header Banner */}
      <section className="bg-[#082F49] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#0C4A6E] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-[#38BDF8] border border-sky-400/30 text-xs font-mono font-semibold uppercase tracking-wider">
            <Scale size={14} />
            <span>Legal Documentation</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sky-200/90 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Please read these legal terms carefully before using our platform, booking travel packages, or participating in our membership network.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-sky-200/80 font-mono">
            <span>Last updated: <strong className="text-[#FACC15]">September 24, 2026</strong></span>
            <span>•</span>
            <span>Lisa Travels / Gumnu JUM</span>
            <span>•</span>
            <span className="text-[#38BDF8]">Govt. Reg: 1597/DoT&CAv/E/23/TA</span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Table of Contents - Desktop Sticky Sidebar */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <h3 className="text-xs font-bold font-mono tracking-wider uppercase text-slate-500 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Table of Contents</span>
                <FileText size={14} />
              </h3>
              <nav className="space-y-1 text-xs">
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left py-1.5 px-2.5 rounded-lg text-slate-600 hover:text-[#0A3161] hover:bg-blue-50 font-medium transition-colors cursor-pointer truncate"
                  >
                    {item.title}
                  </button>
                ))}
              </nav>

              <div className="pt-4 border-t border-slate-100 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                <p className="text-[11px] text-slate-600 font-semibold mb-2">Need quick clarification?</p>
                <button
                  onClick={() => openWhatsApp(null, "Hello Lisa Travels, I have a question regarding the Terms of Service.")}
                  className="w-full py-2 px-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Phone size={13} />
                  <span>WhatsApp Legal Desk</span>
                </button>
              </div>
            </div>
          </div>

          {/* Legal Content Body */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-10 leading-relaxed text-slate-700 text-sm sm:text-base">
            
            {/* Agreement Intro Box */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50/40 rounded-2xl border border-blue-100 space-y-3">
              <h2 className="text-xl font-display font-bold text-[#0A3161]">
                Agreement to Our Legal Terms
              </h2>
              <p className="text-sm text-slate-700">
                We are <strong>Lisa travels</strong> (<strong>"Company"</strong>, <strong>"we"</strong>, <strong>"us"</strong>, <strong>"our"</strong>), a company registered in <strong>India</strong> at <strong>arithang, gangtok, sikkim, gangtok, Sikkim 737101, India</strong>.
              </p>
              <p className="text-sm text-slate-700">
                We operate the website <a href="http://www.gumnujum.com" target="_blank" rel="noreferrer" className="text-blue-600 font-semibold underline hover:text-blue-800">http://www.gumnujum.com</a> (the <strong>"Site"</strong>), as well as any other related products and services that refer or link to these legal terms (the <strong>"Legal Terms"</strong>) (collectively, the <strong>"Services"</strong>).
              </p>
              <p className="text-sm text-slate-700 font-semibold text-[#0A3161]">
                We provide Travel booking services.
              </p>
              <div className="pt-2 text-xs text-slate-600 space-y-1">
                <div><strong>Phone:</strong> +91 89721 61329</div>
                <div><strong>Email:</strong> <a href="mailto:lisasonam470@gmail.com" className="text-blue-600 hover:underline">lisasonam470@gmail.com</a></div>
                <div><strong>Address:</strong> arithang, gangtok, sikkim, gangtok, Sikkim 737101, India</div>
              </div>
              <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium">
                These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (<strong>"you"</strong>), and Lisa travels. By accessing the Services, you confirm you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE, YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND MUST DISCONTINUE USE IMMEDIATELY.
              </div>
              <p className="text-xs text-slate-500 pt-1">
                The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.
              </p>
            </div>

            {/* Section 1 */}
            <div id="services" className="space-y-3 pt-4 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">1. Our Services</h3>
              <p className="text-sm text-slate-600">
                The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
              </p>
            </div>

            {/* Section 2 */}
            <div id="ip" className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">2. Intellectual Property Rights</h3>
              <h4 className="text-sm font-bold text-slate-800">Our intellectual property</h4>
              <p className="text-sm text-slate-600">
                We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the <strong>"Content"</strong>), as well as the trademarks, service marks, and logos contained therein (the <strong>"Marks"</strong>).
              </p>
              <p className="text-sm text-slate-600">
                Our Content and Marks are protected by copyright and trademark laws around the world. The Content and Marks are provided in or through the Services <strong>"AS IS"</strong> for your personal, non-commercial use only.
              </p>
              <h4 className="text-sm font-bold text-slate-800 pt-2">Your use of our Services</h4>
              <p className="text-sm text-slate-600">
                Subject to your compliance with these Legal Terms, including the "PROHIBITED ACTIVITIES" section below, we grant you a non-exclusive, non-transferable, revocable license to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                <li>Access the Services; and</li>
                <li>Download or print a copy of any portion of the Content to which you have properly gained access, solely for your personal, non-commercial use.</li>
              </ul>
              <p className="text-sm text-slate-600">
                Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
              </p>
              <p className="text-sm text-slate-600">
                Requests for permission may be addressed to: <a href="mailto:lisasonam470@gmail.com" className="text-blue-600 underline">lisasonam470@gmail.com</a>.
              </p>
            </div>

            {/* Section 3 */}
            <div id="userreps" className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">3. User Representations</h3>
              <p className="text-sm text-slate-600">
                By using the Services, you represent and warrant that:
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-600">
                <li>All registration information you submit will be true, accurate, current, and complete;</li>
                <li>You will maintain the accuracy of such information and promptly update such registration information as necessary;</li>
                <li>You have the legal capacity and you agree to comply with these Legal Terms;</li>
                <li>You are not a minor in the jurisdiction in which you reside (at least 18 years old);</li>
                <li>You will not access the Services through automated or non-human means, whether through a bot, script, or otherwise;</li>
                <li>You will not use the Services for any illegal or unauthorized purpose; and</li>
                <li>Your use of the Services will not violate any applicable law or regulation.</li>
              </ol>
              <p className="text-xs text-slate-500">
                If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services.
              </p>
            </div>

            {/* Section 4 */}
            <div id="userreg" className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">4. User Registration</h3>
              <p className="text-sm text-slate-600">
                You may be required to register to use the Services or access member benefits. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
              </p>
            </div>

            {/* Section 5 */}
            <div id="purchases" className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">5. Purchases and Payment</h3>
              <p className="text-sm text-slate-600">
                We accept the following forms of payment:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                <li><strong>Visa</strong></li>
                <li><strong>Mastercard</strong></li>
                <li>Authorized Online Banking / UPI / Secure Gateways</li>
              </ul>
              <p className="text-sm text-slate-600">
                You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed.
              </p>
              <p className="text-sm text-slate-600">
                Sales tax or GST will be added to the price of purchases as deemed required by applicable law. We may change prices at any time. All payments shall be in <strong>Rupees (INR)</strong>.
              </p>
              <p className="text-sm text-slate-600">
                You agree to pay all charges at the prices then in effect for your purchases and any applicable booking fees, and you authorize us to charge your chosen payment provider for any such amounts upon placing your order. We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or received payment.
              </p>
              <p className="text-sm text-slate-600">
                We reserve the right to refuse any order placed through the Services. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order.
              </p>
            </div>

            {/* Section 6 */}
            <div id="returnno" className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24">
              <div className="p-4 bg-red-50 rounded-2xl border border-red-200">
                <h3 className="text-lg font-bold text-red-900 mb-1 flex items-center gap-2">
                  <AlertCircle size={18} className="text-red-600 shrink-0" />
                  6. Return & Refund Policy
                </h3>
                <p className="text-sm font-semibold text-red-800">
                  All sales are final and no refund will be issued.
                </p>
                <p className="text-xs text-red-700 mt-1">
                  Once travel bookings, reservations, or package vouchers have been confirmed, transactions are non-refundable as service allocations are locked with our logistics and hospitality partners.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div id="prohibited" className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">7. Prohibited Activities</h3>
              <p className="text-sm text-slate-600">
                You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
              </p>
              <p className="text-sm text-slate-600 font-medium">As a user of the Services, you agree not to:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
                <li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                <li>Circumvent, disable, or otherwise interfere with security-related features of the Services.</li>
                <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
                <li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
                <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
                <li>Engage in unauthorized framing of or linking to the Services.</li>
                <li>Upload or transmit viruses, Trojan horses, or repetitive spamming materials.</li>
                <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using data mining tools.</li>
                <li>Delete the copyright or other proprietary rights notice from any Content.</li>
                <li>Attempt to impersonate another user or person or use the username of another user.</li>
                <li>Interfere with, disrupt, or create an undue burden on the Services or networks connected to the Services.</li>
                <li>Harass, annoy, intimidate, or threaten any of our employees or agents.</li>
                <li>Copy or adapt the Services' software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</li>
                <li>Decipher, decompile, disassemble, or reverse engineer any software comprising the Services.</li>
                <li>Use the Services as part of any effort to compete with us or for any revenue-generating endeavor not authorized by us.</li>
                <li>Use the Services to advertise or offer to sell goods and services without authorization.</li>
              </ul>
            </div>

            {/* Section 8 & 9 */}
            <div id="ugc" className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">8. User Generated Contributions</h3>
              <p className="text-sm text-slate-600">
                The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, review forms, and other functionality during which you may create or submit content (collectively, <strong>"Contributions"</strong>). Contributions may be viewable by other users and treated as non-confidential.
              </p>
              <p className="text-sm text-slate-600">
                You represent and warrant that your Contributions do not infringe any proprietary or copyright rights, are not defamatory, false, obscene, or hateful, and comply with all applicable laws.
              </p>
            </div>

            <div id="license" className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">9. Contribution License</h3>
              <p className="text-sm text-slate-600">
                By posting your Contributions, you grant to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, worldwide right and license to host, use, copy, reproduce, disclose, publish, broadcast, store, publicly perform, publicly display, reformat, translate, and distribute such Contributions for any lawful purpose.
              </p>
              <p className="text-sm text-slate-600">
                You retain full ownership of all of your Contributions and any intellectual property rights associated with them. We are not liable for any statements or representations in your Contributions.
              </p>
            </div>

            {/* Section 10 */}
            <div id="reviews" className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">10. Guidelines for Reviews</h3>
              <p className="text-sm text-slate-600">
                When posting a review or rating, you must have firsthand experience with the tour/service, avoid offensive profanity or discriminatory language, refrain from competitor affiliation or false statements, and not organize campaigns encouraging coordinated reviews. We reserve the right to accept, reject, or remove reviews in our sole discretion.
              </p>
            </div>

            {/* Section 11 & 12 */}
            <div id="sitemanage" className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">11. Services Management</h3>
              <p className="text-sm text-slate-600">
                We reserve the right, but not the obligation, to monitor the Services for violations of these Legal Terms, take appropriate legal action against violators, restrict or disable access to content, and manage the Services in a manner designed to protect our rights and property.
              </p>
            </div>

            <div id="ppno" className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">12. Privacy Policy</h3>
              <p className="text-sm text-slate-600">
                We care about data privacy and security. By using the Services, you agree to be bound by our data practices. The Services are hosted in <strong>India</strong>. If you access the Services from any other region with laws governing personal data collection that differ from Indian law, you consent to having your data transferred to and processed in India.
              </p>
            </div>

            {/* Section 13 */}
            <div id="copyrightno" className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">13. Copyright Infringements</h3>
              <p className="text-sm text-slate-600">
                We respect the intellectual property rights of others. If you believe that any material available on or through the Services infringes upon any copyright you own or control, please immediately notify us at <a href="mailto:lisasonam470@gmail.com" className="text-blue-600 underline">lisasonam470@gmail.com</a>.
              </p>
            </div>

            {/* Section 14 & 15 */}
            <div id="terms" className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">14. Term and Termination</h3>
              <p className="text-sm text-slate-600">
                These Legal Terms shall remain in full force and effect while you use the Services. We reserve the right to, in our sole discretion and without notice or liability, deny access to and use of the Services to any person for any reason, including without limitation for breach of any representation, warranty, or covenant contained in these Legal Terms.
              </p>
            </div>

            <div id="modifications" className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">15. Modifications and Interruptions</h3>
              <p className="text-sm text-slate-600">
                We reserve the right to change, modify, or remove contents of the Services at any time or for any reason at our sole discretion without notice. We cannot guarantee the Services will be available at all times due to maintenance or technical updates.
              </p>
            </div>

            {/* Section 16 & 17 */}
            <div id="law" className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">16. Governing Law</h3>
              <p className="text-sm text-slate-600">
                These Legal Terms shall be governed by and defined following the laws of <strong>India</strong>. Lisa travels and yourself irrevocably consent that the courts of <strong>India</strong> shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.
              </p>
            </div>

            <div id="disputes" className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">17. Dispute Resolution</h3>
              <p className="text-sm text-slate-600">
                You agree to irrevocably submit all disputes related to these Legal Terms or the legal relationship established by these Legal Terms to the jurisdiction of the courts located in <strong>India</strong>.
              </p>
            </div>

            {/* Section 18 & 19 */}
            <div id="corrections" className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">18. Corrections</h3>
              <p className="text-sm text-slate-600">
                There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, and availability. We reserve the right to correct any errors and update information on the Services at any time without prior notice.
              </p>
            </div>

            <div id="disclaimer" className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">19. Disclaimer</h3>
              <p className="text-xs sm:text-sm text-slate-600 uppercase tracking-wide leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </div>

            {/* Section 20 & 21 */}
            <div id="liability" className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">20. Limitations of Liability</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES. OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US.
              </p>
            </div>

            <div id="indemnification" className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">21. Indemnification</h3>
              <p className="text-sm text-slate-600">
                You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees, made by any third party due to or arising out of your use of the Services, breach of these Legal Terms, or violation of the rights of a third party.
              </p>
            </div>

            {/* Section 22 & 23 */}
            <div id="userdata" className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">22. User Data</h3>
              <p className="text-sm text-slate-600">
                We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit.
              </p>
            </div>

            <div id="electronic" className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">23. Electronic Communications, Transactions, and Signatures</h3>
              <p className="text-sm text-slate-600">
                Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications satisfy any legal requirement that such communication be in writing.
              </p>
            </div>

            {/* Section 24 */}
            <div id="misc" className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">24. Miscellaneous</h3>
              <p className="text-sm text-slate-600">
                These Legal Terms and any policies or operating rules posted by us on the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision shall not operate as a waiver of such right or provision.
              </p>
            </div>

            {/* Section 25: Contact Us */}
            <div id="contact" className="space-y-4 pt-6 border-t border-slate-100 scroll-mt-24">
              <h3 className="text-lg font-bold text-[#0A3161]">25. Contact Us</h3>
              <p className="text-sm text-slate-600">
                In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
              </p>

              <div className="bg-[#082F49] text-white p-6 sm:p-8 rounded-2xl space-y-4 shadow-md">
                <div>
                  <h4 className="font-display text-xl font-bold text-[#FACC15]">Lisa Travels</h4>
                  <p className="text-xs uppercase tracking-wider text-sky-300 font-semibold">Operating as Gumnu JUM (www.gumnujum.com)</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm pt-2">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-[#38BDF8] shrink-0 mt-0.5" size={18} />
                    <div>
                      <strong className="block text-white">Registered Address:</strong>
                      <span className="text-sky-100/80">arithang, gangtok, sikkim, gangtok, Sikkim 737101, India</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="text-[#25D366] shrink-0 mt-0.5" size={18} />
                    <div>
                      <strong className="block text-white">Direct Hotline:</strong>
                      <a href={`tel:${agencyPhone}`} className="text-sky-100/80 hover:text-white font-mono font-bold">
                        {agencyPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:col-span-2">
                    <Mail className="text-[#FACC15] shrink-0 mt-0.5" size={18} />
                    <div>
                      <strong className="block text-white">Official Support Email:</strong>
                      <a href="mailto:lisasonam470@gmail.com" className="text-sky-100/80 hover:text-white underline">
                        lisasonam470@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#0C4A6E] flex flex-wrap items-center justify-between gap-3 text-xs text-sky-200/70">
                  <div>Govt. License: <strong>1597/DoT&CAv/E/23/TA</strong></div>
                  <div>Tourist Trade Rules 2008 Vide Serial No. 1597</div>
                </div>
              </div>

            </div>

            {/* Attribution Footnote */}
            <div className="pt-6 border-t border-slate-100 text-xs text-slate-400 text-center">
              This Terms and Conditions was created using Termly's <a href="https://termly.io/products/terms-and-conditions-generator/" target="_blank" rel="noopener noreferrer" className="text-slate-500 underline hover:text-slate-700">Terms and Conditions Generator</a>.
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
