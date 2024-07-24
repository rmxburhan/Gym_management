import { Document, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUserMembership } from "./UserMembership";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  gender: string;
  image: string;
  address: any;
  role: string;
  deletedAt?: Date;
  membershipDetail?: IUserMembership[];
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      index: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    image: {
      type: String,
      required: true,
      default: "default/profile.png",
    },
    address: {
      type: String,
      required: function (this: IUser) {
        console.log(this.role);
        this.role !== "admin";
      },
    },
    role: {
      type: String,
      required: true,
      enum: ["member", "admin", "employee"],
      default: "member",
    },
    deletedAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

userSchema.virtual("employeeDetail", {
  ref: "EmployeeDetail",
  localField: "_id",
  foreignField: "employeeId",
});

userSchema.virtual("memberDetail", {
  ref: "MemberDetail",
  localField: "_id",
  foreignField: "memberId",
});

userSchema.virtual("membershipDetail", {
  ref: "UserMembership",
  localField: "_id",
  foreignField: "memberId",
});

userSchema.pre("save", function (this: IUser, next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

const User = model<IUser>("User", userSchema);
export default User;
