import React, { useState } from "react";
import { Share, Link as LinkIcon, Twitter, Facebook, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const ShareButton = ({ post }) => {
  const shareUrl = window.location.href;
  const [copied, setCopied] = useState(false);
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Error copying link:', err);
    }
  };

  const handleShare = async (platform) => {
    const shareData = {
      title: post.title,
      text: post.description,
      url: shareUrl,
    };

    switch (platform) {
      case 'native':
        if (navigator.share) {
          try {
            await navigator.share(shareData);
          } catch (err) {
            console.error('Error sharing:', err);
          }
        }
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            post.title
          )}&url=${encodeURIComponent(shareUrl)}`,
          '_blank'
        );
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`,
          '_blank'
        );
        break;
      default:
        break;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <Share className="w-4 h-4" />
          Share
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <div className="space-y-2">
          {navigator.share && (
            <button
              onClick={() => handleShare('native')}
              className="w-full flex items-center gap-2 p-2 hover:bg-muted rounded-lg"
            >
              <Share className="w-4 h-4" />
              Share
            </button>
          )}
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center gap-2 p-2 hover:bg-muted rounded-lg"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-green-500">Copied!</span>
              </>
            ) : (
              <>
                <LinkIcon className="w-4 h-4" />
                Copy link
              </>
            )}
          </button>
          <button
            onClick={() => handleShare('twitter')}
            className="w-full flex items-center gap-2 p-2 hover:bg-muted rounded-lg"
          >
            <Twitter className="w-4 h-4" />
            Twitter
          </button>
          <button
            onClick={() => handleShare('facebook')}
            className="w-full flex items-center gap-2 p-2 hover:bg-muted rounded-lg"
          >
            <Facebook className="w-4 h-4" />
            Facebook
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ShareButton;