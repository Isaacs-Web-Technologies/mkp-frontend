
import Image from 'next/image'
import HeroImage from "@/public/images/heroImg.png"

const Hero = () => {
  return (
    <section className="hero font-poppins">
    <div>
      <h2 className=''>
      Discover new and exciting meal
       <br/> with CookGPT faster than 
       <br/>ever
        </h2>

        <p className="text-white text-l mb-4">
              Classic and mouth-watering meals and side dishes 
              <br />for all seasons.
            </p>
            <button className="bg-primary text-white px-6 py-4 rounded-lg border-none text-lg">
              Search for meal
            </button>
    </div>          
      
           {/* Full-width image */}
        <Image
          src={HeroImage}
          alt="MKP Hero Image"
          className="w-screen h-screen object-cover"
          priority
        />

            
          
          
          
        

       
      
    </section>
  );
};

export default Hero;
