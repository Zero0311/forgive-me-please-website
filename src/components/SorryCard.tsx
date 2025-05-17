
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Smile } from 'lucide-react';

const SorryCard: React.FC = () => {
  const [moveCount, setMoveCount] = useState(0);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  // Handle Yes button click
  const handleYesClick = () => {
    navigate('/thank-you');
  };

  // Handle No button hover
  const handleNoHover = () => {
    if (moveCount < 5) {
      // Move button to a random position within the viewport
      const maxX = window.innerWidth - 150;
      const maxY = window.innerHeight - 100;
      const newX = Math.max(50, Math.floor(Math.random() * maxX));
      const newY = Math.max(50, Math.floor(Math.random() * maxY));
      
      setNoButtonPosition({ x: newX, y: newY });
      setMoveCount(moveCount + 1);
    } else {
      // After 5 moves, make the button shake instead
      if (noButtonRef.current) {
        noButtonRef.current.classList.add('animate-shake');
        setTimeout(() => {
          if (noButtonRef.current) {
            noButtonRef.current.classList.remove('animate-shake');
          }
        }, 800);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <Card className="w-[350px] md:w-[450px] shadow-lg border-2 border-primary/20">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Smile className="h-8 w-8 text-primary animate-heartbeat" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary">I'm Sorry!</CardTitle>
          <CardDescription className="text-lg mt-2">
            Will you find it in your heart to forgive me?
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-6">
          <p className="text-muted-foreground">
            I know I messed up, and I truly regret it. 
            Your forgiveness would mean the world to me.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button 
            className="w-full bg-primary hover:bg-primary/80 text-white font-semibold py-6 text-lg"
            onClick={handleYesClick}
          >
            Yes, I forgive you
          </Button>
          
          <Button
            ref={noButtonRef}
            className="w-full bg-destructive hover:bg-destructive/80 text-white font-semibold py-6 text-lg"
            style={moveCount > 0 ? {
              position: 'fixed',
              left: `${noButtonPosition.x}px`,
              top: `${noButtonPosition.y}px`,
              zIndex: 50
            } : {}}
            onMouseEnter={handleNoHover}
          >
            No, I don't
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SorryCard;
