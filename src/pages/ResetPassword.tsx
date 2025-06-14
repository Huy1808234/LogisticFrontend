import React, { useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import bgImage from "../assets/img/gallery/section_bg02.jpg";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError("Token không hợp lệ hoặc đã hết hạn");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/api/auth/reset-password", {
        token,
        password,
      });

      setMessage(res.data.message);
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Có lỗi xảy ra");
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
          <h3 className="text-center mb-4 fw-bold">Đặt lại mật khẩu</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Mật khẩu mới</label>
              <input
                type="password"
                className="form-control"
                placeholder="Nhập mật khẩu mới"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Xác nhận mật khẩu</label>
              <input
                type="password"
                className="form-control"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100 fw-bold">
              Đặt lại mật khẩu
            </button>
          </form>

          {message && <div className="alert alert-success mt-3">{message}</div>}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
