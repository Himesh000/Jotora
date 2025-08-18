import React from "react";
import { Container, Signup as SignupComponent } from "../components";

function Signup() {
  return (
    <div className="min-h-screen py-12 bg-black text-slate-100">
      <Container>
        <div className="max-w-md mx-auto bg-slate-900/50 backdrop-blur rounded-2xl p-8 shadow-lg">
          <SignupComponent />
        </div>
      </Container>
    </div>
  );
}

export default Signup;
