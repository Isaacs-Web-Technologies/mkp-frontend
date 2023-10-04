import Button from '@/components/ui/Button'
import { Navbar } from '@/components/navbar/NavBar'
import Chat from '@/components/User/chat'
import Sidebar from '@/components/User/sidebar'



const page = () => {
  return (<>
  <Navbar />
      <div className="flex">
        <Sidebar />
        <Chat />
      </div>

  
  </>
    
  )
}

export default page