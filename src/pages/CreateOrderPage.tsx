import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import { AddressSelect } from "../components/AddressSelect";

const CreateOrderPage: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [photoData, setPhotoData] = useState("");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [declaredValue, setDeclaredValue] = useState("");
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<
    number | null
  >(null);

  const [formData, setFormData] = useState({
    receiverName: "",
    receiverPhone: "",
    receiverStreet: "",
    receiverDistrict: "",
    receiverCity: "",
    description: "",
    weight: "",
    height: "",
    width: "",
    length: "",
    extraServices: [] as string[],
    paymentMethod: "",
  });

  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const services = new Set(formData.extraServices);
    checked ? services.add(value) : services.delete(value);
    setFormData({ ...formData, extraServices: Array.from(services) });
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
      setCameraOn(true);
    } catch (err) {
      alert("Không thể mở camera: " + (err as Error).message);
    }
  };

  const capturePhoto = () => {
    if (!canvasRef.current || !videoRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (context) {
      context.drawImage(videoRef.current, 0, 0, 300, 200);
      const dataURL = canvasRef.current.toDataURL("image/png");
      setPhotoData(dataURL);
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setCameraOn(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3001/api/orders",
        {
          ...formData,
          paymentMethod: formData.paymentMethod,
          weight: parseFloat(formData.weight),
          height: parseFloat(formData.height),
          width: parseFloat(formData.width),
          length: parseFloat(formData.length),
          declaredValue: declaredValue ? parseInt(declaredValue) : 0,
          photo: photoData,
        },
        { withCredentials: true }
      );

      const orderCode = res.data.orderCode;
      if (!orderCode)
        return setMessage("Không nhận được mã đơn hàng từ server!");
      formData.paymentMethod === "MoMo"
        ? navigate(`/orders/${orderCode}`)
        : setMessage("Đã tạo đơn hàng thành công!");
    } catch (err: any) {
      setMessage(
        "Lỗi: " + (err.response?.data?.error || "Không gửi được đơn hàng")
      );
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className="mb-4">Tạo Đơn Giao Hàng Mới</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-7">
              <div className="row">
                {[
                  ["receiverName", "Họ tên người nhận"],
                  ["receiverPhone", "SĐT người nhận"],
                ].map(([name, label]) => (
                  <div key={name} className="col-md-6 mb-3">
                    <label className="form-label">{label}</label>
                    <input
                      className="form-control"
                      type="text"
                      name={name}
                      value={formData[name as keyof typeof formData]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}

                <div className="col-md-6 mb-3">
                  <label className="form-label">Tỉnh/Thành phố</label>
                  <AddressSelect.Province
                    onChange={(code, label) => {
                      setSelectedProvinceCode(code);
                      setFormData((prev) => ({
                        ...prev,
                        receiverCity: label,
                        receiverDistrict: "",
                      }));
                    }}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Quận/Huyện</label>
                  <AddressSelect.District
                    provinceCode={selectedProvinceCode ?? 0}
                    onChange={(district) =>
                      setFormData((prev) => ({
                        ...prev,
                        receiverDistrict: district,
                      }))
                    }
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label className="form-label">Số nhà, tên đường</label>
                  <input
                    className="form-control"
                    type="text"
                    name="receiverStreet"
                    value={formData.receiverStreet}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Loại hàng hóa</label>
                  <select
                    name="description"
                    className="form-select"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Chọn loại hàng</option>
                    <option value="Thực phẩm">Thực phẩm</option>
                    <option value="Điện tử">Điện tử</option>
                    <option value="Thời trang">Thời trang</option>
                  </select>
                </div>

                {[
                  ["weight", "Khối lượng (kg)"],
                  ["height", "Chiều cao (cm)"],
                  ["width", "Chiều rộng (cm)"],
                  ["length", "Chiều dài (cm)"],
                ].map(([dim, label]) => (
                  <div key={dim} className="col-md-6 mb-3">
                    <label className="form-label">{label}</label>
                    <input
                      className="form-control"
                      type="number"
                      name={dim}
                      value={formData[dim as keyof typeof formData]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}

                <div className="col-12 mb-3">
                  <label className="form-label">Dịch vụ thêm:</label>
                  <div className="d-flex flex-wrap gap-3">
                    {[
                      "Freight",
                      "Express Delivery",
                      "Insurance",
                      "Packaging",
                    ].map((label) => (
                      <div
                        key={label}
                        className="form-check d-flex align-items-center me-4"
                        style={{ minWidth: "180px" }}
                      >
                        <input
                          type="checkbox"
                          value={label}
                          onChange={handleCheckboxChange}
                          className="form-check-input me-2"
                          id={label}
                        />
                        <label htmlFor={label} className="form-check-label">
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {formData.extraServices.includes("Insurance") && (
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Giá trị đơn hàng (VNĐ)</label>
                    <input
                      className="form-control"
                      type="number"
                      value={declaredValue}
                      onChange={(e) => setDeclaredValue(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="col-12 mb-4">
                  <label className="form-label fw-bold">
                    Phương thức thanh toán:
                  </label>
                  <div className="border rounded p-3">
                    {["MoMo", "ATM", "VISA", "COD"].map((value, i) => {
                      const labels = [
                        "Thanh toán bằng Ví MoMo",
                        "Thanh toán bằng thẻ ATM",
                        "Thanh toán bằng VISA/Master/JCB",
                        "Thanh toán tiền mặt khi giao hàng (COD)",
                      ];
                      const icons = [
                        "https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png",
                        "https://cdn-icons-png.flaticon.com/512/3242/3242257.png",
                        "https://cdn-icons-png.flaticon.com/512/196/196578.png",
                        "https://cdn-icons-png.flaticon.com/512/3523/3523063.png",
                      ];
                      return (
                        <div
                          key={value}
                          className="form-check d-flex align-items-center mb-2"
                        >
                          <input
                            className="form-check-input me-2"
                            type="radio"
                            name="paymentMethod"
                            value={value}
                            checked={formData.paymentMethod === value}
                            onChange={handleChange}
                            required
                          />
                          <img
                            src={icons[i]}
                            alt={value}
                            style={{ width: "30px", marginRight: "15px" }}
                          />
                          <label className="form-check-label">
                            {labels[i]}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="card p-3 shadow-sm">
                <h5 className="fw-bold mb-3">Ảnh đơn hàng (tuỳ chọn):</h5>
                {!cameraOn && (
                  <button
                    type="button"
                    className="btn btn-secondary mb-2"
                    onClick={startCamera}
                  >
                    Mở Camera
                  </button>
                )}
                {cameraOn && (
                  <button
                    type="button"
                    className="btn btn-success mb-2"
                    onClick={capturePhoto}
                  >
                    Chụp ảnh
                  </button>
                )}
                <video
                  ref={videoRef}
                  width="100%"
                  height="auto"
                  autoPlay
                  hidden={!cameraOn}
                />
                <canvas
                  ref={canvasRef}
                  width="300"
                  height="200"
                  style={{ display: "none" }}
                />
                {photoData && (
                  <img
                    src={photoData}
                    alt="Ảnh xem trước"
                    className="img-fluid mt-2 border rounded"
                  />
                )}
              </div>
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-primary w-100">
                Tạo Đơn Hàng
              </button>
            </div>
          </div>
        </form>
        {message && <div className="alert alert-info mt-4">{message}</div>}
      </div>
    </Layout>
  );
};

export default CreateOrderPage;
