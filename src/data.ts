export interface Subject {
  id: string;
  name: string;
  code: string;
  board: 'Cambridge' | 'Edexcel' | 'Cambridge/Edexcel';
  iconName: string;
  description: string;
  tagline: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  subject: string;
  qualification: string;
  experience: string;
  imageUrl: string;
  bio: string;
  achievement: string;
  authorText?: string;
  schools?: string[];
  subjectsTaught?: string[];
  curricula?: string[];
  expertise?: string[];
}

export interface Achievement {
  year: string;
  title: string;
  description: string;
  tag: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  level: string;
  rating: number;
  role: 'Student' | 'Parent';
}

export interface FeatureBlock {
  title: string;
  description: string;
  iconName: string;
}

export const oLevelSubjects: Subject[] = [
  {
    id: 'o1',
    name: 'Mathematics (D)',
    code: 'CAIE 4024',
    board: 'Cambridge',
    iconName: 'calculator',
    description: 'Comprehensive preparation in algebraic techniques, geometry, vectors, and statistics. Focuses on spatial sense and mathematical precision.',
    tagline: 'Weekly Topical Past Paper Drills'
  },
  {
    id: 'o2',
    name: 'Physics',
    code: 'CAIE 5054',
    board: 'Cambridge',
    iconName: 'atom',
    description: 'Conceptual grasp of mechanics, thermal dynamics, wave behaviors, and atomic physics with intensive practical alternative worksheets.',
    tagline: 'Alternative to Practical (ATP) Workshops'
  },
  {
    id: 'o3',
    name: 'Chemistry',
    code: 'CAIE 5070',
    board: 'Cambridge',
    iconName: 'beaker',
    description: 'Master stoichiometry, periodic groupings, chemical bonding, and organic synthesis pathways. Structured around actual CAIE rubrics.',
    tagline: 'Volumetric and Qualitative Analysis'
  },
  {
    id: 'o4',
    name: 'Biology',
    code: 'CAIE 5090',
    board: 'Cambridge',
    iconName: 'dna',
    description: 'Exploration of plant-animal systems, cell anatomy, genetic structures, and ecosystems. Focuses heavily on precise biological labelling.',
    tagline: 'High-yield Diagrams & Definition Banks'
  },
  {
    id: 'o5',
    name: 'Computer Science',
    code: 'CAIE 2210',
    board: 'Cambridge',
    iconName: 'cpu',
    description: 'Foundations of algorithms, binary logic, and structured programming in Python. Covers hardware architecture and cyber security elements.',
    tagline: 'Pseudocode and Algorithm Execution'
  },
  {
    id: 'o6',
    name: 'English Language',
    code: 'CAIE 1123',
    board: 'Cambridge',
    iconName: 'book-open',
    description: 'Refine narrative writing, argumentative essays, summary production, and comprehension skills. Rigorous evaluation of syntax patterns.',
    tagline: 'Directed Writing & Comprehension Precision'
  },
  {
    id: 'o7',
    name: 'Pakistan Studies',
    code: 'CAIE 2059',
    board: 'Cambridge',
    iconName: 'globe',
    description: 'Detailed analysis of history, geography, environmental issues, and socio-economic challenges of Pakistan. High-scoring essay frameworks.',
    tagline: 'Chronological Timelines & Maps'
  },
  {
    id: 'o8',
    name: 'Islamiyat',
    code: 'CAIE 2058',
    board: 'Cambridge',
    iconName: 'bookmark',
    description: 'Study of early Islamic history, teachings of Quran and Hadith, and life of Prophet Muhammad (PBUH). Emphasis on structured descriptive writing.',
    tagline: 'Passage References & Quranic verses analysis'
  }
];

