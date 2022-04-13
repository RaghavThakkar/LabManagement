import gql from "graphql-tag";


export const LoginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password ) {
      token
      userId
    }
  }
`;




export const CreateCourse = gql`
 mutation createCourse($code:String!,$name:String!,$section:String!,$semester:String!){
    createCourse(code:$code,name:$name,section:$section,semester:$semester){
     _id
  }
}
`;

export const UpdateCourse = gql`
 mutation updateCourse($id:String,$code:String,$name:String,$section:String,$semester:String){
    updateCourse(id:$id,code:$code,name:$name,section:$section,semester:$semester){
     success
  }
}
`;

export const CourseByIDQuery=gql`
mutation courseById($id:String) {
  courseById(id:$id){
    _id
    name,
    code,
    section,
    semester
  }
  }
`;

export const AddCourse=gql`
mutation add($id:String) {
  courseById(id:$id){
    _id
    name,
    code,
    section,
    semester
  }
  }
`;


export const DeleteCourseByIDQuery=gql`
query deleteCourseById($id:String) {
  deleteCourseById(id:$id){
   success
  }
  }
`;

export const DeleteStudentByIDQuery=gql`
query deleteStudentById($id:String) {
  deleteStudentById(id:$id){
   success
  }
  }
`;

export const AddOrRemoveCourse=gql`
mutation AddCourse($id: String, $code: String, $type: String) {
   addCourse(id: $id, code: $code, type: $type) {
    success
  }
}`;