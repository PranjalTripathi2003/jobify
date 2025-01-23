import "express-async-errors"; // Handles any errors that would occur automatically without manually entering try and catch block everywhere! It will not let the server crash if no catch block is present.
import mongoose, { mongo } from "mongoose";
import day from "dayjs";
import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes"; // We use this library to set HTTP status codes (StatusCodes.{insert the status code})

// GET ALL JOBS, No error handling needed
export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }
  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalJobs = await Job.countDocuments(queryObject); 
  const numOfPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
};

// POST JOB, No error handling needed
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// GET SINGLE JOB, Error handling needed , done in validationMiddleware.js
export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  // In this we provided custom error class, 404 - NotFound
  res.status(StatusCodes.OK).json({ job });
};

// UPDATE JOB, Error handling needed , done in validationMiddleware.js
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
  return res.status(StatusCodes.OK).json({ msg: updatedJob, job: updateJob });
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);

  if (!removedJob) {
    return res.status(404).json({
      msg: `no job with id ${id}`,
    });
  }
  res.status(200).json({
    msg: "job has been deleted",
  });
};

// accumulator object will have the keys as titles : and the counts as the value
// _id variable which would have been destructured from curr, is aliased as title.
// $filteringStage format for the pipeline

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

// export const showStats = async (req, res) => {
//   const defaultStats = {
//     pending: 22,
//     interview: 11,
//     declined: 4,
//   };

//   let monthlyApplications = [
//     {
//       date: 'May 23',
//       count: 12,
//     },
//     {
//       date: 'Jun 23',
//       count: 9,
//     },
//     {
//       date: 'Jul 23',
//       count: 3,
//     },
//   ];
//   res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
// };
