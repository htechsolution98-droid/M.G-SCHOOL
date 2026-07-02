import Rating, { IRating } from "@/models/RatingContent";

export interface CreateRatingInput {
    name: string;
    email: string;
    role: string;
    phone?: string;
    experienceType: string;
    rating: number;
    feedback: string;
}

export const createRatingService = async (
    data: CreateRatingInput
): Promise<IRating> => {
    const { name, email, role, experienceType, rating, feedback } = data;

    if (!name || !email || !role || !experienceType || !rating || !feedback) {
        throw new Error("All required fields are required");
    }

    if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5");
    }

    const newRating = await Rating.create(data);

    return newRating;
};

export const getAllRatingsService = async (): Promise<IRating[]> => {
    return await Rating.find().sort({ createdAt: -1 });
};

export const deleteRatingService = async (id: string): Promise<any> => {
    return await Rating.findByIdAndDelete(id);
};

export const updateRatingService = async (
    id: string,
    data: Partial<IRating>
): Promise<IRating | null> => {
    return await Rating.findByIdAndUpdate(id, data, { new: true });
};
