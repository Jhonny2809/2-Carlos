
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Heart, 
  ShoppingBag, 
  Users, 
  Star, 
  Play, 
  Laptop, 
  Check, 
  ArrowRight,
  Gift,
  X,
  AlertTriangle
} from 'lucide-react';

// --- Types ---
interface FAQItemProps {
  question: string;
  answer: string;
}

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
}

// --- Components ---

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between items-center text-left focus:outline-none"
      >
        <span className="font-semibold text-lg text-gray-800">{question}</span>
        {isOpen ? <ChevronUp className="text-pink-vibrant" /> : <ChevronDown className="text-pink-vibrant" />}
      </button>
      {isOpen && <p className="mt-2 text-gray-600 leading-relaxed">{answer}</p>}
    </div>
  );
};

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-lilac-soft flex flex-col items-center text-center transition-transform hover:scale-105">
    <div className="bg-lilac-soft p-4 rounded-full mb-4 text-pink-vibrant">
      {icon}
    </div>
    <h3 className="font-bold text-gray-800">{title}</h3>
  </div>
);

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 29,
    seconds: 24,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        clearInterval(timer);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="bg-red-50 text-red-600 font-bold p-3 rounded-lg border border-red-200 flex items-center justify-center gap-2 mb-4">
      <span>A promoção encerra em:</span>
      <span className="font-mono text-xl">{format(timeLeft.hours)}:{format(timeLeft.minutes)}:{format(timeLeft.seconds)}</span>
    </div>
  );
};

