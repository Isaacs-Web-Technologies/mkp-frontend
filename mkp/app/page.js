import Hero from '@/components/landingPgComponents/hero'
import { Navbar } from '@/components/navbar/NavBar'
import {SearchBar} from '@/components/landingPgComponents/searchBar'
import { LatestRecipes } from '@/components/landingPgComponents/latestRecipies'
import { FreshFromCommunity } from '@/components/landingPgComponents/frshFrmCommunity'
import { ExploreNigerianRecipies } from '@/components/landingPgComponents/ExploreNigerianRecipies'
import { Footer } from '@/components/footer'


const Home = () => {
  return (
  <div>
    <section>
    <Navbar />
    </section>
    <section>
       {/* <Hero /> */}
    </section >
    <section>
      <SearchBar />
    </section>
    <section>
      <LatestRecipes />
    </section>
    <section>
      <FreshFromCommunity />
    </section>
    <section>
      <ExploreNigerianRecipies />
    </section>
    <section>
      <Footer />
    </section>
 </div>

  )
}
export default Home