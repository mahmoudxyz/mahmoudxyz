import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage'; // Import your existing terminal component

function RetroPortfolio() {
  // All state management for interactive elements
  const [viewMode, setViewMode] = useState('retro');
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showUnderConstruction, setShowUnderConstruction] = useState(false);
  const [hitCounter, setHitCounter] = useState(372);
  const [showMusicControls, setShowMusicControls] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState('Eiffel 65 - Blue (Da Ba Dee)');
  const [guestbookEntries, setGuestbookEntries] = useState([
    { name: "Rick Astley", date: "04/01/2023", message: "Never gonna give you up, never gonna let you down!" },
    { name: "Steve Ballmer", date: "03/15/2023", message: "Developers! Developers! Developers! DEVELOPERS!!!!" }
  ]);
  
  // These would be actual image imports in a real implementation
  const fakeGifs = {
    construction: "data:image/gif;base64,R0lGODlhZAASAMQAAAAAAP///+/v79/f39bT0MzMzL+/v7e3t6+vr6WlpZ2dnZmZmZCQkIiIiICAgHNzc2tra2ZmZl5eXlZWVk5OTkZGRj09PTU1NS0tLSMjIxwcHBQUFP///wAAAAAAAAAAACH5BAEAABwALAAAAABkABIAAAX/ICeOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSCwaj8ikcslsOp/QqHRKrVqv2Kx2Wx1Jt1SBeLwlgK2As9xSBrPdZnk8Q6/b5/i8fs/v+/+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/wADChxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsiQJAQA7",
    new: "data:image/gif;base64,R0lGODlhIAAQAPcAAAAAAAAAMwAAZgAAmQAAzAAA/wAzAAAzMwAzZgAzmQAzzAAz/wBmAABmMwBmZgBmmQBmzABm/wCZAACZMwCZZgCZmQCZzACZ/wDMAADMMwDMZgDMmQDMzADM/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMzADMzMzMzZjMzmTMzzDMz/zNmADNmMzNmZjNmmTNmzDNm/zOZADOZMzOZZjOZmTOZzDOZ/zPMADPMMzPMZjPMmTPMzDPM/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YzAGYzM2YzZmYzmWYzzGYz/2ZmAGZmM2ZmZmZmmWZmzGZm/2aZAGaZM2aZZmaZmWaZzGaZ/2bMAGbMM2bMZmbMmWbMzGbM/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5kzAJkzM5kzZpkzmZkzzJkz/5lmAJlmM5lmZplmmZlmzJlm/5mZAJmZM5mZZpmZmZmZzJmZ/5nMAJnMM5nMZpnMmZnMzJnM/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wzAMwzM8wzZswzmcwzzMwz/8xmAMxmM8xmZsxmmcxmzMxm/8yZAMyZM8yZZsyZmcyZzMyZ/8zMAMzMM8zMZszMmczMzMzM/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8zAP8zM/8zZv8zmf8zzP8z//9mAP9mM/9mZv9mmf9mzP9m//+ZAP+ZM/+ZZv+Zmf+ZzP+Z///MAP/MM//MZv/Mmf/MzP/M////AP//M///Zv//mf//zP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAANgALAAAAAAgABAAAAj/ALEJHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3MixIwB/IEOKHEmypEmS/lKqXMmypcuXLlvCnEmzps2bOHPq3Mmz502UPoMKHUq0qNGjSJMqXcq0qdOnUKNKnUq1qtWrWLNq3cq1q9evYMOKHUu2rNmzaNOqXcu2rdu3cOPKnUu3rt27ePPq3cu3r9+/gAMLHky4sOHDiBMrXsy4sePHkCNLnky5suXLmDNr3sy5s+fPoEOLHk26tOnTqFOrXs26tevXsGPLnk27tu3buHPr3s27t+/fwIMLH068uPHjyJMrX868ufPn0KNLn069uvXr2LNr3869u/fv4MOLAh9Pvrz58+jTq1/Pvr379/Djy59Pv779+/jz69/Pv7///wAGKOCABBZo4IEIJqjgggw26OCDEEYo4YQUVmjhhRhmqOGGHHbo4YcghijiiCSWaOKJKKao4oostujiizDGKOOMNNZo44045qjjjjz26OOPQAYp5JBEFmnkkUgmqeSSTDbp5JNQRinllFRWaeWVWGap5ZZcdunll2CGKeaYZJZp5plopqnmmmy26eabcMYp55x01mnnnXjmqeeefPbp55+ABirooIQWauihiCaq6KKMNuroo5BGKumklFZq6aWYZqrpppx26umnoIYq6qiklmrqqaimquqqrLbq6quwxirrrLTWauutuOaq66689urrr8AGK+ywxBZr7LHIJqvsssw26+yz0EYr7bTUVmvttdhmq+223Hbr7bfghivuuOSWa+656Kar7rrstuvuu/DGK++89NZr77345qvvvvz26++/AAcM8AABC0zwwQgnrPDCDDfs8MMQRyzxxBRXbPHFGGes8cYcd+zxxyCHLPLIJJds8skop6zyyiy37PLLMMcs88w012zzzTjnrPPOPPfs889ABy300EQXbfTRSCet9NJMN+3001BHLfXUVFdt9dVYZ6311lxXFBAAIf5oQ3RDZ2l6C3RnVzBramRodmN0aXQxZTJnYjQzZWh4eGcyZWF0aHVucDRiZHlsbnF1eHhubTdnaXpjaWJiM3hpcXozeAo=",
    email: "data:image/gif;base64,R0lGODlhEAAQAPcAAP///4CAgP///wAAAAAAAECAwH/AAAAAAAAAAAAAgP8AAP//AACAgIAAAAAAAMDAwP8A/wD/AP//AAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAQAhWAAEIHEiwoMGDCBMqXMiwocOHCgVInEixokUABzJq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzps2bOHPq3Mmzp8+fQIMKHUq0qNGjSJMWDQgAOw==",
    divider: "data:image/gif;base64,R0lGODlhMgECAYAAACH5BAAAAAAALAAAAAAyAQIBAAL+hI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vv8PGCg4SFhoeIiYqLjI2Oj4CBkpOUlZaXmJmam5ydnp+QkaKjpKWmp6ipqqusra6voKGys7S1tre4ubq7vL2+v7CxwsPExcbHyMnKy8zNzs/AwdLT1NXW19jZ2tvc3d7f0NHi4+Tl5ufo6err7O3u7+Dh8vP09fb3+Pn6+/z9/v/w8woMCBBAsaPIgwocKFDBs6fAgxosSJFCtavIgxo8b+jRw7evwIMqTIkSRLmjyJMqXKlSxbunwJM6bMmTRr2ryJM6fOnTx7+vwJNKjQoUSLGj2KNKnSpUybOn0KNarUqVSrWr2KNavWrVy7ev0KNqzYsWTLmj2LNq3atWzbun0LN67cuXTr2r2LN6/evXz7+v0LOLDgwYQLGz6MOLHixYwbO34MObLkyZQrW76MObPmzZw7e/4MOrTo0aRLmz6NOrXq1axbu34NO7bs2bRr276NO7fu3bx7+/4NPLjw4cSLGz+OPLny5cybO38OPbr06dSrW7+OPbv27dy7e/8OPrz48eTLmz+PPr369ezbu38PP778+fTr27+PP7/+/fxzBQQAOw==",
    fire: "data:image/gif;base64,R0lGODlhFAAUANU/AP8A/9PT06enp7KysoCAgMzMzEpKSpmZmYyMjP+qqqqqquXl5cbGxv+ZmcDAwL+/v/r6+v+MjP/m5t3d3f+zs//Ozv/l5crKyvj4+PPz89vb2+fn5/9KSv9+fv9mZuLi4vHx8bi4uJiYmP/AwLOzs93Bwf/GxoKCgrm5uf/a2uvr6//S0ubm5v/v7/Dw8K2treLT09fX1+Pj49/f3/39/ezs7P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAD8ALAAAAAAUABQAAAb/wJ9wSCwaj8ikcjkSCCtNp1QpSTJEi0H2CiAMjoCtdsvtar8awBaNrpCpxDqkwK5r+LLo9DqJu3CiQneCfHtGMDACRQKHIjCJiIYfGgtFBxMQGTKKj44gGw1GBBsGCh2Gj5mLHR0JRgIOGw0bCKSkrhwKCEYBGh4Mqq+6txsdvUUAGw0KAK4NzMgLC8pGAAgbCwKvCtzbCQncRQEDCLkA3ejoAAHpRQMH1Q0N8fgHBvHrPwIEEVqw798+BAYTBsgngEABQwkHAnywoKHDhwYYLhwgkaKCBAomYpR4sKPHhhgrahRpsqPGlChJFjmZcKZGmC5lmiR58iXHJSSLAAA7",
  };
  
  // Increment hit counter on first load and show popup
  useEffect(() => {
    setHitCounter(prev => prev + 1);
    
    // Show welcome popup after a delay
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Show "Under Construction" message occasionally
  useEffect(() => {
    const randomTimer = setTimeout(() => {
      setShowUnderConstruction(true);
      
      // Hide it after 5 seconds
      const hideTimer = setTimeout(() => {
        setShowUnderConstruction(false);
      }, 5000);
      
      return () => clearTimeout(hideTimer);
    }, Math.random() * 60000 + 20000); // Random time between 20s and 80s
    
    return () => clearTimeout(randomTimer);
  }, []);
  
  // Toggle between retro and terminal views
  const toggleViewMode = () => {
    setViewMode(viewMode === 'retro' ? 'terminal' : 'retro');
  };
  
  // Handle guestbook entry submission
  const handleSendMessage = () => {
    if (nameInput && messageInput) {
      const now = new Date();
      const dateStr = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
      
      setGuestbookEntries([
        { name: nameInput, date: dateStr, message: messageInput },
        ...guestbookEntries
      ]);
      
      setNameInput('');
      setEmailInput('');
      setMessageInput('');
      
      // Show a classic Y2K alert
      alert('✧･ﾟ: *✧･ﾟ:* THANKS FOR SIGNING MY GUESTBOOK! *:･ﾟ✧*:･ﾟ✧\n\nYour message has been immortalized in my pixelated hall of fame!');
    } else {
      alert('ERROR: Name and message required!\n\nHow am I supposed to know who you are and what you want to tell the world?');
    }
  };
  
  // Toggle fake music player
  const toggleMusicPlayer = () => {
    setShowMusicControls(!showMusicControls);
    setIsPlaying(!isPlaying);
  };

  // If terminal mode is selected, render the original LandingPage component
  if (viewMode === 'terminal') {
    return (
      <div className="relative">
        <div className="fixed top-3 md:top-5 right-3 md:right-5 z-50">
          <button 
            onClick={toggleViewMode} 
            className="px-3 py-2 bg-indigo-100 text-indigo-900 font-bold border-2 border-indigo-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            Travel Back to 2001
          </button>
        </div>
        <LandingPage />
      </div>
    );
  }

  // Otherwise, render the ultra-retro version
  return (
    <div className="bg-gradient-to-b from-blue-300 via-purple-300 to-blue-300 min-h-screen font-sans text-blue-900 relative">
      {/* Show "Under Construction" banner occasionally */}
      {showUnderConstruction && (
        <div className="fixed top-20 left-0 right-0 z-50 flex justify-center">
          <div className="bg-yellow-300 border-2 border-black shadow-lg animate-bounce p-2 max-w-md mx-auto text-center">
            <div className="flex items-center justify-center gap-2">
              <img src={fakeGifs.construction} alt="Under Construction" className="h-6" />
              <span className="font-bold text-sm">UNDER CONSTRUCTION! Please excuse our pixels!</span>
              <img src={fakeGifs.construction} alt="Under Construction" className="h-6" />
            </div>
          </div>
        </div>
      )}
      
      {/* Welcome popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 border-4 border-blue-700 rounded shadow-lg p-6 max-w-md mx-4 relative">
            <img src={fakeGifs.new} alt="New!" className="absolute -top-6 -right-6 h-12" />
            
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-blue-800">
                <span className="animate-pulse">★</span> Welcome to my Personal Homepage! <span className="animate-pulse">★</span>
              </h2>
              <button onClick={() => setShowPopup(false)} className="text-gray-700 hover:text-red-600 text-2xl font-bold">&times;</button>
            </div>
            
            <div className="border-2 border-blue-300 bg-blue-50 p-3 mb-4">
              <p className="mb-2 text-sm">You are visitor #<span className="font-bold text-red-600">{hitCounter.toString().padStart(6, '0')}</span> to this site!</p>
              
              <p className="mb-4 text-sm">This site is optimized for Netscape Navigator 4.0 and Internet Explorer 5.5 at 800x600 resolution with 16-bit color. If your monitor isn't making a faint high-pitched noise, you're not getting the full experience.</p>
              
              <p className="mb-4 text-sm italic">Warning: Contains dangerously high levels of sarcasm and nostalgia.</p>
            </div>
            
            <div className="text-center text-sm mb-6">
              <p>Don't forget to sign my guestbook before the Y2K bug erases the internet!</p>
            </div>
            
            <div className="flex justify-center">
              <button 
                onClick={() => setShowPopup(false)}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-1 px-6 rounded border-2 border-blue-800 shadow-md"
              >
                Enter Site
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <div className="fixed top-3 md:top-5 right-3 md:right-5 z-40">
        <button 
          onClick={toggleViewMode} 
          className="px-3 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold border-2 border-blue-800 rounded shadow-md hover:shadow-lg transition-all"
        >
          Time Travel to 2025
        </button>
      </div>

      {/* Music player controls */}
      <div className="fixed bottom-3 md:bottom-5 right-3 md:right-5 z-40">
        <button 
          onClick={toggleMusicPlayer}
          className="px-2 py-1 bg-gradient-to-r from-pink-400 to-purple-500 text-white text-xs font-bold border-2 border-purple-800 rounded shadow-md hover:shadow-lg transition-all flex items-center gap-1"
        >
          {isPlaying ? '■ Stop Music' : '▶ Play Music'}
        </button>
        
        {showMusicControls && (
          <div className="bg-black bg-opacity-80 text-green-400 font-mono text-xs p-2 mt-1 rounded border border-green-500 animate-pulse">
            Now Playing: {currentSong}
          </div>
        )}
      </div>

      {/* Main container */}
      <div className="max-w-5xl mx-auto bg-blue-100 border-l-4 border-r-4 border-blue-700 shadow-2xl">
        {/* Header with animated text */}
        <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white p-6 border-b-4 border-yellow-400 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-20 animate-pulse" style={{backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMTYiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjgiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==')"}}></div>
          
          <div className="relative">
            <h1 className="text-3xl md:text-5xl font-bold mb-2 text-shadow">Mahmoud Ibrahim</h1>
            <div className="text-xl md:text-2xl font-bold italic text-yellow-300 animate-pulse">
              Where Pharmacy Meets Code: Confusing Both Industries Since 2019
            </div>
          </div>
          
          {/* Browser compatibility notice */}
          <div className="mt-4 text-xs bg-black bg-opacity-50 p-1 inline-block">
            Best viewed with <span className="font-bold text-yellow-300">Internet Explorer</span> or <span className="font-bold text-yellow-300">Netscape Navigator</span>
          </div>
        </header>
        
        {/* Menu/Navigation Bar with gel effect buttons */}
        <nav className="bg-gradient-to-r from-blue-800 via-blue-900 to-blue-800 text-white p-2 sticky top-0 z-30 border-b-2 border-yellow-400 shadow-md">
          <marquee scrollamount="3" className="text-yellow-300 text-xs mb-1">
            ★★★ Welcome to my virtual home on the Information Superhighway! ★★★ Breaking news: I survived another Stack Overflow error today! ★★★ Hire me before someone else does! ★★★
          </marquee>
          <ul className="flex flex-wrap justify-around text-center">
            <li className="w-1/3 md:w-auto px-1 py-1">
              <a href="#about" className="block bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-3 py-1 rounded font-bold border border-blue-900 shadow transition-all">ABOUT</a>
            </li>
            <li className="w-1/3 md:w-auto px-1 py-1">
              <a href="#skills" className="block bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-3 py-1 rounded font-bold border border-blue-900 shadow transition-all">SKILLS</a>
            </li>
            <li className="w-1/3 md:w-auto px-1 py-1">
              <a href="#projects" className="block bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-3 py-1 rounded font-bold border border-blue-900 shadow transition-all">PROJECTS</a>
            </li>
            <li className="w-1/3 md:w-auto px-1 py-1">
              <a href="#resume" className="block bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-3 py-1 rounded font-bold border border-blue-900 shadow transition-all">RESUME</a>
            </li>
            <li className="w-1/3 md:w-auto px-1 py-1">
              <a href="#guestbook" className="block bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-3 py-1 rounded font-bold border border-blue-900 shadow transition-all">GUESTBOOK</a>
            </li>
            <li className="w-1/3 md:w-auto px-1 py-1">
              <a href="#contact" className="block bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-3 py-1 rounded font-bold border border-blue-900 shadow transition-all">CONTACT</a>
            </li>
          </ul>
        </nav>
        
        {/* Main content area with left sidebar layout */}
        <div className="flex flex-col md:flex-row">
          {/* Sidebar with animated GIFs and personal info */}
          <aside className="w-full md:w-64 bg-blue-200 p-4 border-r-2 border-blue-400">
            <div className="text-center">
              {/* Profile picture with fancy border effect */}
              <div className="w-40 h-40 mx-auto border-4 border-blue-500 rounded-full overflow-hidden bg-white p-1 mb-4 shadow-lg">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-300 to-purple-300 flex items-center justify-center">
                  <span className="font-bold text-blue-800">PHOTO<br />LOADING...</span>
                </div>
              </div>
              
              <div className="font-bold text-lg text-blue-800 mb-2">Mahmoud Ibrahim</div>
              <div className="bg-yellow-100 border-2 border-yellow-400 rounded p-2 mb-4">
                <div className="font-bold text-sm">Full Stack Engineer</div>
                <div className="italic text-sm mb-2">With Pharmacy Superpowers</div>
                <div className="text-xs italic">
                  "I once fixed a deployment bug and someone's headache in the same Zoom call."
                </div>
              </div>
              
              {/* Hit counter - very 2000s */}
              <div className="mb-4">
                <div className="text-sm font-bold mb-1">Visitor Counter:</div>
                <div className="bg-black text-green-400 font-mono inline-block px-2 py-1 text-sm border border-green-600 animate-pulse">
                  {hitCounter.toString().padStart(6, '0')}
                </div>
              </div>
              
              {/* Animated fire GIF - classic 90s homepage element */}
              <div className="flex justify-center mb-4">
                <img src={fakeGifs.fire} alt="Fire" className="h-6 mx-1" />
                <img src={fakeGifs.fire} alt="Fire" className="h-6 mx-1" />
                <img src={fakeGifs.fire} alt="Fire" className="h-6 mx-1" />
              </div>
              
              {/* Fake awards section */}
              <div className="mb-4">
                <div className="text-sm font-bold mb-1 text-center">™·.¸¸.·★ MY AWARDS ★·.¸¸.·™</div>
                <div className="flex flex-wrap justify-center gap-2">
                  <div className="bg-gradient-to-br from-yellow-200 to-yellow-400 border border-yellow-600 rounded p-1 text-xs text-center shadow-md">
                    <div className="font-bold">COOL SITE</div>
                    <div className="text-[10px]">2023</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-200 to-blue-400 border border-blue-600 rounded p-1 text-xs text-center shadow-md">
                    <div className="font-bold">TOP DEV</div>
                    <div className="text-[10px]">5 STARS</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-200 to-red-400 border border-red-600 rounded p-1 text-xs text-center shadow-md">
                    <div className="font-bold">BEST CODE</div>
                    <div className="text-[10px]">WINNER</div>
                  </div>
                </div>
              </div>
              
              {/* Personal links with button hover effects */}
              <div className="text-sm font-bold mb-2">Quick Links:</div>
              <div className="space-y-2">
                <a 
                  href="mailto:mahmoudahmedxyz@gmail.com" 
                  className="flex items-center justify-center w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white px-2 py-1 rounded text-sm border border-blue-700 transition-all"
                >
                  <img src={fakeGifs.email} alt="Email" className="h-4 mr-1" />
                  Email Me
                </a>
                <a 
                  href="https://mahmoudxyz.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white px-2 py-1 rounded text-sm border border-blue-700 transition-all"
                >
                  🌐 Modern Site
                </a>
              </div>
              
              {/* Blinking text - classic 2000s */}
              <div className="mt-6 text-sm">
                <div className="animate-pulse text-red-600 font-bold">
                  Last updated: May 2, 2025
                </div>
                <div className="text-xs text-purple-700 mt-1">
                  (That's in the future, I'm just that good)
                </div>
              </div>
            </div>
          </aside>
          
          {/* Main Content Area */}
          <main className="flex-1 p-4 bg-white">
            {/* About Section */}
            <section id="about" className="mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 font-bold text-lg rounded-t border-2 border-blue-700 flex items-center">
                <div className="bg-yellow-300 w-4 h-4 rounded-full mr-2"></div>
                ABOUT ME
                <img src={fakeGifs.new} alt="New!" className="h-6 ml-2" />
              </div>
              <div className="border-2 border-t-0 border-blue-700 p-4 rounded-b bg-blue-50 shadow-inner">
                <div className="space-y-4 text-sm">
                  <p>
                    I am a Full Stack Engineer with a background in Pharmacy. Yes, I traded counting pills for 
                    counting semicolons. The pay is better, but both jobs involve dealing with things that 
                    make your head hurt when used incorrectly.
                  </p>
                  <p>
                    I have experience building scalable backend systems using Spring Boot, microservices, 
                    and PostgreSQL, and I also contribute as a Technical Writer at JetBrains Academy. 
                    Basically, I write code that breaks things and then documentation explaining why it's 
                    actually a feature, not a bug.
                  </p>
                  <p>
                    I'm now pursuing a shift into Bioinformatics to combine my scientific foundation 
                    with my software expertise. It's like having two personalities arguing inside my head: 
                    the scientist wondering "how does this work?" and the programmer going "let's break it and find out!"
                  </p>
                  <p className="border-2 border-red-300 bg-red-50 p-2 italic">
                    Books and computers shaped my childhood. While most kids in my Egyptian hometown
                    played soccer, I tinkered with programs and devoured science books. This explains why I now have 
                    the muscle tone of a jellyfish and social skills of a compiler error message.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Skills Section */}
            <section id="skills" className="mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 font-bold text-lg rounded-t border-2 border-blue-700 flex items-center">
                <div className="bg-yellow-300 w-4 h-4 rounded-full mr-2"></div>
                TECHNICAL SKILLS (AND OTHER MAGIC TRICKS)
              </div>
              <div className="border-2 border-t-0 border-blue-700 p-4 rounded-b bg-blue-50 shadow-inner">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded border-2 border-blue-300 shadow p-3 relative">
                    <div className="absolute -top-3 -right-3 animate-pulse">
                      <img src={fakeGifs.fire} alt="Fire" className="h-6" />
                    </div>
                    <div className="bg-blue-600 text-white font-bold p-1 text-center rounded mb-2">BACKEND WIZARDRY</div>
                    <div className="text-sm">
                      <p>Spring Boot, RESTful APIs, Microservices, PostgreSQL, Java, Kotlin, API Design</p>
                      <p className="text-xs italic mt-2 text-blue-800">* I make servers do my bidding until 3 AM when they inevitably rebel.</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded border-2 border-blue-300 shadow p-3">
                    <div className="bg-blue-600 text-white font-bold p-1 text-center rounded mb-2">FRONTEND SORCERY</div>
                    <div className="text-sm">
                      <p>JavaScript, TypeScript, React.js, NextJS, Tailwind CSS, HTML5</p>
                      <p className="text-xs italic mt-2 text-blue-800">* This site intentionally looks like this. I could make it prettier, but where's the nostalgia in that?</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded border-2 border-blue-300 shadow p-3">
                    <div className="bg-blue-600 text-white font-bold p-1 text-center rounded mb-2">PHARMACY SUPERPOWERS</div>
                    <div className="text-sm">
                      <p>Clinical Pharmacy, Molecular Biology, Biochemistry, Pharmaceutical Analysis</p>
                      <p className="text-xs italic mt-2 text-blue-800">* I can read doctors' handwriting AND interpret regex. Fear my power.</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded border-2 border-blue-300 shadow p-3">
                    <div className="bg-blue-600 text-white font-bold p-1 text-center rounded mb-2">TECHNICAL WRITING</div>
                    <div className="text-sm">
                      <p>Educational Content Creation, Documentation, Tutorials, Hands-on Topics</p>
                      <p className="text-xs italic mt-2 text-blue-800">* I translate developer gibberish into slightly more understandable gibberish.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-yellow-100 border-2 border-yellow-400 p-2 text-center text-sm">
                  <p className="font-bold">SPECIAL SKILL: Debugging</p>
                  <p className="text-xs italic">I stare at errors until they apologize and fix themselves out of shame.</p>
                </div>
              </div>
            </section>
            
            {/* Projects Section */}
            <section id="projects" className="mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 font-bold text-lg rounded-t border-2 border-blue-700 flex items-center">
                <div className="bg-yellow-300 w-4 h-4 rounded-full mr-2"></div>
                FEATURED PROJECT: STUFF I CODED INSTEAD OF SLEEPING
              </div>
              <div className="border-2 border-t-0 border-blue-700 p-4 rounded-b bg-blue-50 shadow-inner">
                <div className="bg-white rounded border-2 border-blue-300 shadow">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold p-2 flex justify-between items-center rounded-t">
                    <div className="flex items-center">
                      <div className="animate-pulse text-yellow-300 mr-2">★</div>
                      GenBankinator 3000
                      <div className="animate-pulse text-yellow-300 ml-2">★</div>
                    </div>
                    <a 
                      href="https://genbankinator.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 text-xs px-2 py-1 rounded font-bold border border-yellow-600 transition-all"
                    >
                      CLICK TO VISIT
                    </a>
                  </div>
                  <div className="p-4">
                    <div className="text-sm mb-4">
                      <p>Convert your FASTA sequence and annotation files to the GenBank format with our easy-to-use tool.</p>
                      <p className="italic text-xs mt-2 text-blue-800">Because spending 40 hours coding a tool to save 20 minutes of manual work is the software engineer way.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-blue-100 p-3 border border-blue-300 rounded shadow-inner">
                        <h4 className="font-bold text-sm mb-2 text-blue-800">Convert to GenBank</h4>
                        <p className="text-sm">Upload your files to convert them to GenBank format. It's like Google Translate, but for genes instead of human languages.</p>
                      </div>
                      <div className="bg-blue-100 p-3 border border-blue-300 rounded shadow-inner">
                        <h4 className="font-bold text-sm mb-2 text-blue-800">Show My Files</h4>
                        <p className="text-sm">View and manage your uploaded files and conversions. Like Dropbox for biologists who haven't discovered Dropbox yet.</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-xs text-gray-600 font-italic border-t border-gray-300 pt-2">
                      <b>Tech Stack:</b> JavaScript, NextJS, Bioinformatics APIs, and a concerning amount of caffeine
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-green-100 border border-green-400 rounded p-2">
                  <div className="flex items-center mb-1">
                    <img src={fakeGifs.new} alt="New!" className="h-6 mr-2" />
                    <span className="font-bold text-sm text-green-800">PROJECT UPDATE:</span>
                  </div>
                  <p className="text-xs">
                    I'm currently working on Version 2.0, which will convert your genetic sequences AND tell you if 
                    they contain any embarrassing mutations. Your DNA deserves privacy too!
                  </p>
                </div>
              </div>
            </section>
            
            {/* Experience Section */}
            <section id="resume" className="mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 font-bold text-lg rounded-t border-2 border-blue-700 flex items-center">
                <div className="bg-yellow-300 w-4 h-4 rounded-full mr-2"></div>
                MY PROFESSIONAL JOURNEY
              </div>
              <div className="border-2 border-t-0 border-blue-700 p-4 rounded-b bg-blue-50 shadow-inner">
                {/* Job 1 */}
                <div className="bg-white rounded border-2 border-blue-300 shadow mb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold p-2 rounded-t flex justify-between">
                    <div>Software Developer</div>
                    <div>N2N</div>
                  </div>
                  <div className="p-3">
                    <div className="text-xs text-gray-600 mb-2 italic">Current Position</div>
                    <div className="text-sm">
                      At N2NLab, I reduced integration time through automated workflows and secure architectures. 
                      I'm experienced in RESTful APIs, microservices, and PostgreSQL - which basically means I 
                      can make computers talk to each other in ways they'd rather not. 
                      <span className="italic block mt-2">Key Achievement: Convinced management that "it works on my machine" is a valid deployment strategy.</span>
                    </div>
                  </div>
                </div>
                
                {/* Job 2 */}
                <div className="bg-white rounded border-2 border-blue-300 shadow mb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold p-2 rounded-t flex justify-between">
                    <div>Writer</div>
                    <div>JetBrains Academy</div>
                  </div>
                  <div className="p-3">
                    <div className="text-xs text-gray-600 mb-2 italic">08/2022 – 12/2023</div>
                    <div className="text-sm">
                      Created high-quality learning content for Kotlin, Java, and backend development tracks, 
                      helping thousands of learners build real-world programming skills. I explained complex topics 
                      like annotations, lambda expressions, and Spring dependency injection so clearly that students 
                      occasionally understood them.
                      <span className="italic block mt-2">Key Achievement: Wrote documentation that people actually read. Yes, this is rare enough to be an achievement.</span>
                    </div>
                  </div>
                </div>
                
                {/* Education */}
                <div className="bg-white rounded border-2 border-blue-300 shadow">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold p-2 rounded-t flex justify-between">
                    <div>Bachelor of Pharmacy – Clinical Pharmacy</div>
                    <div>Kafrelsheikh University</div>
                  </div>
                  <div className="p-3">
                    <div className="text-xs text-gray-600 mb-2 italic">10/2019 – Current</div>
                    <div className="text-sm">
                      Pursuing a Bachelor of Pharmacy degree while simultaneously building a career in software 
                      development. I basically took "work hard, play hard" and replaced "play" with "more work."
                      <span className="italic block mt-2">Fun Fact: I can recite drug interactions in my sleep, which makes for extremely boring sleep-talking.</span>
                    </div>
                  </div>
                </div>
                
                {/* Fake animated "Hire me" banner */}
                <div className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 p-2 text-white text-center rounded shadow-lg border-2 border-purple-800">
                  <div className="animate-pulse font-bold">
                    ⚡ HIRE ME BEFORE I BECOME TOO EXPENSIVE ⚡
                  </div>
                  <div className="text-xs mt-1">
                    (My rates increase with every Stack Overflow answer I read)
                  </div>
                </div>
              </div>
            </section>
            
            {/* Guestbook Section - very 2000s */}
            <section id="guestbook" className="mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 font-bold text-lg rounded-t border-2 border-blue-700 flex items-center">
                <div className="bg-yellow-300 w-4 h-4 rounded-full mr-2"></div>
                SIGN MY GUESTBOOK
              </div>
              <div className="border-2 border-t-0 border-blue-700 p-4 rounded-b bg-blue-50 shadow-inner">
                <div className="text-sm mb-4">
                  Please leave a message! It's like Twitter but without the algorithms or character limits or... well, it's actually nothing like Twitter.
                </div>
                
                {/* Guestbook entry form */}
                <div className="bg-white rounded border-2 border-blue-300 shadow p-3 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-xs font-bold mb-1 text-blue-800">Your Name:</label>
                      <input 
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="w-full border border-blue-400 p-1 text-sm rounded" 
                        placeholder="John Doe (or Anonymous Coward)"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1 text-blue-800">Your Email (not displayed):</label>
                      <input 
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full border border-blue-400 p-1 text-sm rounded" 
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="block text-xs font-bold mb-1 text-blue-800">Your Message:</label>
                    <textarea 
                      rows="3"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="w-full border border-blue-400 p-1 text-sm rounded"
                      placeholder="Say something nice (or at least entertaining)..."
                    ></textarea>
                  </div>
                  <div className="flex justify-center">
                    <button 
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-1 px-6 rounded border border-blue-800 shadow transition-all animate-pulse"
                    >
                      Sign Guestbook
                    </button>
                  </div>
                </div>
                
                {/* Guestbook entries */}
                <div>
                  <div className="text-xs font-bold mb-2 text-blue-800 flex items-center">
                    <img src={fakeGifs.new} alt="New!" className="h-6 mr-1" />
                    RECENT ENTRIES:
                  </div>
                  {guestbookEntries.map((entry, index) => (
                    <div key={index} className="bg-white rounded border border-blue-300 shadow p-2 mb-2">
                      <div className="flex justify-between items-center border-b border-gray-200 pb-1 mb-1">
                        <div className="font-bold text-sm">{entry.name}</div>
                        <div className="text-xs text-gray-600">{entry.date}</div>
                      </div>
                      <div className="text-sm">{entry.message}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Contact Section */}
            <section id="contact" className="mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 font-bold text-lg rounded-t border-2 border-blue-700 flex items-center">
                <div className="bg-yellow-300 w-4 h-4 rounded-full mr-2"></div>
                CONTACT INFORMATION
              </div>
              <div className="border-2 border-t-0 border-blue-700 p-4 rounded-b bg-blue-50 shadow-inner">
                <div className="bg-white rounded border-2 border-blue-300 shadow p-3">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr>
                        <td className="font-bold text-blue-800 pr-4 py-2 border-b border-blue-100 w-1/4">Email:</td>
                        <td className="py-2 border-b border-blue-100">
                          <a href="mailto:mahmoudahmedxyz@gmail.com" className="text-blue-600 hover:underline">
                            mahmoudahmedxyz@gmail.com
                          </a>
                          <div className="text-xs text-gray-500 italic">Response time: Faster than pharmacy school grades, slower than caffeine absorption</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold text-blue-800 pr-4 py-2 border-b border-blue-100">Phone:</td>
                        <td className="py-2 border-b border-blue-100">
                          <a href="tel:+201090227505" className="text-blue-600 hover:underline">
                            (+20) 01090227505
                          </a>
                          <div className="text-xs text-gray-500 italic">Warning: May answer with "Have you tried turning it off and on again?"</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold text-blue-800 pr-4 py-2 border-b border-blue-100">Website:</td>
                        <td className="py-2 border-b border-blue-100">
                          <a href="https://mahmoudxyz.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            https://mahmoudxyz.vercel.app/
                          </a>
                          <div className="text-xs text-gray-500 italic">My modern site that doesn't cause eye strain</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold text-blue-800 pr-4 py-2">Location:</td>
                        <td className="py-2">
                          Kafr Elshikh, Egypt
                          <div className="text-xs text-gray-600 italic mt-1">
                            (Yes, my WiFi signal is surprisingly reliable for a place you've never heard of)
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 text-center">
                  <img src={fakeGifs.divider} alt="Divider" className="h-4 w-full object-fill" />
                  <div className="my-3 text-sm italic">
                    "The easiest way to reach me is email. The hardest way is carrier pigeon, though I've received 
                    exactly one message that way and it was just a bird looking for breadcrumbs."
                  </div>
                  <img src={fakeGifs.divider} alt="Divider" className="h-4 w-full object-fill" />
                </div>
              </div>
            </section>
            
            {/* Fun rotating webring - classic 90s/2000s */}
            <div className="mt-12 mb-8 flex justify-center">
              <div className="px-8 py-2 bg-blue-100 border-2 border-blue-400 rounded-full shadow flex items-center justify-between w-full max-w-md">
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  ◀ Prev
                </a>
                <div className="text-center">
                  <div className="text-xs font-bold text-blue-800">BIOINFORMATICS WEBRING</div>
                  <div className="text-xs text-gray-600">Site 42 of 69</div>
                </div>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Next ▶
                </a>
              </div>
            </div>
            
            {/* Footer */}
            <footer className="mt-8 pt-4 border-t-2 border-blue-300 text-center">
              <div className="flex justify-center space-x-4 mb-4">
                <a href="#top" className="text-blue-600 hover:text-blue-800 underline text-sm">Back to Top</a>
                <span className="text-blue-400">|</span>
                <a href="mailto:mahmoudahmedxyz@gmail.com" className="text-blue-600 hover:text-blue-800 underline text-sm">Email Me</a>
                <span className="text-blue-400">|</span>
                <a href="#guestbook" className="text-blue-600 hover:text-blue-800 underline text-sm">Sign Guestbook</a>
              </div>
              
              {/* Late 90s disclaimers and badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-3">
                <div className="bg-blue-900 text-white text-xs px-2 py-1 rounded border border-blue-700">Valid HTML 4.01</div>
                <div className="bg-red-900 text-white text-xs px-2 py-1 rounded border border-red-700">Made with Notepad</div>
                <div className="bg-green-900 text-white text-xs px-2 py-1 rounded border border-green-700">Y2K Compliant</div>
                <div className="bg-purple-900 text-white text-xs px-2 py-1 rounded border border-purple-700">640K Memory</div>
              </div>
              
              <div className="text-xs text-gray-600 space-y-1">
                <p>Copyright © 2024 Mahmoud Ibrahim | No rights reserved because I don't understand copyright law</p>
                <p className="flex items-center justify-center gap-2">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAA7VBMVEUAAACAgID/AABVVVVgYGBVVVVmZmZdXV1iYmJmZmZeXl5jY2NhYWFjY2NhYWFiYmJgYGBiYmJhYWFhYWFgYGBhYWFhYWFgYGBgYGBgYGBgYGBgYGBfX19gYGBgYGBgYGBgYGBgYGBgYGBfX19gYGBfX19fX19fX19gYGBgYGBgYGBfX19fX19fX19fX19fX19gYGBfX19gYGBfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX1+VJRF2AAAATnRSTlMAAQIDBAUGBwgJCgwNDhESExUWGRobHR4gIiQoMDI1Njg6PD5AQkhMUFJWWGBiZGhsbnZ4en2AgoiKjJCSlJicnqCkpqius7W5vcHDz9Pb+0VPAAAApklEQVQYGQXBzSuDAQCA8eexKXOwmSZepa1JiVJKUpI0ysd/7+Tg4OB3p6cHiMbjUTzAzrdD7VbP+mZhIRqNqmSyxnra4mZfJJFI/Mql+VZndy+9uR/xN8/jK5vcy+VkdKgd9fo9dVcGGjYa8uc62nU3T28+lDRzUJeKFaWy1bSWJQ9SVz3nMoWU1qSWyKKL9D9OQkevJ33VNQqj349P+sPR8JfD6A8q4h5MInByZAAAAABJRU5ErkJggg==" alt="Web safe" className="h-4" />
                  <span>This site is best viewed with your sense of humor turned all the way up</span>
                </p>
                <p className="text-xs text-gray-500 mt-2">Made with HTML tables and far too many nostalgic tears</p>
                <p className="text-xs text-blue-800 mt-4 italic">
                  "I used to be a pharmacist like you, then I took a JavaScript framework to the knee."
                </p>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}

export default RetroPortfolio;