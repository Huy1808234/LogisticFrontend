import React, { useState } from "react";
import axios from "axios";
import bgImage from "../assets/img/gallery/section_bg02.jpg";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fromAddress: "",
    toAddress: "",
    weight: "",
    height: "",
    width: "",
    length: "",
    freightType: "",
    extraServices: [] as string[],
  });

  const [declaredValue, setDeclaredValue] = useState(""); // Thêm state cho giá trị đơn hàng

  const [result, setResult] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const current = new Set(prev.extraServices); // Sử dụng Set để quản lý dịch vụ dễ hơn
      checked ? current.add(value) : current.delete(value);
      return {
        ...prev,
        extraServices: Array.from(current),
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        width: parseFloat(formData.width),
        length: parseFloat(formData.length),
        // Thêm declaredValue vào payload nếu dịch vụ "Insurance" được chọn
        ...(formData.extraServices.includes("Insurance") && {
          declaredValue: declaredValue ? parseFloat(declaredValue) : 0,
        }),
      };

      const response = await axios.post(
        "http://localhost:3001/api/shipping/calculate",
        payload,
        {
          withCredentials: true,
        }
      );
      setResult(response.data.total);
    } catch (error) {
      console.error("Failed to calculate shipping:", error);
      setResult(null);
    }
  };

  return (
    <section
      className="contact-form-area"
      style={{
        backgroundImage: `url(${bgImage})`,
        paddingTop: "115px",
        paddingBottom: "120px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* CSS được nhúng trực tiếp trong JSX */}
      <style>
        {`
          .contact-form-wrapper {
            background: #fff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          .section-tittle span {
            color: #ff5e14;
            font-weight: 600;
          }
          .section-tittle h2 {
            font-size: 32px;
            font-weight: bold;
            color: #1c1c1c;
          }
          .input-form input,
          .input-form select {
            width: 100%;
            padding: 15px 20px;
            border: 1px solid #e5e5e5;
            border-radius: 5px;
            margin-bottom: 20px;
            font-size: 16px;
            background-color: #f8f8f8;
          }
          /* Thêm style cho trường input giá trị đơn hàng nếu cần chỉnh khác */
          .input-form input[name="declaredValue"] {
            margin-bottom: 20px; /* Có thể điều chỉnh nếu cần */
          }

          .radio-wrapper {
            margin-top: 10px;
            margin-bottom: 30px;
          }
          .select-radio {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-top: 10px;
          }
          .radio-label {
            display: flex;
            align-items: center;
            font-weight: 400;
            color: #555;
            cursor: pointer;
          }
          /* CSS cho checkbox nhỏ hơn - đã giữ nguyên */
          .radio-label input[type="checkbox"] {
            width: auto !important;
            margin-right: 8px !important;
            margin-bottom: 0 !important;
            transform: scale(0.8) !important;
            vertical-align: middle !important;
            margin-left: 0 !important;
          }
          .submit-btn {
            background-color: #ff5e14;
            color: white;
            font-weight: 600;
            padding: 15px 30px;
            border: none;
            border-radius: 5px;
            width: 100%;
            transition: 0.3s;
          }
          .submit-btn:hover {
            background-color: #e24e0f;
          }
          .result-display {
            text-align: center;
            margin-top: 20px;
          }
          .result-text {
            color: #ff5e14;
            font-weight: bold;
          }
        `}
      </style>

      <div className="container">
        <div className="row justify-content-end">
          <div className="col-xl-8 col-lg-9">
            <div className="contact-form-wrapper">
              <div className="section-tittle mb-50">
                <span>Get A Quote For Free</span>
                <h2>Request A Free Quote</h2>
                <p>
                  Brook presents your services with flexible, convenient and
                  compose layouts. You can select your favorite layouts &
                  elements for.
                </p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="row">
                  {/* From + To */}
                  <div className="col-lg-6 col-md-6">
                    <div className="input-form">
                      <input
                        type="text"
                        name="fromAddress"
                        placeholder="From Address"
                        onChange={handleChange}
                        value={formData.fromAddress}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="input-form">
                      <input
                        type="text"
                        name="toAddress"
                        placeholder="To Address"
                        onChange={handleChange}
                        value={formData.toAddress}
                      />
                    </div>
                  </div>

                  {/* Freight Type */}
                  <div className="col-lg-12">
                    <div className="input-form">
                      <select
                        name="freightType"
                        onChange={handleChange}
                        value={formData.freightType}
                      >
                        <option value="">Freight Type</option>
                        <option value="Thực phẩm">Thực phẩm</option>
                        <option value="Điện tử">Điện tử</option>
                        <option value="Thời trang">Thời trang</option>
                      </select>
                    </div>
                  </div>

                  {/* Weight + Dimensions */}
                  <div className="col-lg-6 col-md-6">
                    <div className="input-form">
                      <input
                        type="text"
                        name="weight"
                        placeholder="Weight (kg)"
                        onChange={handleChange}
                        value={formData.weight}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="input-form">
                      <input
                        type="text"
                        name="height"
                        placeholder="Height (cm)"
                        onChange={handleChange}
                        value={formData.height}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="input-form">
                      <input
                        type="text"
                        name="width"
                        placeholder="Width (cm)"
                        onChange={handleChange}
                        value={formData.width}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="input-form">
                      <input
                        type="text"
                        name="length"
                        placeholder="Length (cm)"
                        onChange={handleChange}
                        value={formData.length}
                      />
                    </div>
                  </div>

                  {/* Extra Services (checkbox) */}
                  <div className="col-lg-12">
                    <div className="radio-wrapper">
                      <label>
                        <strong>Extra services:</strong>
                      </label>
                      <div className="select-radio">
                        {[
                          "Freight",
                          "Express Delivery",
                          "Insurance",
                          "Packaging",
                        ].map((label, index) => (
                          <label key={index} className="radio-label">
                            <input
                              type="checkbox"
                              value={label}
                              onChange={handleCheckboxChange}
                              checked={formData.extraServices.includes(label)}
                            />
                            {label}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* New: Display declaredValue input if "Insurance" is selected */}
                  {formData.extraServices.includes("Insurance") && (
                    <div className="col-lg-12">
                      <div className="input-form">
                        <label className="form-label">
                          Giá trị đơn hàng (VNĐ)
                        </label>
                        <input
                          type="number" // Sử dụng type="number" cho giá trị
                          name="declaredValue"
                          placeholder="Nhập giá trị đơn hàng"
                          value={declaredValue}
                          onChange={(e) => setDeclaredValue(e.target.value)}
                          required // Có thể thêm required nếu bắt buộc khi chọn bảo hiểm
                        />
                      </div>
                    </div>
                  )}

                  {/* Submit + Result */}
                  <div className="col-lg-12">
                    <button className="submit-btn" type="submit">
                      Request a Quote
                    </button>

                    {result !== null && (
                      <div className="result-display">
                        <h4 className="result-text">
                          Tổng phí vận chuyển: {result.toLocaleString()} VNĐ
                        </h4>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
