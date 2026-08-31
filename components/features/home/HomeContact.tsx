import { Mail, Instagram, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface HomeContactProps {
  texts: any;
  settings: any;
}

export function HomeContact({ texts, settings }: HomeContactProps) {
  return (
    <section id="contact" className="bg-brand-noir">
      <Container>
        <div className="py-20">

          <div className="mb-14">
            <div className="font-spartan font-black text-xs uppercase tracking-widest text-brand-rouge mb-3">
              {texts.home.contact.subtitle ?? "Nous joindre"}
            </div>
            <h2 className="font-spartan font-black text-display-md text-white leading-none">
              {texts.home.contact.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/8">

            {/* Email */}
            <a
              href={`mailto:${settings.email}`}
              className="group bg-brand-noir p-10 flex flex-col gap-4 hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-brand-or"
            >
              <Mail className="h-6 w-6 text-brand-rouge group-hover:text-brand-or transition-colors" />
              <div>
                <div className="font-spartan font-black text-xs uppercase tracking-widest text-white/40 mb-2">
                  {texts.home.contact.email ?? "Email"}
                </div>
                <div className="font-lato text-base text-white/70 group-hover:text-white transition-colors break-all">
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
                className="group bg-brand-noir p-10 flex flex-col gap-4 hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-brand-or"
              >
                <Instagram className="h-6 w-6 text-brand-rouge group-hover:text-brand-or transition-colors" />
                <div>
                  <div className="font-spartan font-black text-xs uppercase tracking-widest text-white/40 mb-2">
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
                className="group bg-brand-noir p-10 flex flex-col gap-4 hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-brand-or"
              >
                <MessageCircle className="h-6 w-6 text-brand-rouge group-hover:text-brand-or transition-colors" />
                <div>
                  <div className="font-spartan font-black text-xs uppercase tracking-widest text-white/40 mb-2">
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