const App: React.FC = () => {
  const [showUpsell, setShowUpsell] = useState(false);
  const [upsellSeconds, setUpsellSeconds] = useState(120);

  useEffect(() => {
    let interval: any;
    if (showUpsell && upsellSeconds > 0) {
      interval = setInterval(() => {
        setUpsellSeconds(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showUpsell, upsellSeconds]);

  const formatUpsellTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleBasicClick = () => {
    setShowUpsell(true);
    setUpsellSeconds(120);
  };

  const handleAcceptUpsell = () => {
    // Redireciona para o link de 24,90
    window.location.href = "https://pay.hotmart.com/OFERTA_24_90";
  };

  const handleRejectUpsell = () => {
    // Redireciona para o link original de 14,90
    window.location.href = "https://pay.hotmart.com/OFERTA_14_90";
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Upsell Popup */}
      {showUpsell && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-purple-main w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-vibrant animate-in zoom-in duration-300">
            <div className="bg-pink-vibrant p-4 text-center text-white font-bold flex items-center justify-center gap-2">
              <AlertTriangle size={20} />
              OFERTA EXCLUSIVA: NÃO FECHE ESSA PÁGINA!
            </div>
            <div className="p-8 text-center text-white">
              <p className="text-lilac-soft uppercase font-bold text-sm tracking-widest mb-2">ESPERE UM SEGUNDO!</p>
              <h2 className="text-2xl lg:text-3xl font-black mb-4">
                Que tal levar o <span className="text-pink-vibrant">PACOTE PREMIUM</span> por apenas mais R$ 10,00?
              </h2>
              <p className="text-gray-300 mb-6">
                Você clicou no plano básico, mas por tempo limitado, você pode ter acesso vitalício a TODOS os 300 modelos e 70 tutoriais.
              </p>
              
              <div className="bg-white/10 rounded-2xl p-6 mb-8 border border-white/20">
                <p className="text-sm line-through text-gray-400">De R$ 97,00 por</p>
                <p className="text-5xl font-black text-green-success my-2">R$ 24,90</p>
                <div className="mt-4 inline-flex items-center gap-2 bg-red-600/20 text-red-400 px-4 py-2 rounded-full font-mono font-bold border border-red-600/30">
                  Expira em: {formatUpsellTime(upsellSeconds)}
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={handleAcceptUpsell}
                  className="w-full py-5 bg-green-success text-white rounded-2xl font-black text-xl shadow-xl hover:scale-105 transition-transform animate-pulse-green"
                >
                  SIM! QUERO O PREMIUM POR R$ 24,90
                </button>
                <button 
                  onClick={handleRejectUpsell}
                  className="w-full py-2 text-gray-400 text-sm font-medium hover:text-white transition-colors"
                >
                  Não, obrigado. Prefiro pagar R$ 14,90 e ter menos conteúdo.
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header / Nav */}
      <header className="sticky top-0 z-50 bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-pink-vibrant w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-xl">C</div>
            <span className="font-black text-xl text-purple-main">CROCHETEIRA DE SUCESSO</span>
          </div>
          <a 
            href="#pricing"
            className="hidden md:block bg-pink-vibrant text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-opacity"
          >
            Começar Agora
          </a>
        </div>
      </header>

      {/* Section 1: Hero */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden bg-gradient-to-br from-[#3D1B5D] via-[#3D1B5D] to-[#F3E8FF] lg:to-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center relative z-10">
          <div className="lg:w-1/2 text-white mb-12 lg:mb-0">
            <span className="inline-block bg-white text-pink-vibrant px-4 py-1 rounded-full font-bold text-sm mb-6 uppercase tracking-wider">
              LUGAR ONDE VOCÊ SE TRANSFORMA EM UM SUCESSO
            </span>
            <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
              Aproveite 70 tutoriais e <br/>
              <span className="text-pink-vibrant">300 modelos exclusivos</span>
            </h1>
            <p className="text-xl mb-8 text-lilac-soft max-w-lg">
              Domine a arte do crochê com o guia mais completo do mercado. Receitas exclusivas com até 70% de desconto!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#pricing" 
                className="bg-white text-pink-vibrant text-center px-8 py-4 rounded-xl font-bold text-lg hover:bg-lilac-soft transition-colors flex items-center justify-center gap-2 shadow-xl"
              >
                Quero meu acesso com desconto
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative z-20">
              {/* Product image provided by user */}
              <img 
                src="https://i.ibb.co/CK350XvQ/8da03b60f29834ea5238a3926ac867ff.jpg" 
                alt="Produto Crochê de Sucesso" 
                className="rounded-3xl shadow-2xl border-8 border-white max-w-full h-auto object-cover max-h-[600px] mx-auto"
              />
              {/* Badge */}
              <div className="absolute -top-6 -right-6 bg-pink-vibrant text-white w-32 h-32 rounded-full flex flex-col items-center justify-center font-bold rotate-12 shadow-2xl border-4 border-white">
                <span className="text-xs">BLACK FRIDAY</span>
                <span className="text-2xl">70% OFF</span>
              </div>
            </div>
          </div>
        </div>
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-lilac-soft skew-x-12 translate-x-32 z-0 hidden lg:block"></div>
      </section>

      {/* Section 2: A Quem se Destina */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-black text-center text-purple-main mb-12">
            Para Quem É o Pack Premium?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <BenefitCard icon={<Heart />} title="Para quem quer aprender crochê do zero" />
            <BenefitCard icon={<Users />} title="Para quem quer criar peças para a família" />
            <BenefitCard icon={<ShoppingBag />} title="Para quem deseja vender e ter renda extra" />
            <BenefitCard icon={<Star />} title="Para iniciantes e experientes" />
          </div>
        </div>
      </section>

      {/* Section 3: Vitrine de Modelos */}
      <section className="py-20 bg-lilac-soft">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-black text-center text-purple-main mb-4">
            300+ Modelos Inclusos
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Desde o básico até peças luxuosas. Tudo o que você precisa em um único lugar.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: "Vestidos", img: "https://picsum.photos/400/500?random=1" },
              { label: "Amigurumis", img: "https://picsum.photos/400/500?random=2" },
              { label: "Bolsas", img: "https://picsum.photos/400/500?random=3" },
              { label: "Tapetes", img: "https://picsum.photos/400/500?random=4" }
            ].map((cat, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl aspect-[4/5]">
                <img src={cat.img} alt={cat.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                  <span className="text-white font-bold text-lg">{cat.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-purple-main aspect-video flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070&auto=format&fit=crop" alt="Video Placeholder" className="absolute inset-0 w-full h-full object-cover opacity-50" />
              <button className="relative z-10 w-20 h-20 bg-pink-vibrant text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Play size={40} fill="currentColor" />
              </button>
            </div>
            <p className="text-center mt-4 text-sm text-gray-500 italic">Demonstração da qualidade das nossas aulas em vídeo.</p>
          </div>
        </div>
      </section>

      {/* Section 4: Área de Membros */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-pink-vibrant/20 blur-2xl rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop" 
                alt="Mockup plataforma" 
                className="relative rounded-2xl shadow-2xl border-4 border-white"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3">
                <div className="bg-green-500 p-2 rounded-lg text-white">
                  <Laptop size={24} />
                </div>
                <div>
                  <p className="font-bold text-sm">Plataforma Exclusiva</p>
                  <p className="text-xs text-gray-500">Acesso Mobile & Desktop</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl lg:text-4xl font-black text-purple-main mb-8">
              Área de Membros Organizada
            </h2>
            <div className="space-y-6">
              {[
                "Interface moderna e fácil de navegar",
                "Aulas gravadas em alta definição (HD)",
                "Acesso vitalício para ver quando quiser",
                "Suporte direto para dúvidas de alunas",
                "Atualizações constantes com novos modelos"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1 bg-pink-vibrant text-white rounded-full p-1">
                    <Check size={16} />
                  </div>
                  <span className="text-lg text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Seção de Bônus */}
      <section className="py-20 bg-purple-main text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black mb-4">
              Além dos 300 modelos, <br/> você ainda recebe de brinde:
            </h2>
            <div className="w-24 h-1 bg-pink-vibrant mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Apostila de Amigurumi", desc: "Tudo para criar bichinhos perfeitos." },
              { title: "Sapatinhos Infantis", desc: "Receitas fofas para os pequenos." },
              { title: "Bolsas de Luxo", desc: "Modelos que são tendência mundial." },
              { title: "Dicas de Decoração", desc: "Peças para transformar ambientes." },
              { title: "Acessórios de Cozinha", desc: "Utilitários lindos e práticos." },
              { title: "Guia Secreto de Cores", desc: "Como combinar fios profissionalmente." }
            ].map((bonus, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-start gap-4">
                <div className="bg-pink-vibrant/20 p-2 rounded-lg text-pink-vibrant">
                  <Gift size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">{bonus.title}</h3>
                  <p className="text-lilac-soft text-sm">{bonus.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Tabela de Preços */}
      <section id="pricing" className="py-20 bg-lilac-soft">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <CountdownTimer />
            <h2 className="text-3xl lg:text-5xl font-black text-purple-main mb-4">
              Garanta Sua Vaga Agora
            </h2>
            <p className="text-gray-600">Escolha o melhor plano para sua jornada.</p>
          </div>

          <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8 max-w-5xl mx-auto">
            {/* Básico */}
            <div className="flex-1 bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col">
              <h3 className="text-2xl font-black text-gray-800 mb-2">Básico</h3>
              <p className="text-gray-500 mb-6">Acesso a 50 modelos essenciais.</p>
              <div className="mb-8">
                <span className="text-3xl font-black text-gray-800">R$ 14,90</span>
                <span className="text-gray-400 block text-sm mt-1">Pagamento único</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {["50 Modelos Iniciais", "Guia de Pontos", "Acesso por 1 ano"].map((it, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="text-gray-400" size={18} />
                    {it}
                  </li>
                ))}
              </ul>
              <button 
                onClick={handleBasicClick}
                className="w-full py-4 border-2 border-pink-vibrant text-pink-vibrant rounded-xl font-bold hover:bg-pink-vibrant hover:text-white transition-colors"
              >
                Escolher Básico
              </button>
            </div>

            {/* Premium */}
            <div className="flex-1 bg-white p-8 rounded-3xl shadow-2xl border-4 border-pink-vibrant relative flex flex-col scale-105 z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pink-vibrant text-white px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap">
                O MAIS VENDIDO ⭐
              </div>
              <h3 className="text-2xl font-black text-purple-main mb-2">Pack Premium</h3>
              <p className="text-gray-500 mb-6">Tudo liberado para você faturar.</p>
              <div className="mb-8">
                <span className="text-gray-400 line-through block text-lg">De R$ 97,00</span>
                <span className="text-5xl font-black text-purple-main">R$ 34,90</span>
                <span className="text-pink-vibrant block text-sm font-bold mt-1">Pague uma vez, acesse para sempre</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {[
                  "Todos os 300+ Modelos",
                  "Todos os 70 Tutoriais HD",
                  "Todos os 6 Bônus Exclusivos",
                  "Acesso Vitalício",
                  "Certificado de Conclusão",
                  "Suporte VIP Alunas"
                ].map((it, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700 font-medium">
                    <CheckCircle2 className="text-green-500" size={18} />
                    {it}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => window.location.href = "https://pay.hotmart.com/OFERTA_34_90"}
                className="w-full py-4 bg-green-success text-white rounded-xl font-bold text-xl shadow-lg hover:brightness-110 transition-all animate-pulse-green"
              >
                QUERO O PACOTE PREMIUM
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Prova Social */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-black text-center text-purple-main mb-12">
            Quem Já Comprou Recomenda
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-lilac-soft p-2 rounded-3xl">
                 <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-4 border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-pink-vibrant flex items-center justify-center text-white font-bold">A</div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">Aluna Satisfeita #{n}</p>
                        <p className="text-[10px] text-green-500 font-bold uppercase tracking-tighter">Online</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                       <div className="bg-[#E2FDCB] p-3 rounded-tr-xl rounded-bl-xl rounded-br-xl text-sm text-gray-800 shadow-sm relative max-w-[90%]">
                         Gente, amei os modelos! Já fiz meu primeiro amigurumi seguindo os tutoriais. Ficou perfeito! 😍
                       </div>
                       <div className="flex justify-end">
                          <img src={`https://picsum.photos/200/200?random=${n+10}`} alt="Work" className="w-32 h-32 object-cover rounded-lg border-2 border-white shadow-md" />
                       </div>
                    </div>
                    <div className="mt-4 flex gap-1">
                      {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-yellow-400 text-yellow-400" />)}
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-black text-center text-purple-main mb-12">Perguntas Frequentes</h2>
          <div className="bg-white rounded-3xl p-6 lg:p-12 shadow-sm">
            <FAQItem 
              question="Como recebo o acesso?" 
              answer="Imediatamente após a confirmação do pagamento, você receberá um e-mail com seus dados de acesso à nossa plataforma exclusiva." 
            />
            <FAQItem 
              question="O acesso é vitalício?" 
              answer="Sim! No plano Premium você paga uma única vez e terá acesso para sempre, incluindo todas as futuras atualizações." 
            />
            <FAQItem 
              question="Posso acessar pelo celular?" 
              answer="Com certeza. Nossa plataforma é totalmente responsiva e você pode estudar de onde quiser, seja no celular, tablet ou computador." 
            />
            <FAQItem 
              question="Tenho garantia?" 
              answer="Sim, oferecemos 7 dias de garantia incondicional. Se não gostar do conteúdo, devolvemos 100% do seu dinheiro." 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-main text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <div className="bg-pink-vibrant w-8 h-8 rounded-full flex items-center justify-center text-white font-black">C</div>
              <span className="font-black text-lg">CROCHETEIRA DE SUCESSO</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-pink-vibrant transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-pink-vibrant transition-colors">Privacidade</a>
              <a href="#" className="hover:text-pink-vibrant transition-colors">Suporte</a>
            </div>
          </div>
          <div className="text-center text-lilac-soft text-sm pt-8 border-t border-white/10">
            <p>© 2024 Crocheteira de Sucesso. Todos os direitos reservados.</p>
            <p className="mt-2 text-[10px] opacity-50">Este site não faz parte do site do Google ou da Meta Platforms, Inc. Além disso, este site NÃO é endossado pelo Google ou pela Meta de forma alguma.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
