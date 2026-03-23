import React, { useCallback, useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Document } from "prismic-javascript/types/documents";
import Prismic from "prismic-javascript";
import PrismicDom from "prismic-dom";
import Aos from "aos";
import { client } from "@/lib/prismic";
import background from "@/assets/background.png";
import andrePhoto from "@/assets/andre.jpg";
import "aos/dist/aos.css";

interface HomeProps {
  textHeader: Document;
  imagesHeader: Document[];
  skills: Document[];
  imagesFooter: Document[];
  textFooter: Document;
  experiences: Document[];
  technologies: Document[];
}

function t(locale: string, pt: string, en: string) {
  return locale === "pt" ? pt : en;
}

export default function Home({
  textHeader,
  imagesHeader,
  skills,
  imagesFooter,
  textFooter,
  experiences,
  technologies,
}: HomeProps) {
  useEffect(() => {
    Aos.init({ duration: 800, once: true, easing: "ease-out-cubic" });
  }, []);

  const router = useRouter();
  const [locale, setLocale] = useState(router.locale ?? "pt");
  const handleLocale = useCallback((l: string) => setLocale(l), []);

  return (
    <div data-theme="devtools" className="bg-base-100 text-base-content font-sans">

      {/* ── Navbar ──────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-16 bg-base-100/80 backdrop-blur border-b border-base-300">
        <span className="font-extrabold tracking-tight text-lg">
          <span className="text-primary">AW</span>
          <span className="opacity-60">.dev</span>
        </span>
        <div className="flex items-center gap-4">
          <a href="/tools" className="btn btn-sm btn-ghost text-primary font-semibold hidden sm:flex">
            {t(locale, "🛠 Ferramentas", "🛠 Tools")}
          </a>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleLocale("pt")}
              className={`text-xs px-2 py-1 rounded transition ${locale === "pt" ? "bg-primary text-white" : "opacity-40 hover:opacity-70"}`}
            >
              PT
            </button>
            <button
              onClick={() => handleLocale("en")}
              className={`text-xs px-2 py-1 rounded transition ${locale === "en" ? "bg-primary text-white" : "opacity-40 hover:opacity-70"}`}
            >
              EN
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-center min-h-screen pt-16 overflow-hidden"
        style={{
          backgroundImage: `url(${background.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-base-100/75" />

        <div className="relative w-full max-w-5xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12 py-20">

          {/* Texto */}
          <div className="flex flex-col gap-5 flex-1 text-center md:text-left">
            <div data-aos="fade-right" data-aos-delay="50">
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                {t(locale, "Olá, seja bem-vindo", "Hi, welcome")} 👋
              </span>
            </div>

            <h1
              data-aos="fade-right"
              data-aos-delay="100"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
            >
              {PrismicDom.RichText.asText(
                locale === "pt" ? textHeader.data.titlept : textHeader.data.titleen
              )}
            </h1>

            <p
              data-aos="fade-right"
              data-aos-delay="200"
              className="text-base opacity-60 max-w-md mx-auto md:mx-0 leading-relaxed"
            >
              {t(
                locale,
                "Engenheiro de Software & Tech Lead apaixonado por arquitetura, performance e times de excelência. Hoje também exploro o universo de IA aplicada.",
                "Software Engineer & Tech Lead passionate about architecture, performance and high-performance teams. Also diving deep into applied AI."
              )}
            </p>

            <ul
              data-aos="fade-right"
              data-aos-delay="300"
              className="flex items-center gap-3 justify-center md:justify-start"
            >
              {imagesHeader.map((header) => (
                <li key={header.uid}>
                  <a
                    href={header.data.url.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:scale-125 hover:opacity-80 transition-all duration-300 inline-flex"
                  >
                    <img
                      src={header.data.image.url}
                      alt={header.data.title}
                      style={{ height: '28px', width: 'auto' }}
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div
              data-aos="fade-right"
              data-aos-delay="400"
              className="flex gap-3 flex-wrap justify-center md:justify-start"
            >
              <a
                href={textHeader.data.whatsapplink?.url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary rounded-xl px-6"
              >
                {t(locale, "Fale comigo", "Get in touch")}
              </a>
              <a href="/tools" className="btn btn-outline rounded-xl px-6">
                {t(locale, "Ver ferramentas", "View tools")}
              </a>
            </div>
          </div>

          {/* Foto */}
          <div
            data-aos="fade-left"
            data-aos-delay="150"
            className="flex-shrink-0 relative"
          >
            <img
              src={andrePhoto.src}
              alt="André Wronscki"
              className="w-64 h-80 sm:w-72 sm:h-96 object-cover object-top"
              style={{
                WebkitMaskImage: [
                  'linear-gradient(to right,  transparent 0%,  black 18%, black 82%, transparent 100%)',
                  'linear-gradient(to bottom, transparent 0%,  black 8%,  black 78%, transparent 100%)',
                ].join(', '),
                WebkitMaskComposite: 'destination-in',
                maskImage: [
                  'linear-gradient(to right,  transparent 0%,  black 18%, black 82%, transparent 100%)',
                  'linear-gradient(to bottom, transparent 0%,  black 8%,  black 78%, transparent 100%)',
                ].join(', '),
                maskComposite: 'intersect',
              }}
            />
          </div>

        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-30 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Skills ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-base-200">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6">
            {skills.map((skill) => (
              <div
                key={skill.uid}
                data-aos="fade-up"
                className="card bg-base-100 border border-base-300 hover:border-primary transition-colors duration-300 w-72"
              >
                <div className="card-body items-center text-center gap-3">
                  <img src={skill.data.image.url} alt="" className="h-16 object-contain" />
                  <h3 className="card-title text-base">
                    {PrismicDom.RichText.asText(
                      locale === "pt" ? skill.data.titlept : skill.data.titleen
                    )}
                  </h3>
                  <p className="text-sm opacity-60">
                    {PrismicDom.RichText.asText(
                      locale === "pt"
                        ? skill.data.descriptionpt
                        : skill.data.descriptionen
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ──────────────────────────────────────────── */}
      <section className="px-6 bg-base-200" style={{paddingBottom: '100px'}}>
        <div className="max-w-4xl mx-auto">

          <div data-aos="fade-up" className="mb-14">
            <h2 className="text-3xl font-bold">
              {t(locale, "Experiência", "Experience")}
            </h2>
            <p className="text-sm opacity-40 mt-2">
              {t(locale, "Empresas e projetos pelos quais passei", "Companies and projects I've worked with")}
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {experiences.map((exp) => {
              const title = PrismicDom.RichText.asText(
                locale === "pt" ? exp.data.titlept : exp.data.titleen
              );
              return (
                <div key={exp.uid} data-aos="fade-up" className="flex flex-col">

                  {/* Category label */}
                  <span className="text-sm font-extrabold uppercase tracking-widest text-primary mb-4" style={{marginTop: '32px'}}>
                    {title}
                  </span>

                  {/* Single card per category with internal dividers */}
                  <div className="bg-base-100 rounded-2xl overflow-hidden">
                    {exp.data.content.map((c: any, j: number) => (
                      <div
                        key={c.id || j}
                        className={`p-6 flex gap-4 ${j > 0 ? "border-t border-base-300" : ""}`}
                      >
                        <div className="w-0.5 rounded-full bg-primary/40 shrink-0 self-stretch" />
                        <div className="flex flex-col gap-2">
                          <h3 className="font-semibold text-base leading-snug">
                            {c.companyurl?.url ? (
                              <a
                                href={c.companyurl.url}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-primary transition-colors duration-200"
                              >
                                {PrismicDom.RichText.asText(
                                  locale === "pt" ? c.subtitlept : c.subtitleen
                                )}
                              </a>
                            ) : (
                              PrismicDom.RichText.asText(
                                locale === "pt" ? c.subtitlept : c.subtitleen
                              )
                            )}
                          </h3>
                          <div
                            className="text-sm opacity-50 leading-relaxed [&>p]:mb-3 [&>p:last-child]:mb-0"
                            dangerouslySetInnerHTML={{
                              __html: PrismicDom.RichText.asHtml(
                                locale === "pt" ? c.descriptionpt : c.descriptionen
                              ),
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── Education ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-base-100">
        <div className="max-w-4xl mx-auto">

          <div data-aos="fade-up" className="mb-10">
            <h2 className="text-3xl font-bold">
              {t(locale, "Educação", "Education")}
            </h2>
            <p className="text-sm opacity-40 mt-2">
              {t(locale, "Formação acadêmica e especializações", "Academic background and specializations")}
            </p>
          </div>

          <div data-aos="fade-up" className="bg-base-200 rounded-2xl overflow-hidden">

            {/* Graduação */}
            <div className="p-6 flex gap-5 items-start">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-base-300 flex items-center justify-center text-lg font-bold text-primary">U</div>
              <div className="flex flex-col gap-0.5 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-base">Universidade do Sul de Santa Catarina</h3>
                  <span className="text-xs opacity-40 shrink-0 mt-0.5">2015 – 2019</span>
                </div>
                <p className="text-sm opacity-50">{t(locale, "Bacharelado em Sistemas de Informação", "Bachelor's in Information Systems")}</p>
                <span className="text-xs text-primary/70 font-medium mt-1">{t(locale, "Graduação", "Bachelor's Degree")}</span>
              </div>
            </div>

            <div className="border-t border-base-300" />

            {/* MBA */}
            <div className="p-6 flex gap-5 items-start">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-base-300 flex items-center justify-center text-lg font-bold text-primary">X</div>
              <div className="flex flex-col gap-0.5 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-base">IGTI / XPE</h3>
                  <span className="text-xs opacity-40 shrink-0 mt-0.5">Jul 2021 – Jun 2022</span>
                </div>
                <p className="text-sm opacity-50">{t(locale, "MBA — Arquitetura de Software e Soluções", "MBA — Software Architecture and Solutions")}</p>
                <span className="text-xs text-primary/70 font-medium mt-1">{t(locale, "Pós-graduação Lato Sensu", "Post-Graduate")}</span>
              </div>
            </div>

            <div className="border-t border-base-300" />

            {/* Tech Lead */}
            <div className="p-6 flex gap-5 items-start">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-base-300 flex items-center justify-center text-lg font-bold text-primary">I</div>
              <div className="flex flex-col gap-0.5 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-base">IFTL</h3>
                  <span className="text-xs opacity-40 shrink-0 mt-0.5">Fev 2023 – Mar 2023</span>
                </div>
                <p className="text-sm opacity-50">Tech Lead Program</p>
                <span className="text-xs text-primary/70 font-medium mt-1">{t(locale, "Programa de especialização", "Specialization Program")}</span>
              </div>
            </div>

            <div className="border-t border-base-300" />

            {/* Rocketseat */}
            <div className="p-6 flex gap-5 items-start">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-base-300 flex items-center justify-center text-lg font-bold text-primary">R</div>
              <div className="flex flex-col gap-0.5 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-base">Faculdade de Tecnologia Rocketseat</h3>
                  <span className="text-xs opacity-40 shrink-0 mt-0.5">Jan 2025 – Mar 2026</span>
                </div>
                <p className="text-sm opacity-50">{t(locale, "Pós Tech Developer 360 — Tecnologia e Gestão de Projetos", "Post Tech Developer 360 — Technology and Project Management")}</p>
                <span className="text-xs text-primary/70 font-medium mt-1">{t(locale, "Pós-graduação Lato Sensu", "Post-Graduate")}</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── Technologies ────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-base-200">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-10">
          <h2 data-aos="fade-up" className="text-3xl font-bold text-center">
            {t(locale, "Alguns dos meus conhecimentos", "Some of my knowledge")}
          </h2>
          <div className="flex flex-wrap justify-center gap-5">
            {technologies.map((tech) => (
              <div
                key={tech.uid}
                data-aos="fade-up"
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-base-100 border border-base-300 group-hover:border-primary transition-colors duration-300 p-3">
                  <img
                    src={tech.data.image.url}
                    alt={tech.data.image.alt}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                  {PrismicDom.RichText.asText(tech.data.title)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dev Tools CTA ───────────────────────────────────────── */}
      <section data-aos="fade-up" className="py-24 px-6 bg-base-100">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 text-center">
          <div className="text-5xl">🛠</div>
          <h2 className="text-3xl font-bold">
            {t(locale, "Ferramentas para Devs", "Dev Tools")}
          </h2>
          <p className="opacity-60 leading-relaxed">
            {t(
              locale,
              "Geradores de UUID, CPF, CNPJ e senhas, conversores JSON e leitor de JWT — tudo roda no navegador, sem envio de dados.",
              "UUID, CPF, CNPJ and password generators, JSON converters and JWT decoder — everything runs in the browser, no data sent."
            )}
          </p>
          <a href="/tools" className="btn btn-primary btn-lg rounded-xl px-8">
            {t(locale, "Explorar ferramentas →", "Explore tools →")}
          </a>
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-base-200">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-10">
          <h2 data-aos="fade-up" className="text-3xl font-bold text-center">
            {t(locale, "Entre em contato", "Get in touch")}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center" data-aos="fade-up">
            <a
              href={textHeader.data.whatsapplink?.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 card bg-base-100 border border-base-300 hover:border-primary transition-colors p-5 flex-1 max-w-sm"
            >
              <img
                src={textHeader.data.whatsappimage?.url}
                alt="WhatsApp"
                className="w-9 h-9 object-contain"
              />
              <span className="font-medium text-sm">
                {PrismicDom.RichText.asText(
                  locale === "pt"
                    ? textHeader.data.whatsapptextpt
                    : textHeader.data.whatsapptexten
                )}
              </span>
            </a>
            <div className="flex items-center gap-3 card bg-base-100 border border-base-300 p-5 flex-1 max-w-sm">
              <img
                src={textHeader.data.emailimage?.url}
                alt="Email"
                className="w-9 h-9 object-contain"
              />
              <span className="font-medium text-sm opacity-80">
                {PrismicDom.RichText.asText(textHeader.data.emailtext)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="bg-base-100 border-t border-base-300 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <ul className="flex gap-4">
            {imagesFooter.map((f) => (
              <li key={f.uid}>
                <a
                  href={f.data.link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:scale-125 inline-flex transition-transform duration-300"
                >
                  <img
                    src={f.data.image.url}
                    alt={f.data.image.alt}
                    style={{ height: '32px', width: 'auto' }}
                  />
                </a>
              </li>
            ))}
          </ul>
          <span className="text-xs opacity-40">
            {PrismicDom.RichText.asText(textFooter.data.text)}
          </span>
        </div>
      </footer>

    </div>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const [
    textHeaderRes,
    imagesHeaderRes,
    skillsRes,
    imagesFooterRes,
    textFooterRes,
    experiencesRes,
    technologiesRes,
  ] = await Promise.all([
    client().query([Prismic.Predicates.at("document.type", "header")]),
    client().query([Prismic.Predicates.at("document.type", "imagesheader")], {
      orderings: "[my.imagesheader.uid]",
    }),
    client().query([Prismic.Predicates.at("document.type", "marketing")], {
      orderings: "[my.marketing.uid]",
    }),
    client().query([Prismic.Predicates.at("document.type", "footer")], {
      orderings: "[my.footer.uid]",
    }),
    client().query([Prismic.Predicates.at("document.type", "textfooter")]),
    client().query([Prismic.Predicates.at("document.type", "experiences")], {
      orderings: "[my.experiences.uid]",
    }),
    client().query([Prismic.Predicates.at("document.type", "technologies")], {
      orderings: "[my.technologies.position]",
    }),
  ]);

  return {
    props: {
      textHeader: textHeaderRes.results[0],
      imagesHeader: imagesHeaderRes.results,
      skills: skillsRes.results,
      imagesFooter: imagesFooterRes.results,
      textFooter: textFooterRes.results[0],
      experiences: experiencesRes.results,
      technologies: technologiesRes.results,
    },
  };
};
