import mongoose from "mongoose";

type ScheduleProps = {
    date: string;
    hour: string;
    name: string;
}

const BagreSchema = new mongoose.Schema<ScheduleProps>({
    date: { type: String, required: true },
    hour: { type: String, required: true },
    name: { type: String, required: true },
}, {
    timestamps: true,
});

export const Bagre = mongoose.model<ScheduleProps>("Bagres", BagreSchema);