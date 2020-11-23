import Link from 'next/link';
import Image from 'next/image';
import { Container, GoHome, ContainerLocale } from '@/styles/pages/NotFound';
import NotFound404 from '@/assets/notFound.png';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

export default function NotFound() {
  const router = useRouter();
  const [locale, setLocale] = useState(router.locale);

  const handleChangeLocale = useCallback((changeLocale) => {
    setLocale(changeLocale);
  }, [])

  return (
    <Container>
      <ContainerLocale>
        <div>
          <Image
            src="/brazil.png"
            width={32}
            height={32}
            alt="flag Brazil"
            title="pt-BR"
            onClick={() => handleChangeLocale('pt')}
          />
        </div>
        <div>
          <Image
            src="/usa.png"
            width={32}
            height={32}
            alt="flag United States of America"
            title="en-US"
            onClick={() => handleChangeLocale('en')}
          />
        </div>
      </ContainerLocale>
      <img src={NotFound404} alt="page not found"/>
      {
        locale === 'pt'
          ? <p>Essa página não existe :(</p>
          : <p>This page was not found :(</p>
      }

      <Link href="/">
        {
          locale === 'pt'
            ? <GoHome>Voltar para o início</GoHome>
            : <GoHome>Back to the home</GoHome>
        }
      </Link>

    </Container>
  )
}
