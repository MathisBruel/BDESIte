import { Mail, Instagram, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface HomeContactProps {
  texts: any;
  settings: any;
}

export function HomeContact({ texts, settings }: HomeContactProps) {
  return (
    <section id="contact" className="bg-brand-noir border-b border-white/10">
      <Container>
        <div className="py-14">

          <div className="mb-8">
            <div className="font-spartan font-black text-xs uppercase tracking-widest text-brand-rouge mb-2">
              {texts.home.contact.subtitle ?? "Nous joindre"}
            </div>
            <h2 className="font-spartan font-black text-3xl sm:text-4xl text-white leading-none">
              {texts.home.contact.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/8">

            {/* Email */}
            <a
              href={`mailto:${settings.email}`}
              className="group bg-brand-noir p-6 sm:p-8 flex items-center gap-4 hover:bg-white/5 transition-colors"
            >
              <Mail className="h-5 w-5 text-brand-rouge group-hover:text-brand-or transition-colors shrink-0" />
              <div>
                <div className="font-spartan font-black text-xs uppercase tracking-widest text-white/35 mb-1">
                  {texts.home.contact.email ?? "Email"}
                </div>
                <div className="font-lato text-sm text-white/60 group-hover:text-white transition-colors break-all">
                  {settings.email}
                </div>
              </div>
            </a>

            {/* Instagram */}
            {settings.instagram && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-brand-noir p-6 sm:p-8 flex items-center gap-4 hover:bg-white/5 transition-colors"
              >
                <Instagram className="h-5 w-5 text-brand-rouge group-hover:text-brand-or transition-colors shrink-0" />
                <div>
                  <div className="font-spartan font-black text-xs uppercase tracking-widest text-white/35 mb-1">
                    {texts.home.contact.instagram?.title ?? "Instagram"}
                  </div>
                  <div className="font-lato text-sm text-white/50 group-hover:text-white/70 transition-colors">
                    {texts.home.contact.instagram?.subtitle ?? "Suivez-nous"}
                  </div>
                </div>
              </a>
            )}

            {/* Discord */}
            {settings.discord && (
              <a
                href={settings.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-brand-noir p-6 sm:p-8 flex items-center gap-4 hover:bg-white/5 transition-colors"
              >
                <MessageCircle className="h-5 w-5 text-brand-rouge group-hover:text-brand-or transition-colors shrink-0" />
                <div>
                  <div className="font-spartan font-black text-xs uppercase tracking-widest text-white/35 mb-1">
                    {texts.home.contact.discord?.title ?? "Discord"}
                  </div>
                  <div className="font-lato text-sm text-white/50 group-hover:text-white/70 transition-colors">
                    {texts.home.contact.discord?.subtitle ?? "Rejoignez le serveur"}
                  </div>
                </div>
              </a>
            )}

          </div>

        </div>
      </Container>
    </section>
  );
}
