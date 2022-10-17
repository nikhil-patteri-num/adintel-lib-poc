import * as React from 'react';
// import React from "react";
import { Button, buttonVariant } from "./Button";

export default {
  title: "Button Component"
};

export const PrimaryButton = () => (
  <div>
    <Button variant={buttonVariant.primary}>Submit</Button>
  </div>
);

export const SecondaryButton = () => (
    <div>
      <Button variant={buttonVariant.secondary}>Submit</Button>
    </div>
  );