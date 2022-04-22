import gql from "graphql-tag";


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

export const userById = gql`
query userById($id: String) {
  userById(id: $id) {
    _id,
    email,
    firstName,
    lastName,
    address,
    city,
    phone
  }
}
`;

export const userByType = gql`
query userByType($type: String) {
  userByType(type: $type) {
    _id,
    email,
    firstName,
    lastName,
    address,
    city,
    phone
  }
}
`;

export const vitalInfoList= gql`
query vitalInfoList {
  VitalSigns {
    userEmail,
    heartRate,
    bloodPressure,
    bodyTemperature,
    weight
  }
}`;

export const vitalInfoListByUserId= gql`
query vitalInfoByUserId($userId:String) {
  vitalInfoByUserId(userId: $userId) {
    userId,
    heartRate,
    bloodPressure,
    bodyTemperature,
    weight,
    date,
    _id
  }
}`;

export const vitalInfoListByFormId= gql`
query vitalInfoByID($id:String) {
  vitalInfoByID(id: $id) {
    userId,
    heartRate,
    bloodPressure,
    bodyTemperature,
    weight,
    _id,
    userEmail,
    date
  }
}`;

export const motivationalList= gql`
query motivationalList {
  motivationalList{
    title,
    description,
    videoURL
  }
}`;

// export const patientDailyInfo = gql`
// query 
// `
