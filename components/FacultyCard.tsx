import React from "react";
import Image from "next/image";
import { Book, GraduationCap, Briefcase } from "lucide-react";

interface FacultyCardProps {
  name: string;
  role: string;
  subject: string;
  experience: string;
  education: string;
  image: string;
}

const FacultyCard = ({ name, role, subject, experience, education, image }: FacultyCardProps) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 group">
      <div className="relative h-80 overflow-hidden">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 text-white">
          <p className="font-bold text-lg mb-1">{name}</p>
          <p className="text-secondary text-sm font-medium">{role}</p>
        </div>
      </div>
      <div className="p-8">
        <div className="mb-2">
          <h3 className="text-2xl font-bold text-primary">{name}</h3>
          <p className="text-secondary font-bold text-sm tracking-wide uppercase">{role}</p>
        </div>
        
        <div className="space-y-4 pt-4 mt-4 border-t border-gray-100">
          <div className="flex items-center gap-3 text-gray-600">
            <Book className="w-5 h-5 text-secondary" />
            <span><span className="font-bold">Subject:</span> {subject}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <GraduationCap className="w-5 h-5 text-secondary" />
            <span><span className="font-bold">Education:</span> {education}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Briefcase className="w-5 h-5 text-secondary" />
            <span><span className="font-bold">Exp:</span> {experience}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyCard;
