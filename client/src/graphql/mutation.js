import gql from "graphql-tag";


export const LoginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password ) {
      token
      userId
      usertype
    }
  }
`;

export const registration = gql`
  mutation registration($email: String!, $password: String!, $firstName: String!, $lastName: String!, $address: String!, $city: String!, $phone: String!, $usertype:String!) {
    registration(userInput:{email: $email, password: $password,firstName:$firstName,lastName:$lastName, address:$address,city:$city,phone:$phone,usertype:$usertype}) {
      token
      userId
      usertype
    }
  }
`;

// export const CreateDailyInformation = gql`
//   mutation createDailyInformation($userId: String!, $pluseRate:String!,$weight:String, $bloodPressure:String!,$temperature:String,$respiratoryrate:String, $date:String){
//     createDailyInformation(userId: $userId,pluseRate: $pluseRate,weight:$weight, bloodPressure:$bloodPressure,temperature:$temperature,respiratoryrate:$respiratoryrate,date:$date){
//       success
//     }
//   }
// `;

export const CreateEmergencyAlert = gql`
  mutation createEmergencyAlert($userEmail: String!, $message:String!,$email:String){
    createEmergencyAlert(input:{userEmail: $userEmail,message: $message,email:$email}){
      success
    }
  }
`;

export const CreateDailyMotivationalFeed = gql`
  mutation createDailyMotivationalFeed($title:String,$description:String,$videoURL:String,$date:String){
    createDailyMotivationalFeed(title: $title,description: $description,videoURL:$videoURL,date:$date){
      success
    }
  }
`;
export const EnterVitalInfo = gql`
mutation enterVitalInfo($userEmail:String,$heartRate:String,$weight:String,$bloodPressure:String,$bodyTemperature:String,$date:String,$userId:String){
  enterVitalInfo(input:{userEmail:$userEmail,heartRate:$heartRate,weight:$weight,bloodPressure:$bloodPressure,bodyTemperature:$bodyTemperature,date:$date,userId:$userId}){
    success
  }
}
`;

export const editVitalInfo = gql`
mutation editVitalInfo($_id:ID,$userEmail:String,$heartRate:String,$weight:String,$bloodPressure:String,$bodyTemperature:String,$date:String,$userId:String){
  editVitalInfo(input:{_id:$_id,userEmail:$userEmail,heartRate:$heartRate,weight:$weight,bloodPressure:$bloodPressure,bodyTemperature:$bodyTemperature,date:$date,userId:$userId}){
    success
  }
}
`;
