import mongoose from 'mongoose';
const { Schema, model } = mongoose;

interface IReportGames{
    name: String;
    value: Number;
    date: Date;
}

const reportGamesSchema = new Schema<IReportGames>(
    {
        name: String,
        date: Date,
    },
    {timestamps: true}
);

export const ReportGames = model<IReportGames>('ReportGames', reportGamesSchema);