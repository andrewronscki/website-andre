import { GetStaticProps } from 'next';
import { Container } from '@/styles/pages/Home';
import { ContainerHeader, Image, IconContainer } from "@/styles/components/Header";
import {
  ContainerContent,
  Content,
  Item,
  Footer,
  SocialContainer,
  DeveloperContainer,
  Experiences,
  ExperienceContent,
  ImageExperience,
  DescriptionExperience,
  Technologies,
  ContainerTech,
  Tech,
  ContactMe,
  ContactImage,
  ContactContent
 } from "@/styles/components/Content";
import { Document } from 'prismic-javascript/types/documents';
import { client } from '@/lib/prismic';
import Prismic from 'prismic-javascript';
import PrismicDom from 'prismic-dom';
import Typing from "react-typing-animation";

interface HeaderProps {
  textHeader: Document;
  imagesHeader: Document[];
  skills: Document[];
  imagesFooter: Document[];
  textFooter: Document;
  experiences: Document[];
  technologies: Document[];
}

export default function Home({ textHeader, imagesHeader, skills, imagesFooter, textFooter, experiences, technologies }: HeaderProps) {
  return (
    <Container>
      <ContainerHeader>
        <Image src={textHeader.data.image.url} alt="André" />

        <Typing hideCursor={true}>
          <Typing.Delay ms={1200} />
          <h1>{PrismicDom.RichText.asText(textHeader.data.title)}</h1>
        </Typing>

        <p>{PrismicDom.RichText.asText(textHeader.data.description)}</p>

        <IconContainer>
          {imagesHeader.map(header => (
            <li key={header.uid}>
              <a href={header.data.url.url} target="_blank">
                <img src={header.data.image.url} alt={header.data.title} width={header.data.width} />
              </a>
            </li>
          ))}
        </IconContainer>
      </ContainerHeader>
      <ContainerContent>
        <Content>
          {skills.map(skill => (
            <Item key={skill.uid}>
              <img src={skill.data.image.url} alt="teste" height="200"/>
              <strong>{PrismicDom.RichText.asText(skill.data.title)}</strong>
              <p>{PrismicDom.RichText.asText(skill.data.description)}</p>
            </Item>
          ))}
        </Content>

        <Experiences>
          {experiences.map(experience => {
            if(Number(experience.uid) % 2 === 0) {
              return (
                <ExperienceContent key={experience.uid}>
                  <DescriptionExperience>
                    <h1>{PrismicDom.RichText.asText(experience.data.title)}</h1>
                    {experience.data.content.map(content => (
                      <div key={content.id}>
                        <h2>{PrismicDom.RichText.asText(content.subtitle)}</h2>
                        <p>{PrismicDom.RichText.asText(content.description)}</p>
                      </div>

                    ))}
                  </DescriptionExperience>
                  <ImageExperience>
                    <img src={experience.data.image.url} alt={experience.data.image.alt} height={experience.data.height}/>
                  </ImageExperience>
                </ExperienceContent>
              )
            }
            return (
              <ExperienceContent key={experience.uid}>
                <ImageExperience>
                  <img src={experience.data.image.url} alt={experience.data.image.alt} height={experience.data.height}/>
                </ImageExperience>
                <DescriptionExperience>
                  <h1>{PrismicDom.RichText.asText(experience.data.title)}</h1>
                  {experience.data.content.map(content => (
                    <div key={content.id}>
                      <h2>{PrismicDom.RichText.asText(content.subtitle)}</h2>
                      <p>{PrismicDom.RichText.asText(content.description)}</p>
                    </div>

                  ))}
                </DescriptionExperience>
              </ExperienceContent>
            )
          })}
        </Experiences>

        <Technologies>
          <h1>Alguns dos meus conhecimentos</h1>
          <ContainerTech>
            {technologies.map(tech => (
              <Tech key={tech.uid}>
                <img src={tech.data.image.url} alt={tech.data.image.alt} height="40" />
                <span>{PrismicDom.RichText.asText(tech.data.title)}</span>
              </Tech>
            ))}
          </ContainerTech>
        </Technologies>

        <ContactMe>
          <ContactImage>
              <img src={textHeader.data.vector.url} alt={textHeader.data.vector.alt} height="400" />
          </ContactImage>
          <ContactContent>
            <div>
              <img src={textHeader.data.whatsappimage.url} alt={textHeader.data.whatsappimage.alt} width="40" />
              <a href={textHeader.data.whatsapplink.url} target="_blank">
                {PrismicDom.RichText.asText(textHeader.data.whatsapptext)}
              </a>
            </div>
            <div>
              <img src={textHeader.data.emailimage.url} alt={textHeader.data.emailimage.alt} width="40" />
              <span>{PrismicDom.RichText.asText(textHeader.data.emailtext)}</span>
            </div>
          </ContactContent>
        </ContactMe>

        <Footer>
          <SocialContainer>
            {imagesFooter.map(footer => (
              <li key={footer.uid}>
                <a href={footer.data.link.url} target="_blank">
                  <img src={footer.data.image.url} alt={footer.data.image.alt} width={footer.data.width} />
                </a>
              </li>
            ))}
          </SocialContainer>
          <DeveloperContainer>
            <span>{PrismicDom.RichText.asText(textFooter.data.text)}</span>
          </DeveloperContainer>
        </Footer>

      </ContainerContent>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<HeaderProps> = async (context) => {

  const textHeader = await client().query([
    Prismic.Predicates.at('document.type', 'header')
  ]);

  const imagesHeader = await client().query([
    Prismic.Predicates.at('document.type', 'imagesheader')
  ], { orderings : '[my.imagesheader.uid]'});

  const skills = await client().query([
    Prismic.Predicates.at('document.type', 'marketing')
  ], { orderings : '[my.marketing.uid]'});

  const imagesFooter = await client().query([
    Prismic.Predicates.at('document.type', 'footer')
  ], { orderings : '[my.footer.uid]'});

  const textFooter= await client().query([
    Prismic.Predicates.at('document.type', 'textfooter')
  ]);

  const experiences= await client().query([
    Prismic.Predicates.at('document.type', 'experiences')

  ], { orderings : '[my.experiences.uid]'});

  const technologies= await client().query([
    Prismic.Predicates.at('document.type', 'technologies')

  ], { orderings : '[my.technologies.position]'});

  return {
    props: {
      textHeader: textHeader.results[0],
      imagesHeader: imagesHeader.results,
      skills: skills.results,
      imagesFooter: imagesFooter.results,
      textFooter: textFooter.results[0],
      experiences: experiences.results,
      technologies: technologies.results,
    }
  }

}
