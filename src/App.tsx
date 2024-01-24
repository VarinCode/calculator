import { JSX } from "react"
import Container from './components/Container';
import Calculator from './components/Calculator';

const App = ():JSX.Element => {
  return (
    <main className='relative w-full h-full'>
      <Container>
        <header className='text-3xl font-bold cursor-default mb-8 text-center'>เครื่องคิดเลขออนไลน์</header>
        <Calculator/>
      </Container>
    </main>
  )
}

export default App;