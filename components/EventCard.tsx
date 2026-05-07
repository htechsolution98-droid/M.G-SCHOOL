import React from "react";
import Image from "next/image";
import { Calendar, MapPin, Clock } from "lucide-react";

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  category: string;
}

const EventCard = ({ title, date, time, location, description, image, category }: EventCardProps) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col h-full group">
      <div className="relative h-64 overflow-hidden shrink-0">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-secondary text-primary font-bold px-4 py-1 rounded-full text-xs shadow-md uppercase tracking-wider">
          {category}
        </div>
      </div>
      <div className="p-8 flex flex-col grow">
        <h3 className="text-2xl font-bold text-primary mb-4 leading-tight">{title}</h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-gray-500 text-sm">
            <Calendar className="text-secondary w-5 h-5" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-500 text-sm">
            <Clock className="text-secondary w-5 h-5" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-500 text-sm">
            <MapPin className="text-secondary w-5 h-5" />
            <span>{location}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 italic">
          "{description}"
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          <button className="text-primary font-bold hover:text-secondary transition-colors text-sm uppercase tracking-widest flex items-center gap-2">
            View Documentation <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