export const aLevelSubjects: Subject[] = [
  {
    id: 'a1',
    name: 'Mathematics',
    code: 'CAIE 9709',
    board: 'Cambridge',
    iconName: 'calculator',
    description: 'Pure Mathematics (P1, P3) along with Mechanics (M1) or Statistics (S1). Demands deep analytical modeling and rigorous proofs.',
    tagline: 'P3 Complex Numbers & Calculus Modules'
  },
  {
    id: 'a2',
    name: 'Physics',
    code: 'CAIE 9702',
    board: 'Cambridge',
    iconName: 'atom',
    description: 'Oscillations, quantum physics, medical imaging, and nuclear forces. Advanced physics labs prepare students for Paper 3 and Paper 5 design challenges.',
    tagline: 'Alternative to Practical (Paper 5) Design'
  },
  {
    id: 'a3',
    name: 'Chemistry',
    code: 'CAIE 9701',
    board: 'Cambridge',
    iconName: 'beaker',
    description: 'Advanced kinetics, electrochemistry, and complex aromatic pathways. Emphasis on structural analysis and molecular orbital mechanics.',
    tagline: 'A2 Multi-step Organic Synthesis Pathways'
  },
  {
    id: 'a4',
    name: 'Biology',
    code: 'CAIE 9700',
    board: 'Cambridge',
    iconName: 'dna',
    description: 'Biochemistry, molecular genetics, respiration, and gene technology. Sharp focus on graphical analysis and structured evaluation.',
    tagline: 'A2 Genetics & Gene Technology Workshops'
  },
  {
    id: 'a5',
    name: 'Economics',
    code: 'CAIE 9708',
    board: 'Cambridge',
    iconName: 'trending-up',
    description: 'Microeconomic resource allocation and macroeconomic national planning. Focuses on structural essay construction and diagram efficiency.',
    tagline: 'A2 Macro Policy Analysis & Evaluation Essay Prep'
  },
  {
    id: 'a6',
    name: 'Business',
    code: 'CAIE 9609',
    board: 'Cambridge',
    iconName: 'briefcase',
    description: 'Operations, strategic HR, marketing analysis, and finance. Teaches actual business case study synthesis under real exam pressure.',
    tagline: 'Paper 3 & Paper 4 Strategic Case Studies'
  },
  {
    id: 'a7',
    name: 'Computer Science',
    code: 'CAIE 9618',
    board: 'Cambridge',
    iconName: 'cpu',
    description: 'Object-Oriented Programming (OOP), file structures, state machines, and assembly coding. Advanced Python algorithms are taught in dedicated labs.',
    tagline: 'OOP Concept Execution & Database Programming'
  },
  {
    id: 'a8',
    name: 'Accounting',
    code: 'CAIE 9706',
    board: 'Cambridge',
    iconName: 'scale',
    description: 'Partnership accounts, cash flow statements, cost modeling, and business mergers. Master numerical calculations and analytical ledger reporting.',
    tagline: 'Reconciliation, Ledgers & Consolidated Accounts'
  }
];

export const facultyMembers: FacultyMember[] = [
  {
    id: 'f1',
    name: 'Sir Amjad Raza',
    subject: 'Mathematics Specialist',
    qualification: 'Senior Mathematics Subject Lead',
    experience: '15+ Years',
    imageUrl: '/amjad_raza.jpg',
    bio: 'Over 15 years of teaching experience, specializing in Mathematics for international curricula. Proven expertise in preparing students for board examinations through concept-based learning, problem-solving techniques, and exam-focused strategies.',
    achievement: 'Trained thousands of students for A*/A grades in O-Level & Edexcel.',
    schools: ['The City School', 'Beaconhouse School System', 'LACAS'],
    subjectsTaught: ['Mathematics'],
    curricula: ['Cambridge O Level', 'Pearson Edexcel', 'International Baccalaureate (IB)']
  },
  {
    id: 'f2',
    name: 'Sir Amar Zulkifl',
    subject: 'Mathematics & Physics Specialist',
    qualification: 'Senior O/A Levels Subject Specialist',
    experience: '12+ Years',
    imageUrl: '/sir_ammar.jpg',
    bio: 'Dedicated educator specializing in Mathematics and Physics for O Level and A Level students. Focused on building strong conceptual understanding, analytical thinking, and exam-oriented preparation to help students achieve outstanding academic results.',
    achievement: 'Helped hundreds of students secure straight A*s in Math & Physics.',
    subjectsTaught: ['O Level Mathematics', 'A Level Mathematics', 'O Level Physics', 'A Level Physics'],
    curricula: ['Cambridge O Level', 'Cambridge A Level', 'Pearson Edexcel']
  },
  {
    id: 'f3',
    name: 'Miss Amna Saqib',
    subject: 'ICT & Computer Science Instructor',
    qualification: 'Lead ICT Instructor & Educationist',
    experience: '11+ Years',
    imageUrl: '/miss_amina_cs.png',
    bio: 'Over 11 years of teaching experience at the secondary and higher secondary levels. Recognized for academic excellence, innovative teaching methods, and fostering a growth mindset among students. Committed to developing strong conceptual understanding, practical technical skills, and preparing students for academic and professional success.',
    achievement: 'Expert in tech integration, digital skills and web design coaching.',
    subjectsTaught: ['ICT (Information & Communication Technology)', 'Computer Science', 'Web Design'],
    expertise: ['ICT & Computer Science', 'Web Design & Development', 'Student-Centered Learning', 'Exam-Oriented Preparation', 'Digital Skills & Technology Integration']
  },
  {
    id: 'f4',
    name: 'Sir Imran Ahmad',
    subject: 'Chemistry & Biology Specialist',
    qualification: 'Senior Sciences Subject Specialist',
    experience: '12+ Years',
    imageUrl: '/sir_imran.png',
    bio: 'Experienced educator specializing in Chemistry and Biology across leading international curricula. Dedicated to building strong conceptual understanding through practical applications, critical thinking, and exam-focused preparation. Committed to helping students achieve academic excellence with personalized guidance and proven teaching strategies.',
    achievement: 'Expert prep lead for Cambridge CAIE and Advanced Placement (AP) Exams.',
    subjectsTaught: ['Chemistry', 'Biology'],
    curricula: ['Cambridge O Level', 'Cambridge A Level', 'Pearson Edexcel', 'Advanced Placement (AP) Chemistry', 'Advanced Placement (AP) Biology']
  },
  {
    id: 'f5',
    name: 'Miss Tabinda Parwer',
    subject: 'Pakistan Studies & Sociology Specialist',
    qualification: 'Senior Social Sciences Specialist',
    experience: '13+ Years',
    imageUrl: '/tabinda_parwer.jpg',
    bio: 'Over 13 years of teaching experience in Pakistan Studies and Sociology. Experienced in delivering concept-based learning with a strong focus on critical thinking, analytical skills, and exam-oriented preparation. Dedicated to helping students achieve academic excellence through engaging teaching methods and personalized guidance.',
    achievement: 'Renowned for high-scoring essay frameworks and analytical preparation.',
    schools: ['The City School', 'SICAS', 'Kingston College'],
    subjectsTaught: ['Pakistan Studies', 'Sociology'],
    curricula: ['Cambridge O Level', 'Cambridge A Level']
  },
  {
    id: 'f6',
    name: 'Sir Adnan Ashraf',
    subject: 'Pakistan Studies Specialist',
    qualification: 'Senior Pakistan Studies Subject Specialist',
    experience: '25+ Years',
    imageUrl: '/adnan_ashraf.jpg',
    bio: 'Over 25 years of teaching experience in Pakistan Studies across leading educational institutions. Renowned for delivering concept-based instruction, exam-focused preparation, and helping students achieve exceptional academic results. Committed to developing critical thinking, historical understanding, and analytical skills through engaging and effective teaching methodologies.',
    achievement: 'Renowned for delivering concept-based instruction and exam-focused preparation across 25+ years.',
    schools: ['Beaconhouse School System', 'The City School', 'Roots International Schools & Colleges', 'DHA Education System (DHAES)', 'LACAS'],
    subjectsTaught: ['Pakistan Studies'],
    curricula: ['Cambridge O Level']
  }
];

