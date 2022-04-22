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
        usertype:String
    }
    
   
   input EmergencyAlertInputType{
      userEmail:String,
      message:String,
      email:String
   } 
   
  type Motivational{
    title:String,
    description:String,
    videoURL:String,
    date:String
  }
  
  
  
  input VitalSignsInput{
     userId:String,
     userEmail:String,
     heartRate:String,
     bloodPressure:String,
     bodyTemperature:String,
     weight:String,
   }
   
   type VitalSigns{
     weight:String,
     userId:String,
     userEmail:String,
     heartRate:String,
     bloodPressure:String,
     bodyTemperature:String,
     date:String,
     _id:ID
   }

   input EditSignsInput{
    userEmail:String,
    heartRate:String,
    bloodPressure:String,
    bodyTemperature:String,
    date:String,
    userId:String,
    weight:String,
    _id:ID
  }
   
   input userInfoInput{
    
     userEmail:String,
     pluseRate:String,
     weight:String,
     bloodPressure:String,
     temperature:String,
     respiratoryrate:String,
     date:String
   }
    
    type SuccessReturn{
       success:Boolean
    }
  
    type RootMutation{ 
        registration(userInput:UserInput!):LoginReturnType!
        login(email:String!,password:String!):LoginReturnType!
        updateUser(id:String,input:UserInput!):SuccessReturn
        deleteUserById(id:String):SuccessReturn
        
        createEmergencyAlert(input:EmergencyAlertInputType):SuccessReturn
        createDailyInformation(input:userInfoInput):SuccessReturn
        createDailyMotivationalFeed(title:String,description:String,videoURL:String,date:String):SuccessReturn
        enterVitalInfo(input:VitalSignsInput):SuccessReturn
        editVitalInfo(input:EditSignsInput):SuccessReturn
    }
    type RootQuery{
     
        users:[User]!
      
        userById(id:String):User
        vitalInfoList:[VitalSigns]
        motivationalList:[Motivational]
        userByType(type:String):[User]
        vitalInfoByID(id:String):VitalSigns
        vitalInfoByUserId(userId:String):[VitalSigns]
    }
    
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`)