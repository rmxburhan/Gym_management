import { type Document, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { type IMember, memberSchema } from "./member.model";
import { type IStaff, staffSchema } from "./staff.model";
import { type ITrainer, trainerSchema } from "./trainer.model";

export interface IAddress extends Document {
	street: string;
	city: string;
	state: string;
	zip: string;
}

export const addressSchema = new Schema<IAddress>(
	{
		street: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		state: {
			type: String,
			requried: true,
		},
		zip: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: {
			transform: (doc, ret) => {
				ret.id = ret._id;
				ret._id = undefined;
				ret.__v = undefined;
			},
		},
	},
);

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	role: "member" | "trainer" | "admin" | "staff";
	profile?: string;
	memberDetail?: IMember | null;
	staffDetail?: IStaff | null;
	trainerDetail?: ITrainer | null;
	deletedAt?: Date;
	comparePassword: (password: string) => boolean;
}

export interface UserQuery {
	_id?: any;
	name?: any;
	email?: any;
	role?: "member" | "trainer" | "admin" | "staff";
	deletedAt?: any;
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
		role: {
			type: String,
			required: true,
			enum: ["member", "admin", "trainer", "staff"],
			default: "member",
		},
		memberDetail: {
			type: memberSchema,
			required: false,
		},
		trainerDetail: {
			type: trainerSchema,
			required: false,
		},
		staffDetail: {
			type: staffSchema,
			required: false,
		},
		profile: {
			type: String,
			required: false,
		},
		deletedAt: {
			type: Date,
			required: false,
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform: (doc, ret) => {
				ret.id = ret._id;
				ret._id = undefined;
				ret.__v = undefined;
				ret.password = undefined;
			},
			versionKey: false,
			virtuals: true,
		},
	},
);

userSchema.pre("save", function (this: IUser, next) {
	if (this.isModified("password") || this.isNew) {
		bcrypt.genSalt(10, (err, salt) => {
			if (err) return next(err);

			bcrypt.hash(this.password, salt, (err, hash) => {
				if (err) return next(err);

				this.password = hash;
				next();
			});
		});
	} else {
		return next();
	}
});

userSchema.methods.comparePassword = function (
	candidatePassword: string,
): boolean {
	try {
		return bcrypt.compareSync(candidatePassword, this.password);
	} catch (error) {
		throw error;
	}
};

const User = model<IUser>("User", userSchema);
export default User;
