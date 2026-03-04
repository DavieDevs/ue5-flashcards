export const lessons = [
  {
    id: "s2-l17",
    section: 2,
    lesson: 17,
    title: "Creating a C++ Class",
    description: "Parent classes, naming conventions, header vs source files, BeginPlay & Tick",
    cards: [
      {
        id: "s2l17-1",
        front: "Why do we choose Actor as the parent class for a Moving Platform?",
        back: "Because we want to place it in the world. Choosing Actor as the parent gives us all the built-in UE5 Actor functionality by default — like being spawnable and placeable in a level.",
        tag: "Architecture"
      },
      {
        id: "s2l17-2",
        front: "What are the two files created when you make a new C++ class in UE5?",
        back: "A header file (.h) and a C++ source file (.cpp).\n\nExample: MovingPlatform.h and MovingPlatform.cpp",
        tag: "Files"
      },
      {
        id: "s2l17-3",
        front: "What is the role of the header file (.h)?",
        back: "It's like a menu — it declares what the class HAS (its variables and functions) but doesn't define what they do. Think of it as the table of contents.",
        tag: "Files"
      },
      {
        id: "s2l17-4",
        front: "What is the role of the .cpp file?",
        back: "It contains the actual implementation — the code that defines what each function does. The function bodies live here.",
        tag: "Files"
      },
      {
        id: "s2l17-5",
        front: "What is the UE5 naming convention for Actor classes, and why?",
        back: "Actor classes are prefixed with 'A' — e.g. AMovingPlatform.\n\nThis is UE5's convention to signal that a class is an Actor subclass. Each word is also capitalized (PascalCase) for readability.",
        tag: "Conventions"
      },
      {
        id: "s2l17-6",
        front: "What is BeginPlay and when does it get called?",
        back: "BeginPlay is a special function called once when the Actor is spawned into the game (or when the game starts if the Actor is already in the level). Code inside it runs at the very beginning.",
        tag: "Lifecycle"
      },
      {
        id: "s2l17-7",
        front: "What is Tick and when does it get called?",
        back: "Tick is called every single frame while the game is running. It receives a DeltaTime parameter — the time in seconds since the last frame — used for frame-rate independent movement.",
        tag: "Lifecycle"
      },
      {
        id: "s2l17-8",
        front: "What is the correct syntax for logging a message in UE5 C++?",
        back: "UE_LOG(LogTemp, Display, TEXT(\"Your message here\"));\n\n• LogTemp — the log category\n• Display — the severity level\n• TEXT() — wraps the string for UE's character system",
        tag: "Logging"
      },
      {
        id: "s2l17-9",
        front: "In what order does code inside a function execute?",
        back: "Top to bottom. The first line runs first, then the second, and so on. This is fundamental to how all imperative programming works.",
        tag: "Fundamentals"
      },
      {
        id: "s2l17-10",
        front: "Why did the MovingPlatform Actor have no transform when first dragged into the level?",
        back: "Because it had no components. In UE5, an Actor's position in the world is defined by its Root Component — without one, there's nothing to attach a transform to.",
        tag: "Components"
      },
      {
        id: "s2l17-11",
        front: "What are components in UE5?",
        back: "Components add functionality to Actors. Examples:\n• UStaticMeshComponent — visible 3D mesh\n• UBoxComponent — collision\n• UPointLightComponent — emits light\n\nActors are containers; components give them abilities.",
        tag: "Components"
      },
      {
        id: "s2l17-12",
        front: "How do you navigate to create a new C++ class in the UE5 editor?",
        back: "Tools → New C++ Class → Choose parent class → Name it → Create Class.\n\nUE5 will add the source files and auto-compile the project.",
        tag: "Editor"
      }
    ]
  }
  // Add future lessons here — same structure as above.
  // Example:
  // {
  //   id: "s2-l18",
  //   section: 2,
  //   lesson: 18,
  //   title: "Your Lesson Title",
  //   description: "Brief description of what this lesson covers",
  //   cards: [ ... ]
  // }
];

// Helper: get all unique sections
export const getSections = () => {
  const sections = [...new Set(lessons.map(l => l.section))];
  return sections.sort((a, b) => a - b);
};

// Helper: get lessons for a section
export const getLessonsForSection = (section) =>
  lessons.filter(l => l.section === section);

// Helper: get all cards for an array of lesson ids
export const getCardsForLessons = (lessonIds) => {
  return lessons
    .filter(l => lessonIds.includes(l.id))
    .flatMap(l => l.cards.map(c => ({ ...c, lessonTitle: l.title, lesson: l.lesson })));
};
