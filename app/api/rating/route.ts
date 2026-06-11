import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';
import {
    createRatingController,
    getAllRatingsController,
    deleteRatingController,
} from "@/backend/controllers/rating.controller";

export async function GET() {
    return getAllRatingsController();
}

export async function POST(req: NextRequest) {
    return createRatingController(req);
}

export async function DELETE(req: NextRequest) {
    return deleteRatingController(req);
}
