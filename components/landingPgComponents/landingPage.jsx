'use client'
'use client'
import { TypeAnimation } from 'react-type-animation';
import './styles.css';
import Link from 'next/link';
import Head from 'next/head';

const LandingPage = () => {
  return (
    <>
      {/* <Head>
        <title>My Kitchen Power</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head> */}
    
      <section className="hero">
      <div className="gradientOverlay"></div>
      <div className="heroWriteup">
        <h3>Unleash Culinary Magic 
          <br/>with My Kitchen Power!
        </h3>
        <p> Dive into a world of flavors with your AI-powered kitchen assistant.  
        </p>
      </div>

        <div className="animate">
          <div className="search-example-animation-container">
            <Link href="./signUp">
              <TypeAnimation
                sequence={[
                  'How do I make chocolate chip cookies?', 1000,
                  'Give me a vegan pasta recipe', 1000,
                  'Can I cook fried rice with these ingredients?...', 1000,
                  'What kind of recipe can I prepare with these ingredients?...', 1000,
                  'How about low-carb dinner options?', 1000,
                  'Give me kid-friendly snacks', 1000,
                  'Craving spicy Thai dishes?', 1000,
                  'How do I cook banga soup?', 1000,
                  'Need a gluten-free dessert?', 1000,
                  'Dive into holiday appetizers', 1000,
                ]}
                speed={80} 
                wrapper="p"
                repeat={Infinity}
                className="word" 
              />
              <svg className="feather feather-search mr-2" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
            </Link>
          </div>
        </div>
        
      </section>
    </>
  );
};

export default LandingPage;