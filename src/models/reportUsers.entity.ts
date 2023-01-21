import mongoose from 'mongoose';
const { Schema, model } = mongoose;

interface IReportUsers{
    value: Number;
    date: Date;
}

const reportUsersSchema = new Schema<IReportUsers>(
    {
        value: Number,
        date: Date,
    },
    {timestamps: true}
);

export const ReportUsers = model<IReportUsers>('ReportUsers', reportUsersSchema);