// import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import "./App.css";
import { SubmitHandler, useForm } from "react-hook-form";

/**
 * !Why do we need react hook form?
 * ->
 * As we add more form fields it gets difficult to track all the field value, and manage errors.
 */

/**
 * !Zod: Is a schema validation library. 
 */
//Using Zod for validation:
import { z } from "zod";

//Zod validation Schema :
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

/**
 FormField type: 
 * 
 type FormFields = {
  email: string;
  password: string;
};
*/
type FormFields = z.infer<typeof schema>;
function App() {
  const {
    register,
    handleSubmit, //A Callback function to be passed in onSubmit. Takes callback and passes form data through it.
    // setError, //Can set errors manually
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    //?Adding default values:
    defaultValues: {
      email: "test@email.com",
    },
    resolver: zodResolver(schema),
  });

  // A function to handle the form submission: 
  //?Here, we don't get the form event object rather we directly get the formdata. 

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      //Simulating delay to check loading state. 
      await new Promise((resolve) => setTimeout(resolve, 2000));
      //!Simulating an error
      // throw new Error();
      console.log(data);
    } catch (error) {
      console.log(
        "🚀 ~ App.tsx:31 ~ const onSubmit:SubmitHandler<FormFields>= ~ error:",
        error
      );
      /**
       //!set errors manually after submitting the form:
       * 
       setError("email", {
        message: "This email is already taken!",
      });
      */
    }
  };
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <input
      //!need to connect a form field with the form through the register method. 
        {...register(
          "email"
          /**
           //Manual validation:
          * 
         {
          required: "Email is required!",
          validate: (value) => {
            if (!value.includes("@")) {
              return "Please use a valid email!";
            }
          },
        }
        */
        )}
        type="text"
        placeholder="Email"
      />
      {/* Handling form field errors: */}
      {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      <input
        {...register("password", {
          // required: true, //?Can pass a boolean as well. But if you want to display a message then pass a message instead.
          required: "Password is required!",
          minLength: {
            value: 8,
            message: "Password must have at least 9 chars.",
          },
        })}
        type="password"
        placeholder="Password"
      />

      {errors.password && (
        <p style={{ color: "red" }}>{errors.password.message}</p>
      )}
      {/* Using isSubmitting boolean from the formState:  */}
      <button type="submit">{isSubmitting ? "Loading..." : "Submit"}</button>
    </form>
  );
}

//? basic form example in react: 
// function BasicForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState<{ email: string; password: string }>({
//     email: "",
//     password: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     setErrors({ email: "", password: "" });

//     //Manual validation
//     if (!email.includes("@")) {
//       setErrors({ ...errors, email: "email must include @." });
//     }
//     if (password.length < 8) {
//       setErrors({ ...errors, password: "Password must be at least 8 chars." });
//     }

//     //Form submitted
//     console.log("Form submitted!");
//   };
//   return (
//     <>
//       <form action="" onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             name="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </>
//   );
// }

export default App;
