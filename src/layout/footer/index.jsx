import React from "react";
import "./footer.scss";

const FooterLinkSection = ({ title, links }) => (
  <div className="footer__link-section">
    <h5 className="footer__link-subheader">{title}</h5>
    <div className="footer__link-list">
      {links.map((label, i) => (
        <span key={label}>
          <a href="#" className="footer__link-inline">{label}</a>
          {i < links.length - 1 && <span className="footer__pipe"> | </span>}
        </span>
      ))}
    </div>
    <hr className="footer__hr" />
  </div>
);

const Footer = () => {
  const linkClass = "footer__link";
  const emailClass = "footer__email-link";

  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Top section: 5 columns */}
        <div className="footer__top">
          <div className="footer__col">
            <h3 className="footer__col-title">Know Your Jewellery</h3>
            <ul className="footer__list">
              <li><a href="#" className={linkClass}>Diamond guide</a></li>
              <li><a href="#" className={linkClass}>Jewellery guide</a></li>
              <li><a href="#" className={linkClass}>Gemstones guide</a></li>
              <li><a href="#" className={linkClass}>Gold rate</a></li>
              <li><a href="#" className={linkClass}>Treasure chest</a></li>
              <li><a href="#" className={linkClass}>Glossary</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h3 className="footer__col-title">CaratLane Advantage</h3>
            <ul className="footer__list">
              <li><a href="#" className={linkClass}>15-day returns</a></li>
              <li><a href="#" className={linkClass}>Free shipping</a></li>
              <li><a href="#" className={linkClass}>Postcards</a></li>
              <li><a href="#" className={linkClass}>Gold exchange</a></li>
              <li><a href="#" className={linkClass}>Gift cards</a></li>
              <li><a href="#" className={linkClass}>Digital gold</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h3 className="footer__col-title">Customer Service</h3>
            <ul className="footer__list">
              <li><a href="#" className={linkClass}>Return policy</a></li>
              <li><a href="#" className={linkClass}>Order status</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h3 className="footer__col-title">About Us</h3>
            <ul className="footer__list">
              <li><a href="#" className={linkClass}>Our story</a></li>
              <li><a href="#" className={linkClass}>Press</a></li>
              <li><a href="#" className={linkClass}>Blog</a></li>
              <li><a href="#" className={linkClass}>Careers</a></li>
            </ul>
          </div>
          <div className="footer__col footer__col--contact">
            <h3 className="footer__col-title">Contact Us</h3>
            <div className="footer__list">
              <p className="footer__list-mainItem">CaratLane Trading Pvt Ltd</p>
              <p>6th Floor, Olympia Cyberspace,</p>
              <p>Arulayiammanpet, SIDCO Industrial Estate,</p>
              <p>Guindy, Chennai,</p>
              <p>Tamil Nadu 600032</p>
            </div>
          </div>
        </div>

        {/* Middle section: App download + Find Us On */}
        <div className="footer__middle">
          <div className="footer__app-box">
            <h3 className="footer__app-title">Download the CaratLane App</h3>
            <p className="footer__app-sub">Shop & Save more on app by redeeming eCaratLane points</p>
            <div className="footer__app-buttons">
              <a href="#" className="footer__app-store">
                <AppleIcon />
                <span>Download on the App Store</span>
              </a>
              <a href="#" className="footer__app-store footer__app-store--google">
                <GooglePlayIcon />
                <span>GET IT ON Google Play</span>
              </a>
            </div>
          </div>
          <div className="footer__support">
            <h4 className="footer__support-title">24X7 ENQUIRY SUPPORT (ALL DAYS)</h4>
            <div className="footer__emails">
              <p>General: <a href="mailto:contactus@caratlane.com" className={emailClass}>contactus@caratlane.com</a></p>
              <p>Corporate: <a href="mailto:b2b@caratlane.com" className={emailClass}>b2b@caratlane.com</a></p>
              <p>Hr: <a href="mailto:careers@caratlane.com" className={emailClass}>careers@caratlane.com</a></p>
              <p>Grievance: <a href="#" className={emailClass}>click here</a></p>
            </div>
            <div className="footer__contact-icons">
              <a href="#" className="footer__icon-btn" aria-label="Call Us">
                <PhoneIcon />
                <span>Call Us</span>
              </a>
              <a href="#" className="footer__icon-btn" aria-label="Chat">
                <ChatIcon />
                <span>Chat</span>
              </a>
              <a href="#" className="footer__icon-btn" aria-label="Whatsapp">
                <WhatsappIcon />
                <span>Whatsapp</span>
              </a>
              <a href="#" className="footer__icon-btn" aria-label="Email">
                <EmailIcon />
                <span>Email</span>
              </a>
            </div>
            <a href="#" className="footer__find-store">
              <StoreIcon />
              <span>FIND A STORE</span>
            </a>
          </div>
        </div>
        <div className="footer__social-block">
          <p className="footer__find-us">Find Us On</p>
          <div className="w-full footer__social-block-inner">
            <div className="footer__social-icons">
              <a href="#" className="footer__social-icon" aria-label="Instagram"><InstagramIcon /></a>
              <a href="#" className="footer__social-icon" aria-label="Facebook"><FacebookIcon /></a>
              <a href="#" className="footer__social-icon" aria-label="LinkedIn"><LinkedInIcon /></a>
              <a href="#" className="footer__social-icon" aria-label="Pinterest"><PinterestIcon /></a>
              <a href="#" className="footer__social-icon" aria-label="X"><XIcon /></a>
            </div>
            <div className="footer__payment-logos">
              <span className="footer__payment-logo" title="VISA">VISA</span>
              <span className="footer__payment-logo" title="Mastercard">Mastercard</span>
              <span className="footer__payment-logo" title="PayPal">PayPal</span>
              <span className="footer__payment-logo" title="Amazon">Amazon</span>
              <span className="footer__payment-logo" title="Bizrate">Bizrate</span>
            </div>
          </div>
        </div>


        {/* Link sections: single column, pipe-separated links */}
      </div>
      <div className="footer__links-wrap">
        <div className="max-w-[1195px] mx-auto px-5">
          <h4 className="footer__link-header">Popular Searches</h4>
          <FooterLinkSection title="Gifts" links={["Gifts For Men", "Christmas Gifts", "Gifts Under 10000", "Gifts Under 30000", "Gifts Under 50000", "CaratLane Gift Cards", "Birthday Gifts", "Anniversary Gifts", "Romantic Gifts", "Gifts For Kids", "Gifts For Sister", "Gifts For Mom", "Gifts For Girlfriend", "International Gifting", "Gifts For Wife", "Pendant Gift", "Bracelet Gifts", "Wedding Gifts", "Ring Gifts", "BKT Gold Gifts", "Silver Diamond Gifts"]} />
          <FooterLinkSection title="CaratLane Exclusives" links={["New Arrivals", "Self Gifting", "Postcards", "Digital Gold", "Gold Savings Scheme", "Store Locator", "Designathon"]} />
          <FooterLinkSection title="Jewellery" links={["Gold", "Diamond", "Solitaire", "Gemstone", "22kt Jewellery", "Platinum", "Charms", "Watch Charms", "Chains", "Silver Jewellery", "Rose Gold Jewellery", "White Gold Jewellery"]} />
          <FooterLinkSection title="Earrings" links={["Gold Earrings", "Diamond Earrings", "Solitaire Earrings", "Platinum Earrings", "Kids Earrings", "Jhumka Earrings", "Hoop Earrings", "Stud Earrings", "Pearl Earrings", "Sui Dhaga Earrings", "Chandbali Earrings", "Ear Cuff Earrings", "Fancy Earrings", "Stone Earrings", "Daily Wear Earrings", "Butterfly Earrings"]} />
          <FooterLinkSection title="Rings" links={["Diamond Rings", "Gold Rings", "Platinum Rings", "Solitaire Rings", "Gemstone Rings", "Men's Rings", "Engagement Ring", "Couple Ring", "Wedding Ring", "Vanki Ring", "Ruby Ring", "Emerald Ring", "Name Ring", "Cocktail Ring", "Love Ring", "Butterfly Ring", "Infinity Rings", "Pearl Rings", "Promise Rings", "3 Gram Gold Rings", "2 Gram Gold Rings", "1 Gram Gold Rings"]} />
          <FooterLinkSection title="Necklace" links={["Gold Necklace", "Diamond Necklace", "Kids Necklace", "Gemstone Necklace", "Ruby Necklace", "Choker Necklace", "Pearl Necklace", "Evil Eye Necklace", "Necklaces For Women", "Long Necklace", "Name Necklace", "Stone Necklace", "Butterfly Necklace", "Bridal Necklace", "Fancy Necklace", "22kt Gold Chains"]} />
          <FooterLinkSection title="Bracelets" links={["Gold Bracelets", "Diamond Bracelets", "Kids Bracelets", "Pearl Bracelets", "Evil Eye Bracelets", "Tennis Bracelets", "Chain Bracelets", "Name Bracelets", "Stone Bracelets", "Cuff Bracelets"]} />
          <FooterLinkSection title="Bangles" links={["Gold Bangles", "Diamond Bangles", "Kids Bangles", "Daily Wear Bangles", "Bridal Bangles", "Stone Bangles", "Baby Bangles", "Traditional Bangles"]} />
          <FooterLinkSection title="Nose Pins" links={["Nose Rings", "Gold Nose Pins", "Diamond Nose Pins", "Nose Studs", "Pressing Nose Rings", "Stone Nose Rings"]} />
          <FooterLinkSection title="Pendants" links={["Gold Pendants", "Diamond Pendants", "Solitaire Pendants", "Evil Eye Pendants", "Chain Pendants", "Om Pendants", "Butterfly Pendants", "Heart Pendants"]} />
          <FooterLinkSection title="Mangalsutra" links={["Gold Mangalsutra", "Diamond Mangalsutra", "Modern Mangalsutra", "South Indian Mangalsutra", "Fancy Mangalsutra", "Black Beads Mangalsutra", "Gold Mangalsutra Under 20000", "Traditional Mangalsutra", "Light Weight Mangalsutra", "Daily Use Mangalsutra", "Infinity Mangalsutra"]} />
          <FooterLinkSection title="For Men" links={["Rings For Men", "Earrings For Men", "Bracelet For Men", "Men's Kada"]} />
          <FooterLinkSection title="For Women" links={["Rings For Women", "Earrings For Women", "Bracelet For Women", "Bangles For Women", "Pendants For Women", "Necklaces For Women"]} />
          <FooterLinkSection title="Gold Rate in Major Cities" links={["Gold Rate Today In Chennai", "Gold Rate Today In Bangalore", "Gold Rate Today In Hyderabad", "Gold Rate Today In Mumbai", "Gold Rate Today In Delhi", "Gold Rate Today In Kerala", "Gold Rate Today In Pune", "Gold Rate Today In Vijayawada", "Gold Rate Today In Kolkata", "Gold Rate Today In Ahmedabad"]} />
          <div className="footer__copyright">
            <p className="footer__copyright-text">COPYRIGHT CARATLANE 2023</p>
            <div className="footer__legal-links">
              <a href="#">SITE MAP</a>
              <span className="footer__pipe">|</span>
              <a href="#">PRIVACY POLICY</a>
              <span className="footer__pipe">|</span>
              <a href="#">TERMS &amp; CONDITIONS</a>
              <span className="footer__pipe">|</span>
              <a href="#">EXERCISE YOUR RIGHTS</a>
              <span className="footer__pipe">|</span>
              <a href="#">CORPORATE</a>
              <span className="footer__pipe">|</span>
              <a href="#">EXCLUSIVE DISCOUNT POINTS</a>
              <span className="footer__pipe">|</span>
              <a href="#">FREQUENTLY ASKED QUESTION</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function WhatsappIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function StoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}
function GooglePlayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.302 2.302-8.636-8.634z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.919-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.919.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function PinterestIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default Footer;
