export interface Subject {
  id: string;
  name: string;
  code: string;
  board: 'Cambridge' | 'Edexcel' | 'Cambridge/Edexcel' | 'Pearson Edexcel / IB' | 'Edexcel/IB';
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

export const edexcelIbSubjects: Subject[] = [
  {
    id: 'e1',
    name: 'Mathematics',
    code: 'Edexcel IAL / IB HL',
    board: 'Pearson Edexcel / IB',
    iconName: 'calculator',
    description: 'Advanced algebraic methods, calculus, functions, and mathematical exploration matching the Edexcel International A-Level and IB Diploma standards.',
    tagline: 'Calculus & Internal Assessment (IA) Guidance'
  },
  {
    id: 'e2',
    name: 'Physics',
    code: 'Edexcel IAL / IB HL',
    board: 'Pearson Edexcel / IB',
    iconName: 'atom',
    description: 'Comprehensive prep in quantum mechanics, thermal physics, fields, and wave phenomena aligned with Pearson Edexcel and IB guidelines.',
    tagline: 'Practical Portfolios & IA Support'
  },
  {
    id: 'e3',
    name: 'Chemistry',
    code: 'Edexcel IAL / IB HL',
    board: 'Pearson Edexcel / IB',
    iconName: 'beaker',
    description: 'Mastering organic pathways, transition metals, kinetics, and energetic equations for Pearson Edexcel and IB Chemistry.',
    tagline: 'Lab Reports & IB IA Mentorship'
  },
  {
    id: 'e4',
    name: 'Business & Economics',
    code: 'Edexcel / IB HL',
    board: 'Pearson Edexcel / IB',
    iconName: 'trending-up',
    description: 'Market analysis, global commerce strategies, economic modeling, and policy evaluation for advanced commerce candidates.',
    tagline: 'Case Studies & Commentary Guidance'
  }
];

export const facultyMembers: FacultyMember[] = [
  {
    id: 'f1',
    name: 'Mr. Amjad Raza',
    subject: 'Mathematics Specialist',
    qualification: 'Senior Mathematics Subject Lead',
    experience: '16+ Years',
    imageUrl: '/amjad_raza.jpg',
    bio: 'Over 16 years of teaching experience, specializing in Mathematics for international curricula. Proven expertise in preparing students for board examinations through concept-based learning, problem-solving techniques, and exam-focused strategies.',
    achievement: 'Trained thousands of students for A*/A grades in O-Level & Edexcel.',
    schools: ['The City School', 'Beaconhouse', 'LACAS'],
    subjectsTaught: ['Mathematics'],
    curricula: ['Cambridge O Level', 'Pearson Edexcel', 'International Baccalaureate (IB)']
  },
  {
    id: 'f2',
    name: 'Mr. Amar Zulkifl',
    subject: 'Mathematics & Physics Specialist',
    qualification: 'Senior O/A Levels Subject Specialist',
    experience: '12+ Years',
    imageUrl: '/mr_ammar.jpg',
    bio: 'Dedicated educator specializing in Mathematics and Physics for O Level and A Level students. Focused on building strong conceptual understanding, analytical thinking, and exam-oriented preparation to help students achieve outstanding academic results.',
    achievement: 'Helped hundreds of students secure straight A*s in Math & Physics.',
    schools: ['Beaconhouse', 'Soar School System'],
    subjectsTaught: ['O Level Mathematics', 'A Level Mathematics', 'O Level Physics', 'A Level Physics'],
    curricula: ['Cambridge O Level', 'Cambridge A Level', 'Pearson Edexcel']
  },
  {
    id: 'f3',
    name: 'Miss Amina Saqib',
    subject: 'ICT & Computer Science Instructor',
    qualification: 'Lead ICT Instructor & Educationist',
    experience: '11+ Years',
    imageUrl: '/miss_amina_cs.png',
    bio: 'Over 11 years of teaching experience at the secondary and higher secondary levels. Recognized for academic excellence, innovative teaching methods, and fostering a growth mindset among students. Committed to developing strong conceptual understanding, practical technical skills, and preparing students for academic and professional success.',
    achievement: 'Expert in tech integration, digital skills and web design coaching.',
    schools: ['Beaconhouse', 'The City School', 'Scarsdale'],
    subjectsTaught: ['ICT (Information & Communication Technology)', 'Computer Science', 'Web Design'],
    expertise: ['ICT & Computer Science', 'Web Design & Development', 'Student-Centered Learning', 'Exam-Oriented Preparation', 'Digital Skills & Technology Integration']
  },
  {
    id: 'f4',
    name: 'Mr. Imran Ahmad',
    subject: 'Chemistry & Biology Specialist',
    qualification: 'Senior Sciences Subject Specialist',
    experience: '12+ Years',
    imageUrl: '/mr_imran.png',
    bio: 'Experienced educator specializing in Chemistry and Biology across leading international curricula. Dedicated to building strong conceptual understanding through practical applications, critical thinking, and exam-focused preparation. Committed to helping students achieve academic excellence with personalized guidance and proven teaching strategies.',
    achievement: 'Expert prep lead for Cambridge CAIE and Advanced Placement (AP) Exams.',
    schools: ['CamFord Academy'],
    subjectsTaught: ['Chemistry', 'Biology'],
    curricula: ['Cambridge O Level', 'Cambridge A Level', 'Pearson Edexcel', 'Advanced Placement (AP) Chemistry', 'Advanced Placement (AP) Biology']
  },
  {
    id: 'f5',
    name: 'Miss Tabinda Parwer',
    subject: 'Pakistan Studies & Sociology Specialist',
    qualification: 'Senior Social Sciences Specialist',
    experience: '12+ Years',
    imageUrl: '/tabinda_parwer.jpg',
    bio: 'Over 12 years of teaching experience in Pakistan Studies and Sociology. Experienced in delivering concept-based learning with a strong focus on critical thinking, analytical skills, and exam-oriented preparation. Dedicated to helping students achieve academic excellence through engaging teaching methods and personalized guidance.',
    achievement: 'Renowned for high-scoring essay frameworks and analytical preparation.',
    schools: ['Kingston College', 'SICAS', 'The City School'],
    subjectsTaught: ['Pakistan Studies', 'Sociology'],
    curricula: ['Cambridge O Level', 'Cambridge A Level']
  },
  {
    id: 'f6',
    name: 'Mr. Adnan Ashraf',
    subject: 'Pakistan Studies Specialist',
    qualification: 'Senior Pakistan Studies Subject Specialist',
    experience: '18+ Years',
    imageUrl: '/adnan_ashraf.jpg',
    bio: 'Over 18 years of teaching experience in Pakistan Studies across leading educational institutions. Renowned for delivering concept-based instruction, exam-focused preparation, and helping students achieve exceptional academic results. Committed to developing critical thinking, historical understanding, and analytical skills through engaging and effective teaching methodologies.',
    achievement: 'Renowned for delivering concept-based instruction and exam-focused preparation across 18+ years.',
    schools: ['Beaconhouse', 'LACAS', 'CamFord Academy'],
    subjectsTaught: ['Pakistan Studies'],
    curricula: ['Cambridge O Level']
  },
  {
    id: 'f7',
    name: 'Miss Salaha Akhtar',
    subject: 'Islamiyat Specialist',
    qualification: 'Senior Islamiyat Subject Specialist',
    experience: '16+ Years',
    imageUrl: '/miss_salaha_akhtar.png',
    bio: 'Over 16 years of teaching experience in Islamiyat across renowned educational institutions. Highly experienced in delivering concept-based learning, values integration, and exam-focused preparation for international curricula. Dedicated to helping students develop strong analytical, descriptive, and critical thinking skills while achieving outstanding academic results.',
    achievement: 'Helped students achieve top grades through concept-based learning and deep understanding of Islamic teachings.',
    schools: ['DHA Senior School for Girls', 'Pak-Turk Internationals'],
    subjectsTaught: ['Islamiyat'],
    curricula: ['Cambridge O Level']
  },
  {
    id: 'f8',
    name: 'Mr. Sajid Farooq',
    subject: 'Economics, Business Studies & Mathematics Specialist',
    qualification: 'Senior Commerce & Mathematics Specialist',
    experience: '10+ Years',
    imageUrl: '/mr_sajid_farooq.png',
    bio: 'Experienced educator specializing in Economics, Business Studies, and O Level Mathematics. Dedicated to building strong conceptual understanding, analytical thinking, and problem-solving skills through student-centered and exam-focused teaching. Committed to helping students excel in international curricula with personalized guidance and proven examination strategies.',
    achievement: 'Committed to building strong conceptual understanding and exam-focused problem-solving skills.',
    schools: ['CamFord Academy', 'Beaconhouse'],
    subjectsTaught: ['Economics', 'Business Studies', 'Mathematics (O Level)'],
    curricula: ['Cambridge O Level', 'Cambridge A Level']
  },
  {
    id: 'f9',
    name: 'Mr. Burhan Ali',
    subject: 'Accounting & Economics Specialist',
    qualification: 'Senior Accounting & Economics Instructor',
    experience: '15+ Years',
    imageUrl: '/mr_burhan_ali.png',
    bio: 'Experienced educator specializing in Accounting and Economics for O Level and A Level students. Skilled in delivering concept-based learning, developing analytical and problem-solving abilities, and providing exam-focused preparation. Dedicated to helping students achieve academic excellence through personalized guidance and effective teaching strategies.',
    achievement: 'Expert in developing analytical and problem-solving abilities in Accounting and Economics.',
    schools: ['Beaconhouse', 'The City School'],
    subjectsTaught: ['Accounting', 'Economics'],
    curricula: ['Cambridge O Level', 'Cambridge A Level']
  },
  {
    id: 'f10',
    name: 'Mr. Kamran Alam Butt',
    subject: 'Accounting, Economics & Business Studies Specialist',
    qualification: 'Senior Commerce Subject Lead',
    experience: '12+ Years',
    imageUrl: '/mr_kamran_alam_butt.png',
    bio: 'Experienced educator specializing in Accounting, Economics, and Business Studies for O Level and A Level students. Skilled in delivering concept-based instruction, fostering analytical thinking, and providing comprehensive exam-focused preparation. Dedicated to helping students achieve outstanding academic performance through personalized guidance, practical insights, and proven teaching methodologies.',
    achievement: 'Delivers concept-based commerce instruction and comprehensive exam-focused preparation.',
    schools: ['The City School', 'Beaconhouse'],
    subjectsTaught: ['Accounting', 'Economics', 'Business Studies'],
    curricula: ['Cambridge O Level', 'Cambridge A Level']
  },
  {
    id: 'f11',
    name: 'Mr. Ramzan Qadir',
    subject: 'English Language & Literature Specialist',
    qualification: 'Senior English Language & Literature Subject Specialist',
    experience: '20+ Years',
    imageUrl: '/mr_ramzan_qadir.png',
    bio: 'Experienced educator specializing in English Language and English Literature for O Level and A Level students. Expert in developing students\' reading, writing, critical analysis, and communication skills through engaging, concept-based instruction. Dedicated to providing exam-focused preparation and personalized guidance, helping students achieve outstanding academic results in international curricula.',
    achievement: 'Dedicated A-level English Language examiner with 20+ years of teaching expertise.',
    schools: ['Beaconhouse', 'LACAS', 'Crescent', 'International School KSA'],
    subjectsTaught: ['English Language', 'English Literature'],
    curricula: ['Cambridge O Level', 'Cambridge A Level']
  },
  {
    id: 'f12',
    name: 'Qari Muhammad Shafique',
    subject: "Qur'an & Islamic Studies Instructor",
    qualification: "Lead Qur'an & Tajweed Instructor",
    experience: '12 Years',
    imageUrl: '/qari_m_shahfique.jpg.jpeg',
    bio: 'Dedicated Qur\'an teacher with expertise in Tajweed, Qur\'an Translation, and Tafseer. Committed to helping students develop accurate Qur\'anic recitation, a strong understanding of the meanings of the Holy Qur\'an, and a deeper appreciation of its teachings. Employs a student-centered teaching approach, ensuring learners of all ages build confidence, fluency, and a lifelong connection with the Qur\'an.',
    achievement: 'Dedicated Qur\'an teacher specializing in Tajweed, Translation, and Tafseer.',
    subjectsTaught: ["Qur'an Recitation (Nazra)", 'Tajweed', 'Translation of the Holy Qur\'an', 'Tafseer', 'Islamic Studies'],
    expertise: ["Qur'an with Tajweed", 'Qur\'an Translation', 'Tafseer (Exegesis of the Qur\'an)']
  },
  {
    id: 'f13',
    name: 'Qari Hafiz Mufti Muhammad Abdullah',
    subject: 'Qur\'an, Tajweed & Islamic Studies Instructor',
    qualification: 'Lead Qur\'an, Tajweed & Tafseer Instructor',
    experience: '14+ Years',
    imageUrl: '/mr_mufti_abdullah.png',
    bio: 'Qualified Qari, Hafiz, and Mufti with expertise in teaching the Holy Qur\'an, Tajweed, Translation, and Tafseer. Dedicated to nurturing accurate Qur\'anic recitation, deep understanding of the meanings of the Holy Qur\'an, and practical application of Islamic teachings. Committed to providing personalized, student-centered instruction for learners of all ages, fostering both spiritual growth and academic excellence in Islamic education.',
    achievement: 'Qualified Mufti, Qari, and Hafiz providing personalized student-centered instruction.',
    subjectsTaught: ["Qur'an Recitation (Nazra)", 'Tajweed', 'Translation of the Holy Qur\'an', 'Tafseer', 'Islamic Studies'],
    expertise: ["Qur'an with Tajweed", 'Qur\'an Translation', 'Tafseer (Exegesis of the Holy Qur\'an)']
  },
  {
    id: 'f14',
    name: 'Mr. Shahzad Ahmad',
    subject: 'Administrative Officer',
    qualification: 'Administrative Officer',
    experience: '18+ Years',
    imageUrl: '/mr_shahzad_admin.png',
    bio: 'Dedicated and organized Administrative Officer with expertise in managing day-to-day administrative operations and ensuring the smooth functioning of academic activities. Skilled in coordinating with students, parents, and faculty members while maintaining efficient administrative processes and high professional standards. Committed to delivering excellent organizational support, effective communication, and quality service to create a productive and welcoming educational environment.',
    achievement: 'Ensures smooth and highly efficient day-to-day administrative operations for students, parents, and faculty.'
  },
  {
    id: 'f15',
    name: 'Mr. Muhammad Khalid',
    subject: 'Islamic Studies Specialist',
    qualification: 'Senior Islamic Studies Subject Lead',
    experience: '15+ Years',
    imageUrl: '/mr_m_khalid.jpeg',
    bio: 'Experienced educator specializing in Islamic Studies for O Level and A Level students. Skilled in delivering concept-based instruction with a strong emphasis on critical thinking, ethical values, and exam-focused preparation. Dedicated to helping students develop a comprehensive understanding of Islamic teachings while achieving outstanding results in international curricula.',
    achievement: 'Renowned for concept-based instruction and ethical values leadership in Islamic Studies.',
    schools: ['The City School', 'Beaconhouse', 'Avalon High', 'Kips School'],
    subjectsTaught: ['Islamic Studies'],
    curricula: ['Cambridge O Level', 'Cambridge A Level', 'CAIE IGCSE']
  },
  {
    id: 'f16',
    name: 'Miss Kazma Khalid',
    subject: 'Islamiyat Specialist',
    qualification: 'Senior Islamiyat Subject Specialist',
    experience: '18+ Years',
    imageUrl: '/miss_kazma_khalid.png',
    bio: 'Experienced educator specializing in Islamiyat for O Level and IGCSE students. Skilled in delivering concept-based learning, strengthening students\' understanding of Islamic teachings, and providing comprehensive exam-focused preparation. Dedicated to helping students achieve academic excellence through engaging instruction, critical thinking, and personalized guidance aligned with international curricula.',
    achievement: 'Expert in concept-based learning and personalized guidance for O Level and IGCSE Islamiyat.',
    schools: ['Lahore Grammar School', 'Beaconhouse Newlands', 'The City School'],
    subjectsTaught: ['Islamiyat'],
    curricula: ['Cambridge O Level', 'CAIE IGCSE']
  },
  {
    id: 'f17',
    name: 'Mr. Sikandar Raza',
    subject: 'Computer Science Specialist',
    qualification: 'Senior Computer Science Specialist',
    experience: '10+ Years',
    imageUrl: '/mr_sikandar_raza.jpg',
    bio: 'Computer Science Teacher for O-Level, A-Level, and Edexcel curricula. An experienced educator with teaching experience at Roots International Schools, Beaconhouse Newlands, and Lahore Grammar School (LGS), dedicated to helping students excel in Computer Science through a strong conceptual approach and effective exam preparation.',
    achievement: 'Dedicated to helping students excel in Computer Science through a strong conceptual approach.',
    schools: ['Roots', 'Beaconhouse Newlands'],
    subjectsTaught: ['Computer Science'],
    curricula: ['Cambridge O Level', 'Cambridge A Level', 'Pearson Edexcel']
  },
  {
    id: 'f18',
    name: 'Mr. Muhammad Shifa Rana',
    subject: 'Urdu Specialist',
    qualification: 'Senior Urdu Subject Lead',
    experience: '18+ Years',
    imageUrl: '/sir_shifa_rana.jpg',
    bio: 'Mr. Muhammad Shifa Rana is an Urdu A & Urdu B Teacher for O-Level and A-Level students. A dedicated educator specializing in Cambridge Urdu curricula, focused on developing strong language proficiency, literary analysis, grammar, and exam-oriented writing skills to help students achieve outstanding academic results.',
    achievement: 'A dedicated educator specializing in Cambridge Urdu curricula, focused on developing strong language proficiency.',
    schools: ['Beaconhouse', 'Aithchison College', 'Chandbagh School'],
    subjectsTaught: ['Urdu A', 'Urdu B', 'Urdu'],
    curricula: ['Cambridge O Level', 'Cambridge A Level']
  },
  {
    id: 'f19',
    name: 'Mr. Ghulam Mujtaba',
    subject: 'English Specialist',
    qualification: 'Senior English Language & Literature Subject Lead',
    experience: '18+ Years',
    imageUrl: '/mr_ghulam_mujtaba.png',
    bio: 'Mr. Ghulam Mujtaba is an English Language & English Literature Teacher for O-Level and A-Level students. An experienced educator with a strong background in Cambridge curricula, having taught at Sharif Education Complex, Green Hall Academy, DHA Education System, and Army Public Schools for International Studies. Specializes in developing students\' reading, writing, literary analysis, and exam techniques to achieve excellent academic results.',
    achievement: 'Specializes in developing students\' reading, writing, literary analysis, and exam techniques to achieve excellent academic results.',
    schools: ['Sharif Education Complex', 'Green Hall Academy', 'DHA Education System', 'Army Public Schools for International Studies'],
    subjectsTaught: ['English Language', 'English Literature'],
    curricula: ['Cambridge O Level', 'Cambridge A Level']
  },
  {
    id: 'f20',
    name: 'Mr. Naveed Ahmad',
    subject: 'Physics Specialist',
    qualification: 'Senior Physics Specialist',
    experience: '17+ Years',
    imageUrl: '/mr_naveed_ahmad.jpg',
    bio: 'Physics Teacher for O-Level and A-Level students. A dedicated and experienced educator specializing in the Cambridge curriculum, with expertise in Mechanics, Electricity, Waves, Thermal Physics, and Modern Physics. Focused on building strong conceptual understanding, practical problem-solving skills, and effective exam techniques to help students achieve outstanding results.',
    achievement: 'Focused on building strong conceptual understanding, practical problem-solving skills, and exam techniques.',
    schools: ['Laurals School System', 'DHA Senior School for Boys', 'International School KSA'],
    subjectsTaught: ['Physics'],
    curricula: ['Cambridge O Level', 'Cambridge A Level']
  },
  {
    id: 'f21',
    name: 'Mr. Ali Raza',
    subject: 'Pakistan Studies Specialist',
    qualification: 'Senior Pakistan Studies Specialist',
    experience: '12+ Years',
    imageUrl: '/mr_ali_raza.jpeg',
    bio: 'Pakistan Studies Teacher for O-Level and IGCSE students. A highly experienced educator with a distinguished teaching background at Beaconhouse School System, The City School, Lahore Grammar School (LGS), and the European School of International Studies. Specializes in Cambridge Pakistan Studies, helping students master History, Geography, and exam-focused essay writing through a conceptual and results-driven approach.',
    achievement: 'Specializes in Cambridge Pakistan Studies, helping students master History, Geography, and exam-focused essay writing.',
    schools: ['Beaconhouse School System', 'The City School', 'Lahore Grammar School (LGS)', 'European School of International Studies'],
    subjectsTaught: ['Pakistan Studies'],
    curricula: ['Cambridge O Level', 'CAIE IGCSE']
  },
  {
    id: 'f22',
    name: 'Mr. Amjad Farooq',
    subject: 'Accounts, Economics & Business Studies Specialist',
    qualification: 'Senior Commerce Specialist',
    experience: '18+ Years',
    imageUrl: '/mr_amjad_farooq.jpg',
    bio: 'Accounts, Economics & Business Studies Teacher for O-Level and A-Level students. An experienced educator specializing in the Cambridge curriculum, dedicated to building strong conceptual understanding, analytical thinking, and exam-focused strategies. Committed to helping students excel in Accounting, Economics, and Business Studies through engaging lessons and comprehensive preparation for outstanding academic success.',
    achievement: 'Dedicated to building strong conceptual understanding, analytical thinking, and exam-focused strategies in Commerce.',
    schools: ['CamFord Academy'],
    subjectsTaught: ['Accounting', 'Economics', 'Business Studies'],
    curricula: ['Cambridge O Level', 'Cambridge A Level']
  },
  {
    id: 'f23',
    name: 'Miss Najmus Sahr Abbasi',
    subject: 'Islamiyat Specialist',
    qualification: 'Senior Islamiyat Subject Specialist',
    experience: '22 Years',
    imageUrl: '/miss_najmus_sahr_abbasi.jpeg',
    bio: 'Islamiyat Teacher for O-Level and IGCSE students. A highly experienced educator with 22 years of teaching experience, having served at The City School and Falcon Grammar School, Karachi. Specializes in the Cambridge Islamiyat curriculum, guiding students through conceptual understanding, structured exam preparation, and effective answer-writing techniques to achieve outstanding academic results.',
    achievement: 'Highly experienced Islamiyat educator with 22 years of outstanding teaching history.',
    schools: ['The City School', 'Falcon Grammar School, Karachi'],
    subjectsTaught: ['Islamiyat'],
    curricula: ['Cambridge O Level', 'CAIE IGCSE']
  },
  {
    id: 'f24',
    name: 'Mr. Hafiz Muhammad Siddique',
    subject: 'Islamiyat Specialist',
    qualification: 'Senior Islamiyat Specialist',
    experience: '25+ Years',
    imageUrl: '/mr_hafiz_m_siddique.jpg',
    bio: 'Islamiyat Teacher for O-Level and A-Level students. An experienced educator with a distinguished teaching background at Beaconhouse School System and DHA Senior School for Boys. Specializes in the Cambridge Islamiyat curriculum, fostering a deep conceptual understanding, strong analytical skills, and exam-focused preparation to help students achieve exceptional academic results.',
    achievement: 'Fosters deep conceptual understanding and exam-focused preparation in Islamiyat.',
    schools: ['Beaconhouse School System', 'DHA Senior School for Boys'],
    subjectsTaught: ['Islamiyat'],
    curricula: ['Cambridge O Level', 'Cambridge A Level']
  },
  {
    id: 'f25',
    name: 'Mr. Haroon Ahmad',
    subject: 'Urdu Specialist',
    qualification: 'Senior Urdu Subject Specialist',
    experience: '20+ Years',
    imageUrl: '/mr_haroon_ahmad.jpeg',
    bio: 'Urdu Teacher (Syllabus A & B) for O-Level and A-Level students. A dedicated and accomplished educator specializing in the Cambridge Urdu curriculum, with expertise in Urdu Language, Literature, grammar, comprehension, and creative writing. Committed to developing students\' language proficiency, literary appreciation, and exam-writing skills to help them achieve outstanding academic results.',
    achievement: 'Committed to developing students\' language proficiency, literary appreciation, and exam-writing skills in Urdu.',
    schools: ['CamFord Academy'],
    subjectsTaught: ['Urdu A', 'Urdu B', 'Urdu'],
    curricula: ['Cambridge O Level', 'Cambridge A Level']
  },
  {
    id: 'f26',
    name: 'Mr. Maher Shah',
    subject: 'English Specialist',
    qualification: 'Senior English Language & Literature Specialist',
    experience: '17+ Years',
    imageUrl: '/mr_maher_shah.jpg',
    bio: 'English Language & English Literature Teacher for O-Level and A-Level students. An experienced educator with a strong teaching background at Ibn-e-Sina College and Lahore Grammar School (LGS). Specializes in the Cambridge English curriculum, helping students excel in language proficiency, literary analysis, essay writing, comprehension, and examination techniques through a concept-based and results-oriented approach.',
    achievement: 'Helps students excel in language proficiency, literary analysis, and essay writing.',
    schools: ['Ibn-e-Sina College', 'Lahore Grammar School (LGS)'],
    subjectsTaught: ['English Language', 'English Literature'],
    curricula: ['Cambridge O Level', 'Cambridge A Level']
  },
  {
    id: 'f27',
    name: 'Mr. Najaf Ali',
    subject: 'Chemistry Specialist',
    qualification: 'Senior Chemistry Specialist',
    experience: '13+ Years',
    imageUrl: '/mr_najaf_ali.jpg',
    bio: 'Chemistry for O/A-Levels (CAIE & Edexcel). Expert in delivering a strong conceptual understanding of Physical, Organic, and Inorganic Chemistry, with a focus on exam-oriented preparation, practical applications, and past paper mastery to help students achieve outstanding results.',
    achievement: 'Expert in delivering physical, organic, and inorganic chemistry with past paper mastery.',
    schools: ['Laxis Academy'],
    subjectsTaught: ['Chemistry'],
    curricula: ['Cambridge O Level', 'Cambridge A Level', 'Pearson Edexcel']
  },
  {
    id: 'f28',
    name: 'Mr. Shoaib Ishtiaq',
    subject: 'Computer Science & ICT Specialist',
    qualification: 'Senior Computer Science & ICT Specialist',
    experience: '16+ Years',
    imageUrl: '/mr_shoaib_ishtiaq.jpg',
    bio: 'Computer Science & ICT for O/A-Levels (CAIE & Edexcel). Experienced educator with teaching expertise from The City School, Scarsdale International School, and Lahore Grammar School. Specializes in programming, algorithms, databases, networking, ICT applications, and exam-focused preparation, helping students build strong technical skills and achieve excellent academic results.',
    achievement: 'Specializes in programming, algorithms, databases, networking, and ICT applications.',
    schools: ['The City School', 'Scarsdale International School', 'Lahore Grammar School'],
    subjectsTaught: ['Computer Science', 'ICT'],
    curricula: ['Cambridge O Level', 'Cambridge A Level', 'Pearson Edexcel']
  },
  {
    id: 'f29',
    name: 'Qari Hafiz Muhammad Abdulrehman',
    subject: 'Qur\'an & Islamic Studies Instructor',
    qualification: 'Lead Qur\'an & Tajweed Instructor',
    experience: '14+ Years',
    imageUrl: '/qari_hafiz_m_abdur_rahman.jpg',
    bio: 'Qur\'an Teacher – Tajweed, Translation & Tafseer. A dedicated Qur\'an instructor specializing in Tajweed, Qur\'anic Translation, and Tafseer. Committed to helping students develop accurate recitation, a deeper understanding of the Qur\'an, and a strong foundation in Islamic knowledge through structured and engaging lessons.',
    achievement: 'Dedicated Qur\'an instructor specializing in Tajweed, Qur\'anic Translation, and Tafseer.',
    subjectsTaught: ["Qur'an Recitation (Nazra)", 'Tajweed', 'Translation of the Holy Qur\'an', 'Tafseer'],
    expertise: ["Qur'an with Tajweed", 'Qur\'an Translation', 'Tafseer (Exegesis of the Holy Qur\'an)']
  },
  {
    id: 'f30',
    name: 'Mr. Muhammad Awais',
    subject: 'Computer Science & ICT Instructor',
    qualification: 'Expert Computer Science & ICT Instructor',
    experience: '6+ Years',
    imageUrl: '/muhammad_awais.png',
    bio: 'Expert Computer Science & ICT Instructor for Cambridge O Levels / IGCSE, dedicated to building strong technical foundations, enhancing problem-solving skills, and preparing students for academic excellence through concept-based learning and practical application.',
    achievement: 'Dedicated to building strong technical foundations and enhancing problem-solving skills for O Levels / IGCSE Computer Science & ICT.',
    schools: ['Alliance Academy', 'CamFord Academy'],
    subjectsTaught: ['Computer Science', 'ICT'],
    curricula: ['Cambridge O Level', 'CAIE IGCSE']
  },
  {
    id: 'f31',
    name: 'Mr. Muhammad Aseer',
    subject: 'Urdu Specialist',
    qualification: 'Senior Urdu Subject Lead',
    experience: '15+ Years',
    imageUrl: '/mr_muhammad_aseer.jpg',
    bio: 'Expert Urdu (Syllabus A & B) Instructor for Cambridge O & A Levels with 15+ Years of Teaching Experience. Former Faculty Member at Lahore Grammar School and Beaconhouse, Dedicated to Developing Strong Language Skills, Critical Thinking, and Outstanding Examination Performance.',
    achievement: 'Expert Urdu (Syllabus A & B) Instructor with 15+ Years of Teaching Experience.',
    schools: ['Lahore Grammar School', 'Beaconhouse'],
    subjectsTaught: ['Urdu A', 'Urdu B', 'Urdu'],
    curricula: ['Cambridge O Level', 'Cambridge A Level']
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
    quote: "The pedagogical precision at CamFord Academiya transformed my approach to A-Level Physics. Mr. Bilal Farooq did not just teach formulas; he showed us the beauty of the design behind the lab experiments. I got 4 A*s and am now heading to Cambridge!",
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
    quote: "Mr. Muzammil Ahmed is a legend. His mathematical shortcuts and past paper prediction booklet saved my grades. I got an A* in Mathematics and Further Math. If you want results, CamFord Academiya is the only logical choice in Lahore.",
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
  },
  {
    id: 't5',
    quote: "The Chemistry practical sessions and comprehensive mock exams prepared me perfectly for my CAIEs. Mr. Bilal's notes are incredibly precise and summarize everything we need to know. I scored straight A*s across all my sciences!",
    name: "Amina Yusuf",
    level: "O Levels (8 A*s)",
    rating: 5,
    role: 'Student'
  },
  {
    id: 't6',
    quote: "CamFord Academiya was a game changer for my daughter's A-Level grades. The personalized attention, individual feedback sessions, and constant communication from the administration kept us well-informed. She secured her path to LUMS!",
    name: "Mrs. Naila Kamran",
    level: "Parent of Sarah Kamran (A-Levels)",
    rating: 5,
    role: 'Parent'
  },
  {
    id: 't7',
    quote: "I was struggling with macroeconomics until I joined the revision sessions at CamFord. The mock exams and diagnostic tools pinpointed exactly where I was losing marks. Going from a C in school prep to an A in the CAIEs was unbelievable!",
    name: "Mustafa Sheikh",
    level: "A Levels Grad (3 As)",
    rating: 5,
    role: 'Student'
  },
  {
    id: 't8',
    quote: "The professional guidance and structured learning plan at CamFord are unparalleled. My daughter felt completely supported, not just academically but also during her university applications. I highly recommend them for Lahore's top candidates.",
    name: "Brig. (R) Tariq Mahmood",
    level: "Parent of Noor Tariq (A-Levels)",
    rating: 5,
    role: 'Parent'
  },
  {
    id: 't9',
    quote: "THANK YOU SO MUCH SIR! It was your consistent support and motivation that has helped me come here. I am grateful to have a teacher like you, who gave all his time for my understanding. It's amazing to call you my teacher. Sir Ahmad!",
    name: "Hamza Malik",
    level: "A Levels Student (Sir Ahmad's Student)",
    rating: 5,
    role: 'Student'
  },
  {
    id: 't10',
    quote: "The diagnostic mock exams at CamFord are exceptionally close to the actual CAIE standard. The detailed feedback folders helped me identify exact mark-losing patterns in O-Level Chemistry and Physics. I ended up with straight A*s!",
    name: "Ayaan Siddiqui",
    level: "O Levels (9 A*s)",
    rating: 5,
    role: 'Student'
  },
  {
    id: 't11',
    quote: "Choosing CamFord Academiya was the best decision we made for our daughter's education. The direct access to the teachers and the weekly progress updates via WhatsApp kept us aligned. Her grades improved dramatically.",
    name: "Mrs. Yasmin Shah",
    level: "Parent of Minahil Shah (A-Levels)",
    rating: 5,
    role: 'Parent'
  },
  {
    id: 't12',
    quote: "The teachers here don't just ask you to memorize; they build your concepts from scratch. The small batch size meant I could ask questions without hesitation. The revision notes for AS Mathematics were a lifesaver.",
    name: "Rayan Khan",
    level: "A Levels Student",
    rating: 5,
    role: 'Student'
  },
  {
    id: 't13',
    quote: "I was struggling with structured answer layouts in Islamiyat and Pakistan Studies until I joined. The chronological mapping and high-scoring essay templates made a massive difference in my final CAIE exam performance.",
    name: "Maham Bukhari",
    level: "O Levels (Distinction Candidate)",
    rating: 5,
    role: 'Student'
  },
  {
    id: 't14',
    quote: "CamFord has a very professional and encouraging environment. The administrative staff is highly cooperative and the teachers go above and beyond, hosting extra sessions close to exams. Highly recommended for commerce subjects!",
    name: "Sarmad Ali",
    level: "A Levels Grad (3 A*)",
    rating: 5,
    role: 'Student'
  },
  {
    id: 't15',
    quote: "Our son's understanding of Computer Science concepts improved immensely after joining CamFord. The programming labs and algorithm walkthroughs converted his fear of code into pure enthusiasm. He secured an A*.",
    name: "Mr. Jahangir Chaudhry",
    level: "Parent of Bilal Chaudhry (O-Levels)",
    rating: 5,
    role: 'Parent'
  },
  {
    id: 't16',
    quote: "The study abroad consultancy at CamFord is stellar. Not only did they help me secure top grades in my A-Level Biology and Chemistry, but they also guided me through my university application and scholarship essays.",
    name: "Fiza Malik",
    level: "LUMS Admit (A-Level Grad)",
    rating: 5,
    role: 'Student'
  },
  {
    id: 't17',
    quote: "Amazing learning experience! The topical past paper compilations provided by the academy are incredibly comprehensive. Practicing under timed conditions during mock sessions made the actual exams feel like a breeze.",
    name: "Zeeshan Haider",
    level: "A Levels Student",
    rating: 5,
    role: 'Student'
  },
  {
    id: 't18',
    quote: "As a private candidate, finding a structured morning cohort is extremely difficult. CamFord's morning classes for O-Levels gave me a school-like routine with the focused care of top-tier instructors. Truly an outstanding academy.",
    name: "Fatima Noor",
    level: "Private O-Levels Candidate",
    rating: 5,
    role: 'Student'
  },
  {
    id: 't19',
    quote: "The pedagogy here is outstanding. The accounting worksheets and ledger templates helped me master complex double-entry concepts quickly. The instructors are incredibly patient and dedicated to every student's success.",
    name: "Zarrar Butt",
    level: "A Levels Grad (A* in Accounting)",
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
  name: "Ahmed Jan",
  role: "Islamiyat 0493/2058/9488",
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




