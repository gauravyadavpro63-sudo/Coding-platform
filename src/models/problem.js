import mongoose from "mongoose";
import { Schema } from "mongoose";

const problemSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    difficulity:{
        type:String,
        enum:["easy","medium","hard"]
    },
    tag:{
        type:String,
        enum:["array","linkedlist","graph","dp"],
        required:true
    },
    visibleTestCases:[
        {
            input:{
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            },
            explanation:{
                type:String,
                required:true
            }

        }
    ],
        hiddenTestCases:[
        {
            input:{
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            }
        }
    ],
    startcode:[
        {
            language:{
                type:String,
                required:true
            },
            initialCode:{
                type:String,
                required:true
            }
        }
    ],
    problemCreator:{
        type:Schema.Types.ObjectId,
        ref:"user",  //because id can be same in different collection
        required:true
    }

})

const Problem=mongoose.model("problem",problemSchema);
export default Problem