import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const OrderThankYouPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const rawOrderId = query.get("orderId") ?? "";
  const orderId = rawOrderId.split(",")[0].trim(); // fix trường hợp orderId lặp

  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );
  const [debugInfo, setDebugInfo] = useState<string>("");

  useEffect(() => {
    const fetchStatus = async () => {
      if (!orderId) {
        setDebugInfo(" orderId is missing or malformed.");
        return setStatus("failed");
      }

      try {
        console.log(" Đang kiểm tra đơn hàng:", orderId);
        const res = await axios.get(
          `http://localhost:3001/api/orders/detail/${orderId}`
        );
        console.log(" Phản hồi từ server:", res.data);

        const paymentStatus = res.data?.Payment_status?.trim();

        if (paymentStatus === "Đã thanh toán") {
          setStatus("success");
          setDebugInfo(" Payment_status = Đã thanh toán");
          setTimeout(() => {
            navigate(`/orders/${orderId}`);
          }, 2000);
        } else {
          setStatus("failed");
          setDebugInfo(` Payment_status = ${paymentStatus}`);
        }
      } catch (err: any) {
        console.error(" Lỗi lấy trạng thái đơn hàng:", err);
        setDebugInfo(" Lỗi gọi API hoặc đơn hàng không tồn tại.");
        setStatus("failed");
      }
    };

    fetchStatus();
  }, [orderId, navigate]);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2> Kết quả thanh toán</h2>
      <p>
        {" "}
        Mã đơn hàng: <strong>{orderId || "Không có"}</strong>
      </p>

      {status === "loading" && (
        <p style={{ color: "gray" }}> Đang kiểm tra trạng thái đơn hàng...</p>
      )}

      {status === "success" && (
        <>
          <h3 style={{ color: "green" }}> Thanh toán thành công!</h3>
          <p>Đang chuyển đến trang chi tiết đơn hàng...</p>
        </>
      )}

      {status === "failed" && (
        <>
          <h3 style={{ color: "red" }}> Giao dịch thất bại!</h3>
          <p>Vui lòng kiểm tra lại hoặc thử thanh toán lại sau.</p>
        </>
      )}
    </div>
  );
};

export default OrderThankYouPage;
