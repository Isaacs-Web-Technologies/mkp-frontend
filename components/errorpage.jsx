import Image from "next/image";
import Link from "next/link";
import Errorimage from "@/public/images/Error404Image.png";

const ErrorPage = () => {
    return (
      <>
      <div className="hero left-0 mx-auto flex-wrap">
       <div>
         <h1 className="">Hey Buddy</h1>
          <p className="">
             We can't seem to find the page you are looking for
           </p>
            <Link href="/">
             <h1 className="text-white">Go Home</h1>
             </Link>
         </div>
                <Image
                  src={Errorimage}
                  className="left-0 w-screen h-screen object-cover"
                  priority
                />     
      </div>
      </>
  );
};
export default ErrorPage;