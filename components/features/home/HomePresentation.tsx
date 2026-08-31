import { Users, Calendar, Handshake } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface HomePresentationProps {
  texts: any;
  membersCount?: number;
  eventsCount?: number;
  partnersCount?: number;
}

export function HomePresentation({
  texts,
  membersCount = 9,
  eventsCount = 10,
  partnersCount = 5,
}: HomePresentationProps) {
  const stats = [
    { value: `${membersCount}`, label: "membres dans l'équipe", icon: Users },
    { value: `${eventsCount}+`, label: "événements organisés", icon: Calendar },
    { value: `${partnersCount}`, label: "partenaires locaux", icon: Handshake },
  ];

  const pillars = [
    {
      title: texts.home.presentation.convivialityTitle,
      text: texts.home.presentation.convivialityText,
    },
    {
      title: texts.home.presentation.eventsTitle,
      text: texts.home.presentation.eventsText,
    },
    {
      title: texts.home.presentation.engagementTitle,
      text: texts.home.presentation.engagementText,
    },
  ];

  return (
    <section id="presentation" className="bg-brand-rouge">
      <Container>
        <div className="py-20">

          {/* Blocs statistiques */}
          <div className="grid grid-cols-3 gap-6 sm:gap-12 mb-16 pb-16 border-b border-white/15">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="font-spartan font-black text-5xl sm:text-6xl md:text-7xl text-white leading-none mb-3">
                  {value}
                </div>
                <div className="flex items-center justify-center gap-1.5 text-white/65 text-xs sm:text-sm font-lato">
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Piliers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {pillars.map(({ title, text }) => (
              <div key={title}>
                <h3 className="font-spartan font-black text-xl sm:text-2xl text-white mb-4 uppercase tracking-tight">
                  {title}
                </h3>
                <div className="w-8 h-0.5 bg-brand-or mb-5" />
                <p className="font-lato text-white/65 leading-relaxed text-sm sm:text-base">
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Phrase intro */}
          <p className="mt-16 font-lato text-lg sm:text-xl text-white/75 leading-relaxed text-center max-w-3xl mx-auto">
            {texts.home.presentation.intro}
          </p>

        </div>
      </Container>
    </section>
  );
}
