import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { Formik, Form, useField, FieldHookConfig } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("This field is required"),
});

interface FormType {
  email: string;
}

const AuthView = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isSignup, setIsSignup] = useState<boolean>(true);

  const initialValues: FormType = { email: "" };

  const signInWithEmail = async ({ email }: FormType) => {
    let toastId;
    try {
      toastId = toast.loading("Loading...");
      setDisabled(true);
      const { error }: any = await signIn("email", {
        redirect: false,
        callbackUrl: window.location.href,
        email,
      });
      if (error) {
        throw new Error(error);
      }
      toast.dismiss(toastId);
    } catch (err) {
      toast.error("Sign up failed", { id: toastId });
    } finally {
      toast.success("Sign up successful", { id: toastId });
      setDisabled(false);
    }
  };

  // clear toast
  useEffect(() => {
    toast.dismiss();
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-screen px-4">
      <div className="max-w-[325px] w-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="mt-2">Take control of your item now</p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={SignInSchema}
          validateOnBlur={false}
          onSubmit={signInWithEmail}
        >
          {({ isSubmitting, isValid, errors, values }) => (
            <Form>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                disabled={disabled}
                spellCheck={false}
              />
              <button
                type="submit"
                className="h-[45px] bg-purple-700 text-white w-full mt-4 disabled:cursor-not-allowed"
                disabled={disabled || !isValid}
              >
                {isSubmitting ? "Loading..." : `Sign ${isSignup ? "up" : "in"}`}
              </button>
              {isSignup ? (
                <div className="mt-4 text-sm text-gray-500 text-center">
                  Already have an account?{" "}
                  <button
                    type="button"
                    disabled={disabled}
                    className="text-purple-700 font-semibold disabled:cursor-not-allowed"
                    onClick={() => setIsSignup(false)}
                  >
                    Log in
                  </button>
                </div>
              ) : (
                <div className="mt-4 text-sm text-gray-500 text-center">
                  Don&#39;t have an account yet?{" "}
                  <button
                    type="button"
                    disabled={disabled}
                    className="text-purple-700 font-semibold disabled:cursor-not-allowed"
                    onClick={() => setIsSignup(true)}
                  >
                    Sign up
                  </button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AuthView;

const Input = (props: FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="h-[45px] mt-6">
        <input
          {...field}
          placeholder={props.placeholder}
          type={props.type}
          disabled={props.disabled}
          className={
            meta.touched && meta.error
              ? "pl-4 w-full h-full border border-red-600 outline outline-offset outline-4 outline-red-100"
              : "pl-4 w-full h-full border focus:outline outline-offset outline-4 outline-gray-100"
          }
        />
      </div>

      {meta.touched && meta.error && (
        <div className="text-sm mt-2">{meta.error}</div>
      )}
    </>
  );
};
