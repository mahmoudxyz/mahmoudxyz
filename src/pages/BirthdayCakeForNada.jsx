import React, { useState, useEffect, useRef } from 'react';
import { Heart, Music, Star, Gift, Coffee, Building2, Cat, Sparkles, Crown, Flame, ChevronDown } from 'lucide-react';

const BirthdayCakeForNada = () => {
  const [candles, setCandles] = useState([true, true, true]);
  const [showMessage, setShowMessage] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showCat, setShowCat] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [expandedCards, setExpandedCards] = useState({});
   const audioRef = useRef(null);

          useEffect(() => {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
              playPromise.then(() => {
              }).catch(error => {
                console.log("Autoplay prevented:", error);
              });
            }
          }, []);

  const quotes = [
    "يا ملكة البيزنس... كل سنة وإنتِ طيبة 👑",
    "الامتحانات؟ دي بتبقى سهلة عليكِ زي ما الجمال سهل عليكِ ✨",
    "شيكو بيقول: مين اللي أحلى منك؟ مفيش! 🐱💅",
    "مطعمك هيبقى المكان الوحيد اللي الناس تيجي فيه عشان جمالك قبل الأكل ☕💖",
    "إنتِ مش بس مكافحة... إنتِ ملهمة كل الناس حواليكِ 🌟"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const blowCandle = (index) => {
    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);
    
    // Simple confetti
    const newConfetti = [];
    for (let i = 0; i < 15; i++) {
      newConfetti.push({
        id: Date.now() + i,
        left: Math.random() * 100,
        delay: Math.random() * 500,
        color: ['bg-pink-400', 'bg-purple-400', 'bg-yellow-400'][Math.floor(Math.random() * 3)]
      });
    }
    setConfetti(newConfetti);
    
    setTimeout(() => setConfetti([]), 2000);
    
    if (newCandles.every(candle => !candle)) {
      setTimeout(() => setShowMessage(true), 1000);
    }
  };

  const createHeart = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const heart = {
      id: Date.now() + Math.random(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    setHearts(prev => [...prev, heart]);
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== heart.id));
    }, 2000);
  };

  const toggleCard = (cardId) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };


    const handleAudioClick = () => {
    setShowCat(!showCat);
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.error('Audio play failed:', err);
      });
    }
  };

  const cardData = [
    {
      id: 'cafe',
      icon: Coffee,
      title: 'Future Cafe Queen',
      preview: 'مطعمك الكوزي قريباً...',
      content: 'تخيلي معايا... مطعم صغير كوزي، ريحة القهوة الحلوة، وإنتِ واقفة تديري كل حاجة بثقة. الناس هتيجي مش بس عشان الأكل، لكن عشان الطاقة الإيجابية اللي بتشعيها. هتبقي الـ سي اي اوه الأجمل في المدينة! ☕👸',
      color: 'from-amber-100 to-orange-100',
      iconColor: 'text-amber-600'
    },
    {
      id: 'business',
      icon: Building2,
      title: 'Business Genius',
      preview: 'الامتحانات مش صعبة عليكِ...',
      content: 'بصراحة، أنا شايفك هتخلصي الامتحانات دي وكأنها لعبة. عندك الذكاء ده والتركيز ده... والاستيراد والتصدير هيبقى مجالك الثاني لو حبيتي. بس أنا متأكد إنك هتنجحي في أي حاجة تحطي دماغك فيها! 📊💼',
      color: 'from-blue-100 to-indigo-100',
      iconColor: 'text-blue-600'
    },
    {
      id: 'cat',
      icon: Cat,
      title: 'Cat Mom Extraordinaire',
      preview: 'شيكو وعيلة القطط...',
      content: 'شيكو محظوظ جداً إن عنده أم زيك! حتى لما بيعمل مشاكل وخناقات مع باقي القطط، إنتِ صبورة معاه وبتحبيه. ده يدل على قلبك الطيب وإنك هتبقي أم عظيمة في المستقبل (إن شاء الله) 🐱💖',
      color: 'from-orange-100 to-red-100',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 overflow-hidden relative"
      onClick={createHeart}
    >



      {/* Simple floating hearts */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute pointer-events-none z-20"
          style={{
            left: heart.x,
            top: heart.y,
            animation: 'float-up 2s ease-out forwards'
          }}
        >
          <Heart className="text-pink-500 w-6 h-6 fill-current" />
        </div>
      ))}

      {/* Simple confetti */}
      {confetti.map(piece => (
        <div
          key={piece.id}
          className={`absolute top-0 w-2 h-2 ${piece.color} rounded-full`}
          style={{
            left: `${piece.left}%`,
            animation: `fall 2s ease-in forwards`,
            animationDelay: `${piece.delay}ms`
          }}
        />
      ))}

      <audio ref={audioRef} src="src/assets/sam.mp3" controls={false} />
      
      <div
        className="fixed bottom-6 left-6 cursor-pointer transition-transform duration-300 hover:scale-110 z-10"
        onClick={handleAudioClick}
      >
        <div className="relative">
          <Cat className="w-14 h-14 text-orange-500" />
          <div className="text-sm text-center mt-1 font-bold text-orange-600">شيكو</div>
          {showCat && (
            <div className="absolute -top-8 -right-2 bg-white rounded-lg px-2 py-1 text-xs shadow-lg">
              مواء! 😻
            </div>
          )}
        </div>
      </div>


      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <Crown className="w-10 h-10 text-yellow-500 mx-auto" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
           عيد سعيد يا ندى
          </h1>
          <div className="flex items-center justify-center gap-3 text-xl text-gray-700 font-semibold">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            <span>ندى... الجميلة الذكية المكافحة</span>
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </div>
        </div>

        {/* Redesigned Birthday Cake */}
        <div className="relative mb-10">
          <div className="bg-gradient-to-b from-pink-50 to-rose-100 rounded-3xl p-8 shadow-xl border-2 border-pink-200">
            {/* Cake Structure */}
            <div className="relative flex flex-col items-center">
              
              {/* Bottom Tier - Large */}



              {/* Candles - Properly positioned on top */}
              <div className="flex justify-center gap-4 -mt-6">
                {candles.map((lit, index) => (
                  <div key={index} className="relative">
                    <div 
                      className="w-2 h-8 bg-gradient-to-t from-blue-400 to-blue-200 rounded-sm cursor-pointer hover:scale-110 transition-transform shadow-sm"
                      onClick={() => blowCandle(index)}
                    >
                      {lit && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <div className="w-2 h-3 bg-orange-400 rounded-full opacity-80"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

             {/* Top Tier - Small */}
              <div className="relative mb-1">
                <div className="w-20 h-8 bg-gradient-to-t from-purple-400 to-purple-200 rounded-2xl shadow-lg relative">
                  {/* Decorations on top tier */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-white rounded-full"></div>
                  {/* Cake edge */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-400 rounded-b-2xl"></div>
                </div>
              </div>

           {/* Middle Tier - Medium */}
              <div className="relative mb-1">
                <div className="w-28 h-10 bg-gradient-to-t from-pink-400 to-pink-200 rounded-2xl shadow-lg relative">
                  {/* Decorations on middle tier */}
                  <div className="absolute top-2 left-3 w-3 h-2 bg-purple-400 rounded-full"></div>
                  <div className="absolute top-2 right-3 w-3 h-2 bg-yellow-400 rounded-full"></div>
                  {/* Cake edge */}
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 to-pink-400 rounded-b-2xl"></div>
                </div>
              </div>



               <div className="relative mb-1">
                <div className="w-36 h-12 bg-gradient-to-t from-yellow-400 to-yellow-200 rounded-2xl shadow-lg relative">
                  {/* Decorations on bottom tier */}
                  <div className="absolute top-2 left-4 w-4 h-2 bg-red-400 rounded-full"></div>
                  <div className="absolute top-2 right-4 w-4 h-2 bg-blue-400 rounded-full"></div>
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-green-400 rounded-full"></div>
                  {/* Cake edge */}
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-b-2xl"></div>
                </div>
              </div>

            </div>
            
            <p className="text-center mt-2 text-gray-700 font-medium">
              انفخي الشموع واتمني أمنية حلوة! 🕯️
            </p>
          </div>
        </div>

        {/* Quotes */}
        <div className="mb-10 max-w-2xl">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg border border-pink-100">
            <p className="text-lg text-gray-800 text-center transition-all duration-500">
              {quotes[currentQuote]}
            </p>
          </div>
        </div>

        {/* Special Message */}
        {showMessage && (
          <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl p-6 shadow-xl text-white text-center max-w-lg mx-4 mb-8">
            <Gift className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">🎁 المفاجأة الكبيرة! 🎁</h3>
            <div className="text-base leading-relaxed space-y-3">
              <p>يا ندى الجميلة... إنتِ مش مجرد صديقة عادية 💖</p>
              <p>في يومين بس حسيت إنك إنسانة مميزة جداً، ذكية، مكافحة، وعندك أحلام كبيرة</p>
              <p className="font-bold text-yellow-200">
                كل سنة وإنتِ أحلى هدية في الدنيا ✨
              </p>
            </div>
          </div>
        )}

        {/* Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {cardData.map((card) => {
            const Icon = card.icon;
            const isExpanded = expandedCards[card.id];
            
            return (
              <div 
                key={card.id}
                className={`bg-gradient-to-br ${card.color} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-white/50`}
                onClick={() => toggleCard(card.id)}
              >
                <div className="text-center">
                  <Icon className={`w-12 h-12 mx-auto mb-4 ${card.iconColor}`} />
                  <h3 className="font-bold text-gray-800 text-lg mb-2">{card.title}</h3>
                  
                  {!isExpanded ? (
                    <div>
                      <p className="text-gray-600 text-sm mb-3">{card.preview}</p>
                      <div className="flex items-center justify-center text-gray-500 text-xs">
                        <span>اضغط للمزيد</span>
                        <ChevronDown className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-700 text-sm leading-relaxed">{card.content}</p>
                      <div className="flex items-center justify-center text-gray-500 text-xs mt-3">
                        <span>اضغط للإخفاء</span>
                        <ChevronDown className="w-4 h-4 ml-1 transform rotate-180" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center space-y-4">
          <div className="flex justify-center items-center gap-4">
            <Heart className="w-6 h-6 text-red-500 fill-current" />
            <p className="text-gray-700 font-semibold text-lg">
              كل سنة وإنتِ أجمل وأذكى وأقوى! 
            </p>
            <Heart className="w-6 h-6 text-red-500 fill-current" />
          </div>
          <p className="text-sm text-gray-500 bg-white/50 rounded-lg px-4 py-2 inline-block">
            💕 دوسي في أي حتة علشان القلوب تطير 💕
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-80px) scale(1);
            opacity: 0;
          }
        }
        
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default BirthdayCakeForNada;