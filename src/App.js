import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './App.css';

function App() {
  const [isNavbarOnWhite, setIsNavbarOnWhite] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const philosophySection = document.querySelector('.philosophy-section');
      const trailerSection = document.querySelector('.trailer-section');
      const headerTitle = document.querySelector('.header-title');
      
      const scrollPosition = window.scrollY;
      
      // Check if navbar has touched/overlapped with the h1 element
      if (headerTitle) {
        const titleTop = headerTitle.getBoundingClientRect().top;
        const navbarHeight = 70; // Approximate navbar height
        // Show border when the bottom of navbar reaches the top of h1
        setIsScrolled(titleTop <= navbarHeight);
      }
      
      if (philosophySection && trailerSection) {
        const philosophyTop = philosophySection.offsetTop - 80; // Buffer for smooth transition
        const philosophyBottom = trailerSection.offsetTop - 50; // Stop before trailer starts
        
        // Gold text ONLY when over white philosophy section
        // Default white text when over green sections (header & mobile philosophy trailer)
        if (scrollPosition >= philosophyTop && scrollPosition < philosophyBottom) {
          setIsNavbarOnWhite(true); // Gold text for white background
        } else {
          setIsNavbarOnWhite(false); // Default white text for green backgrounds
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPhilosophy = (e) => {
    e.preventDefault();
    const philosophySection = document.querySelector('.philosophy-section');
    if (philosophySection) {
      philosophySection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
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
      >
        <Container>
          <Navbar.Brand href="#home">{wrapPunctuation("The Philosopher")}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#coffee">Coffee</Nav.Link>
              <Nav.Link href="#philosophy" onClick={scrollToPhilosophy}>Philosophy</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
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

      {/* Coffee Trailer Section */}
      <section className="trailer-section">
        <div className="trailer-content">
          <h3>{wrapPunctuation("About")}</h3>
          <div className="trailer-image">
            <img src={`${process.env.PUBLIC_URL}/trailer_1.png`} alt="The Philosopher Coffee Trailer" />
          </div>
          <div className="trailer-description">
            <p>{wrapPunctuation("Our custom 2-horse trailer conversion brings philosophical coffee experiences directly to you.")}</p>
            <p>{wrapPunctuation("From farmer's markets to corporate events, we deliver thoughtfully crafted beverages wherever contemplation calls.")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
