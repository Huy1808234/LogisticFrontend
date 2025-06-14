import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../layouts/Layout";
import bgImage from "../assets/img/gallery/section_bg02.jpg";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [street, setStreet] = useState("");
  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      setSuccess("");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/api/auth/register", {
        email,
        username,
        password,
        phone,
        street,
        ward,
        district,
        city,
      });

      setSuccess(res.data.message);
      setError("");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      setError(err.response?.data?.error || "Đăng ký thất bại");
      setSuccess("");
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
            maxWidth: "420px",
            borderRadius: "12px",
            backgroundColor: "#fff",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          }}
        >
          <h3 className="text-center mb-4 fw-bold">Đăng ký</h3>
          <form onSubmit={handleSubmit}>
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

            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Tên đăng nhập
              </label>
              <input
                id="username"
                className="form-control"
                type="text"
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Số điện thoại
              </label>
              <input
                id="phone"
                className="form-control"
                type="text"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="street" className="form-label">
                Địa chỉ (số nhà, đường)
              </label>
              <input
                id="street"
                className="form-control"
                type="text"
                placeholder="Nhập địa chỉ"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="ward" className="form-label">
                Phường/Xã
              </label>
              <input
                id="ward"
                className="form-control"
                type="text"
                placeholder="Nhập phường/xã"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="district" className="form-label">
                Quận/Huyện
              </label>
              <input
                id="district"
                className="form-control"
                type="text"
                placeholder="Nhập quận/huyện"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                Tỉnh/Thành phố
              </label>
              <input
                id="city"
                className="form-control"
                type="text"
                placeholder="Nhập tỉnh/thành phố"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <input
                id="password"
                className="form-control"
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Xác nhận mật khẩu
              </label>
              <input
                id="confirmPassword"
                className="form-control"
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary fw-bold w-100">
              ĐĂNG KÝ
            </button>
          </form>

          <div className="text-center mt-3">
            <span className="small">Bạn đã có tài khoản? </span>
            <Link to="/login" className="small fw-bold text-primary">
              Đăng nhập
            </Link>
          </div>

          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {success && <div className="alert alert-success mt-3">{success}</div>}
        </div>
      </div>
    </Layout>
  );
};

export default Register;
