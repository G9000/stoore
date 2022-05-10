import { useState, useEffect } from "react";
import { signIn, getSession } from "next-auth/react";
import { Formik, Form, useField, FieldHookConfig } from "formik";
import Image from "next/image";
import * as Yup from "yup";
import { toast } from "react-hot-toast";

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

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

  const signInWithGoogle = () => {
    toast.loading("Redirecting...");
    setDisabled(true);
    signIn("google", {
      callbackUrl: window.location.href,
    });
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
        <button
          disabled={disabled}
          onClick={() => signInWithGoogle()}
          className="h-[45px] w-full mt-8 mx-auto border rounded-md p-2 flex justify-center items-center space-x-2 text-gray-500 hover:text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100 focus:ring-opacity-25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-500 disabled:hover:bg-transparent disabled:hover:border-gray-200 transition-colors"
        >
          <Image src="/google.svg" alt="Google" width={32} height={32} />
          <span>Sign {isSignup ? "up" : "in"} with Google</span>
        </button>
        <Formik
          initialValues={initialValues}
          validationSchema={SignInSchema}
          validateOnBlur={false}
          onSubmit={signInWithEmail}
        >
          {({ isSubmitting, isValid, errors, values }) => (
            <Form className="mt-4">
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                disabled={disabled}
                spellCheck={false}
              />
              <button
                type="submit"
                className="h-[45px] bg-purple-700 rounded-md text-white w-full mt-4 disabled:cursor-not-allowed"
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
      <div className="h-[45px]">
        <input
          {...field}
          placeholder={props.placeholder}
          type={props.type}
          disabled={props.disabled}
          className={
            meta.touched && meta.error
              ? "pl-4 w-full h-full rounded-md border border-red-600 outline outline-offset outline-4 outline-red-100"
              : "pl-4 w-full h-full rounded-md border focus:ring-4 focus:outline-none focus:ring-gray-300 focus:ring-opacity-25"
          }
        />
      </div>

      {meta.touched && meta.error && (
        <div className="text-sm mt-2">{meta.error}</div>
      )}
    </>
  );
};
