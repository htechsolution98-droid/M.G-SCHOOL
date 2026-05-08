"use client";

import React from "react";
import BlockPageLayout from "@/components/branches/BlockPageLayout";

export default function BlockAPage() {
  return (
    <BlockPageLayout blockKey="blockA">
      <div className="w-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3670.5244522047187!2d72.64379807531554!3d23.077889779135052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDA0JzQwLjQiTiA3MsKwMzgnNDYuOSJF!5e0!3m2!1sen!2sin!4v1776847345712!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </BlockPageLayout>
  );
}
