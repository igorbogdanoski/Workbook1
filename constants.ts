import { Worksheet } from './types';

// The data provided by the user, wrapped in a list to support multiple worksheets in the future.
export const WORKSHEETS: Worksheet[] = [
  {
    id: "ws-7-1",
    title: "Дропки и периодични децимали",
    section: "7.1 Fractions and recurring decimals",
    keywords: [
      {
        text: "unit fraction (единечна дропка)",
        relatedTaskIds: ["Q1"]
      },
      {
        text: "equivalent decimal (еквивалентен децимален број)",
        relatedTaskIds: ["Q1", "Q2"]
      },
      {
        text: "terminating decimal (конечен децимален број)",
        relatedTaskIds: ["Q1", "Q2", "Q4", "Q5"]
      },
      {
        text: "recurring decimal (периодичен децимален број)",
        relatedTaskIds: ["Q1", "Q2", "Q4", "Q5", "Q6", "Q10"]
      },
      {
        text: "improper fraction (неправилна дропка)",
        relatedTaskIds: ["Q13"]
      },
      {
        text: "mixed number (мешан број)",
        relatedTaskIds: ["Q14"]
      }
    ],
    tasks: [
      {
        "id": "Q1",
        "category": "Focus",
        "taskType": "matching",
        "instruction_mk": "Поврзи ја секоја дропка со соодветниот еквивалентен децимален број со влечење на децималните картички во соодветните полиња.",
        "prompt_en": "Match each unit fraction with the correct equivalent decimal by dragging the decimal cards into the corresponding slots.",
        "tip": "Запомни: Кога повеќе цифри се повторуваат во децимален број, ставаш точка само над првата и последната цифра што се повторува, на пр. $\\frac{1}{7} = 0.\\dot{1}4285\\dot{7}$",
        "math_groups": [
          {
            "title": "Дропки (Цел)",
            "items": ["\\frac{1}{2}", "\\frac{1}{3}", "\\frac{1}{4}", "\\frac{1}{5}", "\\frac{1}{6}", "\\frac{1}{7}", "\\frac{1}{8}", "\\frac{1}{9}", "\\frac{1}{10}"]
          },
          {
            "title": "Децимални броеви (Извор)",
            "items": ["0.1\\overline{6}", "0.25", "0.\\overline{3}", "0.5", "0.2", "0.\\overline{142857}", "0.125", "0.\\overline{1}", "0.1"]
          }
        ],
        "answers": {
          "\\frac{1}{2}": ["0.5"],
          "\\frac{1}{3}": ["0.\\overline{3}"],
          "\\frac{1}{4}": ["0.25"],
          "\\frac{1}{5}": ["0.2"],
          "\\frac{1}{6}": ["0.1\\overline{6}"],
          "\\frac{1}{7}": ["0.\\overline{142857}"],
          "\\frac{1}{8}": ["0.125"],
          "\\frac{1}{9}": ["0.\\overline{1}"],
          "\\frac{1}{10}": ["0.1"]
        }
      },
      {
        "id": "Q2",
        "category": "Focus",
        "taskType": "matching",
        "instruction_mk": "Поврзи ја секоја дропка со точниот децимален број со влечење. (Копирај ги решенијата во тетратка за да ги провериш дали се конечни или периодични).",
        "prompt_en": "Match each fraction with the correct decimal. Copy the workings into your notebook.",
        "tip": "Запомни: Можеби ќе треба да го продолжиш делењето на повеќе од две децимални места.",
        "math_groups": [
          {
            "title": "Дропки",
            "items": ["a) \\frac{2}{5}", "b) \\frac{2}{3}", "c) \\frac{3}{4}", "d) \\frac{3}{5}", "e) \\frac{5}{6}", "f) \\frac{2}{7}", "g) \\frac{3}{8}", "h) \\frac{4}{9}", "i) \\frac{7}{10}", "j) \\frac{2}{11}"]
          },
          {
            "title": "Децимални Броеви",
            "items": ["0.4", "0.\\overline{6}", "0.75", "0.6", "0.8\\overline{3}", "0.\\overline{285714}", "0.375", "0.\\overline{4}", "0.7", "0.\\overline{18}"]
          }
        ],
        "answers": {
          "a) \\frac{2}{5}": ["0.4"],
          "b) \\frac{2}{3}": ["0.\\overline{6}"],
          "c) \\frac{3}{4}": ["0.75"],
          "d) \\frac{3}{5}": ["0.6"],
          "e) \\frac{5}{6}": ["0.8\\overline{3}"],
          "f) \\frac{2}{7}": ["0.\\overline{285714}"],
          "g) \\frac{3}{8}": ["0.375"],
          "h) \\frac{4}{9}": ["0.\\overline{4}"],
          "i) \\frac{7}{10}": ["0.7"],
          "j) \\frac{2}{11}": ["0.\\overline{18}"]
        }
      },
      {
        "id": "Q3",
        "category": "Focus",
        "taskType": "sorting",
        "instruction_mk": "Користи ги твоите одговори од Прашање 2 за да ги подредиш овие дропки по големина, почнувајќи од најмалата (најлево). Влечи ги картичките за да го смениш редоследот.",
        "prompt_en": "Use your answers to Question 2 to write these fractions in order of size, starting with the smallest.",
        "math_groups": [
            {
                "title": "Подреди ги дропките",
                // Initial shuffled order
                "items": ["\\frac{2}{3}", "\\frac{2}{11}", "\\frac{3}{4}", "\\frac{2}{5}", "\\frac{7}{10}", "\\frac{3}{5}", "\\frac{2}{7}", "\\frac{3}{8}", "\\frac{4}{9}", "\\frac{5}{6}"]
            }
        ],
        "answers": {
            // Correct order based on values:
            // 2/11 (0.18), 2/7 (0.28), 3/8 (0.375), 2/5 (0.4), 4/9 (0.44), 3/5 (0.6), 2/3 (0.66), 7/10 (0.7), 3/4 (0.75), 5/6 (0.83)
            "main": [
                "\\frac{2}{11}", "\\frac{2}{7}", "\\frac{3}{8}", "\\frac{2}{5}", "\\frac{4}{9}", "\\frac{3}{5}", "\\frac{2}{3}", "\\frac{7}{10}", "\\frac{3}{4}", "\\frac{5}{6}"
            ]
        }
      },
      {
        "id": "Q4",
        "category": "Focus",
        "instruction_mk": "Овде има пет картички со дропки. (а) Објасни дали мислиш дека се конечни или периодични децимали. (б) Пресметај ја секоја дропка. (в) Подреди ги по големина.",
        "prompt_en": "Here are five fraction cards. Explain your prediction, convert them, and then order them.",
        "freeTextInstruction": "(а) Без пресметки, дали мислиш дека се конечни или периодични децимали? Објасни зошто.",
        "subtasks": [
            {"A": "\\frac{7}{8}"},
            {"B": "\\frac{4}{5}"},
            {"C": "\\frac{3}{10}"},
            {"D": "\\frac{2}{20}"},
            {"E": "\\frac{8}{25}"}
        ],
        "sortingItems": ["\\frac{7}{8}", "\\frac{4}{5}", "\\frac{3}{10}", "\\frac{2}{20}", "\\frac{8}{25}"],
        "answers": {
            // Answers for calculations
            "A": ["0.875"],
            "B": ["0.8"],
            "C": ["0.3"],
            "D": ["0.1"],
            "E": ["0.32"],
            // Correct order: D (0.1), C (0.3), E (0.32), B (0.8), A (0.875)
            "sorting": ["\\frac{2}{20}", "\\frac{3}{10}", "\\frac{8}{25}", "\\frac{4}{5}", "\\frac{7}{8}"]
        }
      },
      {
        "id": "Q5",
        "category": "Focus",
        "instruction_mk": "Овде има пет картички со дропки. (а) Објасни дали мислиш дека се конечни или периодични децимали. (б) Пресметај ја секоја дропка. (в) Подреди ги по големина.",
        "prompt_en": "Here are five fraction cards. Explain your prediction, convert them, and then order them.",
        "freeTextInstruction": "(а) Без пресметки, дали мислиш дека се конечни или периодични децимали? Објасни зошто.",
        "subtasks": [
            {"A": "\\frac{5}{9}"},
            {"B": "\\frac{1}{3}"},
            {"C": "\\frac{5}{12}"},
            {"D": "\\frac{4}{11}"},
            {"E": "\\frac{8}{15}"}
        ],
        "sortingItems": ["\\frac{5}{9}", "\\frac{1}{3}", "\\frac{5}{12}", "\\frac{4}{11}", "\\frac{8}{15}"],
        "answers": {
            // Answers for calculations
            "A": ["0.55", "0.555", "0.56", "0,55", "0,56"], // Recurring 0.555...
            "B": ["0.33", "0.333", "0,33"],
            "C": ["0.416", "0.417", "0.42", "0,416"], // 0.41666...
            "D": ["0.36", "0.3636", "0,36"], // 0.3636...
            "E": ["0.53", "0.533", "0,53"], // 0.5333...
            // Correct order: 
            // B (0.333), D (0.3636), C (0.416), E (0.533), A (0.555)
            "sorting": ["\\frac{1}{3}", "\\frac{4}{11}", "\\frac{5}{12}", "\\frac{8}{15}", "\\frac{5}{9}"]
        }
      },
      {
        "id": "Q6",
        "category": "Focus",
        "instruction_mk": "Прочитај што вели Марко. Дали тој е во право? Објасни го твојот одговор во полето подолу.",
        "prompt_en": "Read what Marcus says. Is Marcus correct? Explain your answer.",
        "speechBubble": {
            "speaker": "Марко",
            "gender": "male",
            "text": "Знам дека $\\frac{1}{2}$ и $\\frac{2}{5}$ се периодични децимални броеви. Ова значи дека секоја дропка со именител 6 е исто така периодичен децимален број."
        },
        "freeTextInstruction": "Твоето објаснување:"
      },
      {
        "id": "Q7",
        "category": "Practice",
        "instruction_mk": "Користи калкулатор за да ја претвориш секоја дропка во децимален број.",
        "prompt_en": "Use a calculator to convert each fraction to a decimal.",
        "subtasks": [
          {"a": "\\frac{8}{9}"},
          {"b": "\\frac{17}{20}"},
          {"c": "\\frac{4}{15}"},
          {"d": "\\frac{27}{40}"}
        ],
        "answers": {
            "a": ["0.88", "0.888", "0,88"],
            "b": ["0.85", "0,85"],
            "c": ["0.26", "0.266", "0,26"],
            "d": ["0.675", "0,675"]
        }
      },
      {
        "id": "Q8",
        "category": "Practice",
        "instruction_mk": "Користи калкулатор за да ги претвориш овие дропки во децимални броеви.",
        "prompt_en": "Use a calculator to convert these fractions to decimals.",
        "subtasks": [
          {"a": "\\frac{6}{7}"},
          {"b": "\\frac{11}{13}"},
          {"c": "\\frac{5}{21}"}
        ],
        "answers": {
            "a": ["0.857", "0,857"],
            "b": ["0.846", "0,846"],
            "c": ["0.238", "0,238"]
        }
      },
      {
        "id": "Q9",
        "category": "Practice",
        "styleVariant": "notebook",
        "instruction_mk": "Ова е дел од домашната задача на Су. (а) Користи калкулатор за да ја провериш домашната задача на Су. (б) Објасни ги сите грешки што таа ги направила и напиши ги точните одговори.",
        "prompt_en": "This is part of Su's homework. (a) Use a calculator to check Su's homework. (b) Explain any mistakes she has made and write the correct answers.",
        "math_elements_latex": [
          "i) \\;\\; \\frac{7}{24} = 0.291\\dot{6}",
          "ii) \\;\\; \\frac{8}{11} = 0.\\dot{7}\\dot{2}",
          "iii) \\;\\; \\frac{11}{18} = 0.1\\dot{6}",
          "iv) \\;\\; \\frac{5}{39} = 0.128205\\dot{1}"
        ]
      },
      {
        "id": "Q10",
        "category": "Practice",
        "instruction_mk": "Прочитај што вели Зара. Дали мислиш дека Зара е во право? Објасни го твојот одговор.",
        "prompt_en": "Read what Zara says. Do you think Zara is correct? Explain your answer.",
        "speechBubble": {
            "speaker": "Зара",
            "gender": "female",
            "text": "Пресметав на мојот калкулатор дека $7 \\div 9 = 0.7777777778$. Ова значи дека $\\frac{7}{9}$ не е периодичен децимален број бидејќи седумките не продолжуваат засекогаш: на крајот има осумка."
        },
        "freeTextInstruction": "Дали Зара е во право? Објасни."
      },
      {
        "id": "Q11_Challenge",
        "category": "Challenge",
        "inputType": "fraction",
        "instruction_mk": "Во еден клас има 27 ученици, 22 од нив се деснораки. Колкав дел од учениците се левораки? Внеси го одговорот како дропка во полињата.",
        "prompt_en": "There are 27 students in a class, 22 of them are right-handed. What fraction of the students are left-handed? Write your answer as a fraction.",
        "answers": {
            "main": ["5/27"]
        }
      },
      {
        "id": "Q12_Challenge",
        "category": "Challenge",
        "taskType": "sorting",
        "instruction_mk": "Напиши ги овие броеви по големина, почнувајќи од најмалиот. (Повлечи за да подредиш).",
        "prompt_en": "Write these numbers in order of size, starting with the smallest.",
        "math_groups": [
            {
                "title": "Подреди ги броевите",
                // Initial shuffled order or as presented in book
                "items": ["0.5\\overline{6}", "0.\\overline{6}", "\\frac{2}{7}", "58.2\\%", "\\frac{18}{55}", "0.5"]
            }
        ],
        "answers": {
            // Correct order:
            // 2/7 (0.285), 18/55 (0.327), 0.5 (0.5), 0.566... (0.566), 58.2% (0.582), 0.66... (0.66)
            "main": ["\\frac{2}{7}", "\\frac{18}{55}", "0.5", "0.5\\overline{6}", "58.2\\%", "0.\\overline{6}"]
        }
      },
      {
        "id": "Q13_Challenge",
        "category": "Challenge",
        "instruction_mk": "Без користење калкулатор, напиши ја секоја дропка како децимален број.",
        "prompt_en": "Without using a calculator, write each fraction as a decimal.",
        "subtasks": [
          {"a": "\\frac{5}{3}"},
          {"b": "\\frac{13}{4}"},
          {"c": "\\frac{29}{9}"},
          {"d": "\\frac{35}{8}"}
        ],
        "answers": {
            "a": ["1.66", "1.666", "1,6", "1,66"],
            "b": ["3.25", "3,25"],
            "c": ["3.22", "3.222", "3,2", "3,22"],
            "d": ["4.375", "4,375"]
        }
      },
      {
        "id": "Q14_Challenge",
        "category": "Challenge",
        "inputType": "mixed_number",
        "instruction_mk": "Напиши ја секоја должина на времето, во часови, како мешан број. (Внеси го целиот број, потоа дропката).",
        "prompt_en": "Write each length of time, in hours, as a mixed number.",
        "subtasks": [
          {"a": "3 \\text{ hours } 30 \\text{ minutes}"},
          {"b": "2 \\text{ hours } 45 \\text{ minutes}"},
          {"c": "1 \\text{ hour } 10 \\text{ minutes}"},
          {"d": "4 \\text{ hours } 20 \\text{ minutes}"},
          {"e": "9 \\text{ hours } 12 \\text{ minutes}"},
          {"f": "11 \\text{ hours } 25 \\text{ minutes}"}
        ],
        "math_elements_latex": [
          "3 \\frac{30}{60} \\text{ (за a)}, 2 \\frac{45}{60} \\text{ (за b)} \\dots \\text{итн.}"
        ],
        "answers": {
            // Internally handled as "Whole Num/Den" or similar, let's standardize on "Whole Num/Den" string format for easy checking
            "a": ["3 1/2", "3 30/60"],
            "b": ["2 3/4", "2 45/60"],
            "c": ["1 1/6", "1 10/60"],
            "d": ["4 1/3", "4 20/60"],
            "e": ["9 1/5", "9 12/60"],
            "f": ["11 5/12", "11 25/60"]
        }
      }
    ]
  }
];