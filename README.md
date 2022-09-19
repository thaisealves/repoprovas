<div align="center">
<h1>RepoProvas</h1>
</div>

# Description

Using Typescript to make a place to storage all of the exams from an school.

<div align="center">

  <h3>Built With</h3>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px" alt="Typescript"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px" alt="Node.js"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px" alt="Express.js"/>  
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px" alt="Prisma"/>
  
</div>

## Features:

- Post an exam on the plataform
- Send email to users that the exam was created
- Get all the exams organized by discipline
- Get all the exams organized by teacher

# References

### Sign Up

Creating an account

```http
POST /signup
```

#### Request:

| Body              | Type     | Description                                            |
| :---------------- | :------- | :----------------------------------------------------- |
| `email`           | `email`  | **Required**. Email for the application                |
| `password`        | `string` | **Required**. Password used on the current application |
| `confirmPassword` | `string` | **Required**. Password used on the current application |

####

### Sign In

Entering the application

```http
POST /signin
```

#### Request:

| Body       | Type     | Description                                            |
| :--------- | :------- | :----------------------------------------------------- |
| `email`    | `email`  | **Required**. Email for the application                |
| `password` | `string` | **Required**. Password used on the current application |

####

#### Response :

```json
{
  "token": "token string"
}
```

####

### Create an exam

Where the user can post an exam on the plataform.

```http
POST /exam
```

#### Request:

| Body           | Type     | Description                                       |
| :------------- | :------- | :------------------------------------------------ |
| `name`         | `string` | **Required**. Name for the exam                   |
| `pdf`          | `uri`    | **Required**. URL from the exam                   |
| `categoryId`   | `string` | **Required**. ID from the category that exam is   |
| `disciplineId` | `string` | **Required**. ID from the discipline that exam is |
| `teacherId`    | `string` | **Required**. ID from the teacher from that exam  |

####

| Headers         | Type     | Description                       |
| :-------------- | :------- | :-------------------------------- |
| `Authorization` | `string` | **Required**. Token from the user |

####

### Read all exams by discipline

Getting all the exams ordered by discipline

```http
GET /discipline
```

#### Request:

| Headers         | Type     | Description                       |
| :-------------- | :------- | :-------------------------------- |
| `Authorization` | `string` | **Required**. Token from the user |

#### Response :

All the information from the exams, ordered by discipline

```json
[
  {
    "termId": 1,
    "termNumber": 1,
    "discipline": [
      {
        "disciplineId": 1,
        "disciplineName": "Discipline Name",
        "categories": [
          {
            "categoryId": 1,
            "categoryName": "Category Name",
            "tests": [
              {
                "testId": 1,
                "testName": "Test Name",
                "testPdf": "pdfURL",
                "teacherName": "Teacher Name",
                "teacherId": 1
              }
            ]
          }
        ]
      }
    ]
  }
]
```

####

### Read an exam by teacher

Getting all the exams ordered by teacher

```http
GET /teacher
```

#### Request:

| Headers         | Type     | Description                       |
| :-------------- | :------- | :-------------------------------- |
| `Authorization` | `string` | **Required**. Token from the user |

#### Response :

All the information from the exams, ordered by teacher

```json
{
  "teacherId": 1,
  "teacherName": "Teacher Name",
  "categories": [
    {
      "category": [
        {
          "categoryId": 1,
          "categoryName": "Category Name",
          "tests": [
            {
              "testId": 1,
              "testName": "Test Name",
              "disciplineId": 1,
              "disciplineName": "Discipline Name"
            }
          ]
        }
      ]
    }
  ]
}
```
