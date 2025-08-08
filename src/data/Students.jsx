const mockStudents =[
  {
    "id": 1,
    "name": "Aarav Joshi",
    "role": "student",
    "rollNumber": "100",
    "contact": "9497504997",
    "fatherName": "Aadhya Verma",
    "className": "4",
    "section": "C"
  },
  {
    "id": 2,
    "name": "Arjun Joshi",
    "role": "student",
    "rollNumber": "101",
    "contact": "9384159258",
    "fatherName": "Meera Mehta",
    "className": "6",
    "section": "A"
  },
  {
    "id": 3,
    "name": "Saanvi Sharma",
    "role": "student",
    "rollNumber": "102",
    "contact": "9577526551",
    "fatherName": "Siya Yadav",
    "className": "5",
    "section": "A"
  },
  {
    "id": 4,
    "name": "Arjun Patel",
    "role": "student",
    "rollNumber": "103",
    "contact": "9894688397",
    "fatherName": "Saanvi Singh",
    "className": "6",
    "section": "A"
  },
  {
    "id": 5,
    "name": "Prisha Kumar",
    "role": "student",
    "rollNumber": "104",
    "contact": "9519903860",
    "fatherName": "Prisha Yadav",
    "className": "7",
    "section": "A"
  },
  {
    "id": 6,
    "name": "Krishna Verma",
    "role": "student",
    "rollNumber": "105",
    "contact": "9752858449",
    "fatherName": "Avni Verma",
    "className": "4",
    "section": "B"
  },
  {
    "id": 7,
    "name": "Sai Mehta",
    "role": "student",
    "rollNumber": "106",
    "contact": "9200538962",
    "fatherName": "Aditya Joshi",
    "className": "8",
    "section": "A"
  },
  {
    "id": 8,
    "name": "Siya Reddy",
    "role": "student",
    "rollNumber": "107",
    "contact": "9980327308",
    "fatherName": "Aditya Kumar",
    "className": "7",
    "section": "B"
  },
  {
    "id": 9,
    "name": "Avni Yadav",
    "role": "student",
    "rollNumber": "108",
    "contact": "9468790700",
    "fatherName": "Aditya Mishra",
    "className": "10",
    "section": "C"
  },
  {
    "id": 10,
    "name": "Ishaan Reddy",
    "role": "student",
    "rollNumber": "109",
    "contact": "9307076859",
    "fatherName": "Diya Patel",
    "className": "8",
    "section": "C"
  },
  {
    "id": 11,
    "name": "Meera Verma",
    "subject": "Geography",
    "contact": "9464571022",
    "education": "PhD",
    "role": "teacher"
  },
  {
    "id": 12,
    "name": "Aarav Patel",
    "subject": "Physics",
    "contact": "9727228388",
    "education": "MSc",
    "role": "teacher"
  },
  {
    "id": 13,
    "name": "Diya Verma",
    "subject": "English",
    "contact": "9446276654",
    "education": "MA",
    "role": "teacher"
  },
  {
    "id": 14,
    "name": "Anvi Mishra",
    "subject": "Computer",
    "contact": "9857573771",
    "education": "MCom",
    "role": "teacher"
  },
  {
    "id": 15,
    "name": "Meera Yadav",
    "subject": "English",
    "contact": "9162377269",
    "education": "MTech",
    "role": "teacher"
  },
  {
    "id": 16,
    "name": "Diya Verma",
    "subject": "Hindi",
    "contact": "9606945155",
    "education": "PhD",
    "role": "teacher"
  },
  {
    "id": 17,
    "name": "Vivaan Yadav",
    "subject": "Social",
    "contact": "9485468298",
    "education": "MTech",
    "role": "teacher"
  },
  {
    "id": 18,
    "name": "Prisha Yadav",
    "subject": "Social",
    "contact": "9701758896",
    "education": "MCom",
    "role": "teacher"
  },
  {
    "id": 19,
    "name": "Myra Mishra",
    "subject": "Physics",
    "contact": "9809105119",
    "education": "BEd",
    "role": "teacher"
  },
  {
    "id": 20,
    "name": "Ishaan Singh",
    "subject": "Social",
    "contact": "9873924702",
    "education": "BEd",
    "role": "teacher"
  },
  {
    "id": 21,
    "name": "Siya Joshi",
    "department": "Finance",
    "contact": "9699751628",
    "role": "admin"
  },
  {
    "id": 22,
    "name": "Ayaan Yadav",
    "department": "HR",
    "contact": "9268314485",
    "role": "admin"
  },
  {
    "id": 23,
    "name": "Anvi Yadav",
    "department": "HR",
    "contact": "9400970314",
    "role": "admin"
  },
  {
    "id": 24,
    "name": "Myra Patel",
    "department": "Examination",
    "contact": "9492397800",
    "role": "admin"
  },
  {
    "id": 25,
    "name": "Prisha Patel",
    "department": "IT",
    "contact": "9109243043",
    "role": "admin"
  },
  {
    "id": 26,
    "name": "Avni Singh",
    "department": "Admin Office",
    "contact": "9513464484",
    "role": "admin"
  },
  {
    "id": 27,
    "name": "Saanvi Reddy",
    "department": "Examination",
    "contact": "9847114358",
    "role": "admin"
  },
  {
    "id": 28,
    "name": "Vihaan Reddy",
    "department": "HR",
    "contact": "9320683888",
    "role": "admin"
  },
  {
    "id": 29,
    "name": "Aditya Singh",
    "department": "Finance",
    "contact": "9387014888",
    "role": "admin"
  },
  {
    "id": 30,
    "name": "Reyansh Patel",
    "department": "Library",
    "contact": "9491104224",
    "role": "admin"
  }

  // Repeat similar format till ID 50
]
export default mockStudents;
