import { useEffect, useMemo, useState } from "react";
import {
  ACTIVITIES,
  EDUCATION,
  EXPERIENCE,
  LANGUAGES,
  PROJECTS,
  SKILLS,
  VOLUNTEER,
} from "./constants";
import { LocaleContext } from "./locale-context";

const translations = {
  en: {
    navLabel: "Main navigation",
    languageLabel: "Language",
    build: "Build",
    education: "Education",
    projects: "Projects",
    experience: "Experience",
    activities: "Activities",
    skills: "Skills",
    contact: "Contact",
    heroLocation: "Porto, Portugal - incoming MSc student",
    heroIntro: "Informatics and Computing Engineering graduate building thoughtful software and exploring systems.",
    buildTitle: "Build something",
    buildDescription: "Informatics and Computing Engineering graduate from FEUP, University of Porto, starting an MSc later this year. Particularly interested in computer networks, low-level programming, and systems, with a strong willingness to learn, develop my skills, and take on new challenges.",
    educationTitle: "Education",
    projectsTitle: "Projects",
    projectsHint: "click any project to view details",
    experienceTitle: "Experience",
    activitiesTitle: "Activities",
    activitiesHint: "click any activity to view details",
    skillsTitle: "Technical skills",
    languagesTitle: "Languages",
    volunteeringTitle: "Volunteering",
    contactTitle: "Let's build something.",
    tagline: "Always curious. Always building.",
    close: "Close modal",
    viewProject: "View Project",
    thisWeek: "This week",
    last7Days: "Last 7 days on GitHub",
    commits: "commits, incl. private",
    loadError: "Could not load commits",
    githubProfile: "View GitHub profile",
  },
  pt: {
    navLabel: "Navegação principal",
    languageLabel: "Idioma",
    build: "Sobre",
    education: "Educação",
    projects: "Projetos",
    experience: "Experiência",
    activities: "Atividades",
    skills: "Competências",
    contact: "Contacto",
    heroLocation: "Porto, Portugal - futura estudante de mestrado",
    heroIntro: "Licenciada em Engenharia Informática e Computação, a criar software com propósito e a explorar sistemas.",
    buildTitle: "Sobre mim",
    buildDescription: "Licenciada em Engenharia Informática e Computação pela FEUP, Universidade do Porto, a iniciar o mestrado este ano. Tenho especial interesse em redes de computadores, programação de baixo nível e sistemas, e muita vontade de aprender, desenvolver competências e abraçar novos desafios.",
    educationTitle: "Educação",
    projectsTitle: "Projetos",
    projectsHint: "clica num projeto para veres os detalhes",
    experienceTitle: "Experiência",
    activitiesTitle: "Atividades",
    activitiesHint: "clica numa atividade para veres os detalhes",
    skillsTitle: "Competências técnicas",
    languagesTitle: "Idiomas",
    volunteeringTitle: "Voluntariado",
    contactTitle: "Vamos criar algo.",
    tagline: "Sempre curiosa. Sempre a criar.",
    close: "Fechar janela",
    viewProject: "Ver projeto",
    thisWeek: "Esta semana",
    last7Days: "Últimos 7 dias no GitHub",
    commits: "commits, incluindo privados",
    loadError: "Não foi possível carregar os commits",
    githubProfile: "Ver perfil do GitHub",
  },
};

const portugueseContent = {
  experience: [
    {
      role: "Assistente de docência",
      org: "Faculdade de Engenharia, Universidade do Porto",
      when: "set. 2026 — presente",
      points: [
        "Acompanhei equipas de estudantes nos projetos da unidade curricular, promovendo o trabalho em equipa e boas práticas.",
        "Apoiei os docentes na monitorização do progresso e na avaliação dos trabalhos dos estudantes.",
      ],
    },
    {
      role: "Estagiária de investigação",
      org: "INEGI",
      when: "out. 2025 — jun. 2026",
      points: [
        "Análise e visualização de dados com Power BI.",
        "Organização de conjuntos de dados em Excel e criação de consultas SQL.",
      ],
    },
    {
      role: "Estagiária de software XR",
      org: "INESC TEC",
      when: "Verão de 2025",
      points: [
        "Concebi e desenvolvi uma plataforma de formação XR em Unity.",
        "Apliquei práticas de engenharia de software a um protótipo de investigação.",
      ],
    },
    {
      role: "Operadora de loja",
      org: "Pans & Company",
      when: "jun. 2024 — jul. 2025",
      points: [
        "Atendimento ao cliente e preparação de alimentos de acordo com os padrões de qualidade e segurança.",
        "Desenvolvi competências de multitarefa e priorização em períodos de grande afluência.",
      ],
    },
  ],
  education: [
    {
      name: "Licenciatura em Engenharia Informática e Computação",
      where: "Faculdade de Engenharia, Universidade do Porto",
      when: "set. 2023 — jun. 2026",
      text: "Descrição em breve.",
    },
    {
      name: "Mestrado em Engenharia Informática e Computação",
      where: "Faculdade de Engenharia, Universidade do Porto",
      when: "set. 2026 — presente",
      text: "Descrição em breve.",
    },
  ],
  projects: PROJECTS.map((project) => ({
    ...project,
    points: project.points.map((point) => point === "placeholder" ? "Descrição em breve." : point),
  })),
  activities: [
    {
      org: "BEST Porto",
      role: "Responsável de IT - Scitech 26",
      points: [
        "Manter o site SciTeCh",
        "Adicionar novas funcionalidades à Store App",
        "Apoiar a preparação de sessões de formação em IT",
        "Apoiar as Topics durante o Hackathon",
      ],
    },
  ],
  skills: [
    { label: "Linguagens", items: ["C", "C++", "Java", "C#", "Python", "HTML/CSS", "Prolog"] },
    { label: "Backend e dados", items: ["Node.js", "PHP", "Laravel", "PostgreSQL", "SQLite"] },
    { label: "Sistemas e ferramentas", items: ["Git", "Linux", "Bash", "Docker", "VirtualBox", "Wireshark"] },
    { label: "Dados e XR", items: ["Power BI", "Unity (XR)", "Flutter", "Figma"] },
  ],
  languages: [
    { ...LANGUAGES[0], name: "Português", level: "Nativo" },
    { ...LANGUAGES[1], name: "Inglês" },
  ],
  volunteering: [
    { org: "FEUP Buddies", role: "Mentora académica", text: "Apoio a estudantes Erasmus que chegam à FEUP." },
    { org: "Apoio comunitário", role: "Voluntária", text: "\"Banco Alimentar\", limpezas de praias e apoio a pessoas sem-abrigo." },
  ],
};

export function LocaleProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      return window.localStorage.getItem("portfolio-language") === "pt" ? "pt" : "en";
    } catch (error) {
      console.error("Unable to read the saved language preference.", error);
      return "en";
    }
  });

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem("portfolio-language", language);
    } catch (error) {
      console.error("Unable to save the language preference.", error);
    }
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: translations[language],
    content: language === "pt"
      ? portugueseContent
      : {
          experience: EXPERIENCE,
          education: EDUCATION,
          projects: PROJECTS,
          activities: ACTIVITIES,
          skills: SKILLS,
          languages: LANGUAGES,
          volunteering: VOLUNTEER,
        },
  }), [language]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
