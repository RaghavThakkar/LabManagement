# -*- coding: utf-8 -*-
"""
Created on Fri Dec  3 00:13:30 2021

@author: lhton
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import traceback
import pandas as pd
import joblib
import sys
# Your API definition

"""data_group5_theft_encoded_feature_final_selected = data_group5_theft_encoded_normalized_feature_final[["Premises_Type_Code_Normalized","Bike_Type_Code_Normalized","Bike_Make_Code_Normalized","Latitude_Normalized","Longitude_Normalized","Bike_Speed_Normalized"]]
    
   """



app = Flask(__name__)
CORS(app)
@app.route("/predict", methods=['GET','POST']) #use decorator pattern for the route
def predict():
    if lr:
        try:
            json_ = request.json
            print(json_)
            query = pd.get_dummies(pd.DataFrame(json_))
            query = query.reindex(columns=model_columns, fill_value=0)
            print(query)
            from sklearn import preprocessing
            scaler = preprocessing.StandardScaler()
            # Fit your data on the scaler object
            scaled_df = scaler.fit_transform(query)
            # return to data frame
            query = pd.DataFrame(scaled_df, columns=model_columns)
            print(query)
            prediction = list(lr.predict(query))
            result=''
            for x in prediction:
                if x==0.0:
                    result="false"
                if x==1.0:
                    result="true"

                print(x)
            print({'prediction': str(result)})
            return jsonify({'prediction': str(result)})
            return "Welcome to diabete prediction model API!"

        except:

            return jsonify({'trace': traceback.format_exc()})
    else:
        print ('Train the model first')
        return ('No model here to use')

if __name__ == '__main__':
    try:
        port = int(sys.argv[1]) # This is for a command-line input
    except:
        port = 12345 # If you don't provide any port the port will be set to 12345

    lr = joblib.load('model.pkl') # Load "model.pkl"
    print ('Model loaded')
    model_columns = joblib.load('columns.pkl') # Load "model_columns.pkl"
    print ('Model columns loaded')
    app.run(port=port, debug=True)