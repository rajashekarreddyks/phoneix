import connectDB from "@/lib/mongodb";
import Contact from "@/app/models/contact";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { fullname, phonenumber, email, message } = await req.json();
  console.log("Full Name:", fullname);
  console.log("Email:", email);
  console.log("Message:", message);
  console.log('number',phonenumber)

  try {
    await connectDB();
    await Contact.create({ fullname,phonenumber, email, message });
    return NextResponse.json({
      msg: ["Message Sent Successfully"],
      success: true,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      console.log(errorList);
      return NextResponse.json({
        msg: errorList,
      });
    } else {
      return NextResponse.json(error);
    }
  }
}

