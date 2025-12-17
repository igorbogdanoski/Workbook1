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
        "instruction_mk": "Поврзи ја секоја дропка со соодветниот еквивалентен децимален број. Напиши дали дропката е конечен децимален број (terminating decimal) или периодичен децимален број (recurring decimal).",
        "prompt_en": "Match each unit fraction with the correct equivalent decimal. Write if the fraction is a terminating decimal or a recurring decimal.",
        "tip": "Запомни: Кога повеќе цифри се повторуваат во децимален број, ставаш точка само над првата и последната цифра што се повторува, на пр. $\\frac{1}{7} = 0.\\dot{1}4285\\dot{7}$",
        "math_groups": [
          {
            "title": "Дропки",
            "items": ["\\frac{1}{2}", "\\frac{1}{3}", "\\frac{1}{4}", "\\frac{1}{5}", "\\frac{1}{6}", "\\frac{1}{7}", "\\frac{1}{8}", "\\frac{1}{9}", "\\frac{1}{10}"]
          },
          {
            "title": "Децимални броеви",
            "items": ["0.1\\overline{6}", "0.25", "0.\\overline{3}", "0.5", "0.2", "0.\\overline{142857}", "0.125", "0.\\overline{1}", "0.1"]
          }
        ],
        "answers": {
          "main": ["checking..."] // Placeholder, this is a matching task requiring a different UI interaction later
        }
      },
      {
        "id": "Q2",
        "category": "Focus",
        "instruction_mk": "Копирај и комплетирај ги операциите за да ја претвориш секоја дропка во децимален број. Напиши само децимален број (на пр. 0.4).",
        "prompt_en": "Copy and complete the workings to convert each fraction into a decimal. Write if the fraction is a terminating or recurring decimal.",
        "tip": "Запомни: Можеби ќе треба да го продолжиш делењето на повеќе од две децимални места.",
        "subtasks": [
          {"a": "\\frac{2}{5} = 0.4"},
          {"b": "\\frac{2}{3} = 0.\\overline{6}"},
          {"c": "\\frac{3}{4}"},
          {"d": "\\frac{3}{5}"},
          {"e": "\\frac{5}{6}"},
          {"f": "\\frac{2}{7}"},
          {"g": "\\frac{3}{8}"},
          {"h": "\\frac{4}{9}"},
          {"i": "\\frac{7}{10}"},
          {"j": "\\frac{2}{11}"}
        ],
        "math_elements_latex": [
          "\\frac{2}{5}, \\frac{2}{3}, \\frac{3}{4}, \\frac{3}{5}, \\frac{5}{6}, \\frac{2}{7}, \\frac{3}{8}, \\frac{4}{9}, \\frac{7}{10}, \\frac{2}{11}"
        ],
        "answers": {
          "a": ["0.4", "0,4"],
          "b": ["0.6", "0.66", "0.666", "0,6", "0,66"],
          "c": ["0.75", "0,75"],
          "d": ["0.6", "0,6"],
          "e": ["0.83", "0.833", "0,83", "0,833"],
          "f": ["0.285", "0.28", "0,285"],
          "g": ["0.375", "0,375"],
          "h": ["0.44", "0.444", "0,44"],
          "i": ["0.7", "0,7"],
          "j": ["0.18", "0.1818", "0,18"]
        }
      },
      {
        "id": "Q3",
        "category": "Focus",
        "instruction_mk": "Користи ги твоите одговори од Прашање 2 за да ги напишеш овие дропки по големина, почнувајќи од најмалата.",
        "prompt_en": "Use your answers to Question 2 to write these fractions in order of size, starting with the smallest.",
        "math_elements_latex": [
          "\\text{Задачите бараат редење на дропките од Q2: } \\frac{2}{5}, \\frac{2}{3}, \\frac{3}{4}, \\frac{3}{5}, \\frac{5}{6}, \\frac{2}{7}, \\frac{3}{8}, \\frac{4}{9}, \\frac{7}{10}, \\frac{2}{11}"
        ]
      },
      {
        "id": "Q4",
        "category": "Focus",
        "instruction_mk": "Овде има пет картички со дропки. (а) Без пресметки, дали мислиш дека се конечни или периодични децимали? Објасни. (б) Користи пишан метод за да ја претвориш секоја дропка во децимален број. (в) Напиши ги дропките по големина.",
        "prompt_en": "Here are five fraction cards. (a) Without doing any calculations, do you think these fractions are terminating or recurring decimals? Explain why. (b) Use a written method to convert each fraction to a decimal. (c) Write the fractions in order of size, starting with the smallest.",
        "math_elements_latex": [
          "A: \\frac{7}{8}, B: \\frac{4}{5}, C: \\frac{3}{10}, D: \\frac{2}{20}, E: \\frac{8}{25}"
        ]
      },
      {
        "id": "Q5",
        "category": "Focus",
        "instruction_mk": "Овде има пет картички со дропки. (а) Без пресметки, дали мислиш дека се конечни или периодични децимали? Објасни. (б) Користи пишан метод за да ја претвориш секоја дропка во децимален број. (в) Напиши ги дропките по големина.",
        "prompt_en": "Here are five fraction cards. (a) Without doing any calculations, do you think these fractions are terminating or recurring decimals? Explain why. (b) Use a written method to convert each fraction to a decimal. (c) Write the fractions in order of size, starting with the smallest.",
        "math_elements_latex": [
          "A: \\frac{5}{9}, B: \\frac{1}{3}, C: \\frac{5}{12}, D: \\frac{4}{11}, E: \\frac{8}{15}"
        ]
      },
      {
        "id": "Q6",
        "category": "Focus",
        "instruction_mk": "Прочитај што вели Маркус. Дали Маркус е во право? Објасни го твојот одговор.",
        "prompt_en": "Read what Marcus says. Is Marcus correct? Explain your answer.",
        "speechBubble": {
            "speaker": "Маркус",
            "gender": "male",
            "text": "Знам дека $\\frac{1}{2}$ и $\\frac{2}{5}$ се периодични децимални броеви. Ова значи дека секоја дропка со именител 6 е исто така периодичен децимален број."
        }
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
          "i) \\frac{7}{24}",
          "ii) \\frac{8}{11}",
          "iii) \\frac{18}{39}",
          "iv) \\frac{5}{39}",
          "\\text{Грешни одговори на Су: } 0.291\\overline{6}, 0.\\overline{72}, 0.1\\overline{6}, 0.12820\\overline{51}"
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
        }
      },
      {
        "id": "Q11_Challenge",
        "category": "Challenge",
        "instruction_mk": "Во еден клас има 27 ученици, 22 од нив се деснораки. Колкав дел од учениците се левораки? Напиши го одговорот како децимален број.",
        "prompt_en": "There are 27 students in a class, 22 of them are right-handed. What fraction of the students are left-handed? Write your answer as a decimal.",
        "math_elements_latex": [
          "\\frac{5}{27}"
        ]
      },
      {
        "id": "Q12_Challenge",
        "category": "Challenge",
        "instruction_mk": "Напиши ги овие броеви по големина, почнувајќи од најмалиот.",
        "prompt_en": "Write these numbers in order of size, starting with the smallest.",
        "math_elements_latex": [
          "0.5\\overline{6}, 0.\\overline{6}, \\frac{2}{7}, 58.2\\%, \\frac{18}{55}, 0.5"
        ]
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
        ]
      },
      {
        "id": "Q14_Challenge",
        "category": "Challenge",
        "instruction_mk": "Напиши ја секоја должина на времето, во часови, како: (i) мешан број (ii) децимален број.",
        "prompt_en": "Write each length of time, in hours, as: (i) a mixed number (ii) a decimal.",
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
        ]
      }
    ]
  }
];