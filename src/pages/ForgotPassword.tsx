import React, { useState } from "react";
import axios from "axios";
import Layout from "../layouts/Layout";
import bgImage from "../assets/img/gallery/section_bg02.jpg";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/auth/forgot-password", { email });
      setMessage("Đã gửi email đặt lại mật khẩu! Vui lòng kiểm tra hộp thư.");
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Có lỗi xảy ra.");
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
          <h3 className="text-center mb-4 fw-bold">Quên mật khẩu</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Nhập email đã đăng ký"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-warning w-100 fw-bold text-white">
              GỬI EMAIL ĐẶT LẠI MẬT KHẨU
            </button>
          </form>

          {message && <div className="alert alert-success mt-3">{message}</div>}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
