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
        back: "A header file (.h) and a C++ source file (.cpp).\n\nExample: `MovingPlatform.h` and `MovingPlatform.cpp`",
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
        back: "Actor classes are prefixed with `A` — e.g. `AMovingPlatform`.\n\nThis signals the class is an Actor subclass. Each word is also capitalized (PascalCase) for readability.",
        tag: "Conventions",
      },
      {
        id: "s2l17-6",
        front: "What is BeginPlay and when does it get called?",
        back: "`BeginPlay` is a special function called once when the Actor is spawned into the game (or when the game starts if the Actor is already in the level). Code inside it runs at the very beginning.",
        tag: "Lifecycle",
      },
      {
        id: "s2l17-7",
        front: "What is Tick and when does it get called?",
        back: "`Tick` is called every single frame while the game is running. It receives a `DeltaTime` parameter — the time in seconds since the last frame — used for frame-rate independent movement.",
        tag: "Lifecycle",
      },
      {
        id: "s2l17-8",
        front: "What is the correct syntax for logging a message in UE5 C++?",
        back: '```\nUE_LOG(LogTemp, Display, TEXT("Your message here"));\n```\n\n• `LogTemp` — the log category\n• `Display` — the severity level\n• `TEXT()` — wraps the string for UE\'s character system',
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
        back: "Components add functionality to Actors. Examples:\n• `UStaticMeshComponent` — visible 3D mesh\n• `UBoxComponent` — collision\n• `UPointLightComponent` — emits light\n\nActors are containers; components give them abilities.",
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
        back: "• `int` — whole numbers (1, -10, 200)\n• `float` — decimal numbers (3.14f)\n• `double` — decimal numbers with greater precision\n• `char` — a single character ('A')\n• `bool` — true or false\n\nPlus `FString`, which is UE5-specific for storing text.",
        tag: "Fundamentals",
      },
      {
        id: "s2l19-3",
        front: "What is the difference between float and double?",
        back: "Both store floating point (decimal) numbers. A `double` can store larger numbers with greater accuracy. In UE5 you'll mostly use `float`, and only reach for `double` when you need extra precision.",
        tag: "Fundamentals",
      },
      {
        id: "s2l19-4",
        front: "How do you declare and assign a variable in C++?",
        back: "```\nDataType VariableName = InitialValue;\n\nint MyInt = 100;\nfloat MyFloat = 12.34f;\nbool MyBool = true;\nchar MyChar = 'A';\nFString MyString = \"Hello\";\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l19-5",
        front: "What does the assignment operator (=) do in C++?",
        back: "It assigns the value on the RIGHT side into the variable on the LEFT side. It's not checking equality — it's storing a value.\n\n```\nMyInt = 50; // MyInt now holds 50\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l19-6",
        front: "What is an 'initial value' of a variable?",
        back: "The value assigned to a variable on the same line it is declared. You can reassign a variable later, but the first value it gets is called its initial value.\n\n```\nint MyInt = 100; // 100 is the initial value\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l19-7",
        front: "Why do you put an 'f' at the end of a float value?",
        back: "To tell the compiler it's a float, not a double. Without the `f`, C++ treats decimal numbers as double by default.\n\n```\nfloat MyFloat = 12.34f;  // float\ndouble MyDouble = 12.34; // double\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l19-8",
        front:
          "What is the difference between single quotes and double quotes in C++?",
        back: "Single quotes `' '` = a single character (`char` type)\nDouble quotes `\" \"` = a string of characters (`FString`)\n\n```\nchar MyChar = 'A';        // single character\nFString MyStr = \"Hello\"; // string of text\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l19-9",
        front: "What values can a bool variable hold?",
        back: "Only `true` or `false`. Nothing else — assigning a number like 100 to a bool will cause a compile error due to invalid type conversion.",
        tag: "Fundamentals",
      },
      {
        id: "s2l19-10",
        front: "What is FString and how is it different from basic C++ types?",
        back: "`FString` is UE5's string type for storing text. It's not a basic C++ type — it's provided by Unreal Engine. Use double quotes to assign it.\n\n```\nFString MyName = \"Kaan\";\n```",
        tag: "Conventions",
      },
      {
        id: "s2l19-11",
        front:
          "What are the three common naming conventions and which does UE5 prefer?",
        back: "• `PascalCase` — first letter of every word capitalized: `MyVariable`\n• `camelCase` — first word lowercase, rest capitalized: `myVariable`\n• `snake_case` — all lowercase with underscores: `my_variable`\n\nUE5 uses PascalCase. Pick one and stick to it.",
        tag: "Conventions",
      },
      {
        id: "s2l19-12",
        front: "Can a variable be reassigned after its initial value is set?",
        back: "Yes. You can assign a new value to a variable as many times as you want after declaration.\n\n```\nint MyInt = 100;\nMyInt = 50; // MyInt is now 50\n```",
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
        back: 'A format specifier is a placeholder inside a log message that gets replaced by a variable\'s value at runtime. It starts with a `%` sign.\n\n```\nUE_LOG(LogTemp, Display, TEXT("Apples: %d"), NumberOfApples);\n```',
        tag: "Logging",
      },
      {
        id: "s2l20-2",
        front:
          "What are the three most common UE_LOG format specifiers and what type does each handle?",
        back: "`%d` — integer (`int`)\n`%f` — floating point (`float`)\n`%s` — string (`FString`)\n\nThere are others (e.g. `%c` for char) but these three are used most often.",
        tag: "Logging",
      },
      {
        id: "s2l20-3",
        front: "How do you log an integer variable in UE5?",
        back: '```\nint NumberOfApples = 10;\nUE_LOG(LogTemp, Display, TEXT("Apples: %d"), NumberOfApples);\n```\n\nThe `%d` is replaced by the value of `NumberOfApples` at runtime.',
        tag: "Logging",
      },
      {
        id: "s2l20-4",
        front: "How do you log a float variable in UE5?",
        back: '```\nfloat MyHeight = 182.5f;\nUE_LOG(LogTemp, Display, TEXT("Height: %f"), MyHeight);\n```\n\nUse `%f` for floats. Note: this prints extra trailing zeros by default.',
        tag: "Logging",
      },
      {
        id: "s2l20-5",
        front:
          "How do you log an FString variable in UE5, and what is special about it?",
        back: '```\nFString MyName = "Kaan";\nUE_LOG(LogTemp, Display, TEXT("Name: %s"), *MyName);\n```\n\nYou must add an asterisk `*` before the FString. This converts it to the format UE_LOG requires. Without it, it won\'t compile.',
        tag: "Logging",
      },
      {
        id: "s2l20-6",
        front: "What does the asterisk * do before an FString in UE_LOG?",
        back: 'It dereferences the `FString` into a raw character pointer (`TCHAR*`) that UE_LOG\'s `%s` format specifier requires.\n\n```\nUE_LOG(LogTemp, Display, TEXT("%s"), *MyName);\n```',
        tag: "Logging",
      },
      {
        id: "s2l20-7",
        front: "How do you log multiple variables in a single UE_LOG message?",
        back: 'Add multiple format specifiers and provide matching variables after — order matters.\n\n```\nUE_LOG(LogTemp, Display, TEXT("%d and %d"),\n    NumberOfApples, NumberOfOranges);\n```\n\nThe first `%d` maps to the first variable, second to the second.',
        tag: "Logging",
      },
      {
        id: "s2l20-8",
        front:
          "What are the three log levels in UE_LOG and what color does each display?",
        back: '`Display` — standard white message\n`Warning` — shown in yellow\n`Error` — shown in red\n\n```\nUE_LOG(LogTemp, Warning, TEXT("Something\'s wrong!"));\n```',
        tag: "Logging",
      },
      {
        id: "s2l20-9",
        front: "What are 'arguments' in a function call?",
        back: "Arguments are the values you pass into a function so it can operate. They go inside the parentheses, separated by commas.\n\nIn `UE_LOG` the arguments are: log category, log level, and the text message (plus any variables).",
        tag: "Fundamentals",
      },
      {
        id: "s2l20-10",
        front: "Is UE_LOG actually a function?",
        back: "No — `UE_LOG` is a macro, not a function. `TEXT()` is also a macro. However they look and behave like functions at this stage, so they can be treated the same way conceptually for now.",
        tag: "Logging",
      },
    ],
  },

  {
    id: "s2-l21",
    section: 2,
    lesson: 21,
    title: "Number Operations",
    description:
      "Arithmetic operators, expressions, integer vs float math, negative numbers",
    cards: [
      {
        id: "s2l21-1",
        front: "What are the four basic arithmetic operators in C++?",
        back: "`+` addition\n`-` subtraction\n`*` multiplication\n`/` division\n\n```\nint Result = 10 + 5;  // 15\nint Result = 10 - 5;  // 5\nint Result = 10 * 5;  // 50\nint Result = 10 / 5;  // 2\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l21-2",
        front: "What is an expression in C++?",
        back: "An operator and its operands that evaluate to a single value.\n\n```\nint MyValue = 10 / 5; // expression evaluates to 2\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l21-3",
        front: "Can you use variables inside arithmetic expressions?",
        back: "Yes. Variables can be used with operators just like raw numbers, and you can mix both.\n\n```\nint MyValue = -5;\nint MyOther = -8;\nint Result = MyValue * MyOther; // 40\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l21-4",
        front: "How do you make a number negative in C++?",
        back: "Place a minus sign directly in front of it.\n\n```\nint MyValue = -5;\nfloat MyFloat = -3.14f;\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l21-5",
        front: "What happens when you multiply two negative integers?",
        back: "The result is positive — same rule as in math.\n\n```\nint A = -5;\nint B = -8;\nint Result = A * B; // 40 (positive)\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l21-6",
        front:
          "What is the critical difference between integer division and float division?",
        back: "Integer division truncates the decimal — you lose the fractional part. Float division keeps it.\n\n```\nint:   10 / 4      = 2    // not 2.5!\nfloat: 10.0f / 4.0f = 2.5f\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l21-7",
        front:
          "Why do you need to write 12.0f instead of just 12 when doing float math?",
        back: "Without the `.0f`, C++ treats the number as an integer and performs integer math — losing the decimal.\n\n```\nfloat Result = 12.0f / 5.0f; // 2.4\nfloat Result = 12 / 5;       // 2 (integer math!)\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l21-8",
        front:
          "What format specifier do you use to log the result of a float operation?",
        back: 'Use `%f` for floats.\n\n```\nfloat MyCalc = 12.0f / 5.0f;\nUE_LOG(LogTemp, Display, TEXT("Result: %f"), MyCalc);\n// prints: Result: 2.400000\n```',
        tag: "Logging",
      },
    ],
  },

  {
    id: "s2-l22",
    section: 2,
    lesson: 22,
    title: "Operator Precedence",
    description:
      "Order of operations, multiplication/division before addition/subtraction, using parentheses",
    cards: [
      {
        id: "s2l22-1",
        front: "What is operator precedence?",
        back: "The rules that determine which operation in an expression is evaluated first when there are multiple operators.\n\n```\n12.0f / 5.0f + 10.0f - 3.5f\n// Division first, then addition, then subtraction\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l22-2",
        front:
          "Which operators have higher precedence — multiplication/division or addition/subtraction?",
        back: "`*` and `/` have higher precedence than `+` and `-`.\n\nThis matches real-life math rules — PEMDAS/BODMAS applies in C++.",
        tag: "Fundamentals",
      },
      {
        id: "s2l22-3",
        front:
          "When two operators have equal precedence, in what order are they evaluated?",
        back: "Left to right. The leftmost operation runs first.\n\n```\n10.0f / 5.0f * 3.0f\n// Division first (left), then multiplication\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l22-4",
        front: "How do parentheses affect operator precedence?",
        back: "Parentheses override all other rules. Whatever is inside runs first.\n\n```\n8.0f + (2.5f - 3.0f) * 10.0f\n// subtraction in () first, then *, then +\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l22-5",
        front:
          "What is the evaluation order of this expression?\n\n8.0f + 2.5f - 3.0f * 10.0f",
        back: "```\n1. 3.0f * 10.0f = 30.0f   // multiplication first\n2. 8.0f + 2.5f  = 10.5f   // left to right\n3. 10.5f - 30.0f = -19.5f\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l22-6",
        front:
          "Why use parentheses even when default precedence gives the correct result?",
        back: "Clarity. Parentheses make your intent explicit and easier for others (or future you) to read — removing ambiguity even if the math works out the same way.",
        tag: "Fundamentals",
      },
    ],
  },

  {
    id: "s2-l23",
    section: 2,
    lesson: 23,
    title: "Member Variables",
    description:
      "Local vs member variables, declaring in header, UPROPERTY, EditAnywhere vs VisibleAnywhere",
    cards: [
      {
        id: "s2l23-1",
        front: "What is a local variable and what are its two key limitations?",
        back: "A local variable is declared inside a function and only exists within that function.\n\nLimitations:\n1. Only accessible inside the function it was created in\n2. Gets deleted when the function ends",
        tag: "Fundamentals",
      },
      {
        id: "s2l23-2",
        front:
          "What is a member variable and how does it differ from a local variable?",
        back: "A member variable belongs to a class, declared in the header file (.h).\n\n• Accessible in ALL functions of the class\n• Persists for the lifetime of the object — not deleted at end of a function",
        tag: "Fundamentals",
      },
      {
        id: "s2l23-3",
        front: "Where do you declare a member variable in UE5 C++?",
        back: "Inside the class declaration in the header file (.h), not inside any function.\n\n```\n// MovingPlatform.h\nUPROPERTY(EditAnywhere)\nfloat MemberFloat = 10.f;\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l23-4",
        front: "How do you give a member variable a default value in UE5?",
        back: "Assign it directly in the header file at the point of declaration.\n\n```\nfloat MemberFloat = 10.f;\n```\n\nThis value is used at game start unless overridden in the editor.",
        tag: "Fundamentals",
      },
      {
        id: "s2l23-5",
        front: "What does UPROPERTY() do for a member variable?",
        back: "`UPROPERTY()` registers the variable with UE5's reflection system, making it visible to the engine, editor, and Blueprint system.\n\nWithout it, the editor has no knowledge the variable exists.",
        tag: "Architecture",
      },
      {
        id: "s2l23-6",
        front:
          "What is the difference between EditAnywhere and VisibleAnywhere in UPROPERTY?",
        back: "```\nUPROPERTY(EditAnywhere)   // visible AND editable in Details panel\nUPROPERTY(VisibleAnywhere) // visible but READ-ONLY in Details panel\n```",
        tag: "Architecture",
      },
      {
        id: "s2l23-7",
        front: "Do you put a semicolon after UPROPERTY()?",
        back: "No. `UPROPERTY()` and the variable below it are one statement. Only the variable line gets the semicolon.\n\n```\nUPROPERTY(EditAnywhere)   // no semicolon\nfloat MemberFloat = 10.f; // semicolon here\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l23-8",
        front:
          "If you change a member variable's value in the Details panel, what happens to the default?",
        back: "The Details panel value overrides the code default at runtime.\n\nExample: default is `10.f` in code, but if you set it to `20` in the editor, it will be `20` when the game runs.",
        tag: "Architecture",
      },
      {
        id: "s2l23-9",
        front:
          "When should you recompile from Visual Studio instead of using Live Coding?",
        back: "Whenever you make changes to a header file (.h). Live Coding for header changes can produce unpredictable results and editor values may be lost when you reopen the project.",
        tag: "Editor",
      },
      {
        id: "s2l23-10",
        front:
          "Why are member variables better than local variables for game data like health or speed?",
        back: "Game data needs to persist across multiple function calls and frames. A local variable in `BeginPlay` is gone the moment it finishes. A member variable survives for the lifetime of the Actor and is accessible from any function including `Tick`.",
        tag: "Architecture",
      },
    ],
  },

  {
    id: "s2-l24",
    section: 2,
    lesson: 24,
    title: "Structs",
    description:
      "What structs are, FVector, dot operator, constructors, member vs local struct variables",
    cards: [
      {
        id: "s2l24-1",
        front: "What is a struct in C++?",
        back: "A struct is a group of variables packaged together under one name. It acts like a custom data type that bundles related data.\n\nExample: `FVector` bundles three floats — X, Y, and Z — into one named type.",
        tag: "Fundamentals",
      },
      {
        id: "s2l24-2",
        front: "What is FVector and what does it store?",
        back: "`FVector` is a struct defined by Unreal Engine that stores three floats: `X`, `Y`, and `Z`. It represents 3D positions, directions, and scales.\n\nActor location, rotation, and scale are all FVectors under the hood.",
        tag: "Architecture",
      },
      {
        id: "s2l24-3",
        front: "How do you create an FVector variable and assign values to it?",
        back: "Use the FVector constructor with X, Y, Z values in parentheses.\n\n```\nFVector TestVector = FVector(11.2f, 3.4f, 7.6f);\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l24-4",
        front: "What is the dot operator and how is it used with structs?",
        back: "The dot operator `.` lets you access or modify individual variables inside a struct.\n\n```\nFVector TestVector = FVector(11.2f, 3.4f, 7.6f);\nTestVector.X = 10.4f;      // reassign X\nfloat Z = TestVector.Z;    // read Z\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l24-5",
        front: "What is a constructor?",
        back: "A special function that creates and initializes an object or struct. It has the same name as the type.\n\n```\nFVector(11.2f, 3.4f, 7.6f)\n// creates an FVector with X=11.2, Y=3.4, Z=7.6\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l24-6",
        front:
          "How do you declare an FVector as a UPROPERTY member variable with a default value?",
        back: "```\n// In the header file (.h)\nUPROPERTY(EditAnywhere)\nFVector MyVector = FVector(11.2f, 3.4f, 7.6f);\n```\n\nThis registers it with UE5 and shows it in the Details panel.",
        tag: "Architecture",
      },
      {
        id: "s2l24-7",
        front:
          "Why are structs like FVector important in UE5 game development?",
        back: "Because location, rotation, and scale of every Actor are FVectors. To move, rotate, or scale anything in the world from C++, you must work with FVector structs.",
        tag: "Architecture",
      },
      {
        id: "s2l24-8",
        front:
          "Can you reassign individual properties of a struct after it's been created?",
        back: "Yes. Use the dot operator at any time.\n\n```\nFVector TestVector = FVector(11.2f, 3.4f, 7.6f);\nTestVector.Z = 2.5f; // Z is now 2.5, X and Y unchanged\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l24-9",
        front:
          "What is the difference between a struct declaration and a struct variable?",
        back: "A declaration defines what the struct contains (the blueprint).\nA variable is an actual instance of that struct.\n\n`FVector` — the declaration (defined by UE5)\n`FVector MyVector = FVector(...)` — a real usable instance",
        tag: "Fundamentals",
      },
    ],
  },

  {
    id: "s2-l25",
    section: 2,
    lesson: 25,
    title: "SetActorLocation",
    description:
      "Moving actors with SetActorLocation, root components, using FVector member variables from the editor",
    cards: [
      {
        id: "s2l25-1",
        front:
          "What function do you call to move an Actor to a specific position in C++?",
        back: "```\nSetActorLocation(FVector NewLocation);\n\n// Example:\nFVector Target = FVector(1110.f, -610.f, 440.f);\nSetActorLocation(Target);\n```\n\nThis instantly moves the Actor to the given world position.",
        tag: "Architecture",
      },
      {
        id: "s2l25-2",
        front: "What argument does SetActorLocation require?",
        back: "An `FVector` representing the new world position (X, Y, Z).\n\n```\nSetActorLocation(FVector(100.f, 200.f, 300.f));\n```",
        tag: "Architecture",
      },
      {
        id: "s2l25-3",
        front:
          "Why does an Actor need a component before you can set its location?",
        back: "An Actor's position is anchored by its Root Component. Without any component, there is no Root Component and therefore no transform — `SetActorLocation` has nothing to move.",
        tag: "Architecture",
      },
      {
        id: "s2l25-4",
        front: "What is the Root Component?",
        back: "The first component added to an Actor becomes its Root Component. It defines the Actor's position, rotation, and scale in the world. All other components are positioned relative to it.",
        tag: "Architecture",
      },
      {
        id: "s2l25-5",
        front:
          "If SetActorLocation is called in BeginPlay, when does the Actor move?",
        back: "Instantly at the start of the game. `BeginPlay` runs once when the game begins, so the Actor is teleported to the new location the moment play starts.",
        tag: "Lifecycle",
      },
      {
        id: "s2l25-6",
        front:
          "What is the advantage of using a UPROPERTY FVector with SetActorLocation instead of a hardcoded FVector?",
        back: "You can set the destination in the editor without touching code.\n\n```\nUPROPERTY(EditAnywhere)\nFVector MyVector = FVector(0,0,0);\n\n// In BeginPlay:\nSetActorLocation(MyVector);\n```",
        tag: "Architecture",
      },
      {
        id: "s2l25-7",
        front:
          "How can you quickly get an Actor's exact world location from the UE5 editor?",
        back: "Position the Actor in the viewport, then right-click the Location field in the Details panel and select Copy. Paste those XYZ values directly into your FVector constructor.",
        tag: "Editor",
      },
      {
        id: "s2l25-8",
        front:
          "Can you paste a copied location directly into an FVector UPROPERTY in the Details panel?",
        back: "Yes. Right-click the FVector UPROPERTY field in the Details panel and select Paste. This transfers the XYZ values directly into the member variable without touching code.",
        tag: "Editor",
      },
    ],
  },

  {
    id: "s2-l26",
    section: 2,
    lesson: 26,
    title: "The Tick Function",
    description:
      "Game loop, frames, FPS, Tick vs BeginPlay, moving actors over time",
    cards: [
      {
        id: "s2l26-1",
        front: "What is the game loop?",
        back: "A continuously repeating cycle that keeps the game running:\n\n1. Get input (keyboard, mouse, controller)\n2. Update game state (variables, logic)\n3. Render graphics to screen\n\nThis repeats for the entire duration of the game.",
        tag: "Architecture",
      },
      {
        id: "s2l26-2",
        front: "What is a frame in the context of a game loop?",
        back: "One complete cycle of the game loop — input, update, render. Think of it like one page in a flipbook. Many frames per second create the illusion of smooth motion.",
        tag: "Architecture",
      },
      {
        id: "s2l26-3",
        front: "What is FPS and what determines it?",
        back: "FPS = Frames Per Second — how many times the game loop completes in one second. Determined by your CPU and GPU speed. Common targets: 30, 60, or higher.",
        tag: "Architecture",
      },
      {
        id: "s2l26-4",
        front: "What is the Tick function and when is it called?",
        back: "`Tick` is called every single frame while the game is running.\n\nAt 60 FPS → Tick is called 60 times per second, continuously until the Actor is destroyed or the game ends.",
        tag: "Lifecycle",
      },
      {
        id: "s2l26-5",
        front: "What is the key difference between BeginPlay and Tick?",
        back: "`BeginPlay` — called ONCE when the Actor enters the game\n`Tick` — called EVERY FRAME for the lifetime of the Actor\n\nUse `BeginPlay` for one-time setup. Use `Tick` for anything that needs to happen continuously.",
        tag: "Lifecycle",
      },
      {
        id: "s2l26-6",
        front: "Why is Tick the right place to make things move continuously?",
        back: "Because Tick runs every frame, any changes made inside it are applied repeatedly. Incrementing a position value in Tick causes smooth continuous movement.",
        tag: "Lifecycle",
      },
      {
        id: "s2l26-7",
        front: "How do you move an Actor upward a little each frame in Tick?",
        back: "```\nvoid AMovingPlatform::Tick(float DeltaTime)\n{\n    Super::Tick(DeltaTime);\n    MyVector.Z = MyVector.Z + 1.f;\n    SetActorLocation(MyVector);\n}\n```",
        tag: "Architecture",
      },
      {
        id: "s2l26-8",
        front:
          "Why isn't calling SetActorLocation with the same vector every frame enough to make something move?",
        back: "Because you'd be setting the Actor to the exact same position every frame — nothing changes. You must modify the vector's values each frame before calling `SetActorLocation`.",
        tag: "Architecture",
      },
      {
        id: "s2l26-9",
        front:
          "What does this line do inside Tick?\n\nMyVector.Z = MyVector.Z + 1.f;",
        back: "It reads the current Z value, adds 1 to it, and stores the result back. Each frame Z increases by 1 — causing the Actor to move upward steadily over time.",
        tag: "Fundamentals",
      },
    ],
  },

  {
    id: "s2-l27",
    section: 2,
    lesson: 27,
    title: "Comments",
    description:
      "Single-line and multi-line comments, why comments are used, disabling code",
    cards: [
      {
        id: "s2l27-1",
        front: "What is a comment in C++?",
        back: "A piece of code that is completely ignored by the compiler. It exists only for humans to read — it has zero effect on how the program runs.",
        tag: "Fundamentals",
      },
      {
        id: "s2l27-2",
        front: "How do you write a single-line comment in C++?",
        back: "Use two forward slashes `//`. Everything after them on that line is ignored.\n\n```\n// This is a comment\nint Health = 100; // this is also a comment\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l27-3",
        front: "How do you write a multi-line comment in C++?",
        back: "Use `/*` to open and `*/` to close. Everything between them is ignored.\n\n```\n/*\n  This is a\n  multi-line comment\n*/\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l27-4",
        front: "What are the two main uses of comments in C++?",
        back: "1. Documentation — explain what your code does so you can understand it later\n2. Disabling code — temporarily comment out a line to test without deleting it",
        tag: "Fundamentals",
      },
      {
        id: "s2l27-5",
        front:
          "Why is commenting your code especially important as a beginner?",
        back: "Because you will forget what your code does. Leaving notes in plain English next to complex logic means you can re-read your own code days later and still understand it.",
        tag: "Fundamentals",
      },
      {
        id: "s2l27-6",
        front:
          "How can you use comments to temporarily disable a line of code?",
        back: "Add `//` before the line. The compiler ignores it, so it won't run — but it's still there to uncomment later.\n\n```\n// SetActorLocation(MyVector); // disabled for testing\n```",
        tag: "Fundamentals",
      },
    ],
  },

  {
    id: "s2-l28",
    section: 2,
    lesson: 28,
    title: "GetActorLocation",
    description:
      "GetActorLocation, return values, get vs set functions, moving from current position",
    cards: [
      {
        id: "s2l28-1",
        front: "What does GetActorLocation() do?",
        back: "It returns the current world position of an Actor as an `FVector`.\n\n```\nFVector CurrentLocation = GetActorLocation();\n```\n\nUnlike `SetActorLocation`, it takes no arguments — it just reads and returns the current position.",
        tag: "Architecture",
      },
      {
        id: "s2l28-2",
        front: "What is a return value?",
        back: "A value that a function sends back to the caller when it finishes. You capture it by assigning the function call to a variable.\n\n```\nFVector Location = GetActorLocation();\n// Location now holds the returned position\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l28-3",
        front:
          "What is the naming convention difference between 'Get' and 'Set' functions in UE5?",
        back: "Get functions return a value — they read data.\nSet functions accept a value — they write data.\n\n```\nGetActorLocation()         // returns location\nSetActorLocation(FVector)  // sets location\n```\n\nThis pattern is used throughout the entire UE5 API.",
        tag: "Conventions",
      },
      {
        id: "s2l28-4",
        front:
          "Why is moving from GetActorLocation() better than a hardcoded FVector in Tick?",
        back: "Because it makes the platform move from wherever it currently sits in the level. You place it where you want and it moves from there — no hardcoded position needed.",
        tag: "Architecture",
      },
      {
        id: "s2l28-5",
        front:
          "What does this Tick code do?\n\nFVector CurrentLocation = GetActorLocation();\nCurrentLocation.X = CurrentLocation.X + 1.f;\nSetActorLocation(CurrentLocation);",
        back: "Each frame:\n1. Gets the Actor's current world position\n2. Increases X by 1\n3. Sets the Actor to the new position\n\nResult: the Actor moves continuously along the X axis from wherever it was placed.",
        tag: "Architecture",
      },
      {
        id: "s2l28-6",
        front: "Do Get functions typically take arguments? Why or why not?",
        back: "Usually not. A Get function's purpose is to return data that already exists — it doesn't need input.\n\n```\nGetActorLocation() // no arguments needed\n```",
        tag: "Fundamentals",
      },
    ],
  },
  {
    id: "s2-l29",
    section: 2,
    lesson: 29,
    title: "Delta Time",
    description:
      "Frame rate independence, DeltaTime variable, why speed differs across computers",
    cards: [
      {
        id: "s2l29-1",
        front:
          "What is the 'speed problem' when moving things inside Tick without DeltaTime?",
        back: "A fast computer running at 100 FPS moves the platform 100 units/sec.\nA slow computer at 30 FPS only moves it 30 units/sec.\n\nThe game behaves differently on different machines — which is a serious bug.",
        tag: "Architecture",
      },
      {
        id: "s2l29-2",
        front: "What is DeltaTime?",
        back: "`DeltaTime` is the time in seconds it took the CPU to compute the last frame.\n\nSlow computer (10 FPS) → DeltaTime = 0.1\nFast computer (100 FPS) → DeltaTime = 0.01\n\nThe slower the machine, the larger the DeltaTime.",
        tag: "Architecture",
      },
      {
        id: "s2l29-3",
        front: "How do you access DeltaTime in C++?",
        back: "It's passed as an argument to the `Tick` function automatically by UE5. You don't calculate it yourself — just use it.\n\n```\nvoid AMovingPlatform::Tick(float DeltaTime)\n{\n    // DeltaTime is ready to use here\n}\n```",
        tag: "Lifecycle",
      },
      {
        id: "s2l29-4",
        front:
          "How do you make movement frame rate independent using DeltaTime?",
        back: "Multiply your movement value by `DeltaTime`.\n\n```\n// Frame rate DEPENDENT (bad)\nCurrentLocation.X = CurrentLocation.X + 1.f;\n\n// Frame rate INDEPENDENT (good)\nCurrentLocation.X = CurrentLocation.X + (100.f * DeltaTime);\n```",
        tag: "Architecture",
      },
      {
        id: "s2l29-5",
        front:
          "Why does multiplying by DeltaTime make speed consistent across machines?",
        back: "Slow machine: DeltaTime is large → compensates for fewer frames\nFast machine: DeltaTime is small → compensates for more frames\n\nExample at 100 units/sec:\n10 FPS:  100 × 0.1  = 10 units per frame × 10 frames  = 100 units/sec\n100 FPS: 100 × 0.01 = 1 unit per frame  × 100 frames = 100 units/sec",
        tag: "Architecture",
      },
      {
        id: "s2l29-6",
        front:
          "After introducing DeltaTime, how should you think about the movement value?",
        back: "Think in units per second, not units per frame.\n\n```\nCurrentLocation.X += 100.f * DeltaTime;\n// means: move 100 cm every second\n```\n\nThis makes tuning movement intuitive and machine-independent.",
        tag: "Architecture",
      },
      {
        id: "s2l29-7",
        front:
          "Why do parentheses help when using DeltaTime in a movement expression?",
        back: "They make the intent clear — showing that the speed value and DeltaTime are multiplied together first before being added to the position.\n\n```\nCurrentLocation.X = CurrentLocation.X + (100.f * DeltaTime);\n```",
        tag: "Fundamentals",
      },
      {
        id: "s2l29-8",
        front:
          "Why might you turn the movement speed value into a UPROPERTY member variable?",
        back: "So designers can tune the speed directly in the editor without touching or recompiling code.\n\n```\nUPROPERTY(EditAnywhere)\nfloat Speed = 100.f;\n\n// In Tick:\nCurrentLocation.X += Speed * DeltaTime;\n```",
        tag: "Architecture",
      },
    ],
  },

  // Add future lessons here — same structure as above.
];

export const getSections = () => {
  const sections = [...new Set(lessons.map((l) => l.section))];
  return sections.sort((a, b) => a - b);
};

export const getLessonsForSection = (section) =>
  lessons.filter((l) => l.section === section);

export const getCardsForLessons = (lessonIds) => {
  return lessons
    .filter((l) => lessonIds.includes(l.id))
    .flatMap((l) =>
      l.cards.map((c) => ({ ...c, lessonTitle: l.title, lesson: l.lesson })),
    );
};
