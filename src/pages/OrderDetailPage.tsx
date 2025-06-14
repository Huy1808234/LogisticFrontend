import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../layouts/Layout";

const OrderDetailPage: React.FC = () => {
  const { code } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [hasPaid, setHasPaid] = useState(false);

  const fetchOrder = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/orders/detail/${code}`,
        { withCredentials: true }
      );
      setOrder(res.data);
    } catch (err) {
      console.error("Lỗi lấy chi tiết đơn hàng:", err);
    }
  }, [code]);

  const paymentStatus = order?.Payment_status;

  useEffect(() => {
    fetchOrder();

    const interval = setInterval(() => {
      if (!paymentStatus || paymentStatus !== "Đã thanh toán") {
        fetchOrder();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [fetchOrder, paymentStatus]);

  useEffect(() => {
    if (paymentStatus === "Đã thanh toán") {
      setHasPaid(true);
      const timer = setTimeout(() => setHasPaid(false), 4000);
      return () => clearTimeout(timer);
    } else {
      setHasPaid(false);
    }
  }, [paymentStatus]);

  const handleMomoPayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/momo/create",
        {
          orderId: order.Order_code,
          amount: Number(order.Ship_cost),
        },
        { withCredentials: true }
      );

      if (response.data?.payUrl) {
        window.location.href = response.data.payUrl;
      } else {
        alert("Không lấy được đường dẫn thanh toán MoMo.");
      }
    } catch (err: any) {
      alert(
        "Lỗi thanh toán MoMo:\n" +
          JSON.stringify(err?.response?.data || err.message)
      );
    }
  };

  const handleCancelOrder = async () => {
    const confirmCancel = window.confirm("Bạn có chắc muốn huỷ đơn hàng này?");
    if (!confirmCancel) return;

    try {
      await axios.delete(
        `http://localhost:3001/api/orders/cancel/${order.Order_code}`,
        { withCredentials: true }
      );
      alert("Đơn hàng đã được huỷ thành công.");
      fetchOrder();
    } catch (err: any) {
      alert(
        "Lỗi khi huỷ đơn hàng:\n" +
          JSON.stringify(err?.response?.data || err.message)
      );
    }
  };

  return (
    <Layout>
      {!order ? (
        <div style={styles.loading}>
          Không tìm thấy đơn hàng hoặc bạn chưa đăng nhập.
        </div>
      ) : (
        <div style={styles.container}>
          {hasPaid && (
            <div style={styles.successBanner}>
              Đơn hàng đã được thanh toán thành công!
            </div>
          )}

          {paymentStatus === "Thất bại" && (
            <div style={styles.failedBanner}>
              Đơn hàng đã bị huỷ hoặc thanh toán thất bại.
            </div>
          )}

          <h2 style={styles.heading}>
            Chi tiết đơn hàng:{" "}
            <span style={styles.orderCode}>{order.Order_code}</span>
          </h2>

          <div style={styles.row}>
            <div style={styles.col}>
              <h5 style={styles.subHeading}>Người gửi</h5>
              <p>
                <strong>{order.senderName}</strong> ({order.senderPhone})
              </p>
              <p>{order.senderAddress}</p>
            </div>
            <div style={styles.col}>
              <h5 style={styles.subHeading}>Người nhận</h5>
              <p>
                <strong>{order.receiverName}</strong> ({order.receiverPhone})
              </p>
              <p>{order.receiverAddress}</p>
            </div>
          </div>

          <hr style={styles.hr} />
          <h5 style={styles.subHeading}>Thông tin kiện hàng</h5>
          <p>
            <strong>Mô tả:</strong> {order.Description}
          </p>
          <p>
            <strong>Khối lượng:</strong> {order.Total_weight} kg
          </p>
          <p>
            <strong>Kích thước:</strong> {order.Dimensions}
          </p>
          <p>
            <strong>Giá trị đơn hàng:</strong>{" "}
            {parseInt(order.Value).toLocaleString()} VND
          </p>

          <hr style={styles.hr} />
          <h5 style={styles.subHeading}>Trạng thái đơn hàng</h5>
          <p>
            <strong>Trạng thái:</strong>{" "}
            <span style={styles.status}>{order.Order_status}</span>
          </p>
          <p>
            <strong>Thanh toán:</strong>{" "}
            <span
              style={{
                color:
                  paymentStatus === "Đã thanh toán"
                    ? "#27ae60"
                    : paymentStatus === "Thất bại"
                    ? "#c0392b"
                    : "#e67e22",
                fontWeight: "bold",
              }}
            >
              {paymentStatus || "Chưa cập nhật"}
            </span>
          </p>

          <p>
            <strong>Ngày tạo:</strong>{" "}
            {new Date(order.Created_at).toLocaleDateString()}
          </p>
          <p>
            <strong>Phí ship:</strong>{" "}
            <span style={styles.ship}>
              {parseInt(order.Ship_cost).toLocaleString()} VND
            </span>
          </p>

          {paymentStatus !== "Đã thanh toán" &&
            paymentStatus !== "Thất bại" && (
              <div style={styles.buttonGroup}>
                <button style={styles.exportBtn} onClick={handleMomoPayment}>
                  Thanh toán bằng MoMo
                </button>
                <button style={styles.cancelBtn} onClick={handleCancelOrder}>
                  Huỷ đơn hàng
                </button>
              </div>
            )}
        </div>
      )}
    </Layout>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px #ddd",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "2rem",
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
  },
  orderCode: {
    color: "#2c3e50",
    fontWeight: 600,
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    marginBottom: "1.5rem",
  },
  col: {
    flex: "1 1 45%",
    minWidth: "280px",
  },
  subHeading: {
    fontSize: "18px",
    color: "#333",
    marginBottom: "0.5rem",
  },
  hr: {
    margin: "1.5rem 0",
    border: "none",
    borderTop: "1px solid #ddd",
  },
  status: {
    color: "#1abc9c",
    fontWeight: "bold",
  },
  ship: {
    color: "#e74c3c",
    fontWeight: "bold",
  },
  exportBtn: {
    padding: "10px 24px",
    backgroundColor: "#e67e22",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 500,
  },
  cancelBtn: {
    padding: "10px 24px",
    backgroundColor: "#c0392b",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 500,
  },
  buttonGroup: {
    marginTop: "20px",
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    padding: "3rem",
    color: "#888",
  },
  successBanner: {
    padding: "12px",
    backgroundColor: "#dff0d8",
    color: "#3c763d",
    border: "1px solid #d6e9c6",
    borderRadius: "6px",
    marginBottom: "16px",
    fontWeight: "bold",
    fontSize: "16px",
  },
  failedBanner: {
    padding: "12px",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    border: "1px solid #f5c6cb",
    borderRadius: "6px",
    marginBottom: "16px",
    fontWeight: "bold",
    fontSize: "16px",
  },
};

export default OrderDetailPage;
