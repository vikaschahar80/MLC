export const voiceCommandIntents = [
  {
    module: "setup",
    sub_modules: [
      {
        name: "setup_dashboard",
        url: "/setup/dashboard",
        actions: [
          { name: "add_class_subject", keywords: ["add_class_subject"] },
          { name: "edit_class_subject", keywords: ["edit_class_subject"] },
          { name: "delete_class_subject", keywords: ["delete_class_subject"] },
          { name: "upload_signature_class_wise", keywords: ["upload_signature_class_wise"] },
          { name: "upload_logo", keywords: ["upload_logo"] },
          { name: "upload_principal_sign", keywords: ["upload_principal_sign"] },
          { name: "upload_school_seal", keywords: ["upload_school_seal"] },
        ],
      },
      {
        name: "settings",
        url: "/setup/settings",
        actions: [
          { name: "select_current_session", keywords: ["select_current_session"] },
          { name: "edit_reminder_days", keywords: ["edit_reminder_days"] },
        ],
      },
      {
        name: "template_selection",
        url: "/setup/templates",
        actions: [
          { name: "choose_report_card_template", keywords: ["choose_report_card_template"] },
          { name: "choose_fee_report_template", keywords: ["choose_fee_report_template"] },
          { name: "choose_other_template", keywords: ["choose_other_template"] },
        ],
      },
    ],
  },

  {
    module: "sms_usage",
    sub_modules: [
      {
        name: "sent_messages",
        url: "/sms/sent",
        actions: [
          { name: "sent_messages", keywords: ["sent_messages"] },
        ],
      },
      {
        name: "top_up_history",
        url: "/sms/topup-history",
        actions: [
          { name: "view_top_up_history", keywords: ["view_top_up_history"] },
          { name: "top_up_sms", keywords: ["top_up_sms"] },
        ],
      },
    ],
  },

  {
    module: "student_management",
    sub_modules: [
      {
        name: "add_student",
        url: "/add-student",
        actions: [
          { name: "add_individual_student", keywords: ["add_individual_student"] },
          { name: "upload_bulk_student_excel_sheet", keywords: ["upload_bulk_student_excel_sheet"] },
          { name: "block_student", keywords: ["block_student"] },
        ],
      },
      {
        name: "edit_student",
        url: "/edit-student",
        actions: [
          { name: "edit_individual_student", keywords: ["edit_individual_student"] },
          { name: "edit_bulk_students", keywords: ["edit_bulk_students"] },
        ],
      },
      {
        name: "view_reports",
        url: "/view-reports",
        actions: [
          { name: "download_reports", keywords: ["download_reports"] },
        ],
      },
      {
        name: "promote_students",
        url: "promote",
        actions: [
          { name: "promote_students_semester_wise", keywords: ["promote_students_semester_wise"] },
          { name: "promote_students_session_wise", keywords: ["promote_students_session_wise"] },
        ],
      },
    ],
  },

  {
    module: "feedback_report",
    sub_modules: [
      {
        name: "feedback_dashboard",
        url: "/feedback/dashboard",
        actions: [
          { name: "download_all_feedbacks", keywords: ["download_all_feedbacks"] },
          { name: "download_own_feedbacks", keywords: ["download_own_feedbacks"] },
        ],
      },
    ],
  },

  {
    module: "availed_services",
    sub_modules: [
      {
        name: "availed_services_dashboard",
        url: "/services/availed",
        actions: [
          { name: "download_report", keywords: ["download_availed_services_report"] },
        ],
      },
    ],
  },

  {
    module: "fees_management",
    sub_modules: [
      {
        name: "fees_dashboard",
        url: "/fees/dashboard",
        actions: [
          { name: "collect_fees", keywords: ["collect_fees_full", "collect_fees_installment"] },
          { name: "print_fees_receipt", keywords: ["print_fees_receipt"] },
        ],
      },
      {
        name: "send_reminder",
        url: "/fees/reminder",
        actions: [
          { name: "send_defaulter_reminder", keywords: ["send_defaulter_reminder_email", "send_defaulter_reminder_whatsapp", "send_defaulter_reminder_app", "send_defaulter_reminder_sms"] },
          { name: "download_defaulter_list", keywords: ["download_defaulter_list"] },
        ],
      },
      {
        name: "fee_reports",
        url: "/fees/reports",
        actions: [
          { name: "download_all_fee_receipts", keywords: ["download_all_fee_receipts"] },
          { name: "download_individual_fee_receipt", keywords: ["download_individual_fee_receipt"] },
          { name: "delete_transaction", keywords: ["delete_transaction"] },
          { name: "reverse_fees", keywords: ["reverse_fees"] },
        ],
      },
      {
        name: "declined_payments",
        url: "/fees/declined",
        actions: [
          { name: "restore_transactions", keywords: ["restore_transactions"] },
          { name: "download_declined_report", keywords: ["download_declined_report"] },
        ],
      },
      {
        name: "late_fine",
        url: "/fees/late-fine",
        actions: [
          { name: "add_late_fine", keywords: ["add_late_fine_monthwise", "add_late_fine_fullsession"] },
          { name: "edit_late_fine", keywords: ["edit_late_fine"] },
          { name: "delete_late_fine", keywords: ["delete_late_fine"] },
        ],
      },
      {
        name: "concession",
        url: "/fees/concession",
        actions: [
          { name: "add_fees_concession", keywords: ["add_fees_concession"] },
          { name: "add_other_service_concession", keywords: ["add_other_service_concession"] },
          { name: "edit_fees_concession", keywords: ["edit_fees_concession"] },
          { name: "edit_other_service_concession", keywords: ["edit_other_service_concession"] },
          { name: "delete_fees_concession", keywords: ["delete_fees_concession"] },
          { name: "delete_other_service_concession", keywords: ["delete_other_service_concession"] },
        ],
      },
      {
        name: "fees_structure",
        url: "/fees/structure",
        actions: [
          { name: "add_fees_structure", keywords: ["add_fees_structure"] },
          { name: "edit_fees_structure", keywords: ["edit_fees_structure"] },
          { name: "delete_fees_structure", keywords: ["delete_fees_structure"] },
          { name: "copy_structure_whole_year", keywords: ["copy_structure_whole_year"] },
          { name: "copy_structure_to_other_classes", keywords: ["copy_structure_to_other_classes"] },
        ],
      },
      {
        name: "fees_challan",
        url: "/fees/challan",
        actions: [
          { name: "generate_challan_individual", keywords: ["generate_challan_individual"] },
          { name: "generate_challan_all", keywords: ["generate_challan_all"] },
        ],
      },
    ],
  },
  {
    module: "attendance_management",
    sub_modules: [
      {
        name: "dashboard",
        url: "/attendance/dashboard",
        actions: [
          { name: "add_attendance", keywords: ["add_attendance"] },
          { name: "update_attendance", keywords: ["update_attendance"] },
          { name: "add_backdated_attendance", keywords: ["add_backdated_attendance"] },
          { name: "update_backdated_attendance", keywords: ["update_backdated_attendance"] },
        ],
      },
      {
        name: "late_attendance",
        url: "/attendance/late",
        actions: [
          { name: "send_notification_individual", keywords: ["send_late_notification_individual"] },
          { name: "send_notification_all", keywords: ["send_late_notification_all"] },
        ],
      },
      {
        name: "attendance_report",
        url: "/attendance/report",
        actions: [
          { name: "download_attendance_report", keywords: ["download_attendance_report"] },
        ],
      },
    ],
  },

  {
    module: "progress_report",
    sub_modules: [
      {
        name: "admit_card",
        url: "/progress/admit-card",
        actions: [
          { name: "generate_admit_card_individual", keywords: ["generate_admit_card_individual"] },
          { name: "generate_admit_card_all", keywords: ["generate_admit_card_all"] },
        ],
      },
      {
        name: "generate_report",
        url: "/progress/report",
        actions: [
          { name: "generate_progress_individual", keywords: ["generate_progress_individual"] },
          { name: "generate_progress_all", keywords: ["generate_progress_all"] },
          { name: "publish_progress_app", keywords: ["publish_progress_app"] },
          { name: "download_progress_studentwise", keywords: ["download_progress_studentwise"] },
        ],
      },
      {
        name: "exams",
        url: "/progress/exams",
        actions: [
          { name: "add_exam", keywords: ["add_exam"] },
          { name: "add_exam_routine", keywords: ["add_exam_routine"] },
          { name: "edit_exam", keywords: ["edit_exam"] },
          { name: "delete_exam", keywords: ["delete_exam"] },
          { name: "edit_tags", keywords: ["edit_exam_tags"] },
        ],
      },
      {
        name: "exam_marks",
        url: "/progress/marks",
        actions: [
          { name: "add_marks", keywords: ["add_exam_marks"] },
          { name: "edit_marks", keywords: ["edit_marks"] },
        ],
      },
      {
        name: "exam_remarks",
        url: "/progress/remarks",
        actions: [
          { name: "add_remarks", keywords: ["add_remarks"] },
          { name: "edit_remarks", keywords: ["edit_remarks"] },
        ],
      },
      {
        name: "exam_attendance",
        url: "/progress/attendance",
        actions: [
          { name: "add_exam_attendance", keywords: ["add_exam_attendance"] },
          { name: "edit_exam_attendance", keywords: ["edit_exam_attendance"] },
          { name: "add_total_attendance_days", keywords: ["add_total_attendance_days"] },
        ],
      },
    ],
  },

  {
    module: "subject_management",
    sub_modules: [
      {
        name: "subject_management",
        url: "/subject/manage",
        actions: [
          { name: "add_subjects", keywords: ["add_subjects"] },
          { name: "edit_subjects", keywords: ["edit_subjects"] },
          { name: "delete_subjects", keywords: ["delete_subjects"] },
        ],
      },
      {
        name: "specialization_management",
        url: "/subject/specialization",
        actions: [
          { name: "add_specialization", keywords: ["add_specialization"] },
          { name: "edit_specialization", keywords: ["edit_specialization"] },
          { name: "delete_specialization", keywords: ["delete_specialization"] },
        ],
      },
    ],
  },

  {
    module: "subject_management_university",
    sub_modules: [
      {
        name: "header_management",
        url: "/university/headers",
        actions: [
          { name: "add_header", keywords: ["add_header"] },
          { name: "edit_header", keywords: ["edit_header"] },
          { name: "delete_header", keywords: ["delete_header"] },
        ],
      },
      {
        name: "university_subject_management",
        url: "/university/subjects",
        actions: [
          { name: "add_subject", keywords: ["add_subject"] },
          { name: "edit_subject", keywords: ["edit_subject"] },
          { name: "delete_subject", keywords: ["delete_subject"] },
        ],
      },
      
    ],
  },

  {
    module: "event_management",
    sub_modules: [
      {
        name: "event_dashboard",
        url: "/events",
        actions: [
          { name: "add_event", keywords: ["add_event"] },
          { name: "edit_event", keywords: ["edit_event"] },
          { name: "delete_event", keywords: ["delete_event"] },
        ],
      },
    ],
  },

  {
    module: "certificates",
    sub_modules: [
      {
        name: "transfer_certificate",
        url: "/certificates/transfer",
        actions: [
          { name: "generate_tc", keywords: ["generate_transfer_certificate"] },
          { name: "handover_tc", keywords: ["handover_transfer_certificate"] },
          { name: "download_tc", keywords: ["download_transfer_certificate"] },
        ],
      },
      {
        name: "income_certificate",
        url: "/certificates/income",
        actions: [
          { name: "generate_income", keywords: ["generate_income_certificate"] },
          { name: "handover_income", keywords: ["handover_income_certificate"] },
          { name: "download_income", keywords: ["download_income_certificate"] },
        ],
      },
      {
        name: "character_certificate",
        url: "/certificates/character",
        actions: [
          { name: "generate_character", keywords: ["generate_character_certificate"] },
          { name: "handover_character", keywords: ["handover_character_certificate"] },
          { name: "download_character", keywords: ["download_character_certificate"] },
        ],
      },
      {
        name: "bonafide_certificate",
        url: "/certificates/bonafide",
        actions: [
          { name: "generate_bonafide", keywords: ["generate_bonafide_certificate"] },
          { name: "handover_bonafide", keywords: ["handover_bonafide_certificate"] },
          { name: "download_bonafide", keywords: ["download_bonafide_certificate"] },
        ],
      },
    ],
  },

  {
    module: "leave_management",
    sub_modules: [
      {
        name: "dashboard",
        url: "/leave/dashboard",
        actions: [
          { name: "approve_leave", keywords: ["approve_leave"] },
          { name: "decline_leave", keywords: ["decline_leave"] },
          { name: "download_leave_report", keywords: ["download_leave_report"] },
        ],
      },
      {
        name: "apply_leave",
        url: "/leave/apply",
        actions: [
          { name: "apply_leave", keywords: ["apply_leave"] },
          { name: "cancel_leave", keywords: ["cancel_leave_application"] },
        ],
      },
      {
        name: "leave_structure",
        url: "/leave/structure",
        actions: [
          { name: "add_leave_category", keywords: ["add_leave_category"] },
          { name: "edit_leave_category", keywords: ["edit_leave_category"] },
          { name: "delete_leave_category", keywords: ["delete_leave_category"] },
          { name: "add_leave_structure", keywords: ["add_leave_structure"] },
          { name: "edit_leave_structure", keywords: ["edit_leave_structure"] },
        ],
      },
    ],
  },

  {
    module: "user_management",
    sub_modules: [
      {
        name: "user_dashboard",
        url: "/users",
        actions: [
          { name: "add_user", keywords: ["add_user"] },
          { name: "bulk_add_user", keywords: ["bulk_add_user"] },
          { name: "edit_user", keywords: ["edit_user"] },
          { name: "block_user", keywords: ["block_user"] },
          { name: "send_credentials", keywords: ["send_user_credentials"] },
          { name: "delete_user", keywords: ["delete_user"] },
        ],
      },
      {
        name: "manage_roles",
        url: "/users/roles",
        actions: [
          { name: "add_role", keywords: ["add_role"] },
          { name: "edit_role", keywords: ["edit_role"] },
          { name: "delete_role", keywords: ["delete_role"] },
          { name: "assign_modules_to_role", keywords: ["assign_modules_to_role"] },
        ],
      },
    ],
  },

  {
  module: "employee_management",
  sub_modules: [
    {
      name: "dashboard",
      url: "/employee",
      actions: [
        { name: "add_employee", keywords: ["add_employee"] },
        { name: "bulk_add_employee", keywords: ["bulk_add_employee"] },
        { name: "download_employee_report", keywords: ["download_employee_report"] },
        { name: "transfer_employee", keywords: ["transfer_employee"] },
        { name: "block_employee", keywords: ["block_employee"] },
        { name: "delete_employee", keywords: ["delete_employee"] },
      ],
    },
    {
      name: "employee_attendance",
      url: "/employee/attendance",
      actions: [
        { name: "add_employee_attendance", keywords: ["add_employee_attendance"] },
        { name: "update_employee_attendance", keywords: ["update_employee_attendance"] },
        { name: "download_employee_attendance_report", keywords: ["download_employee_attendance_report"] },
      ],
    },
    {
      name: "biometric_attendance",
      url: "/employee/biometric",
      actions: [
        { name: "download_biometric_attendance_report", keywords: ["download_biometric_attendance_report"] },
      ],
    },
    {
      name: "salary_structure",
      url: "/employee/salary-structure",
      actions: [
        { name: "add_salary_structure", keywords: ["add_salary_structure"] },
        { name: "edit_salary_structure", keywords: ["edit_salary_structure"] },
        { name: "delete_salary_structure", keywords: ["delete_salary_structure"] },
      ],
    },
    {
      name: "payslip",
      url: "/employee/payslip",
      actions: [
        { name: "generate_payslip", keywords: ["generate_payslip"] },
        { name: "send_payslip_email", keywords: ["send_payslip_email"] },
        { name: "download_payslip", keywords: ["download_payslip"] },
      ],
    },
    {
      name: "employee_settings",
      url: "/employee/settings",
      actions: [
        { name: "add_department", keywords: ["add_department"] },
        { name: "edit_department", keywords: ["edit_department"] },
        { name: "delete_department", keywords: ["delete_department"] },
        { name: "add_designation", keywords: ["add_designation"] },
        { name: "edit_designation", keywords: ["edit_designation"] },
        { name: "delete_designation", keywords: ["delete_designation"] },
        { name: "add_employee_type", keywords: ["add_employee_type"] },
        { name: "edit_employee_type", keywords: ["edit_employee_type"] },
        { name: "delete_employee_type", keywords: ["delete_employee_type"] },
      ],
    },
    {
      name: "overtime",
      url: "/employee/overtime",
      actions: [
        { name: "add_overtime", keywords: ["add_overtime"] },
        { name: "edit_overtime", keywords: ["edit_overtime"] },
        { name: "delete_overtime", keywords: ["delete_overtime"] },
      ],
    },
    {
      name: "employee_report",
      url: "/employee/reports",
      actions: [
        { name: "download_employee_full_report", keywords: ["download_employee_full_report"] },
      ],
    },
    {
      name: "rules_and_regulations",
      url: "/employee/rules",
      actions: [
        { name: "manage_overtime_rules", keywords: ["manage_overtime_rules"] },
      ],
    },
    {
      name: "advances",
      url: "/employee/advances",
      actions: [
        { name: "add_advances", keywords: ["add_advances"] },
        { name: "edit_advances", keywords: ["edit_advances"] },
        { name: "delete_advances", keywords: ["delete_advances"] },
      ],
    },
    {
      name: "incentive",
      url: "/employee/incentive",
      actions: [
        { name: "add_output", keywords: ["add_output"] },
        { name: "edit_output", keywords: ["edit_output"] },
        { name: "delete_output", keywords: ["delete_output"] },
        { name: "add_allowance", keywords: ["add_allowance"] },
        { name: "edit_allowance", keywords: ["edit_allowance"] },
        { name: "delete_allowance", keywords: ["delete_allowance"] },
        { name: "add_incentive", keywords: ["add_incentive"] },
        { name: "edit_incentive", keywords: ["edit_incentive"] },
        { name: "delete_incentive", keywords: ["delete_incentive"] },
        { name: "download_incentive_report", keywords: ["download_incentive_report"] },
      ],
    },
    {
      name: "canteen",
      url: "/employee/canteen",
      actions: [
        { name: "add_meal", keywords: ["add_meal"] },
        { name: "edit_meal", keywords: ["edit_meal"] },
        { name: "delete_meal", keywords: ["delete_meal"] },
        { name: "download_meal_report", keywords: ["download_meal_report"] },
      ],
    },
  ],
},

  {
    module: "passout",
    sub_modules: [
      {
        name: "passout_dashboard",
        url: "/passout",
        actions: [
          { name: "mark_passout", keywords: ["mark_passout"] },
        ],
      },
      {
        name: "lwi",
        url: "/passout/lwi",
        actions: [
          { name: "mark_lwi", keywords: ["mark_lwi"] },
        ],
      },
      {
        name: "passouts",
        url: "/passout/manage",
        actions: [
          { name: "reverse_passout", keywords: ["reverse_passout"] },
          { name: "generate_tc", keywords: ["generate_passout_tc"] },
        ],
      },
    ],
  },
  {
    module: "assignment_notices",
    sub_modules: [
      {
        name: "assignment",
        url: "/assignment",
        actions: [
          { name: "add_assignment", keywords: ["add_assignment"] },
          { name: "edit_assignment", keywords: ["edit_assignment"] },
          { name: "delete_assignment", keywords: ["delete_assignment"] },
          { name: "download_assignment_attachment", keywords: ["download_assignment_attachment"] },
        ],
      },
      {
        name: "study_materials",
        url: "/study-materials",
        actions: [
          { name: "add_study_material", keywords: ["add_study_material"] },
          { name: "edit_study_material", keywords: ["edit_study_material"] },
          { name: "delete_study_material", keywords: ["delete_study_material"] },
          { name: "download_study_material", keywords: ["download_study_material"] },
        ],
      },
      {
        name: "notices",
        url: "/notices",
        actions: [
          { name: "add_notice", keywords: ["add_notice"] },
          { name: "delete_notice", keywords: ["delete_notice"] },
          { name: "download_notice_attachment", keywords: ["download_notice_attachment"] },
        ],
      },
      {
        name: "syllabus",
        url: "/syllabus",
        actions: [
          { name: "add_syllabus", keywords: ["add_syllabus"] },
          { name: "edit_syllabus", keywords: ["edit_syllabus"] },
          { name: "delete_syllabus", keywords: ["delete_syllabus"] },
          { name: "download_syllabus_attachment", keywords: ["download_syllabus_attachment"] },
        ],
      },
    ],
  },

  {
    module: "transport_management",
    sub_modules: [
      {
        name: "transport_fee",
        url: "/transport/fee",
        actions: [
          { name: "add_transport_route", keywords: ["add_transport_route"] },
          { name: "edit_transport_route", keywords: ["edit_transport_route"] },
          { name: "delete_transport_route", keywords: ["delete_transport_route"] },
          { name: "add_transport_stops", keywords: ["add_transport_stops"] },
          { name: "edit_transport_stops", keywords: ["edit_transport_stops"] },
          { name: "delete_transport_stops", keywords: ["delete_transport_stops"] },
        ],
      },
      {
        name: "assign_transport",
        url: "/transport/assign",
        actions: [
          { name: "assign_transport", keywords: ["assign_transport"] },
          { name: "deassign_transport", keywords: ["deassign_transport"] },
          { name: "edit_transport_assignment", keywords: ["edit_transport_assignment"] },
          { name: "delete_transport_assignment", keywords: ["delete_transport_assignment"] },
        ],
      },
      {
        name: "vehicles",
        url: "/transport/vehicles",
        actions: [
          { name: "add_vehicle", keywords: ["add_vehicle"] },
          { name: "edit_vehicle", keywords: ["edit_vehicle"] },
          { name: "delete_vehicle", keywords: ["delete_vehicle"] },
          { name: "assign_driver_helper", keywords: ["assign_driver_helper"] },
          { name: "edit_driver_helper_assignment", keywords: ["edit_driver_helper_assignment"] },
          { name: "delete_driver_helper_assignment", keywords: ["delete_driver_helper_assignment"] },
        ],
      },
      {
        name: "transport_reports",
        url: "/transport/reports",
        actions: [
          { name: "download_transport_report", keywords: ["download_transport_report"] },
        ],
      },
    ],
  },

  {
    module: "hostel_management",
    sub_modules: [
      {
        name: "hostel_dashboard",
        url: "/hostel",
        actions: [
          { name: "add_hostel", keywords: ["add_hostel"] },
          { name: "edit_hostel", keywords: ["edit_hostel"] },
          { name: "delete_hostel", keywords: ["delete_hostel"] },
          { name: "add_hostel_fees", keywords: ["add_hostel_fees"] },
          { name: "edit_hostel_fees", keywords: ["edit_hostel_fees"] },
          { name: "delete_hostel_fees", keywords: ["delete_hostel_fees"] },
        ],
      },
      {
        name: "assign_hostel",
        url: "/hostel/assign",
        actions: [
          { name: "assign_hostel", keywords: ["assign_hostel"] },
          { name: "edit_hostel_assignment", keywords: ["edit_hostel_assignment"] },
          { name: "deassign_hostel", keywords: ["deassign_hostel"] },
        ],
      },
      {
        name: "hostel_reports",
        url: "/hostel/reports",
        actions: [
          { name: "download_hostel_report", keywords: ["download_hostel_report"] },
        ],
      },
    ],
  },

  {
    module: "house_management",
    sub_modules: [
      {
        name: "house_dashboard",
        url: "/house",
        actions: [
          { name: "add_house", keywords: ["add_house"] },
          { name: "edit_house", keywords: ["edit_house"] },
          { name: "delete_house", keywords: ["delete_house"] },
        ],
      },
      {
        name: "assign_house",
        url: "/house/assign",
        actions: [
          { name: "assign_house", keywords: ["assign_house"] },
          { name: "change_house_assignment", keywords: ["change_house_assignment"] },
          { name: "deassign_house", keywords: ["deassign_house"] },
        ],
      },
    ],
  },

  {
    module: "time_table_management",
    sub_modules: [
      {
        name: "dashboard",
        url: "/timetable",
        actions: [
          { name: "assign_teachers_empty_classes", keywords: ["assign_teachers_to_empty_classes"] },
        ],
      },
      {
        name: "schedule",
        url: "/timetable/schedule",
        actions: [
          { name: "add_schedule", keywords: ["add_schedule"] },
          { name: "upload_schedule", keywords: ["upload_schedule"] },
          { name: "edit_schedule", keywords: ["edit_schedule"] },
          { name: "delete_schedule", keywords: ["delete_schedule"] },
          { name: "copy_schedule", keywords: ["copy_schedule"] },
          { name: "schedule_periods", keywords: ["schedule_periods"] },
          { name: "edit_periods", keywords: ["edit_scheduled_periods"] },
          { name: "delete_periods", keywords: ["delete_scheduled_periods"] },
          { name: "copy_periods", keywords: ["copy_periods"] },
        ],
      },
      {
        name: "timetable_reports",
        url: "/timetable/reports",
        actions: [
          { name: "send_timetable_reminders", keywords: ["send_timetable_reminders"] },
          { name: "download_timetable_report", keywords: ["download_timetable_report"] },
        ],
      },
    ],
  },
  {
    module: "canteen_management",
    sub_modules: [
      {
        name: "canteen_dashboard",
        url: "/canteen",
        actions: [
          { name: "add_canteen", keywords: ["add_canteen"] },
          { name: "edit_canteen", keywords: ["edit_canteen"] },
          { name: "delete_canteen", keywords: ["delete_canteen"] },
        ],
      },
      {
        name: "assign_canteen",
        url: "/canteen/assign",
        actions: [
          { name: "assign_canteen", keywords: ["assign_canteen"] },
          { name: "edit_assigned_canteen", keywords: ["edit_assigned_canteen"] },
          { name: "deassign_canteen", keywords: ["deassign_canteen"] },
        ],
      },
      {
        name: "canteen_reports",
        url: "/canteen/reports",
        actions: [
          { name: "download_canteen_report", keywords: ["download_canteen_report"] },
        ],
      },
    ],
  },

  {
    module: "admission_management",
    sub_modules: [], // WILL BE ADDED LATER
  },

  {
    module: "accounts_management",
    sub_modules: [
      {
        name: "payments",
        url: "/accounts/payments",
        actions: [
          { name: "make_payment", keywords: ["make_payment"] },
          { name: "print_payment", keywords: ["print_payment"] },
        ],
      },
      {
        name: "receipts",
        url: "/accounts/receipts",
        actions: [
          { name: "receive_payment", keywords: ["receive_payment"] },
        ],
      },
      {
        name: "ledger",
        url: "/accounts/ledger",
        actions: [
          { name: "print_ledger", keywords: ["print_ledger"] },
          { name: "view_ledger_details", keywords: ["view_ledger_details"] },
        ],
      },
      {
        name: "settings",
        url: "/accounts/settings",
        actions: [
          { name: "create_party", keywords: ["create_party"] },
          { name: "edit_party", keywords: ["edit_party"] },
          { name: "delete_party", keywords: ["delete_party"] },
        ],
      },
    ],
  },

  {
    module: "sms_emails",
    sub_modules: [
      {
        name: "dashboard",
        url: "/sms/dashboard",
        actions: [
          { name: "send_sms_email", keywords: ["send_sms", "send_email"] },
        ],
      },
      {
        name: "notifications",
        url: "/sms/notifications",
        actions: [
          { name: "send_sms_notifications", keywords: ["send_sms_notifications"] },
        ],
      },
    ],
  },

  {
    module: "other_charges",
    sub_modules: [
      {
        name: "add_other_fees",
        url: "/charges/add",
        actions: [
          { name: "download_other_fees_report", keywords: ["download_other_fees_report"] },
          { name: "add_other_fees", keywords: ["add_other_fees"] },
          { name: "edit_other_fees", keywords: ["edit_other_fees"] },
          { name: "delete_other_fees", keywords: ["delete_other_fees"] },
        ],
      },
      {
        name: "assign_fees",
        url: "/charges/assign",
        actions: [
          { name: "assign_fees_to_students", keywords: ["assign_fees_to_students"] },
          { name: "collect_assigned_fees", keywords: ["collect_assigned_fees"] },
          { name: "delete_assigned_fees", keywords: ["delete_assigned_fees"] },
        ],
      },
      {
        name: "unregistered_student_fees",
        url: "/charges/unregistered",
        actions: [
          { name: "assign_unregistered_fees", keywords: ["assign_unregistered_fees"] },
          { name: "collect_unregistered_fees", keywords: ["collect_unregistered_fees"] },
          { name: "delete_unregistered_fees", keywords: ["delete_unregistered_fees"] },
        ],
      },
      {
        name: "other_charges_report",
        url: "/charges/report",
        actions: [
          { name: "download_other_charges_report", keywords: ["download_other_charges_report"] },
        ],
      },
      {
        name: "other_charges_settings",
        url: "/charges/settings",
        actions: [
          { name: "add_charge_type", keywords: ["add_charge_type"] },
          { name: "edit_charge_type", keywords: ["edit_charge_type"] },
          { name: "delete_charge_type", keywords: ["delete_charge_type"] },
        ],
      },
    ],
  },
  {
    module: "app_notifications",
    sub_modules: [
      {
        name: "notification_list",
        url: "/app/notifications",
        actions: [],
      },
      {
        name: "send_notification",
        url: "/app/notifications/send",
        actions: [
          { name: "send_app_notification", keywords: ["send_app_notification"] },
        ],
      },
    ],
  },

  {
    module: "library_management",
    sub_modules: [
      {
        name: "book_list",
        url: "/library/books",
        actions: [
          { name: "add_book", keywords: ["add_book"] },
          { name: "upload_books_list", keywords: ["upload_books_list"] },
          { name: "edit_book", keywords: ["edit_book"] },
          { name: "delete_book", keywords: ["delete_book"] },
          { name: "weed_out_books", keywords: ["weed_out_books"] },
          { name: "download_book_report", keywords: ["download_book_report"] },
        ],
      },
      {
        name: "issue_books",
        url: "/library/issue",
        actions: [
          { name: "issue_book", keywords: ["issue_book"] },
        ],
      },
      {
        name: "collect_return_books",
        url: "/library/collect",
        actions: [
          { name: "collect_book", keywords: ["collect_book"] },
          { name: "send_return_reminder", keywords: ["send_return_reminder"] },
          { name: "reissue_book", keywords: ["reissue_book"] },
          { name: "download_collection_report", keywords: ["download_collection_report"] },
          { name: "download_defaulter_list", keywords: ["download_defaulter_list"] },
          { name: "add_book_fine", keywords: ["add_book_fine"] },
        ],
      },
      {
        name: "collection_history",
        url: "/library/history",
        actions: [
          { name: "download_collection_history", keywords: ["download_collection_history"] },
        ],
      },
      {
        name: "weed_out",
        url: "/library/weed-out",
        actions: [
          { name: "download_weed_out_report", keywords: ["download_weed_out_report"] },
          { name: "reverse_weed_out", keywords: ["reverse_weed_out"] },
        ],
      },
    ],
  },

  {
    module: "online_class",
    sub_modules: [
      {
        name: "dashboard",
        url: "/online-class",
        actions: [
          { name: "schedule_meeting", keywords: ["schedule_meeting"] },
          { name: "edit_meeting", keywords: ["edit_meeting"] },
          { name: "delete_meeting", keywords: ["delete_meeting"] },
          { name: "join_meeting", keywords: ["join_meeting"] },
        ],
      },
    ],
  },

  {
    module: "birthdays",
    sub_modules: [
      {
        name: "dashboard",
        url: "/birthdays",
        actions: [
          { name: "send_greetings", keywords: ["send_birthday_greetings"] },
        ],
      },
    ],
  },

  {
    module: "diagnosis",
    sub_modules: [
      {
        name: "dashboard",
        url: "/diagnosis",
        actions: [
          { name: "add_patient", keywords: ["add_patient"] },
          { name: "view_diagnosis_report", keywords: ["view_diagnosis_report"] },
        ],
      },
      {
        name: "patient_report",
        url: "/diagnosis/report",
        actions: [
          { name: "download_diagnosis_report", keywords: ["download_diagnosis_report"] },
        ],
      },
    ],
  },

  {
    module: "whatsapp_messages",
    sub_modules: [
      {
        name: "dashboard",
        url: "/whatsapp",
        actions: [
          { name: "send_whatsapp_by_number", keywords: ["send_whatsapp_by_number"] },
          { name: "send_whatsapp_by_list", keywords: ["send_whatsapp_by_list"] },
        ],
      },
    ],
  },
];
