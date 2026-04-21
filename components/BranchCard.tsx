import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, User, ArrowRight } from "lucide-react";

interface BranchCardProps {
  name: string;
  image: string;
  medium: string;
  description: string;
  location: string;
  principal: string;
}

const BranchCard = ({ name, image, medium, description, location, principal }: BranchCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 border border-gray-100">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-secondary text-primary font-bold px-4 py-1 rounded-full text-sm shadow-md">
          {medium}
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-primary mb-4">{name}</h3>
        <p className="text-gray-600 mb-6 line-clamp-2">
          {description}
        </p>
        
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3 text-gray-500 text-sm">
            <MapPin className="text-secondary w-5 h-5 shrink-0" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-500 text-sm">
            <User className="text-secondary w-5 h-5 shrink-0" />
            <span>Principal: {principal}</span>
          </div>
        </div>

        <Link 
          href="/branches" 
          className="flex items-center justify-between w-full bg-gray-50 group-hover:bg-primary group-hover:text-white px-6 py-4 rounded-xl transition-colors font-semibold"
        >
          View More Details
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default BranchCard;
