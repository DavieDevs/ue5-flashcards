export const lessons = [
  {
    id: "s2-l17",
    section: 2,
    lesson: 17,
    title: "Creating a C++ Class",
    description:
      "Parent classes, naming conventions, header vs source files, BeginPlay & Tick",
    cards: [
      {
        id: "s2l17-1",
        front:
          "Why do we choose Actor as the parent class for a Moving Platform?",
        back: "Because we want to place it in the world. Choosing Actor as the parent gives us all the built-in UE5 Actor functionality by default — like being spawnable and placeable in a level.",
        tag: "Architecture",
      },
      {
        id: "s2l17-2",
        front:
          "What are the two files created when you make a new C++ class in UE5?",
        back: "A header file (.h) and a C++ source file (.cpp).\n\nExample: MovingPlatform.h and MovingPlatform.cpp",
        tag: "Files",
      },
      {
        id: "s2l17-3",
        front: "What is the role of the header file (.h)?",
        back: "It's like a menu — it declares what the class HAS (its variables and functions) but doesn't define what they do. Think of it as the table of contents.",
        tag: "Files",
      },
      {
        id: "s2l17-4",
        front: "What is the role of the .cpp file?",
        back: "It contains the actual implementation — the code that defines what each function does. The function bodies live here.",
        tag: "Files",
      },
      {
        id: "s2l17-5",
        front: "What is the UE5 naming convention for Actor classes, and why?",
        back: "Actor classes are prefixed with 'A' — e.g. AMovingPlatform.\n\nThis is UE5's convention to signal that a class is an Actor subclass. Each word is also capitalized (PascalCase) for readability.",
        tag: "Conventions",
      },
      {
        id: "s2l17-6",
        front: "What is BeginPlay and when does it get called?",
        back: "BeginPlay is a special function called once when the Actor is spawned into the game (or when the game starts if the Actor is already in the level). Code inside it runs at the very beginning.",
        tag: "Lifecycle",
      },
      {
        id: "s2l17-7",
        front: "What is Tick and when does it get called?",
        back: "Tick is called every single frame while the game is running. It receives a DeltaTime parameter — the time in seconds since the last frame — used for frame-rate independent movement.",
        tag: "Lifecycle",
      },
      {
        id: "s2l17-8",
        front: "What is the correct syntax for logging a message in UE5 C++?",
        back: 'UE_LOG(LogTemp, Display, TEXT("Your message here"));\n\n• LogTemp — the log category\n• Display — the severity level\n• TEXT() — wraps the string for UE\'s character system',
        tag: "Logging",
      },
      {
        id: "s2l17-9",
        front: "In what order does code inside a function execute?",
        back: "Top to bottom. The first line runs first, then the second, and so on. This is fundamental to how all imperative programming works.",
        tag: "Fundamentals",
      },
      {
        id: "s2l17-10",
        front:
          "Why did the MovingPlatform Actor have no transform when first dragged into the level?",
        back: "Because it had no components. In UE5, an Actor's position in the world is defined by its Root Component — without one, there's nothing to attach a transform to.",
        tag: "Components",
      },
      {
        id: "s2l17-11",
        front: "What are components in UE5?",
        back: "Components add functionality to Actors. Examples:\n• UStaticMeshComponent — visible 3D mesh\n• UBoxComponent — collision\n• UPointLightComponent — emits light\n\nActors are containers; components give them abilities.",
        tag: "Components",
      },
      {
        id: "s2l17-12",
        front:
          "How do you navigate to create a new C++ class in the UE5 editor?",
        back: "Tools → New C++ Class → Choose parent class → Name it → Create Class.\n\nUE5 will add the source files and auto-compile the project.",
        tag: "Editor",
      },
    ],
  },

  {
    id: "s2-l19",
    section: 2,
    lesson: 19,
    title: "Variables and Data Types",
    description:
      "What variables are, C++ data types, declaration, assignment, naming conventions",
    cards: [
      {
        id: "s2l19-1",
        front: "What is a variable?",
        back: "A container that stores a specific type of data. Think of it as a box with a name on it — the name identifies it, and the box holds a value of a specific type.",
        tag: "Fundamentals",
      },
      {
        id: "s2l19-2",
        front: "What are the basic data types in C++?",
        back: "• int — whole numbers (1, -10, 200)\n• float — decimal numbers (3.14f)\n• double — decimal numbers with greater precision\n• char — a single character ('A')\n• bool — true or false\n\nPlus FString, which is UE5-specific for storing text.",
        tag: "Fundamentals",
      },
      {
        id: "s2l19-3",
        front: "What is the difference between float and double?",
        back: "Both store floating point (decimal) numbers. A double can store larger numbers with greater accuracy. In UE5 you'll mostly use float, and only reach for double when you need extra precision.",
        tag: "Fundamentals",
      },
      {
        id: "s2l19-4",
        front: "How do you declare and assign a variable in C++?",
        back: "DataType VariableName = InitialValue;\n\nExamples:\nint MyInt = 100;\nfloat MyFloat = 12.34f;\nbool MyBool = true;\nchar MyChar = 'A';\nFString MyString = \"Hello\";",
        tag: "Fundamentals",
      },
      {
        id: "s2l19-5",
        front: "What does the assignment operator (=) do in C++?",
        back: "It assigns the value on the RIGHT side into the variable on the LEFT side. It's not checking equality — it's storing a value.\n\nExample:\nMyInt = 50; // MyInt now holds 50",
        tag: "Fundamentals",
      },
      {
        id: "s2l19-6",
        front: "What is an 'initial value' of a variable?",
        back: "The value assigned to a variable on the same line it is declared. You can reassign a variable later, but the first value it gets is called its initial value.\n\nint MyInt = 100; // 100 is the initial value",
        tag: "Fundamentals",
      },
      {
        id: "s2l19-7",
        front: "Why do you put an 'f' at the end of a float value?",
        back: "To tell the compiler it's a float, not a double. Without the f, C++ treats decimal numbers as double by default.\n\nfloat MyFloat = 12.34f;  // float\ndouble MyDouble = 12.34; // double",
        tag: "Fundamentals",
      },
      {
        id: "s2l19-8",
        front:
          "What is the difference between single quotes and double quotes in C++?",
        back: "Single quotes ' ' = a single character (char type)\nDouble quotes \" \" = a string of characters (FString/string type)\n\nchar MyChar = 'A';       // single character\nFString MyStr = \"Hello\"; // string of text",
        tag: "Fundamentals",
      },
      {
        id: "s2l19-9",
        front: "What values can a bool variable hold?",
        back: "Only true or false. Nothing else — assigning a number like 100 to a bool will cause a compile error due to invalid type conversion.",
        tag: "Fundamentals",
      },
      {
        id: "s2l19-10",
        front: "What is FString and how is it different from basic C++ types?",
        back: "FString is UE5's string type for storing text. It's not a basic C++ type — it's provided by Unreal Engine. Use double quotes to assign it.\n\nFString MyName = \"Kaan\";",
        tag: "Conventions",
      },
      {
        id: "s2l19-11",
        front:
          "What are the three common naming conventions and which does UE5 prefer?",
        back: "• PascalCase — first letter of every word capitalized: MyVariable\n• camelCase — first word lowercase, rest capitalized: myVariable\n• snake_case — all lowercase with underscores: my_variable\n\nUE5 uses PascalCase. Pick one and stick to it — mixing conventions in a project is bad practice.",
        tag: "Conventions",
      },
      {
        id: "s2l19-12",
        front: "Can a variable be reassigned after its initial value is set?",
        back: "Yes. You can assign a new value to a variable as many times as you want after declaration. The variable holds whatever the last assignment was.\n\nint MyInt = 100;\nMyInt = 50; // MyInt is now 50",
        tag: "Fundamentals",
      },
    ],
  },
  {
    id: "s2-l20",
    section: 2,
    lesson: 20,
    title: "Logging Variables",
    description:
      "Format specifiers, printing ints/floats/strings in UE_LOG, function arguments",
    cards: [
      {
        id: "s2l20-1",
        front:
          "What is a format specifier in UE_LOG, and what symbol introduces one?",
        back: 'A format specifier is a placeholder inside a log message that gets replaced by a variable\'s value at runtime. It starts with a % sign.\n\nExample: UE_LOG(LogTemp, Display, TEXT("Apples: %d"), NumberOfApples);',
        tag: "Logging",
      },
      {
        id: "s2l20-2",
        front:
          "What are the three most common UE_LOG format specifiers and what type does each handle?",
        back: "%d — integer (int)\n%f — floating point (float)\n%s — string (FString)\n\nThere are others (e.g. %c for char) but these three are used most often.",
        tag: "Logging",
      },
      {
        id: "s2l20-3",
        front: "How do you log an integer variable in UE5?",
        back: 'int NumberOfApples = 10;\nUE_LOG(LogTemp, Display, TEXT("Apples: %d"), NumberOfApples);\n\nThe %d is replaced by the value of NumberOfApples at runtime.',
        tag: "Logging",
      },
      {
        id: "s2l20-4",
        front: "How do you log a float variable in UE5?",
        back: 'float MyHeight = 182.5f;\nUE_LOG(LogTemp, Display, TEXT("Height: %f"), MyHeight);\n\nUse %f for floats. Note: this prints extra trailing zeros by default.',
        tag: "Logging",
      },
      {
        id: "s2l20-5",
        front:
          "How do you log an FString variable in UE5, and what is special about it?",
        back: 'FString MyName = "Kaan";\nUE_LOG(LogTemp, Display, TEXT("Name: %s"), *MyName);\n\nYou must add an asterisk * before the FString variable. This converts it to the format UE_LOG requires. Without it, it won\'t compile.',
        tag: "Logging",
      },
      {
        id: "s2l20-6",
        front: "What does the asterisk * do before an FString in UE_LOG?",
        back: 'It dereferences the FString into a raw character pointer (TCHAR*) that UE_LOG\'s %s format specifier requires. Without it UE_LOG cannot read the string.\n\nUE_LOG(LogTemp, Display, TEXT("%s"), *MyName);',
        tag: "Logging",
      },
      {
        id: "s2l20-7",
        front: "How do you log multiple variables in a single UE_LOG message?",
        back: 'Add multiple format specifiers in the text and provide matching variables after — order matters.\n\nUE_LOG(LogTemp, Display, TEXT("%d and %d"), NumberOfApples, NumberOfOranges);\n\nThe first %d maps to the first variable, second %d to the second.',
        tag: "Logging",
      },
      {
        id: "s2l20-8",
        front:
          "What are the three log levels in UE_LOG and what color does each display?",
        back: 'Display — standard white message\nWarning — shown in yellow\nError — shown in red\n\nUsage: UE_LOG(LogTemp, Warning, TEXT("Something\'s wrong!"));',
        tag: "Logging",
      },
      {
        id: "s2l20-9",
        front: "What are 'arguments' in a function call?",
        back: "Arguments are the values you pass into a function so it can operate. They go inside the parentheses, separated by commas.\n\nIn UE_LOG the arguments are: log category, log level, and the text message (plus any variables).",
        tag: "Fundamentals",
      },
      {
        id: "s2l20-10",
        front: "Is UE_LOG actually a function?",
        back: "No — UE_LOG is a macro, not a function. TEXT() is also a macro. However they look and behave like functions at this stage, so they can be treated the same way conceptually for now.",
        tag: "Logging",
      },
    ],
  },
  {
    id: "s2-l21",
    section: 2,
    lesson: 21,
    title: "Number Operations",
    description: "Arithmetic operators, expressions, integer vs float math, negative numbers",
    cards: [
      {
        id: "s2l21-1",
        front: "What are the four basic arithmetic operators in C++?",
        back: "+ addition\n- subtraction\n* multiplication\n/ division\n\nExample:\nint Result = 10 + 5;  // 15\nint Result = 10 - 5;  // 5\nint Result = 10 * 5;  // 50\nint Result = 10 / 5;  // 2",
        tag: "Fundamentals"
      },
      {
        id: "s2l21-2",
        front: "What is an expression in C++?",
        back: "An operator and its operands that evaluate to a single value.\n\nExample: 10 / 5 is an expression that evaluates to 2. That result can then be assigned to a variable.\n\nint MyValue = 10 / 5; // MyValue = 2",
        tag: "Fundamentals"
      },
      {
        id: "s2l21-3",
        front: "Can you use variables inside arithmetic expressions?",
        back: "Yes. Variables can be used with operators just like raw numbers, and you can mix both.\n\nint MyValue = -5;\nint MyOther = -8;\nint Result = MyValue * MyOther; // 40",
        tag: "Fundamentals"
      },
      {
        id: "s2l21-4",
        front: "How do you make a number negative in C++?",
        back: "Place a minus sign directly in front of it.\n\nint MyValue = -5;\nfloat MyFloat = -3.14f;\n\nThis works with both literals and as part of expressions.",
        tag: "Fundamentals"
      },
      {
        id: "s2l21-5",
        front: "What happens when you multiply two negative integers?",
        back: "The result is positive — same rule as in math.\n\nint A = -5;\nint B = -8;\nint Result = A * B; // 40 (positive)",
        tag: "Fundamentals"
      },
      {
        id: "s2l21-6",
        front: "What is the critical difference between integer division and float division?",
        back: "Integer division truncates the decimal — you lose the fractional part.\nFloat division keeps the decimal.\n\nint:   10 / 4  = 2   (not 2.5)\nfloat: 10.0f / 4.0f = 2.5f",
        tag: "Fundamentals"
      },
      {
        id: "s2l21-7",
        front: "Why do you need to write 12.0f instead of just 12 when doing float math?",
        back: "Without the .0f, C++ treats the number as an integer and performs integer math — losing the decimal. Adding .0f tells the compiler it's a float.\n\nfloat Result = 12.0f / 5.0f; // 2.4\nfloat Result = 12 / 5;       // 2 (integer math!)",
        tag: "Fundamentals"
      },
      {
        id: "s2l21-8",
        front: "What format specifier do you use to log the result of a float operation?",
        back: "Use %f for floats.\n\nfloat MyCalc = 12.0f / 5.0f;\nUE_LOG(LogTemp, Display, TEXT(\"Result: %f\"), MyCalc);\n// prints: Result: 2.400000",
        tag: "Logging"
      }
    ]
  },
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
  const sections = [...new Set(lessons.map((l) => l.section))];
  return sections.sort((a, b) => a - b);
};

// Helper: get lessons for a section
export const getLessonsForSection = (section) =>
  lessons.filter((l) => l.section === section);

// Helper: get all cards for an array of lesson ids
export const getCardsForLessons = (lessonIds) => {
  return lessons
    .filter((l) => lessonIds.includes(l.id))
    .flatMap((l) =>
      l.cards.map((c) => ({ ...c, lessonTitle: l.title, lesson: l.lesson })),
    );
};