export const achievementsList: Achievement[] = [
  {
    year: '2025',
    title: 'Cambridge Learner Laurels',
    description: 'Five CamFord Academiya students secure the coveted "Top in Pakistan" and "Top in World" distinction awards in Mathematics D, Physics, and Business CAIE examinations.',
    tag: 'World Records'
  },
  {
    year: '2024',
    title: 'Perfect Commerce Pass',
    description: 'Perfect pass scores across A Level Economics and Business cohort. 88% of all classes achieve straight A*/A grades, setting a new benchmark.',
    tag: 'Perfect Pass'
  },
  {
    year: '2023',
    title: 'Science & Debate Triumph',
    description: 'CamFord Academiya students win the National Youth Parliamentary Debate Championship and claim the overall first prize trophy at the National STEM Olympiad.',
    tag: 'Olympiad Wins'
  },
  {
    year: '2022',
    title: 'Ivy League Admissions',
    description: '12 senior graduates secure fully-funded undergraduate scholarship admissions to international universities, including Oxford, Harvard, Yale, and LSE.',
    tag: 'Global Placements'
  },
  {
    year: '2021',
    title: 'Highest A*/A Rate',
    description: 'Overcame pandemic gaps to score a monumental 95.6% overall rate of A* and A grades across all O and A Level subjects.',
    tag: 'Academic Record'
  }
];

export const featuresList: FeatureBlock[] = [
  {
    title: 'Expert Faculty',
    description: 'Learn directly from top-tier authors, examiners, and GIKI/FAST/LUMS alumni who have mastered the CAIE rubric patterns.',
    iconName: 'award'
  },
  {
    title: 'Small Batches',
    description: 'We cap our classes at 25 students max to preserve strict individual focus and active question-asking environments.',
    iconName: 'users'
  },
  {
    title: 'Proven Results',
    description: 'Year-on-year 95% rate of A*/A grades, backed by Outstanding Cambridge Learner Awards and National Records.',
    iconName: 'check-square'
  },
  {
    title: 'Diagnostic Mock Exams',
    description: 'Bi-weekly past paper simulations evaluated with official CAIE marking metrics, including individual feedback folders.',
    iconName: 'file-text'
  },
  {
    title: 'Parent Updates Portal',
    description: 'Parent updates via SMS, WhatsApp, call, or email.',
    iconName: 'bell'
  },
  {
    title: 'Flexible Timings',
    description: 'Convenient morning cohorts for private candidates, and afternoon sessions for school-going pupils.',
    iconName: 'clock'
  }
];

