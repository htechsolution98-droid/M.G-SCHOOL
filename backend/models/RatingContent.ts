import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRating extends Document {
    name: string;
    email: string;
    role: string;
    phone?: string;
    experienceType: string;
    rating: number;
    feedback: string;
}

const ratingSchema = new Schema<IRating>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        role: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
        },

        experienceType: {
            type: String,
            required: true,
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },

        feedback: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Rating: Model<IRating> =
    mongoose.models.Rating ||
    mongoose.model<IRating>("Rating", ratingSchema);

export default Rating;