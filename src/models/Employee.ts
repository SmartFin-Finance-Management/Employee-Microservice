import mongoose, { Schema, Document } from 'mongoose';

interface IEmployee extends Document {
  employee_id: number;
  org_id: number; 
  name: string;
  email: string;
  role: string;
  employee_type: string;
  experience: number;
  lpa: number;
  hourly_rate: number;
  project_id: number;
  project_manager_id: number; 
  attendance: Record<string, string>;
}

// Schema definition
const EmployeeSchema: Schema = new Schema({
  employee_id: {
    type: Number,
    required: true,
    unique: true,
  },
  org_id: {
    type: Number,
    ref: 'Organization',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  employee_type: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  lpa: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  hourly_rate: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  project_id: {
    type: Number,
    ref: 'Project',
    required: false,
  },
  project_manager_id: {
    type: Number,
    ref: 'User',
    required: false,
  },
  attendance: {
    type: Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: false, // Disable automatic timestamps if not needed
});

// Export the model
export default mongoose.model<IEmployee>('Employee', EmployeeSchema);