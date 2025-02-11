import { useNavigate } from "react-router-dom";
export default function TopComponnent() {
    const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="flex flex-col items-center justify-center bg-[url('assets/images/home/top.jpeg')] h-130 w-full bg-no-repeat bg-cover bg-center">
          <div className="text-center mb-8">
            <h1 className="font-inter font-bold text-7xl">
              Your wedding team and
              <br />
              everything in between
            </h1>
          </div>
          <div>
            <p className="text-center font-bold mb-0.5">Sign up today!</p>
            <p className="mb-0.5 font-thin">
              By clicking ‘Sign up’, you agree to The Knot's Privacy Policy and
              Terms of Use.
            </p>
            <form>
                <div className="flex">
              <input
                className="border-gray-400 border-2 w-50 h-11 pl-2 mr-3 bg-white hover:border-black"
                type="email"
                placeholder="Email"
              />
              <input
                className="border-gray-400 border-2 w-50 h-11 pl-2 mr-3 bg-white hover:border-black"
                type="password"
                placeholder="Password"
              />
              <Routes>
              <Route path="/signup" element={<RedirectAuthenticatedUser><SignUpPage /></RedirectAuthenticatedUser>} />
              </Routes>
              <button
                className="btn-union" onClick={() => navigate("/signup")}
              >
                Signup
              </button>
              </div>   
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
