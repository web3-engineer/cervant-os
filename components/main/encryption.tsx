"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { 
    CpuChipIcon, 
    BeakerIcon, 
    DocumentTextIcon, 
    LightBulbIcon, 
} from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

// --- DADOS DO CURSO / SEÇÕES EXPLICATIVAS ---
const courseModules = [
  {
    title: "Fundamentos Web3",
    description: "Entenda a base da descentralização, blockchain e como o Cervant OS se integra a esse novo ecossistema para revolucionar a pesquisa.",
    icon: CpuChipIcon,
    color: "text-blue-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.15)]"
  },
  {
    title: "Arquitetura Cervant OS",
    description: "Mergulhe na estrutura do sistema operacional, explorando seus módulos de segurança, escalabilidade e design em TypeScript.",
    icon: LightBulbIcon,
    color: "text-yellow-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(250,204,21,0.15)]"
  },
  {
    title: "Smart Contracts & Segurança",
    description: "Aprenda a interagir com contratos inteligentes focados em segurança e eficiência para garantir a integridade dos dados científicos.",
    icon: DocumentTextIcon,
    color: "text-green-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(74,222,128,0.15)]"
  },
  {
    title: "Ciência Descentralizada (DeSci)",
    description: "Descubra como aplicar a tecnologia blockchain para revolucionar o financiamento e a produção científica com total transparência.",
    icon: BeakerIcon,
    color: "text-cyan-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
  }
];

// --- TICKER DE PATROCINADORES ---
const SponsorsTicker = () => {
  const { t } = useTranslation();
  const sponsors = [
    { name: "Funcap", src: "/sponsors/funcap.png", url: "https://www.funcap.ce.gov.br/" },
    { name: "Centelha", src: "/sponsors/centelha.png", url: "https://programacentelha.com.br/ce/" },
    { name: "Sudene", src: "/sponsors/sudene.png", url: "https://www.gov.br/sudene" },
    { name: "Finep", src: "/sponsors/finep.png", url: "http://www.finep.gov.br/" },
    { name: "Cnpq", src: "/sponsors/cnpq.png", url: "https://www.gov.br/cnpq/pt-br" },
  ];
  const tickerItems = [...sponsors, ...sponsors, ...sponsors];

  return (
    <div className="w-full py-20 overflow-hidden relative z-40">
      <div className="w-full flex justify-center mb-8">
        <h3 className="text-center text-[10px] font-black tracking-[0.4em] text-cyan-600 dark:text-cyan-400 uppercase">     
          {t("hero.sponsors_title", "SPONSORS:")}
        </h3>
      </div>
      <div className="relative"> 
        <div className="flex whitespace-nowrap">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 35, repeat: Infinity }}
            className="flex gap-8 px-6"
          >
            {tickerItems.map((item, i) => (
              <SponsorCard key={i} item={item} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const SponsorCard = ({ item }: { item: { name: string; src: string; url: string } }) => {
  return (
    <motion.a
      href={item.url} target="_blank" rel="noopener noreferrer"
      whileHover={{ scale: 1.05, borderColor: "rgba(34, 211, 238, 0.4)", backgroundColor: "rgba(255, 255, 255, 0.05)" }}
      className="relative flex items-center justify-center min-w-[200px] h-[100px] rounded-[1.5rem] border border-white/5 bg-[#0a0a0f]/40 backdrop-blur-md transition-all duration-500 group overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12)_0%,transparent_70%)]" />
      <div className="relative w-full h-full p-6 flex items-center justify-center">
        <img src={item.src} alt={item.name} className="max-w-full max-h-full object-contain opacity-100 transition-all duration-500" />
      </div>
    </motion.a>
  );
};

const TypingEffect = ({ text, className }: { text: string; className: string }) => {
    const characters = Array.from(text);
    return (
        <motion.div className={className} style={{ whiteSpace: "nowrap" }}>
            {characters.map((char, i) => (
                <motion.span key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.03, delay: i * 0.02 }} viewport={{ once: true }}>{char}</motion.span>
            ))}
        </motion.div>
    );
};

// --- FLUXOGRAMA "LIQUID GLASS" ---
const ProcessFlowchart = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full pt-10 pb-40 px-4 flex flex-col items-center justify-center bg-transparent relative z-40">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-white/40 mb-10 transition-colors duration-300">
                {t("encryption.recognition", "Recognition")}
            </h4>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="
                    relative w-full max-w-4xl rounded-[2rem] 
                    border border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl shadow-xl
                    dark:border-cyan-500/50 dark:bg-[#1e3a8a]/40 dark:shadow-[0_0_30px_rgba(6,182,212,0.15)]
                    flex flex-col md:flex-row items-center justify-between
                    p-8 md:p-12 gap-8 group overflow-hidden
                    hover:border-yellow-500/50 transition-all duration-500
                "
            >
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none z-0">
                    <motion.div
                        className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]"
                        initial={{ left: "-100%" }}
                        animate={{ left: "200%" }}
                        transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 1, ease: "linear" }}
                    />
                </div>

                <div className="flex flex-col gap-6 flex-1 text-center md:text-left items-center md:items-start z-10">
                    <h3 className="text-2xl md:text-3xl font-light text-white leading-tight">
                        <span className="font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">Blockchain</span> como Tecnologia de Uso Inteligente no Ceará
                    </h3>
                    <p className="text-sm text-white/90 font-medium leading-relaxed max-w-lg">
                        Projeto contemplado com fomento financeiro concedido pelo{" "}
                        <a 
                            href="https://programacentelha.com.br/wp-content/uploads/2025/01/CE-Lista-Final-Empresas-Contratadas.pdf" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 font-bold underline underline-offset-4 decoration-cyan-500/50 hover:decoration-cyan-300 transition-all cursor-pointer relative z-50"
                        >
                            Programa Centelha (2ª Edição)
                        </a>
                        , financiado diretamente pelo Ministério da Ciência, Tecnologia e Inovação do Governo Federal.
                    </p>
                </div>

                <div className="w-full md:w-auto flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12 mt-2 md:mt-0 z-10">
                    <span className="text-[10px] text-white/50 uppercase tracking-widest mb-6 font-semibold">Apoio Oficial</span>
                    <div className="relative h-26 w-64 transition-all duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100">
                        <img src="/sponsors/MCTI_light.png" alt="MCTI Logo" className="w-full h-full object-contain block dark:hidden" />
                        <img src="/sponsors/MCTI_dark.png" alt="MCTI Logo" className="w-full h-full object-contain hidden dark:block" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// --- COMPONENTE PRINCIPAL (PÁGINA) ---
