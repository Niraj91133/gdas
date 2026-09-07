"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [theme, setThemeState] = useState('system');
  const [openMenu, setOpenMenu] = useState('work-menu');
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(true);
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);

  const blogsData = [
    { id: 1, title: "10 Proven Ways to Boost Your SEO Ranking in 2026", category: "Marketing Tips", date: "May 25, 2026", image: "https://picsum.photos/seed/seo/800/400", content: ["In today's highly competitive digital landscape, ranking on the first page of search results is no longer optional—it is a necessity. SEO algorithms are constantly evolving, and staying ahead of the curve means adopting advanced strategies that go beyond keyword stuffing and basic meta tags.", "One of the biggest shifts we've seen recently is the increased reliance on user experience (UX) signals. Page speed, mobile optimization, and interactive elements directly impact how search engines evaluate your site. Furthermore, integrating structured data and focusing on semantic search can help search engines understand the context of your content.", "To truly dominate the SERPs, brands must also focus on acquiring high-quality backlinks from authoritative sources. Content remains king, but the distribution and amplification of that content are what ultimately drive sustained organic traffic. Start by conducting a comprehensive site audit to identify any technical bottlenecks."] },
    { id: 2, title: "How AI is Revolutionizing Social Media Management", category: "Industry News", date: "May 18, 2026", image: "https://picsum.photos/seed/ai/800/400", content: ["Artificial Intelligence is fundamentally altering how brands approach social media. From predictive analytics that determine the optimal time to post, to generative AI that helps draft compelling captions, the tools available today are saving marketers countless hours.", "But AI isn't just about automation; it's about personalization. Advanced algorithms analyze user behavior to deliver highly targeted content that resonates with individual preferences. This level of granular targeting leads to higher engagement rates and better overall ROI on ad spend.", "As we move forward, the integration of AI chatbots for instant customer service on platforms like WhatsApp and Instagram will become standard practice. Brands that fail to adopt these intelligent solutions risk falling behind in an increasingly crowded digital space."] },
    { id: 3, title: "The Ultimate Guide to WhatsApp Automation for Local Businesses", category: "Marketing Tips", date: "May 10, 2026", image: "https://picsum.photos/seed/whatsapp/800/400", content: ["WhatsApp has evolved from a simple messaging app into a powerful CRM and marketing tool. For local businesses, WhatsApp Business API offers unprecedented opportunities to connect directly with customers where they spend the most time.", "Automated greetings, away messages, and quick replies are just the tip of the iceberg. Advanced automation allows businesses to send order updates, appointment reminders, and targeted promotional offers directly to a customer's phone. This results in open rates that traditional email marketing simply cannot match.", "Implementing a WhatsApp automation strategy requires careful planning. You must ensure you are providing value without becoming spammy. By creating a seamless, conversational commerce experience, businesses can foster stronger relationships and drive significant revenue growth."] },
    { id: 4, title: "Why Your Digital Review Strategy Matters More Than Ever", category: "Company Updates", date: "May 02, 2026", image: "https://picsum.photos/seed/review/800/400", content: ["Did you know that over 90% of consumers read online reviews before visiting a business? Your digital reputation is often the first impression a potential customer gets of your brand. A robust digital review management strategy is crucial for building trust and credibility.", "Negative reviews are inevitable, but how you handle them speaks volumes about your customer service. Prompt, professional responses can actually turn a dissatisfied customer into a loyal advocate. Furthermore, a steady stream of positive reviews improves your local SEO rankings, particularly on Google Business Profiles.", "We recommend actively soliciting reviews from satisfied clients using automated SMS or email campaigns. Making the process as frictionless as possible increases the likelihood of receiving valuable feedback that can propel your business forward."] }
  ];

  const clientsData = [
    { name: "TechNova Solutions", service: "SEO & Meta Ads", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", image: "https://picsum.photos/seed/tech/300/500" },
    { name: "Urban Bloom Cafe", service: "Social Media Management", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", image: "https://picsum.photos/seed/cafe/300/500" },
    { name: "Apex Fitness", service: "WhatsApp Automation", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", image: "https://picsum.photos/seed/fitness/300/500" },
    { name: "Lumina Real Estate", service: "GMB Setup & Ranking", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", image: "https://picsum.photos/seed/realestate/300/500" },
    { name: "Dr. Sharma Clinic", service: "Digital Review Management", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", image: "https://picsum.photos/seed/clinic/300/500" },
    { name: "Royal Weddings", service: "Video & Photo Editing", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", image: "https://picsum.photos/seed/wedding/300/500" },
    { name: "Global Edu", service: "School ERP Software", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", image: "https://picsum.photos/seed/edu/300/500" },
    { name: "Politician Raj", service: "Election Branding", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", image: "https://picsum.photos/seed/politician/300/500" },
    { name: "NextGen Auto", service: "Web Design & Development", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", image: "https://picsum.photos/seed/auto/300/500" },
    { name: "FreshMart", service: "IVR Calling", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", image: "https://picsum.photos/seed/mart/300/500" },
  ];

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % clientsData.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + clientsData.length) % clientsData.length);
  };

  const selectVideo = (index) => {
    setCurrentVideoIndex(index % clientsData.length);
    setIsVideoModalOpen(true);
  };

  const selectBlog = (index) => {
    setCurrentBlogIndex(index);
    const container = document.querySelector('.blog-view-container');
    if (container) container.scrollTop = 0;
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      applyTheme(savedTheme);
      setThemeState(savedTheme);
    } else {
      applyTheme('system');
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        if (e.matches) {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const applyTheme = (newTheme) => {
    if (newTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else if (newTheme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      localStorage.removeItem('theme');
    }
    setThemeState(newTheme);
  };

  const toggleMenu = (menuName, e) => {
    e.preventDefault();
    if (openMenu === menuName) {
      setOpenMenu(null);
    } else {
      setOpenMenu(menuName);
    }
  };

  return (
    <main className="container">
        {/* Left Side: Profile & Navigation */}
        <aside className="sidebar">
            <div className="sidebar-top">
                <header className="profile">
                    <h1>Ganesha Digital Ads</h1>
                    <p>Premier Digital Marketing Agency.<br/>Driving growth through data-driven campaigns.</p>
                    <button className="more-btn blue-accent" onClick={() => setIsMoreOpen(!isMoreOpen)}>
                        {isMoreOpen ? (
                          <>Less <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg></>
                        ) : (
                          <>More <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></>
                        )}
                    </button>
                </header>
                
                {!isMoreOpen && (
                  <nav className="links-nav">
                      <ul>
                          <li className={openMenu === 'work-menu' ? 'active' : ''}>
                              <a href="#" id="work-toggle" onClick={(e) => toggleMenu('work-menu', e)}>Work</a>
                          </li>
                          {openMenu === 'work-menu' && (
                              <ul className="sub-menu" style={{display: 'flex'}}>
                                  <li><a href="#">Recent Projects</a></li>
                                  <li><a href="#">Case Studies</a></li>
                                  <li><a href="#">Portfolio</a></li>
                              </ul>
                          )}

                          <li className={openMenu === 'services-menu' ? 'active' : ''}>
                              <a href="#" id="services-toggle" onClick={(e) => toggleMenu('services-menu', e)}>Services</a>
                          </li>
                          {openMenu === 'services-menu' && (
                              <ul className="sub-menu" style={{display: 'flex', flexDirection: 'column'}}>
                                  <li><a href="#">WhatsApp Bulk Messaging & Automation</a></li>
                                  <li><a href="#">Social Media Management</a></li>
                                  <li><a href="#">Google Business Profile (GMB) Setup & Ranking</a></li>
                                  <li><a href="#">Digital Review Management</a></li>
                                  <li><a href="#">Politicians Election Branding</a></li>
                                  <li><a href="#">School ERP Software</a></li>
                                  <li><a href="#">IVR Calling</a></li>
                                  <li><a href="#">Web Design & Development</a></li>
                                  <li><a href="#">SEO & Meta Ads</a></li>
                                  <li><a href="#">Video, Photo & AI Editing</a></li>
                              </ul>
                          )}

                          <li className={openMenu === 'clients-menu' ? 'active' : ''}>
                              <a href="#" id="clients-toggle" onClick={(e) => toggleMenu('clients-menu', e)}>Client review</a>
                          </li>

                          <li className={openMenu === 'faqs-menu' ? 'active' : ''}>
                              <a href="#" id="faqs-toggle" onClick={(e) => toggleMenu('faqs-menu', e)}>FAQs</a>
                          </li>
                          {openMenu === 'faqs-menu' && (
                              <ul className="sub-menu" style={{display: 'flex'}}>
                                  <li><a href="#">Pricing</a></li>
                                  <li><a href="#">Process</a></li>
                                  <li><a href="#">Timelines</a></li>
                              </ul>
                          )}

                          <li className={openMenu === 'blogs-menu' ? 'active' : ''}>
                              <a href="#" id="blogs-toggle" onClick={(e) => toggleMenu('blogs-menu', e)}>Blogs</a>
                          </li>
                      </ul>
                  </nav>
                )}

                {isMoreOpen && (
                  <div className="details-text" style={{display: 'block'}}>
                      <h2>About Our Agency</h2>
                      <p>Ganesha Digital Ads is a full-service digital marketing agency focused on helping brands scale in the digital landscape. We specialize in SEO, PPC, social media management, and performance marketing to deliver measurable ROI.</p>
                      <p>Our team of creative strategists and data analysts work together to build campaigns that not only capture attention but drive meaningful conversions and long-term brand growth.</p>
                  </div>
                )}
            </div>

            <footer className="social-footer">
                <div className="theme-toggles">
                    <button className="theme-btn" aria-label="Light mode" onClick={() => applyTheme('light')}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    </button>
                    <button className="theme-btn" aria-label="Dark mode" onClick={() => applyTheme('dark')}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    </button>
                </div>
                <div className="social-links">
                    <a href="#">Email</a>
                    <a href="#">Phone</a>
                    <a href="#">Twitter</a>
                    <a href="#">Instagram</a>
                    <a href="#">YouTube</a>
                    <a href="#">LinkedIn</a>
                </div>
            </footer>
        </aside>

        {!isMoreOpen && (
          <section className="showcase">
              <div className="desk">
                  <div className="monitor-container">
                      <div className="monitor">
                          <div className="monitor-inner">
                              <div className="screen">
                                  {openMenu === 'clients-menu' ? (
                                      <div className="client-grid-container">
                                          <div className={`client-grid ${isVideoModalOpen ? 'blurred' : ''}`}>
                                              {clientsData.map((client, idx) => (
                                                  <div 
                                                    key={idx} 
                                                    className="client-grid-item"
                                                    style={{ backgroundImage: `url(${client.image})` }}
                                                    onClick={() => selectVideo(idx)}
                                                  >
                                                      <div className="client-overlay">
                                                          <div className="client-label">Review on</div>
                                                          <div className="client-title">{client.service}</div>
                                                      </div>
                                                  </div>
                                              ))}
                                          </div>

                                          {isVideoModalOpen && (
                                              <div className="video-modal-overlay">
                                                  <div className="video-modal-content">
                                                      <button className="glass-close-btn" onClick={() => setIsVideoModalOpen(false)}>
                                                          X
                                                      </button>
                                                      <video 
                                                          key={currentVideoIndex}
                                                          src={clientsData[currentVideoIndex % clientsData.length].video} 
                                                          autoPlay 
                                                          muted 
                                                          loop 
                                                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                      />
                                                  </div>
                                                  
                                                  <button onClick={prevVideo} className="glass-nav-btn prev-btn">
                                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                                  </button>
                                                  <button onClick={nextVideo} className="glass-nav-btn next-btn">
                                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                                  </button>
                                              </div>
                                          )}
                                      </div>
                                  ) : openMenu === 'blogs-menu' ? (
                                      <div className="blog-view-container">
                                          <div className="blog-hero-image" style={{ backgroundImage: `url(${blogsData[currentBlogIndex].image})` }}>
                                              <div className="blog-hero-overlay">
                                                  <div className="blog-meta">{blogsData[currentBlogIndex].category} • {blogsData[currentBlogIndex].date}</div>
                                                  <h1 className="blog-title">{blogsData[currentBlogIndex].title}</h1>
                                              </div>
                                          </div>
                                          
                                          <div className="blog-article-content">
                                              {blogsData[currentBlogIndex].content.map((paragraph, i) => (
                                                  <p key={i}>{paragraph}</p>
                                              ))}
                                          </div>

                                          <div className="related-blogs-section">
                                              <h3>Related Blogs</h3>
                                              <div className="related-grid">
                                                  {blogsData.map((blog, idx) => {
                                                      if (idx === currentBlogIndex) return null;
                                                      return (
                                                          <div key={idx} className="related-card" style={{ backgroundImage: `url(${blog.image})` }} onClick={() => selectBlog(idx)}>
                                                              <div className="related-card-overlay">
                                                                  <div className="related-card-title">{blog.title}</div>
                                                              </div>
                                                          </div>
                                                      )
                                                  })}
                                              </div>
                                          </div>
                                      </div>
                                  ) : (
                                      <div className="website-mockup">
                                          <div className="mockup-header">
                                              <div className="mockup-logo">WorkOS</div>
                                              <div className="mockup-nav">
                                                  <span>Features</span>
                                                  <span>Developers</span>
                                                  <span>Pricing</span>
                                              </div>
                                          </div>
                                          <div className="mockup-hero">
                                              <h2>Your app,<br/>Enterprise Ready.</h2>
                                              <p>Start selling to enterprise customers with just a few lines of code.</p>
                                              <button className="mockup-btn">Read the docs</button>
                                          </div>
                                      </div>
                                  )}
                              </div>
                          </div>
                          <div className="monitor-chin"></div>
                      </div>
                      <div className="stand-wrapper">
                          <div className="stand"></div>
                          <div className="base"></div>
                      </div>
                  </div>
                  <div className="shelf">
                      <div className="shelf-surface"></div>
                  </div>
              </div>
          </section>
        )}

        {isMoreOpen && (
          <section className="owner-showcase" style={{display: 'flex'}}>
              <div className="owner-content">
                  <div className="owner-annotation">
                      <div className="owner-text">
                          <span className="role">CEO and Marketing Expert</span>
                          <span className="name">Ram Gyan</span>
                      </div>
                      <svg className="hand-arrow" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10,20 Q40,40 85,50 M65,30 L90,52 L60,70" fill="none" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                  </div>
                  <div className="owner-image-placeholder">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=RamGyan&backgroundColor=transparent" alt="Ram Gyan" />
                  </div>
              </div>
          </section>
        )}
    </main>
  );
}
