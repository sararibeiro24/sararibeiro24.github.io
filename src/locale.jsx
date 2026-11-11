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
    heroLocation: "Porto, Portugal - MSc student",
    heroIntro: "MSc student in Informatics and Computing Engineering, building thoughtful software and exploring systems.",
    buildTitle: "Build something",
    buildDescription: "Currently pursuing an MSc in Informatics and Computing Engineering at FEUP, University of Porto. Particularly interested in computer networks, low-level programming, and systems, with a strong willingness to learn, develop my skills, and take on new challenges.",
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
    heroLocation: "Porto, Portugal - estudante de mestrado",
    heroIntro: "Mestranda em Engenharia Informática e Computação, a criar software com propósito e a explorar sistemas.",
    buildTitle: "Sobre mim",
    buildDescription: "Atualmente a frequentar o mestrado em Engenharia Informática e Computação na FEUP, Universidade do Porto. Tenho especial interesse em redes de computadores, programação de baixo nível e sistemas, e muita vontade de aprender, desenvolver competências e abraçar novos desafios.",
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
      text: "Licenciatura concluída, com formação de base em desenvolvimento de software e sistemas informáticos.",
    },
    {
      name: "Mestrado em Engenharia Informática e Computação",
      where: "Faculdade de Engenharia, Universidade do Porto",
      when: "set. 2026 — presente",
      text: "A frequentar o mestrado em Engenharia Informática e Computação.",
    },
  ],
  projects: [
    {
      role: "Protocolo de Ligação de Dados Série",
      org: "Redes de Computadores • C",
      description: "Protocolo fiável de camada de ligação implementado em C sobre interface série (RS-232), com sincronização de tramas, byte stuffing e controlo de erros Stop-and-Wait ARQ.",
      points: [
        "Conceção e implementação de um protocolo fiável de camada de ligação de dados sobre RS-232 em C para transmissão entre dois sistemas.",
        "Desenvolvimento de sincronização de tramas, byte stuffing/destuffing para transparência de dados e deteção de erros com checksums BCC.",
        "Implementação de controlo de fluxo e recuperação de erros através de Stop-and-Wait ARQ com temporizadores, confirmações (RR) e rejeições (REJ).",
        "Criação de uma camada de aplicação para transferência fiável de ficheiros de qualquer tamanho, avaliando débito e eficiência sob canais com ruído.",
      ],
      info: "https://github.com/sararibeiro24/Y3S1-COMPUTER_NETWORKS",
    },
    {
      role: "Aplicação de Chat Distribuída",
      org: "Computação Paralela e Distribuída • Java",
      description: "Sistema de chat distribuído e multithread em Java com sockets, com suporte a múltiplas salas simultâneas, mensagens em tempo real e sincronização tolerante a falhas.",
      points: [
        "Desenvolvimento de um sistema de chat distribuído e tolerante a falhas em Java através de programação com sockets TCP/UDP.",
        "Gestão de concorrência multithread com estruturas sincronizadas para suportar múltiplos clientes simultâneos sem condições de corrida.",
        "Implementação de funcionalidades de salas temáticas, mensagens privadas e de grupo, autenticação de utilizadores e estado de presença.",
        "Coordenação de estado distribuído para manter consistência de mensagens e recuperação graciosa de desconexões de rede.",
      ],
      info: "https://github.com/sararibeiro24/Y3S2-PARALLEL_DISTRIBUTED_COMPUTING/tree/main/assign2",
    },
    {
      role: "Compilador Java",
      org: "Compiladores • Java e Bytecode JVM",
      description: "Compilador completo para a linguagem Java-- desenvolvido com JavaCC, com construção de AST, análise semântica e geração de bytecode Jasmin otimizado para a JVM.",
      points: [
        "Construção de um compilador de raiz para a linguagem Java-- com geração de bytecode JVM através do Jasmin e análise léxica/sintática com JavaCC.",
        "Construção e percurso da Árvore de Sintaxe Abstrata (AST) com recuperação de erros sintáticos.",
        "Desenvolvimento da fase de análise semântica: tabelas de símbolos, verificação de tipos, resolução de métodos e inicialização de variáveis.",
        "Geração de código Jasmin e otimização por alocação de registos através de análise de liveness (coloração de grafos).",
      ],
      info: "https://github.com/sararibeiro24/Y3S2-COMPILERS",
    },
    {
      role: "GameVerse",
      org: "Aplicações Web e Bases de Dados • Full-Stack",
      description: "Aplicação web full-stack orientada a dados para catálogo e comunidade de videojogos, concebida com PostgreSQL, APIs backend e interface responsiva.",
      points: [
        "Modelação e arquitetura de base de dados relacional em PostgreSQL normalizada a 3NF, com índices, transações, triggers e integridade de dados.",
        "Desenvolvimento full-stack de catálogo de videojogos, autenticação de utilizadores, listas de jogos personalizadas, avaliações e fóruns de discussão.",
        "Implementação de controlo de acessos por perfis (RBAC) com permissões diferenciadas para administradores, moderadores e utilizadores.",
        "Proteção da aplicação contra vulnerabilidades web frequentes: injeção de SQL, Cross-Site Scripting (XSS) e Cross-Site Request Forgery (CSRF).",
      ],
      info: "https://github.com/sararibeiro24/Y3S1-DATABASE_WEB_APPLICATIONS_LABORATORY",
    },
  ],
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
