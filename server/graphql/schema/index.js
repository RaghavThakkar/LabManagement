import {buildSchema} from "graphql";

export default buildSchema(
    `
    type User{
        _id:ID!
        email:String!,
        firstName:String!
        lastName:String!
        address:String!
        city:String!
        phone:String!
        usertype:String!
    }
  
    input UserInput{
        email:String,
        firstName:String
        lastName:String
        address:String
        city:String
        phone:String
        usertype:String
        password:String
    }
    type LoginReturnType{
        token:String
        userId:ID
    }
    
   
   input EmergencyAlertInputType{
      userEmail:String,
      message:String,
      email:String
   } 
   
  type Motivational{
    title:String,
    description:String,
    videoURL:String
  }
  
  
  
  input VitalSignsInput{
     userEmail:String,
     heartRate:String,
     bloodPressure:String,
     bodyTemperature:String
   }
   
   type VitalSigns{
     userEmail:String,
     heartRate:String,
     bloodPressure:String,
     bodyTemperature:String
   }
   
   input userInfoInput{
     userEmail:String,
     pluseRate:String,
     weight:String,
     bloodPressure:String,
     temperature:String,
     respiratoryrate:String
   }
    
    type SuccessReturn{
       success:Boolean
    }
  
    type RootMutation{
        registration(userInput:UserInput!):User!
        login(email:String!,password:String!):LoginReturnType!
        updateUser(id:String,input:UserInput!):SuccessReturn
        deleteUserById(id:String):SuccessReturn
        
        createEmergencyAlert(input:EmergencyAlertInputType):SuccessReturn
        createDailyInformation(input:userInfoInput):SuccessReturn
        createDailyMotivationalFeed(title:String,description:String,videoURL:String):SuccessReturn
        enterVitalInfo(input:VitalSignsInput):SuccessReturn
    }
    type RootQuery{
     
        users:[User]!
      
        userById(id:String):User
        vitalInfoList:[VitalSigns]
        motivationalList:[Motivational]
        userByType(type:String):[User]
    }
    
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`)