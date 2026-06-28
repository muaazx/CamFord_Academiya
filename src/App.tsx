import { useState, useEffect, useRef, FormEvent, MouseEvent } from 'react';
import emailjs from '@emailjs/browser';
import {
  GraduationCap,
  Calculator,
  Atom,
  Beaker,
  Dna,
  Cpu,
  BookOpen,
  Globe,
  Bookmark,
  TrendingUp,
  Briefcase,
  Scale,
  Award,
  Users,
  CheckSquare,
  FileText,
  Bell,
  Clock,
  ChevronLeft,
  ChevronRight,
  Star,
  Phone,
  Mail,
  MapPin,
  Check,
  Menu,
  X,
  Target,
  Compass,
  LogOut
} from 'lucide-react';
import {
  oLevelSubjects,
  aLevelSubjects,
  facultyMembers,
  achievementsList,
  featuresList,
  testimonialsList,
  headTeacher,
  FacultyMember,
  successSlides,
} from './data';
import ClickSpark from './ClickSpark';
import ScrollFloat from './ScrollFloat';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import TextCursor from './TextCursor';
import ShapeGrid from './ShapeGrid';
import CardSwap, { Card } from './CardSwap';
import { useAuth } from './context/AuthContext';
import { supabase } from './supabase';

export default function App() {
  // Auth state hook
  const { user, role, loginWithGoogle, loginWithEmail, registerStudent, logout, isConfigured } = useAuth();

  // Navigation & UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'olevel' | 'alevel'>('olevel');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);

  // Auth Portal UI States
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showStudentPortal, setShowStudentPortal] = useState(false);
  const [showAdminPortal, setShowAdminPortal] = useState(false);
  const [authTab, setAuthTab] = useState<'student' | 'admin'>('student');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // Auth Input Fields State
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Dropdown UI State
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Notifications State (admin bell icon)
  const [notifications, setNotifications] = useState<Array<{id: number; type: 'inquiry' | 'upload'; title: string; detail: string; time: string; read: boolean}>>([]);
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);

  // Stats Counters
  const [studentsCount, setStudentsCount] = useState(0);
  const [rateCount, setRateCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [awardsCount, setAwardsCount] = useState(0);

  // Form States
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [level, setLevel] = useState('');
  const [subjects, setSubjects] = useState('');
  const [message, setMessage] = useState('');

  // Form Validation & Success states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successSubmitted, setSuccessSubmitted] = useState(false);

  // Admin Inquiries State for Dashboard List
  const [inquiries, setInquiries] = useState<any[]>([
    {
      id: 1,
      fullName: 'Rayyan Shah',
      phone: '0321 4567890',
      email: 'rayyan@gmail.com',
      level: 'alevel',
      subjects: 'Physics, Pure Math (9709)',
      message: 'Need urgent help with A2 Mechanics and practical preparation.',
      timestamp: '2026-06-27 10:30 AM'
    },
    {
      id: 2,
      fullName: 'Ayesha Fatima',
      phone: '0333 8765432',
      email: 'ayesha@hotmail.com',
      level: 'olevel',
      subjects: 'Chemistry (5070), Biology',
      message: 'Looking to join Year 10 evening mock-prep batches.',
      timestamp: '2026-06-27 11:15 AM'
    }
  ]);

  // Subject Notes and Past Papers Library State
  // Starts empty — populated from Supabase on mount (see useEffect below)
  const [notesList, setNotesList] = useState<any[]>([]);

  // Notes Form Upload States
  const [noteTitle, setNoteTitle] = useState('');
  const [noteSubject, setNoteSubject] = useState('english');
  const [noteType, setNoteType] = useState<'notes' | 'pastpaper'>('notes');
  const [noteFileName, setNoteFileName] = useState('');
  const [noteFileSize, setNoteFileSize] = useState('2.5 MB');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Upload Popup State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccessMark, setUploadSuccessMark] = useState(false);

  // Login Success Popup State
  const [showLoginSuccessPopup, setShowLoginSuccessPopup] = useState(false);

  // Sub-tab selectors inside Student and Admin Portals
  const [activeAdminTab, setActiveAdminTab] = useState<'inquiries' | 'notes'>('inquiries');
  const [activeStudentTab, setActiveStudentTab] = useState<'schedule' | 'notes'>('schedule');
  const [notesFilter, setNotesFilter] = useState<'all' | 'english' | 'urdu' | 'islamiat' | 'mathematics' | 'physics' | 'pakstudies' | 'computerscience'>('all');

  // ─── Supabase: Load live data on mount ─────────────────────────────────────
  useEffect(() => {
    if (!supabase) return; // graceful fallback if .env is missing

    // Fetch notes from Supabase
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setNotesList(data);
    };

    // Fetch inquiries from Supabase
    const fetchInquiries = async () => {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('timestamp', { ascending: false });
      if (!error && data) setInquiries(data);
    };

    fetchNotes();
    fetchInquiries();
  }, []);
  // ─────────────────────────────────────────────────────────────────────────────

  // Refs for tracking scroll animations
  const statsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Close login modal automatically when user successfully logs in
  useEffect(() => {
    if (user && showLoginModal) {
      setShowLoginModal(false);
      setShowLoginSuccessPopup(true);
      setTimeout(() => {
        setShowLoginSuccessPopup(false);
      }, 2000);
    }
  }, [user, showLoginModal]);

  // Auto-play testimonial carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonialsList.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Stats counting animation
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const statsNode = statsRef.current;

    if (statsNode) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            // Students counter (0 to 500)
            let studentsStart = 0;
            const studentsEnd = 500;
            const studentsDuration = 2000;
            const studentsStep = Math.ceil(studentsEnd / (studentsDuration / 30));
            const studentsTimer = setInterval(() => {
              studentsStart += studentsStep;
              if (studentsStart >= studentsEnd) {
                setStudentsCount(studentsEnd);
                clearInterval(studentsTimer);
              } else {
                setStudentsCount(studentsStart);
              }
            }, 30);

            // Rate counter (0 to 95)
            let rateStart = 0;
            const rateEnd = 95;
            const rateDuration = 2000;
            const rateStep = Math.ceil(rateEnd / (rateDuration / 30));
            const rateTimer = setInterval(() => {
              rateStart += rateStep;
              if (rateStart >= rateEnd) {
                setRateCount(rateEnd);
                clearInterval(rateTimer);
              } else {
                setRateCount(rateStart);
              }
            }, 30);

            // Years counter (0 to 12)
            let yearsStart = 0;
            const yearsEnd = 12;
            const yearsTimer = setInterval(() => {
              yearsStart += 1;
              if (yearsStart >= yearsEnd) {
                setYearsCount(yearsEnd);
                clearInterval(yearsTimer);
              } else {
                setYearsCount(yearsStart);
              }
            }, 100);

            // Awards counter (0 to 45)
            let awardsStart = 0;
            const awardsEnd = 45;
            const awardsStep = Math.ceil(awardsEnd / (rateDuration / 30));
            const awardsTimer = setInterval(() => {
              awardsStart += awardsStep;
              if (awardsStart >= awardsEnd) {
                setAwardsCount(awardsEnd);
                clearInterval(awardsTimer);
              } else {
                setAwardsCount(awardsStart);
              }
            }, 30);

            if (observer && statsNode) observer.unobserve(statsNode);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(statsNode);
    }

    return () => {
      if (observer && statsNode) {
        observer.unobserve(statsNode);
      }
    };
  }, []);

  // Map icon names to Lucide Icon Components
  const renderIcon = (iconName: string, className: string = "w-6 h-6 text-primary") => {
    switch (iconName) {
      case 'calculator': return <Calculator className={className} />;
      case 'atom': return <Atom className={className} />;
      case 'beaker': return <Beaker className={className} />;
      case 'dna': return <Dna className={className} />;
      case 'cpu': return <Cpu className={className} />;
      case 'book-open': return <BookOpen className={className} />;
      case 'globe': return <Globe className={className} />;
      case 'bookmark': return <Bookmark className={className} />;
      case 'trending-up': return <TrendingUp className={className} />;
      case 'briefcase': return <Briefcase className={className} />;
      case 'scale': return <Scale className={className} />;
      case 'award': return <Award className={className} />;
      case 'users': return <Users className={className} />;
      case 'check-square': return <CheckSquare className={className} />;
      case 'file-text': return <FileText className={className} />;
      case 'bell': return <Bell className={className} />;
      case 'clock': return <Clock className={className} />;
      default: return <GraduationCap className={className} />;
    }
  };

  // Timeline horizontal scroll function
  const scrollTimeline = (direction: 'left' | 'right') => {
    if (timelineRef.current) {
      const scrollAmount = 340;
      if (direction === 'left') {
        timelineRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        timelineRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Form Validation & Admission Submit Handler
  const handleAdmissionSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const tempErrors: { [key: string]: string } = {};

    // Name check
    if (!fullName.trim()) {
      tempErrors.fullName = 'Full Name is required.';
    } else if (fullName.trim().length < 3) {
      tempErrors.fullName = 'Name must be at least 3 characters long.';
    }

    // Phone check (realistic Pakistani format)
    const phonePattern = /^(\+92|0|92)?(3\d{2})\d{7}$/;
    if (!phone.trim()) {
      tempErrors.phone = 'Phone number is required.';
    } else if (!phonePattern.test(phone.replace(/\s+/g, ''))) {
      tempErrors.phone = 'Please provide a valid Pakistani phone number (e.g. 03001234567).';
    }

    // Email check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      tempErrors.email = 'Email address is required.';
    } else if (!emailPattern.test(email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }

    // Level select check
    if (!level) {
      tempErrors.level = 'Please select an academic level.';
    }

    // Subjects select check
    if (!subjects.trim()) {
      tempErrors.subjects = 'Please list subjects of interest.';
    }

    setErrors(tempErrors);

    // If validation passes
    if (Object.keys(tempErrors).length === 0) {
      const newInquiry = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        level,
        subjects: subjects.trim(),
        message: message.trim() || 'No additional notes provided.',
        timestamp: new Date().toLocaleString('en-US', { hour12: true })
      };

      // ── Save to Supabase inquiries table ─────────────────────────────────
      if (supabase) {
        try {
          const { data: inserted, error: insertErr } = await supabase
            .from('inquiries')
            .insert([{
              full_name: newInquiry.fullName,
              phone: newInquiry.phone,
              email: newInquiry.email,
              level: newInquiry.level,
              subjects: newInquiry.subjects,
              message: newInquiry.message,
            }])
            .select();
          if (!insertErr && inserted && inserted[0]) {
            setInquiries(prev => [{ ...inserted[0], id: inserted[0].id, fullName: inserted[0].full_name }, ...prev]);
          } else {
            // Fallback: add locally if Supabase fails
            setInquiries(prev => [{ id: Date.now(), ...newInquiry }, ...prev]);
          }
        } catch {
          setInquiries(prev => [{ id: Date.now(), ...newInquiry }, ...prev]);
        }
      } else {
        setInquiries(prev => [{ id: Date.now(), ...newInquiry }, ...prev]);
      }

      // ── Send email notification via EmailJS ───────────────────────────────
      // NOTE: Replace SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY below with your
      // EmailJS credentials from https://dashboard.emailjs.com/
      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
            {
              to_email: 'camford.academy.edu@gmail.com',
              full_name: newInquiry.fullName,
              email: newInquiry.email,
              phone: newInquiry.phone,
              program: newInquiry.level === 'olevel' ? 'O-Levels' : newInquiry.level === 'alevel' ? 'A-Levels' : 'Study Abroad Consultancy',
              subjects: newInquiry.subjects,
              comments: newInquiry.message,
              timestamp: newInquiry.timestamp,
            },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
        );
      } catch (emailErr) {
        // Email failure should not block the form submission
        console.warn('EmailJS send failed (configure VITE_EMAILJS_* keys in .env):', emailErr);
      }

      // ── Push notification to admin bell panel ─────────────────────────────
      const newNotif = {
        id: Date.now(),
        type: 'inquiry' as const,
        title: `New Admission Query — ${newInquiry.fullName}`,
        detail: `${newInquiry.level === 'olevel' ? 'O-Levels' : 'A-Levels'} • ${newInquiry.subjects}`,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        read: false,
      };
      setNotifications(prev => [newNotif, ...prev]);

      setSuccessSubmitted(true);
      // Reset form fields
      setFullName('');
      setPhone('');
      setEmail('');
      setLevel('');
      setSubjects('');
      setMessage('');
      
      // Clear success notification after 5 seconds
      setTimeout(() => {
        setSuccessSubmitted(false);
      }, 5000);
    }
  };

  // User Auth Forms Handler
  const handleAuthSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (authMode === 'login') {
      const res = await loginWithEmail(authEmail, authPassword, authTab);
      if (res.success) {
        setAuthSuccess('Access authorized! Redirecting to portal...');
        setTimeout(() => {
          setShowLoginModal(false);
          setAuthEmail('');
          setAuthPassword('');
          setAuthSuccess('');
        }, 1200);
      } else {
        setAuthError(res.error || 'Invalid credentials.');
      }
    } else {
      const res = await registerStudent(authEmail, authPassword, authName);
      if (res.success) {
        setAuthSuccess('Student profile created! Redirecting...');
        setTimeout(() => {
          setShowLoginModal(false);
          setAuthEmail('');
          setAuthPassword('');
          setAuthName('');
          setAuthSuccess('');
        }, 1200);
      } else {
        setAuthError(res.error || 'Failed to register.');
      }
    }
  };

  // Admin Notes Upload Handler — Storage upload first, then DB insert
  const handleNoteUploadSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!noteTitle.trim()) {
      alert('Please enter a resource title.');
      return;
    }
    if (!selectedFile) {
      alert('Please select a file to upload (PDF, DOC, etc.).');
      return;
    }

    // ── Client-side file size check (50 MB hard limit) ───────────────────────
    const MAX_FILE_SIZE_MB = 50;
    const fileSizeMB = selectedFile.size / 1024 / 1024;
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      alert(
        `File is too large: ${fileSizeMB.toFixed(1)} MB\n\n` +
        `Maximum allowed upload size is ${MAX_FILE_SIZE_MB} MB.\n\n` +
        `Please compress the file or split it into smaller parts.\n` +
        `You can use ilovepdf.com (PDFs) or 7-Zip (documents) to reduce file size.`
      );
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadSuccessMark(false);

    // Simulate smooth progress up to 90%
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    const finishUpload = () => {
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadSuccessMark(true);
      setTimeout(() => {
        setIsUploading(false);
        setUploadSuccessMark(false);
        setUploadProgress(0);
      }, 2000);
    };

    if (!supabase) {
      // Supabase not connected — save to local state only
      const localNote = {
        id: Date.now(),
        title: noteTitle.trim(),
        subject: noteSubject,
        type: noteType,
        file_name: selectedFile.name,
        file_size: `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`,
        file_url: '',
        uploaded_by: user?.displayName || 'Administrator',
        date: new Date().toISOString().split('T')[0],
      };
      setNotesList(prev => [localNote, ...prev]);
      
      finishUpload();
      setNoteTitle(''); setSelectedFile(null);
      return;
    }

    // ── Step 1: Upload file binary to Supabase Storage ──────────────────────
    const uniquePath = `notes/${Date.now()}_${selectedFile.name.replace(/\s+/g, '_')}`;
    const { data: storageData, error: storageError } = await supabase.storage
      .from('academic-resources')
      .upload(uniquePath, selectedFile, {
        cacheControl: '3600',
        upsert: false,
      });

    if (storageError) {
      clearInterval(progressInterval);
      setIsUploading(false);
      console.error('Storage upload error:', storageError);

      const isSizeError = /size|too large|maximum|exceeded/i.test(storageError.message || '');
      if (isSizeError) {
        alert(
          `Upload failed — file too large (${fileSizeMB.toFixed(1)} MB)\n\n` +
          `Your Supabase Storage bucket has a size limit that this file exceeds.\n\n` +
          `To raise the limit, go to:\n` +
          `Supabase Dashboard → Storage → Buckets → academic-resources → Edit\n` +
          `→ Set "Max file upload size" to 50 MB or higher.\n\n` +
          `Alternatively, compress the file to under 50 MB before uploading.`
        );
      } else {
        alert(`File upload to Storage failed:\n${storageError.message}\n\nPlease make sure the "academic-resources" bucket exists and has INSERT permissions enabled in your Supabase project.`);
      }
      return; // STOP — do not insert metadata without a real file
    }

    // ── Step 2: Get the public download URL ─────────────────────────────────
    const { data: urlData } = supabase.storage
      .from('academic-resources')
      .getPublicUrl(storageData.path);

    const publicUrl = urlData?.publicUrl || '';
    if (!publicUrl) {
      clearInterval(progressInterval);
      setIsUploading(false);
      alert('File uploaded but could not retrieve public URL. Check your bucket is set to Public in Supabase Storage settings.');
      return;
    }

    // ── Step 3: Save metadata to the notes table ─────────────────────────────
    const newNote = {
      title: noteTitle.trim(),
      subject: noteSubject,
      type: noteType,
      file_name: selectedFile.name,
      file_size: `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`,
      file_url: publicUrl,
      uploaded_by: user?.displayName || 'Administrator',
    };

    const { data: insertData, error: insertError } = await supabase
      .from('notes')
      .insert([newNote])
      .select();

    if (insertError) {
      clearInterval(progressInterval);
      setIsUploading(false);
      console.error('Database insert error:', insertError);
      alert(`Metadata save failed:\n${insertError.message}`);
      return;
    }

    // ── Success ───────────────────────────────────────────────────────────────
    if (insertData && insertData[0]) {
      setNotesList(prev => [insertData[0], ...prev]);
    }
    
    // Push upload notification to admin bell panel
    const uploadNotif = {
      id: Date.now(),
      type: 'upload' as const,
      title: `Resource Uploaded — ${noteTitle.trim()}`,
      detail: `${noteType === 'notes' ? 'Syllabus Notes' : 'Past Paper'} • ${noteSubject}`,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };
    setNotifications(prev => [uploadNotif, ...prev]);

    finishUpload();

    // Reset form
    setNoteTitle('');
    setNoteFileName('');
    setNoteFileSize('2.5 MB');
    setSelectedFile(null);
  };

  const handleSmoothScroll = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <ClickSpark
      sparkColor="#C9A84C"
      sparkSize={12}
      sparkRadius={20}
      sparkCount={10}
      duration={450}
    >
      <div className="min-h-screen bg-bg-light text-text-dark font-sans overflow-x-hidden antialiased">
      
      {/* 1. STICKY NAVBAR */}
      <header id="navbar" className="fixed top-0 left-0 w-full z-50 bg-primary/95 backdrop-blur-md border-b-4 border-accent shadow-soft-layered">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo / Academy Crest */}
          <a href="#hero" onClick={(e) => handleSmoothScroll(e, 'hero')} className="flex items-center gap-2 sm:gap-3 group min-w-0">
            <div className="w-9 h-9 sm:w-12 sm:h-12 bg-white flex items-center justify-center rounded-md shadow-md transition-transform duration-300 group-hover:scale-105 overflow-hidden shrink-0" id="logo-crest">
              <img src="/academy_logo.png" alt="CamFord Academiya Logo" className="w-full h-full object-contain p-1" />
            </div>
            <div className="min-w-0">
              <span className="block text-white font-bold tracking-wider text-sm sm:text-xl uppercase font-serif leading-tight">CamFord Academiya</span>
              <span className="hidden sm:block text-accent text-[10px] tracking-widest uppercase font-semibold">O/A Levels Elite</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="text-white/80 hover:text-accent font-medium text-xs transition-colors py-2 uppercase tracking-wider">About</a>
            <a href="#programs" onClick={(e) => handleSmoothScroll(e, 'programs')} className="text-white/80 hover:text-accent font-medium text-xs transition-colors py-2 uppercase tracking-wider">Programs</a>
            <a href="#faculty" onClick={(e) => handleSmoothScroll(e, 'faculty')} className="text-white/80 hover:text-accent font-medium text-xs transition-colors py-2 uppercase tracking-wider">Faculty</a>
            <a href="#achievements" onClick={(e) => handleSmoothScroll(e, 'achievements')} className="text-white/80 hover:text-accent font-medium text-xs transition-colors py-2 uppercase tracking-wider">Results</a>
            <a href="#admissions" onClick={(e) => handleSmoothScroll(e, 'admissions')} className="text-white/80 hover:text-accent font-medium text-xs transition-colors py-2 uppercase tracking-wider">Admissions</a>
            <a href="#admissions" onClick={(e) => { handleSmoothScroll(e, 'admissions'); setLevel('consultancy'); setSubjects('Study Abroad Consultancy (AR Consultants)'); }} className="text-accent hover:text-accent/90 hover:scale-105 transition-all font-bold text-xs py-2 uppercase tracking-wider">Consultancy</a>
            <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="text-white/80 hover:text-accent font-medium text-xs transition-colors py-2 uppercase tracking-wider">Contact</a>
            
            <button 
              onClick={() => {
                if (user) {
                  if (role === 'admin') setShowAdminPortal(true);
                  else setShowStudentPortal(true);
                } else {
                  setShowLoginModal(true);
                  setAuthError(''); setAuthSuccess('');
                }
              }}
              className="text-accent hover:text-white font-bold text-xs transition-colors py-2 uppercase tracking-wider border-none bg-transparent cursor-pointer"
            >
              Resource Library
            </button>
            
            {/* Notification Bell — Admin only */}
            {user && role === 'admin' && (
              <div className="relative">
                <button
                  onClick={() => { setShowNotificationsPanel(prev => !prev); setShowProfileDropdown(false); }}
                  className="relative text-white/80 hover:text-accent transition-colors cursor-pointer border-none bg-transparent p-1"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                      {notifications.filter(n => !n.read).length > 9 ? '9+' : notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>

                {showNotificationsPanel && (
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-md shadow-2xl border border-primary/10 overflow-hidden z-50 animate-slide-down">
                    <div className="px-4 py-3 border-b border-primary/5 bg-primary/5 flex items-center justify-between">
                      <p className="text-xs font-bold text-primary uppercase tracking-wider">Notifications</p>
                      {notifications.filter(n => !n.read).length > 0 && (
                        <button
                          onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                          className="text-[10px] text-accent hover:underline font-bold cursor-pointer border-none bg-transparent"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-text-dark/50 text-center py-6">No notifications yet</p>
                      ) : (
                        notifications.map(notif => (
                          <div
                            key={notif.id}
                            onClick={() => setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n))}
                            className={`flex items-start gap-3 px-4 py-3 border-b border-primary/5 cursor-pointer transition-colors ${notif.read ? 'bg-white hover:bg-primary/[0.02]' : 'bg-accent/5 hover:bg-accent/10'}`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${notif.type === 'inquiry' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                              {notif.type === 'inquiry' ? <Users className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-primary leading-tight">{notif.title}</p>
                              <p className="text-[10px] text-text-dark/60 mt-0.5 truncate">{notif.detail}</p>
                              <p className="text-[9px] text-text-dark/40 font-mono mt-1">{notif.time}</p>
                            </div>
                            {!notif.read && <span className="w-2 h-2 bg-red-500 rounded-full shrink-0 mt-1.5"></span>}
                          </div>
                        ))
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="px-4 py-2 border-t border-primary/5 bg-primary/[0.02]">
                        <button
                          onClick={() => { setShowAdminPortal(true); setShowNotificationsPanel(false); }}
                          className="text-[10px] text-accent hover:underline font-bold cursor-pointer border-none bg-transparent w-full text-left"
                        >
                          View Admin Dashboard →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)} 
                  className="flex items-center gap-2 text-white/95 hover:text-accent focus:outline-none transition-colors cursor-pointer py-1"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full border-2 border-accent object-cover shrink-0" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-accent/20 border-2 border-accent text-accent flex items-center justify-center font-bold text-xs uppercase font-mono shrink-0">
                      {user.displayName ? user.displayName.charAt(0) : 'U'}
                    </div>
                  )}
                  <span className="font-bold text-xs uppercase tracking-wider max-w-[100px] truncate">{user.displayName ? user.displayName.split(' ')[0] : 'Portal'}</span>
                  {role === 'admin' && (
                    <span className="bg-red-500/20 text-red-300 border border-red-500/30 text-[8px] font-bold uppercase tracking-widest px-1 py-0.5 rounded-sm shrink-0">
                      Admin
                    </span>
                  )}
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-md shadow-2xl border border-primary/10 overflow-hidden z-50 animate-slide-down">
                    <div className="px-4 py-3 border-b border-primary/5 bg-primary/5 text-left">
                      <p className="text-xs font-bold text-primary truncate leading-normal">{user.displayName}</p>
                      <p className="text-[10px] text-text-dark/60 truncate leading-normal mt-0.5">{user.email}</p>
                    </div>
                    {role === 'admin' ? (
                      <button 
                        onClick={() => { setShowAdminPortal(true); setShowProfileDropdown(false); }} 
                        className="w-full text-left px-4 py-2.5 text-xs font-semibold text-primary hover:bg-accent/10 hover:text-primary transition-colors flex items-center gap-2 cursor-pointer border-none bg-transparent"
                      >
                        <Briefcase className="w-4 h-4 text-accent" /> Operations Dashboard
                      </button>
                    ) : (
                      <button 
                        onClick={() => { setShowStudentPortal(true); setShowProfileDropdown(false); }} 
                        className="w-full text-left px-4 py-2.5 text-xs font-semibold text-primary hover:bg-accent/10 hover:text-primary transition-colors flex items-center gap-2 cursor-pointer border-none bg-transparent"
                      >
                        <BookOpen className="w-4 h-4 text-accent" /> Resource Library
                      </button>
                    )}
                    <button 
                      onClick={() => { logout(); setShowProfileDropdown(false); }} 
                      className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 border-t border-primary/5 cursor-pointer bg-transparent"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => { setShowLoginModal(true); setAuthError(''); setAuthSuccess(''); }} 
                className="border border-white/30 hover:border-accent hover:text-accent text-white px-4 py-2 text-xs uppercase tracking-wider font-bold transition-all rounded-[4px] cursor-pointer"
              >
                Portal Login
              </button>
            )}

            <a href="#admissions" onClick={(e) => handleSmoothScroll(e, 'admissions')} className="btn-academy bg-accent hover:bg-accent/90 text-primary px-4 py-2.5 text-xs uppercase tracking-wider font-bold shadow-md transition-all">Enroll Now</a>
          </nav>

          {/* Mobile Hamburger Toggle */}
          <button 
            id="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-accent focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden bg-primary border-t border-white/10 absolute top-20 left-0 w-full py-6 px-6 shadow-xl flex flex-col gap-5 animate-fade-in">
            <nav className="flex flex-col gap-4 text-left">
              <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="text-white/90 hover:text-accent font-medium text-base transition-colors py-1">About Us</a>
              <a href="#programs" onClick={(e) => handleSmoothScroll(e, 'programs')} className="text-white/90 hover:text-accent font-medium text-base transition-colors py-1">Academic Programs</a>
              <a href="#faculty" onClick={(e) => handleSmoothScroll(e, 'faculty')} className="text-white/90 hover:text-accent font-medium text-base transition-colors py-1">Our Faculty</a>
              <a href="#achievements" onClick={(e) => handleSmoothScroll(e, 'achievements')} className="text-white/90 hover:text-accent font-medium text-base transition-colors py-1">Achievements & Results</a>
              <a href="#admissions" onClick={(e) => handleSmoothScroll(e, 'admissions')} className="text-white/90 hover:text-accent font-medium text-base transition-colors py-1">Admissions Portal</a>
              <a href="#admissions" onClick={(e) => { handleSmoothScroll(e, 'admissions'); setLevel('consultancy'); setSubjects('Study Abroad Consultancy (AR Consultants)'); }} className="text-accent hover:text-accent/90 font-bold text-base transition-colors py-1">Study Abroad Consultancy</a>
              <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="text-white/90 hover:text-accent font-medium text-base transition-colors py-1">Contact Details</a>
              
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (user) {
                    if (role === 'admin') setShowAdminPortal(true);
                    else setShowStudentPortal(true);
                  } else {
                    setShowLoginModal(true);
                    setAuthError(''); setAuthSuccess('');
                  }
                }}
                className="text-left text-accent hover:text-white font-bold text-base transition-colors py-1 border-none bg-transparent cursor-pointer"
              >
                Resource Library
              </button>

              {user ? (
                <>
                  <div className="py-2 border-t border-white/10 mt-2">
                    <p className="text-xs font-bold text-accent uppercase tracking-wider">Logged In as {user.displayName}</p>
                  </div>
                  {role === 'admin' ? (
                    <button 
                      onClick={() => { setShowAdminPortal(true); setMobileMenuOpen(false); }} 
                      className="btn-academy bg-white/10 border border-white/20 hover:bg-white hover:text-primary text-white py-2 text-center text-xs uppercase tracking-wider font-bold"
                    >
                      Resource Library (Admin)
                    </button>
                  ) : (
                    <button 
                      onClick={() => { setShowStudentPortal(true); setMobileMenuOpen(false); }} 
                      className="btn-academy bg-white/10 border border-white/20 hover:bg-white hover:text-primary text-white py-2 text-center text-xs uppercase tracking-wider font-bold"
                    >
                      Resource Library
                    </button>
                  )}
                  <button 
                    onClick={() => { logout(); setMobileMenuOpen(false); }} 
                    className="btn-academy border-2 border-red-500 hover:bg-red-500 hover:text-white text-red-400 py-2 text-center text-xs uppercase tracking-wider font-bold transition-all"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                  <button 
                    onClick={() => { setShowLoginModal(true); setMobileMenuOpen(false); setAuthError(''); setAuthSuccess(''); }} 
                    className="btn-academy border-2 border-white/30 hover:border-accent hover:text-accent text-white py-2.5 text-center text-xs uppercase tracking-wider font-bold"
                  >
                    Portal Login
                  </button>
              )}
              
              <a href="#admissions" onClick={(e) => handleSmoothScroll(e, 'admissions')} className="btn-academy bg-accent hover:bg-accent/90 text-primary px-5 py-3 text-center text-sm uppercase tracking-wider font-bold shadow-md mt-2 transition-all">Enroll Now</a>
            </nav>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section id="hero" className="relative min-h-screen pt-16 sm:pt-20 flex items-center bg-cover bg-center overflow-hidden" style={{ backgroundImage: `linear-gradient(rgba(11, 28, 63, 0.9), rgba(11, 28, 63, 0.96)), url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80')` }}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full relative z-10 flex flex-col justify-between min-h-[85vh]">
          
          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center my-auto">
            <div className="lg:col-span-8 text-left space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full border border-white/20">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-accent animate-pulse"></span>
                <span className="text-[9px] sm:text-xs font-bold uppercase tracking-widest text-accent font-mono">Cambridge Professional Partner</span>
              </div>
              
              {/* Bold Typography Title */}
              <TextCursor text="🎓" spacing={60} maxPoints={8}>
                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] font-serif">
                  The Standard of <br />
                  <span className="italic text-accent font-normal font-serif text-3xl sm:text-5xl lg:text-7xl">Academic Merit</span>
                </h1>
              </TextCursor>
              
              <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-2xl leading-relaxed font-light">
                Lahore's elite destination for O &amp; A Level coaching. We combine traditional discipline with cutting-edge exam diagnostics to deliver stellar CAIE performance year after year.
              </p>
              
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                <a href="#programs" onClick={(e) => handleSmoothScroll(e, 'programs')} className="btn-academy bg-accent hover:bg-accent/90 text-primary text-center px-6 sm:px-8 py-3 sm:py-3.5 text-xs uppercase tracking-wider font-bold shadow-lg">View Programs</a>
                <a href="#admissions" onClick={(e) => handleSmoothScroll(e, 'admissions')} className="btn-academy border-2 border-white hover:bg-white hover:text-primary text-white text-center px-6 sm:px-8 py-3 sm:py-3.5 text-xs uppercase tracking-wider font-bold transition-all">Enroll Now</a>
              </div>
            </div>
          </div>

          {/* Stat Counters Row */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pt-8 sm:pt-12 border-t border-white/10 mt-8 sm:mt-16 bg-primary/40 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-2xl">
            <div className="text-center md:text-left border-l-4 border-accent pl-3 sm:pl-4">
              <p className="text-2xl sm:text-4xl lg:text-5xl font-bold text-accent font-serif tracking-tight">{studentsCount}+</p>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/70 font-bold mt-1 font-mono">Active Students</p>
            </div>
            <div className="text-center md:text-left border-l-4 border-accent pl-3 sm:pl-4">
              <p className="text-2xl sm:text-4xl lg:text-5xl font-bold text-accent font-serif tracking-tight">{rateCount}%</p>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/70 font-bold mt-1 font-mono">A*/A CAIE Rate</p>
            </div>
            <div className="text-center md:text-left border-l-4 border-accent pl-3 sm:pl-4">
              <p className="text-2xl sm:text-4xl lg:text-5xl font-bold text-accent font-serif tracking-tight">{yearsCount}Y</p>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/70 font-bold mt-1 font-mono">Excellence</p>
            </div>
            <div className="text-center md:text-left border-l-4 border-accent pl-3 sm:pl-4">
              <p className="text-2xl sm:text-4xl lg:text-5xl font-bold text-accent font-serif tracking-tight">{awardsCount}+</p>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/70 font-bold mt-1 font-mono">CAIE Merit Awards</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-12 h-[2px] bg-accent"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono">Founding Story & Mission</span>
              </div>
              
              <TextCursor text="🎓" spacing={60} maxPoints={8}>
                <h2 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight font-serif leading-tight break-words">
                  Cultivating Academic Giants <br />
                  Since 2014
                </h2>
              </TextCursor>
              
              <p className="text-base text-text-dark/85 leading-relaxed font-light">
                Founded in Lahore with a vision to transcend conventional, uninspired coaching centers, CamFord Academiya started with a cohort of just twelve students. Our foundational thesis is simple: CAIE examinations do not test rote memorization. They evaluate diagnostic clarity, spatial reasoning, and lexical precision.
              </p>
              
              <p className="text-base text-text-dark/80 leading-relaxed font-light">
                Today, CamFord Academiya is the standard-bearer of elite secondary coaching in Pakistan. We bridge scientific rigor with deep, individual care, ensuring every student discovers their ultimate capabilities.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex gap-4 p-4 rounded-lg bg-bg-light border-l-4 border-primary">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-full shrink-0">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-sm font-sans uppercase tracking-wider">Our Vision</h3>
                    <p className="text-xs text-text-dark/70 mt-1">To construct an environment where scientific curiosity, analytical logic, and academic discipline thrive in synchronization.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 p-4 rounded-lg bg-bg-light border-l-4 border-accent">
                  <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-full shrink-0">
                    <Compass className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-sm font-sans uppercase tracking-wider">Our Mission</h3>
                    <p className="text-xs text-text-dark/70 mt-1">To systematically dismantle complex syllabus objectives through customized notebooks, daily homework checks, and modular tests.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right – Animated Card Stack */}
            <div className="lg:col-span-5 mt-8 lg:mt-0">

              {/* Mobile layout: 98% stat on left, CardSwap on right */}
              <div className="flex items-center gap-3 lg:block">

                {/* 98% Stat Card — only shown on mobile (left column) */}
                <div className="flex-shrink-0 w-[44%] lg:hidden bg-primary text-white p-4 rounded-lg shadow-2xl border-b-4 border-accent self-center">
                  <p className="text-5xl font-serif font-bold text-accent mb-1">98%</p>
                  <p className="text-[11px] text-white/90 font-medium leading-snug">University Placement Success at Top-Tier Global &amp; Local Schools</p>
                  <div className="mt-3 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span className="text-[9px] text-accent font-bold uppercase font-mono tracking-wider">CamFord Record</span>
                  </div>
                </div>

                {/* CardSwap wrapper */}
                <div className="relative flex-1 lg:flex lg:items-center lg:justify-center" style={{ height: '300px' }}>
                  <CardSwap
                    width={420}
                    height={300}
                    cardDistance={55}
                    verticalDistance={65}
                    delay={2000}
                    pauseOnHover={true}
                    skewAmount={5}
                    easing="elastic"
                  >
                    <Card>
                      <img src="/consultancy.png" alt="Study Abroad Consultancy" />
                    </Card>
                    <Card>
                      <img src="/banner_swap_1.png" alt="Subjects Group Teaching" />
                    </Card>
                    <Card>
                      <img src="/banner_swap_2.png" alt="Online Chapter" />
                    </Card>
                    <Card>
                      <img src="/banner_swap_3.jpg" alt="AJ Banner" />
                    </Card>
                    <Card>
                      <img src="/banner_swap_4.png" alt="Online Lecture" />
                    </Card>
                    <Card>
                      <img src="/banner_swap_5.jpg" alt="AJ New Banner" />
                    </Card>
                  </CardSwap>

                  {/* Outstanding Badge — desktop only */}
                  <div className="absolute top-4 left-4 bg-white border-2 border-accent p-4 rounded-lg shadow-soft-hover max-w-[200px] hidden sm:block animate-pulse z-10">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-5 h-5 text-accent" />
                      <span className="font-bold text-xs text-primary uppercase font-mono">Outstanding</span>
                    </div>
                    <p className="text-[11px] text-text-dark/80 font-semibold font-sans leading-tight">CAIE Learner Distinction Results</p>
                  </div>

                  {/* 98% Badge — desktop only */}
                  <div className="absolute bottom-4 right-4 bg-primary text-white p-5 rounded-lg shadow-2xl max-w-[200px] border-b-4 border-accent z-10 hidden lg:block">
                    <p className="text-4xl font-serif font-bold text-accent mb-1">98%</p>
                    <p className="text-xs text-white/90 font-medium leading-normal">University placement success at Top-Tier Global &amp; Local Schools.</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>



      {/* 3.5. MERIT & SUCCESS SCROLL STACK */}
      <section id="success-stack" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[2px] bg-accent"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono">Academic Laurels</span>
              <span className="w-8 h-[2px] bg-accent"></span>
            </div>
            
            <TextCursor text="🎓" spacing={60} maxPoints={8}>
              <ScrollFloat
                containerClassName="text-4xl sm:text-5xl font-bold text-primary tracking-tight font-serif break-words"
                scrollStart="top bottom-=10%"
                scrollEnd="bottom center"
              >
                Our Success Chronicles
              </ScrollFloat>
            </TextCursor>
            
            <p className="text-text-dark/70 font-light text-base max-w-xl mx-auto">
              Scroll within the stack to explore our student board distinctions, STEM triumphs, and outstanding results that define our legacy.
            </p>
          </div>

          {/* Interactive Stacking Cards */}
          <div className="relative w-full max-w-4xl mx-auto mt-8">
            <ScrollStack
              itemDistance={60}
              itemScale={0.02}
              itemStackDistance={15}
              baseScale={0.92}
              rotationAmount={0.5}
              blurAmount={1}
              useWindowScroll={false}
            >
              {successSlides.map((slide, idx) => (
                <ScrollStackItem key={idx}>
                  <div className="relative w-full h-full text-white font-sans flex flex-col justify-end p-6 sm:p-10">
                    {/* Full bleed image background */}
                    <div className="bg-image-container absolute inset-0">
                      <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C3F] via-[#0B1C3F]/50 to-transparent" />
                    </div>
                    
                    {/* Text content layout */}
                    <div className="relative z-10 space-y-3 max-w-2xl text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent text-primary rounded-sm font-mono text-[9px] uppercase tracking-wider font-extrabold shadow-md">
                        {slide.tag}
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight font-serif text-white drop-shadow-md">
                        {slide.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-light drop-shadow-sm">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        </div>
      </section>

      {/* 4. ACADEMIC PROGRAMS (SUBJECTS TABBED) */}
      <section id="programs" className="py-24 bg-bg-light scroll-mt-20 relative overflow-hidden">
        {/* ShapeGrid Background Grid */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <ShapeGrid 
            speed={0.5}
            squareSize={40}
            direction='diagonal'
            borderColor="#2F293A"
            hoverFillColor='#222'
            shape='square'
            hoverTrailAmount={0}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[2px] bg-accent"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono">Academic Programs</span>
              <span className="w-8 h-[2px] bg-accent"></span>
            </div>
            
            <TextCursor text="🎓" spacing={60} maxPoints={8}>
              <ScrollFloat
                containerClassName="text-4xl sm:text-5xl font-bold text-primary tracking-tight font-serif break-words"
                scrollStart="top bottom-=10%"
                scrollEnd="bottom center"
              >
                Our Specialized Curricula
              </ScrollFloat>
            </TextCursor>
            
            <p className="text-text-dark/70 font-light text-base max-w-xl mx-auto">
              Our modular courses are designed around the rigorous specifications of Cambridge Assessment International Education and Pearson Edexcel.
            </p>

            {/* Tab Swapping Control */}
            <div className="inline-flex bg-white p-1 rounded-sm border border-primary/10 shadow-sm mt-6">
              <button 
                onClick={() => setActiveTab('olevel')}
                className={`px-3 sm:px-6 py-2 sm:py-2.5 text-[10px] sm:text-xs uppercase tracking-wider font-bold rounded-sm transition-all duration-300 ${activeTab === 'olevel' ? 'bg-primary text-white shadow-md' : 'text-primary hover:bg-primary/5'}`}
              >
                O Level Program
              </button>
              <button 
                onClick={() => setActiveTab('alevel')}
                className={`px-3 sm:px-6 py-2 sm:py-2.5 text-[10px] sm:text-xs uppercase tracking-wider font-bold rounded-sm transition-all duration-300 ${activeTab === 'alevel' ? 'bg-primary text-white shadow-md' : 'text-primary hover:bg-primary/5'}`}
              >
                A Level Program
              </button>
            </div>
          </div>

          {/* Program Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(activeTab === 'olevel' ? oLevelSubjects : aLevelSubjects).map((subj) => (
              <div key={subj.id} className="card-academy p-6 flex flex-col justify-between border border-primary/5 hover:-translate-y-1 transform transition-all duration-300">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/5 flex items-center justify-center rounded-sm">
                    {renderIcon(subj.iconName)}
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-lg leading-tight font-sans">{subj.name}</h3>
                    <span className="inline-block bg-accent/20 text-primary text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm mt-1.5 font-mono">
                      {subj.code}
                    </span>
                  </div>
                  <p className="text-xs text-text-dark/70 leading-relaxed font-light">
                    {subj.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-primary/10 pt-4">
                  <p className="text-[10px] uppercase tracking-wider text-accent font-bold font-mono">
                    {subj.tagline}
                  </p>
                  <p className="text-[11px] text-text-dark/50 mt-1">
                    Board: <span className="font-medium text-text-dark/80">{subj.board}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4.5. FACULTY SPOTLIGHT */}
      <section id="spotlight" className="py-24 bg-primary text-white scroll-mt-20 relative overflow-hidden">
        {/* Subtle decorative gold gradient glow in the background */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Premium Portrait Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-sm sm:max-w-md w-full">
                {/* Backdrop Gold Glow Ring */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-accent via-accent/50 to-accent rounded-lg blur-md opacity-45 group-hover:opacity-75 transition duration-500"></div>
                
                {/* Image Card Container */}
                <div className="relative bg-primary border-2 border-accent/20 rounded-lg overflow-hidden shadow-2xl p-3">
                  <div className="relative aspect-[4/5] rounded overflow-hidden bg-primary/20">
                    <img 
                      src={headTeacher.imageUrl} 
                      alt={headTeacher.name} 
                      className="w-full h-full object-cover object-top transition duration-700 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient overlay on bottom of image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent opacity-60"></div>
                  </div>
                  
                  {/* Floating Gold Credential Badge */}
                  <div className="absolute top-6 right-6 bg-accent text-primary px-3 py-1.5 rounded-sm shadow-lg font-mono text-[10px] uppercase font-extrabold tracking-wider border border-white/20 animate-pulse">
                    {headTeacher.credentials}
                  </div>

                  {/* Profile Frame Subtext */}
                  <div className="text-center py-4">
                    <span className="text-xs text-accent font-mono tracking-widest uppercase font-bold">CamFord Lead Scholar</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Career Profile */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Header Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-accent"></span>
                  <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono">Faculty Spotlight</span>
                </div>
                
                <TextCursor text="🎓" spacing={60} maxPoints={8}>
                  <h2 className="text-4xl sm:text-5xl font-bold tracking-tight font-serif text-white break-words">
                    Mr. {headTeacher.name}
                  </h2>
                </TextCursor>
                
                <p className="text-lg font-medium text-accent font-sans">
                  {headTeacher.role}
                </p>
              </div>

              {/* Bio & Credential Statement */}
              <div className="relative border-l-4 border-accent pl-6 py-2 bg-white/5 rounded-r-md border-t border-b border-r border-white/5">
                <p className="text-white/90 text-base leading-relaxed italic font-light font-serif">
                  "{headTeacher.bio}"
                </p>
              </div>

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-sm hover:border-accent/40 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="text-accent font-bold text-sm uppercase tracking-wider font-mono">Experience</span>
                  </div>
                  <span className="text-xs text-white/70 block mt-1 font-sans">{headTeacher.experience} Teaching & Examining</span>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-4 rounded-sm hover:border-accent/40 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-accent" />
                    <span className="text-accent font-bold text-sm uppercase tracking-wider font-mono">Credentials</span>
                  </div>
                  <span className="text-xs text-white/70 block mt-1 font-sans">Official CAIE Examiner Status</span>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-4 rounded-sm hover:border-accent/40 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4 text-accent" />
                    <span className="text-accent font-bold text-sm uppercase tracking-wider font-mono">Curricula</span>
                  </div>
                  <span className="text-xs text-white/70 block mt-1 font-sans">IGCSE, O Level & Edexcel</span>
                </div>
              </div>

              {/* Detailed Accreditations */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-accent font-mono">
                  Distinguished Teaching History
                </h3>
                
                <div className="flex flex-wrap gap-2.5">
                  {headTeacher.schools.map((school, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/30 text-white/90 px-3.5 py-1.5 rounded-sm transition-all duration-200 font-sans cursor-default"
                    >
                      {school}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <a 
                  href="#admissions" 
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-accent/20 cursor-pointer"
                >
                  <Users className="w-4 h-4" />
                  Request Enrollment Info
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. FACULTY SECTION */}
      <section id="faculty" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Faculty Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <span class="w-8 h-[2px] bg-accent"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono">Our Scholars</span>
              <span className="w-8 h-[2px] bg-accent"></span>
            </div>
            <TextCursor text="🎓" spacing={60} maxPoints={8}>
              <ScrollFloat
                containerClassName="text-4xl sm:text-5xl font-bold text-primary tracking-tight font-serif break-words"
                scrollStart="top bottom-=10%"
                scrollEnd="bottom center"
              >
                Meet Our Legendary Faculty
              </ScrollFloat>
            </TextCursor>
            <p className="text-text-dark/70 font-light text-base max-w-xl mx-auto">
              Trusted subject leads, renowned textbook authors, and examiners with an unmatched record of CAIE merit scores.
            </p>
          </div>

          {/* Categorized Faculty Lists */}
          <div className="space-y-16">
            {[
              {
                title: "🧪 Faculty of Science",
                subtitle: "Physics (CAIE 5054) • Chemistry (CAIE 5070) • Biology (CAIE 5090)",
                teacherIds: ['f2', 'f4', 'f20']
              },
              {
                title: "💻 Faculty of Computing and Technology",
                subtitle: "Computer Science (CAIE 2210)",
                teacherIds: ['f3', 'f17']
              },
              {
                title: "➗ Faculty of Mathematics",
                subtitle: "Mathematics (D) (CAIE 4024)",
                teacherIds: ['f1', 'f2', 'f8']
              },
              {
                title: "📚 Faculty of Languages",
                subtitle: "English Language (CAIE 1123) • Urdu A & B",
                teacherIds: ['f11', 'f19', 'f18']
              },
              {
                title: "💼 Faculty of Commerce & Business",
                subtitle: "Economics (CAIE 9708) • Business Studies (CAIE 9609) • Accounting (CAIE 9706)",
                teacherIds: ['f8', 'f9', 'f10']
              },
              {
                title: "🌍 Faculty of Humanities & Social Sciences",
                subtitle: "Pakistan Studies (CAIE 2059) • Islamiyat (CAIE 2058)",
                teacherIds: ['f5', 'f6', 'f7', 'f15', 'f16']
              },
              {
                title: "📖 Quran Scholars",
                subtitle: "Qur'an Recitation, Tajweed, Translation & Tafseer",
                teacherIds: ['f12', 'f13']
              },
              {
                title: "📋 Faculty of Administration & Support",
                subtitle: "Management & Coordination",
                teacherIds: ['f14']
              }
            ].map((cat, idx) => {
              const catTeachers = facultyMembers.filter(fac => cat.teacherIds.includes(fac.id));
              if (catTeachers.length === 0) return null;

              // Sort teachers in the order defined in the category's teacherIds array
              const sortedTeachers = [...catTeachers].sort((a, b) => {
                return cat.teacherIds.indexOf(a.id) - cat.teacherIds.indexOf(b.id);
              });

              return (
                <div key={idx} className="space-y-8">
                  {/* Category Header */}
                  <div className="relative pl-6 py-1">
                    {/* Decorative gold vertical bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-sm"></div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-primary/5 pb-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-primary font-serif tracking-tight">
                        {cat.title}
                      </h3>
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-accent font-mono bg-accent/5 border border-accent/15 px-3 py-1 rounded-sm">
                        {cat.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Faculty Grid with Custom CSS Flip Effect */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {sortedTeachers.map((fac) => (
                      <div key={fac.id} className="h-[400px] w-full perspective-1000 group cursor-pointer" onClick={() => setSelectedFaculty(fac)}>
                        <div className="relative w-full h-full text-center transition-transform duration-500 preserve-3d group-hover:rotate-y-180">
                          
                          {/* Front Side */}
                          <div className="absolute w-full h-full bg-white border border-primary/5 rounded-lg shadow-soft-layered p-6 flex flex-col justify-between items-center backface-hidden">
                            <div className="flex flex-col items-center">
                              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-accent/30 shadow-inner mb-4 bg-primary/5">
                                <img src={fac.imageUrl} alt={fac.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                              <h3 className="font-bold text-primary text-lg font-serif leading-tight">{fac.name}</h3>
                              <p className="text-xs font-bold uppercase text-accent tracking-wider font-mono mt-1">{fac.subject}</p>
                              <p className="text-xs text-text-dark/60 mt-2 font-medium">{fac.qualification}</p>
                            </div>
                            
                            <div className="w-full border-t border-primary/10 pt-4 flex items-center justify-center gap-2">
                              <span className="text-xs font-medium text-text-dark/50">Experience:</span>
                              <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-sm">{fac.experience}</span>
                            </div>
                          </div>
                          
                          {/* Back Side (Flipped) */}
                          <div className="absolute w-full h-full bg-primary text-white rounded-lg p-6 flex flex-col justify-between items-center rotate-y-180 backface-hidden shadow-2xl border-t-4 border-accent">
                            <div className="space-y-4 text-left w-full">
                              <h4 className="font-bold text-accent text-sm uppercase tracking-wider font-mono">Philosophy & Focus</h4>
                              <p className="text-xs text-white/85 leading-relaxed italic">
                                "{fac.bio}"
                              </p>
                              
                              <div className="space-y-2 text-left text-[11px] bg-white/5 p-3 rounded-sm border border-white/10">
                                {fac.authorText && (
                                  <p className="text-accent font-semibold flex items-center gap-1.5">
                                    <BookOpen className="w-3.5 h-3.5" />
                                    {fac.authorText}
                                  </p>
                                )}
                                <p className="text-white/80 flex items-center gap-1.5 font-light">
                                  <Check className="w-3.5 h-3.5 text-accent shrink-0" />
                                  {fac.achievement}
                                </p>
                              </div>
                            </div>
                            
                            <div className="text-[10px] text-accent font-bold uppercase tracking-widest font-mono">
                              CamFord Lead Faculty
                            </div>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. ACHIEVEMENTS TIMELINE SECTION */}
      <section id="achievements" className="py-24 bg-primary text-white scroll-mt-20 overflow-hidden relative">
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 -translate-y-1/2 hidden lg:block"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[2px] bg-accent"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono">Decade of Merit</span>
              </div>
              <TextCursor text="🎓" spacing={60} maxPoints={8}>
                <ScrollFloat
                  containerClassName="text-4xl sm:text-5xl font-bold tracking-tight font-serif text-white break-words"
                  scrollStart="top bottom-=10%"
                  scrollEnd="bottom center"
                >
                  A History of Distinction
                </ScrollFloat>
              </TextCursor>
              <p className="text-white/70 font-light text-base">
                Each calendar year, our students surpass global benchmarks, raising standard thresholds for academic coaching.
              </p>
            </div>
            
            {/* Timeline scroll buttons */}
            <div className="flex gap-3">
              <button 
                onClick={() => scrollTimeline('left')} 
                className="w-12 h-12 rounded-sm border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-primary transition-all duration-300 shadow-md cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollTimeline('right')} 
                className="w-12 h-12 rounded-sm border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-primary transition-all duration-300 shadow-md cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal scroll container */}
          <div 
            ref={timelineRef}
            className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar scroll-smooth"
          >
            {achievementsList.map((ach, idx) => (
              <div 
                key={idx} 
                className="w-[290px] sm:w-[350px] shrink-0 snap-start bg-white/5 border border-white/10 rounded-lg p-6 hover:border-accent/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-serif font-bold text-accent">{ach.year}</span>
                    <div className="px-2.5 py-0.5 bg-accent/20 rounded-full border border-accent/30">
                      <span className="text-[9px] font-bold uppercase text-accent font-mono tracking-wider">{ach.tag}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2 font-serif">{ach.title}</h3>
                  <p className="text-xs text-white/70 leading-relaxed font-light">
                    {ach.description}
                  </p>
                </div>
                
                <div className="mt-6 border-t border-white/10 pt-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-white/40">CAIE Excellence Record</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. WHY CHOOSE US (3x2 GRID) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[2px] bg-accent"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono">Why Choose Us</span>
              <span className="w-8 h-[2px] bg-accent"></span>
            </div>
            <TextCursor text="🎓" spacing={60} maxPoints={8}>
              <ScrollFloat
                containerClassName="text-4xl sm:text-5xl font-bold text-primary tracking-tight font-serif break-words"
                scrollStart="top bottom-=10%"
                scrollEnd="bottom center"
              >
                Our Educational Philosophies
              </ScrollFloat>
            </TextCursor>
            <p className="text-text-dark/70 font-light text-base max-w-xl mx-auto">
              Our systems are optimized to ensure academic potential converts directly into world-class credentials.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresList.map((feat, idx) => (
              <div key={idx} className="p-8 rounded-lg bg-bg-light border-t-4 border-primary shadow-soft-layered flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/5 rounded-sm flex items-center justify-center shrink-0">
                  {renderIcon(feat.iconName, "w-6 h-6 text-primary")}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-primary text-base font-sans">{feat.title}</h3>
                  <p className="text-xs text-text-dark/70 leading-relaxed font-light">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. TESTIMONIALS CAROUSEL */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-primary/95 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 bg-accent/20 flex items-center justify-center rounded-full border border-accent/20">
              <span className="text-3xl text-accent font-serif leading-none">“</span>
            </div>
          </div>

          <div className="min-h-[220px] flex items-center justify-center">
            <div className="space-y-6">
              <p className="text-lg sm:text-xl md:text-2xl italic font-serif leading-relaxed text-white/90 font-light px-2">
                "{testimonialsList[activeTestimonial].quote}"
              </p>
              
              <div>
                <h4 className="font-bold text-accent text-base tracking-wide font-sans uppercase">
                  {testimonialsList[activeTestimonial].name}
                </h4>
                <p className="text-xs text-white/60 font-mono mt-1">
                  {testimonialsList[activeTestimonial].level} | <span className="text-accent">{testimonialsList[activeTestimonial].role}</span>
                </p>
              </div>

              {/* Star Rating Display */}
              <div className="flex justify-center gap-1">
                {Array.from({ length: testimonialsList[activeTestimonial].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
            </div>
          </div>

          {/* Dots Indicator Manual Selector */}
          <div className="flex justify-center gap-3 pt-6">
            {testimonialsList.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeTestimonial === idx ? 'bg-accent w-6' : 'bg-white/20 hover:bg-white/40'}`}
                aria-label={`Testimonial slide ${idx + 1}`}
              ></button>
            ))}
          </div>

        </div>
      </section>

      {/* 9. ADMISSIONS SECTION & ONLINE FORM */}
      <section id="admissions" className="py-24 bg-bg-light scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Steps Panel */}
            <div className="lg:col-span-5 space-y-8">
              <div className="flex items-center gap-3">
                <span className="w-12 h-[2px] bg-accent"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono">Admission Portal</span>
              </div>
              
              <TextCursor text="🎓" spacing={60} maxPoints={8}>
                <h2 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight font-serif leading-none break-words">
                  Admission <br />
                  <span className="italic text-accent font-normal font-serif">Process</span>
                </h2>
              </TextCursor>
              
              <p className="text-text-dark/80 font-light text-sm sm:text-base leading-relaxed">
                Secure your slot in Pakistan's leading preparatory cohort. Follow our simplified three-step process:
              </p>

              {/* Steps */}
              <div className="space-y-6">
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-sm bg-primary text-white flex items-center justify-center font-bold font-mono text-sm shadow-md shrink-0 border-l-4 border-accent">
                    01
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-base">Online Inquiry Submission</h3>
                    <p className="text-xs text-text-dark/70 mt-1">Complete the digital registry form. Our academic counselors evaluate standard requirements within 24 working hours.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-sm bg-primary text-white flex items-center justify-center font-bold font-mono text-sm shadow-md shrink-0 border-l-4 border-accent">
                    02
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-base">Diagnostic Evaluation Interview</h3>
                    <p className="text-xs text-text-dark/70 mt-1">Candidates attend a diagnostic session with faculty subject heads to evaluate existing syllabus benchmarks.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-sm bg-primary text-white flex items-center justify-center font-bold font-mono text-sm shadow-md shrink-0 border-l-4 border-accent">
                    03
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-base">Securing Cohort & Enrollment</h3>
                    <p className="text-xs text-text-dark/70 mt-1">Upon diagnostic confirmation, deposit program dues to secure physical class schedule allocations.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Interactive Form Container */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 rounded-lg shadow-2xl border-t-4 border-accent relative">
                
                <h3 className="text-2xl font-serif text-primary font-bold mb-2">Request Admission Counselling</h3>
                <p className="text-xs text-text-dark/60 mb-6">Fill in details for direct call back from academic advisors.</p>

                {/* Floating Success Indicator Popup */}
                {successSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-800 text-sm rounded-sm animate-fade-in flex items-start gap-2">
                    <CheckSquare className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Inquiry Registered Successfully!</p>
                      <p className="text-xs text-green-700/90 mt-1">Our Senior Admissions Counselor will contact you on your registered mobile number within 12 hours. Welcome to CamFord Academiya!</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleAdmissionSubmit} className="space-y-6">
                  
                  {/* Full Name Input */}
                  <div className="relative border-b border-gray-300 focus-within:border-accent group py-1.5 transition-colors">
                    <input 
                      type="text" 
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder=" "
                      className="peer w-full bg-transparent outline-none text-sm text-text-dark placeholder-transparent py-1"
                    />
                    <label 
                      htmlFor="fullName"
                      className="absolute left-0 top-1.5 text-xs text-gray-400 font-semibold uppercase tracking-wider origin-left transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-accent pointer-events-none"
                    >
                      Full Name
                    </label>
                    {errors.fullName && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.fullName}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone Input */}
                    <div className="relative border-b border-gray-300 focus-within:border-accent group py-1.5 transition-colors">
                      <input 
                        type="tel" 
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder=" "
                        className="peer w-full bg-transparent outline-none text-sm text-text-dark placeholder-transparent py-1"
                      />
                      <label 
                        htmlFor="phone"
                        className="absolute left-0 top-1.5 text-xs text-gray-400 font-semibold uppercase tracking-wider origin-left transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-accent pointer-events-none"
                      >
                        Phone Number (e.g. 03001234567)
                      </label>
                      {errors.phone && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.phone}</p>}
                    </div>

                    {/* Email Input */}
                    <div className="relative border-b border-gray-300 focus-within:border-accent group py-1.5 transition-colors">
                      <input 
                        type="email" 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=" "
                        className="peer w-full bg-transparent outline-none text-sm text-text-dark placeholder-transparent py-1"
                      />
                      <label 
                        htmlFor="email"
                        className="absolute left-0 top-1.5 text-xs text-gray-400 font-semibold uppercase tracking-wider origin-left transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-accent pointer-events-none"
                      >
                        Email Address
                      </label>
                      {errors.email && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Academic Level Select */}
                    <div className="relative border-b border-gray-300 focus-within:border-accent group py-1.5 transition-colors">
                      <select 
                        id="level"
                        value={level}
                        onChange={(e) => {
                          const val = e.target.value;
                          setLevel(val);
                          if (val === 'consultancy') {
                            setSubjects('Study Abroad Consultancy (AR Consultants)');
                          } else if (subjects === 'Study Abroad Consultancy (AR Consultants)') {
                            setSubjects('');
                          }
                        }}
                        className="w-full bg-transparent outline-none text-sm text-text-dark py-1 cursor-pointer"
                      >
                        <option value="">Select Level</option>
                        <option value="olevel">O Levels (Year 10/11)</option>
                        <option value="alevel">A Levels (AS/A2)</option>
                        <option value="consultancy">Study Abroad Consultancy (AR Consultants)</option>
                      </select>
                      <label 
                        htmlFor="level"
                        className="absolute left-0 -top-4 text-xs text-accent font-semibold uppercase tracking-wider"
                      >
                        Academic Program
                      </label>
                      {errors.level && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.level}</p>}
                    </div>

                    {/* Subjects of Interest Input */}
                    <div className="relative border-b border-gray-300 focus-within:border-accent group py-1.5 transition-colors">
                      <input 
                        type="text" 
                        id="subjects"
                        value={subjects}
                        onChange={(e) => setSubjects(e.target.value)}
                        placeholder=" "
                        className="peer w-full bg-transparent outline-none text-sm text-text-dark placeholder-transparent py-1"
                      />
                      <label 
                        htmlFor="subjects"
                        className="absolute left-0 top-1.5 text-xs text-gray-400 font-semibold uppercase tracking-wider origin-left transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-accent pointer-events-none"
                      >
                        Subjects of Interest
                      </label>
                      {errors.subjects && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.subjects}</p>}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="relative border-b border-gray-300 focus-within:border-accent group py-1.5 transition-colors">
                    <textarea 
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder=" "
                      rows={3}
                      className="peer w-full bg-transparent outline-none text-sm text-text-dark placeholder-transparent py-1 resize-none"
                    />
                    <label 
                      htmlFor="message"
                      className="absolute left-0 top-1.5 text-xs text-gray-400 font-semibold uppercase tracking-wider origin-left transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-accent pointer-events-none"
                    >
                      Additional Comments / Background (Optional)
                    </label>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/95 text-white py-3.5 rounded-[4px] font-bold text-xs uppercase tracking-widest mt-4 transition-all duration-300 shadow-lg border-b-4 border-accent active:translate-y-[2px]"
                  >
                    Submit Admissions Query
                  </button>

                </form>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. CONTACT SECTION */}
      <section id="contact" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Contact Coordinates Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="flex items-center gap-3">
                <span className="w-12 h-[2px] bg-accent"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono">Get in Touch</span>
              </div>
              
              <TextCursor text="🎓" spacing={60} maxPoints={8}>
                <h2 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight font-serif leading-none break-words">
                  Contact <br />
                  <span className="italic text-accent font-normal font-serif">Coordinates</span>
                </h2>
              </TextCursor>

              <p className="text-text-dark/85 font-light text-sm sm:text-base leading-relaxed">
                Have specific queries regarding class schedules, fee installments, or transport arrangements? Visit our main campus or dial directly.
              </p>

              {/* Contact Details */}
              <div className="space-y-6 pt-4">
                
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-sm bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-sm uppercase tracking-wider font-sans">Campus Location</h3>
                    <a 
                      href="https://maps.app.goo.gl/J2Dwdhkw85wbdzCR8" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-xs text-text-dark/70 hover:text-accent mt-1 leading-relaxed block transition-colors underline decoration-dotted"
                    >
                      CamFord Academy, 20-T, 2nd Floor, above Ice Curl Shop, NR Jay Bees, opposite to DHA Senior School for Boys, Phase 2, Lalik Chowk, DHA. Lahore
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-sm bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-sm uppercase tracking-wider font-sans">Telephone & Helplines</h3>
                    <p className="text-xs text-text-dark/70 mt-1 leading-relaxed">
                      0305 4900048 <br />
                      0300 4348424
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-sm bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-sm uppercase tracking-wider font-sans">Email Channels</h3>
                    <p className="text-xs text-text-dark/70 mt-1 leading-relaxed">camford.academy.edu@gmail.com</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-sm bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-sm uppercase tracking-wider font-sans">Office Hours</h3>
                    <p className="text-xs text-text-dark/70 mt-1 leading-relaxed">Monday – Saturday: 11:30 AM – 8:30 PM (PKT)</p>
                  </div>
                </div>

              </div>

              {/* GREEN WhatsApp CTA Button */}
              <div className="pt-4">
                <a 
                  href="https://wa.me/923208422445?text=Hello%20CamFord%20Academiya%20I%20am%20interested%20in%20O/A%20Level%20admissions"
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3.5 rounded-[4px] font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md active:translate-y-0.5"
                >
                  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.503-5.729-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.799.002-2.618-1.016-5.078-2.872-6.931C16.354 2.02 13.902.18 12.01.18 6.602.18 2.205 4.574 2.2 9.979c-.001 1.514.404 2.99 1.173 4.288L2.348 19.9l5.73-1.503c1.3.774 2.68 1.183 4.569 1.185h-.002z" />
                  </svg>
                  Connect via WhatsApp
                </a>
              </div>
            </div>

            {/* Right Map Embed Column */}
            <div className="lg:col-span-7 h-56 sm:h-[350px] lg:h-[450px]">
              <div className="w-full h-full rounded-lg overflow-hidden border border-primary/10 shadow-2xl relative bg-bg-light">
                {/* Embed an actual, working Google Map or clean placeholder with correct location */}
                <iframe 
                  title="CamFord Academiya Location Map"
                  src="https://maps.google.com/maps?q=Defence%20CamFord%20Academia(DCA)&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-primary border-t-4 border-accent text-white py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
            
            {/* Logo and brief col */}
            <div className="lg:col-span-4 space-y-4">
              <a href="#hero" onClick={(e) => handleSmoothScroll(e, 'hero')} className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-white flex items-center justify-center rounded-md shadow-md transition-transform duration-300 overflow-hidden">
                  <img src="/academy_logo.png" alt="CamFord Academiya Logo" className="w-full h-full object-contain p-1" />
                </div>
                <div>
                  <span className="block text-white font-bold tracking-wider text-lg uppercase font-serif">CamFord Academiya</span>
                  <span className="block text-accent text-[10px] tracking-widest uppercase font-semibold">O/A Levels Elite</span>
                </div>
              </a>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Providing standard-setting, research-driven preparatory coaching for GCE O-Level and International A-Level students in Lahore. Regulated academic rigor.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-bold text-accent text-xs uppercase tracking-widest font-mono">Quick Links</h4>
              <ul className="space-y-2 text-xs text-white/80 font-light">
                <li><a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="hover:text-accent transition-colors">Our Story</a></li>
                <li><a href="#programs" onClick={(e) => handleSmoothScroll(e, 'programs')} className="hover:text-accent transition-colors">Subjects List</a></li>
                <li><a href="#faculty" onClick={(e) => handleSmoothScroll(e, 'faculty')} className="hover:text-accent transition-colors">Faculty Directory</a></li>
                <li><a href="#achievements" onClick={(e) => handleSmoothScroll(e, 'achievements')} className="hover:text-accent transition-colors">Merit Awards</a></li>
                <li><a href="#admissions" onClick={(e) => handleSmoothScroll(e, 'admissions')} className="hover:text-accent transition-colors">Apply Online</a></li>
              </ul>
            </div>

            {/* Academic Programs Columns */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-bold text-accent text-xs uppercase tracking-widest font-mono">Academic Core</h4>
              <ul className="space-y-2 text-xs text-white/80 font-light">
                <li><span className="hover:text-accent transition-colors cursor-pointer" onClick={() => { setActiveTab('olevel'); document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' }); }}>O-Level Mathematics (4024)</span></li>
                <li><span className="hover:text-accent transition-colors cursor-pointer" onClick={() => { setActiveTab('olevel'); document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' }); }}>O-Level Physics (5054)</span></li>
                <li><span className="hover:text-accent transition-colors cursor-pointer" onClick={() => { setActiveTab('alevel'); document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' }); }}>A-Level Pure Mathematics (9709)</span></li>
                <li><span className="hover:text-accent transition-colors cursor-pointer" onClick={() => { setActiveTab('alevel'); document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' }); }}>A-Level Physics Practical (9702)</span></li>
                <li><span className="hover:text-accent transition-colors cursor-pointer" onClick={() => { setActiveTab('alevel'); document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' }); }}>A-Level Organic Chemistry (9701)</span></li>
              </ul>
            </div>

            {/* Contact coordinates column */}
            <div className="lg:col-span-3 space-y-4 text-xs text-white/80 font-light">
              <h4 className="font-bold text-accent text-xs uppercase tracking-widest font-mono">Contact Details</h4>
              <p>
                <strong>Main Campus:</strong>{' '}
                <a 
                  href="https://maps.app.goo.gl/J2Dwdhkw85wbdzCR8" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-accent transition-colors underline decoration-dotted"
                >
                  CamFord Academy, 20-T, 2nd Floor, above Ice Curl Shop, NR Jay Bees, opposite to DHA Senior School for Boys, Phase 2, Lalik Chowk, DHA. Lahore
                </a>
              </p>
              <p>
                <strong>Desk Helplines:</strong> <br />
                0305 4900048 <br />
                0300 4348424
              </p>
              <p>
                <strong>Email:</strong> camford.academy.edu@gmail.com
              </p>
            </div>

          </div>

          {/* Social icons & copyright bottom strip */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[10px] text-white/50 uppercase tracking-widest font-mono text-center sm:text-left">
              &copy; 2026 CamFord Academiya. Registered with Cambridge Assessment Professional Networks. All Rights Reserved.
            </p>
            
            <div className="flex gap-6 text-[10px] uppercase font-bold tracking-wider text-accent font-mono">
              <a href="https://www.instagram.com/camfordacademy.official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <a href="https://www.linkedin.com/in/ahmad-jaan-8305a7384/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>

        </div>
      </footer>

      {/* 12. FACULTY DETAILS MODAL */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-primary/80 backdrop-blur-md animate-fade-in transition-all duration-300" onClick={() => setSelectedFaculty(null)}>
          <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-2xl border-t-4 border-accent overflow-hidden max-h-[95vh] flex flex-col md:flex-row animate-scale-up" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedFaculty(null); }}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 text-primary hover:text-accent transition-all cursor-pointer shadow-sm"
              aria-label="Close Profile"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left side: Photo & Main Info */}
            <div className="w-full md:w-2/5 bg-primary/5 p-4 sm:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-primary/10">
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-accent shadow-lg mb-4 shrink-0">
                <img src={selectedFaculty.imageUrl} alt={selectedFaculty.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-primary font-serif text-center leading-tight">{selectedFaculty.name}</h3>
              <p className="text-xs text-accent font-bold uppercase tracking-wider font-mono text-center mt-2 px-2">{selectedFaculty.subject}</p>
              <span className="inline-block bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-sm mt-4 font-mono">
                {selectedFaculty.experience} Experience
              </span>
              <p className="text-[10px] text-text-dark/45 uppercase tracking-widest font-mono mt-4">CamFord Core Faculty</p>
            </div>

            {/* Right side: Detailed Information (Scrollable if needed) */}
            <div className="w-full md:w-3/5 p-4 sm:p-8 overflow-y-auto space-y-4 sm:space-y-6 max-h-[45vh] md:max-h-[90vh] text-left">
              {/* Professional Profile */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-accent font-mono">Professional Profile</h4>
                <p className="text-xs sm:text-sm text-text-dark/80 leading-relaxed font-light">{selectedFaculty.bio}</p>
              </div>

              {/* Subjects Taught */}
              {selectedFaculty.subjectsTaught && selectedFaculty.subjectsTaught.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-accent font-mono">Subjects Taught</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedFaculty.subjectsTaught.map((sub, idx) => (
                      <span key={idx} className="text-xs bg-bg-light border border-primary/10 text-primary px-3 py-1 rounded-sm font-medium">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Curricula & Class Levels */}
              {selectedFaculty.curricula && selectedFaculty.curricula.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-accent font-mono">Curricula & Levels</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedFaculty.curricula.map((curr, idx) => (
                      <span key={idx} className="text-xs bg-accent/15 border border-accent/20 text-primary px-3 py-1 rounded-sm font-semibold">
                        {curr}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Teaching Experience At (Schools) */}
              {selectedFaculty.schools && selectedFaculty.schools.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-accent font-mono">Teaching History</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedFaculty.schools.map((school, idx) => (
                      <span key={idx} className="text-xs bg-primary/5 border border-primary/10 text-text-dark/80 px-3 py-1 rounded-sm">
                        {school}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Areas of Expertise */}
              {selectedFaculty.expertise && selectedFaculty.expertise.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-accent font-mono">Areas of Expertise</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedFaculty.expertise.map((exp, idx) => (
                      <span key={idx} className="text-xs bg-bg-light border border-primary/10 text-primary px-3 py-1 rounded-sm font-medium">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievement Badge */}
              <div className="pt-4 border-t border-primary/10 flex items-start gap-2.5">
                <Award className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-primary font-mono">Key Accomplishment</h5>
                  <p className="text-xs text-text-dark/70 mt-0.5 leading-relaxed font-light">{selectedFaculty.achievement}</p>
                </div>
              </div>

              {/* CTA Row */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={(e) => { 
                    e.stopPropagation();
                    setSelectedFaculty(null); 
                    const element = document.getElementById('admissions');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="flex-1 bg-primary hover:bg-primary/95 text-white py-2.5 rounded-sm font-bold text-center text-xs uppercase tracking-wider transition duration-300"
                >
                  Enroll in Class
                </button>
                <a 
                  href={`https://wa.me/923208422445?text=Hello%20CamFord%20Academiya,%20I%20am%20interested%20in%20classes%20with%20${encodeURIComponent(selectedFaculty.name)}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-[#25D366] hover:bg-[#20ba5a] text-white py-2.5 rounded-sm font-bold text-center text-xs uppercase tracking-wider transition duration-300 flex items-center justify-center gap-1.5"
                >
                  WhatsApp Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 13. AUTHENTICATION MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-primary/80 backdrop-blur-md animate-fade-in" onClick={() => setShowLoginModal(false)}>
          <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl border-t-4 border-accent overflow-y-auto max-h-[95vh] flex flex-col md:flex-row animate-scale-up" onClick={(e) => e.stopPropagation()}>
            
            {/* Close button */}
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 text-primary hover:text-accent transition-all cursor-pointer shadow-sm border-none"
              aria-label="Close Login"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left side: branding/illustrations */}
            <div className="hidden md:flex md:w-2/5 bg-primary/5 p-10 flex-col justify-between border-r border-primary/10 text-left relative">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white flex items-center justify-center rounded shadow-sm overflow-hidden p-0.5 border border-primary/10">
                    <img src="/academy_logo.png" alt="" className="w-full h-full object-contain" />
                  </div>
                  <span className="font-bold text-primary font-serif uppercase text-sm tracking-wider">CamFord Portal</span>
                </div>
                <h3 className="text-2xl font-bold font-serif text-primary mt-6 leading-tight">Your gateway to academic excellence.</h3>
                <p className="text-xs text-text-dark/70 leading-relaxed font-light mt-2">Access individual worksheets, check telemetry records, and inspect diagnostic performance evaluations directly.</p>
              </div>

              <div className="space-y-4 mt-8">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center text-accent shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-[11px] text-text-dark/80 font-medium">Verify individual mock telemetry</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center text-accent shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-[11px] text-text-dark/80 font-medium">Track class schedule allocations</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center text-accent shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-[11px] text-text-dark/80 font-medium">Coordinate directly with faculty heads</p>
                </div>
              </div>
            </div>

            {/* Right side: Forms */}
            <div className="w-full md:w-3/5 p-5 sm:p-8 md:p-10 flex flex-col justify-center text-left">
              {/* Tab Selector */}
              <div className="flex border-b border-primary/5 mb-6">
                <button 
                  onClick={() => { setAuthTab('student'); setAuthError(''); setAuthSuccess(''); }}
                  className={`flex-1 pb-3 text-sm font-bold uppercase tracking-wider border-b-2 text-center transition-colors cursor-pointer bg-transparent border-t-0 border-x-0 outline-none ${authTab === 'student' ? 'border-accent text-primary font-bold' : 'border-transparent text-text-dark/50 hover:text-primary font-normal'}`}
                >
                  Student Portal
                </button>
                <button 
                  onClick={() => { setAuthTab('admin'); setAuthError(''); setAuthSuccess(''); setAuthMode('login'); }}
                  className={`flex-1 pb-3 text-sm font-bold uppercase tracking-wider border-b-2 text-center transition-colors cursor-pointer bg-transparent border-t-0 border-x-0 outline-none ${authTab === 'admin' ? 'border-accent text-primary font-bold' : 'border-transparent text-text-dark/50 hover:text-primary font-normal'}`}
                >
                  Admin Portal
                </button>
              </div>

              <h3 className="text-xl font-bold text-primary font-serif mb-2">
                {authTab === 'admin' ? 'Admin Access' : authMode === 'login' ? 'Student Sign In' : 'Student Registration'}
              </h3>
              <p className="text-xs text-text-dark/60 mb-6 leading-relaxed font-light">
                {authTab === 'admin' 
                  ? 'Access operational panels and candidate diagnostics.' 
                  : authMode === 'login' 
                    ? 'Enter your credentials or click below to authenticate with Google.' 
                    : 'Create your account to save admissions standard files.'}
              </p>

              {authError && <p className="p-3 bg-red-50 border-l-4 border-red-500 text-red-800 text-xs font-semibold rounded-sm mb-4">{authError}</p>}
              {authSuccess && <p className="p-3 bg-green-50 border-l-4 border-green-500 text-green-800 text-xs font-semibold rounded-sm mb-4">{authSuccess}</p>}

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authTab === 'student' && authMode === 'register' && (
                  <div className="relative border-b border-gray-300 focus-within:border-accent py-1 group transition-colors">
                    <input 
                      type="text" 
                      id="authName" 
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      placeholder=" "
                      required
                      className="peer w-full bg-transparent outline-none text-sm text-text-dark placeholder-transparent py-1.5"
                    />
                    <label htmlFor="authName" className="absolute left-0 top-1 text-xs text-gray-400 font-semibold uppercase tracking-wider origin-left transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-accent pointer-events-none">Full Name</label>
                  </div>
                )}

                <div className="relative border-b border-gray-300 focus-within:border-accent py-1 group transition-colors">
                  <input 
                    type="email" 
                    id="authEmail" 
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder=" "
                    required
                    className="peer w-full bg-transparent outline-none text-sm text-text-dark placeholder-transparent py-1.5"
                  />
                  <label htmlFor="authEmail" className="absolute left-0 top-1 text-xs text-gray-400 font-semibold uppercase tracking-wider origin-left transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-accent pointer-events-none">Email Address</label>
                </div>

                <div className="relative border-b border-gray-300 focus-within:border-accent py-1 group transition-colors">
                  <input 
                    type="password" 
                    id="authPassword" 
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder=" "
                    required
                    className="peer w-full bg-transparent outline-none text-sm text-text-dark placeholder-transparent py-1.5"
                  />
                  <label htmlFor="authPassword" className="absolute left-0 top-1 text-xs text-gray-400 font-semibold uppercase tracking-wider origin-left transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-accent pointer-events-none">Password</label>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/95 text-white py-3.5 rounded-[4px] font-bold text-xs uppercase tracking-widest transition duration-300 border-b-4 border-accent active:translate-y-[2px] cursor-pointer"
                >
                  {authTab === 'admin' ? 'Verify Credentials' : authMode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              {authTab === 'student' && (
                <div className="space-y-4 mt-6">
                  <div className="flex items-center justify-center gap-3">
                    <span className="w-full h-[1px] bg-primary/10"></span>
                    <span className="text-[10px] uppercase font-bold text-text-dark/40 tracking-wider font-mono">OR</span>
                    <span className="w-full h-[1px] bg-primary/10"></span>
                  </div>

                  <button 
                    onClick={async () => {
                      setAuthError('');
                      try {
                        await loginWithGoogle();
                      } catch (err: any) {
                        if (err?.code === 'auth/unauthorized-domain') {
                          setAuthError('This domain is not authorized in Firebase. Please add it to Firebase Console → Authentication → Authorized Domains.');
                        } else if (err?.code === 'auth/popup-closed-by-user' || err?.code === 'auth/cancelled-popup-request') {
                          // User closed the popup — no need to show error
                        } else {
                          setAuthError(err?.message || 'Google sign-in failed. Please try again.');
                        }
                      }
                    }}
                    className="w-full bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 text-gray-700 py-3 rounded-[4px] text-sm font-semibold transition duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-sm"
                  >
                    {/* Official Google G icon */}
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                      <path fill="none" d="M0 0h48v48H0z"/>
                    </svg>
                    Login with Google
                  </button>

                  <p className="text-center text-xs font-light text-text-dark/70">
                    {authMode === 'login' ? "New candidate?" : "Already registered?"}{' '}
                    <button 
                      onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                      className="text-accent hover:underline font-bold bg-transparent outline-none border-none cursor-pointer p-0"
                    >
                      {authMode === 'login' ? "Register Account" : "Sign In"}
                    </button>
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* 14. STUDENT PORTAL DASHBOARD MODAL */}
      {showStudentPortal && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-primary/80 backdrop-blur-md animate-fade-in" onClick={() => setShowStudentPortal(false)}>
          <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl border-t-4 border-accent overflow-hidden max-h-[95vh] flex flex-col animate-scale-up" onClick={(e) => e.stopPropagation()}>
            
            {/* Close button */}
            <button 
              onClick={() => setShowStudentPortal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 text-primary hover:text-accent transition-all cursor-pointer border-none"
              aria-label="Close Portal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-4 sm:p-8 overflow-y-auto space-y-6 sm:space-y-8 text-left">
              {/* Header block */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-primary/5 pb-4 sm:pb-6 gap-3 sm:gap-4">
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-accent object-cover shrink-0" />
                  ) : (
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-accent/20 border-4 border-accent text-accent flex items-center justify-center font-bold text-xl sm:text-2xl uppercase font-mono shrink-0">
                      {user.displayName ? user.displayName.charAt(0) : 'S'}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-2xl font-bold font-serif text-primary truncate">{user.displayName}</h3>
                    <p className="text-[10px] sm:text-xs text-text-dark/60 font-light mt-0.5 truncate">Student Account &bull; {user.email}</p>
                  </div>
                </div>
                
                <span className="bg-green-500/10 text-green-700 border border-green-500/20 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm font-mono shrink-0">
                  Active Enrollment
                </span>
              </div>

              {/* Resource Library Section */}
              <div className="space-y-6">
                  {/* Subject Filters */}
                  <div className="flex flex-wrap gap-1.5 border-b border-primary/5 pb-4">
                    {['all', 'english', 'urdu', 'islamiat', 'mathematics', 'physics', 'pakstudies', 'computerscience'].map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setNotesFilter(sub as any)}
                        className={`px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-wider transition cursor-pointer border ${notesFilter === sub ? 'bg-primary border-primary text-white' : 'bg-transparent border-primary/20 text-primary/70 hover:bg-primary/5'}`}
                      >
                        {sub === 'all' ? 'All Subjects' : sub}
                      </button>
                    ))}
                  </div>

                  {/* Notes List */}
                  {notesList.filter(note => notesFilter === 'all' || note.subject === notesFilter).length === 0 ? (
                    <p className="text-center text-xs text-text-dark/50 py-8">No study materials or past papers available under this category yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {notesList
                        .filter(note => notesFilter === 'all' || note.subject === notesFilter)
                        .map((note) => (
                          <div key={note.id} className="p-4 rounded-md border border-primary/10 bg-primary/[0.01] flex flex-col justify-between text-left space-y-4 shadow-sm">
                            <div>
                              <div className="flex items-center justify-between gap-2">
                                <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-sm ${note.type === 'notes' ? 'bg-accent/15 text-primary border border-accent/20' : 'bg-primary/10 text-primary border border-primary/20'}`}>
                                  {note.type === 'notes' ? 'Syllabus Notes' : 'Past Paper'}
                                </span>
                                <span className="text-[10px] text-text-dark/40 font-mono">{note.file_size || note.fileSize}</span>
                              </div>
                              <h5 className="font-bold text-primary text-sm mt-3 leading-snug">{note.title}</h5>
                              <p className="text-[10px] text-text-dark/50 mt-1 font-mono uppercase tracking-wider">{note.subject}</p>
                            </div>
                            <div className="pt-3 border-t border-primary/5 flex items-center justify-between gap-4">
                              <span className="text-[9px] text-text-dark/45 font-mono">Uploaded: {(note.created_at || note.date || '').toString().split('T')[0]}</span>
                              {(note.file_url || note.fileUrl) ? (
                                <a
                                  href={note.file_url || note.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  download={note.file_name || note.fileName || 'download'}
                                  className="bg-primary hover:bg-primary/95 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-sm transition cursor-pointer border-none shadow-sm active:translate-y-0.5 inline-block"
                                >
                                  Download
                                </a>
                              ) : (
                                <button
                                  onClick={() => alert('No file URL available yet. Upload this note via Supabase Storage to enable real downloads.')}
                                  className="bg-primary/40 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-sm cursor-not-allowed border-none shadow-sm"
                                >
                                  No File
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

            </div>
          </div>
        </div>
      )}

      {/* 15. ADMIN PORTAL CONTROL PANEL MODAL */}
      {showAdminPortal && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-primary/80 backdrop-blur-md animate-fade-in" onClick={() => setShowAdminPortal(false)}>
          <div className="relative w-full max-w-5xl bg-white rounded-lg shadow-2xl border-t-4 border-accent overflow-hidden max-h-[95vh] flex flex-col animate-scale-up" onClick={(e) => e.stopPropagation()}>
            
            {/* Close button */}
            <button 
              onClick={() => setShowAdminPortal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 text-primary hover:text-accent transition-all cursor-pointer border-none"
              aria-label="Close Admin Portal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-4 sm:p-8 overflow-y-auto space-y-6 sm:space-y-8 text-left">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-primary/5 pb-4 sm:pb-6 gap-3 sm:gap-4">
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-2xl font-bold font-serif text-primary">Academic Administration Portal</h3>
                  <p className="text-[10px] sm:text-xs text-text-dark/60 font-light mt-0.5 font-sans truncate">Logged in as Administrator &bull; {user.email}</p>
                </div>
                
                <span className="bg-red-500/10 text-red-700 border border-red-500/20 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm font-mono shrink-0">
                  Manager Authorization
                </span>
              </div>

              {/* ── Admission Inquiries Section ───────────────────────────────── */}
              <div className="space-y-4">
                <h4 className="font-bold text-primary text-xs uppercase tracking-widest font-mono border-b border-primary/5 pb-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-accent" />
                  Admission Inquiries ({inquiries.length})
                </h4>
                {inquiries.length === 0 ? (
                  <p className="text-center text-xs text-text-dark/50 py-6">No admission inquiries yet. They will appear here when students submit the counselling form.</p>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                    {inquiries.map((inq, idx) => (
                      <div key={inq.id || idx} className="p-4 rounded-md border border-primary/10 bg-primary/[0.01] text-xs space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-bold text-primary text-sm">{inq.fullName || inq.full_name}</p>
                            <p className="text-text-dark/60 font-mono text-[10px] mt-0.5">{inq.timestamp || inq.created_at || '—'}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm ${(inq.level || '') === 'olevel' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-purple-100 text-purple-700 border border-purple-200'}`}>
                              {(inq.level || '') === 'olevel' ? 'O-Levels' : 'A-Levels'}
                            </span>
                            {/* Delete button */}
                            <button
                              onClick={async () => {
                                if (!confirm(`Delete inquiry from "${inq.fullName || inq.full_name}"? This cannot be undone.`)) return;
                                if (supabase && inq.id && typeof inq.id === 'string') {
                                  const { error } = await supabase.from('inquiries').delete().eq('id', inq.id);
                                  if (error) {
                                    console.error('Delete inquiry error:', error);
                                    alert('Failed to delete inquiry from database.');
                                    return;
                                  }
                                }
                                setInquiries(prev => prev.filter(i => i.id !== inq.id));
                              }}
                              className="text-red-500 hover:text-red-700 transition-colors cursor-pointer border-none bg-transparent p-0.5 rounded"
                              title="Delete inquiry"
                              aria-label="Delete inquiry"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div><span className="text-text-dark/50 uppercase tracking-wider">Phone: </span><span className="font-semibold text-primary">{inq.phone}</span></div>
                          <div><span className="text-text-dark/50 uppercase tracking-wider">Email: </span><span className="font-semibold text-primary truncate block">{inq.email}</span></div>
                        </div>
                        <div className="text-[10px]"><span className="text-text-dark/50 uppercase tracking-wider">Subjects: </span><span className="font-semibold text-primary">{inq.subjects}</span></div>
                        {(inq.message && inq.message !== 'No additional notes provided.') && (
                          <div className="text-[10px] text-text-dark/60 italic border-t border-primary/5 pt-2">"{inq.message}"</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Academic Notes Upload and List Manager */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Upload Form */}
                  <div className="lg:col-span-5 bg-primary/[0.01] border border-primary/10 rounded-md p-5 space-y-4">
                    <h4 className="font-bold text-primary text-xs uppercase tracking-widest font-mono border-b border-primary/5 pb-2">Upload Study Resource</h4>
                    
                    <form onSubmit={handleNoteUploadSubmit} className="space-y-4 text-xs">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase text-text-dark/60 tracking-wider">Note / Document Title</label>
                        <input
                          type="text"
                          required
                          value={noteTitle}
                          onChange={(e) => setNoteTitle(e.target.value)}
                          placeholder="e.g. O-Level Islamiat Hajj Pilgrimage Guide"
                          className="w-full bg-white border border-primary/10 px-3 py-2 rounded-sm outline-none focus:border-accent text-text-dark"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold uppercase text-text-dark/60 tracking-wider">Subject Category</label>
                          <select
                            value={noteSubject}
                            onChange={(e) => setNoteSubject(e.target.value)}
                            className="w-full bg-white border border-primary/10 px-3 py-2 rounded-sm outline-none focus:border-accent text-text-dark"
                          >
                            <option value="english">English</option>
                            <option value="urdu">Urdu</option>
                            <option value="islamiat">Islamiat</option>
                            <option value="mathematics">Mathematics</option>
                            <option value="physics">Physics</option>
                            <option value="pakstudies">Pak Studies</option>
                            <option value="computerscience">Computer Science</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold uppercase text-text-dark/60 tracking-wider">Resource Type</label>
                          <select
                            value={noteType}
                            onChange={(e) => setNoteType(e.target.value as any)}
                            className="w-full bg-white border border-primary/10 px-3 py-2 rounded-sm outline-none focus:border-accent text-text-dark"
                          >
                            <option value="notes">Syllabus Notes</option>
                            <option value="pastpaper">Past Paper</option>
                          </select>
                        </div>
                      </div>

                      {/* File Upload Input */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="block text-[10px] font-bold uppercase text-text-dark/60 tracking-wider">Select File (PDF / DOC)</label>
                          <span className="text-[9px] text-text-dark/40 font-mono">Max 50 MB</span>
                        </div>
                        <label className="flex items-center gap-3 w-full bg-white border-2 border-dashed border-primary/20 hover:border-accent px-3 py-3 rounded-sm cursor-pointer transition-colors group">
                          <svg className="w-5 h-5 text-primary/40 group-hover:text-accent shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                          </svg>
                          <span className="text-[10px] text-text-dark/50 group-hover:text-primary transition-colors">
                            {selectedFile ? `${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(1)} MB)` : 'Click to browse or drag file here'}
                          </span>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.ppt,.pptx"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              if (file && file.size / 1024 / 1024 > 50) {
                                alert(`File too large: ${(file.size / 1024 / 1024).toFixed(1)} MB\nMaximum allowed is 50 MB. Please compress it first.`);
                                e.target.value = '';
                                setSelectedFile(null);
                              } else {
                                setSelectedFile(file);
                              }
                            }}
                          />
                        </label>
                        {selectedFile && (
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[9px] text-green-600 font-semibold font-mono">
                              ✓ {(selectedFile.size / 1024 / 1024).toFixed(2)} MB selected
                            </span>
                            <button
                              type="button"
                              onClick={() => setSelectedFile(null)}
                              className="text-[9px] text-red-500 hover:text-red-700 font-bold cursor-pointer border-none bg-transparent"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/95 text-white py-2.5 rounded-sm font-bold uppercase tracking-wider transition cursor-pointer border-none shadow-md mt-2 active:translate-y-0.5"
                      >
                        Upload to Library
                      </button>
                    </form>
                  </div>

                  {/* Right Column: Manage Notes Table */}
                  <div className="lg:col-span-7 space-y-4">
                    <h4 className="font-bold text-primary text-xs uppercase tracking-widest font-mono border-b border-primary/5 pb-2">Academic Resources Registry ({notesList.length})</h4>
                    
                    {notesList.length === 0 ? (
                      <p className="text-center text-xs text-text-dark/50 py-8">No uploaded resources in library.</p>
                    ) : (
                      <div className="overflow-x-auto border border-primary/10 rounded-md shadow-sm">
                        <table className="w-full text-xs text-left border-collapse">
                          <thead>
                            <tr className="bg-primary/5 border-b border-primary/10 text-primary uppercase font-bold tracking-wider font-mono">
                              <th className="p-3">Resource Details</th>
                              <th className="p-3">Subject</th>
                              <th className="p-3">Size</th>
                              <th className="p-3">Uploaded</th>
                              <th className="p-3">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {notesList.map((note) => (
                              <tr key={note.id} className="border-b border-primary/5 hover:bg-primary/[0.01] text-text-dark/80">
                                <td className="p-3">
                                  <div className="font-semibold text-primary">{note.title}</div>
                                  <div className="text-[10px] text-text-dark/50 mt-0.5 font-mono">{note.file_name || note.fileName}</div>
                                </td>
                                <td className="p-3">
                                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm ${note.type === 'notes' ? 'bg-accent/15 text-primary border border-accent/20' : 'bg-primary/10 text-primary border border-primary/20'}`}>
                                    {note.type === 'notes' ? 'Notes' : 'Paper'}
                                  </span>
                                  <span className="block text-[9px] text-text-dark/50 mt-1 uppercase font-mono">{note.subject}</span>
                                </td>
                                <td className="p-3"><span className="font-mono">{note.file_size || note.fileSize || '—'}</span></td>
                                <td className="p-3 text-[10px] text-text-dark/60">{(note.created_at || note.date || '').toString().split('T')[0]}</td>
                                <td className="p-3">
                                  <button
                                    onClick={async () => {
                                      if (confirm(`Are you sure you want to remove "${note.title}"?`)) {
                                        if (supabase && note.id && typeof note.id === 'string') {
                                          // Delete from Supabase (UUID ids come from Supabase)
                                          const { error } = await supabase.from('notes').delete().eq('id', note.id);
                                          if (!error) {
                                            setNotesList(prev => prev.filter(n => n.id !== note.id));
                                          } else {
                                            console.error('Supabase delete error:', error);
                                            alert('Failed to delete from database.');
                                          }
                                        } else {
                                          // Local state only (numeric id = local mock)
                                          setNotesList(prev => prev.filter(n => n.id !== note.id));
                                        }
                                      }
                                    }}
                                    className="text-red-600 hover:text-red-800 font-bold uppercase text-[10px] cursor-pointer border-none bg-transparent"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>

            </div>
          </div>
        </div>
      )}
      {/* 16. UPLOAD PROGRESS MODAL */}
      {isUploading && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-primary/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-sm flex flex-col items-center text-center relative overflow-hidden animate-scale-up">
            {uploadSuccessMark ? (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 animate-scale-up border-4 border-green-500/20">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h4 className="text-xl font-bold font-serif text-primary">Upload Complete</h4>
                <p className="text-xs text-text-dark/60 mt-2">The resource has been successfully published to the library.</p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 border-4 border-primary/20 border-t-accent rounded-full animate-spin mb-4"></div>
                <h4 className="text-lg font-bold font-serif text-primary">Publishing Resource</h4>
                <p className="text-xs text-text-dark/60 mt-1 mb-6">Uploading to secure storage...</p>
                
                <div className="w-full bg-primary/10 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-accent h-2.5 rounded-full transition-all duration-300 ease-out" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-[10px] font-mono text-primary font-bold mt-2">{uploadProgress}%</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* 17. LOGIN SUCCESS POPUP */}
      {showLoginSuccessPopup && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-fade-in" onClick={() => setShowLoginSuccessPopup(false)}>
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-sm flex flex-col items-center text-center relative overflow-hidden animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowLoginSuccessPopup(false)}
              className="absolute top-4 right-4 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-primary/5 hover:bg-primary/10 text-primary transition-all cursor-pointer border-none"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 border-4 border-green-500/20">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h4 className="text-xl font-bold font-serif text-primary">Login Successful!</h4>
            <p className="text-xs text-text-dark/60 mt-2">Welcome back to the CamFord Portal.</p>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/923208422445?text=Hello%20CamFord%20Academiya%2C%20I%20have%20an%20admissions%20inquiry."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 sm:gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white px-3 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group border border-white/20 active:scale-95 cursor-pointer font-bold font-sans tracking-wide text-xs uppercase"
        style={{
          boxShadow: '0 10px 30px -5px rgba(37, 211, 102, 0.45)'
        }}
      >
        <svg 
          className="w-5 h-5 fill-current transform group-hover:rotate-12 transition-transform duration-300 shrink-0" 
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.714-1.465L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.379 1.968 13.914 1.94 12.012 1.94 6.58 1.94 2.16 6.31 2.156 11.737c-.001 1.691.464 3.342 1.343 4.8l-.996 3.635 3.734-.977-.19.112zM17.156 14.28c-.282-.143-1.67-.82-1.928-.915-.258-.095-.447-.143-.635.143-.188.286-.727.915-.89 1.101-.162.186-.326.208-.608.066-.282-.143-1.192-.437-2.27-1.402-.838-.747-1.405-1.67-1.569-1.955-.163-.285-.018-.44.124-.581.127-.127.282-.328.423-.492.141-.164.188-.285.282-.476.095-.19.047-.358-.023-.5-.071-.143-.635-1.527-.869-2.09-.228-.547-.479-.472-.656-.481-.17-.008-.366-.01-.562-.01-.197 0-.517.073-.787.368-.27.296-1.032 1.01-1.032 2.463s1.056 2.85 1.203 3.047c.146.196 2.077 3.172 5.032 4.45.703.304 1.252.486 1.681.622.707.225 1.35.193 1.859.117.567-.085 1.67-.682 1.905-1.34.235-.658.235-1.223.164-1.34-.07-.117-.263-.188-.546-.33z"/>
        </svg>
        <span className="hidden xs:inline font-bold tracking-wider">Instant Live Chat</span>
      </a>

      </div>
    </ClickSpark>
  );
}
