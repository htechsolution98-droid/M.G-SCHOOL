import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import {
    createRatingService,
    getAllRatingsService,
    deleteRatingService,
} from "@/services/rating.service";

export const createRatingController = async (req: NextRequest) => {
    try {
        await connectDB();

        const body = await req.json();

        const rating = await createRatingService(body);

        return NextResponse.json(
            {
                success: true,
                message: "Rating submitted successfully",
                data: rating,
            },
            { status: 201 }
        );
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Something went wrong";

        return NextResponse.json(
            {
                success: false,
                message,
            },
            { status: 400 }
        );
    }
};

export const getAllRatingsController = async () => {
    try {
        await connectDB();

        const ratings = await getAllRatingsService();

        return NextResponse.json(
            {
                success: true,
                data: ratings,
            },
            { status: 200 }
        );
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Something went wrong";

        return NextResponse.json(
            {
                success: false,
                message,
            },
            { status: 500 }
        );
    }
};

export const deleteRatingController = async (req: NextRequest) => {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Rating ID is required",
                },
                { status: 400 }
            );
        }

        await deleteRatingService(id);


        return NextResponse.json(
            {
                success: true,
                message: "Rating deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Something went wrong";

        return NextResponse.json(
            {
                success: false,
                message,
            },
            { status: 500 }
        );
    }
};