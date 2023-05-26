import About from "@components/About"
import Skills from "@components/Skills"
import Projects from "@components/Projects"
import Socials from "@components/Socials"

const Home = () => {
  return (
    <div className="pb-10">
      <About />
      <Skills />
      <Projects />
      <Socials />
    </div>
  )
}

export default Home