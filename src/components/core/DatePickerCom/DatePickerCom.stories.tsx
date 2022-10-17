import * as React from 'react';
// import React from "react";
import { DatePicker } from ".";

export default {
  title: "Date Picker"
};

export const CustomDatePicker = () => (
  <div>
    <DatePicker date={new Date()} />
  </div>
);
