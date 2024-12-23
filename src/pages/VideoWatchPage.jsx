import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  Share2,
  Link,
  Loader2,
  Forward,
  Rewind,
  RotateCcw,
  EyeOff,
  Eye,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const VideoWatchPage = () => {
  // State management
  const [videoUrl, setVideoUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [error, setError] = useState('');
  const [isBuffering, setIsBuffering] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [loadedProgress, setLoadedProgress] = useState(0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Mobile-specific states
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const [touchStartTime, setTouchStartTime] = useState(null);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [seekValue, setSeekValue] = useState(null);
  const [seekDirection, setSeekDirection] = useState(null);
  const [isSeeking, setIsSeeking] = useState(false);

  // Refs
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const seekTimeoutRef = useRef(null);
  const longPressTimeoutRef = useRef(null);

  // Constants
  const SKIP_SECONDS = 10;
  const SPEED_OPTIONS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const DOUBLE_TAP_DELAY = 300;
  const SWIPE_THRESHOLD = 30;
  const CONTROLS_HIDE_DELAY = 2000; // Reduced to 2 seconds
  const LONG_PRESS_DELAY = 500;

  // Cleanup effect
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  // Orientation change handler
  useEffect(() => {
    const handleOrientationChange = () => {
      setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
    handleOrientationChange();

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  // Fullscreen change handler
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      if (document.fullscreenElement) {
        screen.orientation.lock('landscape').catch(() => {
          // Silently handle failure - not all browsers support this
        });
      } else {
        screen.orientation.unlock().catch(() => {
          // Silently handle failure
        });
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Clear all timeouts
  const clearAllTimeouts = () => {
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (seekTimeoutRef.current) clearTimeout(seekTimeoutRef.current);
    if (longPressTimeoutRef.current) clearTimeout(longPressTimeoutRef.current);
  };

  // URL validation and handling
  const extractVideoUrl = (input) => {
    const videoExtensions = /\.(mp4|webm|ogg|m4v)$/i;
    if (videoExtensions.test(input)) return input;
    const sourceMatch = input.match(/src="([^"]+\.(mp4|webm|ogg|m4v))/i);
    return sourceMatch ? sourceMatch[1] : null;
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    try {
      const extractedUrl = extractVideoUrl(videoUrl);
      if (extractedUrl) {
        setVideoUrl(extractedUrl);
        setIsValidUrl(true);
        setError('');
        resetPlayerState();
      } else {
        throw new Error('Invalid video source');
      }
    } catch (err) {
      setError('Please enter a valid video URL or HTML');
      setIsValidUrl(false);
    }
  };

  const resetPlayerState = () => {
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(false);
    setIsBuffering(true);
    setShowControls(true);
    setShowSpeedMenu(false);
    setShowVolumeSlider(false);
  };

  // Time formatting
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return hours > 0
      ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      : `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    if (e.target.closest('.control-button')) return;
    
    const touch = e.touches[0];
    setTouchStartX(touch.clientX);
    setTouchStartY(touch.clientY);
    setTouchStartTime(Date.now());
    setIsSeeking(false);

    longPressTimeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(true);
    }, LONG_PRESS_DELAY);

    showControlsTemporarily();
  };

  const handleTouchMove = (e) => {
    if (!touchStartX || e.target.closest('.control-button')) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    // Clear long press timeout if movement detected
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }

    // Handle horizontal swipe for seeking
    if (Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(deltaY) < SWIPE_THRESHOLD) {
      setIsSeeking(true);
      const seekTime = (deltaX / window.innerWidth) * duration * 0.5;
      setSeekValue(Math.max(0, Math.min(duration, currentTime + seekTime)));
      setSeekDirection(deltaX > 0 ? 'forward' : 'backward');
    }

    // Handle vertical swipe for volume
    if (Math.abs(deltaY) > SWIPE_THRESHOLD && Math.abs(deltaX) < SWIPE_THRESHOLD && !isSeeking) {
      const newVolume = Math.max(0, Math.min(1, volume - (deltaY / window.innerHeight)));
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
      if (videoRef.current) videoRef.current.volume = newVolume;
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX || e.target.closest('.control-button')) return;

    clearTimeout(longPressTimeoutRef.current);

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    const touchDuration = Date.now() - touchStartTime;

    // Handle tap
    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && touchDuration < 200) {
      const currentTime = Date.now();
      const tapPosition = touch.clientX;
      const screenWidth = window.innerWidth;

      if (currentTime - lastTapTime < DOUBLE_TAP_DELAY) {
        // Double tap
        handleSkip(tapPosition < screenWidth / 2 ? -SKIP_SECONDS : SKIP_SECONDS);
      } else {
        // Single tap
        togglePlay();
      }
      setLastTapTime(currentTime);
    }

    // Apply seek if was seeking
    if (isSeeking && seekValue !== null) {
      if (videoRef.current) {
        videoRef.current.currentTime = seekValue;
      }
    }

    // Reset states
    setTouchStartX(null);
    setTouchStartY(null);
    setTouchStartTime(null);
    setIsSeeking(false);
    setSeekValue(null);
    setSeekDirection(null);
    setShowVolumeSlider(false);
  };

  // Video control handlers
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      showControlsTemporarily();
    }
  };

  const handleSkip = (seconds) => {
    if (videoRef.current) {
      const newTime = videoRef.current.currentTime + seconds;
      videoRef.current.currentTime = Math.max(0, Math.min(newTime, duration));
      showControlsTemporarily();
      
      setSeekDirection(seconds > 0 ? 'forward' : 'backward');
      setTimeout(() => setSeekDirection(null), 500);
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await playerRef.current.requestFullscreen();
        if (window.screen.orientation) {
          await window.screen.orientation.lock('landscape');
        }
      } else {
        await document.exitFullscreen();
        if (window.screen.orientation) {
          await window.screen.orientation.unlock();
        }
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
    showControlsTemporarily();
  };

  const [hideControls, setHideControls] = useState(false);  // New state for manual control hiding
const [autoHideControls, setAutoHideControls] = useState(true);  // State for auto-hide behavior

// Modified control visibility logic
const areControlsVisible = () => {
  if (hideControls) return false;
  if (!autoHideControls) return true;
  return showControls;
};

const toggleControlsVisibility = () => {
  setHideControls(!hideControls);
  setAutoHideControls(false);
  if (hideControls) {
    // When showing controls, also show them temporarily
    setShowControls(true);
  }
};

const showControlsTemporarily = () => {
  if (hideControls) return; // Don't show if manually hidden
  
  setShowControls(true);
  if (controlsTimeoutRef.current) {
    clearTimeout(controlsTimeoutRef.current);
  }
  
  if (isPlaying && autoHideControls) {
    controlsTimeoutRef.current = setTimeout(() => {
      if (!isHovering && !showSpeedMenu && !showVolumeSlider && !isBuffering) {
        setShowControls(false);
      }
    }, CONTROLS_HIDE_DELAY);
  }
};

  // Effect to hide controls when video starts playing
  useEffect(() => {
    if (isPlaying) {
      showControlsTemporarily();
    } else {
      setShowControls(true);
    }
  }, [isPlaying]);

  // Effect to show controls when buffering
  useEffect(() => {
    if (isBuffering) {
      setShowControls(true);
    } else if (isPlaying) {
      showControlsTemporarily();
    }
  }, [isBuffering]);

  // Video event handlers
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsBuffering(false);
    }
  };

  const handleSeek = (e) => {
    const time = (e.target.value / 100) * duration;
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
    showControlsTemporarily();
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (videoRef.current) videoRef.current.volume = newVolume;
  };

  return (
    <div className="min-h-screen bg-black py-4 px-2 sm:py-8 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* URL Input */}
        <Card className="mb-4 p-4">
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="videoUrl" className="text-lg font-medium">
                Enter Video URL
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  id="videoUrl"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Enter video URL or paste HTML"
                  className="flex-1 p-3 rounded-lg border border-input bg-background"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Link className="h-4 w-4" />
                  Load Video
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </Card>

        {/* Video Player */}
        <div
          ref={playerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 bg-black z-50' : ''}`}
        >
          <div 
            ref={containerRef}
            className={`relative group rounded-xl overflow-hidden bg-black ${
              !isValidUrl ? 'hidden' : ''
            } ${isFullscreen ? 'h-screen w-screen' : ''}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <video
              ref={videoRef}
              className={`w-full ${isFullscreen ? 'h-full object-contain' : 'aspect-video'}`}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onWaiting={() => setIsBuffering(true)}
              onPlaying={() => setIsBuffering(false)}
              src={videoUrl}
              playsInline
              controlsList="nodownload"
            />

            {/* Seek Indicator */}
            {seekDirection && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white rounded-lg p-4 flex items-center gap-2">
                {seekDirection === 'forward' ? (
                  <Forward className="h-6 w-6" />
                ) : (
                  <Rewind className="h-6 w-6" />
                )}
                {isSeeking && seekValue !== null && (
                  <span>{formatTime(seekValue)}</span>
                )}
              </div>
            )}

            {/* Mobile Instructions Overlay */}
            {isValidUrl && !isPlaying && !isBuffering && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-center p-4">
                <div className="space-y-4">
                  <Play className="h-12 w-12 mx-auto" />
                  <div className="space-y-2 text-sm">
                    <p>• Tap to play/pause</p>
                    <p>• Double tap sides to seek ±{SKIP_SECONDS}s</p>
                    <p>• Swipe horizontally to seek</p>
                    <p>• Swipe vertically for volume</p>
                  </div>
                </div>
              </div>
            )}

            {/* Buffering Indicator */}
            {isBuffering && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="bg-black/80 rounded-lg p-4 flex items-center gap-3">
                  <Loader2 className="animate-spin h-6 w-6 text-white" />
                  <span className="text-white">Loading...</span>
                </div>
              </div>
            )}

            {/* Floating Show Controls Button (Only in Fullscreen when controls are hidden) */}
            {isFullscreen && !showControls && (
              <button
                onClick={() => setShowControls(true)}
                className="absolute top-4 right-4 text-white/50 hover:text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition-all"
              >
                <Eye className="h-6 w-6" />
              </button>
            )}

            {/* Video Controls */}
            <div 
              className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent pt-20 pb-2 px-4 transition-all duration-300 ${
                areControlsVisible() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
              }`}
            >
              {/* Progress Bar */}
              <div className="mb-4 relative">
                <div 
                  className="absolute h-1.5 bg-gray-600 rounded-lg"
                  style={{ width: `${loadedProgress}%` }}
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress || 0}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-transparent appearance-none cursor-pointer relative z-10"
                  style={{
                    background: `linear-gradient(to right, rgb(var(--primary)) 0%, rgb(var(--primary)) ${progress}%, transparent ${progress}%, transparent 100%)`
                  }}
                />
                <div className="flex justify-between text-white text-xs mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls Bar */}
              <div className="flex items-center justify-between gap-4">
                {/* Left Controls */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    className="control-button text-white p-2 rounded-full hover:bg-white/10"
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6" />
                    )}
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                      className="control-button text-white p-2 rounded-full hover:bg-white/10"
                    >
                      {volume === 0 ? (
                        <VolumeX className="h-6 w-6" />
                      ) : (
                        <Volume2 className="h-6 w-6" />
                      )}
                    </button>

                    {showVolumeSlider && (
                      <div className="absolute bottom-full left-0 mb-2 bg-black/90 p-4 rounded-lg rotate-0">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-32 h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <button
                      onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                      className="control-button text-white px-3 py-1 rounded hover:bg-white/10 text-sm"
                    >
                      {playbackSpeed}x
                    </button>

                    {showSpeedMenu && (
                      <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg overflow-hidden">
                        {SPEED_OPTIONS.map((speed) => (
                          <button
                            key={speed}
                            onClick={() => {
                              if (videoRef.current) {
                                videoRef.current.playbackRate = speed;
                                setPlaybackSpeed(speed);
                                setShowSpeedMenu(false);
                              }
                            }}
                            className={`block w-full px-4 py-2 text-sm text-left hover:bg-white/10 ${
                              playbackSpeed === speed ? 'text-primary' : 'text-white'
                            }`}
                          >
                            {speed}x
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={toggleFullscreen}
                    className="control-button text-white p-2 rounded-full hover:bg-white/10"
                  >
                    {isFullscreen ? (
                      <Minimize className="h-6 w-6" />
                    ) : (
                      <Maximize className="h-6 w-6" />
                    )}
                  </button>

                  {/* Manual Control Toggle (Only in Fullscreen) */}
                  {isFullscreen && (
                    <button
                      onClick={toggleControlsVisibility}
                      className="control-button text-white p-2 rounded-full hover:bg-white/10"
                      title={hideControls ? "Show controls" : "Hide controls"}
                    >
                      {hideControls ? (
                        <Eye className="h-6 w-6" />
                      ) : (
                        <EyeOff className="h-6 w-6" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* No Video Placeholder */}
        {!isValidUrl && (
          <div className="aspect-video rounded-xl bg-muted flex items-center justify-center p-4">
            <div className="text-center">
              <Link className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-base text-muted-foreground">
                Enter a video URL or paste HTML above
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Supports MP4, WebM, OGG, and M4V
              </p>
            </div>
          </div>
        )}

        {/* Video Info Card */}
        {isValidUrl && !isFullscreen && (
          <Card className="mt-4 p-4">
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-xl font-bold mb-2">
                  Video Player
                </h1>
                <div className="space-y-2">
                  <p className="text-muted-foreground break-all text-sm">
                    Source: {videoUrl}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Duration: {formatTime(duration)} • Speed: {playbackSpeed}x
                  </p>
                </div>
              </div>

              {/* Mobile Controls Guide */}
              <div className="p-4 bg-muted rounded-lg">
                <h2 className="font-medium mb-2">Touch Controls</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Tap to play/pause</li>
                  <li>• Double tap sides to skip ±{SKIP_SECONDS}s</li>
                  <li>• Swipe horizontally to seek</li>
                  <li>• Swipe vertically for volume</li>
                  <li>• Press and hold for volume slider</li>
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VideoWatchPage;