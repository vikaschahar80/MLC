
export const voiceCommandIntents = [
  {
    module: "student_management",
    sub_modules: [
      {
        module: "add_student",
        url: "/add-student",
        keywords: [
          "add student",
          "add_student",
          "upload student",
          "register student",
          "insert student",
          "new student",
          "admit student",
        ],
      },
      {
        module: "edit_student",
        url: "/edit-student",
        keywords: [
          "edit_student",
          "edit student",
          "update student",
          "modify student details",
          "change student info",
          "edit student record",
        ],
      },
      {
        module: "view_reports",
        url: "/view-reports",
        keywords: [
          "view_reports",
          "view reports",
          "view report",
          "show reports",
          "student reports",
          "generate report",
          "get student performance",
        ],
      },
      {
        module: "promote_students",
        url: "/promote",
        keywords: [
          "promote_students",
          "promote student",
          "upgrade class",
          "next class",
          "move students to next grade",
          "student promotion",
        ],
      },
    ],
  },
];
