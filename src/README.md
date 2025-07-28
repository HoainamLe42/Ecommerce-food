# 🍕 Food Ecommerce - Fast Food Ordering Website

Một website đặt món ăn trực tuyến, cho phép người dùng duyệt thực đơn, lựa chọn món ăn (pizza, burger, nước uống,...), thêm vào giỏ hàng và đặt món nhanh chóng, tiện lợi.

---

## 📸 Demo

> [🌐 Xem demo tại đây](https://ecommerce-food-plum.vercel.app/) > ![Screenshot](./assets/food-order-preview.png)

---

## 🚀 Tính năng chính

-   🧾 Xem danh sách món ăn (pizza, hamburger, nước uống,...)
-   🔍 Tìm kiếm & lọc món ăn theo danh mục
-   🛒 Thêm/xoá món vào giỏ hàng, cập nhật số lượng
-   🧑 Đăng ký / Đăng nhập người dùng
-   🛍️ Đặt hàng (Order) và lưu đơn hàng theo user
-   📄 Xem lịch sử đơn hàng đã đặt
-   🔒 Xác thực người dùng
-   ⚙️ Giao diện quản trị Admin: quản lý món ăn, đơn hàng,user,...

---

## 🛠️ Công nghệ sử dụng

-   **Frontend:**
    -   React + TypeScript
    -   TailwindCSS
    -   React Router
    -   Context API
-   **Backend (giả lập):**
-   JSON Server được deploy trên **Codesandbox** để giữ backend luôn online
-   API luôn sẵn sàng truy cập qua URL như:  
     `https://qx6g8d-8080.csb.app`

📡 JSON Server API:

/products - dữ liệu món ăn

/users - tài khoản người dùng

/orders - đơn hàng

/carts - giỏ hàng của user

/blogs - bài viết blog

## 🔐 Tài khoản đăng nhập (Demo)

| Loại  | Email           | Mật khẩu |
| ----- | --------------- | -------- |
| Admin | admin@gmail.com | admin123 |

> Sử dụng tài khoản trên để đăng nhập và truy cập trang quản trị.

---

## 📦 Cài đặt & chạy project

```bash
# Clone dự án
git clone https://github.com/HoainamLe42/Ecommerce-food
cd food-ecommerce

# Cài dependencies
npm install

# Chạy frontend
npm run dev

# Chạy json server
npm run server
```
