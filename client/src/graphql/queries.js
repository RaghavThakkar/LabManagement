import gql from "graphql-tag";


export const StudentsQuery = gql`
 query{
  students {
    _id
    email
    firstName
    lastName
    address
    city
    phone
    program
  }
}

`;


export const UserList= gql`
query Users {
  users {
    _id
    email
    firstName
    lastName
    address
    city
    phone
  }
}`;

export const CourseQuery = gql`
query{
  courses {
    _id
    name,
    code,
    section,
    semester
  }
}
`;

export const StudentById = gql`
query studentById($id: String) {
  studentById(id: $id) {
    _id,
    email,
    phone,
    program,
    firstName,
    lastName,
    address,
     course{
      name,
      code,
      section,
      semester
    }
  }
}
`;

export const StudentByCourseCode = gql`
query studentByCourseCode($code: String) {
  studentByCourseCode(code: $code) {
    _id,
    email,
    phone,
    program,
    firstName,
    lastName,
    address,
     course{
      name,
      code,
      section,
      semester
    }
  }
}
`;


export const notAddedCourse = gql`
query notAddedCourse($id: String) {
      notAddedCourse(id: $id) {
      student {
      _id,
      email,
      firstName,
      lastName,
      address,
      city,
      phone,
      program,
      course{
      _id
          name,
          code,
          section,
          semester
        }
     },
    course {
    _id,
      code
      name,
      section,
      semester
    }
     
     }
}
`;


export const  DeleteCourseById=gql`
mutation deleteCourseById($id: String) {
    deleteCourseById(id: $id) {
    success
  }
}`;


export const  DeleteStudentId=gql`
mutation deleteStudentById($id: String) {
    deleteStudentById(id: $id) {
    success
  }
}`;




