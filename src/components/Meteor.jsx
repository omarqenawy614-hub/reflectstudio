import { useEffect, useState } from "react";
import "./Meteor.css";

export default function Meteor() {
  const [meteor, setMeteor] = useState(null);

  useEffect(() => {
    let timeout;

    const createMeteor = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // مكان عشوائي داخل الشاشة الحالية فقط
      const startX = Math.random() * width;
      const startY = Math.random() * height;

      setMeteor({
        id: Date.now(),
        x: startX,
        y: startY,
        angle: 25 + Math.random() * 30,
      });

      // إخفاء الشهاب بعد انتهاء الحركة
      setTimeout(() => {
        setMeteor(null);
      }, 1200);

      // وقت عشوائي للشهاب التالي
      timeout = setTimeout(
        createMeteor,
        4000 + Math.random() * 5000
      );
    };

    // أول ظهور بعد فترة بسيطة
    timeout = setTimeout(createMeteor, 2500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (!meteor) return null;

  return (
    <div
      key={meteor.id}
      className="meteor"
      style={{
        left: `${meteor.x}px`,
        top: `${meteor.y}px`,
        transform: `rotate(${meteor.angle}deg)`,
      }}
    />
  );
}