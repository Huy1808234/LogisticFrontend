import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../layouts/Layout";
import bgImage from "../assets/img/gallery/section_bg02.jpg";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setError("");
      navigate("/");
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
        "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <Layout>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="card p-4 shadow-lg"
          style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "12px",
            backgroundColor: "#fff",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          }}
        >
          <h3 className="text-center mb-4 fw-bold">Đăng nhập</h3>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                className="form-control"
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Mật khẩu + icon con mắt */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  className="form-control"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    width: "24px",
                    height: "24px",
                    color: "#888",
                  }}
                >
                  {showPassword ? (
                    // SVG: con mắt có gạch (ẩn)
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.253.226-2.451.639-3.563m2.061 3.523A4.978 4.978 0 007 12c0 .898.237 1.742.65 2.473m1.79 1.79A4.978 4.978 0 0012 17c1.326 0 2.526-.522 3.409-1.362M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18" />
                    </svg>
                  ) : (
                    // SVG: con mắt mở (hiện)
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </span>
              </div>
            </div>

            {/* Ghi nhớ đăng nhập */}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Ghi nhớ đăng nhập
              </label>
            </div>

            {/* Nút đăng nhập */}
            <button
              type="submit"
              className="btn btn-warning text-white fw-bold w-100"
            >
              ĐĂNG NHẬP
            </button>
          </form>

          {/* Quên mật khẩu */}
          <div className="text-center mt-3">
            <Link to="/forgot-password" className="text-muted small">
              Quên mật khẩu?
            </Link>
          </div>

          {/* Đăng ký */}
          <div className="text-center mt-2">
            <span className="small">Bạn chưa có tài khoản? </span>
            <Link to="/register" className="small fw-bold text-primary">
              Đăng ký
            </Link>
          </div>

          {/* Thông báo lỗi */}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </div>
    </Layout>
  );
};

export default Login;