export const testimonialsList: Testimonial[] = [
  {
    id: 't1',
    quote: "The pedagogical precision at CamFord Academiya transformed my approach to A-Level Physics. Sir Bilal Farooq did not just teach formulas; he showed us the beauty of the design behind the lab experiments. I got 4 A*s and am now heading to Cambridge!",
    name: "Zainab Raza",
    level: "A Levels Grad (4 A*)",
    rating: 5,
    role: 'Student'
  },
  {
    id: 't2',
    quote: "As a parent, I was incredibly anxious about my son's transition to O-Level Add Math. The systematic diagnostic tests and the small class environment at CamFord Academiya allowed him to build confidence. He jumped from a C in school mocks to an outstanding A* in the CAIEs.",
    name: "Dr. Farhan Jamil",
    level: "Parent of Saad Jamil (O-Levels)",
    rating: 5,
    role: 'Parent'
  },
  {
    id: 't3',
    quote: "Sir Muzammil Ahmed is a legend. His mathematical shortcuts and past paper prediction booklet saved my grades. I got an A* in Mathematics and Further Math. If you want results, CamFord Academiya is the only logical choice in Lahore.",
    name: "Daniyal Alvi",
    level: "A Levels Grad (3 A*)",
    rating: 5,
    role: 'Student'
  },
  {
    id: 't4',
    quote: "Miss Sarah Munir's English Language guidance is outstanding. She marked my descriptive writing assignments with detailed, line-by-line criticism. That continuous diagnostic feedback is why I secured a Distinction in Pakistan.",
    name: "Eshaal Fatima",
    level: "O Levels (Distinction Winner)",
    rating: 5,
    role: 'Student'
  }
];

export interface HeadTeacher {
  name: string;
  role: string;
  experience: string;
  imageUrl: string;
  bio: string;
  schools: string[];
  subjects: string[];
  curricula: string[];
  credentials: string;
}

export const headTeacher: HeadTeacher = {
  name: "Ahmad Jaan",
  role: "Islamiyat / Islamic Studies Specialist",
  experience: "20+ Years",
  imageUrl: "/head_picc.png",
  bio: "Over 20 years of teaching and examination experience, helping students achieve outstanding academic results through expert guidance and exam-focused preparation.",
  schools: [
    "Kingston College",
    "Lahore Grammar School (LGS)",
    "Beaconhouse School System",
    "The City School",
    "CamFord Academiya"
  ],
  subjects: ["Islamiyat", "Islamic Studies"],
  curricula: ["CAIE IGCSE", "Cambridge O Level", "Pearson Edexcel"],
  credentials: "CAIE Islamiyat Examiner"
};

export interface SuccessSlide {
  imageUrl: string;
  tag: string;
  title: string;
  description: string;
}

export const successSlides: SuccessSlide[] = [
  {
    imageUrl: '/slider_1.jpg',
    tag: 'Board Distinction',
    title: '95% Straight A*/A Cohort Rate in CAIE Examinations',
    description: 'Our students consistently secure the highest academic tiers, placing CamFord Academiya at the top tier of prep academies in Pakistan.'
  },
  {
    imageUrl: '/slider_2.jpg',
    tag: 'Outstanding Performance',
    title: 'Highest Math & Science A-Grade Ratios in Lahore',
    description: 'Delivering unmatched results across Physics, Chemistry, Biology, and Mathematics with concept-based preparation methods.'
  },
  {
    imageUrl: '/slider_3.jpg',
    tag: 'Scientific Curiosity',
    title: 'STEM Olympiad Championships & National Laurels',
    description: 'We prepare candidates to win prestigious national design challenges, debate championships, and science contests.'
  },
  {
    imageUrl: '/slider_4.jpg',
    tag: 'Global Reach',
    title: 'Ivy League and Oxbridge College Placements',
    description: 'Providing structured guidance and counseling that secures fully funded undergraduate scholarships at top-tier world universities.'
  },
  {
    imageUrl: '/slider_5.jpg',
    tag: 'Continuous Care',
    title: 'Diagnostic Past-Paper Audits & Small Class Focus',
    description: 'Our modular class setups capped at 25 ensure every student receives targeted feedback directly from senior subject leads.'
  }
];




