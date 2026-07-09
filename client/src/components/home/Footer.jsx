import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const productLinks = [
    { name: "Features", href: "#features" },
    // { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
    { name: "Open Lobby", onClick: () => navigate("/lobby") }
  ];

  const communityLinks = [
    { name: "GitHub", href: "https://github.com" },
    { name: "Discord", href: "https://discord.com" },
    { name: "Twitter", href: "https://twitter.com" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" }
  ];

  const handleLinkClick = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-bg border-t border-line py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-line/60">
          
          {/* Logo & Pitch */}
          <div className="md:col-span-5 space-y-4">
            <div 
              onClick={() => navigate("/")} 
              className="flex items-center gap-2 cursor-pointer group"
            >
              <span className="text-2xl text-accent group-hover:scale-110 transition-transform duration-200">▶</span>
              <span className="font-extrabold text-xl tracking-tight text-primary">
                SyncTube<span className="text-accent">.</span>
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-sm">
              Watch videos together, perfectly in sync. Synchronize your entertainment, host watch parties, and connect in real time.
            </p>
          </div>

          {/* Product Links */}
          <div className="grid grid-cols-3 gap-8 md:col-span-7">
            <div className="space-y-4">
              <h5 className="text-primary text-xs font-bold uppercase tracking-wider">Product</h5>
              <ul className="space-y-2.5">
                {productLinks.map((link, idx) => (
                  <li key={idx}>
                    {link.onClick ? (
                      <button
                        onClick={link.onClick}
                        className="text-muted hover:text-primary text-xs font-medium bg-transparent border-none cursor-pointer p-0 transition-colors duration-200"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="text-muted hover:text-primary text-xs font-medium transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-primary text-xs font-bold uppercase tracking-wider">Community</h5>
              <ul className="space-y-2.5">
                {communityLinks.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-primary text-xs font-medium transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-primary text-xs font-bold uppercase tracking-wider">Legal</h5>
              <ul className="space-y-2.5">
                {legalLinks.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="text-muted hover:text-primary text-xs font-medium transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} SyncTube. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed for watch party experiences. 🍿
          </p>
        </div>

      </div>
    </footer>
  );
}
