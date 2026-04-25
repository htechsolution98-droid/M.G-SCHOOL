import connectDB from "@/lib/mongodb";
import AboutContent, { IAboutContent } from "@/models/AboutContent";

const defaultAboutContent = {
  hero: {
    image: "https://images.unsplash.com/photo-1523050853063-bd40d04b68ce?q=80&w=2070",
    subheading: "About M.G. School",
    heading: "Our Journey of ",
    headingHighlight: "Success.",
    description: "Three decades of academic excellence, carving a legacy that inspires generations.",
  },
  legacy: {
    headingPrefix: "Founded on ",
    headingHighlight: "Vision.",
    paragraphs: [
      "Established in 1995, M.G. School emerged from a simple yet profound dream: to provide world-class education that respects local roots while embracing global growth.",
      "What began in a modest building with 50 students has now evolved into a multi-campus educational beacon, nurturing thousands of bright minds every year.",
    ],
    stat1Value: "28+",
    stat1Label: "Years Legacy",
    stat2Value: "15k",
    stat2Label: "Alumni Globally",
    archiveYear: "Archive 1995",
    archiveTitle: "The First Foundation.",
    imageMain: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80",
    imageSmall1: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    imageSmall2: "https://images.unsplash.com/photo-1577891772447-b31528753a9c",
  },
  excellence: [
    {
      title: "Our Mission",
      description: "To provide a nurturing environment where students are inspired to achieve academic excellence and develop into compassionate leaders.",
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80",
    },
    {
      title: "Our Vision",
      description: "To be a global leader in education, fostering innovation, integrity, and a lifelong passion for learning in every student.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80",
    },
    {
      title: "Core Values",
      description: "Integrity, Respect, Excellence, and Inclusivity are the pillars that guide every interaction and decision at M.G. School.",
      image: "https://images.unsplash.com/photo-1577891772447-b31528753a9c?q=80",
    },
  ],
  valuesScroll: {
    heading: "Every Child, ",
    headingHighlight: "Every Future.",
    description: "\"Our commitment is to the unique potential within every student.\"",
    features: [
      { title: "Immersive Digital Classrooms", image: "" },
      { title: "Holistic Character Building", image: "" },
      { title: "Global Athletic Exposure", image: "" },
      { title: "Creative & Performing Arts", image: "" },
      { title: "Ethics-Driven Education", image: "" },
      { title: "Sustainable Campus Living", image: "" },
      { title: "Peer-to-Peer Mentorship", image: "" },
      { title: "International Exchange", image: "" }
    ]
  },
  principalMessage: {
    heading: "Principal Message",
    message: "Dear Staff and Parents,\n\nWarm greetings to you all.\n\nAs we begin a new academic year at MG Primary School, I would like to share our vision rooted in the timeless values of Ahimsa (non-violence) and Truthfulness, inspired by Mahatma Gandhiji. These principles are not only ideals but essential life skills that help shape responsible and compassionate human beings.\n\nAt our school, we strive to create a safe, respectful, and inclusive environment where every child learns the importance of kindness, empathy, honesty, and integrity. By practicing Ahimsa, we encourage our students to show care and respect towards others in thought, word, and action. Through Truthfulness, we guide them to always stand by honesty and develop strong moral character.\n\nOur dedicated staff members play a crucial role in nurturing these values alongside academic excellence. I sincerely appreciate their continuous efforts and commitment.\n\nTo our dear parents, your support and cooperation are invaluable. When school and home work together, children receive the right guidance to grow into ethical and confident individuals.\n\nLet us join hands to instill these noble values in our children so that they not only succeed in academics but also become good human beings who contribute positively to society.\n\nWishing you all a peaceful, truthful, and successful academic year ahead.",
    name: "Namrata Motwani",
    qualifications: "B.A., M.A. (English Literature, Education)",
    designation: "MG Primary School",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976"
  },
  whyChooseUs: {
    heading: "Why to study in M. G. School?",
    headingHighlight: "Why we are best?",
    reasons: [
      { title: "Expert Faculty", description: "Learn from highly qualified and experienced educators dedicated to student success." },
      { title: "Modern Facilities", description: "Our campus is equipped with state-of-the-art labs, libraries, and smart classrooms." },
      { title: "Holistic Development", description: "We focus on academic, physical, and character growth through diverse programs." }
    ]
  }
};

export async function getAboutContent() {
  await connectDB();
  let content = await AboutContent.findOne();
  if (!content) {
    content = await AboutContent.create(defaultAboutContent);
    return content;
  }

  // Ensure all sections exist (for older documents)
  let updated = false;
  if (!content.hero) { content.hero = defaultAboutContent.hero; updated = true; }
  if (!content.legacy) { content.legacy = defaultAboutContent.legacy; updated = true; }
  if (!content.whyChooseUs) { content.whyChooseUs = defaultAboutContent.whyChooseUs; updated = true; }
  if (!content.principalMessage || !content.principalMessage.heading) { 
    content.principalMessage = (defaultAboutContent as any).principalMessage; 
    updated = true; 
  }
  if (!content.excellence || content.excellence.length === 0) { 
    content.excellence = defaultAboutContent.excellence as any; 
    updated = true; 
  }
  if (!content.valuesScroll) { content.valuesScroll = defaultAboutContent.valuesScroll; updated = true; }

  if (updated) {
    await content.save();
  }
  
  return content.toObject ? content.toObject() : content;
}

export async function updateAboutHero(hero: any) {
  await connectDB();
  let content = await AboutContent.findOne();
  if (!content) {
    content = await AboutContent.create({ ...defaultAboutContent, hero });
  } else {
    content.hero = hero;
    content.updatedAt = new Date();
    await content.save();
  }
  return content;
}

export async function updateAboutLegacy(legacy: any) {
  await connectDB();
  let content = await AboutContent.findOne();
  if (!content) {
    content = await AboutContent.create({ ...defaultAboutContent, legacy });
  } else {
    content.legacy = legacy;
    content.updatedAt = new Date();
    await content.save();
  }
  return content;
}

export async function updateAboutExcellence(excellence: any[]) {
  await connectDB();
  let content = await AboutContent.findOne();
  if (!content) {
    content = await AboutContent.create({ ...defaultAboutContent, excellence });
  } else {
    content.excellence = excellence;
    content.updatedAt = new Date();
    await content.save();
  }
  return content;
}

export async function updateAboutValuesScroll(valuesScroll: any) {
  await connectDB();
  let content = await AboutContent.findOne();
  if (!content) {
    content = await AboutContent.create({ ...defaultAboutContent, valuesScroll });
  } else {
    content.valuesScroll = valuesScroll;
    content.updatedAt = new Date();
    await content.save();
  }
  return content;
}

export async function updatePrincipalMessage(principalMessage: any) {
  await connectDB();
  let content = await AboutContent.findOne();
  if (!content) {
    content = await AboutContent.create({ ...defaultAboutContent, principalMessage });
  } else {
    content.principalMessage = { ...principalMessage };
    content.markModified("principalMessage");
    content.updatedAt = new Date();
    await content.save();
  }
  return content;
}

export async function updateAboutWhyChooseUs(whyChooseUs: any) {
  await connectDB();
  let content = await AboutContent.findOne();
  if (!content) {
    content = await AboutContent.create({ ...defaultAboutContent, whyChooseUs });
  } else {
    content.whyChooseUs = whyChooseUs;
    content.updatedAt = new Date();
    await content.save();
  }
  return content;
}
