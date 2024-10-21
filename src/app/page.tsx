"use client"
import { useState } from "react";
import Modal from "@/app/components/modal";
import Button from "@/app/components/buttons";
import Link from "next/link";
import Line from "@/app/components/line";
import Logo from "@/app/components/logox";
import { loginUser, registerUser } from "@/app/libs/actions"; // This line should now work
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// ... rest of the code ...

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'signIn' | 'signUp' | 'googleAccount' | 'appleAccount' | 'createAccount' | 'forgotPassword' | null>(null);

  const openModal = (type: 'signIn' | 'signUp' | 'googleAccount' | 'appleAccount' | 'createAccount' | 'forgotPassword') => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
  };

  // State register
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // call function for register
    alert('Register successful!');
    registerUser(name, username, email, password);

    // reset form
    setName('');
    setUsername('');
    setEmail('');
    setPassword('');

    // close modal
    closeModal();

  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const isLoggedIn = await loginUser(email, password);
    if (isLoggedIn) {
      const session = JSON.parse(localStorage.getItem("session") || "{}");
      document.cookie = `session=${JSON.stringify({ isLoggedIn: true, userId: session.userId })}; path=/;`;
      router.push('/home'); // redirect to home page
      alert("Login successful!");
    } else {
      alert("Invalid email or password");
    }
  };

  // Redirect to home page if session exists
  useEffect(() => {
    const session = document.cookie.split('; ').find(row => row.startsWith('session='));
    if (session) {
      router.push('/home'); // redirect to home page
    }
  }, [router]);



  return (
    <>
      <main className="w-full px-12 py-12 md:px-24 lg:flex lg:justify-between">
        {/* Left column */}
        <div className="flex items-center justify-start lg:justify-center lg:w-1/2">
          <Logo className="w-[30px] lg:w-[250px]" />
        </div>

        {/* Right coloumn */}
        <div className="flex flex-col w-full lg:w-1/2">
          <p className="text-5xl font-bold mb-8 my-12 md:text-7xl">Happening now</p>

          <div className="w-full sm:w-9/12 md:w-9/12 lg:w-9/12">
            <div className="w-9/12">
              <div className="flex flex-col justify-center gap-2.5">
                <p className="text-3xl font-bold mb-4">Join today.</p>

                {/* Google button */}
                <Button
                  onClick={() => openModal('googleAccount')}
                  icon="google"
                  bgColor="bg-white"
                  textColor="text-black"
                  hoverColor="hover:bg-gray-200"
                  customClass="px-5 py-2.5"
                >
                  Sign up with Google
                </Button>

                {/* Apple button */}
                <Button
                  onClick={() => openModal('appleAccount')}
                  icon="apple"
                  bgColor="bg-white"
                  textColor="text-black"
                  hoverColor="hover:bg-gray-200"
                  customClass="px-5 py-2.5"
                >
                  Sign up with Apple
                </Button>

              </div>

              <Line />

              {/* Create account button */}
              <Button
                onClick={() => openModal('createAccount')}
                textColor="text-white"
                bgColor="bg-customColor"
                hoverColor="hover:bg-blue-500"
                customClass="px-5 py-2.5 w-full"
              >
                Create account
              </Button>

              <p className="text-gray-500 text-xs mt-2">
                By signing up, you agree to the{" "}
                <Link href="#" className="text-customColor hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-customColor hover:underline">
                  Privacy Policy
                </Link>
                , including{" "}
                <Link href="#" className="text-customColor hover:underline">
                  Cookie Use
                </Link>
                .
              </p>

              <div className="mt-12">
                <p className="text-white text-md font-bold my-6">Already have an account?</p>
                <Button
                  onClick={() => openModal('signIn')}
                  textColor="text-customColor"
                  hoverColor="hover:bg-gray-900"
                  borderColor="border border-gray-600"
                  customClass="px-5 py-2.5 w-full"
                >
                  Sign in
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>

        {/* Modal google account */}
        {modalType === 'googleAccount' && (
          <div className="w-full flex items-center justify-center">
            <h2 className="text-2xl font-bold mb-8 mt-12">Sign in with your Google account</h2>
          </div>
        )}

        {/* Modal apple account */}
        {modalType === 'appleAccount' && (
          <div className="w-full flex items-center justify-center">
            <h2 className="text-2xl font-bold mb-8 mt-12">Sign in with your Apple account</h2>
          </div>
        )}

        {/* Modal forgot password */}
        {modalType === 'forgotPassword' && (
          <div className="w-full flex items-center justify-center">
            <div className="w-full md:w-9/12">
              <h2 className="text-2xl font-bold mb-8 mt-12">Find your X account</h2>

              <div className="flex flex-col justify-center gap-6">
                <p className="text-gray-500">
                  Enter the email, phone number, or username associated with your account to change your password.
                </p>
                <input
                  type="text"
                  placeholder="Email, phone number, or username"
                  className="w-full p-4 border bg-black border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-customColor"
                />
              </div>
              <div className="mt-12">

                {/* Next button */}
                <Button
                  bgColor="bg-white"
                  textColor="text-black"
                  hoverColor="hover:bg-gray-200"
                  customClass="px-5 py-2.5 w-full"
                >
                  Next
                </Button>

              </div>
            </div>
          </div>
        )}


        {/* Modal sign up */}
        {modalType === 'signUp' && (
          <div className="w-full flex items-center justify-center">
            <div className="w-full md:w-9/12">
              <h2 className="text-2xl font-bold mb-8 mt-12">Join X today</h2>

              <div className="flex flex-col justify-center gap-6">
                <div className="flex flex-col justify-center gap-6">

                  {/* Google button */}
                  <Button
                    onClick={() => openModal('googleAccount')}
                    icon="google"
                    bgColor="bg-white"
                    textColor="text-black"
                    hoverColor="hover:bg-gray-200"
                    customClass="px-5 py-2.5"
                  >
                    Sign up with Google
                  </Button>

                  {/* Apple button */}
                  <Button
                    onClick={() => openModal('appleAccount')}
                    icon="apple"
                    bgColor="bg-white"
                    textColor="text-black"
                    hoverColor="hover:bg-gray-200"
                    customClass="px-5 py-2.5"
                  >
                    Sign up with Apple
                  </Button>

                </div>
              </div>

              <Line />

              <div className="flex flex-col justify-center gap-6">

                {/* Create account button */}
                <Button
                  onClick={() => openModal('createAccount')}
                  bgColor="bg-white"
                  textColor="text-black"
                  hoverColor="hover:bg-gray-200"
                  customClass="px-5 py-2.5"
                >
                  Create account
                </Button>

                <p className="text-gray-500 text-xs">
                  By signing up, you agree to the{" "}
                  <Link href="#" className="text-customColor hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-customColor hover:underline">
                    Privacy Policy
                  </Link>
                  , including{" "}
                  <Link href="#" className="text-customColor hover:underline">
                    Cookie Use
                  </Link>
                  .
                </p>
              </div>

              <div className="my-12">
                <p className="text-gray-500">
                  Have an account already?{" "}
                  <button
                    onClick={() => openModal('signIn')}
                    className="text-customColor hover:underline">
                    Log in
                  </button>
                </p>
              </div>

            </div>
          </div>
        )}

        {/* Modal create account */}
        {modalType === 'createAccount' && (
          <div className="w-full flex items-center justify-center">
            <div className="w-full md:w-9/12">
              <h2 className="text-2xl font-bold mb-8 mt-12">Create your account</h2>

              <form onSubmit={handleRegister}>
                <div className="flex flex-col justify-center gap-6">
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-4 border bg-black border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-customColor"
                  />

                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-4 border bg-black border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-customColor"
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 border bg-black border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-customColor"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 border bg-black border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-customColor"
                  />

                  {/* <div>
                    <p className="text-white text-md">Date of birth</p>
                    <p className="text-gray-500 text-xs my-2">
                      This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.
                    </p>
                    <div className="flex flex-row space-x-4">
                      <input
                        type="text"
                        placeholder="Month"
                        className="w-1/3 p-4 border bg-black border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-customColor"
                      />
                      <input
                        type="text"
                        placeholder="Day"
                        className="w-1/3 p-4 border bg-black border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-customColor"
                      />
                      <input
                        type="text"
                        placeholder="Year"
                        className="w-1/3 p-4 border bg-black border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-customColor"
                      />

                    </div>
                  </div> */}

                  <div className="mt-8">

                    {/* Next button */}
                    <Button
                      type="submit"
                      bgColor="bg-white"
                      textColor="text-black"
                      hoverColor="hover:bg-gray-200"
                      customClass="px-5 py-2.5 w-full"
                    >
                      Register
                    </Button>

                  </div>

                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal sign in */}
        {modalType === 'signIn' && (
          <div className="w-full flex items-center justify-center">
            <div className="w-full md:w-9/12">
              <h2 className="text-2xl font-bold mb-8 mt-12">Sign in to X</h2>
              <div className="flex flex-col justify-center gap-6">

                {/* Google button */}
                <Button
                  onClick={() => openModal('googleAccount')}
                  icon="google"
                  bgColor="bg-white"
                  textColor="text-black"
                  hoverColor="hover:bg-gray-200"
                  customClass="px-5 py-2.5"
                >
                  Sign up with Google
                </Button>

                {/* Apple button */}
                <Button
                  onClick={() => openModal('appleAccount')}
                  icon="apple"
                  bgColor="bg-white"
                  textColor="text-black"
                  hoverColor="hover:bg-gray-200"
                  customClass="px-5 py-2.5"
                >
                  Sign up with Apple
                </Button>

              </div>

              <Line />

              <div className="flex flex-col justify-center gap-6">
                <form onSubmit={handleLogin}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 border bg-black border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-customColor"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full my-4 p-4 border bg-black border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-customColor"
                  />

                  {/* Next button */}
                  <Button
                    type="submit"
                    bgColor="bg-white"
                    textColor="text-black"
                    hoverColor="hover:bg-gray-200"
                    customClass="px-5 py-2.5 w-full"
                  >
                    Log in
                  </Button>
                </form>

                {/* Forgot password button */}
                <Button
                  onClick={() => openModal('forgotPassword')}
                  bgColor="bg-black"
                  textColor="text-white"
                  borderColor="border border-slate-500"
                  customClass="px-5 py-2.5"
                >
                  Forgot password?
                </Button>
              </div>

              <div className="mt-4">
                <p className="text-gray-500">
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={() => openModal('signUp')}
                    className="text-customColor hover:underline">
                    Sign up
                  </button>
                </p>
              </div>

            </div>
          </div>
        )}

      </Modal>

    </>
  );
}
