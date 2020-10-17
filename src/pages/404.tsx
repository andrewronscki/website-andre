import Link from 'next/link';
import { Container, GoHome } from '@/styles/pages/NotFound';
import NotFound404 from '@/assets/notFound.png';

export default function NotFound() {
  return (
    <Container>
      <img src={NotFound404} alt="page not found"/>
      <p>Essa página não existe :(</p>
      <Link href="/">
        <GoHome>Voltar para o início</GoHome>
      </Link>
      
    </Container>
  )
}