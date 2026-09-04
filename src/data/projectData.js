import homeImg from '../assets/NutriGen App/Home page.jpeg';
import quizImg from '../assets/NutriGen App/Health Quiz.jpeg';
import quizResultsImg from '../assets/NutriGen App/Health Quiz Results.jpeg';
import scannerImg from '../assets/NutriGen App/Product Scanner.jpeg';
import dietImg from '../assets/NutriGen App/My diet plan.jpeg';
import profileImg from '../assets/NutriGen App/Profile Page.jpeg';

import cfHome from '../assets/CollageFlow/Home  Page.jpeg';
import cfCalander from '../assets/CollageFlow/Calander Page.jpeg';
import cfNotes from '../assets/CollageFlow/Notes Page.jpeg';
import cfTasks from '../assets/CollageFlow/Tasks Page.jpeg';
import cfSettings from '../assets/CollageFlow/Settings Page.jpeg';

import heroImg from '../assets/hero.png';

export const projectData = [
  {
    id: 1,
    title: "NutriGen App",
    description: "A smart, personalized nutrition and health-tracking platform with barcode scanning, custom diet plans, and health quizzes.",
    tech: ["React", "FastAPI", "Tailwind", "Python"],
    github: "https://github.com/akash-exe-19/NutriGen",
    link: "https://github.com/akash-exe-19/NutriGen",
    image: homeImg,
    status: "DEPLOYED",
    details: {
      tagline: "Personalized Digital Nutrition Assistant & Health Tracking Ecosystem",
      overview: "Nutri-Gen is a smart, personalized nutrition and health-tracking platform designed to take the guesswork out of dietary planning. It functions as a digital nutrition assistant that helps users track their food intake, understand their eating habits, and reach specific fitness goals like weight loss, muscle gain, or maintenance. Instead of relying solely on tedious manual data entry, the platform leverages smart tools to make logging food and understanding health metrics as frictionless as possible.",
      features: [
        {
          name: "Smart Food Logging & Barcode Scanner",
          desc: "Users can instantly retrieve accurate nutritional data—including calories, proteins, carbohydrates, and fats—by scanning food barcodes or using image recognition technology to snap a picture of their meal.",
          image: scannerImg
        },
        {
          name: "Interactive Health Quiz & Baseline Assessment",
          desc: "A targeted assessment tool that gathers information about the user's lifestyle, metrics, and dietary preferences to establish a baseline for highly personalized recommendations.",
          images: [quizImg, quizResultsImg]
        },
        {
          name: "Tailored Diet Plans & Goals",
          desc: "The app calculates optimal daily macros and generates specific meal suggestions based on individual body types and dietary restrictions.",
          image: dietImg
        },
        {
          name: "Comprehensive Progress Tracking & Profile",
          desc: "Visualizes daily summaries and historical insights through intuitive charts, while also factoring in burned calories from logged physical activities.",
          images: [homeImg, profileImg]
        }
      ],
      gallery: [homeImg, scannerImg, quizImg, quizResultsImg, dietImg, profileImg]
    }
  },
  {
    id: 2,
    title: "CollegeFlow",
    description: "A comprehensive student schedule & task manager Android application with automated daily routine clearing, calendar planning, and notes.",
    tech: ["Android", "Kotlin", "Jetpack Compose", "Room DB"],
    github: "https://github.com/akash-exe-19/CollageFlow",
    link: "https://github.com/akash-exe-19/CollageFlow",
    image: cfHome,
    status: "DEPLOYED",
    details: {
      tagline: "Automated Student Schedule, Task & Note Management Ecosystem",
      overview: "CollegeFlow is a comprehensive student productivity Android application engineered to help students manage class schedules, assignment deadlines, course notes, and daily routines seamlessly. Built with modern Android architecture (Kotlin, Jetpack Compose, Room DB), it features automated daily schedule synchronization, integrated calendar planning, task tracking with automated daily cleanup, and course note management.",
      features: [
        {
          name: "Dashboard & Course Timetable",
          desc: "Intuitive central dashboard displaying upcoming class routines, daily schedules, and active academic deadlines at a glance.",
          image: cfHome
        },
        {
          name: "Interactive Academic Calendar",
          desc: "Comprehensive monthly and weekly calendar interface for tracking exam schedules, assignment submission dates, and key academic events.",
          image: cfCalander
        },
        {
          name: "Smart Task & Routine Manager",
          desc: "Organized to-do checklist system with priority tags, automated daily task clearing, and deadline reminders to keep students on track.",
          image: cfTasks
        },
        {
          name: "Course Notes & Subject Documentation",
          desc: "Dedicated note-taking environment to store class notes, revision topics, and study resources per subject.",
          image: cfNotes
        },
        {
          name: "App Settings & Customization",
          desc: "Personalized app settings including theme customization, automated cleanup preferences, and notification triggers.",
          image: cfSettings
        }
      ],
      gallery: [cfHome, cfCalander, cfTasks, cfNotes, cfSettings]
    }
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A highly interactive cyberpunk & editorial portfolio featuring Matrix rain, floating hero island, live activity radar, 3D mesh sandbox, CLI terminal with Snake mini-game, and Spotlight command palette.",
    tech: ["React", "Three.js", "Framer Motion", "Tailwind CSS", "Vite"],
    github: "https://github.com/akash-exe-19/Portfolio",
    link: "https://akash-exe-19.github.io/Portfolio/",
    image: heroImg,
    status: "DEPLOYED",
    details: {
      tagline: "Interactive Cyberpunk Developer Portfolio & WebGL Sandbox",
      overview: "A custom-engineered developer portfolio crafted with modern web technologies (React, Framer Motion, HTML5 Canvas, Web Audio API, Tailwind CSS). It steps away from typical corporate templates into a loud cyberpunk, black & white editorial aesthetic featuring matrix rain streams, floating hero island with live activity status, real-time 3D wireframe sandbox with custom geometry builder, interactive CLI console with retro Snake mini-game, Spotlight command palette (Ctrl+K), bento grid tech stack, and zero-dependency synthesized UI sound effects.",
      features: [
        {
          name: "Matrix Code Rain & Floating Hero Island",
          desc: "Renders a full-screen Matrix katakana code stream behind a floating dark hero card displaying live local time, typewriter roles, and a customizable Live Activity Radar.",
          image: heroImg
        },
        {
          name: "Interactive 3D Mesh Playground & Custom Creator",
          desc: "HTML5 3D wireframe engine rendering Cube, Octahedron, Pyramid, and Torus Knot geometries with drag-rotation, Ctrl+scroll zoom, auto-rotate, and an interactive 3D mesh builder with auto-connect vertices, manual edge creation, and Ctrl+Z undo history."
        },
        {
          name: "Interactive Terminal & Retro Snake Mini-Game",
          desc: "Command-line terminal shell executing system commands (help, about, skills, projects, contact, clear) and a playable retro Matrix Snake arcade game with high score memory."
        },
        {
          name: "Spotlight Command Palette (Ctrl + K)",
          desc: "Keyboard-driven spotlight launcher (Ctrl+K) for instant navigation to any section, theme accent color switching (Red, Cyan, Purple, Emerald), email copying, sound controls, and fullscreen mode."
        },
        {
          name: "Cyber SFX Engine & Audio Controls",
          desc: "Zero-dependency synthesized Web Audio API sound effects for UI clicks, hover ticks, terminal execution, and game over sounds, complete with a bell mute button in the Music player."
        },
        {
          name: "Bento Grid Tech Stack & Film-Strip Gallery",
          desc: "Asymmetric Bento grid layout for technical proficiency levels and a draggable film-strip gallery with monospaced spec overlays and darkroom inspection lightbox."
        }
      ],
      gallery: [heroImg]
    }
  },
  {
    id: 4,
    title: "BLISS",
    description: "Bluetooth Low-Energy Indoor Sensing System that applies RSSI dynamics to an Indoor Positioning System in multi-room spaces.",
    tech: ["Bluetooth LE", "RSSI Dynamics", "Python", "Embedded C++"],
    github: "",
    link: "",
    image: "https://picsum.photos/seed/bliss/800/500",
    status: "IN DEVELOPMENT",
    inDevelopment: true,
    details: {
      tagline: "Bluetooth Low-Energy Indoor Sensing System (Multi-Room IPS)",
      overview: "BLISS (Bluetooth Low-Energy Indoor Sensing System) applies RSSI dynamics to an Indoor Positioning System in multi-room spaces. It engineers precise room-level and sub-room spatial localization using low-energy Bluetooth beacons, dynamic RSSI filtering models, and multi-sensor spatial triangulation.",
      inDevelopment: true,
      features: [
        {
          name: "System Currently In Active Development",
          desc: "Hardware beacon calibration, RSSI signal filtering models, and multi-room spatial mapping algorithms are currently being actively engineered. Repository code and hardware schematics will be released upon milestone completion."
        }
      ]
    }
  }
];
