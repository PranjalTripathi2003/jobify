import { Router } from "express";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobController.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

const router = Router();

// Importing the functions from the controller to use them in the routing

// Chaining syntax allows defining multiple route handlers in a single statement.
// This reduces repetition and improves readability.
// POST method uses validation middleware before createJob function
// PATCH method uses validation middleware before updateJob function
// DELETE method uses validation middleware before deleteJob function
// GET method for fetching single job uses validation middleware before getJob function
router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route('/stats').get(showStats)

router
  .route("/:id")
  .get(validateIdParam, getJob)
  .patch(checkForTestUser, validateIdParam, validateJobInput, updateJob)
.delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
