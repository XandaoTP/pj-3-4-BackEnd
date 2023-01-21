import mongoose from 'mongoose';
const { Schema, model } = mongoose;

interface IReportPlataform{
    name: String;
    value: Number;
    date: Date;
}

const reportPlataformSchema = new Schema<IReportPlataform>(
    {
        name: String,
        value: Number
    },
    {timestamps: true}
);

export const ReportPlataform = model<IReportPlataform>('ReportPlataform', reportPlataformSchema);