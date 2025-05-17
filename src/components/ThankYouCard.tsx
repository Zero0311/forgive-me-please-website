
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const ThankYouCard: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Create audio element for the happy sound
    audioRef.current = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3');
    
    // Play the sound when component mounts
    const playSound = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
        }
      } catch (error) {
        console.error("Audio playback failed:", error);
      }
    };
    
    playSound();
    
    // Clean up audio when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <Card className="w-[350px] md:w-[450px] shadow-lg border-2 border-green-200 animate-float">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Check className="h-8 w-8 text-green-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-green-600">Thank You!</CardTitle>
          <CardDescription className="text-lg mt-2">
            Your forgiveness means everything
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-6">
          <p className="text-muted-foreground">
            I promise to do better from now on. Thank you for giving me another chance.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            className="bg-green-600 hover:bg-green-500 text-white font-semibold"
            onClick={() => navigate('/')}
          >
            Back Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ThankYouCard;
