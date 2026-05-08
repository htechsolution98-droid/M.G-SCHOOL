"use client";

import React from "react";
import BlockPageLayout from "@/components/branches/BlockPageLayout";

export default function BlockBPage() {
  return (
    <BlockPageLayout blockKey="blockB">
      <div className="w-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
        <iframe
          src="https://www.google.com/maps?q=23.0772702,72.6459331&hl=en&z=17&output=embed"
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
