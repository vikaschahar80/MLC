
export const voiceCommandIntents = [
  {
    module: "student_management",
    sub_modules: [
      {
        module: "add_student",
        url: "#Add",
        keywords: [
          "add student",
          "upload student",
          "register student",
          "insert student",
          "new student",
          "admit student",
        ],
      },
      {
        module: "edit_student",
        url: "#Edit",
        keywords: [
          "edit student",
          "update student",
          "modify student details",
          "change student info",
          "edit student record",
        ],
      },
      {
        module: "view_reports",
        url: "#View",
        keywords: [
          "view reports",
          "show reports",
          "student reports",
          "generate report",
          "get student performance",
        ],
      },
      {
        module: "promote_students",
        url: "#Promote",
        keywords: [
          "promote students",
          "upgrade class",
          "next class",
          "move students to next grade",
          "student promotion",
        ],
      },
    ],
  },
];
