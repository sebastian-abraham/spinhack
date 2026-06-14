"use client";

import { useState } from 'react';

const TOPICS = [
  'Artificial Intelligence',
  'Web3 & Blockchain',
  'FinTech',
  'HealthTech',
  'EdTech',
  'Cybersecurity',
  'IoT & Smart Devices',
  'GreenTech'
];

const colors = ['#ff007f', '#9d00ff', '#00f3ff', '#ff007f', '#9d00ff', '#00f3ff', '#ff007f', '#9d00ff'];

interface SpinWheelProps {
  onSpinComplete: (topic: string) => void;
  appNumber: string;
}

export default function SpinWheel({ onSpinComplete, appNumber }: SpinWheelProps) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [error, setError] = useState('');
  
  const spin = async () => {
    if (spinning) return;
    setSpinning(true);
    setError('');

    try {
      const res = await fetch('/api/spin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ app_number: appNumber }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Spin failed');
        setSpinning(false);
        return;
      }

      const targetTopic = data.topic;
      const targetIndex = TOPICS.indexOf(targetTopic);
      
      if (targetIndex === -1) {
          setError('Unknown topic received');
          setSpinning(false);
          return;
      }

      const sliceAngle = 360 / TOPICS.length;
      // We want the center of the target slice to be at 0deg (top).
      // Since conic-gradient starts at 0deg (top), the slice starts at targetIndex * sliceAngle.
      // Its center is at targetIndex * sliceAngle + sliceAngle / 2.
      const sliceCenter = targetIndex * sliceAngle + sliceAngle / 2;
      
      // To bring it to top (0deg), we must rotate backwards by that amount.
      // But we can also just use 360 - sliceCenter to get a positive rotation.
      const targetAngle = 360 - sliceCenter;
      
      // Add extra spins (5 full spins)
      const extraSpins = 360 * 5;
      
      // Add a tiny random offset to avoid landing perfectly on a border
      const randomOffset = Math.floor(Math.random() * (sliceAngle - 10)) - (sliceAngle / 2 - 5);
      
      const newRotation = rotation + extraSpins + targetAngle - (rotation % 360) + randomOffset;

      setRotation(newRotation);

      // Wait for animation to finish
      setTimeout(() => {
        setSpinning(false);
        onSpinComplete(targetTopic);
      }, 5000);

    } catch (err) {
      setError('Network error');
      setSpinning(false);
    }
  };

  const gradientParts = TOPICS.map((_, i) => `${colors[i]} ${i * 45}deg ${(i + 1) * 45}deg`).join(', ');

  return (
    <div className="wheel-container">
      <div className="pointer"></div>
      <div 
        className="wheel" 
        style={{ 
          background: `conic-gradient(${gradientParts})`,
          transform: `rotate(${rotation}deg)`,
          transition: spinning ? 'transform 5s cubic-bezier(0.2, 0.8, 0.3, 1)' : 'none'
        }}
      >
        {TOPICS.map((topic, i) => {
          // conic gradient 0deg is top. CSS rotate 0deg is right.
          // So we rotate by angle - 90 to align text with the slice center.
          const angle = (i * 45 + 22.5) - 90;
          return (
            <div 
              key={i} 
              className="slice-text-container" 
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <span className="slice-text">{topic}</span>
            </div>
          );
        })}
      </div>
      <div style={{marginTop: '2rem'}}>
        <button className="retro-button" onClick={spin} disabled={spinning}>
          {spinning ? 'SPINNING...' : 'SPIN THE WHEEL'}
        </button>
      </div>
      {error && <div className="error-text" style={{marginTop: '1rem'}}>{error}</div>}
    </div>
  );
}
