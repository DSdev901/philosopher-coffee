import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './App.css';

function App() {
  const [isNavbarOnWhite, setIsNavbarOnWhite] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const philosophySection = document.querySelector('.philosophy-section');
      const coffeeSection = document.querySelector('.coffee-section');
      const aboutSection = document.querySelector('.about-section');
      const headerTitle = document.querySelector('.header-title');
      
      const scrollPosition = window.scrollY;
      const offset = 80; // Same offset used for navbar color change
      
      // Check if navbar has touched/overlapped with the h1 element
      if (headerTitle) {
        const titleTop = headerTitle.getBoundingClientRect().top;
        const navbarHeight = 70; // Approximate navbar height
        // Show border when the bottom of navbar reaches the top of h1
        setIsScrolled(titleTop <= navbarHeight);
      }
      
      if (philosophySection && coffeeSection && aboutSection) {
        const philosophyTop = philosophySection.offsetTop - offset;
        const coffeeTop = coffeeSection.offsetTop - offset;
        const aboutTop = aboutSection.offsetTop - offset;
        
        // Determine active section and navbar color based on same trigger point
        // Use the same logic for both active section and navbar color
        if (scrollPosition >= aboutTop) {
          setActiveSection('about');
          setIsNavbarOnWhite(true); // White background (about section)
        } else if (scrollPosition >= coffeeTop) {
          setActiveSection('coffee');
          setIsNavbarOnWhite(false); // Green background (coffee section)
        } else if (scrollPosition >= philosophyTop) {
          setActiveSection('philosophy');
          setIsNavbarOnWhite(true); // White background (philosophy section)
        } else {
          setActiveSection('home');
          setIsNavbarOnWhite(false); // Green background (header section)
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionClass) => (e) => {
    e.preventDefault();
    
    const clickedElement = e.currentTarget;
    const section = document.querySelector(`.${sectionClass}`);
    
    if (section) {
      // Scroll to the section
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // On mobile/touch devices, immediately remove focus to return to original color
      // This happens as soon as scrolling starts
      setTimeout(() => {
        clickedElement.blur();
      }, 50); // Small delay to ensure click is registered
    }
    
    // Collapse navbar on mobile after clicking a link
    setExpanded(false);
  };

  // Function to wrap punctuation in gold spans
  const wrapPunctuation = (text) => {
    // Enhanced regex to catch all punctuation including smart quotes
    const punctuationRegex = /([.,:;!?'"()""''])/g;
    
    const result = [];
    let lastIndex = 0;
    let match;
    
    while ((match = punctuationRegex.exec(text)) !== null) {
      // Add text before punctuation
      if (match.index > lastIndex) {
        result.push(text.slice(lastIndex, match.index));
      }
      
      // Add punctuation with gold styling
      result.push(
        <strong 
          key={match.index} 
          className="gold-punctuation" 
          style={{
            color: '#B8860B !important',
            fontWeight: 'normal',
            background: 'none',
            WebkitTextFillColor: '#B8860B'
          }}
        >
          {match[0]}
        </strong>
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      result.push(text.slice(lastIndex));
    }
    
    return result;
  };

  return (
    <div className="App">
      {/* Bootstrap Navigation Bar */}
      <Navbar 
        variant="dark" 
        expand="lg" 
        fixed="top" 
        style={{backgroundColor: 'transparent'}}
        className={`${isNavbarOnWhite ? 'navbar-on-white' : ''} ${isScrolled ? 'scrolled' : ''}`}
        expanded={expanded}
        onToggle={(expanded) => setExpanded(expanded)}
      >
        <Container>
          <Navbar.Brand href="#home" onClick={scrollToSection('App-header')}>{wrapPunctuation("The Philosopher")}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link 
                href="#home" 
                onClick={scrollToSection('App-header')}
                className={activeSection === 'home' ? 'active' : ''}
                active={false}
              >
                Home
              </Nav.Link>
              <Nav.Link 
                href="#philosophy" 
                onClick={scrollToSection('philosophy-section')}
                className={activeSection === 'philosophy' ? 'active' : ''}
                active={false}
              >
                Philosophy
              </Nav.Link>
              <Nav.Link 
                href="#coffee" 
                onClick={scrollToSection('coffee-section')}
                className={activeSection === 'coffee' ? 'active' : ''}
                active={false}
              >
                Coffee
              </Nav.Link>
              <Nav.Link 
                href="#about" 
                onClick={scrollToSection('about-section')}
                className={activeSection === 'about' ? 'active' : ''}
                active={false}
              >
                About
              </Nav.Link>
              {/* <Nav.Link href="#contact">Contact</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <header className="App-header">
        <div className="header-content">
          <h1 className="header-title">{wrapPunctuation("The Philosopher")}</h1>
          <h2 className="header-subtitle">{wrapPunctuation("Coffee")}</h2>
          <h4 className="header-tagline">{wrapPunctuation("I drink therefore I am... awake.")}</h4>
        </div>
      </header>

      {/* Philosophy Section */}
      <section className="philosophy-section">
        <div className="philosophy-content">
          <h3>{wrapPunctuation("Our Philosophy")}</h3>
          <p>
            {wrapPunctuation("In the tradition of great thinkers who found clarity in contemplation, we believe the perfect cup is both journey and destination.")}
          </p>
          <div className="philosophy-quote">
            {wrapPunctuation('"I drink, therefore I am... awake."')}
          </div>
          <p>
            {wrapPunctuation("Our mobile coffee company brings thoughtfully curated espresso drinks and drip coffee directly to you, accompanied by select treats and desserts that complement the philosophical pursuit of the perfect brew.")}
          </p>
          <p>
            {wrapPunctuation("From Socratic questioning of bean origins to Cartesian precision in extraction, we approach each cup with the rigor of inquiry and the joy of discovery.")}
          </p>
        </div>
      </section>

      {/* Coffee Section */}
      <section className="coffee-section">
        <div className="coffee-content">
          <div className="coffee-image-container">
            <img src={`${process.env.PUBLIC_URL}/coffee_photo.png`} alt="The Philosopher Coffee" />
          </div>
          <div className="coffee-text">
            <h3>{wrapPunctuation("The Essence of Excellence")}</h3>
            <p>
              {wrapPunctuation("Every great idea begins with a premise. Ours is simple: exceptional coffee requires unwavering commitment to quality at every stage of existence.")}
            </p>
            <p>
              {wrapPunctuation("We source only the finest beans, selected through a process of dialectical examination—questioning origin, roast, and character until only truth remains. Our espresso drinks are crafted with the precision of logical proof, each shot pulled to empirical perfection.")}
            </p>
            <p>
              {wrapPunctuation("From single-origin pour-overs that reveal the a priori nature of terroir, to our signature espresso blends that synthesize complexity and balance, every cup embodies our categorical imperative: quality without compromise.")}
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h3>{wrapPunctuation("About")}</h3>
          <div className="about-image">
            <img src={`${process.env.PUBLIC_URL}/trailer_1.png`} alt="The Philosopher Coffee Trailer" />
          </div>
          <div className="about-description">
            <p>{wrapPunctuation("Our custom 2-horse trailer conversion brings philosophical coffee experiences directly to you.")}</p>
            <p>{wrapPunctuation("From farmer's markets to corporate events, we deliver thoughtfully crafted beverages wherever contemplation calls.")}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={`${process.env.PUBLIC_URL}/logo_flat.png`} alt="The Philosopher Coffee Logo" />
          </div>
          <div className="footer-center">
            <div className="footer-social">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
            <div className="footer-info">
              <p>&copy; {new Date().getFullYear()} The Philosopher Coffee</p>
              <p>Memphis, TN</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
