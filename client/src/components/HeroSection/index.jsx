import React, { useState, useEffect, useRef} from 'react'
import './herosection.css'
import heroImg from '../../assets/images/image.png'

function Counter({ target, label }) {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const end = parseFloat(target); 
    const duration = 2000; // 2s
    const stepTime = 20;

    const step = Math.max(0.1, end / (duration / stepTime)); // smart step

    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      setCount(Number.isInteger(end) ? Math.floor(current) : current.toFixed(1));
    }, stepTime);

    return () => clearInterval(timer);
  }, [start, target]);

  return (
    <div ref={ref} className="counter text-center transition-all duration-700 hover:scale-110">
      <span className="counter__number text-4xl font-bold text-[#EE3E5A] block">
        {count}+
      </span>
      <span className="counter__label text-gray-600">{label}</span>
    </div>
  );
}
export default function HeroSection() {
    const words = ["Most User-Friendly", "Turnkey", "Agile", "Scalable"];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0); 
  const [subIndex, setSubIndex] = useState(0); 
  const [deleting, setDeleting] = useState(false);

  // Typing effect logic
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1000);
      return;
    }
    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  useEffect(() => {
    setText(words[index].substring(0, subIndex));
  }, [subIndex, index]);
    
  return (
    <div className='main-container'>
      <section className='hero-banner'>
        <div className="container">
          <div  className='row align-items-center justify-content-between' >
            <div className='col-lg-6 col-xl-5'> 
                <div className="cms">
                    <h1>
                        <span className='text-writing'>{text}</span>
                        <span className='typed-cursor'>|</span>
                        <p>eCommerce  Marketplace Platform  </p>
                    </h1>
                    <p className='p--large'>
                        Designed for Startups and Enterprises, Yo!Kart empowers you with faster GoToMarket times and extensively optimized eCommerce operations to lead the industry
                    </p>
                    <div className='hero-banner-button'>
                        <h5 className='pricestr'>Unrivaled CX | Streamlined UI/UX | Fast deployment</h5>
                        <a href='' className='btn btn--primary my-2 transition-all duration-300 ease-in-out 
             hover:opacity-85 hover:scale-105' id='homepage_banner'>Get Started</a>
                    </div>

                </div>
            </div>
            <div className='col-lg-6 d-none d-md-block'>
                <picture>
                    <img src={heroImg} alt='yokart banner' className='hero-img' />
                </picture>
            </div>
         </div> 

        </div>
        </section>
        <section className='section section--featured'>
            <div className="container">
                <div className="featured-logo-listing">
                    <h5>Top Rated Choice on Trusted Review Websites</h5>
                    <div className="rating-wrapper">
                        <div className="rating__col">
                            <div className="rating__provider">
                                Software Suggest
                            </div>
                            <div className="rating__detail">
                                <span className='rating__count'>4.9</span>
                                <span className='rating__stars'>
                                    <i data-star="4.9" style={{ "--rating": 4.9 }}></i>
                                    </span>
                            </div>
                        </div>
                        <div className="rating__col">
                            <div className="rating__provider">
                                Goodfirms
                            </div>
                            <div className="rating__detail">
                                <span className='rating__count'>4.8</span>
                                    <span className='rating__stars'>
                                    <i data-star="4.8" style={{ "--rating": 4.8}}></i>
                                    </span>

                            </div>
                        </div>
                        <div className="rating__col">
                             <div className="rating__provider">
                                Capterra
                            </div>
                            <div className="rating__detail">
                                <span className='rating__count'>4.3</span>
                               <span className='rating__stars'>
                                    <i data-star="4.3" style={{ "--rating": 4.3 }}></i>
                                    </span>
                            </div></div>                       
                        <div className="rating__col">
                            <div className="rating__provider">
                                G2
                            </div>
                            <div className="rating__detail">
                                <span className='rating__count'>4.6</span>
                                <span className='rating__stars'>
                                    <i data-star="4.6" style={{ "--rating": 4.6 }}></i>
                                    </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className='section section--whychoose  pt-6'>
            <div className="container">
                <div className='.section__header --md text-md-center'>
                    <h2>
                        Why choose Yo!Kart for your ecommerce marketplace?
                    </h2>
                    <p className='p-large m-15'>
                        Yo!Kart is an eCommerce marketplace software carefully crafted to fulfill the needs of startups and Enterprises. We pride ourselves that we have empowered 5000+ businesses globally with over 10+ years of industry experience, knowledge, and collective expertise. Our eCommerce solution enables you to implement your own comprehensive strategies in the eCommerce space.
                    </p>
                </div>
                <div className="section-body">
            <div className="counter-row grid grid-cols-2 md:grid-cols-4 gap-6">
              <Counter target="5000" label="Projects" />
              <Counter target="100" label="Countries" />
              <Counter target="4.8" label="Ratings" />
              <Counter target="10" label="Years" />
            </div>
          </div>
    
            </div>
        </section>

    </div>
  )
}