export default function CervantCourse() {
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="min-h-screen bg-transparent" />;

    return (
        <div className="w-full relative overflow-hidden">
            <section className="relative z-[30] w-full bg-transparent flex flex-col items-center pt-32 pb-10">
                
                {/* TÍTULO PRINCIPAL DINÂMICO */}
                <div className="w-full max-w-7xl text-center mb-20 px-4">
                    <TypingEffect 
                      text={t("encryption.typing_title", "A new way to produce science.")} 
                      className="text-slate-900 dark:text-white text-[6vw] md:text-[64px] font-extralight tracking-tighter" 
                    />
                </div>

                {/* --- CARDS DO CURSO (Substituindo o Vídeo) --- */}
                <div className="w-full max-w-7xl px-4 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-40">
                    {courseModules.map((module, index) => {
                        const IconComponent = module.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`
                                    group relative flex flex-col p-8 rounded-[2rem]
                                    border border-white/10 bg-[#0a0a0f]/60 backdrop-blur-md 
                                    hover:bg-[#0a0a0f]/80 transition-all duration-500
                                    dark:border-white/5 dark:bg-[#ffffff]/5 
                                    cursor-default overflow-hidden ${module.glow}
                                `}
                            >
                                {/* Brilho de fundo sutil no hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                                
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 mb-6 ${module.color}`}>
                                    <IconComponent className="w-7 h-7" />
                                </div>
                                
                                <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-3">
                                    {module.title}
                                </h3>
                                
                                <p className="text-slate-600 dark:text-white/70 leading-relaxed font-medium">
                                    {module.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

            </section>
            
            {/* TICKER DE PATROCINADORES */}
            <SponsorsTicker />

            {/* FLUXOGRAMA NO FINAL */}
            <ProcessFlowchart />
        </div>
    );
}