import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaHV5bmgxODA4MiIsImEiOiJjbWF0enl1Z2kxMW0xMnFwem8xZ2pndjRsIn0.ulawUNd9LWKrfSIbq88VvQ";

const ContactSection: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const userMarker = useRef<mapboxgl.Marker | null>(null); // Ref để lưu trữ marker của người dùng

  // State cho tọa độ bản đồ và zoom ban đầu (ví dụ: trung tâm TP.HCM)
  const [mapCenter] = useState<[number, number]>([106.8231, 10.7712]);
  const [mapZoom] = useState<number>(9);

  // State cho form liên hệ
  const [formData, setFormData] = useState({
    message: "",
    name: "",
    email: "",
    subject: "",
  });

  // Xử lý thay đổi input của form liên hệ
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý gửi form liên hệ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(data.message);

      // Reset lại form
      setFormData({ message: "", name: "", email: "", subject: "" });

      // Reload lại trang sau khi gửi thành công (delay 500ms cho mượt)
      setTimeout(() => {}, 500);
    } catch (error) {
      console.error("Lỗi khi gửi form:", error);
      alert("Gửi không thành công. Vui lòng thử lại.");
    }
  };

  // Hàm để lấy vị trí người dùng và ghim lên bản đồ
  const pinUserLocation = () => {
    // Luôn lấy tham chiếu map hiện tại để TypeScript có thể thu hẹp kiểu
    const currentMapInstance = map.current;
    if (!currentMapInstance) {
      // Kiểm tra null một lần
      console.warn("Map is not initialized. Cannot get user location.");
      alert("Bản đồ chưa sẵn sàng. Vui lòng thử lại sau giây lát.");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          console.log("User location:", longitude, latitude);

          // Xóa marker cũ nếu có
          if (userMarker.current) {
            userMarker.current.remove();
          }

          // Tạo marker mới tại vị trí người dùng
          userMarker.current = new mapboxgl.Marker().setLngLat([
            longitude,
            latitude,
          ]);
          // Gọi API reverse geocoding
          fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
          )
            .then((res) => res.json())
            .then((data) => {
              const address =
                data?.features?.[0]?.place_name || "Không xác định";

              userMarker.current = new mapboxgl.Marker()
                .setLngLat([longitude, latitude])
                .setPopup(
                  new mapboxgl.Popup({ offset: 25 }).setHTML(
                    `<h3>Vị trí của bạn</h3><p>${address}</p>`
                  )
                )
                .addTo(currentMapInstance);

              currentMapInstance.flyTo({
                center: [longitude, latitude],
                zoom: 14,
                essential: true,
              });

              userMarker.current.getPopup()?.addTo(currentMapInstance);
            })
            .catch((error) => {
              console.error("Lỗi reverse geocoding:", error);
              alert("Không thể lấy địa chỉ từ vị trí của bạn.");
            });

          // Di chuyển bản đồ đến vị trí người dùng
          currentMapInstance.flyTo({
            // Sử dụng biến đã được kiểm tra null
            center: [longitude, latitude],
            zoom: 14, // Zoom gần hơn để hiển thị vị trí người dùng rõ hơn
            essential: true,
          });

          // Hiển thị popup ngay lập tức
          userMarker.current.getPopup()?.addTo(currentMapInstance); // Sử dụng biến đã được kiểm tra null
        },
        (error) => {
          console.error("Error getting user location:", error);
          let errorMessage = "Không thể lấy được vị trí của bạn.";
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage +=
              " Vui lòng cấp quyền truy cập vị trí cho trình duyệt của bạn.";
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMessage += " Vị trí không khả dụng.";
          } else if (error.code === error.TIMEOUT) {
            errorMessage += " Hết thời gian chờ lấy vị trí.";
          }
          alert(errorMessage);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 } // Tùy chọn cho getCurrentPosition
      );
    } else {
      alert("Geolocation không được hỗ trợ trên trình duyệt này.");
    }
  };

  // Khởi tạo bản đồ
  useEffect(() => {
    // Chỉ khởi tạo bản đồ một lần và nếu mapContainer.current đã sẵn sàng
    if (map.current || !mapContainer.current) return;

    // Sử dụng biến cục bộ để đảm bảo TypeScript hiểu rõ kiểu
    const containerElement = mapContainer.current;

    const newMap = new mapboxgl.Map({
      container: containerElement, // containerElement chắc chắn không null
      style: "mapbox://styles/mapbox/satellite-streets-v11", // Style giống ảnh của bạn
      center: mapCenter,
      zoom: mapZoom,
    });

    newMap.on("load", () => {
      console.log("Mapbox map loaded successfully!");
      newMap.addControl(new mapboxgl.NavigationControl(), "top-right"); // newMap chắc chắn không null
    });

    newMap.on("error", (e) => {
      console.error("Mapbox map error:", e.error);
      if (e.error && typeof e.error === "object" && "status" in e.error) {
        const errorWithStatus = e.error as { status: number };
        if (errorWithStatus.status === 401) {
          alert(
            "Lỗi Mapbox Token. Vui lòng kiểm tra lại Mapbox Access Token của bạn."
          );
        }
      } else {
        alert(
          "Đã xảy ra lỗi khi tải bản đồ: " +
            (e.error?.message || "Lỗi không xác định.")
        );
      }
    });

    map.current = newMap; // Gán đối tượng mapboxgl.Map vào ref

    // Cleanup function
    return () => {
      console.log("Cleaning up map on component unmount.");
      map.current?.remove(); // An toàn khi remove vì có ?.
      userMarker.current?.remove(); // Đảm bảo marker cũng được xóa khi component unmount
    };
  }, [mapCenter, mapZoom]);

  return (
    <section className="contact-section">
      <div className="container">
        <div className="d-none d-sm-block mb-5 pb-4">
          <div
            id="map-container"
            ref={mapContainer}
            style={{
              height: 480,
              position: "relative",
              overflow: "hidden",
              backgroundColor: "lightblue",
            }}
          ></div>
          {/* Nút để ghim vị trí của người dùng */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={pinUserLocation}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Ghim Vị Trí Của Tôi
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h2 className="contact-title">Get in Touch</h2>
          </div>
          <div className="col-lg-8">
            <form className="form-contact contact_form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <textarea
                      className="form-control w-100"
                      name="message"
                      cols={30}
                      rows={9}
                      placeholder="Enter Message"
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      className="form-control valid"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      className="form-control valid"
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <input
                      className="form-control"
                      name="subject"
                      type="text"
                      placeholder="Enter Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group mt-3">
                <button
                  type="submit"
                  className="button button-contactForm boxed-btn"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-3 offset-lg-1">
            <div className="media contact-info">
              <span className="contact-info__icon">
                <i className="ti-home"></i>
              </span>
              <div className="media-body">
                <h3>Buttonwood, California.</h3>
                <p>Rosemead, CA 91770</p>
              </div>
            </div>
            <div className="media contact-info">
              <span className="contact-info__icon">
                <i className="ti-tablet"></i>
              </span>
              <div className="media-body">
                <h3>+1 253 565 2365</h3>
                <p>Mon to Fri 9am to 6pm</p>
              </div>
            </div>
            <div className="media contact-info">
              <span className="contact-info__icon">
                <i className="ti-email"></i>
              </span>
              <div className="media-body">
                <h3>support@colorlib.com</h3>
                <p>Send us your query anytime!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
