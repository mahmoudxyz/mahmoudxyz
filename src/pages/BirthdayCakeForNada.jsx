import React, { useState, useEffect, useRef } from 'react';
import { Heart, Music, Star, Gift, Coffee, Building2, Cat, Sparkles, Crown, Flame, ChevronDown, Volume2, VolumeX, Play } from 'lucide-react';

const StepByStepBirthdayForNada = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [musicPermission, setMusicPermission] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [candles, setCandles] = useState([true, true, true]);
  const [wishMade, setWishMade] = useState(false);
  const audioRef = useRef(null);

  const steps = [
    {
      id: 'music',
      component: 'MusicPermission'
    },
    {
      id: 'greeting',
      text: "💖إزيك يا ندى ",
      duration: 3000
    },
    {
      id: 'introduction',
      text: "🌟 النهارده يوم مميز جداً",
      duration: 3000
    },
    {
      id: 'birthday_reveal',
      text: "لأنه عيد ميلادك! 🎉",
      duration: 3000
    },
    {
      id: 'crown',
      text: "You are queen of business",
      duration: 3500
    },
    {
      id: 'cake_intro',
      text: "🎂عملت لك تورته ",
      duration: 3000
    },
    {
      id: 'cake',
      component: 'CakeComponent'
    },
    {
      id: 'wish_prompt',
      text: "الآن... اتمني أمنية حلوة من قلبك 💫",
      duration: 4000
    },
    {
      id: 'wish_action',
      component: 'WishComponent'
    },
    {
      id: 'about_you',
      text: "عايز أقولك حاجة مهمة عنك... ✨",
      duration: 3500
    },
    {
      id: 'smart',
      text: "إنتِ ذكية جداً والامتحانات مش صعبة عليكِ 📚",
      duration: 4000
    },
    {
      id: 'business',
      text: "ومستقبلك في البيزنس هيبقى مشرق 💼",
      duration: 4000
    },
    {
      id: 'cafe',
      text: "مطعمك الكوزي هيبقى أجمل مكان في المدينة ☕",
      duration: 4000
    },
    {
      id: 'cat_mom',
      text: "وشيكو محظوظ إن عنده أم حنينة زيك 🐱💕",
      duration: 4000
    },
    {
      id: 'special',
      text: "في يومين بس حسيت إنك إنسانة مميزة جداً... 🌟",
      duration: 4500
    },
    {
      id: 'qualities',
      text: "مكافحة، جميلة، وعندك أحلام كبيرة 💫",
      duration: 4000
    },
    {
      id: 'final',
      component: 'FinalMessage'
    }
  ];

  useEffect(() => {
    if (currentStep > 0 && currentStep < steps.length - 1 && steps[currentStep].duration) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, steps[currentStep].duration);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleMusicPermission = async (allowed) => {
    setMusicPermission(allowed);
    if (allowed && audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Audio play failed:", error);
      }
    }
    setCurrentStep(1);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const createHearts = (e) => {
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

  const blowCandle = (index) => {
    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);
    
    // Create confetti
    const newConfetti = [];
    for (let i = 0; i < 20; i++) {
      newConfetti.push({
        id: Date.now() + i,
        left: Math.random() * 100,
        delay: Math.random() * 500,
        color: ['bg-pink-400', 'bg-purple-400', 'bg-yellow-400', 'bg-blue-400'][Math.floor(Math.random() * 4)]
      });
    }
    setConfetti(newConfetti);
    
    setTimeout(() => setConfetti([]), 3000);
    
    if (newCandles.every(candle => !candle)) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 2000);
    }
  };

  const makeWish = () => {
    setWishMade(true);
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 3000);
  };

  const MusicPermission = () => (
    <div className="text-center space-y-8">
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-32 h-32 mx-auto flex items-center justify-center animate-pulse">
        <Music className="w-16 h-16 text-white" />
      </div>
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          🎵 أضيف موسيقى لطيفة؟ 🎵
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          عندي أغنية حلوة هتخلي التجربة أجمل... 
          <br />
          ممكن أشغلها؟
        </p>
        <div className="flex gap-6 justify-center mt-8">
          <button
            onClick={() => handleMusicPermission(true)}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-4 rounded-xl text-xl font-bold hover:scale-105 transition-transform shadow-lg"
          >
            ✅ أيوة، شغلها!
          </button>
          <button
            onClick={() => handleMusicPermission(false)}
            className="bg-gradient-to-r from-gray-400 to-gray-600 text-white px-8 py-4 rounded-xl text-xl font-bold hover:scale-105 transition-transform shadow-lg"
          >
            ❌ لا، شكراً
          </button>
        </div>
      </div>
    </div>
  );

  const CakeComponent = () => (
    <div className="text-center space-y-8">
      <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl p-12 shadow-2xl border-4 border-pink-200 max-w-md mx-auto">
        <div className="relative flex flex-col items-center">
          {/* Candles */}
          <div className="flex justify-center gap-6 mb-4">
            {candles.map((lit, index) => (
              <div key={index} className="relative">
                <div 
                  className="w-3 h-12 bg-gradient-to-t from-blue-500 to-blue-300 rounded-sm cursor-pointer hover:scale-110 transition-transform shadow-lg"
                  onClick={() => blowCandle(index)}
                >
                  {lit && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-3 h-4 bg-orange-400 rounded-full "></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Cake Tiers */}
          <div className="w-24 h-10 bg-gradient-to-t from-purple-400 to-purple-200 rounded-2xl shadow-lg mb-2 relative">
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-white rounded-full"></div>
          </div>
          
          <div className="w-32 h-12 bg-gradient-to-t from-pink-400 to-pink-200 rounded-2xl shadow-lg mb-2 relative">
            <div className="absolute top-3 left-4 w-4 h-3 bg-yellow-400 rounded-full"></div>
            <div className="absolute top-3 right-4 w-4 h-3 bg-purple-400 rounded-full"></div>
          </div>
          
          <div className="w-40 h-14 bg-gradient-to-t from-yellow-400 to-yellow-200 rounded-2xl shadow-lg relative">
            <div className="absolute top-4 left-6 w-5 h-3 bg-red-400 rounded-full"></div>
            <div className="absolute top-4 right-6 w-5 h-3 bg-blue-400 rounded-full"></div>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-5 h-3 bg-green-400 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="text-2xl font-bold text-gray-700 animate-bounce">
        🎂 انفخي الشموع! 🎂
      </div>
      
      {candles.every(c => !c) && (
        <div className="text-3xl font-bold text-purple-600 animate-pulse">
          🎉 كل سنة وإنتِ طيبة! 🎉
        </div>
      )}
    </div>
  );

  const WishComponent = () => (
    <div className="text-center space-y-8">
      {!wishMade ? (
        <>
          <div className="text-6xl animate-bounce">⭐</div>
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 max-w-lg mx-auto border-2 border-purple-200">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">اتمني أمنية!</h3>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              اقفلي عينك واتمني امنيه
              <br />
              وبعدين اضغطي  ⭐
            </p>
            <button
              onClick={makeWish}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-6 rounded-2xl text-2xl font-bold hover:scale-105 transition-transform shadow-xl animate-pulse"
            >
              ⭐ تمنيت! ⭐
            </button>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <div className="text-6xl animate-spin">✨</div>
          <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8 max-w-lg mx-auto border-2 border-green-200">
            <h3 className="text-3xl font-bold text-green-700 mb-4"> 💫</h3>
            <p className="text-xl text-gray-700 leading-relaxed">
              كنت هقولك إن أمنيتك هتتحقق...
              <br />
              بس مش هقول كده
              <br />
              <span className="font-bold text-purple-600">
                عايز أقولك حاجة أحلى! ✨
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const FinalMessage = () => (
    <div className="text-center space-y-8">
      <Crown className="w-16 h-16 text-yellow-500 mx-auto animate-bounce" />
      <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl p-12 shadow-2xl text-white max-w-2xl mx-auto">
        <Gift className="w-16 h-16 mx-auto mb-6 animate-pulse" />
        <div className="space-y-6 text-xl leading-relaxed">
          <p>إنتِ إنسانة مميزة، ذكية، جميلة، ومكافحة</p>
          <p>وأنا متأكد إن كل حلم عندك هيتحقق</p>
          <div className="bg-white/20 rounded-2xl p-6 mt-8">
            <p className="text-2xl font-bold text-yellow-200">
              كل سنة وأنت طيبة وتحققي كل احلامك واتمنالك 100 سنة سعيده محققه فيها كل أحلامك
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl p-6 border-2 border-amber-200">
          <Coffee className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h4 className="font-bold text-gray-800 text-lg">Future Cafe Queen</h4>
          <p className="text-sm text-gray-700 mt-2">مطعمك هيبقى أجمل مكان! ☕👸</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-6 border-2 border-blue-200">
          <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h4 className="font-bold text-gray-800 text-lg">Business Genius</h4>
          <p className="text-sm text-gray-700 mt-2">الامتحانات سهلة عليكِ! 📊💼</p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-xl p-6 border-2 border-orange-200">
          <Cat className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h4 className="font-bold text-gray-800 text-lg">Cat Mom</h4>
          <p className="text-sm text-gray-700 mt-2">شيكو محظوظ بيكِ! 🐱💖</p>
        </div>
      </div>

      <div className="mt-8 p-4 bg-white/80 rounded-xl">
        <p className="text-lg text-gray-700">
          💕 دوسي في أي حتة علشان القلوب تطير 💕
        </p>
      </div>
    </div>
  );

  const currentStepData = steps[currentStep];

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 overflow-hidden relative flex items-center justify-center p-4"
      onClick={createHearts}
    >
      {/* Audio */}
      <audio ref={audioRef} loop>
        <source src="src\assets\sam.mp3" />
      </audio>

      {/* Music Control */}
      {musicPermission !== null && (
        <button
          onClick={toggleMusic}
          className="fixed top-6 right-6 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:scale-110 transition-transform z-20"
        >
          {isPlaying ? <Volume2 className="w-6 h-6 text-purple-600" /> : <VolumeX className="w-6 h-6 text-gray-600" />}
        </button>
      )}

      {/* Hearts Animation */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute pointer-events-none z-10"
          style={{
            left: heart.x,
            top: heart.y,
            animation: 'float-up 2s ease-out forwards'
          }}
        >
          <Heart className="text-pink-500 w-6 h-6 fill-current" />
        </div>
      ))}

      {/* Confetti */}
      {confetti.map(piece => (
        <div
          key={piece.id}
          className={`absolute top-0 w-3 h-3 ${piece.color} rounded-full z-10`}
          style={{
            left: `${piece.left}%`,
            animation: `fall 3s ease-in forwards`,
            animationDelay: `${piece.delay}ms`
          }}
        />
      ))}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {currentStepData.component === 'MusicPermission' && <MusicPermission />}
        {currentStepData.component === 'CakeComponent' && <CakeComponent />}
        {currentStepData.component === 'WishComponent' && <WishComponent />}
        {currentStepData.component === 'FinalMessage' && <FinalMessage />}
        
        {currentStepData.text && (
          <div className="text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl px-12 py-8 shadow-2xl border-2 border-pink-200 inline-block max-w-3xl">
              <p className="text-4xl md:text-5xl font-bold text-gray-800 leading-relaxed animate-pulse">
                {currentStepData.text}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepByStepBirthdayForNada;