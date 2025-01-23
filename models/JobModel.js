import mongoose from "mongoose";
import { JOB_STATUS } from "../utils/constants.js";
import { JOB_TYPE } from "../utils/constants.js";
import { JOB_SORT_BY } from "../utils/constants.js";

// Creating the schema that mongoose expects and uses to create a document in the collection. The collection name is specified in the export statement.
// Schema fields are defined as JavaScript objects.
const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },

    jobLocation: {
      type: String,
      default: "my city",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },

  // This snippet will create createdAt and updatedAt as key with dates as values
  {
    timestamps: true,
  }
);
// JobSchema is exported as a model named "Job" using the mongoose.model() method.
export default mongoose.model("Job", JobSchema);
