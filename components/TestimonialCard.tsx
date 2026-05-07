import React from "react";
import Image from "next/image";
import { Quote, Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  relation: string;
  content: string;
  image: string;
  rating: number;
}

const TestimonialCard = ({ name, role, relation, content, image, rating }: TestimonialCardProps) => {
  return (
    <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col h-full relative overflow-hidden group hover:shadow-2xl transition-all">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote size={80} className="text-primary rotate-180" />
      </div>
      
      <div className="flex items-center gap-2 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={18} 
            className={i < rating ? "text-secondary fill-secondary" : "text-gray-200"} 
          />
        ))}
      </div>

      <p className="text-gray-600 text-lg leading-relaxed mb-8 italic flex-grow">
        "{content}"
      </p>

      <div className="flex items-center gap-4 mt-auto">
        <div className="relative w-16 h-16 shrink-0">
          <Image 
            src={image} 
            alt={name} 
            fill 
            className="rounded-full object-cover border-4 border-gray-50"
          />
        </div>
        <div>
          <h4 className="font-bold text-primary text-lg">{name}</h4>
          <p className="text-sm text-gray-500 font-medium">{role} | <span className="text-secondary">{relation}</span></p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
