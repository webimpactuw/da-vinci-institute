import InputField from "@/components/InputField";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full">
      <form className="flex flex-col justify-center items-center gap-6 w-1/4 p-4 pt-20 pb-20 rounded-4xl bg-[#eaf3fa] text-[#000105] fixed top-[150px] right-[calc(20%)]">
        <h1 className="text-3xl font-semibold mb-3">Create an Account</h1>

        <InputField
          label="Username"
          type="text"
          id="username"
          name="username"
          placeholder="Username"
        />

        <InputField
          label="Password"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />

        <InputField
          label="Confirm Password"
          type="password"
          id="confirm"
          name="confirm"
          placeholder="Confirm Password"
        />

        <button className="bg-[#387333] rounded-4xl p-2 w-1/2 text-white mt-7" type="submit">Sign Up</button>
        <p>Already have an account? <Link className="text-[#387333] font-semibold" href="/login"> Log In</Link>
        </p>
      </form>
    </div>
  );
}
